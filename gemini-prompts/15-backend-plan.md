# Traveloop Backend — The "Different" Plan

## Competitive Gap Analysis

### What Every Competitor Does (The Same Thing)
| Competitor | AI Generation | Community Data | Budget-First | Real Stories |
|---|---|---|---|---|
| TREK | ❌ No AI | ❌ No | ❌ Afterthought | ❌ No |
| AdventureLog | ❌ No AI | ✅ Sharing | ❌ Afterthought | ✅ Journal |
| Iter-X | ✅ GPT agents | ❌ No | ❌ Afterthought | ❌ No |
| Nomado | ✅ Agent coordinator | ❌ No | ✅ Post-processing | ❌ No |
| travel-planner-ai | ✅ Batched GPT | ❌ No | ✅ Expense tracker | ❌ No |
| OpenTripPlanner | ❌ Routing only | ❌ No | ❌ No | ❌ No |

### The Gap — What NO ONE Does
1. **AI verified by real community data** — Everyone generates synthetic itineraries. No one says "this suggestion is backed by 234 real travelers who took this trip."
2. **Hidden Gem detection** — No one mines community patterns to find underrated, low-crowd, high-value destinations
3. **Budget as a first-class AI constraint** — Budget is always an afterthought. No one warns you BEFORE you build the itinerary that your budget is unrealistic
4. **Indian market optimized** — INR, Indian destinations, Indian budget sensibilities, domestic travel focus
5. **Trip forking** — Clone community trips as starting points, then AI customizes. Everyone starts from scratch.

---

## The Traveloop Moat

**"AI powered by real travelers, not just GPT."**

When Traveloop suggests Udaipur, it doesn't just say "AI recommends." It says:
- "94% AI Match — cross-referenced with 234 real traveler stories from people with your budget"
- "Hidden Gem: Coorg has 4.8★ from real travelers but only 12% the crowd of Ooty"
- "Budget Alert: Your ₹15,000 budget for 5 days in Paris is 60% below what similar travelers actually spent"

---

## Database Schema (Supabase/Postgres — 2 hours)

### Core Trip Tables

```sql
-- Trips table
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  start_date DATE,
  end_date DATE,
  total_budget DECIMAL(10,2) DEFAULT 0,
  spent_amount DECIMAL(10,2) DEFAULT 0,
  travelers INTEGER DEFAULT 1,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'upcoming', 'ongoing', 'completed')),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trip days
CREATE TABLE trip_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL,
  date DATE,
  notes TEXT,
  UNIQUE(trip_id, day_number)
);

-- Activities within a day
CREATE TABLE trip_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_day_id UUID REFERENCES trip_days ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('sightseeing', 'food', 'adventure', 'culture', 'transport', 'hotel', 'other')),
  start_time TIME,
  cost DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  image_url TEXT,
  poi_data JSONB DEFAULT '{}',
  sort_order INTEGER DEFAULT 0
);

-- Budget breakdown
CREATE TABLE trip_budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips ON DELETE CASCADE NOT NULL,
  category TEXT CHECK (category IN ('hotel', 'transport', 'food', 'activities', 'shopping', 'other')),
  description TEXT,
  estimated DECIMAL(10,2) DEFAULT 0,
  actual DECIMAL(10,2) DEFAULT 0
);
```

### The Moat Tables — Community Intelligence

```sql
-- Community stories: REAL trip reports from users
CREATE TABLE community_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  cover_image TEXT,
  budget_spent DECIMAL(10,2),
  duration_days INTEGER,
  travelers INTEGER,
  crowd_level TEXT CHECK (crowd_level IN ('low', 'medium', 'high')),
  best_season TEXT,
  rating DECIMAL(2,1) CHECK (rating >= 1 AND rating <= 5),
  hidden_gem_score DECIMAL(3,1) DEFAULT 0,  -- 0-10, computed
  tags TEXT[] DEFAULT '{}',
  itinerary_json JSONB,  -- full itinerary for forking
  story_text TEXT,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  fork_count INTEGER DEFAULT 0,  -- how many trips cloned from this
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Story engagement
CREATE TABLE story_likes (
  story_id UUID REFERENCES community_stories ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users,
  PRIMARY KEY (story_id, user_id)
);

CREATE TABLE story_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID REFERENCES community_stories ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forked trips track origin
ALTER TABLE trips ADD COLUMN forked_from UUID REFERENCES community_stories;
```

### Packing & Notes

```sql
CREATE TABLE packing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips ON DELETE CASCADE NOT NULL,
  category TEXT CHECK (category IN ('documents', 'electronics', 'clothing', 'toiletries', 'medical', 'misc')),
  name TEXT NOT NULL,
  is_checked BOOLEAN DEFAULT false
);

CREATE TABLE trip_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips ON DELETE CASCADE NOT NULL,
  day_number INTEGER,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
-- Trips: users see their own + public trips
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own trips" ON trips
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone view public trips" ON trips
  FOR SELECT USING (is_public = true);

-- Community stories: anyone can view, owner can edit
ALTER TABLE community_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view stories" ON community_stories FOR SELECT USING (true);
CREATE POLICY "Owner manages story" ON community_stories
  FOR ALL USING (auth.uid() = user_id);

-- Cascade RLS for related tables
ALTER TABLE trip_days ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trip owner manages days" ON trip_days
  USING (EXISTS (SELECT 1 FROM trips WHERE trips.id = trip_id AND trips.user_id = auth.uid()));

ALTER TABLE trip_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trip owner manages activities" ON trip_activities
  USING (EXISTS (SELECT 1 FROM trip_days JOIN trips ON trips.id = trip_days.trip_id WHERE trip_days.id = trip_day_id AND trips.user_id = auth.uid()));

ALTER TABLE packing_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trip owner manages packing" ON packing_items
  USING (EXISTS (SELECT 1 FROM trips WHERE trips.id = trip_id AND trips.user_id = auth.uid()));

ALTER TABLE trip_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trip owner manages notes" ON trip_notes
  USING (EXISTS (SELECT 1 FROM trips WHERE trips.id = trip_id AND trips.user_id = auth.uid()));
```

