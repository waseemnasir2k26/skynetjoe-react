"use client";

import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  CalendarCheck,
  RotateCcw,
  ShieldAlert,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { CAL_URL } from "@/lib/site";

type Phase = "idle" | "loading" | "result" | "error";

type Verdict = "good" | "needs-improvement" | "poor" | "unavailable";

type Metric = {
  key: "lcp" | "inp" | "cls";
  label: string;
  value: number | null;
  displayValue: string;
  verdict: Verdict;
  fieldData: boolean;
};

const THRESHOLDS = {
  lcp: { good: 2500, ni: 4000, unit: "ms" },
  inp: { good: 200, ni: 500, unit: "ms" },
  cls: { good: 0.1, ni: 0.25, unit: "" },
};

function verdictFor(metric: keyof typeof THRESHOLDS, value: number): Verdict {
  const t = THRESHOLDS[metric];
  if (value <= t.good) return "good";
  if (value <= t.ni) return "needs-improvement";
  return "poor";
}

type StrategyResult = {
  strategy: "mobile" | "desktop";
  score: number | null; // lab performance score 0-100
  metrics: Metric[];
  fieldDataAvailable: boolean;
  reportUrl: string;
};

// PSI's raw response shape is large and Google-controlled — typed as
// unknown-keyed rather than hand-modeling every field of their API.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PsiJson = any;

