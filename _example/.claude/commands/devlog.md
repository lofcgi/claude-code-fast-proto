---
description: 최근 변경사항으로 개발 로그 자동 기록
allowed-tools: [Read, Bash, Edit, Glob, Grep]
---

최근 git 변경사항을 분석하여 DEVLOG.md에 새 세션 기록을 추가하세요.

## 수행 작업

1. git log --oneline -20 으로 최근 커밋 확인
2. git diff --stat HEAD~5 으로 변경 범위 확인
3. DEVLOG.md 끝에 새 세션 추가:

```markdown
## Session #N — [날짜]

**Goal**: [커밋 메시지에서 추론]
**Changes**: [주요 파일/기능 변경사항]
**Agent usage**: [Co-Authored-By 커밋 비율]
**Next**: [미완료 항목]
```

4. 세션 번호는 기존 DEVLOG.md의 마지막 세션 번호 + 1
5. 날짜는 오늘 날짜 사용
