-- ============================================================
-- Traveloop Core Schema
-- All tables, RLS policies, and seed data
-- ============================================================

-- ============================================================
-- 1. TRIPS — Core trip table
-- ============================================================
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
  forked_from UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. TRIP DAYS — One row per day in a trip
-- ============================================================
CREATE TABLE trip_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL,
  date DATE,
  notes TEXT,
  UNIQUE(trip_id, day_number)
);

-- ============================================================
-- 3. TRIP ACTIVITIES — Activities within a day
-- ============================================================
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

-- ============================================================
-- 4. BUDGET ITEMS — Budget breakdown by category
-- ============================================================
CREATE TABLE trip_budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips ON DELETE CASCADE NOT NULL,
  category TEXT CHECK (category IN ('hotel', 'transport', 'food', 'activities', 'shopping', 'other')),
  description TEXT,
  estimated DECIMAL(10,2) DEFAULT 0,
  actual DECIMAL(10,2) DEFAULT 0
);

-- ============================================================
-- 5. PACKING ITEMS — Per-trip packing checklist
-- ============================================================
CREATE TABLE packing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips ON DELETE CASCADE NOT NULL,
  category TEXT CHECK (category IN ('documents', 'electronics', 'clothing', 'toiletries', 'medical', 'misc')),
  name TEXT NOT NULL,
  is_checked BOOLEAN DEFAULT false
);

-- ============================================================
-- 6. TRIP NOTES — Journal entries per day
-- ============================================================
CREATE TABLE trip_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips ON DELETE CASCADE NOT NULL,
  day_number INTEGER,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. COMMUNITY STORIES — Shared travel stories
-- ============================================================
CREATE TABLE community_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  cover_image TEXT,
  budget_spent DECIMAL(10,2),
  duration_days INTEGER,
  travelers INTEGER DEFAULT 1,
  crowd_level TEXT CHECK (crowd_level IN ('low', 'medium', 'high')),
  best_season TEXT,
  rating DECIMAL(2,1) CHECK (rating >= 1 AND rating <= 5),
  hidden_gem_score DECIMAL(3,1) DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  itinerary_json JSONB,
  story_text TEXT,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  fork_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. STORY LIKES — Many-to-many likes
-- ============================================================
CREATE TABLE story_likes (
  story_id UUID REFERENCES community_stories ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users,
  PRIMARY KEY (story_id, user_id)
);

-- ============================================================
-- 9. STORY COMMENTS — Comments on stories
-- ============================================================
CREATE TABLE story_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID REFERENCES community_stories ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Trips: owner full access, anyone can view public trips
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_manage_trips" ON trips
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "anyone_view_public_trips" ON trips
  FOR SELECT USING (is_public = true);

-- Trip days: only trip owner can access
ALTER TABLE trip_days ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_manage_days" ON trip_days
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = trip_id AND trips.user_id = auth.uid()
  ));
CREATE POLICY "anyone_view_public_days" ON trip_days
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = trip_id AND trips.is_public = true
  ));

-- Trip activities: only trip owner can access
ALTER TABLE trip_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_manage_activities" ON trip_activities
  USING (EXISTS (
    SELECT 1 FROM trip_days
    JOIN trips ON trips.id = trip_days.trip_id
    WHERE trip_days.id = trip_day_id AND trips.user_id = auth.uid()
  ));
CREATE POLICY "anyone_view_public_activities" ON trip_activities
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM trip_days
    JOIN trips ON trips.id = trip_days.trip_id
    WHERE trip_days.id = trip_day_id AND trips.is_public = true
  ));

-- Budget items: trip owner only
ALTER TABLE trip_budget_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_manage_budget" ON trip_budget_items
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = trip_id AND trips.user_id = auth.uid()
  ));

-- Packing items: trip owner only
ALTER TABLE packing_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_manage_packing" ON packing_items
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = trip_id AND trips.user_id = auth.uid()
  ));

-- Trip notes: trip owner only
ALTER TABLE trip_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_manage_notes" ON trip_notes
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = trip_id AND trips.user_id = auth.uid()
  ));

-- Community stories: anyone can view, owner can manage
ALTER TABLE community_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_view_stories" ON community_stories FOR SELECT USING (true);
CREATE POLICY "owner_manage_story" ON community_stories
  FOR ALL USING (auth.uid() = user_id);