function parsePsi(
  json: PsiJson,
  strategy: "mobile" | "desktop",
  targetUrl: string,
): StrategyResult {
  const lab = json?.lighthouseResult?.categories?.performance?.score;
  const score = typeof lab === "number" ? Math.round(lab * 100) : null;

  const field =
    json?.loadingExperience?.metrics ??
    json?.originLoadingExperience?.metrics ??
    null;
  const fieldDataAvailable = Boolean(field);

  function fieldMetric(
    key: "lcp" | "inp" | "cls",
    crux: string,
    labKey: string,
  ): Metric {
    const entry = field?.[crux];
    if (entry && typeof entry.percentile === "number") {
      const raw = key === "cls" ? entry.percentile / 100 : entry.percentile;
      return {
        key,
        label: key.toUpperCase(),
        value: raw,
        displayValue: key === "cls" ? raw.toFixed(2) : `${Math.round(raw)}ms`,
        verdict: verdictFor(key, raw),
        fieldData: true,
      };
    }
    // Fall back to lab data (simulated, not real-user) if field data is absent.
    const labAudit = json?.lighthouseResult?.audits?.[labKey];
    if (labAudit && typeof labAudit.numericValue === "number") {
      const raw = key === "cls" ? labAudit.numericValue : labAudit.numericValue;
      return {
        key,
        label: key.toUpperCase(),
        value: raw,
        displayValue: key === "cls" ? raw.toFixed(3) : `${Math.round(raw)}ms`,
        verdict: verdictFor(key, raw),
        fieldData: false,
      };
    }
    return {
      key,
      label: key.toUpperCase(),
      value: null,
      displayValue: "—",
      verdict: "unavailable",
      fieldData: false,
    };
  }

  const metrics: Metric[] = [
    fieldMetric(
      "lcp",
      "LARGEST_CONTENTFUL_PAINT_MS",
      "largest-contentful-paint",
    ),
    fieldMetric("inp", "INTERACTION_TO_NEXT_PAINT", "interactive"),
    fieldMetric(
      "cls",
      "CUMULATIVE_LAYOUT_SHIFT_SCORE",
      "cumulative-layout-shift",
    ),
  ];

  const reportUrl = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(targetUrl)}&form_factor=${strategy}`;

  return { strategy, score, metrics, fieldDataAvailable, reportUrl };
}

function VerdictIcon({ v }: { v: Verdict }) {
  if (v === "good") return <CheckCircle2 className="w-4 h-4 text-[#2f8f5b]" />;
  if (v === "needs-improvement")
    return <AlertTriangle className="w-4 h-4 text-[#c66b3f]" />;
  if (v === "poor") return <XCircle className="w-4 h-4 text-[#a53939]" />;
  return (
    <span className="w-4 h-4 inline-block text-[var(--ink-faint)]">—</span>
  );
}

function verdictLabel(v: Verdict) {
  if (v === "good") return "Pass";
  if (v === "needs-improvement") return "Needs work";
  if (v === "poor") return "Fail";
  return "No data";
}

export default function Audit() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [mobile, setMobile] = useState<StrategyResult | null>(null);
  const [desktop, setDesktop] = useState<StrategyResult | null>(null);
  const [target, setTarget] = useState("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    const full = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    setPhase("loading");
    setError(null);
    setMobile(null);
    setDesktop(null);
    setTarget(full);

    try {
      const [mRes, dRes] = await Promise.all([
        fetch(`/api/psi?url=${encodeURIComponent(full)}&strategy=mobile`),
        fetch(`/api/psi?url=${encodeURIComponent(full)}&strategy=desktop`),
      ]);
      const [mJson, dJson] = await Promise.all([mRes.json(), dRes.json()]);

      if (!mRes.ok || !mJson.ok) {
        setError(mJson.error || "PageSpeed Insights request failed.");
        setPhase("error");
        return;
      }
      setMobile(parsePsi(mJson.data, "mobile", full));
      if (dRes.ok && dJson.ok) {
        setDesktop(parsePsi(dJson.data, "desktop", full));
      }
      setPhase("result");
    } catch {
      setError("Network error reaching PageSpeed Insights. Try again.");
      setPhase("error");
    }
  }

  function reset() {
    setPhase("idle");
    setMobile(null);
    setDesktop(null);
    setError(null);
    setUrl("");
  }

  return (
    <div>
      <form
        onSubmit={run}
        className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8 backdrop-blur-md"
      >
        <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-2">
          Page URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            inputMode="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="skynetjoe.com"
            disabled={phase === "loading"}
            className="flex-1 rounded-xl border-2 border-[rgba(26,26,26,0.14)] bg-[var(--cream-3)] px-4 py-3.5 text-[var(--ink)] font-mono text-sm outline-none focus:border-[var(--terracotta)]"
          />
          <button
            type="submit"
            disabled={phase === "loading" || !url.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[var(--cream-3)] disabled:opacity-50"
            style={{ background: "var(--terracotta)" }}
          >
            {phase === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Querying Google…
              </>
            ) : (
              <>
                Run audit <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        <p className="mt-3 text-xs text-[var(--ink-faint)]">
          Calls Google&apos;s PageSpeed Insights API directly — real field data
          (Chrome UX Report) where available, real lab data otherwise. Can take
          10-20 seconds; Google&apos;s API, not ours.
        </p>
      </form>

      {phase === "error" && (
        <div className="mt-6 rounded-2xl border border-[rgba(198,60,60,0.35)] bg-[rgba(198,60,60,0.06)] px-6 py-5 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#a53939] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[var(--ink)]">
              Couldn&apos;t complete the audit
            </p>
            <p className="text-sm text-[var(--ink-2)] mt-1">{error}</p>
          </div>
        </div>
      )}

      {phase === "result" && mobile && (
        <div className="mt-8 rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] overflow-hidden">
          <div className="px-7 py-8 md:px-10 border-b border-[rgba(26,26,26,0.12)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)] mb-2">
              Audited {target}
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)]">
              Slow site = wasted ad spend.
            </h3>
            <p className="text-sm text-[var(--ink-2)] mt-2 max-w-xl">
              Google&apos;s own field and lab data, mobile + desktop. Field data
              is real Chrome users (Chrome UX Report); when a page hasn&apos;t
              collected enough real-user traffic, Google falls back to lab data
              from this test run — labeled below either way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[rgba(26,26,26,0.12)]">
            {[mobile, desktop].filter(Boolean).map((r) => (
              <div key={r!.strategy} className="px-7 py-8 md:px-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
                    {r!.strategy}
                  </p>
                  {r!.score !== null && (
                    <span
                      className="text-2xl font-extrabold"
                      style={{
                        color:
                          r!.score >= 90
                            ? "#2f8f5b"
                            : r!.score >= 50
                              ? "#c66b3f"
                              : "#a53939",
                      }}
                    >
                      {r!.score}
                      <span className="text-sm text-[var(--ink-faint)]">
                        /100 lab
                      </span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)] mb-3">
                  {r!.fieldDataAvailable
                    ? "Real-user field data (CrUX)"
                    : "Lab data (simulated — not enough real-user traffic)"}
                </p>
                <div className="space-y-3">
                  {r!.metrics.map((m) => (
                    <div
                      key={m.key}
                      className="flex items-center justify-between rounded-xl bg-[var(--cream-3)] border border-[rgba(26,26,26,0.1)] px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <VerdictIcon v={m.verdict} />
                        <span className="text-sm font-semibold text-[var(--ink)]">
                          {m.label}
                        </span>
                        {!m.fieldData && m.value !== null && (
                          <span className="text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                            (lab)
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono text-[var(--ink-2)]">
                          {m.displayValue}
                        </span>
                        <span className="block text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                          {verdictLabel(m.verdict)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href={r!.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  Full PSI report ({r!.strategy}){" "}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="border-t border-[rgba(26,26,26,0.12)] px-7 py-7 md:px-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`${CAL_URL}?utm_source=core-web-vitals-audit`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)]"
              style={{ background: "var(--terracotta)" }}
            >
              <CalendarCheck className="w-4 h-4" /> Book a strategy call about
              my speed
            </a>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] px-5 py-4 text-sm font-semibold text-[var(--ink-2)] hover:border-[var(--terracotta)]"
            >
              <RotateCcw className="w-4 h-4" /> Audit another page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
