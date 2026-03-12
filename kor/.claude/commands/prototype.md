---
description: v0, 디자인 레퍼런스, AI 컴포넌트를 활용한 3가지 UI 프로토타입 생성
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:v0:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*"]
---

analysis/prd.md를 읽고 3가지 UI 인터페이스 프로토타입을 생성하세요.

## 사전 체크 (먼저 수행)

1. **환경변수 및 MCP 실제 동작 검증** (반드시 아래 순서대로):

   a) Bash로 필수 환경변수 존재 확인:
      ```bash
      echo "FIRECRAWL_API_KEY=${FIRECRAWL_API_KEY:+설정됨}"
      echo "SERPER_API_KEY=${SERPER_API_KEY:+설정됨}"
      echo "TWENTY_FIRST_API_KEY=${TWENTY_FIRST_API_KEY:+설정됨}"
      echo "UNSPLASH_ACCESS_KEY=${UNSPLASH_ACCESS_KEY:+설정됨}"
      ```
      → 출력이 비어있으면 해당 환경변수 ❌

   b) 각 필수 MCP 서버 테스트 호출 (도구가 실제로 동작하는지 확인):
      - Firecrawl: `firecrawl_scrape` 호출 (url: "https://example.com", formats: ["markdown"])
      - Design Inspiration: 간단한 검색 테스트 호출
      - 21st-dev Magic: 간단한 컴포넌트 검색 테스트 호출
      - Context7: `resolve-library-id` 호출 (libraryName: "react", query: "test")
      - v0: `getUser` 호출로 인증 상태 확인
      → 각 호출이 에러 없이 응답하면 ✅, 에러 발생 시 ❌

   c) 결과를 표로 출력:
      | MCP 서버 | 환경변수 | 테스트 호출 | 최종 | 필수 | 용도 |
      |----------|----------|-----------|------|------|------|
      | Firecrawl | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | 경쟁 앱 UI 리서치 |
      | Design Inspiration | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | 디자인 레퍼런스 리서치 |
      | 21st-dev Magic | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | UI 컴포넌트 생성/폴리싱 |
      | Context7 | N/A | ✅/❌ | ✅/❌ | **필수** | 최신 프레임워크 문서 참조 |
      | v0 | N/A | ✅/❌ | ✅/❌ | **필수** | 프로토타입 코드 생성 |
      | Unsplash API | ✅/❌ | N/A | ✅/❌ | 권장 | 랜딩페이지 고품질 이미지 |

> **⛔ CRITICAL: 필수 MCP의 최종 상태가 하나라도 ❌이면 — 즉시 중단.**
> **절대로 "없이 진행합니다", "스킵합니다" 등으로 우회하지 말 것.**
> 아래 안내를 출력하고 프로토타이핑을 시작하지 말 것:
> 1. `.mcp.json` 파일이 있는지 확인 → 없으면 `cp .mcp.json.example .mcp.json`
> 2. 필요한 API 키 환경변수 설정:
>    - `FIRECRAWL_API_KEY` — https://firecrawl.dev
>    - `SERPER_API_KEY` — https://serper.dev (Design Inspiration용)
>    - `TWENTY_FIRST_API_KEY` — https://21st.dev (Magic MCP용)
> 3. Claude Code 재시작 (exit → claude)
> 4. `/mcp` 명령으로 필수 서버 모두 ✅인지 확인
> 5. 다시 `/prototype` 실행

2. analysis/prd.md, analysis/requirements.json 파일 존재 확인
   → 없으면 "먼저 /analyze를 실행하세요" 안내 후 중단

---

## Phase 1: 리서치 (출력물: `prototypes/research.md`)

1. analysis/prd.md와 analysis/requirements.json을 읽어라.

2. **Design Inspiration MCP를 호출하고 결과를 research.md에 기록하라**:
   - PRD 도메인과 관련된 키워드 3-4개로 `collectui_search` 또는 `collectui_browse`를 호출하라
   - UI 레이아웃, 색상 스킴, 타이포그래피, 인터랙션 패턴을 분석하라
   - **다크모드와 라이트모드를 모두 포함하여 최소 3가지 서로 다른 비주얼 스타일을 검색하라**
   - **반드시 결과를 `prototypes/research.md`에 기록하라**

3. **21st-dev Magic MCP `component_inspiration`을 호출하고 결과를 research.md에 기록하라**:
   - 프로젝트에 필요한 핵심 컴포넌트 3-4종(예: card, sidebar, table, kanban)을 검색하라
   - **반드시 결과를 `prototypes/research.md`에 기록하라**

4. **Firecrawl로 경쟁 앱 2-3개를 스크랩하고 결과를 research.md에 기록하라**:
   - PRD에 언급된 경쟁 앱이나 유사 서비스의 URL을 `firecrawl_scrape`로 크롤링하라
   - UI 레이아웃, 네비게이션 패턴, 브랜딩(색상, 폰트)을 분석하라
   - **경쟁 앱들의 색상 스킴에서 3가지 서로 다른 팔레트 방향을 추출하라. 최소 하나는 근본적으로 다른 색상 계열(hue)을 사용하라.**
   - **반드시 결과를 `prototypes/research.md`에 기록하라**

5. **Firecrawl로 모던 랜딩페이지 레퍼런스 2-3개를 스크랩하고 결과를 research.md에 기록하라**:
   - 최신 SaaS/앱 랜딩페이지 트렌드를 조사하라 (예: perso.ai, linear.app, vercel.com, cal.com 등)
   - 분석 포인트:
     - Hero 섹션 구성 (헤드라인 + 서브텍스트 + CTA 배치)
     - 스크롤 애니메이션 패턴 (fade-in, slide-up, parallax)
     - 섹션 전환 방식 (full-screen snap, smooth scroll)
     - 신뢰 요소 배치 (로고 마퀴, 통계, 소셜 프루프)
     - CTA 버튼 스타일 및 배치 전략
   - **반드시 결과를 `prototypes/research.md`에 기록하라**

