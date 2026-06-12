import {
  THEMES,
  formatDistance,
  formatDuration,
  formatSpeed,
  type TemplateProps,
} from "../types";
import { BrandBlock } from "./BrandBlock";

export function TripStatsTemplate({
  data,
  units,
  theme,
  ctaMode,
}: TemplateProps) {
  const palette = THEMES[theme];
  const top = formatSpeed(data.topSpeed, units);
  const avg = formatSpeed(data.avgSpeed, units);
  const dist = formatDistance(data.distance, units);

  const stats: Array<{ label: string; value: string; unit?: string }> = [
    { label: "Distance", value: String(dist.value), unit: dist.unit },
    { label: "Duration", value: formatDuration(data.durationMin) },
    { label: "Avg Speed", value: String(avg.value), unit: avg.unit },
    { label: "Top Speed", value: String(top.value), unit: top.unit },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: `linear-gradient(160deg, ${palette.bg} 0%, ${palette.bgDeep} 100%)`,
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        padding: 80,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Brand */}
      <BrandBlock
        palette={palette}
        cta={ctaMode}
        fontSize={48}
        letterSpacing={14}
        dotSize={18}
        gap={20}
      />

      {/* Trip name */}
      <div style={{ marginTop: 48 }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 16,
          }}
        >
          Trip Report
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-1px",
          }}
        >
          {data.tripName}
        </div>
      </div>

      {/* Stat grid */}
      <div
        style={{
          marginTop: 60,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: `${palette.surface}CC`,
              border: `1px solid ${palette.accent}20`,
              borderRadius: 24,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 20,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 110,
                fontWeight: 700,
                lineHeight: 1,
                color: "#fff",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.value}
              {s.unit && (
                <span
                  style={{
                    fontSize: 34,
                    color: palette.accent,
                    marginLeft: 10,
                    opacity: 0.85,
                  }}
                >
                  {s.unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: palette.accent,
            color: palette.bgDeep,
            padding: "14px 26px",
            borderRadius: 9999,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {data.rank} · {data.achievement}
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
