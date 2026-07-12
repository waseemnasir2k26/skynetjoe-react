"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Loader2,
  RotateCcw,
  CalendarCheck,
} from "lucide-react";
import {
  QUESTIONS,
  CATEGORIES,
  bucketForScore,
  normalizedScore,
  computeCategoryScores,
  collectFixes,
  weakestCategory,
  type Bucket,
  type Category,
} from "@/data/tools/aeo-audit";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";
import { CAL_URL } from "@/lib/site";

const STORAGE_KEY = "skynet:aeo-audit:v1";

type Phase = "quiz" | "loading" | "result";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>("quiz");
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const saved = JSON.parse(stored) as {
          answers?: Record<string, string>;
          scores?: Record<string, number>;
          phase?: Phase;
          step?: number;
        };
        setAnswers(saved.answers ?? {});
        setScores(saved.scores ?? {});
        if (saved.phase === "result") {
          setPhase("result");
        } else if (typeof saved.step === "number") {
          setStep(Math.min(saved.step, QUESTIONS.length - 1));
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, scores, phase, step }),
      );
    } catch {
      /* ignore */
    }
  }, [answers, scores, phase, step, hydrated]);

  const rawTotal = useMemo(
    () => Object.values(scores).reduce((a, b) => a + b, 0),
    [scores],
  );
  const totalScore = useMemo(() => normalizedScore(rawTotal), [rawTotal]);
  const catScores = useMemo(() => computeCategoryScores(scores), [scores]);
  const bucket: Bucket = useMemo(
    () => bucketForScore(totalScore),
    [totalScore],
  );
  const weakest = useMemo(() => weakestCategory(catScores), [catScores]);
  const fixes = useMemo(() => collectFixes(answers), [answers]);

  const current = QUESTIONS[step];
  const progressPct = ((step + 1) / QUESTIONS.length) * 100;

  function pick(value: string, score: number) {
    const q = QUESTIONS[step];
    const nextAnswers = { ...answers, [q.id]: value };
    const nextScores = { ...scores, [q.id]: score };
    setAnswers(nextAnswers);
    setScores(nextScores);
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
      requestAnimationFrame(() =>
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } else {
      setPhase("loading");
      window.setTimeout(() => setPhase("result"), 1400);
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
    setUnlocked(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  async function copyFixes() {
    try {
      const lines = [
        `AEO Audit — Score ${totalScore}/100 (${bucket.label})`,
        "",
        "Prioritized fixes:",
        ...fixes.map((f, i) => `${i + 1}. ${f.fix}`),
      ];
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("idle");
    }
  }

  if (phase === "loading") {
    return (
      <div
        ref={cardRef}
        className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-10 md:p-16 text-center backdrop-blur-md"
      >
        <Loader2 className="mx-auto mb-6 h-12 w-12 animate-spin text-[var(--terracotta-aa)]" />
        <p className="text-xl md:text-2xl font-semibold text-[var(--ink)]">
          Scoring your AEO readiness…
        </p>
        <p className="mt-2 text-sm text-[var(--ink-faint)]">
          Checking 10 answers across 5 categories.
        </p>
      </div>
    );
  }

  if (phase === "result") {
    if (!unlocked) {
      return (
        <div ref={cardRef}>
          <EmailGate
            toolSlug="aeo-audit"
            toolName="AEO Audit"
            promise="your full score breakdown + prioritized fix list"
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
          catScores={catScores}
          weakest={weakest}
          fixes={fixes}
          onRestart={restart}
          onCopy={copyFixes}
          copyState={copyState}
        />
        <div className="mt-4 flex justify-center">
          <ToolUsage slug="aeo-audit" />
        </div>
      </div>
    );
  }

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
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-[var(--cream-2)] text-[var(--terracotta-aa)] border border-[rgba(198,107,63,0.30)]">
            {categoryLabel(current.category)}
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

        <div className="grid grid-cols-1 gap-2.5">
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
                    : "group flex items-center justify-between gap-3 rounded-xl border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-4 text-left transition hover:border-[var(--terracotta)]/50"
                }
              >
                <span className="text-sm font-semibold text-[var(--ink)] md:text-base">
                  {opt.label}
                </span>
                <ArrowRight
                  className={
                    selected
                      ? "h-4 w-4 text-[var(--terracotta-aa)]"
                      : "h-4 w-4 text-[var(--ink-faint)] transition group-hover:translate-x-0.5"
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
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] transition hover:text-[var(--terracotta-aa)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Back
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
  );
}

function categoryLabel(key: Category): string {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

type ResultProps = {
  bucket: Bucket;
  score: number;
  catScores: Record<Category, number>;
  weakest: { key: Category; label: string; maxScore: number };
  fixes: { id: string; category: Category; fix: string }[];
  onRestart: () => void;
  onCopy: () => void;
  copyState: "idle" | "copied";
};

function ResultCard({
  bucket,
  score,
  catScores,
  weakest,
  fixes,
  onRestart,
  onCopy,
  copyState,
}: ResultProps) {
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
              style={{ background: `${bucket.color}22`, color: bucket.color }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: bucket.color }}
              />
              AEO Readiness
            </div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--ink)] md:text-5xl">
              {bucket.label}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[var(--ink-2)] md:text-lg">
              {bucket.headline}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-faint)] mb-1">
              Score
            </div>
            <span
              className="text-6xl font-extrabold leading-none tracking-tight md:text-7xl"
              style={{ color: bucket.color }}
            >
              {score}
              <span className="text-2xl text-[var(--ink-faint)] md:text-3xl">
                /100
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-7 py-8 md:grid-cols-[1fr_1.2fr] md:px-12 md:py-10">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--terracotta-aa)]">
            Category breakdown
          </p>
          <div className="space-y-3">
            {CATEGORIES.map((c) => {
              const raw = catScores[c.key] ?? 0;
              const pct = Math.round((raw / c.maxScore) * 100);
              return (
                <div key={c.key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[var(--ink)]">
                      {c.label}
                    </span>
                    <span className="text-[var(--ink-faint)] tabular-nums">
                      {raw}/{c.maxScore}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--cream-3)]">
                    <div
                      className="h-full rounded-full bg-[var(--terracotta)]"
                      style={{ width: `${pct}%` }}
                    />
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-faint)]">
            Prioritized fixes ({fixes.length})
          </p>
          <ul className="space-y-3">
            {fixes.slice(0, 8).map((f, idx) => (
              <li
                key={f.id}
                className="flex gap-3 text-sm leading-relaxed text-[var(--ink-2)] md:text-base"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)]/15 text-xs font-bold text-[var(--terracotta-aa)]">
                  {idx + 1}
                </span>
                {f.fix}
              </li>
            ))}
            {fixes.length === 0 && (
              <li className="text-sm text-[var(--ink-2)]">
                No gaps found in your answers — nice work. Keep this current as
                pages change.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-7 py-7 md:px-12 md:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`${CAL_URL}?utm_source=aeo-audit`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
            style={{ background: "var(--terracotta)" }}
          >
            <CalendarCheck className="h-4 w-4" />
            Book a strategy call with this context
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <a
            href="/tools/llms-txt-generator"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-6 py-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--terracotta)] sm:text-base"
          >
            Generate your llms.txt
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
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy fix list
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
          Retake the audit
        </button>
      </div>
    </div>
  );
}
