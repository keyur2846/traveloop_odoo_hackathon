import { BuildItineraryContent } from "@/components/itinerary/build-itinerary-content";

export default async function BuildItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="h-full bg-background">
      <BuildItineraryContent tripId={id} />
    </div>
  );
}
