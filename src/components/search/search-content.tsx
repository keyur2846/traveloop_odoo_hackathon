"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchContent() {
  return (
    <div className="p-8 lg:p-12 bg-background h-full">
      <div className="mx-auto max-w-6xl space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          Activity Search Pages / City Search Page
        </h1>

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

        <div className="space-y-8">
          <div className="flex items-end gap-6 mb-8">
            <h2 className="font-serif text-[3.5rem] font-bold text-text-primary leading-none">Paragliding</h2>
            <span className="text-3xl font-bold text-text-secondary mb-1">Results</span>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[24px] border border-border bg-surface p-10">
                <h3 className="text-[3rem] font-bold text-text-primary">Option and its details</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
