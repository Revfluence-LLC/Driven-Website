import type { ThemePalette } from "../types";

// Shared brand lockup: glowing accent dot + DRIVEN wordmark. Each template
// passes its own sizing so the default render matches its original inline
// styles exactly. With `cta` the wordmark scales up ~30% and an "Available on
// the App Store" line renders beneath it — for exports meant to drive
// installs rather than carry a subtle watermark.
export function BrandBlock({
  palette,
  cta = false,
  fontSize,
  letterSpacing,
  dotSize,
  gap,
  glowSize = 24,
  glowAlpha = "60",
  dotGlowSize = 28,
  align = "flex-start",
}: {
  palette: ThemePalette;
  cta?: boolean;
  fontSize: number;
  letterSpacing: number;
  dotSize: number;
  gap: number;
  glowSize?: number;
  glowAlpha?: string;
  dotGlowSize?: number;
  align?: "flex-start" | "center";
}) {
  const wordmarkSize = cta ? Math.round(fontSize * 1.3) : fontSize;
  const wordmarkSpacing = cta ? Math.round(letterSpacing * 1.3) : letterSpacing;

  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      {/* The dot reads as clutter next to the larger CTA lockup — drop it. */}
      {!cta && (
        <div
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: 9999,
            background: palette.accent,
            boxShadow: `0 0 ${dotGlowSize}px ${palette.accent}`,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: align,
          gap: cta ? Math.round(fontSize * 0.2) : 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: `${wordmarkSpacing}px`,
            fontSize: wordmarkSize,
            fontWeight: 800,
            lineHeight: 1,
            color: palette.accent,
            textShadow: `0 0 ${glowSize}px ${palette.accent}${glowAlpha}`,
          }}
        >
          DRIVEN
        </span>
        {cta && (
          <>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: Math.round(fontSize * 0.42),
                letterSpacing: `${Math.round(fontSize * 0.12)}px`,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Speed Tracker
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: Math.round(fontSize * 0.34),
                letterSpacing: `${Math.round(fontSize * 0.1)}px`,
                fontWeight: 600,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Available on the App Store
            </span>
          </>
        )}
      </div>
    </div>
  );
}
