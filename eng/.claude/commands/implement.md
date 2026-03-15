---
description: PRD + prototype-driven adaptive full-stack implementation — Context7 (latest docs) + Playwright (Ralph Loop verification)
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, "mcp:context7:*", "mcp:playwright:*", "mcp:sequential-thinking:*"]
---

You are a senior developer implementing a full-stack web application in this directory.
Based on the PRD and prototype, you **adaptively** detect the tech stack and implement.

**Selected prototype**: `prototypes/$ARGUMENTS/`
**Working directory**: Execute from root → create app in `project/`

---

## Phase 0: Project Scaffolding + Context Loading

> Goal: Create project/ directory + detect all required tech/API keys from PRD

### Step 0.1 — Prepare project/ directory

1. `mkdir -p project/.claude/commands`
2. Copy `templates/CLAUDE.md.template` → `project/CLAUDE.md` (fill placeholders)
3. Copy `templates/commands/build-check.md.template` → `project/.claude/commands/build-check.md`
4. Copy `templates/commands/self-review.md.template` → `project/.claude/commands/self-review.md`
5. Copy `templates/commands/iterate.md.template` → `project/.claude/commands/iterate.md`

### Step 0.2 — Read all analysis/

Required reads:
- `analysis/prd.md`
- `analysis/requirements.json`
- `analysis/tech-constraints.md`
- `analysis/acceptance-criteria.md`

### Step 0.3 — Read prototype

- Check structure and key files in `prototypes/$ARGUMENTS/`
- Read `prototypes/$ARGUMENTS/src/lib/design-tokens.ts`
- Read `prototypes/$ARGUMENTS/package.json` (check dependencies)

### Step 0.4 — Parse tech stack

From requirements.json:
- `tech_stack.framework` → determine project init method
- `tech_stack.db` → DB client + ORM + env vars
- `tech_stack.auth` → auth package + env vars
- `tech_stack.ui` → UI library
- `tech_stack.apis[]` → SDK + env vars per external API
- `tech_stack.deploy` → deployment constraints

### Step 0.5 — Dynamic env var detection

Based on tech_stack + prd.md parsed in Step 0.4, infer required environment variables:
- Determine env vars required by each technology/service from learned knowledge
- If uncertain, query Context7 for the library's documentation
- For each detected variable, also note the provider (dashboard URL) and setup method

### Step 0.6 — Generate .env.example

Create `project/.env.example`:
- List all detected env var keys
- Add comment above each key with provider (dashboard URL) and brief setup instructions
- For auto-generatable values like AUTH_SECRET, include the generation command (e.g., `npx auth secret`)

### Step 0.7 — Check .env.local

1. Check if `project/.env.local` exists
2. If not:
   - Copy `.env.example` to `.env.local`
   - Output "Created project/.env.local — please fill in the values."
   - **Stop here**
3. If exists, check each required key has a value
4. If missing values:
   - Output "Refer to project/.env.example and fill values in project/.env.local"
   - List missing keys + provider summary for each
   - **Stop here**
5. All keys have values → proceed to Phase 1 automatically

---

## Phase 1: Project Initialization

> Goal: Empty project → buildable scaffold inside project/
> Context budget: ~15%

### Step 1.1 — Context7 latest docs lookup

For each technology in requirements.json tech_stack:
1. `resolve-library-id(technology_name)`
2. `query-docs("setup configuration typescript 2024 2025")`

**Important**: Code patterns in Phase 1-2 below are **fallback references**.
If Context7 returns different patterns, **adjust to Context7**.

### Step 1.1.1 — Mandatory external API docs lookup

For **each API** in tech_stack.apis[]:
1. `resolve-library-id(API_name)`
2. `query-docs("endpoint authentication request response error codes")`
3. Extract and note the following:
   - Endpoint URL(s) to use
   - Authentication method (header name, token format)
   - Required parameters and types
   - How to look up valid resource IDs (list endpoints for models, voices, etc.)
   - Request/response body size limits
   - Error codes and their meanings

If the API is not found in Context7, record the official docs URL and
leave a comment in the code referencing that documentation.

### Step 1.2 — Project initialization

After `cd project/`:

| tech_stack.framework | init command |
|---|---|
| Next.js 15 (default) | `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm` |
| Next.js 14 | Same as above, specify `@14` |
| Vite + React | `npm create vite@latest . -- --template react-ts` + tailwind setup |

Default: Next.js 15 if not specified in requirements.json.

### Step 1.3 — Package installation

Generate **dynamic package list** based on requirements.json:

