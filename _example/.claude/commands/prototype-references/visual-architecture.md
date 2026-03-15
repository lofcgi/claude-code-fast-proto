# Visual Architecture Guidelines (품질 하한선 + Smart Defaults)

이 파일의 규칙은 2개 티어로 나뉜다:
- **Tier 1 (절대)**: 레퍼런스 무관. AI slop 방지 + 품질 하한선. 항상 적용.
- **Tier 2 (Smart Default)**: 레퍼런스가 명확히 다른 스타일이면 오버라이드 가능.

각 섹션에 [Tier 1] 또는 [Tier 2] 태그를 표기.

---

## Hero Architecture (레퍼런스 충실도 기반)

모든 랜딩 페이지의 Hero 섹션은 **레퍼런스와 동등한 비주얼 밀도**를 가져야 한다.
레퍼런스가 3레이어면 3레이어 OK, 5레이어면 5레이어 필수.

### 필수 요소 [Tier 1]
- **제품 UI가 주인공** — 앱 스크린샷/데모가 없는 Hero는 금지
- 배경 효과(beam, aurora, sparkle)는 **선택** — 레퍼런스에 있을 때만 사용

### 레이어 구성 [Tier 2 — 레퍼런스에 맞춰 조정]

```
Layer 1: Base surface color (palettes.x.surface)
Layer 2: Background effect — 레퍼런스에 있을 경우에만 (<BackgroundBeams> | <LampEffect> | <AuroraBackground>)
Layer 3: Pattern overlay — 레퍼런스에 있을 경우에만 (bg-grid | bg-dots | bg-noise)
Layer 4: Radial glow (radial-gradient with primary color, 15-25% opacity)
Layer 5: 제품 UI 스크린샷/데모 (필수) — BrowserMockup 또는 앱 프리뷰
```

### 코드 패턴 [Tier 2 — 레퍼런스 레이아웃이 다르면 오버라이드]:

```tsx
<section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: p.surface }}>
  {/* Layer 2: Background effect — 레퍼런스에 있을 때만 */}
  {/* <BackgroundBeams primaryColor={p.primary} /> */}
  {/* Layer 3: Pattern overlay — 레퍼런스에 있을 때만 */}
  {/* <div className="absolute inset-0 bg-grid" /> */}
  {/* Layer 4: Radial glow */}
  <div
    className="absolute inset-0"
    style={{
      background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${p.primary}25, transparent)`,
    }}
  />
  {/* Content — 반드시 z-10 이상 */}
  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-4">
    {/* 좌측: 텍스트 + CTA */}
    <div className="flex-1">
      {/* Hero headline + subtext + CTA */}
    </div>
    {/* 우측: 제품 UI (필수) */}
    <div className="flex-1">
      <BrowserMockup url="app.example.com">
        <img src="/screenshots/a-app.png" alt="App Preview" className="w-full" />
      </BrowserMockup>
    </div>
  </div>
</section>
```

### 레퍼런스 패턴 예시:
- **perso.ai 스타일**: 좌측 대형 텍스트 + 우측 겹치는 앱 윈도우들 (메인 + 플로팅 패널)
- **linear.app 스타일**: 중앙 텍스트 + 아래 풀위드 제품 스크린샷
- **vercel.com 스타일**: 중앙 대형 텍스트 + 코드/터미널 데모
- **notion.so 스타일**: 미니멀 텍스트 + 제품 UI 일러스트레이션
- **framer.com 스타일**: 타이포 중심 Hero + 인터랙티브 데모
- **stripe.com 스타일**: 코드 블록 + 라이브 결과 미리보기

→ 레퍼런스를 분석하여 가장 유사한 패턴을 식별하고, 그 패턴으로 구현.
  위 예시에 없는 패턴이면 레퍼런스에서 직접 추출.

---

## Typography Hierarchy [Tier 2 — 레퍼런스 타이포가 우선]

### Hero Headline
- **Smart Default**: `text-6xl md:text-8xl font-black tracking-tight`
- **레퍼런스가 우아한 세리프 `text-4xl`이면** → 레퍼런스를 따른다
- **핵심 키워드**: `<GradientText>` 래핑 권장 (레퍼런스에 gradient text가 없으면 생략 가능)

```tsx
<h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
  Build with{" "}
  <GradientText from={p.primary} to={p.accent}>
    Confidence
  </GradientText>
</h1>
```

### Section Heading
- **필수**: `text-3xl md:text-5xl font-bold`
- **절대 금지**: text-2xl, text-xl (너무 작음)

```tsx
<h2 className="text-3xl md:text-5xl font-bold tracking-tight">
  Why teams choose <GradientText from={p.primary} to={p.accent}>us</GradientText>
