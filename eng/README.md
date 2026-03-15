# AI Agent Pipeline

> Your AI agent reads a URL, clones the design, builds the app, and deploys it.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-CLI-blueviolet)](https://docs.anthropic.com/en/docs/claude-code)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)

---

## How It Works — Agent Orchestration

### The Big Picture

```
┌──────────────────────────────────────────────────────────────┐
│  input/url.md  ──→  /prototype  ──→  /implement  ──→  /ship │
│                                                              │
│  Phase 1: Explore & Plan                                     │
│    Firecrawl scrape → Vision analysis → branding extraction  │
│    → plan.md + analysis/ (PRD, requirements, criteria)       │
│                                                              │
│  Phase 2: Generate                                           │
│    Section-by-section cloning → 21st-dev components          │
│    → Unsplash images → prototypes/a + prototypes/b           │
│                                                              │
│  Phase 3: Verify                                             │
│    Playwright screenshot → Vision diff → fix loop (max 3)    │
│                                                              │
│  /clear  (reset context window)                              │
│                                                              │
│  Phase 4: Implement                                          │
│    Prototype → full-stack app → Ralph Loop                   │
│    (build → type-check → self-review → fix, max 3 rounds)   │
│                                                              │
│  Phase 5: Ship                                               │
│    Env var validation → CLI deploy                           │
└──────────────────────────────────────────────────────────────┘
```

### What the Agent Does at Each Step

**`/prototype`** — The agent:
1. Scrapes the reference URL with Firecrawl to extract content, layout, and branding
2. Captures screenshots and analyzes them with Vision to understand visual structure
3. Searches Dribbble/Behance/Awwwards for design inspiration
4. Sources real images from Unsplash (avatars, heroes, backgrounds)
5. Generates 2 complete UI prototypes by cloning the reference section-by-section
6. Takes screenshots of its own prototypes and compares them to the reference (diff loop, max 3 rounds)

**`/implement a`** (or `b`) — The agent:
1. Reads `analysis/` and the chosen prototype to understand requirements
2. Converts the static prototype into a full-stack app (API routes, database, auth)
3. Runs the Ralph Loop: build → type-check → lint → self-review → fix (max 3 rounds)
4. Outputs a production-ready app in `project/`

**`/ship`** — The agent:
1. Checks all required environment variables
2. Guides you through any missing credentials
3. Deploys via Vercel CLI

### Ralph Loop: Self-Improving Code Generation

```
build → type-check → lint ──→ pass? ──→ self-review ──→ done
                              │                          │
                              fail                      issues found
                              │                          │
                              └──→ fix + rebuild ←───────┘
                                   (max 3 rounds)
```

The agent doesn't just generate code — it **validates and fixes its own output** autonomously.

---

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

### MCP Servers — Your Agent's Toolbox

MCP servers are pre-configured in `.mcp.json` and auto-load when you run `cd eng && claude`.
Servers without API keys simply deactivate — they don't block the pipeline.

| MCP Server | What the Agent Does With It | Setup |
|------------|---------------------------|-------|
| **Firecrawl** | Scrapes reference URL for content + branding | API key ([firecrawl.dev](https://firecrawl.dev)) |
| **Playwright** | Screenshots, visual diff, browser testing | Zero config |
| **21st-dev Magic** | Sources production UI components | API key ([21st.dev](https://21st.dev/magic/console), free) |
| **Design Inspiration** | Searches design reference sites | API key ([serper.dev](https://serper.dev)) |
| **Unsplash** | Sources real images for prototypes | API key ([unsplash.com](https://unsplash.com/developers)) |
| **Context7** | Looks up latest framework docs | Zero config |
| **Sequential Thinking** | Structured multi-step analysis | Zero config |
| **GitHub** | Branch/PR management | PAT |
| **Vercel** | Deployment via MCP | OAuth (browser login) |
| **v0** | AI prototype code generation | Zero config |
| **Defuddle Fetch** | Clean web content extraction | Zero config |
| **Lighthouse** | Performance auditing | Zero config |

Full setup guide: [docs/mcp-guide.md](docs/mcp-guide.md)

<details>
<summary><strong>Accounts needed later (not required to start)</strong></summary>

These accounts are only needed at the `/implement` and `/ship` stages:

| Account | Environment Variables | When Needed |
|---------|----------------------|-------------|
| [Google Cloud Console](https://console.cloud.google.com/) → OAuth credentials | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | `/implement` stage |
| [Turso](https://turso.tech/) → Database | `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | `/implement` stage |
| [Vercel](https://vercel.com/) → Deployment | (Vercel CLI login) | `/ship` stage |

</details>

---

## Quick Start

```bash
git clone <repo-url> && cd ai-agent-pipeline/eng

# 1. Add your reference URL
echo "https://example.com" > input/url.md

# 2. Start Claude Code
claude

# 3. Run the pipeline
/prototype          # Generates analysis/ + prototypes/a, prototypes/b
# Pick your favorite, then:
/implement a        # Builds full-stack app in project/ (auto Ralph Loop)
/ship               # Env var check + deploy
```

> **Total time: ~1 hour** depending on project complexity.

---

## Pipeline Deep Dive

### Phase 1: Explore & Plan (`/prototype`)

The agent's first actions:
1. Reads `input/url.md` for the reference URL
2. **Firecrawl scrape** — extracts page content, navigation structure, copy
3. **Playwright visit** — captures full-page screenshots
4. **Vision analysis** — identifies layout patterns, color palette, typography
5. **Design Inspiration search** — finds similar designs on Dribbble/Behance/Awwwards
6. **Sequential Thinking** — breaks down the reference into a structured plan

**Output:** `analysis/prd.md`, `analysis/requirements.json`, `analysis/acceptance-criteria.md`

### Phase 2: Generate (`/prototype` continued)

The agent builds two prototypes:
1. **Section-by-section cloning** — each section of the reference is replicated individually
2. **21st-dev components** — sources production-quality UI building blocks
3. **Unsplash images** — replaces placeholders with real, relevant images
4. **Framer Motion** — adds appropriate animations (spring physics preferred)

**Output:** `prototypes/a/`, `prototypes/b/`

### Phase 3: Verify (`/prototype` continued)

The agent validates its own work:
1. **Playwright screenshot** — captures the generated prototype
2. **Vision comparison** — compares prototype screenshot to reference screenshot
3. **Diff loop** — identifies discrepancies and fixes them (max 3 rounds)

### Phase 4: Implement (`/implement`)

After you pick a prototype and run `/clear`:
1. Reads `analysis/` documents and the chosen prototype
2. Converts static UI to full-stack: API routes, database schema, auth flows
3. **Ralph Loop** — build → type-check → lint → self-review → fix (max 3 rounds)
4. Uses **Context7** to look up latest API docs for frameworks

**Output:** `project/` — production-ready full-stack app

### Phase 5: Ship (`/ship`)

1. Validates all required environment variables
2. Guides through missing credentials
3. Deploys via Vercel CLI

---

## Customizing the Agent

### Adding Your Own Skills

Create a markdown file in `.claude/commands/`:

```markdown
---
description: What this skill does (shown in /help)
---

Your prompt engineering here. The agent follows these instructions
when the user runs /your-skill-name.
```

The filename becomes the slash command: `my-skill.md` → `/my-skill`.

### Modifying Existing Skills

The `prototype.md` file (349 lines) controls the entire prototype generation. Key sections:

| Section | What It Controls |
|---------|-----------------|
| Phase 1: Explore | URL analysis, branding extraction, MCP tool usage |
| Phase 2: Generate | Section cloning strategy, component sourcing, image mapping |
| Phase 3: Verify | Screenshot comparison, diff loop iterations |
| Quality gates | What standards the agent enforces |

### Adding MCP Servers

Edit `.mcp.json` to add new servers:

```json
{
  "mcpServers": {
    "your-server": {
      "command": "npx",
      "args": ["-y", "your-mcp-package"]
    }
  }
}
```

Then reference the server in your skill's `allowed-tools` frontmatter.

---

## Directory Structure

```
eng/
├── input/              # Your URL + PRD/PDF goes here
├── analysis/           # Auto-generated by /prototype
├── prototypes/         # Auto-generated by /prototype (a/, b/)
├── templates/          # Starter templates for project/
├── project/            # Auto-generated by /implement
├── .claude/commands/   # Agent skill prompts (the "programs")
├── .mcp.json           # MCP server configuration
└── docs/
    └── mcp-guide.md    # Detailed MCP setup guide
```

<details>
<summary><strong>Files generated at each stage</strong></summary>

| Stage | Generated Files |
|-------|----------------|
| `/prototype` | `analysis/prd.md`, `analysis/requirements.json`, `analysis/acceptance-criteria.md`, `prototypes/a/`, `prototypes/b/` |
| `/implement a` | `project/` — full-stack app based on chosen prototype |
| `/ship` | Deployment URL + env var setup |

</details>

---

## Troubleshooting

<details>
<summary><strong>Common issues and solutions</strong></summary>

| Problem | Solution |
|---------|----------|
| "Please add url.md to input/" | Add reference URLs to `input/url.md` |
| MCP connection failed | Make sure you ran `claude` from inside `eng/` — see [docs/mcp-guide.md](docs/mcp-guide.md) |
| `/implement` fails with missing env vars | Create accounts and set environment variables — see "Before You Begin" |
| `npm run build` fails | Ralph Loop automatically attempts fixes (max 3 rounds) |
| Port conflict (address in use) | `lsof -ti:3000 \| xargs kill` to free the port |
| Vercel deploy fails | Run `npx vercel login` first |

</details>

## License

MIT
