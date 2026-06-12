"use client";

import { useState } from "react";
import { fetchDrivingRoute } from "./fetchRoute";
import { LocationAutocomplete } from "./LocationAutocomplete";
import {
  CANVAS_DIMENSIONS,
  HEATMAP_CHUNKS,
  ROUTE_PRESETS,
  TEMPLATES,
  THEMES,
  generateRandomSpeeds,
  type LatLng,
  type TemplateId,
  type ThemeId,
  type TripData,
  type Units,
} from "./types";

type Props = {
  units: Units;
  templateId: TemplateId;
  theme: ThemeId;
  ctaMode: boolean;
  data: TripData;
  onUnitsChange: (u: Units) => void;
  onTemplateChange: (t: TemplateId) => void;
  onThemeChange: (t: ThemeId) => void;
  onCtaModeChange: (v: boolean) => void;
  onDataChange: (d: TripData) => void;
};

const TEMPLATE_FIELDS: Record<TemplateId, ReadonlyArray<keyof TripData | "route-actions">> = {
  "hud-gauge": ["tripName", "topSpeed", "avgSpeed", "rank", "achievement"],
  "trip-stats": [
    "tripName",
    "distance",
    "durationMin",
    "avgSpeed",
    "topSpeed",
    "rank",
    "achievement",
  ],
  "zero-to-sixty": [
    "tripName",
    "zeroToSixtySec",
    "rank",
    "achievement",
  ],
  "zero-to-sixty-badge": [
    "zeroToSixtySec",
    "rank",
    "achievement",
  ],
  "story-stack": [
    "tripName",
    "distance",
    "durationMin",
    "avgSpeed",
    "topSpeed",
    "zeroToSixtySec",
    "rank",
    "achievement",
  ],
  "featured-stat-video": [
    "tripName",
    "statLabel",
    "statValue",
    "rank",
    "achievement",
  ],
  "zero-to-sixty-video": [
    "tripName",
    "zeroToSixtySec",
    "rank",
    "achievement",
  ],
  "route-map-route": [
    "startLocation",
    "endLocation",
    "expectedMin",
    "actualMin",
    "route-actions",
  ],
  "route-map-stats": [
    "startLocation",
    "endLocation",
    "distance",
    "avgSpeed",
    "topSpeed",
    "rank",
    "achievement",
  ],
};

