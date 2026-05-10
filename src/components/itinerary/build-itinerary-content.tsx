"use client"

import * as React from "react"
import { ExternalLink, Clock, IndianRupee, Users, Star, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { createClient } from "@/lib/supabase/client"
import { mockTrips } from "@/lib/mock/trips"
import { cn } from "@/lib/utils"
import type { Recommendation } from "@/lib/types"

interface Activity {
  id: string
  name: string
  type: string
  time: string
  cost: number
  notes?: string
  image?: string
}

interface Day {
  day: number
  date: string
  activities: Activity[]
}

interface BudgetBreakdown {
  hotel: number
  transport: number
  food: number
  activities: number
  shopping: number
  other: number
  total: number
  spent?: number
}

const TYPE_COLORS: Record<string, string> = {
  sightseeing: "bg-blue-100 text-blue-800 border-blue-200",
  food: "bg-orange-100 text-orange-800 border-orange-200",
  adventure: "bg-green-100 text-green-800 border-green-200",
  culture: "bg-purple-100 text-purple-800 border-purple-200",
  transport: "bg-slate-100 text-slate-800 border-slate-200",
  hotel: "bg-indigo-100 text-indigo-800 border-indigo-200",
}

const CROWD_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)
}

const EDGE_URL = "https://gtwrknkmntpgryqjcjwu.supabase.co/functions/v1/generate-trip"

