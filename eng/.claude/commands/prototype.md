---
description: Generate 3 UI prototype interfaces using v0, design references, and AI components
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:v0:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*"]
---

Read analysis/prd.md and generate 3 UI interface prototypes.

## Pre-flight Checks (run first)

1. **Environment Variable & MCP Live Verification** (must follow this order):

   a) Check required environment variables via Bash:
      ```bash
      echo "FIRECRAWL_API_KEY=${FIRECRAWL_API_KEY:+set}"
      echo "SERPER_API_KEY=${SERPER_API_KEY:+set}"
      echo "TWENTY_FIRST_API_KEY=${TWENTY_FIRST_API_KEY:+set}"
      echo "UNSPLASH_ACCESS_KEY=${UNSPLASH_ACCESS_KEY:+set}"
      ```
      → If output is empty, that environment variable is ❌

   b) Test each required MCP server with a real call (verify tools actually work):
      - Firecrawl: call `firecrawl_scrape` (url: "https://example.com", formats: ["markdown"])
      - Design Inspiration: simple search test call
      - 21st-dev Magic: simple component search test call
      - Context7: call `resolve-library-id` (libraryName: "react", query: "test")
      - v0: call `getUser` to verify authentication status
      → If each call returns without error ✅, if error occurs ❌

   c) Display results in a table:
      | MCP Server | Env Var | Test Call | Final | Required | Purpose |
      |------------|---------|-----------|-------|----------|---------|
      | Firecrawl | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | Competitor app UI research |
      | Design Inspiration | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | Design reference research |
      | 21st-dev Magic | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | UI component generation/polishing |
      | Context7 | N/A | ✅/❌ | ✅/❌ | **Required** | Latest framework docs reference |
      | v0 | N/A | ✅/❌ | ✅/❌ | **Required** | Prototype code generation |
      | Unsplash API | ✅/❌ | N/A | ✅/❌ | Recommended | High-quality images for landing pages |

> **⛔ CRITICAL: If any required MCP Final status is ❌ — stop immediately.**
> **Never bypass with "proceeding without", "skipping", etc.**
> Display the following guidance and do NOT begin prototyping:
> 1. Check if `.mcp.json` exists → if not, run `cp .mcp.json.example .mcp.json`
> 2. Set required API key environment variables:
>    - `FIRECRAWL_API_KEY` — https://firecrawl.dev
>    - `SERPER_API_KEY` — https://serper.dev (for Design Inspiration)
>    - `TWENTY_FIRST_API_KEY` — https://21st.dev (for Magic MCP)
> 3. Restart Claude Code (exit → claude)
> 4. Verify all required servers show ✅ with `/mcp` command
> 5. Run `/prototype` again

2. Verify analysis/prd.md and analysis/requirements.json exist
   → If missing, display "Please run /analyze first" and stop

---

## Phase 1: Research (output: `prototypes/research.md`)

1. Read analysis/prd.md and analysis/requirements.json.

2. **Call Design Inspiration MCP and record results in research.md**:
   - Call `collectui_search` or `collectui_browse` with 3-4 keywords related to the PRD domain
   - Analyze UI layouts, color schemes, typography, and interaction patterns
   - **Search for at least 3 distinctly different visual styles, including both dark mode and light mode**
   - **You MUST record all results in `prototypes/research.md`**

3. **Call 21st-dev Magic MCP `component_inspiration` and record results in research.md**:
   - Search for 3-4 key component types needed for the project (e.g., card, sidebar, table, kanban)
   - **You MUST record all results in `prototypes/research.md`**

4. **Scrape 2-3 competitor apps with Firecrawl and record results in research.md**:
   - Crawl competitor apps or similar services mentioned in the PRD using `firecrawl_scrape`
   - Analyze UI layouts, navigation patterns, and branding (colors, fonts)
   - **Extract 3 distinctly different palette directions from competitor app color schemes. At least one must use a fundamentally different hue.**
   - **You MUST record all results in `prototypes/research.md`**

5. **Scrape 2-3 modern landing page references with Firecrawl and record results in research.md**:
   - Research the latest SaaS/app landing page trends (e.g., perso.ai, linear.app, vercel.com, cal.com)
   - Analysis points:
     - Hero section composition (headline + subtext + CTA placement)
     - Scroll animation patterns (fade-in, slide-up, parallax)
     - Section transition methods (full-screen snap, smooth scroll)
     - Trust element placement (logo marquee, statistics, social proof)
     - CTA button styles and placement strategies
   - **You MUST record all results in `prototypes/research.md`**

6. **🆕 Premium Component Mapping — Scrape Aceternity UI & Magic UI galleries with Firecrawl**:
   - Scrape `https://ui.aceternity.com/components` → extract list of premium component names + descriptions
   - Scrape `https://magicui.design/docs/components` → extract list of animation component names + descriptions
   - Map PRD sections to premium components and record in research.md §7:
     ```
     ## 7. Premium Component Mapping
     PRD section → premium component mapping:
     - Hero: AuroraBackground, HeroParallax, LampEffect, BackgroundBeams
     - Features: BentoGrid, CardSpotlight, GlareCard, MagicCard
     - Social Proof: InfiniteMovingCards, AnimatedBeam, NumberTicker
     - Background: SparklesCore, Meteors, DotPattern, GridPattern
     - Navigation: FloatingNavbar, FloatingDock
     - Text: TextGenerateEffect, TypingAnimation, BlurIn
     ```

