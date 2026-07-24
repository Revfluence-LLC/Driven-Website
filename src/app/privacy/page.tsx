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
        Last updated: July 24, 2026
      </p>

      <div className="space-y-8 text-driven-text leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">1. Introduction</h2>
          <p>
            Driven (&ldquo;the App&rdquo;) is a speed tracking application developed by Revfluence
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). This Privacy Policy explains how we
            collect, use, store, and share your information when you use Driven on iOS or
            Android. Where the two platforms behave differently, we say so explicitly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            2. Information We Collect
          </h2>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.1 Account Information
          </h3>
          <p>
            Driven requires an account. You can create one with an email address and
            password, or by signing in with Google (iOS and Android) or with Apple (iOS
            only). We collect your email address, and — if you use Google or Apple sign-in
            — the display name associated with that account. Authentication is handled by
            Firebase Authentication; we never see or store your Google or Apple password,
            and passwords for email accounts are stored only by Firebase in hashed form.
          </p>
          <p className="mt-2">
            You also choose a unique public username, which is stored in our database and
            reserved to your account.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.2 Location Data (GPS)
          </h3>
          <p>
            Driven collects precise GPS location to calculate your real-time speed, record
            trip routes, and produce speed statistics. Location is used while you are
            actively driving a tracked trip.
          </p>
          <p className="mt-2">
            <strong className="text-driven-text">On iOS</strong>, Driven requests
            &ldquo;Always&rdquo; location access and uses background location so trips can be
            detected and recorded even when the App is not open.
          </p>
          <p className="mt-2">
            <strong className="text-driven-text">On Android</strong>, Driven does{" "}
            <em>not</em> request background location. Trips are recorded by a foreground
            service that you start from the App; it continues recording with the screen off
            or the App in the background, but not before you have opened the App.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.3 Motion &amp; Activity Data
          </h3>
          <p>
            The App uses device motion and activity recognition (Apple CoreMotion on iOS,
            Activity Recognition on Android) to detect automatically when you start and stop
            driving. This motion data is processed entirely on your device and is never
            transmitted to us or to any third party.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.4 Trip Data
          </h3>
          <p>
            Each trip records its start and end time, the GPS coordinates along your route,
            maximum speed, average speed, distance traveled, duration, and any name you give
            it. Trips are stored on your device and, because Driven syncs your account
            across devices, are also uploaded to our cloud database. See section 4 for
            details.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.5 Community Profile &amp; Friends
          </h3>
          <p>
            Driven includes leaderboards and a friends list. To support these, we publish a
            public profile for your account containing your username, your vehicle name,
            your V-Score, your top speed, your total distance, and your trip count. Your
            friend connections and the usernames involved are also stored.
          </p>
          <p className="mt-2">
            Your public profile contains <strong className="text-driven-text">aggregate
            numbers only</strong>. Your routes, GPS coordinates, and individual trips are
            never published to leaderboards or shared with other users. You can hide
            yourself from leaderboards at any time in Settings.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.6 Vehicle Photo &amp; Preferences
          </h3>
          <p>
            If you choose a vehicle photo, Driven reads the single image you select from
            your photo library and saves a copy in the App&apos;s private storage on your
            device. This photo is never uploaded to our servers or shared with anyone. We do
            not access the rest of your photo library.
          </p>
          <p className="mt-2">
            Preferences such as your speed unit (MPH/KMH), speed thresholds, and vehicle
            type are stored on your device. Note that your vehicle name is included in your
            public profile as described in section 2.5.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.7 Usage Analytics &amp; Identifiers
          </h3>
          <p>
            We collect analytics about how the App is used — for example onboarding steps
            viewed, trips started and completed, and paywall and purchase events. These
            events are associated with an account identifier and with device and app
            identifiers assigned by our analytics and attribution providers.
          </p>
          <p className="mt-2">
            We also collect a mobile advertising identifier for install attribution: the
            Google Advertising ID on Android, and the Apple IDFA on iOS. On iOS the IDFA is
            collected <strong className="text-driven-text">only if you grant permission</strong>{" "}
            through Apple&apos;s App Tracking Transparency prompt.
          </p>

          <h3 className="text-lg font-medium text-driven-text mt-4 mb-2">
            2.8 Subscription &amp; Purchase Data
          </h3>
          <p>
            Driven requires an active subscription. When you start a trial or make a
            purchase we record the product identifier, price, and currency. Payment is
            processed by Apple or Google; we never receive your card number or billing
            details.
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
            <li>Create and authenticate your account, and keep you signed in</li>
            <li>Back up your trips and restore them on a new device or reinstall</li>
            <li>Power leaderboards, friend connections, and public profiles</li>
            <li>Manage your subscription and determine access to paid features</li>
            <li>Measure app performance, diagnose problems, and improve the product</li>
            <li>Attribute app installs to the marketing campaigns that produced them</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            4. Data Storage and Cloud Sync
          </h2>
          <p>
            Your trips are written first to a database on your device, which remains the
            primary copy. When you are signed in, Driven also mirrors your completed trips —
            including the GPS route, speeds, distance, and duration — to Google Cloud
            Firestore under your account, so that your history survives reinstalling the App
            or moving to a new device. Long routes are downsampled before upload.
          </p>
          <p className="mt-2">
            Your synced trips are stored under your own user record and are readable only by
            your signed-in account. Data is encrypted in transit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            5. Third-Party Services
          </h2>
          <p>Driven uses the following third-party services:</p>
          <ul className="list-disc list-inside space-y-2 mt-2 text-driven-text-secondary">
            <li>
              <strong className="text-driven-text">Firebase Authentication (Google):</strong>{" "}
              Manages your account and sign-in credentials.
            </li>
            <li>
              <strong className="text-driven-text">Cloud Firestore (Google):</strong> Stores
              your synced trips, profile, username, and friend connections.
            </li>
            <li>
              <strong className="text-driven-text">Google Sign-In</strong> and{" "}
              <strong className="text-driven-text">Sign in with Apple</strong> (iOS): Optional
              sign-in methods that share your email address and display name with us.
            </li>
            <li>
              <strong className="text-driven-text">Mixpanel:</strong> Product analytics.
              Receives usage events and an account or device identifier.
            </li>
            <li>
              <strong className="text-driven-text">AppsFlyer:</strong> Mobile install
              attribution and marketing measurement. Receives install and session data,
              purchase and trial events, and your advertising identifier where permitted.
            </li>
            <li>
              <strong className="text-driven-text">Superwall:</strong> Subscription and
              paywall management. May collect device identifiers and purchase-related events.
            </li>
            <li>
              <strong className="text-driven-text">Google Maps</strong> (Android) and{" "}
              <strong className="text-driven-text">Apple MapKit</strong> (iOS): Render the maps
              your routes are drawn on.
            </li>
            <li>
              <strong className="text-driven-text">Apple CoreLocation</strong> and{" "}
              <strong className="text-driven-text">CoreMotion</strong> (iOS), and{" "}
              <strong className="text-driven-text">Google Play services location</strong>{" "}
              (Android): System frameworks for GPS positioning and motion detection.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            6. Data Sharing
          </h2>
          <p>
            <strong className="text-driven-text">We do not sell your personal
            information.</strong> We do not share your GPS routes, trip coordinates, or trip
            history with advertisers or data brokers.
          </p>
          <p className="mt-2">
            We do share the following with the analytics and attribution partners named in
            section 5, for the purposes of analytics and marketing measurement: account and
            device identifiers, your advertising identifier, and purchase events. These
            partners may combine this information with data from advertising networks to
            attribute installs.
          </p>
          <p className="mt-2">
            Aggregate profile statistics described in section 2.5 are visible to other
            Driven users through leaderboards and friend lists unless you hide your profile.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            7. Data Retention and Deletion
          </h2>
          <p>
            We keep your account data for as long as your account exists. You can delete
            individual trips at any time within the App, which also removes them from the
            cloud.
          </p>
          <p className="mt-2">
            Deleting your account from Settings removes your account and its associated
            data, including your synced trips, your public profile, your username
            reservation, and your friend connections. You can also request deletion from the
            web at{" "}
            <a
              href="https://www.trydriven.app/delete-account"
              className="text-driven-accent hover:underline"
            >
              trydriven.app/delete-account
            </a>
            . Deleting the App from your device removes the local copy of your data but does
            not by itself delete your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-driven-text mb-3">
            8. Your Rights and Choices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-driven-text-secondary">
            <li>Delete individual trips from within the App</li>
            <li>Delete your account and all associated data via Settings or the web form</li>
            <li>Hide your profile from leaderboards in Settings</li>
            <li>
              Revoke location permissions at any time through your device settings. Driven
              cannot record trips without them.
            </li>
            <li>Revoke motion and activity permissions through your device settings</li>
            <li>
              On iOS, decline or later revoke App Tracking Transparency permission to stop
              the IDFA being used for attribution
            </li>
            <li>
              On Android, reset or delete your advertising ID through your device settings
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
