"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  N8N_TEMPLATES,
  TRIGGER_APPS,
  actionsForTrigger,
  findTemplate,
  buildWorkflowJson,
  downloadWorkflowJson,
  type N8nTemplate,
} from "@/data/tools/n8n-templates";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";

const STATE_KEY = "skynet:n8n-workflow-generator:v1";
const UNLOCK_KEY = "skynet-tool-n8n-workflow-generator-email";

type SavedState = {
  trigger: string | null;
  actions: string[];
};

export default function Generator() {
  const [trigger, setTrigger] = useState<string | null>(null);
  const [actions, setActions] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  /* hydrate wizard picks + prior unlock state */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STATE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SavedState;
        if (saved.trigger) setTrigger(saved.trigger);
        if (Array.isArray(saved.actions)) setActions(saved.actions);
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

  /* persist wizard picks */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STATE_KEY,
        JSON.stringify({ trigger, actions } satisfies SavedState),
      );
    } catch {
      /* ignore */
    }
  }, [trigger, actions, hydrated]);

  const availableActions = useMemo(
    () => (trigger ? actionsForTrigger(trigger) : []),
    [trigger],
  );

  const match = useMemo(
    () => findTemplate(trigger, actions),
    [trigger, actions],
  );
  const template: N8nTemplate = match.template;
  const preview = useMemo(() => buildWorkflowJson(template), [template]);

  function pickTrigger(app: string) {
    setTrigger(app);
    setActions([]);
    setDownloaded(false);
  }

  function toggleAction(app: string) {
    setActions((curr) =>
      curr.includes(app) ? curr.filter((a) => a !== app) : [...curr, app],
    );
    setDownloaded(false);
  }

  function reset() {
    setTrigger(null);
    setActions([]);
    setDownloaded(false);
    try {
      window.localStorage.removeItem(STATE_KEY);
    } catch {
      /* ignore */
    }
  }

  function handleDownloadClick() {
    if (!unlocked) {
      setGateOpen(true);
      return;
    }
    downloadWorkflowJson(template);
    setDownloaded(true);
  }

  function handleUnlock() {
    setUnlocked(true);
    setGateOpen(false);
    downloadWorkflowJson(template);
    setDownloaded(true);
  }

  const step2Available = !!trigger;
  const step3Ready = !!trigger;

  return (
    <div className="space-y-6">
      {/* STEP 1 — trigger app */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            1
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            What triggers the automation?
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {TRIGGER_APPS.map((app) => {
            const selected = trigger === app;
            return (
              <button
                key={app}
                type="button"
                onClick={() => pickTrigger(app)}
                className={
                  selected
                    ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                    : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                }
                aria-pressed={selected}
              >
                {app}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2 — action app(s) */}
      {step2Available && (
        <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
              2
            </span>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              What should happen next?
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableActions.map((app) => {
              const selected = actions.includes(app);
              return (
                <button
                  key={app}
                  type="button"
                  onClick={() => toggleAction(app)}
                  className={
                    selected
                      ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                      : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                  }
                  aria-pressed={selected}
                >
                  {app}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-[var(--ink-faint)]">
            Pick one or more — we&apos;ll match the closest recipe
            automatically.
          </p>
        </div>
      )}

      {/* STEP 3 — matched recipe + download */}
      {step3Ready && (
        <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
          <div className="border-b border-[rgba(26,26,26,0.12)] px-6 py-6 md:px-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
                3
              </span>
              <h2 className="text-lg font-extrabold text-[var(--ink)]">
                Your recipe
              </h2>
            </div>
            {!match.exact && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--terracotta-aa)]">
                <Sparkles className="h-3 w-3" />
                Closest match — no exact recipe for that combo yet
              </div>
            )}
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-[var(--terracotta-aa)]" />
              <h3 className="text-xl font-extrabold text-[var(--ink)]">
                {template.name}
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">
              {template.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {template.nodes.map((n, i) => (
                <div key={n.name} className="flex items-center gap-2">
                  <span className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-2.5 py-1.5 text-xs font-semibold text-[var(--ink)]">
                    {n.name}
                  </span>
                  {i < template.nodes.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--ink-faint)]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-6 md:px-8">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
              Workflow JSON preview
            </p>
            <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-3.5 font-mono text-[11px] leading-relaxed text-[var(--ink)]">
              {JSON.stringify(preview, null, 2)}
            </pre>
          </div>

          <div className="border-t border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-6 py-6 md:px-8">
            {gateOpen && !unlocked ? (
              <EmailGate
                toolSlug="n8n-workflow-generator"
                toolName="n8n Workflow Generator"
                promise="your ready-to-import n8n workflow JSON"
                onUnlock={handleUnlock}
              />
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleDownloadClick}
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
                  style={{
                    background: "var(--terracotta)",
                    boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
                  }}
                >
                  {downloaded ? (
                    <>
                      <Check className="h-4 w-4" />
                      Downloaded — {template.slug}.n8n-workflow.json
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download workflow JSON
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-5 py-4 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Start over
                </button>
              </div>
            )}
            <p className="mt-4 text-xs text-[var(--ink-faint)]">
              In n8n: Workflows → Import from File (or paste as JSON via the
              menu). Credentials are never included — n8n will prompt you to
              connect your own for each placeholder node.
            </p>
          </div>
        </div>
      )}

      {hydrated && <ToolUsage slug="n8n-workflow-generator" />}

      {/* full recipe list, always visible for SEO + discovery */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--terracotta-aa)]">
          All {N8N_TEMPLATES.length} recipes in the library
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {N8N_TEMPLATES.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => {
                setTrigger(t.triggerLabel);
                setActions(t.actionLabels);
                setDownloaded(false);
              }}
              className="rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-3 text-left transition hover:border-[var(--terracotta)]/50"
            >
              <div className="text-sm font-semibold text-[var(--ink)]">
                {t.name}
              </div>
              <div className="mt-0.5 text-xs text-[var(--ink-faint)]">
                {t.triggerLabel} → {t.actionLabels.join(" + ")}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
