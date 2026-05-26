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
} from "lucide-react";
import {
  QUIZ,
  MAX_SCORE,
  BUCKETS,
  bucketForScore,
  buildCalculatorParams,
  type Bucket,
} from "@/data/quiz-questions";

type Phase = "quiz" | "loading" | "result";
const STORAGE_KEY = "skynet:stress-quiz:v1";

type SavedState = {
  step: number;
  answers: Record<string, string>;
  scores: Record<string, number>;
};

export default function Quiz() {
  const [step, setStep] = useState(0); // 0..6 quiz, 7+ result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>("quiz");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [hydrated, setHydrated] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  /* ───── hydrate from URL or localStorage ───── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlScore = params.get("score");
    const urlBucket = params.get("bucket");
    if (urlScore && urlBucket) {
      // shared result link → jump straight to result with the carried score
      const numeric = Math.max(0, Math.min(MAX_SCORE, Number(urlScore) || 0));
      setScores({ shared: numeric });
      setPhase("result");
      setHydrated(true);
      return;
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SavedState;
        if (saved && typeof saved.step === "number") {
          setStep(Math.min(saved.step, QUIZ.length - 1));
          setAnswers(saved.answers ?? {});
          setScores(saved.scores ?? {});
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  /* ───── persist progress ───── */
  useEffect(() => {
    if (!hydrated) return;
    if (phase !== "quiz") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ step, answers, scores })
      );
    } catch {
      // quota / private mode, silent
    }
  }, [step, answers, scores, phase, hydrated]);

  const totalScore = useMemo(() => {
    if (phase === "result" && scores.shared !== undefined) return scores.shared;
    return Object.values(scores).reduce((a, b) => a + b, 0);
  }, [scores, phase]);

  const bucket: Bucket = useMemo(() => bucketForScore(totalScore), [totalScore]);
  const current = QUIZ[step];
  const progressPct = ((step + 1) / QUIZ.length) * 100;

  function pick(optionValue: string, optionScore: number) {
    const q = QUIZ[step];
    const nextAnswers = { ...answers, [q.id]: optionValue };
    const nextScores = { ...scores, [q.id]: optionScore };
    setAnswers(nextAnswers);
    setScores(nextScores);
    if (step < QUIZ.length - 1) {
      setStep((s) => s + 1);
      // micro-scroll to keep card in viewport on mobile
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      // last Q → calculating spinner → result
      setPhase("loading");
      window.setTimeout(() => {
        // bake result into the URL for shareability
        const final = Object.values(nextScores).reduce((a, b) => a + b, 0);
        const b = bucketForScore(final);
        try {
          const url = new URL(window.location.href);
          url.searchParams.set("step", "result");
          url.searchParams.set("score", String(final));
          url.searchParams.set("bucket", b.key);
          window.history.replaceState({}, "", url.toString());
        } catch {
          // ignore
        }
        setPhase("result");
      }, 1500);
    }
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setAnswers({});
    setScores({});
    setStep(0);
    setPhase("quiz");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }

  async function copyShareLink() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("score", String(totalScore));
      url.searchParams.set("bucket", bucket.key);
      await navigator.clipboard.writeText(url.toString());
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("idle");
    }
  }

  /* ─────────── LOADING ─────────── */
  if (phase === "loading") {
    return (
      <div
        ref={cardRef}
        className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-10 md:p-16 text-center backdrop-blur-md"
      >
        <Loader2 className="mx-auto mb-6 h-12 w-12 animate-spin text-[var(--terracotta)]" />
        <p className="text-xl md:text-2xl font-semibold text-[var(--ink)]">
          Calculating your chaos level…
        </p>
        <p className="mt-2 text-sm text-[var(--ink-faint)]">
          Crunching 7 answers into 1 honest number.
        </p>
      </div>
    );
  }

  /* ─────────── RESULT ─────────── */
  if (phase === "result") {
    return (
      <div ref={cardRef}>
        <ResultCard
          bucket={bucket}
          score={totalScore}
          answers={answers}
          onRestart={restart}
          onCopy={copyShareLink}
          copyState={copyState}
        />
        <FeedbackForm />
      </div>
    );
  }

  /* ─────────── QUIZ ─────────── */
  return (
    <div ref={cardRef} className="relative">
      {/* progress bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta)]">
          Question {step + 1} of {QUIZ.length}
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

      {/* card with sliding question */}
      <div className="relative overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-7 md:p-10 backdrop-blur-md">
        <div
          key={current.id}
          className="animate-quizSlide"
          style={{ animationDuration: "320ms" }}
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-1.5">
            <span className="text-xl leading-none" aria-hidden>
              {current.icon}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--terracotta)]">
              Step {current.step}
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
                        ? "h-4 w-4 text-[var(--terracotta)]"
                        : "h-4 w-4 text-[var(--ink-faint)] transition group-hover:translate-x-0.5 group-hover:text-[var(--terracotta)]"
                    }
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] transition hover:text-[var(--terracotta)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] transition hover:text-[var(--terracotta)]"
            >
              <RotateCcw className="h-3 w-3" />
              Start over
            </button>
          </div>
        </div>
      </div>

      {/* local CSS for slide animation — scoped to this component via class name */}
      <style jsx>{`
        @keyframes quizSlide {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-quizSlide {
          animation-name: quizSlide;
          animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}

/* ─────────── Result card subcomponent ─────────── */

type ResultProps = {
  bucket: Bucket;
  score: number;
  answers: Record<string, string>;
  onRestart: () => void;
  onCopy: () => void;
  copyState: "idle" | "copied";
};

function ResultCard({
  bucket,
  score,
  answers,
  onRestart,
  onCopy,
  copyState,
}: ResultProps) {
  const calcQuery = buildCalculatorParams(answers);
  return (
    <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] backdrop-blur-md">
        {/* diagnosis header */}
        <div
          className="relative px-7 py-10 md:px-12 md:py-14"
          style={{
            background: `linear-gradient(135deg, ${bucket.color}33 0%, ${bucket.color}11 100%)`,
            borderBottom: `1px solid ${bucket.color}55`,
          }}
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ background: `${bucket.color}22`, color: bucket.color }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: bucket.color }}
                />
                Diagnosis
              </div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--ink)] md:text-5xl">
                {bucket.label}
              </h2>
              <p className="mt-3 max-w-2xl text-base text-[var(--ink-2)] md:text-lg">
                {bucket.headline}
              </p>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-faint)]">
                Stress score
              </div>
              <div
                className="text-5xl font-extrabold leading-none tracking-tight md:text-6xl"
                style={{ color: bucket.color }}
              >
                {score}
                <span className="text-2xl text-[var(--ink-faint)] md:text-3xl">
                  /{MAX_SCORE}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 gap-8 px-7 py-8 md:grid-cols-2 md:px-12 md:py-10">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--terracotta)]">
              What this means
            </p>
            <ul className="space-y-3">
              {bucket.snapshot.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--ink-2)] md:text-base"
                >
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: bucket.color }}
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--terracotta)]">
              What we&apos;d fix first
            </p>
            <ul className="space-y-3">
              {bucket.priorities.map((line, idx) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--ink-2)] md:text-base"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)]/15 text-xs font-bold text-[var(--terracotta)]">
                    {idx + 1}
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="border-t border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-7 py-7 md:px-12 md:py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`/tools/revenue-calculator?${calcQuery}`}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
              style={{
                background: "var(--terracotta)",
                boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
              }}
            >
              <Calculator className="h-4 w-4" />
              See exactly how much you&apos;re losing
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="/discovery-call"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-6 py-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--terracotta)] hover:bg-[var(--cream-3)] sm:text-base"
            >
              <CalendarCheck className="h-4 w-4" />
              Book a free 30-min audit
            </a>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta)]"
            >
              {copyState === "copied" ? (
                <>
                  <Check className="h-4 w-4 text-[var(--terracotta)]" />
                  Link copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Share your score
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta)]"
          >
            <RotateCcw className="h-3 w-3" />
            Retake the quiz
          </button>
        </div>
      </div>
  );
}

/* ─────────── Feedback form ─────────── */

function FeedbackForm() {
  return (
    <div className="mt-12 rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta)] mb-2">
        — Feedback · 30-second form
      </p>
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--ink)] mb-2 font-serif">
        What should this tool do next?
      </h3>
      <p className="text-sm text-[var(--ink-2)] mb-4">
        One missing field, one weird output, one tool you wish existed — tell me. I read every reply.
      </p>
      <form action="/api/tool-feedback" method="POST" className="space-y-3">
        <input type="hidden" name="tool" value="agency-stress-quiz" />
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
  );
}