-- Story likes: anyone can view, authenticated users can like
ALTER TABLE story_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_view_likes" ON story_likes FOR SELECT USING (true);
CREATE POLICY "auth_users_like" ON story_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth_users_unlike" ON story_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Story comments: anyone can view, authenticated users can comment
ALTER TABLE story_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_view_comments" ON story_comments FOR SELECT USING (true);
CREATE POLICY "auth_users_comment" ON story_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete_comment" ON story_comments
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_public ON trips(is_public);
CREATE INDEX idx_trip_days_trip ON trip_days(trip_id);
CREATE INDEX idx_trip_activities_day ON trip_activities(trip_day_id);
CREATE INDEX idx_community_stories_rating ON community_stories(rating DESC);
CREATE INDEX idx_community_stories_gems ON community_stories(hidden_gem_score DESC);
CREATE INDEX idx_community_stories_tags ON community_stories USING GIN(tags);

-- ============================================================
-- SEED DATA — Community Stories
-- These are public, discoverable trip templates anyone can fork
-- ============================================================

-- We need a placeholder user for seed data. In production, stories
-- are created by real users. For the demo, we insert via service_role.
-- If running locally, first create a demo user via the Supabase dashboard
-- and replace the user_id below.

-- NOTE: Uncomment and replace USER_ID after creating a demo user:
--
-- INSERT INTO community_stories (user_id, title, destination, cover_image, budget_spent, duration_days, travelers, crowd_level, best_season, rating, hidden_gem_score, tags, itinerary_json, story_text, like_count, fork_count)
-- VALUES
-- (
--   'REPLACE_WITH_USER_UUID',
--   'Magical Udaipur — Lakes, Palaces & Sunsets',
--   'Udaipur, Rajasthan',
--   '/images/destinations/udaipur.jpg',
--   8500, 3, 2, 'low', 'October-March',
--   4.8, 8.5,
--   ARRAY['culture', 'food', 'budget-friendly', 'romantic'],
--   '[
--     {"day":1,"date":"2025-10-15","activities":[
--       {"name":"City Palace Tour","type":"sightseeing","time":"09:00","cost":300,"notes":"Audio guide recommended"},
--       {"name":"Lake Pichola Boat Ride","type":"sightseeing","time":"16:00","cost":500,"notes":"Sunset slot is magical"},
--       {"name":"Ambrai Restaurant","type":"food","time":"19:30","cost":800,"notes":"Lakeside dining with palace view"}
--     ]},
--     {"day":2,"date":"2025-10-16","activities":[
--       {"name":"Sahelion Ki Bari","type":"sightseeing","time":"08:00","cost":50,"notes":"Beautiful gardens"},
--       {"name":"Bagore Ki Haveli","type":"culture","time":"11:00","cost":100,"notes":"Museum and cultural shows"},
--       {"name":"Local Food Walk","type":"food","time":"13:00","cost":500,"notes":"Try kachori, dal baati, malpua"}
--     ]},
--     {"day":3,"date":"2025-10-17","activities":[
--       {"name":"Monsoon Palace","type":"sightseeing","time":"08:00","cost":200,"notes":"Panoramic city views"},
--       {"name":"Shilpgram Crafts Village","type":"culture","time":"11:00","cost":100,"notes":"Traditional Rajasthani crafts"},
--       {"name":"Fateh Sagar Lake","type":"sightseeing","time":"16:00","cost":0,"notes":"Evening walk, street food nearby"}
--     ]}
--   ]'::jsonb,
--   'Udaipur is pure magic. Three days of lakes, palaces, and the best Rajasthani food. Spent only ₹8,500 total by staying at a haveli-turned-guesthouse in the old city. The sunset boat ride on Lake Pichola alone is worth the trip.',
--   234, 89
-- ),
-- (
--   'REPLACE_WITH_USER_UUID',
--   'Meghalaya — The Abode of Clouds',
--   'Cherrapunji, Meghalaya',
--   '/images/destinations/meghalaya.jpg',
--   12000, 5, 2, 'low', 'October-May',
--   4.6, 9.2,
--   ARRAY['nature', 'adventure', 'hidden-gems', 'budget-friendly'],
--   '[
--     {"day":1,"date":"2025-11-01","activities":[
--       {"name":"Drive to Cherrapunji","type":"transport","time":"07:00","cost":1500,"notes":"Scenic 2.5hr drive from Shillong"},
--       {"name":"Nohkalikai Falls","type":"sightseeing","time":"10:00","cost":50,"notes":"Tallest plunge waterfall in India"},
--       {"name":"Seven Sisters Falls","type":"sightseeing","time":"14:00","cost":0,"notes":"Best viewed from Eco Park"},
--       {"name":"Khasi Thali Lunch","type":"food","time":"13:00","cost":300,"notes":"Try jadoh and tungrymbai"}
--     ]},
--     {"day":2,"date":"2025-11-02","activities":[
--       {"name":"Double Decker Root Bridge Trek","type":"adventure","time":"06:00","cost":0,"notes":"3000 steps down, start early!"},
--       {"name":"Natural Swimming Pools","type":"adventure","time":"12:00","cost":0,"notes":"Crystal clear water"},
--       {"name":"Local Khasi Dinner","type":"food","time":"19:00","cost":400,"notes":"Smoked pork with bamboo shoot"}
--     ]}
--   ]'::jsonb,
--   'Meghalaya is India''s best-kept secret. Lush green landscapes, living root bridges, waterfalls everywhere, and the cleanest villages in Asia. All for just ₹12,000. The Double Decker Root Bridge trek is challenging but absolutely worth it.',
--   189, 67
-- ),
-- (
--   'REPLACE_WITH_USER_UUID',
--   'Coorg — Coffee, Mist & Waterfalls',
--   'Coorg, Karnataka',
--   '/images/destinations/coorg.jpg',
--   9200, 4, 2, 'medium', 'October-March',
--   4.5, 7.8,
--   ARRAY['nature', 'food', 'relaxed'],
--   '[]'::jsonb,
--   'Coorg is where you go to slow down. Coffee plantations, misty mornings, Abbey Falls, and the best pandi curry you will ever eat. A perfect 4-day weekend escape.',
--   156, 42
-- ),
-- (
--   'REPLACE_WITH_USER_UUID',
--   'Spiti Valley — The Middle Land',
--   'Spiti Valley, Himachal Pradesh',
--   '/images/destinations/spiti.jpg',
--   18000, 7, 2, 'low', 'June-September',
--   4.9, 9.8,
--   ARRAY['adventure', 'hidden-gems', 'culture'],
--   '[]'::jsonb,
--   'Spiti is not a trip, it''s a pilgrimage. 7 days through the highest villages in India. Ancient monasteries, fossil hunting in Langza, sleeping under more stars than you''ve ever seen. The road from Manali via Kunzum Pass will change you.',
--   312, 124
-- ),
-- (
--   'REPLACE_WITH_USER_UUID',
--   'Jaipur — The Pink City Express',
--   'Jaipur, Rajasthan',
--   '/images/destinations/jaipur.jpg',
--   7800, 3, 4, 'high', 'October-March',
--   4.3, 4.5,
--   ARRAY['culture', 'food', 'budget-friendly'],
--   '[]'::jsonb,
--   'Jaipur is a sensory explosion. Amber Fort at sunrise, Hawa Mahal, bazaars full of textiles and jewelry, and the most incredible street food. It''s busy but worth every moment.',
--   445, 98
-- ),
-- (
--   'REPLACE_WITH_USER_UUID',
--   'Gokarna — The Quieter Goa',
--   'Gokarna, Karnataka',
--   '/images/destinations/gokarna.jpg',
--   5500, 3, 2, 'low', 'October-February',
--   4.4, 7.2,
--   ARRAY['beach', 'budget-friendly', 'relaxed'],
--   '[]'::jsonb,
--   'Gokarna is what Goa was 20 years ago. Five beaches connected by cliffside trails, ₹200 shacks on the sand, and zero crowds. The Om Beach to Paradise Beach trek is a dream.',
--   178, 53
-- );

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Function to update trip spent_amount from activities
CREATE OR REPLACE FUNCTION update_trip_spent()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE trips
  SET spent_amount = (
    SELECT COALESCE(SUM(ta.cost), 0)
    FROM trip_activities ta
    JOIN trip_days td ON ta.trip_day_id = td.id
    WHERE td.trip_id = COALESCE(NEW.trip_id, (
      SELECT td2.trip_id FROM trip_days td2 WHERE td2.id = OLD.trip_day_id
    ))
  ),
  updated_at = NOW()
  WHERE id = COALESCE(NEW.trip_id, (
    SELECT td2.trip_id FROM trip_days td2 WHERE td2.id = OLD.trip_day_id
  ));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-update spent_amount when activities change
-- DROP TRIGGER IF EXISTS trg_update_spent ON trip_activities;
-- CREATE TRIGGER trg_update_spent
--   AFTER INSERT OR UPDATE OR DELETE ON trip_activities
--   FOR EACH ROW EXECUTE FUNCTION update_trip_spent();

-- Function to update story like_count
CREATE OR REPLACE FUNCTION update_story_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_stories SET like_count = like_count + 1 WHERE id = NEW.story_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_stories SET like_count = like_count - 1 WHERE id = OLD.story_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for story like counts
-- DROP TRIGGER IF EXISTS trg_story_likes ON story_likes;
-- CREATE TRIGGER trg_story_likes
--   AFTER INSERT OR DELETE ON story_likes
--   FOR EACH ROW EXECUTE FUNCTION update_story_like_count();
