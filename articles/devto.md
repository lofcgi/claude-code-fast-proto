---
title: "Building a URL-to-deployed-app pipeline with Claude Code slash commands"
published: false
tags: ai, webdev, promptengineering, opensource
---

I spent a few weeks building a set of Claude Code slash commands that take a URL and turn it into a deployed full-stack app. The prompts went through 4 major rewrites before I got results I was happy with. Here's what the process actually looked like.

## The end result

Input: a URL (e.g., a SaaS landing page)

Output: a deployed Next.js app — 33 files, ~3,570 lines of code, running on Vercel.

Three slash commands handle the full pipeline:
- `/prototype` — scrapes the URL, extracts branding, generates 2 UI prototypes
- `/implement` — converts a prototype to a full-stack app with autonomous build-fix loops
- `/ship` — validates environment variables and deploys

795 lines of markdown prompts total. The prompts program the agent's behavior — what tools to use, in what order, with what constraints.

## How the prompts evolved (v1 → v4)

### v1: One giant prompt, "be creative"

First attempt: a 900-line monolithic prompt with 7 phases. I connected 7 MCP servers (Design Inspiration, v0, 21st.dev, Firecrawl, Unsplash, Playwright, Sequential Thinking) and told Claude to explore design concepts and build something creative.

Every output looked the same. Purple-orange gradients, aurora effects, neon glows. The MCP tools suggested Aceternity and MagicUI components, and Claude used all of them. Three "different" prototypes that were basically identical.

### v2: Modularized structure

Split the monolith into an orchestrator + 7 phase files. Context management improved — Claude actually followed instructions at the end of the file now. But the outputs were still generic. Better structure, same strategy problem.

### v3: Reference cloning (the breakthrough)

Instead of "generate creative concepts," I changed the strategy to: "find 3 reference sites, screenshot them, clone each one section-by-section, swap the color palette."

Same pipeline, wildly different results. Each prototype looked different because it was based on a different reference. The quality jumped immediately.

### v4: Simplified to 3 phases

7 phases was too heavy. Each transition had validation scripts, prerequisite checks. 40+ minutes per run.

Simplified to 3 phases:

| Phase | What it does | MCP tools |
|-------|-------------|-----------|
| Explore & Plan | Firecrawl scrape → branding JSON → Unsplash images → plan.md | Firecrawl, Unsplash |
| Generate | plan.md → 2 prototypes (clone + variation) | 21st-dev, Context7 |
| Diff Loop | Playwright screenshot → compare to reference → fix (max 3x) | Playwright |

Other changes: removed v0 MCP (redundant with reference screenshots), added `/clear` between phases for context management, relaxed design rules from "enforce" to "reference."

## What a prompt phase actually looks like

Here's a trimmed excerpt from `prototype.md` (Phase 2 — Generate):

```markdown
## PHASE 2 — GENERATE PROTOTYPES

### Context Setup
Read the following files before generating:
- plan.md (branding, layout, content)
- input/url.md (original URL for reference)

### Prototype A — Reference Clone
- Clone the reference layout SECTION BY SECTION
- Use extracted branding (colors, fonts, spacing from plan.md)
- Source components from 21st-dev when a close match exists
- Check Context7 for current API syntax before using any framework feature

### Prototype B — Variation
- Same content and branding
- Different layout approach (e.g., if A uses cards, B uses a timeline)
- Must still be section-by-section — no freestyling

### Quality Gates
- Every component must render without errors
- No placeholder text ("Lorem ipsum" = immediate fail)
- All images must be real (Unsplash URLs from Phase 1)
```

The full file is 349 lines. Each phase has explicit tool instructions, quality gates, and failure conditions.

## Quick start (if you want to try it)

```bash
git clone https://github.com/lofcgi/claude-code-best-of-n.git
cd claude-code-best-of-n/eng    # or: cd kor (한국어)
# Put your target URL in input/url.md
claude                           # Start Claude Code
/prototype                       # Agent takes over
```

You'll need MCP servers configured. The repo includes `.mcp.json.example` with the full setup.

## 5 things I learned

**1. "Be creative" produces generic results.** Telling Claude to be creative with design is like telling it to write a "good" story — you get the median of its training data. Showing a specific reference screenshot produces targeted, diverse output.

**2. Context window management is architecture.** 900 lines in one prompt = Claude ignores the bottom. Splitting into phases with `/clear` between them and file-based handoff (plan.md) is the prompt equivalent of microservices with message queues.

**3. Self-fixing loops work, but cap them.** The build → check → review → fix loop resolves most issues in 1-2 rounds. Cap at 3 to avoid the agent going in circles. If it can't fix it in 3 rounds, a human needs to look at it.

**4. MCP servers are powerful but fragile.** API keys expire, servers crash mid-pipeline, rate limits hit. Always validate MCP availability at the start and have graceful fallbacks.

**5. The 80/20 of AI-generated UI.** Reference cloning gets you 80% of the way to professional-looking output. The remaining 20% (micro-interactions, custom illustrations, that "feel") still needs human polish. But 80% in 30 minutes is a good deal.

## Links

- **Live demo**: https://project-nine-nu-52.vercel.app/ | https://project-kimanlee.vercel.app/
- **GitHub**: [claude-code-best-of-n](https://github.com/lofcgi/claude-code-best-of-n)
- **License**: MIT
- Available in English and Korean

If you have questions about the prompt structure or MCP setup, happy to answer in the comments.
