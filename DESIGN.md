# Design System Inspiration of Ominis Systems

Author: Ominis Systems Core Engineering & Product Architecture
Specification: Physical AI & Aerospace Autonomy Design System (v1.0.0)

---

## Section 1: Visual Theme & Atmosphere

Ominis Systems embodies **Mission-Critical Precision & High-Velocity Physics Engineering**. The visual language is inspired by real-time avionics telemetry, satellite flight decks, defense autonomy test benches, and deep-space GPU clusters. 

The atmosphere rejects consumer-SaaS softness in favor of crisp, engineered brutalism balanced with ultra-modern typography and reactive telemetry visualization. It immediately signals sovereign hardware capability, mathematical rigor, and extreme computational throughput.

### Key Visual Characteristics
- **Void Deep Space Base**: Deep pitch obsidian backgrounds (`#07090E`, `#0C0F17`) that replicate aerospace mission control screens under low light.
- **Instrument Monospace Accents**: Precise telemetry, coordinate readouts, and hardware specs rendered in `IBM Plex Mono` with tracked uppercase labels.
- **High-Contrast Signal Colors**: Functional aerospace signal accents — Laser Emerald (`#00FF9D`), Hyper Electric Blue (`#2E5BFF`), Rocket Plasma Orange (`#FF6B00`), and Mission Red (`#FF3B30`).
- **Engineered Micro-Borders**: Sub-pixel and 1px hairline borders (`rgba(255, 255, 255, 0.08)`) with subtle technical corner notches, status pings, and hardware index markers.
- **Scramble Text Typography**: Real-time terminal decoding animations on section headers that evoke high-speed cryptographic handshakes and firmware flashing.
- **Physical Depth Layering**: Matte dark surfaces layered with glassmorphic backdrop blurs (`backdrop-filter: blur(16px)`), giving tactile depth between hardware specs, simulation monitors, and code blocks.
- **Interactive Telemetry Surfaces**: Every technical metric is alive — dynamic canvas wave monitors, live drone swarm physics simulations, and interactive Monte Carlo iteration loops.
- **Strict Data Density**: High-information layout density with zero frivolous fluff; every element delivers verifiable technical specifications.

---

## Section 2: Color Palette & Roles

Every color in the Ominis Systems design system has a strict functional mandate:

### Primary Surfaces & Backdrops
- **Void Obsidian** (`#07090E`): Main atmospheric foundation; absorbs glare and heightens signal luminescence.
- **Deep Slate Layer 1** (`#0C101A`): Card surface and bento container backgrounds.
- **Deep Slate Layer 2** (`#131926`): Hover elevation and elevated module enclosures.
- **Subtle Surface Stroke** (`rgba(255, 255, 255, 0.08)`): Grid separators and component borders.
- **Active Surface Stroke** (`rgba(46, 91, 255, 0.35)`): Highlighted container borders on interactive focus.

### Interactive & Accent Signals
- **Hyper Blue** (`#2E5BFF`): Primary interactive links, active tabs, software-in-the-loop (SITL) indicators, and core buttons.
- **Hyper Blue Glow** (`rgba(46, 91, 255, 0.25)`): Radial ambiance behind key hardware highlights.
- **Laser Emerald** (`#00FF9D`): Simulation runtime health, successful validation states, live telemetry status, and drone autonomy indicators.
- **Plasma Orange** (`#FF6B00`): Hardware-in-the-loop (HITL), Aleph flight computer hardware triggers, and thermal compute indicators.
- **Mission Red / Crimson** (`#FF3B30`): Aerospace alert bottlenecks, error boundaries, and defense mission profiles.

### Text Hierarchy & Contrast
- **Signal White** (`#F7FAFC`): Display headings, hero titles, primary metrics (`100%` contrast).
- **Bone Cream** (`#E2E8F0`): Section sub-headings, key value descriptions, and primary body copy.
- **Muted Telemetry Gray** (`#8A99AD`): Secondary descriptors, table headers, footnotes, and parameter labels.
- **Ghost Obsidian** (`#4A5568`): Inactive states, disabled controls, and subtle line rules.

### Shadows & Elevation
- **Elevation Low**: `0 2px 8px rgba(0, 0, 0, 0.45)`
- **Elevation Medium**: `0 8px 30px rgba(0, 0, 0, 0.65), 0 0 1px rgba(255, 255, 255, 0.1)`
- **Elevation Glow (Blue)**: `0 0 35px rgba(46, 91, 255, 0.22)`
- **Elevation Glow (Emerald)**: `0 0 35px rgba(0, 255, 157, 0.18)`

