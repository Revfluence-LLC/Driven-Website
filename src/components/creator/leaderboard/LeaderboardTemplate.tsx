"use client";

import { THEMES, type ThemeId, type Units } from "../types";
import { BrandBlock } from "../templates/BrandBlock";
import {
  MEDALS,
  formatMetricValue,
  initialsOf,
  metricUnit,
  type LeaderboardData,
} from "./types";
import { leaderboardFrameAt } from "./animation";
import { leaderboardLayout } from "./layout";

// Inline styles throughout so html-to-image captures them — same constraint
// as the card templates.
export function LeaderboardTemplate({
  data,
  units,
  theme,
  ctaMode,
  timeSec,
}: {
  data: LeaderboardData;
  units: Units;
  theme: ThemeId;
  ctaMode?: boolean;
  // When set, renders the exact frame at this point on the climb animation.
  // Omitted for the still export, which renders the board as entered.
  timeSec?: number;
}) {
  const palette = THEMES[theme];
  const entries = data.entries;
  const frame = leaderboardFrameAt(data, timeSec ?? null);
  const {
    width,
    height,
    padX,
    bottomPad,
    headerH,
    brandSize,
    titleSize,
    rowH,
    gap,
    nameSize,
    locationSize,
    valueSize,
    avatarSize,
    rankSize,
  } = leaderboardLayout(data, ctaMode);

  return (
    <div
      style={{
        width,
        height,
        background: `radial-gradient(ellipse at 50% 0%, ${palette.accent}22 0%, transparent 55%), linear-gradient(180deg, ${palette.bg} 0%, ${palette.bgDeep} 100%)`,
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header — everything centered under the wordmark */}
      <div
        style={{
          height: headerH,
          padding: `0 ${padX}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 16,
        }}
      >
        <BrandBlock
          palette={palette}
          cta={ctaMode}
          fontSize={brandSize}
          letterSpacing={Math.round(brandSize * 0.3)}
          dotSize={Math.round(brandSize * 0.36)}
          gap={Math.round(brandSize * 0.34)}
          glowSize={Math.round(brandSize * 0.7)}
          dotGlowSize={Math.round(brandSize * 0.6)}
          align="center"
        />
        <div
          style={{
            maxWidth: "100%",
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.5px",
            color: "#fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.title}
        </div>
      </div>

      {/* Rows — absolutely positioned so the climb animation can slide them
          past each other. With no timeSec every slot resolves to its index, so
          the still export lays out identically. */}
      <div
        style={{
          flex: 1,
          padding: `0 ${padX}px ${bottomPad}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: entries.length * rowH + (entries.length - 1) * gap,
          }}
        >
        {entries.map((entry, i) => {
          const slot = frame.positions[i];
          const rank = Math.round(slot);
          const medal = MEDALS[rank];
          const accentEdge = entry.isYou ? palette.accent : medal?.color;
          const isClimber =
            timeSec != null && i === frame.climberIndex && entries.length > 1;
          // Lift the climber above the rows it is passing, and let it settle.
          const lift =
            isClimber && frame.climbProgress > 0 && frame.climbProgress < 1
              ? 1
              : 0;
          return (
            <div
              key={entry.id}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: slot * (rowH + gap),
                zIndex: lift ? 10 : 1,
                height: rowH,
                display: "flex",
                alignItems: "center",
                gap: Math.round(rowH * 0.22),
                padding: `0 ${Math.round(rowH * 0.28)}px`,
                borderRadius: Math.round(rowH * 0.22),
                background: entry.isYou
                  ? `linear-gradient(90deg, ${palette.accent}26 0%, ${palette.accent}0D 100%)`
                  : medal
                    ? `${medal.color}12`
                    : "rgba(255,255,255,0.045)",
                border: `2px solid ${
                  entry.isYou
                    ? `${palette.accent}99`
                    : medal
                      ? `${medal.color}3D`
                      : "rgba(255,255,255,0.07)"
                }`,
                boxShadow: lift
                  ? `0 12px 40px rgba(0,0,0,0.55), 0 0 34px ${
                      accentEdge ?? palette.accent
                    }66`
                  : entry.isYou
                    ? `0 0 28px ${palette.accent}40`
                    : medal
                      ? `0 0 22px ${medal.glow}`
                      : undefined,
                transform: lift ? "scale(1.025)" : undefined,
              }}
            >
              {/* Rank */}
              <div
                style={{
                  width: Math.round(rankSize * 1.5),
                  flexShrink: 0,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: rankSize,
                  fontWeight: 800,
                  lineHeight: 1,
                  textAlign: "center",
                  color: accentEdge ?? "rgba(255,255,255,0.5)",
                  textShadow: accentEdge ? `0 0 18px ${accentEdge}80` : undefined,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {rank + 1}
              </div>

              {/* Avatar */}
              <div
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  flexShrink: 0,
                  borderRadius: 9999,
                  overflow: "hidden",
                  border: `2px solid ${accentEdge ?? "rgba(255,255,255,0.18)"}`,
                  background: palette.surface,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {entry.photo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={entry.photo}
                    alt=""
                    width={avatarSize}
                    height={avatarSize}
                    style={{
                      width: avatarSize,
                      height: avatarSize,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: Math.round(avatarSize * 0.36),
                      fontWeight: 700,
                      color: accentEdge ?? "rgba(255,255,255,0.6)",
                      letterSpacing: "1px",
                    }}
                  >
                    {initialsOf(entry.name)}
                  </span>
                )}
              </div>

              {/* Name + location */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: nameSize,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#fff",
                  }}
                >
                  {entry.name}
                  {entry.isYou && (
                    <span
                      style={{
                        marginLeft: 12,
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: Math.round(nameSize * 0.5),
                        letterSpacing: "2px",
                        padding: "3px 10px",
                        borderRadius: 9999,
                        background: palette.accent,
                        color: palette.bgDeep,
                        fontWeight: 800,
                        verticalAlign: "middle",
                      }}
                    >
                      YOU
                    </span>
                  )}
                </div>
                {entry.location && (
                  <div
                    style={{
                      marginTop: 3,
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: locationSize,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.45)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {entry.location}
                  </div>
                )}
              </div>

              {/* Value */}
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                <span
                  style={{
                    fontSize: valueSize,
                    fontWeight: 800,
                    lineHeight: 1,
                    color: accentEdge ?? "#fff",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-1px",
                    textShadow: accentEdge
                      ? `0 0 22px ${accentEdge}70`
                      : undefined,
                  }}
                >
                  {formatMetricValue(frame.values[i], data.metric, units)}
                </span>
                <span
                  style={{
                    fontSize: Math.round(valueSize * 0.36),
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "1px",
                  }}
                >
                  {metricUnit(data.metric, units)}
                </span>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
