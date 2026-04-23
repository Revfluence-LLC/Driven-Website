"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import {
  CANVAS_DIMENSIONS,
  TEMPLATES,
  type TemplateId,
  type ThemeId,
  type TripData,
  type Units,
} from "./types";
import { RenderTemplate } from "./templates/registry";

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
  ready = true,
}: Props) {
  const meta = TEMPLATES.find((t) => t.id === templateId)!;
  const dims = CANVAS_DIMENSIONS[meta.aspect];

  const frameRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [downloading, setDownloading] = useState(false);
  const [frozen, setFrozen] = useState(false);

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

  const handleDownload = async () => {
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
      const a = document.createElement("a");
      a.href = dataUrl;
      const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      a.download = `driven-${templateId}-${stamp}.png`;
      a.click();
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
        <button
          onClick={handleDownload}
          disabled={downloading || !ready}
          title={!ready ? "Waiting for the route to finish loading…" : undefined}
          className="inline-flex items-center gap-2 rounded-md bg-driven-accent px-4 py-2 text-sm font-bold uppercase tracking-[2px] text-driven-bg-deep transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 glow-accent-sm"
        >
          {downloading || !ready ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading ? "Exporting" : !ready ? "Routing…" : "Download"}
        </button>
      </div>

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
              frozen={frozen}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-3 text-xs text-driven-outline">
        Preview is a scaled render — exports at full {dims.width}×{dims.height}.
      </div>
    </div>
  );
}