7. **🆕 Anti-Patterns List — Record in research.md §8**:
   ```
   ## 8. Anti-Patterns (BANNED)
   - Symmetric 3-column equal grid (→ use BentoGrid instead)
   - Center-aligned-only layout (→ use asymmetric placement)
   - Flat cards without hover effects (→ use Spotlight/Glare effects)
   - Gray placeholder boxes (→ use CSS mockups or gradients)
   - linear easing animations (→ use spring physics)
   - Single-layer backgrounds (→ use layered: gradient + pattern + particles)
   - Uniform section heights (→ vary dramatically: min-h-screen hero, compact stats)
   ```

8. **🆕 Scrape additional premium references with Firecrawl** (beyond competitor apps):
   - `https://stripe.com/` — bento grid, real product mockups, depth layers
   - `https://perso.ai/` — AI service landing benchmark
   - `https://height.app/` — SVG wave hero backgrounds
   - Use WebSearch to find 1-2 additional trending award-winning landing pages
   - Record visual techniques discovered in research.md §4 (Design References)

9. **Curate domain-relevant images via Unsplash API** (only when UNSPLASH_ACCESS_KEY is available):
   - Scrape Unsplash search result pages using Firecrawl `firecrawl_scrape`:
     - 3-4 PRD domain-related keywords (e.g., "productivity app", "task management", "team collaboration")
     - Hero background keywords (e.g., "abstract gradient", "minimalist workspace", "dark abstract")
   - Or call Unsplash API directly: `https://api.unsplash.com/search/photos?query={keyword}&client_id={UNSPLASH_ACCESS_KEY}`
   - **Curate 3-5 image URLs per concept (A/B/C) and record in research.md**:
     - 1 Hero background image
     - 2-3 Feature section images
     - 1 mood/atmosphere image
   - Unsplash image URL format: `https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop&q=80`
   - **If no UNSPLASH_ACCESS_KEY**: use picsum.photos and CSS gradients as fallback (skip this step)

10. **Write `prototypes/research.md` structured with these 8 sections** (6 if no Unsplash):
   ```markdown
   # Design Research

   ## 1. Color Palettes (3 Visual Identities)

   ### Palette A: {mood name} (e.g., "Cold Dark")
   - Mode: dark/light
   - Primary: #hex — usage
   - Accent: #hex — usage
   - Surface: #hex — background
   - Text: #hex — body text
   - Mood: one-line description

   ### Palette B: {mood name} (e.g., "Warm Neutral")
   - Mode: dark/light
   - Primary: #hex — usage
   - Accent: #hex — usage
   - Surface: #hex — background
   - Text: #hex — body text
   - Mood: one-line description

   ### Palette C: {mood name} (e.g., "Clean Light")
   - Mode: dark/light
   - Primary: #hex — usage
   - Accent: #hex — usage
   - Surface: #hex — background
   - Text: #hex — body text
   - Mood: one-line description

   ## 2. Recommended Layout Patterns
   - Pattern 1: description (source: where discovered)
   - Pattern 2: description (source: where discovered)
   - Pattern 3: description (source: where discovered)

   ## 3. Key Component List
   - Component 1: description + recommended style
   - Component 2: description + recommended style
   - Component 3: description + recommended style

   ## 4. Design References
   - Reference app 1: URL + UI patterns to reference + screenshot: prototypes/references/ref-{name}.png
   - Reference app 2: URL + UI patterns to reference + screenshot: prototypes/references/ref-{name}.png

   ## 5. Landing Page Patterns
   - Hero style: description (source: where discovered)
   - Scroll animations: pattern list
   - CTA patterns: button style + placement
   - Section flow: recommended section sequence (Hero → Features → Social Proof → CTA)

   ## 6. Curated Images (Unsplash)
   ### For Concept A
   - Hero: URL + description
   - Feature 1: URL + description
   - Feature 2: URL + description

   ### For Concept B
   - Hero: URL + description
   - Feature 1: URL + description

   ### For Concept C
   - Hero: URL + description
   - Feature 1: URL + description

   ## 7. Premium Component Mapping
   PRD section → premium component mapping:
   - Hero: {selected from Aceternity/Magic UI scrape}
   - Features: {selected from Aceternity/Magic UI scrape}
   - Social Proof: {selected from Aceternity/Magic UI scrape}
   - Background: {selected from Aceternity/Magic UI scrape}
   - Navigation: {selected from Aceternity/Magic UI scrape}
   - Text: {selected from Aceternity/Magic UI scrape}

   ## 8. Anti-Patterns (BANNED)
   - Symmetric 3-column equal grid (→ use BentoGrid)
   - Center-aligned-only layout (→ asymmetric placement)
   - Flat cards without hover effects (→ Spotlight/Glare)
   - Gray placeholder boxes (→ CSS mockups or gradients)
   - linear easing animations (→ spring physics)
   - Single-layer backgrounds (→ gradient + pattern + particles)
   - Uniform section heights (→ vary: min-h-screen hero, compact stats)
   ```

