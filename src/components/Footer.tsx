import Link from "next/link";
import { Gauge } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-driven-surface-low">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="h-5 w-5 text-driven-accent" />
              <span className="font-mono text-sm font-bold tracking-[4px] text-driven-accent">
                DRIVEN
              </span>
            </div>
            <p className="text-xs font-mono tracking-[2px] text-driven-text-secondary uppercase">
              Precision Telemetry
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-driven-text mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-driven-text-secondary hover:text-driven-accent transition-colors">
                Home
              </Link>
              <Link href="/#features" className="block text-sm text-driven-text-secondary hover:text-driven-accent transition-colors">
                Features
              </Link>
              <Link href="/support" className="block text-sm text-driven-text-secondary hover:text-driven-accent transition-colors">
                Support
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-driven-text mb-3">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-driven-text-secondary hover:text-driven-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-driven-text-secondary hover:text-driven-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-driven-text-secondary">
            &copy; {new Date().getFullYear()} Driven. All rights reserved.
          </p>
          <p className="text-xs font-mono tracking-[3px] text-driven-outline uppercase">
            Made with Speed
          </p>
        </div>
      </div>
    </footer>
  );
}
