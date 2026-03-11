---
description: 평가 매트릭스 기준으로 3개 버전 모두 채점
allowed-tools: [Read, Bash, Glob, Grep, Write, "mcp:playwright:*", "mcp:context7:*"]
---

versions/v1, v2, v3를 analysis/evaluation-matrix.md 기준으로 평가하세요.

## 수행 작업

1. analysis/evaluation-matrix.md 읽기

2. 각 버전(v1, v2, v3)에 대해:

   a. 코드 존재 확인 (src/ 폴더 확인)
   b. 빌드 테스트: cd versions/vN && npm run build
   c. 타입 체크: npx tsc --noEmit
   d. 기능 체크리스트 (코드 분석으로):
      - analysis/acceptance-criteria.md의 각 AC 항목
      - 해당 기능의 코드가 존재하는지 Grep으로 확인
   e. 코드 품질:
      - TypeScript strict 모드 여부
      - 에러 핸들링 패턴
      - 컴포넌트 구조
      - API 보안 (env 변수 노출 없음)
   f. UI 완성도:
      - 반응형 클래스 존재 여부
      - 다크 모드 지원 여부
      - 로딩 상태 처리 여부
   g. **Playwright 브라우저 테스트** (MCP 사용 가능 시):
      - 각 버전을 dev 서버로 실행 (`npm run dev`)
      - Playwright MCP로 메인 페이지 스크린샷 캡처
      - 주요 링크/버튼 클릭 테스트 수행
      - 테스트 결과와 스크린샷을 evaluation/에 저장
      - dev 서버 종료

3. 각 버전별 점수 카드를 evaluation/vN-score.md에 기록:
   ```
   | 항목 | 점수(0-100) | 근거 |
   ```

4. evaluation/comparison.md에 종합 비교:
   ```
   | 항목 | V1 | V2 | V3 |
   ```
   - 총점
   - 추천 버전 + 이유
   - 각 버전의 장점 (머지 가능한 부분)
