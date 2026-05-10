"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean
}

export function Chip({ className, selected, children, ...props }: ChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-all active:scale-95",
        selected
          ? "bg-primary-soft text-primary border-transparent"
          : "bg-surface border border-border text-text-secondary hover:border-primary-soft hover:bg-surface-raised",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
