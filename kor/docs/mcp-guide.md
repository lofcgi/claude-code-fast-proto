# MCP 서버 가이드 — 에이전트의 도구

이 파이프라인은 AI 에이전트에게 MCP 서버를 도구 상자로 제공합니다.
`cd kor && claude`만으로 자동 로드됩니다. API 키가 없는 서버는 해당 서버만 비활성화되고 나머지에는 영향이 없습니다.

## 에이전트가 MCP 서버를 사용하는 방식

```
/prototype
  ├── Firecrawl        → 레퍼런스 URL에서 콘텐츠 + 브랜딩 스크래핑
  ├── Playwright       → 스크린샷 캡처 (Vision 분석 + 비교 루프)
  ├── Design Inspiration → Dribbble/Behance/Awwwards 레퍼런스 검색
  ├── 21st-dev Magic   → 프로덕션 품질 UI 컴포넌트 확보
  ├── Unsplash         → 실제 이미지 확보 (아바타, 히어로, 배경)
  ├── Sequential Thinking → PRD를 구조화된 분석으로 분해
  ├── Defuddle Fetch   → 웹 페이지에서 깔끔한 콘텐츠 추출
  └── Context7         → 프레임워크 최신 문서 조회

/implement
  ├── Context7         → 라이브러리 최신 API 문서 조회
  ├── Playwright       → 브라우저 테스트 + 스크린샷
  └── Lighthouse       → 성능 감사

/ship
  ├── Vercel           → MCP를 통한 배포
  └── GitHub           → 브랜치/PR 생성
```

## 기본 포함 MCP 서버

### 제로 설정 (API 키 불필요)

| MCP 서버 | 에이전트가 이걸로 하는 일 | 사용 단계 |
|----------|------------------------|----------|
| **Sequential Thinking** | 복잡한 문제를 구조화된 단계별 분석으로 분해 | `/prototype` |
| **Playwright** | 비주얼 비교용 스크린샷 캡처, 브라우저 테스트, 비교 루프 실행 | `/prototype`, `/implement` |
| **v0** | AI 프로토타입 코드 생성 (Vercel) | `/prototype` |
| **Context7** | 프레임워크/라이브러리 최신 문서 조회 | 모든 스킬 |
| **Defuddle Fetch** | 웹 페이지에서 깔끔하고 읽기 쉬운 콘텐츠 추출 | `/prototype` |
| **Lighthouse** | 빌드된 앱의 성능 감사 실행 | `/implement` |

### OAuth (브라우저 로그인)

| MCP 서버 | 에이전트가 이걸로 하는 일 | 사용 단계 |
|----------|------------------------|----------|
| **Vercel** | 완성된 애플리케이션 배포 | `/ship` |

### API 키 필요

| MCP 서버 | 필요한 키 | 발급처 | 에이전트가 이걸로 하는 일 |
|----------|----------|--------|------------------------|
| **Firecrawl** | `FIRECRAWL_API_KEY` | [firecrawl.dev](https://firecrawl.dev) | 레퍼런스 URL을 스크래핑하여 콘텐츠, 레이아웃, 브랜딩 요소 추출 |
| **GitHub** | `GITHUB_TOKEN` | [GitHub PAT](https://github.com/settings/tokens) | 브랜치 생성, PR 관리 |
| **21st-dev Magic** | `TWENTY_FIRST_API_KEY` | [21st.dev/magic/console](https://21st.dev/magic/console) (베타, 무료) | 프로토타입용 프로덕션 품질 UI 컴포넌트 확보 |
| **Design Inspiration** | `SERPER_API_KEY` | [serper.dev](https://serper.dev) | Dribbble/Behance/Awwwards에서 디자인 레퍼런스 검색 |
| **Unsplash** | `UNSPLASH_ACCESS_KEY` | [unsplash.com/developers](https://unsplash.com/developers) | 실제 이미지 확보 — 아바타, 히어로 이미지, 배경 — 플레이스홀더 교체 |

## API 키 설정법

### 1. 환경 변수로 설정 (권장)

셸 프로필(`~/.zshrc` 또는 `~/.bashrc`)에 추가:

```bash
export FIRECRAWL_API_KEY="your-key-here"
export GITHUB_TOKEN="your-pat-here"
export SERPER_API_KEY="your-key-here"
export TWENTY_FIRST_API_KEY="your-key-here"
export UNSPLASH_ACCESS_KEY="your-key-here"
```

### 2. Claude Code 설정에서 추가

```bash
claude config set env FIRECRAWL_API_KEY "your-key-here"
```

### 상세 설정

<details>
<summary><strong>Context7</strong></summary>

npx를 통해 별도 API 키 없이 동작합니다. 키가 필요한 경우 [context7.com](https://context7.com)에서 무료 발급 후 환경 변수로 설정하세요.

</details>

<details>
<summary><strong>GitHub Token</strong></summary>

1. [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)에서 생성
2. `repo` 스코프 선택
3. 환경 변수로 설정: `export GITHUB_TOKEN="ghp_..."`

</details>

<details>
<summary><strong>Vercel</strong></summary>

OAuth 기반이므로 첫 사용 시 브라우저 로그인 창이 뜹니다. 별도 키 설정 불필요.

</details>

<details>
<summary><strong>21st-dev Magic</strong></summary>

1. [21st.dev/magic/console](https://21st.dev/magic/console)에서 회원가입
2. API 키 발급 (베타, 무료)
3. 환경 변수로 설정: `export TWENTY_FIRST_API_KEY="your-key-here"`

</details>

<details>
<summary><strong>Design Inspiration</strong></summary>

1. [serper.dev](https://serper.dev)에서 Serper API 키 발급
2. 환경 변수로 설정: `export SERPER_API_KEY="your-key-here"`
3. MCP 서버는 npx로 자동 실행됩니다 — 별도 빌드 불필요

</details>

<details>
<summary><strong>Unsplash</strong></summary>

1. [unsplash.com/developers](https://unsplash.com/developers)에서 앱 생성
2. Access Key 복사
3. 환경 변수로 설정: `export UNSPLASH_ACCESS_KEY="your-key-here"`

</details>

## MCP 서버 추가하기

`.mcp.json`을 편집하여 서버를 추가하세요:

```json
{
  "mcpServers": {
    "your-server": {
      "command": "npx",
      "args": ["-y", "your-mcp-package"],
      "env": {
        "YOUR_API_KEY": "${YOUR_API_KEY}"
      }
    }
  }
}
```

그런 다음 관련 `.claude/commands/*.md` 스킬 파일의 `allowed-tools` 목록에 `"mcp:your-server:*"`를 추가하세요.

[MCP 서버 디렉토리](https://github.com/modelcontextprotocol/servers)에서 더 많은 MCP를 찾을 수 있습니다.
