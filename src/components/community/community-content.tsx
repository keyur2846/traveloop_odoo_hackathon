"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CommunityContent() {
  return (
    <div className="p-8 lg:p-12 bg-background h-full">
      <div className="mx-auto max-w-6xl space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          Community tab Screen
        </h1>
        <h2 className="font-serif text-[3.5rem] font-bold leading-none text-text-secondary tracking-tight">
          Community tab
        </h2>

        <div className="flex items-center gap-6 border border-border rounded-full bg-surface p-2 pr-6">
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

        <div className="space-y-8 pt-8">
          <div className="rounded-[24px] border border-border bg-surface p-12 text-center max-w-4xl mx-auto">
            <p className="text-2xl font-bold text-text-primary leading-relaxed">
              Community section where all the users can share their experience about a certain trip or activity.
              <br /><br />
              Using the search, groupby or filter and sortby option, the user can narrow down the result that he is looking for...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
