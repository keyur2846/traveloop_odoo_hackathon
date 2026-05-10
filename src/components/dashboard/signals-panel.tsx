"use client"

import * as React from "react"
import { Sparkles, FileText, MessageSquare, Gem, ShieldCheck, ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function SignalsPanel() {
  return (
    <div className="sticky top-24 w-80 space-y-6">
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <h2 className="font-serif text-lg font-medium text-text-primary">AI Travel Signals</h2>
        </div>

        <div className="space-y-5">
          <SignalItem 
            icon={FileText} 
            label="3.8K travel stories matched" 
            delay={0.1}
          />
          <SignalItem 
            icon={MessageSquare} 
            label="1.2M reviews scanned" 
            delay={0.2}
          />
          <SignalItem 
            icon={Gem} 
            label="12 hidden gems found" 
            iconColor="text-coral"
            delay={0.3}
          />
          <SignalItem 
            icon={ShieldCheck} 
            label="Budget risk: Low" 
            iconColor="text-success"
            delay={0.4}
          />
        </div>

        <Separator className="my-6" />

        <div className="group cursor-pointer rounded-lg bg-primary-soft p-4 transition-all hover:bg-primary/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Try This</span>
          <p className="mt-2 font-serif text-sm italic text-text-primary leading-relaxed">
            "Udaipur for food + lakes under budget"
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
            Explore now <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SignalItem({ 
  icon: Icon, 
  label, 
  iconColor = "text-text-muted",
  delay 
}: { 
  icon: any, 
  label: string, 
  iconColor?: string,
  delay: number 
}) {
  return (
    <div 
      className="flex items-center gap-3 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex size-8 items-center justify-center rounded-lg bg-surface-raised">
        <Icon className={`size-4 ${iconColor}`} />
      </div>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  )
}
