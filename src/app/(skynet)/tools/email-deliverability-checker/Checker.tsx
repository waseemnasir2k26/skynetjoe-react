"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Mail,
  Server,
  KeyRound,
} from "lucide-react";
import {
  isLikelyDomain,
  normalizeDomain,
  runEmailDeliverabilityCheck,
  type EmailDeliverabilityReport,
} from "@/lib/tools/dns";
import ToolUsage from "@/components/tools/ToolUsage";
import EmailGate from "@/components/cta/EmailGate";

function VerdictIcon({ v }: { v: "good" | "warn" | "bad" }) {
  if (v === "good")
    return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
  if (v === "warn") return <AlertTriangle className="h-5 w-5 text-amber-600" />;
  return <XCircle className="h-5 w-5 text-red-600" />;
}

function verdictBorder(v: "good" | "warn" | "bad"): string {
  if (v === "good") return "rgba(16,185,129,0.35)";
  if (v === "warn") return "rgba(217,119,6,0.35)";
  return "rgba(220,38,38,0.35)";
}
function verdictBg(v: "good" | "warn" | "bad"): string {
  if (v === "good") return "rgba(16,185,129,0.06)";
  if (v === "warn") return "rgba(217,119,6,0.06)";
  return "rgba(220,38,38,0.06)";
}

const CHECKLIST = [
  "Publish SPF with -all once every sending source is enumerated (a stray ~all leaves the door open).",
  "Set DMARC to p=quarantine first, watch the rua reports for 2-3 weeks, then move to p=reject.",
  "Rotate DKIM keys per sending platform — one shared selector across 3 ESPs is a single point of failure.",
  "Warm up any new sending domain for 2-3 weeks before cold volume — sudden spikes trigger spam filters regardless of SPF/DKIM/DMARC.",
  "Never send cold outreach from your primary domain's root — use a dedicated subdomain so a bad sender reputation doesn't sink your main inbox.",
  "Re-run this checker after every DNS change — propagation can take up to 48 hours, and a mid-change record can look worse than either end state.",
];

