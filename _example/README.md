# AI Dubbing — AI 더빙 웹 서비스

음성/영상 파일을 업로드하면 AI가 자동으로 음성을 인식(STT)하고, 원하는 언어로 번역한 뒤, 자연스러운 음성으로 더빙(TTS)하여 다운로드할 수 있는 웹 서비스입니다.

**배포 URL**: https://project-nine-nu-52.vercel.app

## 주요 기능

- **음성 인식 (STT)**: 업로드된 오디오/비디오에서 음성을 텍스트로 변환
- **다국어 번역**: 인식된 텍스트를 대상 언어로 번역
- **음성 합성 (TTS)**: 번역된 텍스트를 ElevenLabs API로 자연스러운 음성 생성
- **결과 다운로드**: 더빙된 오디오 파일을 다운로드
- **Google OAuth 로그인**: 화이트리스트 기반 접근 제어

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

## 로컬 실행 방법

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repo-url>
cd _example/project
npm install
```

### 2. 환경변수 설정

`.env.example`을 `.env.local`로 복사하고 값을 채워주세요:

```bash
cp .env.example .env.local
```

필요한 환경변수:

| 환경변수 | 발급처 |
|----------|--------|
| `AUTH_SECRET` | `npx auth secret`으로 자동 생성 |
| `GOOGLE_CLIENT_ID` | [Google Cloud Console](https://console.cloud.google.com/) → OAuth 2.0 자격증명 |
| `GOOGLE_CLIENT_SECRET` | 위와 동일 |
| `TURSO_DATABASE_URL` | [Turso Dashboard](https://turso.tech/) |
| `TURSO_AUTH_TOKEN` | Turso Dashboard → Database → Tokens |
| `ELEVENLABS_API_KEY` | [ElevenLabs](https://elevenlabs.io/) |

### 3. 데이터베이스 마이그레이션

```bash
npx drizzle-kit push
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 코딩 에이전트 활용

이 프로젝트는 **AI Agent Pipeline**과 **Claude Code**를 사용하여 개발되었습니다.

### 사용한 도구

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) — AI 코딩 에이전트
- [AI Agent Pipeline](../) — 프로토타입 → 구현 → 배포 자동화 파이프라인

### 개발 흐름

```
1. input/에 레퍼런스 URL + 과제 PDF 배치
2. /prototype  → 레퍼런스 사이트 분석 + 프로토타입 2종 자동 생성
3. /implement a → 선택한 프로토타입 기반 풀스택 앱 자동 구현
   └→ build-check → self-review → iterate (Ralph Loop, 최대 3회)
4. /ship       → 환경변수 확인 + Vercel 배포
```

### 노하우

1. **input/ 폴더 활용**: 레퍼런스 URL(`url.md`)과 요구사항 PDF를 `input/`에 넣으면 `/prototype`이 자동으로 읽어서 분석합니다. PRD를 직접 작성할 필요가 없습니다.

2. **Ralph Loop으로 품질 보장**: `/implement`가 코드를 생성한 뒤 자동으로 build-check → self-review → iterate를 반복합니다. 빌드 에러와 기능 누락을 에이전트가 스스로 발견하고 수정합니다.

3. **MCP 서버 활용**: Firecrawl(URL 분석), Playwright(스크린샷 비교), Context7(최신 문서 참조) 등 MCP 서버를 연결하면 에이전트의 정보 접근 범위가 넓어져 결과물 품질이 올라갑니다.

4. **프로토타입 비교 선택**: `/prototype`이 a/b 두 가지를 만들어주므로, 직접 브라우저에서 비교하고 더 나은 쪽을 `/implement`에 전달합니다.

## 프로젝트 구조

```
_example/
├── input/              # 레퍼런스 URL + 과제 PDF
├── analysis/           # 자동 생성된 PRD, 요구사항, 수용기준
├── prototypes/         # 자동 생성된 UI 프로토타입 (a/, b/)
├── project/            # 구현된 풀스택 앱 (Next.js)
│   ├── src/app/        # App Router 페이지
│   ├── src/components/ # React 컴포넌트
│   ├── src/db/         # Drizzle 스키마
│   └── src/lib/        # 유틸리티
└── .claude/commands/   # 파이프라인 스킬 정의
```

## 라이선스

MIT
