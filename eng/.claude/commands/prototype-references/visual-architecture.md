# Visual Architecture Guidelines (Quality Floor + Smart Defaults)

Rules in this file are split into 2 tiers:
- **Tier 1 (Absolute)**: Reference-independent. AI slop prevention + quality floor. Always apply.
- **Tier 2 (Smart Default)**: Can be overridden when the reference clearly has a different style.

Each section is tagged with [Tier 1] or [Tier 2].

---

## Hero Architecture (Reference Fidelity Based)

Every landing page's Hero section must have **visual density equal to its reference**.
If the reference has 3 layers, 3 layers is OK. If it has 5 layers, 5 layers required.

### Required Elements [Tier 1]
- **Product UI is the hero** — No Hero without app screenshots/demos
- Background effects (beam, aurora, sparkle) are **optional** — only use when present in the reference

### Layer Composition [Tier 2 — adjust to match reference]

```
Layer 1: Base surface color (palettes.x.surface)
Layer 2: Background effect — only if present in reference (<BackgroundBeams> | <LampEffect> | <AuroraBackground>)
Layer 3: Pattern overlay — only if present in reference (bg-grid | bg-dots | bg-noise)
Layer 4: Radial glow (radial-gradient with primary color, 15-25% opacity)
Layer 5: Product UI screenshot/demo (required) — BrowserMockup or app preview
```

### Code Pattern [Tier 2 — override if reference layout differs]:

```tsx
<section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: p.surface }}>
  {/* Layer 2: Background effect — only when in reference */}
  {/* <BackgroundBeams primaryColor={p.primary} /> */}
  {/* Layer 3: Pattern overlay — only when in reference */}
  {/* <div className="absolute inset-0 bg-grid" /> */}
  {/* Layer 4: Radial glow */}
  <div
    className="absolute inset-0"
    style={{
      background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${p.primary}25, transparent)`,
    }}
  />
  {/* Content — must be z-10+ */}
  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-4">
    {/* Left: text + CTA */}
    <div className="flex-1">
      {/* Hero headline + subtext + CTA */}
    </div>
    {/* Right: Product UI (required) */}
    <div className="flex-1">
      <BrowserMockup url="app.example.com">
        <img src="/screenshots/a-app.png" alt="App Preview" className="w-full" />
      </BrowserMockup>
    </div>
  </div>
</section>
```

### Reference Pattern Examples:
- **perso.ai style**: Large text left + overlapping app windows right (main + floating panels)
- **linear.app style**: Center text + full-width product screenshot below
- **vercel.com style**: Large center text + code/terminal demo
- **notion.so style**: Minimal text + product UI illustration
- **framer.com style**: Typography-driven Hero + interactive demo
- **stripe.com style**: Code block + live result preview

→ Analyze the reference and identify the closest pattern, then implement using that pattern.
  If it doesn't match any example above, extract the pattern directly from the reference.

---

## Typography Hierarchy [Tier 2 — reference typography takes priority]

### Hero Headline
- **Smart Default**: `text-6xl md:text-8xl font-black tracking-tight`
- **If reference uses elegant serif `text-4xl`** → follow the reference
- **Key keyword**: `<GradientText>` wrapping recommended (can omit if reference has no gradient text)

```tsx
<h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
  Build with{" "}
  <GradientText from={p.primary} to={p.accent}>
    Confidence
  </GradientText>
</h1>
```

### Section Heading
- **Required**: `text-3xl md:text-5xl font-bold`
- **Strictly forbidden**: text-2xl, text-xl (too small)

```tsx
<h2 className="text-3xl md:text-5xl font-bold tracking-tight">
  Why teams choose <GradientText from={p.primary} to={p.accent}>us</GradientText>