---

## Edge Functions — The AI Magic (Supabase Edge Functions)

### 1. `ai-generate-itinerary`

```
POST /functions/v1/ai-generate-itinerary
Body: { prompt, budget, days, interests[], travelers }
```

**What it does differently**: Before calling any LLM, it queries community_stories for matching data:

```sql
SELECT destination, budget_spent, duration_days, crowd_level, rating, hidden_gem_score, tags
FROM community_stories
WHERE budget_spent <= $1 * 1.3
  AND budget_spent >= $1 * 0.7
  AND duration_days BETWEEN $2 - 1 AND $2 + 2
  AND tags && $3  -- overlap with user interests
ORDER BY hidden_gem_score DESC, rating DESC
LIMIT 10;
```

Then constructs an enriched prompt: "Generate an itinerary. Here's what real travelers with similar budgets actually did: [community data]. Prioritize destinations with high community ratings and low crowd levels."

Returns structured JSON matching the `trip_days` + `trip_activities` schema.

### 2. `ai-budget-check`

```
POST /functions/v1/ai-budget-check
Body: { destination, budget, days, travelers }
```

Queries community_stories for budget reality check:

```sql
SELECT AVG(budget_spent) as avg_spent,
       PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY budget_spent) as p25,
       PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY budget_spent) as p75
FROM community_stories
WHERE destination ILIKE '%' || $1 || '%';
```

Returns:
- "Your ₹15,000 budget is in the bottom 25% for this destination. Similar travelers spent ₹22,000-35,000."
- or "Great budget! You're right in the sweet spot for this destination."
- Risk level: low / medium / high

### 3. `ai-hidden-gems`

```
POST /functions/v1/ai-hidden-gems
Body: { interests[], budget, region? }
```

Pure SQL query on community_stories (no AI call needed):

```sql
SELECT destination, rating, hidden_gem_score, crowd_level, budget_spent, like_count
FROM community_stories
WHERE hidden_gem_score > 6
  AND crowd_level = 'low'
  AND tags && $1  -- interests
ORDER BY hidden_gem_score DESC, rating DESC
LIMIT 5;
```

This is our killer feature: "Here are 5 hidden gems based on real traveler data."

### 4. `fork-community-trip`

```
POST /functions/v1/fork-community-trip
Body: { story_id }
```

Clones a community_story's itinerary_json into the user's trips table. Increments fork_count on the story. The user starts with a real itinerary as a template, then AI customizes it.

---

## Hidden Gem Scoring Algorithm

A computed field on community_stories, recalculated via Edge Function or trigger:

```
hidden_gem_score = (rating * 2) + (like_count_normalized * 1.5) - (crowd_level_as_number * 2)
```

Where:
- crowd_level: low=0, medium=3, high=7
- Higher hidden_gem_score = better experience / less crowded

This is simple, transparent, and doesn't need ML.

---

## What Makes This Buildable in 2-3 Hours

1. **Supabase handles auth, database, RLS, realtime** — zero infrastructure code
2. **8 tables, 4 edge functions** — small surface area
3. **Edge functions are thin wrappers** — SQL query + prompt enrichment + return JSON
4. **No external AI needed for the demo** — the community data IS the intelligence
5. **RLS means zero auth code** — security is declarative

## What to Skip (For Now)

- ❌ Real AI/LLM integration — mock the AI responses for the demo
- ❌ Payments (Razorpay/Stripe) — show the UI, skip the integration
- ❌ File uploads (photos, PDFs) — use Unsplash URLs
- ❌ Email notifications — skip for 8-hour build
- ❌ Real geocoding — use hardcoded coordinates
- ❌ Map integration — show static images, skip Leaflet/Mapbox

## Migration File

Create as `supabase/migrations/20260510_traveloop_core.sql`:

```sql
-- All the CREATE TABLE statements above
-- Plus seed data: 5-6 community stories with realistic Indian travel data
-- Plus RLS policies
```

## Seed Data Strategy

Add 6 community stories with realistic data:
1. Udaipur — 4.8★, hidden_gem_score 8.5, ₹8,500, low crowd
2. Meghalaya — 4.6★, hidden_gem_score 9.2, ₹12,000, low crowd
3. Coorg — 4.5★, hidden_gem_score 7.8, ₹9,200, medium crowd
4. Spiti Valley — 4.9★, hidden_gem_score 9.8, ₹18,000, low crowd
5. Jaipur — 4.3★, hidden_gem_score 4.5, ₹7,800, high crowd
6. Gokarna — 4.4★, hidden_gem_score 7.2, ₹5,500, low crowd

Each with full itinerary_json so forking works immediately.
