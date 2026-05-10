# Traveloop Design System

## Product Intent

Traveloop is an AI smart travel planning platform for people who want to travel but do not know where to go, what is worth doing, or how to turn scattered reviews and stories into a practical plan.

The product should feel like an intelligent travel research workspace, not a generic travel booking site. The strongest product promise is:

"AI agents discover real travel experiences, rank what fits the user, and turn the best option into an editable, budget-aware itinerary."

## Overall Vibe

Premium, energetic, high-contrast dark mode. The UI should feel like a high-end editorial travel magazine meets a modern productivity SaaS.

- **Contrast**: Deep blacks vs vibrant oranges.
- **Modernity**: Tactile, very rounded corners (`24px`).
- **Energy**: Active AI states, clear typography, and bright, crisp travel photography.

## Platform

- Desktop-first responsive web app
- Design for a 16:9 laptop viewport first
- Use app/dashboard structure rather than a long marketing webpage

## Color Palette

Use a high-contrast dark mode palette with energetic orange accents.

- App Background: `#0D0F10` (Deep charcoal/black)
- Surface/Card: `#1A1D1F` (Onyx)
- Raised Surface: `#2A2D30` (Graphite)
- Border: `#2F3336` (Muted Slate)
- Text Primary: `#FFFFFF` (Pure White)
- Text Secondary: `#9A9FA5` (Silver)
- Text Muted: `#6F767E` (Steel)
- Primary Action Orange: `#FF6B35` (Vibrant Orange)
- Success Emerald: `#1A9D62`
- Warning Saffron: `#F4A62A`
- Ocean Blue: `#2F80ED`

## Typography

Use a bold, clean sans-serif UI typeface such as Inter or Sora.

- **Headings**: Massive, bold, all-caps for brand moments. Use an orange vertical border (`border-l-4 border-[#FF6B35]`) to anchor section headers.
- Page title: 48-56px, bold
- Section title: 24-32px, semibold
- Card title: 18-20px, bold
- Body text: 14-16px, silver color
- Metadata: 12px, steel color

## Shape, Spacing, and Elevation

- **Card radius: 24px** (Significant rounded look)
- **Button radius**: Capsule (`rounded-full`) or 12px
- **Search Bar**: Full capsule (`rounded-full`)
- **Elevation**: Use depth through color (`#1A1D1F` on top of `#0D0F10`) rather than drop shadows.
- **Gaps**: Large, spacious gutters (32px) between modules.

## Navigation

- **Header Toolbar**: Dark background, subtle bottom border.
- **Navigation Links**: Home, Book, My Trips, Profile. Use an orange underline for the active state.
- **Right Side**: User profile (Cynthia Wolf), notification bell with an orange badge dot.

## Core Components

### AI Prompt Box
- **Headline**: "Where should I go next?" or "PLAN YOUR NEXT TRIP"
- **Style**: Integrated into the hero area, using a full-width capsule search input.
- **Interaction**: Orange Sparkles icon to initiate "Discovery".

### Destination Cards
- **Style**: Image-led with `24px` radius.
- **Overlays**: Semi-transparent "Partner discount" badges in top-right.
- **Content**: White text for names, large prices, and muted text for hotel counts.

### Featured Sidebar (Right Panel)
- **Concept**: A large, detailed "Safari & Wildlife" style card taking up the right column.
- **Action**: "Check dates" (Orange button) and "Learn more" (Outline white button).

## Screen 3: Main Landing Dashboard

Required structure:
1. Header toolbar (Nav + Profile).
2. Massive hero heading with orange left-border.
3. Full-width capsule search bar.
4. "Recommended" section with category filters (Orange active state).
5. 2-column grid for destinations on left.
6. Large "Featured Adventure" card on right.

## AI Agent Mental Model
- **Discovery Agent**: Pulsing orange dots/glows.
- **Planning Agent**: Intelligent budget tracking bars (Orange to Red).

## Imagery
- Use bright, high-saturation travel photography.
- Avoid low-light or blurry images.
- Focus on iconic landmarks, vibrant nature, and crisp architecture.

## Stitch Generation Prompt For Screen 3

Design a premium, high-fidelity dark mode dashboard for Traveloop, an AI travel planning platform.

Theme: Modern Dark & Orange. 
Background: #0D0F10. Cards: #1A1D1F (24px radius). Accent: #FF6B35.

Layout:
- Top nav header with "Home" (active, orange underline), "Book", "My Trips", "Profile". Right: Profile (avatar + name) and notifications.
- Hero area: "PLAN YOUR NEXT TRIP" in bold all-caps white text with a left-side orange accent bar.
- Search: Large capsule search bar "Where we go?".
- Filters: Horizontal capsule chips: "All tours" (Orange), "Asia", "Europe", "USA" (Outline).
- Content: A grid on the left for destination cards (Spain, Japan, Italy) with "Partner discount" badges. A large featured "Kenya Safari" card on the right with friend avatar stacks, detailed sub-text, large price "$1659 /person", and two buttons: "Learn more" (white outline) and "Check dates" (solid orange).

Text: Use pure white for headings, silver (#9A9FA5) for descriptions. Make it feel like a modern, energetic travel research workspace. No lorem ipsum.
