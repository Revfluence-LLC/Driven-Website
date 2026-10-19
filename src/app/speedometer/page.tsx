import type { Metadata } from "next";
import Link from "next/link";
import { OnlineSpeedometer } from "@/components/tools/OnlineSpeedometer";
import { AppStoreCTA } from "@/components/AppStoreCTA";
import { FaqList, type Faq } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Online Speedometer — GPS Speed in MPH or KM/H",
  description:
    "Check your current speed for free with this online GPS speedometer. Works in your phone's browser — no app, no sign-up. MPH, km/h or knots, max speed, distance, and a HUD mode.",
  alternates: { canonical: "/speedometer" },
  openGraph: {
    title: "Free Online GPS Speedometer",
    description: "Check your speed in MPH or km/h right in your browser. No app or sign-up needed.",
    url: "/speedometer",
    images: ["/opengraph-image"],
  },
};

const faqs: Faq[] = [
  {
    q: "Is this online speedometer free?",
    a: "Yes. It's completely free, with no sign-up and no ads. It runs in your browser, and your location is processed on your device — it is never sent to our servers.",
  },
  {
    q: "How accurate is a GPS speedometer?",
    a: "With a clear view of the sky, a phone's GPS speed is usually within about 1–2 mph (2–3 km/h) of your true speed, and it's often more accurate than a car's built-in speedometer. Accuracy drops in tunnels, parking garages, dense cities, and indoors. The ± meters reading under the speed shows the current GPS accuracy.",
  },
  {
    q: "Why does it show 0 or not change?",
    a: "Your browser needs permission to use your location, and GPS needs a clear view of the sky. Allow location access when prompted, step outside or move away from tall buildings, and give it a few seconds to lock on. Very low speeds (under about 1 mph) are shown as 0 to filter out GPS jitter.",
  },
  {
    q: "Does it work on iPhone and Android?",
    a: "Yes. It works in Safari on iPhone and Chrome on Android, as well as most modern desktop browsers. Phones give the best results because they have dedicated GPS hardware; laptops usually estimate location from Wi-Fi and aren't accurate enough for speed.",
  },
  {
    q: "Does it keep working with the screen off?",
    a: "No. Browsers pause location updates when the page is in the background or the screen locks. The page asks your phone to keep the screen awake while it's running. If you want speed tracking and trip recording that keeps working in the background, use the free-to-download iPhone app.",
  },
  {
    q: "What is HUD mode?",
    a: "HUD (head-up display) mode shows your speed in huge digits on a black screen. Turn on Mirror, place your phone flat on the dashboard at night, and the reversed digits reflect the right way round in your windshield.",
  },
  {
    q: "Can I use it while driving?",
    a: "Only if your phone is in a mount and you don't touch it while the car is moving. Set it up before you drive or let a passenger use it. Always follow local laws on phone use while driving — your eyes belong on the road.",
  },
];

export default function SpeedometerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <header className="text-center mb-10">
        <p className="text-xs font-mono tracking-[3px] text-driven-accent uppercase mb-3">Free tool · No app needed</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Online Speedometer</h1>
        <p className="text-driven-text-secondary max-w-2xl mx-auto">
          See how fast you&rsquo;re going right now, using your phone&rsquo;s GPS. Press start, allow location access,
          and your speed appears in MPH, km/h, or knots.
        </p>
      </header>

      <OnlineSpeedometer />

      <p className="mt-4 text-center text-xs text-driven-outline">
        Your location stays on your device. For information only — always obey posted speed limits.
      </p>

      <div className="mt-12">
        <AppStoreCTA />
      </div>

      <article className="mt-16 space-y-10 text-driven-text-secondary leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to use the online speedometer</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open this page on your phone and press <strong className="text-driven-text">Start speedometer</strong>.</li>
            <li>Allow location access when your browser asks. This is required to read GPS.</li>
            <li>Wait a few seconds outdoors for a GPS fix. The dot turns green when accuracy is good.</li>
            <li>Pick MPH, km/h, or knots. Your choice is remembered next time.</li>
            <li>Optional: set a speed alert, or open HUD mode for a big, glanceable display.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How it measures your speed</h2>
          <p>
            Your phone&rsquo;s GPS receiver doesn&rsquo;t just calculate where you are — it also measures how fast
            you&rsquo;re moving, using the tiny Doppler shift in satellite signals. When your browser provides that
            reading, this speedometer uses it directly. When it doesn&rsquo;t, the speed is calculated from the
            distance between consecutive GPS fixes. Readings with poor accuracy are ignored so the distance and
            maximum speed aren&rsquo;t thrown off by GPS jumps. Learn more in{" "}
            <Link href="/guides/how-does-a-gps-speedometer-work" className="text-driven-accent hover:underline">
              how a GPS speedometer works
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What you can use it for</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-driven-text">Checking your car&rsquo;s speedometer.</strong> Most car
              speedometers read a little high.{" "}
              <Link href="/guides/gps-vs-car-speedometer" className="text-driven-accent hover:underline">
                Here&rsquo;s why
              </Link>
              .
            </li>
            <li><strong className="text-driven-text">Cycling, running, and skating</strong> — see your real pace without a bike computer.</li>
            <li><strong className="text-driven-text">Boats and jet skis</strong> — switch to knots.</li>
            <li><strong className="text-driven-text">Trains, buses, and flights</strong> — find out how fast you&rsquo;re traveling as a passenger.</li>
            <li><strong className="text-driven-text">Older cars, rentals, and golf carts</strong> with a broken or missing speedometer.</li>
          </ul>
          <p className="mt-4">
            Need to convert between units? Use the{" "}
            <Link href="/speed-converter" className="text-driven-accent hover:underline">MPH to km/h converter</Link>.
          </p>
        </section>

        <FaqList faqs={faqs} />
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Online Speedometer",
          url: `${SITE_URL}/speedometer`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (web browser with GPS)",
          browserRequirements: "Requires JavaScript and the Geolocation API",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: "A free GPS speedometer that runs in your browser and shows your speed in MPH, km/h, or knots.",
        }}
      />
    </div>
  );
}
