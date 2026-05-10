"use client"

import * as React from "react"
import { Users, Calendar, ArrowRight, Star, MapPin } from "lucide-react"
import { Destination } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface SearchResultCardProps {
  result: Destination & { 
    rating: number; 
    reviewCount: number; 
    reviewSnippet: string;
  }
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-[24px] border border-border bg-surface transition-transform hover:-translate-y-1 hover:shadow-lg md:flex-row">
      <div className="relative h-56 w-full shrink-0 md:h-auto md:w-72">
        <img
          src={result.image}
          alt={result.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {result.badges.map((badge) => (
            <Badge key={badge} variant={badge} className="px-3 py-1 font-bold rounded-full">{badge.replace('-', ' ')}</Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              {result.category}
            </span>
            <h3 className="font-serif text-2xl font-bold text-text-primary leading-tight">
              {result.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
              <MapPin className="size-4 text-text-muted" />
              {result.country}
            </div>
          </div>
          <Badge variant="ai-match" className="h-8 px-4 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
            {result.aiMatchScore}% Match
          </Badge>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Star className="size-4 fill-saffron text-saffron" />
            <span className="font-bold text-text-primary">{result.rating}</span>
            <span className="text-text-muted">({result.reviewCount.toLocaleString()} reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Users className="size-4 text-text-muted" />
            <span>{result.crowdLevel} crowd</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Calendar className="size-4 text-text-muted" />
            <span>{result.bestSeason}</span>
          </div>
        </div>

        <div className="mt-6 flex-1 rounded-[16px] bg-background p-4 border border-border">
          <p className="line-clamp-2 text-sm italic text-text-secondary leading-relaxed">
            "{result.reviewSnippet}"
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="font-mono text-lg font-bold text-text-primary">
            ₹{result.estimatedCost.toLocaleString()} <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-text-muted">est. / day</span>
          </div>
          <button className="flex items-center gap-2 rounded-full border border-border px-6 py-2 text-sm font-bold text-text-primary transition-colors hover:bg-white hover:text-black">
            View Details <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