</h2>
```

### Subtext
- **필수**: `text-lg md:text-xl text-muted-foreground max-w-2xl`

### Font Weight 극단 [Tier 2]
- **Smart Default**: weight 200 (thin/light subtext) vs weight 900 (black headlines)
- **레퍼런스가 400/700 조합이면** → 레퍼런스를 따른다
- **금지 (Tier 1)**: weight 400 vs 600만 사용하여 계층 구조가 없는 경우

---

## CTA Button Premium

### Glow Shadow [Tier 2 — 레퍼런스 CTA 스타일이 우선]
기본 filled/ghost 버튼의 Smart Default는 glow box-shadow.
레퍼런스가 미니멀 solid 버튼이면 → solid 스타일을 따른다.

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  className="px-10 py-4 text-base font-semibold rounded-full cursor-pointer"
  style={{
    backgroundColor: p.primary,
    color: p.mode === "dark" ? "#000" : "#fff",
    boxShadow: `0 0 30px ${p.primary}66, 0 0 60px ${p.primary}33`,
  }}
>
  Start Building Free <ArrowRight className="ml-2 inline w-4 h-4" />
</motion.button>
```

### CTA 규칙:
- **최소 크기**: `px-10 py-4 text-base` (px-6 py-2는 너무 작음) [Tier 2]
- **glow**: `box-shadow: 0 0 30px ${primary}66, 0 0 60px ${primary}33` [Tier 2 — 레퍼런스가 solid이면 생략]
- **hover**: `scale(1.05)` + glow 강화 [Tier 1 — whileHover 필수]
- **whileTap**: `scale(0.97)` 피드백 [Tier 1 — 인터랙션 피드백 필수]
- **Secondary CTA**: ghost style + subtle border, glow 불필요

---

## BrowserMockup Premium [Tier 1]

3D perspective transform 또는 color-tinted shadow 중 최소 하나 적용.

```tsx
<div
  className="relative mx-auto max-w-5xl"
  style={{
    transform: "perspective(1200px) rotateY(-5deg) rotateX(2deg)",
    boxShadow: `0 25px 60px ${p.primary}40`,
  }}
>
  <BrowserMockup url="app.example.com">
    <img
      src="/screenshots/a-app.png"
      alt="App Preview"
      className="w-full"
    />
  </BrowserMockup>
</div>
```

### 규칙:
- **3D perspective**: `perspective(1200px) rotateY(-5deg) rotateX(2deg)` — 입체감
- **Color-tinted shadow**: primary color 25-40% opacity, 20-60px blur
- **플랫 mockup 금지** — shadow 없는 단순 border 박스 금지

### Anti-pattern: 와이어프레임 목업
금지:
- dashed border 업로드 영역 + 랜덤 바 차트 = 와이어프레임
- 기능 페이지 빈 상태만 보여주는 목업
- UI 요소 5개 미만 단순 카드

대신 기능 페이지의 가장 풍부한 상태(데이터 채워진 워크플로우 진행 중)를 재현하라.

---

## Section Spacing [Tier 2 — 레퍼런스 여백 패턴이 우선]

- **Smart Default**: `py-40` 이상
- **레퍼런스가 `py-24` 빡빡한 밀도면** → 레퍼런스를 따른다
- **Hero**: `min-h-screen` (py 불필요)
- **섹션 간 구분**: gradient divider 또는 충분한 투명 여백

```tsx
{/* 올바른 섹션 패딩 */}
<section className="relative py-40 overflow-hidden">
  <div className="container mx-auto px-4">
    {/* Section content */}
  </div>
</section>

{/* 선택: 섹션 간 gradient divider */}
<div
  className="h-px w-full"
  style={{
    background: `linear-gradient(90deg, transparent, ${p.primary}30, transparent)`,
  }}
/>
```

---

## Noise Texture [Tier 2 — 레퍼런스에 없으면 생략 가능]

Gradient가 있는 모든 섹션에 bg-noise 클래스를 적용하라 (Smart Default).

```tsx
{/* position: relative 필수 — ::after가 absolute 포지셔닝 */}
<section className="relative bg-noise" style={{ background: `linear-gradient(...)` }}>
  {/* Content must be z-10+ to appear above noise */}
  <div className="relative z-10">...</div>
</section>
```

---

## Feature Card [Tier 1 — 이미지 필수]

텍스트+아이콘만의 카드 절대 금지. 각 Feature 카드에 실제 이미지 또는 CSS 비주얼을 반드시 포함하라.

```tsx
<motion.div
  whileHover={{ scale: 1.02, borderColor: `${p.primary}40` }}
  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
  style={{
    boxShadow: `0 0 0 0 ${p.primary}00`,
  }}
>
  {/* 이미지 또는 CSS 비주얼 — 필수 */}
  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-white/5 to-white/0">
    <img
      src={featureImage}
      alt={featureTitle}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  <h3 className="text-xl font-bold mb-2">{featureTitle}</h3>
  <p className="text-muted-foreground text-sm">{featureDescription}</p>
</motion.div>
```

