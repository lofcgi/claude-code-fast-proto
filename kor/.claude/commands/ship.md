---
description: 프로젝트 배포 및 문서 생성
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, "mcp:vercel:*", "mcp:github:*", "mcp:context7:*"]
---

project/ 폴더의 앱을 배포하고 문서를 생성하세요.

## 사전 체크

1. Vercel CLI 로그인 확인: npx vercel whoami
   → 실패 시 "npx vercel login 실행 후 다시 시도하세요" 안내 후 중단
2. 필요한 환경변수 확인:
   - AUTH_SECRET (없으면 npx auth secret으로 생성 가능 안내)
   - AUTH_URL (배포 후 설정 가능 안내)
   - DB 관련 변수 (이미 /implement에서 설정되었을 것)
3. GITHUB_TOKEN 확인 (PR 생성 시 필요)

## 수행 작업

1. project/ 내에서:
   a. `.env.example` 생성/업데이트 (필요한 환경 변수 목록, 값은 비워두기):
   ```
   AUTH_SECRET=
   AUTH_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   TURSO_DATABASE_URL=
   TURSO_AUTH_TOKEN=
   ```
   - 코드에서 `process.env`를 grep하여 누락된 키가 없는지 확인

   b. `.gitignore`에 `.env.local`, `.env`, `node_modules` 포함 확인

2. project/README.md 생성:
   - 서비스 소개 및 주요 기능
   - 기술 스택
   - 로컬 실행 방법 (git clone → npm install → 환경변수 설정 → npm run dev)
   - 배포 서비스 URL (사용자가 나중에 채움: `[배포 URL]`)
   - 코딩 에이전트 활용 방법 및 노하우
   - Mermaid 아키텍처 다이어그램

3. Vercel 배포:
   a. **Vercel MCP가 사용 가능하면 MCP로 배포**, 아니면 CLI 사용:
   ```bash
   # MCP 사용 불가 시 CLI 폴백:
   cd project
   npx vercel --yes
   ```
   b. 환경 변수 설정 안내:
   ```
   # .env.example의 각 키에 대해:
   npx vercel env add AUTH_SECRET production
   npx vercel env add GOOGLE_CLIENT_ID production
   npx vercel env add GOOGLE_CLIENT_SECRET production
   npx vercel env add AUTH_URL production     # 배포된 URL로 설정
   npx vercel env add TURSO_DATABASE_URL production
   npx vercel env add TURSO_AUTH_TOKEN production
   ```
   c. 환경 변수 설정 후 재배포:
   ```bash
   npx vercel --prod
   ```
   d. Google Cloud Console에서 OAuth redirect URI 업데이트 안내:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```

4. 루트 README.md 업데이트

5. DEVLOG.md 최종 정리

6. 배포 완료 후 안내:
   ```
   배포가 완료되었습니다.

   남은 작업:
   1. Vercel 대시보드에서 환경 변수 확인: https://vercel.com/dashboard
   2. Google Cloud Console에서 OAuth redirect URI 추가
   3. `npx vercel env add <KEY> production` 으로 환경 변수 설정
   4. `npx vercel --prod` 로 프로덕션 배포
   ```