11. **Capture reference app screenshots with Playwright and save**:
   - Select 2-3 URLs from the design references section of research.md
   - For each URL, run `browser_navigate` → `browser_take_screenshot`
   - Save screenshots to `prototypes/references/` directory (filename: `ref-{appname}.png`)
   - Add screenshot paths to the "Design References" section of research.md
   - Also capture screenshots of landing page reference URLs discovered in step 5
   - **Also capture screenshots of Stripe, Perso.ai, Height.app** for premium reference
   - These screenshots will be used as visual references for v0 prompts in Phase 4 or as Claude Code fallback references

> **CHECKPOINT**: Verify `prototypes/research.md` contains 8 sections (7 if no Unsplash) including 3 palettes, Premium Component Mapping (§7), Anti-Patterns (§8), and `prototypes/references/` contains at least 2 screenshots.

---

## Phase 2: Concept Definition (output: `prototypes/concepts.md`)

Define 3 interface concepts based on `prototypes/research.md` and `analysis/prd.md`.
**You MUST write them to `prototypes/concepts.md` using the structure below.**

### 2-A: Page Structure Design (PRD + Concept driven)
- Combine the PRD's feature requirements with each concept's UX direction to freely design the pages/views each prototype needs
- **Page structure can differ between concepts** — do NOT force a fixed "main + secondary" pattern
- Minimum 3 pages, maximum 4 pages (landing + 2-3 app pages)
- **All concepts MUST start with a landing page (`/{x}`)** as the entry point:
  - `/{x}` = Landing page (Hero + feature showcase + CTA)
  - `/{x}/app` or `/{x}/dashboard` etc. = Actual app feature pages
- Example) Landing page → Dashboard (marketing-focused service)
  - Example) Landing page → Workspace (tool-type app)
  - Example) Landing page → Onboarding/signup → Main feature (community/SaaS)
  - Example) Landing page → List → Detail (content/e-commerce)
- **Even for the same PRD, the 3 concepts' page structures can and should differ**

### 2-B: Per-Concept Definition (each concept MUST include all items below)
1. **Concept name**
2. **Core layout pattern**
3. **Target user**
4. **Differentiator**
5. **Visual identity**: one of Palette A/B/C from research.md (each concept MUST use a different palette)
6. **Page structure**: pages designed for this concept + route paths + each page's role
   (e.g., `/a` = landing, `/a/app` = main feature or `/b` = dashboard, `/b/detail` = detail view)
7. **Visual asset direction**: description of visual elements suited to this concept
   (e.g., "picsum user avatars", "CSS gradient backgrounds", "domain-related placeholder images")
8. **Landing page structure**: Hero section style + main section flow + CTA copy/action
   (e.g., "Full-screen Hero with gradient → 3-feature showcase → social proof → footer CTA → navigate to /a/app")
9. **Animation direction**: transition/scroll animation style suited to this concept
   (e.g., "fade-up on scroll, smooth section transitions, hover scale on cards")
10. **🆕 Premium Component Selection** (MUST select from research.md §7):
    - Hero technique: {AuroraBackground | HeroParallax | LampEffect | BackgroundBeams} — **all 3 concepts MUST use different Hero techniques**
    - Feature layout: {BentoGrid | CardSpotlight Grid | GlareCard Row | MagicCard Grid} — **at least 1 concept MUST use BentoGrid**
    - Social Proof: {InfiniteMovingCards | AnimatedBeam | NumberTicker}
    - Background decoration: 1-2 from {SparklesCore, DotPattern, Meteors, GridPattern}
    - Text animation: {TextGenerateEffect | TypingAnimation | BlurIn}
    - Navigation: {FloatingNavbar | FloatingDock}

- The 3 concepts MUST represent fundamentally different UX paradigms
- The 3 concepts MUST use different visual identities (palettes)
- **🆕 The 3 concepts MUST use different Hero techniques — structural differentiation, not just color**

> **CHECKPOINT**: Verify `prototypes/concepts.md` has 3 concepts each assigned a different Palette AND different Hero technique, each concept defines at least 3 pages (including landing), each concept's page flow reflects its unique character, and field 10 (Premium Component Selection) is fully specified for all 3.

---

## Phase 3: Project Scaffolding

a) **Create project** (per official docs):
   ```bash
   npx create-next-app@latest prototypes/_app --yes
   ```
   `--yes`: Auto-applies recommended defaults (TypeScript, Tailwind CSS, App Router, Turbopack)