---

## Section 3: Typography Rules

### Primary Font Stacks
- **Display & Headings**: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Body & Paragraphs**: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif`
- **Telemetry & Technical Code**: `'IBM Plex Mono', 'JetBrains Mono', 'Fira Code', monospace`

### Typography Hierarchy Table

| Role | Font Family | Size | Weight | Line Height | Letter Spacing | Functional Application |
|---|---|---|---|---|---|---|
| **Mega Display Hero** | Space Grotesk | 64px (4rem) | 700 Bold | 1.08 | -0.035em | Main viewport value proposition & scramble titles |
| **Section Heading (H1/H2)** | Space Grotesk | 40px (2.5rem) | 600 SemiBold | 1.15 | -0.025em | Major architectural module titles & problem statements |
| **Bento Card Title (H3)** | Space Grotesk | 22px (1.375rem) | 600 SemiBold | 1.25 | -0.015em | Hardware component names & feature block headers |
| **Body Large** | IBM Plex Sans | 18px (1.125rem) | 400 Regular | 1.60 | -0.01em | Lead paragraphs & hero summaries |
| **Body Standard** | IBM Plex Sans | 15px (0.9375rem) | 400 Regular | 1.65 | normal | General descriptions, FAQ explanations, card narratives |
| **Button Text** | Space Grotesk | 14px (0.875rem) | 600 SemiBold | 1.0 | 0.04em | Interactive action buttons (All-Caps or Title-Case) |
| **Telemetry Tag / Label** | IBM Plex Mono | 12px (0.75rem) | 600 SemiBold | 1.2 | 0.08em | Category eyebrow badges, pinouts, registers, timestamps |
| **Micro Specs** | IBM Plex Mono | 11px (0.6875rem) | 400 Regular | 1.4 | 0.02em | Voltage specs, sampling rates, commit hashes, latency |

---

## Section 4: Component Stylings

### 1. Buttons & Triggers
- **Primary CTA (Hyper Blue)**:
  - Background: `#2E5BFF` with hover gradient `linear-gradient(135deg, #3B66FF, #1E43E2)`
  - Text: `#FFFFFF`, 14px, Space Grotesk, SemiBold, letter-spacing `0.04em`
  - Border: 1px solid rgba(255, 255, 255, 0.15); Box-shadow: `0 4px 20px rgba(46, 91, 255, 0.35)`
  - Hover: translateY(-2px), glow intensification `0 6px 28px rgba(46, 91, 255, 0.55)`
- **Secondary Ghost (Hardware White / Steel)**:
  - Background: `rgba(255, 255, 255, 0.04)`; Border: `1px solid rgba(255, 255, 255, 0.16)`
  - Text: `#E2E8F0`; Hover: background `rgba(255, 255, 255, 0.08)`, border `rgba(255, 255, 255, 0.32)`
- **Accent Button (Laser Emerald / Plasma Orange)**:
  - Used for live test actions ("RUN MONTE CARLO", "INSPECT HARDWARE", "SITL VALIDATION")
  - Bordered with accent color glow and interactive hover pulse.

### 2. Bento Hardware & Simulation Cards
- Background: `linear-gradient(180deg, rgba(16, 22, 34, 0.85) 0%, rgba(10, 14, 22, 0.95) 100%)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`; Border-radius: `12px`
- Backdrop blur: `16px`
- Padding: `28px` desktop, `20px` mobile
- Header: Eyebrow pill tag with indicator dot (`4px` pulsing circle)
- Interactive hover: Border switches to subtle accent hue, card content elevates by `3px`.

### 3. Telemetry Tags & Status Pills (`ineedmytag`)
- Display: Inline flex, alignment center, gap `6px`
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Radius: `4px` (industrial chamfered or tight radius)
- Font: `11px IBM Plex Mono`, uppercase

### 4. Interactive Simulation & Hardware Inspectors
- Dual tab switchers with sliding highlight pill.
- Real-time HTML5 60fps canvas monitors with grid overlays, altitude indicators, collision cones, and trajectory trails.
- Exploded-view hardware interactive board switcher (Carrier Board vs Expansion Board) with pinout inspector.

