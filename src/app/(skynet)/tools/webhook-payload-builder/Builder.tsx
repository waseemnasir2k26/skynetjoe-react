"use client";

import { useMemo, useState } from "react";
import { Check, Copy, FileJson2, Sparkles } from "lucide-react";
import {
  WEBHOOK_APPS,
  findWebhookApp,
  validateJson,
} from "@/data/tools/webhook-payloads";
import ToolUsage from "@/components/tools/ToolUsage";

function defaultRaw(): string {
  return JSON.stringify(
    {
      event: "your.event.name",
      data: { example_field: "value" },
    },
    null,
    2,
  );
}

export default function Builder() {
  const [appSlug, setAppSlug] = useState<string>("ghl");
  const [raw, setRaw] = useState<string>(() => {
    const app = findWebhookApp("ghl");
    return app ? JSON.stringify(app.sample, null, 2) : defaultRaw();
  });
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const app = findWebhookApp(appSlug);
  const validation = useMemo(() => validateJson(raw), [raw]);

  function loadSample(slug: string) {
    setAppSlug(slug);
    const next = findWebhookApp(slug);
    if (next) setRaw(JSON.stringify(next.sample, null, 2));
  }

  function loadBlank() {
    setAppSlug("");
    setRaw(defaultRaw());
  }

  function prettify() {
    if (validation.valid) setRaw(validation.pretty);
  }

  async function copyPayload() {
    try {
      await navigator.clipboard.writeText(raw);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <div className="space-y-6">
      {/* App picker */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
            1
          </span>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Start from a sample payload
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {WEBHOOK_APPS.map((a) => {
            const selected = appSlug === a.slug;
            return (
              <button
                key={a.slug}
                type="button"
                onClick={() => loadSample(a.slug)}
                className={
                  selected
                    ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                    : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
                }
                aria-pressed={selected}
              >
                {a.name}
                <span className="ml-1.5 text-[var(--ink-faint)]">
                  · {a.eventLabel}
                </span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={loadBlank}
            className={
              appSlug === ""
                ? "rounded-full border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] transition"
                : "rounded-full border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50"
            }
          >
            Blank canvas
          </button>
        </div>
        {app && (
          <p className="mt-3 text-xs leading-relaxed text-[var(--ink-faint)]">
            {app.docsHint}
          </p>
        )}
      </div>

      {/* Editor */}
      <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(26,26,26,0.12)] px-6 py-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
              2
            </span>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Edit &amp; validate
            </h2>
          </div>
          {validation.valid ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(76,140,90,0.35)] bg-[rgba(76,140,90,0.10)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#3c6e48]">
              <Check className="h-3 w-3" /> Valid JSON · {validation.sizeBytes}{" "}
              bytes
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(198,107,63,0.35)] bg-[rgba(198,107,63,0.10)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--terracotta-aa)]">
              Invalid JSON
            </span>
          )}
        </div>

        <div className="px-6 py-6 md:px-8">
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            spellCheck={false}
            rows={16}
            aria-label="Webhook payload JSON"
            className="w-full resize-y rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-4 font-mono text-[13px] leading-relaxed text-[var(--ink)] outline-none focus:border-[var(--terracotta)]"
          />
          {!validation.valid && (
            <p className="mt-2 text-xs font-medium text-[var(--terracotta-aa)]">
              {validation.error}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={prettify}
              disabled={!validation.valid}
              className="inline-flex items-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-4 py-2.5 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileJson2 className="h-4 w-4" />
              Prettify
            </button>
            <button
              type="button"
              onClick={copyPayload}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[var(--cream-3)] transition"
              style={{ background: "var(--terracotta)" }}
            >
              {copyState === "copied" ? (
                <>
                  <Check className="h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy payload
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <ToolUsage slug="webhook-payload-builder" />

      <div className="rounded-3xl border border-[rgba(198,107,63,0.25)] bg-[rgba(198,107,63,0.06)] p-6 md:p-8">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--terracotta-aa)]" />
          <p className="text-sm font-bold text-[var(--terracotta-aa)]">
            Testing tip
          </p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--ink-2)]">
          Paste this payload into your n8n Webhook node&apos;s &quot;Test&quot;
          panel, or POST it with curl/Postman against your endpoint before you
          wire the real integration. Validating shape first catches field-name
          mismatches before they cost you a debugging session.
        </p>
      </div>
    </div>
  );
}
