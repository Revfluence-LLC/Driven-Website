import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gauge } from "lucide-react";
import { guides, getGuide } from "@/lib/guides";
import { guideContent } from "@/content/guides";
import { GuideCard } from "@/components/GuideCard";
import { AppStoreCTA } from "@/components/AppStoreCTA";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `/guides/${slug}`,
      modifiedTime: guide.updated,
      images: ["/opengraph-image"],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const Content = guideContent[slug];
  if (!guide || !Content) notFound();

  const related = guides.filter((g) => g.slug !== slug).slice(0, 3);
  const updated = new Date(guide.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <nav aria-label="Breadcrumb" className="text-xs text-driven-outline mb-6">
        <Link href="/" className="hover:text-driven-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-driven-accent">Guides</Link>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{guide.title}</h1>
      <p className="text-sm text-driven-outline mb-10">
        Updated {updated} · {guide.readMinutes} min read
      </p>

      <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-driven-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-driven-text prose-p:text-driven-text-secondary prose-li:text-driven-text-secondary prose-lead:text-driven-text prose-th:text-driven-text prose-td:text-driven-text-secondary">
        <Content />
      </div>

      <Link
        href="/speedometer"
        className="mt-12 flex items-center gap-4 rounded-xl border border-white/10 bg-driven-surface-low p-5 hover:border-driven-accent/30 transition-colors"
      >
        <Gauge className="h-8 w-8 text-driven-accent shrink-0" />
        <span>
          <span className="block font-semibold text-white">Check your speed now — free</span>
          <span className="block text-sm text-driven-text-secondary">Open the online GPS speedometer in your browser. No app needed.</span>
        </span>
      </Link>

      <div className="mt-6">
        <AppStoreCTA />
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-bold text-white mb-6">More guides</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          dateModified: guide.updated,
          datePublished: guide.updated,
          mainEntityOfPage: `${SITE_URL}/guides/${slug}`,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: "Revfluence, LLC", url: SITE_URL },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
            { "@type": "ListItem", position: 3, name: guide.title, item: `${SITE_URL}/guides/${slug}` },
          ],
        }}
      />
    </div>
  );
}
