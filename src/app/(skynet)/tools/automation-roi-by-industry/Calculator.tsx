"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Clock, TrendingUp } from "lucide-react";
import {
  INDUSTRIES,
  computeRoi,
  formatUsd,
  type IndustryKey,
} from "@/data/tools/automation-roi";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";

const CAL_URL = "https://calendly.com/skynetlabs/schedule-a-free-consultation";

export default function Calculator() {
  const [industryKey, setIndustryKey] = useState<IndustryKey>(
    INDUSTRIES[0].key,
  );
  const [tasksPerWeek, setTasksPerWeek] = useState(40);
  const [minutesPerTask, setMinutesPerTask] = useState(8);
  const [unlocked, setUnlocked] = useState(false);

  const industry = INDUSTRIES.find((i) => i.key === industryKey)!;
  const hourlyCost = industry.hourlyCostRange[0];

  const result = computeRoi({
    industry: industryKey,
    tasksPerWeek,
    minutesPerTask,
    hourlyCost,
  });

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            1
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Pick your industry
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((i) => {
            const selected = industryKey === i.key;
            return (
              <button
                key={i.key}
                type="button"
                onClick={() => setIndustryKey(i.key)}
                aria-pressed={selected}
                className={
                  selected
                    ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                    : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                }
              >
                {i.label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--ink-faint)]">
          {industry.note} Common tasks: {industry.commonTasks.join(", ")}.
        </p>
      </div>

      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            2
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Your volumes
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <label className="block">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[var(--ink-2)]">
              <span>Manual task occurrences / week</span>
              <span className="text-[var(--terracotta-aa)]">
                {tasksPerWeek}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={400}
              step={5}
              value={tasksPerWeek}
              onChange={(e) => setTasksPerWeek(Number(e.target.value))}
              className="w-full accent-[var(--terracotta)]"
            />
          </label>
          <label className="block">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[var(--ink-2)]">
              <span>Minutes spent per occurrence</span>
              <span className="text-[var(--terracotta-aa)]">
                {minutesPerTask} min
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={60}
              step={1}
              value={minutesPerTask}
              onChange={(e) => setMinutesPerTask(Number(e.target.value))}
              className="w-full accent-[var(--terracotta)]"
            />
          </label>
        </div>
        <p className="mt-4 text-xs text-[var(--ink-faint)]">
          Calculated at a typical fully-loaded staff cost for this vertical of{" "}
          {formatUsd(hourlyCost)}/hr — the low end of the{" "}
          {formatUsd(industry.hourlyCostRange[0])}–
          {formatUsd(industry.hourlyCostRange[1])}/hr range.
        </p>
      </div>

      {/* Headline result — ungated teaser */}
      {result && (
        <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
          <div
            className="px-6 py-8 md:px-10 md:py-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(198,107,63,0.16) 0%, rgba(198,107,63,0.04) 100%)",
              borderBottom: "1px solid rgba(198,107,63,0.30)",
            }}
          >
            <div className="mb-2 flex items-center gap-2 text-[var(--terracotta-aa)]">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">
                Typical range for {industry.label}
              </span>
            </div>
            <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <div className="text-4xl font-extrabold text-[var(--ink)] md:text-5xl">
                  {result.hoursSavedPerWeek.low}–{result.hoursSavedPerWeek.high}
                  <span className="ml-1 text-lg text-[var(--ink-faint)]">
                    hrs/wk
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--ink-faint)]">
                  time saved on the tasks above
                </p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[var(--ink)] md:text-5xl">
                  {formatUsd(result.dollarsSavedPerYear.low)}–
                  {formatUsd(result.dollarsSavedPerYear.high)}
                </div>
                <p className="mt-1 text-xs text-[var(--ink-faint)]">
                  per year, at {formatUsd(hourlyCost)}/hr
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-[var(--ink-faint)]">
              Directional planning range, not a guarantee — based on the typical{" "}
              {Math.round(industry.reductionRange[0] * 100)}–
              {Math.round(industry.reductionRange[1] * 100)}% time-reduction
              seen when this class of task is automated. Your actual result
              depends on process complexity and current tooling.
            </p>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            {!unlocked ? (
              <EmailGate
                toolSlug="automation-roi-by-industry"
                toolName="Automation ROI by Industry"
                promise="the full task-by-task breakdown + your annual savings report"
                onUnlock={() => setUnlocked(true)}
              />
            ) : (
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
                  Full breakdown
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-4">
                    <Clock className="mb-2 h-4 w-4 text-[var(--terracotta-aa)]" />
                    <div className="text-xl font-extrabold text-[var(--ink)]">
                      {result.hoursSavedPerYear.low}–
                      {result.hoursSavedPerYear.high} hrs/yr
                    </div>
                    <p className="mt-1 text-xs text-[var(--ink-faint)]">
                      Total manual hours reclaimed annually
                    </p>
                  </div>
                  <div className="rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-4">
                    <TrendingUp className="mb-2 h-4 w-4 text-[var(--terracotta-aa)]" />
                    <div className="text-xl font-extrabold text-[var(--ink)]">
                      {formatUsd(result.dollarsSavedPerYear.low)}–
                      {formatUsd(result.dollarsSavedPerYear.high)}
                    </div>
                    <p className="mt-1 text-xs text-[var(--ink-faint)]">
                      Annual cost saved at {formatUsd(hourlyCost)}/hr
                    </p>
                  </div>
                  <div className="rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-4">
                    <CalendarCheck className="mb-2 h-4 w-4 text-[var(--terracotta-aa)]" />
                    <div className="text-xl font-extrabold text-[var(--ink)]">
                      {industry.commonTasks.length} tasks
                    </div>
                    <p className="mt-1 text-xs text-[var(--ink-faint)]">
                      Typically automated first in this vertical
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {industry.commonTasks.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm text-[var(--ink-2)]"
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--terracotta)]" />
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${CAL_URL}?utm_source=automation-roi-by-industry&utm_content=${industry.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] transition hover:scale-[1.02]"
                  style={{
                    background: "var(--terracotta)",
                    boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
                  }}
                >
                  <CalendarCheck className="h-4 w-4" />
                  Book a call — scope the real numbers
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <ToolUsage slug="automation-roi-by-industry" />

      <p className="text-xs leading-relaxed text-[var(--ink-faint)]">
        Methodology:{" "}
        <Link href="/tools/revenue-calculator" className="underline">
          related — revenue recovery calculator
        </Link>{" "}
        ranges are directional planning estimates based on typical
        time-reduction seen when this class of manual task is automated, applied
        to the volumes you enter above — not a study, not a guarantee, not a
        precise measured figure.
      </p>
    </div>
  );
}
