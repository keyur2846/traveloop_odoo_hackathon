"use client"

import * as React from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function TripFilters() {
  const [activeTab, setActiveTab] = React.useState("All")
  const tabs = ["All", "Upcoming", "Ongoing", "Completed"]

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all",
              activeTab === tab
                ? "bg-primary-soft text-primary shadow-sm"
                : "text-text-muted hover:bg-surface-raised hover:text-text-secondary"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          <Input 
            placeholder="Search trips..."
            className="h-10 rounded-full border-border bg-surface pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <Link href="/trips/new">
          <Button className="h-10 gap-2 bg-primary text-white hover:bg-primary-hover shadow-sm">
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Trip</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
