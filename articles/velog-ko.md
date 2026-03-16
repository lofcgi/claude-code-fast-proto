---
title: "서비스 기업과제에 슬래시 커맨드 만드는 데 이틀 걸렸는데, 과제 사이트 만드는 데는 1시간 걸렸습니다"
tags: ["Claude", "AI", "프롬프트엔지니어링", "웹개발", "오픈소스"]
---

Claude Code 슬래시 커맨드로 파이프라인을 만들었습니다. URL 하나 넣으면 프로토타입 → 풀스택 앱 → 배포까지 알아서 돌아갑니다.

파이프라인 자체를 만드는 데는 이틀 걸렸는데, 만들어놓고 나니까 코딩 한 줄 안 짜고 슬래시 커맨드만으로 서비스 기업과제 사이트가 1시간이면 나옵니다.

v1 → v0 only → v4, 같은 프로젝트가 파이프라인 버전에 따라 어떻게 바뀌었는지:

| v1: 네온 과적재 | v0 only: 디자인은 OK, 코드 엉망 | v4: 레퍼런스 클론 |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/lofcgi/claude-code-best-of-n/main/prototypes/results/old/v1-voxforge-hero.png" width="280" /> | <img src="https://raw.githubusercontent.com/lofcgi/claude-code-best-of-n/main/articles/v0%20only.png" width="280" /> | <img src="https://raw.githubusercontent.com/lofcgi/claude-code-best-of-n/main/prototypes/results/final-a-hero.png" width="280" /> |

**배포 URL**:
- https://project-nine-nu-52.vercel.app/
- https://project-kimanlee.vercel.app/

> 두 사이트 모두 실제 API는 호출되지 않습니다. Dubbing 페이지의 Demo 버튼으로 전체 플로우를 체험할 수 있습니다.

프롬프트 795줄 전체를 [GitHub에 공개](https://github.com/lofcgi/claude-code-best-of-n)해뒀습니다. Star 눌러주시고 [이슈에 이메일 남기시면](https://github.com/lofcgi/claude-code-best-of-n/issues/new?template=prd-template-request.md) 위 두 프로젝트를 만들 때 사용한 PRD와 레퍼런스 인풋을 보내드립니다.

---

## 직접 써보기

### 필요한 것

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/overview) (`npm i -g @anthropic-ai/claude-code`)
- Node.js 18+
- Git

### 클론 + 실행

```bash
git clone https://github.com/lofcgi/claude-code-best-of-n.git
cd claude-code-best-of-n/kor    # 영어: cd eng
```

`input/url.md`에 레퍼런스 URL을 한 줄에 하나씩 넣습니다 (첫 번째가 메인 레퍼런스). PRD가 있으면 같은 폴더에 `prd.md`나 PDF를 추가합니다 (선택).

```bash
claude          # .mcp.json 자동 로드
/prototype      # Phase 1-3 자동 실행
```

`prototypes/a`와 `prototypes/b`에 두 개의 Next.js 프로토타입이 나옵니다. 마음에 드는 쪽을 골라서:

```bash
/implement a    # 풀스택 앱 전환
/ship           # Vercel 배포
```

`_example/` 폴더에 실제 실행 예시가 들어있으니 참고하세요.

### MCP 서버 설정

`.mcp.json`에 11개 서버가 정의되어 있고, `cd kor && claude` 실행 시 자동으로 로드됩니다.

**키 없이 동작하는 서버 (6개):**
Sequential Thinking, Playwright, Context7, Defuddle Fetch, Lighthouse, v0

**API 키가 필요한 서버 (4개):**

| 서버 | 환경변수 | 발급처 |
|------|---------|--------|
| Firecrawl | `FIRECRAWL_API_KEY` | firecrawl.dev |
| 21st-dev | `TWENTY_FIRST_API_KEY` | 21st.dev/magic/console |
| Design Inspiration | `SERPER_API_KEY` | serper.dev |
| GitHub | `GITHUB_TOKEN` | github.com/settings/tokens |

