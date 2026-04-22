"use client";

import { useState } from "react";
import { ControlPanel } from "./ControlPanel";
import { LivePreview } from "./LivePreview";
import {
  DEFAULT_TRIP_DATA,
  type TemplateId,
  type ThemeId,
  type TripData,
  type Units,
} from "./types";

export function CreatorStudio() {
  const [units, setUnits] = useState<Units>("mph");
  const [templateId, setTemplateId] = useState<TemplateId>("hud-gauge");
  const [theme, setTheme] = useState<ThemeId>("cyan");
  const [data, setData] = useState<TripData>(DEFAULT_TRIP_DATA);

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
