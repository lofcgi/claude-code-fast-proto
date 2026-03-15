"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DubbingAppPreview } from "@/components/dubbing-app-preview";
import Link from "next/link";

function FloatingVoicePanel() {
  return (
    <div className="pointer-events-none select-none overflow-hidden rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl w-[220px]">
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-background/80 px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
        <span className="ml-1 text-[8px] text-muted-foreground">Voice Styles</span>
      </div>
      <div className="p-2.5 space-y-1.5">
        {[
          { name: "Natural Female", lang: "Korean", active: true },
          { name: "Deep Male", lang: "English" },
          { name: "Warm Narrator", lang: "Japanese" },
          { name: "Professional", lang: "Spanish" },
        ].map((voice) => (
          <div
            key={voice.name}
            className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[8px] ${
              voice.active
                ? "bg-brand/15 border border-brand/30 text-brand font-medium"
                : "bg-secondary/50 text-muted-foreground"
            }`}
          >
            <span>{voice.name}</span>
            <span className="text-[7px] opacity-60">{voice.lang}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingAvatarPanel() {
  return (
    <div className="pointer-events-none select-none overflow-hidden rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl w-[160px]">
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-background/80 px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
        <span className="ml-1 text-[8px] text-muted-foreground">Output</span>
      </div>
      <div className="p-2.5 space-y-2">
        <div className="flex items-center gap-2 text-[8px]">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500 font-medium">Dubbing Active</span>
        </div>
        {[
          { lang: "🇰🇷 Korean", pct: "100%" },
          { lang: "🇪🇸 Spanish", pct: "73%" },
          { lang: "🇯🇵 Japanese", pct: "41%" },
        ].map((item) => (
          <div key={item.lang} className="space-y-0.5">
            <div className="flex items-center justify-between text-[7px] text-muted-foreground">
              <span>{item.lang}</span>
              <span>{item.pct}</span>
            </div>
            <div className="h-1 bg-border/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full"
                style={{ width: item.pct }}
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
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#624AFF25_0%,transparent_50%)]" />
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand/8 rounded-full blur-[180px]" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px]" />

      <div className="relative max-w-[1400px] mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-center">
          {/* Left: Text */}
          <div className="space-y-8 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Badge
                variant="outline"
                className="px-4 py-1.5 rounded-full border-brand/30 bg-brand/5 text-brand"
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                AI-Powered Dubbing
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.1,
              }}
            >
              Dub your content
              <br />
              into{" "}
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
              Upload audio or video files, and get them dubbed into any language
              with AI-powered transcription, translation, and voice synthesis.
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

          {/* Right: Layered app preview — bleeds off-screen */}
          <div className="relative lg:-mr-24 xl:-mr-32">
            {/* Main app window — large, slightly rotated */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.3,
              }}
              className="relative z-10"
              style={{
                transform: "perspective(1200px) rotateY(-8deg) rotateX(2deg)",
              }}
            >
              <DubbingAppPreview />
            </motion.div>

            {/* Floating voice panel — top-right, overlapping */}
            <motion.div
              className="absolute -top-6 -right-4 z-20"
              initial={{ opacity: 0, y: 30, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.6,
              }}
              style={{
                transform: "perspective(800px) rotateY(-5deg) rotateX(3deg)",
              }}
            >
              <FloatingVoicePanel />
            </motion.div>

            {/* Floating output panel — bottom-left, overlapping */}
            <motion.div
              className="absolute -bottom-8 -left-8 z-20"
              initial={{ opacity: 0, y: 30, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.8,
              }}
              style={{
                transform: "perspective(800px) rotateY(-3deg) rotateX(2deg)",
              }}
            >
              <FloatingAvatarPanel />
            </motion.div>

            {/* Ambient glow behind the composition */}
            <div
              className="absolute inset-0 -z-10 scale-110"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(98,74,255,0.12), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
