# Traveloop — Master Context for Gemini CLI

## What You're Building

Traveloop is an AI-powered travel planning platform. The core promise: **"AI agents discover real travel experiences, rank what fits the user, and turn the best option into an editable, budget-aware itinerary."**

It's a premium travel SaaS **dashboard** (not a travel agency marketing website). Desktop-first, 16:9 viewport, app/dashboard structure.

**Current state**: A Next.js 16 app with working Supabase auth and a polished login screen (Screen 1). You'll build Screens 2-14.

---

## Tech Stack (Already Configured)

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: TailwindCSS 4 (no tailwind.config.ts — configured via CSS `@theme inline`)
- **UI Primitives**: shadcn/ui (Base UI under the hood) — Button, Card, Input, Label already exist
- **Icons**: lucide-react
- **Auth**: Supabase (already wired — middleware, client, server, callback)
- **Fonts**: Fraunces (serif, `--font-fraunces`), Sora (sans-serif, `--font-sora`), Geist Mono (`--font-geist-mono`)
- **No external API calls needed**: All data is mock/hardcoded for the hackathon demo

---

## Design System — "Calm AI Travel Assistant"

### Vibe
Light, calm, traveler-friendly. Clean, modern, trustworthy, intelligent, slightly adventurous. **Practical enough for planning, polished enough for a hackathon demo.**

### Core Palette

| Token | Hex | Tailwind Class | Usage |
|-------|-----|---------------|-------|
| Soft Mist | `#F6F8F7` | `bg-background` | Main page background |
| White | `#FFFFFF` | `bg-surface` | Cards, panels, inputs |
| Cloud | `#F9FBFA` | `bg-surface-raised` | Subtle elevated sections |
| Soft Sage | `#DCE5E1` | `border-border` | Card borders, dividers |
| Deep Slate | `#17211F` | `text-text-primary` | Headings, important text |
| Muted Slate | `#5A6864` | `text-text-secondary` | Body text, descriptions |
| Soft Gray Green | `#899590` | `text-text-muted` | Metadata, helper text |

### Brand & Action Colors

| Token | Hex | Tailwind Class | Usage |
|-------|-----|---------------|-------|
| Deep Teal | `#047A73` | `bg-primary` `text-primary` | Main CTA buttons |
| Dark Teal | `#03665F` | `bg-primary-hover` | Primary hover |
| Pale Teal | `#E4F3F1` | `bg-primary-soft` | Selected chips, highlights |
| Emerald | `#1A9D62` | `text-success` | Budget fit, completed |
| Coral | `#F26B5E` | `text-coral` | Hidden gem tags |
| Saffron | `#F4A62A` | `text-saffron` | Best season, recommended |
| Ocean Blue | `#2F80ED` | `text-ocean` | Route, map, links |

### Typography
- **Headings**: `font-serif` (Fraunces) — page titles, card titles, brand text
- **Body**: `font-sans` (Sora) — labels, descriptions, inputs, UI text
- **Mono**: `font-mono` (Geist Mono) — numbers, code, data
- Sizes: Page title 40-48px, Section title 20-24px, Card title 16-18px, Body 14-16px, Metadata 12-13px
- No negative letter spacing

