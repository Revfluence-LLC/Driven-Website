"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2, X } from "lucide-react";
import {
  CANVAS_DIMENSIONS,
  TEMPLATES,
  videoSpecFor,
  type TemplateId,
  type ThemeId,
  type TripData,
  type Units,
} from "./types";
import { RenderTemplate } from "./templates/registry";

// Kicks off a browser download for a blob or data URL. The anchor is attached
// to the document because Firefox ignores clicks on detached anchors.
function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

// Resolve once every <img> inside `node` has finished loading (or errored).
// Caps at 4s so a single hanging tile can't block the download forever.
function waitForImagesLoaded(node: HTMLElement, timeoutMs = 4000) {
  const imgs = Array.from(node.querySelectorAll("img"));
  const pending = imgs.filter(
    (img) => !(img.complete && img.naturalHeight > 0),
  );
  if (pending.length === 0) return Promise.resolve();
  return Promise.race([
    Promise.all(
      pending.map(
        (img) =>
          new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
      ),
    ).then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

type Props = {
  templateId: TemplateId;
  data: TripData;
  units: Units;
  theme: ThemeId;
  ctaMode?: boolean;
  // False while an async resource the template depends on (e.g. OSRM route)
  // is still loading. Disables the Download button so the export doesn't
  // capture a half-rendered state.
  ready?: boolean;
};

export function LivePreview({
  templateId,
  data,
  units,
  theme,
  ctaMode,
  ready = true,
}: Props) {
  const meta = TEMPLATES.find((t) => t.id === templateId)!;
  const dims = CANVAS_DIMENSIONS[meta.aspect];
  const videoSpec = videoSpecFor(templateId);

  const frameRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [scale, setScale] = useState(0.5);
  const [downloading, setDownloading] = useState(false);
  const [frozen, setFrozen] = useState(false);
  // 0..1 while an MP4 export is encoding; null for still exports.
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = frame;
      const s = Math.min(
        clientWidth / dims.width,
        clientHeight / dims.height,
      );
      setScale(s > 0 ? s : 0.5);
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [dims.width, dims.height]);

  // Animated templates encode to MP4; still templates snapshot to PNG.
  const handleDownload = () =>
    videoSpec ? handleVideoDownload() : handleImageDownload();

  const handleVideoDownload = async () => {
    setDownloading(true);
    setProgress(0);
    const controller = new AbortController();
    abortRef.current = controller;
    let objectUrl: string | null = null;
    try {
      const { exportTemplateVideo, VideoExportUnsupportedError } = await import(
        "./exportVideo"
      );
      try {
        const blob = await exportTemplateVideo({
          templateId,
          data,
          units,
          theme,
          ctaMode,
          signal: controller.signal,
          onProgress: ({ frame, totalFrames }) =>
            setProgress(frame / totalFrames),
        });
        objectUrl = URL.createObjectURL(blob);
        triggerDownload(objectUrl, `driven-${templateId}-${timestamp()}.mp4`);
      } catch (err) {
        if (err instanceof VideoExportUnsupportedError) {
          alert(`${err.message} Try the latest Chrome, Edge, or Safari.`);
          return;
        }
        throw err;
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      console.error("[creator] video export failed", err);
      alert("Couldn't export the video. See console for details.");
    } finally {
      // Revoke well after the download has been handed to the browser.
      if (objectUrl) {
        const url = objectUrl;
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      }
      abortRef.current = null;
      setDownloading(false);
      setProgress(null);
    }
  };

  const handleImageDownload = async () => {
    const node = captureRef.current;
    if (!node) return;
    setDownloading(true);
    setFrozen(true);
    // Wait two animation frames so React renders the frozen state and the
    // browser paints it before html-to-image snapshots the DOM.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    // Wait for any map tiles / external images to finish loading. Without
    // this, a fresh route template can get captured before OSM tiles arrive.
    await waitForImagesLoaded(node);
    try {
      const dataUrl = await toPng(node, {
        width: dims.width,
        height: dims.height,
        pixelRatio: 1,
        // cacheBust rewrites image URLs with a timestamp query param, which
        // defeats the browser's tile cache and can trigger CORS failures on
        // Carto tiles. Tiles already bust cache via their own URL scheme.
        cacheBust: false,
        style: {
          transform: "none",
          transformOrigin: "top left",
          margin: "0",
        },
      });
      triggerDownload(dataUrl, `driven-${templateId}-${timestamp()}.png`);
    } catch (err) {
      console.error("[creator] download failed", err);
      alert("Couldn't export the image. See console for details.");
    } finally {
      setDownloading(false);
      setFrozen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-driven-bg-deep border-l border-white/5">
      <div className="flex items-center justify-between border-b border-white/5 p-4">
        <div>
          <h2 className="text-lg font-semibold text-driven-text">
            Live Preview
          </h2>
          <p className="text-xs text-driven-outline">
            {meta.label} · {dims.width}×{dims.height}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {downloading && videoSpec && (
            <button
              onClick={() => abortRef.current?.abort()}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-xs font-mono uppercase tracking-[2px] text-driven-text-secondary transition-colors hover:border-white/30 hover:text-driven-text"
            >
              <X className="h-3.5 w-3.5" />
              Cancel
            </button>
          )}
          <button
            onClick={handleDownload}
            disabled={downloading || !ready}
            title={
              !ready ? "Waiting for the route to finish loading…" : undefined
            }
            className="inline-flex items-center gap-2 rounded-md bg-driven-accent px-4 py-2 text-sm font-bold uppercase tracking-[2px] text-driven-bg-deep transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 glow-accent-sm"
          >
            {downloading || !ready ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {downloading
              ? progress != null
                ? `Encoding ${Math.round(progress * 100)}%`
                : "Exporting"
              : !ready
                ? "Routing…"
                : videoSpec
                  ? "Download MP4"
                  : "Download PNG"}
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
            <RenderTemplate
              id={templateId}
              data={data}
              units={units}
              theme={theme}
              ctaMode={ctaMode}
              frozen={frozen}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-3 text-xs text-driven-outline">
        Preview is a scaled render — exports at full {dims.width}×{dims.height}
        {videoSpec
          ? ` MP4 · ${videoSpec.durationSec}s · ${videoSpec.fps}fps. Encoding runs in your browser and takes a moment.`
          : " PNG."}
      </div>
    </div>
  );
}
