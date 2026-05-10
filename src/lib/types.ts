// Core domain types for Traveloop
export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;            // Unsplash URL
  category: string;          // "Lakes & Food", "Nature Route", "Cafe Trail", etc.
  aiMatchScore: number;      // 0-100
  estimatedCost: number;     // in INR
  crowdLevel: "low" | "medium" | "high";
  bestSeason: string;        // "June-August", "October-March", etc.
  badges: BadgeType[];
  description: string;
}

export type BadgeType = "ai-match" | "hidden-gem" | "budget-friendly" | "great-in-season" | "route-map";

export type TripStatus = "upcoming" | "ongoing" | "completed" | "draft";
export type BudgetStatus = "under" | "on-track" | "over";

export interface Trip {
  id: string;
  title: string;
  coverImage: string;
  destination: string;
  startDate: string;
  endDate: string;
  cities: number;
  totalBudget: number;
  spentAmount: number;
  status: TripStatus;
  budgetStatus: BudgetStatus;
  itinerary: ItineraryDay[];
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  name: string;
  type: "sightseeing" | "food" | "adventure" | "culture" | "transport" | "hotel";
  time: string;
  cost: number;
  notes?: string;
  image?: string;
}

export interface AIAgentStatus {
  name: string;              // "Discovery Agent", "Research Agent", "Planning Agent"
  state: "idle" | "thinking" | "good-match" | "needs-attention" | "problem";
  message: string;
}

// Source-backed recommendation types (from AI agents)
export interface SourceEvidence {
  title: string;              // "TripAdvisor: Top 10 Things to Do in Udaipur"
  url: string;                // Full URL to the source
  snippet: string;            // Relevant excerpt from the source
  domain: string;             // "tripadvisor.com", "makemytrip.com", etc.
  relevanceScore: number;     // 0-100
}

export interface Recommendation {
  id: string;
  name: string;
  type: "sightseeing" | "food" | "adventure" | "culture" | "transport" | "hotel";
  description: string;
  confidenceScore: number;    // 0-100, cross-source agreement
  crowdLevel: "low" | "medium" | "high";
  estimatedCost: number;      // in INR
  bestTimeToVisit?: string;   // "Early morning", "Sunset", etc.
  tips?: string;              // Practical advice from sources
  sources: SourceEvidence[];
  image?: string;
}
