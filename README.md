# AI Agent Pipeline

> The world's first open-source Best-of-N parallel implementation pipeline powered by AI coding agents.
>
> 세계 최초 오픈소스 Best-of-N 병렬 구현 파이프라인. AI 코딩 에이전트로 구동됩니다.

Drop a PRD/PDF, run Claude Code skills, and get 3 competing full-stack implementations evaluated and merged into one polished product.

PRD/PDF를 넣고 Claude Code 스킬을 실행하면, 3개의 경쟁 풀스택 구현체가 평가되어 하나의 완성된 프로덕트로 합쳐집니다.

---

## Quick Start

```bash
git clone <repo-url> && cd ai-agent-pipeline

# Choose your language / 언어를 선택하세요:
cd eng   # English
cd kor   # 한국어

# Then start Claude Code
claude
/analyze
```

## Choose Your Language / 언어 선택

| Language | Directory | Description |
|----------|-----------|-------------|
| English | [`eng/`](./eng/) | All skills, templates, and docs in English |
| 한국어 | [`kor/`](./kor/) | 모든 스킬, 템플릿, 문서가 한국어 |

Each folder is a **fully independent, self-contained pipeline**. You can delete the one you don't need.

각 폴더는 **완전히 독립적인 파이프라인**입니다. 필요 없는 폴더는 삭제해도 됩니다.

## Pipeline Flow

```
1. Put your PDF/PRD in input/     │  input/에 PDF/PRD 넣기
2. /analyze                       │  PRD 파싱 + 구조화
3. /prototype                     │  3가지 UI 프로토타입 생성
4. /setup-versions                │  3개 버전 디렉토리 생성
5. Open 3 terminals → /implement  │  터미널 3개에서 /implement
6. /evaluate                      │  3개 버전 평가
7. /select-winner                 │  최적 버전 선택
8. /polish → /ship                │  다듬기 → 배포
```

## Available Skills

| Skill | Description | 설명 |
|-------|-------------|------|
| `/analyze` | Parse PRD/PDF → structured requirements | PRD/PDF 파싱 → 구조화된 요구사항 |
| `/prototype` | Generate 3 UI prototypes | 3가지 UI 프로토타입 생성 |
| `/setup-versions` | Create 3 parallel version dirs | 3개 병렬 버전 디렉토리 생성 |
| `/evaluate` | Score all versions | 모든 버전 채점 |
| `/select-winner` | Copy best version to project/ | 최적 버전을 project/로 복사 |
| `/ship` | Deploy + generate docs | 배포 + 문서 생성 |
| `/promote <platform>` | Generate promo content | 홍보 콘텐츠 생성 |
| `/devlog` | Auto-generate dev log | 개발 로그 자동 기록 |

## MCP Servers

7 MCP servers included (Sequential Thinking, Playwright, Context7, Firecrawl, Vercel, Supabase, GitHub) — auto-loaded via `.mcp.json`. See [kor/docs/mcp-guide.md](kor/docs/mcp-guide.md) or [eng/docs/mcp-guide.md](eng/docs/mcp-guide.md) for details.

## Prerequisites / 사전 요구사항

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)
- Node.js 18+
- Git

## License

MIT
