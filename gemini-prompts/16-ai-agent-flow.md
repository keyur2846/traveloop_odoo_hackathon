# Traveloop — Simple User Flow (Matching the SVG)

## The Philosophy

No chat box. No prompt engineering. The AI agents work **silently in the background** while the user interacts with normal app UI — cards, buttons, forms, lists. The user never "talks" to an AI. The AI just makes everything better automatically.

---

## The Complete User Flow (7 Clicks)

```
/login  →  /dashboard  →  /trips/new  →  /trips/[id]/build  →  /trips/[id]
```

---

### SCREEN 1: Login → Click "Sign in to Workspace"

Already built. Editorial split-screen. Email + password → Supabase auth → redirect to `/dashboard`.

---

### SCREEN 3: Dashboard (Landing Page)

**What the SVG shows** (not a chat box):

```
┌──────────────────────────────────────────────────────────┐
│ [Header: Traveloop  |  🔍 Search  |  🔔  |  👤]         │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              🌍 Where to next?                     │  │
│  │                                                    │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │  🔍  Search destinations...                   │  │  │
│  │  └──────────────────────────────────────────────┘  │  │
│  │                                                    │  │
│  │  [🏷️ Nature] [🍜 Food] [💎 Hidden Gems] [💰 Budget]│  │  │
│  │                                                    │  │
│  │  [+ Plan a New Trip]    [View All Trips →]        │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Popular Cities                    Popular Activities    │
│  ┌────────┐ ┌────────┐ ┌──────┐  ┌────────┐ ┌────────┐ │
│  │🖼️ Udaipur│ │🖼️ Megha-│ │🖼️Coorg│  │🖼️Paraglid│ │🖼️Scuba │ │
│  │        │ │  laya  │ │      │  │  Bir   │ │Andaman │ │
│  │ 4.8 ★  │ │ 4.6 ★  │ │4.5 ★ │  │ Billing │ │        │ │
│  │ 234    │ │ 189    │ │ 156   │  │ 4.7 ★  │ │ 4.5 ★  │ │
│  │ trips  │ │ trips  │ │ trips │  │         │ │        │ │
│  └────────┘ └────────┘ └──────┘  └────────┘ └────────┘ │
│                                                          │
│  Preplanned Trips                  Previous Trips        │
│  ┌──────────┐ ┌──────────┐       ┌────────────────────┐ │
│  │🖼️ 3-Day   │ │🖼️ 5-Day   │       │🖼️ Paris & Rome     │ │
│  │ Kerala   │ │ Rajasthan│       │ Completed · May 20 │ │
│  │ ₹12,000  │ │ ₹18,000  │       │ [View Plan →]      │ │
│  │ [Fork →] │ │ [Fork →] │       └────────────────────┘ │
│  └──────────┘ └──────────┘                               │
└──────────────────────────────────────────────────────────┘
```

**User actions on this screen:**
- Browse popular cities (data cards)
- Browse popular activities
- See preplanned trips (can fork)
- See previous trips
- Click **[+ Plan a New Trip]** → goes to Screen 4
- Click any destination card → goes to Screen 8 (search/details for that destination)
- Click a preplanned trip's **[Fork]** → clones it as their own trip → goes to Screen 5

**AI working silently here:**
- Popular cities ranking is AI-curated based on trending searches
- Preplanned trips are AI-generated templates (not user-generated, no cold start problem)

---

### SCREEN 4: Create a New Trip

**What the SVG shows:**

