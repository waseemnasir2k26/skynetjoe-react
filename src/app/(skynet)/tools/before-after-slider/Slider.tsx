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

const CAL_URL = "https://calendly.com/skynetlabs/schedule-a-free-consultation";

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
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
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
                    ? "border-[rgba(198,107,63,0.50)] bg-[rgba(198,107,63,0.10)]"
                    : "border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] hover:bg-[var(--cream-2)] hover:border-[rgba(198,107,63,0.30)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5" aria-hidden>
                    {s.icon}
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]/80 mb-1">
                      {s.category}
                    </div>
                    <div
                      className={`font-extrabold text-base ${
                        isActive ? "text-[var(--ink)]" : "text-[var(--ink-2)]"
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
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-1">
              {active.category}
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
              {active.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setPosition(50)}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--terracotta-aa)] hover:text-[var(--ink)] px-2 py-1 rounded-md border border-[rgba(198,107,63,0.30)] hover:border-[rgba(198,107,63,0.50)]"
            aria-label="Reset slider to center"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        <p className="text-xs text-[var(--ink)]/60 mb-4 inline-flex items-center gap-1.5">
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
          className="relative overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] select-none"
          style={{
            // Use CSS height for consistent ratio; mobile uses smaller pad
            minHeight: "520px",
            background:
              "var(--cream-3)",
            cursor: dragging ? "grabbing" : isTouch ? "pointer" : "grab",
          }}
        >
          {/* MANUAL SIDE (left, revealed by 0..position%) — "before" / pain */}
          <div
            className="absolute inset-0 p-6 md:p-10"
            style={{
              background: "var(--cream-2)",
            }}
          >
            <Panel side="manual" data={active.manual} />
          </div>

          {/* AUTOMATED SIDE (right, revealed by clipping from position%) — "after" / win */}
          <div
            className="absolute inset-0 p-6 md:p-10"
            style={{
              clipPath: `inset(0 0 0 ${position}%)`,
              transition: reduceMotion ? "none" : dragging ? "none" : "clip-path 120ms ease-out",
              background: "var(--cream-3)",
            }}
          >
            <Panel side="automated" data={active.automated} />
          </div>

          {/* DIVIDER LINE */}
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{
              left: `${position}%`,
              background: "var(--terracotta)",
              boxShadow: "0 0 12px rgba(198,107,63,0.35)",
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
                className="w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
                style={{
                  background: "var(--terracotta)",
                  border: "1px solid var(--ink)",
                }}
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
                  className="text-[var(--cream-3)]"
                >
                  <polyline points="15 18 9 12 15 6" />
                  <polyline points="9 18 15 12 9 6" transform="translate(0,0)" />
                </svg>
              </div>
            </div>
          )}

          {/* CORNER LABELS */}
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] z-[5]"
            style={{
              background: "rgba(107,44,44,0.10)",
              border: "1px solid rgba(107,44,44,0.30)",
              color: "var(--oxblood)",
            }}
          >
            Manual · Before
          </div>
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] z-[5]"
            style={{
              background: "rgba(138,154,123,0.15)",
              border: "1px solid rgba(138,154,123,0.40)",
              color: "var(--sage)",
            }}
          >
            Automated · After
          </div>
        </div>
      </div>

      {/* KPI TILES */}
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
          The delta
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {active.kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-4"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]/80 mb-2">
                {k.label}
              </div>
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <span
                  className="text-sm line-through"
                  style={{
                    color: "var(--oxblood)",
                    textDecorationColor: "rgba(107,44,44,0.55)",
                  }}
                >
                  {k.before}
                </span>
                <span className="text-[var(--ink-faint)] text-xs">→</span>
                <span
                  className="text-2xl font-extrabold text-[var(--ink)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {k.after}
                </span>
              </div>
              <div
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] rounded-full px-2 py-0.5"
                style={{
                  background: "rgba(198,107,63,0.12)",
                  color: "var(--terracotta-aa)",
                  border: "1px solid rgba(198,107,63,0.30)",
                }}
              >
                ▲ {k.delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-3xl p-8 md:p-10 text-center border border-[rgba(26,26,26,0.12)]"
        style={{
          background: "var(--cream-2)",
        }}
      >
        <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] mb-3">
          Want this for your business?
        </h3>
        <p className="text-[var(--ink-2)] mb-6 max-w-xl mx-auto">
          30-minute call, no slides, no funnel. Tell me the workflow that wastes
          your week — I&apos;ll sketch the automation on the call.
        </p>
        <Link
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition hover:opacity-90"
          style={{ background: "var(--terracotta)", color: "var(--cream-3)" }}
        >
          Book a 30-min call
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FEEDBACK FORM */}
      <div className="mt-12 rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta-aa)] mb-2">
          — Feedback · 30-second form
        </p>
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--ink)] mb-2">
          What should this tool do next?
        </h3>
        <p className="text-sm text-[var(--ink-2)] mb-4">
          One missing field, one weird output, one tool you wish existed — tell me. I read every reply.
        </p>
        <form action="/api/tool-feedback" method="POST" className="space-y-3">
          <input type="hidden" name="tool" value="before-after-slider" />
          <textarea
            name="message"
            required
            rows={3}
            placeholder="What should we improve, fix, or build?"
            className="w-full bg-[var(--cream-3)] border border-[rgba(26,26,26,0.18)] focus:border-[var(--terracotta)] rounded-xl px-4 py-3 text-[var(--ink)] placeholder:text-[var(--ink-faint)] text-sm font-mono focus:outline-none transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional — only if you want a reply)"
            className="w-full bg-[var(--cream-3)] border border-[rgba(26,26,26,0.18)] focus:border-[var(--terracotta)] rounded-xl px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-faint)] text-sm focus:outline-none transition"
          />
          <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-[var(--cream-3)] hover:opacity-90 transition" style={{ background: "var(--terracotta)" }}>
            Send feedback →
          </button>
        </form>
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
      <div className="flex flex-col h-full text-[var(--ink)]">
        <div className="mb-3 text-3xl" aria-hidden>
          {d.mood}
        </div>
        <h3
          className="text-xl md:text-2xl font-extrabold mb-2"
          style={{ color: "var(--oxblood)" }}
        >
          {d.headline}
        </h3>
        <p className="text-sm md:text-base text-[var(--ink-2)] mb-4 max-w-md">
          {d.sub}
        </p>
        <ul className="space-y-1.5 mb-4">
          {d.pains.map((p) => (
            <li
              key={p}
              className="text-sm text-[var(--ink-2)] flex items-start gap-2 leading-snug"
            >
              <span
                className="mt-0.5"
                style={{ color: "var(--oxblood)" }}
                aria-hidden
              >
                ✕
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 border-t border-[rgba(107,44,44,0.20)] grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-[var(--ink-faint)] uppercase tracking-wider text-[10px] mb-0.5">
              Time
            </div>
            <div className="font-semibold text-[var(--ink)]">{d.timestamp}</div>
          </div>
          <div>
            <div className="text-[var(--ink-faint)] uppercase tracking-wider text-[10px] mb-0.5">
              Cost
            </div>
            <div className="font-semibold text-[var(--ink)]">{d.cost}</div>
          </div>
        </div>
      </div>
    );
  }

  const d = data as AutomatedData;
  return (
    <div className="flex flex-col h-full text-[var(--ink)] items-end text-right">
      <div className="mb-3 text-3xl" aria-hidden>
        {d.mood}
      </div>
      <h3
        className="text-xl md:text-2xl font-extrabold mb-2"
        style={{ color: "var(--sage)" }}
      >
        {d.headline}
      </h3>
      <p className="text-sm md:text-base text-[var(--ink-2)] mb-4 max-w-md">
        {d.sub}
      </p>
      <ul className="space-y-1.5 mb-4 w-full">
        {d.wins.map((w) => (
          <li
            key={w}
            className="text-sm text-[var(--ink-2)] flex items-start gap-2 leading-snug justify-end"
          >
            <span
              className="order-2 mt-0.5"
              style={{ color: "var(--sage)" }}
              aria-hidden
            >
              ✓
            </span>
            <span className="order-1">{w}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4 border-t border-[rgba(138,154,123,0.30)] grid grid-cols-2 gap-3 text-xs w-full">
        <div>
          <div className="text-[var(--ink-faint)] uppercase tracking-wider text-[10px] mb-0.5">
            Output
          </div>
          <div className="font-semibold text-[var(--ink)]">{d.metric}</div>
        </div>
        <div>
          <div className="text-[var(--ink-faint)] uppercase tracking-wider text-[10px] mb-0.5">
            Cost
          </div>
          <div className="font-semibold text-[var(--ink)]">{d.cost}</div>
        </div>
      </div>
    </div>
  );
}
