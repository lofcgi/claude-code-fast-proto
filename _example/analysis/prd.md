# AI 더빙 웹 서비스 — PRD

## 프로젝트 개요
ElevenLabs API를 활용한 AI 더빙 웹 서비스. 사용자가 오디오/비디오 파일을 업로드하면 음성을 추출, 전사하고, 원하는 언어로 번역한 뒤, AI 음성으로 합성하여 더빙된 결과물을 제공한다.

**과제 출처**: Perso AI DevRel 인턴 채용 과제 (ESTsoft AI Translation Team)

## 기능 요구사항

### FR-001: 파일 업로드
- 오디오(MP3, WAV) 또는 비디오(MP4) 파일 업로드 지원
- 드래그 앤 드롭 + 파일 선택 버튼
- 파일 크기/포맷 유효성 검증
- **Priority**: must

### FR-002: 음성 추출 및 전사
- 업로드된 파일에서 음성 추출
- ElevenLabs API를 사용하여 음성을 텍스트로 전사 (STT)
- 전사 결과 화면에 표시
- **Priority**: must

### FR-003: 번역
- 전사된 텍스트를 타겟 언어로 번역
- 번역 AI는 자유롭게 선택하여 구현 (ElevenLabs, Google Translate API, 직접 구현 등)
- 번역 결과 미리보기
- **Priority**: must

### FR-004: 음성 합성 (TTS)
- 번역된 텍스트를 타겟 언어 음성으로 합성
- ElevenLabs API 사용
- **Priority**: must

### FR-005: 결과물 재생 및 다운로드
- 더빙된 오디오/비디오 결과물 웹 플레이어로 재생
- 다운로드 기능 제공
- **Priority**: must

### FR-006: 타겟 언어 선택
- 드롭다운으로 타겟 언어 선택
- 지원 언어 목록 표시
- **Priority**: must

### FR-007: Google OAuth 로그인
- Google OAuth를 통한 소셜 로그인
- Auth.js v5 사용
- **Priority**: must

### FR-008: 화이트리스트 기반 접근 제어
- 허용 리스트에 등록된 이메일만 서비스 이용 가능
- 미등록 사용자 접근 차단 (안내 메시지 표시)
- `kts123@estsoft.com` 반드시 허용 리스트에 포함
- 허용 회원 데이터는 Turso DB에 저장
- **Priority**: must

### FR-009: 처리 상태 표시
- 업로드 → 전사 → 번역 → 합성 → 완료 단계별 진행 상태 표시
- 프로그레스 바 또는 단계 인디케이터
- **Priority**: should

### FR-010: 더빙 히스토리
- 이전 더빙 결과 목록 표시
- 재다운로드 가능
- **Priority**: could

## 비기능 요구사항

### NFR-001: 반응형 디자인
- 모바일/태블릿/데스크톱 대응

### NFR-002: 배포
- GitHub Push → Vercel 자동 배포
- 배포 후 서비스 실제 접근 가능

### NFR-003: 문서화
- README.md에 서비스 소개, 기술 스택, 로컬 실행 방법, 배포 URL, 에이전트 활용 노하우 포함
- 코딩 에이전트가 작성하고 Git 커밋

### NFR-004: 보안
- API 키 환경 변수로 분리
- 입력 검증

## 기술 스택
- **Framework**: Next.js 15 (App Router, TypeScript, Tailwind CSS)
- **Auth**: Auth.js v5 + Google OAuth
- **DB**: Turso (libSQL) + Drizzle ORM
- **UI**: shadcn/ui + Lucide Icons
- **API**: ElevenLabs (STT + TTS)
- **Deploy**: Vercel

## 제약사항
- ElevenLabs 무료 티어 API 제한 (월간 사용량 제한)
- 파일 크기 제한 (무료 티어 기준)
- Turso 무료 플랜 DB 용량 제한
