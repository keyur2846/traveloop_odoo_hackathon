"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Sparkles, ArrowRight, MapPin, Loader2, CheckCircle2, Search, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/ui/date-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

type AgentPhase = "idle" | "discovery" | "research" | "planning" | "done" | "error"

const EDGE_FUNCTION_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-trip`
  : "/api/generate-trip"

export function TripForm() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    destination: "",
    country: "India",
    dateRange: undefined as DateRange | undefined,
    budget: "",
    travelers: "2",
    interests: ["Nature", "Hidden Gems"] as string[],
  })
  const [agentPhase, setAgentPhase] = React.useState<AgentPhase>("idle")
  const [agentLog, setAgentLog] = React.useState<string[]>([])
  const [error, setError] = React.useState("")

  const interests = [
    "Nature", "Food", "Culture & Heritage", "Adventure",
    "Relaxed", "Budget Friendly", "Hidden Gems", "Nightlife",
  ]

  const countries = ["India", "Thailand", "Vietnam", "Indonesia", "Japan", "Nepal", "Sri Lanka", "Bhutan"]

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.destination || !formData.dateRange?.from || !formData.dateRange?.to || !formData.budget) {
      setError("Please fill in destination, dates, and budget.")
      return
    }

    setError("")
    setAgentPhase("discovery")
    setAgentLog(["Discovery Agent: Searching destination details..."])

    try {
      const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: formData.destination,
          country: formData.country,
          startDate: formData.dateRange?.from ? format(formData.dateRange.from, "yyyy-MM-dd") : "",
          endDate: formData.dateRange?.to ? format(formData.dateRange.to, "yyyy-MM-dd") : "",
          budget: parseInt(formData.budget),
          interests: formData.interests.map(i => i.toLowerCase().replace(/\s+/g, "-")),
          travelers: parseInt(formData.travelers),
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error || data.detail || "Generation failed")
      }

      if (data.agent_log) {
        setAgentLog(data.agent_log)
        if (data.agent_log.length > 1) setAgentPhase("research")
        if (data.agent_log.length > 2) setAgentPhase("planning")
      }

      setAgentPhase("done")

      const tripId = data.trip_id || "demo-trip"
      // Cache full trip data for the build page
      sessionStorage.setItem(`trip-${tripId}`, JSON.stringify({
        destination: data.destination,
        itinerary: data.itinerary,
        budget_breakdown: data.budget_breakdown,
        images: data.images,
      }))
      if (data.recommendations?.length > 0) {
        sessionStorage.setItem(`recs-${tripId}`, JSON.stringify(data.recommendations))
      }
      setTimeout(() => router.push(`/trips/${tripId}/build`), 800)
    } catch (err) {
      setAgentPhase("error")
      setError((err as Error).message || "Failed to generate trip.")
      setAgentLog(prev => [...prev, `Error: ${(err as Error).message}`])
    }
  }

  return (
    <div className="space-y-12 p-8 lg:p-12 animate-fade-up">
      <div className="mx-auto max-w-4xl space-y-12">

        {/* Header */}
        <div className="space-y-4 border-l-4 border-primary pl-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              AI-Powered Discovery
            </span>
          </div>
          <h1 className="font-serif text-[3.5rem] font-bold leading-tight text-text-primary uppercase tracking-tight">
            Where to next?
          </h1>
        </div>

        <form onSubmit={handleGenerate} className="space-y-10 rounded-[24px] bg-surface p-8 lg:p-12 shadow-2xl">

          {/* Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            <div className="space-y-3 sm:col-span-2">
              <Label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                Country
              </Label>
              <select
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="h-14 w-full rounded-full border border-border bg-background px-6 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%23666' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-3 sm:col-span-3">
              <Label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                City / Destination
              </Label>
              <div className="relative">
                <MapPin className="absolute left-5 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                <Input
                  type="text"
                  placeholder="e.g., Udaipur, Cherrapunji, Coorg..."
                  className="h-14 rounded-full border border-border bg-background pl-12 pr-6 text-sm text-text-primary shadow-none focus-visible:ring-1 focus-visible:ring-primary/20"
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <Label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Travel Interests
            </Label>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={cn(
                    "rounded-full px-6 py-3 text-sm font-bold transition-all active:scale-95",
                    formData.interests.includes(interest)
                      ? "bg-primary text-white border-transparent shadow-[0_0_20px_-5px_rgba(4,122,115,0.4)]"
                      : "bg-transparent border border-border text-text-secondary hover:text-text-primary hover:border-text-muted"
                  )}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Dates, Budget, Travelers */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <Label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                Trip Dates
              </Label>
              <DateRangePicker 
                date={formData.dateRange}
                setDate={(dateRange) => setFormData(prev => ({ ...prev, dateRange }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                  Budget (INR)
                </Label>
                <Input
                  type="number"
                  placeholder="₹15,000"
                  className="h-14 rounded-full border border-border bg-background px-6 text-sm text-text-primary shadow-none focus-visible:ring-1 focus-visible:ring-primary/20"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
              <div className="space-y-4">
                <Label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                  Travelers
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  className="h-14 rounded-full border border-border bg-background px-6 text-sm text-text-primary shadow-none focus-visible:ring-1 focus-visible:ring-primary/20"
                  value={formData.travelers}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelers: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Generate Button + Agent Progress */}
          <div className="pt-8 text-center flex flex-col items-center">
            <Button
              type="submit"
              disabled={agentPhase !== "idle" && agentPhase !== "error"}
              className={cn(
                "group h-16 w-full max-w-sm rounded-full text-lg font-bold text-white transition-all",
                agentPhase === "idle" || agentPhase === "error"
                  ? "bg-primary hover:bg-primary-hover hover:-translate-y-1 shadow-[0_0_40px_-10px_rgba(4,122,115,0.5)]"
                  : "bg-primary/70 cursor-not-allowed"
              )}
            >
              {agentPhase === "idle" || agentPhase === "error" ? (
                <>
                  <span>Generate with AI</span>
                  <Sparkles className="ml-2 size-5 transition-transform group-hover:rotate-12" />
                </>
              ) : agentPhase === "done" ? (
                <>
                  <CheckCircle2 className="mr-2 size-5" />
                  <span>Redirecting to your itinerary...</span>
                </>
              ) : (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  <span>AI agents working...</span>
                </>
              )}
            </Button>

            {/* Agent Progress Strip */}
            <div className="mt-8 flex items-center justify-center gap-8 border-t border-border/50 pt-8 w-full">
              <AgentPhaseBadge
                label="Discovery"
                state={
                  agentPhase === "discovery" ? "active"
                  : agentPhase === "research" || agentPhase === "planning" || agentPhase === "done" ? "done"
                  : "idle"
                }
              />
              <AgentPhaseBadge
                label="Research"
                state={
                  agentPhase === "research" ? "active"
                  : agentPhase === "planning" || agentPhase === "done" ? "done"
                  : "idle"
                }
              />
              <AgentPhaseBadge
                label="Planning"
                state={
                  agentPhase === "planning" ? "active"
                  : agentPhase === "done" ? "done"
                  : "idle"
                }
              />
            </div>

            {/* Agent Log */}
            {agentLog.length > 0 && agentPhase !== "idle" && agentPhase !== "error" && (
              <div className="mt-6 w-full max-w-md space-y-1.5">
                {agentLog.map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-text-muted animate-fade-up"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {i === agentLog.length - 1 && agentPhase !== "done" ? (
                      <Loader2 className="size-3 animate-spin shrink-0 text-primary" />
                    ) : (
                      <CheckCircle2 className="size-3 shrink-0 text-success" />
                    )}
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

function AgentPhaseBadge({ label, state }: {
  label: string
  state: "idle" | "active" | "done"
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "flex size-10 items-center justify-center rounded-full border transition-all duration-500",
        state === "idle" && "border-border bg-background",
        state === "active" && "border-primary bg-primary/10 shadow-[0_0_15px_rgba(4,122,115,0.4)]",
        state === "done" && "border-success bg-success/10",
      )}>
        {state === "active" ? (
          <Loader2 className="size-4 text-primary animate-spin" />
        ) : state === "done" ? (
          <CheckCircle2 className="size-4 text-success" />
        ) : (
          <div className="size-2.5 rounded-full bg-text-muted" />
        )}
      </div>
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-wider transition-colors",
        state === "active" ? "text-primary" : state === "done" ? "text-success" : "text-text-muted",
      )}>
        {label}
      </span>
    </div>
  )
}
