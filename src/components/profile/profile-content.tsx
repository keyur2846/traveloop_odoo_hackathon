"use client"

import * as React from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { 
  Map, 
  Calendar, 
  IndianRupee, 
  ChevronRight, 
  LogOut, 
  Settings, 
  Shield, 
  Bell, 
  Edit3,
  Globe
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ProfileContent({ user }: { user: any }) {
  const interests = ["Nature", "Hidden Gems", "Food", "Relaxed"]
  
  const stats = [
    { label: "Trips Completed", value: "3", icon: Map, color: "bg-primary-soft text-primary" },
    { label: "Cities Visited", value: "8", icon: Globe, color: "bg-ocean-soft text-ocean" },
    { label: "Days Traveled", value: "24", icon: Calendar, color: "bg-saffron-soft text-saffron" },
    { label: "Total Spent", value: "₹42,500", icon: IndianRupee, color: "bg-success-soft text-success" },
  ]

  return (
    <div className="p-8 lg:p-12">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Profile Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center animate-fade-up">
          <div className="relative group">
            <Avatar size="lg" fallback="KS" className="size-24 border-4 border-white shadow-xl" />
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 active:scale-95">
              <Edit3 className="size-3.5" />
            </button>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="font-serif text-3xl font-medium text-text-primary">Keyur Shah</h1>
              <p className="text-sm text-text-muted">keyur@email.com · Member since May 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs text-text-secondary">
                <span className="font-bold text-text-primary">+91 98765 43210</span>
              </p>
              <div className="size-1 rounded-full bg-border" />
              <button className="text-xs font-bold text-primary hover:underline">Edit Profile</button>
            </div>
          </div>

          <Button variant="outline" className="hidden md:flex gap-2 border-border text-text-secondary h-10 px-6">
            <Settings className="size-4" />
            Account Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Preferences & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className={cn("mb-4 flex size-10 items-center justify-center rounded-lg", stat.color)}>
                    <stat.icon className="size-5" />
                  </div>
                  <p className="font-mono text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Travel Preferences */}
            <div className="rounded-xl border border-border bg-surface p-8 shadow-sm animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-text-primary">Travel Preferences</h2>
                <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Update</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {interests.map(i => (
                  <Chip key={i} selected className="px-4 py-2 text-xs">{i}</Chip>
                ))}
              </div>
              <p className="mt-6 text-sm text-text-secondary leading-relaxed">
                Your Planning Agent uses these preferences to rank experiences and 
                budget allocations during discovery.
              </p>
            </div>
          </div>

          {/* Right: Settings Menu */}
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border bg-surface-raised">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Account Settings</h3>
              </div>
              <div className="divide-y divide-border">
                <SettingRow icon={Shield} label="Privacy & Security" />
                <SettingRow icon={Bell} label="Notifications" />
                <SettingRow icon={Settings} label="Connected Apps" />
              </div>
            </div>

            <Button variant="ghost" className="w-full justify-start gap-3 text-coral hover:bg-coral-soft hover:text-coral transition-colors h-12 px-4 rounded-xl">
              <LogOut className="size-4" />
              <span className="font-bold text-sm">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingRow({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex w-full items-center justify-between p-4 transition-colors hover:bg-surface-raised group">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-text-muted group-hover:text-primary transition-colors" />
        <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>
      </div>
      <ChevronRight className="size-4 text-text-muted" />
    </button>
  )
}
