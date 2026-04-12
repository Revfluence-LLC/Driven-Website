import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Driven",
  description: "Terms of Service for the Driven speed tracker app.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-driven-accent mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-driven-text-secondary mb-12">
        Last updated: April 11, 2026
      </p>

      <div className="space-y-8 text-driven-text leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By downloading, installing, or using Driven (&ldquo;the App&rdquo;), you agree to be
            bound by these Terms of Service. If you do not agree to these terms, do not
            use the App.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            2. License Grant
          </h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable license
            to use the App on any Apple-branded device that you own or control, subject
            to the Apple Media Services Terms and Conditions. This license does not
            allow you to distribute, modify, reverse engineer, or create derivative
            works of the App.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            3. Description of Service
          </h2>
          <p>
            Driven is a GPS-based speed tracking application that provides real-time
            speed display, automatic trip recording, trip history, and driving
            statistics. The App uses your device&apos;s GPS hardware and motion sensors to
            deliver its core functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            4. User Responsibilities
          </h2>
          <ul className="list-disc list-inside space-y-2 text-driven-text-secondary">
            <li>
              You must comply with all applicable local, state, national, and
              international laws while using the App.
            </li>
            <li>
              You are solely responsible for the safe operation of your vehicle at all
              times.
            </li>
            <li>
              Do not interact with the App in any way that distracts you from driving
              or operating a vehicle.
            </li>
            <li>
              You must not use the App to facilitate illegal activities, including but
              not limited to speeding or reckless driving.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            5. Safety Disclaimer
          </h2>
          <p className="font-semibold text-driven-warning">
            IMPORTANT: Driven is NOT a replacement for your vehicle&apos;s speedometer.
          </p>
          <p className="mt-2">
            The App is intended for informational and entertainment purposes only. You
            must always refer to your vehicle&apos;s built-in speedometer as your primary
            source of speed information. Never rely solely on the App for speed
            readings. Do not use the App in any manner that distracts you from safe
            driving. Always keep your eyes on the road and hands on the wheel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            6. GPS Accuracy Disclaimer
          </h2>
          <p>
            Speed readings provided by the App are based on GPS data and may not be
            100% accurate. GPS accuracy can be affected by atmospheric conditions,
            satellite geometry, signal blockage (tunnels, buildings, dense foliage),
            and device hardware limitations. Speed readings may differ from your
            vehicle&apos;s speedometer. The App is not a certified measurement device and
            should not be relied upon for legal or regulatory compliance purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            7. Intellectual Property
          </h2>
          <p>
            The Driven name, logo, design, and all associated intellectual property are
            owned by Revfluence. You may not use our branding, trademarks, or
            intellectual property without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            8. Subscriptions &amp; In-App Purchases
          </h2>
          <p>
            Driven may offer premium features through in-app subscriptions. All
            subscriptions are processed through Apple&apos;s App Store and are subject to
            Apple&apos;s terms and conditions for in-app purchases. You may manage or cancel
            your subscription at any time through your Apple ID settings. Refund
            requests must be directed to Apple.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            9. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, Revfluence and its
            developers shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of the App. This
            includes, without limitation, damages arising from inaccurate speed
            readings, missed or incomplete trip recordings, data loss, or any
            consequences of relying on information provided by the App.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            10. Termination
          </h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the App at any time
            without notice. We may also terminate or restrict your access to the App if
            you violate these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            11. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws
            of the United States, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            12. Contact Us
          </h2>
          <p>
            If you have questions about these Terms of Service, please contact us at:
          </p>
          <p className="mt-2">
            <a
              href="mailto:team@revfluence.ai"
              className="text-driven-accent hover:underline"
            >
              team@revfluence.ai
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
