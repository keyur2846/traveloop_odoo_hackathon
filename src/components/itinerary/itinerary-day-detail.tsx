"use client"

import * as React from "react"
import { UtensilsCrossed, MapPin, Mountain, Palette, Car, Hotel, Clock } from "lucide-react"
import { ItineraryDay, Activity } from "@/lib/types"
import { cn } from "@/lib/utils"

const typeIcons = {
  sightseeing: MapPin,
  food: UtensilsCrossed,
  adventure: Mountain,
  culture: Palette,
  transport: Car,
  hotel: Hotel
}

export function ItineraryDayDetail({ day }: { day: ItineraryDay }) {
  const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="relative pl-8 animate-fade-up">
      {/* Timeline vertical line */}
      <div className="absolute left-0 top-0 h-full w-px bg-border/60" />
      
      {/* Day Marker */}
      <div className="absolute -left-[5px] top-0 size-2.5 rounded-full border-2 border-background bg-primary" />

      <div className="mb-8 space-y-6">
        <div className="flex items-baseline gap-4">
          <h3 className="font-serif text-2xl font-medium text-text-primary">Day {day.day}</h3>
          <span className="text-sm font-medium text-text-muted">{formattedDate}</span>
        </div>

        <div className="space-y-4">
          {day.activities.map((activity) => {
            const Icon = typeIcons[activity.type] || MapPin
            return (
              <div 
                key={activity.id} 
                className="group relative flex gap-6 rounded-xl border border-transparent bg-surface p-5 shadow-sm transition-all hover:border-border hover:shadow-md"
              >
                <div className="flex w-20 shrink-0 flex-col gap-1">
                  <span className="font-mono text-xs font-bold text-text-primary uppercase tracking-tighter">
                    {activity.time}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {activity.type}
                  </span>
                </div>

                <div className="flex flex-1 gap-4">
                  {activity.image && (
                    <div className="size-20 shrink-0 overflow-hidden rounded-lg">
                      <img src={activity.image} alt="" className="size-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-medium text-text-primary">{activity.name}</h4>
                    {activity.notes && (
                      <p className="text-sm text-text-secondary leading-relaxed">{activity.notes}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Icon className="size-3" />
                      ₹{activity.cost.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
