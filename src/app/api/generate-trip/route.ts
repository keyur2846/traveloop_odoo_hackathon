// Local dev fallback — mimics the Supabase edge function response
// In production, this is handled by supabase/functions/generate-trip

import { NextResponse } from "next/server";
import { mockTrips } from "@/lib/mock/trips";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { destination = "Unknown", startDate, endDate } = body;

  // Simulate agent processing delay
  await new Promise((r) => setTimeout(r, 1500));

  // Find a matching mock trip or use the first one
  const trip = mockTrips.find(
    (t) => t.destination.toLowerCase().includes(destination.toLowerCase())
  ) || mockTrips[0];

  if (!trip) {
    return NextResponse.json(
      { error: "No matching trip found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    trip_id: trip.id,
    destination,
    itinerary: { days: trip.itinerary },
    budget_breakdown: {
      hotel: Math.round(trip.totalBudget * 0.35),
      transport: Math.round(trip.totalBudget * 0.25),
      food: Math.round(trip.totalBudget * 0.20),
      activities: Math.round(trip.totalBudget * 0.15),
      shopping: Math.round(trip.totalBudget * 0.03),
      other: Math.round(trip.totalBudget * 0.02),
      total: trip.totalBudget,
    },
    images: [trip.coverImage],
    recommendations: [],
    agent_log: [
      `Discovery Agent: Found ${destination} — highly rated destination`,
      `Research Agent: Found 12 activities and 5 food spots`,
      `Planning Agent: Built ${trip.itinerary.length}-day itinerary within budget`,
    ],
  });
}
