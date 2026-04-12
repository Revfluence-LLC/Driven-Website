"use client";

import { useEffect, useRef, useState } from "react";

export function SpeedGauge() {
  const [speed, setSpeed] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const target = 72;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setSpeed(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible]);

  const radius = 90;
  const circumference = Math.PI * radius;
  const progress = speed / 120;
  const dashOffset = circumference * (1 - progress);

  return (
    <div ref={ref} className="relative w-64 h-64 sm:w-80 sm:h-80">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        {/* Background arc */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#31353C"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={0}
          opacity="0.5"
          className="[stroke-dashoffset:0]"
          style={{
            strokeDasharray: `${circumference * 0.75} ${circumference * 0.25}`,
            transform: "rotate(135deg)",
            transformOrigin: "center",
          }}
        />
        {/* Active arc */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          style={{
            strokeDasharray: `${circumference * 0.75} ${circumference * 0.25}`,
            strokeDashoffset: visible ? dashOffset : circumference * 0.75,
            transform: "rotate(135deg)",
            transformOrigin: "center",
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C3F5FF" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl sm:text-7xl font-bold text-white text-glow font-mono tabular-nums">
          {speed}
        </span>
        <span className="text-sm font-mono tracking-[4px] text-driven-accent/60 uppercase mt-1">
          MPH
        </span>
      </div>

      {/* Glow effect */}
      {visible && (
        <div className="absolute inset-0 rounded-full bg-driven-accent/5 blur-3xl animate-pulse pointer-events-none" />
      )}
    </div>
  );
}
