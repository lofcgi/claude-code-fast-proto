# AI Dubbing — AI 더빙 웹 서비스

> 음성/영상 파일을 업로드하면 AI가 음성 인식 → 번역 → 더빙까지 자동으로 처리하는 웹 서비스.
>
> **배포**: [project-nine-nu-52.vercel.app](https://project-nine-nu-52.vercel.app)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with AI Agent Pipeline](https://img.shields.io/badge/Built_with-AI_Agent_Pipeline-blueviolet)](../)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **음성 인식 (STT)** | 업로드된 오디오/비디오에서 텍스트 추출 |
| **다국어 번역** | 인식된 텍스트를 대상 언어로 번역 |
| **음성 합성 (TTS)** | ElevenLabs API로 자연스러운 더빙 음성 생성 |
| **결과 다운로드** | 더빙된 오디오 파일 다운로드 |
| **Google OAuth** | 화이트리스트 기반 접근 제어 |

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, TypeScript) |
| 인증 | Auth.js v5 (NextAuth) + Google OAuth |
| 데이터베이스 | Turso (libSQL) + Drizzle ORM |
| UI | shadcn/ui + Tailwind CSS 4 |
| 오디오 처리 | FFmpeg.wasm (브라우저 내 미디어 처리) |
| AI API | ElevenLabs (STT + TTS) |
| 애니메이션 | Framer Motion |
| 배포 | Vercel |

---

## 로컬 실행 방법

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repo-url>
cd _example/project
npm install
```

### 2. 환경변수 설정

```bash
cp .env.example .env.local
```

| 환경변수 | 발급처 |
|----------|--------|
| `AUTH_SECRET` | `npx auth secret`으로 자동 생성 |
| `GOOGLE_CLIENT_ID` | [Google Cloud Console](https://console.cloud.google.com/) → OAuth 2.0 |
| `GOOGLE_CLIENT_SECRET` | 위와 동일 |
| `TURSO_DATABASE_URL` | [Turso Dashboard](https://turso.tech/) |
| `TURSO_AUTH_TOKEN` | Turso Dashboard → Database → Tokens |
| `ELEVENLABS_API_KEY` | [ElevenLabs](https://elevenlabs.io/) |

### 3. 데이터베이스 마이그레이션 + 실행

```bash
npx drizzle-kit push
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

---

## 코딩 에이전트 활용

이 프로젝트는 **[AI Agent Pipeline](../)**과 **Claude Code**로 개발되었습니다.
코드를 직접 작성한 것이 아니라, AI 에이전트에게 슬래시 커맨드로 지시하여 프로토타입부터 배포까지 자동화했습니다.

> 파이프라인의 한국어 상세 가이드: **[kor/README.md](../kor/README.md)**
> MCP 서버 설정 가이드: **[kor/docs/mcp-guide.md](../kor/docs/mcp-guide.md)**

### 에이전트 파이프라인

```
input/url.md (레퍼런스 URL)
  └→ /prototype ─── Firecrawl 스크래핑 + 브랜딩 추출 + 섹션별 클론
       ├→ analysis/  (PRD, 요구사항, 수락 기준 — 자동 생성)
       └→ prototypes/a, prototypes/b  (UI 프로토타입 2종)
            └→ /implement a ─── 풀스택 변환 + Ralph Loop (빌드→리뷰→수정)
                 └→ project/  (프로덕션 레디 앱)
                      └→ /ship ─── 환경변수 검증 + Vercel 배포
```

### 에이전트가 사용한 MCP 도구

| MCP 서버 | 에이전트가 한 일 |
|----------|-----------------|
| **Firecrawl** | 레퍼런스 URL 스크래핑 — 콘텐츠, 레이아웃, 브랜딩 추출 |
| **Playwright** | 스크린샷 캡처 → 레퍼런스와 비교 → 차이 수정 루프 |
| **21st-dev** | 프로덕션 품질 UI 컴포넌트 소싱 |
| **Unsplash** | 실제 이미지 확보 (아바타, 히어로, 배경) |
| **Context7** | Next.js 16, Auth.js v5 등 최신 API 문서 조회 |

### 노하우

1. **`input/` 폴더 활용** — 레퍼런스 URL(`url.md`)과 요구사항 PDF를 넣으면 `/prototype`이 자동 분석합니다. PRD를 직접 작성할 필요가 없습니다.

2. **Ralph Loop** — `/implement`가 코드 생성 후 빌드 → 타입체크 → 셀프리뷰 → 수정을 자동 반복합니다 (최대 3회). 빌드 에러와 기능 누락을 에이전트가 스스로 발견하고 수정합니다.

3. **프로토타입 비교** — `/prototype`이 a/b 두 가지를 만들어주므로, 브라우저에서 비교 후 더 나은 쪽을 `/implement`에 전달합니다.

4. **Phase 간 `/clear`** — `/prototype`과 `/implement` 사이에 `/clear`로 컨텍스트를 리셋하세요. `analysis/`와 `plan.md`가 에이전트 간 정보를 전달하는 핸드오프 역할을 합니다.

---

## 프로젝트 구조

```
_example/
├── input/              # 레퍼런스 URL + 과제 PDF
├── analysis/           # /prototype이 생성한 PRD, 요구사항, 수락 기준
├── prototypes/         # /prototype이 생성한 UI 프로토타입 (a/, b/)
├── project/            # /implement가 생성한 풀스택 앱
│   ├── src/app/        # App Router 페이지 + API 라우트
│   ├── src/components/ # React 컴포넌트
│   ├── src/db/         # Drizzle 스키마 + 마이그레이션
│   └── src/lib/        # 유틸리티 + AI API 래퍼
├── .claude/commands/   # 파이프라인 슬래시 커맨드 (에이전트 스킬)
└── .mcp.json           # MCP 서버 설정
```

## 라이선스

MIT
