---
description: 최적 버전을 project/ 디렉토리에 복사
allowed-tools: [Read, Bash, Write, Glob]
---

evaluation/comparison.md를 읽고 최적 버전을 project/에 복사하세요.

## 인자
$ARGUMENTS = 선택할 버전 번호 (1, 2, or 3). 비어있으면 comparison.md의 추천 사용.

## 수행 작업

1. evaluation/comparison.md 읽기
2. 버전 결정 ($ARGUMENTS 또는 추천 버전)
3. versions/vN/ 내용을 project/로 복사 (CLAUDE.md, .claude/ 제외)
4. project/용 CLAUDE.md 생성 (폴리시 단계 컨텍스트):
   - 프로젝트 개요
   - 현재 상태: "Best-of-3 평가를 통해 선택된 버전"
   - 남은 작업: UI/UX 폴리시, 코드 리뷰, 최종 정리

5. project/.claude/commands/ 생성:

   polish.md:
   ```
   현재 프로젝트의 UI/UX를 시니어 수준으로 다듬으세요.

   ## 1. 로딩 상태 — 스켈레톤
   - `npx shadcn@latest add skeleton` (미설치 시)
   - 데이터 fetch하는 모든 페이지에 `loading.tsx` 생성
   - 리스트: Skeleton 반복, 카드: Skeleton으로 레이아웃 유지
   ```tsx
   import { Skeleton } from "@/components/ui/skeleton"
   export default function Loading() {
     return (
       <div className="space-y-4">
         <Skeleton className="h-8 w-[250px]" />
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-full" />
       </div>
     )
   }
   ```

   ## 2. 토스트 알림
   - `sonner` 사용 (이미 설치됨)
   - `src/app/layout.tsx`에 `<Toaster />` 추가
   ```tsx
   import { toast } from "sonner"
   toast.success("저장되었습니다")
   toast.error("오류가 발생했습니다")
   ```

   ## 3. 다크/라이트 모드
   - `npm install next-themes`
   - `src/components/theme-provider.tsx` 생성:
   ```tsx
   "use client"
   import { ThemeProvider as NextThemesProvider } from "next-themes"
   export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
     return <NextThemesProvider {...props}>{children}</NextThemesProvider>
   }
   ```
   - layout.tsx에서 `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>` 감싸기
   - 토글 버튼: `npx shadcn@latest add dropdown-menu` → ModeToggle 컴포넌트

   ## 4. 에러 처리
   - `src/app/error.tsx` 생성 (글로벌 에러 boundary):
   ```tsx
   "use client"
   export default function Error({ error, reset }: { error: Error; reset: () => void }) {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen gap-4">
         <h2 className="text-2xl font-bold">문제가 발생했습니다</h2>
         <p className="text-muted-foreground">{error.message}</p>
         <button onClick={reset} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
           다시 시도
         </button>
       </div>
     )
   }
   ```
   - `src/app/not-found.tsx` 생성 (404 페이지):
   ```tsx
   import Link from "next/link"
   export default function NotFound() {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen gap-4">
         <h2 className="text-6xl font-bold">404</h2>
         <p className="text-muted-foreground">페이지를 찾을 수 없습니다</p>
         <Link href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
           홈으로 돌아가기
         </Link>
       </div>
     )
   }
   ```

   ## 5. 빈 상태 처리
   - 데이터가 없을 때 안내 메시지 + CTA 버튼 표시
   - 아이콘은 Lucide 사용 (예: `<InboxIcon />`)

   ## 6. 반응형
   - 모바일 (< 640px), 태블릿 (640-1024px), 데스크탑 (> 1024px)
   - Tailwind 반응형 클래스 확인: `sm:`, `md:`, `lg:`

   ## 7. 접근성
   - 모든 인터랙티브 요소에 `aria-label`
   - 키보드 네비게이션 가능 확인
   - 색상 대비 충분한지 확인

   ## 8. 메타 + 파비콘
   - `src/app/layout.tsx`의 metadata에 title, description 설정
   - `public/favicon.ico` 존재 확인

   각 항목 완료 후 `npm run build`로 빌드 확인.
   ```

   review.md:
   ```
   시니어 개발자 관점에서 전체 코드를 리뷰하세요.
   관점:
   1. 보안: OWASP Top 10, API 키 노출, XSS/CSRF
   2. 성능: 불필요한 리렌더링, N+1 쿼리, 번들 사이즈
   3. 코드 품질: DRY, 타입 안전성, 에러 핸들링
   4. 아키텍처: 관심사 분리, 파일 구조
   발견한 문제를 심각도(High/Medium/Low)로 분류하고 수정하세요.
   ```

   finalize.md:
   ```
   최종 정리를 수행하세요:
   - 불필요한 console.log 제거
   - 미사용 import 정리
   - TODO/FIXME 주석 해결
   - package.json 정리 (미사용 의존성 제거)
   - .env.example 업데이트
   ```

6. 안내: "cd project && claude → /polish 또는 /review"
