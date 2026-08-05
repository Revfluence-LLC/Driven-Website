"use client";

// Shared control-panel primitives used by both the card studio and the
// leaderboard studio, so the two panels stay visually identical.

export function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-mono tracking-[3px] text-driven-text-secondary uppercase mb-3">
        {label}
      </h3>
      {children}
    </div>
  );
}

export function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border py-2.5 text-sm font-semibold transition-all ${
        active
          ? "border-driven-accent bg-driven-accent/10 text-driven-accent"
          : "border-white/10 bg-driven-surface-low text-driven-text-secondary hover:border-driven-accent/30 hover:text-driven-text"
      }`}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono tracking-[2px] text-driven-outline uppercase mb-1.5">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-sm text-driven-text outline-none focus:border-driven-accent/60 focus:bg-driven-surface"
      />
    </label>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono tracking-[2px] text-driven-outline uppercase mb-1.5">
        {label}
      </span>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (!Number.isNaN(next)) onChange(next);
        }}
        className="w-full rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-sm font-mono text-driven-text outline-none focus:border-driven-accent/60 focus:bg-driven-surface tabular-nums"
      />
    </label>
  );
}