export default function Checker() {
  const [domainInput, setDomainInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<EmailDeliverabilityReport | null>(null);
  const [checklistUnlocked, setChecklistUnlocked] = useState(false);

  async function runCheck(e: React.FormEvent) {
    e.preventDefault();
    const domain = normalizeDomain(domainInput);
    if (!isLikelyDomain(domain)) {
      setError(
        "Enter a real domain, e.g. yourcompany.com — no https:// needed.",
      );
      return;
    }
    setError(null);
    setStatus("loading");
    setReport(null);
    try {
      const r = await runEmailDeliverabilityCheck(domain);
      setReport(r);
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something broke reaching dns.google — try again in a moment.");
    }
  }

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
            Enter a domain
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
            placeholder="yourcompany.com"
            aria-label="Domain to check"
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
                <Loader2 className="h-4 w-4 animate-spin" /> Checking live DNS…
              </>
            ) : (
              <>
                <Search className="h-4 w-4" /> Check deliverability
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
          Live query against <code className="font-mono">dns.google</code>{" "}
          (Google Public DNS-over-HTTPS) — nothing is cached, nothing is stored
          server-side.
        </p>
      </form>

      {/* RESULT */}
      {status === "done" && report && (
        <div className="space-y-4">
          {/* Overall banner */}
          <div
            className="rounded-3xl border p-6 md:p-8"
            style={{
              borderColor: verdictBorder(report.overall),
              background: verdictBg(report.overall),
            }}
          >
            <div className="flex items-center gap-3">
              <VerdictIcon v={report.overall} />
              <p className="text-lg font-extrabold text-[var(--ink)]">
                {report.domain} —{" "}
                {report.overall === "good"
                  ? "solid email authentication"
                  : report.overall === "warn"
                    ? "partially protected, room to tighten"
                    : "significant gaps found"}
              </p>
            </div>
            {!report.domainExists && (
              <p className="mt-3 text-sm text-[var(--ink-2)]">
                Note: no TXT, MX, or DKIM records resolved at all for this
                domain — double-check the spelling, or this domain may not be
                configured to send mail.
              </p>
            )}
          </div>

          {/* SPF */}
          <div
            className="rounded-3xl border p-6 md:p-8"
            style={{
              borderColor: verdictBorder(report.spf.verdict),
              background: "var(--cream-2)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-[var(--terracotta-aa)]" />
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                SPF (Sender Policy Framework)
              </h3>
              <VerdictIcon v={report.spf.verdict} />
            </div>
            <p className="text-sm leading-relaxed text-[var(--ink-2)]">
              {report.spf.verdictText}
            </p>
            {report.spf.record && (
              <>
                <code className="mt-3 block overflow-x-auto rounded-lg border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-3 py-2 font-mono text-xs text-[var(--ink)]">
                  {report.spf.record}
                </code>
                <p className="mt-2 text-xs text-[var(--ink-faint)]">
                  {report.spf.lookupMechanismCount} lookup-costing mechanism
                  {report.spf.lookupMechanismCount === 1 ? "" : "s"} on this
                  record (RFC 7208 caps SPF at 10 total DNS lookups, including
                  nested includes not shown here) · qualifier:{" "}
                  <span className="font-mono">{report.spf.allQualifier}</span>
                </p>
              </>
            )}
          </div>

          {/* DMARC */}
          <div
            className="rounded-3xl border p-6 md:p-8"
            style={{
              borderColor: verdictBorder(report.dmarc.verdict),
              background: "var(--cream-2)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Server className="h-4 w-4 text-[var(--terracotta-aa)]" />
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                DMARC (Domain-based Message Authentication)
              </h3>
              <VerdictIcon v={report.dmarc.verdict} />
            </div>
            <p className="text-sm leading-relaxed text-[var(--ink-2)]">
              {report.dmarc.verdictText}
            </p>
            {report.dmarc.record && (
              <code className="mt-3 block overflow-x-auto rounded-lg border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-3 py-2 font-mono text-xs text-[var(--ink)]">
                {report.dmarc.record}
              </code>
            )}
          </div>

          {/* DKIM */}
          <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
            <div className="mb-2 flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[var(--terracotta-aa)]" />
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                DKIM (DomainKeys Identified Mail) — common selectors probed
              </h3>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-[var(--ink-2)]">
              There&apos;s no DNS record listing which DKIM selectors a domain uses,
              so this probes {report.dkim.length} common selector names
              directly. A miss here doesn&apos;t prove DKIM is absent — it may use a
              custom selector this probe doesn&apos;t know about.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {report.dkim.map((d) => (
                <div
                  key={d.selector}
                  className="flex items-center gap-2 rounded-lg border border-[rgba(26,26,26,0.10)] bg-[var(--cream-3)] px-3 py-2"
                >
                  {d.found ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 shrink-0 text-[var(--ink-faint)]" />
                  )}
                  <span className="font-mono text-xs text-[var(--ink-2)]">
                    {d.selector}
                  </span>
                </div>
              ))}
            </div>
            {report.dkim.some((d) => d.found) ? (
              <p className="mt-3 text-xs text-[var(--ink-faint)]">
                At least one selector resolved — DKIM signing is configured for
                this domain (via a known selector name).
              </p>
            ) : (
              <p className="mt-3 text-xs text-[var(--ink-faint)]">
                None of the {report.dkim.length} common selectors resolved.
                Check your ESP&apos;s DKIM setup page for the selector it actually
                uses if you know DKIM is configured.
              </p>
            )}
          </div>

          {/* MX */}
          <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
            <div className="mb-2 flex items-center gap-2">
              <Server className="h-4 w-4 text-[var(--terracotta-aa)]" />
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                MX — mail provider
              </h3>
            </div>
            {report.mx.present ? (
              <>
                <p className="text-sm font-semibold text-[var(--ink)]">
                  {report.mx.provider}
                </p>
                <div className="mt-2 space-y-1">
                  {report.mx.hosts.map((h) => (
                    <code
                      key={h}
                      className="block font-mono text-xs text-[var(--ink-faint)]"
                    >
                      {h}
                    </code>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-[var(--ink-2)]">
                No MX records — this domain isn&apos;t configured to receive mail.
              </p>
            )}
          </div>

          <ToolUsage slug="email-deliverability-checker" />

          {/* Lead hook — only when DMARC policy is weak/absent */}
          {report.dmarc.verdict === "bad" && !checklistUnlocked && (
            <EmailGate
              toolSlug="email-deliverability-checker"
              toolName="Email Deliverability Checker"
              promise="the cold-email infrastructure checklist"
              onUnlock={() => setChecklistUnlocked(true)}
            />
          )}
          {report.dmarc.verdict === "bad" && checklistUnlocked && (
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
              <h3 className="mb-4 text-base font-extrabold text-[var(--ink)]">
                Cold-email infrastructure checklist
              </h3>
              <ul className="space-y-2.5">
                {CHECKLIST.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-[var(--ink-2)]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--terracotta-aa)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* CROSS-LINKS */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
          Related tools
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools/domain-trust-lookup"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            Domain Trust & Age Lookup →
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
