"use client"

import * as React from "react"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export function FilterBar() {
  const [activeTab, setActiveTab] = React.useState("All")
  const categories = ["All", "Cities", "Activities", "Food", "Adventure", "Culture"]

  return (
    <div className="sticky top-16 z-20 -mx-8 bg-background/80 px-8 py-4 backdrop-blur-md lg:-mx-12 lg:px-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all",
                activeTab === cat
                  ? "bg-text-primary text-white shadow-md"
                  : "bg-surface border border-border text-text-muted hover:border-text-muted hover:text-text-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <FilterDropdown label="AI Match" value="High to Low" />
          <FilterDropdown label="Budget" value="Any" />
          <FilterDropdown label="Season" value="Oct-Mar" />
          
          <div className="h-8 w-px bg-border" />
          
          <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface-raised">
            <SlidersHorizontal className="size-3.5" />
            Filters
          </button>
        </div>
      </div>
    </div>
  )
}

function FilterDropdown({ label, value }: { label: string, value: string }) {
  return (
    <button className="group flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-xs transition-colors hover:bg-surface-raised">
      <span className="text-text-muted">{label}:</span>
      <span className="font-semibold text-text-primary">{value}</span>
      <ChevronDown className="size-3 text-text-muted transition-transform group-hover:translate-y-0.5" />
    </button>
  )
}
