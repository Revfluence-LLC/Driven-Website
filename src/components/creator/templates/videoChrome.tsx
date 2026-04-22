import type { ThemePalette } from "../types";

// Video-style UI chrome — letterbox bars, play icon, timecode, progress, scanlines.
// Inline styles so html-to-image captures them.

export function VideoChrome({
  palette,
  timecode,
  progress,
  label,
  animated,
}: {
  palette: ThemePalette;
  timecode: string;
  progress: number;
  label: string;
  animated?: boolean;
}) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;
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
          animation: animated ? "driven-scan 6s linear infinite" : undefined,
          backgroundSize: "100% 120px",
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
              animation: animated ? "driven-blink 1.1s ease-in-out infinite" : undefined,
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

      <style>{`
        @keyframes driven-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes driven-scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 120px; }
        }
      `}</style>
    </>
  );
}
