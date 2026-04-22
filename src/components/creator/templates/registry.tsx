import type { TemplateId, TemplateProps } from "../types";
import { HudGaugeTemplate } from "./HudGaugeTemplate";
import { TripStatsTemplate } from "./TripStatsTemplate";
import { ZeroToSixtyTemplate } from "./ZeroToSixtyTemplate";
import { StoryStackTemplate } from "./StoryStackTemplate";
import { FeaturedStatVideoTemplate } from "./FeaturedStatVideoTemplate";
import { ZeroToSixtyVideoTemplate } from "./ZeroToSixtyVideoTemplate";
import { RouteMapRouteTemplate } from "./RouteMapRouteTemplate";
import { RouteMapStatsTemplate } from "./RouteMapStatsTemplate";

const COMPONENTS: Record<TemplateId, (props: TemplateProps) => React.ReactNode> =
  {
    "hud-gauge": HudGaugeTemplate,
    "trip-stats": TripStatsTemplate,
    "zero-to-sixty": ZeroToSixtyTemplate,
    "story-stack": StoryStackTemplate,
    "featured-stat-video": FeaturedStatVideoTemplate,
    "zero-to-sixty-video": ZeroToSixtyVideoTemplate,
    "route-map-route": RouteMapRouteTemplate,
    "route-map-stats": RouteMapStatsTemplate,
  };

export function RenderTemplate({
  id,
  ...props
}: TemplateProps & { id: TemplateId }) {
  const Component = COMPONENTS[id];
  return <Component {...props} />;
}
