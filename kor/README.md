# AI Agent Pipeline

> 오픈소스 Best-of-N 병렬 구현 파이프라인. AI 코딩 에이전트로 구동됩니다.

PRD/PDF를 넣고 Claude Code 스킬을 실행하면, 3개의 경쟁 풀스택 구현체가 평가되어 하나의 완성된 프로덕트로 합쳐집니다.

## 왜 만들었나

Best-of-N 샘플링은 AI 연구에서 출력 품질을 높이는 검증된 기법이지만, 실용적인 개발자 도구는 존재하지 않았습니다. 지금까지는.

이 템플릿은 그 개념을 실제 파이프라인으로 구현합니다: **PRD 하나 넣으면, 구현체 3개 나오고, 최고가 선택됩니다.**

## 시작하기 전에

### 필수 소프트웨어

```bash
# 1. Claude Code CLI 설치
npm i -g @anthropic-ai/claude-code

# 2. Node.js 18+ 확인
node -v   # v18.x 이상이어야 합니다

# 3. Git 확인
git --version
```

<details>
<summary><strong>나중에 필요한 계정 (시작할 때는 불필요)</strong></summary>

아래 계정은 `/implement`와 `/ship` 단계에서만 필요합니다 — 없어도 파이프라인을 시작할 수 있습니다:

