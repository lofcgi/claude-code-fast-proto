# AI Agent Pipeline

> AI 에이전트가 URL을 읽고, 디자인을 클론하고, 앱을 만들고, 배포합니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-CLI-blueviolet)](https://docs.anthropic.com/en/docs/claude-code)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)

---

## 작동 방식 — 에이전트 오케스트레이션

### 전체 흐름

```
┌──────────────────────────────────────────────────────────────┐
│  input/url.md  ──→  /prototype  ──→  /implement  ──→  /ship │
│                                                              │
│  Phase 1: 탐색 & 기획                                        │
│    Firecrawl 스크래핑 → Vision 분석 → 브랜딩 추출             │
│    → plan.md + analysis/ (PRD, 요구사항, 수락 기준)           │
│                                                              │
│  Phase 2: 생성                                               │
│    섹션별 클론 → 21st-dev 컴포넌트                             │
│    → Unsplash 이미지 → prototypes/a + prototypes/b           │
│                                                              │
│  Phase 3: 검증                                               │
│    Playwright 스크린샷 → Vision 비교 → 수정 루프 (최대 3회)    │
│                                                              │
│  /clear  (컨텍스트 윈도우 리셋)                                │
│                                                              │
│  Phase 4: 구현                                               │
│    프로토타입 → 풀스택 앱 → Ralph Loop                        │
│    (빌드 → 타입체크 → 셀프리뷰 → 수정, 최대 3회)              │
│                                                              │
│  Phase 5: 배포                                               │
│    환경변수 검증 → CLI 배포                                    │
└──────────────────────────────────────────────────────────────┘
```

### 에이전트가 각 단계에서 하는 일

**`/prototype`** — 에이전트가:
1. Firecrawl로 레퍼런스 URL을 스크래핑하여 콘텐츠, 레이아웃, 브랜딩 추출
2. 스크린샷을 캡처하고 Vision으로 시각적 구조 분석
3. Dribbble/Behance/Awwwards에서 디자인 영감 검색
4. Unsplash에서 실제 이미지 확보 (아바타, 히어로, 배경)
5. 레퍼런스를 섹션별로 클론하여 2개의 완전한 UI 프로토타입 생성
6. 자신이 만든 프로토타입의 스크린샷을 찍고 레퍼런스와 비교 (차이 수정 루프, 최대 3회)

**`/implement a`** (또는 `b`) — 에이전트가:
1. `analysis/`와 선택된 프로토타입을 읽어 요구사항 파악
2. 정적 프로토타입을 풀스택 앱으로 변환 (API 라우트, 데이터베이스, 인증)
3. Ralph Loop 실행: 빌드 → 타입체크 → 린트 → 셀프리뷰 → 수정 (최대 3회)
4. 프로덕션 레디 앱을 `project/`에 출력

**`/ship`** — 에이전트가:
1. 모든 필수 환경변수 확인
2. 누락된 자격증명 안내
3. Vercel CLI로 배포

### Ralph Loop: 자기 개선하는 에이전트

```
빌드 → 타입체크 → 린트 ──→ 통과? ──→ 셀프리뷰 ──→ 완료
                             │                      │
                             실패                  문제 발견
                             │                      │
                             └──→ 수정 + 재빌드 ←───┘
                                  (최대 3회)
```

에이전트가 코드를 생성하기만 하는 게 아니라 **자신의 결과물을 스스로 검증하고 수정**합니다.

---

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

### MCP 서버 — 에이전트의 도구 상자

MCP 서버가 `.mcp.json`에 사전 설정되어 있어 `cd kor && claude`만으로 자동 로드됩니다.
API 키가 없는 서버는 자동 비활성화되며 다른 서버에 영향 없습니다.

| MCP 서버 | 에이전트가 이걸로 하는 일 | 설정 |
|----------|------------------------|------|
| **Firecrawl** | 레퍼런스 URL에서 콘텐츠 + 브랜딩 스크래핑 | API 키 ([firecrawl.dev](https://firecrawl.dev)) |
| **Playwright** | 스크린샷, 비주얼 비교, 브라우저 테스트 | 제로 설정 |
| **21st-dev Magic** | 프로덕션 품질 UI 컴포넌트 확보 | API 키 ([21st.dev](https://21st.dev/magic/console), 무료) |
| **Design Inspiration** | 디자인 레퍼런스 사이트 검색 | API 키 ([serper.dev](https://serper.dev)) |
| **Unsplash** | 프로토타입용 실제 이미지 확보 | API 키 ([unsplash.com](https://unsplash.com/developers)) |
| **Context7** | 프레임워크 최신 문서 조회 | 제로 설정 |
| **Sequential Thinking** | 구조화된 다단계 분석 | 제로 설정 |
| **GitHub** | 브랜치/PR 관리 | PAT |
| **Vercel** | MCP를 통한 배포 | OAuth (브라우저 로그인) |
| **v0** | AI 프로토타입 코드 생성 | 제로 설정 |
| **Defuddle Fetch** | 깔끔한 웹 콘텐츠 추출 | 제로 설정 |
| **Lighthouse** | 성능 감사 | 제로 설정 |

상세 설정 가이드: [docs/mcp-guide.md](docs/mcp-guide.md)

<details>
<summary><strong>나중에 필요한 계정 (시작할 때는 불필요)</strong></summary>

아래 계정은 `/implement`와 `/ship` 단계에서만 필요합니다:

| 계정 | 환경 변수 | 필요 시점 |
|------|----------|----------|
| [Google Cloud Console](https://console.cloud.google.com/) → OAuth 자격증명 | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | `/implement` 단계 |
| [Turso](https://turso.tech/) → 데이터베이스 | `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | `/implement` 단계 |
| [Vercel](https://vercel.com/) → 배포 | (Vercel CLI 로그인) | `/ship` 단계 |

</details>

---

## 빠른 시작

```bash
git clone <repo-url> && cd ai-agent-pipeline/kor

# 1. 레퍼런스 URL 추가
echo "https://example.com" > input/url.md

# 2. Claude Code 시작
claude

# 3. 파이프라인 실행
/prototype          # analysis/ + prototypes/a, prototypes/b 생성
# 마음에 드는 프로토타입 선택 후:
/implement a        # project/에 풀스택 앱 구현 (자동 Ralph Loop)
/ship               # 환경변수 확인 + 배포
```

> **전체 소요시간: ~1시간** (프로젝트 복잡도에 따라 다름)

---

## 파이프라인 상세

### Phase 1: 탐색 & 기획 (`/prototype`)

에이전트의 첫 행동:
1. `input/url.md`에서 레퍼런스 URL 읽기
2. **Firecrawl 스크래핑** — 페이지 콘텐츠, 네비게이션 구조, 카피 추출
3. **Playwright 방문** — 풀페이지 스크린샷 캡처
4. **Vision 분석** — 레이아웃 패턴, 색상 팔레트, 타이포그래피 식별
5. **Design Inspiration 검색** — Dribbble/Behance/Awwwards에서 유사 디자인 탐색
6. **Sequential Thinking** — 레퍼런스를 구조화된 계획으로 분해

**결과물:** `analysis/prd.md`, `analysis/requirements.json`, `analysis/acceptance-criteria.md`

### Phase 2: 생성 (`/prototype` 계속)

에이전트가 2개의 프로토타입 생성:
1. **섹션별 클론** — 레퍼런스의 각 섹션을 개별적으로 복제
2. **21st-dev 컴포넌트** — 프로덕션 품질 UI 빌딩 블록 확보
3. **Unsplash 이미지** — 플레이스홀더를 실제 관련 이미지로 교체
4. **Framer Motion** — 적절한 애니메이션 추가 (spring physics 선호)

**결과물:** `prototypes/a/`, `prototypes/b/`

### Phase 3: 검증 (`/prototype` 계속)

에이전트가 자신의 결과물을 검증:
1. **Playwright 스크린샷** — 생성된 프로토타입 캡처
2. **Vision 비교** — 프로토타입 스크린샷을 레퍼런스 스크린샷과 비교
3. **수정 루프** — 차이점을 식별하고 수정 (최대 3회)

### Phase 4: 구현 (`/implement`)

프로토타입을 선택하고 `/clear` 실행 후:
1. `analysis/` 문서와 선택된 프로토타입 읽기
2. 정적 UI를 풀스택으로 변환: API 라우트, DB 스키마, 인증 플로우
3. **Ralph Loop** — 빌드 → 타입체크 → 린트 → 셀프리뷰 → 수정 (최대 3회)
4. **Context7**으로 프레임워크 최신 API 문서 조회

**결과물:** `project/` — 프로덕션 레디 풀스택 앱

### Phase 5: 배포 (`/ship`)

1. 모든 필수 환경변수 검증
2. 누락된 자격증명 안내
3. Vercel CLI로 배포

---

## 에이전트 커스터마이징

### 나만의 스킬 추가

`.claude/commands/`에 마크다운 파일을 생성하세요:

```markdown
---
description: 이 스킬이 하는 일 (/help에 표시됨)
---

프롬프트 엔지니어링 내용. 사용자가 /스킬이름을 실행하면
에이전트가 이 지시사항을 따릅니다.
```

파일명이 슬래시 커맨드가 됩니다: `my-skill.md` → `/my-skill`.

### 기존 스킬 수정

`prototype.md` 파일 (349줄)이 전체 프로토타입 생성을 제어합니다. 주요 섹션:

| 섹션 | 제어하는 것 |
|------|-----------|
| Phase 1: Explore | URL 분석, 브랜딩 추출, MCP 도구 사용 |
| Phase 2: Generate | 섹션 클론 전략, 컴포넌트 소싱, 이미지 매핑 |
| Phase 3: Verify | 스크린샷 비교, 수정 루프 반복 횟수 |
| Quality gates | 에이전트가 강제하는 품질 기준 |

### MCP 서버 추가

`.mcp.json`을 편집하여 새 서버를 추가하세요:

```json
{
  "mcpServers": {
    "your-server": {
      "command": "npx",
      "args": ["-y", "your-mcp-package"]
    }
  }
}
```

그런 다음 스킬의 `allowed-tools` 프론트매터에서 서버를 참조하세요.

---

## 디렉토리 구조

```
kor/
├── input/              # URL + PRD/PDF를 넣는 곳
├── analysis/           # /prototype에서 자동 생성
├── prototypes/         # /prototype에서 자동 생성 (a/, b/)
├── templates/          # project/ 디렉토리 스타터 템플릿
├── project/            # /implement에서 자동 생성
├── .claude/commands/   # 에이전트 스킬 프롬프트 ("프로그램")
├── .mcp.json           # MCP 서버 설정
└── docs/
    └── mcp-guide.md    # 상세 MCP 설정 가이드
```

<details>
<summary><strong>각 단계별 생성 파일</strong></summary>

| 단계 | 생성되는 파일 |
|------|-------------|
| `/prototype` | `analysis/prd.md`, `analysis/requirements.json`, `analysis/acceptance-criteria.md`, `prototypes/a/`, `prototypes/b/` |
| `/implement a` | `project/` — 선택한 프로토타입 기반 풀스택 앱 |
| `/ship` | 배포 URL + 환경변수 설정 |

</details>

---

## 문제 해결

<details>
<summary><strong>자주 발생하는 문제와 해결 방법</strong></summary>

| 문제 | 해결 |
|------|------|
| "input/ 폴더에 url.md를 추가해주세요" | `input/url.md`에 레퍼런스 URL을 추가하세요 |
| MCP 연결 실패 | `kor/` 안에서 `claude`를 실행했는지 확인 — [docs/mcp-guide.md](docs/mcp-guide.md) 참고 |
| `/implement`에서 env var 누락 오류 | 계정 생성 후 환경 변수 설정 — "시작하기 전에" 참고 |
| `npm run build` 실패 | Ralph Loop이 자동으로 수정을 시도합니다 (최대 3회) |
| 포트 충돌 (address in use) | `lsof -ti:3000 \| xargs kill`로 포트 해제 |
| Vercel 배포 실패 | `npx vercel login`을 먼저 실행하세요 |

</details>

## 라이선스

MIT
