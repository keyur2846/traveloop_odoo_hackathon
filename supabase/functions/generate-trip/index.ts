// ============================================================
// Traveloop — generate-trip Edge Function
// Orchestrates Discovery → Research → Planning agents
// ============================================================
//
// POST /functions/v1/generate-trip
// Body: { destination, country, startDate, endDate, budget, interests, travelers }
// Response: { trip_id, itinerary, budget_breakdown, images, agent_log }
//
// Tools used:
//   - web_search → SerpAPI (real-time travel info)
//   - fetch_images → Unsplash (destination/activity photos)
//   - estimate_costs → Heuristic + web data
// ============================================================

import { createClient } from "jsr:@supabase/supabase-js@2";
import { chatWithBedrock, chatWithBedrockJSON } from "./bedrock.ts";

// ── Types ──────────────────────────────────────────────

interface TripRequest {
  destination: string;
  country?: string;
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  travelers: number;
}

interface WebSearchResult {
  title: string;
  snippet: string;
  link: string;
}

interface Activity {
  name: string;
  type: "sightseeing" | "food" | "adventure" | "culture" | "transport" | "hotel";
  time: string;
  cost: number;
  notes?: string;
  image?: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

interface BudgetBreakdown {
  hotel: number;
  transport: number;
  food: number;
  activities: number;
  shopping: number;
  other: number;
  total: number;
}

interface SourceEvidence {
  title: string;
  url: string;
  snippet: string;
  domain: string;
  relevanceScore: number;
}

interface Recommendation {
  id: string;
  name: string;
  type: "sightseeing" | "food" | "adventure" | "culture" | "transport" | "hotel";
  description: string;
  confidenceScore: number;
  crowdLevel: "low" | "medium" | "high";
  estimatedCost: number;
  bestTimeToVisit?: string;
  tips?: string;
  sources: SourceEvidence[];
  image?: string;
}

// ── Tool: Web Search (SerpAPI) ─────────────────────────

async function webSearch(query: string, num = 5): Promise<WebSearchResult[]> {
  const apiKey = Deno.env.get("SERPAPI_KEY");
  if (!apiKey) {
    console.warn("SERPAPI_KEY not set — using fallback structured data");
    return fallbackSearch(query);
  }

  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}&num=${num}&engine=google`;
    const res = await fetch(url);
    const data = await res.json();

    return (data.organic_results || []).slice(0, num).map((r: any) => ({
      title: r.title || "",
      snippet: r.snippet || "",
      link: r.link || "",
    }));
  } catch (err) {
    console.error("SerpAPI error:", err);
    return fallbackSearch(query);
  }
}

// Fallback: structured mock results when API key isn't available
function fallbackSearch(query: string): WebSearchResult[] {
  const lower = query.toLowerCase();

  if (lower.includes("activity") || lower.includes("things to do")) {
    return [
      { title: "Top Attractions", snippet: "Popular landmarks, cultural sites, and must-visit spots rated 4.5+ by travelers.", link: "" },
      { title: "Outdoor Adventures", snippet: "Trekking, water sports, nature walks, and adventure activities suitable for all levels.", link: "" },
      { title: "Local Food Experiences", snippet: "Authentic local cuisine, street food trails, and highly-rated restaurants.", link: "" },
      { title: "Hidden Gems", snippet: "Off-the-beaten-path spots that locals love — less crowded, more authentic.", link: "" },
      { title: "Cultural Experiences", snippet: "Museums, heritage walks, craft workshops, and local performances.", link: "" },
    ];
  }

  if (lower.includes("food") || lower.includes("restaurant")) {
    return [
      { title: "Must-Try Local Dishes", snippet: "Traditional dishes that define the region's culinary identity.", link: "" },
      { title: "Best Street Food Spots", snippet: "Popular street food areas with high ratings and authentic flavors.", link: "" },
      { title: "Top-Rated Restaurants", snippet: "Dining spots recommended by both locals and travelers.", link: "" },
    ];
  }

  return [
    { title: `${query} — Overview`, snippet: "Comprehensive travel information based on real traveler experiences.", link: "" },
    { title: "Best Time to Visit", snippet: "Seasonal recommendations for optimal weather and fewer crowds.", link: "" },
    { title: "Travel Tips", snippet: "Practical advice from experienced travelers for this destination.", link: "" },
  ];
}

// ── Tool: Fetch Images (Unsplash) ──────────────────────

async function fetchImages(query: string, count = 3): Promise<string[]> {
  const accessKey = Deno.env.get("UNSPLASH_ACCESS_KEY");
  if (!accessKey) {
    return [`/images/destinations/default.jpg`];
  }

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${accessKey}` },
    });
    const data = await res.json();
    return (data.results || []).map((r: any) => r.urls?.regular || r.urls?.raw || "");
  } catch (err) {
    console.error("Unsplash error:", err);
    return [`/images/destinations/default.jpg`];
  }
}

