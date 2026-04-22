import { THEMES, formatSpeed, type TemplateProps } from "../types";

export function HudGaugeTemplate({ data, units, theme }: TemplateProps) {
  const palette = THEMES[theme];
  const top = formatSpeed(data.topSpeed, units);
  const avg = formatSpeed(data.avgSpeed, units);

  const radius = 380;
  const circumference = Math.PI * radius;
  const maxSpeed = units === "kmh" ? 320 : 200;
  const progress = Math.min(top.value / maxSpeed, 1);
  const dashOffset = circumference * (1 - progress);
  const arcFraction = 0.75;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: `radial-gradient(ellipse at 50% 40%, ${palette.surface} 0%, ${palette.bgDeep} 70%)`,
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${palette.accent}0A 1px, transparent 1px), linear-gradient(90deg, ${palette.accent}0A 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.6,
        }}
      />

      {/* Brand chip */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 9999,
            background: palette.accent,
            boxShadow: `0 0 32px ${palette.accent}`,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "18px",
            fontSize: 56,
            fontWeight: 800,
            color: palette.accent,
            textShadow: `0 0 32px ${palette.accent}80`,
          }}
        >
          DRIVEN
        </span>
      </div>

      {/* Gauge */}
      <svg
        viewBox="0 0 1000 1000"
        width={900}
        height={900}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-90deg)",
        }}
      >
        <defs>
          <linearGradient id="hudArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.accentLight} />
            <stop offset="100%" stopColor={palette.accent} />
          </linearGradient>
        </defs>
        <circle
          cx="500"
          cy="500"
          r={radius}
          fill="none"
          stroke={palette.surface}
          strokeWidth="28"
          strokeLinecap="round"
          strokeDasharray={`${circumference * arcFraction} ${circumference * (1 - arcFraction)}`}
          style={{
            transform: "rotate(135deg)",
            transformOrigin: "center",
          }}
        />
        <circle
          cx="500"
          cy="500"
          r={radius}
          fill="none"
          stroke="url(#hudArc)"
          strokeWidth="36"
          strokeLinecap="round"
          strokeDasharray={`${circumference * arcFraction} ${circumference * (1 - arcFraction)}`}
          strokeDashoffset={dashOffset * arcFraction}
          style={{
            filter: `drop-shadow(0 0 24px ${palette.accent}80)`,
            transform: "rotate(135deg)",
            transformOrigin: "center",
          }}
        />
      </svg>

      {/* Center readout */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 220,
            fontWeight: 700,
            lineHeight: 1,
            color: "#fff",
            textShadow: `0 0 60px ${palette.accent}90`,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {top.value}
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "12px",
            fontSize: 36,
            fontWeight: 600,
            color: palette.accent,
            marginTop: 16,
          }}
        >
          {top.unit.toUpperCase()}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Top Speed
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: 64,
          right: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Trip
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>{data.tripName}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Avg
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              fontFamily: "var(--font-geist-mono), monospace",
              color: palette.accent,
            }}
          >
            {avg.value}
            <span style={{ fontSize: 22, opacity: 0.7, marginLeft: 6 }}>
              {avg.unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
