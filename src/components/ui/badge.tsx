import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border-border text-foreground",
        "ai-match": "bg-primary-soft text-primary",
        "hidden-gem": "bg-coral-soft text-coral",
        "budget-friendly": "bg-success-soft text-success",
        "great-in-season": "bg-saffron-soft text-saffron",
        "route-map": "bg-ocean-soft text-ocean",
        success: "bg-success-soft text-success",
        warning: "bg-saffron-soft text-saffron",
        error: "bg-coral-soft text-coral",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps extends useRender.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  icon?: LucideIcon
}

function Badge({
  className,
  variant = "default",
  render,
  icon: Icon,
  children,
  ...props
}: BadgeProps) {
  const innerContent = (
    <>
      {Icon && <Icon className="size-3" />}
      {children}
    </>
  )

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        children: innerContent,
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