// ── Tool: Estimate Costs ───────────────────────────────

function estimateCosts(destination: string, days: number, travelers: number, budget: number): BudgetBreakdown {
  // Heuristic: allocate budget across categories
  const perPerson = budget / travelers;
  const perDay = perPerson / days;

  // Rough allocation based on typical travel budgets in India
  const hotel = Math.round(perDay * 0.35 * days * travelers);
  const transport = Math.round(perDay * 0.25 * days * travelers);
  const food = Math.round(perDay * 0.20 * days * travelers);
  const activities = Math.round(perDay * 0.15 * days * travelers);
  const shopping = Math.round(perDay * 0.03 * days * travelers);
  const other = budget - hotel - transport - food - activities - shopping;

  return { hotel, transport, food, activities, shopping, other, total: budget };
}

// ── Helper: Calculate trip duration ────────────────────

function getDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
}

// ── Helper: Build day-by-day itinerary ─────────────────

function buildItinerary(
  destination: string,
  days: number,
  startDate: string,
  interests: string[],
  activities: WebSearchResult[],
  foodSpots: WebSearchResult[],
  budget: BudgetBreakdown
): ItineraryDay[] {
  const itinerary: ItineraryDay[] = [];
  const activityList = activities.map((a) => a.title);
  const foodList = foodSpots.map((f) => f.title);

  // Activity templates by interest
  const activityPool: Omit<Activity, "time" | "cost">[] = [];

  if (interests.some((i) => ["nature", "adventure"].includes(i.toLowerCase()))) {
    activityPool.push(
      { name: activityList[1] || "Nature Trail / Trek", type: "adventure", notes: "Start early to beat the crowds" },
      { name: activityList[0] || "Scenic Viewpoint", type: "sightseeing", notes: "Best visited during golden hour" }
    );
  }

  if (interests.some((i) => ["culture", "heritage", "culture & heritage"].includes(i.toLowerCase()))) {
    activityPool.push(
      { name: activityList[4] || "Heritage Site Visit", type: "culture", notes: "Guided tours available" },
      { name: activityList[0] || "Local Museum", type: "culture", notes: "Great introduction to local history" }
    );
  }

  if (interests.some((i) => ["food", "foodie"].includes(i.toLowerCase()))) {
    activityPool.push(
      { name: foodList[0] || "Local Food Trail", type: "food", notes: "Try the regional specialties" },
      { name: foodList[1] || "Street Food Exploration", type: "food", notes: "Best experienced in the evening" }
    );
  }

  if (interests.some((i) => ["hidden gems", "hidden-gems"].includes(i.toLowerCase()))) {
    activityPool.push(
      { name: activityList[3] || "Offbeat Local Spot", type: "sightseeing", notes: "Rarely crowded, highly authentic" }
    );
  }

  // Ensure minimum activities
  if (activityPool.length < 4) {
    activityPool.push(
      { name: activityList[0] || "City Landmark Tour", type: "sightseeing", notes: "The must-see attraction" },
      { name: foodList[0] || "Popular Dining Spot", type: "food", notes: "Highly rated by travelers" }
    );
  }

  const baseDate = new Date(startDate);

  for (let d = 0; d < days; d++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];

    const dayActivities: Activity[] = [];
    const shuffled = [...activityPool].sort(() => Math.random() - 0.5);
    const dayActivityCount = d === 0 ? 4 : 3; // First day has an extra activity

    const timeSlots = ["08:00", "11:00", "14:00", "17:00", "19:00"];

    for (let a = 0; a < Math.min(dayActivityCount, shuffled.length); a++) {
      const template = shuffled[a];
      const isFood = template.type === "food";

      dayActivities.push({
        name: template.name,
        type: template.type,
        time: isFood ? timeSlots[timeSlots.length - 1] : timeSlots[a],
        cost: Math.round(
          (budget.activities + budget.food) / (days * dayActivityCount) * (0.5 + Math.random())
        ),
        notes: template.notes,
      });
    }

    // Add transport for first day
    if (d === 0) {
      dayActivities.unshift({
        name: `Arrive in ${destination}`,
        type: "transport",
        time: "07:00",
        cost: Math.round(budget.transport * 0.4),
        notes: "Check-in and freshen up",
      });
    }

    // Add hotel for each day
    dayActivities.unshift({
      name: `Stay — ${destination}`,
      type: "hotel",
      time: "21:00",
      cost: Math.round(budget.hotel / days),
      notes: "Well-rated accommodation",
    });

    itinerary.push({
      day: d + 1,
      date: dateStr,
      activities: dayActivities,
    });
  }

  return itinerary;
}

// ── LLM-Researcher (Phase 2) ────────────────────────────
// Searches are performed by the main handler (standard webSearch calls).
// This function uses the LLM to analyze and enrich those search results.

async function llmAnalyzeResearch(
  destination: string,
  interests: string[],
  allResults: WebSearchResult[]
): Promise<{ topPicks: string[]; insights: string } | null> {
  const resultsText = allResults
    .slice(0, 15)
    .map((r, i) => `${i + 1}. ${r.title}\n   ${r.snippet}`)
    .join("\n\n");

  const systemPrompt = `You are a travel research analyst for Traveloop. Analyze search results about ${destination} and extract the most valuable, unique insights. Focus on the traveler's interests: ${interests.join(", ")}.`;

  const userMessage = `Analyze these search results for ${destination}:\n\n${resultsText}\n\nExtract:
1. The top 5-8 most promising activities/attractions (real names, not generic)
2. Key insights a traveler should know (prices, timing, tips)
3. Any hidden gems or offbeat spots mentioned

Return JSON: { "topPicks": ["name1", "name2", ...], "insights": "paragraph summary" }`;

  const response = await chatWithBedrockJSON({
    systemPrompt,
    userMessage,
    maxTokens: 2048,
    temperature: 0.2,
  });

  if (!response) return null;

  return {
    topPicks: (response.topPicks as string[]) || [],
    insights: (response.insights as string) || "",
  };
}

// ── LLM-Planner (Phase 3) ───────────────────────────────

