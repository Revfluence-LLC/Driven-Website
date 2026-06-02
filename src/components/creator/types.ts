export type Units = "mph" | "kmh";

export type TemplateId =
  | "hud-gauge"
  | "trip-stats"
  | "zero-to-sixty"
  | "zero-to-sixty-badge"
  | "story-stack"
  | "featured-stat-video"
  | "zero-to-sixty-video"
  | "route-map-route"
  | "route-map-stats";

export type ThemeId = "cyan" | "green" | "amber" | "violet" | "crimson";

export type LatLng = [number, number]; // [lat, lng]

export type TripData = {
  tripName: string;
  topSpeed: number;
  avgSpeed: number;
  distance: number;
  durationMin: number;
  zeroToSixtySec: number;
  rank: string;
  achievement: string;
  statLabel: string;
  statValue: string;
  startLocation: string;
  endLocation: string;
  startRegion: string;
  endRegion: string;
  expectedMin: number;
  actualMin: number;
  routeSeed: number;
  startCoord: LatLng;
  endCoord: LatLng;
  routeGeometry: LatLng[] | null;
  // Per-chunk speeds in mph when a heatmap is active; null for a flat accent line.
  routeSpeeds: number[] | null;
};

export const HEATMAP_CHUNKS = 20;

// Classic traffic-map palette — kept independent of the theme accent so the
// heatmap stays legible across color themes.
export function speedColor(speed: number): string {
  if (speed >= 75) return "#00E5FF";
  if (speed >= 55) return "#79FF5B";
  if (speed >= 40) return "#FFC847";
  if (speed >= 25) return "#FF9947";
  return "#FF3355";
}

export const HEATMAP_LEGEND: Array<{ label: string; color: string }> = [
  { label: "< 25 mph", color: "#FF3355" },
  { label: "25–40", color: "#FF9947" },
  { label: "40–55", color: "#FFC847" },
  { label: "55–75", color: "#79FF5B" },
  { label: "75+", color: "#00E5FF" },
];

// Smoothed random walk: gives natural-looking speed variation across the route.
export function generateRandomSpeeds(n: number): number[] {
  const out: number[] = [];
  let s = 55 + (Math.random() - 0.5) * 30;
  for (let i = 0; i < n; i++) {
    s += (Math.random() - 0.5) * 18;
    if (s < 15) s = 15;
    if (s > 90) s = 90;
    out.push(Math.round(s));
  }
  return out;
}

export type TemplateProps = {
  data: TripData;
  units: Units;
  theme: ThemeId;
  frozen?: boolean;
};

export type ThemePalette = {
  id: ThemeId;
  label: string;
  accent: string;
  accentLight: string;
  bg: string;
  bgDeep: string;
  surface: string;
  swatchRing: string;
};

export const THEMES: Record<ThemeId, ThemePalette> = {
  cyan: {
    id: "cyan",
    label: "Cyan",
    accent: "#00E5FF",
    accentLight: "#C3F5FF",
    bg: "#10141A",
    bgDeep: "#0A0E14",
    surface: "#181C22",
    swatchRing: "rgba(0,229,255,0.9)",
  },
  green: {
    id: "green",
    label: "Neon",
    accent: "#79FF5B",
    accentLight: "#D5FFC5",
    bg: "#0B1410",
    bgDeep: "#060A07",
    surface: "#141C17",
    swatchRing: "rgba(121,255,91,0.9)",
  },
  amber: {
    id: "amber",
    label: "Amber",
    accent: "#FFB547",
    accentLight: "#FFE0B0",
    bg: "#141009",
    bgDeep: "#0A0805",
    surface: "#1C1811",
    swatchRing: "rgba(255,181,71,0.9)",
  },
  violet: {
    id: "violet",
    label: "Violet",
    accent: "#C084FC",
    accentLight: "#E9D5FF",
    bg: "#0F0B18",
    bgDeep: "#07050E",
    surface: "#17121F",
    swatchRing: "rgba(192,132,252,0.9)",
  },
  crimson: {
    id: "crimson",
    label: "Crimson",
    accent: "#FF5277",
    accentLight: "#FFC2D0",
    bg: "#140A0F",
    bgDeep: "#0A0508",
    surface: "#1C1016",
    swatchRing: "rgba(255,82,119,0.9)",
  },
};

export type TemplateMeta = {
  id: TemplateId;
  label: string;
  description: string;
  aspect: "square" | "story" | "landscape";
};

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "hud-gauge",
    label: "HUD Gauge",
    description: "Full gauge, top speed hero",
    aspect: "square",
  },
  {
    id: "trip-stats",
    label: "Trip Stats",
    description: "2×2 stat grid with rank",
    aspect: "square",
  },
  {
    id: "zero-to-sixty",
    label: "0-60",
    description: "Acceleration hero card",
    aspect: "square",
  },
  {
    id: "zero-to-sixty-badge",
    label: "0-60 Badge",
    description: "Wide badge to drop on a photo",
    aspect: "landscape",
  },
  {
    id: "featured-stat-video",
    label: "Featured Stat (Video)",
    description: "Cinematic card with video UI",
    aspect: "square",
  },
  {
    id: "zero-to-sixty-video",
    label: "0-60 (Video)",
    description: "Stopwatch with video chrome",
    aspect: "square",
  },
  {
    id: "route-map-route",
    label: "Route Map · Page 1",
    description: "Route + travel time comparison",
    aspect: "square",
  },
  {
    id: "route-map-stats",
    label: "Route Map · Page 2",
    description: "Trip stats companion page",
    aspect: "square",
  },
  {
    id: "story-stack",
    label: "Story Stack",
    description: "Vertical 9:16 for stories",
    aspect: "story",
  },
];

