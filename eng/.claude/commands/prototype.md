---
description: URL-driven prototype generation — Firecrawl (branding extraction) + Claude Code (section-by-section clone) + Playwright (screenshot diff loop)
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, Agent, "mcp:firecrawl:*", "mcp:context7:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*", "mcp:unsplash:*", "mcp:sequential-thinking:*"]
---

Automatically collect inputs from the `input/` folder to generate UI prototypes.

## Core Principles

1. **Reference first** — If the reference URL's style differs from reference docs' smart defaults, follow the reference
2. **Capture the mood** — Don't pixel-perfect copy colors/layouts; reproduce the reference's **feel and personality**
3. **PRD determines content** — Same reference can produce different domain content depending on the PRD
4. **Don't add what's not in the reference** — No excessive decoration, unnecessary sections, or effects not in the reference
5. **Maintain quality floor** — Tier 1 rules (spring physics, visual cards, 2-layer backgrounds, etc.) always apply
6. **Reference docs are smart defaults** — Override only when the reference clearly has a different style

---

## Input Collection (input/ folder auto-scan)

Scan the `input/` folder and automatically read the files below:

### URL Sources (at least 1 required)
If any of these exist, URLs are secured:
- `input/url.md` or `input/urls.md` — one URL per line (first = main reference, rest = sub)
- `input/url.txt` or `input/urls.txt` — same
- `input/*.md` — extract lines starting with `http`

### PRD/Project Description Sources (optional)
If any of these exist, use as PRD:
- `input/*.pdf` — read PDF files
- `input/prd.md` or `input/README.md` — markdown PRD
- `input/*.txt` — text PRD (excluding url.txt)

### Scan Logic
1. List all files in `input/`
2. Extract reference URLs from URL files (stop + notify if none found)
3. If PRD/PDF files exist, read them for project description
4. If no PRD, proceed with URL analysis results only
5. Print collection summary and proceed

> **If input/ folder is empty or no URLs found:**
> Print "Please add url.md (reference URLs) to the input/ folder." and stop.

---

## Pre-checks

1. **MCP verification** — test-call each required server:

   | MCP Server | Test | Required | Purpose |
   |------------|------|----------|---------|
   | Firecrawl | `firecrawl_scrape` (url: "https://example.com", formats: ["markdown"]) | **Required** | URL scraping + branding JSON + screenshots |
   | Sequential Thinking | `sequentialthinking` (thought: "test", thoughtNumber: 1, totalThoughts: 1, nextThoughtNeeded: false) | **Optional** | Structured PRD analysis (proceed without if unavailable) |
   | 21st-dev Magic | simple component search | **Required** | Component refinement |
   | Context7 | `resolve-library-id` (libraryName: "react") | **Required** | Latest framework docs |
   | Unsplash | `search_photos` (query: "test") | **Required** | Image sourcing |
   | Playwright | `browser_navigate` (url: "https://example.com") | **Optional** | Animation observation (skip if anti-bot blocks) |
   | Design Inspiration | simple search | **Optional** | Additional UI references |

   > **If any required MCP fails — stop immediately.**
   > Print setup instructions: check `.mcp.json`, set API keys, restart Claude Code.

2. Verify at least 1 reference URL was collected from `input/`.

---

## Phase 1: Explore & Plan

> Goal: Thoroughly explore the URL and build structured context (monday.com principle)
> Context budget: ~20%

### Step 1.1 — Firecrawl URL Analysis
(External sites → Firecrawl is stable against anti-bot)

- `firecrawl_scrape` — extract page HTML/markdown + screenshot
- `firecrawl_extract` (Branding Format v2) — extract brand DNA as JSON:
  - Color palette (primary, secondary, accent, bg, text)
  - Typography (font families, size system, weights)
  - Spacing system (padding, margin patterns)
  - Component styles (cards, buttons, nav patterns)

### Step 1.2 — Screenshot Analysis (Claude Vision)
Analyze the Firecrawl screenshot:
- Layout: section count/order, grid, card placement
- **Section inventory**: List all section types from the reference (Hero, Logos, Features, Testimonials, FAQ, Stats, etc.)
  → Record as "Reference Section Inventory" table in plan.md
  → Prototypes must include all the same section types
- Image strategy: map each image → Unsplash search keywords (precise plan)
- Motion hints: gradient movement, parallax, hover effect clues
- Component inventory
- **Mood/personality analysis**: What overall feeling does this site convey? (e.g., "dark+tech+premium", "bright+friendly+educational", "minimal+elegant+editorial", "bold+experimental+creative")
  → Record as one-line "Reference Mood" in plan.md
  → Phase 2 decisions must not deviate from this mood

### Step 1.3 — Playwright URL Visit (animation observation, skip on failure)
- Navigate site: scroll, hover, click
- Observe animations/interactions → record motion specs (duration, easing, trigger)
- Hover state screenshots
- **If anti-bot blocks: proceed with Firecrawl data only**