6. **🆕 프리미엄 컴포넌트 매핑 — Firecrawl로 Aceternity UI & Magic UI 갤러리 스크랩**:
   - `https://ui.aceternity.com/components` 스크랩 → 프리미엄 컴포넌트 이름 + 설명 목록 추출
   - `https://magicui.design/docs/components` 스크랩 → 애니메이션 컴포넌트 이름 + 설명 목록 추출
   - PRD 섹션별 프리미엄 컴포넌트 매핑을 research.md §7에 기록:
     ```
     ## 7. 프리미엄 컴포넌트 매핑
     PRD 섹션 → 프리미엄 컴포넌트 매핑:
     - Hero: AuroraBackground, HeroParallax, LampEffect, BackgroundBeams
     - Features: BentoGrid, CardSpotlight, GlareCard, MagicCard
     - Social Proof: InfiniteMovingCards, AnimatedBeam, NumberTicker
     - Background: SparklesCore, Meteors, DotPattern, GridPattern
     - Navigation: FloatingNavbar, FloatingDock
     - Text: TextGenerateEffect, TypingAnimation, BlurIn
     ```

7. **🆕 안티패턴 금지 목록 — research.md §8에 기록**:
   ```
   ## 8. 안티패턴 (금지 목록)
   - 대칭 3-column 동일 그리드 (→ BentoGrid 사용)
   - 중앙 정렬만의 레이아웃 (→ 비대칭 배치 사용)
   - 호버 효과 없는 플랫 카드 (→ Spotlight/Glare 효과)
   - 회색 플레이스홀더 박스 (→ CSS 목업 또는 그라디언트)
   - linear easing 애니메이션 (→ spring physics 사용)
   - 단일 레이어 배경 (→ 그라디언트 + 패턴 + 파티클 레이어링)
   - 균일한 섹션 높이 (→ 극적으로 변화: min-h-screen 히어로, 컴팩트 stats)
   ```

8. **🆕 Firecrawl로 추가 프리미엄 레퍼런스 스크랩** (경쟁 앱 외):
   - `https://stripe.com/` — 벤토 그리드, 실제 제품 목업, 깊이감
   - `https://perso.ai/` — AI 서비스 랜딩 벤치마크
   - `https://height.app/` — SVG wave 히어로 배경
   - WebSearch로 최신 어워드 수상 랜딩 페이지 1-2개 추가 탐색
   - 발견한 비주얼 기법을 research.md §4 (디자인 레퍼런스)에 기록

9. **Unsplash API로 프로젝트 도메인에 맞는 이미지를 큐레이션하라** (UNSPLASH_ACCESS_KEY가 있을 때만):
   - Firecrawl `firecrawl_scrape`로 Unsplash 검색 결과 페이지를 스크랩하라:
     - PRD 도메인 관련 키워드 3-4개 (예: "productivity app", "task management", "team collaboration")
     - Hero 배경용 키워드 (예: "abstract gradient", "minimalist workspace", "dark abstract")
   - 또는 Unsplash API 직접 호출: `https://api.unsplash.com/search/photos?query={keyword}&client_id={UNSPLASH_ACCESS_KEY}`
   - **각 컨셉(A/B/C)에 적합한 이미지 URL 3-5개씩 큐레이션하여 research.md에 기록하라**:
     - Hero 배경 이미지 1개
     - Feature 섹션 이미지 2-3개
     - 분위기/무드 이미지 1개
   - Unsplash 이미지 URL 형식: `https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop&q=80`
   - **UNSPLASH_ACCESS_KEY 없으면**: picsum.photos와 CSS 그라디언트로 대체 (이 step 스킵)

10. **`prototypes/research.md` 파일을 아래 8개 섹션으로 구조화하여 작성하라** (Unsplash 없으면 7개):
   ```markdown
   # Design Research

   ## 1. 색상 팔레트 (3가지 비주얼 아이덴티티)

   ### Palette A: {무드명} (예: "Cold Dark")
   - Mode: dark/light
   - Primary: #hex — 용도
   - Accent: #hex — 용도
   - Surface: #hex — 배경
   - Text: #hex — 본문
   - Mood: 한 줄 설명

   ### Palette B: {무드명} (예: "Warm Neutral")
   - Mode: dark/light
   - Primary: #hex — 용도
   - Accent: #hex — 용도
   - Surface: #hex — 배경
   - Text: #hex — 본문
   - Mood: 한 줄 설명

   ### Palette C: {무드명} (예: "Clean Light")
   - Mode: dark/light
   - Primary: #hex — 용도
   - Accent: #hex — 용도
   - Surface: #hex — 배경
   - Text: #hex — 본문
   - Mood: 한 줄 설명

   ## 2. 추천 레이아웃 패턴
   - 패턴 1: 설명 (출처: 어디서 발견)
   - 패턴 2: 설명 (출처: 어디서 발견)
   - 패턴 3: 설명 (출처: 어디서 발견)

   ## 3. 핵심 컴포넌트 목록
   - 컴포넌트 1: 설명 + 추천 스타일
   - 컴포넌트 2: 설명 + 추천 스타일
   - 컴포넌트 3: 설명 + 추천 스타일

   ## 4. 디자인 레퍼런스
   - 레퍼런스 앱 1: URL + 참고할 UI 패턴 + 스크린샷: prototypes/references/ref-{name}.png
   - 레퍼런스 앱 2: URL + 참고할 UI 패턴 + 스크린샷: prototypes/references/ref-{name}.png

   ## 5. 랜딩페이지 패턴
   - Hero 스타일: 설명 (출처: 어디서 발견)
   - 스크롤 애니메이션: 패턴 목록
   - CTA 패턴: 버튼 스타일 + 배치
   - 섹션 구성: 추천 섹션 흐름 (Hero → Features → Social Proof → CTA)

   ## 6. 큐레이션된 이미지 (Unsplash)
   ### Concept A용
   - Hero: URL + 설명
   - Feature 1: URL + 설명
   - Feature 2: URL + 설명

   ### Concept B용
   - Hero: URL + 설명
   - Feature 1: URL + 설명

   ### Concept C용
   - Hero: URL + 설명
   - Feature 1: URL + 설명

   ## 7. 프리미엄 컴포넌트 매핑
   PRD 섹션 → 프리미엄 컴포넌트 매핑:
   - Hero: {Aceternity/Magic UI 스크랩에서 선택}
   - Features: {Aceternity/Magic UI 스크랩에서 선택}
   - Social Proof: {Aceternity/Magic UI 스크랩에서 선택}
   - Background: {Aceternity/Magic UI 스크랩에서 선택}
   - Navigation: {Aceternity/Magic UI 스크랩에서 선택}
   - Text: {Aceternity/Magic UI 스크랩에서 선택}

   ## 8. 안티패턴 (금지 목록)
   - 대칭 3-column 동일 그리드 (→ BentoGrid 사용)
   - 중앙 정렬만의 레이아웃 (→ 비대칭 배치)
   - 호버 효과 없는 플랫 카드 (→ Spotlight/Glare)
   - 회색 플레이스홀더 박스 (→ CSS 목업 또는 그라디언트)
   - linear easing 애니메이션 (→ spring physics)
   - 단일 레이어 배경 (→ 그라디언트 + 패턴 + 파티클)
   - 균일한 섹션 높이 (→ 변화: min-h-screen 히어로, 컴팩트 stats)
   ```

