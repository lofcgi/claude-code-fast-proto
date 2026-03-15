# AI Dubbing Service — Prototype Plan

## 프로젝트 개요
ElevenLabs API 기반 AI 더빙 웹 서비스. 오디오/비디오 파일을 업로드하면 음성을 추출/전사하고, 원하는 언어로 번역 후, AI 음성으로 더빙된 결과물을 재생/다운로드할 수 있다.

## 레퍼런스 분석

### 메인: Perso AI Studio (perso.ai/ai-studio)
- **테마**: 다크 (#000 배경)
- **레이아웃**: 왼쪽 대형 타이포 + 오른쪽 제품 UI 목업 히어로
- **컬러**: 퍼플(#624AFF) 프라이머리, 화이트 텍스트
- **버튼**: 풀 라운드 (506px radius), 퍼플 프라이머리
- **폰트**: Google Sans Flex / Inter Display
- **특징**: 로고 캐러셀, 피처 섹션 (좌우 교대), 테스티모니얼, FAQ 아코디언

### 서브: Retro Diffusion (retrodiffusion.ai)
- **테마**: 다크 (#000 배경)
- **컬러**: 라임그린(#C4F128) 악센트, 퍼플(#8237FF)
- **스타일**: 미니멀, 샤프 코너, 파트너 로고 그리드
- **폰트**: Inter, Avenir

## 섹션별 레이아웃 블루프린트

### 1. Navigation (sticky)
- 좌측: 로고 ("VoiceBridge" 또는 서비스명)
- 우측: 메뉴 링크 (Features, How it Works, Pricing) + Login 버튼 + CTA 버튼
- 다크 배경, 블러 backdrop

### 2. Hero Section
- **레이아웃**: 2-column (왼쪽 텍스트 60% / 오른쪽 UI 목업 40%)
- **왼쪽**: 뱃지 "AI-Powered Dubbing" → 대형 헤딩 (hero size) → 서브텍스트 → CTA 버튼 2개
- **오른쪽**: 더빙 앱 UI 스크린샷/목업 (기능 페이지 캡처)
- **배경**: 미묘한 그라디언트 (퍼플→블랙)

### 3. Logo Carousel (Trust)
- "Powered by" → ElevenLabs, Google Cloud, Vercel 로고
- 무한 스크롤 애니메이션 (Perso AI 스타일)

### 4. How it Works (3-step)
- 수평 3-컬럼 카드
- Step 1: Upload (파일 업로드 아이콘)
- Step 2: Translate (언어 선택 아이콘)
- Step 3: Download (다운로드 아이콘)
- 각 카드: 아이콘 + 제목 + 설명

### 5. Features Section (교대 레이아웃)
- **5a**: 왼쪽 텍스트 + 오른쪽 이미지 — "다국어 음성 변환"
- **5b**: 오른쪽 텍스트 + 왼쪽 이미지 — "고품질 AI 전사"
- **5c**: 왼쪽 텍스트 + 오른쪽 이미지 — "간편한 파일 관리"

### 6. Supported Languages Grid
- 국기 아이콘 + 언어명 그리드 (한국어, 영어, 일본어, 중국어, 스페인어 등)
- 다크 카드 배경

### 7. CTA Section
- 풀와이드 그라디언트 배경
- 중앙 정렬 헤딩 + CTA 버튼

### 8. Footer
- 3-컬럼: 서비스 정보, 링크, 법적 고지
- 미니멀 다크

## 브랜드 토큰 요약
- **Primary**: #624AFF (퍼플)
- **Accent**: #C4F128 (라임그린, 강조용)
- **Background**: #000000
- **Text**: #FFFFFF / #A0A0A0
- **Font**: Google Sans Flex (heading + body), fallback system-ui
- **Button radius**: 506px (pill)
- **Card radius**: 24px

## 이미지 맵

| 용도 | Unsplash ID | 설명 | URL |
|------|-------------|------|-----|
| Features: 녹음/음성 | HowWHYGqFF4 | 녹음 스튜디오 마이크 | `unsplash.com/photos/HowWHYGqFF4` |
| Features: 비디오 편집 | BfDRoZ1yYuY | 듀얼 모니터 편집 | `unsplash.com/photos/BfDRoZ1yYuY` |
| Features: 비디오 편집2 | CX0r0CKFvYo | DaVinci Resolve | `unsplash.com/photos/CX0r0CKFvYo` |
| Hero BG hint | ye2-0Y2JI3Y | 다크 편집 환경 | `unsplash.com/photos/ye2-0Y2JI3Y` |

> 프로토타입에서는 주로 UI 목업/아이콘 기반으로 비주얼을 구성하고, Unsplash 이미지는 Features 배경 또는 장식 요소로만 활용

## 모션 스펙

| 요소 | 트리거 | 애니메이션 | 지속시간 | Easing |
|------|--------|-----------|---------|--------|
| Hero 텍스트 | 페이지 로드 | fade-up | 600ms | spring(1, 0.75, 0.5) |
| Hero 목업 | 페이지 로드 + 300ms delay | fade-up + scale(0.95→1) | 800ms | spring |
| 로고 캐러셀 | 자동 | translateX 무한 | 30s | linear |
| Feature 카드 | 스크롤 in-view | fade-up | 500ms | spring |
| How it Works 카드 | 스크롤 in-view | stagger fade-up (100ms 간격) | 400ms | spring |
| CTA 버튼 hover | hover | scale(1.05) | 200ms | spring |
| Nav | 스크롤 | backdrop-blur 증가 | 300ms | ease-out |

## 기능 페이지 플랜

### /dubbing (메인 기능 페이지)
- 파일 업로드 영역 (드래그 앤 드롭 + 파일 선택)
- 지원 포맷 표시 (MP3, MP4, WAV, etc.)
- 타겟 언어 선택 드롭다운
- "Start Dubbing" CTA 버튼
- 처리 상태 프로그레스 바 (업로드 → 전사 → 번역 → 음성 합성 → 완료)
- 결과물 재생 플레이어 + 다운로드 버튼
- 히스토리 목록 (이전 더빙 결과)

### /login
- Google OAuth 로그인 버튼
- 화이트리스트 미등록 시 안내 메시지

## 기술 스택
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Framer Motion (애니메이션)
- Auth.js v5 + Google OAuth
- Turso (libSQL) + Drizzle ORM
- ElevenLabs API (음성 전사 + TTS)
- Vercel 배포
