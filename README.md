# AI Agent Pipeline

> URL + PRD → AI agent performs prototype → implement → deploy.
>
> URL + PRD를 넣으면 AI 에이전트가 프로토타입 → 구현 → 배포까지 수행합니다.

---

## Quick Start

```bash
git clone <repo-url> && cd ai-agent-pipeline

# Choose your language / 언어를 선택하세요:
cd eng   # English
cd kor   # 한국어

# Then start Claude Code
claude
/prototype
```

> **Detailed guide / 상세 가이드:** [`eng/README.md`](./eng/README.md) (English) | [`kor/README.md`](./kor/README.md) (한국어)

## Choose Your Language / 언어 선택

| Language | Directory | Description |
|----------|-----------|-------------|
| English | [`eng/`](./eng/) | All skills, templates, and docs in English |
| 한국어 | [`kor/`](./kor/) | 모든 스킬, 템플릿, 문서가 한국어 |

Each folder is a **fully independent, self-contained pipeline**. You can delete the one you don't need.

각 폴더는 **완전히 독립적인 파이프라인**입니다. 필요 없는 폴더는 삭제해도 됩니다.

## Pipeline Flow

```
1. Put URL + description in input/    │  input/에 URL + 설명 넣기
2. /prototype                         │  프로토타입 a/b 생성
3. /implement a (or b)                │  project/에 풀스택 구현
   └→ build-check → self-review       │  자동 Ralph Loop
4. /ship                              │  환경변수 확인 + 배포
```

## Available Skills

| Skill | Description | 설명 |
|-------|-------------|------|
| `/prototype` | Generate 2 UI prototypes from URL | URL 기반 프로토타입 2종 생성 |
| `/implement <a\|b>` | Build full-stack app from prototype | 프로토타입 기반 풀스택 구현 |
| `/ship` | Env var check + CLI deploy | 환경변수 확인 + 배포 |
| `/promote <platform>` | Generate promo content | 홍보 콘텐츠 생성 |
| `/devlog` | Auto-generate dev log | 개발 로그 자동 기록 |

## MCP Servers

MCP servers included (Sequential Thinking, Playwright, Context7, Firecrawl, GitHub, 21st-dev Magic, Design Inspiration, Unsplash) — auto-loaded via `.mcp.json`. See [kor/docs/mcp-guide.md](kor/docs/mcp-guide.md) or [eng/docs/mcp-guide.md](eng/docs/mcp-guide.md) for details.

## Prerequisites / 사전 요구사항

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)
- Node.js 18+
- Git
- Accounts (Google Cloud, Turso, Vercel) are needed later at `/implement` and `/ship` stages, not to start
- 계정(Google Cloud, Turso, Vercel)은 `/implement`와 `/ship` 단계에서 필요하며, 시작할 때는 불필요합니다

## Example / 사용 예시

[`_example/`](./_example/) contains a real-world project built with this pipeline — an AI dubbing web service.

[`_example/`](./_example/) 폴더에 이 파이프라인으로 만든 실제 프로젝트(AI 더빙 웹 서비스)가 포함되어 있습니다.

## License

MIT
