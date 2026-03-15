# Premium Components Reference

Phase 3에서 이 파일을 Read하여 `components/premium/`에 아래 컴포넌트를 생성하라.
각 컴포넌트는 프로덕션 수준의 완전한 구현이다. 단순화하거나 생략하지 마라.

---

## 1. background-beams.tsx

SVG 빔 + framer-motion pathLength 애니메이션. Hero Layer 2 옵션.

```tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BackgroundBeamsProps {
  primaryColor?: string;
  className?: string;
}

export function BackgroundBeams({
  primaryColor = "#6366f1",
  className = "",
}: BackgroundBeamsProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths] = useState(() => generatePaths(8));

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke={primaryColor}
            strokeWidth={1.5}
            strokeOpacity={0.08 + (i % 3) * 0.04}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3 + i * 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function generatePaths(count: number): string[] {
  const paths: string[] = [];
  for (let i = 0; i < count; i++) {
    const startX = Math.random() * 200 - 100;
    const startY = Math.random() * 900;
    const cp1x = 300 + Math.random() * 400;
    const cp1y = Math.random() * 900;
    const cp2x = 700 + Math.random() * 400;
    const cp2y = Math.random() * 900;
    const endX = 1440 + Math.random() * 100;
    const endY = Math.random() * 900;
    paths.push(`M${startX},${startY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`);
  }
  return paths;
}
```

---

## 2. lamp-effect.tsx

Conic-gradient 확장 애니메이션. Aceternity LampContainer 패턴. Hero Layer 2 옵션.

```tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

interface LampEffectProps {
  primaryColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export function LampEffect({
  primaryColor = "#6366f1",
  children,
  className = "",
}: LampEffectProps) {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full ${className}`}
    >
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            ["--conic-position" as string]: "from 70deg at center top",
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible bg-gradient-conic from-transparent via-transparent"
        >
          <div
            className="absolute w-full left-0 h-40 bottom-0 z-20"
            style={{
              background: `linear-gradient(to top, ${primaryColor}08, transparent)`,
            }}
          />
          <div className="absolute w-40 h-full left-0 bottom-0 z-20 bg-gradient-to-r from-background to-transparent" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            ["--conic-position" as string]: "from 290deg at center top",
          }}
          className="absolute inset-auto left-1/2 h-56 overflow-visible bg-gradient-conic from-transparent via-transparent"
        >
          <div className="absolute w-40 h-full right-0 bottom-0 z-20 bg-gradient-to-l from-background to-transparent" />
          <div
            className="absolute w-full right-0 h-40 bottom-0 z-20"
            style={{
              background: `linear-gradient(to top, ${primaryColor}08, transparent)`,
            }}
          />
        </motion.div>

        {/* Top highlight line */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{ backgroundColor: primaryColor }}
        />
        <motion.div
          initial={{ width: "15rem", opacity: 0.5 }}
          whileInView={{ width: "30rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: `${primaryColor}30` }}
        />
      </div>

      <div className="relative z-50 flex -translate-y-60 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
```

---

## 3. aurora-background.tsx

3-layer gradient + CSS @keyframes aurora. Hero Layer 2 옵션.

```tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface AuroraBackgroundProps {
  primaryColor?: string;
  accentColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export function AuroraBackground({
  primaryColor = "#6366f1",
  accentColor = "#ec4899",
  children,
  className = "",
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Aurora Layer 1 */}
      <div
        className="absolute inset-0 animate-aurora opacity-50"
        style={{
          backgroundImage: `
            repeating-linear-gradient(100deg, ${primaryColor}15 10%, ${accentColor}10 15%, transparent 20%, ${primaryColor}10 25%, transparent 30%),
            repeating-linear-gradient(100deg, ${primaryColor}20 0%, ${accentColor}15 7%, transparent 10%, ${primaryColor}10 12%, transparent 16%)
          `,
          backgroundSize: "300% 300%, 200% 200%",
        }}
      />
      {/* Aurora Layer 2 */}
      <div
        className="absolute inset-0 animate-aurora opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% 0%, ${primaryColor}40, transparent),
            radial-gradient(ellipse 60% 40% at 70% 100%, ${accentColor}30, transparent)
          `,
          animationDelay: "-5s",
        }}
      />
      {/* Aurora Layer 3 */}
      <div
        className="absolute inset-0 animate-aurora opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 60% at 30% 50%, ${primaryColor}25, transparent),
            radial-gradient(ellipse 70% 50% at 80% 50%, ${accentColor}20, transparent)
          `,
          animationDelay: "-10s",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

---

## 4. meteors.tsx

CSS rotate(215deg) translateX + random 배치 + ::after 꼬리. Hero Layer 5 옵션.

```tsx
"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

interface MeteorsProps {
  count?: number;
  primaryColor?: string;
  className?: string;
}

export function Meteors({
  count = 20,
  primaryColor = "#6366f1",
  className = "",
}: MeteorsProps) {
  const meteors = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100 - 10,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 1.5 + Math.random() * 3,
      size: 1 + Math.random() * 1.5,
    }));
  }, [count]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute animate-meteor"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            borderRadius: "50%",
            backgroundColor: primaryColor,
            boxShadow: `0 0 ${m.size * 4}px ${m.size}px ${primaryColor}80`,
            transform: "rotate(215deg) translateX(0)",
            animation: `meteor ${m.duration}s linear ${m.delay}s infinite`,
          }}
        >
          <style jsx>{`
            span::after {
              content: "";
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: ${40 + Math.random() * 60}px;
              height: ${m.size * 0.5}px;
              background: linear-gradient(90deg, ${primaryColor}, transparent);
            }
          `}</style>
        </span>
      ))}
    </div>
  );
}
```

> Note: `@keyframes meteor`는 globals.css에 정의. Phase 3 globals.css 확장 섹션 참조.

---

## 5. sparkles.tsx

Framer-motion 부유 파티클 (y/opacity oscillation). Hero Layer 5 옵션.

```tsx
"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

interface SparklesProps {
  count?: number;
  primaryColor?: string;
  className?: string;
}

export function Sparkles({
  count = 15,
  primaryColor = "#6366f1",
  className = "",
}: SparklesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: primaryColor,
            boxShadow: `0 0 ${p.size * 3}px ${primaryColor}60`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
```

---

## 6. gradient-text.tsx

Background-clip: text gradient span. Typography 강조 필수 컴포넌트.

```tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GradientTextProps {
  from?: string;
  to?: string;
  via?: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  from = "#6366f1",
  to = "#ec4899",
  via,
  children,
  className = "",
  animate = false,
}: GradientTextProps) {
  const gradient = via
    ? `linear-gradient(135deg, ${from}, ${via}, ${to})`
    : `linear-gradient(135deg, ${from}, ${to})`;

  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        animate && "animate-gradient-x bg-[length:200%_auto]",
        className
      )}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}
```

---

## 7. floating-dock.tsx

macOS Dock 스타일 하단 네비게이션. Framer-motion hover scale.

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

export function FloatingDock({ items, className = "" }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end rounded-2xl px-4 pb-3",
        "bg-white/5 backdrop-blur-md border border-white/10",
        "shadow-lg shadow-black/20",
        className
      )}
    >
      {items.map((item, i) => (
        <DockIcon key={i} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  title,
  icon,
  href,
}: DockItem & { mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
    >
      <a href={href} title={title} className="flex items-center justify-center w-1/2 h-1/2">
        {icon}
      </a>
    </motion.div>
  );
}
```