---

## Section 5: Layout Principles

- **Base Unit & Scale**: 4px atomic unit (Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`).
- **Container Max-Width**: `1280px` standard container, `1440px` wide telemetry dashboard.
- **Grid Layout**: 12-column responsive fluid grid with `24px` gutter (`16px` on mobile).
- **Whitespace Philosophy**: Crisp, intentional rhythm. Clean breathing room around massive display typography, paired with dense, organized telemetry clusters in bento boxes.
- **Border Radius Scale**:
  - `4px`: Badges, tags, code snippets, buttons, input fields
  - `8px`: Tab bars, nested hardware sub-panels, modal dialogs
  - `12px`: Bento cards, simulation viewports, main hero containers
  - `16px`: Top-level section enclosures

---

## Section 6: Depth & Elevation

- **Level 0 (Atmosphere Void)**: `#07090E` with subtle ambient radial gradients in Hyper Blue (`rgba(46, 91, 255, 0.08)`) and Emerald (`rgba(0, 255, 157, 0.04)`).
- **Level 1 (Structural Containers)**: `#0D111B` with 1px border `rgba(255, 255, 255, 0.07)`.
- **Level 2 (Interactive Cards & Viewports)**: `#121724` with glass backdrop-filter.
- **Level 3 (Modals, Tooltips & Overlays)**: `#182030` with `0 20px 50px rgba(0, 0, 0, 0.85)` and border `rgba(255, 255, 255, 0.15)`.
- **Glassmorphism**: Always accompanied by sharp 1px borders to maintain military/aerospace hardware crispness without looking muddy.

---

## Section 7: Do's and Don'ts

### Do:
- **Do** showcase concrete mathematical & hardware values: TOPS, JAX/XLA, STM32H757, NVIDIA Orin, 100,000 Monte Carlo tests, JST-GH pinouts.
- **Do** use `IBM Plex Mono` for all numbers, metrics, timestamps, and hardware registers.
- **Do** provide live interactive demonstrations (e.g. running Monte Carlo loops, interactive drone/satellite simulations, board pinout explorer).
- **Do** preserve the pitch deck's core message: *Eliminating Custom Infrastructure from Physical AI*.
- **Do** implement responsive hover states and silky micro-interactions that feel engineered like avionics hardware.

### Don't:
- **Don't** use pastel, playful, or bubbly consumer-SaaS colors (no pinks, purples, or cartoon gradients).
- **Don't** use generic stock illustrations or vague hand-waving marketing phrases.
- **Don't** leave interactive elements dead — buttons, sliders, tabs, and simulation controls must respond immediately.
- **Don't** compromise on contrast: always ensure technical text exceeds WCAG AA standards against dark surfaces.
- **Don't** create layouts that break or horizontally scroll on tablet and mobile viewports.

---

## Section 8: Responsive Behavior

- **Breakpoints**:
  - `Desktop Wide`: `> 1200px` (Full 12-column bento grid, 3-column feature spreads, side-by-side simulation dashboards)
  - `Laptop / Desktop`: `992px - 1199px` (Adjusted gutter, 2-column bento layouts, responsive telemetry)
  - `Tablet`: `768px - 991px` (Single column hero with stacked canvas visualizer, collapsible nav menu, 2-column feature cards)
  - `Mobile`: `< 768px` (Full-width stacked cards, horizontal scrollable tabs with touch snapping, tap targets `>= 44px`, scaled display fonts)

---

## Section 9: Agent Prompt Guide

### Quick Color Reference
- Void Background: `#07090E`
- Card Surface: `#0D111B` / `#131826`
- Hyper Blue: `#2E5BFF`
- Laser Emerald: `#00FF9D`
- Plasma Orange: `#FF6B00`
- Signal White: `#F7FAFC`
- Telemetry Gray: `#8A99AD`

### Component Generation Prompt Template
> "Generate an aerospace-grade bento card for Ominis Systems. Background `#0D111B` with 1px border `rgba(255, 255, 255, 0.08)` and border-radius `12px`. Include a monospace eyebrow tag in `11px IBM Plex Mono` with an animated pulsing indicator dot (`#00FF9D`). Heading in `22px Space Grotesk SemiBold` in `#F7FAFC`. Body text in `15px IBM Plex Sans` in `#E2E8F0`. Include an interactive hardware spec pill group with JST-GH telemetry connectors."
