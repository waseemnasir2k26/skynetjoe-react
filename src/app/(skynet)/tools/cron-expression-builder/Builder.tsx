"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, Copy } from "lucide-react";
import {
  FREQUENCIES,
  WEEKDAYS,
  DEFAULT_SCHEDULE,
  buildCronExpression,
  humanReadable,
  buildN8nScheduleNode,
  N8N_MINUTES_GOTCHA,
  CRON_FIELD_GUIDE,
  type Frequency,
  type ScheduleConfig,
} from "@/data/tools/cron-schedules";
import ToolUsage from "@/components/tools/ToolUsage";

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
          : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
      }
    >
      {children}
    </button>
  );
}

export default function Builder() {
  const [cfg, setCfg] = useState<ScheduleConfig>(DEFAULT_SCHEDULE);
  const [copyState, setCopyState] = useState<"idle" | "cron" | "node">("idle");

  const cron = useMemo(() => buildCronExpression(cfg), [cfg]);
  const sentence = useMemo(() => humanReadable(cfg), [cfg]);
  const { cronNode, nativeFieldsNote } = useMemo(
    () => buildN8nScheduleNode(cfg),
    [cfg],
  );

  function setFreq(frequency: Frequency) {
    setCfg((c) => ({ ...c, frequency }));
  }

  function toggleWeekday(day: number) {
    setCfg((c) => ({
      ...c,
      weekdays: c.weekdays.includes(day)
        ? c.weekdays.filter((d) => d !== day)
        : [...c.weekdays, day].sort(),
    }));
  }

  async function copy(text: string, which: "cron" | "node") {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState(which);
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <div className="space-y-6">
      {/* Frequency */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            1
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            How often?
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {FREQUENCIES.map((f) => (
            <Pill
              key={f.value}
              active={cfg.frequency === f.value}
              onClick={() => setFreq(f.value)}
            >
              {f.label}
            </Pill>
          ))}
        </div>
      </div>

      {/* Detail controls */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            2
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Set the details
          </h2>
        </div>

        {cfg.frequency === "everyMinutes" && (
          <label className="block text-sm font-semibold text-[var(--ink-2)]">
            Every
            <input
              type="number"
              min={1}
              max={59}
              value={cfg.everyN}
              onChange={(e) =>
                setCfg((c) => ({
                  ...c,
                  everyN: Math.min(
                    59,
                    Math.max(1, Number(e.target.value) || 1),
                  ),
                }))
              }
              className="mx-2 w-20 rounded-lg border border-[rgba(26,26,26,0.18)] bg-[var(--cream-3)] px-3 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--terracotta)]"
            />
            minutes
          </label>
        )}

        {(cfg.frequency === "hourly" ||
          cfg.frequency === "daily" ||
          cfg.frequency === "weekly" ||
          cfg.frequency === "monthly") && (
          <div className="flex flex-wrap items-end gap-4">
            {cfg.frequency !== "hourly" && (
              <label className="text-sm font-semibold text-[var(--ink-2)]">
                Hour (24h)
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={cfg.hour}
                  onChange={(e) =>
                    setCfg((c) => ({
                      ...c,
                      hour: Math.min(
                        23,
                        Math.max(0, Number(e.target.value) || 0),
                      ),
                    }))
                  }
                  className="mt-1 block w-20 rounded-lg border border-[rgba(26,26,26,0.18)] bg-[var(--cream-3)] px-3 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--terracotta)]"
                />
              </label>
            )}
            <label className="text-sm font-semibold text-[var(--ink-2)]">
              Minute
              <input
                type="number"
                min={0}
                max={59}
                value={cfg.minute}
                onChange={(e) =>
                  setCfg((c) => ({
                    ...c,
                    minute: Math.min(
                      59,
                      Math.max(0, Number(e.target.value) || 0),
                    ),
                  }))
                }
                className="mt-1 block w-20 rounded-lg border border-[rgba(26,26,26,0.18)] bg-[var(--cream-3)] px-3 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--terracotta)]"
              />
            </label>
            {cfg.frequency === "monthly" && (
              <label className="text-sm font-semibold text-[var(--ink-2)]">
                Day of month
                <input
                  type="number"
                  min={1}
                  max={28}
                  value={cfg.dayOfMonth}
                  onChange={(e) =>
                    setCfg((c) => ({
                      ...c,
                      dayOfMonth: Math.min(
                        28,
                        Math.max(1, Number(e.target.value) || 1),
                      ),
                    }))
                  }
                  className="mt-1 block w-20 rounded-lg border border-[rgba(26,26,26,0.18)] bg-[var(--cream-3)] px-3 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--terracotta)]"
                />
              </label>
            )}
          </div>
        )}

        {cfg.frequency === "weekly" && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-faint)]">
              Days
            </p>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((d) => (
                <Pill
                  key={d.value}
                  active={cfg.weekdays.includes(d.value)}
                  onClick={() => toggleWeekday(d.value)}
                >
                  {d.label}
                </Pill>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Output */}
      <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
        <div className="border-b border-[rgba(26,26,26,0.12)] px-6 py-6 md:px-8">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
            In plain English
          </p>
          <p className="text-lg font-semibold text-[var(--ink)] md:text-xl">
            {sentence}
          </p>
        </div>

        <div className="px-6 py-6 md:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
            Cron expression
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <code className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2.5 font-mono text-base font-semibold text-[var(--ink)]">
              {cron}
            </code>
            <button
              type="button"
              onClick={() => copy(cron, "cron")}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--cream-3)] transition"
              style={{ background: "var(--terracotta)" }}
            >
              {copyState === "cron" ? (
                <>
                  <Check className="h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-5">
            {CRON_FIELD_GUIDE.map((g) => (
              <div
                key={g.field}
                className="rounded-lg border border-[rgba(26,26,26,0.10)] bg-[var(--cream-3)] px-2.5 py-2 text-center"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-faint)]">
                  {g.field}
                </div>
                <div className="text-[11px] text-[var(--ink-2)]">{g.range}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[rgba(26,26,26,0.12)] px-6 py-6 md:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
            n8n Schedule Trigger config
          </p>
          <pre className="max-h-[220px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-3.5 font-mono text-[11px] leading-relaxed text-[var(--ink)]">
            {JSON.stringify(cronNode, null, 2)}
          </pre>
          <button
            type="button"
            onClick={() => copy(JSON.stringify(cronNode, null, 2), "node")}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            {copyState === "node" ? (
              <>
                <Check className="h-4 w-4" /> Copied node config
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy node config
              </>
            )}
          </button>

          <div className="mt-5 rounded-xl border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.08)] p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[var(--terracotta-aa)]" />
              <p className="text-sm font-bold text-[var(--terracotta-aa)]">
                n8n gotcha
              </p>
            </div>
            <p className="text-sm leading-relaxed text-[var(--ink-2)]">
              {N8N_MINUTES_GOTCHA}
            </p>
          </div>

          {nativeFieldsNote && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                Native-fields equivalent (recommended over raw cron in the n8n
                UI)
              </p>
              <pre className="max-h-[220px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-3.5 font-mono text-[11px] leading-relaxed text-[var(--ink)]">
                {nativeFieldsNote}
              </pre>
            </div>
          )}
        </div>
      </div>

      <ToolUsage slug="cron-expression-builder" />
    </div>
  );
}
