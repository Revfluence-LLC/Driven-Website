"use client";

import type { LatLng } from "./types";

// Photon (by Komoot) — free, no API key, built for typeahead.
// https://photon.komoot.io/
const PHOTON_BASE = "https://photon.komoot.io/api/";

export type LocationSuggestion = {
  name: string;
  region: string;
  secondary: string;
  coord: LatLng;
};

export async function searchLocations(
  query: string,
  signal?: AbortSignal,
): Promise<LocationSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];
  const url = `${PHOTON_BASE}?q=${encodeURIComponent(trimmed)}&limit=6`;
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      features?: Array<{
        geometry?: { coordinates?: [number, number] };
        properties?: {
          name?: string;
          city?: string;
          state?: string;
          country?: string;
          countrycode?: string;
          type?: string;
        };
      }>;
    };
    const out: LocationSuggestion[] = [];
    for (const f of data.features ?? []) {
      const coord = f.geometry?.coordinates;
      const p = f.properties ?? {};
      if (!coord || coord.length !== 2) continue;
      // Photon returns [lng, lat] — flip to [lat, lng] for Leaflet.
      const latlng: LatLng = [coord[1], coord[0]];
      const primary = p.name || p.city || "";
      if (!primary) continue;
      // Prefer the state for US locations (more recognizable), otherwise country.
      const region =
        p.countrycode === "US" ? p.state ?? p.country ?? "" : p.country ?? p.state ?? "";
      const secondaryParts = [
        p.city && p.city !== primary ? p.city : null,
        p.state,
        p.country,
      ].filter(Boolean);
      out.push({
        name: primary,
        region,
        secondary: secondaryParts.join(", "),
        coord: latlng,
      });
    }
    return out;
  } catch (err) {
    if ((err as Error).name !== "AbortError") {
      console.warn("[creator] Photon geocode failed", err);
    }
    return [];
  }
}
