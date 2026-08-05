"use client";

import { useEffect, useState } from "react";

export type VideoClock = {
  elapsed: number;
  progress: number;
  timecode: string;
};

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Drives a template's animation. Normally free-runs off requestAnimationFrame,
// but when `timeSec` is supplied the clock is fully controlled by the caller —
// that's how the MP4 exporter renders one deterministic frame at a time.
export function useVideoClock(
  duration: number,
  frozen: boolean | undefined,
  timeSec?: number,
): VideoClock {
  const controlled = timeSec != null;
  const [elapsed, setElapsed] = useState(frozen ? duration : 0);

  useEffect(() => {
    if (controlled) return;
    if (frozen) {
      setElapsed(duration);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) / 1000) % duration;
      setElapsed(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [controlled, frozen, duration]);

  const current = controlled
    ? Math.max(0, Math.min(timeSec, duration))
    : elapsed;
  const progress = Math.min(current / duration, 1);
  return {
    elapsed: current,
    progress,
    timecode: `${fmt(current)} / ${fmt(duration)}`,
  };
}

// Ease a 0..1 value so number counters rise quickly then settle.
export function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

// Animate from 0..final respecting the number of decimal places in `finalStr`.
export function animateNumberLike(
  progress: number,
  finalStr: string,
): string {
  const match = finalStr.match(/^([+-]?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return finalStr;
  const finalNum = parseFloat(match[1]);
  const suffix = match[2];
  const eased = easeOutCubic(Math.min(progress, 1));
  const current = finalNum * eased;
  const decimals = (match[1].split(".")[1] || "").length;
  return `${current.toFixed(decimals)}${suffix}`;
}
