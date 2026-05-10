import { TripForm } from "@/components/trips/trip-form";

export default function NewTripPage() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <TripForm />
      </div>
    </div>
  );
}