export function BuildItineraryContent({ tripId }: { tripId: string }) {
  const [days, setDays] = React.useState<Day[]>([])
  const [recommendations, setRecommendations] = React.useState<Recommendation[]>([])
  const [budget, setBudget] = React.useState<BudgetBreakdown | null>(null)
  const [tripTitle, setTripTitle] = React.useState("")
  const [tripDestination, setTripDestination] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    async function loadData() {
      try {
        // Check for cached recommendations from create flow
        const cachedRecs = sessionStorage.getItem(`recs-${tripId}`)
        if (cachedRecs) {
          try {
            setRecommendations(JSON.parse(cachedRecs))
            sessionStorage.removeItem(`recs-${tripId}`)
          } catch { /* ignore */ }
        }

        // Check for cached trip data
        const cachedTrip = sessionStorage.getItem(`trip-${tripId}`)
        if (cachedTrip) {
          try {
            const parsed = JSON.parse(cachedTrip)
            if (parsed.itinerary?.days) setDays(parsed.itinerary.days)
            if (parsed.budget_breakdown) setBudget(parsed.budget_breakdown)
            if (parsed.destination) setTripDestination(parsed.destination)
            sessionStorage.removeItem(`trip-${tripId}`)
            setLoading(false)
            return
          } catch { /* ignore */ }
        }

        // Fallback: try fetching from Supabase
        if (tripId !== "demo-trip") {
          const supabase = createClient()
          const { data: trip } = await supabase
            .from("trips")
            .select("*, trip_days(id, day_number, date, trip_activities(*))")
            .eq("id", tripId)
            .single()

          if (trip) {
            setTripTitle(trip.title)
            setTripDestination(trip.destination)
            const mappedDays: Day[] = (trip.trip_days || [])
              .sort((a: any, b: any) => a.day_number - b.day_number)
              .map((day: any) => ({
                day: day.day_number,
                date: day.date,
                activities: (day.trip_activities || [])
                  .sort((a: any, b: any) => a.sort_order - b.sort_order)
                  .map((a: any) => ({
                    id: a.id,
                    name: a.name,
                    type: a.type || "sightseeing",
                    time: a.start_time?.slice(0, 5) || "",
                    cost: a.cost || 0,
                    notes: a.notes,
                  })),
              }))
            setDays(mappedDays)
            setBudget({
              hotel: Math.round(trip.total_budget * 0.35),
              transport: Math.round(trip.total_budget * 0.25),
              food: Math.round(trip.total_budget * 0.20),
              activities: Math.round(trip.total_budget * 0.15),
              shopping: Math.round(trip.total_budget * 0.03),
              other: Math.round(trip.total_budget * 0.02),
              total: trip.total_budget,
            })
            setLoading(false)
            return
          }
        }

        // Last resort: use mock data
        const mockTrip = mockTrips[0]
        setTripTitle(mockTrip.title)
        setTripDestination(mockTrip.destination)
        setDays(mockTrip.itinerary)
        setBudget({
          hotel: Math.round(mockTrip.totalBudget * 0.35),
          transport: Math.round(mockTrip.totalBudget * 0.25),
          food: Math.round(mockTrip.totalBudget * 0.20),
          activities: Math.round(mockTrip.totalBudget * 0.15),
          shopping: Math.round(mockTrip.totalBudget * 0.03),
          other: Math.round(mockTrip.totalBudget * 0.02),
          total: mockTrip.totalBudget,
        })
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [tripId])

  const spentAmount = budget?.spent || days.reduce((acc, day) =>
    acc + day.activities.reduce((a, act) => a + act.cost, 0), 0)
  const remaining = budget ? budget.total - spentAmount : 0
  const percentSpent = budget ? Math.round((spentAmount / budget.total) * 100) : 0
  const isOverBudget = remaining < 0

  if (loading) {
    return (
      <div className="p-8 lg:p-12 space-y-8">
        <Skeleton className="h-16 w-96" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full rounded-[24px]" />)}
          </div>
          <Skeleton className="h-48 rounded-[24px]" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 lg:p-12 flex items-center justify-center h-full">
        <Card className="p-8 text-center max-w-md">
          <p className="text-lg text-coral font-bold mb-2">Failed to load itinerary</p>
          <p className="text-sm text-text-muted">{error}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 lg:p-12 h-full flex flex-col bg-background">
      <div className="mx-auto max-w-7xl w-full">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                AI-Generated Itinerary
              </span>
            </div>
            <h1 className="font-serif text-[3rem] font-bold leading-none text-text-primary tracking-tight">
              {tripTitle || "Your Trip Plan"}
            </h1>
            {tripDestination && <p className="text-sm text-text-muted">{tripDestination}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Day-by-day itinerary */}
          <div className="lg:col-span-3 space-y-8">
            {days.length === 0 && (
              <Card className="p-12 text-center border-dashed border-2">
                <p className="text-lg text-text-muted">No itinerary yet. Generate a trip to get started.</p>
              </Card>
            )}

            {days.map((day) => (
              <Card key={day.day} className="rounded-[24px] border border-border bg-surface p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-text-primary">Day {day.day}</h2>
                  <span className="text-sm font-medium text-text-muted">
                    {new Date(day.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
                <div className="space-y-3">
                  {day.activities.map((activity, i) => (
                    <div key={activity.id || i}
                      className="flex items-start gap-4 rounded-xl bg-background border border-border p-4 transition-colors hover:border-primary/30">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {activity.time?.slice(0, 5) || "—"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-text-primary">{activity.name}</h3>
                          <Badge className={cn("text-[10px] border", TYPE_COLORS[activity.type] || "bg-slate-100")}>
                            {activity.type}
                          </Badge>
                        </div>
                        {activity.notes && <p className="text-sm text-text-muted mt-1">{activity.notes}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-text-primary">
                          {activity.cost > 0 ? formatCurrency(activity.cost) : "Free"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {budget && (
              <Card className="rounded-[24px] border border-border bg-surface p-8 space-y-6 sticky top-8">
                <h3 className="font-serif text-xl font-bold text-text-primary">Budget Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Total</span>
                    <span className="font-bold">{formatCurrency(budget.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Spent</span>
                    <span className="font-bold">{formatCurrency(spentAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Remaining</span>
                    <span className={cn("font-bold", isOverBudget ? "text-coral" : "text-success")}>
                      {formatCurrency(remaining)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-background overflow-hidden">
                    <div className={cn("h-full rounded-full", isOverBudget ? "bg-coral" : "bg-primary")}
                      style={{ width: `${Math.min(percentSpent, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>{percentSpent}% spent</span>
                    <span>{isOverBudget ? "Over budget" : "On track"}</span>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-border">
                  {Object.entries(budget)
                    .filter(([key]) => !["total", "spent"].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-text-muted capitalize">{key}</span>
                        <span className="text-text-secondary">{formatCurrency(value as number)}</span>
                      </div>
                    ))}
                </div>
              </Card>
            )}

            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-text-primary flex items-center gap-2">
                  <Star className="size-4 text-primary" />
                  AI Picks <span className="text-xs text-text-muted font-normal">({recommendations.length})</span>
                </h3>
                {recommendations.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <Card className="rounded-[16px] border border-border bg-surface p-5 space-y-4 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold text-text-primary text-sm">{recommendation.name}</h4>
          <span className="shrink-0 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {recommendation.confidenceScore}%
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={cn("text-[10px] border", TYPE_COLORS[recommendation.type] || "bg-slate-100")}>
            {recommendation.type}
          </Badge>
          <Badge className={cn("text-[10px]", CROWD_COLORS[recommendation.crowdLevel] || "")}>
            <Users className="size-2.5 mr-1" />{recommendation.crowdLevel} crowd
          </Badge>
          <span className="text-xs text-text-muted flex items-center gap-0.5">
            <IndianRupee className="size-2.5" />
            {recommendation.estimatedCost > 0 ? recommendation.estimatedCost.toLocaleString() : "Free"}
          </span>
        </div>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{recommendation.description}</p>
      {(recommendation.bestTimeToVisit || recommendation.tips) && (
        <div className="space-y-1.5 border-t border-border pt-3">
          {recommendation.bestTimeToVisit && (
            <p className="text-xs text-text-muted flex items-center gap-1">
              <Clock className="size-3 shrink-0" />{recommendation.bestTimeToVisit}
            </p>
          )}
          {recommendation.tips && <p className="text-xs text-text-muted">{recommendation.tips}</p>}
        </div>
      )}
      {recommendation.sources.length > 0 && (
        <div className="border-t border-border pt-3 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Sources</span>
          {recommendation.sources.map((source, i) => (
            <a key={i} href={source.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2 group rounded-lg p-2 hover:bg-background transition-colors">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary capitalize mt-0.5 shrink-0">
                {source.domain.replace("www.", "").split(".")[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                  {source.title}
                </p>
                <p className="text-[11px] text-text-muted line-clamp-2 mt-0.5">{source.snippet}</p>
              </div>
              <ExternalLink className="size-3 text-text-muted group-hover:text-primary transition-colors shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      )}
    </Card>
  )
}