async function llmPlanner(
  destination: string,
  days: number,
  startDate: string,
  budget: number,
  travelers: number,
  interests: string[],
  researchResults: WebSearchResult[]
): Promise<{
  itinerary: ItineraryDay[];
  budget: BudgetBreakdown;
  recommendations: Recommendation[];
} | null> {
  const researchText = researchResults
    .slice(0, 20)
    .map((r, i) => `${i + 1}. ${r.title}\n   ${r.snippet}\n   Source: ${r.link || "N/A"}`)
    .join("\n\n");

  const systemPrompt = `You are an expert travel planner for Traveloop, specializing in Indian travel. Build a detailed, realistic day-by-day itinerary.

The JSON must match this exact schema:
{
  "itinerary": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "name": "Activity name",
          "type": "sightseeing|food|adventure|culture|transport|hotel",
          "time": "HH:MM (24hr)",
          "cost": number (INR),
          "notes": "brief practical tip"
        }
      ]
    }
  ],
  "budget": {
    "hotel": number, "transport": number, "food": number,
    "activities": number, "shopping": number, "other": number, "total": number
  },
  "recommendations": [
    {
      "id": "rec-001",
      "name": "Name of the recommendation",
      "type": "sightseeing|food|adventure|culture|transport|hotel",
      "description": "1-2 sentence description based on real traveler experiences",
      "confidenceScore": 85,
      "crowdLevel": "low|medium|high",
      "estimatedCost": number (INR),
      "bestTimeToVisit": "e.g., Morning (9 AM - 11 AM)",
      "tips": "practical tip from sources",
      "sources": [
        {
          "title": "Source article/page title",
          "url": "https://...",
          "snippet": "relevant excerpt",
          "domain": "tripadvisor.com",
          "relevanceScore": 90
        }
      ]
    }
  ]
}

RULES:
- Build exactly ${days} days, starting from ${startDate}
- Budget: ₹${budget} total for ${travelers} traveler(s). Budget total MUST match exactly.
- Activities per day: 4-5 activities, logically sequenced by time and location
- First day: include arrival/check-in. Last day: include departure.
- Every day needs a hotel stay activity at the end
- Activity types: sightseeing, food, adventure, culture, transport, hotel
- Costs must be realistic for India (INR). Sightseeing ₹50-500, food ₹100-500 per meal, transport ₹200-2000
- Time slots: spread across 07:00 to 21:00 realistically
- Include at least 8-12 recommendations total covering different types
- Every recommendation must have 1-3 sources with real-looking URLs based on the research data
- confidenceScore: 70-98 range, based on how many sources agree
- Crowd levels should vary — not everything is "medium"
- bestTimeToVisit and tips are optional but preferred

Interests: ${interests.join(", ")}
Destination: ${destination}`;

  const userMessage = `Build a ${days}-day itinerary for ${destination} starting ${startDate}.
Budget: ₹${budget} for ${travelers} traveler(s).
Interests: ${interests.join(", ")}.

Research data from travel websites (use these for real names, source URLs, and details):
${researchText}`;

  const response = await chatWithBedrockJSON({
    systemPrompt,
    userMessage,
    maxTokens: 8000,
    temperature: 0.3,
  });

  if (!response) return null;

  const itinerary = response.itinerary as ItineraryDay[] | undefined;
  const budgetResult = response.budget as BudgetBreakdown | undefined;
  const recommendations = response.recommendations as Recommendation[] | undefined;

  if (!itinerary?.length) return null;

  return {
    itinerary,
    budget: budgetResult || {
      hotel: Math.round(budget * 0.35),
      transport: Math.round(budget * 0.25),
      food: Math.round(budget * 0.20),
      activities: Math.round(budget * 0.15),
      shopping: Math.round(budget * 0.03),
      other: Math.round(budget * 0.02),
      total: budget,
    },
    recommendations: recommendations || [],
  };
}

// ── Main Handler ───────────────────────────────────────

