"use client";

import {
  Check,
  Loader2,
  ArrowLeft,
  FileVideo,
  Upload,
  FileAudio,
  Globe,
  Play,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Upload", icon: Upload, done: true },
  { id: 2, label: "Transcribe", icon: FileAudio, done: true },
  { id: 3, label: "Translate", icon: Globe, active: true },
  { id: 4, label: "Synthesize", icon: Play, done: false },
  { id: 5, label: "Done", icon: Check, done: false },
];

const LANGUAGES = [
  { code: "ko", name: "Korean", flag: "🇰🇷", selected: true },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
];

const TRANSLATIONS = [
  "안녕하세요, 오늘 AI 기술의 미래에 대해 이야기해 보겠습니다.",
  "인공지능은 우리의 일상생활을 빠르게 변화시키고 있습니다.",
  "이 영상에서는 주요 트렌드와 혁신 사례를 살펴봅니다.",
];

// Deterministic waveform — multi-frequency sin, no Math.random()
function waveformHeight(i: number, total: number): number {
  const t = i / total;
  const v =
    Math.sin(t * Math.PI * 2 * 3) * 0.3 +
    Math.sin(t * Math.PI * 2 * 7 + 1.2) * 0.25 +
    Math.sin(t * Math.PI * 2 * 13 + 0.7) * 0.15 +
    Math.sin(t * Math.PI * 2 * 1.5) * 0.3;
  return 15 + Math.abs(v) * 85;
}

export function DubbingAppPreview() {
  return (
    <div
      className="pointer-events-none select-none overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl"
      style={{
        transform: "perspective(1200px) rotateY(-5deg) rotateX(2deg)",
        boxShadow: "0 25px 60px rgba(98, 74, 255, 0.25)",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-background/80 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-500/60" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
        <div className="h-2 w-2 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[9px] text-muted-foreground">
          VoiceBridge Studio
        </span>
      </div>

      {/* Top nav */}
      <div className="flex items-center justify-between border-b border-border/30 px-3 py-1.5">
        <div className="flex items-center gap-1 text-muted-foreground">
          <ArrowLeft className="h-2.5 w-2.5" />
          <span className="text-[8px]">Back</span>
        </div>
        <span className="text-[9px] font-semibold">
          <span className="text-brand">Voice</span>Bridge Studio
        </span>
        <div className="w-8" />
      </div>

      {/* Progress stepper */}
      <div className="flex items-center justify-center gap-1 px-3 py-2">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isDone = step.done;
          const isActive = step.active;
          return (
            <div key={step.id} className="flex items-center gap-0.5">
              <div
                className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium ${
                  isDone
                    ? "bg-brand/15 text-brand"
                    : isActive
                      ? "bg-brand/15 text-brand ring-1 ring-brand/40"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {isDone ? (
                  <Check className="h-2 w-2" />
                ) : isActive ? (
                  <Loader2 className="h-2 w-2 animate-spin" />
                ) : (
                  <Icon className="h-2 w-2" />
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-2 ${isDone ? "bg-brand" : "bg-border"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-[1fr_110px] gap-2 px-3 pb-3">
        {/* Left column */}
        <div className="space-y-2">
          {/* File info card */}
          <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-background p-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10">
              <FileVideo className="h-3 w-3 text-brand" />
            </div>
            <div>
              <p className="text-[9px] font-medium leading-tight">
                presentation_final.mp4
              </p>
              <p className="text-[7px] text-muted-foreground">12.4 MB</p>
            </div>
          </div>

          {/* Waveform */}
          <div className="flex items-end gap-[1px] rounded-lg bg-background/50 px-1.5 py-1" style={{ height: 28 }}>
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full bg-brand/35"
                style={{
                  height: `${waveformHeight(i, 80)}%`,
                  minWidth: 1,
                }}
              />
            ))}
          </div>

          {/* Translation preview */}
          <div className="rounded-xl border border-border/50 bg-background p-2">
            <p className="mb-1 text-[7px] font-medium uppercase tracking-wider text-muted-foreground">
              Translation Preview
            </p>
            <div className="space-y-1">
              {TRANSLATIONS.map((text, i) => (
                <p
                  key={i}
                  className="rounded-md bg-secondary/50 px-1.5 py-1 text-[8px] leading-snug"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-2">
          {/* Language grid */}
          <div className="rounded-xl border border-border/50 bg-background p-1.5">
            <p className="mb-1 text-[7px] font-medium uppercase tracking-wider text-muted-foreground">
              Target Language
            </p>
            <div className="grid grid-cols-2 gap-0.5">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.code}
                  className={`flex items-center gap-0.5 rounded-md px-1 py-0.5 text-[7px] ${
                    lang.selected
                      ? "border border-brand/30 bg-brand/15 font-medium text-brand"
                      : "bg-secondary/50 text-muted-foreground"
                  }`}
                >
                  <span className="text-[8px]">{lang.flag}</span>
                  <span className="truncate">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supported formats */}
          <div className="rounded-xl border border-border/50 bg-background p-1.5">
            <p className="mb-1 text-[7px] font-medium uppercase tracking-wider text-muted-foreground">
              Formats
            </p>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-[7px] text-muted-foreground">
                <FileAudio className="h-2 w-2" />
                <span>MP3, WAV, M4A</span>
              </div>
              <div className="flex items-center gap-1 text-[7px] text-muted-foreground">
                <FileVideo className="h-2 w-2" />
                <span>MP4, WEBM, MOV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
