# MCP Server Guide

This pipeline includes 7 MCP servers in `.mcp.json`.
They auto-load when you run `cd eng && claude`. Servers without API keys will simply deactivate without affecting others.

## Included MCP Servers (7)

### Zero Config (No API Key Needed)

| MCP Server | Purpose | Skill Integration |
|------------|---------|-------------------|
| **Sequential Thinking** | Step-by-step PRD analysis, complex problem decomposition | `/analyze` |
| **Playwright** | Automated browser testing, screenshot capture | `/evaluate` |

### OAuth (Browser Login)

| MCP Server | Purpose | Skill Integration |
|------------|---------|-------------------|
| **Vercel** | Deploy via MCP | `/ship` |
| **Supabase** | Supabase project management | Implementation phase |

### API Key Required

| MCP Server | Required Key | Where to Get It | Skill Integration |
|------------|-------------|-----------------|-------------------|
| **Context7** | `CONTEXT7_API_KEY` | [context7.com](https://context7.com) (free) | All implementation skills |
| **Firecrawl** | `FIRECRAWL_API_KEY` | [firecrawl.dev](https://firecrawl.dev) | `/analyze` research |
| **GitHub** | `GITHUB_TOKEN` | GitHub PAT (Personal Access Token) | Branch/PR management |

## Setting Up API Keys

### 1. Environment Variables (Recommended)

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export FIRECRAWL_API_KEY="your-key-here"
export GITHUB_TOKEN="your-pat-here"
```

### 2. Via Claude Code Config

```bash
claude config set env FIRECRAWL_API_KEY "your-key-here"
```

### 3. Context7

Context7 can work without a separate API key. If needed, get a free key at [context7.com](https://context7.com) and set it as an environment variable.

### 4. GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Select `repo` scope
3. Set as environment variable: `export GITHUB_TOKEN="ghp_..."`

### 5. Vercel / Supabase

OAuth-based — a browser login window will appear on first use. No separate key setup needed.

## Pipeline MCP Usage Flow

```
/analyze
  ├── Sequential Thinking → Step-by-step PRD analysis
  ├── Firecrawl → Competitor/technology research
  └── Context7 → Latest documentation reference

/prototype
  ├── Firecrawl → Competitor app UI reference crawling
  └── Context7 → Latest framework docs

/implement (each version)
  └── Context7 → Latest library API reference

/evaluate
  └── Playwright → Automated browser testing + screenshots

/ship
  ├── Vercel MCP → Deployment
  └── GitHub MCP → PR creation
```

## Additional MCPs (Manual Install)

These MCPs are not included by default but can be added to `.mcp.json`.

### v0 (Vercel Design AI)

```json
{
  "v0": {
    "command": "npx",
    "args": ["-y", "@anthropic-ai/v0-mcp"]
  }
}
```
- Used in `/prototype` for AI design generation

### Design Inspiration

Design reference search MCP. Search the community MCP registry for options.

### Others

Find more MCPs at the [MCP Server Directory](https://github.com/modelcontextprotocol/servers).
