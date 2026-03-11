---
description: Generate 3 UI prototype interfaces using v0 or manual design
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*"]
---

Read analysis/prd.md and generate 3 UI interface prototypes.

## Tasks

1. Read analysis/prd.md and analysis/requirements.json

1-1. **Competitor App UI Research with Firecrawl** (if MCP available):
   - Crawl competitor apps or similar services mentioned in the PRD using Firecrawl
   - Analyze UI layouts, navigation patterns, and key feature placement
   - Use findings to inform prototype design

2. Determine 3 interface concepts:
   - Interface A: Minimal (single page, focused on core features)
   - Interface B: Dashboard (SaaS style, sidebar + main)
   - Interface C: Studio (professional tool feel, media-centric)

3. Generate code for each concept in prototypes/interface-{a,b,c}/:
   - page.tsx (main page layout)
   - components/ (core UI components)
   - Tech: React + shadcn/ui + Tailwind CSS
   - Dark mode by default

4. Include README.md in each prototype:
   - Design concept description
   - Screen layout explanation
   - Pros and cons

If v0 MCP is configured, use the v0_generate_ui tool.
If not, write React + shadcn/ui code directly.

5. Present a summary of all 3 prototypes to the user and ask for selection
