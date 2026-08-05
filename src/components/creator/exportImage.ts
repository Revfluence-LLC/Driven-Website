"use client";

import { toSvg } from "html-to-image";
import type { Options } from "html-to-image/lib/types";

// Resolve once every <img> inside `node` has finished loading (or errored).
// Caps at 4s so a single hanging tile or avatar can't block the download.
export function waitForImagesLoaded(node: HTMLElement, timeoutMs = 4000) {
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

// Rasterizes `node` straight into `ctx`.
//
// This is html-to-image's own toCanvas() minus two things: the intermediate
// canvas it allocates per call, and the requestAnimationFrame it waits on after
// decoding. That rAF matters — browsers pause rAF in hidden tabs, so relying on
// it stalls any export the moment the tab loses focus.
export async function rasterizeInto(
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

// Snapshot a node at its full export resolution, independent of the preview's
// display scale.
export async function captureNodeToPng(
  node: HTMLElement,
  width: number,
  height: number,
) {
  await waitForImagesLoaded(node);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create a 2D canvas context");
  await rasterizeInto(
    node,
    {
      width,
      height,
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
    },
    ctx,
    width,
    height,
  );
  return canvas.toDataURL("image/png");
}

// Kicks off a browser download for a blob or data URL. The anchor is attached
// to the document because Firefox ignores clicks on detached anchors.
export function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

// Yields long enough for React to commit any pending state (e.g. freezing an
// animated template) before we snapshot the DOM.
//
// Deliberately macrotask-based rather than requestAnimationFrame: rAF is paused
// in hidden tabs, which would hang an export started just before the user
// switched away. html-to-image reads layout and computed styles, both of which
// are resolved on demand, so it never actually needs a paint to have happened.
export function nextPaint() {
  return new Promise<void>((resolve) =>
    setTimeout(() => setTimeout(() => resolve(), 0), 0),
  );
}
