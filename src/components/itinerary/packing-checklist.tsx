"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function PackingChecklist({ tripId }: { tripId?: string }) {
  return (
    <div className="p-8 lg:p-12 bg-background h-full">
      <div className="mx-auto max-w-6xl space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          Packing Checklist
        </h1>

        <div className="flex items-center justify-between border-b border-border pb-6">
          <h2 className="text-2xl font-bold text-text-primary">Trip: Paris & Rome Adventure</h2>
          <span className="text-xl font-bold text-text-secondary">Progress: 5/12 items packed</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Documents */}
          <div className="rounded-[24px] border border-border bg-surface p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-text-primary">Documents</h3>
              <span className="text-xl font-bold text-text-secondary">3/4</span>
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-primary rounded bg-primary/20" /> Passport</div>
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-primary rounded bg-primary/20" /> flight Tickets (printed)</div>
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-primary rounded bg-primary/20" /> Travel insurance</div>
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-border rounded" /> hotel booking confirmation</div>
            </div>
          </div>

          {/* Clothing */}
          <div className="rounded-[24px] border border-border bg-surface p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-text-primary">Clothing</h3>
              <span className="text-xl font-bold text-text-secondary">1/4</span>
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-primary rounded bg-primary/20" /> Casual Shirts</div>
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-border rounded" /> Trousers / jeans</div>
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-border rounded" /> Comfortable waking shoes</div>
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-border rounded" /> light jacket / windbreaker</div>
            </div>
          </div>

          {/* Electronics */}
          <div className="rounded-[24px] border border-border bg-surface p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-text-primary">Electronics</h3>
              <span className="text-xl font-bold text-text-secondary">1/3</span>
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-primary rounded bg-primary/20" /> Phone charger</div>
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-border rounded" /> Universal power adapter</div>
               <div className="flex items-center gap-4 text-xl text-text-primary"><span className="size-6 border-2 border-border rounded" /> Earphone / headphones</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-6">
          <Button variant="outline" className="h-14 rounded-full font-bold text-lg px-8 border-dashed border-border hover:bg-surface-raised">+ add item to checklist</Button>
          <div className="flex-1" />
          <Button variant="ghost" className="h-14 rounded-full font-bold text-lg px-8 hover:bg-surface-raised">Reset all</Button>
          <Button variant="outline" className="h-14 rounded-full font-bold text-lg px-8 border-border hover:bg-surface-raised">Share Checklist</Button>
          <Button className="h-14 rounded-full font-bold text-lg px-8 bg-primary text-white hover:bg-primary-hover">Export as PDF</Button>
        </div>
      </div>
    </div>
  )
}
