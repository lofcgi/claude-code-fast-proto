# AI Agent Pipeline

> The world's first open-source Best-of-N parallel implementation pipeline powered by AI coding agents.

Drop a PRD/PDF, run Claude Code skills, and get 3 competing full-stack implementations evaluated and merged into one polished product.

## Why This Exists

Best-of-N sampling is a proven technique in AI research for improving output quality — but no practical developer tool existed for it. Until now.

This template turns the concept into a real pipeline: **one PRD in, three implementations out, best one wins.**

## Before You Begin

### Required Software

```bash
# 1. Install Claude Code CLI
npm i -g @anthropic-ai/claude-code

# 2. Verify Node.js 18+
node -v   # Should print v18.x or higher

# 3. Verify Git
git --version
```

<details>
<summary><strong>Accounts needed later (not required to start)</strong></summary>

These accounts are only needed at the `/implement` and `/ship` stages — you can start the pipeline without them:

| Account | Environment Variables | When Needed |
|---------|----------------------|-------------|
| [Google Cloud Console](https://console.cloud.google.com/) → OAuth credentials | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | `/implement` stage |
| [Turso](https://turso.tech/) → Database | `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | `/implement` stage |
| [Vercel](https://vercel.com/) → Deployment | (Vercel CLI login) | `/ship` stage |

</details>

<details>
<summary><strong>Optional API keys (improve analysis quality, not required)</strong></summary>

| Key | Purpose |
|-----|---------|
| Firecrawl API key | Better web research during `/analyze` |
| GitHub PAT | Branch/PR management via MCP |

</details>

## What Goes in input/

Place your PRD (Product Requirements Document) in the `input/` folder as a **PDF** or **Markdown** file. This is the only input the pipeline needs.

<details>
<summary><strong>Example PRD structure (click to expand)</strong></summary>

```markdown
# App Name — One-line description
## Overview — What the app does
## Target Users — Who it's for
## Core Features — Numbered feature list with sub-details
## Non-Functional Requirements — Performance, responsive design, etc.
## Out of Scope — What it does NOT do
```

See [`input/example-prd.md`](input/example-prd.md) for a complete sample you can run `/analyze` on immediately.

</details>

> **Default tech stack** (when not specified in PRD): Next.js 15, Auth.js v5, Turso (SQLite), shadcn/ui, Tailwind CSS, Vercel

## Pipeline Flow

> **Total time: ~1–2 hours** depending on PRD complexity

```
1. git clone ai-agent-pipeline && cd ai-agent-pipeline/eng
2. Put your PDF/PRD in input/
3. claude                                          # Start Claude Code
4. /analyze          → Parse & structure requirements    (~5 min)
5. /prototype        → Generate 3 UI prototypes          (~10 min)
6. Pick your favorite prototype
7. /setup-versions   → Create 3 parallel impl dirs       (~5 min)
8. Open 3 terminals → /implement in each                 (~30–60 min)
9. /evaluate         → Score all 3 versions               (~10 min)
10. /select-winner   → Copy best version to project/      (~3 min)
11. cd project && claude → /polish                        (~15 min)
12. /ship            → Deploy + generate docs              (~10 min)
13. /promote velog   → Generate promotional content        (~5 min)
```

<details>
<summary><strong>Running 3 parallel implementations (step 8 details)</strong></summary>

Open 3 separate terminal windows/tabs:

```
┌──────────────────┬──────────────────┬──────────────────┐
│   Terminal 1     │   Terminal 2     │   Terminal 3     │
│                  │                  │                  │
│ cd versions/v1   │ cd versions/v2   │ cd versions/v3   │
│ claude           │ claude           │ claude           │
│ /implement       │ /implement       │ /implement       │
│                  │                  │                  │
│ ⏳ Building...   │ ⏳ Building...   │ ⏳ Building...   │
└──────────────────┴──────────────────┴──────────────────┘
```

- **Each version requires its own Claude Code session** — you cannot run them in a single terminal.
- Wait until all 3 show "Implementation Complete" before running `/evaluate`.
- If one fails, you can re-run `/implement` in that terminal without affecting the others.

</details>

## Prototype Selection Guide

<details>
<summary><strong>Which prototype should I pick? (click to expand)</strong></summary>

| Prototype | Best For | Examples |
|-----------|----------|----------|
| **A (Minimal)** | Simple tools, landing pages, single-purpose apps | Calculator, timer, portfolio site |
| **B (Dashboard)** | Data-driven apps, SaaS, admin panels | Task manager, analytics dashboard, CRM |
| **C (Studio)** | Media/creative tools, rich interactive UIs | Image editor, music player, design tool |

> **Can't decide? Pick B** — it's the most versatile and works well for most use cases.

</details>

## Directory Structure

```
eng/
├── input/              # You put your PRD/PDF here (before /analyze)
├── analysis/           # Auto-generated after /analyze
├── prototypes/         # Auto-generated after /prototype
├── templates/          # Templates for version directories (pre-existing)
├── versions/           # Auto-generated after /setup-versions
│   ├── v1/
│   ├── v2/
│   └── v3/
├── evaluation/         # Auto-generated after /evaluate
├── project/            # Auto-generated after /select-winner
└── .claude/commands/   # Pipeline orchestration skills (pre-existing)
```

<details>
<summary><strong>Files generated at each stage (click to expand)</strong></summary>

| Stage | Generated Files |
|-------|----------------|
| `/analyze` | `analysis/prd.md`, `analysis/requirements.json`, `analysis/acceptance-criteria.md`, `analysis/evaluation-matrix.md` |
| `/prototype` | `prototypes/interface-{a,b,c}/` — each with `page.tsx`, `components/` |
| `/setup-versions` | `versions/v1/`, `versions/v2/`, `versions/v3/` — scaffolded Next.js projects |
| `/implement` | Full implementation inside each version directory |
| `/evaluate` | `evaluation/v1-score.md`, `evaluation/v2-score.md`, `evaluation/v3-score.md`, `evaluation/comparison.md` |
| `/select-winner` | `project/` — winning version copied here |

</details>

## Available Skills

| Skill | Description |
|-------|-------------|
| `/analyze` | Parse PRD/PDF and generate structured requirements |
| `/prototype` | Generate 3 UI prototype interfaces |
| `/setup-versions` | Create 3 version directories for parallel implementation |
| `/evaluate` | Score all versions against evaluation matrix |
| `/select-winner` | Copy winning version to project/ |
| `/ship` | Deploy and generate documentation |
| `/promote <platform>` | Generate promotional content (velog, devto, reddit, twitter, geek, hn) |
| `/devlog` | Auto-generate development log entry |

## MCP Servers

7 MCP servers are included in `.mcp.json` and auto-load when you run `cd eng && claude`.

| MCP Server | Purpose | Setup |
|------------|---------|-------|
| Sequential Thinking | Step-by-step PRD analysis | Zero config |
| Playwright | Automated browser testing | Zero config |
| Vercel | Deploy via MCP | OAuth |
| Supabase | DB management | OAuth |
| Context7 | Latest docs reference | API key (free) |
| Firecrawl | Web crawling/research | API key |
| GitHub | Branch/PR management | PAT |

API key setup and details: [docs/mcp-guide.md](docs/mcp-guide.md)

## How It Works

1. **Analyze**: Your PRD/PDF is parsed into structured requirements (features, acceptance criteria, tech constraints, evaluation matrix)
2. **Prototype**: 3 different UI approaches are generated (minimal, dashboard, studio)
3. **Parallel Build**: Each version gets its own directory with implementation skills, running independently in separate terminals
4. **Evaluate**: All versions are scored on functionality, code quality, UI/UX, deployability, and security
5. **Polish**: The winning version gets UI/UX refinement and senior code review
6. **Ship**: Documentation, deployment guide, and promotional content are generated

## Troubleshooting

<details>
<summary><strong>Common issues and solutions (click to expand)</strong></summary>

| Problem | Solution |
|---------|----------|
| "no files in input/" | Place a `.pdf` or `.md` file directly in `input/` |
| MCP connection failed | Make sure you ran `claude` from inside `eng/` — see [docs/mcp-guide.md](docs/mcp-guide.md) |
| `/implement` fails with missing env vars | Create accounts and set environment variables — see "Before You Begin" above |
| `npm run build` fails | `/evaluate` scores failed builds as 0 — at least 1 version usually succeeds |
| All 3 versions fail to build | Check environment variables, then re-run `/implement` in the failing terminal |
| Port conflict (address in use) | `lsof -ti:3001 \| xargs kill` to free the port |
| Vercel deploy fails | Run `npx vercel login` first |

</details>

## License

MIT
