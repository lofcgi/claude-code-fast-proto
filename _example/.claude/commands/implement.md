---
description: PRD + 프로토타입 기반 적응형 풀스택 구현 — Context7(최신 문서) + Playwright(Ralph Loop 검증)
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, "mcp:context7:*", "mcp:playwright:*", "mcp:sequential-thinking:*"]
---

당신은 풀스택 웹 애플리케이션을 구현하는 시니어 개발자입니다.
PRD와 프로토타입을 기반으로, **적응형**으로 기술 스택을 감지하고 구현합니다.

**선택된 프로토타입**: `prototypes/$ARGUMENTS/`
**작업 디렉토리**: 루트에서 실행 → `project/`에 앱 생성

---

## Phase 0: 프로젝트 스캐폴딩 + 컨텍스트 로딩

> 목표: project/ 디렉토리 생성 + PRD에서 필요한 모든 기술/API 키 감지

### Step 0.1 — project/ 디렉토리 준비

1. `mkdir -p project/.claude/commands`
2. `templates/CLAUDE.md.template` → `project/CLAUDE.md`로 복사 (플레이스홀더 채우기)
3. `templates/commands/build-check.md.template` → `project/.claude/commands/build-check.md`
4. `templates/commands/self-review.md.template` → `project/.claude/commands/self-review.md`
5. `templates/commands/iterate.md.template` → `project/.claude/commands/iterate.md`

### Step 0.2 — analysis/ 전체 읽기

필수 읽기:
- `analysis/prd.md`
- `analysis/requirements.json`
- `analysis/tech-constraints.md`
- `analysis/acceptance-criteria.md`

### Step 0.3 — 프로토타입 읽기

- `prototypes/$ARGUMENTS/` 디렉토리의 구조와 주요 파일 확인
- `prototypes/$ARGUMENTS/src/lib/design-tokens.ts` 읽기
- `prototypes/$ARGUMENTS/package.json` 읽기 (의존성 확인)

### Step 0.4 — 기술 스택 파싱

requirements.json에서:
- `tech_stack.framework` → 프로젝트 init 방법 결정
- `tech_stack.db` → DB 클라이언트 + ORM + env vars
- `tech_stack.auth` → 인증 패키지 + env vars
- `tech_stack.ui` → UI 라이브러리
- `tech_stack.apis[]` → 외부 API별 SDK + env vars
- `tech_stack.deploy` → 배포 제약사항

### Step 0.5 — 필요 환경변수 동적 감지

Step 0.4에서 파싱한 tech_stack + prd.md를 기반으로, 이 프로젝트에 필요한 환경변수를 추론:
- 각 기술/서비스가 요구하는 env vars를 학습 지식으로 판단
- 확실하지 않으면 Context7으로 해당 라이브러리 문서 조회하여 확인
- 감지된 변수마다 발급처(대시보드 URL)와 설정 방법도 함께 정리

### Step 0.6 — .env.example 생성

`project/.env.example` 파일 생성:
- 감지된 모든 env var 키를 나열
- 각 키 위에 주석으로 발급처(대시보드 URL)와 간단한 발급 방법 기재
- AUTH_SECRET 같이 자동 생성 가능한 값은 생성 명령어 기재 (예: `npx auth secret`)

### Step 0.7 — .env.local 체크

1. `project/.env.local` 파일 존재 여부 확인
2. 없으면:
   - `.env.example`을 `.env.local`로 복사
   - "project/.env.local 파일을 생성했습니다. 값을 채워주세요" 안내
   - **중단**
3. 있으면 각 필수 키에 값이 채워져 있는지 확인
4. 미설정 키가 있으면:
   - "project/.env.example을 참고하여 project/.env.local에 값을 채워주세요" 안내
   - 미설정 키 목록 + 각 키의 발급처 요약 출력
   - **중단**
5. 모든 키에 값이 있으면 → Phase 1 자동 진행

---

## Phase 1: 프로젝트 초기화

> 목표: project/ 안에 빌드 가능한 스캐폴드
> 컨텍스트 예산: ~15%

### Step 1.1 — Context7 최신 문서 조회

requirements.json의 tech_stack 각 기술에 대해:
1. `resolve-library-id(기술명)`
2. `query-docs("setup configuration typescript 2024 2025")`

**중요**: 아래 Phase 1-2의 코드 패턴은 **fallback 참고용**이다.
Context7이 다른 패턴을 반환하면 **Context7 기준으로 조정**.

### Step 1.1.1 — 외부 API 문서 필수 조회

