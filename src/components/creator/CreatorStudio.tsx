"use client";

import { useEffect, useState } from "react";
import { LayoutTemplate, Trophy } from "lucide-react";
import { ControlPanel } from "./ControlPanel";
import { LivePreview } from "./LivePreview";
import { fetchDrivingRoute } from "./fetchRoute";
import { LeaderboardStudio } from "./leaderboard/LeaderboardStudio";
import {
  DEFAULT_LEADERBOARD,
  type LeaderboardData,
} from "./leaderboard/types";
import {
  DEFAULT_TRIP_DATA,
  type TemplateId,
  type ThemeId,
  type TripData,
  type Units,
} from "./types";

const ROUTE_TEMPLATES: TemplateId[] = ["route-map-route", "route-map-stats"];

type View = "cards" | "leaderboard";

export function CreatorStudio() {
  const [view, setView] = useState<View>("cards");
  const [units, setUnits] = useState<Units>("mph");
  const [templateId, setTemplateId] = useState<TemplateId>("hud-gauge");
  const [theme, setTheme] = useState<ThemeId>("cyan");
  const [ctaMode, setCtaMode] = useState(false);
  const [data, setData] = useState<TripData>(DEFAULT_TRIP_DATA);
  // Held here rather than inside LeaderboardStudio so edits survive tab
  // switches. Units/theme/branding are deliberately shared across both views.
  const [leaderboard, setLeaderboard] =
    useState<LeaderboardData>(DEFAULT_LEADERBOARD);

  // Re-fetch the real driving route whenever start/end coords change while a
  // route template is active. When the user picks a new city, we clear
  // routeGeometry so this effect fires; it then writes the new geometry back.
  useEffect(() => {
    if (view !== "cards") return;
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
  }, [view, templateId, data.routeGeometry, data.startCoord, data.endCoord]);

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-white/5 bg-driven-bg px-4">
        <ViewTab
          active={view === "cards"}
          onClick={() => setView("cards")}
          icon={<LayoutTemplate className="h-4 w-4" />}
          label="Cards"
        />
        <ViewTab
          active={view === "leaderboard"}
          onClick={() => setView("leaderboard")}
          icon={<Trophy className="h-4 w-4" />}
          label="Leaderboard"
        />
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] lg:h-[calc(100vh-7.5rem)]">
          <aside className="lg:h-full lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/5 bg-driven-bg">
            <ControlPanel
              units={units}
              templateId={templateId}
              theme={theme}
              ctaMode={ctaMode}
              data={data}
              onUnitsChange={setUnits}
              onTemplateChange={setTemplateId}
              onThemeChange={setTheme}
              onCtaModeChange={setCtaMode}
              onDataChange={setData}
            />
          </aside>

          <section className="min-h-[70vh] lg:min-h-0 lg:h-full">
            <LivePreview
              templateId={templateId}
              data={data}
              units={units}
              theme={theme}
              ctaMode={ctaMode}
              ready={
                !ROUTE_TEMPLATES.includes(templateId) || !!data.routeGeometry
              }
            />
          </section>
        </div>
      ) : (
        <LeaderboardStudio
          data={leaderboard}
          units={units}
          theme={theme}
          ctaMode={ctaMode}
          onDataChange={setLeaderboard}
          onUnitsChange={setUnits}
          onThemeChange={setTheme}
          onCtaModeChange={setCtaMode}
        />
      )}
    </div>
  );
}

function ViewTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
        active
          ? "border-driven-accent text-driven-accent"
          : "border-transparent text-driven-text-secondary hover:text-driven-text"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
