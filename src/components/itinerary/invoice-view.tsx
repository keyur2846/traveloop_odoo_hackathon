"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function InvoiceView({ tripId }: { tripId?: string }) {
  return (
    <div className="p-8 lg:p-12 bg-background h-full">
      <div className="mx-auto max-w-5xl space-y-12">
        <h1 className="font-serif text-[4rem] font-bold leading-none text-text-primary tracking-tight">
          Expense Invoice
        </h1>

        <div className="rounded-[24px] border border-border bg-surface p-12 space-y-12 shadow-2xl">
           <div className="flex justify-between items-start border-b border-border pb-8">
             <div className="space-y-2">
                <h2 className="font-serif text-3xl font-bold text-text-primary">Trip to Europe Adventure</h2>
                <p className="text-text-secondary text-lg">May 15 - Jan 05, 2025 - 4 cities</p>
                <p className="text-text-secondary text-lg">created by James</p>
             </div>
             <div className="text-right space-y-2">
                <h2 className="text-2xl font-bold text-text-primary">Invoice Id</h2>
                <p className="text-text-secondary font-mono">INV-xyz-30290</p>
                <div className="pt-4 space-y-1 text-right">
                   <h3 className="text-lg font-bold text-text-primary">Traveler Details:</h3>
                   <p className="text-text-secondary">James</p>
                   <p className="text-text-secondary">Arjun</p>
                   <p className="text-text-secondary">Jerry</p>
                   <p className="text-text-secondary">Cristina</p>
                </div>
             </div>
             <div className="text-right space-y-2">
                <h2 className="text-2xl font-bold text-text-primary">Generated date</h2>
                <p className="text-text-secondary">May 20, 2025</p>
                <div className="pt-4">
                   <p className="text-text-secondary">Payment status - <span className="text-warning font-bold">pending</span></p>
                </div>
             </div>
           </div>

           {/* Table */}
           <div className="space-y-4">
             <div className="grid grid-cols-7 gap-4 border-b border-border pb-4 text-sm font-bold text-text-muted uppercase tracking-wider">
                <div>#</div>
                <div>Category</div>
                <div className="col-span-2">Description</div>
                <div>Qty/details</div>
                <div>Unit Cost</div>
                <div>Amount</div>
             </div>
             
             <div className="grid grid-cols-7 gap-4 py-4 border-b border-border/50 items-center">
                <div className="text-lg font-medium text-text-secondary">1</div>
                <div className="text-lg font-medium text-text-secondary">hotel</div>
                <div className="col-span-2 text-lg font-bold text-text-primary">hotel booking paris</div>
                <div className="text-lg font-medium text-text-secondary">3 nights</div>
                <div className="text-lg font-medium text-text-secondary">3000</div>
                <div className="text-lg font-bold text-text-primary">9000</div>
             </div>

             <div className="grid grid-cols-7 gap-4 py-4 border-b border-border/50 items-center">
                <div className="text-lg font-medium text-text-secondary">2</div>
                <div className="text-lg font-medium text-text-secondary">travel</div>
                <div className="col-span-2 text-lg font-bold text-text-primary">flight bookings (DEL -&gt; PAR)</div>
                <div className="text-lg font-medium text-text-secondary">1</div>
                <div className="text-lg font-medium text-text-secondary">12000</div>
                <div className="text-lg font-bold text-text-primary">12000</div>
             </div>
           </div>

           {/* Totals */}
           <div className="flex justify-end pt-8">
             <div className="w-80 space-y-4">
               <div className="flex justify-between text-lg text-text-secondary">
                 <span>Subtotal</span>
                 <span>$ 21000</span>
               </div>
               <div className="flex justify-between text-lg text-text-secondary">
                 <span>tax(5%)</span>
                 <span>$ 1050</span>
               </div>
               <div className="flex justify-between text-lg text-text-secondary">
                 <span>Discount</span>
                 <span>$ 50</span>
               </div>
               <div className="flex justify-between text-2xl font-bold text-text-primary pt-4 border-t border-border">
                 <span>Grand Total</span>
                 <span>$ 22000</span>
               </div>
             </div>
           </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-6 pt-6">
          <Button variant="ghost" className="h-14 rounded-full font-bold text-lg px-8 hover:bg-surface-raised">back to My Trips</Button>
          <Button variant="outline" className="h-14 rounded-full font-bold text-lg px-8 border-border hover:bg-surface-raised">Download Invoice</Button>
          <Button className="h-14 rounded-full font-bold text-lg px-8 bg-primary text-white hover:bg-primary-hover shadow-[0_0_20px_rgba(255,107,53,0.3)] border-none">Mark as paid</Button>
        </div>
      </div>
    </div>
  )
}
