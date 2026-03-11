# AI Agent Pipeline

This project is a pipeline where AI agents implement full-stack apps
in parallel using Best-of-3 from PRD/PDF input.

## Usage
1. Put PDF/PRD in input/
2. /analyze → /prototype → /setup-versions
3. Run /implement in 3 separate terminals
4. /evaluate → /select-winner
5. In project/: /polish → /ship

## Directory Structure
- input/: Original PRD/PDF
- analysis/: Parsed requirements
- prototypes/: 3 UI prototypes
- versions/: 3 parallel implementation versions
- evaluation/: Evaluation results
- project/: Final selected version

## Rules
- Always reference analysis/ documents when running skills
- Maintain Prettier formatting when modifying files
- Use Conventional Commits format
