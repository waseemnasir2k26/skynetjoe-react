"use client";

/**
 * Before/After drag-to-compare slider.
 * Owns picker state + drag handle. Pure client, no API, no persistence.
 *
 * UX rules:
 *  - Desktop: drag handle horizontally to reveal more/less of each side.
 *  - Mobile: tap left/right half to toggle 100/0 (drag unreliable on touch).
 *  - prefers-reduced-motion: lock at 50/50, no animation, no drag transition.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Hand } from "lucide-react";
import { SCENARIOS, type Scenario } from "@/data/before-after-scenarios";

const CAL_URL = "https://cal.com/skynetjoe/30min";

export default function Slider() {
  const [activeSlug, setActiveSlug] = useState<string>(SCENARIOS[0].slug);
  const [position, setPosition] = useState<number>(50); // 0 = all manual, 100 = all automated
  const [dragging, setDragging] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const active = useMemo<Scenario>(
    () => SCENARIOS.find((s) => s.slug === activeSlug) ?? SCENARIOS[0],
    [activeSlug],
  );

  // a11y + capability sniffing
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);

    // Treat coarse pointer as touch-mode (mobile tap fallback)
    const touchMq = window.matchMedia("(pointer: coarse)");
    setIsTouch(touchMq.matches);
    const onTouch = () => setIsTouch(touchMq.matches);
    touchMq.addEventListener?.("change", onTouch);

    return () => {
      mq.removeEventListener?.("change", onChange);
      touchMq.removeEventListener?.("change", onTouch);
    };
  }, []);

  // Snap to 50 when reduce-motion flips on
  useEffect(() => {
    if (reduceMotion) setPosition(50);
  }, [reduceMotion]);

  // Reset position when scenario changes
  useEffect(() => {
    setPosition(reduceMotion ? 50 : 50);
  }, [activeSlug, reduceMotion]);

  // Drag handlers
  const updateFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  };

  useEffect(() => {
    if (!dragging || reduceMotion) return;
    const onMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updateFromClientX(e.touches[0].clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, reduceMotion]);

  // Touch tap toggles (mobile fallback)
  const onTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTouch || reduceMotion) return;
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setPosition(x / rect.width < 0.5 ? 100 : 0); // tap LEFT → show all automated, tap RIGHT → show all manual
  };

  // Keyboard a11y
  const onHandleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div className="space-y-12">
      {/* PICKER */}
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
          Pick a scenario
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SCENARIOS.map((s) => {
            const isActive = s.slug === activeSlug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setActiveSlug(s.slug)}
                aria-pressed={isActive}
                className={`text-left rounded-2xl p-4 border transition group ${
                  isActive
                    ? "border-cyan-300/60 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-300/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5" aria-hidden>
                    {s.icon}
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200/80 mb-1">
                      {s.category}
                    </div>
                    <div
                      className={`font-extrabold text-base ${
                        isActive ? "text-white" : "text-white/90"
                      }`}
                    >
                      {s.title}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SLIDER */}
      <div>
        <div className="flex items-end justify-between mb-3 gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-1">
              {active.category}
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {active.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setPosition(50)}
            className="inline-flex items-center gap-1.5 text-xs text-cyan-200 hover:text-white px-2 py-1 rounded-md border border-cyan-300/30 hover:border-cyan-300/60"
            aria-label="Reset slider to center"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        <p className="text-xs text-white/60 mb-4 inline-flex items-center gap-1.5">
          <Hand className="w-3.5 h-3.5" />
          {isTouch
            ? "Tap the left or right side to flip the view."
            : reduceMotion
              ? "Reduced motion is on. Both sides shown side by side."
              : "Drag the handle. Or use arrow keys."}
        </p>

        <div
          ref={trackRef}
          onClick={onTrackClick}
          className="relative overflow-hidden rounded-3xl border border-white/10 select-none"
          style={{
            // Use CSS height for consistent ratio; mobile uses smaller pad
            minHeight: "520px",
            background:
              "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
            cursor: dragging ? "grabbing" : isTouch ? "pointer" : "grab",
          }}
        >
          {/* MANUAL SIDE (left, revealed by 0..position%) */}
          <div
            className="absolute inset-0 p-6 md:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(127,29,29,0.55) 0%, rgba(67,20,20,0.65) 100%)",
            }}
          >
            <Panel side="manual" data={active.manual} />
          </div>

          {/* AUTOMATED SIDE (right, revealed by clipping from position%) */}
          <div
            className="absolute inset-0 p-6 md:p-10"
            style={{
              clipPath: `inset(0 0 0 ${position}%)`,
              transition: reduceMotion ? "none" : dragging ? "none" : "clip-path 120ms ease-out",
              background:
                "linear-gradient(135deg, rgba(10,45,74,0.85) 0%, rgba(7,56,70,0.85) 100%)",
            }}
          >
            <Panel side="automated" data={active.automated} />
          </div>

          {/* DIVIDER LINE */}
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{
              left: `${position}%`,
              background:
                "linear-gradient(180deg, rgba(126,228,255,0.85) 0%, rgba(94,234,212,0.85) 100%)",
              boxShadow: "0 0 12px rgba(0,212,255,0.5)",
              transform: "translateX(-0.5px)",
              transition: reduceMotion || dragging ? "none" : "left 120ms ease-out",
              display: reduceMotion ? "none" : "block",
            }}
          />

          {/* DRAG HANDLE */}
          {!reduceMotion && !isTouch && (
            <div
              role="slider"
              tabIndex={0}
              aria-label="Compare manual versus automated"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              onMouseDown={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onTouchStart={() => setDragging(true)}
              onKeyDown={onHandleKey}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
              style={{
                left: `${position}%`,
                transition: dragging ? "none" : "left 120ms ease-out",
              }}
            >
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E88E5] to-[#14B8A6] flex items-center justify-center shadow-[0_0_24px_rgba(0,212,255,0.7)] cursor-grab active:cursor-grabbing ring-2 ring-white/40"
                aria-hidden
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="15 18 9 12 15 6" />
                  <polyline points="9 18 15 12 9 6" transform="translate(0,0)" />
                </svg>
              </div>
            </div>
          )}

          {/* CORNER LABELS */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-red-500/30 border border-red-300/40 text-red-100 z-[5]">
            Manual
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-cyan-400/25 border border-cyan-300/50 text-cyan-100 z-[5]">
            Automated
          </div>
        </div>
      </div>

      {/* KPI TILES */}
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
          The delta
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {active.kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200/80 mb-2">
                {k.label}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm text-red-300/90 line-through decoration-red-400/60">
                  {k.before}
                </span>
                <span className="text-white/40 text-xs">→</span>
                <span className="text-lg font-extrabold text-white">{k.after}</span>
              </div>
              <div className="text-xs text-emerald-300 font-semibold">
                {k.delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-3xl p-8 md:p-10 text-center"
        style={{
          background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
        }}
      >
        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
          Want this for your business?
        </h3>
        <p className="text-white/90 mb-6 max-w-xl mx-auto">
          30-minute call, no slides, no funnel. Tell me the workflow that wastes
          your week — I&apos;ll sketch the automation on the call.
        </p>
        <Link
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-cyan-50 transition"
        >
          Book a 30-min call
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

type ManualData = Scenario["manual"];
type AutomatedData = Scenario["automated"];

function Panel({
  side,
  data,
}: {
  side: "manual" | "automated";
  data: ManualData | AutomatedData;
}) {
  if (side === "manual") {
    const d = data as ManualData;
    return (
      <div className="flex flex-col h-full text-white">
        <div className="mb-3 text-3xl" aria-hidden>
          {d.mood}
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-red-100">
          {d.headline}
        </h3>
        <p className="text-sm md:text-base text-red-50/85 mb-4 max-w-md">{d.sub}</p>
        <ul className="space-y-1.5 mb-4">
          {d.pains.map((p) => (
            <li
              key={p}
              className="text-sm text-red-50/90 flex items-start gap-2 leading-snug"
            >
              <span className="text-red-300 mt-0.5" aria-hidden>
                ✕
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 border-t border-red-300/20 grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-red-200/70 uppercase tracking-wider text-[10px] mb-0.5">
              Time
            </div>
            <div className="font-semibold text-red-50">{d.timestamp}</div>
          </div>
          <div>
            <div className="text-red-200/70 uppercase tracking-wider text-[10px] mb-0.5">
              Cost
            </div>
            <div className="font-semibold text-red-50">{d.cost}</div>
          </div>
        </div>
      </div>
    );
  }

  const d = data as AutomatedData;
  return (
    <div className="flex flex-col h-full text-white items-end text-right">
      <div className="mb-3 text-3xl" aria-hidden>
        {d.mood}
      </div>
      <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-cyan-100">
        {d.headline}
      </h3>
      <p className="text-sm md:text-base text-cyan-50/85 mb-4 max-w-md">{d.sub}</p>
      <ul className="space-y-1.5 mb-4 w-full">
        {d.wins.map((w) => (
          <li
            key={w}
            className="text-sm text-cyan-50/90 flex items-start gap-2 leading-snug justify-end"
          >
            <span className="order-2 text-emerald-300 mt-0.5" aria-hidden>
              ✓
            </span>
            <span className="order-1">{w}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4 border-t border-cyan-300/20 grid grid-cols-2 gap-3 text-xs w-full">
        <div>
          <div className="text-cyan-200/70 uppercase tracking-wider text-[10px] mb-0.5">
            Output
          </div>
          <div className="font-semibold text-cyan-50">{d.metric}</div>
        </div>
        <div>
          <div className="text-cyan-200/70 uppercase tracking-wider text-[10px] mb-0.5">
            Cost
          </div>
          <div className="font-semibold text-cyan-50">{d.cost}</div>
        </div>
      </div>
    </div>
  );
}
