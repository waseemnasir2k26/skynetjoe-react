"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Globe,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  parseRobotsTxt,
  evaluateBot,
  assessLlmsTxt,
  TARGET_BOTS,
  type BotVerdict,
  type LlmsTxtQuality,
} from "./parse";
import ToolUsage from "@/components/tools/ToolUsage";

type ProxyResult = { finalUrl: string; status: number; html: string };
type ProxyOutcome =
  | { ok: true; data: ProxyResult }
  | { ok: false; warming: boolean; message: string };

async function fetchViaProxy(url: string): Promise<ProxyOutcome> {
  try {
    const res = await fetch("/api/tool-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (res.status === 404) {
      return {
        ok: false,
        warming: true,
        message:
          "The fetch proxy isn't live yet on this build — try again shortly.",
      };
    }
    if (!res.ok) {
      return {
        ok: false,
        warming: false,
        message: `Proxy returned HTTP ${res.status}.`,
      };
    }
    const json = (await res.json()) as Partial<ProxyResult> & {
      ok?: boolean;
      error?: string;
    };
    if (json.ok === false) {
      return {
        ok: false,
        warming: false,
        message: json.error || "The proxy couldn't fetch that URL.",
      };
    }
    if (typeof json.html !== "string" || typeof json.status !== "number") {
      return {
        ok: false,
        warming: true,
        message: "Proxy response was warming up / malformed — try again.",
      };
    }
    return {
      ok: true,
      data: {
        finalUrl: json.finalUrl || url,
        status: json.status,
        html: json.html,
      },
    };
  } catch {
    return {
      ok: false,
      warming: true,
      message: "Couldn't reach the fetch proxy — try again in a moment.",
    };
  }
}

function normalizeDomain(input: string): string {
  let v = input.trim();
  if (!v) return "";
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  try {
    const u = new URL(v);
    return `${u.protocol}//${u.host}`;
  } catch {
    return "";
  }
}

const VERDICT_META: Record<
  string,
  { label: string; color: string; icon: typeof ShieldCheck }
> = {
  ALLOWED: { label: "Allowed", color: "#4f8a5b", icon: ShieldCheck },
  BLOCKED: { label: "Blocked", color: "#c6483f", icon: ShieldAlert },
  PARTIAL: { label: "Partial", color: "#c68a3f", icon: AlertTriangle },
  NO_ROBOTS: { label: "No robots.txt", color: "#5a7bc6", icon: ShieldQuestion },
};

