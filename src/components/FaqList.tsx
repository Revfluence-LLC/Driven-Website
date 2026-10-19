import { JsonLd } from "./JsonLd";

export type Faq = { q: string; a: string };

/** FAQ rendered with native <details> (no JS) plus FAQPage structured data. */
export function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">{heading}</h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-lg border border-white/5 bg-driven-surface-low p-5 open:border-driven-accent/20">
            <summary className="cursor-pointer list-none font-medium text-driven-text flex justify-between gap-4">
              {f.q}
              <span className="text-driven-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-driven-text-secondary leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </section>
  );
}
