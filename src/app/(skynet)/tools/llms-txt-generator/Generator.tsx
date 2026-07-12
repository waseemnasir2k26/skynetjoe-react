"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Copy,
  Download,
  Plus,
  Trash2,
  FileCode2,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import {
  DEFAULT_FORM,
  buildLlmsTxt,
  isFormValid,
  emptyLink,
  emptySection,
  type LlmsTxtForm,
  type Section,
} from "@/data/tools/llms-txt-generator";
import EmailGate from "@/components/cta/EmailGate";
import ToolUsage from "@/components/tools/ToolUsage";
import { CAL_URL } from "@/lib/site";

const STORAGE_KEY = "skynet:llms-txt:v1";

export default function Generator() {
  const [form, setForm] = useState<LlmsTxtForm>(DEFAULT_FORM);
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<LlmsTxtForm>;
        setForm({
          siteName: saved.siteName ?? "",
          summary: saved.summary ?? "",
          context: saved.context ?? "",
          contactEmail: saved.contactEmail ?? "",
          sections:
            saved.sections && saved.sections.length > 0
              ? saved.sections
              : [emptySection("Docs")],
        });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* ignore */
    }
  }, [form, hydrated]);

  const output = useMemo(() => buildLlmsTxt(form), [form]);
  const valid = useMemo(() => isFormValid(form), [form]);

  function updateSection(id: string, patch: Partial<Section>) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  }

  function addSection() {
    setForm((f) => ({ ...f, sections: [...f.sections, emptySection()] }));
  }

  function removeSection(id: string) {
    setForm((f) => ({
      ...f,
      sections: f.sections.filter((s) => s.id !== id),
    }));
  }

  function addLink(sectionId: string) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s) =>
        s.id === sectionId ? { ...s, links: [...s.links, emptyLink()] } : s,
      ),
    }));
  }

  function removeLink(sectionId: string, linkId: string) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s) =>
        s.id === sectionId
          ? { ...s, links: s.links.filter((l) => l.id !== linkId) }
          : s,
      ),
    }));
  }

  function updateLink(
    sectionId: string,
    linkId: string,
    patch: Partial<{ title: string; url: string; description: string }>,
  ) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              links: s.links.map((l) =>
                l.id === linkId ? { ...l, ...patch } : l,
              ),
            }
          : s,
      ),
    }));
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("idle");
    }
  }

  function downloadOutput() {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "llms.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* FORM */}
      <div
        className="rounded-3xl p-6 md:p-8 mb-6"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.18)",
          backdropFilter: "blur(14px)",
        }}
      >
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-4">
          1. Site basics
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--terracotta-aa)]/80 font-semibold mb-1.5">
              Site / project name *
            </label>
            <input
              value={form.siteName}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  siteName: e.target.value.slice(0, 120),
                }))
              }
              placeholder="SkynetLabs"
              className="lg-input"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--terracotta-aa)]/80 font-semibold mb-1.5">
              Contact email
            </label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, contactEmail: e.target.value }))
              }
              placeholder="info@yourdomain.com"
              className="lg-input"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-[11px] uppercase tracking-wider text-[var(--terracotta-aa)]/80 font-semibold mb-1.5">
            One-sentence summary *
          </label>
          <input
            value={form.summary}
            onChange={(e) =>
              setForm((f) => ({ ...f, summary: e.target.value.slice(0, 240) }))
            }
            placeholder="AI automation agency building n8n workflows and AEO-optimized sites."
            className="lg-input"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[11px] uppercase tracking-wider text-[var(--terracotta-aa)]/80 font-semibold mb-1.5">
            Optional context paragraph
          </label>
          <textarea
            value={form.context}
            onChange={(e) =>
              setForm((f) => ({ ...f, context: e.target.value.slice(0, 1200) }))
            }
            rows={3}
            placeholder="Extra detail an AI crawler should know before reading further — audience, scope, anything not obvious from the summary."
            className="lg-input lg-textarea"
          />
        </div>

        <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-4">
          2. Sections + docs
        </p>
        <div className="space-y-5">
          {form.sections.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl p-4 sm:p-5"
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.12)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <input
                  value={section.title}
                  onChange={(e) =>
                    updateSection(section.id, {
                      title: e.target.value.slice(0, 60),
                    })
                  }
                  placeholder="Section title (e.g. Docs, Guides, Optional)"
                  className="lg-input flex-1 font-semibold"
                />
                {form.sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    aria-label="Remove section"
                    className="p-2 rounded-lg text-[var(--ink-faint)] hover:text-[var(--terracotta-aa)] transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {section.links.map((link) => (
                  <div
                    key={link.id}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-start"
                  >
                    <input
                      value={link.title}
                      onChange={(e) =>
                        updateLink(section.id, link.id, {
                          title: e.target.value.slice(0, 80),
                        })
                      }
                      placeholder="Link title"
                      className="lg-input lg-input-sm"
                    />
                    <input
                      value={link.url}
                      onChange={(e) =>
                        updateLink(section.id, link.id, {
                          url: e.target.value.slice(0, 300),
                        })
                      }
                      placeholder="https://..."
                      className="lg-input lg-input-sm"
                    />
                    <input
                      value={link.description}
                      onChange={(e) =>
                        updateLink(section.id, link.id, {
                          description: e.target.value.slice(0, 160),
                        })
                      }
                      placeholder="Optional description"
                      className="lg-input lg-input-sm"
                    />
                    {section.links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(section.id, link.id)}
                        aria-label="Remove link"
                        className="p-2 rounded-lg text-[var(--ink-faint)] hover:text-[var(--terracotta-aa)] transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addLink(section.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add link
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[rgba(26,26,26,0.18)] bg-[var(--cream-3)] text-[var(--ink)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)] transition"
          >
            <Plus className="w-4 h-4" />
            Add section
          </button>
        </div>

        {!valid && (
          <p className="mt-5 text-xs text-[var(--terracotta-aa)]/90">
            Fill in a site name, one-sentence summary, and at least one section
            with a titled link to generate a valid llms.txt.
          </p>
        )}
      </div>

      {/* OUTPUT */}
      {valid && !unlocked && (
        <EmailGate
          toolSlug="llms-txt-generator"
          toolName="llms.txt Generator"
          promise="the copy + download of your generated llms.txt"
          onUnlock={() => setUnlocked(true)}
        />
      )}

      {valid && unlocked && (
        <div
          className="rounded-3xl p-6 md:p-8"
          style={{
            background: "var(--cream-2)",
            border: "1px solid rgba(26,26,26,0.18)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold inline-flex items-center gap-2">
              <FileCode2 className="w-3.5 h-3.5" />
              3. Your llms.txt
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyOutput}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--ink)] border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.10)] hover:bg-[rgba(198,107,63,0.20)] hover:border-[var(--terracotta)] transition"
              >
                {copyState === "copied" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copyState === "copied" ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={downloadOutput}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--cream-3)] hover:opacity-90 transition"
                style={{ background: "var(--terracotta)" }}
              >
                <Download className="w-4 h-4" />
                Download llms.txt
              </button>
            </div>
          </div>
          <pre
            className="rounded-2xl p-4 sm:p-5 text-sm text-[var(--ink)] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto"
            style={{
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.12)",
            }}
          >
            {output}
          </pre>
          <div className="mt-4 flex justify-center">
            <ToolUsage slug="llms-txt-generator" />
          </div>
        </div>
      )}

      {/* CTA */}
      {valid && unlocked && (
        <div
          className="mt-6 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{
            background: "var(--cream-2)",
            border: "1px solid rgba(26,26,26,0.14)",
          }}
        >
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-2">
              Next step
            </p>
            <h3 className="text-xl md:text-2xl font-extrabold text-[var(--ink)] mb-2">
              Upload this to your domain root, then run the AEO audit.
            </h3>
            <p className="text-sm text-[var(--ink-2)] leading-relaxed">
              llms.txt goes at <code>yourdomain.com/llms.txt</code>. Once
              it&apos;s live, the AEO Audit checks whether the rest of your site
              is readable by answer engines too.
            </p>
          </div>
          <a
            href="/tools/aeo-audit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-[var(--cream-3)] whitespace-nowrap hover:opacity-90 transition"
            style={{ background: "var(--terracotta)" }}
          >
            Run the AEO audit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      <div
        className="mt-6 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.14)",
        }}
      >
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-2">
            Want the whole AEO stack done for you?
          </p>
          <h3 className="text-xl md:text-2xl font-extrabold text-[var(--ink)] mb-2">
            Book a 30-min call — schema, llms.txt, and content structure, scoped
            for your site.
          </h3>
        </div>
        <a
          href={`${CAL_URL}?utm_source=llms-txt-generator`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-[var(--cream-3)] whitespace-nowrap hover:opacity-90 transition"
          style={{ background: "var(--terracotta)" }}
        >
          <CalendarCheck className="w-4 h-4" />
          Book the call
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <style>{`
        .lg-input {
          width: 100%;
          background: var(--cream-3);
          border: 1px solid rgba(26,26,26,0.18);
          border-radius: 0.75rem;
          padding: 0.85rem 1.1rem;
          color: var(--ink);
          font-size: 0.95rem;
          line-height: 1.5;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .lg-input::placeholder { color: var(--ink-faint); }
        .lg-input:focus {
          border-color: rgba(198,107,63,0.50);
          box-shadow: 0 0 0 3px rgba(198,107,63,0.15);
        }
        .lg-input-sm { padding: 0.6rem 0.85rem; font-size: 0.85rem; }
        .lg-textarea { resize: vertical; min-height: 80px; }
      `}</style>
    </div>
  );
}
