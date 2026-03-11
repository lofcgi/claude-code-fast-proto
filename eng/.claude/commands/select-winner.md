---
description: Copy the winning version to project/ directory
allowed-tools: [Read, Bash, Write, Glob]
---

Read evaluation/comparison.md and copy the best version to project/.

## Arguments
$ARGUMENTS = Version number to select (1, 2, or 3). If empty, use comparison.md recommendation.

## Tasks

1. Read evaluation/comparison.md
2. Determine version ($ARGUMENTS or recommended version)
3. Copy versions/vN/ contents to project/ (excluding CLAUDE.md, .claude/)
4. Create CLAUDE.md for project/ (polish stage context):
   - Project overview
   - Current status: "Selected version through Best-of-3 evaluation"
   - Remaining work: UI/UX polish, code review, final cleanup

5. Record analysis/ file paths in project/CLAUDE.md using correct relative paths:
   - Example: ../analysis/prd.md (one level up from project/ is the root)

6. Read polish.md.template, review.md.template, finalize.md.template from templates/commands/
   and copy them to project/.claude/commands/ as polish.md, review.md, finalize.md

7. Guide: "cd project && claude → /polish or /review"
