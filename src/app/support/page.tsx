"use client";

import { useState } from "react";
import { Mail, ChevronDown, ChevronUp, Copy, Check, Smartphone } from "lucide-react";

const faqs = [
  {
    q: "How does Driven track my speed?",
    a: "Driven uses your device's GPS hardware to calculate speed in real-time. The GPS receiver determines your position multiple times per second and calculates speed based on positional changes.",
  },
  {
    q: "Why does Driven need background location access?",
    a: "Background location access enables automatic trip detection. This allows Driven to start recording when it detects you're driving, even if the app isn't actively open on your screen. You can control this in your device's Settings > Privacy > Location Services.",
  },
  {
    q: "Is my location data shared with anyone?",
    a: "No. All location data and trip history are stored locally on your device. We do not upload, sell, or share your GPS data with third parties. Your driving data stays on your phone.",
  },
  {
    q: "How accurate is the speed reading?",
    a: "GPS speed accuracy is typically within 1-3 MPH under open sky conditions. Accuracy may decrease in tunnels, urban canyons, dense tree cover, or during poor weather. The app is for informational purposes and is not a certified measurement device.",
  },
  {
    q: "How do I delete my trip data?",
    a: "You can delete individual trips by swiping left on them in the Trip History screen. To delete all data, go to Settings and use the Delete Account option, which removes all stored trips and preferences.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Subscriptions are managed through Apple. Go to Settings > [Your Name] > Subscriptions on your iPhone to manage or cancel your Driven subscription.",
  },
  {
    q: "Automatic trip detection isn't working. What should I do?",
    a: "Ensure that location permissions are set to \"Always\" (Settings > Privacy > Location Services > Driven). Also verify that Motion & Fitness permissions are enabled. If issues persist, try restarting the app.",
  },
  {
    q: "My speed shows 0 even when moving. What's wrong?",
    a: "This usually indicates a GPS signal issue. Ensure you're outdoors or in a location with clear sky visibility. GPS doesn't work well indoors or in parking structures. Try moving to an open area and waiting a moment for GPS lock.",
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("team@revfluence.ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-driven-accent mb-2">
        Support
      </h1>
      <p className="text-driven-text-secondary mb-12">
        We&apos;re here to help. Find answers below or reach out directly.
      </p>

      {/* Contact Card */}
      <div className="rounded-lg border border-driven-accent/20 bg-driven-surface-low p-6 mb-12">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-driven-accent/10 p-3">
            <Mail className="h-6 w-6 text-driven-accent" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-driven-text mb-1">
              Contact Us
            </h2>
            <p className="text-sm text-driven-text-secondary mb-3">
              Send us an email and we&apos;ll get back to you within 24-48 hours.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="mailto:team@revfluence.ai"
                className="text-driven-accent hover:underline font-medium"
              >
                team@revfluence.ai
              </a>
              <button
                onClick={copyEmail}
                className="text-driven-text-secondary hover:text-driven-accent transition-colors p-1"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-driven-green" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <h2 className="text-2xl font-bold text-driven-text mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 mb-12">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-lg border border-white/5 bg-driven-surface-low overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-medium text-driven-text pr-4">
                {faq.q}
              </span>
              {openIndex === i ? (
                <ChevronUp className="h-4 w-4 text-driven-accent shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-driven-text-secondary shrink-0" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 border-t border-white/5">
                <p className="text-sm text-driven-text-secondary pt-3 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="rounded-lg border border-white/5 bg-driven-surface-low p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-driven-surface-high p-3">
            <Smartphone className="h-6 w-6 text-driven-text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-driven-text mb-2">
              App Information
            </h2>
            <dl className="space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="text-driven-text-secondary">Version:</dt>
                <dd className="text-driven-text">1.0.0</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-driven-text-secondary">Requires:</dt>
                <dd className="text-driven-text">iOS 17.0 or later</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-driven-text-secondary">Permissions:</dt>
                <dd className="text-driven-text">GPS, Location Services, Motion &amp; Fitness</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
