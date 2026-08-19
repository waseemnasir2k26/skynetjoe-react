"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MessageSquareText,
  Mail,
  ExternalLink,
  AlertOctagon,
} from "lucide-react";
import {
  runEmailComplianceChecks,
  runSmsComplianceChecks,
  type RuleResult,
} from "./rules";
import ToolUsage from "@/components/tools/ToolUsage";

function SeverityIcon({ s }: { s: RuleResult["severity"] }) {
  if (s === "pass")
    return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
  if (s === "warn") return <AlertTriangle className="h-5 w-5 text-amber-600" />;
  return <XCircle className="h-5 w-5 text-red-600" />;
}

function border(s: RuleResult["severity"]): string {
  if (s === "pass") return "rgba(16,185,129,0.35)";
  if (s === "warn") return "rgba(217,119,6,0.35)";
  return "rgba(220,38,38,0.35)";
}
function bg(s: RuleResult["severity"]): string {
  if (s === "pass") return "rgba(16,185,129,0.06)";
  if (s === "warn") return "rgba(217,119,6,0.06)";
  return "rgba(220,38,38,0.06)";
}

export default function Checker() {
  const [mode, setMode] = useState<"email" | "sms">("email");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [ran, setRan] = useState(false);

  const results = useMemo<RuleResult[]>(() => {
    if (mode === "email") return runEmailComplianceChecks(subject, body);
    return runSmsComplianceChecks(body);
  }, [mode, subject, body]);

  const failCount = results.filter((r) => r.severity === "fail").length;
  const warnCount = results.filter((r) => r.severity === "warn").length;

  return (
    <div className="space-y-6">
      {/* NOT LEGAL ADVICE banner — prominent, above the tool */}
      <div
        className="flex items-start gap-3 rounded-2xl border p-4"
        style={{
          borderColor: "rgba(220,38,38,0.35)",
          background: "rgba(220,38,38,0.06)",
        }}
      >
        <AlertOctagon className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
        <p className="text-sm leading-relaxed text-[var(--ink-2)]">
          <strong className="text-[var(--ink)]">Not legal advice.</strong> This
          tool runs deterministic text heuristics against public FTC/FCC
          guidance — it cannot read your full sending setup, your consent
          records, or your jurisdiction&apos;s rules. Rules marked{" "}
          <span className="font-mono text-xs">heuristic</span> are
          deliverability signals, not legal requirements. Consult a lawyer for
          an actual compliance opinion.
        </p>
      </div>

      {/* INPUT */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            1
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Paste your outreach copy
          </h2>
        </div>

        <div className="mb-4 flex gap-2">
          {(["email", "sms"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={
                mode === m
                  ? "inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                  : "inline-flex items-center gap-1.5 rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
              }
            >
              {m === "email" ? (
                <Mail className="h-3.5 w-3.5" />
              ) : (
                <MessageSquareText className="h-3.5 w-3.5" />
              )}
              {m === "email" ? "Email" : "SMS"}
            </button>
          ))}
        </div>

        {mode === "email" && (
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]"
            >
              Subject line
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setRan(true);
              }}
              placeholder="Quick question about your team's automation"
              className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] outline-none transition"
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.18)",
              }}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="body"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]"
          >
            {mode === "email" ? "Email body" : "SMS text"}
          </label>
          <textarea
            id="body"
            rows={mode === "email" ? 10 : 5}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setRan(true);
            }}
            placeholder={
              mode === "email"
                ? "Paste your full email copy, including signature/footer…"
                : "Paste your SMS message text…"
            }
            className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] outline-none transition"
            style={{
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.18)",
              fontFamily: "var(--font-mono)",
            }}
          />
        </div>
        <p className="mt-3 text-xs text-[var(--ink-faint)]">
          Checks run live as you type, entirely in your browser. Nothing is sent
          anywhere.
        </p>
      </div>

      {/* RESULTS */}
      {ran && (body.trim() || subject.trim()) && (
        <div className="space-y-4">
          <div
            className="rounded-3xl border p-6 md:p-8"
            style={{
              borderColor: border(
                failCount > 0 ? "fail" : warnCount > 0 ? "warn" : "pass",
              ),
              background: bg(
                failCount > 0 ? "fail" : warnCount > 0 ? "warn" : "pass",
              ),
            }}
          >
            <p className="text-lg font-extrabold text-[var(--ink)]">
              {failCount > 0
                ? `${failCount} check${failCount === 1 ? "" : "s"} failed, ${warnCount} to review`
                : warnCount > 0
                  ? `${warnCount} check${warnCount === 1 ? "" : "s"} to review`
                  : "All checks passed"}
            </p>
          </div>

          {results.map((r) => (
            <div
              key={r.id}
              className="rounded-3xl border p-6 md:p-8"
              style={{
                borderColor: border(r.severity),
                background: "var(--cream-2)",
              }}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <SeverityIcon s={r.severity} />
                <h3 className="text-base font-extrabold text-[var(--ink)]">
                  {r.label}
                </h3>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                  style={{
                    background:
                      r.kind === "law"
                        ? "rgba(198,107,63,0.15)"
                        : "rgba(26,26,26,0.08)",
                    color:
                      r.kind === "law"
                        ? "var(--terracotta-aa)"
                        : "var(--ink-faint)",
                  }}
                >
                  {r.kind === "law"
                    ? "Statute/FCC-FTC rule"
                    : "Heuristic, not law"}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-2)]">
                {r.detail}
              </p>
              <a
                href={r.citation.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                {r.citation.label} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}

          <ToolUsage slug="cold-outreach-compliance-checker" />
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
            href="/tools/domain-trust-lookup"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            Domain Trust & Age Lookup →
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
