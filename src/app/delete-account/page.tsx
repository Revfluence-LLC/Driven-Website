import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Smartphone, Mail, Trash2, Archive, Clock } from "lucide-react";
import { DeleteAccountForm } from "./DeleteAccountForm";

export const metadata: Metadata = {
  title: "Delete Your Account — Driven",
  description:
    "How to permanently delete your Driven account and the data associated with it, from inside the app or by request.",
  alternates: { canonical: "/delete-account" },
};

const deletedData = [
  {
    category: "Account & sign-in",
    items:
      "Your email address, the sign-in provider you used (Google, Apple, or email/password), your account identifier, and your reserved Driven username.",
  },
  {
    category: "Profile",
    items:
      "Display name, username, vehicle name, profile photo, and app preferences (units, speed thresholds, leaderboard visibility).",
  },
  {
    category: "Trips & driving data",
    items:
      "Every recorded trip — start and end times, GPS route, distance, duration, maximum speed, average speed, and acceleration times — both on your device and in cloud sync.",
  },
  {
    category: "Community & leaderboards",
    items:
      "Your V-Score, leaderboard entry, aggregate stats (top speed, total distance, trip count), and all friend connections and pending friend requests.",
  },
];

const keptData = [
  {
    category: "Purchase & subscription records",
    detail:
      "Driven does not store your payment details. Subscriptions are billed and recorded by Google Play or Apple, who keep their own transaction history for tax and legal purposes independently of your Driven account. Cancel a subscription in the Google Play Store under Payments & subscriptions, or in App Store settings.",
    period: "Held by Google / Apple under their own policies",
  },
  {
    category: "Encrypted system backups",
    detail:
      "Deleted records may persist in routine encrypted backups after they are removed from our live systems. They are not accessible in the app and are overwritten on the normal backup cycle.",
    period: "Up to 90 days",
  },
  {
    category: "Support correspondence",
    detail:
      "If you email us, we keep that message so we have a record of your request and our response. It is then deleted.",
    period: "Up to 12 months",
  },
  {
    category: "Anonymous, aggregated statistics",
    detail:
      "Counts and totals that cannot be linked back to you, your account, or your device — for example the total number of trips recorded across all users.",
    period: "Retained indefinitely (not personal data)",
  },
];

