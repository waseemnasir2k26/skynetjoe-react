"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Copy,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Mail,
} from "lucide-react";
import {
  PROMPTS,
  CATEGORIES,
  buildModelLink,
  type Prompt,
  type PromptCategory,
} from "@/data/prompts-library";

export default function Library() {
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState<PromptCategory[]>([]);
  const [openPrompt, setOpenPrompt] = useState<Prompt | null>(null);
  const [copyStateById, setCopyStateById] = useState<Record<string, boolean>>(
    {}
  );

  /* close modal on Escape */
  useEffect(() => {
    if (!openPrompt) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenPrompt(null);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openPrompt]);

  function toggleCat(key: PromptCategory) {
    setActiveCats((curr) =>
      curr.includes(key) ? curr.filter((k) => k !== key) : [...curr, key]
    );
  }

  function clearFilters() {
    setActiveCats([]);
    setQuery("");
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (activeCats.length > 0 && !activeCats.includes(p.category)) {
        return false;
      }
      if (!q) return true;
      const hay = `${p.title} ${p.useCase} ${p.body} ${p.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, activeCats]);

  async function copyPrompt(p: Prompt) {
    try {
      await navigator.clipboard.writeText(p.body);
      setCopyStateById((curr) => ({ ...curr, [p.id]: true }));
      window.setTimeout(() => {
        setCopyStateById((curr) => {
          const next = { ...curr };
          delete next[p.id];
          return next;
        });
      }, 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-8">
      {/* HOOK / HERO */}
      <div className="px-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta-aa)] mb-3">
          — Prompt library · {PROMPTS.length} working prompts
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-[var(--ink)] mb-4">
          The prompts I actually use.
        </h1>
        <p className="text-base md:text-lg text-[var(--ink-2)] leading-relaxed max-w-3xl">
          Pulled from 18 months of shipped client work — automations, copy,
          ops, audits. Copy, paste, ship. No course, no Notion template, no
          upsell. Just the prompts that earned me six figures.
        </p>
      </div>

      {/* Search + filters */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] backdrop-blur-md p-5 md:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-3">
          — Search the library
        </p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--terracotta-aa)] pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${PROMPTS.length} prompts by title, use-case, or keyword…`}
            className="pl-prompt-search w-full rounded-xl pl-11 pr-10 py-3 text-[var(--ink)] focus:outline-none transition"
            style={{
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.18)",
              boxShadow: "inset 0 1px 2px rgba(26,26,26,0.04)",
            }}
            aria-label="Search prompts"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-faint)] hover:text-[var(--terracotta-aa)]"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const isActive = activeCats.includes(c.key);
            const count = PROMPTS.filter((p) => p.category === c.key).length;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => toggleCat(c.key)}
                className={
                  isActive
                    ? "inline-flex items-center gap-1.5 rounded-full border border-[var(--terracotta)] bg-[var(--terracotta)]/15 px-3 py-1.5 text-xs font-semibold text-[var(--terracotta-aa)] transition"
                    : "inline-flex items-center gap-1.5 rounded-full border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-2)] transition hover:border-[rgba(198,107,63,0.40)] hover:text-[var(--terracotta-aa)]"
                }
                aria-pressed={isActive}
              >
                <span aria-hidden>{c.icon}</span>
                {c.label}
                <span className="text-[10px] text-[var(--ink-faint)]">· {count}</span>
              </button>
            );
          })}
          {(activeCats.length > 0 || query) && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] hover:text-[var(--terracotta-aa)] transition"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        <div className="mt-4 text-xs text-[var(--ink-faint)]">
          Showing <span className="text-[var(--terracotta-aa)] font-bold">{filtered.length}</span>{" "}
          of {PROMPTS.length} prompts
          {activeCats.length > 0 && (
            <>
              {" · in "}
              {activeCats
                .map((k) => CATEGORIES.find((c) => c.key === k)?.label)
                .filter(Boolean)
                .join(", ")}
            </>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-10 text-center">
          <p className="text-lg font-semibold text-[var(--ink)]">No prompts match.</p>
          <p className="mt-2 text-sm text-[var(--ink-faint)]">
            Try clearing the filters or searching for a broader keyword.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--terracotta)]/50 bg-[var(--terracotta)]/10 px-4 py-2 text-sm font-semibold text-[var(--terracotta-aa)] hover:bg-[var(--terracotta)]/20 transition"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const cat = CATEGORIES.find((c) => c.key === p.category);
            const copied = copyStateById[p.id];
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setOpenPrompt(p)}
                className="group text-left rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50 hover:bg-[var(--cream-2)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[rgba(198,107,63,0.10)] text-[var(--terracotta-aa)] border border-[rgba(198,107,63,0.30)]">
                    <span aria-hidden>{cat?.icon}</span>
                    {cat?.label}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-faint)]">
                    {p.model}
                  </span>
                </div>
                <h3 className="text-[var(--ink)] text-base md:text-lg font-extrabold leading-tight mb-2 group-hover:text-[var(--terracotta-aa)] transition">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--ink-faint)] leading-relaxed mb-4">
                  {p.useCase}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[var(--ink-faint)]">
                    {p.body.length} chars
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      copyPrompt(p);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        copyPrompt(p);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(26,26,26,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--ink-2)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)] transition cursor-pointer"
                    aria-label="Copy prompt"
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
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* CLOSING PSYCHOLOGY CARD */}
      <div
        className="rounded-3xl p-6 md:p-8"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(138,154,123,0.50)",
          boxShadow: "0 0 0 3px rgba(138,154,123,0.10)",
        }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--sage)] mb-2">
          — What you should do next
        </p>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Stop collecting prompts. Start shipping outputs.
        </h3>
        <ul className="space-y-2.5 mb-6 text-[var(--ink-2)] text-sm md:text-base leading-relaxed">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)]/15 text-xs font-bold text-[var(--terracotta-aa)]">
              1
            </span>
            Pick the one prompt your business loses the most time on right now (sales, ops, content). Run it three times this week.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)]/15 text-xs font-bold text-[var(--terracotta-aa)]">
              2
            </span>
            Notice what it gets wrong. Edit the prompt, lock the wins, save it inside your CRM or helpdesk.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)]/15 text-xs font-bold text-[var(--terracotta-aa)]">
              3
            </span>
            When it&apos;s earning its keep, book a call and we&apos;ll wire it into the rest of your stack.
          </li>
        </ul>
        <a
          href="https://calendly.com/skynetlabs/schedule-a-free-consultation?utm_source=prompt-library-closing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[var(--cream-3)] hover:opacity-90 transition"
          style={{ background: "var(--terracotta)" }}
        >
          Book the call →
        </a>
      </div>

      {/* Submit-prompt CTA */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta-aa)] mb-3">
          — Missing a prompt?
        </p>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--ink)] mb-3">
          Send me yours. I&apos;ll add the good ones.
        </h3>
        <p className="text-sm text-[var(--ink-2)] max-w-xl mx-auto mb-5 leading-relaxed">
          The library grows from real working prompts, not theoretical ones.
          Send the prompt plus the result it produced — I&apos;ll add it with credit.
        </p>
        <a
          href="mailto:info@skynetjoe.com?subject=Prompt%20Library%20submission&body=Category%3A%20%0AUse-case%3A%20%0APrompt%20body%3A%20%0AResult%20it%20produced%3A%20"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[var(--cream-3)] hover:opacity-90 transition"
          style={{ background: "var(--terracotta)" }}
        >
          <Mail className="h-4 w-4" />
          Submit a prompt
        </a>
      </div>

      {/* FEEDBACK */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta-aa)] mb-2">
          — Feedback · 30-second form
        </p>
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--ink)] mb-2">
          What should this tool do next?
        </h3>
        <p className="text-sm text-[var(--ink-2)] mb-4">
          One missing field, one weird output, one tool you wish existed — tell me. I read every reply.
        </p>
        <form action="/api/tool-feedback" method="POST" className="space-y-3">
          <input type="hidden" name="tool" value="prompt-library" />
          <textarea
            name="message"
            required
            rows={3}
            placeholder="What should we improve, fix, or build?"
            className="w-full rounded-xl px-4 py-3 text-[var(--ink)] focus:outline-none transition"
            style={{
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.18)",
              boxShadow: "inset 0 1px 2px rgba(26,26,26,0.04)",
              fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
              fontSize: "0.875rem",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional — only if you want a reply)"
            className="w-full rounded-xl px-4 py-2.5 text-[var(--ink)] text-sm focus:outline-none transition"
            style={{
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.18)",
              boxShadow: "inset 0 1px 2px rgba(26,26,26,0.04)",
            }}
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-[var(--cream-3)] hover:opacity-90 transition"
            style={{ background: "var(--terracotta)" }}
          >
            Send feedback →
          </button>
        </form>
      </div>

      {/* Modal */}
      {openPrompt && <PromptModal prompt={openPrompt} onClose={() => setOpenPrompt(null)} />}

      <style jsx>{`
        .pl-prompt-search:focus {
          border-color: var(--terracotta) !important;
          box-shadow: 0 0 0 3px rgba(198,107,63,0.10), inset 0 1px 2px rgba(26,26,26,0.04) !important;
        }
        .pl-prompt-search::placeholder {
          color: var(--ink-faint);
        }
      `}</style>
    </div>
  );
}

