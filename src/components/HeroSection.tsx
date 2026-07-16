import { SpeedGauge } from "./SpeedGauge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient — decorative only; must not intercept clicks */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-driven-accent/30 bg-driven-accent/5 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-driven-green animate-pulse" />
              <span className="text-xs font-mono tracking-[2px] text-driven-accent uppercase">
                iOS Speed Tracker
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Track Your Speed
              <br />
              <span className="text-driven-accent">With Precision</span>
            </h1>

            <p className="text-lg text-driven-text-secondary max-w-lg mx-auto lg:mx-0 mb-8">
              Real-time GPS speed tracking, automatic trip recording, and detailed
              driving history — all in a beautiful, distraction-free interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://apps.apple.com/us/app/driven-speed-tracker/id6762046780"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-driven-accent px-6 py-3 text-sm font-bold uppercase tracking-[2px] text-driven-bg-deep transition-all hover:scale-105 glow-accent"
              >
                Download on App Store
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-driven-text transition-all hover:border-driven-accent/40 hover:text-driven-accent"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Gauge */}
          <div className="flex-shrink-0">
            <SpeedGauge />
          </div>
        </div>
      </div>
    </section>
  );
}
