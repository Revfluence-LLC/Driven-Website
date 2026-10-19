import Link from "next/link";
import { Gauge, ArrowLeftRight, ArrowRight } from "lucide-react";

const tools = [
  {
    href: "/speedometer",
    icon: Gauge,
    title: "Online Speedometer",
    body: "Check your current speed in your phone's browser. MPH, km/h, or knots, with max speed, distance, speed alert, and HUD mode.",
    cta: "Open speedometer",
  },
  {
    href: "/speed-converter",
    icon: ArrowLeftRight,
    title: "Speed Converter",
    body: "Convert mph, km/h, knots, m/s, and ft/s instantly, with handy mph ↔ km/h charts.",
    cta: "Convert speeds",
  },
];

export function FreeToolsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-mono tracking-[3px] text-driven-accent uppercase mb-3">Free · No download</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Free speed tools</h2>
          <p className="text-driven-text-secondary max-w-xl mx-auto">Use them right here in your browser, on any phone.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group rounded-2xl border border-white/10 bg-driven-surface-low p-8 transition-all hover:border-driven-accent/40 hover:-translate-y-0.5"
            >
              <t.icon className="h-10 w-10 text-driven-accent mb-5" />
              <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
              <p className="text-driven-text-secondary mb-6">{t.body}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-driven-accent">
                {t.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
