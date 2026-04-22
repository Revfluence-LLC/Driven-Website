import { THEMES, type TemplateProps } from "../types";

export function ZeroToSixtyTemplate({ data, units, theme }: TemplateProps) {
  const palette = THEMES[theme];
  const targetSpeed = units === "kmh" ? "100" : "60";
  const unitLabel = units === "kmh" ? "km/h" : "mph";
  const seconds = data.zeroToSixtySec.toFixed(2);
  const [whole, frac] = seconds.split(".");

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: `radial-gradient(circle at 20% 0%, ${palette.accent}25 0%, transparent 50%), ${palette.bgDeep}`,
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        padding: 80,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: palette.accent,
              boxShadow: `0 0 28px ${palette.accent}`,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "14px",
              fontSize: 48,
              fontWeight: 800,
              color: palette.accent,
              textShadow: `0 0 24px ${palette.accent}60`,
            }}
          >
            DRIVEN
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 20,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Acceleration
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          marginTop: 80,
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: "4px",
          color: palette.accent,
        }}
      >
        0 → {targetSpeed}
        <span
          style={{
            fontSize: 32,
            marginLeft: 14,
            letterSpacing: "2px",
            opacity: 0.7,
          }}
        >
          {unitLabel}
        </span>
      </div>

      {/* Hero number */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 400,
            fontWeight: 700,
            lineHeight: 0.9,
            color: "#fff",
            textShadow: `0 0 80px ${palette.accent}60`,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-8px",
          }}
        >
          {whole}
          <span style={{ color: palette.accent }}>.{frac}</span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 64,
            letterSpacing: "8px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          seconds
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${palette.accent}30`,
          paddingTop: 32,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 8,
            }}
          >
            {data.tripName}
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: palette.accent }}>
            {data.rank} · {data.achievement}
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 18,
            letterSpacing: "3px",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
          }}
        >
          driven.app
        </div>
      </div>
    </div>
  );
}
