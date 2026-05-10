"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function TripNotes({ tripId }: { tripId?: string }) {
  return (
    <div className="p-8 lg:p-12 bg-background h-full">
      <div className="mx-auto max-w-5xl space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          Trip notes
        </h1>

        <div className="flex items-center justify-between border-b border-border pb-6">
          <h2 className="text-2xl font-bold text-text-primary">Trip: Paris & Rome Adventure</h2>
          <div className="flex items-center gap-4">
             <Button variant="ghost" className="rounded-full font-bold text-lg hover:bg-surface-raised text-primary">All</Button>
             <Button variant="ghost" className="rounded-full font-bold text-lg hover:bg-surface-raised">by Day</Button>
             <Button variant="ghost" className="rounded-full font-bold text-lg hover:bg-surface-raised">by stop</Button>
          </div>
        </div>

        <div className="space-y-6">
           <div className="rounded-[24px] border border-border bg-surface p-8 flex gap-8">
              <div className="size-32 rounded-xl bg-surface-raised flex-shrink-0 flex items-center justify-center text-text-muted border border-border">
                Image
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-text-primary">Hotel check-in details - Rome stop</h3>
                <p className="text-lg text-text-secondary">check in after 2pm, room 302, breakfast included (7-10am)</p>
                <p className="text-sm font-bold text-text-muted">Day 3: June 14 2025</p>
              </div>
           </div>
           
           <div className="rounded-[24px] border border-border bg-surface p-8 flex gap-8">
              <div className="size-32 rounded-xl bg-surface-raised flex-shrink-0 flex items-center justify-center text-text-muted border border-border">
                Image
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-text-primary">Hotel check-in details - Rome stop</h3>
                <p className="text-lg text-text-secondary">check in after 2pm, room 302, breakfast included (7-10am)</p>
                <p className="text-sm font-bold text-text-muted">Day 3: June 14 2025</p>
              </div>
           </div>
        </div>

        <div className="flex justify-center pt-8">
           <Button className="h-16 rounded-full font-bold text-xl px-12 bg-primary text-white hover:bg-primary-hover shadow-[0_0_20px_rgba(255,107,53,0.3)]">
             + Add Note
           </Button>
        </div>
      </div>
    </div>
  )
}
