import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <div className="p-8 lg:p-12 h-full flex flex-col bg-background">
      <div className="mx-auto max-w-5xl w-full space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          User Profile Pages
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column: Image */}
          <div className="w-64 shrink-0 space-y-4">
            <div className="size-64 rounded-full border-4 border-border bg-surface overflow-hidden flex items-center justify-center">
              <span className="text-xl text-text-muted">Image of the User</span>
            </div>
            <div className="space-y-2">
               <h3 className="text-2xl font-bold text-text-primary">User Details with appropriate option to edit those information....</h3>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-2xl font-bold text-text-primary">First Name</span>
                <Input className="h-16 rounded-full border border-border bg-surface px-6 text-lg" />
              </div>
              <div className="space-y-4">
                <span className="text-2xl font-bold text-text-primary">Last Name</span>
                <Input className="h-16 rounded-full border border-border bg-surface px-6 text-lg" />
              </div>
              <div className="space-y-4">
                <span className="text-2xl font-bold text-text-primary">Email Address</span>
                <Input type="email" className="h-16 rounded-full border border-border bg-surface px-6 text-lg" />
              </div>
              <div className="space-y-4">
                <span className="text-2xl font-bold text-text-primary">Phone Number</span>
                <Input type="tel" className="h-16 rounded-full border border-border bg-surface px-6 text-lg" />
              </div>
              <div className="space-y-4">
                <span className="text-2xl font-bold text-text-primary">City</span>
                <Input className="h-16 rounded-full border border-border bg-surface px-6 text-lg" />
              </div>
              <div className="space-y-4">
                <span className="text-2xl font-bold text-text-primary">Country</span>
                <Input className="h-16 rounded-full border border-border bg-surface px-6 text-lg" />
              </div>
            </div>
            
            <div className="space-y-4">
              <span className="text-2xl font-bold text-text-primary">Additional Information ....</span>
              <textarea className="min-h-32 w-full rounded-[24px] border border-border bg-surface p-6 text-lg resize-none" />
            </div>
          </div>
        </div>

        <div className="pt-12 space-y-12">
          {/* Preplanned Trips */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-text-primary">Preplanned Trips</h2>
            <div className="rounded-[24px] border border-border bg-surface p-12 min-h-[16rem] flex items-center justify-center">
              <h3 className="text-[3rem] font-bold text-text-secondary text-center leading-tight">Short Over View of the Trip</h3>
            </div>
          </div>

          {/* Previous Trips */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-text-primary">Previous Trips</h2>
            <div className="rounded-[24px] border border-border bg-surface p-12 min-h-[16rem] flex items-center justify-center">
              <h3 className="text-[3rem] font-bold text-text-secondary text-center leading-tight">Short Over View of the Trip</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
