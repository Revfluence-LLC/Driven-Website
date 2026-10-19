import Link from "next/link";
import { guides } from "@/lib/guides";
import { GuideCard } from "./GuideCard";

export function GuidesSection() {
  return (
    <section className="bg-driven-bg-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Speedometer guides</h2>
            <p className="text-driven-text-secondary">How speed is measured, how accurate it is, and how to use it.</p>
          </div>
          <Link href="/guides" className="text-sm font-semibold text-driven-accent hover:underline">
            All guides →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 6).map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
