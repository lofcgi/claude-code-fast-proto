---
description: 지정된 플랫폼에 맞는 홍보 콘텐츠 생성
allowed-tools: [Read, Glob, Grep, Write]
---

프로젝트를 분석하고 $ARGUMENTS 플랫폼에 맞는 홍보 콘텐츠를 생성하세요.

## 지원 플랫폼
- velog: 한국어 기술 블로그 (2000-4000자, 마크다운)
- devto: 영문 기술 블로그 (1500-3000 words, markdown)
- reddit: 영문 짧은 포스트 (300-500 words, r/nextjs r/webdev r/ClaudeAI)
- twitter: 영문 스레드 (5-8 tweets, 각 280자)
- geek: 한국어 GeekNews Show GN 포스트 (200-500자)
- hn: 영문 Hacker News Show HN 포스트 (200-400 words)

## 콘텐츠 구조

### 필수 포함 스토리
- AI 에이전트로 프로토타입 → 구현 → 배포까지 자동화한 경험
- 파이프라인 설계 과정
- 실제 결과물 데모/스크린샷 안내
- 에이전트 활용 통계 (커밋 수, 세션 수 등)

### 플랫폼별 톤
- velog/geek: 한국어, 친근하지만 전문적
- devto/hn: 영문, 기술 중심, 간결
- reddit: 영문, 커뮤니티 친화적, 겸손한 톤
- twitter: 영문, 임팩트 있는 짧은 문장

## 참조 파일
- DEVLOG.md: 개발 여정
- analysis/prd.md: 프로젝트 요구사항
- analysis/requirements.json: 요구사항 분석
- project/README.md: 최종 프로젝트 설명

결과를 docs/promotion/$ARGUMENTS.md 에 저장하세요.
