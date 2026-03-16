"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const LANGUAGES = [
  { code: "ko", name: "Korean", flag: "\u{1F1F0}\u{1F1F7}" },
  { code: "en", name: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "ja", name: "Japanese", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "zh", name: "Chinese", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "es", name: "Spanish", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "fr", name: "French", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "de", name: "German", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "pt", name: "Portuguese", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "hi", name: "Hindi", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "ar", name: "Arabic", flag: "\u{1F1F8}\u{1F1E6}" },
];

const STEPS = [
  { id: 1, label: "Upload", icon: Upload },
  { id: 2, label: "Transcribe", icon: FileAudio },
  { id: 3, label: "Translate", icon: Globe },
  { id: 4, label: "Synthesize", icon: Play },
  { id: 5, label: "Done", icon: Check },
];

interface Voice {
  id: string;
  name: string;
  category: string;
  previewUrl: string | null;
  accent: string | null;
  gender: string | null;
}

const ACCEPTED_TYPES = [
  "audio/mpeg", "audio/wav", "audio/mp4", "audio/x-m4a", "audio/webm", "audio/flac",
  "video/mp4", "video/webm", "video/quicktime",
];

export default function DubbingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetLang, setTargetLang] = useState("ko");
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Voice selection
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [voicesLoading, setVoicesLoading] = useState(true);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Result state
  const [transcription, setTranscription] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [resultIsVideo, setResultIsVideo] = useState(false);
  const [videoObjectUrl, setVideoObjectUrl] = useState<string | null>(null);

  // Playback state
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [playbackTime, setPlaybackTime] = useState("0:00");
  const [playbackDuration, setPlaybackDuration] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Fetch available voices on mount
  useEffect(() => {
    fetch("/api/dubbing/voices")
      .then((res) => res.json())
      .then((data) => {
        const list: Voice[] = data.voices || [];
        setVoices(list);
        if (list.length > 0) setSelectedVoice(list[0].id);
      })
      .catch(() => toast.error("Failed to load voices"))
      .finally(() => setVoicesLoading(false));
  }, []);

  const togglePreview = (voiceId: string, previewUrl: string | null) => {
    if (!previewUrl) return;

    // If already previewing this voice, stop it
    if (previewingVoice === voiceId) {
      previewAudioRef.current?.pause();
      previewAudioRef.current = null;
      setPreviewingVoice(null);
      return;
    }

    // Stop any current preview
    previewAudioRef.current?.pause();

    const audio = new Audio(previewUrl);
    previewAudioRef.current = audio;
    setPreviewingVoice(voiceId);

    audio.play().catch(() => {
      setPreviewingVoice(null);
    });

    audio.onended = () => {
      setPreviewingVoice(null);
      previewAudioRef.current = null;
    };
  };

  // Cleanup preview audio on unmount
  useEffect(() => {
    return () => {
      previewAudioRef.current?.pause();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const validateFile = (f: File): string | null => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return "Unsupported file format. Please use MP3, WAV, MP4, M4A, or WEBM.";
    }
    if (f.size > 25 * 1024 * 1024) {
      return "File size exceeds 25MB limit.";
    }
    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const error = validateFile(droppedFile);
      if (error) {
        toast.error(error);
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const error = validateFile(selectedFile);
      if (error) {
        toast.error(error);
        return;
      }
      setFile(selectedFile);
    }
  };

  const startDubbing = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setCurrentStep(2); // Start at transcribe step
    setTranscription(null);
    setTranslation(null);
    setAudioUrl(null);
    setResultIsVideo(false);
    setPlaybackProgress(0);

    // For video files, create object URL for later sync playback
    const isVideoFile = file.type.startsWith("video");
    if (isVideoFile) {
      const url = URL.createObjectURL(file);
      setVideoObjectUrl(url);
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("targetLang", targetLang);
      formData.append("voiceId", selectedVoice);

      const res = await fetch("/api/dubbing", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorMessage = "Dubbing failed";
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch {
          const text = await res.text().catch(() => "");
          if (res.status === 413 || text.includes("Request Entity Too Large")) {
            errorMessage = "File too large. Please use a file under 4.5MB.";
          } else {
            errorMessage = text || `Server error (${res.status})`;
          }
        }
        if (res.status === 429) {
          throw new Error("Too many requests — please wait a moment");
        }
        throw new Error(errorMessage);
      }

      // Read NDJSON stream for real-time step tracking
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);

          if (event.status === "error") {
            throw new Error(event.error || "Dubbing failed");
          }

          // Map step names to step numbers
          if (event.step === "transcribe" && event.status === "started") {
            setCurrentStep(2);
          } else if (event.step === "transcribe" && event.status === "done") {
            setTranscription(event.transcription);
          } else if (event.step === "translate" && event.status === "started") {
            setCurrentStep(3);
          } else if (event.step === "translate" && event.status === "done") {
            setTranslation(event.translation);
          } else if (event.step === "synthesize" && event.status === "started") {
            setCurrentStep(4);
          } else if (event.step === "done") {
            setResultIsVideo(event.isVideo);

            const audioBlob = new Blob(
              [Uint8Array.from(atob(event.audioBase64), (c) => c.charCodeAt(0))],
              { type: "audio/mpeg" }
            );
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);

            setCurrentStep(5);
            toast.success("Dubbing complete!");
          }
        }
      }
    } catch (err) {
      if (err instanceof TypeError && err.message.includes("fetch")) {
        toast.error("Network error. Check your connection.");
      } else {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
      setCurrentStep(0);
    } finally {
      setIsProcessing(false);
    }
  }, [file, targetLang, selectedVoice]);

  // Sync video (muted) with dubbed audio playback
  useEffect(() => {
    if (!resultIsVideo || !videoRef.current || !audioRef.current) return;
    const audio = audioRef.current;
    const video = videoRef.current;

    const syncPlay = () => {
      video.currentTime = audio.currentTime;
      video.play().catch(() => {});
    };
    const syncPause = () => video.pause();
    const syncSeek = () => {
      video.currentTime = audio.currentTime;
    };

    audio.addEventListener("play", syncPlay);
    audio.addEventListener("pause", syncPause);
    audio.addEventListener("seeked", syncSeek);

    return () => {
      audio.removeEventListener("play", syncPlay);
      audio.removeEventListener("pause", syncPause);
      audio.removeEventListener("seeked", syncSeek);
    };
  }, [resultIsVideo, audioUrl, videoObjectUrl]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
    } else {
      el.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [isMerging, setIsMerging] = useState(false);

  const handleDownload = async () => {
    if (!audioUrl) return;
    const baseName = file?.name?.replace(/\.[^.]+$/, "") || "file";

    // Video file: merge video + dubbed audio into MP4
    if (resultIsVideo && file) {
      setIsMerging(true);
      try {
        const { mergeVideoWithAudio } = await import("@/lib/merge-video");
        const audioBlob = await fetch(audioUrl).then((r) => r.blob());
        const mp4Blob = await mergeVideoWithAudio(file, audioBlob);
        const url = URL.createObjectURL(mp4Blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `dubbed_${targetLang}_${baseName}.mp4`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Video downloaded!");
      } catch (err) {
        console.error("Video merge failed:", err);
        toast.error("Video merge failed. Downloading audio only.");
        const a = document.createElement("a");
        a.href = audioUrl;
        a.download = `dubbed_${targetLang}_${baseName}.mp3`;
        a.click();
      } finally {
        setIsMerging(false);
      }
      return;
    }

    // Audio file: download MP3 directly
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `dubbed_${targetLang}_${baseName}.mp3`;
    a.click();
  };

  const handleAudioTimeUpdate = () => {
    const el = audioRef.current;
    if (el && el.duration) {
      setPlaybackProgress(el.currentTime / el.duration);
      setPlaybackTime(formatTime(el.currentTime));
      setPlaybackDuration(formatTime(el.duration));
    }
  };

  const handleAudioLoaded = () => {
    const el = audioRef.current;
    if (el) setPlaybackDuration(formatTime(el.duration));
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setPlaybackProgress(0);
    setPlaybackTime("0:00");
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    const bar = progressBarRef.current;
    if (!el || !bar || !el.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    el.currentTime = ratio * el.duration;
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const resetState = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
    setFile(null);
    setCurrentStep(0);
    setTranscription(null);
    setTranslation(null);
    setAudioUrl(null);
    setResultIsVideo(false);
    setVideoObjectUrl(null);
    setIsPlaying(false);
    setPlaybackProgress(0);
    setPlaybackTime("0:00");
    setPlaybackDuration("0:00");
  };

  const isVideo = file?.type.startsWith("video");

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden audio element for playback */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleAudioTimeUpdate}
          onLoadedMetadata={handleAudioLoaded}
          onEnded={handleAudioEnded}
        />
      )}

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
            <AnimatePresence mode="wait">
              {/* Upload Zone */}
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

              {/* File Info */}
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
                    {!isProcessing && (
                      <button
                        onClick={resetState}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>

                  {/* Transcription Preview */}
                  {transcription && (
                    <div className="mt-4 p-4 bg-background rounded-2xl border border-border">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Transcription
                      </p>
                      <p className="text-sm leading-relaxed">{transcription}</p>
                    </div>
                  )}

                  {/* Translation Preview */}
                  {translation && (
                    <div className="mt-3 p-4 bg-background rounded-2xl border border-brand/20">
                      <p className="text-xs font-medium text-brand uppercase tracking-wider mb-2">
                        Translation ({LANGUAGES.find((l) => l.code === targetLang)?.name})
                      </p>
                      <p className="text-sm leading-relaxed">{translation}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Result */}
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
                      <p className="font-semibold text-lg">Dubbing Complete!</p>
                      <p className="text-sm text-muted-foreground">
                        Your file has been dubbed into{" "}
                        {LANGUAGES.find((l) => l.code === targetLang)?.name}
                      </p>
                    </div>
                  </div>

                  {/* Transcription & Translation Preview */}
                  {transcription && (
                    <div className="mb-4 p-4 bg-background rounded-2xl border border-border">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Transcription
                      </p>
                      <p className="text-sm leading-relaxed">{transcription}</p>
                    </div>
                  )}
                  {translation && (
                    <div className="mb-6 p-4 bg-background rounded-2xl border border-brand/20">
                      <p className="text-xs font-medium text-brand uppercase tracking-wider mb-2">
                        Translation ({LANGUAGES.find((l) => l.code === targetLang)?.name})
                      </p>
                      <p className="text-sm leading-relaxed">{translation}</p>
                    </div>
                  )}

                  {/* Video Player (muted original + dubbed audio) */}
                  {resultIsVideo && videoObjectUrl && (
                    <div
                      className="bg-background rounded-2xl overflow-hidden border border-border mb-4 relative group cursor-pointer"
                      onClick={handleVideoClick}
                    >
                      <video
                        ref={videoRef}
                        src={videoObjectUrl}
                        muted
                        playsInline
                        className="w-full"
                      />
                      {/* Play/Pause overlay */}
                      <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          {isPlaying ? (
                            <Pause className="w-7 h-7 text-black" />
                          ) : (
                            <Play className="w-7 h-7 text-black ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Audio Player Controls */}
                  <div className="bg-background rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="w-12 h-12 rounded-full bg-brand flex items-center justify-center hover:bg-brand-light transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        )}
                      </button>
                      <div className="flex-1 space-y-1">
                        <div
                          ref={progressBarRef}
                          onClick={handleSeek}
                          className="h-1.5 bg-secondary rounded-full overflow-hidden cursor-pointer hover:h-2.5 transition-all"
                        >
                          <div
                            className="h-full bg-brand rounded-full transition-[width] duration-200"
                            style={{ width: `${playbackProgress * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                          <span>{playbackTime}</span>
                          <span>{playbackDuration}</span>
                        </div>
                      </div>
                    </div>
                    {resultIsVideo && (
                      <p className="text-xs text-muted-foreground mt-3">
                        Original video with dubbed audio
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={handleDownload}
                      disabled={isMerging}
                      className="flex-1 bg-brand hover:bg-brand-light rounded-full h-12 text-base"
                    >
                      {isMerging ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Merging Video...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          {resultIsVideo ? "Download Video" : "Download Audio"}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full h-12"
                      onClick={resetState}
                    >
                      New Dubbing
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                    onClick={() => !isProcessing && setTargetLang(lang.code)}
                    disabled={isProcessing}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      targetLang === lang.code
                        ? "bg-brand/15 text-brand border border-brand/30"
                        : "bg-background hover:bg-secondary border border-transparent"
                    } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Selection */}
            <div className="bg-card rounded-3xl p-6 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                Voice
              </h3>
              {voicesLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading voices...
                </div>
              ) : voices.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">
                  No voices available
                </p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin">
                  {voices.map((voice) => (
                    <div
                      key={voice.id}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        selectedVoice === voice.id
                          ? "bg-brand/15 text-brand border border-brand/30"
                          : "bg-background hover:bg-secondary border border-transparent"
                      } ${isProcessing ? "opacity-50" : ""}`}
                    >
                      <button
                        onClick={() => !isProcessing && setSelectedVoice(voice.id)}
                        disabled={isProcessing}
                        className="flex items-center gap-3 min-w-0 flex-1 text-left disabled:cursor-not-allowed"
                      >
                        <Mic className="w-4 h-4 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium truncate">{voice.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {[voice.gender, voice.accent].filter(Boolean).join(" · ") || voice.category}
                          </p>
                        </div>
                      </button>
                      {voice.previewUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePreview(voice.id, voice.previewUrl);
                          }}
                          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center hover:bg-brand/10 transition-colors"
                          title="Preview voice"
                        >
                          {previewingVoice === voice.id ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5 ml-0.5" />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Start Button */}
            {file && currentStep === 0 && selectedVoice && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={startDubbing}
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
