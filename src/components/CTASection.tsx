export function CTASection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,255,0.06)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Hit the Road?
        </h2>
        <p className="text-driven-text-secondary max-w-md mx-auto mb-8">
          Download Driven and start tracking your speed with precision GPS
          telemetry.
        </p>
        <a
          href="https://apps.apple.com/us/app/driven-speed-tracker/id6762046780"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-driven-accent px-8 py-4 text-sm font-bold uppercase tracking-[3px] text-driven-bg-deep transition-all hover:scale-105 glow-accent"
        >
          Download Free
        </a>
        <p className="mt-4 text-xs text-driven-outline">
          Available on iOS 17.0 and later
        </p>
      </div>
    </section>
  );
}