</h2>
```

### Subtext
- **Required**: `text-lg md:text-xl text-muted-foreground max-w-2xl`

### Font Weight Extremes [Tier 2]
- **Smart Default**: weight 200 (thin/light subtext) vs weight 900 (black headlines)
- **If reference uses 400/700 combination** → follow the reference
- **Forbidden (Tier 1)**: Using only weight 400 vs 600, resulting in no hierarchy

---

## CTA Button Premium

### Glow Shadow [Tier 2 — reference CTA style takes priority]
The smart default for filled/ghost buttons is a glow box-shadow.
If the reference uses minimal solid buttons → follow the solid style.

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  className="px-10 py-4 text-base font-semibold rounded-full cursor-pointer"
  style={{
    backgroundColor: p.primary,
    color: p.mode === "dark" ? "#000" : "#fff",
    boxShadow: `0 0 30px ${p.primary}66, 0 0 60px ${p.primary}33`,
  }}
>
  Start Building Free <ArrowRight className="ml-2 inline w-4 h-4" />
</motion.button>
```

### CTA Rules:
- **Minimum size**: `px-10 py-4 text-base` (px-6 py-2 is too small) [Tier 2]
- **Glow**: `box-shadow: 0 0 30px ${primary}66, 0 0 60px ${primary}33` [Tier 2 — omit if reference is solid]
- **Hover**: `scale(1.05)` + glow intensify [Tier 1 — whileHover required]
- **whileTap**: `scale(0.97)` feedback [Tier 1 — interaction feedback required]
- **Secondary CTA**: ghost style + subtle border, no glow needed

---

## BrowserMockup Premium [Tier 1]

Apply at least one of: 3D perspective transform or color-tinted shadow.

```tsx
<div
  className="relative mx-auto max-w-5xl"
  style={{
    transform: "perspective(1200px) rotateY(-5deg) rotateX(2deg)",
    boxShadow: `0 25px 60px ${p.primary}40`,
  }}
>
  <BrowserMockup url="app.example.com">
    <img
      src="/screenshots/a-app.png"
      alt="App Preview"
      className="w-full"
    />
  </BrowserMockup>
</div>
```

### Rules:
- **3D perspective**: `perspective(1200px) rotateY(-5deg) rotateX(2deg)` — depth effect
- **Color-tinted shadow**: primary color 25-40% opacity, 20-60px blur
- **No flat mockups** — plain border box without shadow forbidden

### Anti-pattern: Wireframe Mockup
Forbidden:
- Dashed border upload area + random bar chart = wireframe
- Mockup showing only feature page empty state
- Simple card with fewer than 5 UI elements

Instead, reproduce the richest state of the feature page (mid-workflow with populated data).

---

## Section Spacing [Tier 2 — reference spacing patterns take priority]

- **Smart Default**: `py-40` or more
- **If reference has tight `py-24` density** → follow the reference
- **Hero**: `min-h-screen` (no py needed)
- **Between sections**: gradient divider or sufficient transparent spacing

```tsx
{/* Correct section padding */}
<section className="relative py-40 overflow-hidden">
  <div className="container mx-auto px-4">
    {/* Section content */}
  </div>
</section>

{/* Optional: gradient divider between sections */}
<div
  className="h-px w-full"
  style={{
    background: `linear-gradient(90deg, transparent, ${p.primary}30, transparent)`,
  }}
/>
```

---

## Noise Texture [Tier 2 — can omit if not in reference]

Apply bg-noise class to all sections with gradients (Smart Default).

```tsx
{/* position: relative required — ::after uses absolute positioning */}
<section className="relative bg-noise" style={{ background: `linear-gradient(...)` }}>
  {/* Content must be z-10+ to appear above noise */}
  <div className="relative z-10">...</div>
</section>
```

---

## Feature Card [Tier 1 — images required]

Text+icon-only cards strictly forbidden. Each Feature card must include an actual image or CSS visual.

