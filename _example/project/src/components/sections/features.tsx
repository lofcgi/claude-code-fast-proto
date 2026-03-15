"use client";

import { motion } from "framer-motion";
import { Languages, Mic, FolderOpen, AudioLines, Play, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: Languages,
    title: "Multilingual Voice Synthesis",
    description:
      "Powered by ElevenLabs, generate natural-sounding speech in 29+ languages. Each voice captures native pronunciation and natural intonation for truly authentic dubbing.",
    visual: (
      <div className="grid grid-cols-3 gap-2">
        {["🇰🇷 Korean", "🇺🇸 English", "🇯🇵 Japanese", "🇨🇳 Chinese", "🇪🇸 Spanish", "🇫🇷 French"].map(
          (lang) => (
            <div
              key={lang}
              className="bg-background/50 rounded-xl px-3 py-2 text-xs text-center border border-border/30"
            >
              {lang}
            </div>
          )
        )}
      </div>
    ),
    reverse: false,
  },
  {
    icon: Mic,
    title: "High-Quality AI Transcription",
    description:
      "Advanced speech recognition accurately transcribes your audio content. Support for multiple input languages with industry-leading accuracy ensures your message is captured perfectly.",
    visual: (
      <div className="space-y-2">
        {[
          { time: "0:00", text: "Hello, welcome to today's presentation..." },
          { time: "0:05", text: "We'll discuss the latest breakthroughs..." },
          { time: "0:12", text: "Let's start with the key findings..." },
        ].map((line) => (
          <div
            key={line.time}
            className="flex gap-3 bg-background/50 rounded-xl p-3 border border-border/30"
          >
            <span className="text-xs text-brand font-mono shrink-0 mt-0.5">
              {line.time}
            </span>
            <span className="text-xs text-muted-foreground">{line.text}</span>
          </div>
        ))}
      </div>
    ),
    reverse: true,
  },
  {
    icon: FolderOpen,
    title: "Simple File Management",
    description:
      "Drag and drop any audio or video file. We handle the rest — extraction, processing, and format conversion happen automatically. Download your dubbed content in one click.",
    visual: (
      <div className="space-y-2">
        {[
          {
            name: "keynote_speech.mp4",
            size: "8.2 MB",
            status: "Complete",
            color: "text-green-500",
          },
          {
            name: "podcast_ep12.mp3",
            size: "14.1 MB",
            status: "Processing",
            color: "text-brand",
          },
          {
            name: "tutorial_v2.wav",
            size: "22.5 MB",
            status: "Queued",
            color: "text-muted-foreground",
          },
        ].map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between bg-background/50 rounded-xl p-3 border border-border/30"
          >
            <div>
              <p className="text-xs font-medium">{file.name}</p>
              <p className="text-[10px] text-muted-foreground">{file.size}</p>
            </div>
            <span className={`text-[10px] font-medium ${file.color}`}>
              {file.status}
            </span>
          </div>
        ))}
      </div>
    ),
    reverse: false,
  },
  {
    icon: AudioLines,
    title: "Voice Cloning",
    description:
      "Clone the original speaker's voice characteristics and apply them in any target language. The AI preserves tone, cadence, and emotion for truly authentic dubbing.",
    visual: (
      <div className="space-y-3">
        <div>
          <p className="text-[10px] text-muted-foreground mb-1">Original Voice</p>
          <div className="flex items-center gap-1 h-8">
            {[4, 8, 12, 6, 14, 10, 8, 12, 6, 10, 14, 8, 6, 12, 10, 8, 14, 6, 10, 12].map(
              (h, i) => (
                <div
                  key={`orig-${i}`}
                  className="flex-1 bg-brand/60 rounded-full"
                  style={{ height: `${h * 2}px` }}
                />
              )
            )}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground mb-1">Cloned Voice (Spanish)</p>
          <div className="flex items-center gap-1 h-8">
            {[4, 8, 12, 6, 14, 10, 8, 12, 6, 10, 14, 8, 6, 12, 10, 8, 14, 6, 10, 12].map(
              (h, i) => (
                <div
                  key={`clone-${i}`}
                  className="flex-1 bg-lime/60 rounded-full"
                  style={{ height: `${h * 2}px` }}
                />
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[10px] text-green-500 font-medium">98.7% Voice Match</span>
        </div>
      </div>
    ),
    reverse: true,
  },
  {
    icon: Play,
    title: "Real-time Preview",
    description:
      "Preview your dubbed content instantly before downloading. Switch between languages on the fly and compare results side by side with the built-in player.",
    visual: (
      <div className="space-y-3">
        <div className="flex items-center gap-3 bg-background/50 rounded-xl p-3 border border-border/30">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
            <Play className="w-3.5 h-3.5 text-white ml-0.5" />
          </div>
          <div className="flex-1">
            <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-brand rounded-full" />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">2:14</span>
              <span className="text-[10px] text-muted-foreground">3:28</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {["English", "Korean", "Japanese"].map((lang, i) => (
            <div
              key={lang}
              className={`flex-1 text-center text-[10px] py-1.5 rounded-lg border ${
                i === 0
                  ? "bg-brand/10 border-brand/30 text-brand font-medium"
                  : "border-border/30 text-muted-foreground"
              }`}
            >
              {lang}
            </div>
          ))}
        </div>
      </div>
    ),
    reverse: false,
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description:
      "Process multiple files at once with our batch processing engine. Upload your entire video library and let AI handle the rest with parallel processing and smart queuing.",
    visual: (
      <div className="space-y-2">
        {[
          { name: "Q4_presentation.mp4", progress: 100, status: "Complete" },
          { name: "onboarding_guide.mp4", progress: 72, status: "Processing" },
          { name: "product_demo.mov", progress: 45, status: "Processing" },
          { name: "webinar_recap.mp4", progress: 0, status: "Queued" },
        ].map((file) => (
          <div
            key={file.name}
            className="bg-background/50 rounded-xl p-3 border border-border/30"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-medium">{file.name}</p>
              <span
                className={`text-[10px] font-medium ${
                  file.status === "Complete"
                    ? "text-green-500"
                    : file.status === "Processing"
                    ? "text-brand"
                    : "text-muted-foreground"
                }`}
              >
                {file.status}
              </span>
            </div>
            <div className="h-1 bg-border/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  file.status === "Complete" ? "bg-green-500" : "bg-brand"
                }`}
                style={{ width: `${file.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
    reverse: true,
  },
];

export function Features() {
  return (
    <section id="features" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-brand mb-4">
            Core Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Everything you need
            <br />
            to dub your content
          </h2>
        </motion.div>

        <div className="space-y-24">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                feature.reverse ? "lg:direction-rtl" : ""
              }`}
              style={feature.reverse ? { direction: "rtl" } : undefined}
            >
              <div style={feature.reverse ? { direction: "ltr" } : undefined}>
                <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div
                className="bg-card rounded-3xl p-6 border border-border/50"
                style={feature.reverse ? { direction: "ltr" } : undefined}
              >
                {feature.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
