"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Loader2,
  CalendarCheck,
  RotateCcw,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";
import {
  detectStack,
  TECH_STACK_SIGNATURES,
  type StackSignature,
} from "@/data/tools/tech-stack-signatures";
import ToolUsage from "@/components/tools/ToolUsage";
import { CAL_URL } from "@/lib/site";

type Phase = "idle" | "loading" | "result" | "error";

export default function XRay() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<StackSignature[] | null>(null);
  const [finalUrl, setFinalUrl] = useState("");

  async function runScan(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    const target = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    setPhase("loading");
    setError(null);
    setMatches(null);

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
      const found = detectStack(json.html as string);
      setMatches(found);
      setFinalUrl(json.finalUrl as string);
      setPhase("result");
    } catch {
      setError("Network error reaching the scanner. Try again.");
      setPhase("error");
    }
  }

  function reset() {
    setPhase("idle");
    setMatches(null);
    setError(null);
    setUrl("");
  }

  const byCategory = useMemo(() => {
    if (!matches) return [];
    const map = new Map<string, StackSignature[]>();
    for (const m of matches) {
      const list = map.get(m.category) ?? [];
      list.push(m);
      map.set(m.category, list);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [matches]);

  return (
    <div>
      <form
        onSubmit={runScan}
        className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8 backdrop-blur-md"
      >
        <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-2">
          Any URL — yours or a competitor&apos;s
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            inputMode="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="shopify.com"
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
                <Loader2 className="w-4 h-4 animate-spin" /> Fingerprinting…
              </>
            ) : (
              <>
                X-ray it <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        <p className="mt-3 text-xs text-[var(--ink-faint)]">
          Checked against{" "}
          <strong className="text-[var(--ink-2)]">
            a curated {TECH_STACK_SIGNATURES.length}-vendor signature list
          </strong>{" "}
          — script sources, meta tags, and DOM markers. No login-gated tools, no
          guessing.
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

      {phase === "result" && matches && (
        <div className="mt-8 rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] overflow-hidden">
          <div className="px-7 py-8 md:px-10 border-b border-[rgba(26,26,26,0.12)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)] mb-2">
              Scanned {finalUrl}
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)]">
              {matches.length} tool{matches.length === 1 ? "" : "s"} detected
            </h3>
            <p className="text-sm text-[var(--ink-2)] mt-2 max-w-xl">
              See what this site runs — analytics, CRM, payments, chat, and
              more. Prices link straight to each vendor&apos;s own current
              pricing page; we never hardcode a number.
            </p>
          </div>

          <div className="px-7 py-8 md:px-10 space-y-8">
            {byCategory.map(([category, sigs]) => (
              <div key={category}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-3">
                  {category}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sigs.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-3.5 flex items-center justify-between gap-3"
                    >
                      <span className="text-sm font-semibold text-[var(--ink)]">
                        {s.vendor}
                      </span>
                      <a
                        href={s.pricingUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--terracotta-aa)] hover:underline flex-shrink-0"
                      >
                        Pricing <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {matches.length === 0 && (
              <p className="text-sm text-[var(--ink-2)]">
                No signatures from our {TECH_STACK_SIGNATURES.length}-vendor
                list matched this page. That can mean a very lean custom build,
                or that the tools it uses load dynamically after our single
                fetch.
              </p>
            )}
          </div>

          <div className="border-t border-[rgba(26,26,26,0.12)] px-7 py-7 md:px-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`${CAL_URL}?utm_source=tech-stack-xray`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)]"
              style={{ background: "var(--terracotta)" }}
            >
              <CalendarCheck className="w-4 h-4" /> Book a strategy call about
              my stack
            </a>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] px-5 py-4 text-sm font-semibold text-[var(--ink-2)] hover:border-[var(--terracotta)]"
            >
              <RotateCcw className="w-4 h-4" /> X-ray another site
            </button>
          </div>
          <div className="px-7 pb-6 md:px-10">
            <ToolUsage slug="tech-stack-xray" />
          </div>
        </div>
      )}
    </div>
  );
}
