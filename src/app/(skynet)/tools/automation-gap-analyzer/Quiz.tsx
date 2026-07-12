"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Calculator,
  CalendarCheck,
  Check,
  Copy,
  Loader2,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import {
  QUESTIONS,
  TOTAL_QUESTIONS,
  MAX_RAW_SCORE,
  AXES,
  bucketForScore,
  buildCalculatorParams,
  buildBookingParams,
  computeSubscores,
  normalizedScore,
  weakestAxis,
  impliedManualHours,
  type Axis,
  type AxisMeta,
  type Bucket,
} from "@/data/automation-gap-questions";
import EmailGate from "@/components/cta/EmailGate";

const STORAGE_KEY = "skynet:automation-gap:v1";
const RESULT_TTL_MS = 14 * 24 * 60 * 60 * 1000;
const CAL_URL = "https://calendly.com/skynetlabs/schedule-a-free-consultation";

type Phase = "quiz" | "loading" | "result";

type SavedState = {
  step: number;
  answers: Record<string, string>;
  scores: Record<string, number>;
  result?: {
    score: number;
    bucket: string;
    savedAt: number;
  };
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>("quiz");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [savedToast, setSavedToast] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [shared, setShared] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  /* hydrate */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlResult = params.get("result");
    if (urlResult) {
      const raw = Math.max(0, Math.min(100, Number(urlResult) || 0));
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const saved = JSON.parse(stored) as SavedState;
          if (
            saved.scores &&
            Object.keys(saved.scores).length === TOTAL_QUESTIONS
          ) {
            const total = Object.values(saved.scores).reduce(
              (a, b) => a + b,
              0,
            );
            // reuse local scores only when they reproduce the shared score —
            // otherwise the URL score wins over a stale local result
            if (normalizedScore(total) === raw) {
              setScores(saved.scores);
              setAnswers(saved.answers ?? {});
              setPhase("result");
              setHydrated(true);
              return;
            }
          }
        }
      } catch {
        /* ignore */
      }
      // fake even-split for shared link with no local context
      const target = (raw / 100) * MAX_RAW_SCORE;
      const evenSplit: Record<string, number> = {};
      QUESTIONS.forEach((q) => {
        evenSplit[q.id] = Math.round(target / TOTAL_QUESTIONS);
      });
      setShared(true);
      setScores(evenSplit);
      setPhase("result");
      setHydrated(true);
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const saved = JSON.parse(stored) as SavedState;
        if (saved.result && Date.now() - saved.result.savedAt > RESULT_TTL_MS) {
          window.localStorage.removeItem(STORAGE_KEY);
        } else if (saved.result) {
          setAnswers(saved.answers ?? {});
          setScores(saved.scores ?? {});
          setPhase("result");
          setHydrated(true);
          return;
        } else if (typeof saved.step === "number") {
          setStep(Math.min(saved.step, QUESTIONS.length - 1));
          setAnswers(saved.answers ?? {});
          setScores(saved.scores ?? {});
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  /* persist — never for shared-link views (approximated scores) */
  useEffect(() => {
    if (!hydrated || shared) return;
    try {
      const payload: SavedState = { step, answers, scores };
      if (phase === "result") {
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        payload.result = {
          score: normalizedScore(total),
          bucket: bucketForScore(normalizedScore(total)).key,
          savedAt: Date.now(),
        };
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore */
    }
  }, [step, answers, scores, phase, hydrated]);

  const rawTotal = useMemo(
    () => Object.values(scores).reduce((a, b) => a + b, 0),
    [scores],
  );
  const totalScore = useMemo(() => normalizedScore(rawTotal), [rawTotal]);
  const subscores = useMemo(() => computeSubscores(scores), [scores]);
  const bucket: Bucket = useMemo(
    () => bucketForScore(totalScore),
    [totalScore],
  );
  const weakest = useMemo(() => weakestAxis(subscores), [subscores]);

  const current = QUESTIONS[step];
  const progressPct = ((step + 1) / QUESTIONS.length) * 100;

  function pick(optionValue: string, optionScore: number) {
    const q = QUESTIONS[step];
    const nextAnswers = { ...answers, [q.id]: optionValue };
    const nextScores = { ...scores, [q.id]: optionScore };
    setAnswers(nextAnswers);
    setScores(nextScores);
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } else {
      setPhase("loading");
      window.setTimeout(() => {
        const raw = Object.values(nextScores).reduce((a, b) => a + b, 0);
        const final = normalizedScore(raw);
        const b = bucketForScore(final);
        try {
          const url = new URL(window.location.href);
          url.searchParams.set("result", String(final));
          url.searchParams.set("bucket", b.key);
          window.history.replaceState({}, "", url.toString());
        } catch {
          /* ignore */
        }
        setPhase("result");
      }, 1800);
    }
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setAnswers({});
    setScores({});
    setStep(0);
    setShared(false);
    setPhase("quiz");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    } catch {
      /* ignore */
    }
  }

  function saveForLater() {
    try {
      const payload: SavedState = { step, answers, scores };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSavedToast(true);
      window.setTimeout(() => setSavedToast(false), 1800);
    } catch {
      /* ignore */
    }
  }

  async function copyShareLink() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("result", String(totalScore));
      url.searchParams.set("bucket", bucket.key);
      await navigator.clipboard.writeText(url.toString());
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("idle");
    }
  }

  /* LOADING */
  if (phase === "loading") {
    return (
      <div
        ref={cardRef}
        className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-10 md:p-16 text-center backdrop-blur-md"
      >
        <Loader2 className="mx-auto mb-6 h-12 w-12 animate-spin text-[var(--terracotta-aa)]" />
        <p className="text-xl md:text-2xl font-semibold text-[var(--ink)]">
          Mapping your automation gap…
        </p>
        <p className="mt-2 text-sm text-[var(--ink-faint)]">
          Scoring 12 answers across 4 axes.
        </p>
      </div>
    );
  }

  /* RESULT */
  if (phase === "result") {
    if (!unlocked) {
      return (
        <div ref={cardRef}>
          <EmailGate
            toolSlug="automation-gap-analyzer"
            toolName="Automation Gap Analyzer"
            promise="your top 3 automation gaps"
            onUnlock={() => setUnlocked(true)}
          />
        </div>
      );
    }
    return (
      <div ref={cardRef}>
        <ResultCard
          bucket={bucket}
          score={totalScore}
          subs={subscores}
          weakest={weakest}
          onRestart={restart}
          onCopy={copyShareLink}
          copyState={copyState}
        />
      </div>
    );
  }

  /* QUIZ */
  return (
    <div ref={cardRef} className="relative">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
          Question {step + 1} of {QUESTIONS.length}
        </div>
        <div className="text-xs text-[var(--ink-faint)]">
          {Math.round(progressPct)}% complete
        </div>
      </div>
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-[var(--cream-2)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--terracotta)] to-[var(--ink)] transition-[width] duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-7 md:p-10 backdrop-blur-md">
        <div
          key={current.id}
          className="gap-slide"
          style={{ animationDuration: "320ms" }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-1.5">
              <span className="text-xl leading-none" aria-hidden>
                {current.icon}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
                Step {current.step}
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-[var(--cream-2)] text-[var(--ink-faint)] border border-[rgba(26,26,26,0.12)]">
              {axisLabel(current.axis)}
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-[var(--ink)] md:text-3xl">
            {current.prompt}
          </h2>
          {current.hint && (
            <p className="mb-6 text-sm text-[var(--ink-faint)] md:text-base">
              {current.hint}
            </p>
          )}

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {current.options.map((opt) => {
              const selected = answers[current.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => pick(opt.value, opt.score)}
                  className={
                    selected
                      ? "group flex items-center justify-between gap-3 rounded-xl border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-4 text-left transition"
                      : "group flex items-center justify-between gap-3 rounded-xl border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-4 text-left transition hover:border-[var(--terracotta)]/50 hover:bg-[var(--cream-2)]"
                  }
                >
                  <span className="text-sm font-semibold text-[var(--ink)] md:text-base">
                    {opt.label}
                  </span>
                  <ArrowRight
                    className={
                      selected
                        ? "h-4 w-4 text-[var(--terracotta-aa)]"
                        : "h-4 w-4 text-[var(--ink-faint)] transition group-hover:translate-x-0.5 group-hover:text-[var(--terracotta-aa)]"
                    }
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] transition hover:text-[var(--terracotta-aa)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Back
            </button>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={saveForLater}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] transition hover:text-[var(--terracotta-aa)]"
              >
                <Save className="h-3 w-3" />
                {savedToast ? "Saved" : "Save & resume later"}
              </button>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] transition hover:text-[var(--terracotta-aa)]"
              >
                <RotateCcw className="h-3 w-3" />
                Start over
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gapSlide {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .gap-slide {
          animation-name: gapSlide;
          animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
          animation-fill-mode: both;
        }
        @media (prefers-reduced-motion: reduce) {
          .gap-slide {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function axisLabel(key: Axis): string {
  return AXES.find((a) => a.key === key)?.label ?? key;
}

/* count-up */
function ScoreCountUp({
  value,
  duration = 1100,
  color,
}: {
  value: number;
  duration?: number;
  color: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    startRef.current = null;
    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, reduced]);

  return (
    <span
      className="text-6xl font-extrabold leading-none tracking-tight md:text-7xl"
      style={{ color }}
    >
      {display}
      <span className="text-2xl text-[var(--ink-faint)] md:text-3xl">%</span>
    </span>
  );
}

/* 4-axis radar */
function RadarChart({
  subscores,
  color,
}: {
  subscores: Record<Axis, number>;
  color: string;
}) {
  const SIZE = 260;
  const CENTER = SIZE / 2;
  const RADIUS = 96;
  const RING_COUNT = 4;

  const axes = useMemo(() => {
    const order: Axis[] = [
      "leadCapture",
      "followUp",
      "reporting",
      "teamProductivity",
    ];
    return order.map((axKey, i) => {
      const meta = AXES.find((a) => a.key === axKey) as AxisMeta;
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 4;
      const raw = subscores[axKey] ?? 0;
      const norm = Math.max(0, Math.min(1, raw / meta.maxScore));
      const x = CENTER + Math.cos(angle) * RADIUS;
      const y = CENTER + Math.sin(angle) * RADIUS;
      const px = CENTER + Math.cos(angle) * RADIUS * norm;
      const py = CENTER + Math.sin(angle) * RADIUS * norm;
      const lx = CENTER + Math.cos(angle) * (RADIUS + 22);
      const ly = CENTER + Math.sin(angle) * (RADIUS + 22);
      return { ax: meta, angle, norm, x, y, px, py, lx, ly, raw };
    });
  }, [subscores]);

  const polygonPoints = axes.map((a) => `${a.px},${a.py}`).join(" ");

  return (
    <div className="gap-radar-wrap">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        height="100%"
        role="img"
        aria-label="Automation gap radar chart"
        className="gap-radar mx-auto block max-w-[320px]"
      >
        {Array.from({ length: RING_COUNT }).map((_, i) => {
          const r = (RADIUS * (i + 1)) / RING_COUNT;
          return (
            <circle
              key={i}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="rgba(26,26,26,0.10)"
              strokeWidth={1}
            />
          );
        })}
        {axes.map((a) => (
          <line
            key={a.ax.key}
            x1={CENTER}
            y1={CENTER}
            x2={a.x}
            y2={a.y}
            stroke="rgba(26,26,26,0.10)"
            strokeWidth={1}
          />
        ))}
        <polygon
          points={polygonPoints}
          fill={color}
          fillOpacity={0.28}
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {axes.map((a) => (
          <circle
            key={`d-${a.ax.key}`}
            cx={a.px}
            cy={a.py}
            r={3.5}
            fill={color}
            stroke="var(--ink)"
            strokeWidth={1.5}
          />
        ))}
        {axes.map((a) => {
          const anchor =
            Math.abs(a.lx - CENTER) < 1
              ? "middle"
              : a.lx > CENTER
                ? "start"
                : "end";
          const dy = a.ly > CENTER ? "1em" : "-0.25em";
          return (
            <text
              key={`l-${a.ax.key}`}
              x={a.lx}
              y={a.ly}
              textAnchor={anchor}
              dy={dy}
              fontSize={10}
              fontWeight={700}
              fill="rgba(26,26,26,0.78)"
              style={{ letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              {a.ax.label}
            </text>
          );
        })}
      </svg>
      <style jsx>{`
        .gap-radar-wrap {
          animation: radarFade 700ms ease-out both;
        }
        @keyframes radarFade {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .gap-radar-wrap {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

type ResultProps = {
  bucket: Bucket;
  score: number;
  subs: Record<Axis, number>;
  weakest: AxisMeta;
  onRestart: () => void;
  onCopy: () => void;
  copyState: "idle" | "copied";
};

function ResultCard({
  bucket,
  score,
  subs,
  weakest,
  onRestart,
  onCopy,
  copyState,
}: ResultProps) {
  const calcQuery = buildCalculatorParams(subs);
  const bookingQuery = buildBookingParams({
    score,
    weakestAxis: weakest.key,
  });
  const hours = impliedManualHours(subs);

  return (
    <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] backdrop-blur-md">
      <div
        className="relative px-7 py-10 md:px-12 md:py-14"
        style={{
          background: `linear-gradient(135deg, ${bucket.color}33 0%, ${bucket.color}11 100%)`,
          borderBottom: `1px solid ${bucket.color}55`,
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex-1 min-w-[260px]">
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{
                background: `${bucket.color}22`,
                color: bucket.color,
                boxShadow: `0 0 22px ${bucket.color}33`,
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: bucket.color }}
              />
              Automation level
            </div>
            <h2
              className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--ink)] md:text-5xl"
              style={{ textShadow: `0 0 28px ${bucket.color}55` }}
            >
              {bucket.label}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[var(--ink-2)] md:text-lg">
              {bucket.headline}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-faint)] mb-1">
              Automation %
            </div>
            <ScoreCountUp value={score} color={bucket.color} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-7 py-8 md:grid-cols-[1fr_1.2fr] md:px-12 md:py-10">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--terracotta-aa)]">
            Four-axis breakdown
          </p>
          <RadarChart subscores={subs} color={bucket.color} />
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
            {AXES.map((a) => {
              const raw = subs[a.key] ?? 0;
              const pct = Math.round((raw / a.maxScore) * 100);
              return (
                <div
                  key={a.key}
                  className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-2.5 py-1.5"
                >
                  <div className="text-[var(--ink)]/60 uppercase tracking-wider">
                    {a.label}
                  </div>
                  <div className="text-[var(--ink)] font-semibold">
                    {raw}/{a.maxScore}{" "}
                    <span className="text-[var(--ink-faint)]">· {pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--terracotta-aa)]">
            Biggest gap: {weakest.label}
          </p>
          <p className="mb-5 text-base leading-relaxed text-[var(--ink-2)] md:text-lg">
            {bucket.recommendation}
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3 rounded-xl border border-[rgba(198,107,63,0.30)] bg-[var(--terracotta)]/[0.06] px-4 py-3 text-sm leading-relaxed text-[var(--terracotta-aa)] md:text-base">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--terracotta-aa)]" />
              You&apos;re losing roughly <b>{hours} manual hours/week</b> from
              the {weakest.label.toLowerCase()} axis alone.
            </li>
            {weakest.recommendations.map((line, idx) => (
              <li
                key={line}
                className="flex gap-3 text-sm leading-relaxed text-[var(--ink-2)] md:text-base"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)]/15 text-xs font-bold text-[var(--terracotta-aa)]">
                  {idx + 1}
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-7 py-7 md:px-12 md:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`${CAL_URL}?${bookingQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
            style={{
              background: "var(--terracotta)",
              boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
            }}
          >
            <CalendarCheck className="h-4 w-4" />
            Book a strategy call with this context
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <a
            href={`/tools/revenue-calculator?${calcQuery}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-6 py-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--terracotta)] hover:bg-[var(--cream-2)] sm:text-base"
          >
            <Calculator className="h-4 w-4" />
            See what {hours} hrs/wk costs you
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            {copyState === "copied" ? (
              <>
                <Check className="h-4 w-4 text-[var(--terracotta-aa)]" />
                Link copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Share your result
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] transition hover:text-[var(--terracotta-aa)]"
        >
          <RotateCcw className="h-3 w-3" />
          Retake the analyzer
        </button>
      </div>
    </div>
  );
}
