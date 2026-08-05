"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Download, Film, Loader2, X } from "lucide-react";
import type { ThemeId, Units } from "../types";
import {
  captureNodeToPng,
  nextPaint,
  timestamp,
  triggerDownload,
} from "../exportImage";
import { LeaderboardControls } from "./LeaderboardControls";
import { LeaderboardTemplate } from "./LeaderboardTemplate";
import type { LeaderboardData } from "./types";
import { leaderboardLayout } from "./layout";
import {
  LEADERBOARD_VIDEO_FPS,
  leaderboardVideoDuration,
} from "./animation";

type Props = {
  data: LeaderboardData;
  units: Units;
  theme: ThemeId;
  ctaMode: boolean;
  onDataChange: Dispatch<SetStateAction<LeaderboardData>>;
  onUnitsChange: (u: Units) => void;
  onThemeChange: (t: ThemeId) => void;
  onCtaModeChange: (v: boolean) => void;
};

export function LeaderboardStudio({
  data,
  units,
  theme,
  ctaMode,
  onDataChange,
  onUnitsChange,
  onThemeChange,
  onCtaModeChange,
}: Props) {
  const dims = leaderboardLayout(data, ctaMode);

  const frameRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [scale, setScale] = useState(0.5);
  const [downloading, setDownloading] = useState(false);
  // 0..1 while encoding the climb video; null for the still export.
  const [progress, setProgress] = useState<number | null>(null);

  const videoDuration = leaderboardVideoDuration(data.entries.length);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = frame;
      const s = Math.min(clientWidth / dims.width, clientHeight / dims.height);
      setScale(s > 0 ? s : 0.5);
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [dims.width, dims.height]);

  const handleDownload = async () => {
    const node = captureRef.current;
    if (!node) return;
    setDownloading(true);
    await nextPaint();
    try {
      const dataUrl = await captureNodeToPng(node, dims.width, dims.height);
      triggerDownload(dataUrl, `driven-leaderboard-${timestamp()}.png`);
    } catch (err) {
      console.error("[creator] leaderboard export failed", err);
      alert("Couldn't export the image. See console for details.");
    } finally {
      setDownloading(false);
    }
  };

  const handleVideoDownload = async () => {
    setDownloading(true);
    setProgress(0);
    const controller = new AbortController();
    abortRef.current = controller;
    let objectUrl: string | null = null;
    try {
      const { encodeReactFramesToMp4, VideoExportUnsupportedError } =
        await import("../exportVideo");
      try {
        const blob = await encodeReactFramesToMp4({
          width: dims.width,
          height: dims.height,
          durationSec: videoDuration,
          fps: LEADERBOARD_VIDEO_FPS,
          signal: controller.signal,
          onProgress: ({ frame, totalFrames }) =>
            setProgress(frame / totalFrames),
          renderFrame: (timeSec) => (
            <LeaderboardTemplate
              data={data}
              units={units}
              theme={theme}
              ctaMode={ctaMode}
              timeSec={timeSec}
            />
          ),
        });
        objectUrl = URL.createObjectURL(blob);
        triggerDownload(objectUrl, `driven-leaderboard-${timestamp()}.mp4`);
      } catch (err) {
        if (err instanceof VideoExportUnsupportedError) {
          alert(`${err.message} Try the latest Chrome, Edge, or Safari.`);
          return;
        }
        throw err;
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      console.error("[creator] leaderboard video export failed", err);
      alert("Couldn't export the video. See console for details.");
    } finally {
      if (objectUrl) {
        const url = objectUrl;
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      }
      abortRef.current = null;
      setDownloading(false);
      setProgress(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] lg:h-[calc(100vh-7.5rem)]">
      <aside className="lg:h-full lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/5 bg-driven-bg">
        <LeaderboardControls
          data={data}
          units={units}
          theme={theme}
          ctaMode={ctaMode}
          onDataChange={onDataChange}
          onUnitsChange={onUnitsChange}
          onThemeChange={onThemeChange}
          onCtaModeChange={onCtaModeChange}
        />
      </aside>

      <section className="min-h-[70vh] lg:min-h-0 lg:h-full">
        <div className="flex flex-col h-full bg-driven-bg-deep border-l border-white/5">
          <div className="flex items-center justify-between border-b border-white/5 p-4">
            <div>
              <h2 className="text-lg font-semibold text-driven-text">
                Live Preview
              </h2>
              <p className="text-xs text-driven-outline">
                {data.entries.length} drivers · {dims.width}×{dims.height}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {downloading && progress != null && (
                <button
                  onClick={() => abortRef.current?.abort()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-xs font-mono uppercase tracking-[2px] text-driven-text-secondary transition-colors hover:border-white/30 hover:text-driven-text"
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </button>
              )}
              <button
                onClick={handleVideoDownload}
                disabled={downloading}
                title={`Last place climbs to #1 · ${videoDuration}s`}
                className="inline-flex items-center gap-2 rounded-md border border-driven-accent/40 bg-driven-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-[2px] text-driven-accent transition-all hover:bg-driven-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading && progress != null ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Film className="h-4 w-4" />
                )}
                {downloading && progress != null
                  ? `Encoding ${Math.round(progress * 100)}%`
                  : "MP4"}
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center gap-2 rounded-md bg-driven-accent px-4 py-2 text-sm font-bold uppercase tracking-[2px] text-driven-bg-deep transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 glow-accent-sm"
              >
                {downloading && progress == null ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {downloading && progress == null ? "Exporting" : "PNG"}
              </button>
            </div>
          </div>

          {downloading && progress != null && (
            <div className="h-0.5 w-full bg-white/5">
              <div
                className="h-full bg-driven-accent transition-[width] duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          )}

          <div
            ref={frameRef}
            className="flex-1 flex items-center justify-center p-8 min-h-0 overflow-hidden"
          >
            <div
              style={{
                width: dims.width * scale,
                height: dims.height * scale,
              }}
              className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.12)]"
            >
              <div
                ref={captureRef}
                style={{
                  width: dims.width,
                  height: dims.height,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <LeaderboardTemplate
                  data={data}
                  units={units}
                  theme={theme}
                  ctaMode={ctaMode}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 px-4 py-3 text-xs text-driven-outline">
            Preview is a scaled render — exports at full {dims.width}×
            {dims.height}. MP4 runs {videoDuration}s at {LEADERBOARD_VIDEO_FPS}
            fps: last place climbs to #1.
          </div>
        </div>
      </section>
    </div>
  );
}