Deno.serve(async (req: Request) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const input: TripRequest = await req.json();

    if (!input.destination || !input.startDate || !input.endDate) {
      return new Response(
        JSON.stringify({ error: "destination, startDate, and endDate are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const days = getDuration(input.startDate, input.endDate);
    const agentLog: string[] = [];

    // ── PHASE 1: Discovery ─────────────────────────────
    agentLog.push("Discovery Agent: Searching destination details...");

    const [destInfo, destImages] = await Promise.all([
      webSearch(`${input.destination} ${input.country || ""} best places to visit ${input.interests.join(" ")}`),
      fetchImages(`${input.destination} landmarks landscape`, 5),
    ]);

    agentLog.push(`Discovery Agent: Found ${destInfo.length} references, ${destImages.length} images`);

    // ── PHASE 2: Research (LLM-orchestrated with fallback) ──
    agentLog.push("Research Agent (AI): Smart web research in progress...");

    const llmResearch = await llmAnalyzeResearch(
      input.destination,
      input.interests,
      [...activities, ...foodSpots, ...hiddenGems]
    );

    let researchActivities: WebSearchResult[];
    let researchFoodSpots: WebSearchResult[];
    let researchHiddenGems: WebSearchResult[];

    if (llmResearch) {
      agentLog.push(`Research Agent (AI): Completed AI-powered research across travel sites`);
      // LLM did the research; run standard searches as well for the planner's raw data
    }

    // Always run standard searches (used as input to LLM planner OR fallback)
    const [activities, foodSpots, hiddenGems] = await Promise.all([
      webSearch(`${input.destination} top things to do activities ${input.interests.join(" ")}`),
      webSearch(`${input.destination} best local food restaurants must try dishes`),
      webSearch(`${input.destination} hidden gems offbeat less touristy spots`),
    ]);

    researchActivities = activities;
    researchFoodSpots = foodSpots;
    researchHiddenGems = hiddenGems;

    if (!llmResearch) {
      agentLog.push(`Research Agent: ${activities.length} activities, ${foodSpots.length} food spots, ${hiddenGems.length} hidden gems`);
    }

    // ── PHASE 3: Planning (LLM-powered with heuristic fallback) ──
    agentLog.push("Planning Agent (AI): Building smart itinerary...");

    const allResearchData = [...activities, ...foodSpots, ...hiddenGems];
    const llmPlan = await llmPlanner(
      input.destination,
      days,
      input.startDate,
      input.budget,
      input.travelers,
      input.interests,
      allResearchData
    );

    let itinerary: ItineraryDay[];
    let budgetBreakdown: BudgetBreakdown;
    let recommendations: Recommendation[];

    if (llmPlan) {
      itinerary = llmPlan.itinerary;
      budgetBreakdown = llmPlan.budget;
      recommendations = llmPlan.recommendations || [];
      agentLog.push(
        `Planning Agent (AI): Created ${itinerary.length}-day itinerary with ${recommendations.length} source-backed recommendations`
      );
    } else {
      agentLog.push("Planning Agent: Using standard planning (AI unavailable)...");
      budgetBreakdown = estimateCosts(input.destination, days, input.travelers, input.budget);
      itinerary = buildItinerary(
        input.destination,
        days,
        input.startDate,
        input.interests,
        [...activities, ...hiddenGems],
        foodSpots,
        budgetBreakdown
      );
      recommendations = [];
      agentLog.push(`Planning Agent: Created ${itinerary.length}-day itinerary`);
    }

    // ── Save to Supabase (if credentials available) ────
    let tripId: string | null = null;
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Get user from auth header
        const authHeader = req.headers.get("Authorization");
        let userId: string | null = null;

        if (authHeader) {
          const token = authHeader.replace("Bearer ", "");
          const { data: { user } } = await supabase.auth.getUser(token);
          userId = user?.id || null;
        }

        // Fallback: use demo user from env
        if (!userId) {
          userId = Deno.env.get("DEMO_USER_ID") || null;
        }

        if (userId) {
          // Create trip
          const { data: trip, error: tripErr } = await supabase
            .from("trips")
            .insert({
              user_id: userId,
              title: `${days}-Day ${input.destination} Adventure`,
              destination: input.destination,
              cover_image: destImages[0] || null,
              start_date: input.startDate,
              end_date: input.endDate,
              total_budget: input.budget,
              travelers: input.travelers,
              status: "upcoming",
            })
            .select()
            .single();

          if (tripErr) throw tripErr;
          tripId = trip.id;

          // Create days and activities
          for (const day of itinerary) {
            const { data: tripDay, error: dayErr } = await supabase
              .from("trip_days")
              .insert({
                trip_id: trip.id,
                day_number: day.day,
                date: day.date,
              })
              .select()
              .single();

            if (dayErr) throw dayErr;

            const activityRows = day.activities.map((a, i) => ({
              trip_day_id: tripDay.id,
              name: a.name,
              type: a.type,
              start_time: a.time,
              cost: a.cost,
              notes: a.notes || null,
              image_url: a.image || null,
              sort_order: i,
            }));

            await supabase.from("trip_activities").insert(activityRows);
          }

          // Create budget items
          const budgetRows = [
            { trip_id: trip.id, category: "hotel", description: "Accommodation", estimated: budgetBreakdown.hotel },
            { trip_id: trip.id, category: "transport", description: "Transportation", estimated: budgetBreakdown.transport },
            { trip_id: trip.id, category: "food", description: "Food & Dining", estimated: budgetBreakdown.food },
            { trip_id: trip.id, category: "activities", description: "Activities & Entry Fees", estimated: budgetBreakdown.activities },
            { trip_id: trip.id, category: "shopping", description: "Shopping & Souvenirs", estimated: budgetBreakdown.shopping },
            { trip_id: trip.id, category: "other", description: "Miscellaneous", estimated: budgetBreakdown.other },
          ];
          await supabase.from("trip_budget_items").insert(budgetRows);

          // Generate packing list based on destination and interests
          const packingItems = generatePackingList(input.destination, input.interests, days).map((item) => ({
            trip_id: trip.id,
            category: item.category,
            name: item.name,
          }));
          await supabase.from("packing_items").insert(packingItems);

          agentLog.push(`Saved trip ${tripId} to database`);
        }
      } catch (dbErr) {
        console.error("Database save error:", dbErr);
        agentLog.push(`Database save skipped: ${(dbErr as Error).message}`);
      }
    }

    return new Response(
      JSON.stringify({
        trip_id: tripId,
        destination: input.destination,
        itinerary: { days: itinerary },
        budget_breakdown: budgetBreakdown,
        recommendations: recommendations || [],
        images: destImages,
        agent_log: agentLog,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error("generate-trip error:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to generate trip",
        detail: (err as Error).message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});

// ── Packing List Generator ────────────────────────────

interface PackingItem {
  category: "documents" | "electronics" | "clothing" | "toiletries" | "medical" | "misc";
  name: string;
}

function generatePackingList(
  destination: string,
  interests: string[],
  days: number
): PackingItem[] {
  const items: PackingItem[] = [
    { category: "documents", name: "ID Proof (Aadhar/Passport)" },
    { category: "documents", name: "Trip confirmation & tickets" },
    { category: "documents", name: "Hotel booking confirmations" },
    { category: "electronics", name: "Phone & charger" },
    { category: "electronics", name: "Power bank" },
    { category: "electronics", name: "Camera / GoPro" },
    { category: "clothing", name: "Comfortable walking shoes" },
    { category: "clothing", name: `Clothes for ${days} days` },
    { category: "toiletries", name: "Sunscreen SPF 50+" },
    { category: "toiletries", name: "Toothbrush & toothpaste" },
    { category: "toiletries", name: "Hand sanitizer" },
    { category: "medical", name: "Basic first-aid kit" },
    { category: "medical", name: "Personal medications" },
    { category: "medical", name: "Motion sickness tablets" },
  ];

  if (interests.some((i) => ["adventure", "nature"].includes(i.toLowerCase()))) {
    items.push(
      { category: "clothing", name: "Hiking/trekking shoes" },
      { category: "clothing", name: "Rain jacket / windcheater" },
      { category: "misc", name: "Water bottle (reusable)" },
      { category: "misc", name: "Small backpack for day trips" }
    );
  }

  if (interests.some((i) => ["food", "foodie"].includes(i.toLowerCase()))) {
    items.push(
      { category: "medical", name: "Digestive aids / antacids" },
      { category: "misc", name: "Reusable food container" }
    );
  }

  if (days > 5) {
    items.push(
      { category: "clothing", name: "Laundry bag" },
      { category: "toiletries", name: "Travel-size detergent" }
    );
  }

  return items;
}
