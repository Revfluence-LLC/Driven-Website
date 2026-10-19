import type { ComponentType } from "react";
import WhatIsASpeedometer from "./what-is-a-speedometer";
import HowGpsWorks from "./how-does-a-gps-speedometer-work";
import GpsVsCar from "./gps-vs-car-speedometer";
import WhyUseApp from "./why-use-a-speedometer-app";
import CheckSpeedIphone from "./how-to-check-your-speed-on-iphone";
import Hud from "./hud-speedometer";
import ZeroToSixty from "./how-to-measure-0-60-time";

export const guideContent: Record<string, ComponentType> = {
  "what-is-a-speedometer": WhatIsASpeedometer,
  "how-does-a-gps-speedometer-work": HowGpsWorks,
  "gps-vs-car-speedometer": GpsVsCar,
  "why-use-a-speedometer-app": WhyUseApp,
  "how-to-check-your-speed-on-iphone": CheckSpeedIphone,
  "hud-speedometer": Hud,
  "how-to-measure-0-60-time": ZeroToSixty,
};
