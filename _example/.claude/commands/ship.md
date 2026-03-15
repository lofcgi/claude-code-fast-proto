---
description: 배포 전 환경변수 확인 + CLI 배포
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, "mcp:context7:*"]
---

project/ 폴더의 앱을 배포하세요.

## 수행 작업

1. **배포 서비스 CLI 확인**
   - `analysis/requirements.json`의 `tech_stack.deploy` 읽기
   - 해당 서비스 CLI 설치 확인:
     - Vercel → `npx vercel --version` 체크
     - Netlify → `npx netlify --version` 체크
     - Cloudflare → `npx wrangler --version` 체크
     - 기타 → "해당 서비스의 CLI를 설치해주세요: [설치 링크]" 안내 후 중단

2. **환경변수 수집**
   - `project/.env.example` 읽기 (implement에서 생성됨)
   - 각 키에 대해 사용자에게 값 요청
   - 입력받은 값으로 `project/.env.local` 생성
   - 배포 서비스에 env vars 설정 (CLI 명령)

3. **배포 전 빌드 확인**
   - `cd project/ && npm run build`
   - 실패 시 수정 후 재시도

4. **CLI 배포 실행**
   - Vercel: `cd project/ && npx vercel --prod`
   - Netlify: `cd project/ && npx netlify deploy --prod`
   - 기타: 해당 CLI 명령

5. **결과 안내**
   - 배포 URL 출력
   - 추가 설정 필요 시 안내 (커스텀 도메인, DNS, OAuth redirect URI 등)
