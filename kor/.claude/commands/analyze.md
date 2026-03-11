---
description: PRD/PDF를 분석하여 구조화된 요구사항 생성
allowed-tools: [Read, Bash, Write, Edit, Glob, Grep, "mcp:sequential-thinking:*", "mcp:firecrawl:*", "mcp:context7:*"]
---

input/ 폴더에 있는 PDF 또는 마크다운 파일을 분석하세요.

## 사전 체크 (먼저 수행)

1. input/ 폴더에 PDF 또는 마크다운 파일이 있는지 확인
   → 없으면 "input/ 폴더에 PRD 파일을 넣어주세요" 안내 후 중단

2. MCP 연결 상태 확인 후 요약 출력:
   | MCP 서버 | 상태 | 없을 때 영향 |
   |----------|------|-------------|
   | Sequential Thinking | ✅/❌ | PRD 분석이 단순해짐 |
   | Firecrawl | ✅/❌ | 경쟁 리서치 스킵됨 |
   | Context7 | ✅/❌ | 최신 문서 참조 불가 |

3. 이후 파이프라인 환경변수 안내:
   - analyze → prototype → setup-versions: 추가 설정 불필요
   - /implement부터: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
   - /ship: Vercel 로그인, AUTH_SECRET
   - "지금 준비하지 않아도 됩니다. 해당 단계에서 다시 안내합니다."
   - 단, PRD에 명시된 기술 스택이 기본값(Google OAuth + Turso)과 다르면,
     해당 기술에 맞는 환경변수로 안내를 조정

4. 계속 진행할지 사용자에게 확인

## 수행 작업

1. **Sequential Thinking으로 PRD 분석** (MCP 사용 가능 시):
   - Sequential Thinking 도구를 사용하여 PRD를 단계별로 분석
   - 복잡한 요구사항을 체계적으로 분해
   → MCP 불가 시: 일반 분석으로 대체. 동일한 결과물을 직접 생성.

2. **Firecrawl로 경쟁 리서치** (MCP 사용 가능 시):
   - PRD에 언급된 경쟁 제품이나 참고 서비스가 있으면 Firecrawl로 크롤링
   - 기술 스택, UI 패턴, 기능 구성을 분석하여 analysis/에 반영
   → MCP 불가 시: 이 단계를 스킵하고 다음으로 진행. 사용자에게 "Firecrawl 미연결로 경쟁 리서치를 건너뜁니다" 안내.

3. input/ 폴더의 모든 파일을 읽기
4. 다음 파일들을 analysis/ 폴더에 생성:

### analysis/prd.md
원본 문서를 구조화된 PRD로 변환:
- 프로젝트 개요
- 기능 요구사항 (FR-001, FR-002... 형식)
- 비기능 요구사항 (NFR-001... 형식)
- 기술 스택 요구사항
- 제약사항 (API 제한, 배포 환경 등)

### analysis/requirements.json
머신 리더블 JSON:
```json
{
  "project_name": "",
  "tech_stack": {
    "framework": "Next.js 15 (App Router)",
    "db": "",
    "auth": "Auth.js v5 + Google OAuth",
    "ui": "shadcn/ui + Tailwind CSS",
    "deploy": "Vercel",
    "apis": []
  },
  "features": [{ "id": "FR-001", "title": "", "priority": "must|should|could" }],
  "constraints": [{ "type": "", "description": "", "impact": "" }]
}
```

> **기본 스택 힌트**: PRD에 특정 기술이 명시되지 않은 경우, 아래를 기본값으로 사용:
> - Framework: **Next.js 15** (App Router, TypeScript, Tailwind CSS)
> - Auth: **Auth.js v5 + Google OAuth**
> - DB: **Turso (libSQL)** + Drizzle ORM (또는 PRD에 맞는 DB)
> - UI: **shadcn/ui** + Lucide Icons
> - Deploy: **Vercel**
>
> PRD에 다른 기술이 명시되어 있으면 그것을 우선 사용할 것.

### analysis/acceptance-criteria.md
각 기능별 수용 기준 (Given/When/Then 형식):
- [ ] AC-001: Given [조건], When [행동], Then [결과]

### analysis/tech-constraints.md
기술 제약사항 상세 분석 (API 무료 티어 한계, 배포 환경 제한 등)

### analysis/evaluation-matrix.md
평가 기준 매트릭스:
| 항목 | 배점 | 체크리스트 |

카테고리:
- 기능 완성도 (40점): 모든 FR 구현 여부
- 코드 품질 (20점): TypeScript strict, 에러 핸들링, 구조
- UI/UX (20점): 반응형, 다크모드, 로딩/에러 상태
- 배포 가능성 (10점): 빌드 성공, 환경 변수 분리
- 보안 (10점): API 키 보호, 입력 검증

4-1. 생성된 파일 검증:
   - requirements.json이 유효한 JSON인지 확인
   - 모든 feature에 id, title, priority 필드가 있는지 확인
   - evaluation-matrix.md의 배점 합계가 100점인지 확인
   - acceptance-criteria.md에 최소 1개 이상의 AC가 있는지 확인
   → 문제 발견 시 자동 수정

5. 모든 파일 생성 완료 후 요약 출력
