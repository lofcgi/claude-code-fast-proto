# AI Agent Pipeline

> **Claude Code slash commands that turn a URL into a deployed full-stack app.**
>
> URL 하나를 넣으면 AI 에이전트가 분석 → 프로토타입 → 구현 → 배포까지 수행하는 Claude Code 슬래시 커맨드 파이프라인.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-CLI-blueviolet)](https://docs.anthropic.com/en/docs/claude-code)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)

---

## What This Does

An AI agent orchestrated by Claude Code slash commands:

1. **Analyzes** a reference URL — scrapes content, extracts branding, captures screenshots
2. **Generates** 2 UI prototypes by cloning the reference design section-by-section
3. **Implements** a full-stack app with an autonomous build → review → fix loop
4. **Deploys** via CLI with environment variable validation

Each slash command is a **350+ line prompt** that programs the agent's behavior — prompt engineering as code.

## Agent Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│  input/url.md                                                │
│    └→ /prototype ─── Firecrawl scrape + branding extract     │
│         ├→ analysis/ (PRD, requirements, acceptance criteria) │
│         └→ prototypes/a, prototypes/b                        │
│              └→ /implement a ─── build → review → fix loop   │
│                   └→ project/ (full-stack app)               │
│                        └→ /ship ─── env vars + deploy        │
└──────────────────────────────────────────────────────────────┘
```

## Quick Start

```bash
git clone <repo-url> && cd ai-agent-pipeline
cd eng          # or: cd kor (한국어)
# Put your reference URL in input/url.md
claude          # Start Claude Code
/prototype      # Agent takes over
```

## How the Agent Works

### Slash Commands = Agent Skills

Each `/command` is a markdown file in `.claude/commands/` that programs the agent with hundreds of lines of prompt engineering.

| Skill | Agent Behavior | MCP Tools Used |
|-------|---------------|----------------|
| `/prototype` | Scrapes URL → extracts branding → generates 2 UI prototypes with section-by-section cloning | Firecrawl, Playwright, 21st-dev, Design Inspiration, Unsplash |
| `/implement <a\|b>` | Converts prototype to full-stack app → Ralph Loop (build → review → fix, max 3 rounds) | Context7, Playwright |
| `/ship` | Validates env vars → deploys via CLI | Vercel |
| `/promote` | Generates promotional content for dev platforms | — |
| `/devlog` | Auto-generates development log from git history | — |

### MCP Servers = Agent Tools

MCP servers give the agent capabilities beyond code generation:

| MCP Server | What the Agent Does With It |
|------------|---------------------------|
| **Firecrawl** | Scrapes reference URL to extract content, layout, and branding |
| **Playwright** | Captures screenshots, runs visual diff loops, tests the built app |
| **21st-dev Magic** | Sources production-quality UI components |
| **Design Inspiration** | Searches Dribbble/Behance/Awwwards for design references |
| **Unsplash** | Sources real images (avatars, heroes, backgrounds) |
| **Context7** | Looks up latest framework/library documentation |
| **Sequential Thinking** | Breaks down complex analysis into structured steps |
| **GitHub** | Manages branches and pull requests |
| **Vercel** | Deploys the finished app |

### Ralph Loop = Self-Improving Agent

The agent autonomously iterates on its own code:

```
build → type-check → lint ──→ pass? ──→ self-review ──→ done
                              │                          │
                              fail                      issues found
                              │                          │
                              └──→ fix + rebuild ←───────┘
                                   (max 3 rounds)
```

### Context Management

- **`/clear` between phases** — resets the agent's context window between `/prototype` and `/implement`
- **`plan.md` + `analysis/`** — file-based handoff between agent phases (the agent writes analysis, then reads it in the next phase)

## Prompt Engineering as Code

The `.claude/commands/*.md` files **are** the agent's program:

```
.claude/commands/
├── prototype.md    # 349 lines — URL analysis, section cloning, visual diff
├── implement.md    # Full-stack conversion + Ralph Loop orchestration
├── ship.md         # Deployment checklist + env var validation
├── promote.md      # Platform-specific content generation
└── devlog.md       # Development log automation
```

Customize the pipeline by editing these files or adding your own slash commands.

## Choose Language

| Language | Directory | Guide |
|----------|-----------|-------|
| English | [`eng/`](./eng/) | [`eng/README.md`](./eng/README.md) |
| 한국어 | [`kor/`](./kor/) | [`kor/README.md`](./kor/README.md) |

Each folder is a **fully independent, self-contained pipeline**. You can delete the one you don't need.

## Real-World Example

[`_example/`](./_example/) contains a real project built with this pipeline — an **AI dubbing web service** deployed at [project-nine-nu-52.vercel.app](https://project-nine-nu-52.vercel.app).

<details>
<summary><strong>Architecture & Pipeline Evolution</strong></summary>

### Pipeline Evolution

| Version | Architecture | Key Change |
|---------|-------------|------------|
| v1 | Monolithic single prompt | One giant command |
| v2 | Modularized phases | Separate analyze/prototype/implement |
| v3 | Reference-based cloning | Section-by-section design cloning |
| v4 | URL input + 3-phase | Firecrawl integration, visual diff loop |
| v5 | Analyze absorbed into prototype | Streamlined to 3 slash commands |

### Directory Structure

```
ai-agent-pipeline/
├── README.md                 # This file
├── eng/                      # English pipeline (self-contained)
│   ├── .claude/commands/     # Agent skill prompts
│   ├── .mcp.json             # MCP server configuration
│   ├── input/                # Your URL + PRD goes here
│   ├── analysis/             # Generated: requirements, criteria
│   ├── prototypes/           # Generated: a/, b/
│   ├── project/              # Generated: full-stack app
│   └── templates/            # Starter templates
├── kor/                      # Korean pipeline (self-contained)
│   └── (same structure)
└── _example/                 # Real-world example project
```

</details>

## License

MIT
