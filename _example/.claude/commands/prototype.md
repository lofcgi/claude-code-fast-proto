---
description: URL 기반 프로토타입 생성 — Firecrawl(브랜딩 추출) + Claude Code(섹션별 클론) + Playwright(스크린샷 디프 루프)
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, Agent, "mcp:firecrawl:*", "mcp:context7:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*", "mcp:unsplash:*", "mcp:sequential-thinking:*"]
---

`input/` 폴더에서 자동으로 입력을 수집하여 UI 프로토타입을 생성하세요.

## 핵심 원칙

1. **레퍼런스 우선** — 레퍼런스 URL의 스타일이 reference docs의 smart defaults와 다르면, 레퍼런스를 따른다
2. **분위기를 캡처하라** — 색상/레이아웃의 px 단위 복제가 아니라, 레퍼런스의 **느낌과 개성**을 재현
3. **PRD가 콘텐츠를 결정한다** — 같은 레퍼런스를 써도 PRD에 따라 다른 도메인 콘텐츠
4. **레퍼런스에 없는 것은 추가하지 마라** — 과잉 장식, 불필요한 섹션, 레퍼런스에 없는 효과 금지
5. **품질 하한선은 유지** — Tier 1 규칙(spring physics, 비주얼 카드, 2-layer 배경 등)은 항상 적용
6. **reference docs는 smart defaults** — 레퍼런스가 명확히 다른 스타일일 때만 오버라이드

---

## 입력 수집 (input/ 폴더 자동 탐색)

`input/` 폴더를 스캔하여 아래 파일들을 자동으로 읽는다:

### URL 소스 (최소 1개 필수)
아래 중 하나라도 있으면 URL 확보:
- `input/url.md` 또는 `input/urls.md` — 한 줄에 URL 하나씩 (첫 번째 = 메인 레퍼런스, 나머지 = 서브)
- `input/url.txt` 또는 `input/urls.txt` — 동일
- `input/*.md` 내부에서 `http`로 시작하는 라인 추출

### PRD/프로젝트 설명 소스 (선택)
아래 중 하나라도 있으면 PRD로 사용:
- `input/*.pdf` — PDF 파일 읽기
- `input/prd.md` 또는 `input/README.md` — 마크다운 PRD
- `input/*.txt` — 텍스트 PRD (url.txt 제외)

### 탐색 로직
1. `input/` 폴더 내 모든 파일 목록 확인
2. URL 파일에서 레퍼런스 URL 추출 (최소 1개 없으면 중단 + 안내)
3. PRD/PDF 파일이 있으면 읽어서 프로젝트 설명으로 활용
4. PRD가 없으면 URL 분석 결과만으로 진행
5. 수집 결과 요약 출력 후 진행

> **input/ 폴더가 비어있거나 URL을 찾을 수 없으면:**
> "input/ 폴더에 url.md (레퍼런스 URL)를 추가해주세요." 안내 후 중단.

---

## 사전 체크

1. **MCP 검증** — 각 필수 서버 테스트 호출:

   | MCP 서버 | 테스트 | 필수 | 용도 |
   |----------|--------|------|------|
   | Firecrawl | `firecrawl_scrape` (url: "https://example.com", formats: ["markdown"]) | **필수** | URL 스크래핑 + 브랜딩 JSON + 스크린샷 |
   | Sequential Thinking | `sequentialthinking` (thought: "test", thoughtNumber: 1, totalThoughts: 1, nextThoughtNeeded: false) | **선택** | 구조화된 PRD 분석 (없어도 진행 가능) |
   | 21st-dev Magic | 간단한 컴포넌트 검색 | **필수** | 컴포넌트 정제 |
   | Context7 | `resolve-library-id` (libraryName: "react") | **필수** | 최신 프레임워크 문서 |
   | Unsplash | `search_photos` (query: "test") | **필수** | 이미지 확보 |
   | Playwright | `browser_navigate` (url: "https://example.com") | **선택** | 애니메이션 관찰 (anti-bot 시 스킵) |
   | Design Inspiration | 간단한 검색 | **선택** | 추가 UI 레퍼런스 |

   > **필수 MCP가 하나라도 실패하면 — 즉시 중단.**
   > 설정 안내 출력: `.mcp.json` 확인, API 키 설정, Claude Code 재시작.

2. `input/` 폴더에서 최소 1개 레퍼런스 URL을 확보했는지 확인.

---

## Phase 1: Explore & Plan

> 목표: URL을 철저히 탐색하고 구조화된 컨텍스트 구축 (monday.com 원칙)
> 컨텍스트 예산: ~20%

### Step 1.1 — Firecrawl URL 분석
(외부 사이트 → Firecrawl이 anti-bot에 안정적)

