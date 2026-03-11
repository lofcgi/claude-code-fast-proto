---
description: Deploy the project and generate documentation
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, "mcp:vercel:*", "mcp:github:*", "mcp:context7:*"]
---

Deploy the app in project/ and generate documentation.

## Pre-flight Checks

1. Verify Vercel CLI login: npx vercel whoami
   → If it fails, display "Run npx vercel login first, then retry" and stop
2. Check required environment variables:
   - AUTH_SECRET (if missing, guide: can be generated with npx auth secret)
   - AUTH_URL (can be set after deployment)
   - DB-related variables (should already be set from /implement)
3. Check GITHUB_TOKEN (needed for PR creation)

## Tasks

1. In project/:
   a. Create/update `.env.example` (list required env vars, leave values empty):
   ```
   AUTH_SECRET=
   AUTH_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   TURSO_DATABASE_URL=
   TURSO_AUTH_TOKEN=
   ```
   - Grep `process.env` in code to ensure no keys are missing

   b. Verify `.gitignore` includes `.env.local`, `.env`, `node_modules`

2. Create project/README.md:
   - Service introduction and key features
   - Tech stack
   - Local setup (git clone → npm install → set env vars → npm run dev)
   - Deployment URL (user fills later: `[Deployment URL]`)
   - AI coding agent tips and workflow insights
   - Mermaid architecture diagram

3. Vercel deployment:
   a. **If Vercel MCP is available, deploy via MCP**. Otherwise fall back to CLI:
   ```bash
   # CLI fallback if MCP unavailable:
   cd project
   npx vercel --yes
   ```
   b. Environment variable setup guide:
   ```
   # For each key in .env.example:
   npx vercel env add AUTH_SECRET production
   npx vercel env add GOOGLE_CLIENT_ID production
   npx vercel env add GOOGLE_CLIENT_SECRET production
   npx vercel env add AUTH_URL production     # Set to deployed URL
   npx vercel env add TURSO_DATABASE_URL production
   npx vercel env add TURSO_AUTH_TOKEN production
   ```
   c. Redeploy after setting env vars:
   ```bash
   npx vercel --prod
   ```
   d. Guide to update OAuth redirect URI in Google Cloud Console:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```

4. Update root README.md

5. Finalize DEVLOG.md

6. Post-deployment guide:
   ```
   Deployment complete.

   Remaining tasks:
   1. Verify environment variables in Vercel dashboard: https://vercel.com/dashboard
   2. Add OAuth redirect URI in Google Cloud Console
   3. Set environment variables with `npx vercel env add <KEY> production`
   4. Production deploy with `npx vercel --prod`
   ```
