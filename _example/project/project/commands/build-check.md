---
description: 빌드 및 타입 검사 실행, 에러 수정
allowed-tools: [Read, Edit, Bash, Glob, Grep, "mcp:playwright:*"]
---

빌드와 타입 검증을 수행하세요.

## 수행 작업

1. `.env.example` 존재 확인
   - 없으면 코드에서 `process.env`를 검색하여 `.env.example` 자동 생성
   - 이미 있으면 누락된 키가 없는지 확인

2. ESLint 체크
   ```bash
   npx next lint
   ```
   - 에러가 있으면 수정 (warning은 무시 가능)
   - `eslint.config.mjs` 또는 `.eslintrc.json`이 없으면 기본 설정으로 진행

3. npm run build 실행
   - 에러가 있으면 수정
   - 수정 후 다시 빌드

4. npx tsc --noEmit 으로 타입 체크
   - 타입 에러가 있으면 수정

5. 모든 에러 해결 후 빌드 성공 확인

6. Playwright 스모크 테스트 (MCP 사용 가능 시):
   - dev 서버 시작: `PORT=3000 npm run dev &` (3초 대기)
   - `browser_navigate` → `http://localhost:300N`
   - 메인 페이지 로드 확인 (콘솔 에러 없음)
   - `browser_take_screenshot` → 참고용 확인
   - dev 서버 종료: `lsof -ti:300N | xargs kill 2>/dev/null`
   - 실패 시: 에러 내용 기록 + 수정 시도
   - Playwright MCP 불가 시: 이 단계 스킵

7. 빌드 성공 시 /self-review 실행
