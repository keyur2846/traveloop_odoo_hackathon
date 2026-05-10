"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BudgetBarProps {
  totalBudget: number
  spentAmount: number
}

export function BudgetBar({ totalBudget, spentAmount }: BudgetBarProps) {
  const percentage = Math.min(Math.round((spentAmount / totalBudget) * 100), 110)
  const remaining = totalBudget - spentAmount
  
  let statusColor = "bg-success"
  let textColor = "text-success"
  let message = "Looking good! You're under budget."

  if (percentage > 100) {
    statusColor = "bg-error"
    textColor = "text-error"
    message = "You've exceeded your budget."
  } else if (percentage > 85) {
    statusColor = "bg-coral"
    textColor = "text-coral"
    message = "Careful, you're nearly at your limit."
  } else if (percentage > 60) {
    statusColor = "bg-saffron"
    textColor = "text-saffron"
    message = "Budget is on track, keep it up."
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="mb-6 font-serif text-lg font-medium text-text-primary">Budget Overview</h2>
      
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Total Budget</p>
          <p className="font-mono text-lg font-medium text-text-primary">₹{totalBudget.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Spent</p>
          <p className={cn("font-mono text-lg font-medium", textColor)}>₹{spentAmount.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-text-secondary">Progress</span>
          <span className={textColor}>{percentage}%</span>
        </div>
        <div className="relative h-2.5 w-full rounded-full bg-surface-raised overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-500", statusColor)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg bg-surface-raised p-3 border border-border/50">
        <div className={cn("size-2 rounded-full", statusColor)} />
        <p className="text-xs text-text-secondary">{message}</p>
      </div>

      {remaining < 0 && (
        <p className="mt-3 text-center text-xs font-medium text-error">
          Exceeded by ₹{Math.abs(remaining).toLocaleString()}
        </p>
      )}
    </div>
  )
}
