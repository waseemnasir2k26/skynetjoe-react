"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Loader2,
  RadioTower,
  RotateCcw,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import ToolUsage from "@/components/tools/ToolUsage";
import { highlightJson } from "./json-highlight";
import {
  buildN8nNodeSnippet,
  type CapturedRequestClient,
} from "./n8n-node-generator";

const STORAGE_KEY = "skynet:webhook-inspector:bin";
const POLL_MS = 2500;

type BinState = {
  binId: string;
  captureUrl: string;
  expiresAt: number;
};

type CapturedRequest = CapturedRequestClient & {
  headers: Record<string, string>;
  query: Record<string, string>;
  bodyTruncated: boolean;
  sourceIp: string;
};

function fmtTime(ms: number): string {
  return new Date(ms).toLocaleTimeString("en-US", { hour12: false });
}

function methodColor(method: string): string {
  switch (method) {
    case "GET":
      return "#3c6e48";
    case "POST":
      return "var(--terracotta-aa)";
    case "PUT":
    case "PATCH":
      return "#a1762f";
    case "DELETE":
      return "#b33a3a";
    default:
      return "var(--ink-2)";
  }
}

function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}

function RequestBody({ req, binId }: { req: CapturedRequest; binId: string }) {
  const [showN8n, setShowN8n] = useState(false);
  const source = req.bodyPretty ?? req.bodyRaw;

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]">
          Headers
        </p>
        <div className="overflow-hidden rounded-xl border border-[rgba(26,26,26,0.12)]">
          <table className="w-full text-left text-xs">
            <tbody>
              {Object.entries(req.headers).map(([k, v]) => (
                <tr
                  key={k}
                  className="border-b border-[rgba(26,26,26,0.08)] last:border-b-0"
                >
                  <td className="whitespace-nowrap px-3 py-1.5 font-mono font-semibold text-[var(--ink)]">
                    {k}
                  </td>
                  <td className="break-all px-3 py-1.5 font-mono text-[var(--ink-2)]">
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {Object.keys(req.query).length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]">
            Query params
          </p>
          <div className="overflow-hidden rounded-xl border border-[rgba(26,26,26,0.12)]">
            <table className="w-full text-left text-xs">
              <tbody>
                {Object.entries(req.query).map(([k, v]) => (
                  <tr
                    key={k}
                    className="border-b border-[rgba(26,26,26,0.08)] last:border-b-0"
                  >
                    <td className="whitespace-nowrap px-3 py-1.5 font-mono font-semibold text-[var(--ink)]">
                      {k}
                    </td>
                    <td className="break-all px-3 py-1.5 font-mono text-[var(--ink-2)]">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]">
            Body {req.bodyTruncated ? "(truncated at 64KB)" : ""}
          </p>
          {source && <CopyButton text={source} label="Copy body" />}
        </div>
        {source ? (
          <>
            <pre
              className="jh max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] p-3.5 font-mono text-[12px] leading-relaxed"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: highlightJson(source) }}
            />
            <style jsx>{`
              .jh :global(.jh-key) {
                color: var(--terracotta-aa);
                font-weight: 600;
              }
              .jh :global(.jh-string) {
                color: #3c6e48;
              }
              .jh :global(.jh-number) {
                color: #2d5c8a;
              }
              .jh :global(.jh-bool),
              .jh :global(.jh-null) {
                color: #a1762f;
                font-weight: 600;
              }
            `}</style>
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-[rgba(26,26,26,0.18)] bg-[var(--cream-3)] p-4 text-xs text-[var(--ink-faint)]">
            Empty body.
          </p>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowN8n((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--cream-3)] transition"
          style={{ background: "var(--terracotta)" }}
        >
          <Sparkles className="h-4 w-4" />
          {showN8n ? "Hide n8n node" : "Generate n8n node"}
        </button>
        {showN8n && (
          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--terracotta-aa)]">
                Importable n8n workflow JSON
              </p>
              <CopyButton
                text={JSON.stringify(buildN8nNodeSnippet(req, binId), null, 2)}
                label="Copy JSON"
              />
            </div>
            <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[rgba(198,107,63,0.25)] bg-[rgba(198,107,63,0.06)] p-3.5 font-mono text-[11px] leading-relaxed text-[var(--ink)]">
              {JSON.stringify(buildN8nNodeSnippet(req, binId), null, 2)}
            </pre>
            <p className="mt-2 text-xs text-[var(--ink-faint)]">
              In n8n: Workflows → Import from File (or paste as JSON). Contains
              a Webhook node matched to this request&apos;s method plus a Set
              node mapping the captured body fields — no credentials embedded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Inspector() {
  const [state, setState] = useState<BinState | null>(null);
  const [requests, setRequests] = useState<CapturedRequest[]>([]);
  const [creating, setCreating] = useState(false);
  const [testFiring, setTestFiring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Hydrate an existing (unexpired) bin from localStorage.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as BinState;
        if (saved.binId && saved.expiresAt > Date.now()) setState(saved);
        else window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  const poll = useCallback(async (binId: string) => {
    try {
      const res = await fetch(`/api/webhook-bin/${binId}/requests`, {
        cache: "no-store",
      });
      if (res.status === 404) {
        setError("This bin has expired. Create a new one below.");
        setState(null);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        return;
      }
      const json = await res.json();
      if (json?.ok) setRequests(json.requests);
    } catch {
      /* transient network error — next poll tick retries */
    }
  }, []);

  // Poll loop — 2.5s while the bin exists and the tab is visible; paused on hidden.
  useEffect(() => {
    if (!state) return;
    function start() {
      if (pollRef.current) return;
      if (state) void poll(state.binId);
      pollRef.current = setInterval(() => {
        if (state) void poll(state.binId);
      }, POLL_MS);
    }
    function stop() {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }
    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [state, poll]);

  async function createBin() {
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/webhook-bin/create", { method: "POST" });
      const json = await res.json();
      if (!json?.ok) {
        setError(
          json?.error || "Could not create a bin. Try again in a minute.",
        );
        return;
      }
      const next: BinState = {
        binId: json.binId,
        captureUrl: json.captureUrl,
        expiresAt: json.expiresAt,
      };
      setState(next);
      setRequests([]);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    } catch {
      setError("Network error creating the bin. Try again.");
    } finally {
      setCreating(false);
    }
  }

  function resetBin() {
    setState(null);
    setRequests([]);
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  async function sendTestRequest() {
    if (!state) return;
    setTestFiring(true);
    try {
      await fetch(`/api/webhook-bin/c/${state.binId}?test=1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "webhook-inspector.test",
          message: "This is a test request fired from the tool page.",
          firedAt: new Date().toISOString(),
        }),
      });
      // Nudge a fast poll rather than waiting for the next tick.
      void poll(state.binId);
    } catch {
      setError("Test request failed to send — check your connection.");
    } finally {
      window.setTimeout(() => setTestFiring(false), 600);
    }
  }

  if (!hydrated) return null;

  return (
    <div className="space-y-6">
      {!state ? (
        <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-10 text-center">
          <RadioTower className="mx-auto mb-4 h-8 w-8 text-[var(--terracotta-aa)]" />
          <h2 className="text-xl font-extrabold text-[var(--ink)] mb-2">
            Create a bin, then point a webhook at it
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-[var(--ink-2)]">
            You get a unique, unguessable URL. Any request sent to it — method,
            headers, query, body — shows up here live.
          </p>
          <button
            type="button"
            onClick={createBin}
            disabled={creating}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: "var(--terracotta)",
              boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
            }}
          >
            {creating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RadioTower className="h-4 w-4" />
            )}
            {creating ? "Creating…" : "Create my bin"}
          </button>
          {error && (
            <p className="mt-4 text-xs font-medium text-[var(--terracotta-aa)]">
              {error}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
                Your capture URL — point any webhook here
              </p>
              <span className="text-[11px] text-[var(--ink-faint)]">
                Expires {new Date(state.expiresAt).toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <code className="flex-1 min-w-[240px] break-all rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-3 font-mono text-sm text-[var(--ink)]">
                {state.captureUrl}
              </code>
              <CopyButton text={state.captureUrl} label="Copy URL" />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={sendTestRequest}
                disabled={testFiring}
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-4 py-2.5 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {testFiring ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send test request
              </button>
              <button
                type="button"
                onClick={resetBin}
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-4 py-2.5 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
              >
                <RotateCcw className="h-4 w-4" />
                New bin
              </button>
            </div>
            {error && (
              <p className="mt-3 text-xs font-medium text-[var(--terracotta-aa)]">
                {error}
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-[var(--ink-faint)]">
              Bins are ephemeral: they live in the server&apos;s memory for 24
              hours and clear immediately on a server restart. Don&apos;t send
              anything here you need to keep.
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)]">
                Captured requests ({requests.length}/50)
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--ink-faint)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3c6e48] animate-pulse" />
                Live — polling every 2.5s
              </span>
            </div>

            {requests.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] p-8 text-center">
                <p className="mb-4 text-sm text-[var(--ink-2)]">
                  Nothing captured yet. Fire the button above, or test with
                  curl:
                </p>
                <div className="mx-auto flex max-w-xl items-center gap-2">
                  <code className="flex-1 overflow-x-auto whitespace-pre rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-3 text-left font-mono text-xs text-[var(--ink)]">
                    {`curl -X POST ${state.captureUrl} \\\n  -H "Content-Type: application/json" \\\n  -d '{"hello":"world"}'`}
                  </code>
                  <CopyButton
                    text={`curl -X POST ${state.captureUrl} -H "Content-Type: application/json" -d '{"hello":"world"}'`}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {[...requests].reverse().map((req) => (
                  <details
                    key={req.id}
                    className="group overflow-hidden rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]"
                  >
                    <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 px-5 py-4">
                      <span
                        className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
                        style={{ background: methodColor(req.method) }}
                      >
                        {req.method}
                      </span>
                      <span className="font-mono text-xs text-[var(--ink-faint)]">
                        {fmtTime(req.receivedAt)}
                      </span>
                      <span className="font-mono text-xs text-[var(--ink-faint)]">
                        from {req.sourceIp}
                      </span>
                      {req.contentType && (
                        <span className="rounded-full border border-[rgba(26,26,26,0.12)] px-2 py-0.5 text-[10px] text-[var(--ink-faint)]">
                          {req.contentType}
                        </span>
                      )}
                      <span className="ml-auto text-xs font-semibold text-[var(--terracotta-aa)] transition group-open:hidden">
                        View details
                      </span>
                    </summary>
                    <div className="border-t border-[rgba(26,26,26,0.12)] px-5 py-5">
                      <RequestBody req={req} binId={state.binId} />
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-4 flex items-center justify-between">
            <ToolUsage slug="webhook-inspector" />
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[var(--ink-faint)]">
              <Trash2 className="h-3.5 w-3.5" />
              Per bin: 50 requests kept, oldest evicted first.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
