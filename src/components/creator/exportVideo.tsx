"use client";

import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { getFontEmbedCSS, toSvg } from "html-to-image";
import type { Options } from "html-to-image/lib/types";
import {
  BufferTarget,
  CanvasSource,
  Mp4OutputFormat,
  Output,
  Quality,
  canEncodeVideo,
  type VideoCodec,
} from "mediabunny";
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

export type VideoExportProgress = {
  frame: number;
  totalFrames: number;
};

export type VideoExportOptions = {
  templateId: TemplateId;
  data: TripData;
  units: Units;
  theme: ThemeId;
  ctaMode?: boolean;
  signal?: AbortSignal;
  onProgress?: (progress: VideoExportProgress) => void;
};

// Thrown when the browser has no usable WebCodecs video encoder. The caller
// turns this into a "your browser can't do this" message rather than a crash.
export class VideoExportUnsupportedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VideoExportUnsupportedError";
  }
}

// H.264 first — it's what every social platform and Quick Look wants. The rest
// are fallbacks for browsers without an AVC encoder; they still mux into MP4.
const CODEC_PREFERENCE: VideoCodec[] = ["avc", "hevc", "av1", "vp9"];

// `preferBitrate` forces bitrate-based rate control. Left to its own devices
// mediabunny prefers a quantizer, and Safari throws a bare TypeError out of
// VideoEncoder.isConfigSupported() when it sees `bitrateMode: "quantizer"`
// instead of reporting it as unsupported.
const QUALITY = new Quality({ quality: "high", preferBitrate: true });

function abortError() {
  return new DOMException("Video export cancelled", "AbortError");
}

// Rasterizes `node` straight into `ctx`.
//
// This is html-to-image's own toCanvas() minus two things: the intermediate
// canvas it allocates per call, and the requestAnimationFrame it waits on after
// decoding. That rAF matters — browsers pause rAF in hidden tabs, so relying on
// it would freeze a multi-hundred-frame export the moment the user switched
// tabs.
async function rasterizeInto(
  node: HTMLElement,
  options: Options,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const dataUrl = await toSvg(node, options);
  const img = new Image();
  img.decoding = "sync";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Could not rasterize frame"));
    img.src = dataUrl;
  });
  // Guarantees the bitmap is ready before we draw it. Some browsers reject
  // decode() for SVG sources, where the load event is already sufficient.
  await img.decode().catch(() => {});
  ctx.drawImage(img, 0, 0, width, height);
}

// Probes codecs one at a time so a browser that throws on one candidate
// (rather than returning "unsupported") doesn't take the others down with it.
async function pickCodec(width: number, height: number) {
  for (const codec of CODEC_PREFERENCE) {
    try {
      if (await canEncodeVideo(codec, { width, height, quality: QUALITY })) {
        return codec;
      }
    } catch {
      // This codec isn't usable here; keep looking.
    }
  }
  return null;
}

/**
 * Renders an animated template frame-by-frame and encodes it to an MP4.
 *
 * Frames are rendered into a detached React root rather than captured off the
 * live preview: that lets us drive the template's clock to an exact timestamp
 * per frame (`timeSec`) and rasterize as slowly as we need to without the
 * output ending up in slow motion. Each frame is handed to the encoder with an
 * explicit presentation timestamp, so wall-clock rasterization speed has no
 * effect on playback speed.
 */
export async function exportTemplateVideo({
  templateId,
  data,
  units,
  theme,
  ctaMode,
  signal,
  onProgress,
}: VideoExportOptions): Promise<Blob> {
  const spec = videoSpecFor(templateId);
  if (!spec) {
    throw new Error(`Template "${templateId}" is not an animated template`);
  }

  if (typeof window === "undefined" || typeof VideoEncoder === "undefined") {
    throw new VideoExportUnsupportedError(
      "This browser doesn't support the WebCodecs video encoder.",
    );
  }

  const meta = TEMPLATES.find((t) => t.id === templateId)!;
  const dims = CANVAS_DIMENSIONS[meta.aspect];
  const totalFrames = Math.round(spec.durationSec * spec.fps);
  const frameDuration = 1 / spec.fps;

  const codec = await pickCodec(dims.width, dims.height);
  if (!codec) {
    throw new VideoExportUnsupportedError(
      `This browser can't encode ${dims.width}×${dims.height} video.`,
    );
  }

  // Off-screen host. `frame` is the node we actually capture, and it stays free
  // of transforms/opacity because html-to-image copies the captured node's own
  // computed style onto the output.
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;top:0;left:-200vw;width:0;height:0;overflow:hidden;pointer-events:none;z-index:-1;";
  const frame = document.createElement("div");
  frame.style.cssText = `width:${dims.width}px;height:${dims.height}px;`;
  host.appendChild(frame);
  document.body.appendChild(host);

  const root = createRoot(frame);

  const canvas = document.createElement("canvas");
  canvas.width = dims.width;
  canvas.height = dims.height;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("Could not create a 2D canvas context");

  const output = new Output({
    // 'in-memory' fastStart puts the moov atom up front so the file is
    // seekable/streamable the moment it's saved.
    format: new Mp4OutputFormat({ fastStart: "in-memory" }),
    target: new BufferTarget(),
  });
  const source = new CanvasSource(canvas, {
    codec,
    quality: QUALITY,
    keyFrameInterval: 2,
  });
  output.addVideoTrack(source, { frameRate: spec.fps });

  const renderFrame = (timeSec: number) => {
    flushSync(() => {
      root.render(
        <RenderTemplate
          id={templateId}
          data={data}
          units={units}
          theme={theme}
          ctaMode={ctaMode}
          timeSec={timeSec}
        />,
      );
    });
  };

  let started = false;
  try {
    // Prime the tree, then resolve @font-face embeds once. Without this,
    // html-to-image re-fetches and re-inlines the webfonts on every single
    // frame, which dominates export time.
    renderFrame(0);
    const fontEmbedCSS = await getFontEmbedCSS(frame);

    const captureOptions: Options = {
      width: dims.width,
      height: dims.height,
      pixelRatio: 1,
      cacheBust: false,
      fontEmbedCSS,
    };

    await output.start();
    started = true;

    for (let i = 0; i < totalFrames; i++) {
      if (signal?.aborted) throw abortError();

      const timeSec = i * frameDuration;
      renderFrame(timeSec);
      await rasterizeInto(frame, captureOptions, ctx, dims.width, dims.height);

      // Awaiting applies encoder backpressure so we don't queue up hundreds of
      // uncompressed frames in memory.
      await source.add(timeSec, frameDuration);
      onProgress?.({ frame: i + 1, totalFrames });
    }

    await output.finalize();
    const buffer = output.target.buffer;
    if (!buffer) throw new Error("Encoder produced no output");
    return new Blob([buffer], { type: "video/mp4" });
  } catch (err) {
    if (started && output.state === "started") {
      await output.cancel().catch(() => {});
    }
    throw err;
  } finally {
    // Unmounting synchronously from here would collide with the flushSync
    // above, so let React tear down on the next tick.
    setTimeout(() => {
      root.unmount();
      host.remove();
    }, 0);
  }
}
