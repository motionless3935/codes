# Design System: Mid-Century Modern (Paul Rand / Saul Bass)
## Ominis Systems — Physical AI & Aerospace Autonomy

**School**: Specialty / Genre (Mid-Century American Graphic Modernism & Information Architecture)  
**Vibe**: 1950s–1960s American graphic modernism — bold geometric silhouettes, considered hand-cut paper feel, Blue Note jazz-album typographic confidence, and Paul Rand corporate identity rigor.  
**Touchstones**: IBM logo & identity (Paul Rand), Saul Bass film titles & posters (*Vertigo*, *Anatomy of a Murder*), Alvin Lustig book jackets (New Directions), Reid Miles Blue Note jazz album sleeves, Swiss style infused with American wit.

---

## Section 1: Visual Theme & Atmosphere

Ominis Systems reinterprets physical AI and aerospace autonomy through the lens of **Mid-Century Graphic Modernism**. Instead of clichéd dark-mode sci-fi neon and generic SaaS rounded cards, the interface commands attention with the editorial authority and graphic fearlessness of Paul Rand, Saul Bass, and Reid Miles.

The atmosphere feels like an original 1962 MIT Lincoln Laboratory symposium program or a Blue Note record sleeve: warm unbleached paper cream, heavyweight charcoal ink, bold sunburst mustard, terra cotta brick, and muted ocean teal. Flat geometric shapes—monolithic circles, sharp triangles, half-moons, and ruled horizontal bands—lead the composition.

### Key Visual Characteristics
- **Warm Ground Paper Base**: Warm cream (`#EBE3D2`) and tactile bone (`#F7F4EC`) ground surfaces with a delicate paper-grain texture replacing sterile digital voids.
- **Zero Radius Architecture**: Strict `0px` border-radius throughout all UI elements (buttons, cards, badges, inputs, dialogs). Mid-century modernism is geometric, razor-sharp, and architectonic.
- **Flat Graphic Planes**: Zero soft box-shadows, zero blur filters, and zero color gradients. Depth is established through hard ink boundaries (`2px solid #1A1A18`) and solid geometric color blocking.
- **Figures-as-Image**: Numerals (01, 02, 100K, 60FPS) treated as monumental graphic illustrations, commanding space alongside concise editorial serif body text.
- **Triadic Color Discipline**: Never more than 3 colors per composition. One bold accent (Mustard `#D9A441` or Brick `#C24D2C`), supported by ground Cream (`#EBE3D2`) and Ink (`#1A1A18`).
- **Typographic Dialectic**: Bold geometric grotesque display typography (`Space Grotesk` / `Futura` ethos) at large poster scales paired with refined humanist serif prose (`EB Garamond`) at 16–17px.
- **Saul Bass Motion Cadence**: Minimal, intentional motion. Shapes snap into place on a single beat like a Bass title sequence; no floaty elastic springs or frivolous bouncy physics.
- **Graphic Identity Homage**: Striped brand motifs and geometric cutouts honoring Paul Rand's 8-bar IBM identity and Alvin Lustig's abstract geometry.

---

## Section 2: Color Palette & Roles

Every color follows strict mid-century poster printing constraints. Colors represent distinct ink plates applied to tactile ground paper.

### Primary Surfaces & Ground
- **Warm Cream Ground** (`#EBE3D2` / `var(--ground-cream)`): Primary canvas ground; warm, unbleached letterpress paper.
- **Bone White Ground** (`#F7F4EC` / `var(--ground-light)`): Secondary elevated surface; crisp linen card stock.
- **Card Kraft Tint** (`#E3DAC5` / `var(--ground-card)`): Container and module backgrounds with warm natural pulp tone.
- **Charcoal Ink** (`#1A1A18` / `var(--ink)`): Primary structural color, borders, headlines, and typographic ink plate.
- **Muted Ink** (`#4A4A45` / `var(--ink-muted)`): Secondary descriptive text, captions, and fine technical annotations.

