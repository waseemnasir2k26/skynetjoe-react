"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Copy,
  Download,
  GitBranch,
  ListChecks,
  Workflow,
} from "lucide-react";
import {
  BUSINESS_TYPES,
  findSnapshotPlan,
  buildChecklistText,
  type BusinessTypeKey,
} from "@/data/tools/ghl-snapshots";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";

function downloadTxt(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Planner() {
  const [typeKey, setTypeKey] = useState<BusinessTypeKey>(
    BUSINESS_TYPES[0].key,
  );
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const plan = useMemo(() => findSnapshotPlan(typeKey)!, [typeKey]);
  const checklistText = useMemo(() => buildChecklistText(plan), [plan]);

  function handleExportClick() {
    if (!unlocked) {
      setGateOpen(true);
      return;
    }
    downloadTxt(`ghl-snapshot-plan-${plan.key}.txt`, checklistText);
  }

  function handleUnlock() {
    setUnlocked(true);
    setGateOpen(false);
    downloadTxt(`ghl-snapshot-plan-${plan.key}.txt`, checklistText);
  }

  async function copyChecklist() {
    try {
      await navigator.clipboard.writeText(checklistText);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <div className="space-y-6">
      {/* Business type picker */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            1
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            What kind of business?
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPES.map((t) => {
            const selected = typeKey === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTypeKey(t.key)}
                aria-pressed={selected}
                className={
                  selected
                    ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                    : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Plan preview */}
      <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
        <div className="border-b border-[rgba(26,26,26,0.12)] px-6 py-6 md:px-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
              2
            </span>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Your recommended snapshot structure
            </h2>
          </div>
          <p className="text-sm text-[var(--ink-2)]">
            For: <span className="font-semibold">{plan.label}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2 md:px-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[var(--terracotta-aa)]">
              <GitBranch className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Pipelines
              </p>
            </div>
            <div className="space-y-4">
              {plan.pipelines.map((p) => (
                <div key={p.name}>
                  <p className="mb-1.5 text-sm font-semibold text-[var(--ink)]">
                    {p.name}
                  </p>
                  <ol className="space-y-1">
                    {p.stages.map((s, i) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm text-[var(--ink-2)]"
                      >
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(198,107,63,0.12)] text-[10px] font-bold text-[var(--terracotta-aa)]">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-[var(--terracotta-aa)]">
              <Workflow className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Workflows
              </p>
            </div>
            <ul className="space-y-1.5">
              {plan.workflows.map((w) => (
                <li
                  key={w}
                  className="flex items-center gap-2 text-sm text-[var(--ink-2)]"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--terracotta)]" />
                  {w}
                </li>
              ))}
            </ul>

            <div className="mt-6 mb-3 flex items-center gap-2 text-[var(--terracotta-aa)]">
              <ListChecks className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Custom fields
              </p>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {plan.customFields.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-2.5 py-1 text-xs text-[var(--ink-2)]"
                >
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 mb-3 flex items-center gap-2 text-[var(--terracotta-aa)]">
              <CalendarCheck className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Calendars
              </p>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {plan.calendars.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-2.5 py-1 text-xs text-[var(--ink-2)]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-6 py-6 md:px-8">
          {gateOpen && !unlocked ? (
            <EmailGate
              toolSlug="ghl-snapshot-planner"
              toolName="GHL Snapshot Planner"
              promise="your exportable snapshot checklist"
              onUnlock={handleUnlock}
            />
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleExportClick}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
                style={{
                  background: "var(--terracotta)",
                  boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
                }}
              >
                <Download className="h-4 w-4" />
                Export checklist (.txt)
              </button>
              {unlocked && (
                <button
                  type="button"
                  onClick={copyChecklist}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-5 py-4 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
                >
                  {copyState === "copied" ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy checklist
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <ToolUsage slug="ghl-snapshot-planner" />

      <div className="rounded-3xl border border-[rgba(198,107,63,0.25)] bg-[rgba(198,107,63,0.06)] p-6 md:p-8">
        <p className="text-sm leading-relaxed text-[var(--ink-2)]">
          This is a planning checklist for what to build, not a drag-and-drop
          snapshot import — GoHighLevel account structure still has to be
          configured by hand or scoped with a build partner.{" "}
          <a
            href="https://calendly.com/skynetlabs/schedule-a-free-consultation?utm_source=ghl-snapshot-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[var(--terracotta-aa)] hover:underline"
          >
            Book a call
            <ArrowRight className="h-3.5 w-3.5" />
          </a>{" "}
          if you want it built for you.
        </p>
      </div>
    </div>
  );
}
