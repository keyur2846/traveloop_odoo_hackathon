import { InvoiceView } from "@/components/itinerary/invoice-view";
import { mockTrips } from "@/lib/mock/trips";
import { notFound } from "next/navigation";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = mockTrips.find(t => t.id === id);
  if (!trip) return notFound();

  return (
    <div className="flex-1 overflow-auto bg-background p-8 lg:p-12">
      <InvoiceView />
    </div>
  );
}
