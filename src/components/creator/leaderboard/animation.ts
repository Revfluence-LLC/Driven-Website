import { metricMeta, type LeaderboardData } from "./types";

// Clip structure: hold the board as entered, walk the last-placed driver up one
// rank at a time, then hold the finished board.
const INTRO_SEC = 1.2;
const PER_SWAP_SEC = 0.4;
const OUTRO_SEC = 1.8;

export const LEADERBOARD_VIDEO_FPS = 30;

export function leaderboardVideoDuration(entryCount: number) {
  const swaps = Math.max(entryCount - 1, 0);
  return +(INTRO_SEC + swaps * PER_SWAP_SEC + OUTRO_SEC).toFixed(2);
}

export type LeaderboardFrame = {
  // Visual slot for each entry, by its index in `data.entries`. Fractional
  // while a row is mid-move.
  positions: number[];
  // What each row should display right now — the climber's number rises as it
  // overtakes the field, so the finished board still reads as a valid ranking.
  values: number[];
  climberIndex: number;
  // How far the climb has run, 0..1. Drives the climber's glow.
  climbProgress: number;
};

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

// The value the climber needs in order to sit convincingly at #1.
function climbTargetValue(data: LeaderboardData): number {
  const { entries, metric } = data;
  const climber = entries[entries.length - 1];
  const others = entries.slice(0, -1).map((e) => e.value);
  if (others.length === 0) return climber.value;
  const { lowerIsBetter } = metricMeta(metric);

  if (lowerIsBetter) {
    const best = Math.min(...others);
    return Math.min(climber.value, +(best - 0.05).toFixed(2));
  }
  const best = Math.max(...others);
  const step = Math.max(1, Math.round(best * 0.02));
  return Math.max(climber.value, best + step);
}

/**
 * Resolves the board's state at a point on the clip's timeline.
 *
 * Passing `null` yields the static arrangement, so the still export and the
 * video's final frame come out of exactly the same code path.
 */
export function leaderboardFrameAt(
  data: LeaderboardData,
  timeSec: number | null,
): LeaderboardFrame {
  const n = data.entries.length;
  const climberIndex = n - 1;
  const staticFrame: LeaderboardFrame = {
    positions: data.entries.map((_, i) => i),
    values: data.entries.map((e) => e.value),
    climberIndex,
    climbProgress: 0,
  };
  if (timeSec == null || n < 2) return staticFrame;

  const swaps = n - 1;
  const climbSec = swaps * PER_SWAP_SEC;
  const elapsed = Math.max(0, timeSec - INTRO_SEC);
  const climbProgress = climbSec > 0 ? Math.min(elapsed / climbSec, 1) : 1;

  // Which swap we're in, and how far through it.
  const raw = Math.min(elapsed / PER_SWAP_SEC, swaps);
  const k = Math.min(Math.floor(raw), swaps - 1);
  const q = smoothstep(raw - k);

  const positions = data.entries.map((_, i) => {
    if (i === climberIndex) return climberIndex - k - q;
    // Entries the climber has already overtaken sit one slot lower.
    if (i > climberIndex - 1 - k) return i + 1;
    // The entry currently being overtaken slides down as the climber rises.
    if (i === climberIndex - 1 - k) return i + q;
    return i;
  });

  const target = climbTargetValue(data);
  const climber = data.entries[climberIndex];
  const eased = smoothstep(climbProgress);
  const values = data.entries.map((e, i) =>
    i === climberIndex ? e.value + (target - e.value) * eased : e.value,
  );

  return { positions, values, climberIndex, climbProgress };
}