tech_stack.apis[] 배열의 **각 API별로**:
1. `resolve-library-id(API명)`
2. `query-docs("endpoint authentication request response error codes")`
3. 다음 항목을 반드시 추출하여 메모:
   - 사용할 엔드포인트 URL
   - 인증 방식 (헤더명, 토큰 형식)
   - 필수 파라미터 및 타입
   - 유효한 리소스 ID 조회 방법 (모델 목록, 음성 목록 등 list 엔드포인트)
   - 요청/응답 바디 크기 제한
   - 에러 코드 및 의미

Context7에서 해당 API를 찾을 수 없으면 공식 문서 URL을 기록하고,
코드 작성 시 반드시 해당 문서를 참조했음을 주석으로 남길 것.

### Step 1.2 — 프로젝트 초기화

`cd project/` 후:

| tech_stack.framework | init 명령어 |
|---|---|
| Next.js 15 (기본) | `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm` |
| Next.js 14 | 위와 동일, `@14` 지정 |
| Vite + React | `npm create vite@latest . -- --template react-ts` + tailwind 설정 |

기본값: requirements.json에 없으면 Next.js 15.

### Step 1.3 — 패키지 설치

requirements.json 기반 **동적 패키지 리스트** 생성:

1. `tech_stack.auth` → 인증 패키지 (next-auth@beta | @clerk/nextjs | @supabase/ssr 등)
2. `tech_stack.db` → DB 패키지 (@libsql/client + drizzle-orm | @prisma/client | @supabase/supabase-js 등)
3. `tech_stack.ui` → UI 패키지 (shadcn 컴포넌트 init)
4. `tech_stack.apis[]` → 각 API SDK (stripe | openai | resend 등)
5. `prototypes/$ARGUMENTS/package.json` → 애니메이션 등 의존성 (framer-motion, clsx, tailwind-merge 등)
6. 유틸리티: sonner, lucide-react (기본 포함)

각 패키지 설치 전 Context7으로 최신 버전/설치 방법 확인.

### Step 1.4 — 디자인 토큰 마이그레이션

1. `prototypes/$ARGUMENTS/src/lib/design-tokens.ts` 읽기
2. `project/src/lib/design-tokens.ts`로 복사 + 적응
3. 색상 → `tailwind.config.ts`의 `theme.extend.colors`에도 반영
4. 폰트 → `next/font` (또는 해당 프레임워크) 설정
5. 모션 프리셋 → Framer Motion 설정 (프로토타입에서 사용한 경우)

### Step 1.5 — .env.local 존재 확인

`.env.example`은 Phase 0에서 이미 생성됨.
- `project/.env.local` 존재 + 모든 키에 값이 채워져 있는지 재확인
- `.gitignore`에 `.env.local` 포함 확인

### Step 1.6 — 빌드 체크 (Gate 1)

```bash
cd project/ && npm run build
```
실패 시 수정 후 재시도. 통과 후 Phase 2.

---

## Phase 2: 파운데이션 (인증 + DB + 레이아웃)

> 목표: 인증, DB, 기본 레이아웃이 작동하는 상태
> 컨텍스트 예산: ~25%

### Step 2.1 — Context7 심층 조회

인증 + DB 각각에 대해 **setup뿐 아니라 통합 패턴**까지 조회:
- 세션 관리 패턴
- DB 마이그레이션 패턴
- 미들웨어 패턴
- 에러 핸들링 패턴

### Step 2.2 — 인증 설정 (적응형)

tech_stack.auth에 따라 분기:

**Auth.js v5** (fallback 참고):
- `src/auth.ts` (provider 설정)
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/middleware.ts`

**Clerk**:
- `src/middleware.ts` (clerkMiddleware)
- layout.tsx에 ClerkProvider

**Supabase Auth**:
- `src/lib/supabase/server.ts` (createClient)
- `src/lib/supabase/client.ts`
- `src/middleware.ts` (updateSession)

→ Context7에서 조회한 최신 패턴을 우선 사용
→ 위는 fallback 참고용

### Step 2.3 — 데이터베이스 설정 (적응형)

tech_stack.db에 따라 분기:

**Turso + Drizzle** (fallback 참고):
- `src/lib/db.ts` (createClient)
- `drizzle.config.ts`
- `src/db/schema.ts` (requirements.json features 기반 스키마)
- `npx drizzle-kit push`

**Supabase**:
- supabase CLI 또는 대시보드에서 테이블 생성
- 또는 migration SQL

**Prisma**:
- `npx prisma init`
- `schema.prisma` (features 기반)
- `npx prisma db push`

→ 스키마 설계: requirements.json의 features에서 필요한 테이블/컬럼 추론
→ 마이그레이션 실행 + 연결 확인

### Step 2.4 — 기본 레이아웃

1. `prototypes/$ARGUMENTS/src/app/layout.tsx` 읽기
2. 네비게이션 구조 포팅 (기능 앱에 맞게 조정)
3. 디자인 토큰 적용 (색상, 폰트)
4. 인증 상태에 따른 UI 분기 (로그인/로그아웃)

### Step 2.5 — 미들웨어 + 라우트 보호

인증 전략에 맞는 라우트 보호 설정.
공개 라우트와 보호 라우트 분리.

### Step 2.6 — 빌드 + Playwright 스모크 테스트 (Gate 2)

```bash
cd project/ && npm run build
```

**Playwright MCP 사용 가능 시:**
1. `cd project/ && PORT=3000 npm run dev &`
2. 3초 대기 후 `browser_navigate` → `http://localhost:3000`
3. 페이지 로드 확인 (에러 없음)
4. `browser_take_screenshot` → 참고용 저장
5. dev 서버 종료: `lsof -ti:3000 | xargs kill 2>/dev/null`

**Playwright 불가 시:** 빌드 성공만으로 통과.

---

## Phase 3: 기능 구현 (Feature-by-Feature Loop)

> 목표: 모든 must-have 기능을 하나씩 구현 + 빌드 검증
> 컨텍스트 예산: ~35%

### Step 3.0 — 기능 순서 결정

requirements.json의 features를 정렬:
1. **우선순위**: must → should → could
2. **의존성**: 인증 필요 기능은 auth 후, DB 읽기/쓰기는 스키마 후
3. **복잡도**: 단순 → 복잡 (모멘텀 확보)

Sequential-thinking MCP 사용 가능 시 활용하여 최적 순서 결정.

### Step 3.N — 각 기능 구현 미니루프

각 기능에 대해 반복:

```
Feature FR-XXX: [제목] (priority: must/should/could)

1. acceptance-criteria.md에서 해당 기능의 AC 읽기

2. 외부 API 사용 기능이면:
   a. Step 1.1.1에서 정리한 API 메모 참조
   b. tech-constraints.md에서 rate limit, 크기 제한 확인
   c. API route 코드 최상단에 출처 주석 블록 작성:
      // API: [서비스명]
      // Endpoint: [URL] (Context7 또는 공식문서 확인)
      // Auth: [인증 방식]
   d. **하드코딩 금지**: 리소스 ID (모델, 음성 등)는 list 엔드포인트로 동적 조회하거나 환경변수로 분리
   e. 에러 핸들링: API 문서의 에러 코드별 분기 처리

3. API route(s) 생성:
   - 인증 체크 패턴 적용 (Phase 2에서 설정한 방식)
   - 입력 검증
   - 에러 핸들링 (try-catch + 적절한 HTTP status)
   - tech-constraints.md 제약사항 반영

4. UI 컴포넌트 생성:
   - prototypes/$ARGUMENTS/ 디자인 참조
   - 디자인 토큰 사용 (하드코딩 hex 금지)
   - 로딩 상태, 에러 상태, 빈 상태 처리
   - 서버 컴포넌트 우선, 필요 시만 "use client"

5. npm run build — 실패 시 수정

6. 다음 기능으로 진행
```

### 복잡 기능 특수 처리

| 기능 유형 | 특수 고려사항 |
|---|---|
| 파일 업로드 | Next.js API route 기본 body 제한 **1MB** → `next.config`에서 증가 필수. Vercel 4.5MB 제한 → presigned URL 패턴 권장 |
| 결제 (Stripe) | 웹훅 핸들러 + 멱등성 키 + 테스트 모드 |
| AI API 호출 | 스트리밍 응답 (SSE) + 타임아웃 핸들링 |
| 실시간 기능 | SSE 또는 polling 패턴 (Vercel serverless 제약) |
| 이메일 발송 | API route에서만 (서버 사이드), 에러 시 graceful fallback |

### should/could 기능 처리

must-have 전체 완료 후:
- **should**: 시간이 허용되면 구현
- **could**: 스킵 또는 스텁만 생성

---

## Phase 4: 시각적 + 기능적 검증 (Ralph Loop)

> 목표: 프로토타입과 시각적 일치 + 모든 기능 실제 동작 확인
> 컨텍스트 예산: ~15%

