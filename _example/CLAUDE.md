# AI Agent Pipeline

이 프로젝트는 URL + PRD를 넣으면 AI 에이전트가
프로토타입 → 구현 → 배포까지 수행하는 파이프라인입니다.

## 사용법
1. input/에 URL + 설명 넣기
2. /prototype → 프로토타입 a/b 비교
3. /implement a (또는 b) → 자동으로 build-check + self-review + iterate
4. /ship → 환경변수 설정 + 배포

## 폴더 구조
- input/: 원본 URL/PRD/PDF
- analysis/: 파싱된 요구사항
- prototypes/: UI 프로토타입 2종 (a, b)
- project/: 구현된 앱

## 규칙
- 스킬 실행 시 analysis/의 문서를 항상 참조
- 파일 수정 시 Prettier 포맷 유지
- 커밋은 Conventional Commits 형식

## 디자인 가이드라인 (참고, 강제 아님)
- 색상은 design-tokens.ts 사용 권장
- 비주얼 밀도, 미학, 카피, 컴포넌트는 prototype-references/ 문서 참조
- Spring physics 권장 (linear easing보다)
- 프로토타입에 인터랙티브 기능 페이지 목업 필수