### Shape & Elevation
- **Card radius**: 8px max (`rounded-lg` or `rounded-xl`)
- **Button radius**: 8px max
- **Borders before shadows**: Use `border-border` (1px #DCE5E1) as the default
- **Shadows**: Soft and minimal — `shadow-sm` or subtle custom shadows
- **Page gutters**: Consistent 24px (`p-6`)
- **Card spacing**: 16-24px (`gap-4` or `gap-6`)

### Badge System

| Badge | Background | Text |
|-------|-----------|------|
| AI Match | `bg-primary-soft` `text-primary` | `#E4F3F1` / `#047A73` |
| Hidden Gem | `bg-coral-soft` `text-coral` | `#FDECEA` / `#F26B5E` |
| Budget Friendly | `bg-success-soft` `text-success` | `#E7F7EF` / `#1A9D62` |
| Great in Season | `bg-saffron-soft` `text-saffron` | `#FFF4DC` / `#F4A62A` |
| Route/Map | `bg-ocean-soft` `text-ocean` | `#EAF3FF` / `#2F80ED` |

### AI Agent States

| State | Background | Text |
|-------|-----------|------|
| Idle | `bg-surface-raised` | `text-text-secondary` |
| Thinking | `bg-ocean-soft` | `text-ocean` |
| Good Match | `bg-success-soft` | `text-success` |
| Needs Attention | `bg-saffron-soft` | `text-saffron` |
| Problem | `bg-coral-soft` | `text-coral` |

### DO NOT USE
- No purple or blue AI gradients
- No dark theme for main app
- No decorative color blobs, orbs, or abstract backgrounds
- No making every card teal
- No cards inside cards (unless inner is a clear input/result)
- No overly rounded corners (max 8px on cards)
- No generic "AI slop" aesthetics — avoid Inter, Roboto, purple gradients, cookie-cutter layouts

---

## Project Structure

```
src/
├── app/
│   ├── (app)/layout.tsx          ← Authenticated app shell (header + nav)
│   ├── dashboard/page.tsx        ← Screen 3: Main landing
│   ├── login/page.tsx            ← Screen 1: Login (BUILT)
│   ├── register/page.tsx         ← Screen 2: Register
│   ├── trips/
│   │   ├── page.tsx              ← Screen 6: Trip listing
│   │   ├── new/page.tsx          ← Screen 4: Create trip
│   │   └── [id]/
│   │       ├── page.tsx          ← Screen 9: Itinerary view
│   │       └── build/page.tsx    ← Screen 5: Build itinerary
│   ├── search/page.tsx           ← Screen 8: City/activity search
│   ├── community/page.tsx        ← Screen 10: Community
│   ├── profile/page.tsx          ← Screen 7: User profile
│   └── admin/                    ← Screens 11-14: Admin
├── components/
│   ├── auth/login-form.tsx       ← Screen 1 login form (BUILT — use as quality reference)
│   ├── ui/                       ← shadcn primitives (button, card, input, label)
│   ├── layout/                   ← App header, shell
│   ├── dashboard/                ← Dashboard components
│   ├── trips/                    ← Trip form, cards
│   ├── itinerary/                ← Itinerary day, activity, budget
│   ├── search/                   ← Search result cards, filters
│   └── community/                ← Post cards
├── lib/
│   ├── types.ts                  ← TypeScript interfaces
│   ├── mock/                     ← Mock data
│   └── supabase/                 ← Auth clients (BUILT)
└── middleware.ts                 ← Auth guard (BUILT)
```

---

## Existing Login Screen (Quality Reference)

The login screen at `src/components/auth/login-form.tsx` sets the design bar. Key qualities:
- **Editorial split-screen layout** (40% form / 60% hero image, hidden on mobile)
- **Bottom-border-only inputs** (transparent background, no rounded borders)
- **Fraunces serif headings** for brand moments
- **Staggered entrance animations** (`animate-fade-up` with `animationDelay`)
- **Floating cards** on the image side for AI agent status
- **Subtle noise texture** on body background
- **Hover lift animation** on the primary button
- **Teal shadows** on buttons (`shadow-[0_8px_20px_-6px_rgba(4,122,115,0.4)]`)

---

## How to Use These Prompts

Each screen prompt file (01-14) is self-contained and can be fed directly to Gemini CLI. They reference this master context for the shared design system.

**Recommended order**: Phase 1 first (shared components), then screens in order: 3→4→5→6→8→9→2→7→10→11→12→13→14.

Each prompt tells you:
1. What the screen does
2. What files to create/modify
3. The exact layout and components needed
4. Design details specific to that screen
5. Any special interactions or states

---

## All CSS Token Classes Available

```
Backgrounds:  bg-background bg-surface bg-surface-raised
Text:         text-foreground text-text-primary text-text-secondary text-text-muted
Primary:      bg-primary text-primary text-primary-foreground bg-primary-hover bg-primary-soft
Success:      text-success bg-success-soft
Coral:        text-coral bg-coral-soft
Saffron:      text-saffron bg-saffron-soft
Ocean:        text-ocean bg-ocean-soft
Warning:      text-warning
Error:        text-error
Borders:      border-border
Fonts:        font-sans font-serif font-mono
Animations:   animate-fade-up animate-fade-in animate-reveal-right
```