### hover 효과:
- **border glow**: `borderColor: ${p.primary}40`
- **scale**: `scale(1.02)`
- **이미지 zoom**: `group-hover:scale-105`

---

## 섹션 타입별 비주얼 밀도 규칙 [Tier 2 — 레퍼런스 밀도가 우선]

모든 섹션은 아래 최소 비주얼 밀도를 충족해야 한다 (Smart Default). 레퍼런스의 밀도 패턴이 다르면 레퍼런스를 따른다.

| 섹션 타입 | 최소 레이어 | 이미지 필수 | 장식 요소 | 호버 효과 |
|----------|-----------|-----------|----------|----------|
| Hero | 레퍼런스와 동등 | 제품 UI 스크린샷 1개 (필수) | 레퍼런스에 맞춰 선택 | N/A |
| Trust Metrics | 2 | 선택 | NumberTicker glow | N/A |
| Feature (앱 UI) | 2 | 앱 스크린샷 | 탭 전환 인터랙션 | border glow + scale |
| Feature BentoGrid | 2 | 카드당 1개 | SpotlightCard | border glow + scale |
| Feature Spotlight | 2 | 카드당 1개 | Spotlight 커서 | border glow + scale |
| Comparison Table | 2 | 선택 | gradient header | row hover |
| Testimonial | 2 | 아바타 64px | 선택 | card lift |
| Process Steps | 2 | 단계당 스크린샷 | 번호 glow | N/A |
| Stats | 2 + Sparkles | 선택 | 풀블리드 gradient | N/A |
| Client Logos | 1 | 로고 | marquee | grayscale→color |
| FAQ | 2 | 선택 | accordion spring | open/close |
| Pricing | 2 | 선택 | 중앙 카드 glow | card scale |
| Footer CTA | 2 + 장식 | 선택 | BackgroundBeams | CTA glow |

### 소셜 프루프 섹션 [Tier 2 — 레퍼런스에 있을 때]

**문제**: Hero + Features만 있고 Testimonials/Stats/FAQ가 빠지면 "기능 나열 사이트"처럼 보인다.
레퍼런스 대비 섹션 구조 격차가 발생하는 주요 원인.

**해결**: 레퍼런스에 소셜 프루프 섹션(Testimonials, Stats, FAQ)이 있으면 반드시 포함.

#### Testimonials [Tier 2 — 레퍼런스에 있을 때]:
- 인원/레이아웃: 레퍼런스의 수량과 그리드 패턴을 따른다
- 아바타: Unsplash portrait 필수 (placeholder div 금지) [Tier 1]
- 카드 스타일: 레퍼런스의 카드 패턴을 따른다

#### Stats [Tier 2 — 레퍼런스에 있을 때]:
- 메트릭 수/크기: 레퍼런스의 패턴을 따른다
- `whileInView` 애니메이션 [Tier 1]

#### FAQ [Tier 2 — 레퍼런스에 있을 때]:
- Q&A 수: 레퍼런스의 패턴을 따른다
- 아코디언 인터랙션 (AnimatePresence) [Tier 1]

### SectionWrapper 필수 [Tier 1]

모든 섹션은 `SectionWrapper` 또는 동등한 최소 2레이어 배경을 사용해야 한다:
- Layer 1: Base gradient 또는 pattern
- Layer 2: Radial accent glow
- Layer 3: Noise texture (선택)
- 콘텐츠: scroll-reveal 애니메이션 래핑

### 섹션 간 전환

섹션 사이에 gradient divider를 사용하여 시각적 구분:
```tsx
<div
  className="h-px w-full"
  style={{ background: `linear-gradient(90deg, transparent, ${p.primary}30, transparent)` }}
/>
```

### Hero 이후 비주얼 깊이 유지 규칙 [Tier 1]

**문제**: Hero는 풍부하지만 나머지 섹션은 단색 배경 + 텍스트로 "비주얼 깊이 붕괴" 발생.

**해결**:
1. 모든 섹션에 SectionWrapper 적용 (최소 2레이어)
2. 3-4개 섹션마다 "비주얼 앵커" 섹션 배치:
   - **앱 UI Feature**: 좌측 텍스트 + 우측 앱 스크린샷 (탭으로 기능 전환)
   - Product Demo: BrowserMockup + tinted shadow
   - Footer CTA: 대형 헤드라인
3. Feature 카드에 반드시 이미지 포함 (텍스트+아이콘만 금지)
4. Testimonial에 64px 아바타 이미지 필수
