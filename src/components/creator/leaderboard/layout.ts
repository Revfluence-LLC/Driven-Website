import type { LeaderboardData, LeaderboardFormat } from "./types";

// Every format is 1080 wide; only the height varies.
export const CANVAS_WIDTH = 1080;
export const PAD_X = 64;
export const BOTTOM_PAD = 64;

const HEADER_TOP = 64;
const HEADER_GAP = 16;
const HEADER_BOTTOM = 40;

// Sized off the canvas width rather than its height, so the wordmark reads the
// same on every format — and so "fit" can derive height without a cycle.
const BRAND_SIZE = Math.round(CANVAS_WIDTH * 0.07);
const TITLE_SIZE = Math.round(BRAND_SIZE * 0.8);

// Comfortable row height when there's room for it. "Fit" always uses this;
// fixed formats fall back to it as a ceiling.
const TARGET_ROW_H = 150;
const MIN_ROW_H = 56;
const MAX_ROW_H = 170;
const MAX_FIT_HEIGHT = 1920;

export const FIXED_FORMAT_HEIGHTS: Record<
  Exclude<LeaderboardFormat, "fit">,
  number
> = {
  square: 1080,
  portrait: 1350,
  story: 1920,
};

export type LeaderboardLayout = {
  width: number;
  height: number;
  padX: number;
  bottomPad: number;
  headerH: number;
  brandSize: number;
  titleSize: number;
  rowH: number;
  gap: number;
  nameSize: number;
  locationSize: number;
  valueSize: number;
  avatarSize: number;
  rankSize: number;
};

// The CTA lockup stacks two extra lines under the wordmark.
function brandBlockHeight(ctaMode: boolean) {
  return ctaMode ? Math.round(BRAND_SIZE * 2.65) : BRAND_SIZE;
}

function headerHeight(ctaMode: boolean) {
  return (
    HEADER_TOP +
    brandBlockHeight(ctaMode) +
    HEADER_GAP +
    Math.round(TITLE_SIZE * 1.1) +
    HEADER_BOTTOM
  );
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

/**
 * Resolves every dimension the leaderboard card needs.
 *
 * On "fit" the canvas height is derived from the number of drivers, so a
 * two-driver board is a compact card rather than two rows adrift in a mostly
 * empty 4:5 frame. The fixed formats keep their exact social dimensions and
 * compress the rows to fit instead.
 */
export function leaderboardLayout(
  data: LeaderboardData,
  ctaMode = false,
): LeaderboardLayout {
  const n = Math.max(data.entries.length, 1);
  const gap = n > 8 ? 10 : 14;
  const headerH = headerHeight(ctaMode);
  const chrome = headerH + BOTTOM_PAD;

  let height: number;
  let rowH: number;

  if (data.format === "fit") {
    rowH = TARGET_ROW_H;
    height = chrome + n * rowH + (n - 1) * gap;
    if (height > MAX_FIT_HEIGHT) {
      // Too many drivers to give each one a full-height row; cap the canvas
      // and share out what's left.
      height = MAX_FIT_HEIGHT;
      rowH = clamp(
        Math.floor((height - chrome - gap * (n - 1)) / n),
        MIN_ROW_H,
        MAX_ROW_H,
      );
    }
  } else {
    height = FIXED_FORMAT_HEIGHTS[data.format];
    rowH = clamp(
      Math.floor((height - chrome - gap * (n - 1)) / n),
      MIN_ROW_H,
      MAX_ROW_H,
    );
  }

  return {
    width: CANVAS_WIDTH,
    // H.264 encodes 4:2:0 chroma and rejects odd dimensions, so a computed
    // "fit" height has to land even or the MP4 export fails outright.
    height: height + (height % 2),
    padX: PAD_X,
    bottomPad: BOTTOM_PAD,
    headerH,
    brandSize: BRAND_SIZE,
    titleSize: TITLE_SIZE,
    rowH,
    gap,
    // Type scales off row height so dense boards stay legible.
    nameSize: Math.round(Math.min(rowH * 0.32, 40)),
    locationSize: Math.round(Math.min(rowH * 0.2, 23)),
    valueSize: Math.round(Math.min(rowH * 0.46, 58)),
    avatarSize: Math.round(rowH * 0.66),
    rankSize: Math.round(Math.min(rowH * 0.38, 44)),
  };
}
