---
description: Create 3 version directories with skills for parallel implementation
allowed-tools: [Read, Write, Bash, Glob, Grep, Edit]
---

Create 3 version directories based on the selected prototype.

## Arguments
$ARGUMENTS = Selected prototype (a, b, or c)

## Tasks

1. Verify selected prototype: prototypes/interface-$ARGUMENTS/

2. Read analysis/requirements.json to understand project info

3. For each of versions/v1, v2, v3:

   a. Create directory structure:
      ```
      versions/vN/
      ├── CLAUDE.md
      ├── .claude/commands/
      │   ├── implement.md
      │   ├── build-check.md
      │   ├── self-review.md
      │   └── iterate.md
      └── prototype/
      ```

   b. Copy selected prototype code to prototype/

   c. Read templates/CLAUDE.md.template and substitute variables using analysis/ data:
      - {{PROJECT_NAME}}: project_name from requirements.json
      - {{VERSION_NUMBER}}: 1, 2, 3
      - {{PROJECT_DESCRIPTION}}: Project overview from prd.md
      - {{TECH_STACK}}: tech_stack from requirements.json

   d. Read templates/commands/*.template files and generate .claude/commands/ skills

4. Guide the user:
   ```
   3 version directories are ready.
   Open a new terminal for each and run:
   Terminal 1: cd versions/v1 && claude → /implement
   Terminal 2: cd versions/v2 && claude → /implement
   Terminal 3: cd versions/v3 && claude → /implement
   ```