**OAuth 인증:**
Vercel — `/ship` 단계에서만 필요합니다. 실행 시 브라우저에서 인증합니다.

키가 없으면 해당 서버만 비활성화되고 나머지는 정상 동작합니다. 키 설정은 두 가지 방법이 있습니다:

```bash
# 방법 1: shell profile (~/.zshrc 등)
export FIRECRAWL_API_KEY="fc-..."

# 방법 2: Claude Code 자체 설정
claude config set env FIRECRAWL_API_KEY fc-...
```

서비스 기업 과제가 클로드 활용이라, 클로드로만 풀스택 개발을 해보고 싶었습니다. AI 더빙 서비스 "VoiceBridge" 프로토타입을 만드는 게 목표였는데, 에이전트 없이 코딩하면 과제 의도에 안 맞아서 "어떻게 하면 AI 에이전트를 잘 쓸 수 있을까"를 파고들었습니다.

---

## v1: 50줄 프롬프트

처음에는 단순하게 접근했습니다. Claude Code 슬래시 커맨드에 `/prototype` 만들어서, 7단계로 프로토타입 뽑는 구조.

MCP 서버를 7개 연결해둔 상태였습니다. Design Inspiration, v0, 21st.dev, Firecrawl, Unsplash, Playwright, Sequential Thinking.

```
Phase 1: Design Inspiration MCP로 UI 레퍼런스 탐색
Phase 2: 3개 추상 컨셉 도출
Phase 3: 스캐폴딩
Phase 4: v0 MCP에 디자인 생성 위임
Phase 5: 21st.dev로 컴포넌트 폴리시
Phase 6: 빌드 검증
Phase 7: Playwright 스크린샷 QA
```

결과: Aurora, beam, sparkle, gradient mesh 효과가 사이트를 뒤덮었습니다. MCP 도구들이 Aceternity, MagicUI 같은 장식 컴포넌트를 추천하니까 Claude가 전부 갖다 씀. 3개 프로토타입을 만들었는데 셋 다 거의 똑같았습니다.

컨셉을 추상적으로 도출하면 매번 비슷한 곳으로 수렴합니다.

---

## "이게 왜 안 되지?" — Claude한테 시킨 연구

프롬프트를 고치기 전에, 왜 안 되는지부터 이해해야 했습니다. 그래서 Claude한테 시켰습니다:

> "v0이랑 Claude Code를 비교 분석해줘. 디자인 퀄리티는 어디가 높은지, 코드 퀄리티는 어디가 높은지. 그리고 실제 프로 사이트들을 분석해서 뭐가 다른지 찾아줘."

직접 두 도구로 같은 걸 만들어봤는데, v0으로 만든 게 "보기에는" 더 나았습니다. 근데 코드를 열어보면 엉망. 그래서 각 도구의 강점을 정리하고 싶었습니다.

Claude가 웹서치하면서 내놓은 결과:

| | 디자인 | 코드 |
|---|---|---|
| v0 / Tempo / 21st.dev | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Claude Code | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

그리고 실제 SaaS 사이트들을 Firecrawl로 스크래핑해서 프로 사이트 공통 패턴을 뽑아냈습니다:

1. 순수 블랙 배경 + 2색 악센트만 (무지개 금지)
2. 제품 UI 스크린샷이 히어로 (추상 효과가 아닌 실제 앱 화면)
3. 100px 헤드라인 / 14px 바디 (극단적 타이포 대비)
4. 한 섹션 한 기능 (풀폭, 80-120px 간격)
5. 최소 애니메이션 (scroll reveal + marquee 정도만)

정리하면, MCP 도구들이 장식 컴포넌트를 추천하면 Claude는 전부 갖다 씁니다. 프로 사이트에는 그런 효과가 없는데.

---

## v2→v3: 모듈화, 그리고 전략 변경

