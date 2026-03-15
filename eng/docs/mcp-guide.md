# MCP Server Guide

This pipeline includes 9 MCP servers in `.mcp.json`.
They auto-load when you run `cd eng && claude`. Servers without API keys will simply deactivate without affecting others.

## Included MCP Servers (9)

### Zero Config (No API Key Needed)

| MCP Server | Purpose | Skill Integration |
|------------|---------|-------------------|
| **Sequential Thinking** | Step-by-step PRD analysis, complex problem decomposition | `/prototype` |
| **Playwright** | Automated browser testing, screenshot capture | `/implement` |
| **v0** | AI prototype code generation (Vercel) | `/prototype` |

### OAuth (Browser Login)

| MCP Server | Purpose | Skill Integration |
|------------|---------|-------------------|
| **Vercel** | Deploy via MCP | `/ship` |

### API Key Required

| MCP Server | Required Key | Where to Get It | Skill Integration |
|------------|-------------|-----------------|-------------------|
| **Context7** | `CONTEXT7_API_KEY` | [context7.com](https://context7.com) (free) | All implementation skills |
| **Firecrawl** | `FIRECRAWL_API_KEY` | [firecrawl.dev](https://firecrawl.dev) | `/prototype` research |
| **GitHub** | `GITHUB_TOKEN` | GitHub PAT (Personal Access Token) | Branch/PR management |
| **21st-dev Magic** | `TWENTY_FIRST_API_KEY` | [21st.dev/magic/console](https://21st.dev/magic/console) (beta, free) | `/prototype` UI components |

### API Key Required (continued)

| MCP Server | Required Key | Where to Get It | Skill Integration |
|------------|-------------|-----------------|-------------------|
| **Design Inspiration** | `SERPER_API_KEY` | [serper.dev](https://serper.dev) | `/prototype` design references |

## Setting Up API Keys

### 1. Environment Variables (Recommended)

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export FIRECRAWL_API_KEY="your-key-here"
export GITHUB_TOKEN="your-pat-here"
export SERPER_API_KEY="your-key-here"
export TWENTY_FIRST_API_KEY="your-key-here"
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

### 5. Vercel

OAuth-based — a browser login window will appear on first use. No separate key setup needed.

### 6. 21st-dev Magic

1. Go to [21st.dev/magic/console](https://21st.dev/magic/console)
2. Sign up and get your API key (beta, free)
3. Set as environment variable: `export TWENTY_FIRST_API_KEY="your-key-here"`

### 7. Design Inspiration

1. Get a Serper API key at [serper.dev](https://serper.dev)
2. Set as environment variable: `export SERPER_API_KEY="your-key-here"`
3. The MCP server runs automatically via npx — no build step needed

## Pipeline MCP Usage Flow

```
/prototype
  ├── Sequential Thinking → Step-by-step PRD analysis
  ├── Design Inspiration → Dribbble/Behance/Awwwards reference search
  ├── 21st-dev Magic → UI component inspiration + generation
  ├── v0 → AI prototype code generation
  ├── Firecrawl → Competitor app UI reference crawling
  └── Context7 → Latest framework docs

/implement
  ├── Context7 → Latest library API reference
  └── Playwright → Automated browser testing + screenshots

/ship
  ├── Vercel MCP → Deployment
  └── GitHub MCP → PR creation
```

## Additional MCPs (Manual Install)

Find more MCPs at the [MCP Server Directory](https://github.com/modelcontextprotocol/servers).