| 계정 | 환경 변수 | 필요 시점 |
|------|----------|----------|
| [Google Cloud Console](https://console.cloud.google.com/) → OAuth 자격증명 | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | `/implement` 단계 |
| [Turso](https://turso.tech/) → 데이터베이스 | `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | `/implement` 단계 |
| [Vercel](https://vercel.com/) → 배포 | (Vercel CLI 로그인) | `/ship` 단계 |

</details>

<details>
<summary><strong>선택 API 키 (분석 품질 향상용, 필수 아님)</strong></summary>

| 키 | 용도 |
|----|------|
| Firecrawl API 키 | `/analyze` 시 웹 리서치 품질 향상 |
| GitHub PAT | MCP를 통한 브랜치/PR 관리 |

</details>

## input/에 무엇을 넣나요

`input/` 폴더에 PRD(제품 요구사항 문서)를 **PDF** 또는 **Markdown** 파일로 넣으세요. 파이프라인에 필요한 유일한 입력입니다.

<details>
<summary><strong>PRD 구조 예시 (클릭하여 펼치기)</strong></summary>

```markdown
# 앱 이름 — 한 줄 설명
## 개요 — 앱이 하는 일
## 대상 사용자 — 누구를 위한 앱인지
## 핵심 기능 — 번호가 매겨진 기능 목록과 세부사항
## 비기능 요구사항 — 성능, 반응형 디자인 등
## 범위 밖 — 하지 않는 것
```

바로 `/analyze`를 실행할 수 있는 완전한 샘플은 [`input/example-prd.md`](input/example-prd.md)를 참고하세요.

</details>

> **기본 기술 스택** (PRD에 미지정 시): Next.js 15, Auth.js v5, Turso (SQLite), shadcn/ui, Tailwind CSS, Vercel

## 파이프라인 흐름

> **전체 소요시간: ~1~2시간** (PRD 복잡도에 따라 다름)

```
1. git clone ai-agent-pipeline && cd ai-agent-pipeline/kor
2. input/에 PDF/PRD 넣기
3. claude                                          # Claude Code 시작
4. /analyze          → PRD 파싱 + 구조화                (~5분)
5. /prototype        → 3가지 UI 프로토타입 생성           (~10분)
6. 마음에 드는 프로토타입 선택
7. /setup-versions   → 3개 버전 디렉토리 생성             (~5분)
8. 터미널 3개 열기 → 각각 /implement                     (~30~60분)
9. /evaluate         → 3개 버전 평가                      (~10분)
10. /select-winner   → 최적 버전을 project/로 복사         (~3분)
11. cd project && claude → /polish                       (~15분)
12. /ship            → 배포 + 문서 생성                    (~10분)
13. /promote velog   → 홍보 콘텐츠 생성                    (~5분)
```

<details>
<summary><strong>3개 병렬 구현 실행하기 (8단계 상세)</strong></summary>

터미널 창/탭을 3개 따로 여세요:

```
┌──────────────────┬──────────────────┬──────────────────┐
│   터미널 1       │   터미널 2       │   터미널 3       │
│                  │                  │                  │
│ cd versions/v1   │ cd versions/v2   │ cd versions/v3   │
│ claude           │ claude           │ claude           │
│ /implement       │ /implement       │ /implement       │
│                  │                  │                  │
│ ⏳ 빌드 중...    │ ⏳ 빌드 중...    │ ⏳ 빌드 중...    │
└──────────────────┴──────────────────┴──────────────────┘
```

- **각 버전은 독립된 Claude Code 세션이 필요합니다** — 하나의 터미널에서 모두 실행할 수 없습니다.
- 3개 모두 "Implementation Complete"가 뜰 때까지 기다린 후 `/evaluate`를 실행하세요.
- 하나가 실패하면 해당 터미널에서 `/implement`를 다시 실행하면 됩니다 (다른 버전에 영향 없음).

</details>

## 프로토타입 선택 가이드

<details>
<summary><strong>어떤 프로토타입을 고를까? (클릭하여 펼치기)</strong></summary>

| 프로토타입 | 적합한 프로젝트 | 예시 |
|-----------|---------------|------|
| **A (미니멀)** | 심플한 도구, 랜딩페이지, 단일 기능 앱 | 계산기, 타이머, 포트폴리오 사이트 |
| **B (대시보드)** | 데이터 중심 앱, SaaS, 관리자 패널 | 작업 관리자, 분석 대시보드, CRM |
| **C (스튜디오)** | 미디어/크리에이티브 도구, 풍부한 인터랙티브 UI | 이미지 에디터, 음악 플레이어, 디자인 도구 |

> **고민되면 B를 선택하세요** — 가장 범용적이고, 대부분의 프로젝트에 잘 맞습니다.

</details>

## 디렉토리 구조

```
kor/
├── input/              # PRD/PDF를 넣는 곳 (/analyze 전에 직접 배치)
├── analysis/           # /analyze 후 자동 생성
├── prototypes/         # /prototype 후 자동 생성
├── templates/          # 버전 디렉토리 템플릿 (기본 포함)
├── versions/           # /setup-versions 후 자동 생성
│   ├── v1/
│   ├── v2/
│   └── v3/
├── evaluation/         # /evaluate 후 자동 생성
├── project/            # /select-winner 후 자동 생성
└── .claude/commands/   # 파이프라인 오케스트레이션 스킬 (기본 포함)
```

<details>
<summary><strong>각 단계별 생성 파일 (클릭하여 펼치기)</strong></summary>

| 단계 | 생성되는 파일 |
|------|-------------|
| `/analyze` | `analysis/prd.md`, `analysis/requirements.json`, `analysis/acceptance-criteria.md`, `analysis/evaluation-matrix.md` |
| `/prototype` | `prototypes/interface-{a,b,c}/` — 각각 `page.tsx`, `components/` 포함 |
| `/setup-versions` | `versions/v1/`, `versions/v2/`, `versions/v3/` — 스캐폴딩된 Next.js 프로젝트 |
| `/implement` | 각 버전 디렉토리 내부에 전체 구현 |
| `/evaluate` | `evaluation/v1-score.md`, `evaluation/v2-score.md`, `evaluation/v3-score.md`, `evaluation/comparison.md` |
| `/select-winner` | `project/` — 우승 버전이 여기로 복사됨 |

</details>

## 사용 가능한 스킬

| 스킬 | 설명 |
|------|------|
| `/analyze` | PRD/PDF 파싱 및 구조화된 요구사항 생성 |
| `/prototype` | 3가지 UI 프로토타입 인터페이스 생성 |
| `/setup-versions` | 병렬 구현을 위한 3개 버전 디렉토리 생성 |
| `/evaluate` | 평가 매트릭스 기준으로 모든 버전 채점 |
| `/select-winner` | 최적 버전을 project/로 복사 |
| `/ship` | 배포 및 문서 생성 |
| `/promote <플랫폼>` | 홍보 콘텐츠 생성 (velog, devto, reddit, twitter, geek, hn) |
| `/devlog` | 개발 로그 자동 기록 |

## MCP 서버

7개의 MCP 서버가 `.mcp.json`에 포함되어 있어, `cd kor && claude` 만으로 자동 로드됩니다.

| MCP 서버 | 용도 | 설정 |
|----------|------|------|
| Sequential Thinking | PRD 단계별 분석 | 제로 설정 |
| Playwright | 브라우저 자동 테스트 | 제로 설정 |
| Vercel | MCP 배포 | OAuth |
| Supabase | DB 관리 | OAuth |
| Context7 | 최신 문서 참조 | API 키 (무료) |
| Firecrawl | 웹 크롤링/리서치 | API 키 |
| GitHub | 브랜치/PR 관리 | PAT |

API 키 설정 및 상세 안내: [docs/mcp-guide.md](docs/mcp-guide.md)

## 작동 원리

1. **분석**: PRD/PDF가 구조화된 요구사항으로 파싱됩니다 (기능, 수용 기준, 기술 제약, 평가 매트릭스)
2. **프로토타입**: 3가지 UI 접근법이 생성됩니다 (미니멀, 대시보드, 스튜디오)
3. **병렬 빌드**: 각 버전이 독립된 디렉토리에서 구현 스킬과 함께 별도 터미널에서 실행됩니다
4. **평가**: 모든 버전이 기능 완성도, 코드 품질, UI/UX, 배포 가능성, 보안 기준으로 채점됩니다
5. **폴리시**: 선택된 버전에 UI/UX 개선과 시니어 코드 리뷰가 진행됩니다
6. **배포**: 문서, 배포 가이드, 홍보 콘텐츠가 생성됩니다

## 문제 해결

<details>
<summary><strong>자주 발생하는 문제와 해결 방법 (클릭하여 펼치기)</strong></summary>

| 문제 | 해결 |
|------|------|
| "no files in input/" | `input/`에 `.pdf` 또는 `.md` 파일을 직접 배치하세요 |
| MCP 연결 실패 | `kor/` 안에서 `claude`를 실행했는지 확인 — [docs/mcp-guide.md](docs/mcp-guide.md) 참고 |
| `/implement`에서 env var 누락 오류 | 계정 생성 후 환경 변수 설정 — 위의 "시작하기 전에" 참고 |
| `npm run build` 실패 | `/evaluate`가 실패한 빌드를 0점 처리합니다 — 최소 1개는 보통 성공합니다 |
| 3개 전부 빌드 실패 | 환경 변수를 확인하고, 해당 터미널에서 `/implement`를 다시 실행하세요 |
| 포트 충돌 (address in use) | `lsof -ti:3001 \| xargs kill`로 포트 해제 |
| Vercel 배포 실패 | `npx vercel login`을 먼저 실행하세요 |

</details>

## 라이선스

MIT
