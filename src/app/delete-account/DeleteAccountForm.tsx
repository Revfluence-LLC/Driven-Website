"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Mail, ArrowLeft } from "lucide-react";

const SUPPORT_EMAIL = "team@revfluence.ai";

type Scope = "account" | "trips";
type Platform = "android" | "ios" | "both";

const platformLabels: Record<Platform, string> = {
  android: "Android (Google Play)",
  ios: "iOS (App Store)",
  both: "Both Android and iOS",
};

const scopeLabels: Record<Scope, string> = {
  account: "Delete my entire account and all associated data",
  trips: "Delete my driving/trip data only (keep my account)",
};

function buildSubject(scope: Scope) {
  return scope === "account"
    ? "Account deletion request — Driven"
    : "Data deletion request — Driven";
}

function buildBody(fields: {
  email: string;
  username: string;
  platform: Platform;
  scope: Scope;
  notes: string;
}) {
  const lines = [
    "Hello Driven Support,",
    "",
    `I am requesting the following: ${scopeLabels[fields.scope]}.`,
    "",
    `Account email: ${fields.email}`,
    `Driven username: ${fields.username.trim() || "(not set / unknown)"}`,
    `Platform: ${platformLabels[fields.platform]}`,
  ];

  if (fields.notes.trim()) {
    lines.push("", `Additional details: ${fields.notes.trim()}`);
  }

  lines.push(
    "",
    "I confirm that I am the owner of this account and I understand that this action is permanent and cannot be undone.",
    "",
    "Thank you.",
  );

  return lines.join("\n");
}

export function DeleteAccountForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState<Platform>("android");
  const [scope, setScope] = useState<Scope>("account");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState<"body" | "email" | null>(null);

  const subject = useMemo(() => buildSubject(scope), [scope]);
  const body = useMemo(
    () => buildBody({ email, username, platform, scope, notes }),
    [email, username, platform, scope, notes],
  );
  const mailtoHref = useMemo(
    () =>
      `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
    [subject, body],
  );

  const copy = async (what: "body" | "email") => {
    const text = what === "email" ? SUPPORT_EMAIL : `${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError("Couldn't copy automatically — please select the text and copy it manually.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter the email address associated with your Driven account.");
      return;
    }
    if (!confirmed) {
      setError("Please confirm that you understand this action is permanent.");
      return;
    }

    setError(null);
    setSent(true);
    window.location.href = mailtoHref;
  };

  const inputClass =
    "w-full rounded-md border border-white/10 bg-driven-bg px-3 py-2.5 text-sm text-driven-text " +
    "placeholder:text-driven-outline focus:border-driven-accent focus:outline-none focus:ring-1 " +
    "focus:ring-driven-accent transition-colors";
  const labelClass =
    "block text-xs font-mono uppercase tracking-[2px] text-driven-text-secondary mb-2";

  if (sent) {
    return (
      <div className="rounded-lg border border-driven-accent/30 bg-driven-surface-low p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-driven-accent/10 p-3 shrink-0">
            <Mail className="h-6 w-6 text-driven-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-driven-text mb-2">
              Your email app should have opened
            </h3>
            <p className="text-sm text-driven-text-secondary leading-relaxed mb-4">
              Send the pre-filled message to complete your request. We reply to every
              request within 3 business days, and your data is deleted within 30 days of
              us verifying that you own the account.
            </p>

            <p className="text-sm text-driven-text-secondary leading-relaxed mb-3">
              If nothing opened, send this message manually to{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-driven-accent hover:underline font-medium"
              >
                {SUPPORT_EMAIL}
              </a>
              :
            </p>

            <pre className="whitespace-pre-wrap break-words rounded-md border border-white/5 bg-driven-bg p-4 text-xs text-driven-text-secondary font-mono leading-relaxed max-h-72 overflow-auto">
              {`${subject}\n\n${body}`}
            </pre>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => copy("body")}
                className="inline-flex items-center gap-2 rounded-md border border-driven-accent/30 px-4 py-2 text-sm font-medium text-driven-accent hover:bg-driven-accent/10 transition-colors"
              >
                {copied === "body" ? (
                  <Check className="h-4 w-4 text-driven-green" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied === "body" ? "Copied" : "Copy message"}
              </button>
              <button
                type="button"
                onClick={() => copy("email")}
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-driven-text-secondary hover:text-driven-accent hover:border-driven-accent/30 transition-colors"
              >
                {copied === "email" ? (
                  <Check className="h-4 w-4 text-driven-green" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied === "email" ? "Copied" : "Copy address"}
              </button>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-driven-text-secondary hover:text-driven-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Edit request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-white/10 bg-driven-surface-low p-6 space-y-6"
    >
      <div>
        <label htmlFor="da-email" className={labelClass}>
          Account email <span className="text-driven-warning">*</span>
        </label>
        <input
          id="da-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
        <p className="mt-2 text-xs text-driven-text-secondary">
          Use the address you signed in with (email, Google, or Apple) so we can verify
          the account is yours.
        </p>
      </div>

      <div>
        <label htmlFor="da-username" className={labelClass}>
          Driven username <span className="text-driven-outline">(optional)</span>
        </label>
        <input
          id="da-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. nightdriver"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="da-platform" className={labelClass}>
          Where you use Driven
        </label>
        <select
          id="da-platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value as Platform)}
          className={inputClass}
        >
          {(Object.keys(platformLabels) as Platform[]).map((key) => (
            <option key={key} value={key}>
              {platformLabels[key]}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>What should we delete?</legend>
        <div className="space-y-2">
          {(Object.keys(scopeLabels) as Scope[]).map((key) => (
            <label
              key={key}
              className={`flex items-start gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                scope === key
                  ? "border-driven-accent/50 bg-driven-accent/5"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name="scope"
                value={key}
                checked={scope === key}
                onChange={() => setScope(key)}
                className="mt-0.5 accent-driven-accent"
              />
              <span className="text-sm text-driven-text">{scopeLabels[key]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="da-notes" className={labelClass}>
          Anything else we should know?{" "}
          <span className="text-driven-outline">(optional)</span>
        </label>
        <textarea
          id="da-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional context — for example, a second email address you may have used."
          className={`${inputClass} resize-y`}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 accent-driven-accent h-4 w-4 shrink-0"
        />
        <span className="text-sm text-driven-text-secondary leading-relaxed">
          I confirm I own this account and understand that deletion is{" "}
          <strong className="text-driven-text">permanent and cannot be undone</strong>.
          My trips, stats, and leaderboard history will not be recoverable.
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-driven-warning">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-driven-accent px-6 py-3 text-sm font-semibold text-driven-bg-deep hover:bg-driven-accent-light transition-colors"
        >
          <Mail className="h-4 w-4" />
          Send deletion request
        </button>
        <p className="text-xs text-driven-text-secondary">
          Opens your email app with the request pre-filled. You still need to press send.
        </p>
      </div>
    </form>
  );
}
