import type { Metadata } from "next";
import { guides } from "@/lib/guides";
import { GuideCard } from "@/components/GuideCard";

export const metadata: Metadata = {
  title: "Speedometer Guides — GPS Speed, Accuracy, HUD & 0–60",
  description:
    "Plain-English guides to speedometers: what they are, how GPS speed works, why your car reads high, HUD displays, and measuring 0–60.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <header className="text-center mb-12">
        <p className="text-xs font-mono tracking-[3px] text-driven-accent uppercase mb-3">Guides</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Speedometer Guides</h1>
        <p className="text-driven-text-secondary max-w-2xl mx-auto">
          Everything you wanted to know about measuring speed — how speedometers work, how accurate they are, and
          how to get the most out of the one in your pocket.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <GuideCard key={g.slug} guide={g} />
        ))}
      </div>
    </div>
  );
}
