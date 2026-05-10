"use client"

import * as React from "react"
import { MapPin, ArrowRight } from "lucide-react"
import { Trip } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TripCardProps {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  const isOverBudget = trip.budgetStatus === "over"
  const isUpcoming = trip.status === "upcoming"
  const isOngoing = trip.status === "ongoing"

  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:shadow-sm md:flex-row">
      <div className="relative size-full shrink-0 overflow-hidden rounded-lg md:size-28">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={cn(
          "absolute top-2 right-2 size-2 rounded-full",
          isOngoing ? "bg-ocean animate-pulse" : isUpcoming ? "bg-saffron" : "bg-success"
        )} />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <h3 className="font-serif text-lg font-medium text-text-primary">{trip.title}</h3>
        
        <div className="mt-1 flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <MapPin className="size-3" />
            <span>{trip.cities} cities</span>
          </div>
          <span className="text-xs text-text-muted">
            {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-xs font-medium",
              isOverBudget ? "text-coral" : "text-success"
            )}>
              {isOverBudget ? "Over Budget" : "On Track"}
            </span>
            <span className="text-[10px] text-text-muted">
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </span>
          </div>
          
          <button className="flex items-center gap-1 text-sm font-medium text-ocean transition-colors hover:text-primary">
            View Plan <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
