import { TripNotes } from "@/components/itinerary/trip-notes";

export default async function NotesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex-1 overflow-auto bg-background">
      <TripNotes tripId={id} />
    </div>
  );
}