function PromptModal({
  prompt,
  onClose,
}: {
  prompt: Prompt;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const cat = CATEGORIES.find((c) => c.key === prompt.category);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt.body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8 bg-[rgba(26,26,26,0.70)] backdrop-blur-sm prompt-modal-bg"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] shadow-2xl prompt-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-[var(--ink-faint)] hover:text-[var(--ink)] hover:bg-[var(--cream-2)] transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-6 md:px-8 pt-7 pb-5 border-b border-[rgba(26,26,26,0.12)]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[rgba(198,107,63,0.10)] text-[var(--terracotta-aa)] border border-[rgba(198,107,63,0.30)]">
              <span aria-hidden>{cat?.icon}</span>
              {cat?.label}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[var(--cream-2)] text-[var(--ink-faint)] border border-[rgba(26,26,26,0.12)]">
              <Sparkles className="h-3 w-3" />
              {prompt.model}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
              {prompt.body.length} chars
            </span>
          </div>
          <h2
            id="prompt-modal-title"
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--ink)] mb-2"
          >
            {prompt.title}
          </h2>
          <p className="text-sm text-[var(--ink-2)]">{prompt.useCase}</p>
        </div>

        <div className="px-6 md:px-8 py-6">
          <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-[var(--ink)] bg-[var(--cream-2)] border border-[rgba(26,26,26,0.12)] rounded-2xl p-5">
            {prompt.body}
          </pre>
        </div>

        <div className="px-6 md:px-8 pb-7 pt-2 border-t border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={copy}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[var(--cream-3)] transition hover:opacity-90"
              style={{
                background: copied
                  ? "var(--sage)"
                  : "var(--terracotta)",
              }}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied to clipboard
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy full prompt
                </>
              )}
            </button>
            <a
              href={buildModelLink("claude", prompt.body)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--terracotta)] hover:bg-[var(--cream-2)]"
            >
              Open in Claude
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={buildModelLink("chatgpt", prompt.body)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--terracotta)] hover:bg-[var(--cream-2)]"
            >
              Open in ChatGPT
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .prompt-modal-bg {
          animation: fadeIn 200ms ease-out both;
        }
        .prompt-modal-card {
          animation: popIn 240ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .prompt-modal-bg,
          .prompt-modal-card {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
