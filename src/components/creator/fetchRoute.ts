"use client";

import type { LatLng } from "./types";

// OSRM public demo server — free but rate-limited; fine for a hobby creator tool,
// not for production workloads. Docs: https://project-osrm.org/docs/v5.24.0/api/
const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

export async function fetchDrivingRoute(
  start: LatLng,
  end: LatLng,
  signal?: AbortSignal,
): Promise<LatLng[] | null> {
  const url = `${OSRM_BASE}/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      code: string;
      routes?: Array<{ geometry?: { coordinates: Array<[number, number]> } }>;
    };
    if (data.code !== "Ok" || !data.routes?.length) return null;
    const coords = data.routes[0].geometry?.coordinates ?? [];
    // OSRM returns [lng, lat] — flip to [lat, lng] for Leaflet.
    return coords.map(([lng, lat]): LatLng => [lat, lng]);
  } catch (err) {
    if ((err as Error).name !== "AbortError") {
      console.warn("[creator] OSRM route fetch failed", err);
    }
    return null;
  }
}