### Step 1.4 — Fancy Design Judgment
- If complex 3D/particles/advanced animations detected → ask user about implementation level

### Step 1.5 — Image Sourcing
- `unsplash search_photos` — source images with precise keywords from screenshot analysis
- Build image URL + purpose mapping table

### Step 1.6 — Output plan.md
```
prototypes/
├── plan.md              ← blueprint (layout + tokens + image map + motion specs)
├── references/
│   ├── ref-main.png     ← Firecrawl captured screenshot
│   ├── ref-sub.png
│   └── brand-tokens.json ← Firecrawl Branding v2 output
```

plan.md must include:
- Section-by-section layout blueprint (referencing screenshot regions)
- Brand token summary (colors, fonts, spacing)
- Image map (which Unsplash image goes where)
- Motion spec (what animates, how, duration)
- Feature page plan (which pages, what interactions)

### Step 1.7 — Generate analysis/ (for implement pipeline)

If PRD/PDF was read during input collection, use it; otherwise derive from URL analysis results only.
If Sequential Thinking MCP is available, use it to systematically decompose requirements.

Classify domain from URL analysis + project description:
- Extract domain category (industry, product_type)
- Extract 3-5 core keywords → requirements.json domain.keywords
- Competitors/reference services → domain.reference_companies

Generate the following files in analysis/:

**analysis/prd.md** — Structured PRD:
- Project overview
- Functional requirements (FR-001, FR-002... format)
- Non-functional requirements (NFR-001... format)
- Tech stack requirements
- Constraints (API limits, deployment environment, etc.)

**analysis/requirements.json** — Machine-readable JSON:
```json
{
  "project_name": "",
  "domain": {
    "industry": "AI/SaaS/fintech/education/commerce/healthcare/creative/productivity/devtools/...",
    "product_type": "B2B/B2C/internal-tool/marketplace/...",
    "keywords": ["3-5 domain keywords derived from analysis"],
    "reference_companies": ["competitors/reference services from URL analysis"]
  },
  "tech_stack": {
    "framework": "Next.js 15 (App Router)",
    "db": "",
    "auth": "Auth.js v5 + Google OAuth",
    "ui": "shadcn/ui + Tailwind CSS",
    "deploy": "Vercel",
    "apis": []
  },
  "features": [{ "id": "FR-001", "title": "", "priority": "must|should|could" }],
  "constraints": [{ "type": "", "description": "", "impact": "" }]
}
```

> **Default stack hint**: If no specific technology is mentioned, use these defaults:
> - Framework: **Next.js 15** (App Router, TypeScript, Tailwind CSS)
> - Auth: **Auth.js v5 + Google OAuth**
> - DB: **Turso (libSQL)** + Drizzle ORM (or a DB suited to the project)
> - UI: **shadcn/ui** + Lucide Icons
> - Deploy: **Vercel**
>
> If the project specifies different technologies, prioritize those.

**analysis/acceptance-criteria.md** — Acceptance criteria per feature (Given/When/Then format):
- [ ] AC-001: Given [condition], When [action], Then [result]

**analysis/tech-constraints.md** — Detailed analysis of technical constraints (free tier API limits, deployment restrictions, etc.)

**analysis/evaluation-matrix.md** — Evaluation criteria matrix:
| Category | Points | Checklist |

Categories:
- Feature completeness (40 pts): All FRs implemented
- Code quality (20 pts): TypeScript strict, error handling, structure
- UI/UX (20 pts): Responsive, dark mode, loading/error states
- Deployability (10 pts): Build success, environment variable separation
- Security (10 pts): API key protection, input validation

**Validate generated files:**
- Verify requirements.json is valid JSON
- Verify all features have id, title, priority fields
- Verify evaluation-matrix.md point totals sum to 100
- Verify acceptance-criteria.md has at least 1 AC
- Auto-fix any issues found

