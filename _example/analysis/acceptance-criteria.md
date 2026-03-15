# Acceptance Criteria

## FR-001: 파일 업로드
- [ ] AC-001: Given 사용자가 로그인 상태, When 오디오/비디오 파일을 드래그 앤 드롭, Then 파일이 업로드되고 파일명/크기가 표시된다
- [ ] AC-002: Given 지원하지 않는 포맷의 파일, When 업로드 시도, Then 에러 메시지가 표시된다
- [ ] AC-003: Given 파일 크기 제한 초과, When 업로드 시도, Then 에러 메시지가 표시된다

## FR-002: 음성 추출 및 전사
- [ ] AC-004: Given 유효한 오디오/비디오 파일 업로드 완료, When 전사 프로세스 시작, Then ElevenLabs API로 음성이 텍스트로 변환되어 표시된다
- [ ] AC-005: Given 음성이 없는 파일, When 전사 시도, Then 적절한 에러 메시지가 표시된다

## FR-003: 번역
- [ ] AC-006: Given 전사된 텍스트, When 타겟 언어 선택 후 번역 실행, Then 번역된 텍스트가 표시된다

## FR-004: 음성 합성
- [ ] AC-007: Given 번역된 텍스트, When TTS 합성 실행, Then ElevenLabs API로 타겟 언어 음성이 생성된다

## FR-005: 결과물 재생 및 다운로드
- [ ] AC-008: Given 더빙 완료된 결과물, When 재생 버튼 클릭, Then 웹 플레이어에서 결과물이 재생된다
- [ ] AC-009: Given 더빙 완료된 결과물, When 다운로드 버튼 클릭, Then 결과 파일이 다운로드된다

## FR-006: 타겟 언어 선택
- [ ] AC-010: Given 더빙 페이지, When 언어 드롭다운 클릭, Then 지원 언어 목록이 표시된다

## FR-007: Google OAuth 로그인
- [ ] AC-011: Given 로그인 페이지, When Google 로그인 버튼 클릭, Then Google OAuth 인증 플로우가 시작된다
- [ ] AC-012: Given 유효한 Google 계정으로 인증 완료, When 콜백 처리, Then 세션이 생성되고 메인 페이지로 리다이렉트된다

## FR-008: 화이트리스트 접근 제어
- [ ] AC-013: Given 허용 리스트에 등록된 이메일로 로그인, When 서비스 접근, Then 정상 이용 가능
- [ ] AC-014: Given 허용 리스트에 없는 이메일로 로그인, When 서비스 접근, Then 차단 안내 메시지 표시
- [ ] AC-015: Given kts123@estsoft.com 계정, When 로그인, Then 반드시 서비스 이용 가능

## FR-009: 처리 상태 표시
- [ ] AC-016: Given 더빙 프로세스 진행 중, When 각 단계(업로드/전사/번역/합성) 전환, Then 현재 단계가 시각적으로 표시된다

## FR-010: 더빙 히스토리
- [ ] AC-017: Given 이전 더빙 완료 기록 존재, When 히스토리 페이지 접근, Then 이전 결과 목록이 표시된다
