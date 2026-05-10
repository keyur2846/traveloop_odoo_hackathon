"use client"

import * as React from "react"
import { Trip } from "@/lib/types"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle2, TrendingDown, Hotel, UtensilsCrossed, Car, Mountain, MoreHorizontal } from "lucide-react"

export function BudgetBreakdown({ trip }: { trip: Trip }) {
  const percentage = Math.round((trip.spentAmount / trip.totalBudget) * 100)
  const isOver = trip.spentAmount > trip.totalBudget
  
  const categories = [
    { label: "Accommodation", amount: 45000, icon: Hotel, color: "bg-ocean" },
    { label: "Food & Drinks", amount: 28000, icon: UtensilsCrossed, color: "bg-coral" },
    { label: "Activities", amount: 32000, icon: Mountain, color: "bg-saffron" },
    { label: "Transport", amount: 15000, icon: Car, color: "bg-primary" },
    { label: "Miscellaneous", amount: 10000, icon: MoreHorizontal, color: "bg-text-muted" },
  ]

  return (
    <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
      <h2 className="mb-8 font-serif text-2xl font-medium text-text-primary">Budget Breakdown</h2>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Overall Stat */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Total Spent</p>
                <p className={cn(
                  "font-mono text-[2.5rem] font-bold leading-none",
                  isOver ? "text-error" : "text-success"
                )}>
                  ₹{trip.spentAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Budget</p>
                <p className="font-mono text-lg font-medium text-text-primary">₹{trip.totalBudget.toLocaleString()}</p>
              </div>
            </div>

            <div className="relative h-3 w-full rounded-full bg-surface-raised overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-1000",
                  isOver ? "bg-error" : percentage > 85 ? "bg-coral" : "bg-success"
                )}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-text-muted">{percentage}% used</span>
              <span className={isOver ? "text-error" : "text-success"}>
                {isOver 
                  ? `₹${(trip.spentAmount - trip.totalBudget).toLocaleString()} over`
                  : `₹${(trip.totalBudget - trip.spentAmount).toLocaleString()} remaining`}
              </span>
            </div>
          </div>

          {isOver ? (
            <div className="flex items-start gap-4 rounded-xl bg-error/5 border border-error/10 p-4">
              <AlertTriangle className="size-5 shrink-0 text-error" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-error">Budget Overrun</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  You have exceeded your planned budget by ₹{(trip.spentAmount - trip.totalBudget).toLocaleString()}. 
                  Consider reviewing your miscellaneous expenses or activities.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4 rounded-xl bg-success/5 border border-success/10 p-4">
              <CheckCircle2 className="size-5 shrink-0 text-success" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-success">Within Budget</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Excellent! You are currently ₹{(trip.totalBudget - trip.spentAmount).toLocaleString()} under budget. 
                  Your Planning Agent is tracking your daily expenses effectively.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Categorized stats */}
        <div className="space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Expenses by Category</p>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <div className={cn("size-2 rounded-full", cat.color)} />
                    <span className="text-text-primary">{cat.label}</span>
                  </div>
                  <span className="text-text-secondary font-mono">₹{cat.amount.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-raised">
                  <div 
                    className={cn("h-full rounded-full opacity-60", cat.color)}
                    style={{ width: `${(cat.amount / trip.spentAmount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
