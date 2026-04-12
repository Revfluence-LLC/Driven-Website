import { Gauge, MapPin, History } from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Real-Time Speed",
    description:
      "Precision GPS-powered speed display with a beautiful gauge interface. Choose between MPH and KMH with customizable speed alerts.",
  },
  {
    icon: MapPin,
    title: "Auto Trip Detection",
    description:
      "Driven automatically detects when you start driving and begins recording. No buttons to press — just drive and your trips are captured.",
  },
  {
    icon: History,
    title: "Trip History",
    description:
      "Review all your past trips with detailed stats including max speed, average speed, distance, duration, and mapped routes.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-driven-bg-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for the Drive
          </h2>
          <p className="text-driven-text-secondary max-w-xl mx-auto">
            Everything you need to track, record, and review your driving — designed
            to stay out of your way while capturing every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-white/5 bg-driven-surface-low p-6 transition-all hover:border-driven-accent/20 hover:-translate-y-0.5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-driven-accent/10 p-3">
                <feature.icon className="h-6 w-6 text-driven-accent" />
              </div>
              <h3 className="text-lg font-semibold text-driven-text mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-driven-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