```
┌──────────────────────────────────────────────────────────┐
│ ← Back              Create a New Trip                    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Where do you want to go?                               │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Country: [India ▾]     City: [Search cities...]  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  When?                                                  │
│  ┌─────────────────┐    ┌─────────────────┐            │
│  │ Start Date       │    │ End Date         │            │
│  │ [📅 pick date]   │    │ [📅 pick date]    │            │
│  └─────────────────┘    └─────────────────┘            │
│                                                          │
│  Your Budget                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  ₹ [____________]  Total Budget                     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Travel Interests                                        │
│  [Nature] [Food] [Culture] [Adventure] [Budget] [Relax] │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Description (optional)                             │  │
│  │  [Tell us about your ideal trip...]                 │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  🖼️  Banner Image  [Upload or Search]              │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│              [Generate with AI →]                        │
│                                                          │
│  ⏳ Discovery Agent analyzing your preferences...       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**User actions:**
1. Select country from dropdown
2. Search/type city name
3. Pick start and end dates from date pickers
4. Enter total budget in INR
5. Click interest chips (Nature, Food, Culture, etc.) — they toggle teal
6. Optionally add description
7. Optionally upload a banner image
8. Click **[Generate with AI]** → agents run → redirect to Screen 5

**What happens when user clicks "Generate with AI":**

The button shows a loading spinner. Behind the scenes:

```
Discovery Agent triggers:
  → web_search("best places in [city] [country]")
  → web_search("[city] travel budget [budget] INR [days] days")
  → fetch_images("[city] landmarks, food, activities")
  → Returns: structured destination data

Research Agent triggers:
  → web_search("[city] top activities adventure nature food")
  → web_search("[city] hidden gems offbeat less crowded")
  → fetch_images for each activity
  → Returns: 12-15 activities with real names, prices, ratings

Planning Agent triggers:
  → Groups activities into days logically
  → web_search("[city] best itinerary [days] days route")
  → Calculates budget breakdown
  → Returns: complete day-by-day itinerary JSON
