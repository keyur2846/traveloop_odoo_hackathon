"use client"

import * as React from "react"
import { MoreVertical, Plus, Trash2 } from "lucide-react"
import { ItineraryDay } from "@/lib/types"
import { ActivityCard } from "./activity-card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DayCardProps {
  day: ItineraryDay
}

export function DayCard({ day }: DayCardProps) {
  const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const dayTotal = day.activities.reduce((acc, act) => acc + act.cost, 0)

  return (
    <div className="group/day relative animate-fade-up">
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
        {/* Day Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-medium text-text-primary">
              Day {day.day} <span className="mx-2 text-text-muted">/</span> 
              <span className="text-lg text-text-secondary font-normal">{formattedDate}</span>
            </h3>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
              {day.activities.length} Activities
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Day Total</p>
              <p className="font-mono text-sm font-semibold text-text-primary">₹{dayTotal.toLocaleString()}</p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="size-8 text-text-muted hover:text-text-primary">
                  <MoreVertical className="size-4" />
                </Button>
              } />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Date</DropdownMenuItem>
                <DropdownMenuItem className="text-error">Remove Day</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Activities List */}
        <div className="relative space-y-1 pl-4">
          {/* Timeline Line */}
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-surface-raised" />
          
          {day.activities.map((activity, index) => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              isLast={index === day.activities.length - 1} 
            />
          ))}

          {/* Add Activity Button */}
          <button className="mt-4 flex w-full items-center gap-3 rounded-lg border border-dashed border-border p-3 text-sm text-text-muted transition-all hover:border-primary-soft hover:bg-surface-raised hover:text-primary">
            <div className="flex size-6 items-center justify-center rounded-full bg-surface-raised border border-border">
              <Plus className="size-3" />
            </div>
            Add Activity
          </button>
        </div>
      </div>
    </div>
  )
}
