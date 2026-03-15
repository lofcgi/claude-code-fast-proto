# Frontend Aesthetics Guide (Breaking Free from AI Slop)

Based on the Anthropic official Frontend Aesthetics guide.
Without explicit guidance, Claude converges toward "AI slop" aesthetics, so these rules must be explicitly followed.

> **Override principle**: All rules in this guide are **AI slop prevention defaults**.
> If the reference clearly uses a different style, follow the reference.
> Example: reference intentionally uses Inter font → Inter is allowed.
> Example: reference uses light background + minimal → ignore dark theme rules.

---

## Typography

### Prohibited Fonts (AI slop defaults)
- Inter, Roboto, Open Sans, Lato, Arial, Helvetica, system-ui defaults

### Recommended Fonts (by use case)
- **Code/Tech**: JetBrains Mono, Fira Code, Space Grotesk
- **Editorial**: Playfair Display, Crimson Pro, Fraunces
- **Startup/Modern**: Clash Display, Satoshi, Cabinet Grotesk
- **Distinctive**: Bricolage Grotesque, Newsreader, General Sans

### Font Weight Extreme Rules
- **Use**: 200 (thin) vs 900 (black) — create visual hierarchy through extreme contrast
- **Prohibited**: 400 vs 600 — too similar, weak hierarchy

### Size Jump Rules
- **Required**: 3x+ size difference between body and heading (e.g., body 16px → heading 48-96px)
- **Prohibited**: 1.5x jump (e.g., body 16px → heading 24px) — lacks visual impact

---

## Color & Theme

### Palette Composition Principles
- **Dominant color + sharp accent** — one color dominates, accent provides focal points
- **Equal distribution prohibited** — using 3 colors at 33% each creates no visual focus
- **Maintain consistency with CSS variables** — see design-tokens.ts

### Prohibited Combinations (cliches)
- Purple gradient + white background (2023 AI landing cliche)
- Blue→purple gradient (overused)
- Achromatic-only palette (no visual energy)

### Dark Theme Guide
- Background: deep black (`#09090b`, `#0a0a0a`) — `#1a1a1a` is too bright
- Cards: `bg-white/5` ~ `bg-white/8` — `bg-gray-800` prohibited (too bright and flat)
- Text: `text-white/90` (primary), `text-white/60` (secondary)
- Borders: `border-white/10` — `border-gray-700` prohibited
- Generate energy with vivid accents

### Light Theme Guide
- Background: warm white (`#fafaf9`, `#f5f5f4`) — avoid pure `#ffffff`
- Cards: `bg-white` + subtle shadow — `bg-gray-100` prohibited
- Bold primary color leads
- Subtle warm tones on surfaces (ivory, cream)

---

## Motion & Animation

### Core Principles
- **Orchestration** > individual animations — one well-coordinated page load (staggered reveal) is more powerful than scattered micro-interactions
- **Focus on high-impact moments**: page load, Hero entry, section scroll entry
- **Purposeless animation prohibited** — every motion must have a reason

### Spring Physics (Required)
```tsx
transition={{
  type: "spring",
  stiffness: 200,
  damping: 25,
}}
```
- **linear easing strictly prohibited**
- **ease-in-out discouraged** — spring feels more natural

### Staggered Reveal Pattern (Required for Hero)
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};
```

### Scroll Reveal Pattern (Section Entry)
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
>
```

---

## Backgrounds & Depth

### Core Principles
- **Solid color background as default is prohibited** — minimum 2 layers
- **Hero requires 5 layers** (see visual-architecture.md)
- **Regular sections need 2+ layers**: gradient + pattern (grid/dots/noise)
- **Goal is to create atmosphere and depth**

### Layer Options
| Layer Type | Example | Purpose |
|-----------|---------|---------|
| Gradient | `radial-gradient(ellipse at 50% 0%, ${primary}20, transparent)` | Spatial depth |
| Pattern | `bg-grid`, `bg-dots` | Texture |
| Noise | `bg-noise` (::after) | Depth |
| Particles | `<Sparkles>`, `<Meteors>` | Liveliness |
| SVG Effects | `<BackgroundBeams>` | Movement |
| Blur Blobs | `blur-3xl rounded-full` div | Soft ambient light |

---

## Absolute Blocklist ("AI Slop" Indicators)

If any of these items appear in your code, fix them immediately:

1. **Uniform 3-column identical grids** → BentoGrid or asymmetric layouts
2. **Center-aligned-only layouts** → asymmetric placement in at least 2 sections
3. **All cards same size/shape** → size variations, BentoGrid
4. **Flat cards without hover effects** → border glow + scale(1.02)
5. **Feature cards with only icons + text** → images or CSS visuals required
6. **Gray placeholders** → CSS mockups, gradients, real images
7. **Too few sections (under 8)** → minimum 8 sections
8. **Conservative typography (text-4xl Hero)** → text-6xl md:text-8xl font-black
9. **Basic filled buttons (no glow)** → glow box-shadow 30px+ required
10. **Inter/Roboto/Arial fonts** → use recommended fonts
11. **Hero background is a single CSS gradient** → 5-layer required
12. **py-24/py-32 section padding** → py-40 minimum
13. **BrowserMockup without shadow/perspective** → 3D perspective + tinted shadow
14. **Equal distribution palette** → dominant + sharp accent
15. **linear easing** → spring physics