11. **Playwright로 레퍼런스 앱 스크린샷을 캡처하고 저장하라**:
   - research.md의 디자인 레퍼런스 섹션에서 URL 2-3개를 선택하라
   - 각 URL에 대해 `browser_navigate` → `browser_take_screenshot` 수행
   - 스크린샷을 `prototypes/references/` 디렉토리에 저장하라 (파일명: `ref-{앱이름}.png`)
   - research.md의 "디자인 레퍼런스" 섹션에 스크린샷 경로를 추가하라
   - 랜딩페이지 레퍼런스 URL도 포함하여 스크린샷을 캡처하라
   - **Stripe, Perso.ai, Height.app 스크린샷도 캡처하라** (프리미엄 레퍼런스용)
   - 이 스크린샷은 Phase 4에서 v0 프롬프트 또는 Fallback 시 Claude Code에 시각 참고자료로 사용된다

> **CHECKPOINT**: `prototypes/research.md` 파일이 8개 섹션 (Unsplash 없으면 7개)(3-팔레트 + §7 프리미엄 컴포넌트 매핑 + §8 안티패턴 포함)을 모두 포함하고, `prototypes/references/` 에 스크린샷 2장 이상 존재하는지 확인하라.

---

## Phase 2: 컨셉 도출 (출력물: `prototypes/concepts.md`)

`prototypes/research.md`와 `analysis/prd.md`를 기반으로 3가지 인터페이스 컨셉을 정의하라.
**반드시 `prototypes/concepts.md` 파일에 아래 구조로 기록하라.**

### 2-A: 페이지 구조 설계 (PRD + 컨셉 기반)
- PRD의 기능 요구사항과 각 컨셉의 UX 방향을 종합하여 각 프로토타입에 필요한 페이지/뷰를 자유롭게 설계하라
- **페이지 구성은 컨셉마다 다를 수 있다** — 고정된 "메인+보조" 구조를 강제하지 마라
- 최소 3페이지, 최대 4페이지 (랜딩 + 앱 페이지 2-3개)
- **모든 컨셉이 랜딩페이지(`/{x}`)로 시작**하도록 강제:
  - `/{x}` = 랜딩페이지 (Hero + 기능 소개 + CTA)
  - `/{x}/app` 또는 `/{x}/dashboard` 등 = 실제 앱 기능 페이지들
- 예) 랜딩페이지 → 대시보드 (마케팅 중심 서비스)
  - 예) 랜딩페이지 → 워크스페이스 (도구형 앱)
  - 예) 랜딩페이지 → 온보딩/가입 → 메인 기능 (커뮤니티/SaaS)
  - 예) 랜딩페이지 → 목록 → 상세 (콘텐츠/이커머스)

### 2-B: 컨셉별 정의 (각 컨셉에 아래 항목 모두 포함)
1. **컨셉명**
2. **핵심 레이아웃 패턴**
3. **타겟 사용자**
4. **차별점**
5. **비주얼 아이덴티티**: research.md의 Palette A/B/C 중 하나 (각 컨셉은 반드시 다른 팔레트)
6. **페이지 구성**: 이 컨셉에 맞게 설계한 페이지 목록 + 각 라우트 경로 + 각 페이지의 역할
   (예: `/a` = 랜딩, `/a/app` = 메인 기능 또는 `/b` = 대시보드, `/b/detail` = 상세 뷰)
7. **비주얼 에셋 방향**: 이 컨셉에 적합한 시각 요소 설명
   (예: "picsum 유저 아바타", "CSS 그라디언트 배경", "도메인 관련 플레이스홀더 이미지")
8. **랜딩페이지 구성**: Hero 섹션 스타일 + 주요 섹션 흐름 + CTA 문구/동작
   (예: "풀스크린 Hero with gradient → 3-feature showcase → social proof → footer CTA → /a/app으로 이동")
9. **애니메이션 방향**: 이 컨셉에 적합한 전환/스크롤 애니메이션 스타일
   (예: "fade-up on scroll, smooth section transitions, hover scale on cards")
10. **🆕 프리미엄 컴포넌트 선택** (반드시 research.md §7에서 선택):
    - Hero 기법: {AuroraBackground | HeroParallax | LampEffect | BackgroundBeams} — **3개 컨셉 모두 반드시 다른 Hero 기법 사용**
    - Feature 레이아웃: {BentoGrid | CardSpotlight Grid | GlareCard Row | MagicCard Grid} — **최소 1개 컨셉은 반드시 BentoGrid 사용**
    - Social Proof: {InfiniteMovingCards | AnimatedBeam | NumberTicker}
    - 배경 장식: {SparklesCore, DotPattern, Meteors, GridPattern} 중 1-2개
    - 텍스트 애니메이션: {TextGenerateEffect | TypingAnimation | BlurIn}
    - 네비게이션: {FloatingNavbar | FloatingDock}

- 3가지 컨셉은 반드시 서로 다른 UX 패러다임을 대표해야 한다
- 3가지 컨셉은 반드시 서로 다른 비주얼 아이덴티티(팔레트)를 사용해야 한다
- **🆕 3가지 컨셉은 반드시 서로 다른 Hero 기법을 사용해야 한다 — 색상뿐 아니라 구조적 차별화**

> **CHECKPOINT**: `prototypes/concepts.md` 파일에 3개 컨셉이 각각 다른 Palette와 다른 Hero 기법을 배정받았는지, 각 컨셉에 최소 3페이지 (랜딩 포함) 구성이 정의되었는지, 3개 컨셉의 페이지 흐름이 각 컨셉의 성격을 반영하는지, 항목 10 (프리미엄 컴포넌트 선택)이 3개 모두 완전히 지정되었는지 확인하라.

