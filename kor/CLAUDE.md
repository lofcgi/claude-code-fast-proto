# AI Agent Pipeline

이 프로젝트는 PRD/PDF를 넣으면 AI 에이전트가 Best-of-3로
풀스택 앱을 병렬 구현하는 파이프라인입니다.

## 사용법
1. input/에 PDF/PRD 넣기
2. /analyze → /prototype → /setup-versions
3. 3개 터미널에서 각각 /implement
4. /evaluate → /select-winner
5. project/에서 /polish → /ship

## 폴더 구조
- input/: 원본 PRD/PDF
- analysis/: 파싱된 요구사항
- prototypes/: UI 프로토타입 3종
- versions/: 3개 병렬 구현 버전
- evaluation/: 평가 결과
- project/: 최종 선택 버전

## 규칙
- 스킬 실행 시 analysis/의 문서를 항상 참조
- 파일 수정 시 Prettier 포맷 유지
- 커밋은 Conventional Commits 형식
