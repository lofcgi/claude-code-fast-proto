# AI Agent Pipeline

This project is a pipeline where AI agents perform
prototype → implement → deploy from URL + PRD input.

## Usage
1. Put URL + description in input/
2. /prototype → compare prototypes a/b
3. /implement a (or b) → auto-chains build-check + self-review + iterate
4. /ship → env vars setup + deploy

## Directory Structure
- input/: Original URL/PRD/PDF
- analysis/: Parsed requirements
- prototypes/: 2 UI prototypes (a, b)
- project/: Implemented app

## Rules
- Always reference analysis/ documents when running skills
- Maintain Prettier formatting when modifying files
- Use Conventional Commits format

## Design Guidelines (reference, not enforced)
- Colors via design-tokens.ts preferred
- Consult prototype-references/ docs for visual density, aesthetics, copy, components
- Spring physics preferred over linear easing
- Feature pages with interactive mockups required in prototypes