---

## Phase 3: 프로젝트 스캐폴딩

a) **프로젝트 생성** (공식 문서 기준):
   ```bash
   npx create-next-app@latest prototypes/_app --yes
   ```
   `--yes`: TypeScript, Tailwind CSS, App Router, Turbopack 등 권장 기본값 자동 적용

b) **shadcn/ui + 의존성 설치**:
   ```bash
   cd prototypes/_app
   npx shadcn@latest init -t next
   npx shadcn@latest add button input checkbox badge dropdown-menu select dialog avatar scroll-area separator table textarea card
   npm install lucide-react framer-motion mini-svg-data-uri
   ```

c) **공통 레이아웃** (app/layout.tsx):
   - 다크 모드 기본 (dark class on html) 유지
   - 공통 폰트, 메타데이터
   - 라이트모드 프로토타입은 자체 페이지에서 `className="light"` wrapper를 사용하여 override

d) **`next.config.ts`에 외부 이미지 도메인 추가**:
   ```typescript
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: 'picsum.photos' },
       { protocol: 'https', hostname: 'images.unsplash.com' },
       { protocol: 'https', hostname: 'illustrations.popsy.co' },  // 무료 일러스트
     ],
   },
   ```

e) **🆕 `components/premium/` 디렉토리 생성**:
   ```bash
   mkdir -p prototypes/_app/components/premium
   ```
   이 디렉토리에 Phase 4에서 Aceternity/Magic UI 컴포넌트 코드를 배치한다.

f) **🆕 `app/globals.css`에 프리미엄 유틸리티 CSS 추가** (기존 스타일 뒤에 append):
   ```css
   /* === Premium Visual Utilities === */

   /* Aurora 애니메이션 */
   @keyframes aurora {
     0%, 100% { background-position: 50% 50%, 50% 50%; }
     50% { background-position: 100% 50%, 0% 50%; }
   }
   .animate-aurora {
     animation: aurora 15s ease infinite;
     background-size: 300% 300%, 200% 200%;
   }

   /* Grain/Noise 텍스처 오버레이 */
   .bg-noise::after {
     content: "";
     position: absolute;
     inset: 0;
     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
     opacity: 0.02;
     pointer-events: none;
     z-index: 1;
   }

   /* Grid 패턴 배경 */
   .bg-grid {
     background-image:
       linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
       linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px);
     background-size: 40px 40px;
   }

   /* Dot 패턴 배경 */
   .bg-dots {
     background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
     background-size: 24px 24px;
     opacity: 0.15;
   }

   /* 무한 마퀴 */
   @keyframes marquee {
     from { transform: translateX(0); }
     to { transform: translateX(-50%); }
   }
   .animate-marquee {
     animation: marquee 30s linear infinite;
   }

   /* Shimmer 스켈레톤 */
   @keyframes shimmer {
     from { background-position: -200% 0; }
     to { background-position: 200% 0; }
   }
   .animate-shimmer {
     background: linear-gradient(90deg, transparent 25%, hsl(var(--foreground) / 0.05) 50%, transparent 75%);
     background-size: 200% 100%;
     animation: shimmer 2s ease-in-out infinite;
   }

   /* Spotlight 커서 추적 glow (JS로 마우스 위치 연동) */
   .card-spotlight {
     position: relative;
     overflow: hidden;
   }
   .card-spotlight::before {
     content: "";
     position: absolute;
     inset: 0;
     background: radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), hsl(var(--primary) / 0.06), transparent 40%);
     pointer-events: none;
     z-index: 1;
   }

   /* 버튼/카드 Glow 효과 */
   .glow {
     box-shadow: 0 0 20px -5px hsl(var(--primary) / 0.3);
   }
   .glow-hover:hover {
     box-shadow: 0 0 30px -5px hsl(var(--primary) / 0.5);
   }
   ```

g) **🆕 `lib/utils.ts` 확장** — 기존 `cn()` 외에 noise pattern generator 유틸리티 함수 추가:
   ```typescript
   // cn() 함수 아래에 추가:
   export function generateNoisePattern(opacity: number = 0.02): string {
     return `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity}'/%3E%3C/svg%3E")`;
   }
   ```

---

## Phase 4: v0 코드 생성 (핵심 — PRIMARY)

> **⛔ 절대로 직접 프로토타입 코드를 작성하지 마라 — v0가 생성한 코드만 사용하라.**

### v0 프롬프트 템플릿 (Vercel 3-Part Framework)

각 프로토타입의 각 페이지 생성 시 아래 템플릿으로 `createChat`을 호출하라. **반드시 concepts.md와 research.md의 결과를 삽입하라**:

```
## 1. Product Surface
Build a {concept_name} interface for {project_name}.
Core features: {prd.md에서 추출한 기능 요구사항 5-8개, 구체적으로}
Layout: {컨셉별 선택된 레이아웃 — 예: "sidebar + main list", "kanban columns", "dashboard grid"}
Page: {이 페이지의 역할 — 예: "메인 리스트 뷰", "상세/편집 뷰"}

## 2. Context of Use
Target users: {PRD의 타겟 사용자 — 예: "individual productivity users who need quick task capture and organization"}
Primary use case: {핵심 사용 시나리오 — 예: "daily task management with priority-based workflow"}
Design reference apps: {research.md에서 추출한 레퍼런스 — 예: "Notion's clean typography, Linear's smooth animations, Todoist's quick-add UX"}

