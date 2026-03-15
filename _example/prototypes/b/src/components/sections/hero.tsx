"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DubbingAppPreview } from "@/components/dubbing-app-preview";
import Link from "next/link";

function FloatingLanguagePanel() {
  return (
    <div className="pointer-events-none select-none overflow-hidden rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl w-[200px]">
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-background/80 px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
        <span className="ml-1 text-[8px] text-muted-foreground">Live Translation</span>
      </div>
      <div className="p-2.5 space-y-1.5">
        {[
          { flag: "🇺🇸", text: "Hello, today we'll explore the future of AI..." },
          { flag: "🇰🇷", text: "안녕하세요, 오늘 AI의 미래를 살펴보겠습니다..." },
          { flag: "🇯🇵", text: "こんにちは、今日はAIの未来を探ります..." },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-1.5 rounded-lg bg-secondary/50 p-1.5 text-[7px] text-muted-foreground"
          >
            <span className="text-[9px] shrink-0">{item.flag}</span>
            <span className="leading-snug">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingStatsPanel() {
  return (
    <div className="pointer-events-none select-none overflow-hidden rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl w-[180px]">
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-background/80 px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
        <span className="ml-1 text-[8px] text-muted-foreground">Processing</span>
      </div>
      <div className="p-2.5 space-y-2">
        <div className="flex items-center gap-2 text-[8px]">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500 font-medium">3 files active</span>
        </div>
        {[
          { name: "keynote.mp4", pct: "100%", done: true },
          { name: "podcast.mp3", pct: "67%", done: false },
          { name: "tutorial.wav", pct: "23%", done: false },
        ].map((f) => (
          <div key={f.name} className="space-y-0.5">
            <div className="flex items-center justify-between text-[7px] text-muted-foreground">
              <span className="truncate">{f.name}</span>
              <span className={f.done ? "text-green-500" : ""}>{f.pct}</span>
            </div>
            <div className="h-1 bg-border/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${f.done ? "bg-green-500" : "bg-brand"}`}
                style={{ width: f.pct }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#624AFF20_0%,transparent_50%)]" />
      <div className="absolute top-1/4 right-0 w-[900px] h-[900px] bg-brand/6 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-lime/3 rounded-full blur-[150px]" />

      <div className="relative max-w-[1400px] mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-center">
          {/* Left: Text */}
          <div className="space-y-8 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Badge
                variant="outline"
                className="px-4 py-1.5 rounded-full border-brand/30 bg-brand/10 text-brand"
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                AI-Powered Dubbing
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.1,
              }}
            >
              Dub your
              <br />
              content into
              <br />
              <span className="text-brand">any language</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.2,
              }}
            >
              AI-powered transcription, translation, and voice synthesis.
              Upload once, reach the world.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.3,
              }}
            >
              <Link href="/dubbing">
                <Button
                  size="lg"
                  className="bg-brand hover:bg-brand-light rounded-full px-8 h-13 text-base font-semibold"
                  style={{
                    boxShadow: "0 0 30px rgba(98,74,255,0.4), 0 0 60px rgba(98,74,255,0.2)",
                  }}
                >
                  Start Dubbing Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-13 text-base border-border/50 hover:bg-secondary"
                >
                  See How it Works
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right: Cinematic layered app preview */}
          <div className="relative lg:-mr-32 xl:-mr-48">
            {/* Main app window — large, prominent */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 20,
                delay: 0.35,
              }}
              className="relative z-10"
              style={{
                transform: "perspective(1400px) rotateY(-10deg) rotateX(3deg)",
              }}
            >
              <DubbingAppPreview />
            </motion.div>

            {/* Floating translation panel — overlapping top-right */}
            <motion.div
              className="absolute -top-4 right-4 z-20"
              initial={{ opacity: 0, y: 40, x: 30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 20,
                delay: 0.65,
              }}
              style={{
                transform: "perspective(800px) rotateY(-6deg) rotateX(2deg)",
              }}
            >
              <FloatingLanguagePanel />
            </motion.div>

            {/* Floating stats panel — bottom-left */}
            <motion.div
              className="absolute -bottom-6 -left-6 z-20"
              initial={{ opacity: 0, y: 40, x: -30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 20,
                delay: 0.85,
              }}
              style={{
                transform: "perspective(800px) rotateY(-4deg) rotateX(2deg)",
              }}
            >
              <FloatingStatsPanel />
            </motion.div>

            {/* Ambient glow */}
            <div
              className="absolute inset-0 -z-10 scale-125"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 60% 50%, rgba(98,74,255,0.1), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
