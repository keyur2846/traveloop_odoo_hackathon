"use client"

import * as React from "react"
import { Sparkles, Leaf, UtensilsCrossed, Gem, IndianRupee, Coffee, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

export function AIPromptBox() {
  const [prompt, setPrompt] = React.useState("")
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>(["Nature", "Hidden Gems"])
  const [isThinking, setIsThinking] = React.useState(false)

  const interests = [
    { id: "nature", label: "Nature", icon: Leaf },
    { id: "food", label: "Food", icon: UtensilsCrossed },
    { id: "gems", label: "Hidden Gems", icon: Gem },
    { id: "budget", label: "Budget Friendly", icon: IndianRupee },
    { id: "relaxed", label: "Relaxed", icon: Coffee },
  ]

  const toggleInterest = (label: string) => {
    setSelectedInterests(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    )
  }

  const handleExplore = () => {
    setIsThinking(true)
    setTimeout(() => setIsThinking(false), 2000)
  }

  return (
    <div className="w-full animate-fade-up">
      <div className="rounded-xl border border-border bg-surface p-8 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">AI Discovery</span>
        </div>

        <h1 className="mb-2 font-serif text-4xl font-medium text-text-primary">
          Where should I go next?
        </h1>
        <p className="mb-8 text-text-secondary">
          Tell Traveloop your mood, budget, dates, and interests. Our AI agents discover real travel experiences and turn them into a plan.
        </p>

        <div className="relative mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 5 days from Ahmedabad, nature + food, under INR 25,000, less crowded..."
            className="min-h-32 w-full resize-none rounded-xl border border-border bg-surface p-4 text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {interests.map((interest) => {
            const Icon = interest.icon
            return (
              <Chip
                key={interest.id}
                selected={selectedInterests.includes(interest.label)}
                onClick={() => toggleInterest(interest.label)}
                className="gap-2"
              >
                <Icon className="size-3.5" />
                {interest.label}
              </Chip>
            )
          })}
        </div>

        <div className="flex flex-col gap-6">
          <Button 
            onClick={handleExplore}
            className="group h-12 w-full max-w-xs gap-2 bg-primary text-white shadow-[0_8px_20px_-6px_rgba(4,122,115,0.4)] transition-all hover:bg-primary-hover hover:-translate-y-0.5"
          >
            <span>Explore with AI</span>
            <Sparkles className={cn("size-4 transition-transform group-hover:rotate-12", isThinking && "animate-pulse")} />
            <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <div className="flex flex-wrap gap-6 border-t border-border pt-6">
            <AgentIndicator label="Discovery Agent" state={isThinking ? "thinking" : "idle"} />
            <AgentIndicator label="Review Signals" state="idle" />
            <AgentIndicator label="Budget Fit" state="idle" />
            <AgentIndicator label="Itinerary Ready" state="idle" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AgentIndicator({ label, state }: { label: string, state: "idle" | "thinking" | "ready" }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "size-2 rounded-full",
        state === "idle" && "bg-text-muted",
        state === "thinking" && "bg-ocean animate-pulse",
        state === "ready" && "bg-success"
      )} />
      <span className="text-xs font-medium text-text-secondary">{label}</span>
    </div>
  )
}
