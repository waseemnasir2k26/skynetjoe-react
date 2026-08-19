"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Search,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Building2,
  Globe,
  Server,
} from "lucide-react";
import {
  isLikelyDomain,
  normalizeDomain,
  runDomainTrustLookup,
} from "@/lib/tools/dns";
import ToolUsage from "@/components/tools/ToolUsage";

type Trust = Awaited<ReturnType<typeof runDomainTrustLookup>>;

function fmtAge(days: number | null): string {
  if (days === null) return "unknown";
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  if (years >= 1) {
    return `${years} year${years === 1 ? "" : "s"}${months > 0 ? ` ${months} mo` : ""} (${days.toLocaleString("en-US")} days)`;
  }
  if (months >= 1)
    return `${months} month${months === 1 ? "" : "s"} (${days} days)`;
  return `${days} day${days === 1 ? "" : "s"}`;
}

function ageRisk(days: number | null): {
  verdict: "good" | "warn" | "bad";
  text: string;
} {
  if (days === null)
    return {
      verdict: "warn",
      text: "Registration date not available from RDAP.",
    };
  if (days < 30)
    return {
      verdict: "bad",
      text: "Registered under 30 days ago — very new domains are a common signal in phishing/scam vetting, worth extra scrutiny before you trust or reply.",
    };
  if (days < 180)
    return {
      verdict: "warn",
      text: "Registered under 6 months ago — newer than most established businesses, not necessarily a red flag but worth a second look.",
    };
  return {
    verdict: "good",
    text: "Registered over 6 months ago — old enough that it's not a same-day throwaway domain.",
  };
}

export default function Lookup() {
  const [domainInput, setDomainInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Trust | null>(null);

  async function runCheck(e: React.FormEvent) {
    e.preventDefault();
    const domain = normalizeDomain(domainInput);
    if (!isLikelyDomain(domain)) {
      setError(
        "Enter a real domain, e.g. vendor-company.com — no https:// needed.",
      );
      return;
    }
    setError(null);
    setStatus("loading");
    setResult(null);
    const r = await runDomainTrustLookup(domain);
    setResult(r);
    setStatus("done");
  }

  const age = result?.rdap.ok ? ageRisk(result.rdap.ageDays) : null;

  return (
    <div className="space-y-6">
      {/* INPUT */}
      <form
        onSubmit={runCheck}
        className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            1
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Enter a domain to vet
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            placeholder="vendor-company.com"
            aria-label="Domain to look up"
            className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] outline-none transition"
            style={{
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.18)",
              fontFamily: "var(--font-mono)",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-[var(--cream-3)] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: "var(--terracotta)" }}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Looking up…
              </>
            ) : (
              <>
                <Search className="h-4 w-4" /> Look up domain
              </>
            )}
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}
        <p className="mt-3 text-xs text-[var(--ink-faint)]">
          Registration data via <code className="font-mono">RDAP</code> (the
          successor to WHOIS, registry-sourced), plus a live MX/NS check via{" "}
          <code className="font-mono">dns.google</code>. Nothing is stored.
        </p>
      </form>

      {/* RESULT */}
      {status === "done" && result && (
        <div className="space-y-4">
          {/* RDAP block */}
          <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
            <div className="mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[var(--terracotta-aa)]" />
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                Registration (RDAP)
              </h3>
            </div>

            {result.rdap.ok ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[rgba(26,26,26,0.10)] bg-[var(--cream-3)] px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)]">
                      <Calendar className="h-3.5 w-3.5" /> Registered
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                      {result.rdap.registrationDate
                        ? new Date(
                            result.rdap.registrationDate,
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not published by registry"}
                    </p>
                    <p className="mt-1 text-xs text-[var(--ink-2)]">
                      Domain age: {fmtAge(result.rdap.ageDays)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[rgba(26,26,26,0.10)] bg-[var(--cream-3)] px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)]">
                      <Building2 className="h-3.5 w-3.5" /> Registrar
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                      {result.rdap.registrar ?? "Not published"}
                    </p>
                  </div>
                </div>

                {age && (
                  <div
                    className="flex items-start gap-2 rounded-xl border px-4 py-3"
                    style={{
                      borderColor:
                        age.verdict === "good"
                          ? "rgba(16,185,129,0.35)"
                          : age.verdict === "warn"
                            ? "rgba(217,119,6,0.35)"
                            : "rgba(220,38,38,0.35)",
                      background:
                        age.verdict === "good"
                          ? "rgba(16,185,129,0.06)"
                          : age.verdict === "warn"
                            ? "rgba(217,119,6,0.06)"
                            : "rgba(220,38,38,0.06)",
                    }}
                  >
                    {age.verdict === "good" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    )}
                    <p className="text-sm leading-relaxed text-[var(--ink-2)]">
                      {age.text}
                    </p>
                  </div>
                )}

                {result.rdap.status.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)]">
                      Registry status codes
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.rdap.status.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-2.5 py-1 font-mono text-[11px] text-[var(--ink-2)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-start gap-2 rounded-xl border border-[rgba(220,38,38,0.35)] bg-[rgba(220,38,38,0.06)] px-4 py-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <p className="text-sm leading-relaxed text-[var(--ink-2)]">
                  {result.rdap.error}
                </p>
              </div>
            )}
          </div>

          {/* DNS block */}
          <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
            <div className="mb-3 flex items-center gap-2">
              <Server className="h-4 w-4 text-[var(--terracotta-aa)]" />
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                DNS footprint
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[rgba(26,26,26,0.10)] bg-[var(--cream-3)] px-4 py-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)]">
                  <Globe className="h-3.5 w-3.5" /> Mail provider (MX)
                </div>
                <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                  {result.mx.present ? result.mx.provider : "No MX records"}
                </p>
              </div>
              <div className="rounded-xl border border-[rgba(26,26,26,0.10)] bg-[var(--cream-3)] px-4 py-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)]">
                  <Server className="h-3.5 w-3.5" /> Nameserver provider
                </div>
                <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                  {result.ns.provider}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--ink-faint)]">
              A domain actively receiving mail and running on a recognized DNS
              provider is a weak signal of real operation — not proof, but
              parked/throwaway domains often have neither.
            </p>
          </div>

          <ToolUsage slug="domain-trust-lookup" />
        </div>
      )}

      {/* CROSS-LINKS */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
          Related tools
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools/email-deliverability-checker"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            Email Deliverability Checker →
          </Link>
          <Link
            href="/tools/cold-outreach-compliance-checker"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            Cold Outreach Compliance Checker →
          </Link>
          <Link
            href="/discovery-call"
            className="rounded-full border border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition hover:bg-[rgba(198,107,63,0.18)]"
          >
            Book a discovery call →
          </Link>
        </div>
      </div>
    </div>
  );
}
