"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { X, Play, Pause, RotateCcw, Scissors, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_RANGE = 60;
const MIN_RANGE = 5;

interface TrimEditorProps {
  file: File;
  duration: number;
  onApply: (start: number, end: number) => void;
  onCancel: () => void;
}

function formatMMSS(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function parseMMSS(str: string): number | null {
  const match = str.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  return parseInt(match[1]) * 60 + parseInt(match[2]);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function TrimEditor({ file, duration, onApply, onCancel }: TrimEditorProps) {
  const isVideo = file.type.startsWith("video/");
  const initialEnd = Math.min(MAX_RANGE, duration);

  // --- Selection state ---
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(initialEnd);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const [dragging, setDragging] = useState<"start" | "end" | "region" | "minimap" | null>(null);

  const [startInput, setStartInput] = useState(formatMMSS(0));
  const [endInput, setEndInput] = useState(formatMMSS(initialEnd));

  // --- Zoom viewport state ---
  // Zoom window = selection ± 30s padding (~2 min total)
  // So 1-min selection fills ~50% of zoom timeline
  const ZOOM_PADDING = 30;
  const zoomWindow = useMemo(() => {
    if (duration <= MAX_RANGE * 2) return duration;
    return Math.min(duration, MAX_RANGE + ZOOM_PADDING * 2);
  }, [duration]);

  const needsZoom = duration > MAX_RANGE * 2;

  const [viewStart, setViewStart] = useState(0);
  const viewEnd = viewStart + zoomWindow;

  // --- Refs ---
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const zoomTimelineRef = useRef<HTMLDivElement | null>(null);
  const minimapRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number>(0);
  const mediaUrlRef = useRef<string>("");
  const dragStartRef = useRef<{ x: number; startT: number; endT: number; viewS: number }>({
    x: 0, startT: 0, endT: 0, viewS: 0,
  });

  // --- Auto-pan zoom viewport to follow selection ---
  const panToSelection = useCallback((s: number, e: number) => {
    if (!needsZoom) return;
    // Center viewport on selection with padding
    const newViewStart = clamp(s - ZOOM_PADDING, 0, duration - zoomWindow);
    setViewStart(newViewStart);
  }, [needsZoom, zoomWindow, duration]);

  // Create object URL for media preview
  useEffect(() => {
    mediaUrlRef.current = URL.createObjectURL(file);
    return () => { URL.revokeObjectURL(mediaUrlRef.current); };
  }, [file]);

  // Sync input fields
  useEffect(() => { setStartInput(formatMMSS(startTime)); }, [startTime]);
  useEffect(() => { setEndInput(formatMMSS(endTime)); }, [endTime]);

  // Playback loop
  useEffect(() => {
    if (!isPlaying) { cancelAnimationFrame(animRef.current); return; }
    const media = mediaRef.current;
    if (!media) return;
    const tick = () => {
      if (media.currentTime >= endTime) {
        media.pause();
        setIsPlaying(false);
        setPlayhead(endTime);
        return;
      }
      setPlayhead(media.currentTime);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, endTime]);

  const togglePlay = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return;
    if (isPlaying) {
      media.pause();
      setIsPlaying(false);
    } else {
      if (media.currentTime < startTime || media.currentTime >= endTime) {
        media.currentTime = startTime;
      }
      media.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, startTime, endTime]);

  const seekTo = useCallback((time: number) => {
    const media = mediaRef.current;
    if (media) media.currentTime = time;
    setPlayhead(time);
  }, []);

  // --- Range constraint ---
  const applyRange = useCallback((newStart: number, newEnd: number) => {
    newStart = clamp(newStart, 0, duration);
    newEnd = clamp(newEnd, 0, duration);
    if (newEnd - newStart > MAX_RANGE) newEnd = newStart + MAX_RANGE;
    if (newEnd - newStart < MIN_RANGE) {
      if (newEnd < duration - MIN_RANGE) newEnd = newStart + MIN_RANGE;
      else newStart = newEnd - MIN_RANGE;
    }
    newStart = clamp(newStart, 0, duration);
    newEnd = clamp(newEnd, 0, duration);
    setStartTime(newStart);
    setEndTime(newEnd);
  }, [duration]);

  // --- Zoom timeline pointer helpers ---
  const getTimeFromZoom = useCallback((clientX: number): number => {
    const rect = zoomTimelineRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const visibleStart = needsZoom ? viewStart : 0;
    const visibleEnd = needsZoom ? viewEnd : duration;
    return visibleStart + ratio * (visibleEnd - visibleStart);
  }, [needsZoom, viewStart, viewEnd, duration]);

  // --- Minimap pointer helpers ---
  const getTimeFromMinimap = useCallback((clientX: number): number => {
    const rect = minimapRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    return ratio * duration;
  }, [duration]);

  const handlePointerDown = useCallback((e: React.PointerEvent, target: "start" | "end" | "region") => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(target);
    dragStartRef.current = { x: e.clientX, startT: startTime, endT: endTime, viewS: viewStart };
  }, [startTime, endTime, viewStart]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || dragging === "minimap") return;
    const time = getTimeFromZoom(e.clientX);

    if (dragging === "start") {
      const newStart = clamp(time, 0, endTime - MIN_RANGE);
      applyRange(newStart, endTime);
      seekTo(newStart);
    } else if (dragging === "end") {
      const newEnd = clamp(time, startTime + MIN_RANGE, duration);
      applyRange(startTime, newEnd);
      seekTo(newEnd);
    } else if (dragging === "region") {
      const rect = zoomTimelineRef.current?.getBoundingClientRect();
      if (!rect) return;
      const visibleDur = needsZoom ? zoomWindow : duration;
      const dx = e.clientX - dragStartRef.current.x;
      const dt = (dx / rect.width) * visibleDur;
      const rangeDur = dragStartRef.current.endT - dragStartRef.current.startT;
      let newStart = dragStartRef.current.startT + dt;
      newStart = clamp(newStart, 0, duration - rangeDur);
      applyRange(newStart, newStart + rangeDur);
      seekTo(newStart);
      // Auto-pan viewport if dragging near edge
      if (needsZoom) {
        const newMid = newStart + rangeDur / 2;
        const halfWin = zoomWindow / 2;
        setViewStart(clamp(newMid - halfWin, 0, duration - zoomWindow));
      }
    }
  }, [dragging, startTime, endTime, duration, needsZoom, zoomWindow, applyRange, getTimeFromZoom, seekTo]);

  // --- Minimap drag ---
  const handleMinimapPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging("minimap");
    // Move selection to clicked position
    const clickedTime = getTimeFromMinimap(e.clientX);
    const rangeDur = endTime - startTime;
    const newStart = clamp(clickedTime - rangeDur / 2, 0, duration - rangeDur);
    applyRange(newStart, newStart + rangeDur);
    seekTo(newStart);
    // Viewport follows
    const newViewStart = clamp(newStart - ZOOM_PADDING, 0, duration - zoomWindow);
    setViewStart(newViewStart);
    dragStartRef.current = { x: e.clientX, startT: newStart, endT: newStart + rangeDur, viewS: newViewStart };
  }, [getTimeFromMinimap, zoomWindow, duration, startTime, endTime, applyRange, seekTo]);

  const handleMinimapPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging !== "minimap") return;
    const clickedTime = getTimeFromMinimap(e.clientX);
    const rangeDur = dragStartRef.current.endT - dragStartRef.current.startT;
    const newStart = clamp(clickedTime - rangeDur / 2, 0, duration - rangeDur);
    applyRange(newStart, newStart + rangeDur);
    seekTo(newStart);
    // Viewport follows selection
    const newViewStart = clamp(newStart - ZOOM_PADDING, 0, duration - zoomWindow);
    setViewStart(newViewStart);
  }, [dragging, getTimeFromMinimap, zoomWindow, duration, applyRange, seekTo]);

  const handlePointerUp = useCallback(() => { setDragging(null); }, []);

  // --- Time input handlers ---
  const handleStartInputBlur = useCallback(() => {
    const parsed = parseMMSS(startInput);
    if (parsed !== null) {
      applyRange(parsed, endTime);
      seekTo(parsed);
      panToSelection(parsed, endTime);
    } else {
      setStartInput(formatMMSS(startTime));
    }
  }, [startInput, endTime, startTime, applyRange, seekTo, panToSelection]);

  const handleEndInputBlur = useCallback(() => {
    const parsed = parseMMSS(endInput);
    if (parsed !== null) {
      applyRange(startTime, parsed);
      seekTo(parsed);
      panToSelection(startTime, parsed);
    } else {
      setEndInput(formatMMSS(endTime));
    }
  }, [endInput, startTime, endTime, applyRange, seekTo, panToSelection]);

  const handleReset = useCallback(() => {
    applyRange(0, Math.min(MAX_RANGE, duration));
    seekTo(0);
    setIsPlaying(false);
    mediaRef.current?.pause();
    if (needsZoom) setViewStart(0);
  }, [duration, needsZoom, applyRange, seekTo]);

  // --- Computed values for zoom timeline ---
  const visibleStart = needsZoom ? viewStart : 0;
  const visibleEnd = needsZoom ? viewEnd : duration;
  const visibleDur = visibleEnd - visibleStart;

  const toZoomPct = (t: number) => ((t - visibleStart) / visibleDur) * 100;
  const startPct = clamp(toZoomPct(startTime), 0, 100);
  const endPct = clamp(toZoomPct(endTime), 0, 100);
  const playheadPct = clamp(toZoomPct(playhead), 0, 100);

  // --- Minimap computed values ---
  const mmStartPct = (startTime / duration) * 100;
  const mmEndPct = (endTime / duration) * 100;
  const mmViewStartPct = (viewStart / duration) * 100;
  const mmViewWidthPct = (zoomWindow / duration) * 100;

  // Zoom timeline markers
  const zoomMarkerInterval = visibleDur > 180 ? 30 : visibleDur > 60 ? 15 : 5;
  const zoomMarkers: number[] = [];
  const firstMarker = Math.ceil(visibleStart / zoomMarkerInterval) * zoomMarkerInterval;
  for (let t = firstMarker; t <= visibleEnd; t += zoomMarkerInterval) {
    zoomMarkers.push(t);
  }

  // Minimap markers
  const mmMarkerInterval = duration > 600 ? 120 : duration > 180 ? 60 : 30;
  const mmMarkers: number[] = [];
  for (let t = 0; t <= duration; t += mmMarkerInterval) {
    mmMarkers.push(t);
  }

  const selectedDuration = endTime - startTime;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-card rounded-3xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Trim Selection
          </h3>
          <button onClick={onCancel} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media preview */}
        <div className="px-5 pt-4">
          <div className="relative bg-black rounded-2xl overflow-hidden flex items-center justify-center">
            {isVideo ? (
              <video
                ref={mediaRef as React.Ref<HTMLVideoElement>}
                src={mediaUrlRef.current}
                className="w-full max-h-[40vh] object-contain"
                playsInline
                muted={false}
                preload="auto"
                onClick={togglePlay}
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center">
                <audio
                  ref={mediaRef as React.Ref<HTMLAudioElement>}
                  src={mediaUrlRef.current}
                  preload="auto"
                />
              </div>
            )}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30"
              >
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-6 h-6 text-black ml-0.5" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Time inputs + duration */}
        <div className="px-5 pt-4 flex items-center gap-3">
          <input
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            onBlur={handleStartInputBlur}
            onKeyDown={(e) => e.key === "Enter" && handleStartInputBlur()}
            className="w-20 text-center text-sm font-mono bg-secondary border border-border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <span className="text-muted-foreground">—</span>
          <input
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            onBlur={handleEndInputBlur}
            onKeyDown={(e) => e.key === "Enter" && handleEndInputBlur()}
            className="w-20 text-center text-sm font-mono bg-secondary border border-border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <div className="ml-auto text-sm text-muted-foreground font-mono">
            {formatMMSS(selectedDuration)}
          </div>
        </div>

        {/* Minimap (only for long files) */}
        {needsZoom && (
          <div className="px-5 pt-4 pb-1">
            <div className="flex items-center gap-2 mb-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                Overview — drag to navigate
              </span>
            </div>
            <div
              ref={minimapRef}
              className="relative h-8 bg-secondary rounded-md select-none touch-none cursor-pointer"
              onPointerDown={handleMinimapPointerDown}
              onPointerMove={handleMinimapPointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Full dimmed background */}
              <div className="absolute inset-0 rounded-md" />

              {/* Viewport window */}
              <div
                className="absolute inset-y-0 border-2 border-brand/60 bg-brand/10 rounded-sm transition-[left,width] duration-75"
                style={{ left: `${mmViewStartPct}%`, width: `${mmViewWidthPct}%` }}
              />

              {/* Selection highlight */}
              <div
                className="absolute inset-y-1 bg-brand/50 rounded-sm pointer-events-none"
                style={{ left: `${mmStartPct}%`, width: `${mmEndPct - mmStartPct}%` }}
              />

              {/* Minimap time markers */}
              <div className="absolute -bottom-4 left-0 right-0 h-4">
                {mmMarkers.map((t) => (
                  <span
                    key={t}
                    className="absolute text-[9px] text-muted-foreground/60 -translate-x-1/2 font-mono"
                    style={{ left: `${(t / duration) * 100}%` }}
                  >
                    {formatMMSS(t)}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-4" />
          </div>
        )}

        {/* Zoom Timeline */}
        <div className="px-5 pt-2 pb-2">
          <div
            ref={zoomTimelineRef}
            className="relative h-12 bg-secondary rounded-lg select-none touch-none"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Dimmed regions (outside selection) */}
            {startPct > 0 && (
              <div
                className="absolute inset-y-0 left-0 bg-black/40 rounded-l-lg pointer-events-none"
                style={{ width: `${startPct}%` }}
              />
            )}
            {endPct < 100 && (
              <div
                className="absolute inset-y-0 right-0 bg-black/40 rounded-r-lg pointer-events-none"
                style={{ width: `${100 - endPct}%` }}
              />
            )}

            {/* Selected region (draggable) */}
            {startPct < 100 && endPct > 0 && (
              <div
                className="absolute inset-y-0 bg-brand/20 cursor-grab active:cursor-grabbing"
                style={{
                  left: `${Math.max(startPct, 0)}%`,
                  width: `${Math.min(endPct, 100) - Math.max(startPct, 0)}%`,
                }}
                onPointerDown={(e) => handlePointerDown(e, "region")}
              />
            )}

            {/* Playhead */}
            {playhead >= visibleStart && playhead <= visibleEnd && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none z-10"
                style={{ left: `${playheadPct}%` }}
              />
            )}

            {/* Start handle */}
            {startTime >= visibleStart && startTime <= visibleEnd && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-col-resize"
                style={{ left: `${startPct}%` }}
                onPointerDown={(e) => handlePointerDown(e, "start")}
              >
                <div className={`w-6 h-12 sm:w-5 sm:h-10 rounded-md border-2 border-white shadow-lg transition-colors ${dragging === "start" ? "bg-brand scale-110" : "bg-brand/80"}`} />
              </div>
            )}

            {/* End handle */}
            {endTime >= visibleStart && endTime <= visibleEnd && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-col-resize"
                style={{ left: `${endPct}%` }}
                onPointerDown={(e) => handlePointerDown(e, "end")}
              >
                <div className={`w-6 h-12 sm:w-5 sm:h-10 rounded-md border-2 border-white shadow-lg transition-colors ${dragging === "end" ? "bg-brand scale-110" : "bg-brand/80"}`} />
              </div>
            )}
          </div>

          {/* Zoom time markers */}
          <div className="relative h-5 mt-1">
            {zoomMarkers.map((t) => (
              <span
                key={t}
                className="absolute text-[10px] text-muted-foreground -translate-x-1/2 font-mono"
                style={{ left: `${toZoomPct(t)}%` }}
              >
                {formatMMSS(t)}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 p-5 pt-2">
          <Button variant="outline" className="flex-1 rounded-xl" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            className="flex-1 rounded-xl bg-brand hover:bg-brand/90"
            onClick={() => onApply(startTime, endTime)}
          >
            Apply Trim
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
