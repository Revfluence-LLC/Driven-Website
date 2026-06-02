import { THEMES, type TemplateProps } from "../types";

// Compact 5:4 landscape badge (1350×1080) built to be dropped on top of a
// photo. The outer frame is transparent with a margin so the rounded dark
// card keeps clean corners when overlaid; everything is centered like a
// sticker rather than a full-bleed poster.
export function ZeroToSixtyBadgeTemplate({ data, units, theme }: TemplateProps) {
  const palette = THEMES[theme];
  const targetSpeed = units === "kmh" ? "100" : "60";
  const unitLabel = units === "kmh" ? "km/h" : "mph";
  const seconds = data.zeroToSixtySec.toFixed(2);
  const [whole, frac] = seconds.split(".");

  return (
    <div
      style={{
        width: 1350,
        height: 1080,
        // Transparent frame → exported PNG has see-through margins so the
        // badge sits over a photo with rounded corners.
        background: "transparent",
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        padding: 72,
        display: "flex",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: 1,
          borderRadius: 56,
          background: `radial-gradient(circle at 20% 0%, ${palette.accent}22 0%, transparent 55%), linear-gradient(165deg, ${palette.bg} 0%, ${palette.bgDeep} 100%)`,
          border: `1px solid ${palette.accent}33`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.55)`,
          padding: 72,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 9999,
              background: palette.accent,
              boxShadow: `0 0 24px ${palette.accent}`,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "14px",
              fontSize: 60,
              fontWeight: 800,
              color: palette.accent,
              textShadow: `0 0 24px ${palette.accent}60`,
            }}
          >
            DRIVEN
          </span>
        </div>

        {/* Stat box */}
        <div
          style={{
            width: "100%",
            background: `${palette.surface}CC`,
            border: `1px solid ${palette.accent}2E`,
            borderRadius: 40,
            padding: "64px 56px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 34,
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            0–{targetSpeed} {unitLabel}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 200,
                fontWeight: 700,
                lineHeight: 0.9,
                color: "#fff",
                textShadow: `0 0 60px ${palette.accent}55`,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-4px",
              }}
            >
              {whole}
              <span style={{ color: palette.accent }}>.{frac}</span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              sec
            </span>
          </div>

          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: palette.accent,
              letterSpacing: "1px",
            }}
          >
            {data.rank}
          </div>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {data.achievement}
          </div>
        </div>
      </div>
    </div>
  );
}
