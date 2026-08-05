import type { ThemePalette } from "../types";

// Video-style UI chrome — letterbox bars, play icon, timecode, progress, scanlines.
// Inline styles so html-to-image captures them.

const BLINK_PERIOD = 1.1;
const SCAN_PERIOD = 6;
const SCAN_DISTANCE = 120;

export function VideoChrome({
  palette,
  timecode,
  progress,
  label,
  elapsed,
}: {
  palette: ThemePalette;
  timecode: string;
  progress: number;
  label: string;
  // Clock position in seconds. The REC blink and scanline drift are derived
  // from this rather than CSS keyframes: the MP4 exporter renders each frame
  // into a detached tree where CSS animations never advance, so anything
  // keyframe-driven would come out frozen on frame 0.
  elapsed: number;
}) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;
  // Cosine ease matching the old 1 → 0.25 → 1 blink.
  const blinkOpacity =
    0.625 + 0.375 * Math.cos((2 * Math.PI * elapsed) / BLINK_PERIOD);
  const scanOffset = ((elapsed / SCAN_PERIOD) % 1) * SCAN_DISTANCE;
  return (
    <>
      {/* Scanlines (optionally scrolling) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)",
          mixBlendMode: "overlay",
          backgroundSize: `100% ${SCAN_DISTANCE}px`,
          backgroundPosition: `0 ${scanOffset}px`,
        }}
      />

      {/* Top letterbox */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 96,
          background: "linear-gradient(180deg, #000 60%, transparent)",
          padding: "28px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "rgba(255,255,255,0.7)",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 18,
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#FF3355",
              boxShadow: "0 0 14px #FF3355",
              opacity: blinkOpacity,
            }}
          />
          <span>REC · {label}</span>
        </div>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{timecode}</span>
      </div>

      {/* Bottom letterbox + progress */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(0deg, #000 60%, transparent)",
          padding: "28px 40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 18,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span
              style={{
                fontSize: 26,
                color: palette.accent,
                lineHeight: 1,
              }}
            >
              ▶
            </span>
            <span>LIVE TELEMETRY</span>
          </div>
          <span>1080p · 60fps</span>
        </div>
        <div
          style={{
            position: "relative",
            height: 4,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              background: palette.accent,
              boxShadow: `0 0 10px ${palette.accent}`,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${pct}%`,
              top: -6,
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: palette.accent,
              boxShadow: `0 0 14px ${palette.accent}`,
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>
    </>
  );
}
