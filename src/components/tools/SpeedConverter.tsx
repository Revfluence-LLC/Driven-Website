"use client";

import { useState } from "react";

// Meters per second in one of each unit.
const UNITS = [
  { key: "mph", label: "Miles per hour", short: "mph", mps: 0.44704 },
  { key: "kmh", label: "Kilometers per hour", short: "km/h", mps: 1 / 3.6 },
  { key: "knots", label: "Knots", short: "kn", mps: 1852 / 3600 },
  { key: "mps", label: "Meters per second", short: "m/s", mps: 1 },
  { key: "fps", label: "Feet per second", short: "ft/s", mps: 0.3048 },
] as const;

type Key = (typeof UNITS)[number]["key"];

function format(n: number) {
  if (!Number.isFinite(n)) return "";
  return Number(n.toFixed(n >= 100 ? 1 : 2)).toString();
}

export function SpeedConverter() {
  const [mps, setMps] = useState(60 * 0.44704);
  const [editing, setEditing] = useState<{ key: Key; text: string } | null>(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-driven-surface-low p-5 sm:p-8 grid gap-4 sm:grid-cols-2">
      {UNITS.map((u) => {
        const value = editing?.key === u.key ? editing.text : format(mps / u.mps);
        return (
          <label key={u.key} className="block">
            <span className="text-xs font-mono uppercase tracking-[2px] text-driven-outline">{u.label}</span>
            <div className="mt-1 flex items-center rounded-lg bg-driven-bg border border-white/10 focus-within:border-driven-accent">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={value}
                onFocus={() => setEditing({ key: u.key, text: format(mps / u.mps) })}
                onBlur={() => setEditing(null)}
                onChange={(e) => {
                  setEditing({ key: u.key, text: e.target.value });
                  const n = parseFloat(e.target.value);
                  if (Number.isFinite(n)) setMps(n * u.mps);
                }}
                className="w-full bg-transparent px-3 py-3 text-xl font-mono tabular-nums text-white focus:outline-none"
              />
              <span className="px-3 text-sm font-mono text-driven-accent">{u.short}</span>
            </div>
          </label>
        );
      })}
    </div>
  );
}