- `firecrawl_scrape` — 페이지 HTML/마크다운 + 스크린샷 추출
- `firecrawl_extract` (Branding Format v2) — 브랜드 DNA JSON 추출:
  - 컬러 팔레트 (primary, secondary, accent, bg, text)
  - 타이포그래피 (폰트 패밀리, 크기 체계, weight)
  - 간격 시스템 (padding, margin 패턴)
  - 컴포넌트 스타일 (카드, 버튼, 네비 패턴)

### Step 1.2 — 스크린샷 분석 (Claude Vision)
Firecrawl 스크린샷 분석:
- 레이아웃: 섹션 수/순서, 그리드, 카드 배치
- **섹션 인벤토리**: 레퍼런스의 모든 섹션 타입을 리스트업 (Hero, Logos, Features, Testimonials, FAQ, Stats 등)
  → plan.md에 "레퍼런스 섹션 인벤토리" 테이블로 기록
  → 프로토타입 생성 시 동일한 섹션 타입을 모두 포함해야 함
- 이미지 전략: 각 이미지 → Unsplash 검색 키워드 매핑 (정확한 플랜)
- 모션 힌트: 그라디언트 움직임, 패럴랙스, hover 효과 단서
- 컴포넌트 인벤토리
- **무드/개성 분석**: 이 사이트가 주는 전체적인 느낌은? (예: "다크+테크+프리미엄", "밝고+친근+교육적", "미니멀+우아+에디토리얼", "볼드+실험적+크리에이티브")
  → plan.md에 "레퍼런스 무드" 한 줄로 기록
  → Phase 2에서 이 무드를 벗어나는 결정을 하면 안 됨

### Step 1.3 — Playwright URL 방문 (애니메이션 관찰용, 실패 시 스킵)
- 사이트 탐색: 스크롤, 호버, 클릭
- 애니메이션/인터랙션 관찰 → 모션 스펙 기록 (duration, easing, trigger)
- 호버 상태 스크린샷
- **anti-bot으로 실패 시: Firecrawl 데이터만으로 진행**

### Step 1.4 — 팬시 디자인 판단
- 복잡한 3D/파티클/고급 애니메이션 감지 시 → 사용자에게 구현 수준 질문

### Step 1.5 — 이미지 확보
- `unsplash search_photos` — 스크린샷 분석 기반 정확한 키워드로 이미지 확보
- 이미지 URL + 용도 매핑 테이블 작성

### Step 1.6 — plan.md 출력
```
prototypes/
├── plan.md              ← 설계도 (레이아웃 + 토큰 + 이미지맵 + 모션스펙)
├── references/
│   ├── ref-main.png     ← Firecrawl 캡처 스크린샷
│   ├── ref-sub.png
│   └── brand-tokens.json ← Firecrawl Branding v2 출력
```

plan.md 포함 사항:
- 섹션별 레이아웃 블루프린트 (스크린샷 영역 참조)
- 브랜드 토큰 요약 (색상, 폰트, 간격)
- 이미지 맵 (어떤 Unsplash 이미지가 어디에)
- 모션 스펙 (무엇이, 어떻게, 얼마나 오래 애니메이션)
- 기능 페이지 플랜 (어떤 페이지, 어떤 인터랙션)

### Step 1.7 — analysis/ 생성 (implement 파이프라인용)

입력 수집 단계에서 읽은 PRD/PDF가 있으면 활용하고, 없으면 URL 분석 결과만으로 생성.
Sequential Thinking MCP가 사용 가능하면 이를 활용하여 요구사항을 체계적으로 분해.

URL 분석 + 프로젝트 설명에서 도메인 분류:
- 도메인 카테고리 분류 (industry, product_type)
- 핵심 키워드 3-5개 추출 → requirements.json domain.keywords
- 경쟁사/참고 서비스 → domain.reference_companies

다음 파일들을 analysis/ 폴더에 생성:

**analysis/prd.md** — 구조화된 PRD:
- 프로젝트 개요
- 기능 요구사항 (FR-001, FR-002... 형식)
- 비기능 요구사항 (NFR-001... 형식)
- 기술 스택 요구사항
- 제약사항 (API 제한, 배포 환경 등)

