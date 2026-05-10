"use client"

import * as React from "react"
import { Heart, MapPin, Compass, Clock, Plane, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function DashboardContent() {
  const [activeFilter, setActiveFilter] = React.useState("All tours")
  const filters = ["All tours", "Asia", "Europe", "USA"]

  const destinations = [
    { name: "Spain", image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80", price: 1399, days: 4, hotels: 14, tags: ["Partner discount ✨"] },
    { name: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", price: 1650, days: 7, hotels: 27, tags: ["Partner discount ✨"] },
    { name: "Italy", image: "https://images.unsplash.com/photo-1516483638261-f408892608bd?w=800&q=80", price: 1969, days: 6, hotels: 12, tags: ["Partner discount ✨"] },
    { name: "Switzerland", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80", price: 2000, days: 10, hotels: 22, tags: ["Partner discount ✨"] },
  ]

  return (
    <div className="p-8 lg:p-12 animate-fade-up">
      <div className="mx-auto max-w-7xl">
        
        {/* SVG Wireframe Layout Match: Hero & Search at the very top */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="border-l-4 border-primary pl-6">
            <h1 className="font-serif text-[3.5rem] font-bold leading-none text-text-primary tracking-tight uppercase">
              Plan Your <br /> Next Trip
            </h1>
          </div>
          <div className="flex justify-end">
            <Link 
              href="/trips/new" 
              className="group relative flex h-16 items-center gap-4 overflow-hidden rounded-full bg-primary px-10 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-white uppercase tracking-wider">Add New Trip</span>
                <div className="flex size-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-90">
                  <Plus className="size-5 text-white" />
                </div>
              </div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>

        {/* Content Grid: 2 Columns for main content (Left) and 1 Column for Featured (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Recommended & Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-3xl font-medium text-text-primary">Top Regional Selections</h2>
              
              {/* Filter Bar aligned right */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-text-muted">Group by</span>
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-medium transition-colors",
                      activeFilter === filter
                        ? "bg-primary text-white"
                        : "border border-border text-text-muted hover:text-text-primary hover:border-text-muted"
                    )}
                  >
                    {filter}
                  </button>
                ))}
                <span className="text-sm font-bold text-text-muted ml-4">Sort by...</span>
              </div>
            </div>

            {/* Destination Grid (2x2 as per wireframe) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinations.map(dest => (
                <div key={dest.name} className="group relative rounded-[24px] bg-surface p-3 transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden rounded-[16px]">
                    <img src={dest.image} alt={dest.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                      Partner discount <span className="text-primary text-xs">✧</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-2xl font-bold text-text-primary mb-1">{dest.name}</h3>
                    <p className="text-sm text-text-muted">
                      From ${dest.price} / {dest.days} days <br />
                      {dest.hotels} recommended hotels
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Previous Trips Section (Matching wireframe) */}
            <div className="pt-8">
              <h2 className="font-serif text-3xl font-medium text-text-primary mb-6">Previous Trips</h2>
              {/* Placeholder for previous trip cards - matching the UI stack */}
              <div className="rounded-[24px] bg-surface p-6 border border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="size-16 rounded-xl bg-surface-raised overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80" className="size-full object-cover" />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold text-text-primary">Paris Retreat</h4>
                     <p className="text-sm text-text-muted">May 12 - May 18, 2024</p>
                   </div>
                </div>
                <Button variant="outline" className="rounded-full text-text-primary border-border hover:bg-white hover:text-black">
                  View Itinerary
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Large Card (Matching SVG "Banner Image" & "Safari" wireframe) */}
          <div className="space-y-6">
            
            {/* Large Featured Safari */}
            <div className="rounded-[24px] bg-surface overflow-hidden border border-border">
              <div className="relative h-72 w-full">
                <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80" className="size-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-primary transition-colors">
                  <Heart className="size-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-serif text-[1.75rem] leading-tight font-bold text-text-primary mb-2">Safari & Wildlife <br /> Adventure in Kenya</h3>
                  <div className="flex items-center gap-1.5 text-sm text-text-muted">
                    <MapPin className="size-4" /> Maasai Mara National Reserve, Kenya
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=1" className="border-2 border-surface" />
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=2" className="border-2 border-surface" />
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=3" className="border-2 border-surface" />
                    <div className="flex size-6 items-center justify-center rounded-full border-2 border-surface bg-primary text-[10px] font-bold text-white z-10">
                      +2
                    </div>
                  </div>
                  <span className="text-xs text-text-muted font-medium">6 friends been there</span>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                  Embark on a once-in-a-lifetime safari adventure in the heart of Kenya's iconic Maasai Mara. Witness breatht... <span className="text-primary hover:underline cursor-pointer">Read more</span>
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-raised py-3 text-xs font-medium text-text-primary">
                    <span className="text-text-muted">📅</span> 7 days, 6 nights
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-raised py-3 text-xs font-medium text-text-primary">
                    <span className="text-text-muted">👥</span> 2 persons
                  </div>
                </div>

                <div className="flex items-end justify-between pt-2">
                  <span className="text-lg font-medium text-text-muted line-through">$1959</span>
                  <div className="text-right">
                    <span className="text-[2rem] font-bold text-text-primary">$1659</span>
                    <span className="text-sm text-text-muted"> /person</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1 h-12 rounded-full border-text-muted text-text-primary hover:bg-white hover:text-black font-bold">
                    Learn more
                  </Button>
                  <Button className="flex-1 h-12 rounded-full bg-primary text-white hover:bg-primary-hover font-bold border-none">
                    Check dates
                  </Button>
                </div>
              </div>
            </div>

            {/* Small Featured  */}
            <div className="rounded-[24px] bg-surface p-6 flex flex-col gap-4 border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-xl font-bold text-text-primary">Paradise in Bali</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-bold text-saffron"><StarIcon /> 4.9</span>
                    <span className="rounded-full bg-surface-raised px-3 py-1 text-[10px] font-medium text-text-secondary uppercase tracking-wider border border-border">All year-round</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-text-primary">$1250</p>
                  <p className="text-xs text-text-muted">/6 days</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Boutique villa accommodation, airport transfers, daily yoga classes, tra... <span className="text-primary hover:underline cursor-pointer">Read more</span>
              </p>
              <div className="grid grid-cols-3 gap-2 h-20">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" className="size-full rounded-lg object-cover" />
                <img src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80" className="size-full rounded-lg object-cover" />
                <img src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=400&q=80" className="size-full rounded-lg object-cover" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}
