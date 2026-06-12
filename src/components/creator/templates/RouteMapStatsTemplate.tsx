import {
  THEMES,
  formatDistance,
  formatSpeed,
  type TemplateProps,
} from "../types";
import { BrandBlock } from "./BrandBlock";

function RouteEndpoint({
  city,
  region,
  color,
}: {
  city: string;
  region: string;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
      <span style={{ color, fontSize: 26, fontWeight: 700 }}>{city}</span>
      {region && (
        <span
          style={{
            fontSize: 14,
            letterSpacing: "2px",
            color: "rgba(255,255,255,0.55)",
            marginTop: 2,
          }}
        >
          {region}
        </span>
      )}
    </div>
  );
}

export function RouteMapStatsTemplate({
  data,
  units,
  theme,
  ctaMode,
}: TemplateProps) {
  const palette = THEMES[theme];
  const dist = formatDistance(data.distance, units);
  const avg = formatSpeed(data.avgSpeed, units);
  const top = formatSpeed(data.topSpeed, units);

  const stats: Array<{ label: string; value: string; unit?: string; hero?: boolean }> = [
    { label: `Distance`, value: String(dist.value), unit: dist.unit },
    { label: `Avg Speed`, value: String(avg.value), unit: avg.unit },
    { label: `Max Speed`, value: String(top.value), unit: top.unit, hero: true },
    { label: `Rank`, value: data.rank },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: `linear-gradient(160deg, ${palette.bg} 0%, ${palette.bgDeep} 100%)`,
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        padding: 60,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BrandBlock
          palette={palette}
          cta={ctaMode}
          fontSize={44}
          letterSpacing={14}
          dotSize={18}
          gap={20}
        />
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 18,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          PAGE 2 · TRIP STATS
        </div>
      </div>

      {/* Route label */}
      <div
        style={{
          background: `${palette.accent}18`,
          border: `1px solid ${palette.accent}50`,
          borderRadius: 20,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        <RouteEndpoint
          city={data.startLocation}
          region={data.startRegion}
          color={palette.accent}
        />
        <span style={{ opacity: 0.5, fontSize: 28 }}>→</span>
        <RouteEndpoint
          city={data.endLocation}
          region={data.endRegion}
          color="#FF8FAB"
        />
      </div>

      {/* Stats grid */}
      <div
        style={{
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
              background: s.hero
                ? `linear-gradient(135deg, ${palette.accent}30 0%, ${palette.surface} 100%)`
                : `${palette.surface}CC`,
              border: `1px solid ${palette.accent}${s.hero ? "80" : "20"}`,
              borderRadius: 24,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 120,
                fontWeight: 800,
                lineHeight: 1,
                color: "#fff",
                fontVariantNumeric: "tabular-nums",
                textShadow: s.hero
                  ? `0 0 40px ${palette.accent}80`
                  : undefined,
                letterSpacing: "-2px",
              }}
            >
              {s.value}
              {s.unit && (
                <span
                  style={{
                    fontSize: 38,
                    color: palette.accent,
                    marginLeft: 12,
                    opacity: 0.9,
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <div
          style={{
            background: palette.accent,
            color: palette.bgDeep,
            padding: "14px 26px",
            borderRadius: 9999,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 22,
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
