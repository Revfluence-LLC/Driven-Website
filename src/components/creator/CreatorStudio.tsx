"use client";

import { useEffect, useState } from "react";
import { ControlPanel } from "./ControlPanel";
import { LivePreview } from "./LivePreview";
import { fetchDrivingRoute } from "./fetchRoute";
import {
  DEFAULT_TRIP_DATA,
  type TemplateId,
  type ThemeId,
  type TripData,
  type Units,
} from "./types";

const ROUTE_TEMPLATES: TemplateId[] = ["route-map-route", "route-map-stats"];

export function CreatorStudio() {
  const [units, setUnits] = useState<Units>("mph");
  const [templateId, setTemplateId] = useState<TemplateId>("hud-gauge");
  const [theme, setTheme] = useState<ThemeId>("cyan");
  const [data, setData] = useState<TripData>(DEFAULT_TRIP_DATA);

  // Re-fetch the real driving route whenever start/end coords change while a
  // route template is active. When the user picks a new city, we clear
  // routeGeometry so this effect fires; it then writes the new geometry back.
  useEffect(() => {
    if (!ROUTE_TEMPLATES.includes(templateId) || data.routeGeometry) return;
    const controller = new AbortController();
    fetchDrivingRoute(data.startCoord, data.endCoord, controller.signal).then(
      (geometry) => {
        if (!geometry) return;
        setData((prev) =>
          prev.startCoord === data.startCoord && prev.endCoord === data.endCoord
            ? { ...prev, routeGeometry: geometry }
            : prev,
        );
      },
    );
    return () => controller.abort();
  }, [templateId, data.routeGeometry, data.startCoord, data.endCoord]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] lg:h-[calc(100vh-4rem)]">
      <aside className="lg:h-full lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/5 bg-driven-bg">
        <ControlPanel
          units={units}
          templateId={templateId}
          theme={theme}
          data={data}
          onUnitsChange={setUnits}
          onTemplateChange={setTemplateId}
          onThemeChange={setTheme}
          onDataChange={setData}
        />
      </aside>

      <section className="min-h-[70vh] lg:min-h-0 lg:h-full">
        <LivePreview
          templateId={templateId}
          data={data}
          units={units}
          theme={theme}
        />
      </section>
    </div>
  );
}