**Playwright MCP 필수. 불가 시 Phase 4 전체 스킵 → Phase 5로.**

### Step 4.1 — dev 서버 시작
```bash
cd project/ && PORT=3000 npm run dev &
```
3초 대기 후 연결 확인.

### Step 4.2 — 스크린샷 캡처

Playwright MCP로:
- 메인 페이지 (전체)
- 각 주요 라우트
- 로그인/로그아웃 상태 (가능한 경우)

### Step 4.3 — 프로토타입 대비 시각 비교 (Claude Vision)

비교 항목:
- 레이아웃 구조
- 색상 팔레트 일치
- 타이포그래피
- 간격/여백
- 컴포넌트 스타일 충실도

### Step 4.4-4.5 — 수정 반복 (최대 3회)

TOP 3 시각 차이 → 수정 → 재캡처 → 재비교.

### Step 4.6 — 핵심 기능 End-to-End 검증

requirements.json의 **must-have 기능 각각**에 대해:

1. Playwright로 해당 기능의 전체 사용자 플로우 실행:
   - 입력 → 처리 대기 → 결과 확인까지 완주
   - 외부 API 연동 기능은 실제 API 호출까지 수행 (테스트 데이터 사용)

2. 결과 화면 스크린샷 캡처 + 다음 항목 검증:
   - 로딩/진행 상태가 실제 처리 과정을 반영하는가 (가짜 타이머나 하드코딩 없는지)
   - 결과 데이터가 화면에 정상 표시되는가
   - 인터랙티브 요소 (재생, 다운로드, 토글 등)가 실제 동작하는가

3. 발견된 문제 → 즉시 수정 → 재실행으로 확인 (최대 3회 반복)

**검증 불가 기능** (OAuth 로그인 필요 등): 스킵 사유를 명시하고 수동 테스트 체크리스트 생성

### Step 4.7 — dev 서버 종료
```bash
lsof -ti:3000 | xargs kill 2>/dev/null
```

---

## Phase 5: Quality Gates + 핸드오프

> 목표: 모든 품질 기준 통과 + 자동 다음 단계

### Gate 1: 빌드
```bash
cd project/ && npm run build        # 0 에러
cd project/ && npx tsc --noEmit     # 0 타입 에러
```

### Gate 2: 환경변수 완전성
- [ ] 코드의 모든 `process.env.*` → `.env.example`에 나열 확인
- [ ] `.env.local`이 `.gitignore`에 포함 확인
- [ ] 클라이언트 코드에 서버 전용 키 노출 없음 확인 (`NEXT_PUBLIC_` 접두사 규칙)

### Gate 3: 프로토타입 반영
- [ ] 프로토타입의 색상 팔레트가 앱에 반영됨
- [ ] 메인 레이아웃이 프로토타입 구조를 따름

### Gate 4: PRD 준수 검증

requirements.json + prd.md를 다시 읽고, **각 must-have 기능**에 대해:

- [ ] **입출력 일치**: PRD에 명시된 입력 형식과 출력 형식이 모두 구현되었는가
  - 예: "오디오/비디오 입력 → 오디오/비디오 출력"이면 양쪽 모두 동작해야 함
- [ ] **API 엔드포인트 완전성**: 각 API route가 PRD의 모든 케이스를 처리하는가
  - 예: 비디오 입력 시 비디오 결과 반환, 오디오 입력 시 오디오 결과 반환
- [ ] **UI 결과 표시**: 모든 출력 형식에 대응하는 UI가 존재하는가
  - 예: 비디오 결과 → 비디오 플레이어, 오디오 결과 → 오디오 플레이어
- [ ] **다운로드 형식**: 결과물 다운로드가 올바른 형식으로 제공되는가

불일치 발견 시 → 즉시 수정 후 Gate 재검증

### Gate 5: 보안
- [ ] 하드코딩된 API 키 없음
- [ ] 서버 전용 키가 클라이언트에 노출 안 됨
- [ ] 입력 검증 존재

### Gate 6: 외부 API 연결 검증 (tech_stack.apis[] 존재 시)
- [ ] 각 API별 read-only 엔드포인트 1회 호출 (예: list 계열 API)
- [ ] 200 응답 + 응답 구조가 코드의 타입 정의와 일치 확인
- [ ] 실패 시: .env.local 값 + 엔드포인트 URL + 인증 헤더 재검토

모든 Gate 통과 후 /build-check를 자동 실행하세요.
