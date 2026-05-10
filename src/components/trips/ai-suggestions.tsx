"use client"

import * as React from "react"
import { Sparkles, MapPin, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { topDestinations } from "@/lib/mock/destinations"

export function AISuggestions() {
  const suggestions = topDestinations.slice(0, 3)

  return (
    <div className="animate-reveal-up space-y-8 rounded-[24px] border border-border bg-surface p-8 lg:p-12 shadow-2xl mt-12">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-primary" />
          <h2 className="font-serif text-3xl font-bold text-text-primary uppercase tracking-tight">Suggestions</h2>
        </div>
        <span className="rounded-full border border-border bg-background px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
          Based on preferences
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {suggestions.map((dest) => (
          <div 
            key={dest.id}
            className="group flex flex-col sm:flex-row gap-6 overflow-hidden rounded-[24px] border border-border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(255,107,53,0.15)]"
          >
            <div className="h-48 w-full sm:h-auto sm:w-48 shrink-0 overflow-hidden rounded-[16px]">
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <div className="flex flex-1 flex-col py-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">{dest.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                    <MapPin className="size-3.5" />
                    <span>{dest.country}</span>
                  </div>
                </div>
                <Badge variant="ai-match" className="rounded-full px-3 py-1 font-bold">
                  {dest.aiMatchScore}% Match
                </Badge>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-text-secondary">
                <span className="rounded-full bg-surface px-3 py-1.5 border border-border">₹{dest.estimatedCost.toLocaleString()} est.</span>
                <span className="rounded-full bg-surface px-3 py-1.5 border border-border">{dest.crowdLevel} crowd</span>
              </div>
              
              <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                {dest.description}
              </p>

              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-primary transition-colors">
                  View Details <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button className="h-14 px-10 rounded-full bg-primary text-white font-bold text-base hover:bg-primary-hover shadow-[0_0_20px_rgba(255,107,53,0.3)]">
          Select This Trip
        </Button>
        <button className="text-sm font-bold text-text-muted hover:text-text-primary transition-colors underline underline-offset-4">
          Show More Options
        </button>
      </div>
    </div>
  )
}
