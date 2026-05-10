"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, UI, SelectionState, DayFlag } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        [UI.Months]: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        [UI.Month]: "space-y-4",
        [UI.MonthCaption]: "flex justify-center pt-1 relative items-center px-8",
        [UI.CaptionLabel]: "text-sm font-bold text-text-primary",
        [UI.Nav]: "space-x-1 flex items-center",
        [UI.PreviousMonthButton]: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-border"
        ),
        [UI.NextMonthButton]: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-border"
        ),
        [UI.MonthGrid]: "w-full border-collapse space-y-1",
        [UI.Weekdays]: "flex",
        [UI.Weekday]:
          "text-text-muted rounded-md w-9 font-bold text-[10px] uppercase tracking-wider text-center",
        [UI.Weeks]: "space-y-2 mt-2",
        [UI.Week]: "flex w-full mt-2",
        [UI.Day]: cn(
          "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          // Background for range middle to make it continuous
          "data-[selection-state=range_middle]:bg-primary/10",
          "data-[selection-state=range_start]:bg-primary/10 data-[selection-state=range_start]:rounded-l-full",
          "data-[selection-state=range_end]:bg-primary/10 data-[selection-state=range_end]:rounded-r-full"
        ),
        [UI.DayButton]: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal transition-all rounded-full hover:bg-primary/20 hover:text-primary",
          "data-[selected]:bg-primary data-[selected]:text-white data-[selected]:hover:bg-primary data-[selected]:hover:text-white data-[selected]:opacity-100"
        ),
        [SelectionState.selected]: "bg-primary text-white",
        [DayFlag.today]: "bg-surface-raised text-primary font-bold",
        [DayFlag.outside]: "text-text-muted opacity-50",
        [DayFlag.disabled]: "text-text-muted opacity-50",
        [SelectionState.range_start]: "bg-primary text-white rounded-full",
        [SelectionState.range_end]: "bg-primary text-white rounded-full",
        [SelectionState.range_middle]: "text-primary font-medium",
        [DayFlag.hidden]: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left") return <ChevronLeft className="h-4 w-4" />
          return <ChevronRight className="h-4 w-4" />
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
