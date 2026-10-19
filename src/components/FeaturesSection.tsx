import { Gauge, MapPin, History, MonitorSmartphone, BellRing, Timer, Bike, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Accurate GPS speedometer",
    description:
      "Big, glanceable speed in MPH, km/h, or knots. Switch between a clean digital readout and a classic analog needle dial.",
  },
  {
    icon: MapPin,
    title: "Automatic trip recording",
    description:
      "Trips start and stop on their own, even with the app closed. Every drive is saved with its route, distance, and time.",
  },
  {
    icon: History,
    title: "Trip history & stats",
    description:
      "Review max and average speed, a speed-over-time chart, and the mapped route for every trip. Filter trips and share trip cards.",
  },
  {
    icon: MonitorSmartphone,
    title: "Windshield HUD",
    description:
      "Mirrored head-up display: lay your iPhone on the dashboard at night and your speed reflects in the windshield.",
  },
  {
    icon: BellRing,
    title: "Speed alerts",
    description:
      "Set your own limit and get a vibration or voice alert when you go over it. The display turns red so you notice instantly.",
  },
  {
    icon: Timer,
    title: "0–60 timer",
    description:
      "Time 0–30 mph, 0–60 mph, and 0–100 km/h with GPS precision, and keep your personal bests.",
  },
  {
    icon: Bike,
    title: "Drive, ride, walk, or sail",
    description:
      "Driving, cycling, on-foot, and boating modes tune the scale and units to how you're moving. Plus a lifetime odometer.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description:
      "No account and no sign-up. Your trips and routes are stored only on your iPhone — never uploaded.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-driven-bg-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything a speedometer app should be</h2>
          <p className="text-driven-text-secondary max-w-2xl mx-auto">
            Speedometer: Speed Monitor turns your iPhone into a precise speedometer, trip logger, and HUD — designed
            to stay out of your way while capturing every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-white/5 bg-driven-surface-low p-6 transition-all hover:border-driven-accent/20 hover:-translate-y-0.5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-driven-accent/10 p-3">
                <feature.icon className="h-6 w-6 text-driven-accent" />
              </div>
              <h3 className="text-lg font-semibold text-driven-text mb-2">{feature.title}</h3>
              <p className="text-sm text-driven-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
