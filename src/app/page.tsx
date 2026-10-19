import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FreeToolsSection } from "@/components/FreeToolsSection";
import { GuidesSection } from "@/components/GuidesSection";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { APP_NAME, APP_STORE_URL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FreeToolsSection />
      <GuidesSection />
      <CTASection />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: APP_NAME,
          operatingSystem: "iOS 17.0 or later",
          applicationCategory: "NavigationApplication",
          downloadUrl: APP_STORE_URL,
          installUrl: APP_STORE_URL,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: "Revfluence, LLC" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        }}
      />
    </>
  );
}
