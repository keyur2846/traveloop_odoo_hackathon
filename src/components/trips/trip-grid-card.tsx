"use client"

import * as React from "react"
import { MapPin, ArrowRight, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Trip } from "@/lib/types"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface TripGridCardProps {
  trip: Trip
}

export function TripGridCard({ trip }: TripGridCardProps) {
  const isOverBudget = trip.budgetStatus === "over"
  
  const statusConfig: Record<string, { color: string; label: string; icon: any; pulse?: boolean }> = {
    upcoming: { color: "bg-saffron", label: "Upcoming", icon: Clock },
    ongoing: { color: "bg-ocean", label: "Ongoing", icon: Clock, pulse: true },
    completed: { color: "bg-success", label: "Completed", icon: CheckCircle2 },
    draft: { color: "bg-text-muted", label: "Draft", icon: AlertCircle }
  }

  const status = statusConfig[trip.status]

  return (
    <div className="group overflow-hidden rounded-[24px] border border-border bg-surface transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 right-4">
          <div className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10",
            status.color.replace('bg-', 'bg-') // Simplified since Tailwind classes can be tricky to compose dynamically
          )}>
            <status.icon className={cn("size-3", status.pulse && "animate-pulse")} />
            {status.label}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-bold text-white">
          <MapPin className="size-3.5" />
          {trip.cities} cities
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">
          {trip.title}
        </h3>
        <p className="text-sm text-text-muted">
          {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
          <div className="flex items-center gap-2">
            <div className={cn(
              "size-2.5 rounded-full",
              isOverBudget ? "bg-coral" : "bg-success"
            )} />
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider",
              isOverBudget ? "text-coral" : "text-success"
            )}>
              {isOverBudget ? "Over Budget" : "On Track"}
            </span>
          </div>
          
          <Link 
            href={`/trips/${trip.id}`}
            className="flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-hover"
          >
            View Plan <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
