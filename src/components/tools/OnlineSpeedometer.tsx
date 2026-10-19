"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Square, RotateCcw, Maximize2, X, FlipHorizontal, Bell, BellOff } from "lucide-react";

type Unit = "mph" | "kmh" | "knots";
type Status = "idle" | "requesting" | "active" | "denied" | "unsupported" | "error";

const UNITS: Record<Unit, { label: string; factor: number; distLabel: string; distFactor: number; scale: number }> = {
  mph: { label: "MPH", factor: 2.236936, distLabel: "mi", distFactor: 1 / 1609.344, scale: 120 },
  kmh: { label: "KM/H", factor: 3.6, distLabel: "km", distFactor: 1 / 1000, scale: 200 },
  knots: { label: "KNOTS", factor: 1.943844, distLabel: "nm", distFactor: 1 / 1852, scale: 60 },
};

/** Below this (m/s, ~1.1 mph) GPS jitter dominates, so we treat the device as stationary. */
const MOVING_THRESHOLD = 0.5;
/** Fixes worse than this (meters) are too noisy to add to distance or derive speed from. */
const MAX_ACCURACY = 50;

function defaultUnit(): Unit {
  if (typeof navigator === "undefined") return "mph";
  const region = (navigator.language.split("-")[1] || "").toUpperCase();
  return ["US", "GB", "LR", "MM"].includes(region) ? "mph" : "kmh";
}

function haversine(a: GeolocationCoordinates, b: GeolocationCoordinates) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function formatDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function beep() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    osc.onended = () => ctx.close();
  } catch {
    // Audio is a nice-to-have; ignore browsers that block it.
  }
}

