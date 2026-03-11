---
description: 최적 버전을 project/ 디렉토리에 복사
allowed-tools: [Read, Bash, Write, Glob]
---

evaluation/comparison.md를 읽고 최적 버전을 project/에 복사하세요.

## 인자
$ARGUMENTS = 선택할 버전 번호 (1, 2, or 3). 비어있으면 comparison.md의 추천 사용.

## 수행 작업

1. evaluation/comparison.md 읽기
2. 버전 결정 ($ARGUMENTS 또는 추천 버전)
3. versions/vN/ 내용을 project/로 복사 (CLAUDE.md, .claude/ 제외)
4. project/용 CLAUDE.md 생성 (폴리시 단계 컨텍스트):
   - 프로젝트 개요
   - 현재 상태: "Best-of-3 평가를 통해 선택된 버전"
   - 남은 작업: UI/UX 폴리시, 코드 리뷰, 최종 정리

5. project/CLAUDE.md에 analysis/ 파일 경로를 정확한 상대경로로 기록:
   - 예: ../analysis/prd.md (project/에서 한 단계 위가 루트)

6. templates/commands/에서 polish.md.template, review.md.template, finalize.md.template를 읽어서
   project/.claude/commands/에 polish.md, review.md, finalize.md로 복사

7. 안내: "cd project && claude → /polish 또는 /review"
