"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AdminDashboard() {
  return (
    <div className="p-8 lg:p-12 h-full flex flex-col bg-background">
      <div className="mx-auto max-w-7xl w-full space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          Admin Panel Screen
        </h1>

        <div className="flex items-center gap-6 border-b border-border pb-6">
          <Button variant="ghost" className="rounded-full font-bold text-xl px-8 hover:bg-surface-raised text-primary">Manage Users</Button>
          <Button variant="ghost" className="rounded-full font-bold text-xl px-8 hover:bg-surface-raised">Popular cities</Button>
          <Button variant="ghost" className="rounded-full font-bold text-xl px-8 hover:bg-surface-raised">Popular Activites</Button>
          <Button variant="ghost" className="rounded-full font-bold text-xl px-8 hover:bg-surface-raised">User Trends and Analytics</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Area: Image/Graph Placeholder */}
          <div className="rounded-[24px] border border-border bg-surface overflow-hidden min-h-[600px] flex items-center justify-center">
            <span className="text-xl font-bold text-text-muted">Graph / Analytics Image</span>
          </div>

          {/* Right Sidebar: Descriptions */}
          <div className="space-y-8 rounded-[24px] border border-border bg-surface p-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-text-primary">Manage User Section:</h3>
              <p className="text-lg text-text-secondary">This Section is responsible for the managing the users and their actions. This section will the admin the access to view all the trips made by the user. Also other functionalities are welcome....</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-text-primary">Popular cities:</h3>
              <p className="text-lg text-text-secondary">Lists all the popular cities where the users are visiting based on the current user trends.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-text-primary">Popular Activites:</h3>
              <p className="text-lg text-text-secondary">List all the popular activites that the users are doing based on the current user trend data.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-text-primary">User trends and Analytics:</h3>
              <p className="text-lg text-text-secondary">This section will major focus on the providing analysis accross various points and give useful information to the user.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