```

All three run sequentially. The UI shows a small status indicator. When done → redirect to Screen 5.

---

### SCREEN 5: Build Itinerary

**What the SVG shows:**

```
┌──────────────────────────────────────────────────────────┐
│ ← Back    Build Itinerary — Meghalaya    [Save] [Export] │
├────────────────────────────────┬─────────────────────────┤
│                                │                         │
│  DAY 1 — Oct 15, 2025         │  Budget Overview        │
│  ┌──────────────────────────┐  │  ┌───────────────────┐  │
│  │ 🕐 7:00 AM Drive to      │  │  │ Total:  ₹15,000   │  │
│  │    Cherrapunji           │  │  │ Spent:  ₹8,500    │  │
│  │    ₹1,500                │  │  │ Remain: ₹6,500    │  │
│  │                          │  │  │ ████████░░ 57%    │  │
│  │ 🕐 10:00 AM Nohkalikai   │  │  │ ✅ On Track        │  │
│  │    Falls                 │  │  └───────────────────┘  │
│  │    ₹50                   │  │                         │
│  │                          │  │  ┌───────────────────┐  │
│  │ 🕐 1:00 PM Lunch —      │  │  │ AI Suggestions:    │  │
│  │    Khasi Thali           │  │  │                   │  │
│  │    ₹300                  │  │  │ Add Seven Sisters  │  │
│  │                          │  │  │ Falls on Day 1 —  │  │
│  │ + Add Activity           │  │  │ it's on the route  │  │
│  └──────────────────────────┘  │  │ [Accept] [Ignore] │  │
│                                │  └───────────────────┘  │
│  DAY 2 — Oct 16, 2025         │                         │
│  ┌──────────────────────────┐  │  ┌───────────────────┐  │
│  │ 🕐 6:00 AM Double Decker │  │  │ ⚠️ Budget Alert:   │  │
│  │    Root Bridge Trek      │  │  │ The suggested     │  │
│  │    Free                  │  │  │ boating on Day 3   │  │
│  │ ...                       │  │  │ costs ₹1,500 more │  │
│  │ + Add Activity           │  │  │ than estimated    │  │
│  └──────────────────────────┘  │  └───────────────────┘  │
│                                │                         │
│  DAY 3 — Oct 17, 2025         │                         │
│  ┌──────────────────────────┐  │                         │
│  │ + Add Activity           │  │                         │
│  └──────────────────────────┘  │                         │
│                                │                         │
│  + Add Another Day             │                         │
└────────────────────────────────┴─────────────────────────┘
```

**User actions:**
- Review the AI-generated itinerary
- Add activities to any day (click +)
- Remove activities (click ✕)
- Reorder by dragging (optional)
- Edit activity times/costs
- See budget bar update in real-time
- **AI silently suggests** additional activities in the right panel
- **AI silently warns** about budget issues
- Click **[Save]** → saves to Supabase → redirects to Screen 9

---

### SCREEN 8: City & Activity Search (Bonus flow)

Accessed from Dashboard when user clicks a destination card instead of "Plan a Trip."

```
┌──────────────────────────────────────────────────────────┐
│ ← Dashboard    Udaipur — Lakes & Food                    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Filters: [All] [Sightseeing] [Food] [Adventure]        │
│  Sort: [AI Match ↓]   Budget: [Under ₹10K]             │
│                                                          │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │ 🖼️ City Palace    │  │ 🖼️ Lake Pichola   │             │
│  │ 🏷️ Must-See       │  │ 🏷️ Hidden Gem     │             │
│  │ ⭐ 4.7  ₹300      │  │ ⭐ 4.8  ₹500      │             │
│  │ "The palace at    │  │ "Sunset boat ride │             │
│  │  sunset was..."   │  │  was magical..."  │             │
│  │ [Add to Trip →]   │  │ [Add to Trip →]   │             │
│  └──────────────────┘  └──────────────────┘             │
│                                                          │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │ 🖼️ Ambrai Ghat    │  │ 🖼️ Local Food Walk│             │
│  │ 🏷️ Budget Friendly│  │ 🏷️ AI Match 96%  │             │
│  │ ⭐ 4.5  Free      │  │ ⭐ 4.6  ₹800      │             │
│  │ [Add to Trip →]   │  │ [Add to Trip →]   │             │
│  └──────────────────┘  └──────────────────┘             │
│                                                          │
│  ⏳ Research Agent found 23 activities · 12 food spots   │
│     · 5 hidden gems · All under your budget             │
└──────────────────────────────────────────────────────────┘
```

**AI working here:** Research Agent has already searched the web for real activities and food spots. User just browses and clicks "Add to Trip" on what they like. These get added to their trip's activity pool.

---

## Summary: The REAL User Flow (What Actually Happens)

```
SCREEN 1: /login
  User: types email, types password, clicks "Sign in to Workspace"
  System: Supabase auth, redirect to /dashboard

SCREEN 3: /dashboard  
  User: browses popular cities, sees preplanned trips, previous trips
  User: clicks [+ Plan a New Trip]
  System: navigate to /trips/new
  AI: silently ranking popular cities in background

SCREEN 4: /trips/new
  User: selects country, types city, picks dates, sets budget, clicks interests
  User: clicks [Generate with AI]
  System: shows loading spinner, calls orchestrator edge function
  AI: Discovery Agent → Research Agent → Planning Agent (sequential)
  System: redirects to /trips/[id]/build

SCREEN 5: /trips/[id]/build  
  User: reviews AI-generated day-by-day itinerary
  User: adds/removes activities, edits times, checks budget
  User: clicks [Save]
  AI: quietly suggests additions, warns about budget in side panel
  System: saves to Supabase, redirects to /trips/[id]

SCREEN 9: /trips/[id]
  User: sees full itinerary, budget breakdown, export options
