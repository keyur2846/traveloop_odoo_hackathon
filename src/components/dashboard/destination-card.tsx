"use client"

import * as React from "react"
import { Users, Calendar, ArrowRight } from "lucide-react"
import { Destination } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DestinationCardProps {
  destination: Destination
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {destination.badges.includes("ai-match") && (
            <Badge variant="ai-match">AI Match {destination.aiMatchScore}%</Badge>
          )}
          {destination.badges.includes("hidden-gem") && (
            <Badge variant="hidden-gem">Hidden Gem</Badge>
          )}
          {!destination.badges.includes("hidden-gem") && destination.badges.includes("budget-friendly") && (
            <Badge variant="budget-friendly">Budget Friendly</Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
          {destination.category}
        </span>
        <h3 className="mt-1 font-serif text-lg font-medium text-text-primary">
          {destination.name}
        </h3>
        
        <div className="mt-4 grid grid-cols-2 gap-y-3">
          <div className="flex items-center gap-2">
            <Users className="size-3 text-text-muted" />
            <span className="text-xs text-text-secondary capitalize">{destination.crowdLevel} crowd</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-3 text-text-muted" />
            <span className="text-xs text-text-secondary">{destination.bestSeason}</span>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 font-mono text-xs font-medium text-text-primary">
            <span className="text-primary">₹{destination.estimatedCost.toLocaleString()}</span>
            <span className="text-text-muted font-sans font-normal">/ day estimated</span>
          </div>
        </div>

        <button className="mt-5 flex items-center gap-1 text-sm font-medium text-ocean transition-colors hover:text-primary">
          View Details <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
