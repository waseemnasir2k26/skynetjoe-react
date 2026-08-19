"use client";

import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  CalendarCheck,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  AUTOMATION_CHECKS,
  runReadinessChecks,
  readinessScore,
  readinessBucket,
  type ReadinessResult,
} from "@/data/tools/automation-readiness";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";
import { CAL_URL } from "@/lib/site";

type Phase = "idle" | "loading" | "result" | "error";

export default function Scanner() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ReadinessResult[] | null>(null);
  const [finalUrl, setFinalUrl] = useState<string>("");
  const [unlocked, setUnlocked] = useState(false);

  async function runScan(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    const target = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    setPhase("loading");
    setError(null);
    setResults(null);
    setUnlocked(false);

    try {
      const res = await fetch("/api/tool-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Could not fetch that URL.");
        setPhase("error");
        return;
      }
      const detections = runReadinessChecks(json.html as string);
      setResults(detections);
      setFinalUrl(json.finalUrl as string);
      setPhase("result");
    } catch {
      setError("Network error reaching the scanner. Try again.");
      setPhase("error");
    }
  }

  function reset() {
    setPhase("idle");
    setResults(null);
    setError(null);
    setUrl("");
  }

  const score = results ? readinessScore(results) : 0;
  const bucket = results ? readinessBucket(score) : null;
  const gaps = results ? results.filter((r) => !r.detected) : [];
  const hits = results ? results.filter((r) => r.detected) : [];
  const topGaps = [...gaps]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((g) => AUTOMATION_CHECKS.find((c) => c.id === g.id)!)
    .filter(Boolean);

  return (
    <div>
      {/* INPUT */}
      <form
        onSubmit={runScan}
        className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8 backdrop-blur-md"
      >
        <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-2">
          Homepage URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            inputMode="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="example.com"
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
                <Loader2 className="w-4 h-4 animate-spin" /> Scanning…
              </>
            ) : (
              <>
                Scan homepage <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        <p className="mt-3 text-xs text-[var(--ink-faint)]">
          Fetches your homepage server-side and checks for real, detectable
          signals only — no login pages, no guessing.
        </p>
      </form>

      {phase === "error" && (
        <div className="mt-6 rounded-2xl border border-[rgba(198,60,60,0.35)] bg-[rgba(198,60,60,0.06)] px-6 py-5 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#a53939] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[var(--ink)]">
              Couldn&apos;t complete the scan
            </p>
            <p className="text-sm text-[var(--ink-2)] mt-1">{error}</p>
          </div>
        </div>
      )}

      {phase === "result" && results && bucket && (
        <div className="mt-8">
          {!unlocked ? (
            <EmailGate
              toolSlug="automation-readiness-scanner"
              toolName="Automation Readiness Scanner"
              promise="your full score breakdown and every detected gap"
              onUnlock={() => setUnlocked(true)}
              payloadPreview={
                <div
                  className="rounded-3xl border p-7"
                  style={{
                    borderColor: `${bucket.color}55`,
                    background: `${bucket.color}11`,
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)] mb-1">
                    Scanned {finalUrl}
                  </p>
                  <div className="flex items-end justify-between flex-wrap gap-4 mt-2">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[var(--ink)]">
                        {bucket.label}
                      </h3>
                      <p className="text-sm text-[var(--ink-2)] mt-1 max-w-md">
                        {bucket.headline}
                      </p>
                    </div>
                    <span
                      className="text-5xl font-extrabold"
                      style={{ color: bucket.color }}
                    >
                      {score}
                      <span className="text-xl text-[var(--ink-faint)]">
                        /100
                      </span>
                    </span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mt-6 mb-3">
                    Top 3 gaps (free preview)
                  </p>
                  <ul className="space-y-2">
                    {topGaps.map((g) => (
                      <li
                        key={g.id}
                        className="text-sm text-[var(--ink-2)] flex gap-2"
                      >
                        <XCircle className="w-4 h-4 text-[#a53939] flex-shrink-0 mt-0.5" />
                        {g.label} — not detected
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          ) : (
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] overflow-hidden">
              <div
                className="px-7 py-9 md:px-10 md:py-11"
                style={{
                  background: `linear-gradient(135deg, ${bucket.color}33 0%, ${bucket.color}11 100%)`,
                }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)] mb-2">
                  Scanned {finalUrl}
                </p>
                <div className="flex items-end justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-3xl font-extrabold text-[var(--ink)]">
                      {bucket.label}
                    </h3>
                    <p className="text-base text-[var(--ink-2)] mt-2 max-w-lg">
                      {bucket.headline}
                    </p>
                  </div>
                  <span
                    className="text-6xl font-extrabold"
                    style={{ color: bucket.color }}
                  >
                    {score}
                    <span className="text-2xl text-[var(--ink-faint)]">
                      /100
                    </span>
                  </span>
                </div>
              </div>

              <div className="px-7 py-8 md:px-10 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-3">
                    Detected ({hits.length}/{results.length})
                  </p>
                  <ul className="space-y-2">
                    {hits.map((r) => (
                      <li
                        key={r.id}
                        className="text-sm text-[var(--ink-2)] flex gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2f8f5b] flex-shrink-0 mt-0.5" />
                        {r.label}
                      </li>
                    ))}
                    {hits.length === 0 && (
                      <li className="text-sm text-[var(--ink-faint)]">
                        Nothing detected.
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-3">
                    Gaps — what an automation would do here
                  </p>
                  <ul className="space-y-4">
                    {gaps
                      .map((g) => AUTOMATION_CHECKS.find((c) => c.id === g.id)!)
                      .map((c) => (
                        <li key={c.id} className="text-sm">
                          <div className="flex gap-2 font-semibold text-[var(--ink)]">
                            <XCircle className="w-4 h-4 text-[#a53939] flex-shrink-0 mt-0.5" />
                            {c.label}
                          </div>
                          <p className="text-[var(--ink-2)] mt-1 ml-6 leading-relaxed">
                            {c.gapCopy}
                          </p>
                          <a
                            href={c.serviceHref}
                            className="ml-6 mt-1 inline-block text-xs font-semibold text-[var(--terracotta-aa)] hover:underline"
                          >
                            → {c.serviceLabel}
                          </a>
                        </li>
                      ))}
                    {gaps.length === 0 && (
                      <li className="text-sm text-[var(--ink-2)]">
                        No gaps found — well covered.
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[rgba(26,26,26,0.12)] px-7 py-7 md:px-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`${CAL_URL}?utm_source=automation-readiness-scanner`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)]"
                  style={{ background: "var(--terracotta)" }}
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book a strategy call with this context
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] px-5 py-4 text-sm font-semibold text-[var(--ink-2)] hover:border-[var(--terracotta)]"
                >
                  <RotateCcw className="w-4 h-4" /> Scan another site
                </button>
              </div>
              <div className="px-7 pb-6 md:px-10">
                <ToolUsage slug="automation-readiness-scanner" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
