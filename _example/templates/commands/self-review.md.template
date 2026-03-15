---
description: 수용 기준 대비 셀프 리뷰
allowed-tools: [Read, Bash, Glob, Grep, "mcp:playwright:*"]
---

../analysis/acceptance-criteria.md를 읽고 각 수용 기준을 검증하세요.

## 수행 작업

각 AC 항목에 대해:
1. 해당 기능의 코드가 존재하는지 확인 (Grep, Glob 사용)
2. 올바르게 구현되었는지 코드 리뷰 (Read로 관련 파일 확인)
3. 통과/미통과 판정

## Playwright 기능 검증 (MCP 사용 가능 시)

Playwright MCP가 사용 가능하면 브라우저 테스트를 추가로 수행:

1. dev 서버 시작: `PORT=3000 npm run dev &` (3초 대기)
2. 각 AC 항목에 대해 가능한 범위에서 브라우저 테스트:
   - 예: "로그인 페이지가 존재하는가" → `browser_navigate(/login)` → 스크린샷
   - 예: "CRUD가 동작하는가" → 페이지 로드 + UI 요소 존재 확인
   - 예: "네비게이션이 작동하는가" → 링크 클릭 → 페이지 전환 확인
3. dev 서버 종료: `lsof -ti:300N | xargs kill 2>/dev/null`

Playwright MCP 불가 시: 코드 리뷰만으로 검증.

## 결과 처리
- 미통과 항목이 있으면 목록을 만들어 /iterate에 전달하세요.
- /iterate는 최대 3회까지 실행합니다.
- 3회 후에도 미통과 항목이 있으면, 남은 이슈 목록을 출력하고
  "수동 수정이 필요합니다"라고 안내 후 종료합니다.
- 모든 항목 통과 시 "구현 완료" 메시지를 출력하세요.

## 체크 형식
```
- [x] AC-001: [설명] — PASS
- [ ] AC-002: [설명] — FAIL: [이유]
```
