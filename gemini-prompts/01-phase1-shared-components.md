# Screen Prompts — Phase 1: Shared Components & Infrastructure

## What to Build

Before building any screens, create these shared components and data files. They'll be used by all subsequent screens.

---

## Task 1.1: Create TypeScript Types

**Create**: `src/lib/types.ts`

Define these interfaces:

```ts
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
```

---

## Task 1.2: Create Mock Data

### Create: `src/lib/mock/destinations.ts`

Export `topDestinations` array with 5 Destination objects:
1. **Udaipur Lakes & Food** — Rajasthan, lake palace image, 94% match, ₹8,500, low crowd, Oct-Mar, [ai-match, hidden-gem]
2. **Meghalaya Nature Route** — living root bridges, 89% match, ₹12,000, low crowd, Oct-May, [hidden-gem, budget-friendly]
3. **Coorg Cafe Trail** — Karnataka coffee plantations, 87% match, ₹9,200, medium crowd, Sep-Mar, [budget-friendly, great-in-season]
4. **Jaipur Culture Weekend** — Rajasthan heritage, 82% match, ₹7,800, medium crowd, Oct-Mar, [ai-match, great-in-season]
5. **Rishikesh Adventure** — Uttarakhand river rafting, 91% match, ₹6,500, high crowd, Sep-Nov, [budget-friendly]

Export `popularActivities` array with 5 activities: Paragliding (Bir Billing), Scuba Diving (Andaman), Trekking (Hampta Pass), Wildlife Safari (Jim Corbett), Heritage Walk (Varanasi). Each with name, location, image, category, cost, rating.

### Create: `src/lib/mock/trips.ts`

Export `mockTrips` array with 3 Trip objects:
1. **Paris & Rome Adventure** — completed, May 20-Jun 5 2025, 4 cities, budget 20,000 spent 22,000 (over budget)
2. **Kerala Backwaters** — upcoming, Aug 15-22 2025, 3 cities, budget 15,000 spent 0
3. **Goa Beach Getaway** — ongoing, "now", 2 cities, budget 8,000 spent 4,500 (on track)

Each trip should have full itinerary data with 2-3 days of activities.

---

## Task 1.3: Create Reusable UI Components

### Create: `src/components/ui/badge.tsx`

A badge/chip component with variants matching the travel recommendation badges:
- `variant`: "ai-match" | "hidden-gem" | "budget-friendly" | "great-in-season" | "route-map" | "success" | "warning" | "error"
- Each variant maps to the correct background/text colors from the design system
- Renders as a small rounded-full pill with `text-xs font-medium px-2.5 py-0.5`
- Accepts `icon` prop (lucide icon) and `children`

### Create: `src/components/ui/chip.tsx`

An interest/selection chip (larger than badge, clickable):
- Two visual states: default (white bg, border) and selected (pale teal bg, teal text)
- `selected` boolean prop
- `onClick` handler
- Renders with `rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-colors`
- Include a subtle scale animation on click

### Create: `src/components/ui/avatar.tsx`

User avatar with:
- `src` (image URL)
- `fallback` (initials)
- `size`: "sm" | "md" | "lg"
- Circular, with a subtle border

### Create: `src/components/ui/skeleton.tsx`

Loading skeleton with pulse animation:
- `className` for sizing
- Simple div with `animate-pulse rounded-md bg-surface-raised`

### Create: `src/components/ui/separator.tsx`

Horizontal divider: `<div className="h-px w-full bg-border" />`

---

## Task 1.4: Enhance App Shell Layout

### Modify: `src/app/(app)/layout.tsx`

Transform the basic header into a full dashboard toolbar:

**Header design** (64px height, white surface, bottom border):
- **Left** (flex, items-center, gap-3):
  - Traveloop logo: Teal rounded square with white Compass icon (32x32, `rounded-lg bg-primary`)
  - Brand name: "Traveloop" in font-serif, text-text-primary, text-lg font-medium
- **Center** (flex-1, max-w-2xl, mx-auto):
  - Global search input: rounded-full, bg-surface-raised, border-border, with Search icon on left
  - Placeholder: "Search destinations, trips, or experiences..."
  - 40px height, subtle focus ring in teal
- **Right** (flex, items-center, gap-2):
  - Filter button with SlidersHorizontal icon
  - Sort dropdown: "Sort by..." with ChevronDown
  - Notification bell icon (Bell) with a small red dot indicator
  - User avatar (32px) with dropdown menu trigger

**Below header**: Main content area with `flex-1 overflow-auto bg-background`

**Nav links**: Dashboard, Trips, Community (as before)

---

## Task 1.5: Add Missing shadcn Components

Run: `npx shadcn add badge select sheet tabs avatar dropdown-menu skeleton separator`

This will add the following to `src/components/ui/`:
- `badge.tsx`, `select.tsx`, `sheet.tsx`, `tabs.tsx`, `avatar.tsx`, `dropdown-menu.tsx`, `skeleton.tsx`, `separator.tsx`

(Only add what the CLI supports — if some fail, that's OK, we have custom versions.)

---

## Visual Quality Targets

The enhanced app header should feel like a **dashboard toolbar**, not a marketing navbar. It should be:
- Compact (64px height)
- Clean (white surface, single bottom border)
- Functional (search is prominent, not hidden)
- Professional (subtle icon buttons, no text-heavy nav)

Reference the login form's quality — same fonts, same color usage, same attention to detail.
