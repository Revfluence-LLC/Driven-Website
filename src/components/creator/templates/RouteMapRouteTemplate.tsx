import { THEMES, formatDuration, type TemplateProps } from "../types";

// Deterministic pseudo-random from an integer seed.
function seeded(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildRoutePath(seed: number) {
  const rand = seeded(seed);
  const start = { x: 120, y: 180 };
  const end = { x: 880, y: 660 };
  const segments: Array<{ x: number; y: number }> = [start];
  const n = 5;
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const bx = start.x + (end.x - start.x) * t;
    const by = start.y + (end.y - start.y) * t;
    const jitterX = (rand() - 0.5) * 260;
    const jitterY = (rand() - 0.5) * 200;
    segments.push({ x: bx + jitterX, y: by + jitterY });
  }
  segments.push(end);

  let d = `M ${start.x} ${start.y}`;
  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i - 1];
    const curr = segments[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x} ${prev.y}, ${midX} ${midY}`;
  }
  d += ` T ${end.x} ${end.y}`;
  return { d, start, end };
}

export function RouteMapRouteTemplate({ data, theme }: TemplateProps) {
  const palette = THEMES[theme];
  const { d: pathD, start, end } = buildRoutePath(data.routeSeed);

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
          background: `${palette.surface}`,
          border: `1px solid ${palette.accent}30`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${palette.accent}0A 1px, transparent 1px), linear-gradient(90deg, ${palette.accent}0A 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            opacity: 0.8,
          }}
        />
        {/* Diagonal contour lines for "map" feel */}
        <svg
          viewBox="0 0 1000 800"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
          preserveAspectRatio="none"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M ${-200 + i * 180} 900 Q ${300 + i * 120} ${600 - i * 40} ${1200} ${200 - i * 30}`}
              stroke={palette.accent}
              strokeWidth="1"
              fill="none"
              opacity={0.08}
            />
          ))}

          {/* Route path (glow) */}
          <path
            d={pathD}
            stroke={palette.accent}
            strokeWidth="24"
            fill="none"
            strokeLinecap="round"
            opacity="0.25"
            style={{ filter: `blur(8px)` }}
          />
          {/* Route path (primary) */}
          <path
            d={pathD}
            stroke={palette.accent}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />

          {/* Start pin */}
          <circle
            cx={start.x}
            cy={start.y}
            r="22"
            fill={palette.accent}
            stroke="#fff"
            strokeWidth="4"
          />
          <circle cx={start.x} cy={start.y} r="8" fill="#fff" />
          {/* End pin */}
          <circle
            cx={end.x}
            cy={end.y}
            r="22"
            fill="#FF5277"
            stroke="#fff"
            strokeWidth="4"
          />
          <circle cx={end.x} cy={end.y} r="8" fill="#fff" />
        </svg>

        {/* Start label */}
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 32,
            background: "rgba(0,0,0,0.7)",
            borderRadius: 12,
            padding: "10px 18px",
            fontSize: 20,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#fff",
            fontFamily: "var(--font-geist-mono), monospace",
            backdropFilter: "blur(6px)",
          }}
        >
          <span style={{ color: palette.accent, marginRight: 10 }}>● START</span>
          {data.startLocation}
        </div>
        {/* End label */}
        <div
          style={{
            position: "absolute",
            right: 32,
            bottom: 32,
            background: "rgba(0,0,0,0.7)",
            borderRadius: 12,
            padding: "10px 18px",
            fontSize: 20,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#fff",
            fontFamily: "var(--font-geist-mono), monospace",
            backdropFilter: "blur(6px)",
          }}
        >
          <span style={{ color: "#FF5277", marginRight: 10 }}>● END</span>
          {data.endLocation}
        </div>
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