```tsx
<motion.div
  whileHover={{ scale: 1.02, borderColor: `${p.primary}40` }}
  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
  style={{
    boxShadow: `0 0 0 0 ${p.primary}00`,
  }}
>
  {/* Image or CSS visual — required */}
  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-white/5 to-white/0">
    <img
      src={featureImage}
      alt={featureTitle}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  <h3 className="text-xl font-bold mb-2">{featureTitle}</h3>
  <p className="text-muted-foreground text-sm">{featureDescription}</p>
</motion.div>
```

### Hover effects:
- **Border glow**: `borderColor: ${p.primary}40`
- **Scale**: `scale(1.02)`
- **Image zoom**: `group-hover:scale-105`

---

## Visual Density Rules by Section Type [Tier 2 — reference density takes priority]

All sections must meet the minimum visual density below (Smart Default). If the reference's density pattern differs, follow the reference.

| Section Type | Min Layers | Image Required | Decorative Elements | Hover Effects |
|-------------|-----------|---------------|--------------------|----|
| Hero | Match reference | Product UI screenshot 1 (required) | Match reference | N/A |
| Trust Metrics | 2 | Optional | NumberTicker glow | N/A |
| Feature (App UI) | 2 | App screenshot | Tab switching interaction | border glow + scale |
| Feature BentoGrid | 2 | 1 per card | SpotlightCard | border glow + scale |
| Feature Spotlight | 2 | 1 per card | Spotlight cursor | border glow + scale |
| Comparison Table | 2 | Optional | gradient header | row hover |
| Testimonial | 2 | Avatar 64px | Optional | card lift |
| Process Steps | 2 | Screenshot per step | Number glow | N/A |
| Stats | 2 + Sparkles | Optional | Full-bleed gradient | N/A |
| Client Logos | 1 | Logos | marquee | grayscale→color |
| FAQ | 2 | Optional | accordion spring | open/close |
| Pricing | 2 | Optional | Center card glow | card scale |
| Footer CTA | 2 + decorative | Optional | BackgroundBeams | CTA glow |

### Social Proof Sections [Tier 2 — when present in reference]

**Problem**: With only Hero + Features and no Testimonials/Stats/FAQ, the site looks like a "feature listing page".
This is the main cause of structural gaps compared to the reference.

**Solution**: If the reference has social proof sections (Testimonials, Stats, FAQ), they must be included.

#### Testimonials [Tier 2 — when present in reference]:
- Count/layout: Follow the reference's quantity and grid pattern
- Avatars: Unsplash portrait required (no placeholder divs) [Tier 1]
- Card style: Follow the reference's card pattern

#### Stats [Tier 2 — when present in reference]:
- Metric count/size: Follow the reference's pattern
- `whileInView` animation [Tier 1]

#### FAQ [Tier 2 — when present in reference]:
- Q&A count: Follow the reference's pattern
- Accordion interaction (AnimatePresence) [Tier 1]

### SectionWrapper Required [Tier 1]

All sections must use `SectionWrapper` or equivalent minimum 2-layer background:
- Layer 1: Base gradient or pattern
- Layer 2: Radial accent glow
- Layer 3: Noise texture (optional)
- Content: wrapped in scroll-reveal animation

### Section Transitions

Use gradient dividers between sections for visual separation:
```tsx
<div
  className="h-px w-full"
  style={{ background: `linear-gradient(90deg, transparent, ${p.primary}30, transparent)` }}
/>
```

### Post-Hero Visual Depth Maintenance [Tier 1]

**Problem**: Hero is rich but remaining sections have "visual depth collapse" — solid backgrounds + text only.

**Solution**:
1. Apply SectionWrapper to all sections (minimum 2 layers)
2. Place a "visual anchor" section every 3-4 sections:
   - **App UI Feature**: Text left + app screenshot right (tab switching between features)
   - Product Demo: BrowserMockup + tinted shadow
   - Footer CTA: Large headline
3. Feature cards must include images (text+icon only forbidden)
4. Testimonials must have 64px avatar images
