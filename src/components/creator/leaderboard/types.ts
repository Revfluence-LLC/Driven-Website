import { formatDistance, formatSpeed, type Units } from "../types";

export type LeaderboardMetric = "topSpeed" | "distance" | "zeroToSixty";

export type LeaderboardEntry = {
  id: string;
  name: string;
  location: string;
  // Data URL for an uploaded avatar, or null to fall back to initials.
  photo: string | null;
  // Always stored in imperial units (mph / miles / seconds) and converted for
  // display, matching how TripData stores its stats.
  value: number;
  // Highlights the row as the viewer's own placing.
  isYou: boolean;
};

export type LeaderboardFormat = "fit" | "square" | "portrait" | "story";

export type LeaderboardData = {
  title: string;
  metric: LeaderboardMetric;
  format: LeaderboardFormat;
  entries: LeaderboardEntry[];
};

export const LEADERBOARD_FORMATS: Array<{
  id: LeaderboardFormat;
  label: string;
  hint: string;
}> = [
  { id: "fit", label: "Fit", hint: "sizes to drivers" },
  { id: "square", label: "Square", hint: "1080×1080" },
  { id: "portrait", label: "Portrait", hint: "1080×1350" },
  { id: "story", label: "Story", hint: "1080×1920" },
];

export const LEADERBOARD_METRICS: Array<{
  id: LeaderboardMetric;
  label: string;
  // Whether a lower value is a better placing (0-60 times).
  lowerIsBetter: boolean;
}> = [
  { id: "topSpeed", label: "Top Speed", lowerIsBetter: false },
  { id: "distance", label: "Trip Distance", lowerIsBetter: false },
  { id: "zeroToSixty", label: "0-60 Time", lowerIsBetter: true },
];

export function metricMeta(metric: LeaderboardMetric) {
  return LEADERBOARD_METRICS.find((m) => m.id === metric)!;
}

export function metricUnit(metric: LeaderboardMetric, units: Units) {
  if (metric === "zeroToSixty") return "sec";
  if (metric === "distance") return units === "kmh" ? "km" : "mi";
  return units === "kmh" ? "km/h" : "mph";
}

// Renders a stored (imperial) value in the viewer's chosen unit system.
//
// Rounds here rather than trusting the caller: the climb animation feeds this
// fractional in-between values, and an un-rounded "152.289 mph" mid-clip looks
// broken.
export function formatMetricValue(
  value: number,
  metric: LeaderboardMetric,
  units: Units,
): string {
  if (metric === "zeroToSixty") return value.toFixed(2);
  if (metric === "distance") {
    return String(Math.round(formatDistance(value, units).value * 10) / 10);
  }
  return String(Math.round(formatSpeed(value, units).value));
}

export const MEDALS: Record<number, { color: string; glow: string }> = {
  0: { color: "#F5C518", glow: "rgba(245,197,24,0.45)" },
  1: { color: "#C8CCD4", glow: "rgba(200,204,212,0.35)" },
  2: { color: "#E0905A", glow: "rgba(224,144,90,0.40)" },
};

export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

let idCounter = 0;
export function newEntryId() {
  idCounter += 1;
  return `entry-${idCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

const SAMPLE_NAMES = [
  "Marcus Reyes",
  "Sofia Lindqvist",
  "Dev Patel",
  "Amara Okafor",
  "Kenji Nakamura",
  "Lucia Ferrari",
  "Tomas Novak",
  "Priya Raman",
  "Elias Brandt",
  "Nina Kowalski",
];

const SAMPLE_LOCATIONS = [
  "Los Angeles, CA",
  "Austin, TX",
  "Miami, FL",
  "Denver, CO",
  "Seattle, WA",
  "Chicago, IL",
  "Phoenix, AZ",
  "Boston, MA",
  "Atlanta, GA",
  "Portland, OR",
];

// Generates values that descend down the ranking (or ascend, for 0-60 times)
// so the board always reads as a plausible ordering.
export function generateValues(
  metric: LeaderboardMetric,
  count: number,
): number[] {
  const out: number[] = [];
  if (metric === "zeroToSixty") {
    let v = 3.1 + Math.random() * 0.7;
    for (let i = 0; i < count; i++) {
      out.push(+v.toFixed(2));
      v += 0.12 + Math.random() * 0.35;
    }
    return out;
  }
  if (metric === "distance") {
    let v = 480 + Math.random() * 180;
    for (let i = 0; i < count; i++) {
      out.push(Math.round(v));
      v -= 18 + Math.random() * 45;
      if (v < 20) v = 20;
    }
    return out;
  }
  let v = 152 + Math.random() * 26;
  for (let i = 0; i < count; i++) {
    out.push(Math.round(v));
    v -= 3 + Math.random() * 9;
    if (v < 40) v = 40;
  }
  return out;
}

export function makeSampleEntries(
  metric: LeaderboardMetric,
  count: number,
): LeaderboardEntry[] {
  const names = [...SAMPLE_NAMES].sort(() => Math.random() - 0.5);
  const locations = [...SAMPLE_LOCATIONS].sort(() => Math.random() - 0.5);
  const values = generateValues(metric, count);
  return Array.from({ length: count }, (_, i) => ({
    id: newEntryId(),
    name: names[i % names.length],
    location: locations[i % locations.length],
    photo: null,
    value: values[i],
    isYou: false,
  }));
}

// Re-sorts entries into a valid ranking for the active metric.
export function sortByValue(
  entries: LeaderboardEntry[],
  metric: LeaderboardMetric,
): LeaderboardEntry[] {
  const { lowerIsBetter } = metricMeta(metric);
  return [...entries].sort((a, b) =>
    lowerIsBetter ? a.value - b.value : b.value - a.value,
  );
}

export const DEFAULT_LEADERBOARD: LeaderboardData = {
  title: "Leaderboard",
  metric: "topSpeed",
  format: "fit",
  entries: [
    {
      id: "seed-1",
      name: "Marcus Reyes",
      location: "Los Angeles, CA",
      photo: null,
      value: 168,
      isYou: false,
    },
    {
      id: "seed-2",
      name: "Sofia Lindqvist",
      location: "Austin, TX",
      photo: null,
      value: 154,
      isYou: false,
    },
    {
      id: "seed-3",
      name: "Dev Patel",
      location: "Miami, FL",
      photo: null,
      value: 149,
      isYou: false,
    },
    {
      id: "seed-4",
      name: "Amara Okafor",
      location: "Denver, CO",
      photo: null,
      value: 141,
      isYou: true,
    },
    {
      id: "seed-5",
      name: "Kenji Nakamura",
      location: "Seattle, WA",
      photo: null,
      value: 133,
      isYou: false,
    },
    {
      id: "seed-6",
      name: "Lucia Ferrari",
      location: "Chicago, IL",
      photo: null,
      value: 127,
      isYou: false,
    },
  ],
};

export const MAX_ENTRIES = 12;
export const MIN_ENTRIES = 2;

// Uploaded avatars are downscaled before being stored as data URLs. Full-size
// photos would bloat the DOM and slow every html-to-image snapshot.
export const AVATAR_SIZE = 256;

export function readImageAsAvatar(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that image"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That file isn't a valid image"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = AVATAR_SIZE;
        canvas.height = AVATAR_SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not process that image"));
        // Center-crop to a square so avatars never distort.
        const side = Math.min(img.width, img.height);
        ctx.drawImage(
          img,
          (img.width - side) / 2,
          (img.height - side) / 2,
          side,
          side,
          0,
          0,
          AVATAR_SIZE,
          AVATAR_SIZE,
        );
        resolve(canvas.toDataURL("image/jpeg", 0.88));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