export default function DeleteAccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-driven-accent mb-3">
        Delete Your Driven Account
      </h1>
      <p className="text-driven-text-secondary leading-relaxed mb-3">
        <strong className="text-driven-text">Driven</strong> is a speed tracker and trip
        recording app developed by{" "}
        <strong className="text-driven-text">Revfluence, LLC</strong>. This page explains
        how to permanently delete your Driven account and the data associated with it.
      </p>
      <p className="text-sm text-driven-text-secondary mb-10">
        Last updated: July 24, 2026
      </p>

      {/* Warning */}
      <div className="rounded-lg border border-driven-warning/30 bg-driven-warning/5 p-5 mb-12">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-driven-warning shrink-0 mt-0.5" />
          <p className="text-sm text-driven-text leading-relaxed">
            <strong>Deleting your account is permanent.</strong> Your trips, routes,
            stats, V-Score, and leaderboard history cannot be recovered afterwards, and
            deleting your account does not cancel your subscription — cancel that
            separately in the Google Play Store or App Store first.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <h2 className="text-2xl font-bold text-driven-text mb-2">
        How to request deletion
      </h2>
      <p className="text-driven-text-secondary mb-8">
        There are two ways to delete your account. Both remove the same data.
      </p>

      {/* Option 1 */}
      <div className="rounded-lg border border-white/10 bg-driven-surface-low p-6 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="rounded-full bg-driven-accent/10 p-2.5">
            <Smartphone className="h-5 w-5 text-driven-accent" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-[2px] text-driven-accent">
              Option 1 — Fastest
            </p>
            <h3 className="text-lg font-semibold text-driven-text">
              Delete from inside the app
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-mono uppercase tracking-[2px] text-driven-text-secondary mb-3">
              Android
            </p>
            <ol className="space-y-2 text-sm text-driven-text-secondary list-decimal list-outside pl-5 marker:text-driven-accent">
              <li>Open the Driven app.</li>
              <li>
                Tap <strong className="text-driven-text">PROFILE</strong> in the bottom
                tab bar.
              </li>
              <li>
                Scroll down to the <strong className="text-driven-text">ABOUT</strong>{" "}
                section.
              </li>
              <li>
                Tap <strong className="text-driven-text">Delete My Account</strong>.
              </li>
              <li>
                Confirm by tapping{" "}
                <strong className="text-driven-text">Delete Everything</strong>.
              </li>
            </ol>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-[2px] text-driven-text-secondary mb-3">
              iPhone
            </p>
            <ol className="space-y-2 text-sm text-driven-text-secondary list-decimal list-outside pl-5 marker:text-driven-accent">
              <li>Open the Driven app.</li>
              <li>
                Open the <strong className="text-driven-text">Profile</strong> tab.
              </li>
              <li>
                Scroll down to the <strong className="text-driven-text">ABOUT</strong>{" "}
                section.
              </li>
              <li>
                Tap <strong className="text-driven-text">Delete My Account</strong>.
              </li>
              <li>
                Confirm by tapping{" "}
                <strong className="text-driven-text">Delete Everything</strong>.
              </li>
            </ol>
          </div>
        </div>

        <p className="mt-5 text-xs text-driven-text-secondary leading-relaxed border-t border-white/5 pt-4">
          This closes your account and erases every trip and setting stored on your
          device straight away. The synced copies held in our cloud are queued for
          removal and fully purged within 30 days.
        </p>
      </div>

      {/* Option 2 */}
      <div className="rounded-lg border border-white/10 bg-driven-surface-low p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-driven-accent/10 p-2.5">
            <Mail className="h-5 w-5 text-driven-accent" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-[2px] text-driven-accent">
              Option 2
            </p>
            <h3 className="text-lg font-semibold text-driven-text">
              Ask us to delete it for you
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm text-driven-text-secondary leading-relaxed">
          Use this if you have already uninstalled Driven, lost access to your device, or
          cannot sign in. Fill in the form below and it will open your email app with the
          request already written — or email us directly at{" "}
          <a
            href="mailto:team@revfluence.ai?subject=Account%20deletion%20request%20%E2%80%94%20Driven"
            className="text-driven-accent hover:underline font-medium"
          >
            team@revfluence.ai
          </a>{" "}
          with the subject{" "}
          <span className="font-mono text-driven-text">
            &ldquo;Account deletion request — Driven&rdquo;
          </span>{" "}
          and the email address you signed in with.
        </p>
      </div>

      <div className="mb-16">
        <DeleteAccountForm />
      </div>

      {/* ---------------------------------------------------------------- */}
      <h2 className="text-2xl font-bold text-driven-text mb-2">
        What data is deleted
      </h2>
      <p className="text-driven-text-secondary mb-6">
        When you delete your Driven account, the following is erased from your device and
        from our servers.
      </p>

      <div className="space-y-3 mb-12">
        {deletedData.map((row) => (
          <div
            key={row.category}
            className="rounded-lg border border-white/5 bg-driven-surface-low p-5"
          >
            <div className="flex items-start gap-3">
              <Trash2 className="h-4 w-4 text-driven-green shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-driven-text mb-1">
                  {row.category}
                </h3>
                <p className="text-sm text-driven-text-secondary leading-relaxed">
                  {row.items}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      <h2 className="text-2xl font-bold text-driven-text mb-2">
        What is kept, and for how long
      </h2>
      <p className="text-driven-text-secondary mb-6">
        A small amount of information outlives your account, either because the law
        requires it or because it is no longer linked to you.
      </p>

      <div className="space-y-3 mb-12">
        {keptData.map((row) => (
          <div
            key={row.category}
            className="rounded-lg border border-white/5 bg-driven-surface-low p-5"
          >
            <div className="flex items-start gap-3">
              <Archive className="h-4 w-4 text-driven-outline shrink-0 mt-1" />
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-sm font-semibold text-driven-text">
                    {row.category}
                  </h3>
                  <span className="text-xs font-mono uppercase tracking-[1px] text-driven-accent">
                    {row.period}
                  </span>
                </div>
                <p className="text-sm text-driven-text-secondary leading-relaxed">
                  {row.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      <h2 className="text-2xl font-bold text-driven-text mb-6">
        How long deletion takes
      </h2>

      <div className="rounded-lg border border-white/10 bg-driven-surface-low p-6 mb-12">
        <ul className="space-y-4">
          {[
            {
              when: "Immediately",
              what: "If you delete from inside the app, your account is closed and all data stored on your device is erased.",
            },
            {
              when: "Within 3 business days",
              what: "We acknowledge emailed requests and confirm you own the account. We may ask one verification question before proceeding.",
            },
            {
              when: "Within 30 days",
              what: "Your account and all associated data are permanently removed from our live systems.",
            },
            {
              when: "Within 90 days",
              what: "Any remaining copies are cycled out of encrypted backups.",
            },
          ].map((step) => (
            <li key={step.when} className="flex items-start gap-3">
              <Clock className="h-4 w-4 text-driven-accent shrink-0 mt-1" />
              <div>
                <p className="text-xs font-mono uppercase tracking-[2px] text-driven-accent mb-1">
                  {step.when}
                </p>
                <p className="text-sm text-driven-text-secondary leading-relaxed">
                  {step.what}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------------------------------------------------------- */}
      <h2 className="text-2xl font-bold text-driven-text mb-3">Questions</h2>
      <p className="text-driven-text-secondary leading-relaxed">
        If you have any questions about deleting your account or the data we hold, email{" "}
        <a
          href="mailto:team@revfluence.ai"
          className="text-driven-accent hover:underline font-medium"
        >
          team@revfluence.ai
        </a>
        . You can also read our{" "}
        <Link href="/privacy" className="text-driven-accent hover:underline font-medium">
          Privacy Policy
        </Link>{" "}
        or visit{" "}
        <Link href="/support" className="text-driven-accent hover:underline font-medium">
          Support
        </Link>
        .
      </p>
    </div>
  );
}
