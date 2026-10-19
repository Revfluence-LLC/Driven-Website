import type { Metadata } from "next";
import Link from "next/link";
import { SpeedConverter } from "@/components/tools/SpeedConverter";
import { FaqList, type Faq } from "@/components/FaqList";
import { AppStoreCTA } from "@/components/AppStoreCTA";

export const metadata: Metadata = {
  title: "MPH to KM/H Converter — Speed Conversion Chart",
  description:
    "Convert miles per hour to kilometers per hour, knots, m/s and ft/s instantly. Includes a printable mph to km/h chart and the formulas.",
  alternates: { canonical: "/speed-converter" },
};

const MPH_TO_KMH = 1.609344;
const mphRows = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100, 120, 150];
const kmhRows = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 160, 200];

const faqs: Faq[] = [
  { q: "How do I convert mph to km/h?", a: "Multiply the speed in miles per hour by 1.609. For example, 60 mph × 1.609 = 96.6 km/h. A quick mental shortcut is to multiply by 1.6." },
  { q: "How do I convert km/h to mph?", a: "Divide the speed in kilometers per hour by 1.609 (or multiply by 0.621). For example, 100 km/h ÷ 1.609 = 62.1 mph." },
  { q: "What is 100 km/h in mph?", a: "100 km/h is 62.1 mph. That's why the 0–100 km/h acceleration time used in Europe is very close to the 0–60 mph time used in the US (60 mph is 96.6 km/h)." },
  { q: "What is a knot?", a: "A knot is one nautical mile per hour. A nautical mile is exactly 1,852 meters, so 1 knot = 1.852 km/h = 1.151 mph. Knots are used at sea and in aviation." },
];

export default function SpeedConverterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <header className="text-center mb-10">
        <p className="text-xs font-mono tracking-[3px] text-driven-accent uppercase mb-3">Free tool</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Speed Converter</h1>
        <p className="text-driven-text-secondary max-w-2xl mx-auto">
          Type a speed in any box and the others update instantly — mph, km/h, knots, meters per second, and feet per second.
        </p>
      </header>

      <SpeedConverter />

      <section className="mt-14 grid gap-8 sm:grid-cols-2">
        {[
          { title: "MPH to km/h chart", rows: mphRows.map((m) => [`${m} mph`, `${(m * MPH_TO_KMH).toFixed(1)} km/h`]) },
          { title: "km/h to MPH chart", rows: kmhRows.map((k) => [`${k} km/h`, `${(k / MPH_TO_KMH).toFixed(1)} mph`]) },
        ].map((t) => (
          <div key={t.title}>
            <h2 className="text-xl font-bold text-white mb-3">{t.title}</h2>
            <table className="w-full text-sm font-mono">
              <tbody>
                {t.rows.map(([a, b]) => (
                  <tr key={a} className="border-b border-white/5">
                    <td className="py-2 text-driven-text">{a}</td>
                    <td className="py-2 text-right text-driven-accent">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <section className="mt-14 text-driven-text-secondary leading-relaxed">
        <h2 className="text-2xl font-bold text-white mb-4">Speed conversion formulas</h2>
        <ul className="space-y-2 font-mono text-sm">
          <li>km/h = mph × 1.609344</li>
          <li>mph = km/h × 0.621371</li>
          <li>knots = km/h ÷ 1.852</li>
          <li>m/s = km/h ÷ 3.6</li>
          <li>ft/s = mph × 1.46667</li>
        </ul>
        <p className="mt-4">
          Want to know your actual speed right now? Try the free{" "}
          <Link href="/speedometer" className="text-driven-accent hover:underline">online GPS speedometer</Link>.
        </p>
      </section>

      <div className="mt-14"><FaqList faqs={faqs} /></div>
      <div className="mt-14">
        <AppStoreCTA title="Switch units anytime" body="The Speedometer app for iPhone shows your speed in mph, km/h, or knots, and remembers every trip you take." />
      </div>
    </div>
  );
}