v2는 물리적 개선이었습니다. 900줄짜리 모놀리식 프롬프트를 142줄 오케스트레이터 + 7개 Phase 파일로 분리했습니다. Claude Code의 컨텍스트 윈도우 문제 때문이었습니다. 900줄을 한번에 읽히니까 뒤쪽 지시를 안 따랐습니다. Phase별로 파일을 나누면 해당 Phase 실행할 때만 읽으니까 지시 이행률이 올라갔습니다.

근데 v2로도 여전히 비슷비슷한 결과가 나왔습니다. 구조는 좋아졌는데 전략 자체가 잘못된 거였습니다.

그래서 v3에서 전략을 통째로 바꿨습니다:

```
AS-IS: 리서치 → 추상 컨셉 3개 도출 → 프리미엄 컴포넌트 선택 → 코드 생성
TO-BE: 리서치 → 레퍼런스 사이트 3개 선정+스크린샷 → 스크린샷 보면서 1:1 클론 → 색상만 교체
```

"창의적으로 해봐" 대신 "이거 보고 따라 만들어"로 바꾸니까, 같은 파이프라인에서도 레퍼런스가 다르면 결과도 달랐습니다.

---

## v4: 7-Phase를 전부 버리고 3-Phase로

v3도 잘 작동했지만 7단계가 너무 무거웠습니다. Phase 전환마다 검증 스크립트, 전제조건 체크... 한 번 실행에 40분 넘게 걸렸습니다.

실무자 워크플로우들을 연구하면서 세 가지 원칙을 뽑았습니다:
- **Saqoosha**: "스크린샷 찍고 비교해라. 눈으로 보는 게 정확하다"
- **Boris Cherny**: "실패에서 배운 규칙을 즉시 CLAUDE.md에 추가해라"
- **monday.com**: "컨텍스트를 한번에 쏟아넣지 말고 단계별로 구축해라"

그래서 이렇게 줄였습니다:

| Phase | 하는 일 | MCP |
|-------|--------|-----|
| 1. Explore & Plan | URL → Firecrawl 스크래핑 + 브랜딩 JSON → plan.md | Firecrawl, Design Inspiration |
| 2. Generate | plan.md 기반 2개 프로토타입 (클론 + 변형) | 21st-dev, Context7 |
| 3. Diff Loop | Playwright 스크린샷 → 레퍼런스 비교 → 수정 (최대 3회) | Playwright |

핵심 변화:
- **v0은 `.mcp.json`에 포함되어 있지만, 파이프라인 핵심 의존성에서는 빠졌습니다** — 레퍼런스를 보여주면 Claude Code 혼자서도 충분합니다
- **Phase 간 `/clear`** — 컨텍스트 오염 방지. plan.md가 Phase 간 유일한 인터페이스
- 디자인 규칙 "강제" → "참고" — 경직된 규칙이 오히려 창의성을 죽였습니다

### MCP 서버가 실제로 한 일

각 MCP 서버가 실제로 한 일을 정리하면:

| MCP 서버 | 에이전트가 한 일 |
|----------|----------------|
| Firecrawl | 레퍼런스 URL 스크래핑해서 콘텐츠, 레이아웃, 브랜딩 추출 |
| Playwright | 스크린샷 캡처, 비주얼 diff 루프, 빌드된 앱 테스트 |
| 21st-dev | 프로덕션급 UI 컴포넌트 소싱 |
| Design Inspiration | Dribbble/Behance/Awwwards에서 디자인 레퍼런스 검색 |
| Context7 | 프레임워크/라이브러리 최신 문서 조회 |
| Sequential Thinking | 복잡한 분석을 구조화된 단계로 분해 |
| Defuddle Fetch | 웹 페이지에서 클린 콘텐츠 추출 |
| Lighthouse | 빌드된 앱 성능 측정 |
| GitHub | 브랜치 관리, PR 생성 |
| Vercel | 최종 앱 배포 |

