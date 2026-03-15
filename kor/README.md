# AI Agent Pipeline

> URL + PRD를 넣으면 AI 에이전트가 프로토타입 → 구현 → 배포까지 수행하는 파이프라인입니다.

## 왜 만들었나

AI 코딩 에이전트에 Ralph Loop(build-check → self-review → iterate)를 적용하면 별도 polish나 병렬 샘플링 없이도 높은 품질의 결과물을 얻을 수 있습니다. 이 템플릿은 그 개념을 실제 파이프라인으로 구현합니다: **URL 하나 넣으면, 프로토타입 2개 나오고, 선택한 것이 풀스택 앱으로 구현됩니다.**

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
<summary><strong>MCP 서버 설정 (선택, 프로토타입 품질 향상)</strong></summary>

| MCP 서버 | 설정 | 비고 |
|----------|------|------|
| 21st-dev Magic | [21st.dev/magic/console](https://21st.dev/magic/console)에서 API 키 발급 | 베타, 무료 |
| Design Inspiration | [Serper API 키](https://serper.dev) | 디자인 레퍼런스 검색 (npx, 자동 설정) |
| Firecrawl | [firecrawl.dev](https://firecrawl.dev) API 키 | URL 스크래핑 + 브랜딩 추출 |
| GitHub | GitHub PAT | MCP를 통한 브랜치/PR 관리 |

</details>

## input/에 무엇을 넣나요

`input/` 폴더에 **레퍼런스 URL**과 선택적으로 **PRD/PDF**를 넣으세요.

- `input/url.md` — 한 줄에 URL 하나씩 (첫 번째 = 메인 레퍼런스)
- `input/*.pdf` 또는 `input/prd.md` — 프로젝트 설명 (선택)

> **기본 기술 스택** (PRD에 미지정 시): Next.js 15, Auth.js v5, Turso (SQLite), shadcn/ui, Tailwind CSS, Vercel

## 파이프라인 흐름

> **전체 소요시간: ~1시간** (PRD 복잡도에 따라 다름)

```
1. git clone ai-agent-pipeline && cd ai-agent-pipeline/kor
2. input/에 URL + 설명 넣기
3. claude                          # Claude Code 시작
4. /prototype                      # 프로토타입 a/b 생성 + analysis/ 생성
5. 마음에 드는 프로토타입 선택
6. /implement a (또는 b)            # project/에 풀스택 구현
   └→ build-check → self-review → iterate (자동 체인, 최대 3회)
7. /ship                           # 환경변수 확인 + CLI 배포
8. /promote velog                  # 홍보 콘텐츠 생성 (선택)
```

## 디렉토리 구조

```
kor/
├── input/              # URL + PRD/PDF를 넣는 곳
├── analysis/           # /prototype에서 자동 생성
├── prototypes/         # /prototype에서 자동 생성 (a/, b/)
├── templates/          # project/ 디렉토리 템플릿 (기본 포함)
├── project/            # /implement에서 자동 생성
└── .claude/commands/   # 파이프라인 오케스트레이션 스킬 (기본 포함)
```

<details>
<summary><strong>각 단계별 생성 파일 (클릭하여 펼치기)</strong></summary>

| 단계 | 생성되는 파일 |
|------|-------------|
| `/prototype` | `analysis/prd.md`, `analysis/requirements.json`, `analysis/acceptance-criteria.md`, `prototypes/a/`, `prototypes/b/` |
| `/implement a` | `project/` — 선택한 프로토타입 기반 풀스택 앱 |
| `/ship` | 배포 URL + 환경변수 설정 |

</details>

## 사용 가능한 스킬

| 스킬 | 설명 |
|------|------|
| `/prototype` | URL 기반 UI 프로토타입 2종 생성 + analysis/ 생성 |
| `/implement <a\|b>` | 선택한 프로토타입 기반 풀스택 앱 구현 (자동 Ralph Loop) |
| `/ship` | 환경변수 확인 + CLI 배포 |
| `/promote <플랫폼>` | 홍보 콘텐츠 생성 (velog, devto, reddit, twitter, geek, hn) |
| `/devlog` | 개발 로그 자동 기록 |

## MCP 서버

MCP 서버가 `.mcp.json`에 포함되어 있어, `cd kor && claude` 만으로 자동 로드됩니다.

| MCP 서버 | 용도 | 설정 |
|----------|------|------|
| Sequential Thinking | 구조화된 분석 | 제로 설정 |
| Playwright | 브라우저 자동 테스트 | 제로 설정 |
| Context7 | 최신 문서 참조 | API 키 (무료) |
| Firecrawl | URL 스크래핑 + 브랜딩 추출 | API 키 |
| GitHub | 브랜치/PR 관리 | PAT |
| 21st-dev Magic | UI 컴포넌트 영감 + 생성 | API 키 (21st.dev, 베타 무료) |
| Design Inspiration | Dribbble/Behance/Awwwards 레퍼런스 검색 | API 키 (Serper) |
| Unsplash | 이미지 확보 | API 키 |

API 키 설정 및 상세 안내: [docs/mcp-guide.md](docs/mcp-guide.md)

## 작동 원리

1. **프로토타입**: URL을 Firecrawl로 분석하고, 브랜딩/레이아웃을 추출하여 2가지 UI 프로토타입을 생성합니다
2. **구현**: 선택한 프로토타입을 기반으로 풀스택 앱을 project/에 구현합니다
3. **Ralph Loop**: build-check → self-review → iterate를 자동으로 최대 3회 반복하여 품질을 높입니다
4. **배포**: 환경변수를 수집하고 CLI로 배포합니다

## 문제 해결

<details>
<summary><strong>자주 발생하는 문제와 해결 방법 (클릭하여 펼치기)</strong></summary>

| 문제 | 해결 |
|------|------|
| "input/ 폴더에 url.md를 추가해주세요" | `input/url.md`에 레퍼런스 URL을 추가하세요 |
| MCP 연결 실패 | `kor/` 안에서 `claude`를 실행했는지 확인 — [docs/mcp-guide.md](docs/mcp-guide.md) 참고 |
| `/implement`에서 env var 누락 오류 | 계정 생성 후 환경 변수 설정 — 위의 "시작하기 전에" 참고 |
| `npm run build` 실패 | Ralph Loop이 자동으로 수정을 시도합니다 |
| 포트 충돌 (address in use) | `lsof -ti:3000 \| xargs kill`로 포트 해제 |
| Vercel 배포 실패 | `npx vercel login`을 먼저 실행하세요 |

</details>

## 라이선스

MIT
