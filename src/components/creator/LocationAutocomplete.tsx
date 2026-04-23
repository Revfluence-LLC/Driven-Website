"use client";

import { useEffect, useRef, useState } from "react";
import { searchLocations, type LocationSuggestion } from "./geocode";
import type { LatLng } from "./types";

type Props = {
  label: string;
  value: string;
  onSelect: (name: string, coord: LatLng) => void;
};

export function LocationAutocomplete({ label, value, onSelect }: Props) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const typedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // External value changes (Random Route, suggestion pick) sync into the input
  // and clear the "typed by user" flag so we don't auto-search.
  useEffect(() => {
    setQuery(value);
    typedRef.current = false;
    setSuggestions([]);
    setOpen(false);
  }, [value]);

  // Debounced geocode search, only when the user actively typed.
  useEffect(() => {
    if (!typedRef.current) return;
    if (query.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const t = setTimeout(async () => {
      setLoading(true);
      const results = await searchLocations(query, controller.signal);
      if (controller.signal.aborted) return;
      setLoading(false);
      setSuggestions(results);
      setOpen(results.length > 0);
    }, 250);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  const onInput = (next: string) => {
    typedRef.current = true;
    setQuery(next);
  };

  const pick = (s: LocationSuggestion) => {
    if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    typedRef.current = false;
    setQuery(s.name);
    setOpen(false);
    setSuggestions([]);
    onSelect(s.name, s.coord);
  };

  return (
    <div className="relative">
      <label className="block">
        <span className="block text-[11px] font-mono tracking-[2px] text-driven-outline uppercase mb-1.5">
          {label}
        </span>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => onInput(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setOpen(true);
            }}
            onBlur={() => {
              blurTimerRef.current = setTimeout(() => setOpen(false), 150);
            }}
            placeholder="Search a city…"
            autoComplete="off"
            className="w-full rounded-md border border-white/10 bg-driven-surface-low px-3 py-2 text-sm text-driven-text outline-none focus:border-driven-accent/60 focus:bg-driven-surface"
          />
          {loading && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-[1px] text-driven-outline">
              …
            </span>
          )}
        </div>
      </label>
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-md border border-white/10 bg-driven-bg-deep shadow-2xl max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={`${s.name}-${s.coord[0]}-${s.coord[1]}-${i}`}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(s)}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-driven-surface border-b border-white/5 last:border-b-0"
            >
              <div className="font-medium text-driven-text">{s.name}</div>
              {s.secondary && (
                <div className="text-xs text-driven-text-secondary mt-0.5">
                  {s.secondary}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
