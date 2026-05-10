"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
  date,
  setDate,
  className,
}: {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
  className?: string
}) {
  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h-14 w-full justify-start text-left font-normal rounded-full border-border bg-background px-6 hover:bg-surface-raised transition-all shadow-none",
                !date && "text-text-muted"
              )}
            >
              <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
              <div className="flex items-center gap-2">
                {date?.from ? (
                  date.to ? (
                    <>
                      <span className="font-bold text-text-primary">{format(date.from, "LLL dd, yyyy")}</span>
                      <ArrowRight className="h-3 w-3 text-text-muted" />
                      <span className="font-bold text-text-primary">{format(date.to, "LLL dd, yyyy")}</span>
                    </>
                  ) : (
                    <span className="font-bold text-text-primary">{format(date.from, "LLL dd, yyyy")}</span>
                  )
                ) : (
                  <span className="text-sm font-medium">Select trip dates</span>
                )}
              </div>
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
