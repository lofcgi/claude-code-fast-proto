---
description: Generate promotional content for a specified platform
allowed-tools: [Read, Glob, Grep, Write]
---

Analyze the project and generate promotional content for the $ARGUMENTS platform.

## Supported Platforms
- velog: Korean tech blog (2000-4000 chars, markdown)
- devto: English tech blog (1500-3000 words, markdown)
- reddit: English short post (300-500 words, r/nextjs r/webdev r/ClaudeAI)
- twitter: English thread (5-8 tweets, 280 chars each)
- geek: Korean GeekNews Show GN post (200-500 chars)
- hn: English Hacker News Show HN post (200-400 words)

## Content Structure

### Required Stories
- Experience automating prototype → implement → deploy with AI agents
- Pipeline design process
- Actual deliverable demo/screenshot guide
- Agent usage statistics (commit count, session count, etc.)

### Platform-specific Tone
- velog/geek: Korean, friendly but professional
- devto/hn: English, tech-focused, concise
- reddit: English, community-friendly, humble tone
- twitter: English, impactful short sentences

## Reference Files
- DEVLOG.md: Development journey
- analysis/prd.md: Project requirements
- analysis/requirements.json: Requirements analysis
- project/README.md: Final project description

Save result to docs/promotion/$ARGUMENTS.md