export const CANVAS_DIMENSIONS = {
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
  landscape: { width: 1350, height: 1080 },
} as const;

export const DEFAULT_TRIP_DATA: TripData = {
  tripName: "Sunday Canyon Run",
  topSpeed: 127,
  avgSpeed: 58,
  distance: 119,
  durationMin: 57,
  zeroToSixtySec: 4.2,
  rank: "2nd",
  achievement: "Fastest in U.S. today",
  statLabel: "Top Speed",
  statValue: "127 mph",
  startLocation: "Los Angeles",
  endLocation: "Las Vegas",
  startRegion: "California",
  endRegion: "Nevada",
  expectedMin: 261,
  actualMin: 205,
  routeSeed: 7,
  startCoord: [34.0522, -118.2437],
  endCoord: [36.1699, -115.1398],
  routeGeometry: null,
  routeSpeeds: null,
};

export type RoutePreset = {
  start: string;
  end: string;
  startRegion: string;
  endRegion: string;
  expectedMin: number;
  actualMin: number;
  startCoord: LatLng;
  endCoord: LatLng;
};

export const ROUTE_PRESETS: RoutePreset[] = [
  {
    start: "Los Angeles",
    end: "Las Vegas",
    startRegion: "California",
    endRegion: "Nevada",
    expectedMin: 261,
    actualMin: 205,
    startCoord: [34.0522, -118.2437],
    endCoord: [36.1699, -115.1398],
  },
  {
    start: "San Francisco",
    end: "Lake Tahoe",
    startRegion: "California",
    endRegion: "California",
    expectedMin: 218,
    actualMin: 174,
    startCoord: [37.7749, -122.4194],
    endCoord: [39.0968, -120.0324],
  },
  {
    start: "New York",
    end: "Boston",
    startRegion: "New York",
    endRegion: "Massachusetts",
    expectedMin: 229,
    actualMin: 182,
    startCoord: [40.7128, -74.006],
    endCoord: [42.3601, -71.0589],
  },
  {
    start: "Miami",
    end: "Orlando",
    startRegion: "Florida",
    endRegion: "Florida",
    expectedMin: 213,
    actualMin: 168,
    startCoord: [25.7617, -80.1918],
    endCoord: [28.5383, -81.3792],
  },
  {
    start: "Seattle",
    end: "Portland",
    startRegion: "Washington",
    endRegion: "Oregon",
    expectedMin: 178,
    actualMin: 142,
    startCoord: [47.6062, -122.3321],
    endCoord: [45.5152, -122.6784],
  },
  {
    start: "Chicago",
    end: "Milwaukee",
    startRegion: "Illinois",
    endRegion: "Wisconsin",
    expectedMin: 92,
    actualMin: 76,
    startCoord: [41.8781, -87.6298],
    endCoord: [43.0389, -87.9065],
  },
  {
    start: "Austin",
    end: "Dallas",
    startRegion: "Texas",
    endRegion: "Texas",
    expectedMin: 195,
    actualMin: 156,
    startCoord: [30.2672, -97.7431],
    endCoord: [32.7767, -96.797],
  },
  {
    start: "Denver",
    end: "Aspen",
    startRegion: "Colorado",
    endRegion: "Colorado",
    expectedMin: 236,
    actualMin: 198,
    startCoord: [39.7392, -104.9903],
    endCoord: [39.1911, -106.8175],
  },
  {
    start: "Phoenix",
    end: "San Diego",
    startRegion: "Arizona",
    endRegion: "California",
    expectedMin: 359,
    actualMin: 294,
    startCoord: [33.4484, -112.074],
    endCoord: [32.7157, -117.1611],
  },
  {
    start: "London",
    end: "Brighton",
    startRegion: "United Kingdom",
    endRegion: "United Kingdom",
    expectedMin: 105,
    actualMin: 82,
    startCoord: [51.5074, -0.1278],
    endCoord: [50.8225, -0.1372],
  },
];

export function formatSpeed(value: number, units: Units) {
  const converted = units === "kmh" ? Math.round(value * 1.60934) : value;
  return { value: converted, unit: units === "kmh" ? "km/h" : "mph" };
}

export function formatDistance(value: number, units: Units) {
  const converted = units === "kmh" ? +(value * 1.60934).toFixed(1) : value;
  return { value: converted, unit: units === "kmh" ? "km" : "mi" };
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m`;
  return `${m}m`;
}