### Mid-Century Accent Ink Plates
- **Poster Mustard** (`#D9A441` / `var(--mustard)`): Primary hero accent, key metric blocks, active state tabs, and primary action buttons.
- **Terra Cotta Brick** (`#C24D2C` / `var(--brick)`): High-priority warnings, hardware bottlenecks, critical flight indicators, and fault injection tags.
- **Muted Ocean Teal** (`#3D6E70` / `var(--teal)`): Satellite orbit visualizations, verified test badges, secondary action pills, and code block headers.
- **Solid Ink Border** (`#1A1A18` / `var(--border-ink)`): Crisp 1.5px and 2px solid lines bounding every container and module.

### Palette Combinations (3 Colors Max Per Module)
1. **The Classic Rand**: Warm Cream (`#EBE3D2`) + Charcoal Ink (`#1A1A18`) + Poster Mustard (`#D9A441`).
2. **The Bass Title**: Warm Cream (`#EBE3D2`) + Charcoal Ink (`#1A1A18`) + Terra Cotta Brick (`#C24D2C`).
3. **The Blue Note Modern**: Warm Cream (`#EBE3D2`) + Muted Teal (`#3D6E70`) + Charcoal Ink (`#1A1A18`).

---

## Section 3: Typography Rules

### Font Families
- **Display & Section Headers**: `'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif` — Geometric grotesque at large scale, uppercase and tight letterforms reminiscent of Futura and ITC Avant Garde.
- **Body & Prose**: `'EB Garamond', Garamond, 'Georgia', serif` — Humanist serif at 16–18px, providing warm editorial authority and natural cadence.
- **Telemetry & Technical Specs**: `'IBM Plex Mono', 'Courier New', monospace` — Precision monospace honoring Paul Rand's IBM heritage.

### Typography Hierarchy Table

| Role | Font Family | Size | Weight | Line Height | Letter Spacing | Case | Functional Application |
|---|---|---|---|---|---|---|---|
| **Monumental Display** | Space Grotesk | 54–68px | 700 Bold | 1.05 | -0.03em | Title / Sentence | Main hero headline with cut-paper confidence |
| **Section Title** | Space Grotesk | 36–42px | 700 Bold | 1.15 | -0.02em | Sentence / Title | Module headers, architectural problem statements |
| **Poster Subhead** | Space Grotesk | 20–24px | 600 SemiBold | 1.25 | -0.01em | Normal | Card titles, feature names, telemetry subtitles |
| **Figures-as-Image** | Space Grotesk | 38–52px | 700 Bold | 1.00 | -0.04em | Normal | Hero numbers (01, 100K, 60 FPS, 100 TOPS) |
| **Lead Paragraph** | EB Garamond | 19–21px | 400 Regular | 1.55 | 0 | Normal | Executive lead summaries and thesis statements |
| **Body Standard** | EB Garamond | 16–17px | 400 Regular | 1.65 | 0.01em | Normal | Detailed explanations, documentation, FAQ answers |
| **Poster Button** | Space Grotesk | 13–14px | 700 Bold | 1.00 | 0.06em | UPPERCASE | Interactive action buttons & triggers |
| **Technical Stamp / Tag** | IBM Plex Mono | 11–12px | 600 SemiBold | 1.20 | 0.08em | UPPERCASE | Category eyebrows, status stamps, register labels |

---

## Section 4: Component Stylings

### 1. Buttons & Triggers
- **Primary Poster Action (Mustard / Ink)**:
  - Background: `#D9A441`; Text: `#1A1A18`; Border: `2px solid #1A1A18`.
  - Border-radius: `0px` strictly.
  - Hover: Background `#1A1A18`, Text `#EBE3D2`, slight transform `translate(-2px, -2px)` with hard solid offset `2px 2px 0 #1A1A18`.
- **Secondary Action (Cream / Brick)**:
  - Background: `#EBE3D2`; Text: `#1A1A18`; Border: `2px solid #1A1A18`.
  - Hover: Background `#C24D2C`, Text `#F7F4EC`.
- **Ghost / Outline Action**:
  - Background: `transparent`; Text: `#1A1A18`; Border: `2px solid #1A1A18`.
  - Hover: Background `#1A1A18`, Text `#EBE3D2`.

### 2. Bento & Module Cards
- Background: `#F7F4EC` (Bone White) or `#E5DCBA` (Kraft Tint).
- Border: `2px solid #1A1A18` (solid ink boundary).
- Border-radius: `0px` (sharp geometric rectangle).
- Padding: `28px` desktop, `20px` mobile.
- Header: Bold geometric index number (`01`, `02`, `03`) set as a solid ink or mustard badge.
- Shadows: Strictly `none` (or hard solid offset `4px 4px 0 #1A1A18`).

