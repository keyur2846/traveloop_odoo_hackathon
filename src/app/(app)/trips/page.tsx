import * as React from "react"

export default function TripsPage() {
  return (
    <div className="p-8 lg:p-12 h-full flex flex-col bg-background">
      <div className="mx-auto max-w-5xl w-full space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          User Trip Listing
        </h1>

        <div className="space-y-12">
          {/* Ongoing */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-text-primary">Ongoing</h2>
            <div className="rounded-[24px] border border-border bg-surface p-12 min-h-[16rem] flex items-center justify-center">
              <h3 className="text-[3rem] font-bold text-text-secondary text-center leading-tight">Short Over View of the Trip</h3>
            </div>
          </div>

          {/* Upcoming */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-text-primary">Up-coming</h2>
            <div className="rounded-[24px] border border-border bg-surface p-12 min-h-[16rem] flex items-center justify-center">
              <h3 className="text-[3rem] font-bold text-text-secondary text-center leading-tight">Short Over View of the Trip</h3>
            </div>
          </div>

          {/* Completed */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-text-primary">Completed</h2>
            <div className="rounded-[24px] border border-border bg-surface p-12 min-h-[16rem] flex items-center justify-center">
              <h3 className="text-[3rem] font-bold text-text-secondary text-center leading-tight">Short Over View of the Trip</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
