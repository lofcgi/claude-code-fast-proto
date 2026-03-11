# AI Agent Pipeline

> The world's first open-source Best-of-N parallel implementation pipeline powered by AI coding agents.

Drop a PRD/PDF, run Claude Code skills, and get 3 competing full-stack implementations evaluated and merged into one polished product.

## Why This Exists

Best-of-N sampling is a proven technique in AI research for improving output quality — but no practical developer tool existed for it. Until now.

This template turns the concept into a real pipeline: **one PRD in, three implementations out, best one wins.**

## Pipeline Flow

```
1. git clone ai-agent-pipeline && cd ai-agent-pipeline
2. Put your PDF/PRD in input/
3. /analyze          → Parse & structure requirements
4. /prototype        → Generate 3 UI prototypes
5. Pick your favorite prototype
6. /setup-versions   → Create 3 parallel implementation directories
7. Open 3 terminals:
   - Terminal 1: cd versions/v1 && claude → /implement
   - Terminal 2: cd versions/v2 && claude → /implement
   - Terminal 3: cd versions/v3 && claude → /implement
8. /evaluate         → Score all 3 versions
9. /select-winner    → Copy best version to project/
10. cd project && claude → /polish
11. /ship            → Deploy + generate docs
12. /promote velog   → Generate promotional content
```

## Directory Structure

```
eng/
├── input/              # Your PRD/PDF goes here
├── analysis/           # Structured requirements (auto-generated)
├── prototypes/         # 3 UI prototypes (auto-generated)
├── templates/          # Templates for version directories
├── versions/           # 3 parallel implementations
│   ├── v1/
│   ├── v2/
│   └── v3/
├── evaluation/         # Scoring & comparison results
├── project/            # Final winning version
└── .claude/commands/   # Pipeline orchestration skills
```

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

## Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed
- Node.js 18+
- Git

## How It Works

1. **Analyze**: Your PRD/PDF is parsed into structured requirements (features, acceptance criteria, tech constraints, evaluation matrix)
2. **Prototype**: 3 different UI approaches are generated (minimal, dashboard, studio)
3. **Parallel Build**: Each version gets its own directory with implementation skills, running independently in separate terminals
4. **Evaluate**: All versions are scored on functionality, code quality, UI/UX, deployability, and security
5. **Polish**: The winning version gets UI/UX refinement and senior code review
6. **Ship**: Documentation, deployment guide, and promotional content are generated

## License

MIT