## 3. Constraints & Taste
- Next.js 15 App Router, TypeScript
- 이 페이지는 멀티페이지 앱의 한 뷰이다. 자체 완결적이되 다른 페이지로의 Link 네비게이션을 포함하라.
- Tailwind CSS + shadcn/ui components (import from @/components/ui/*)
- Available shadcn: button, input, checkbox, badge, select, dialog, card, avatar, scroll-area, separator, dropdown-menu, textarea, table
- Icons: lucide-react only
- Color palette: {concepts.md에서 이 컨셉에 배정된 Palette의 hex 전체 — 예: "primary: #6366f1, accent: #8b5cf6, surface: #1e1e2e, text: #e2e8f0"}
- Mode: {dark/light — concepts.md에서 이 컨셉에 배정된 Palette의 Mode}
- Visual mood: {Palette의 Mood 설명}
- Typography: Inter or system font, clear hierarchy (text-2xl headings, text-sm labels)
- Mock data: 8-10 realistic items with varied states
- Visual assets: 시각적 풍부함을 위해 아래를 활용하라:
  - 플레이스홀더 이미지: https://picsum.photos/{width}/{height}?random={n}
    (유저 아바타: 40x40, 히어로 이미지: 800x400, 썸네일: 200x200)
  - CSS 그라디언트, 미묘한 배경 패턴 (dot grid, radial gradient)
  - 도메인 관련 비주얼: {concepts.md의 비주얼 에셋 방향 삽입}
- "NO external API calls" 예외: picsum.photos 정적 이미지 URL은 허용

### 🆕 앱 페이지 프리미엄 요구사항
- Sidebar/Nav: glass-morphism (backdrop-blur-md, bg-white/5 또는 bg-black/20, 미묘한 1px border at 10% opacity)
- Cards: 반드시 hover 효과 — border glow 또는 cursor-following spotlight (마우스 따라가는 radial-gradient)
- Data tables: 0.02 opacity zebra striping, sticky header with backdrop-blur
- Empty states: CSS 추상 도형 일러스트 (그라디언트 블롭, 기하학 도형) — 순수 텍스트만 금지
- Micro-interactions: 버튼 press scale(0.97) transition, input focus시 primary glow ring (ring-2 ring-primary/30)
- 모든 애니메이션: spring physics `{ type: "spring", stiffness: 200, damping: 25 }` — linear, ease-in-out 절대 금지

- Quality: Stripe/Vercel Dashboard 수준 — pixel-perfect spacing, spring transitions,
  모든 인터랙티브 요소에 hover states, focus rings, smooth animations (framer-motion)
- Responsive: mobile-first, graceful degradation from desktop to mobile
- NO database, NO authentication — pure UI prototype with useState/useReducer
```

### 랜딩페이지 전용 프롬프트 템플릿 (🆕 프리미엄 재작성)

각 프로토타입의 랜딩페이지(`/{x}`) 생성 시 아래 템플릿을 사용하라:

```
## 1. Product Surface
Build a premium landing page for {project_name} — a {한 줄 프로젝트 설명}.
This is NOT the app itself, but a marketing/introduction page that showcases the product.
Visual benchmark: Stripe.com, Vercel.com, Linear.app — NOT a generic Bootstrap template.

## 2. Visual Architecture (CRITICAL — 정확히 따를 것)

### Hero Section
- 기법: {concepts.md 항목 10의 Hero 기법}
- 구현:
  - 풀 뷰포트 높이 (min-h-screen). 이것은 협상 불가.
  - 배경: radial-gradient (primary→transparent, top-center 위치) + CSS grid/dot pattern 오버레이 (0.04 opacity)
    + grain noise 오버레이 (0.02 opacity). Hero 배경에 최소 3개 비주얼 레이어.
  - 헤드라인: TextGenerateEffect (단어별 0.8s stagger fade-in) 또는 TypingAnimation 또는 BlurIn
    — concepts.md 항목 10에 지정된 것 사용.
  - CTA 버튼: primary 색상 + 미묘하게 pulse하는 glow shadow (box-shadow 애니메이션).
  - 레이아웃: 모든 것을 좁은 컬럼에 수직 중앙 정렬하지 마라.
    비대칭 레이아웃 (헤드라인 좌측 정렬 + 우측 비주얼) 또는 풀와이드 드라마틱 센터에 깊이 레이어 사용.
  - 플로팅 네비게이션 바: glass-morphism (backdrop-blur-md, bg-white/5, border-white/10)

### Feature Section
- 기법: {concepts.md 항목 10의 Feature 레이아웃}
- BentoGrid인 경우: "CSS grid repeat(3, 1fr). 첫 아이템 col-span-2 (큰 카드 with 목업).
  아이템 2-3은 1x1. 아이템 4는 col-span-2 (stats 또는 testimonial).
  각 카드: hover시 커서 따라가는 spotlight (radial gradient),
  미묘한 border (1px, 10% opacity), backdrop-blur-sm.
  절대 대칭 3-equal-column 레이아웃 사용 금지."
- CardSpotlight인 경우: "마우스 위치를 따라가는 radial-gradient glow가 있는 카드.
  비대칭 staggered grid 레이아웃. 카드 사이즈를 혼합."
- 각 Feature 카드 필수 요소:
  - Hover transform (scale 1.02 + border 색상 변화 + glow 강화)
  - 스크롤 진입시 spring physics 애니메이션 `{ type: "spring", stiffness: 200, damping: 25 }`
  - 최소 2개 비주얼 레이어 (아이콘/비주얼 + 텍스트 콘텐츠)

### Social Proof 섹션
- 기법: {concepts.md 항목 10의 Social Proof}
- InfiniteMovingCards인 경우: "수평 자동 스크롤 testimonial 카드.
  Glass-morphism 효과 (bg-white/5 backdrop-blur-md border-white/10).
  30s 루프, seamless를 위해 배열 2배 복제."
- NumberTicker인 경우: "큰 애니메이션 카운팅 숫자 (스크롤시 count-up).
  최소 3개 통계. 각 숫자가 stagger로 독립 애니메이션."
- AnimatedBeam인 경우: "데이터 흐름 또는 사용자 연결을 보여주는 노드 시각화."

### 모든 섹션 공통 규칙 (협상 불가)
- 애니메이션: 반드시 spring physics `{ type: "spring", stiffness: 200, damping: 25 }` 사용.
  금지: linear, ease-in-out, ease-in, ease-out easing.
- 깊이: 모든 섹션에 최소 2개 비주얼 레이어 (배경 효과 + 콘텐츠).
  예시: 그라디언트 bg + grid 패턴, blur 블롭 + 카드 콘텐츠, 파티클 + 텍스트.
- 비대칭: 최소 2개 섹션이 비중심, 비대칭 레이아웃.
- 호버: 모든 인터랙티브 요소에 transform 호버 (scale, glow, border-color 변화, gradient shift).
- 그레인: 모든 그라디언트 배경에 noise 오버레이 (opacity 0.015-0.03).
- 간격: 섹션 패딩 최소 py-32 (py-24 아님). Hero는 반드시 min-h-screen.
- 배경 장식: {concepts.md 항목 10의 배경 장식 — 예: SparklesCore, DotPattern, Meteors}

## 3. Constraints & Taste
- Next.js 15 App Router, TypeScript
- 이 페이지는 멀티페이지 앱의 **랜딩/진입 페이지**이다. 앱 기능 페이지(/{x}/app 등)로 이동하는 Link/Button을 반드시 포함하라.
- Tailwind CSS + shadcn/ui components (import from @/components/ui/*)
- Available shadcn: button, input, card, badge, avatar, separator
- Icons: lucide-react only
- **framer-motion**: 모든 애니메이션에 필수
  - Hero: spring physics로 fade-in + slide-up (자식 요소 stagger)
  - Feature cards: 스크롤 트리거 진입 (whileInView) with translate+fade (fade만 금지)
  - Stats: 스크롤시 count-up 애니메이션
  - Sections: spring으로 smooth reveal on viewport entry
- Color palette: {concepts.md Palette hex}
- Mode: {dark/light}
- Visual mood: {Palette Mood 설명}
- Visual assets (랜딩페이지를 시각적으로 풍부하게 만들기 위한 이미지 전략):
  - **Hero 배경**: CSS 그라디언트 (radial/linear with blur overlay) + grid/dot 패턴 + grain noise
  - **Feature 섹션 이미지**: research.md의 Unsplash URL 사용. 없으면 `https://picsum.photos/800/400?random={n}` 또는 CSS 목업
  - **App Preview / 목업**: 실제 앱 페이지(/{x}/app)의 Playwright 스크린샷을 캡처 후 사용하거나, CSS 브라우저 프레임 안에 앱 UI 재현
  - **Testimonial 아바타**: https://picsum.photos/40/40?random={n}
  - **Feature 아이콘**: lucide-react 아이콘을 그라디언트 배경 원 안에 배치
  - **신뢰 요소**: CSS 애니메이션 가상 브랜드 로고 마퀴 (animate-marquee)
  - **일러스트**: CSS-only 장식 요소 (blur 블롭, gradient orb, floating shapes)
- Typography: Inter or system font
  - Hero headline: text-5xl md:text-7xl font-bold
  - Sub text: text-xl text-muted-foreground
  - Section titles: text-3xl font-semibold
- NO database, NO authentication — pure static landing page
- Quality: Stripe.com / Vercel.com 수준 — 풀스크린 Hero, spring 스크롤 애니메이션, 넉넉한 여백(py-32+), 레이어드 배경, glass-morphism 네비게이션
```

### 실행 절차

1. **concepts.md의 페이지 구성을 참조하여 `createChat`을 호출하라**:
   - 각 프로토타입의 각 페이지에 대해 1회씩 createChat 호출
   - **랜딩페이지를 첫 번째로 생성**하고, 이후 앱 페이지들을 생성하라
   - 랜딩페이지 생성 시 랜딩 전용 템플릿 사용, 앱 페이지는 기존 템플릿 사용
   - 총 호출 = 프로토타입당 페이지 수 × 3
   - 최대 프로토타입당 3페이지 (v0 API 비용 관리)
   - 두 번째 이후 페이지 생성 시 `sendChatMessage`로 첫 페이지 코드를 컨텍스트로 전달하여 디자인 일관성 유지

2. **`getChat`으로 생성된 코드를 회수하라**:
   - 응답 메시지에서 ```tsx 코드 블록을 파싱하여 추출하라
   - 추출한 코드의 import 경로를 프로젝트 구조에 맞게 조정하라 (@/components/ui/*)

3. **파일에 기록하라** (concepts.md의 라우트 경로에 따라):
   - app/a/ 하위 ← Interface A 페이지들
   - app/b/ 하위 ← Interface B 페이지들
   - app/c/ 하위 ← Interface C 페이지들
   - app/page.tsx ← `/a`, `/b`, `/c` 링크만 있는 간단한 인덱스 (v0 불필요, 직접 작성)

4. **v0 코드가 빌드 에러를 일으키면**: `sendChatMessage`로 에러 메시지를 보내 수정 요청하라 (최대 2회)

> **v0 실패 시 Fallback (🆕 강화)** — v0 API가 3회 시도에도 동작하지 않는 경우에 한해:
> 1. 사용자에게 "v0 API 연결 실패. Fallback으로 Claude Code 직접 생성을 진행합니다." 안내
> 2. **Context7 MCP로 프리미엄 컴포넌트 코드 fetch**:
>    - `resolve-library-id("aceternity-ui")` → `query-docs("{concepts.md 항목 10의 컴포넌트명}")`
>    - `resolve-library-id("magic-ui")` → `query-docs("{concepts.md 항목 10의 컴포넌트명}")`
>    - 추출한 컴포넌트 소스코드를 `components/premium/` 디렉토리에 저장
> 3. research.md의 디자인 시스템(색상 hex, 타이포, 레이아웃 패턴)을 상세 프롬프트로 구성하라
> 4. `prototypes/references/`의 레퍼런스 스크린샷을 Read로 참조하라
> 5. 각 프로토타입: `components/premium/`에서 프리미엄 컴포넌트를 import하여 페이지 조립
>    — 위 랜딩 템플릿의 Visual Architecture 스펙을 따를 것
> 6. research.md hex 코드, 프리미엄 컴포넌트 사용, 안티패턴(§8) 준수 확인
>
> ⚠️ 이 fallback은 v0 완전 실패 시에만 사용 — v0가 동작하면 반드시 v0를 사용하라

> **CHECKPOINT**: 각 프로토타입의 모든 페이지 파일이 v0 생성 코드(또는 fallback 생성 코드)를 포함하는지 확인하라. 누락 시 Phase 5로 진행하지 마라.

---

## Phase 5: 컴포넌트 폴리싱 (21st-dev builder + refiner) — 🆕 3라운드 시스템

### Round 1: 랜딩페이지 폴리싱 (🆕 신규)

1. **각 프로토타입의 랜딩페이지** — `21st_magic_component_builder`를 호출하여 프리미엄 Hero 컴포넌트 생성 (총 3회):
   - 입력: "Build a {concepts.md 항목 10의 Hero 기법} hero section with {Palette hex} colors, spring animations, layered background"

2. **각 프로토타입의 랜딩페이지** — `21st_magic_component_refiner`로 전체 페이지 폴리시 (총 3회):
   - refiner 입력: 현재 랜딩 코드 + 아래 구체적 지시:
   ```
   Stripe/Vercel 수준으로 폴리시:
   1. 모든 그라디언트 배경에 grain texture (noise overlay 0.02 opacity) 추가
   2. 모든 framer-motion easing을 spring physics { type: "spring", stiffness: 200, damping: 25 }로 교체
   3. Feature 카드에 cursor-following spotlight 효과 추가 (마우스 따라가는 radial-gradient)
   4. 비대칭 레이아웃 확인 — 모든 것이 동일 컬럼에 중앙 정렬이면 bento/비대칭으로 재구성
   5. 스크롤시 미묘한 parallax 추가 (배경이 전경보다 느리게)
   6. 모든 hover에 transform + transition 확인 (scale, glow, border-color 변화)
   7. Hero는 반드시 min-h-screen + 최소 3개 배경 레이어
   ```
   - refiner 결과를 반영하여 파일 업데이트

### Round 2: 앱 페이지 폴리싱 (기존, 강화)

3. 각 프로토타입의 **메인 앱 페이지**에서 가장 핵심적인 UI 컴포넌트 1개를 선택하라 (예: task card, kanban column, stat widget)

4. **`21st_magic_component_builder`를 호출하여 고품질 버전 생성** — Round 1의 builder 결과가 앱 페이지에 이미 적용되지 않은 경우에만

5. **각 프로토타입의 메인 앱 페이지를 `21st_magic_component_refiner`에 전달하여 폴리싱** (총 3회):
   - refiner 입력: 현재 코드 + "micro-interaction 폴리시: 버튼 press scale(0.97), input focus glow ring, card hover spotlight, glass-morphism sidebar, 모든 transition에 spring physics"
   - refiner 결과를 반영하여 파일 업데이트

### Round 3: 교차 차별화 검증 (🆕 신규)

6. **3개 랜딩페이지를 나란히 비교**:
   - 3개 랜딩 파일을 모두 Read
   - 확인: 두 개가 같은 Hero 구조를 공유하는가? 같은 Feature 레이아웃 패턴? 같은 배경 장식?
   - 두 프로토타입이 구조적으로 너무 유사하면:
     - 덜 차별화된 것에 구체적 재구성 지시와 함께 `21st_magic_component_refiner` 호출 (최대 3회 추가)
     - 예: "이 랜딩은 프로토타입 A와 같은 bento grid를 사용함. Feature를 vertical alternating layout (이미지 좌/텍스트 우, 그 다음 텍스트 좌/이미지 우)으로 재구성하라."

> **CHECKPOINT**: Round 1 (3 builder + 3 refiner) + Round 2 (3 refiner) + Round 3 (0-3 refiner) = 최소 9회, 최대 12회 호출 확인. 3개 랜딩이 모두 구조적으로 구별되어야 한다.

---

## Phase 6: 빌드 검증 + 통합

1. `npm run build` 실행

2. **shadcn v4 호환성 주의사항** (빌드 에러 방지):
   - `DialogTrigger`/`DialogClose`: `asChild` 대신 `render={<Component />}` 사용
   - `Select onValueChange`: `string | null` 타입 — null 체크 필요
   - `Checkbox`: `@base-ui/react` 기반 — `checked` prop 대신 `defaultChecked` 확인

3. 에러 발생 시 v0에 `sendChatMessage`로 수정 요청하라 (최대 3회)

4. **🆕 프리미엄 인프라 검증**:
   - `components/premium/` 디렉토리 존재 확인 (비어있어도 OK — fallback용)
   - `globals.css`에 프리미엄 keyframes (aurora, marquee, shimmer) 포함 확인
   - `lib/utils.ts`에 `generateNoisePattern` 함수 포함 확인

5. 각 프로토타입에 README.md 포함 (prototypes/interface-{a,b,c}/README.md):
   - 디자인 컨셉 설명
   - 스크린 구성 설명 (멀티페이지 구조 포함)
   - 사용된 프리미엄 컴포넌트 (concepts.md 항목 10에서)
   - 장단점

> **CHECKPOINT**: `npm run build` 성공 AND 프리미엄 인프라 확인. 빌드 실패 시 Phase 7로 진행하지 마라.

---

## Phase 7: 시각 검증 (Playwright) — 🆕 프리미엄 품질 스코어카드

1. 개발 서버를 시작하라:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   서버 시작까지 3초 대기

2. **각 프로토타입의 모든 페이지를 스크린샷하라**:
   - concepts.md의 페이지 구성을 참조하여 각 프로토타입의 모든 라우트를 스크린샷
   - Playwright `browser_navigate` → `browser_take_screenshot` 수행:
     - `http://localhost:3000/a/...` (Interface A 전체 페이지)
     - `http://localhost:3000/b/...` (Interface B 전체 페이지)
     - `http://localhost:3000/c/...` (Interface C 전체 페이지)

3. **🆕 스크롤 기반 스크린샷** — 각 랜딩페이지에 대해:
   - 5개 스크롤 위치에서 스크린샷: 0%, 25%, 50%, 75%, 100%
   - Playwright `browser_evaluate`로 `window.scrollTo(0, document.body.scrollHeight * {pct})` 실행
   - 각 위치에서 `browser_take_screenshot`
   - 다른 뷰포트 위치에서 스크롤 애니메이션이 정상 트리거되는지 확인

4. **각 스크린샷을 Read로 분석하라** — Claude 멀티모달 비전을 사용하여:
   - 빈 페이지, 에러 메시지, 깨진 레이아웃 여부 확인
   - spacing/alignment 이슈 확인
   - 색상 대비(contrast) 문제 확인
   - 텍스트 가독성 확인
   - research.md의 디자인 시스템(색상 팔레트, 레이아웃 패턴)이 실제로 반영되었는지 확인
   - **비주얼 차별화**: 3개 프로토타입이 서로 다른 색상/분위기인지 확인.
     두 프로토타입이 너무 비슷하면 치명적 이슈로 플래그하고 색상 변수를 수정하라.
   - **비주얼 에셋**: 텍스트+아이콘만 있고 이미지/그라디언트/패턴이 없으면
     이슈로 플래그하고 추가하라.
   - **페이지 간 네비게이션**: 보조 페이지로의 Link가 작동하는지 확인
   - **랜딩페이지 검증**:
     - Hero 섹션이 뷰포트를 채우는지 (full-screen hero)
     - CTA 버튼이 명확하고 앱 페이지로 연결되는지
     - 스크롤 애니메이션이 자연스러운지 (Playwright에서 scroll 후 스크린샷)
     - 섹션 간 여백이 충분한지 (py-32 이상)
     - 랜딩과 앱 페이지 간 비주얼 일관성 (같은 팔레트)
     - **이미지/비주얼 풍부함**: 텍스트+아이콘만 있으면 이슈 — 최소 Hero 배경 그라디언트, App Preview 목업, Feature 이미지 중 2개 이상 시각 요소가 있어야 함
     - **App Preview 목업**: 가능하면 Playwright로 앱 페이지 스크린샷을 캡처 후 랜딩의 App Preview 섹션에 활용

5. **🆕 프리미엄 품질 스코어카드** (프로토타입별 평가, 결과 기록):

   ```
   ### 프리미엄 품질 스코어카드 — 프로토타입 {A/B/C}

   **구조 (전체 통과 필수)**
   [ ] Hero가 min-h-screen
   [ ] 최소 1개 섹션이 비대칭/bento 레이아웃 (3-equal-column grid 아님)
   [ ] 섹션 간격 py-32 이상
   [ ] 플로팅/glass-morphism 네비게이션 존재

   **비주얼 깊이 (5개 중 4개 통과)**
   [ ] Hero에 레이어드 배경 (gradient + pattern + particles/decoration)
   [ ] 그라디언트 섹션에 grain/noise 텍스처 존재
   [ ] 카드 hover spotlight/glow 효과 작동
   [ ] 최소 1개 섹션에 parallax 또는 scroll-reveal 효과
   [ ] 배경 장식 요소 존재 (blobs, beams, dots, meteors)

   **애니메이션 (4개 중 3개 통과)**
   [ ] Hero 헤드라인에 텍스트 애니메이션 (generate, typing, blur-in)
   [ ] Feature 카드에 스크롤 진입 애니메이션 (translate+fade, fade만 아닌)
   [ ] Stats에 count-up 애니메이션
   [ ] 상시 ambient 애니메이션 최소 1개 (particles, aurora, floating shapes, marquee)

   **차별화 (전체 통과 필수)**
   [ ] 3개 프로토타입 Hero 기법이 모두 다름
   [ ] 3개 프로토타입 Feature 레이아웃이 모두 다름
   [ ] 배경 패턴 공유 없음
   [ ] 색상 팔레트 명확히 구분 (다른 hue family)
   ```

   **실패 항목 2개 초과시**: 타겟 수정 라운드 — 구체적 실패 항목 코드 수정 → 재스크린샷 → 재평가. 최대 2회 반복.

6. **발견된 이슈를 코드에서 수정하라**:
   - 리스트업한 이슈를 우선순위 순으로 수정 (스코어카드 실패 항목 우선, 그 다음 비주얼 이슈)
   - 수정 후 해당 페이지를 재스크린샷 → Read로 재분석
   - 최대 2회 반복 (총 스크린샷: 초기 + 수정 후 최대 2라운드)

7. **`prototypes/references/`의 레퍼런스 스크린샷과 현재 프로토타입 스크린샷을 비교하라**:
   - Stripe/Vercel/Linear 레퍼런스 대비 명백히 부족한 시각 요소가 있으면 추가 수정

> **CHECKPOINT**: 모든 스크린샷이 정상 UI를 표시하고, 프리미엄 품질 스코어카드가 3개 프로토타입 모두 통과 (최대 2개 실패 허용), 3개 프로토타입이 시각적+구조적으로 차별화되어 있으며, 시각 분석에서 치명적 이슈가 없는지 확인하라.

---

## 최종 출력

1. 사용자에게 안내:
   "브라우저에서 3가지 프로토타입을 확인하세요:
    - http://localhost:3000/a — Interface A ({컨셉명}): {페이지 목록}
    - http://localhost:3000/b — Interface B ({컨셉명}): {페이지 목록}
    - http://localhost:3000/c — Interface C ({컨셉명}): {페이지 목록}
   확인 후 선택해주세요."

2. 3가지 프로토타입을 표로 요약:
   | 프로토타입 | 진입 URL | 컨셉 | 팔레트 | Hero 기법 | Feature 레이아웃 | 페이지 구성 | 장점 | 단점 |
   사용자에게 선택을 요청하고, 선택 후:
   - 개발 서버 종료
   - "선택 완료. 다음 단계: /setup-versions {a|b|c} 를 실행하세요."

최종 디렉토리 구조:
```
prototypes/
├── research.md               ← Phase 1 (3개 팔레트 + 랜딩 패턴 + §7 프리미엄 매핑 + §8 안티패턴)
├── concepts.md               ← Phase 2 (컨셉 + 항목 10 프리미엄 컴포넌트 선택)
├── references/
│   ├── ref-{app1}.png
│   ├── ref-{app2}.png
│   ├── ref-{stripe}.png       ← 프리미엄 레퍼런스
│   └── ref-{landing-ref}.png  ← 랜딩 레퍼런스 스크린샷
├── _app/
│   ├── app/
│   │   ├── globals.css        ← 프리미엄 유틸리티 CSS 포함 (aurora, grain, grid, marquee, shimmer)
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← /a, /b, /c 링크만 있는 간단한 인덱스
│   │   ├── a/
│   │   │   ├── page.tsx        ← 랜딩페이지 (프리미엄 Hero + CTA → /a/app)
│   │   │   ├── app/page.tsx    ← 앱 기능 페이지 (glass-morphism + spotlight 카드)
│   │   │   └── {route}/page.tsx
│   │   ├── b/
│   │   │   ├── page.tsx        ← 랜딩페이지 (다른 Hero 기법)
│   │   │   ├── app/page.tsx
│   │   │   └── {route}/page.tsx
│   │   └── c/
│   │       ├── page.tsx        ← 랜딩페이지 (다른 Hero 기법)
│   │       ├── app/page.tsx
│   │       └── {route}/page.tsx
│   ├── components/
│   │   ├── ui/               ← shadcn/ui 컴포넌트
│   │   └── premium/          ← Aceternity/Magic UI 컴포넌트 코드 (fallback용)
│   └── lib/utils.ts          ← cn() + generateNoisePattern()
└── interface-{a,b,c}/
    └── README.md
```
