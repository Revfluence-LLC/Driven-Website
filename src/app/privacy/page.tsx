import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Speedometer & Driven",
  description:
    "Privacy Policy for the Speedometer app on iOS and the Driven app on Android.",
};

const h2 = "text-xl font-semibold text-driven-text mb-3";
const h3 = "text-lg font-medium text-driven-text mt-4 mb-2";
const strong = "text-driven-text";
const list = "list-disc list-inside space-y-2 text-driven-text-secondary";
const link = "text-driven-accent hover:underline";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-driven-accent mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-driven-text-secondary mb-12">
        Last updated: October 18, 2026
      </p>

      <div className="space-y-8 text-driven-text leading-relaxed">
        <section>
          <h2 className={h2}>1. Introduction</h2>
          <p>
            This Privacy Policy explains how Revfluence, LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;) collects, uses, stores, and shares information in our speed
            tracking apps:
          </p>
          <ul className={`${list} mt-2`}>
            <li>
              <strong className={strong}>Speedometer: Speed Monitor</strong> on iOS
              (&ldquo;Speedometer&rdquo;)
            </li>
            <li>
              <strong className={strong}>Driven</strong> on Android (&ldquo;Driven&rdquo;)
            </li>
          </ul>
          <p className="mt-2">
            We refer to them together as &ldquo;the Apps.&rdquo; They work differently. On iOS
            there are no accounts and your trips stay on your device. On Android you sign in,
            and your trips sync to the cloud. Where the two differ, we say so explicitly.
          </p>
        </section>

        <section>
          <h2 className={h2}>2. Information We Collect</h2>

          <h3 className={h3}>2.1 Accounts</h3>
          <p>
            <strong className={strong}>Speedometer (iOS) has no accounts.</strong> We do not
            ask for your name, email address, phone number, or a password.
          </p>
          <p className="mt-2">
            <strong className={strong}>Driven (Android) requires an account.</strong> You can
            create one with an email address and password, or by signing in with Google. We
            collect your email address and, with Google sign-in, the display name on that
            account.
          </p>
          <p className="mt-2">
            Firebase Authentication handles sign-in. We never see your Google password, and
            Firebase stores email-account passwords only in hashed form. You also choose a
            unique public username, which is stored in our database.
          </p>

          <h3 className={h3}>2.2 Location Data (GPS)</h3>
          <p>
            Both Apps use precise GPS location to show your real-time speed, record trip routes,
            and calculate speed statistics.
          </p>
          <p className="mt-2">
            <strong className={strong}>On iOS</strong>, Speedometer can ask for
            &ldquo;Always&rdquo; location access so trips are detected and recorded
            automatically, even when the App is closed. Your location is processed on your
            device and is never sent to us or to any third party.
          </p>
          <p className="mt-2">
            <strong className={strong}>On Android</strong>, Driven does <em>not</em> request
            background location. A foreground service that you start from the App records your
            trips. It keeps recording with the screen off or the App in the background, but it
            never starts before you have opened the App.
          </p>

          <h3 className={h3}>2.3 Motion &amp; Activity Data</h3>
          <p>
            Both Apps use motion and activity recognition to detect when you start and stop
            moving: Apple CoreMotion on iOS, and Activity Recognition on Android. This data is
            processed entirely on your device. It is never sent to us or to any third party.
          </p>

          <h3 className={h3}>2.4 Trip Data</h3>
          <p>
            Each trip records:
          </p>
          <ul className={`${list} mt-2`}>
            <li>start and end time;</li>
            <li>the GPS coordinates along your route;</li>
            <li>maximum and average speed;</li>
            <li>distance and duration;</li>
            <li>any name you give it.</li>
          </ul>
          <p className="mt-2">
            <strong className={strong}>On iOS</strong>, trips, routes, 0–60 results, and
            settings are stored only on your device and are never uploaded.
          </p>
          <p className="mt-2">
            <strong className={strong}>On Android</strong>, trips are stored on your device
            and synced to your account in the cloud (see section 4).
          </p>

          <h3 className={h3}>2.5 Community Profile &amp; Friends (Android only)</h3>
          <p>
            Driven on Android includes leaderboards and a friends list. To support them, we
            publish a public profile with your username, vehicle name, V-Score, top speed,
            total distance, and trip count. We also store your friend connections.
          </p>
          <p className="mt-2">
            The public profile contains <strong className={strong}>aggregate numbers
            only</strong>. Routes, GPS coordinates, and individual trips are never published.
            You can hide yourself from leaderboards in Settings.
          </p>
          <p className="mt-2">
            Speedometer on iOS has no leaderboards, friends, or public profiles.
          </p>

          <h3 className={h3}>2.6 Preferences</h3>
          <p>
            Preferences such as your speed unit (mph, km/h, or knots), speed alert limit,
            country, and gauge style are stored on your device.
          </p>

          <h3 className={h3}>2.7 Usage Analytics &amp; Identifiers</h3>
          <p>
            We collect analytics on how the Apps are used, including:
          </p>
          <ul className={`${list} mt-2`}>
            <li>screens viewed and features used;</li>
            <li>settings changes and onboarding steps;</li>
            <li>trips started and completed, with trip totals (distance, duration, maximum and average speed);</li>
            <li>subscription and purchase events.</li>
          </ul>
          <p className="mt-2">
            Analytics events <strong className={strong}>never include your location or
            route</strong>. They are associated with a random identifier generated on your
            device (and, on Android, with your account), plus basic device information such as
            model, OS version, app version, and language. Our analytics provider may estimate
            your approximate city, region, and country from your IP address.
          </p>
          <p className="mt-2">
            For install attribution we also collect a mobile advertising identifier: the Google
            Advertising ID on Android, and Apple&apos;s IDFA on iOS. On iOS, the IDFA is
            collected <strong className={strong}>only if you allow it</strong> through
            Apple&apos;s App Tracking Transparency prompt, which appears when you first open
            Speedometer.
          </p>

          <h3 className={h3}>2.8 Subscription &amp; Purchase Data</h3>
          <p>
            The Apps require a subscription, which may start with a free trial. When you start
            a trial or make a purchase, we record the product identifier, price, and currency.
            Apple or Google processes your payment. We never receive your card number or
            billing details.
          </p>
        </section>

        <section>
          <h2 className={h2}>3. How We Use Your Information</h2>
          <ul className={list}>
            <li>Calculate and display your real-time speed</li>
            <li>Record trip routes and statistics, and detect trip start and end</li>
            <li>Show your trip history, odometer, and speed alerts</li>
            <li>Manage your subscription and access to paid features</li>
            <li>Measure app performance, diagnose problems, and improve the Apps</li>
            <li>Attribute app installs to the marketing campaigns that produced them</li>
            <li>
              Android only: create and authenticate your account, back up and restore your
              trips, and power leaderboards, friends, and public profiles
            </li>
          </ul>
        </section>

        <section>
          <h2 className={h2}>4. Data Storage and Cloud Sync</h2>
          <p>
            <strong className={strong}>iOS:</strong> Speedometer stores your data only on your
            device. Nothing is synced to a server, so deleting the App or using
            Settings &rarr; Delete All Data removes it permanently.
          </p>
          <p className="mt-2">
            <strong className={strong}>Android:</strong> Trips are written first to a database
            on your device, which stays the primary copy. While you are signed in, Driven also
            copies your completed trips (GPS route, speeds, distance, and duration) to Google
            Cloud Firestore under your account. This keeps your history after a reinstall or on
            a new device. Long routes are downsampled before upload. Synced trips can be read
            only by your signed-in account, and data is encrypted in transit.
          </p>
        </section>

        <section>
          <h2 className={h2}>5. Third-Party Services</h2>
          <p>The Apps use the following service providers:</p>
          <ul className={`${list} mt-2`}>
            <li>
              <strong className={strong}>Mixpanel</strong> (both): product analytics. Receives
              the usage events and identifiers described in section 2.7.
            </li>
            <li>
              <strong className={strong}>AppsFlyer</strong> (both): install attribution and
              marketing measurement. Receives:
              <ul className="list-[circle] list-inside ml-5 mt-1 space-y-1">
                <li>install and app-open data;</li>
                <li>device information and IP address;</li>
                <li>trial and purchase events;</li>
                <li>your advertising identifier, where permitted.</li>
              </ul>
            </li>
            <li>
              <strong className={strong}>Superwall</strong> (both): subscription screens.
              Receives which offers you see, the plan you choose, purchase outcomes, and basic
              device information.
            </li>
            <li>
              <strong className={strong}>Apple App Store</strong> and{" "}
              <strong className={strong}>Google Play</strong>: subscription purchases and
              payment processing.
            </li>
            <li>
              <strong className={strong}>Apple MapKit</strong> (iOS) and{" "}
              <strong className={strong}>Google Maps</strong> (Android): draw the maps your
              routes appear on.
            </li>
            <li>
              <strong className={strong}>Firebase Authentication</strong> and{" "}
              <strong className={strong}>Cloud Firestore</strong> (Android only, Google):
              accounts, sign-in, synced trips, profiles, and friend connections.
            </li>
            <li>
              <strong className={strong}>Google Sign-In</strong> (Android only): optional
              sign-in that shares your email address and display name with us.
            </li>
          </ul>
          <p className="mt-2">
            These providers process information on our behalf under their own privacy policies
            and their agreements with us. We require them to protect your information at least
            as well as this Privacy Policy describes.
          </p>
        </section>

        <section>
          <h2 className={h2}>6. Tracking and Data Sharing</h2>
          <p>
            <strong className={strong}>We do not sell your personal information.</strong> We
            never share your GPS routes, trip coordinates, or trip history with advertisers,
            data brokers, or anyone else.
          </p>
          <p className="mt-2">
            For analytics and marketing measurement, we share these with the partners named in
            section 5:
          </p>
          <ul className={`${list} mt-2`}>
            <li>device identifiers (and, on Android, account identifiers);</li>
            <li>your advertising identifier, where permitted;</li>
            <li>purchase events.</li>
          </ul>
          <p className="mt-2">
            Our attribution partner may combine this with data from advertising networks to
            work out which ad led to an install. On iOS this happens only if you allow
            tracking. If you don&apos;t, attribution relies on Apple&apos;s privacy-preserving
            SKAdNetwork. Neither App shows third-party ads.
          </p>
          <p className="mt-2">
            On Android, the aggregate profile statistics in section 2.5 are visible to other
            Driven users unless you hide your profile.
          </p>
        </section>

        <section>
          <h2 className={h2}>7. Data Retention and Deletion</h2>
          <p>
            <strong className={strong}>iOS:</strong> Data stays on your device until you
            delete it. Use Settings &rarr; Delete All Data in Speedometer, or delete the App.
            We keep no copy, so deleted data cannot be recovered.
          </p>
          <p className="mt-2">
            <strong className={strong}>Android:</strong> We keep your account data for as long
            as your account exists. Deleting a trip in the App also removes it from the cloud.
          </p>
          <p className="mt-2">
            Deleting your account in Settings removes it along with its data: synced trips,
            public profile, username, and friend connections. You can also request deletion at{" "}
            <a href="https://www.trydriven.app/delete-account" className={link}>
              trydriven.app/delete-account
            </a>
            . Uninstalling Driven removes the copy on your device, but does not by itself
            delete your account.
          </p>
          <p className="mt-2">
            Analytics and attribution data is kept only as long as needed for the purposes
            above. After that it is deleted or anonymized under each provider&apos;s retention
            settings.
          </p>
        </section>

        <section>
          <h2 className={h2}>8. Your Rights and Choices</h2>
          <ul className={list}>
            <li>Delete individual trips in either App</li>
            <li>iOS: erase everything with Settings &rarr; Delete All Data</li>
            <li>Android: delete your account and its data in Settings or with the web form</li>
            <li>Android: hide your profile from leaderboards in Settings</li>
            <li>
              Revoke location, motion, or notification permissions at any time in your device
              settings. The Apps can&apos;t record trips without location access.
            </li>
            <li>
              iOS: allow or deny tracking at any time in Settings &rarr; Privacy &amp; Security
              &rarr; Tracking
            </li>
            <li>Android: reset or delete your advertising ID in your device settings</li>
          </ul>
          <p className="mt-2">
            Depending on where you live (for example, under the GDPR in the EU and UK, or the
            CCPA in California), you may have the right to:
          </p>
          <ul className={`${list} mt-2`}>
            <li>access your personal information;</li>
            <li>correct it;</li>
            <li>delete it;</li>
            <li>object to or restrict its processing.</li>
          </ul>
          <p className="mt-2">
            To make a request, including for analytics or attribution data, contact us at the
            address below. We will respond within the time required by law.
          </p>
        </section>

        <section>
          <h2 className={h2}>9. Children&apos;s Privacy</h2>
          <p>
            The Apps are not directed at children under 13, and we do not knowingly collect
            personal information from them. If you believe a child has given us personal
            information, please contact us and we will take appropriate action.
          </p>
        </section>

        <section>
          <h2 className={h2}>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will appear on this
            page with a new &ldquo;Last updated&rdquo; date. For significant changes, we will
            also give notice in the Apps or on this website.
          </p>
        </section>

        <section>
          <h2 className={h2}>11. Contact Us</h2>
          <p>Revfluence, LLC</p>
          <p className="mt-2">
            <a href="mailto:team@revfluence.ai" className={link}>
              team@revfluence.ai
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
