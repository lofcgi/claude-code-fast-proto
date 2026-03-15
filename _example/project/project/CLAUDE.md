# AI Dubbing Web Service (VoiceBridge)

## 프로젝트
ElevenLabs API를 활용한 AI 더빙 웹 서비스. 오디오/비디오 파일 업로드 → 음성 전사 → 번역 → AI 음성 합성 → 더빙 결과물 제공.

## 기술 스택
- **Framework**: Next.js 15 (App Router, TypeScript, Tailwind CSS)
- **Auth**: Auth.js v5 + Google OAuth
- **DB**: Turso (libSQL) + Drizzle ORM
- **UI**: shadcn/ui + Lucide Icons + Framer Motion
- **API**: ElevenLabs (STT + TTS)
- **Deploy**: Vercel

## 참조 문서
- ../analysis/prd.md — 요구사항
- ../analysis/requirements.json — 기능 목록
- ../analysis/acceptance-criteria.md — 수용 기준
- ../prototypes/a/ — UI 프로토타입

## 환경 변수
- `/implement` Phase 0에서 requirements.json 기반으로 필요한 환경변수를 자동 감지합니다
- `.env.local`은 절대 커밋하지 않을 것
- `.env.example`은 키만 포함하여 커밋

## 규칙
- prototype/의 디자인을 최대한 반영할 것
- TypeScript strict 모드
- 모든 API route에 try-catch + NextResponse 에러 핸들링
- 환경 변수는 .env.local (커밋 금지)
- 서버 컴포넌트 우선, 필요한 곳만 "use client"

## Vercel 배포 제약사항
- API route body 크기: 4.5MB 제한
- Serverless function timeout: 60초 (Pro 300초)
- Edge Runtime 사용 시 Node.js 전용 API (fs, child_process 등) 사용 불가
- `next.config.ts`에서 외부 이미지 도메인 반드시 설정