b) **Install shadcn/ui + dependencies**:
   ```bash
   cd prototypes/_app
   npx shadcn@latest init -t next
   npx shadcn@latest add button input checkbox badge dropdown-menu select dialog avatar scroll-area separator table textarea card
   npm install lucide-react framer-motion mini-svg-data-uri
   ```

c) **Shared layout** (app/layout.tsx):
   - Keep dark mode by default (dark class on html)
   - Shared fonts, metadata
   - Light mode prototypes override via `className="light"` wrapper on their own pages

d) **Add external image domains to `next.config.ts`**:
   ```typescript
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: 'picsum.photos' },
       { protocol: 'https', hostname: 'images.unsplash.com' },
       { protocol: 'https', hostname: 'illustrations.popsy.co' },  // free illustrations
     ],
   },
   ```

e) **🆕 Create `components/premium/` directory**:
   ```bash
   mkdir -p prototypes/_app/components/premium
   ```
   This directory will hold Aceternity/Magic UI component code copied in Phase 4.

f) **🆕 Add premium utility CSS to `app/globals.css`** (append after existing styles):
   ```css
   /* === Premium Visual Utilities === */

   /* Aurora animation */
   @keyframes aurora {
     0%, 100% { background-position: 50% 50%, 50% 50%; }
     50% { background-position: 100% 50%, 0% 50%; }
   }
   .animate-aurora {
     animation: aurora 15s ease infinite;
     background-size: 300% 300%, 200% 200%;
   }

   /* Grain/Noise texture overlay */
   .bg-noise::after {
     content: "";
     position: absolute;
     inset: 0;
     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
     opacity: 0.02;
     pointer-events: none;
     z-index: 1;
   }

   /* Grid pattern background */
   .bg-grid {
     background-image:
       linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
       linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px);
     background-size: 40px 40px;
   }

   /* Dot pattern background */
   .bg-dots {
     background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
     background-size: 24px 24px;
     opacity: 0.15;
   }

   /* Infinite marquee */
   @keyframes marquee {
     from { transform: translateX(0); }
     to { transform: translateX(-50%); }
   }
   .animate-marquee {
     animation: marquee 30s linear infinite;
   }

   /* Shimmer / skeleton loading */
   @keyframes shimmer {
     from { background-position: -200% 0; }
     to { background-position: 200% 0; }
   }
   .animate-shimmer {
     background: linear-gradient(90deg, transparent 25%, hsl(var(--foreground) / 0.05) 50%, transparent 75%);
     background-size: 200% 100%;
     animation: shimmer 2s ease-in-out infinite;
   }

   /* Spotlight cursor-following glow (used with JS for mouse position) */
   .card-spotlight {
     position: relative;
     overflow: hidden;
   }
   .card-spotlight::before {
     content: "";
     position: absolute;
     inset: 0;
     background: radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), hsl(var(--primary) / 0.06), transparent 40%);
     pointer-events: none;
     z-index: 1;
   }

   /* Glow effect for buttons and cards */
   .glow {
     box-shadow: 0 0 20px -5px hsl(var(--primary) / 0.3);
   }
   .glow-hover:hover {
     box-shadow: 0 0 30px -5px hsl(var(--primary) / 0.5);
   }
   ```

