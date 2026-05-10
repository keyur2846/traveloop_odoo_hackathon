// ============================================================
// Traveloop — Amazon Bedrock Integration (Deno-native)
// Uses @mhart/aws4fetch for SigV4 signing — no AWS SDK needed
//
// Supports:
//   - MiniMax M2.5 (InvokeModel API)
//   - Anthropic Claude (Converse API)
// ============================================================

import { AwsV4Signer } from "jsr:@mhart/aws4fetch@1";

// ── Types ──────────────────────────────────────────────

export interface BedrockMessage {
  role: "user" | "assistant";
  content: string; // simplified: text only for MiniMax, content blocks for Claude
}

export interface BedrockResponse {
  text: string;
  usage: { inputTokens: number; outputTokens: number };
}

export interface ChatParams {
  systemPrompt: string;
  userMessage: string;
  maxTokens?: number;
  temperature?: number;
}

// ── Helpers ────────────────────────────────────────────

function getAwsConfig() {
  const accessKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const secretKey = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  const region = Deno.env.get("AWS_REGION") || "us-east-1";
  const modelId = Deno.env.get("BEDROCK_MODEL_ID") || "minimax.minimax-m2.5";

  if (!accessKey || !secretKey) return null;

  return { accessKey, secretKey, region, modelId };
}

async function signedFetch(url: string, body: Record<string, unknown>, signer: AwsV4Signer): Promise<Response> {
  const request = new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body),
  });
  const signed = await signer.sign(request);
  return fetch(signed);
}

// ── MiniMax M2.5 via InvokeModel API ───────────────────

async function invokeMiniMax(params: ChatParams): Promise<BedrockResponse | null> {
  const config = getAwsConfig();
  if (!config) return null;

  const signer = new AwsV4Signer({
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretKey,
    region: config.region,
    service: "bedrock",
  });

  const url = `https://bedrock-runtime.${config.region}.amazonaws.com/model/${encodeURIComponent(config.modelId)}/invoke`;

  const body = {
    model: config.modelId,
    messages: [
      { role: "system", content: params.systemPrompt },
      { role: "user", content: params.userMessage },
    ],
    max_tokens: params.maxTokens || 4096,
    temperature: params.temperature ?? 0.3,
  };

  try {
    const res = await signedFetch(url, body, signer);

    if (!res.ok) {
      const errText = await res.text();
      console.error("MiniMax Bedrock error:", res.status, errText);
      return null;
    }

    const data = await res.json();

    // MiniMax response format: { output: { choices: [{ message: { content: "..." } }] } }
    const text =
      data.output?.choices?.[0]?.message?.content ||
      data.choices?.[0]?.message?.content ||
      data.output?.text ||
      "";

    return {
      text: typeof text === "string" ? text : JSON.stringify(text),
      usage: data.usage || { inputTokens: 0, outputTokens: 0 },
    };
  } catch (err) {
    console.error("MiniMax invoke error:", err);
    return null;
  }
}

// ── Anthropic Claude via Converse API ──────────────────

async function converseClaude(
  params: ChatParams
): Promise<BedrockResponse | null> {
  const config = getAwsConfig();
  if (!config) return null;

  const signer = new AwsV4Signer({
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretKey,
    region: config.region,
    service: "bedrock",
  });

  const url = `https://bedrock-runtime.${config.region}.amazonaws.com/model/${encodeURIComponent(config.modelId)}/converse`;

  const body = {
    messages: [{ role: "user", content: [{ text: params.userMessage }] }],
    system: [{ text: params.systemPrompt }],
    inferenceConfig: {
      maxTokens: params.maxTokens || 4096,
      temperature: params.temperature ?? 0.3,
    },
  };

  try {
    const res = await signedFetch(url, body, signer);

    if (!res.ok) {
      const errText = await res.text();
      console.error("Claude Bedrock error:", res.status, errText);
      return null;
    }

    const data = await res.json();
    const output = data.output?.message || data;
    const textBlocks = (output?.content || [])
      .filter((c: { text?: string }) => "text" in c)
      .map((c: { text?: string }) => c.text || "")
      .join("");

    return {
      text: textBlocks,
      usage: data.usage || { inputTokens: 0, outputTokens: 0 },
    };
  } catch (err) {
    console.error("Claude converse error:", err);
    return null;
  }
}

// ── Unified Chat Interface ─────────────────────────────

/**
 * Call Bedrock with a single prompt (no tool use).
 * Automatically routes to InvokeModel or Converse based on model ID.
 */
export async function chatWithBedrock(params: ChatParams): Promise<BedrockResponse | null> {
  const config = getAwsConfig();
  if (!config) {
    console.warn("AWS credentials not set — Bedrock unavailable");
    return null;
  }

  if (config.modelId.includes("minimax") || config.modelId.includes("glm")) {
    return invokeMiniMax(params);
  }

  // Default: Anthropic Converse API
  return converseClaude(params);
}

// ── Structured Output (JSON) ───────────────────────────

/**
 * Call Bedrock and parse the response as JSON.
 * For MiniMax: appends JSON formatting instructions to the system prompt.
 */
export async function chatWithBedrockJSON(
  params: ChatParams
): Promise<Record<string, unknown> | null> {
  const config = getAwsConfig();
  if (!config) return null;

  const isMiniMax = config.modelId.includes("minimax");

  const jsonInstructions = isMiniMax
    ? "\n\nIMPORTANT: Respond with ONLY valid JSON. No markdown, no code fences, no explanation. Just the raw JSON object."
    : "\n\nRespond with ONLY valid JSON. No markdown, no code fences.";

  const response = await chatWithBedrock({
    ...params,
    systemPrompt: params.systemPrompt + jsonInstructions,
  });

  if (!response) return null;

  // Clean up common issues
  let text = response.text.trim();

  // Remove markdown code fences if present
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  text = text.trim();

  // Try to parse
  try {
    return JSON.parse(text);
  } catch {
    // JSON repair: close unclosed braces/brackets
    const openBraces = (text.match(/\{/g) || []).length;
    const closeBraces = (text.match(/\}/g) || []).length;
    const openBrackets = (text.match(/\[/g) || []).length;
    const closeBrackets = (text.match(/\]/g) || []).length;
    text += "}".repeat(Math.max(0, openBraces - closeBraces));
    text += "]".repeat(Math.max(0, openBrackets - closeBrackets));

    try {
      return JSON.parse(text);
    } catch {
      console.error("Failed to parse Bedrock JSON response even after repair");
      return null;
    }
  }
}