export default function Checker() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [robotsStatus, setRobotsStatus] = useState<number | null>(null);
  const [verdicts, setVerdicts] = useState<BotVerdict[] | null>(null);
  const [llms, setLlms] = useState<LlmsTxtQuality | null>(null);

  async function runCheck() {
    const normalized = normalizeDomain(domain);
    if (!normalized) {
      setError(
        "Enter a valid domain, e.g. anthropic.com or https://anthropic.com",
      );
      return;
    }
    setError(null);
    setLoading(true);
    setVerdicts(null);
    setLlms(null);
    setOrigin(normalized);

    const [robotsRes, llmsRes] = await Promise.all([
      fetchViaProxy(`${normalized}/robots.txt`),
      fetchViaProxy(`${normalized}/llms.txt`),
    ]);

    if (!robotsRes.ok) {
      setError(robotsRes.message);
      setLoading(false);
      return;
    }

    setRobotsStatus(robotsRes.data.status);
    const groups =
      robotsRes.data.status === 200 ? parseRobotsTxt(robotsRes.data.html) : [];
    const results = TARGET_BOTS.map((bot) =>
      evaluateBot(groups, bot.ua, bot.aliases),
    );
    setVerdicts(results);

    if (llmsRes.ok) {
      setLlms(assessLlmsTxt(llmsRes.data.html, llmsRes.data.status));
    } else {
      setLlms(assessLlmsTxt(null, null));
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* INPUT */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
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
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runCheck()}
            placeholder="anthropic.com"
            className="flex-1 rounded-xl border border-[rgba(26,26,26,0.15)] bg-[var(--cream-3)] px-4 py-3.5 font-mono text-sm text-[var(--ink)] outline-none focus:border-[var(--terracotta)]"
          />
          <button
            type="button"
            onClick={runCheck}
            disabled={loading || !domain.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: "var(--terracotta)",
              boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
            }}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Globe className="h-4 w-4" />
            )}
            {loading ? "Checking…" : "Check AI crawler access"}
          </button>
        </div>
        <p className="mt-3 text-xs text-[var(--ink-faint)]">
          Fetches the real /robots.txt and /llms.txt over a server-side proxy —
          no fabricated results.
        </p>
        <div className="mt-4">
          <ToolUsage slug="ai-crawler-access-checker" />
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-[rgba(198,72,63,0.35)] bg-[rgba(198,72,63,0.06)] p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-[#c6483f]">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </p>
        </div>
      )}

      {verdicts && origin && (
        <>
          <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
            <div className="border-b border-[rgba(26,26,26,0.12)] px-6 py-4 md:px-8">
              <h2 className="text-lg font-extrabold text-[var(--ink)]">
                {origin.replace(/^https?:\/\//, "")}/robots.txt
                {robotsStatus != null && (
                  <span className="ml-2 text-xs font-mono font-normal text-[var(--ink-faint)]">
                    HTTP {robotsStatus}
                  </span>
                )}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(26,26,26,0.12)] text-left">
                    <th className="px-6 py-3 font-bold text-[var(--ink)] md:px-8">
                      AI crawler
                    </th>
                    <th className="px-4 py-3 font-bold text-[var(--ink)]">
                      Verdict
                    </th>
                    <th className="px-4 py-3 font-bold text-[var(--ink)]">
                      Matched group
                    </th>
                    <th className="px-4 py-3 font-bold text-[var(--ink)]">
                      Blocked paths
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {verdicts.map((v, i) => {
                    const bot = TARGET_BOTS[i];
                    const meta = VERDICT_META[v.verdict];
                    const Icon = meta.icon;
                    return (
                      <tr
                        key={v.ua}
                        className="border-b border-[rgba(26,26,26,0.08)]"
                      >
                        <td className="px-6 py-3.5 font-semibold text-[var(--ink)] md:px-8">
                          {bot.label}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
                            style={{
                              background: `${meta.color}18`,
                              color: meta.color,
                            }}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {meta.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs text-[var(--ink-faint)]">
                          {v.matchedGroup ?? "—"}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs text-[var(--ink-faint)]">
                          {v.blockedPaths.length
                            ? v.blockedPaths.join(", ")
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {llms && (
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2">
                {llms.present ? (
                  <CheckCircle2 className="h-5 w-5 text-[#4f8a5b]" />
                ) : (
                  <ShieldQuestion className="h-5 w-5 text-[#5a7bc6]" />
                )}
                <h2 className="text-lg font-extrabold text-[var(--ink)]">
                  /llms.txt —{" "}
                  {llms.present
                    ? `found, ${llms.wordCount} words`
                    : "not found"}
                </h2>
              </div>
              <ul className="space-y-1.5 text-sm text-[var(--ink-2)]">
                {llms.notes.map((n, i) => (
                  <li key={i}>• {n}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                <Link
                  href="/tools/llms-txt-generator"
                  className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  Generate/fix your llms.txt →
                </Link>
                <Link
                  href="/tools/aeo-audit"
                  className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  Run the full AEO audit →
                </Link>
              </div>
            </div>
          )}

          {verdicts.some(
            (v) => v.verdict === "BLOCKED" || v.verdict === "PARTIAL",
          ) && (
            <div className="rounded-2xl border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.06)] p-5">
              <p className="text-sm font-semibold text-[var(--ink)]">
                One or more AI crawlers are blocked or partially blocked.
              </p>
              <p className="mt-1 text-sm text-[var(--ink-2)]">
                If you want to show up in ChatGPT, Claude, and Perplexity
                answers, this is worth fixing deliberately — not by accident.
              </p>
              <Link
                href="/tools/aeo-audit"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                Get an AEO fix plan →
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
