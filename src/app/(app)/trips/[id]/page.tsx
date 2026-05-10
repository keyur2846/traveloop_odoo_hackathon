import { TripOverview } from "@/components/itinerary/trip-overview";

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex-1 overflow-auto bg-background">
      <TripOverview tripId={id} />
    </div>
  );
}