**analysis/requirements.json** — 머신 리더블 JSON:
```json
{
  "project_name": "",
  "domain": {
    "industry": "AI/SaaS/핀테크/교육/커머스/헬스케어/크리에이티브/생산성/개발도구/...",
    "product_type": "B2B/B2C/내부도구/마켓플레이스/...",
    "keywords": ["분석에서 도출한 도메인 키워드 3-5개"],
    "reference_companies": ["URL 분석에서 도출한 경쟁사/참고 서비스명"]
  },
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

> **기본 스택 힌트**: 특정 기술이 명시되지 않은 경우, 아래를 기본값으로 사용:
> - Framework: **Next.js 15** (App Router, TypeScript, Tailwind CSS)
> - Auth: **Auth.js v5 + Google OAuth**
> - DB: **Turso (libSQL)** + Drizzle ORM (또는 프로젝트에 맞는 DB)
> - UI: **shadcn/ui** + Lucide Icons
> - Deploy: **Vercel**
>
> 프로젝트에 다른 기술이 명시되어 있으면 그것을 우선 사용할 것.

**analysis/acceptance-criteria.md** — 각 기능별 수용 기준 (Given/When/Then 형식):
- [ ] AC-001: Given [조건], When [행동], Then [결과]

**analysis/tech-constraints.md** — 기술 제약사항 상세 분석 (API 무료 티어 한계, 배포 환경 제한 등)

**analysis/evaluation-matrix.md** — 평가 기준 매트릭스:
| 항목 | 배점 | 체크리스트 |

카테고리:
- 기능 완성도 (40점): 모든 FR 구현 여부
- 코드 품질 (20점): TypeScript strict, 에러 핸들링, 구조
- UI/UX (20점): 반응형, 다크모드, 로딩/에러 상태
- 배포 가능성 (10점): 빌드 성공, 환경 변수 분리
- 보안 (10점): API 키 보호, 입력 검증

**생성된 파일 검증:**
- requirements.json이 유효한 JSON인지 확인
- 모든 feature에 id, title, priority 필드가 있는지 확인
- evaluation-matrix.md의 배점 합계가 100점인지 확인
- acceptance-criteria.md에 최소 1개 이상의 AC가 있는지 확인
- 문제 발견 시 자동 수정

**Phase 1 완료 후 /clear 실행** (컨텍스트 리셋 — plan.md가 Phase 2의 입력)

---

## Phase 2: Generate

> 목표: plan.md 기반으로 2개 프로토타입 생성
> 컨텍스트 예산: ~55%

### Step 2.1 — plan.md 읽기
`prototypes/plan.md`와 `prototypes/references/brand-tokens.json` 읽기.

### Step 2.2 — 스캐폴딩
- `npx create-next-app@latest` (TypeScript, Tailwind, App Router)
- shadcn/ui 설치
- Phase 1에서 분석한 폰트 설치 (Inter/Roboto/Arial 금지)
- `lib/design-tokens.ts` — brand-tokens.json 기반 생성
- Framer Motion 설치

### Step 2.3 — 프로토타입 A: 충실한 클론

> 섹션 단위로 생성 (Raduan: 섹션당 3-5회 반복, Osmani: 작은 청크)

각 섹션마다:
1. plan.md의 해당 섹션 블루프린트 읽기
2. 레퍼런스 스크린샷 → 1:1 클론
3. 21st-dev MCP `component_inspiration` → 유사 패턴 참고
4. Unsplash 이미지 통합
5. 관찰한 모션 → Framer Motion 구현

#### 창의적 적응 원칙
- 레퍼런스의 **가장 인상적인 디자인 요소**를 식별하고 재현에 집중하라
  (예: Perso AI → 겹치는 브라우저 윈도우, Linear → 풀위드 제품 데모, Stripe → 인터랙티브 코드 블록)
- Hero의 앱 프리뷰는 **단일 스크린샷이 아니라** 레퍼런스처럼 깊이감 있는 구성을 시도:
  메인 윈도우 + 겹치는 플로팅 패널, 또는 레퍼런스의 구성 방식
- reference docs(visual-architecture, aesthetics-guide)의 규칙은 **smart defaults**:
  레퍼런스와 충돌하면 레퍼런스를 따르되, Tier 1 규칙은 항상 유지

생성 순서:
1. 기능 페이지(들) — UI 목업 + 기본 인터랙션, 데이터 하드코딩
2. 기능 페이지 완성 후:
   a. Playwright로 "워크플로우 중간 상태" 스크린샷 캡처 (빈 상태 금지)
   b. 캡처 실패 시 → 기능 페이지 page.tsx 읽고 CSS 축소판 컴포넌트 생성
   c. Hero에 BrowserMockup + 3D perspective로 임베드
3. 랜딩 페이지 — 섹션별 순차 생성
4. 네비게이션 연결

### 섹션 미러링 원칙

Step 1.2의 섹션 인벤토리에서 식별한 **모든 섹션 타입을 프로토타입에 포함**한다.
레퍼런스에 없는 섹션은 추가하지 않는다.

각 섹션의:
- **수량**: 레퍼런스의 60% 이상 (Features 8개 → 최소 5개)
- **스타일**: 레퍼런스의 카드/그리드/레이아웃 패턴을 따른다
- **밀도**: 레퍼런스와 동등한 콘텐츠 밀도 (빈 섹션 금지)
- **이미지**: Testimonials/Team 등 인물 섹션 → Unsplash 아바타 필수 (placeholder div 금지)

섹션이 빠졌는지는 Phase 3 비교에서 체크.

### Hero 앱 프리뷰 목업 규칙 (필수)

Hero 제품 UI 프리뷰는 기능 페이지의 실제 UI를 충실히 재현해야 한다.

#### 방법 A: Playwright 스크린샷 (권장)
1. 기능 페이지 빌드 후 dev 서버에서 Playwright 캡처
2. public/screenshots/에 저장, Hero에서 `<img>`로 임베드
3. BrowserMockup + 3D perspective + color-tinted shadow 적용

#### 방법 B: CSS 재현 (스크린샷 실패 시)
1. 기능 페이지 page.tsx 읽고 UI 구조 분석
2. 별도 AppPreview.tsx로 축소판 생성
3. 필수: 기능 페이지의 모든 주요 UI 영역, 실제 데이터 채워진 상태, 워크플로우 중간 단계, 최소 3개 구분 UI 영역
4. 금지: 빈 dashed 업로드 박스만, Math.random() 데이터, 5개 미만 UI 요소 와이어프레임
5. pointer-events-none + overflow-hidden + BrowserMockup 프레임 필수

### Step 2.4 — 프로토타입 B: 변형
- A 완성 후 복제 → 컬러/레이아웃 변형
- 또는 sub-agent로 A와 병렬 생성 (git worktree 활용 가능)

### Step 2.5 — CLAUDE.md 업데이트
- 생성 중 발견한 패턴/실수를 프로젝트 CLAUDE.md에 규칙으로 추가 (Boris Cherny 원칙)

**Phase 2 완료 후 /clear 실행**

---

## Phase 3: Screenshot Diff Loop & Deliver

> 목표: 레퍼런스와 시각적 일치도 극대화 (Saqoosha 원칙)
> 컨텍스트 예산: ~25%

### Step 3.1 — 빌드 확인
- `npm run build` — 0 에러

### Step 3.2 — Playwright 스크린샷 캡처
(자체 dev 서버 = anti-bot 없음)
- `npm run dev` 시작
- 전체 페이지 + 주요 섹션 캡처
- 저장: `prototypes/results/`

### Step 3.3 — 원본 vs 결과물 비교 (Claude Vision)
- `prototypes/references/ref-*.png` vs `prototypes/results/*.png` 비교
- 섹션별 평가:
  - 레이아웃 유사도
  - 컬러 매칭
  - 타이포그래피 매칭
  - 이미지 비율/배치
  - 여백/간격
  - Hero 앱 프리뷰 품질: 기능 페이지 UI 영역이 3개 이상 표현되어 있는가?
    와이어프레임 수준이면 → 방법 A 또는 B로 재생성
  - 섹션 완성도: 레퍼런스 섹션 인벤토리 대비 누락된 섹션이 있는가?
    Testimonials/Stats/FAQ 중 레퍼런스에 있었는데 빠진 것 → 즉시 생성
  - Features 수량: 레퍼런스 피처 수의 60% 이상인가?
    미달이면 → 도메인 관련 피처 추가
- TOP 3 차이점 → 구체적 수정

### Step 3.4 — 반복 (최대 3회)
- 수정 → 재캡처 → 재비교
- 각 반복에서 개선 기록

### Step 3.5 — 전달
- Dev 서버 유지
- 브라우저에서 직접 확인 요청 (http://localhost:3000/a, /b)
- 두 프로토타입을 비교한 후 `/implement a` 또는 `/implement b`를 실행하세요

---

## MCP 활용 맵

| Phase | MCP | 용도 | 필수/선택 |
|-------|-----|------|-----------|
| 1 | **firecrawl** | URL 스크래핑 + 브랜딩 JSON + 스크린샷 | 필수 |
| 1 | **sequential-thinking** | 구조화된 PRD/요구사항 분석 | 선택 |
| 1 | **playwright** | URL 방문 + 애니메이션 관찰 | 선택 (anti-bot 시 스킵) |
| 1 | **unsplash** | 이미지 사전 확보 | 필수 |
| 2 | **21st-dev** | 컴포넌트 정제 | 필수 |
| 2 | **context7** | 라이브러리 최신 문서 | 필수 |
| 2 | **design-inspiration** | 추가 UI 레퍼런스 | 선택 |
| 3 | **playwright** | 자체 dev 서버 스크린샷 캡처 | 필수 |

---

## 참고 문서 (Smart Defaults)
아래 문서의 규칙은 **품질 하한선 보장용 기본값**이다.
레퍼런스가 명확히 다른 스타일이면 레퍼런스를 따르되, Tier 1 규칙은 항상 유지.

- `prototype-references/visual-architecture.md` — 비주얼 밀도 + 컴포넌트 기본 패턴
- `prototype-references/aesthetics-guide.md` — AI slop 방지 규칙
- `prototype-references/copy-guide.md` — 카피 가이드
- `prototype-references/premium-components.md` — 컴포넌트 참고
