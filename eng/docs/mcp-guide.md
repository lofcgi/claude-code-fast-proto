# MCP Server Guide — Agent Tools

This pipeline equips the AI agent with MCP servers as its toolbox.
They auto-load when you run `cd eng && claude`. Servers without API keys simply deactivate without affecting others.

## How the Agent Uses MCP Servers

```
/prototype
  ├── Firecrawl        → Scrape reference URL for content + branding
  ├── Playwright       → Capture screenshots for Vision analysis + diff loop
  ├── Design Inspiration → Search Dribbble/Behance/Awwwards for references
  ├── 21st-dev Magic   → Source production-quality UI components
  ├── Unsplash         → Source real images (avatars, heroes, backgrounds)
  ├── Sequential Thinking → Break down PRD into structured analysis
  ├── Defuddle Fetch   → Extract clean content from web pages
  └── Context7         → Look up latest framework docs

/implement
  ├── Context7         → Look up latest library API docs
  ├── Playwright       → Browser testing + screenshots
  └── Lighthouse       → Performance auditing

/ship
  ├── Vercel           → Deploy via MCP
  └── GitHub           → Create branches and PRs
```

## Included MCP Servers

### Zero Config (No API Key Needed)

| MCP Server | What the Agent Does With It | Used In |
|------------|---------------------------|---------|
| **Sequential Thinking** | Breaks down complex problems into structured, step-by-step analysis | `/prototype` |
| **Playwright** | Captures screenshots for visual comparison, runs browser tests, executes diff loops | `/prototype`, `/implement` |
| **v0** | Generates AI prototype code (Vercel) | `/prototype` |
| **Context7** | Looks up latest framework and library documentation | All skills |
| **Defuddle Fetch** | Extracts clean, readable content from web pages | `/prototype` |
| **Lighthouse** | Runs performance audits on built applications | `/implement` |

### OAuth (Browser Login)

| MCP Server | What the Agent Does With It | Used In |
|------------|---------------------------|---------|
| **Vercel** | Deploys the finished application | `/ship` |

### API Key Required

| MCP Server | Required Key | Where to Get It | What the Agent Does With It |
|------------|-------------|-----------------|---------------------------|
| **Firecrawl** | `FIRECRAWL_API_KEY` | [firecrawl.dev](https://firecrawl.dev) | Scrapes reference URL to extract content, layout structure, and branding elements |
| **GitHub** | `GITHUB_TOKEN` | [GitHub PAT](https://github.com/settings/tokens) | Creates branches, manages pull requests |
| **21st-dev Magic** | `TWENTY_FIRST_API_KEY` | [21st.dev/magic/console](https://21st.dev/magic/console) (beta, free) | Sources production-quality UI components for prototypes |
| **Design Inspiration** | `SERPER_API_KEY` | [serper.dev](https://serper.dev) | Searches Dribbble/Behance/Awwwards for design references |
| **Unsplash** | `UNSPLASH_ACCESS_KEY` | [unsplash.com/developers](https://unsplash.com/developers) | Sources real images — avatars, hero images, backgrounds — to replace placeholders |

## Setting Up API Keys

### 1. Environment Variables (Recommended)

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export FIRECRAWL_API_KEY="your-key-here"
export GITHUB_TOKEN="your-pat-here"
export SERPER_API_KEY="your-key-here"
export TWENTY_FIRST_API_KEY="your-key-here"
export UNSPLASH_ACCESS_KEY="your-key-here"
```

### 2. Via Claude Code Config

```bash
claude config set env FIRECRAWL_API_KEY "your-key-here"
```

### Detailed Setup

<details>
<summary><strong>Context7</strong></summary>

Works without a separate API key via npx. If needed, get a free key at [context7.com](https://context7.com) and set it as an environment variable.

</details>

<details>
<summary><strong>GitHub Token</strong></summary>

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Select `repo` scope
3. Set as environment variable: `export GITHUB_TOKEN="ghp_..."`

</details>

<details>
<summary><strong>Vercel</strong></summary>

OAuth-based — a browser login window appears on first use. No separate key setup needed.

</details>

<details>
<summary><strong>21st-dev Magic</strong></summary>

1. Go to [21st.dev/magic/console](https://21st.dev/magic/console)
2. Sign up and get your API key (beta, free)
3. Set as environment variable: `export TWENTY_FIRST_API_KEY="your-key-here"`

</details>

<details>
<summary><strong>Design Inspiration</strong></summary>

1. Get a Serper API key at [serper.dev](https://serper.dev)
2. Set as environment variable: `export SERPER_API_KEY="your-key-here"`
3. The MCP server runs automatically via npx — no build step needed

</details>

<details>
<summary><strong>Unsplash</strong></summary>

1. Create an app at [unsplash.com/developers](https://unsplash.com/developers)
2. Copy your Access Key
3. Set as environment variable: `export UNSPLASH_ACCESS_KEY="your-key-here"`

</details>

## Adding More MCP Servers

Edit `.mcp.json` to add servers:

```json
{
  "mcpServers": {
    "your-server": {
      "command": "npx",
      "args": ["-y", "your-mcp-package"],
      "env": {
        "YOUR_API_KEY": "${YOUR_API_KEY}"
      }
    }
  }
}
```

Then add `"mcp:your-server:*"` to the `allowed-tools` list in the relevant `.claude/commands/*.md` skill file.

Find more MCP servers at the [MCP Server Directory](https://github.com/modelcontextprotocol/servers).
