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

type Props = {
  templateId: TemplateId;
  data: TripData;
  units: Units;
  theme: ThemeId;
};

export function LivePreview({ templateId, data, units, theme }: Props) {
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
    try {
      const dataUrl = await toPng(node, {
        width: dims.width,
        height: dims.height,
        pixelRatio: 1,
        cacheBust: true,
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
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-md bg-driven-accent px-4 py-2 text-sm font-bold uppercase tracking-[2px] text-driven-bg-deep transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 glow-accent-sm"
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading ? "Exporting" : "Download"}
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