### 3. Forms & Inputs
- Inputs, selects, and textareas: Ground `#FFFFFF` or `#F7F4EC`, Border `2px solid #1A1A18`, Radius `0px`.
- Focus state: Border `2px solid #D9A441` with solid hard offset `2px 2px 0 #1A1A18`.
- Checkboxes: Square `0px` radius, thick ink checkmark.

### 4. Navigation & Top Ticker
- Top Ticker: Warm Kraft ground `#E5DCBA`, bottom border `2px solid #1A1A18`, typewriter monospace ink text.
- Header: Warm Cream ground `#EBE3D2`, bottom border `2px solid #1A1A18`, bold graphic logo mark with Paul Rand geometric bars.

### 5. Interactive Sim & Canvas HUD
- Canvas Ground: Warm paper tone `#F0E9DC` with ink coordinate grid.
- Vector Swarm: Crisp geometric triangles in solid ink `#1A1A18`, mustard `#D9A441`, and brick `#C24D2C`.
- HUD Panels: Flat bone card containers framed in 2px ink borders.

---

## Section 5: Layout Principles

- **Structured Modernist Grid**: Based on multiples of 8: `4px / 8px / 16px / 24px / 32px / 48px / 64px`.
- **Asymmetric Poster Balance**: Clean tension between large monolithic solid shapes and disciplined typographic columns.
- **Rhythmic Horizontal Rules**: Clean `2px solid #1A1A18` rules dividing thematic movements, evoking mid-century architectural publications.
- **Container Max-Width**: `1200px` centered with generous typographic margins.

---

## Section 6: Geometric & Abstract Shape System

- **Monolithic Circle**: Large solid Mustard `#D9A441` or Brick `#C24D2C` circle anchoring the hero and section intros.
- **Graphic Striped Bars**: Homage to Paul Rand's 8-bar IBM identity used as section dividers and brand marks.
- **Half-Moon & Wedge Cuts**: Geometric silhouettes providing visual anchor points for complex telemetry data.
- **Hand-Cut Paper Feel**: Subtle micro-irregularities and paper grain texture overlay creating an authentic letterpress tactile feel.

---

## Section 7: Motion & Micro-interactions

- **Saul Bass Title Beat**: Transitions are brief, punchy, and deliberate (`0.15s` to `0.2s` with `cubic-bezier(0.25, 1, 0.5, 1)`).
- **Zero Floaty Springs**: Avoid bouncy rubber-band animations. Elements snap into position like cut-paper cards hitting a light table.
- **Hover Transitions**: Color inversions (e.g. Mustard to Ink, Cream to Brick) on a crisp 120ms tick.

---

## Section 8: Imagery & Illustration

- **Vector-First Modernism**: All visual diagrams, hardware schematics, and simulation models are rendered as crisp flat vector graphics.
- **Paper Grain Texture**: Fine SVG noise texture (`feTurbulence`) layered over the cream background at low opacity (`0.035`), imparting authentic archival print texture.
- **Zero Generic Photography**: Illustration, geometric silhouette, and schematic diagrams lead every visual touchpoint.

---

## Section 9: Do's and Don'ts / Anti-Patterns

### Strictly Prohibited (Avoid)
- **NO Gradients**: Absolutely zero linear or radial color gradients. Mid-century modern is flat color.
- **NO Rounded Corners**: Never use `border-radius: 4px`, `8px`, or `16px`. Radius is `0px` everywhere.
- **NO Soft Shadows**: Never use `box-shadow: 0 10px 30px rgba(0,0,0,0.2)`. Shadows are strictly `none` or hard solid offsets (`3px 3px 0 #1A1A18`).
- **NO Neon Glows**: No `text-shadow: 0 0 15px #00FF9D` or glowing laser borders.
- **NO Dark Void Backgrounds**: Replace obsidian/black backgrounds with tactile cream `#EBE3D2` and bone `#F7F4EC`.
- **NO More Than 3 Colors Per Piece**: Maintain strict palette discipline.
