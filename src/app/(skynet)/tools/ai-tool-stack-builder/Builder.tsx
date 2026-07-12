"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, LayoutGrid, Sparkles, Workflow } from "lucide-react";
import {
  ROLE_OPTIONS,
  GOAL_OPTIONS,
  ROLE_STACKS,
  buildStack,
  type StackGoal,
  type StackRole,
} from "@/data/tools/ai-tool-stack";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";

const STATE_KEY = "skynet:ai-tool-stack-builder:v1";
const UNLOCK_KEY = "skynet-tool-ai-tool-stack-builder-email";
const PREVIEW_COUNT = 3;

export default function Builder() {
  const [role, setRole] = useState<StackRole>("solo-founder");
  const [goal, setGoal] = useState<StackGoal>("save-time-repetitive");
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STATE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { role?: StackRole; goal?: StackGoal };
        if (saved.role) setRole(saved.role);
        if (saved.goal) setGoal(saved.goal);
      }
    } catch {
      /* ignore corrupt storage */
    }
    try {
      const storedEmail = window.localStorage.getItem(UNLOCK_KEY);
      if (storedEmail) setUnlocked(true);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STATE_KEY, JSON.stringify({ role, goal }));
    } catch {
      /* ignore */
    }
  }, [role, goal, hydrated]);

  const stack = useMemo(() => buildStack(role, goal), [role, goal]);
  const previewTools = stack.tools.slice(0, PREVIEW_COUNT);

  const roleLabel = ROLE_OPTIONS.find((r) => r.key === role)?.label ?? role;
  const goalLabel = GOAL_OPTIONS.find((g) => g.key === goal)?.label ?? goal;

  function handleUnlock() {
    setUnlocked(true);
    setGateOpen(false);
  }

  async function copyFullDoc() {
    const lines = [
      `AI Tool Stack — ${roleLabel} · ${goalLabel}`,
      "",
      "Recommended stack:",
      ...stack.tools.map((t) => `- [${t.category}] ${t.tool} — ${t.why}`),
      "",
      "n8n glue suggestion:",
      stack.glue,
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
            Your role
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {ROLE_OPTIONS.map((r) => {
            const selected = role === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setRole(r.key)}
                className={
                  selected
                    ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                    : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                }
                aria-pressed={selected}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-5 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            2
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Your goal
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((g) => {
            const selected = goal === g.key;
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => setGoal(g.key)}
                className={
                  selected
                    ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                    : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                }
                aria-pressed={selected}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* PREVIEW */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-5 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            3
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            <LayoutGrid className="mr-1.5 inline h-4 w-4 text-[var(--terracotta-aa)]" />
            Your stack preview — {roleLabel}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {previewTools.map((t) => (
            <div
              key={`${t.category}-${t.tool}`}
              className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-5"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[rgba(198,107,63,0.10)] text-[var(--terracotta-aa)] border border-[rgba(198,107,63,0.30)] mb-3">
                {t.category}
              </span>
              <h3 className="text-[var(--ink)] text-base font-extrabold mb-1">
                {t.tool}
              </h3>
              <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                {t.why}
              </p>
            </div>
          ))}
        </div>

        {hydrated && (
          <div className="mt-5">
            <ToolUsage slug="ai-tool-stack-builder" />
          </div>
        )}
      </div>

      {/* FULL STACK DOC — gated */}
      <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
        <div className="border-b border-[rgba(26,26,26,0.12)] px-6 py-6 md:px-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
              4
            </span>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Full stack doc
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[var(--ink-2)]">
            Every tool in your {roleLabel} stack, plus the specialized add-on
            for &quot;{goalLabel}&quot; and an n8n glue suggestion that wires it
            together.
          </p>
        </div>

        <div className="px-6 py-6 md:px-8">
          {!unlocked && !gateOpen && (
            <button
              type="button"
              onClick={() => setGateOpen(true)}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base sm:w-auto"
              style={{
                background: "var(--terracotta)",
                boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
              }}
            >
              <LayoutGrid className="h-4 w-4" />
              Unlock full stack doc
            </button>
          )}

          {gateOpen && !unlocked && (
            <EmailGate
              toolSlug="ai-tool-stack-builder"
              toolName="AI Tool Stack Builder"
              promise="your full AI tool stack + n8n glue doc"
              onUnlock={handleUnlock}
            />
          )}

          {unlocked && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {stack.tools.map((t) => (
                  <div
                    key={`${t.category}-${t.tool}`}
                    className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-5"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[rgba(198,107,63,0.10)] text-[var(--terracotta-aa)] border border-[rgba(198,107,63,0.30)] mb-3">
                      {t.category}
                    </span>
                    <h3 className="text-[var(--ink)] text-base font-extrabold mb-1">
                      {t.tool}
                    </h3>
                    <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                      {t.why}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(198,107,63,0.30)",
                }}
              >
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
                  <Workflow className="h-3.5 w-3.5" />
                  n8n glue suggestion
                </p>
                <p className="text-sm leading-relaxed text-[var(--ink-2)]">
                  {stack.glue}
                </p>
              </div>

              <button
                type="button"
                onClick={copyFullDoc}
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-3)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[var(--terracotta-aa)]" />
                    Copied full doc
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy full stack doc
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CROSS-LINKS */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
          <Sparkles className="mr-1.5 inline h-3.5 w-3.5" />
          Build the rest of your system
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools/n8n-workflow-generator"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            n8n Workflow Generator →
          </Link>
          <Link
            href="/tools/ai-cost-calculator"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            AI Cost Calculator →
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

      <p className="text-xs text-[var(--ink-faint)]">
        {ROLE_OPTIONS.length} roles × {GOAL_OPTIONS.length} goals ·{" "}
        {Object.values(ROLE_STACKS).reduce((n, s) => n + s.length, 0)} base tool
        picks. Everything runs in your browser.
      </p>
    </div>
  );
}
