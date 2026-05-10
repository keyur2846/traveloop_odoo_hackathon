"use client"

import * as React from "react"
import { 
  UtensilsCrossed, 
  MapPin, 
  Mountain, 
  Palette, 
  Car, 
  Hotel, 
  GripVertical,
  Trash2,
  Edit2
} from "lucide-react"
import { Activity } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  activity: Activity
  isLast?: boolean
}

const typeIcons = {
  sightseeing: MapPin,
  food: UtensilsCrossed,
  adventure: Mountain,
  culture: Palette,
  transport: Car,
  hotel: Hotel
}

export function ActivityCard({ activity, isLast }: ActivityCardProps) {
  const Icon = typeIcons[activity.type] || MapPin

  return (
    <div className="group/activity relative flex gap-4 rounded-lg p-3 transition-colors hover:bg-surface-raised">
      {/* Timeline Dot */}
      <div className="absolute -left-[1.375rem] top-1/2 z-10 size-3 -translate-y-1/2 rounded-full border-2 border-surface bg-primary shadow-sm" />
      
      {/* Time Badge */}
      <div className="flex w-20 shrink-0 flex-col justify-center">
        <span className="font-mono text-[10px] font-bold text-text-muted uppercase">
          {activity.time}
        </span>
      </div>

      {/* Drag Handle */}
      <div className="flex items-center opacity-0 transition-opacity group-hover/activity:opacity-100">
        <GripVertical className="size-4 text-text-muted cursor-grab" />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center gap-4">
        {activity.image && (
          <div className="size-10 shrink-0 overflow-hidden rounded-md border border-border">
            <img src={activity.image} alt="" className="size-full object-cover" />
          </div>
        )}
        
        <div className="flex-1 space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-text-primary">{activity.name}</h4>
            <div className="flex items-center gap-1 rounded-full bg-surface-raised px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-text-muted border border-border/50">
              <Icon className="size-2.5" />
              {activity.type}
            </div>
          </div>
          {activity.notes && (
            <p className="line-clamp-1 text-xs text-text-secondary">{activity.notes}</p>
          )}
        </div>

        <div className="text-right">
          <p className="font-mono text-xs font-semibold text-text-primary">
            {activity.cost > 0 ? `₹${activity.cost.toLocaleString()}` : "Free"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover/activity:opacity-100">
          <button className="flex size-7 items-center justify-center rounded-md text-text-muted hover:bg-surface hover:text-primary transition-colors">
            <Edit2 className="size-3.5" />
          </button>
          <button className="flex size-7 items-center justify-center rounded-md text-text-muted hover:bg-error-soft hover:text-error transition-colors">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
