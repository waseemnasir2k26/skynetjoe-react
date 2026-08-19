"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Sparkles } from "lucide-react";
import {
  LLM_PRICING,
  PRICING_AS_OF,
  DEFAULT_COST_INPUTS,
  estimateMonthlyCost,
  findModel,
  monthlyRequestVolume,
  type CostInputs,
} from "@/data/tools/llm-pricing";
import ToolUsage from "@/components/tools/ToolUsage";

const STATE_KEY = "skynet:ai-cost-calculator:v1";

function fmtUsd(n: number): string {
  if (n < 1) return `$${n.toFixed(3)}`;
  if (n < 100) return `$${n.toFixed(2)}`;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export default function Calculator() {
  const [inputs, setInputs] = useState<CostInputs>(DEFAULT_COST_INPUTS);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STATE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<CostInputs>;
        setInputs((curr) => ({ ...curr, ...saved }));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STATE_KEY, JSON.stringify(inputs));
    } catch {
      /* ignore */
    }
  }, [inputs, hydrated]);

  function setField<K extends keyof CostInputs>(key: K, value: CostInputs[K]) {
    setInputs((curr) => ({ ...curr, [key]: value }));
  }

  const selectedModel = findModel(inputs.modelId);
  const requestsPerMonth = monthlyRequestVolume(inputs.requestsPerDay);

  const rows = useMemo(
    () =>
      LLM_PRICING.map((m) => ({
        model: m,
        monthlyCost: estimateMonthlyCost(m, inputs),
      })).sort((a, b) => a.monthlyCost - b.monthlyCost),
    [inputs],
  );

  const selectedMonthly = estimateMonthlyCost(selectedModel, inputs);

  async function copySummary() {
    const lines = [
      `AI cost estimate — ${PRICING_AS_OF}`,
      `Selected model: ${selectedModel.provider} ${selectedModel.model}`,
      `Volume: ${inputs.requestsPerDay.toLocaleString("en-US")} requests/day (${requestsPerMonth.toLocaleString("en-US")}/month)`,
      `Avg tokens/request: ${inputs.inputTokensPerRequest.toLocaleString("en-US")} in / ${inputs.outputTokensPerRequest.toLocaleString("en-US")} out`,
      `Estimated monthly cost: ${fmtUsd(selectedMonthly)}`,
      "",
      "Comparison across providers (monthly, approximate):",
      ...rows.map(
        (r) => `${r.model.provider} ${r.model.model}: ${fmtUsd(r.monthlyCost)}`,
      ),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-6">
      {/* INPUTS */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-5 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            1
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Your model + volume
          </h2>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]">
            Model
          </label>
          <div className="flex flex-wrap gap-2">
            {LLM_PRICING.map((m) => {
              const selected = inputs.modelId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setField("modelId", m.id)}
                  className={
                    selected
                      ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                      : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                  }
                  aria-pressed={selected}
                >
                  {m.provider} {m.model}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="requestsPerDay"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]"
            >
              Requests / day
            </label>
            <input
              id="requestsPerDay"
              type="number"
              min={0}
              value={inputs.requestsPerDay}
              onChange={(e) =>
                setField(
                  "requestsPerDay",
                  Math.max(0, Number(e.target.value) || 0),
                )
              }
              className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] focus:outline-none transition"
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.18)",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="inputTokens"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]"
            >
              Avg input tokens / request
            </label>
            <input
              id="inputTokens"
              type="number"
              min={0}
              value={inputs.inputTokensPerRequest}
              onChange={(e) =>
                setField(
                  "inputTokensPerRequest",
                  Math.max(0, Number(e.target.value) || 0),
                )
              }
              className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] focus:outline-none transition"
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.18)",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="outputTokens"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]"
            >
              Avg output tokens / request
            </label>
            <input
              id="outputTokens"
              type="number"
              min={0}
              value={inputs.outputTokensPerRequest}
              onChange={(e) =>
                setField(
                  "outputTokensPerRequest",
                  Math.max(0, Number(e.target.value) || 0),
                )
              }
              className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] focus:outline-none transition"
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.18)",
              }}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--ink-faint)]">
          {requestsPerMonth.toLocaleString("en-US")} requests/month at this
          volume · pricing as of {PRICING_AS_OF}
        </p>
      </div>

      {/* RESULT */}
      <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
        <div className="border-b border-[rgba(26,26,26,0.12)] px-6 py-6 md:px-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
              2
            </span>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Estimated monthly cost
            </h2>
          </div>
          <p className="text-3xl md:text-4xl font-extrabold text-[var(--terracotta-aa)]">
            {fmtUsd(selectedMonthly)}
            <span className="ml-2 text-base font-semibold text-[var(--ink-faint)]">
              / month · {selectedModel.provider} {selectedModel.model}
            </span>
          </p>
        </div>

        <div className="px-6 py-6 md:px-8">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
            Compare across providers, same volume
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-[var(--ink-faint)]">
                  <th className="pb-2 pr-4 font-semibold">Model</th>
                  <th className="pb-2 pr-4 font-semibold">Tier</th>
                  <th className="pb-2 pr-4 font-semibold text-right">
                    $/1M in
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-right">
                    $/1M out
                  </th>
                  <th className="pb-2 font-semibold text-right">
                    Est. monthly
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ model, monthlyCost }) => {
                  const isSelected = model.id === inputs.modelId;
                  return (
                    <tr
                      key={model.id}
                      className={
                        isSelected
                          ? "border-t border-[rgba(26,26,26,0.08)] bg-[rgba(198,107,63,0.08)]"
                          : "border-t border-[rgba(26,26,26,0.08)]"
                      }
                    >
                      <td className="py-2.5 pr-4 font-semibold text-[var(--ink)]">
                        {model.provider} {model.model}
                        {model.note && (
                          <span className="mt-0.5 block max-w-[26ch] text-[11px] font-normal leading-snug text-[var(--ink-faint)]">
                            {model.note}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pr-4 text-[var(--ink-faint)]">
                        {model.tier}
                      </td>
                      <td className="py-2.5 pr-4 text-right text-[var(--ink-2)]">
                        ${model.inputPer1M}
                      </td>
                      <td className="py-2.5 pr-4 text-right text-[var(--ink-2)]">
                        ${model.outputPer1M}
                      </td>
                      <td className="py-2.5 text-right font-bold text-[var(--terracotta-aa)]">
                        {fmtUsd(monthlyCost)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[var(--ink-faint)]">
            All rates as of {PRICING_AS_OF}. This is not a live feed and
            provider pricing changes often — check the provider&apos;s own
            pricing page before budgeting.
          </p>

          <button
            type="button"
            onClick={copySummary}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-3)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[var(--terracotta-aa)]" />
                Copied summary
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy summary
              </>
            )}
          </button>
        </div>
      </div>

      {hydrated && <ToolUsage slug="ai-cost-calculator" />}

      {/* CROSS-LINKS */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
          <Sparkles className="mr-1.5 inline h-3.5 w-3.5" />
          Turn the numbers into a real system
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools/ai-tool-stack-builder"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            AI Tool Stack Builder →
          </Link>
          <Link
            href="/tools/n8n-workflow-generator"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            n8n Workflow Generator →
          </Link>
          <Link
            href="/tools/prompt-library"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            Prompt Library →
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
