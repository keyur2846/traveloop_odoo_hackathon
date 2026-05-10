"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

interface AvatarProps extends AvatarPrimitive.Root.Props {
  src?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
}

function Avatar({
  className,
  src,
  fallback,
  size = "md",
  ...props
}: AvatarProps) {
  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-12",
  }

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "group/avatar relative flex shrink-0 rounded-full select-none border border-border overflow-hidden",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          data-slot="avatar-image"
          className="aspect-square size-full object-cover"
          src={src}
        />
      )}
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className={cn(
          "flex size-full items-center justify-center bg-surface-raised text-text-secondary font-medium uppercase",
          size === "sm" ? "text-[10px]" : size === "md" ? "text-xs" : "text-sm"
        )}
      >
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar }
