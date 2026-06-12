import {
  THEMES,
  formatDistance,
  formatDuration,
  formatSpeed,
  type TemplateProps,
} from "../types";
import { BrandBlock } from "./BrandBlock";

export function StoryStackTemplate({
  data,
  units,
  theme,
  ctaMode,
}: TemplateProps) {
  const palette = THEMES[theme];
  const top = formatSpeed(data.topSpeed, units);
  const avg = formatSpeed(data.avgSpeed, units);
  const dist = formatDistance(data.distance, units);

  const rows: Array<{ label: string; value: string; unit?: string }> = [
    { label: "Distance", value: String(dist.value), unit: dist.unit },
    { label: "Duration", value: formatDuration(data.durationMin) },
    { label: "Avg Speed", value: String(avg.value), unit: avg.unit },
    { label: "Top Speed", value: String(top.value), unit: top.unit },
    { label: "0–60", value: data.zeroToSixtySec.toFixed(2), unit: "s" },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: `radial-gradient(ellipse at 50% 0%, ${palette.accent}20 0%, transparent 45%), linear-gradient(180deg, ${palette.bg} 0%, ${palette.bgDeep} 100%)`,
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        padding: "120px 80px 120px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BrandBlock
          palette={palette}
          cta={ctaMode}
          fontSize={76}
          letterSpacing={22}
          dotSize={24}
          gap={28}
          glowSize={40}
          glowAlpha="80"
          dotGlowSize={36}
          align="center"
        />
      </div>

      {/* Trip name hero */}
      <div style={{ marginTop: 100, textAlign: "center" }}>
        <div
          style={{
            fontSize: 28,
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 24,
          }}
        >
          Trip
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-1px",
          }}
        >
          {data.tripName}
        </div>
      </div>

      {/* Stack */}
      <div
        style={{
          marginTop: 100,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {rows.map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingBottom: 24,
              borderBottom: `1px solid ${palette.accent}30`,
            }}
          >
            <span
              style={{
                fontSize: 32,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {r.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 96,
                fontWeight: 700,
                color: "#fff",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {r.value}
              {r.unit && (
                <span
                  style={{
                    fontSize: 36,
                    color: palette.accent,
                    marginLeft: 12,
                    opacity: 0.85,
                  }}
                >
                  {r.unit}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Footer badge */}
      <div
        style={{
          marginTop: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            background: palette.accent,
            color: palette.bgDeep,
            padding: "18px 36px",
            borderRadius: 9999,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          {data.rank} · {data.achievement}
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 22,
            letterSpacing: "5px",
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
