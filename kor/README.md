# AI Agent Pipeline

> 세계 최초 오픈소스 Best-of-N 병렬 구현 파이프라인. AI 코딩 에이전트로 구동됩니다.

PRD/PDF를 넣고 Claude Code 스킬을 실행하면, 3개의 경쟁 풀스택 구현체가 평가되어 하나의 완성된 프로덕트로 합쳐집니다.

## 왜 만들었나

Best-of-N 샘플링은 AI 연구에서 출력 품질을 높이는 검증된 기법이지만, 실용적인 개발자 도구는 존재하지 않았습니다. 지금까지는.

이 템플릿은 그 개념을 실제 파이프라인으로 구현합니다: **PRD 하나 넣으면, 구현체 3개 나오고, 최고가 선택됩니다.**

## 파이프라인 흐름

```
1. git clone ai-agent-pipeline && cd ai-agent-pipeline
2. input/에 PDF/PRD 넣기
3. /analyze          → PRD 파싱 + 구조화
4. /prototype        → 3가지 UI 프로토타입 생성
5. 마음에 드는 프로토타입 선택
6. /setup-versions   → 3개 버전 디렉토리 생성
7. 터미널 3개 열기:
   - Terminal 1: cd versions/v1 && claude → /implement
   - Terminal 2: cd versions/v2 && claude → /implement
   - Terminal 3: cd versions/v3 && claude → /implement
8. /evaluate         → 3개 버전 평가
9. /select-winner    → 최적 버전을 project/로 복사
10. cd project && claude → /polish
11. /ship            → 배포 + 문서 생성
12. /promote velog   → 홍보 콘텐츠 생성
```

## 디렉토리 구조

```
kor/
├── input/              # PRD/PDF를 넣는 곳
├── analysis/           # 구조화된 요구사항 (자동 생성)
├── prototypes/         # UI 프로토타입 3종 (자동 생성)
├── templates/          # 버전 디렉토리 템플릿
├── versions/           # 3개 병렬 구현
│   ├── v1/
│   ├── v2/
│   └── v3/
├── evaluation/         # 평가 및 비교 결과
├── project/            # 최종 선택 버전
└── .claude/commands/   # 파이프라인 오케스트레이션 스킬
```

## 사용 가능한 스킬

| 스킬 | 설명 |
|------|------|
| `/analyze` | PRD/PDF 파싱 및 구조화된 요구사항 생성 |
| `/prototype` | 3가지 UI 프로토타입 인터페이스 생성 |
| `/setup-versions` | 병렬 구현을 위한 3개 버전 디렉토리 생성 |
| `/evaluate` | 평가 매트릭스 기준으로 모든 버전 채점 |
| `/select-winner` | 최적 버전을 project/로 복사 |
| `/ship` | 배포 및 문서 생성 |
| `/promote <플랫폼>` | 홍보 콘텐츠 생성 (velog, devto, reddit, twitter, geek, hn) |
| `/devlog` | 개발 로그 자동 기록 |

## MCP 서버

7개의 MCP 서버가 `.mcp.json`에 포함되어 있어, `cd kor && claude` 만으로 자동 로드됩니다.

| MCP 서버 | 용도 | 설정 |
|----------|------|------|
| Sequential Thinking | PRD 단계별 분석 | 제로 설정 |
| Playwright | 브라우저 자동 테스트 | 제로 설정 |
| Vercel | MCP 배포 | OAuth |
| Supabase | DB 관리 | OAuth |
| Context7 | 최신 문서 참조 | API 키 (무료) |
| Firecrawl | 웹 크롤링/리서치 | API 키 |
| GitHub | 브랜치/PR 관리 | PAT |

API 키 설정 및 상세 안내: [docs/mcp-guide.md](docs/mcp-guide.md)

## 사전 요구사항

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) 설치
- Node.js 18+
- Git

## 작동 원리

1. **분석**: PRD/PDF가 구조화된 요구사항으로 파싱됩니다 (기능, 수용 기준, 기술 제약, 평가 매트릭스)
2. **프로토타입**: 3가지 UI 접근법이 생성됩니다 (미니멀, 대시보드, 스튜디오)
3. **병렬 빌드**: 각 버전이 독립된 디렉토리에서 구현 스킬과 함께 별도 터미널에서 실행됩니다
4. **평가**: 모든 버전이 기능 완성도, 코드 품질, UI/UX, 배포 가능성, 보안 기준으로 채점됩니다
5. **폴리시**: 선택된 버전에 UI/UX 개선과 시니어 코드 리뷰가 진행됩니다
6. **배포**: 문서, 배포 가이드, 홍보 콘텐츠가 생성됩니다

## 라이선스

MIT