```

**7 user clicks total.** The AI does the heavy lifting silently. No chat box. No prompt. Just normal app UI enhanced by agents.

---

## What The AI Agents Actually Do (Behind the Scenes)

| Agent | Triggers When | Does What | User Sees |
|-------|--------------|-----------|-----------|
| **Discovery Agent** | User submits Create Trip form | Searches web for destinations, fetches real images, estimates costs | Loading spinner on button |
| **Research Agent** | Discovery completes | Searches for activities, food spots, hidden gems | Activity cards populating in Screen 8 or flowing into itinerary |
| **Planning Agent** | Research completes | Builds day-by-day itinerary, calculates routes, budgets | Full itinerary appears on Screen 5 |

All three run as **one orchestrator edge function call**. The user clicks one button ("Generate with AI") and waits ~5-10 seconds. The agents aren't a visible chat — they're a processing pipeline.

---

## Edge Function: `generate-trip`

Single Supabase Edge Function that orchestrates all 3 agents:

```
POST /functions/v1/generate-trip
Body: {
  destination: "Cherrapunji, Meghalaya",
  country: "India", 
  startDate: "2025-10-15",
  endDate: "2025-10-20",
  budget: 15000,
  interests: ["nature", "food", "hidden-gems"],
  travelers: 2
}

Response: {
  trip_id: "...",
  itinerary: { days: [...] },
  budget_breakdown: { ... },
  images: [...],
  agent_log: [...]
}
```

The frontend just calls this one endpoint and gets back everything it needs to render Screen 5.

---

## Tool Definitions (for LLM Function Calling Inside the Edge Function)

```typescript
const TOOLS = {
  web_search: {
    description: "Search the web for real-time travel information about destinations, activities, prices, and reviews",
    parameters: { query: "string", num_results: "number" },
    handler: async (query, num = 5) => {
      // Call SerpAPI or Brave Search API
      const res = await fetch(`https://api.serpapi.com/search?q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`);
      return res.json();
    }
  },
  
  fetch_images: {
    description: "Get real destination/activity photos from Unsplash",
    parameters: { query: "string", count: "number" },
    handler: async (query, count = 3) => {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_KEY}`);
      return res.json();
    }
  },
  
  estimate_costs: {
    description: "Estimate realistic travel costs for a destination based on travel style",
    parameters: { location: "string", days: "number", style: "string", travelers: "number" },
    handler: async (params) => {
      // Uses web search + heuristics to estimate costs
      // Returns: { hotel, transport, food, activities, total } in INR
    }
  },

  get_travel_times: {
    description: "Get driving distance and time between two locations",
    parameters: { origin: "string", destination: "string" },
    handler: async (origin, dest) => {
      // Uses Google Maps Distance Matrix or fallback estimation
      // Returns: { distance_km, duration_minutes }
    }
  }
};
```

## Simple Agent Pipeline (Pseudo-code)

```typescript
async function generateTrip(input) {
  // PHASE 1: Discovery — find the destination details
  const searchResults = await toolCall('web_search', {
    query: `${input.destination} best places to visit ${input.interests.join(' ')}`
  });
  const images = await toolCall('fetch_images', {
    query: input.destination, count: 5
  });
  const costEstimate = await toolCall('estimate_costs', {
    location: input.destination, days: getDuration(input), 
    style: 'budget', travelers: input.travelers
  });
  
  // PHASE 2: Research — find activities
  const activities = await toolCall('web_search', {
    query: `${input.destination} top activities ${input.interests.join(' ')} hidden gems offbeat`
  });
  const foodSpots = await toolCall('web_search', {
    query: `${input.destination} best local food restaurants must try`
  });
  
  // PHASE 3: Planning — build the itinerary
  const itinerary = buildDayByDay(activities, foodSpots, input, costEstimate);
  
  // Save to database
  const { data: trip } = await supabase.from('trips').insert({...}).select().single();
  
  // Save days and activities
  for (const day of itinerary.days) {
    await supabase.from('trip_days').insert({...});
    await supabase.from('trip_activities').insert(day.activities);
  }
  
  return { trip_id: trip.id, itinerary, budget_breakdown: costEstimate };
}
```

No chat. No streaming. One API call → one response → render the UI.
