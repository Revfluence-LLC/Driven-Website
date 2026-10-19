import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Guide } from "@/lib/guides";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col rounded-lg border border-white/5 bg-driven-surface-low p-6 transition-all hover:border-driven-accent/30 hover:-translate-y-0.5"
    >
      <span className="text-[10px] font-mono uppercase tracking-[2px] text-driven-outline mb-2">
        {guide.readMinutes} min read
      </span>
      <h3 className="text-lg font-semibold text-driven-text mb-2 group-hover:text-driven-accent transition-colors">
        {guide.title}
      </h3>
      <p className="text-sm text-driven-text-secondary leading-relaxed flex-1">{guide.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm text-driven-accent">
        Read guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