1. `tech_stack.auth` → auth package (next-auth@beta | @clerk/nextjs | @supabase/ssr etc.)
2. `tech_stack.db` → DB package (@libsql/client + drizzle-orm | @prisma/client | @supabase/supabase-js etc.)
3. `tech_stack.ui` → UI package (shadcn component init)
4. `tech_stack.apis[]` → each API SDK (stripe | openai | resend etc.)
5. `prototypes/$ARGUMENTS/package.json` → animation deps (framer-motion, clsx, tailwind-merge etc.)
6. Utilities: sonner, lucide-react (always include)

Check Context7 for latest version/install method before each package install.

### Step 1.4 — Design token migration

1. Read `prototypes/$ARGUMENTS/src/lib/design-tokens.ts`
2. Copy + adapt to `project/src/lib/design-tokens.ts`
3. Colors → reflect in `tailwind.config.ts` `theme.extend.colors`
4. Fonts → `next/font` (or framework equivalent) setup
5. Motion presets → Framer Motion config (if used in prototype)

### Step 1.5 — Verify .env.local

`.env.example` was already generated in Phase 0.
- Re-verify `project/.env.local` exists and all keys have values
- Verify `.env.local` is in `.gitignore`

### Step 1.6 — Build check (Gate 1)

```bash
cd project/ && npm run build
```
Fix and retry on failure. Proceed to Phase 2 after passing.

---

## Phase 2: Foundation (Auth + DB + Layout)

> Goal: Working auth, DB, and base layout
> Context budget: ~25%

### Step 2.1 — Context7 deep lookup

For auth + DB, query **integration patterns** beyond just setup:
- Session management patterns
- DB migration patterns
- Middleware patterns
- Error handling patterns

### Step 2.2 — Auth setup (adaptive)

Branch by tech_stack.auth:

**Auth.js v5** (fallback reference):
- `src/auth.ts` (provider config)
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/middleware.ts`

**Clerk**:
- `src/middleware.ts` (clerkMiddleware)
- ClerkProvider in layout.tsx

**Supabase Auth**:
- `src/lib/supabase/server.ts` (createClient)
- `src/lib/supabase/client.ts`
- `src/middleware.ts` (updateSession)

→ Prioritize latest patterns from Context7
→ Above are fallback references

### Step 2.3 — Database setup (adaptive)

Branch by tech_stack.db:

**Turso + Drizzle** (fallback reference):
- `src/lib/db.ts` (createClient)
- `drizzle.config.ts`
- `src/db/schema.ts` (schema based on requirements.json features)
- `npx drizzle-kit push`

**Supabase**:
- Create tables via supabase CLI or dashboard
- Or migration SQL

**Prisma**:
- `npx prisma init`
- `schema.prisma` (features-based)
- `npx prisma db push`

→ Schema design: infer needed tables/columns from requirements.json features
→ Run migration + verify connection

### Step 2.4 — Base layout

1. Read `prototypes/$ARGUMENTS/src/app/layout.tsx`
2. Port navigation structure (adapt for functional app)
3. Apply design tokens (colors, fonts)
4. Auth-state-dependent UI branching (logged in/out)

### Step 2.5 — Middleware + route protection

Set up route protection matching auth strategy.
Separate public routes from protected routes.

### Step 2.6 — Build + Playwright smoke test (Gate 2)

```bash
cd project/ && npm run build
```

**If Playwright MCP available:**
1. `cd project/ && PORT=3000 npm run dev &`
2. Wait 3s then `browser_navigate` → `http://localhost:3000`
3. Verify page loads (no errors)
4. `browser_take_screenshot` → save for reference
5. Kill dev server: `lsof -ti:3000 | xargs kill 2>/dev/null`

**If Playwright unavailable:** build success alone passes.

---

## Phase 3: Feature Implementation (Feature-by-Feature Loop)

> Goal: Implement all must-have features one by one + build verification
> Context budget: ~35%

### Step 3.0 — Determine feature order

Sort requirements.json features:
1. **Priority**: must → should → could
2. **Dependencies**: auth-dependent features after auth, DB read/write after schema
3. **Complexity**: simple → complex (build momentum)

Use Sequential-thinking MCP if available for optimal ordering.

### Step 3.N — Per-feature mini-loop

For each feature:

```
Feature FR-XXX: [title] (priority: must/should/could)

1. Read AC for this feature from acceptance-criteria.md

2. If feature uses external API:
   a. Reference API notes from Step 1.1.1
   b. Check tech-constraints.md for rate limits, size limits
   c. Add source comment block at top of API route code:
      // API: [service name]
      // Endpoint: [URL] (verified via Context7 or official docs)
      // Auth: [auth method]
   d. **No hardcoding**: Resource IDs (models, voices, etc.) must be dynamically fetched via list endpoints or separated into env vars
   e. Error handling: branch by error codes from API documentation

3. Create API route(s):
   - Apply auth check pattern (from Phase 2)
   - Input validation
   - Error handling (try-catch + appropriate HTTP status)
   - Reflect tech-constraints.md constraints

4. Create UI components:
   - Reference prototypes/$ARGUMENTS/ design
   - Use design tokens (no hardcoded hex)
   - Handle loading, error, empty states
   - Server components first, "use client" only when necessary

5. npm run build — fix on failure

6. Proceed to next feature
```

### Complex feature handling

| Feature type | Special considerations |
|---|---|
| File upload | Next.js API route default body limit **1MB** → must increase in `next.config`. Vercel 4.5MB limit → presigned URL pattern recommended |
| Payments (Stripe) | Webhook handler + idempotency keys + test mode |
| AI API calls | Streaming response (SSE) + timeout handling |
| Real-time features | SSE or polling pattern (Vercel serverless constraints) |
| Email sending | API route only (server-side), graceful fallback on error |

### should/could feature handling

After all must-haves complete:
- **should**: Implement if time permits
- **could**: Skip or create stubs only

---

## Phase 4: Visual + Functional Verification (Ralph Loop)

> Goal: Visual match with prototype + all features actually working
> Context budget: ~15%

**Playwright MCP required. If unavailable, skip entire Phase 4 → Phase 5.**

### Step 4.1 — Start dev server
```bash
cd project/ && PORT=3000 npm run dev &
```
Wait 3s then verify connection.

### Step 4.2 — Screenshot capture

Via Playwright MCP:
- Main page (full)
- Each major route
- Logged in/out states (if possible)

### Step 4.3 — Visual comparison against prototype (Claude Vision)

Compare:
- Layout structure
- Color palette match
- Typography
- Spacing/gaps
- Component style fidelity

### Step 4.4-4.5 — Fix iteration (max 3 rounds)

TOP 3 visual differences → fix → recapture → recompare.

### Step 4.6 — Core feature end-to-end verification

For **each must-have feature** in requirements.json:

1. Execute the full user flow via Playwright:
   - Input → processing wait → result verification (complete the flow)
   - For external API features, perform actual API calls (use test data)

2. Capture result screenshots + verify:
   - Loading/progress states reflect actual processing (no fake timers or hardcoded values)
   - Result data displays correctly on screen
   - Interactive elements (playback, download, toggles, etc.) actually work

3. Issues found → fix immediately → re-run to confirm (max 3 iterations)

**Untestable features** (require OAuth login, etc.): note skip reason and generate manual test checklist

### Step 4.7 — Kill dev server
```bash
lsof -ti:3000 | xargs kill 2>/dev/null
```

---

## Phase 5: Quality Gates + Handoff

> Goal: Pass all quality criteria + auto-chain next step

### Gate 1: Build
```bash
cd project/ && npm run build        # 0 errors
cd project/ && npx tsc --noEmit     # 0 type errors
```

### Gate 2: Env var completeness
- [ ] All `process.env.*` in code → listed in `.env.example`
- [ ] `.env.local` in `.gitignore`
- [ ] No server-only keys exposed in client code (`NEXT_PUBLIC_` prefix rule)

### Gate 3: Prototype reflection
- [ ] Prototype's color palette reflected in app
- [ ] Main layout follows prototype structure

### Gate 4: PRD compliance verification

Re-read requirements.json + prd.md, and for **each must-have feature**:

- [ ] **I/O parity**: All input formats AND output formats specified in the PRD are implemented
  - e.g., "audio/video input → audio/video output" means BOTH must work
- [ ] **API endpoint completeness**: Each API route handles all PRD-specified cases
  - e.g., video input → video result, audio input → audio result
- [ ] **UI result display**: UI exists for every output format
  - e.g., video result → video player, audio result → audio player
- [ ] **Download format**: Result downloads are provided in the correct format

If mismatch found → fix immediately, then re-verify gate

### Gate 5: Security
- [ ] No hardcoded API keys
- [ ] Server-only keys not exposed to client
- [ ] Input validation exists

### Gate 6: External API connection verification (when tech_stack.apis[] exists)
- [ ] Call one read-only endpoint per API (e.g., list-type APIs)
- [ ] Confirm 200 response + response structure matches code's type definitions
- [ ] On failure: review .env.local values + endpoint URL + auth headers

After all Gates pass, automatically run /build-check.
