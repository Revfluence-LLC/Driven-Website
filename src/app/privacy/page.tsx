import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Driven",
  description: "Privacy Policy for the Driven speed tracker app.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-driven-accent mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-driven-text-secondary mb-12">
        Last updated: April 11, 2026
      </p>

      <div className="space-y-8 text-driven-text leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">1. Introduction</h2>
          <p>
            Driven (&ldquo;the App&rdquo;) is a speed tracking application developed by Revfluence
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). This Privacy Policy explains how we
            collect, use, and protect your information when you use Driven.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            2. Information We Collect
          </h2>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.1 Location Data (GPS)
          </h3>
          <p>
            Driven collects precise GPS location data to calculate your real-time speed,
            record trip routes, and provide speed statistics. Location data is collected
            both while the App is in use (foreground) and in the background to enable
            automatic trip detection and continuous trip recording.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.2 Motion &amp; Activity Data
          </h3>
          <p>
            The App accesses device motion and activity data (accelerometer, gyroscope,
            and activity recognition) to automatically detect when you begin and end a
            trip. This enables hands-free trip recording without manual interaction.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.3 User Preferences
          </h3>
          <p>
            We store your preferences locally on your device, including speed unit
            preference (MPH/KMH), speed thresholds, display name, and vehicle name.
            These preferences are stored using on-device storage and are not transmitted
            to external servers.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.4 Trip Data
          </h3>
          <p>
            Trip information including start/end times, GPS coordinates along your route,
            maximum speed, average speed, distance traveled, and duration are recorded
            and stored locally on your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 text-driven-text-secondary">
            <li>Calculate and display your real-time speed</li>
            <li>Record and store trip routes and statistics</li>
            <li>Automatically detect trip start and end</li>
            <li>Provide historical trip data and driving analytics</li>
            <li>Improve app functionality and user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            4. Data Storage
          </h2>
          <p>
            All trip data, location history, and user preferences are stored locally on
            your device using on-device database storage. Your location data and trip
            information are not uploaded to or stored on any external servers. Your data
            remains on your device and under your control.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            5. Third-Party Services
          </h2>
          <p>
            Driven uses the following third-party services:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2 text-driven-text-secondary">
            <li>
              <strong className="text-driven-text">Superwall:</strong> Used for managing
              in-app subscriptions and paywall presentation. Superwall may collect device
              identifiers and purchase-related events to facilitate subscription management.
            </li>
            <li>
              <strong className="text-driven-text">Apple CoreLocation:</strong> System
              framework used for GPS positioning. Data is processed on-device.
            </li>
            <li>
              <strong className="text-driven-text">Apple CoreMotion:</strong> System
              framework used for motion detection. Data is processed on-device.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            6. Data Sharing
          </h2>
          <p>
            We do not sell, trade, or share your location data or trip information with
            third parties for advertising or marketing purposes. Your GPS data and trip
            history remain stored locally on your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            7. Data Retention
          </h2>
          <p>
            Your data persists on your device until you choose to delete it. You can
            delete individual trips at any time within the App. If you delete the App,
            all locally stored data will be removed from your device. You may also
            delete your account from the Settings screen, which will remove all
            associated data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            8. Your Rights
          </h2>
          <ul className="list-disc list-inside space-y-2 text-driven-text-secondary">
            <li>Delete individual trips from within the App</li>
            <li>Delete your account and all associated data via Settings</li>
            <li>
              Revoke location permissions at any time through your device&apos;s Settings
              app (Settings &gt; Privacy &amp; Security &gt; Location Services)
            </li>
            <li>
              Revoke motion permissions through your device&apos;s Settings app
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            9. Children&apos;s Privacy
          </h2>
          <p>
            Driven is not directed at children under the age of 13. We do not knowingly
            collect personal information from children under 13. If you believe a child
            has provided us with personal information, please contact us so we can take
            appropriate action.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            10. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            reflected on this page with an updated &ldquo;Last updated&rdquo; date. We encourage
            you to review this policy periodically. Continued use of the App after
            changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            11. Contact Us
          </h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact
            us at:
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
