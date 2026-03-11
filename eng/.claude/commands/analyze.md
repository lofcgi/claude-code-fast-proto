---
description: Analyze PRD/PDF in input/ and generate structured requirements
allowed-tools: [Read, Bash, Write, Edit, Glob, Grep, "mcp:sequential-thinking:*", "mcp:firecrawl:*", "mcp:context7:*"]
---

Analyze all PDF or markdown files in the input/ folder.

## Tasks

1. **Analyze PRD with Sequential Thinking** (if MCP available):
   - Use Sequential Thinking tool to analyze the PRD step by step
   - Systematically decompose complex requirements

2. **Competitor Research with Firecrawl** (if MCP available):
   - If the PRD mentions competitor products or reference services, crawl them with Firecrawl
   - Analyze their tech stack, UI patterns, and feature composition to inform analysis/

3. Read all files in input/
4. Generate the following files in analysis/:

### analysis/prd.md
Convert the original document into a structured PRD:
- Project overview
- Functional requirements (FR-001, FR-002... format)
- Non-functional requirements (NFR-001... format)
- Tech stack requirements
- Constraints (API limits, deployment environment, etc.)

### analysis/requirements.json
Machine-readable JSON:
```json
{
  "project_name": "",
  "tech_stack": {
    "framework": "Next.js 15 (App Router)",
    "db": "",
    "auth": "Auth.js v5 + Google OAuth",
    "ui": "shadcn/ui + Tailwind CSS",
    "deploy": "Vercel",
    "apis": []
  },
  "features": [{ "id": "FR-001", "title": "", "priority": "must|should|could" }],
  "constraints": [{ "type": "", "description": "", "impact": "" }]
}
```

> **Default stack hint**: If no specific technology is mentioned in the PRD, use these defaults:
> - Framework: **Next.js 15** (App Router, TypeScript, Tailwind CSS)
> - Auth: **Auth.js v5 + Google OAuth**
> - DB: **Turso (libSQL)** + Drizzle ORM (or a DB suited to the PRD)
> - UI: **shadcn/ui** + Lucide Icons
> - Deploy: **Vercel**
>
> If the PRD specifies different technologies, prioritize those.

### analysis/acceptance-criteria.md
Acceptance criteria per feature (Given/When/Then format):
- [ ] AC-001: Given [condition], When [action], Then [result]

### analysis/tech-constraints.md
Detailed analysis of technical constraints (free tier API limits, deployment restrictions, etc.)

### analysis/evaluation-matrix.md
Evaluation criteria matrix:
| Category | Points | Checklist |

Categories:
- Feature completeness (40 pts): All FRs implemented
- Code quality (20 pts): TypeScript strict, error handling, structure
- UI/UX (20 pts): Responsive, dark mode, loading/error states
- Deployability (10 pts): Build success, environment variable separation
- Security (10 pts): API key protection, input validation

5. Output a summary after all files are generated
