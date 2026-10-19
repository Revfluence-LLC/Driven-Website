import { Smartphone } from "lucide-react";
import { APP_NAME, APP_STORE_URL } from "@/lib/site";

export function AppStoreCTA({
  title = "Take it on the road",
  body = "The free web speedometer is great for a quick check. The iPhone app keeps going in the background, records every trip automatically, and adds a windshield HUD, speed alerts, and a 0–60 timer.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <aside className="rounded-2xl border border-driven-accent/20 bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,255,0.08),transparent_60%)] bg-driven-surface-low p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
      <div className="rounded-xl bg-driven-accent/10 p-3">
        <Smartphone className="h-7 w-7 text-driven-accent" />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
        <p className="text-sm text-driven-text-secondary leading-relaxed">{body}</p>
      </div>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${APP_NAME} on the App Store`}
        className="shrink-0 inline-flex items-center justify-center rounded-md bg-driven-accent px-5 py-3 text-xs font-bold uppercase tracking-[2px] text-driven-bg-deep hover:scale-105 transition-transform glow-accent"
      >
        Get the iPhone app
      </a>
    </aside>
  );
}
