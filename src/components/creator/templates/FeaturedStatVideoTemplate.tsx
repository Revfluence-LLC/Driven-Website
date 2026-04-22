"use client";

import { THEMES, type TemplateProps } from "../types";
import { VideoChrome } from "./videoChrome";
import { animateNumberLike, useVideoClock } from "./useVideoClock";

const DURATION = 18;

export function FeaturedStatVideoTemplate({
  data,
  theme,
  frozen,
}: TemplateProps) {
  const palette = THEMES[theme];
  const clock = useVideoClock(DURATION, frozen);
  // Number counter fills during the first 55% of the clip, then holds.
  const fillProgress = Math.min(clock.progress / 0.55, 1);
  const displayedValue = animateNumberLike(fillProgress, data.statValue);

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: `radial-gradient(ellipse at 30% 40%, ${palette.accent}30 0%, transparent 45%), linear-gradient(160deg, ${palette.bg} 0%, ${palette.bgDeep} 100%)`,
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint horizontal sweep behind the stat */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${palette.accent} 50%, transparent 100%)`,
          opacity: 0.5,
          transform: "translateY(-50%)",
        }}
      />

      {/* Brand */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
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

      {/* Hero stat */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 32,
            letterSpacing: "8px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {data.statLabel}
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 220,
            fontWeight: 800,
            lineHeight: 1,
            color: "#fff",
            textShadow: `0 0 80px ${palette.accent}80`,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-4px",
          }}
        >
          {displayedValue}
        </div>
        <div
          style={{
            marginTop: 36,
            background: palette.accent,
            color: palette.bgDeep,
            padding: "16px 32px",
            borderRadius: 9999,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "3px",
            textTransform: "uppercase",
            opacity: fillProgress > 0.9 ? 1 : 0,
            transition: "opacity 400ms ease-out",
          }}
        >
          {data.rank} · {data.achievement}
        </div>
      </div>

      <VideoChrome
        palette={palette}
        timecode={clock.timecode}
        progress={clock.progress}
        label={data.tripName}
        animated={!frozen}
      />
    </div>
  );
}
