"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TripOverview({ tripId }: { tripId?: string }) {
  return (
    <div className="p-8 lg:p-12 bg-background h-full">
      <div className="mx-auto max-w-7xl space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          Itinerary View Screen
        </h1>

        <div className="flex items-center gap-6 border border-border rounded-full bg-surface p-2 pr-6 max-w-5xl">
          <Button variant="ghost" className="rounded-full font-bold text-lg px-8 hover:bg-surface-raised">Group by</Button>
          <Button variant="ghost" className="rounded-full font-bold text-lg px-8 hover:bg-surface-raised">Filter</Button>
          <Button variant="ghost" className="rounded-full font-bold text-lg px-8 hover:bg-surface-raised">Sort by...</Button>
          <div className="flex-1 relative ml-4">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
            <Input 
              placeholder="Search bar ......" 
              className="h-12 w-full rounded-full border-none bg-background pl-12 pr-6 text-lg text-text-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main List */}
          <div className="lg:col-span-3 space-y-12">
            {[1, 2, 3].map((day) => (
              <div key={day} className="space-y-6">
                <h2 className="font-serif text-3xl font-bold text-text-primary">Day {day}</h2>
                <div className="space-y-4">
                   <div className="rounded-[24px] border border-border bg-surface p-8 flex items-center justify-between">
                     <h3 className="text-2xl font-bold text-text-primary">Option and its details</h3>
                     <span className="text-xl font-bold text-text-secondary">View</span>
                   </div>
                   {day === 2 && (
                     <div className="rounded-[24px] border border-border bg-surface p-8 flex items-center justify-between">
                       <h3 className="text-2xl font-bold text-text-primary">Option and its details</h3>
                       <span className="text-xl font-bold text-text-secondary">View</span>
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar: Budget */}
          <div className="lg:col-span-1">
             <div className="rounded-[24px] border border-border bg-surface p-8 space-y-8 sticky top-8">
                <h3 className="font-serif text-3xl font-bold text-text-primary mb-6">budget Insights</h3>
                <div className="size-48 mx-auto rounded-full border-8 border-primary flex items-center justify-center">
                   <span className="text-xl font-bold">Chart</span>
                </div>
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="text-xl font-bold text-text-primary">Total Budget: 20000</h4>
                  <h4 className="text-xl font-bold text-text-primary">total spent: 22000</h4>
                  <h4 className="text-xl font-bold text-error">Remaining: -2000</h4>
                </div>
                <Button className="w-full rounded-full h-14 bg-primary text-white font-bold text-lg mt-8">
                  View Full Budget
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
