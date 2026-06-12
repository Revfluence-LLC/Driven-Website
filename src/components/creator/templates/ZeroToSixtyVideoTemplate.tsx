"use client";

import { THEMES, type TemplateProps } from "../types";
import { BrandBlock } from "./BrandBlock";
import { VideoChrome } from "./videoChrome";
import { easeOutCubic, useVideoClock } from "./useVideoClock";

const DURATION = 8;

export function ZeroToSixtyVideoTemplate({
  data,
  units,
  theme,
  frozen,
  ctaMode,
}: TemplateProps) {
  const palette = THEMES[theme];
  const target = units === "kmh" ? "100" : "60";
  const unitLabel = units === "kmh" ? "km/h" : "mph";

  const clock = useVideoClock(DURATION, frozen);
  // Arc + number fill during the first 70% of the clip, then hold.
  const fillProgress = easeOutCubic(Math.min(clock.progress / 0.7, 1));
  const displayedSec = data.zeroToSixtySec * fillProgress;
  const secondsStr = displayedSec.toFixed(2);
  const [whole, frac] = secondsStr.split(".");

  // Stopwatch arc: map displayedSec to the 0..10s stopwatch face
  const radius = 300;
  const circumference = 2 * Math.PI * radius;
  const arcProgress = Math.min(displayedSec / 10, 1);
  const dashOffset = circumference * (1 - arcProgress);

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: `radial-gradient(circle at 50% 50%, ${palette.accent}20 0%, transparent 55%), ${palette.bgDeep}`,
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Brand */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BrandBlock
          palette={palette}
          cta={ctaMode}
          fontSize={44}
          letterSpacing={14}
          dotSize={18}
          gap={20}
          align="center"
        />
      </div>

      {/* Stopwatch arc */}
      <svg
        viewBox="0 0 1000 1000"
        width={780}
        height={780}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -48%) rotate(-90deg)",
        }}
      >
        <defs>
          <linearGradient id="stopwatchArc" x1="0%" y1="0%" x2="100%" y2="0%">
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
          strokeWidth="22"
          opacity="0.5"
        />
        <circle
          cx="500"
          cy="500"
          r={radius}
          fill="none"
          stroke="url(#stopwatchArc)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            filter: `drop-shadow(0 0 18px ${palette.accent}80)`,
          }}
        />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360;
          const isMajor = i % 3 === 0;
          const inner = isMajor ? 230 : 250;
          const outer = 270;
          const rad = (angle * Math.PI) / 180;
          const x1 = 500 + inner * Math.cos(rad);
          const y1 = 500 + inner * Math.sin(rad);
          const x2 = 500 + outer * Math.cos(rad);
          const y2 = 500 + outer * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isMajor ? palette.accent : "rgba(255,255,255,0.3)"}
              strokeWidth={isMajor ? 4 : 2}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Center readout */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 32,
            letterSpacing: "8px",
            color: palette.accent,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          0 → {target} {unitLabel}
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 240,
            fontWeight: 800,
            lineHeight: 1,
            color: "#fff",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-6px",
            textShadow: `0 0 60px ${palette.accent}90`,
          }}
        >
          {whole}
          <span style={{ color: palette.accent }}>.{frac}</span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 28,
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginTop: 4,
          }}
        >
          seconds
        </div>
      </div>

      <VideoChrome
        palette={palette}
        timecode={clock.timecode}
        progress={clock.progress}
        label="0-60 RUN"
        animated={!frozen}
      />
    </div>
  );
}
