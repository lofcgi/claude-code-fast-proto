"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Globe,
  Play,
  Download,
  FileAudio,
  FileVideo,
  X,
  Check,
  Loader2,
  ArrowLeft,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LANGUAGES = [
  { code: "ko", name: "Korean", flag: "🇰🇷" },
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

const STEPS = [
  { id: 1, label: "Upload", icon: Upload },
  { id: 2, label: "Transcribe", icon: FileAudio },
  { id: 3, label: "Translate", icon: Globe },
  { id: 4, label: "Synthesize", icon: Play },
  { id: 5, label: "Done", icon: Check },
];

export default function DubbingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetLang, setTargetLang] = useState("en");
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    setCurrentStep(1);
    const stepDelays = [1500, 2000, 2000, 1500];
    let totalDelay = 0;
    stepDelays.forEach((delay, i) => {
      totalDelay += delay;
      setTimeout(() => setCurrentStep(i + 2), totalDelay);
    });
    setTimeout(() => setIsProcessing(false), totalDelay);
  };

  const isVideo = file?.type.startsWith("video");

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </Link>
          <h1 className="text-lg font-semibold">
            <span className="text-brand">Voice</span>Bridge Studio
          </h1>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div key={step.id} className="flex items-center gap-2">
                <motion.div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand/15 text-brand"
                      : "bg-secondary text-muted-foreground"
                  } ${isCurrent ? "ring-2 ring-brand/40" : ""}`}
                  animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
                >
                  {isActive && currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : isCurrent && isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-8 h-px ${
                      currentStep > step.id ? "bg-brand" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Main Area */}
          <div className="space-y-6">
            {/* Upload Zone */}
            <AnimatePresence mode="wait">
              {currentStep < 5 && !file && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-colors ${
                    isDragOver
                      ? "border-brand bg-brand/5"
                      : "border-border hover:border-brand/50"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-brand" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        Drop your file here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supports MP3, WAV, MP4, M4A, WEBM (max 25MB)
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {file && currentStep < 5 && (
                <motion.div
                  key="file-info"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-3xl p-6 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center">
                        {isVideo ? (
                          <FileVideo className="w-6 h-6 text-brand" />
                        ) : (
                          <FileAudio className="w-6 h-6 text-brand" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFile(null);
                        setCurrentStep(0);
                      }}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Fake waveform */}
                  <div className="mt-6 flex items-end gap-[2px] h-16 px-2">
                    {Array.from({ length: 80 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-brand/30 rounded-full min-w-[2px]"
                        initial={{ height: "20%" }}
                        animate={{
                          height: `${20 + Math.random() * 80}%`,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.01,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-3xl p-8 border border-brand/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        Dubbing Complete!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your file has been dubbed into{" "}
                        {
                          LANGUAGES.find((l) => l.code === targetLang)
                            ?.name
                        }
                      </p>
                    </div>
                  </div>

                  {/* Playback */}
                  <div className="bg-background rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-brand flex items-center justify-center hover:bg-brand-light transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-brand rounded-full"
                            initial={{ width: "0%" }}
                            animate={{
                              width: isPlaying ? "100%" : "35%",
                            }}
                            transition={{
                              duration: isPlaying ? 10 : 0.3,
                            }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">
                            1:23
                          </span>
                          <span className="text-xs text-muted-foreground">
                            3:45
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1 bg-brand hover:bg-brand-light rounded-full h-12 text-base">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full h-12"
                      onClick={() => {
                        setFile(null);
                        setCurrentStep(0);
                      }}
                    >
                      New Dubbing
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transcription Preview */}
            {currentStep >= 2 && currentStep < 5 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-3xl p-6 border border-border"
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  {currentStep >= 3
                    ? "Translation Preview"
                    : "Transcription"}
                </h3>
                <div className="space-y-3">
                  {[
                    currentStep >= 3
                      ? "안녕하세요, 오늘 AI 기술의 미래에 대해 이야기해 보겠습니다."
                      : "Hello, today we will talk about the future of AI technology.",
                    currentStep >= 3
                      ? "인공지능은 우리의 일상생활을 빠르게 변화시키고 있습니다."
                      : "Artificial intelligence is rapidly transforming our daily lives.",
                    currentStep >= 3
                      ? "이 영상에서는 주요 트렌드와 혁신 사례를 살펴봅니다."
                      : "In this video, we explore the key trends and innovations.",
                  ].map((text, i) => (
                    <motion.p
                      key={`${currentStep}-${i}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="text-sm leading-relaxed p-3 bg-background rounded-xl"
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Language Selection */}
            <div className="bg-card rounded-3xl p-6 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                Target Language
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setTargetLang(lang.code)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      targetLang === lang.code
                        ? "bg-brand/15 text-brand border border-brand/30"
                        : "bg-background hover:bg-secondary border border-transparent"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            {file && currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={simulateProcessing}
                  className="w-full bg-brand hover:bg-brand-light rounded-full h-14 text-lg font-semibold"
                >
                  Start Dubbing
                </Button>
              </motion.div>
            )}

            {/* Info Card */}
            <div className="bg-card rounded-3xl p-6 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                Supported Formats
              </h3>
              <div className="space-y-2">
                {[
                  { icon: FileAudio, label: "MP3, WAV, M4A, FLAC" },
                  { icon: FileVideo, label: "MP4, WEBM, MOV" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