export function ControlPanel({
  units,
  templateId,
  theme,
  ctaMode,
  data,
  onUnitsChange,
  onTemplateChange,
  onThemeChange,
  onCtaModeChange,
  onDataChange,
}: Props) {
  const update = <K extends keyof TripData>(key: K, value: TripData[K]) =>
    onDataChange({ ...data, [key]: value });

  const fields = TEMPLATE_FIELDS[templateId];
  const has = (key: keyof TripData | "route-actions") => fields.includes(key);

  const [routing, setRouting] = useState(false);

  const randomRoute = () => {
    const preset =
      ROUTE_PRESETS[Math.floor(Math.random() * ROUTE_PRESETS.length)];
    // Auto-routing effect in CreatorStudio will pick up the coord change.
    onDataChange({
      ...data,
      startLocation: preset.start,
      endLocation: preset.end,
      startRegion: preset.startRegion,
      endRegion: preset.endRegion,
      expectedMin: preset.expectedMin,
      actualMin: preset.actualMin,
      startCoord: preset.startCoord,
      endCoord: preset.endCoord,
      routeGeometry: null,
      routeSpeeds: null,
      routeSeed: Math.floor(Math.random() * 1_000_000),
    });
  };

  const refetchRoute = async () => {
    setRouting(true);
    const geometry = await fetchDrivingRoute(data.startCoord, data.endCoord);
    setRouting(false);
    if (geometry) onDataChange({ ...data, routeGeometry: geometry });
  };

  const randomHeatmap = () => {
    onDataChange({ ...data, routeSpeeds: generateRandomSpeeds(HEATMAP_CHUNKS) });
  };

  const clearHeatmap = () => {
    onDataChange({ ...data, routeSpeeds: null });
  };

  const pickStart = (name: string, region: string, coord: LatLng) =>
    onDataChange({
      ...data,
      startLocation: name,
      startRegion: region,
      startCoord: coord,
      routeGeometry: null,
      routeSpeeds: null,
    });

  const pickEnd = (name: string, region: string, coord: LatLng) =>
    onDataChange({
      ...data,
      endLocation: name,
      endRegion: region,
      endCoord: coord,
      routeGeometry: null,
      routeSpeeds: null,
    });

  const unitSpeed = units === "kmh" ? "km/h" : "mph";
  const unitDist = units === "kmh" ? "km" : "mi";

  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Creator Studio</h1>
        <p className="text-sm text-driven-text-secondary mt-1">
          Live preview · Edit anything
        </p>
      </div>

      <Section label="Unit System">
        <div className="grid grid-cols-2 gap-2">
          <ToggleButton
            active={units === "mph"}
            onClick={() => onUnitsChange("mph")}
          >
            mph
          </ToggleButton>
          <ToggleButton
            active={units === "kmh"}
            onClick={() => onUnitsChange("kmh")}
          >
            km/h
          </ToggleButton>
        </div>
      </Section>

      <Section label="Template">
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              className={`rounded-lg border p-3 text-left transition-all ${
                templateId === t.id
                  ? "border-driven-accent bg-driven-accent/10"
                  : "border-white/10 bg-driven-surface-low hover:border-driven-accent/30"
              }`}
            >
              <div className="text-sm font-semibold text-driven-text">
                {t.label}
              </div>
              <div className="text-xs text-driven-text-secondary mt-0.5">
                {t.description}
              </div>
              <div className="mt-2 text-[10px] font-mono tracking-[2px] text-driven-outline uppercase">
                {CANVAS_DIMENSIONS[t.aspect].width}×
                {CANVAS_DIMENSIONS[t.aspect].height}
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section label="Color Theme">
        <div className="flex gap-2">
          {Object.values(THEMES).map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              aria-label={t.label}
              title={t.label}
              className={`h-10 w-10 rounded-full border-2 transition-all ${
                theme === t.id
                  ? "scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{
                background: `linear-gradient(135deg, ${t.accent} 0%, ${t.bgDeep} 100%)`,
                borderColor: theme === t.id ? t.accent : "transparent",
                boxShadow:
                  theme === t.id ? `0 0 14px ${t.accent}80` : undefined,
              }}
            />
          ))}
        </div>
      </Section>

      <Section label="Branding">
        <div className="grid grid-cols-2 gap-2">
          <ToggleButton
            active={!ctaMode}
            onClick={() => onCtaModeChange(false)}
          >
            Standard
          </ToggleButton>
          <ToggleButton
            active={ctaMode}
            onClick={() => onCtaModeChange(true)}
          >
            App Store CTA
          </ToggleButton>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-driven-outline">
          CTA mode renders a bigger DRIVEN wordmark with “Available on the App
          Store” beneath it.
        </p>
      </Section>

      <Section label="Trip Data">
        <div className="space-y-3">
          {has("route-actions") && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={randomRoute}
                  disabled={routing}
                  className="rounded-md border border-driven-accent/40 bg-driven-accent/10 px-3 py-2 text-xs font-mono tracking-[2px] uppercase text-driven-accent hover:bg-driven-accent/20 transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                  🎲 Random Route
                </button>
                <button
                  onClick={refetchRoute}
                  disabled={routing}
                  className="rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-xs font-mono tracking-[2px] uppercase text-driven-text-secondary hover:text-driven-accent hover:border-driven-accent/30 transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                  {routing ? "Routing…" : "↻ Re-fetch Route"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={randomHeatmap}
                  disabled={!data.routeGeometry}
                  className="rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-xs font-mono tracking-[2px] uppercase text-driven-text-secondary hover:text-driven-accent hover:border-driven-accent/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  🔥 Random Heatmap
                </button>
                <button
                  onClick={clearHeatmap}
                  disabled={!data.routeSpeeds}
                  className="rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-xs font-mono tracking-[2px] uppercase text-driven-text-secondary hover:text-driven-accent hover:border-driven-accent/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ⌫ Clear Heatmap
                </button>
              </div>
            </div>
          )}

          {has("tripName") && (
            <Field
              label="Trip Name"
              value={data.tripName}
              onChange={(v) => update("tripName", v)}
            />
          )}

          {(has("startLocation") || has("endLocation")) && (
            <div className="space-y-3">
              {has("startLocation") && (
                <LocationAutocomplete
                  label="Start Location"
                  value={data.startLocation}
                  onSelect={pickStart}
                />
              )}
              {has("endLocation") && (
                <LocationAutocomplete
                  label="End Location"
                  value={data.endLocation}
                  onSelect={pickEnd}
                />
              )}
            </div>
          )}

          {(has("expectedMin") || has("actualMin")) && (
            <div className="grid grid-cols-2 gap-3">
              {has("expectedMin") && (
                <NumberField
                  label="Expected Time (min)"
                  value={data.expectedMin}
                  onChange={(v) => update("expectedMin", v)}
                />
              )}
              {has("actualMin") && (
                <NumberField
                  label="Actual Time (min)"
                  value={data.actualMin}
                  onChange={(v) => update("actualMin", v)}
                />
              )}
            </div>
          )}

          {(has("statLabel") || has("statValue")) && (
            <div className="space-y-3">
              {has("statLabel") && (
                <Field
                  label="Stat Label"
                  value={data.statLabel}
                  onChange={(v) => update("statLabel", v)}
                />
              )}
              {has("statValue") && (
                <Field
                  label="Stat Value"
                  value={data.statValue}
                  onChange={(v) => update("statValue", v)}
                />
              )}
            </div>
          )}

          {(has("topSpeed") || has("avgSpeed")) && (
            <div className="grid grid-cols-2 gap-3">
              {has("topSpeed") && (
                <NumberField
                  label={`Top Speed (${unitSpeed})`}
                  value={data.topSpeed}
                  onChange={(v) => update("topSpeed", v)}
                />
              )}
              {has("avgSpeed") && (
                <NumberField
                  label={`Avg Speed (${unitSpeed})`}
                  value={data.avgSpeed}
                  onChange={(v) => update("avgSpeed", v)}
                />
              )}
            </div>
          )}

          {(has("distance") || has("durationMin")) && (
            <div className="grid grid-cols-2 gap-3">
              {has("distance") && (
                <NumberField
                  label={`Distance (${unitDist})`}
                  value={data.distance}
                  onChange={(v) => update("distance", v)}
                />
              )}
              {has("durationMin") && (
                <NumberField
                  label="Duration (min)"
                  value={data.durationMin}
                  onChange={(v) => update("durationMin", v)}
                />
              )}
            </div>
          )}

          {has("zeroToSixtySec") && (
            <NumberField
              label={`0–${units === "kmh" ? "100 km/h" : "60 mph"} (seconds)`}
              value={data.zeroToSixtySec}
              onChange={(v) => update("zeroToSixtySec", v)}
              step={0.01}
            />
          )}

          {(has("rank") || has("achievement")) && (
            <div className="grid grid-cols-2 gap-3">
              {has("rank") && (
                <Field
                  label="Rank"
                  value={data.rank}
                  onChange={(v) => update("rank", v)}
                />
              )}
              {has("achievement") && (
                <Field
                  label="Achievement"
                  value={data.achievement}
                  onChange={(v) => update("achievement", v)}
                />
              )}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-mono tracking-[3px] text-driven-text-secondary uppercase mb-3">
        {label}
      </h3>
      {children}
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border py-2.5 text-sm font-semibold transition-all ${
        active
          ? "border-driven-accent bg-driven-accent/10 text-driven-accent"
          : "border-white/10 bg-driven-surface-low text-driven-text-secondary hover:border-driven-accent/30 hover:text-driven-text"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono tracking-[2px] text-driven-outline uppercase mb-1.5">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-sm text-driven-text outline-none focus:border-driven-accent/60 focus:bg-driven-surface"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono tracking-[2px] text-driven-outline uppercase mb-1.5">
        {label}
      </span>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (!Number.isNaN(next)) onChange(next);
        }}
        className="w-full rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-sm font-mono text-driven-text outline-none focus:border-driven-accent/60 focus:bg-driven-surface tabular-nums"
      />
    </label>
  );
}