g) **🆕 Extend `lib/utils.ts`** — add noise pattern generator utility alongside existing `cn()`:
   ```typescript
   // Add after cn() function:
   export function generateNoisePattern(opacity: number = 0.02): string {
     return `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity}'/%3E%3C/svg%3E")`;
   }
   ```

---

## Phase 4: v0 Code Generation (Core — PRIMARY)

> **⛔ NEVER write prototype code directly — use ONLY v0-generated code.**

### v0 Prompt Template (Vercel 3-Part Framework)

For each prototype page, call `createChat` with the template below. **You MUST inject concepts.md and research.md results**:

```
## 1. Product Surface
Build a {concept_name} interface for {project_name}.
Core features: {5-8 specific feature requirements extracted from prd.md}
Layout: {layout chosen for this concept — e.g., "sidebar + main list", "kanban columns", "dashboard grid"}
Page: {this page's role — e.g., "main list view", "detail/edit view"}

## 2. Context of Use
Target users: {target users from PRD — e.g., "individual productivity users who need quick task capture and organization"}
Primary use case: {core usage scenario — e.g., "daily task management with priority-based workflow"}
Design reference apps: {references extracted from research.md — e.g., "Notion's clean typography, Linear's smooth animations, Todoist's quick-add UX"}

## 3. Constraints & Taste
- Next.js 15 App Router, TypeScript
- This page is one view of a multi-page app. It should be self-contained but include Link navigation to other pages.
- Tailwind CSS + shadcn/ui components (import from @/components/ui/*)
- Available shadcn: button, input, checkbox, badge, select, dialog, card, avatar, scroll-area, separator, dropdown-menu, textarea, table
- Icons: lucide-react only
- Color palette: {full hex values of the Palette assigned to this concept in concepts.md — e.g., "primary: #6366f1, accent: #8b5cf6, surface: #1e1e2e, text: #e2e8f0"}
- Mode: {dark/light — from the Palette's Mode in concepts.md}
- Visual mood: {Palette's Mood description}
- Typography: Inter or system font, clear hierarchy (text-2xl headings, text-sm labels)
- Mock data: 8-10 realistic items with varied states
- Visual assets: use the following for visual richness:
  - Placeholder images: https://picsum.photos/{width}/{height}?random={n}
    (user avatars: 40x40, hero images: 800x400, thumbnails: 200x200)
  - CSS gradients, subtle background patterns (dot grid, radial gradient)
  - Domain-related visuals: {insert visual asset direction from concepts.md}
- "NO external API calls" exception: picsum.photos static image URLs are allowed

### 🆕 App Page Premium Requirements
- Sidebar/Nav: glass-morphism (backdrop-blur-md, bg-white/5 or bg-black/20, subtle 1px border at 10% opacity)
- Cards: MUST have hover effect — border glow OR cursor-following spotlight (radial-gradient that follows mouse)
- Data tables: zebra striping at 0.02 opacity, sticky header with backdrop-blur
- Empty states: CSS abstract shape illustrations (gradient blobs, geometric shapes) — NO plain text only
- Micro-interactions: button press scale(0.97) transition, input focus primary glow ring (ring-2 ring-primary/30)
- All animations: spring physics `{ type: "spring", stiffness: 200, damping: 25 }` — NEVER use linear or ease-in-out

- Quality: Stripe/Vercel Dashboard level — pixel-perfect spacing, spring transitions,
  hover states on ALL interactive elements, focus rings, smooth animations (framer-motion)
- Responsive: mobile-first, graceful degradation from desktop to mobile
- NO database, NO authentication — pure UI prototype with useState/useReducer
```

### Landing Page Prompt Template (🆕 PREMIUM REWRITE)

Use the template below when generating the landing page (`/{x}`) for each prototype:

```
## 1. Product Surface
Build a premium landing page for {project_name} — a {one-line project description}.
This is NOT the app itself, but a marketing/introduction page that showcases the product.
Visual benchmark: Stripe.com, Vercel.com, Linear.app — NOT a generic Bootstrap template.

## 2. Visual Architecture (CRITICAL — follow exactly)

### Hero Section
- Technique: {concepts.md field 10 Hero technique for this concept}
- Implementation:
  - FULL VIEWPORT HEIGHT (min-h-screen). This is non-negotiable.
  - Background: radial-gradient (primary→transparent, positioned top-center) LAYERED WITH
    CSS grid/dot pattern overlay (0.04 opacity) AND grain noise overlay (0.02 opacity).
    Minimum 3 visual layers in the hero background.
  - Headline: TextGenerateEffect (word-by-word 0.8s stagger fade-in) OR TypingAnimation OR BlurIn
    — as specified in concepts.md field 10.
  - CTA button: primary color with glow shadow that pulses subtly (box-shadow animation).
  - Layout: AVOID centering everything in a narrow column vertically.
    Use ASYMMETRIC layout (headline left-aligned + right-side visual) OR full-wide dramatic center WITH depth layers.
  - Floating navigation bar: glass-morphism (backdrop-blur-md, bg-white/5, border-white/10)

### Feature Section
- Technique: {concepts.md field 10 Feature layout for this concept}
- If BentoGrid: "CSS grid with repeat(3, 1fr). First item col-span-2 (large card with mockup).
  Items 2-3 are 1x1. Item 4 is col-span-2 (stats or testimonial).
  Each card: cursor-following spotlight on hover (radial gradient that follows mouse),
  subtle border (1px, 10% opacity), backdrop-blur-sm.
  ABSOLUTELY NO symmetric 3-equal-column layout."
- If CardSpotlight: "Cards with radial-gradient glow that follows cursor position.
  Staggered grid layout — NOT symmetric. Mix card sizes."
- Each feature card must have:
  - Hover transform (scale 1.02 + border color shift + glow intensify)
  - Spring physics animation on scroll enter `{ type: "spring", stiffness: 200, damping: 25 }`
  - At least 2 visual layers (icon/visual + text content)

### Social Proof Section
- Technique: {concepts.md field 10 Social Proof for this concept}
- If InfiniteMovingCards: "Horizontal auto-scrolling testimonial cards.
  Glass-morphism effect (bg-white/5 backdrop-blur-md border-white/10).
  30s loop, duplicate array 2x for seamless marquee."
- If NumberTicker: "Large animated counting numbers (count-up on scroll into view).
  Minimum 3 stats. Each number animates independently with stagger."
- If AnimatedBeam: "Connected node visualization showing data flow or user connections."

### All Sections — Common Rules (NON-NEGOTIABLE)
- Animations: MUST use spring physics `{ type: "spring", stiffness: 200, damping: 25 }`.
  BANNED: linear, ease-in-out, ease-in, ease-out easing.
- Depth: Every section MUST have minimum 2 visual layers (background effect + content).
  Examples: gradient bg + grid pattern, blur blobs + card content, particles + text.
- Asymmetry: Minimum 2 sections MUST use non-centered, asymmetric layout.
- Hover: ALL interactive elements must have transform hover (scale, glow, border-color shift, gradient shift).
- Grain: All gradient backgrounds must include noise overlay (opacity 0.015-0.03).
- Spacing: Section padding minimum py-32 (NOT py-24). Hero MUST be min-h-screen.
- Background decoration: {concepts.md field 10 background decoration — e.g., SparklesCore, DotPattern, Meteors}

## 3. Constraints & Taste
- Next.js 15 App Router, TypeScript
- This page is the **landing/entry page** of a multi-page app. MUST include Link/Button navigating to app feature pages (/{x}/app etc.).
- Tailwind CSS + shadcn/ui components (import from @/components/ui/*)
- Available shadcn: button, input, card, badge, avatar, separator
- Icons: lucide-react only
- **framer-motion**: MANDATORY for all animations
  - Hero: fade-in + slide-up with spring physics (stagger children)
  - Feature cards: scroll-triggered entrance (whileInView) with translate+fade (NOT fade only)
  - Stats: count-up animation on scroll
  - Sections: smooth reveal on viewport entry with spring
- Color palette: {concepts.md Palette hex}
- Mode: {dark/light}
- Visual mood: {Palette Mood description}
- Visual assets (image strategy to make the landing page visually rich):
  - **Hero background**: CSS gradient (radial/linear with blur overlay) + grid/dot pattern + grain noise
  - **Feature section images**: Use Unsplash URLs from research.md. If unavailable, use `https://picsum.photos/800/400?random={n}` or CSS mockups
  - **App Preview / Mockup**: Capture Playwright screenshots of actual app page (/{x}/app) and use, or recreate app UI inside a CSS browser frame
  - **Testimonial avatars**: https://picsum.photos/40/40?random={n}
  - **Feature icons**: lucide-react icons inside gradient background circles
  - **Trust elements**: Fake brand logo marquee with CSS animation (animate-marquee)
  - **Illustrations**: CSS-only decorative elements (blur blobs, gradient orbs, floating shapes)
- Typography: Inter or system font
  - Hero headline: text-5xl md:text-7xl font-bold
  - Sub text: text-xl text-muted-foreground
  - Section titles: text-3xl font-semibold
- NO database, NO authentication — pure static landing page
- Quality: Stripe.com / Vercel.com level — full-screen Hero, spring scroll animations, generous spacing (py-32+), layered backgrounds, glass-morphism nav
```

### Execution Steps

1. **Call `createChat` based on the page structure in concepts.md**:
   - One createChat call per page per prototype
   - **Generate the landing page first**, then generate the app pages
   - Use the landing page template for landing pages, use the existing template for app pages
   - Total calls = pages per prototype × 3
   - Maximum 3 pages per prototype (v0 API cost management)
   - For second and subsequent pages, use `sendChatMessage` to pass the first page's code as context for design consistency

2. **Retrieve generated code with `getChat`**:
   - Parse and extract ```tsx code blocks from response messages
   - Adjust import paths to match project structure (@/components/ui/*)

3. **Write to files** (following route paths from concepts.md):
   - app/a/ subtree ← Interface A pages
   - app/b/ subtree ← Interface B pages
   - app/c/ subtree ← Interface C pages
   - app/page.tsx ← Simple index with just `/a`, `/b`, `/c` links (no v0 needed, write directly)

4. **If v0 code causes build errors**: send error message via `sendChatMessage` to request fix (max 2 times)

> **v0 Failure Fallback (🆕 ENHANCED)** — only if v0 API fails after 3 attempts:
> 1. Notify user: "v0 API connection failed. Proceeding with Claude Code direct generation as fallback."
> 2. **Use Context7 MCP to fetch premium component code**:
>    - Call `resolve-library-id("aceternity-ui")` → `query-docs("{component name from concepts.md field 10}")`
>    - Call `resolve-library-id("magic-ui")` → `query-docs("{component name from concepts.md field 10}")`
>    - Extract component source code and save to `components/premium/` directory
> 3. Compose detailed prompt from research.md design system (color hex, typography, layout patterns)
> 4. Reference screenshots in `prototypes/references/` using Read
> 5. For each prototype: import premium components from `components/premium/` and assemble pages
>    following the Visual Architecture spec from the landing page template above
> 6. Verify that research.md hex codes, premium component usage, and anti-patterns (§8) compliance
>
> ⚠️ Use this fallback ONLY when v0 completely fails — if v0 works, always use v0

> **CHECKPOINT**: Verify all prototype page files contain v0-generated code (or fallback-generated code). Do NOT proceed to Phase 5 if any are missing.

---

## Phase 5: Component Polishing (21st-dev builder + refiner) — 🆕 3-ROUND SYSTEM

### Round 1: Landing Page Polishing (🆕 NEW)

1. **For each prototype's landing page** — call `21st_magic_component_builder` to generate a premium Hero component (3 calls total):
   - Input: "Build a {Hero technique from concepts.md field 10} hero section with {Palette hex} colors, spring animations, layered background"

2. **For each prototype's landing page** — call `21st_magic_component_refiner` for full-page polish (3 calls total):
   - Refiner input: current landing page code + the following specific instructions:
   ```
   Polish to Stripe/Vercel level:
   1. Add grain texture (noise overlay 0.02 opacity) to all gradient backgrounds
   2. Replace all framer-motion easing with spring physics { type: "spring", stiffness: 200, damping: 25 }
   3. Add cursor-following spotlight effect to feature cards (radial-gradient that follows mouse)
   4. Verify asymmetric layout — if everything is centered in equal columns, restructure to bento/asymmetric
   5. Add subtle parallax on scroll (background moves slower than foreground)
   6. Ensure all hover states include transform + transition (scale, glow, border-color shift)
   7. Hero MUST be min-h-screen with minimum 3 background layers
   ```
   - Update files with refiner results

### Round 2: App Page Polishing (existing, enhanced)

3. Select the most critical UI component from each prototype's **main app page** (e.g., task card, kanban column, stat widget)

4. **Call `21st_magic_component_builder` to generate high-quality versions** — but only if Round 1 builder results were not already applied to app pages

5. **Pass each prototype's main app page to `21st_magic_component_refiner` for polishing** (3 calls total):
   - Refiner input: current code + "Polish micro-interactions: button press scale(0.97), input focus glow ring, card hover spotlight, glass-morphism sidebar, spring physics on all transitions"
   - Update files with refiner results

### Round 3: Cross-Differentiation Verification (🆕 NEW)

6. **Compare all 3 landing pages side by side**:
   - Read all 3 landing page files
   - Check: Do any two share the same Hero structure? Same feature layout pattern? Same background decoration?
   - If any two prototypes are structurally too similar:
     - Call `21st_magic_component_refiner` on the less differentiated one with specific restructuring instructions (max 3 additional calls)
     - Example: "This landing uses the same bento grid as Prototype A. Restructure features as a vertical alternating layout (image left/text right, then text left/image right) instead."

> **CHECKPOINT**: Verify Round 1 (3 builder + 3 refiner) + Round 2 (3 refiner) + Round 3 (0-3 refiner) = minimum 9 calls, maximum 12 calls total. All 3 landing pages must be structurally distinct.

---

## Phase 6: Build Verification + Integration

1. Run `npm run build`

2. **shadcn v4 compatibility notes** (to prevent build errors):
   - `DialogTrigger`/`DialogClose`: use `render={<Component />}` instead of `asChild`
   - `Select onValueChange`: type is `string | null` — add null check
   - `Checkbox`: `@base-ui/react` based — check `defaultChecked` instead of `checked` prop

3. If errors occur, send fix request to v0 via `sendChatMessage` (max 3 times)

4. **🆕 Verify premium infrastructure**:
   - Confirm `components/premium/` directory exists (even if empty — used by fallback)
   - Confirm `globals.css` contains premium keyframes (aurora, marquee, shimmer)
   - Confirm `lib/utils.ts` contains `generateNoisePattern` function

5. Include README.md for each prototype (prototypes/interface-{a,b,c}/README.md):
   - Design concept description
   - Screen layout explanation (including multi-page structure)
   - Premium components used (from concepts.md field 10)
   - Pros and cons

> **CHECKPOINT**: Verify `npm run build` succeeds AND premium infrastructure is in place. Do NOT proceed to Phase 7 if build fails.

---

## Phase 7: Visual Verification (Playwright) — 🆕 PREMIUM QUALITY SCORECARD

1. Start the dev server:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   Wait 3 seconds for server startup

2. **Screenshot all pages of each prototype**:
   - Reference concepts.md page structure to screenshot every route for each prototype
   - Run Playwright `browser_navigate` → `browser_take_screenshot`:
     - `http://localhost:3000/a/...` (Interface A all pages)
     - `http://localhost:3000/b/...` (Interface B all pages)
     - `http://localhost:3000/c/...` (Interface C all pages)

3. **🆕 Scroll-based screenshots** — for each landing page:
   - Take screenshots at 5 scroll positions: 0%, 25%, 50%, 75%, 100%
   - Use Playwright `browser_evaluate` with `window.scrollTo(0, document.body.scrollHeight * {pct})`
   - Then `browser_take_screenshot` at each position
   - This verifies scroll animations trigger correctly at different viewport positions

4. **Analyze each screenshot with Read** — using Claude multimodal vision:
   - Check for blank pages, error messages, or broken layouts
   - Check spacing/alignment issues
   - Check color contrast problems
   - Check text readability
   - Verify that research.md's design system (color palette, layout patterns) is actually reflected
   - **Visual differentiation**: Verify 3 prototypes have distinctly different colors/moods.
     If two prototypes look too similar, flag as critical issue and modify color variables.
   - **Visual assets**: If only text + icons are present with no images/gradients/patterns,
     flag as issue and add them.
   - **Inter-page navigation**: Verify Links between pages work correctly
   - **Landing page verification**:
     - Hero section fills the viewport (full-screen hero)
     - CTA button is clear and links to app page
     - Scroll animations are smooth (screenshot after Playwright scroll)
     - Sufficient spacing between sections (py-32 or more)
     - Visual consistency between landing and app pages (same palette)
     - **Image/visual richness**: If only text + icons, flag as issue — at least 2 of these visual elements must be present: Hero background gradient, App Preview mockup, Feature images
     - **App Preview mockup**: If possible, capture Playwright screenshots of app pages and use in the landing page's App Preview section

5. **🆕 Premium Quality Scorecard** (evaluate per prototype, record results):

   ```
   ### Premium Quality Scorecard — Prototype {A/B/C}

   **Structure (ALL must pass)**
   [ ] Hero is min-h-screen
   [ ] At least 1 section uses asymmetric/bento layout (NOT 3-equal-column grid)
   [ ] Section spacing is py-32 or more
   [ ] Floating/glass-morphism navigation present

   **Visual Depth (pass 4 of 5)**
   [ ] Hero has layered background (gradient + pattern + particles/decoration)
   [ ] Grain/noise texture present on gradient sections
   [ ] Card hover spotlight/glow effect works
   [ ] Parallax or scroll-reveal effect on at least 1 section
   [ ] Background decoration elements present (blobs, beams, dots, meteors)

   **Animation (pass 3 of 4)**
   [ ] Hero headline has text animation (generate, typing, or blur-in)
   [ ] Feature cards have scroll entrance animation (translate+fade, NOT fade-only)
   [ ] Stats have count-up animation
   [ ] At least 1 ambient animation present (particles, aurora, floating shapes, marquee)

   **Differentiation (ALL must pass)**
   [ ] All 3 prototypes use different Hero techniques
   [ ] All 3 prototypes use different Feature layouts
   [ ] No shared background patterns between prototypes
   [ ] Color palettes are clearly distinct (different hue families)
   ```

   **If more than 2 items fail**: trigger targeted fix round — edit code to address specific failures, re-screenshot, re-evaluate. Max 2 fix iterations.

6. **Fix discovered issues in the code**:
   - Fix listed issues in priority order (scorecard failures first, then visual issues)
   - After fixing, re-screenshot the affected page → re-analyze with Read
   - Max 2 iterations (total screenshots: initial + up to 2 fix rounds)

7. **Compare reference screenshots in `prototypes/references/` with current prototype screenshots**:
   - If there are clearly lacking visual elements compared to Stripe/Vercel/Linear references, apply additional fixes

> **CHECKPOINT**: Verify all screenshots display proper UI, Premium Quality Scorecard passes for all 3 prototypes (max 2 failures allowed), 3 prototypes are visually AND structurally differentiated, and visual analysis reveals no critical issues.

---

## Final Output

1. Display to user:
   "View the 3 prototypes in your browser:
    - http://localhost:3000/a — Interface A ({concept name}): {page list}
    - http://localhost:3000/b — Interface B ({concept name}): {page list}
    - http://localhost:3000/c — Interface C ({concept name}): {page list}
   Please review and choose."

2. Summarize all 3 prototypes in a table:
   | Prototype | Entry URL | Concept | Palette | Hero Technique | Feature Layout | Page Structure | Pros | Cons |
   Ask the user to choose, then after selection:
   - Stop the dev server
   - "Selection complete. Next step: run /setup-versions {a|b|c}"

Final directory structure:
```
prototypes/
├── research.md               ← Phase 1 (3 palettes + landing patterns + §7 Premium Mapping + §8 Anti-Patterns)
├── concepts.md               ← Phase 2 (concepts + field 10 Premium Component Selection)
├── references/
│   ├── ref-{app1}.png
│   ├── ref-{app2}.png
│   ├── ref-{stripe}.png       ← Premium reference
│   └── ref-{landing-ref}.png  ← Landing reference screenshot
├── _app/
│   ├── app/
│   │   ├── globals.css        ← Includes premium utility CSS (aurora, grain, grid, marquee, shimmer)
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← Simple index with /a, /b, /c links only
│   │   ├── a/
│   │   │   ├── page.tsx        ← Landing page (Premium Hero + CTA → /a/app)
│   │   │   ├── app/page.tsx    ← App feature page (glass-morphism + spotlight cards)
│   │   │   └── {route}/page.tsx
│   │   ├── b/
│   │   │   ├── page.tsx        ← Landing page (different Hero technique)
│   │   │   ├── app/page.tsx
│   │   │   └── {route}/page.tsx
│   │   └── c/
│   │       ├── page.tsx        ← Landing page (different Hero technique)
│   │       ├── app/page.tsx
│   │       └── {route}/page.tsx
│   ├── components/
│   │   ├── ui/               ← shadcn/ui components
│   │   └── premium/          ← Aceternity/Magic UI component code (fallback)
│   └── lib/utils.ts          ← cn() + generateNoisePattern()
└── interface-{a,b,c}/
    └── README.md
```
