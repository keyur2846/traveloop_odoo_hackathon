# Traveloop Colors

## Theme

Traveloop will use the **Modern Dark & Orange** theme.

The color system is high-contrast, premium, and energetic. It features an ultra-dark background to make travel photography pop, with vibrant orange accents used for primary actions and highlights.

## Core Palette

| Role | Color | Hex | Usage |
|---|---:|---|---|
| App Background | Deep Charcoal | `#0D0F10` | Main page background |
| Surface | Onyx | `#1A1D1F` | Cards, panels, inputs |
| Raised Surface | Graphite | `#2A2D30` | Subtle elevated sections |
| Border | Muted Slate | `#2F3336` | Card borders, dividers |
| Text Primary | White | `#FFFFFF` | Main headings and important text |
| Text Secondary | Silver | `#9A9FA5` | Body text and descriptions |
| Text Muted | Steel | `#6F767E` | Metadata, helper text, timestamps |

## Brand And Action Colors

| Role | Color | Hex | Usage |
|---|---:|---|---|
| Primary Action | Vibrant Orange | `#FF6B35` | Main CTA buttons like "Explore with AI" |
| Primary Hover | Deep Orange | `#E65A2B` | Hover state for primary buttons |
| Primary Soft | Peach | `#FFE5DE` | Soft orange highlights (light mode fallback only) |
| Success | Emerald | `#1A9D62` | Good budget fit, completed states |
| Success Soft | Dark Green | `#162E25` | Dark success backgrounds |
| Coral Accent | Coral | `#F26B5E` | Hidden gem tags (if orange is too busy) |
| Coral Soft | Dark Coral | `#2E1C1B` | Soft coral backgrounds |
| Saffron Accent | Saffron | `#F4A62A` | Best season, attention badges |
| Saffron Soft | Dark Saffron | `#2E2616` | Soft saffron backgrounds |
| Ocean Accent | Sky Blue | `#2F80ED` | Route, map, link accents |
| Ocean Soft | Dark Ocean | `#162233` | Soft route/map backgrounds |

## Feedback Colors

| Role | Color | Hex | Usage |
|---|---:|---|---|
| Warning | Warm Amber | `#E89B22` | Budget caution, season warning |
| Warning Soft | Dark Amber | `#2E2516` | Warning badge backgrounds |
| Error | Bright Red | `#D94A3A` | Invalid input, over-budget critical state |
| Error Soft | Dark Red | `#2E1616` | Error backgrounds |

## Main UI Usage

### Backgrounds

- Use `#0D0F10` for the main app background.
- Use `#1A1D1F` for cards, forms, search areas, and destination panels.
- Use `#2A2D30` only for subtle inner sections or secondary panels.

### Text

- Use `#FFFFFF` for headings, primary labels, and key values.
- Use `#9A9FA5` for descriptions and secondary text.
- Use `#6F767E` for helper text, metadata, and timestamps.

### Buttons

Primary button:

- Background: `#FF6B35`
- Hover: `#E65A2B`
- Text: `#FFFFFF`

Secondary button:

- Background: transparent
- Border: `#FFFFFF`
- Text: `#FFFFFF`
- Hover: Background `#FFFFFF`, Text `#0D0F10`

### Cards

Default card:

- Background: `#1A1D1F`
- Border: `#2F3336`
- Text: `#FFFFFF`
- Radius: **24px** (Significant rounding)
- Shadow: Subtle glow or elevation shadow

## Travel Recommendation Badges

| Badge | Background | Text |
|---|---|---|
| AI Match | `#FF6B35` | `#FFFFFF` |
| Hidden Gem | `#F26B5E` | `#FFFFFF` |
| Budget Friendly | `#1A9D62` | `#FFFFFF` |
| Great in Season | `#F4A62A` | `#FFFFFF` |
| Route/Map | `#2F80ED` | `#FFFFFF` |

## AI Agent States

AI states should feel energetic and active.

| State | Background | Text | Accent |
|---|---|---|---|
| Idle | `#2A2D30` | `#9A9FA5` | `#2F3336` |
| Thinking | `#162233` | `#2F80ED` | `#2F80ED` |
| Good Match | `#162E25` | `#1A9D62` | `#1A9D62` |
| Needs Attention | `#2E2616` | `#F4A62A` | `#E89B22` |
| Problem | `#2E1616` | `#D94A3A` | `#D94A3A` |

## CSS Tokens

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
  --color-primary-soft: #2E1C16; /* Dark peach for backgrounds */

  --color-success: #1A9D62;
  --color-success-soft: #162E25;

  --color-coral: #F26B5E;
  --color-coral-soft: #2E1C1B;

  --color-saffron: #F4A62A;
  --color-saffron-soft: #2E2616;

  --color-ocean: #2F80ED;
  --color-ocean-soft: #162233;

  --color-warning: #E89B22;
  --color-error: #D94A3A;
  
  --radius-card: 24px;
}
```
