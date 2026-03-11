---
description: Copy the winning version to project/ directory
allowed-tools: [Read, Bash, Write, Glob]
---

Read evaluation/comparison.md and copy the best version to project/.

## Arguments
$ARGUMENTS = Version number to select (1, 2, or 3). If empty, use comparison.md recommendation.

## Tasks

1. Read evaluation/comparison.md
2. Determine version ($ARGUMENTS or recommended version)
3. Copy versions/vN/ contents to project/ (excluding CLAUDE.md, .claude/)
4. Create CLAUDE.md for project/ (polish stage context):
   - Project overview
   - Current status: "Selected version through Best-of-3 evaluation"
   - Remaining work: UI/UX polish, code review, final cleanup

5. Create project/.claude/commands/:

   polish.md:
   ```
   Polish the current project's UI/UX to senior level.

   ## 1. Loading States — Skeletons
   - `npx shadcn@latest add skeleton` (if not installed)
   - Create `loading.tsx` for every page that fetches data
   - Lists: repeated Skeleton, Cards: Skeleton maintaining layout
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

   ## 2. Toast Notifications
   - Use `sonner` (already installed)
   - Add `<Toaster />` to `src/app/layout.tsx`
   ```tsx
   import { toast } from "sonner"
   toast.success("Saved successfully")
   toast.error("An error occurred")
   ```

   ## 3. Dark/Light Mode
   - `npm install next-themes`
   - Create `src/components/theme-provider.tsx`:
   ```tsx
   "use client"
   import { ThemeProvider as NextThemesProvider } from "next-themes"
   export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
     return <NextThemesProvider {...props}>{children}</NextThemesProvider>
   }
   ```
   - Wrap layout.tsx with `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>`
   - Toggle button: `npx shadcn@latest add dropdown-menu` → ModeToggle component

   ## 4. Error Handling
   - Create `src/app/error.tsx` (global error boundary):
   ```tsx
   "use client"
   export default function Error({ error, reset }: { error: Error; reset: () => void }) {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen gap-4">
         <h2 className="text-2xl font-bold">Something went wrong</h2>
         <p className="text-muted-foreground">{error.message}</p>
         <button onClick={reset} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
           Try again
         </button>
       </div>
     )
   }
   ```
   - Create `src/app/not-found.tsx` (404 page):
   ```tsx
   import Link from "next/link"
   export default function NotFound() {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen gap-4">
         <h2 className="text-6xl font-bold">404</h2>
         <p className="text-muted-foreground">Page not found</p>
         <Link href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
           Go back home
         </Link>
       </div>
     )
   }
   ```

   ## 5. Empty State Handling
   - Show guidance message + CTA button when no data exists
   - Use Lucide icons (e.g., `<InboxIcon />`)

   ## 6. Responsive Design
   - Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px)
   - Verify Tailwind responsive classes: `sm:`, `md:`, `lg:`

   ## 7. Accessibility
   - `aria-label` on all interactive elements
   - Verify keyboard navigation works
   - Ensure sufficient color contrast

   ## 8. Meta + Favicon
   - Set title, description in `src/app/layout.tsx` metadata
   - Verify `public/favicon.ico` exists

   Run `npm run build` after completing each item.
   ```

   review.md:
   ```
   Review all code from a senior developer's perspective.
   Focus areas:
   1. Security: OWASP Top 10, API key exposure, XSS/CSRF
   2. Performance: Unnecessary re-renders, N+1 queries, bundle size
   3. Code quality: DRY, type safety, error handling
   4. Architecture: Separation of concerns, file structure
   Classify found issues by severity (High/Medium/Low) and fix them.
   ```

   finalize.md:
   ```
   Perform final cleanup:
   - Remove unnecessary console.log statements
   - Clean up unused imports
   - Resolve TODO/FIXME comments
   - Clean up package.json (remove unused dependencies)
   - Update .env.example
   ```

6. Guide: "cd project && claude → /polish or /review"