---

## 실전: VoiceBridge AI 더빙 서비스 프로토타입

v4 파이프라인을 실제로 돌린 과정입니다.

**Phase 1 — Explore & Plan (5분)**

레퍼런스 URL을 Firecrawl에 던졌습니다. 브랜딩 JSON이 자동으로 나옵니다 — 컬러, 폰트, 간격, 버튼 스타일까지. plan.md를 생성했습니다.

**Phase 2 — Generate (15분)**

plan.md 기반으로 2개 프로토타입(레퍼런스 클론 + 변형)을 생성했습니다.

**Phase 3 — Diff Loop (10분, 3회 반복)**

Playwright로 스크린샷 찍고, 레퍼런스와 비교하고, 차이점을 수정하는 루프를 3회 돌렸습니다.

총 30분. URL 하나에서 2개 프로토타입 + 기능 페이지까지.

---

## 생성된 디렉토리 구조

파이프라인이 자동 생성한 파일들입니다:

```
_example/
├── analysis/
│   ├── prd.md                    # 자동생성 PRD
│   ├── requirements.json         # 기능 요구사항
│   ├── acceptance-criteria.md    # 합격 기준
│   ├── evaluation-matrix.md     # 평가 매트릭스
│   └── tech-constraints.md      # 기술 제약사항
├── prototypes/
│   ├── a/                        # 프로토타입 A (클론)
│   └── b/                        # 프로토타입 B (변형)
└── project/                      # 풀스택 앱 (33파일, ~3,570 LOC)
```

참고: `.claude/commands/` 폴더에는 파이프라인 스킬 프롬프트(입력 파일)가 들어있습니다. 이건 자동 생성물이 아니라 파이프라인을 구동하는 슬래시 커맨드 정의 파일입니다.

---

## 5가지 프롬프트 엔지니어링 팁

v1부터 v4까지 고치면서 얻은 것들:

1. **"창의적으로 해봐" 대신 스크린샷을 보여줘라** — 추상 규칙 100개보다 레퍼런스 스크린샷 1장이 낫습니다. "예쁘게 만들어"는 매번 비슷한 결과로 수렴하고, "이거 보고 따라해"는 레퍼런스만큼 다양한 결과가 나옵니다.

2. **프롬프트를 Phase별로 나눠라** — 349줄짜리 단일 파일도 잘 작동합니다. 다만 각 Phase가 자기만의 context budget을 가져야 합니다. 900줄을 한번에 읽히면 뒤쪽을 무시합니다.

3. **자기 코드는 자기가 고치게 해라** — build → check → self-review → fix 루프를 최대 3회로 제한합니다. 에이전트가 자기 실수를 보고 직접 고치는 게 사람이 개입하는 것보다 빠릅니다.

4. **Phase 사이에 `/clear` 쓰세요** — 컨텍스트 윈도우는 진짜입니다. Phase 1의 스크래핑 결과가 Phase 2의 코드 생성을 오염시킵니다. plan.md를 파일로 넘기고 컨텍스트를 리셋하면 품질이 올라갑니다.

5. **MCP 검증은 "실제 호출"로** — 서버 목록에 있어도 API 키 만료되면 소용없습니다. 파이프라인 시작 전 테스트 호출 필수입니다.

---

## 마무리

v1부터 v4까지 고치면서 느낀 건, 프롬프트 엔지니어링이 소프트웨어 아키텍처랑 같은 일이라는 겁니다.

900줄 모놀리식 → 7-Phase 모듈 → 레퍼런스 클론 전략 → 3-Phase 경량화.

리팩토링 패턴이 똑같습니다. 모놀리식이 유지보수 안 되면 나누고, 나누면 인터페이스가 필요하고, 복잡해지면 다시 줄이고.

프롬프트 795줄 전체를 [GitHub에 공개](https://github.com/lofcgi/claude-code-best-of-n)해뒀습니다.
