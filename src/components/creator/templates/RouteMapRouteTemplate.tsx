"use client";

import {
  HEATMAP_LEGEND,
  THEMES,
  formatDuration,
  type TemplateProps,
} from "../types";
import { LeafletMap } from "../LeafletMapClient";

export function RouteMapRouteTemplate({ data, theme }: TemplateProps) {
  const palette = THEMES[theme];
  const deltaMin = data.expectedMin - data.actualMin;
  const isFaster = deltaMin > 0;
  const deltaLabel = isFaster
    ? `${formatDuration(Math.abs(deltaMin))} faster`
    : `${formatDuration(Math.abs(deltaMin))} slower`;

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
              fontSize: 44,
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
            fontSize: 18,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          PAGE 1 · ROUTE OVERVIEW
        </div>
      </div>

      {/* Map */}
      <div
        style={{
          flex: 1,
          borderRadius: 28,
          border: `1px solid ${palette.accent}30`,
          position: "relative",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <LeafletMap
          start={data.startCoord}
          end={data.endCoord}
          route={data.routeGeometry}
          speeds={data.routeSpeeds}
          accent={palette.accent}
        />

        {/* Start label */}
        <PinLabel
          accent={palette.accent}
          kind="START"
          dotColor={palette.accent}
          city={data.startLocation}
          region={data.startRegion}
          position={{ left: 24, top: 24 }}
        />
        {/* End label */}
        <PinLabel
          accent={palette.accent}
          kind="END"
          dotColor="#FF5277"
          city={data.endLocation}
          region={data.endRegion}
          position={{ right: 24, bottom: 24 }}
        />

        {/* Attribution (subtle, required for OSM/Carto) */}
        <div
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            zIndex: 1000,
            fontSize: 10,
            letterSpacing: "1px",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-geist-mono), monospace",
            background: "rgba(0,0,0,0.4)",
            padding: "4px 8px",
            borderRadius: 6,
          }}
        >
          © OpenStreetMap · CARTO
        </div>

        {/* Heatmap legend */}
        {data.routeSpeeds && data.routeSpeeds.length > 0 && (
          <div
            style={{
              position: "absolute",
              left: 24,
              bottom: 24,
              zIndex: 1000,
              background: "rgba(0,0,0,0.8)",
              borderRadius: 12,
              padding: "12px 18px",
              backdropFilter: "blur(6px)",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 8,
              }}
            >
              Speed Heatmap · mph
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              {HEATMAP_LEGEND.map((l) => (
                <div
                  key={l.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 4,
                      borderRadius: 2,
                      background: l.color,
                      boxShadow: `0 0 8px ${l.color}`,
                    }}
                  />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Travel time comparison */}
      <div
        style={{
          background: `${palette.surface}CC`,
          border: `1px solid ${palette.accent}30`,
          borderRadius: 24,
          padding: "28px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 32,
          alignItems: "center",
        }}
      >
        <TimeColumn label="Expected" value={formatDuration(data.expectedMin)} />
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 16,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 8,
            }}
          >
            Δ Delta
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 32,
              fontWeight: 800,
              color: isFaster ? palette.accent : "#FF5277",
              letterSpacing: "1px",
            }}
          >
            {deltaLabel}
          </div>
        </div>
        <TimeColumn
          label="Actual"
          value={formatDuration(data.actualMin)}
          highlight={palette.accent}
        />
      </div>
    </div>
  );
}

function PinLabel({
  accent,
  kind,
  dotColor,
  city,
  region,
  position,
}: {
  accent: string;
  kind: "START" | "END";
  dotColor: string;
  city: string;
  region: string;
  position: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        borderRadius: 12,
        padding: "10px 18px",
        color: "#fff",
        fontFamily: "var(--font-geist-mono), monospace",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        ...position,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: accent,
          lineHeight: 1,
          fontWeight: 600,
        }}
      >
        <span style={{ color: dotColor }}>●</span>
        {kind}
      </div>
      <div style={{ lineHeight: 1.15 }}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {city}
        </div>
        {region && (
          <div
            style={{
              fontSize: 13,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {region}
          </div>
        )}
      </div>
    </div>
  );
}

function TimeColumn({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 16,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 64,
          fontWeight: 800,
          color: highlight ?? "#fff",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-1px",
        }}
      >
        {value}
      </div>
    </div>
  );
}