export function OnlineSpeedometer() {
  const [unit, setUnit] = useState<Unit>("mph");
  const [status, setStatus] = useState<Status>("idle");
  const [speed, setSpeed] = useState(0); // m/s
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [distance, setDistance] = useState(0); // meters
  const [movingMs, setMovingMs] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [hud, setHud] = useState(false);
  const [mirror, setMirror] = useState(false);
  const [limit, setLimit] = useState<number | "">("");
  const [alertOn, setAlertOn] = useState(false);

  const watchId = useRef<number | null>(null);
  const last = useRef<GeolocationPosition | null>(null);
  const startedAt = useRef<number>(0);
  const wakeLock = useRef<WakeLockSentinel | null>(null);
  const wasOver = useRef(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("speedometer-unit");
    } catch {}
    setUnit(saved && saved in UNITS ? (saved as Unit) : defaultUnit());
    if (typeof navigator !== "undefined" && !("geolocation" in navigator)) setStatus("unsupported");
  }, []);

  const chooseUnit = (u: Unit) => {
    setUnit(u);
    try {
      localStorage.setItem("speedometer-unit", u);
    } catch {}
  };

  const releaseWakeLock = () => {
    wakeLock.current?.release().catch(() => {});
    wakeLock.current = null;
  };

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) wakeLock.current = await navigator.wakeLock.request("screen");
    } catch {
      // Not supported or denied (e.g. low battery); the screen may dim, which is fine.
    }
  };

  const onPosition = useCallback((pos: GeolocationPosition) => {
    setStatus("active");
    setAccuracy(pos.coords.accuracy);
    const prev = last.current;
    const good = pos.coords.accuracy <= MAX_ACCURACY;

    let v: number | null = pos.coords.speed != null && pos.coords.speed >= 0 ? pos.coords.speed : null;
    let segment = 0;
    let dt = 0;
    if (prev) {
      dt = (pos.timestamp - prev.timestamp) / 1000;
      if (dt > 0 && good && prev.coords.accuracy <= MAX_ACCURACY) {
        segment = haversine(prev.coords, pos.coords);
        // Browsers without Doppler speed (most desktops) only give positions, so derive it.
        if (v == null) v = segment / dt;
      }
    }
    const current = v != null && v >= MOVING_THRESHOLD ? v : 0;

    setSpeed(current);
    if (current > 0) {
      setMaxSpeed((m) => Math.max(m, current));
      setDistance((d) => d + segment);
      if (dt > 0 && dt < 10) setMovingMs((t) => t + dt * 1000);
    }
    if (good || !prev) last.current = pos;
  }, []);

  const start = () => {
    if (!("geolocation" in navigator)) return setStatus("unsupported");
    setStatus("requesting");
    startedAt.current = Date.now() - elapsedMs;
    watchId.current = navigator.geolocation.watchPosition(
      onPosition,
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
          stop();
        } else if (err.code !== err.TIMEOUT) {
          setStatus("error");
        }
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
    );
    requestWakeLock();
  };

  const stop = () => {
    if (watchId.current != null) navigator.geolocation.clearWatch(watchId.current);
    watchId.current = null;
    last.current = null;
    setSpeed(0);
    setStatus((s) => (s === "active" || s === "requesting" ? "idle" : s));
    releaseWakeLock();
  };

  const reset = () => {
    setMaxSpeed(0);
    setDistance(0);
    setMovingMs(0);
    setElapsedMs(0);
    startedAt.current = Date.now();
  };

  // Trip timer.
  useEffect(() => {
    if (status !== "active" && status !== "requesting") return;
    const id = setInterval(() => setElapsedMs(Date.now() - startedAt.current), 1000);
    return () => clearInterval(id);
  }, [status]);

  // Re-acquire the wake lock when the tab becomes visible again (browsers drop it on hide).
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && watchId.current != null) requestWakeLock();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  useEffect(() => () => stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const u = UNITS[unit];
  const display = Math.round(speed * u.factor);
  const limitNum = typeof limit === "number" ? limit : null;
  const over = limitNum != null && display > limitNum;

  useEffect(() => {
    if (over && !wasOver.current && alertOn) beep();
    wasOver.current = over;
  }, [over, alertOn]);

  const openHud = async () => {
    setHud(true);
    try {
      await document.documentElement.requestFullscreen?.();
    } catch {}
  };
  const closeHud = async () => {
    setHud(false);
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch {}
  };

  const running = status === "active" || status === "requesting";
  const scale = Math.max(u.scale, Math.ceil((maxSpeed * u.factor) / 20) * 20);
  const radius = 90;
  const arc = 2 * Math.PI * radius * 0.75;
  const fill = Math.min(display / scale, 1);
  const accent = over ? "#FF5A5A" : "#00E5FF";
  const avg = movingMs > 0 ? (distance / (movingMs / 1000)) * u.factor : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-driven-surface-low p-5 sm:p-8">
      {/* Unit picker */}
      <div className="flex justify-center mb-6">
        <div role="radiogroup" aria-label="Speed unit" className="inline-flex rounded-lg bg-driven-bg p-1 border border-white/5">
          {(Object.keys(UNITS) as Unit[]).map((k) => (
            <button
              key={k}
              role="radio"
              aria-checked={unit === k}
              onClick={() => chooseUnit(k)}
              className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold tracking-[2px] transition-colors ${
                unit === k ? "bg-driven-accent text-driven-bg-deep" : "text-driven-text-secondary hover:text-driven-accent"
              }`}
            >
              {UNITS[k].label}
            </button>
          ))}
        </div>
      </div>

      {/* Gauge */}
      <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80">
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
          <circle
            cx="100" cy="100" r={radius} fill="none" stroke="#31353C" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${arc} ${2 * Math.PI * radius}`} transform="rotate(135 100 100)" opacity="0.6"
          />
          <circle
            cx="100" cy="100" r={radius} fill="none" stroke={accent} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${arc * fill} ${2 * Math.PI * radius}`} transform="rotate(135 100 100)"
            opacity={fill > 0 ? 1 : 0}
            style={{ transition: "stroke-dasharray 0.6s ease-out, stroke 0.3s" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" aria-live="polite">
          <span className="text-7xl sm:text-8xl font-bold font-mono tabular-nums text-white" style={{ textShadow: `0 0 24px ${accent}80` }}>
            {display}
          </span>
          <span className="text-sm font-mono tracking-[4px] mt-1" style={{ color: accent }}>
            {u.label}
          </span>
          <span className="mt-3 text-[11px] font-mono text-driven-outline">
            {status === "requesting" && "Waiting for GPS…"}
            {status === "active" && accuracy != null && (
              <>
                GPS ±{Math.round(accuracy)} m{" "}
                <span className={accuracy <= 15 ? "text-driven-green" : accuracy <= MAX_ACCURACY ? "text-yellow-300" : "text-red-400"}>●</span>
              </>
            )}
            {status === "idle" && "0 – " + scale + " " + u.label.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Status messages */}
      {status === "denied" && (
        <p className="mt-4 text-center text-sm text-driven-warning">
          Location access was blocked. Allow location for this site in your browser settings, then press Start again.
        </p>
      )}
      {status === "unsupported" && (
        <p className="mt-4 text-center text-sm text-driven-warning">This browser doesn&rsquo;t support GPS location.</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-center text-sm text-driven-warning">
          Couldn&rsquo;t get a GPS fix. Move somewhere with a clear view of the sky.
        </p>
      )}

      {/* Controls */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {running ? (
          <button onClick={stop} className="inline-flex items-center gap-2 rounded-md border border-red-400/40 px-6 py-3 text-sm font-bold uppercase tracking-[2px] text-red-300 hover:bg-red-400/10">
            <Square className="h-4 w-4" /> Stop
          </button>
        ) : (
          <button onClick={start} className="inline-flex items-center gap-2 rounded-md bg-driven-accent px-6 py-3 text-sm font-bold uppercase tracking-[2px] text-driven-bg-deep hover:scale-105 transition-transform glow-accent">
            <Play className="h-4 w-4" /> Start speedometer
          </button>
        )}
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm text-driven-text hover:border-driven-accent/40 hover:text-driven-accent">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button onClick={openHud} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm text-driven-text hover:border-driven-accent/40 hover:text-driven-accent">
          <Maximize2 className="h-4 w-4" /> HUD mode
        </button>
      </div>

      {/* Stats */}
      <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ["Max speed", `${Math.round(maxSpeed * u.factor)} ${u.label.toLowerCase()}`],
          ["Avg moving", `${Math.round(avg)} ${u.label.toLowerCase()}`],
          ["Distance", `${(distance * u.distFactor).toFixed(2)} ${u.distLabel}`],
          ["Time", formatDuration(elapsedMs)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-driven-bg border border-white/5 p-3 text-center">
            <dt className="text-[10px] font-mono uppercase tracking-[2px] text-driven-outline">{k}</dt>
            <dd className="mt-1 text-lg font-mono font-semibold tabular-nums text-driven-text">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Speed alert */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-driven-text-secondary">
        <label htmlFor="limit">Speed alert above</label>
        <input
          id="limit"
          type="number"
          inputMode="numeric"
          min={1}
          max={400}
          placeholder="—"
          value={limit}
          onChange={(e) => setLimit(e.target.value === "" ? "" : Math.max(1, Number(e.target.value)))}
          className="w-20 rounded-md bg-driven-bg border border-white/10 px-2 py-1.5 text-center font-mono text-driven-text focus:outline-none focus:border-driven-accent"
        />
        <span>{u.label.toLowerCase()}</span>
        <button
          onClick={() => setAlertOn((a) => !a)}
          aria-pressed={alertOn}
          aria-label={alertOn ? "Turn alert sound off" : "Turn alert sound on"}
          className={`rounded-md border px-2.5 py-1.5 ${alertOn ? "border-driven-accent/50 text-driven-accent" : "border-white/10"}`}
        >
          {alertOn ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        </button>
      </div>

      {/* HUD overlay */}
      {hud && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center select-none">
          <div style={{ transform: mirror ? "scaleX(-1)" : undefined }} className="flex flex-col items-center">
            <span className="font-mono font-bold tabular-nums leading-none" style={{ fontSize: "min(42vw, 60vh)", color: accent, textShadow: `0 0 40px ${accent}90` }}>
              {display}
            </span>
            <span className="font-mono tracking-[0.5em] text-2xl sm:text-4xl" style={{ color: accent }}>
              {u.label}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={() => setMirror((m) => !m)} aria-pressed={mirror} className="rounded-md border border-white/20 px-3 py-2 text-sm text-white/80 inline-flex items-center gap-2">
              <FlipHorizontal className="h-4 w-4" /> Mirror
            </button>
            <button onClick={closeHud} aria-label="Close HUD" className="rounded-md border border-white/20 p-2 text-white/80">
              <X className="h-5 w-5" />
            </button>
          </div>
          {!running && (
            <button onClick={start} className="absolute bottom-8 rounded-md bg-driven-accent px-6 py-3 text-sm font-bold uppercase tracking-[2px] text-driven-bg-deep">
              Start speedometer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
