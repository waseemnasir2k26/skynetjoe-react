"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Send, Sparkles } from "lucide-react";
import {
  DEFAULT_INPUTS,
  DM_TEMPLATES,
  PLATFORMS,
  ANGLE_LABELS,
  fillTemplate,
  fillSubject,
  templatesForPlatform,
  type DmInputs,
  type DmPlatform,
  type DmTemplate,
} from "@/data/tools/cold-dm-scripts";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";

const STATE_KEY = "skynet:cold-dm-generator:v1";
const UNLOCK_KEY = "skynet-tool-cold-dm-generator-email";
const PREVIEW_COUNT = 3;

function ScriptCard({
  template,
  inputs,
}: {
  template: DmTemplate;
  inputs: DmInputs;
}) {
  const [copied, setCopied] = useState(false);
  const body = fillTemplate(template, inputs);
  const subject = fillSubject(template, inputs);

  async function copy() {
    const text = subject ? `Subject: ${subject}\n\n${body}` : body;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[rgba(198,107,63,0.10)] text-[var(--terracotta-aa)] border border-[rgba(198,107,63,0.30)]">
          {ANGLE_LABELS[template.angle]}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(26,26,26,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--ink-2)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)] transition"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-[var(--terracotta-aa)]" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
      {subject && (
        <p className="mb-2 text-xs font-semibold text-[var(--ink)]">
          Subject: {subject}
        </p>
      )}
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink-2)]">
        {body}
      </p>
    </div>
  );
}

export default function Generator() {
  const [inputs, setInputs] = useState<DmInputs>(DEFAULT_INPUTS);
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STATE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<DmInputs>;
        setInputs((curr) => ({ ...curr, ...saved }));
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
      window.localStorage.setItem(STATE_KEY, JSON.stringify(inputs));
    } catch {
      /* ignore */
    }
  }, [inputs, hydrated]);

  function setField<K extends keyof DmInputs>(key: K, value: DmInputs[K]) {
    setInputs((curr) => ({ ...curr, [key]: value }));
  }

  const platformScripts = useMemo(
    () => templatesForPlatform(inputs.platform),
    [inputs.platform],
  );
  const previewScripts = platformScripts.slice(0, PREVIEW_COUNT);

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
            Tell us who and what
          </h2>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]">
            Platform
          </label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
              const selected = inputs.platform === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setField("platform", p.key as DmPlatform)}
                  className={
                    selected
                      ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                      : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                  }
                  aria-pressed={selected}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="niche"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]"
            >
              Their niche
            </label>
            <input
              id="niche"
              type="text"
              value={inputs.niche}
              onChange={(e) => setField("niche", e.target.value)}
              placeholder="e.g. dental clinics"
              className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] focus:outline-none transition"
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.18)",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="offer"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]"
            >
              Your offer
            </label>
            <input
              id="offer"
              type="text"
              value={inputs.offer}
              onChange={(e) => setField("offer", e.target.value)}
              placeholder="e.g. an AI booking assistant"
              className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] focus:outline-none transition"
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.18)",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="proof"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]"
            >
              Proof point
            </label>
            <input
              id="proof"
              type="text"
              value={inputs.proof}
              onChange={(e) => setField("proof", e.target.value)}
              placeholder="e.g. recovered 30+ calls/month"
              className="w-full rounded-xl px-4 py-3 text-sm text-[var(--ink)] focus:outline-none transition"
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.18)",
              }}
            />
          </div>
        </div>
      </div>

      {/* PREVIEW SCRIPTS */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-5 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            2
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Your scripts —{" "}
            {PLATFORMS.find((p) => p.key === inputs.platform)?.label}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {previewScripts.map((t) => (
            <ScriptCard key={t.id} template={t} inputs={inputs} />
          ))}
        </div>

        {hydrated && (
          <div className="mt-5">
            <ToolUsage slug="cold-dm-generator" />
          </div>
        )}
      </div>

      {/* FULL PACK — gated */}
      <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
        <div className="border-b border-[rgba(26,26,26,0.12)] px-6 py-6 md:px-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
              3
            </span>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Full 15-script pack
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[var(--ink-2)]">
            All 5 LinkedIn, 5 Instagram, and 5 email scripts, personalized with
            your niche, offer, and proof point.
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
              <Send className="h-4 w-4" />
              Unlock all 15 scripts
            </button>
          )}

          {gateOpen && !unlocked && (
            <EmailGate
              toolSlug="cold-dm-generator"
              toolName="Cold DM Generator"
              promise="your full 15-script cold outreach pack across LinkedIn, Instagram, and email"
              onUnlock={handleUnlock}
            />
          )}

          {unlocked && (
            <div className="space-y-8">
              {PLATFORMS.map((p) => (
                <div key={p.key}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
                    {p.label}
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {templatesForPlatform(p.key).map((t) => (
                      <ScriptCard key={t.id} template={t} inputs={inputs} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CROSS-LINKS */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
          <Sparkles className="mr-1.5 inline h-3.5 w-3.5" />
          Keep building your outbound stack
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools/ai-tool-stack-builder"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            AI Tool Stack Builder →
          </Link>
          <Link
            href="/tools/prompt-library"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            Prompt Library →
          </Link>
          <Link
            href="/tools/n8n-workflow-generator"
            className="rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            n8n Workflow Generator →
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
        {DM_TEMPLATES.length} templates total. Everything runs in your browser —
        nothing is sent anywhere until you choose to unlock.
      </p>
    </div>
  );
}
