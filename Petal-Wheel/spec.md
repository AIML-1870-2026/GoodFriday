# RGB Waterfall Color Explorer — Project Spec

## Overview
A single-page HTML/CSS/JS web app combining an **animated nature scene** with a functional **color tool**. The scene depicts a nighttime lagoon fed by three glowing waterfalls (Red, Green, Blue). Users control the RGB mix via waterfall sliders, and a palette generator produces color schemes from the mixed color.

---

## Visual Theme & Aesthetic Direction

**Tone:** Organic/natural meets bioluminescent fantasy. Think glowing midnight jungle — deep teals, navy blacks, and luminous water effects.

**Fonts:**
- Display: *Cinzel* or *Cormorant Garamond* for titles and labels
- Body/UI: *DM Mono* or *Courier Prime* for values and palette codes

**Color Palette (UI Chrome):**
- Background: `#050d1a` (deep navy)
- Panel overlays: `rgba(5, 20, 40, 0.75)` with backdrop-filter blur
- Accent glow: match waterfall colors (`#ff4444`, `#44ff44`, `#4488ff`)

**No generic AI aesthetics** — no purple gradients, no Inter font, no flat cards.

---

## Scene Layout

### Canvas / Scene (top ~60% of viewport)
Render using an HTML5 `<canvas>` element (or layered CSS + SVG).

**Scene elements (back to front):**
1. **Sky** — dark gradient (`#050d1a` → `#0a1a2e`), scattered twinkling stars (random small circles/dots that fade in/out with CSS animation or JS)
2. **Moon** — large pale circle, slightly off-center, with a soft glow halo (`box-shadow` or radial gradient)
3. **Rocky cliffs** — silhouette shapes on left, center, right
4. **Three Waterfalls** — one per cliff (Left = Red, Center = Green, Right = Blue). Each waterfall:
   - Rendered as animated vertical particle streams or animated CSS gradient strips
   - Color is the pure channel color, brightness/opacity driven by its RGB value (0–255)
   - At value 0, the waterfall is nearly invisible/dry; at 255, it glows vividly
   - Add animated foam/spray particles at base
5. **Lagoon** — wide body of water at the bottom of the scene:
   - Fill color = the mixed RGB color (e.g., `rgb(r, g, b)`)
   - Animated shimmer/ripple effect (CSS keyframe or canvas waves)
   - Reflects the moon and waterfall colors with subtle opacity

**Waterfall Labeling:** Each waterfall has a small glowing label above it ("RED", "GREEN", "BLUE") in its respective color.

---

## Controls Panel (below scene)

### Section 1 — Waterfall Controls (RGB Mixer)

Three vertical sliders, one per waterfall:
- Label: "FLOW" above each slider, current numeric value (0–255) below
- Slider thumb styled to match channel color
- Slider track: dark with colored fill proportional to value
- Moving a slider instantly updates:
  - The corresponding waterfall brightness/opacity in the scene
  - The lagoon color
  - The hex and RGB readout

**Color Readout Box:**
- Displays a swatch of the current mixed color
- Shows: `HEX: #rrggbb` and `RGB: r, g, b`
- Copy-to-clipboard button for hex code

---

### Section 2 — Palette Generator

**Base Color Input:**
- Uses the currently mixed lagoon color as the base color (auto-synced)
- "LOCK COLOR" toggle — locks the base color so adjusting sliders doesn't change the palette base
- "RANDOM COLOR" button — picks a random color, updates sliders and scene to match

**Palette Scheme Buttons (horizontal button group):**
- Complementary
- Analogous
- Triadic
- Split-Complementary
- Tetradic

Clicking a button generates and displays that color scheme below.

**Palette Display:**
- Row of color swatches (rectangles)
- Each swatch shows: color block, hex code beneath, copy icon
- Swatches animate in with a staggered fade/slide

**Export Button:**
- "EXPORT PALETTE" — downloads a `.json` file containing:
  ```json
  {
    "baseColor": "#rrggbb",
    "scheme": "triadic",
    "colors": ["#hex1", "#hex2", "#hex3"],
    "generatedAt": "ISO timestamp"
  }
  ```
- Optionally also offer "Copy CSS Variables" which copies a block of `--color-1: #hex;` variables to clipboard

---

## Color Math (Palette Generator Logic)

All calculations in HSL space. Convert RGB → HSL, rotate hues, convert back.

| Scheme | Logic |
|---|---|
| Complementary | Base + H+180° |
| Analogous | H-30°, Base, H+30° |
| Triadic | Base, H+120°, H+240° |
| Split-Complementary | Base, H+150°, H+210° |
| Tetradic | Base, H+90°, H+180°, H+270° |

---

## Animations & Effects

| Element | Animation |
|---|---|
| Stars | Random twinkle — opacity oscillates, staggered delays |
| Moon | Subtle pulse glow |
| Waterfalls | Vertical scroll/flow animation; speed scales with flow value |
| Lagoon | Horizontal sine wave shimmer; color transitions smoothly on slider change |
| Waterfall particles | Small dots/sparkles at base, fade out upward |
| Palette swatches | Staggered slide-up + fade-in on scheme change |
| Slider change | Lagoon color transitions with CSS `transition: background 0.3s ease` |

---

## Technical Requirements

- **Single HTML file** (inline CSS + JS, or `<style>` and `<script>` tags)
- No build tools, no npm — pure vanilla HTML/CSS/JS
- Canvas API preferred for the waterfall scene animation
- Mobile-responsive: scene scales down, controls stack vertically on narrow screens
- No external dependencies except optional Google Fonts CDN link

---

## File Structure

```
index.html         ← entire app (scene + controls + logic)
```

---

## Acceptance Criteria

- [ ] Three animated waterfalls visible in nighttime scene
- [ ] Each waterfall's visual brightness/opacity responds to its slider
- [ ] Lagoon color updates in real time as RGB sliders change
- [ ] Stars twinkle, moon glows, scene feels alive
- [ ] Hex + RGB readout is always accurate
- [ ] All 5 palette schemes generate correct colors
- [ ] Palette swatches are clickable and copy hex to clipboard
- [ ] Random color button works and updates scene
- [ ] Export downloads valid JSON
- [ ] Works in modern Chrome/Firefox/Safari without errors