**After Phase 1: execute /clear** (context reset — plan.md is Phase 2's input)

---

## Phase 2: Generate

> Goal: Generate 2 prototypes from plan.md
> Context budget: ~55%

### Step 2.1 — Read plan.md
Read `prototypes/plan.md` and `prototypes/references/brand-tokens.json`.

### Step 2.2 — Scaffolding
- `npx create-next-app@latest` (TypeScript, Tailwind, App Router)
- Install shadcn/ui
- Install fonts from Phase 1 analysis (Inter/Roboto/Arial forbidden)
- `lib/design-tokens.ts` — generate from brand-tokens.json
- Install Framer Motion

### Step 2.3 — Prototype A: Faithful Clone

> Generate section by section (Raduan: 3-5 iterations per section, Osmani: small chunks)

For each section:
1. Read plan.md blueprint for that section
2. Reference screenshot → 1:1 clone
3. 21st-dev MCP `component_inspiration` → reference similar patterns
4. Integrate Unsplash images
5. Observed motion → Framer Motion implementation

#### Creative Adaptation Principles
- Identify the **most impressive design element** of the reference and focus on reproducing it
  (e.g., Perso AI → overlapping browser windows, Linear → full-width product demo, Stripe → interactive code block)
- Hero app preview should **not be a single screenshot** but attempt depth like the reference:
  main window + overlapping floating panels, or the reference's composition approach
- reference docs (visual-architecture, aesthetics-guide) rules are **smart defaults**:
  if they conflict with the reference, follow the reference, but always maintain Tier 1 rules

Generation order:
1. Feature page(s) — UI mockup + basic interactions, hardcoded data
2. After feature pages are complete:
   a. Capture "mid-workflow state" screenshots via Playwright (no empty states)
   b. If capture fails → read feature page page.tsx and create CSS thumbnail component
   c. Embed in Hero with BrowserMockup + 3D perspective
3. Landing page — section by section sequential generation
4. Navigation linking

### Section Mirroring Principle

**Include all section types** identified in Step 1.2's section inventory in the prototype.
Do not add sections that aren't in the reference.

For each section:
- **Quantity**: At least 60% of reference (8 features → minimum 5)
- **Style**: Follow the reference's card/grid/layout patterns
- **Density**: Equal content density to reference (no empty sections)
- **Images**: People sections (Testimonials/Team) → Unsplash avatars required (no placeholder divs)

Missing sections are checked in Phase 3 comparison.

### Hero App Preview Mockup Rules (Required)

The Hero product UI preview must faithfully reproduce the actual UI from the feature page.

#### Method A: Playwright Screenshot (recommended)
1. After building feature page, capture via Playwright on dev server
2. Save to public/screenshots/, embed in Hero as `<img>`
3. Apply BrowserMockup + 3D perspective + color-tinted shadow

#### Method B: CSS Reproduction (when screenshot fails)
1. Read feature page page.tsx and analyze UI structure
2. Create separate AppPreview.tsx as thumbnail
3. Required: all major UI areas from feature page, populated with real data, mid-workflow state, minimum 3 distinct UI areas
4. Forbidden: empty dashed upload box only, Math.random() data, wireframe with fewer than 5 UI elements
5. pointer-events-none + overflow-hidden + BrowserMockup frame required

### Step 2.4 — Prototype B: Variation
- After A is complete → duplicate → color/layout variation
- Or use sub-agent for parallel generation with A (git worktree available)

### Step 2.5 — CLAUDE.md Update
- Add patterns/mistakes discovered during generation as rules to project CLAUDE.md (Boris Cherny principle)

**After Phase 2: execute /clear**

---

## Phase 3: Screenshot Diff Loop & Deliver

> Goal: Maximize visual match with reference (Saqoosha principle)
> Context budget: ~25%

### Step 3.1 — Build Verification
- `npm run build` — 0 errors

### Step 3.2 — Playwright Screenshot Capture
(Own dev server = no anti-bot)
- Start `npm run dev`
- Capture full page + key sections
- Save to `prototypes/results/`

### Step 3.3 — Original vs Result Comparison (Claude Vision)
- Compare `prototypes/references/ref-*.png` vs `prototypes/results/*.png`
- Per-section evaluation:
  - Layout similarity
  - Color matching
  - Typography matching
  - Image ratio/placement
  - Spacing/gaps
  - Hero app preview quality: Are 3+ UI areas from the feature page represented?
    If wireframe-level → regenerate via Method A or B
  - Section completeness: Any sections missing vs reference section inventory?
    If Testimonials/Stats/FAQ were in reference but missing → generate immediately
  - Features quantity: At least 60% of reference feature count?
    If below → add domain-relevant features
- TOP 3 differences → specific fixes

### Step 3.4 — Iterate (max 3 rounds)
- Fix → recapture → recompare
- Record improvements per iteration

### Step 3.5 — Deliver
- Keep dev server running
- Request browser verification (http://localhost:3000/a, /b)
- Compare both prototypes and run `/implement a` or `/implement b`

---

## MCP Usage Map

| Phase | MCP | Purpose | Required |
|-------|-----|---------|----------|
| 1 | **firecrawl** | URL scraping + branding JSON + screenshots | Required |
| 1 | **sequential-thinking** | Structured PRD/requirements analysis | Optional |
| 1 | **playwright** | URL visit + animation observation | Optional (skip on anti-bot) |
| 1 | **unsplash** | Pre-source images | Required |
| 2 | **21st-dev** | Component refinement | Required |
| 2 | **context7** | Latest library docs | Required |
| 2 | **design-inspiration** | Additional UI references | Optional |
| 3 | **playwright** | Own dev server screenshot capture | Required |

---

## Reference Docs (Smart Defaults)
The rules in these docs are **quality floor defaults**.
If the reference clearly has a different style, follow the reference, but always maintain Tier 1 rules.

- `prototype-references/visual-architecture.md` — visual density + component default patterns
- `prototype-references/aesthetics-guide.md` — AI slop prevention rules
- `prototype-references/copy-guide.md` — copy guide
- `prototype-references/premium-components.md` — component reference
