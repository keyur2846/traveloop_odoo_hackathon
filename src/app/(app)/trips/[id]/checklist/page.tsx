import { PackingChecklist } from "@/components/itinerary/packing-checklist";

export default async function ChecklistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex-1 overflow-auto bg-background">
      <PackingChecklist tripId={id} />
    </div>
  );
}
