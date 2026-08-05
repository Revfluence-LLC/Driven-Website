"use client";

import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Shuffle,
  SortDesc,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { THEMES, type ThemeId, type Units } from "../types";
import { Field, Section, ToggleButton } from "../ui";
import {
  LEADERBOARD_FORMATS,
  LEADERBOARD_METRICS,
  MAX_ENTRIES,
  MIN_ENTRIES,
  generateValues,
  initialsOf,
  makeSampleEntries,
  metricUnit,
  newEntryId,
  readImageAsAvatar,
  sortByValue,
  type LeaderboardData,
  type LeaderboardEntry,
  type LeaderboardMetric,
} from "./types";

type Props = {
  data: LeaderboardData;
  units: Units;
  theme: ThemeId;
  ctaMode: boolean;
  // Takes an updater so concurrent edits compose. Photo reads are async, so
  // two uploads finishing in the same batch would otherwise clobber each other.
  onDataChange: Dispatch<SetStateAction<LeaderboardData>>;
  onUnitsChange: (u: Units) => void;
  onThemeChange: (t: ThemeId) => void;
  onCtaModeChange: (v: boolean) => void;
};

export function LeaderboardControls({
  data,
  units,
  theme,
  ctaMode,
  onDataChange,
  onUnitsChange,
  onThemeChange,
  onCtaModeChange,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  const patch = (next: Partial<LeaderboardData>) =>
    onDataChange((prev) => ({ ...prev, ...next }));

  const updateEntry = (id: string, next: Partial<LeaderboardEntry>) =>
    onDataChange((prev) => ({
      ...prev,
      entries: prev.entries.map((e) => (e.id === id ? { ...e, ...next } : e)),
    }));

  const move = (index: number, delta: number) =>
    onDataChange((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.entries.length) return prev;
      const entries = [...prev.entries];
      [entries[index], entries[target]] = [entries[target], entries[index]];
      return { ...prev, entries };
    });

  const remove = (id: string) =>
    onDataChange((prev) =>
      prev.entries.length <= MIN_ENTRIES
        ? prev
        : { ...prev, entries: prev.entries.filter((e) => e.id !== id) },
    );

  const addDriver = () =>
    onDataChange((prev) => {
      if (prev.entries.length >= MAX_ENTRIES) return prev;
      const last = prev.entries[prev.entries.length - 1];
      // Continue the trend so a freshly added row already reads as ranked.
      const step = prev.metric === "zeroToSixty" ? 0.3 : -8;
      const value = last
        ? Math.max(0, +(last.value + step).toFixed(2))
        : generateValues(prev.metric, 1)[0];
      return {
        ...prev,
        entries: [
          ...prev.entries,
          {
            id: newEntryId(),
            name: "New Driver",
            location: "",
            photo: null,
            value,
            isYou: false,
          },
        ],
      };
    });

  // Only one row can be "you".
  const setYou = (id: string, on: boolean) =>
    onDataChange((prev) => ({
      ...prev,
      entries: prev.entries.map((e) => ({ ...e, isYou: on && e.id === id })),
    }));

  const randomize = () =>
    onDataChange((prev) => {
      const fresh = makeSampleEntries(prev.metric, prev.entries.length);
      return {
        ...prev,
        // Keep whichever row was flagged as "you", and keep uploaded photos —
        // re-shooting the names and numbers shouldn't cost the user their art.
        entries: fresh.map((e, i) => ({
          ...e,
          isYou: prev.entries[i]?.isYou ?? false,
          photo: prev.entries[i]?.photo ?? null,
        })),
      };
    });

  // Switching metric leaves old values meaningless, so regenerate them.
  const setMetric = (metric: LeaderboardMetric) =>
    onDataChange((prev) => {
      const values = generateValues(metric, prev.entries.length);
      return {
        ...prev,
        metric,
        entries: prev.entries.map((e, i) => ({ ...e, value: values[i] })),
      };
    });

  const unit = metricUnit(data.metric, units);

  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-sm text-driven-text-secondary mt-1">
          Build a ranking card · Live preview
        </p>
      </div>

      <Section label="Format">
        <div className="grid grid-cols-2 gap-2">
          {LEADERBOARD_FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => patch({ format: f.id })}
              className={`rounded-lg border p-3 text-left transition-all ${
                data.format === f.id
                  ? "border-driven-accent bg-driven-accent/10"
                  : "border-white/10 bg-driven-surface-low hover:border-driven-accent/30"
              }`}
            >
              <div className="text-sm font-semibold text-driven-text">
                {f.label}
              </div>
              <div className="mt-1 text-[10px] font-mono tracking-[1px] text-driven-outline">
                {f.hint}
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section label="Unit System">
        <div className="grid grid-cols-2 gap-2">
          <ToggleButton active={units === "mph"} onClick={() => onUnitsChange("mph")}>
            mph
          </ToggleButton>
          <ToggleButton active={units === "kmh"} onClick={() => onUnitsChange("kmh")}>
            km/h
          </ToggleButton>
        </div>
      </Section>

      <Section label="Color Theme">
        <div className="flex gap-2">
          {Object.values(THEMES).map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              aria-label={t.label}
              title={t.label}
              className={`h-10 w-10 rounded-full border-2 transition-all ${
                theme === t.id ? "scale-110" : "border-transparent hover:scale-105"
              }`}
              style={{
                background: `linear-gradient(135deg, ${t.accent} 0%, ${t.bgDeep} 100%)`,
                borderColor: theme === t.id ? t.accent : "transparent",
                boxShadow: theme === t.id ? `0 0 14px ${t.accent}80` : undefined,
              }}
            />
          ))}
        </div>
      </Section>

      <Section label="Branding">
        <div className="grid grid-cols-2 gap-2">
          <ToggleButton active={!ctaMode} onClick={() => onCtaModeChange(false)}>
            Standard
          </ToggleButton>
          <ToggleButton active={ctaMode} onClick={() => onCtaModeChange(true)}>
            App Store CTA
          </ToggleButton>
        </div>
      </Section>

      <Section label="Header">
        <div className="space-y-3">
          <Field
            label="Title"
            value={data.title}
            onChange={(v) => patch({ title: v })}
            placeholder="Leaderboard"
            maxLength={40}
          />
          <label className="block">
            <span className="block text-[11px] font-mono tracking-[2px] text-driven-outline uppercase mb-1.5">
              Ranked by
            </span>
            <select
              value={data.metric}
              onChange={(e) => setMetric(e.target.value as LeaderboardMetric)}
              className="w-full rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-sm text-driven-text outline-none focus:border-driven-accent/60 focus:bg-driven-surface"
            >
              {LEADERBOARD_METRICS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Section>

      <Section label={`Drivers (${data.entries.length})`}>
        <p className="mb-3 text-[11px] leading-relaxed text-driven-outline">
          Top 3 get medals automatically. Toggle “You” to highlight a row.
          Reorder with ↑ ↓ — the list order is the ranking.
        </p>

        <div className="space-y-2">
          {data.entries.map((entry, i) => (
            <EntryRow
              key={entry.id}
              entry={entry}
              index={i}
              total={data.entries.length}
              unit={unit}
              metric={data.metric}
              onChange={(next) => updateEntry(entry.id, next)}
              onMove={(delta) => move(i, delta)}
              onRemove={() => remove(entry.id)}
              onSetYou={(on) => setYou(entry.id, on)}
              onError={setError}
              canRemove={data.entries.length > MIN_ENTRIES}
            />
          ))}
        </div>

        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-md border border-driven-warning/30 bg-driven-warning/10 px-3 py-2 text-xs text-driven-warning">
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)} aria-label="Dismiss">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <div className="mt-3 grid grid-cols-3 gap-2">
          <SmallButton onClick={addDriver} disabled={data.entries.length >= MAX_ENTRIES}>
            <UserPlus className="h-3.5 w-3.5" />
            Add
          </SmallButton>
          <SmallButton onClick={randomize}>
            <Shuffle className="h-3.5 w-3.5" />
            Randomize
          </SmallButton>
          <SmallButton
            onClick={() =>
              onDataChange((prev) => ({
                ...prev,
                entries: sortByValue(prev.entries, prev.metric),
              }))
            }
          >
            <SortDesc className="h-3.5 w-3.5" />
            Sort
          </SmallButton>
        </div>
      </Section>
    </div>
  );
}

