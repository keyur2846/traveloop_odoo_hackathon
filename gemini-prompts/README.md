# Traveloop — Gemini CLI Prompts

This folder contains detailed, self-contained prompts for building the Traveloop frontend with Gemini CLI.

## How to Use

Each file is a complete prompt. Feed it to Gemini CLI in order. Gemini is particularly good at UI/UX design, so these prompts focus on visual quality, layout precision, and design system adherence.

## Files

| # | File | Screen | Priority |
|---|------|--------|----------|
| — | `00-master-context.md` | Design system, tech stack, project structure | **Read first** |
| 1 | `01-phase1-shared-components.md` | Types, mock data, shadcn components, app shell | **Build first** |
| 2 | `02-screen3-dashboard.md` | Main landing dashboard (most important screen) | 🔴 Critical |
| 3 | `03-screen4-create-trip.md` | Create new trip with AI Discovery | 🔴 Critical |
| 4 | `04-screen5-build-itinerary.md` | Build itinerary with AI Planning | 🔴 Critical |
| 5 | `05-screen6-trip-listing.md` | Trip listing grid | 🟡 High |
| 6 | `06-screen8-search.md` | City & activity search | 🟡 High |
| 7 | `07-screen9-itinerary-view.md` | Full itinerary view | 🟡 High |
| 8 | `08-screen2-register.md` | Registration (mirrors login) | 🟡 High |
| 9 | `09-screen7-profile.md` | User profile & settings | 🟢 Medium |
| 10 | `10-screen10-community.md` | Community feed | 🟢 Medium |
| 11 | `11-screen11-packing-checklist.md` | Packing checklist | 🟢 Medium |
| 12 | `12-screen12-admin.md` | Admin panel (4 sub-screens) | 🟢 Medium |
| 13 | `13-screen13-trip-notes.md` | Trip notes/journal | 🔵 Low |
| 14 | `14-screen14-invoice.md` | Invoice/billing | 🔵 Low |

## Recommended Build Order

```
Phase 1: 00 → 01 (shared infrastructure)
Phase 2: 02 (dashboard — the hero screen)
Phase 3: 03 → 04 (trip creation flow)
Phase 4: 05 → 06 → 07 (trip management)
Phase 5: 08 → 09 → 10 (auth + profile + community)
Phase 6: 11 → 12 (checklist + admin)
Phase 7: 13 → 14 (notes + invoice)
```

## Before Starting

1. Read `00-master-context.md` thoroughly — it has the design system, color tokens, typography, and anti-patterns
2. Study the existing login screen at `src/components/auth/login-form.tsx` — it sets the quality bar
3. Run `npm run dev` to see the current state
4. Build Phase 1 first — all other screens depend on shared components and types

## Design Quality Checklist

Before marking any screen as complete, verify:
- [ ] Uses Traveloop color tokens from globals.css (not hardcoded hex values)
- [ ] Fraunces for headings (`font-serif`), Sora for body (`font-sans`)
- [ ] Cards have 8px max radius, white surfaces, subtle borders
- [ ] No purple/blue gradients, no dark themes, no decorative blobs
- [ ] Real content — no lorem ipsum
- [ ] Animations are subtle and purposeful
- [ ] Desktop-first layout at 1440px+
- [ ] Matches the polish level of the existing login screen
