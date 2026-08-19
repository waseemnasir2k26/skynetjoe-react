"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, TrendingDown, Zap } from "lucide-react";
import {
  computeSpeedToLead,
  formatUsd,
  responseTimeLabel,
  QUALIFY_INDEX_POINTS,
} from "./calc";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";

const STATE_KEY = "skynet:speed-to-lead-calculator:v1";
const UNLOCK_KEY = "skynet-tool-speed-to-lead-calculator-email";

export default function Calculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(100);
  const [closeRatePct, setCloseRatePct] = useState(20);
  const [dealValue, setDealValue] = useState(1500);
  const [responseTimeMinutes, setResponseTimeMinutes] = useState(120);
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STATE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (typeof s.leadsPerMonth === "number")
          setLeadsPerMonth(s.leadsPerMonth);
        if (typeof s.closeRatePct === "number") setCloseRatePct(s.closeRatePct);
        if (typeof s.dealValue === "number") setDealValue(s.dealValue);
        if (typeof s.responseTimeMinutes === "number")
          setResponseTimeMinutes(s.responseTimeMinutes);
      }
    } catch {
      /* ignore */
    }
    try {
      if (window.localStorage.getItem(UNLOCK_KEY)) setUnlocked(true);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STATE_KEY,
        JSON.stringify({
          leadsPerMonth,
          closeRatePct,
          dealValue,
          responseTimeMinutes,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [leadsPerMonth, closeRatePct, dealValue, responseTimeMinutes, hydrated]);

  const result = useMemo(
    () =>
      computeSpeedToLead({
        leadsPerMonth,
        closeRatePct,
        dealValue,
        responseTimeMinutes,
      }),
    [leadsPerMonth, closeRatePct, dealValue, responseTimeMinutes],
  );

  function handleUnlock() {
    setUnlocked(true);
    setGateOpen(false);
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
            Your numbers
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SliderField
            label="Leads per month"
            value={leadsPerMonth}
            min={5}
            max={2000}
            step={5}
            onChange={setLeadsPerMonth}
            format={(v) => v.toLocaleString("en-US")}
          />
          <SliderField
            label="Current close rate"
            value={closeRatePct}
            min={1}
            max={80}
            step={1}
            onChange={setCloseRatePct}
            format={(v) => `${v}%`}
          />
          <SliderField
            label="Average deal value"
            value={dealValue}
            min={50}
            max={50000}
            step={50}
            onChange={setDealValue}
            format={(v) => formatUsd(v)}
          />
          <SliderField
            label="Current response time"
            value={responseTimeMinutes}
            min={1}
            max={1440}
            step={1}
            onChange={setResponseTimeMinutes}
            format={(v) => responseTimeLabel(v)}
          />
        </div>
        <div className="mt-4">
          <ToolUsage slug="speed-to-lead-calculator" />
        </div>
      </div>

      {/* RESULT */}
      <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
        <div className="border-b border-[rgba(26,26,26,0.12)] px-6 py-6 md:px-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
              2
            </span>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Estimated revenue at risk
            </h2>
          </div>
          <p className="text-sm text-[var(--ink-2)]">
            Responding at {responseTimeLabel(responseTimeMinutes)} instead of
            within 5 minutes, modeled against your own inputs — not a benchmark
            deal size.
          </p>
        </div>

        {unlocked ? (
          <div className="px-6 py-8 md:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                className="rounded-2xl p-6 transition-all duration-500"
                style={{
                  background: "rgba(198,107,63,0.08)",
                  border: "1px solid rgba(198,107,63,0.30)",
                }}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--terracotta-aa)] mb-1">
                  Per month
                </p>
                <p
                  className="font-extrabold text-[var(--ink)] transition-all duration-500"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 4vw, 40px)",
                  }}
                >
                  {formatUsd(result.revenueAtRiskPerMonth)}
                </p>
                <p className="mt-1 text-xs text-[var(--ink-faint)]">
                  ≈ {result.extraDealsPerMonth.toFixed(1)} deals/month modeled
                  as reachable at a 5-minute response
                </p>
              </div>
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.12)",
                }}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-faint)] mb-1">
                  Per year
                </p>
                <p
                  className="font-extrabold text-[var(--ink)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 4vw, 40px)",
                  }}
                >
                  {formatUsd(result.revenueAtRiskPerYear)}
                </p>
                <p className="mt-1 text-xs text-[var(--ink-faint)]">
                  12x the monthly estimate
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-4">
              <Zap className="h-4 w-4 shrink-0 mt-0.5 text-[var(--terracotta-aa)]" />
              <p className="text-sm text-[var(--ink-2)]">
                5-minute response vs. 1-hour response: this model puts a
                5-minute response at roughly{" "}
                <strong className="text-[var(--ink)]">
                  {result.ratio5vs60.toFixed(1)}x
                </strong>{" "}
                the qualification rate of a 1-hour response — most of the
                drop-off happens in the first 30 minutes, per the cited study.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowFormula((s) => !s)}
              className="mt-5 text-xs font-semibold text-[var(--terracotta-aa)] hover:underline"
            >
              {showFormula ? "Hide the formula" : "Show the formula →"}
            </button>

            {showFormula && (
              <div className="mt-4 space-y-3 rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-5 font-mono text-xs leading-relaxed text-[var(--ink-2)]">
                <p>
                  currentIndex = qualifyIndexForMinutes({responseTimeMinutes}) ={" "}
                  {result.currentIndex.toFixed(4)}
                </p>
                <p>bestIndex (5 min) = {result.bestIndex.toFixed(4)}</p>
                <p>
                  upliftRatio = bestIndex / currentIndex ={" "}
                  {result.upliftRatio.toFixed(2)}x
                </p>
                <p>
                  impliedBestCloseRate = min(closeRate × upliftRatio,
                  closeRate+40pt, 95%)
                </p>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;= min({closeRatePct}% ×{" "}
                  {result.upliftRatio.toFixed(2)}, {closeRatePct + 40}%, 95%) ={" "}
                  {result.impliedBestCloseRatePct.toFixed(1)}%
                </p>
                <p>
                  extraDeals/mo = leads × (impliedBestCloseRate − closeRate) /
                  100 = {result.extraDealsPerMonth.toFixed(2)}
                </p>
                <p>
                  revenueAtRisk/mo = extraDeals × dealValue ={" "}
                  {formatUsd(result.revenueAtRiskPerMonth)}
                </p>
                <p className="pt-2 border-t border-[rgba(26,26,26,0.12)] font-sans text-[11px] text-[var(--ink-faint)]">
                  qualifyIndexForMinutes() is a piecewise-linear curve. Only the
                  5-minute (index 1.00) and 30-minute (index 1/21 ≈ 0.048)
                  points are drawn from Oldroyd, McElheran &amp; Elkington,
                  &quot;The Short Life of Online Sales Leads,&quot; Harvard
                  Business Review, March 2011 (~15,000 leads, 2,241 companies,
                  InsideSales.com contact data). The 24-hour floor (index 0.01)
                  and everything interpolated between/beyond those points is
                  this tool&apos;s own straight-line model for illustration — a
                  2011 dataset, directional not guaranteed, and not
                  independently re-measured here.
                </p>
              </div>
            )}
          </div>
        ) : gateOpen ? (
          <div className="px-6 py-6 md:px-8">
            <EmailGate
              toolSlug="speed-to-lead-calculator"
              toolName="Speed-to-Lead Revenue Calculator"
              promise="your full branded revenue-at-risk report"
              onUnlock={handleUnlock}
            />
          </div>
        ) : (
          <div className="px-6 py-8 md:px-8">
            <div className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-6 text-center">
              <TrendingDown className="mx-auto mb-3 h-6 w-6 text-[var(--terracotta-aa)]" />
              <p className="text-sm text-[var(--ink-2)] mb-4">
                Enter your email to see the full dollar estimate and the formula
                behind it.
              </p>
              <button
                type="button"
                onClick={() => setGateOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02]"
                style={{
                  background: "var(--terracotta)",
                  boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
                }}
              >
                <Clock className="h-4 w-4" />
                Show my estimate
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-[var(--ink-faint)]">
        Reference points:{" "}
        {QUALIFY_INDEX_POINTS.map(
          (p) =>
            `${responseTimeLabel(p.minutes)} → index ${p.index.toFixed(3)}`,
        ).join(" · ")}
        .
      </p>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-[var(--ink)]">
          {label}
        </label>
        <span className="rounded-lg bg-[var(--cream-3)] px-2.5 py-1 font-mono text-xs font-bold text-[var(--terracotta-aa)]">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--terracotta)]"
        aria-label={label}
      />
    </div>
  );
}
