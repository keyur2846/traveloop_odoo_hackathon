# Traveloop - AI-Powered Travel Planning

Traveloop is a personalized travel planning platform designed to turn scattered reviews, stories, and social media posts into actionable, budget-aware itineraries using specialized AI agents.

## Project Overview
Developed as part of an Odoo hackathon, Traveloop aims to be an intelligent travel research workspace. It leverages AI agents to discover destinations, research reviews, and build itineraries.

## Project Status: UI Redesign (Modern Dark & Orange)
- **Decided**: New high-contrast dark theme with vibrant orange accents.
- **Visual Reference**: Premium editorial travel magazine aesthetic.
- **Tech Stack**: Next.js 16, React 19, TailwindCSS 4, Base UI (shadcn).

## UI Theme: Modern Dark & Orange
The interface is energetic, premium, and data-rich. It uses a **True Black** background to make photography pop, with **Vibrant Orange** for primary actions and status signals.

### Core Color Palette
| Role | Color | Hex |
|---|---:|---|
| App Background | Deep Charcoal | `#0D0F10` |
| Surface | Onyx | `#1A1D1F` |
| Raised Surface | Graphite | `#2A2D30` |
| Border | Muted Slate | `#2F3336` |
| Text Primary | White | `#FFFFFF` |
| Text Secondary | Silver | `#9A9FA5` |
| Text Muted | Steel | `#6F767E` |

### Brand & Action Colors
- **Primary Action (Vibrant Orange)**: `#FF6B35` (Hover: `#E65A2B`)
- **Success (Emerald)**: `#1A9D62` (Dark Background: `#162E25`)
- **Warning (Saffron)**: `#F4A62A`
- **Link/Info (Sky Blue)**: `#2F80ED`

### CSS Tokens
```css
:root {
  --color-bg: #0D0F10;
  --color-surface: #1A1D1F;
  --color-surface-raised: #2A2D30;
  --color-border: #2F3336;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #9A9FA5;
  --color-text-muted: #6F767E;
  --color-primary: #FF6B35;
  --color-primary-hover: #E65A2B;
  --color-success: #1A9D62;
  --color-warning: #F4A62A;
  --color-error: #D94A3A;
  --color-info: #2F80ED;
  --radius-card: 24px;
}
```

## Key Screens & Pages
- **Screen 3: Main Dashboard**: Ultra-dark, massive hero heading with orange accent bar, capsule search, and image-led recommendation grid.
- **Screen 4: Create New Trip**: High-contrast form, orange interest chips, pulsing AI discovery indicators.
- **Screen 5: Build Itinerary**: Dark workspace, orange timeline connectors, intelligent budget progress bars.

## AI Agent Mental Model
- **Discovery Agent**: Pulsing orange glows/dots.
- **Research Agent**: "Thinking" states in sky blue.
- **Planning Agent**: Budget tracking with orange/red caution signals.

## Directory Structure & Key Files
- `colors.md`: **Design Source.** Full definitions for the Modern Dark & Orange theme.
- `.stitch/DESIGN.md`: High-fidelity prompts for the new UI redesign.
- `src/lib/types.ts`: Core domain interfaces.
- `src/lib/mock/`: Mock data for destinations and trips.

## Development Priorities
1. Apply the **Modern Dark & Orange** theme across all existing React components.
2. Ensure consistent use of `24px` card radius and capsule-shaped controls.
3. Update photography to be bright, crisp, and high-saturation.
