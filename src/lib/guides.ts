export type Guide = {
  slug: string;
  title: string;
  /** Meta description and card summary. */
  description: string;
  /** ISO date of the last meaningful edit. */
  updated: string;
  readMinutes: number;
};

export const guides: Guide[] = [
  {
    slug: "what-is-a-speedometer",
    title: "What Is a Speedometer? How It Works and Why It Matters",
    description:
      "A speedometer shows how fast you're moving. Learn how mechanical, electronic, and GPS speedometers work, how they differ from odometers and tachometers, and why accuracy matters.",
    updated: "2026-10-19",
    readMinutes: 6,
  },
  {
    slug: "how-does-a-gps-speedometer-work",
    title: "How Does a GPS Speedometer Work?",
    description:
      "GPS speedometers measure speed from satellite signals, not your wheels. Here's how the Doppler effect makes your phone a surprisingly accurate speedometer — and when it isn't.",
    updated: "2026-10-19",
    readMinutes: 6,
  },
  {
    slug: "gps-vs-car-speedometer",
    title: "GPS vs Car Speedometer: Why Your Car Reads Faster Than You're Going",
    description:
      "Most car speedometers show a higher speed than you're actually traveling. Learn why, how big the difference usually is, and which one to trust.",
    updated: "2026-10-19",
    readMinutes: 5,
  },
  {
    slug: "why-use-a-speedometer-app",
    title: "Why Use a Speedometer App? 8 Practical Reasons",
    description:
      "Your car already has a speedometer, so why use an app? From checking accuracy to cycling, boating, HUD displays, and trip logs, here's what a speedometer app is good for.",
    updated: "2026-10-19",
    readMinutes: 5,
  },
  {
    slug: "how-to-check-your-speed-on-iphone",
    title: "How to Check Your Speed on iPhone (4 Easy Ways)",
    description:
      "Want to see how fast you're going on your iPhone? Here are four ways, from a free browser speedometer to a dedicated app with HUD and trip history.",
    updated: "2026-10-19",
    readMinutes: 4,
  },
  {
    slug: "hud-speedometer",
    title: "HUD Speedometer: Project Your Speed onto the Windshield with Your Phone",
    description:
      "A head-up display (HUD) shows your speed in your line of sight. Learn how to turn your phone into a windshield HUD, how to set it up, and when it works best.",
    updated: "2026-10-19",
    readMinutes: 5,
  },
  {
    slug: "how-to-measure-0-60-time",
    title: "How to Measure Your Car's 0–60 Time with Your Phone",
    description:
      "You don't need a race track or expensive equipment to time 0–60 mph. Here's how to measure acceleration safely and accurately with GPS — and what affects the result.",
    updated: "2026-10-19",
    readMinutes: 5,
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
