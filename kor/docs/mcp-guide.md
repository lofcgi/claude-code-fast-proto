# MCP 서버 가이드

이 파이프라인에는 7개의 MCP 서버가 `.mcp.json`에 포함되어 있습니다.
`cd kor && claude` 만으로 자동 로드됩니다. API 키가 없는 서버는 해당 서버만 비활성화되고 나머지에는 영향이 없습니다.

## 기본 포함 MCP 서버 (7개)

### 제로 설정 (API 키 불필요)

| MCP 서버 | 용도 | 스킬 연동 |
|----------|------|----------|
| **Sequential Thinking** | PRD를 단계별로 분석, 복잡한 문제 분해 | `/analyze` |
| **Playwright** | 브라우저 자동 테스트, 스크린샷 캡처 | `/evaluate` |

### OAuth (브라우저 로그인)

| MCP 서버 | 용도 | 스킬 연동 |
|----------|------|----------|
| **Vercel** | MCP를 통한 Vercel 배포 | `/ship` |
| **Supabase** | Supabase 프로젝트 관리 | 구현 단계 |

### API 키 필요

| MCP 서버 | 필요한 키 | 발급처 | 스킬 연동 |
|----------|----------|--------|----------|
| **Context7** | `CONTEXT7_API_KEY` | [context7.com](https://context7.com) (무료) | 모든 구현 스킬 |
| **Firecrawl** | `FIRECRAWL_API_KEY` | [firecrawl.dev](https://firecrawl.dev) | `/analyze` 리서치 |
| **GitHub** | `GITHUB_TOKEN` | GitHub PAT (Personal Access Token) | 브랜치/PR 관리 |

## API 키 설정법

### 1. 환경 변수로 설정 (권장)

셸 프로필(`~/.zshrc` 또는 `~/.bashrc`)에 추가:

```bash
export FIRECRAWL_API_KEY="your-key-here"
export GITHUB_TOKEN="your-pat-here"
```

### 2. Claude Code 설정에서 추가

```bash
claude config set env FIRECRAWL_API_KEY "your-key-here"
```

### 3. Context7

Context7은 별도 API 키 없이도 동작할 수 있습니다. 키가 필요한 경우 [context7.com](https://context7.com)에서 무료 발급 후 환경 변수로 설정하세요.

### 4. GitHub Token

1. [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)에서 생성
2. `repo` 스코프 선택
3. 환경 변수로 설정: `export GITHUB_TOKEN="ghp_..."`

### 5. Vercel / Supabase

OAuth 기반이므로 첫 사용 시 브라우저 로그인 창이 뜹니다. 별도 키 설정 불필요.

## 파이프라인 MCP 활용 흐름

```
/analyze
  ├── Sequential Thinking → PRD 단계별 분석
  ├── Firecrawl → 경쟁 제품/기술 리서치
  └── Context7 → 최신 문서 참조

/prototype
  ├── Firecrawl → 경쟁 앱 UI 레퍼런스 크롤링
  └── Context7 → 프레임워크 최신 문서

/implement (각 버전)
  └── Context7 → 라이브러리 최신 API 참조

/evaluate
  └── Playwright → 브라우저 자동 테스트 + 스크린샷

/ship
  ├── Vercel MCP → 배포
  └── GitHub MCP → PR 생성
```

## 추가 가능한 MCP (수동 설치)

아래 MCP는 기본 포함되어 있지 않지만, `.mcp.json`에 추가하여 사용할 수 있습니다.

### v0 (Vercel Design AI)

```json
{
  "v0": {
    "command": "npx",
    "args": ["-y", "@anthropic-ai/v0-mcp"]
  }
}
```
- `/prototype`에서 AI 디자인 생성에 활용

### Design Inspiration

디자인 레퍼런스 검색용 MCP. 커뮤니티 MCP 레지스트리에서 검색하세요.

### 기타

[MCP 서버 디렉토리](https://github.com/modelcontextprotocol/servers)에서 더 많은 MCP를 찾을 수 있습니다.