function EntryRow({
  entry,
  index,
  total,
  unit,
  metric,
  onChange,
  onMove,
  onRemove,
  onSetYou,
  onError,
  canRemove,
}: {
  entry: LeaderboardEntry;
  index: number;
  total: number;
  unit: string;
  metric: LeaderboardMetric;
  onChange: (next: Partial<LeaderboardEntry>) => void;
  onMove: (delta: number) => void;
  onRemove: () => void;
  onSetYou: (on: boolean) => void;
  onError: (msg: string | null) => void;
  canRemove: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const pickPhoto = async (file: File | undefined) => {
    if (!file) return;
    onError(null);
    try {
      onChange({ photo: await readImageAsAvatar(file) });
    } catch (err) {
      onError((err as Error).message);
    }
    // Allow re-picking the same file.
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="rounded-lg border border-white/10 bg-driven-surface-low p-2.5">
      <div className="flex items-center gap-2">
        <span className="w-5 shrink-0 text-center font-mono text-xs text-driven-outline tabular-nums">
          {index + 1}
        </span>

        {/* Avatar picker */}
        <button
          onClick={() => fileRef.current?.click()}
          title={entry.photo ? "Replace photo" : "Add photo"}
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15 bg-driven-surface transition-colors hover:border-driven-accent/60"
        >
          {entry.photo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={entry.photo}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-mono text-xs text-driven-outline">
              {initialsOf(entry.name)}
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity hover:opacity-100">
            <ImagePlus className="h-4 w-4 text-driven-accent" />
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => pickPhoto(e.target.files?.[0])}
        />

        <input
          value={entry.name}
          maxLength={28}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Driver name"
          className="min-w-0 flex-1 rounded-md border border-white/10 bg-driven-surface px-2 py-1.5 text-sm text-driven-text outline-none focus:border-driven-accent/60"
        />

        <div className="flex items-center gap-1 shrink-0">
          <input
            type="number"
            value={entry.value}
            step={metric === "zeroToSixty" ? 0.01 : 1}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (!Number.isNaN(next)) onChange({ value: next });
            }}
            className="w-[68px] rounded-md border border-white/10 bg-driven-surface px-2 py-1.5 text-right font-mono text-sm text-driven-text outline-none focus:border-driven-accent/60 tabular-nums"
          />
          <span className="w-8 font-mono text-[10px] text-driven-outline">
            {unit}
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 pl-7">
        <input
          value={entry.location}
          maxLength={32}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="Location (optional)"
          className="min-w-0 flex-1 rounded-md border border-white/10 bg-driven-surface px-2 py-1.5 text-xs text-driven-text-secondary outline-none focus:border-driven-accent/60"
        />

        <button
          onClick={() => onSetYou(!entry.isYou)}
          className={`rounded-md border px-2 py-1.5 font-mono text-[10px] tracking-[1px] transition-colors ${
            entry.isYou
              ? "border-driven-accent bg-driven-accent/15 text-driven-accent"
              : "border-white/10 text-driven-outline hover:text-driven-text"
          }`}
        >
          YOU
        </button>

        {entry.photo && (
          <IconButton title="Remove photo" onClick={() => onChange({ photo: null })}>
            <ImagePlus className="h-3.5 w-3.5 rotate-45" />
          </IconButton>
        )}
        <IconButton
          title="Move up"
          onClick={() => onMove(-1)}
          disabled={index === 0}
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </IconButton>
        <IconButton
          title="Move down"
          onClick={() => onMove(1)}
          disabled={index === total - 1}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </IconButton>
        <IconButton title="Remove driver" onClick={onRemove} disabled={!canRemove}>
          <Trash2 className="h-3.5 w-3.5" />
        </IconButton>
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  title,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
      className="rounded-md border border-white/10 p-1.5 text-driven-text-secondary transition-colors hover:border-driven-accent/40 hover:text-driven-accent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-driven-text-secondary"
    >
      {children}
    </button>
  );
}

function SmallButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 font-mono text-[11px] uppercase tracking-[1px] text-driven-text-secondary transition-colors hover:border-driven-accent/30 hover:text-driven-accent disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
