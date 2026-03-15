# Frontend Aesthetics Guide (AI Slop 탈피 규칙)

Anthropic 공식 Frontend Aesthetics 가이드 기반.
Claude는 가이드 없이 "AI slop" 미학으로 수렴하므로, 이 규칙을 명시적으로 따라야 한다.

> **오버라이드 원칙**: 이 가이드의 모든 규칙은 **AI slop 방지 기본값**이다.
> 레퍼런스가 명확히 다른 스타일을 사용하면, 레퍼런스를 따른다.
> 예: 레퍼런스가 Inter 폰트를 의도적으로 사용 → Inter 허용.
> 예: 레퍼런스가 밝은 배경 + 미니멀 → 다크 테마 규칙 무시.

---

## Typography

### 금지 폰트 (AI slop 기본값)
- Inter, Roboto, Open Sans, Lato, Arial, Helvetica, system-ui 기본값

### 권장 폰트 (용도별)
- **Code/Tech**: JetBrains Mono, Fira Code, Space Grotesk
- **Editorial**: Playfair Display, Crimson Pro, Fraunces
- **Startup/Modern**: Clash Display, Satoshi, Cabinet Grotesk
- **Distinctive**: Bricolage Grotesque, Newsreader, General Sans

### Font Weight 극단 규칙
- **사용**: 200 (thin) vs 900 (black) — 극단적 대비로 시각 계층 생성
- **금지**: 400 vs 600 — 너무 비슷, 계층 구조 약함

### Size Jump 규칙
- **필수**: body 대비 heading 3x+ 크기 차이 (예: body 16px → heading 48-96px)
- **금지**: 1.5x 점프 (예: body 16px → heading 24px) — 시각적 임팩트 부족

---

## Color & Theme

### 팔레트 구성 원칙
- **Dominant color + sharp accent** — 하나의 색이 지배하고, 액센트가 포인트
- **균등 분배 금지** — 3색을 33%씩 사용하면 시각적 초점 없음
- **CSS variables로 일관성 유지** — design-tokens.ts 참조

### 금지 조합 (클리셰)
- 보라 그라디언트 + 흰 배경 (2023년 AI 랜딩 클리셰)
- 파랑→보라 그라디언트 (과용됨)
- 무채색만의 팔레트 (시각적 에너지 없음)

### 다크 테마 가이드
- 배경: 깊은 검정 (`#09090b`, `#0a0a0a`) — `#1a1a1a`는 너무 밝음
- 카드: `bg-white/5` ~ `bg-white/8` — `bg-gray-800` 금지 (너무 밝고 flat)
- 텍스트: `text-white/90` (primary), `text-white/60` (secondary)
- Borders: `border-white/10` — `border-gray-700` 금지
- 비비드 accent으로 에너지 생성

### 라이트 테마 가이드
- 배경: 따뜻한 화이트 (`#fafaf9`, `#f5f5f4`) — 순수 `#ffffff` 지양
- 카드: `bg-white` + subtle shadow — `bg-gray-100` 금지
- 볼드 primary color가 주도
- Surface에 미묘한 따뜻한 톤 (ivory, cream)

---

## Motion & Animation

### 핵심 원칙
- **오케스트레이션** > 개별 애니메이션 — 하나의 잘 조율된 페이지 로드 (staggered reveal)가 흩어진 마이크로 인터랙션보다 강력
- **고임팩트 순간에 집중**: 페이지 로드, Hero 진입, 섹션 스크롤 진입
- **목적 없는 애니메이션 금지** — 모든 모션에 이유가 있어야 함

### Spring Physics (필수)
```tsx
transition={{
  type: "spring",
  stiffness: 200,
  damping: 25,
}}
```
- **linear easing 절대 금지**
- **ease-in-out 지양** — spring이 더 자연스러움

### Staggered Reveal 패턴 (Hero 필수)
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};
```

### Scroll Reveal 패턴 (섹션 진입)
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
>
```

---

## Backgrounds & Depth

### 핵심 원칙
- **솔리드 컬러 배경 기본값 금지** — 최소 2레이어
- **Hero는 5레이어** (visual-architecture.md 참조)
- **일반 섹션은 2레이어 이상**: gradient + pattern (grid/dots/noise)
- **분위기와 깊이감 생성이 목표**

### 레이어 옵션
| 레이어 유형 | 예시 | 용도 |
|------------|------|------|
| Gradient | `radial-gradient(ellipse at 50% 0%, ${primary}20, transparent)` | 공간감 |
| Pattern | `bg-grid`, `bg-dots` | 텍스처 |
| Noise | `bg-noise` (::after) | 깊이감 |
| Particles | `<Sparkles>`, `<Meteors>` | 생동감 |
| SVG Effects | `<BackgroundBeams>` | 움직임 |
| Blur Blobs | `blur-3xl rounded-full` div | 부드러운 배경광 |

---

## 절대 금지 목록 ("AI Slop" 지표)

이 항목 중 하나라도 코드에 있으면 즉시 수정하라:

1. **균일한 3-column 동일 그리드** → BentoGrid 또는 비대칭 레이아웃
2. **중앙 정렬만의 레이아웃** → 비대칭 배치 최소 2개 섹션
3. **모든 카드가 동일한 크기/모양** → 크기 변형, BentoGrid
4. **호버 효과 없는 플랫 카드** → border glow + scale(1.02)
5. **아이콘+텍스트만의 Feature 카드** → 이미지 or CSS 비주얼 필수
6. **회색 플레이스홀더** → CSS 목업, gradient, 실제 이미지
7. **레퍼런스보다 적은 섹션 수** → 섹션 인벤토리 미러링
8. **보수적 타이포 (text-4xl Hero)** → text-6xl md:text-8xl font-black (레퍼런스 타이포가 다르면 따름)
9. **기본 filled 버튼 (glow 없음)** → glow box-shadow 30px+ (레퍼런스가 solid이면 따름)
10. **Inter/Roboto/Arial 폰트** → 권장 폰트 사용 (레퍼런스가 명시적으로 사용하면 허용)
11. **Hero 배경이 단일 CSS gradient** → 최소 2-layer (레퍼런스 밀도에 맞춰)
12. **py-24/py-32 섹션 패딩** → 레퍼런스의 여백 패턴 참고 (기본값 py-40)
13. **BrowserMockup에 shadow/perspective 없음** → 3D perspective + tinted shadow
14. **균등 분배 팔레트** → dominant + sharp accent
15. **linear easing** → spring physics
