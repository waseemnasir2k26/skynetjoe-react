"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Braces,
  Plus,
  Trash2,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import {
  SCHEMA_TYPES,
  DEFAULT_ORGANIZATION,
  DEFAULT_FAQ,
  DEFAULT_ARTICLE,
  DEFAULT_LOCAL_BUSINESS,
  DEFAULT_SOFTWARE_APPLICATION,
  buildOrganization,
  buildFaqPage,
  buildArticle,
  buildLocalBusiness,
  buildSoftwareApplication,
  type SchemaType,
  type OrganizationFields,
  type FaqPageFields,
  type ArticleFields,
  type LocalBusinessFields,
  type SoftwareApplicationFields,
} from "@/data/tools/schema-markup-generator";
import ToolUsage from "@/components/tools/ToolUsage";
import { CAL_URL } from "@/lib/site";

export default function Generator() {
  const [activeType, setActiveType] = useState<SchemaType>("Organization");
  const [org, setOrg] = useState<OrganizationFields>(DEFAULT_ORGANIZATION);
  const [faq, setFaq] = useState<FaqPageFields>(DEFAULT_FAQ);
  const [article, setArticle] = useState<ArticleFields>(DEFAULT_ARTICLE);
  const [biz, setBiz] = useState<LocalBusinessFields>(DEFAULT_LOCAL_BUSINESS);
  const [app, setApp] = useState<SoftwareApplicationFields>(
    DEFAULT_SOFTWARE_APPLICATION,
  );
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const output = useMemo(() => {
    let obj: object;
    switch (activeType) {
      case "Organization":
        obj = buildOrganization(org);
        break;
      case "FAQPage":
        obj = buildFaqPage(faq);
        break;
      case "Article":
        obj = buildArticle(article);
        break;
      case "LocalBusiness":
        obj = buildLocalBusiness(biz);
        break;
      case "SoftwareApplication":
        obj = buildSoftwareApplication(app);
        break;
    }
    return JSON.stringify(obj, null, 2);
  }, [activeType, org, faq, article, biz, app]);

  const hasContent = useMemo(() => {
    switch (activeType) {
      case "Organization":
        return org.name.trim().length > 0;
      case "FAQPage":
        return faq.items.some((i) => i.question.trim() && i.answer.trim());
      case "Article":
        return article.headline.trim().length > 0;
      case "LocalBusiness":
        return biz.name.trim().length > 0;
      case "SoftwareApplication":
        return app.name.trim().length > 0;
    }
  }, [activeType, org, faq, article, biz, app]);

  async function copyOutput() {
    try {
      const wrapped = `<script type="application/ld+json">\n${output}\n</script>`;
      await navigator.clipboard.writeText(wrapped);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("idle");
    }
  }

  function addFaqItem() {
    setFaq((f) => ({ items: [...f.items, { question: "", answer: "" }] }));
  }

  function removeFaqItem(idx: number) {
    setFaq((f) => ({ items: f.items.filter((_, i) => i !== idx) }));
  }

  function updateFaqItem(
    idx: number,
    patch: Partial<{ question: string; answer: string }>,
  ) {
    setFaq((f) => ({
      items: f.items.map((item, i) =>
        i === idx ? { ...item, ...patch } : item,
      ),
    }));
  }

  return (
    <div>
      {/* TYPE PICKER */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist">
        {SCHEMA_TYPES.map((t) => {
          const active = activeType === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveType(t.key)}
              className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition"
              style={
                active
                  ? {
                      background: "var(--terracotta)",
                      color: "var(--cream-3)",
                      border: "1px solid var(--terracotta)",
                    }
                  : {
                      background: "var(--cream-2)",
                      color: "var(--ink-2)",
                      border: "1px solid rgba(26,26,26,0.12)",
                    }
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-[var(--ink-faint)] mb-6">
        {SCHEMA_TYPES.find((t) => t.key === activeType)?.short}
      </p>

      {/* FORM */}
      <div
        className="rounded-3xl p-6 md:p-8 mb-6"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.18)",
          backdropFilter: "blur(14px)",
        }}
      >
        {activeType === "Organization" && (
          <div className="space-y-4">
            <Field
              label="Name *"
              value={org.name}
              onChange={(v) => setOrg((f) => ({ ...f, name: v }))}
              placeholder="SkynetLabs"
            />
            <Field
              label="URL"
              value={org.url}
              onChange={(v) => setOrg((f) => ({ ...f, url: v }))}
              placeholder="https://skynetjoe.com"
            />
            <Field
              label="Logo URL"
              value={org.logo}
              onChange={(v) => setOrg((f) => ({ ...f, logo: v }))}
              placeholder="https://skynetjoe.com/logo.png"
            />
            <TextArea
              label="Description"
              value={org.description}
              onChange={(v) => setOrg((f) => ({ ...f, description: v }))}
              placeholder="AI automation agency for founders."
            />
            <TextArea
              label="Social profile URLs (one per line)"
              value={org.sameAs}
              onChange={(v) => setOrg((f) => ({ ...f, sameAs: v }))}
              placeholder={
                "https://linkedin.com/company/...\nhttps://x.com/..."
              }
              rows={3}
            />
          </div>
        )}

        {activeType === "FAQPage" && (
          <div className="space-y-4">
            {faq.items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-4"
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.12)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wider text-[var(--terracotta-aa)]/80 font-semibold">
                    Question {idx + 1}
                  </p>
                  {faq.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaqItem(idx)}
                      className="p-1.5 rounded-lg text-[var(--ink-faint)] hover:text-[var(--terracotta-aa)] transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  value={item.question}
                  onChange={(e) =>
                    updateFaqItem(idx, { question: e.target.value })
                  }
                  placeholder="What does this cost?"
                  className="smg-input mb-2"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) =>
                    updateFaqItem(idx, { answer: e.target.value })
                  }
                  placeholder="A direct, specific answer."
                  rows={2}
                  className="smg-input smg-textarea"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFaqItem}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--terracotta-aa)] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              Add question
            </button>
          </div>
        )}

        {activeType === "Article" && (
          <div className="space-y-4">
            <Field
              label="Headline *"
              value={article.headline}
              onChange={(v) => setArticle((f) => ({ ...f, headline: v }))}
              placeholder="How to Build an AEO Strategy in 2026"
            />
            <TextArea
              label="Description"
              value={article.description}
              onChange={(v) => setArticle((f) => ({ ...f, description: v }))}
              placeholder="One-sentence summary of the article."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Author name"
                value={article.authorName}
                onChange={(v) => setArticle((f) => ({ ...f, authorName: v }))}
                placeholder="Waseem Nasir"
              />
              <Field
                label="Image URL"
                value={article.image}
                onChange={(v) => setArticle((f) => ({ ...f, image: v }))}
                placeholder="https://.../cover.jpg"
              />
              <Field
                label="Date published"
                value={article.datePublished}
                onChange={(v) =>
                  setArticle((f) => ({ ...f, datePublished: v }))
                }
                placeholder="2026-07-12"
                type="date"
              />
              <Field
                label="Date modified"
                value={article.dateModified}
                onChange={(v) => setArticle((f) => ({ ...f, dateModified: v }))}
                placeholder="2026-07-12"
                type="date"
              />
              <Field
                label="Publisher name"
                value={article.publisherName}
                onChange={(v) =>
                  setArticle((f) => ({ ...f, publisherName: v }))
                }
                placeholder="SkynetLabs"
              />
              <Field
                label="Publisher logo URL"
                value={article.publisherLogo}
                onChange={(v) =>
                  setArticle((f) => ({ ...f, publisherLogo: v }))
                }
                placeholder="https://.../logo.png"
              />
            </div>
          </div>
        )}

        {activeType === "LocalBusiness" && (
          <div className="space-y-4">
            <Field
              label="Business name *"
              value={biz.name}
              onChange={(v) => setBiz((f) => ({ ...f, name: v }))}
              placeholder="SkynetLabs"
            />
            <TextArea
              label="Description"
              value={biz.description}
              onChange={(v) => setBiz((f) => ({ ...f, description: v }))}
              placeholder="AI automation agency."
            />
            <Field
              label="Street address"
              value={biz.streetAddress}
              onChange={(v) => setBiz((f) => ({ ...f, streetAddress: v }))}
              placeholder="123 Main St"
            />
            <div className="grid sm:grid-cols-3 gap-4">
              <Field
                label="City"
                value={biz.addressLocality}
                onChange={(v) => setBiz((f) => ({ ...f, addressLocality: v }))}
                placeholder="Ubud"
              />
              <Field
                label="Region/State"
                value={biz.addressRegion}
                onChange={(v) => setBiz((f) => ({ ...f, addressRegion: v }))}
                placeholder="Bali"
              />
              <Field
                label="Postal code"
                value={biz.postalCode}
                onChange={(v) => setBiz((f) => ({ ...f, postalCode: v }))}
                placeholder="80571"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field
                label="Country"
                value={biz.addressCountry}
                onChange={(v) => setBiz((f) => ({ ...f, addressCountry: v }))}
                placeholder="ID"
              />
              <Field
                label="Phone"
                value={biz.telephone}
                onChange={(v) => setBiz((f) => ({ ...f, telephone: v }))}
                placeholder="+62..."
              />
              <Field
                label="Price range"
                value={biz.priceRange}
                onChange={(v) => setBiz((f) => ({ ...f, priceRange: v }))}
                placeholder="$$"
              />
            </div>
            <Field
              label="URL"
              value={biz.url}
              onChange={(v) => setBiz((f) => ({ ...f, url: v }))}
              placeholder="https://skynetjoe.com"
            />
          </div>
        )}

        {activeType === "SoftwareApplication" && (
          <div className="space-y-4">
            <Field
              label="Name *"
              value={app.name}
              onChange={(v) => setApp((f) => ({ ...f, name: v }))}
              placeholder="AEO Audit"
            />
            <TextArea
              label="Description"
              value={app.description}
              onChange={(v) => setApp((f) => ({ ...f, description: v }))}
              placeholder="Free diagnostic tool that scores AEO readiness."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Application category"
                value={app.applicationCategory}
                onChange={(v) =>
                  setApp((f) => ({ ...f, applicationCategory: v }))
                }
                placeholder="BusinessApplication"
              />
              <Field
                label="Operating system"
                value={app.operatingSystem}
                onChange={(v) => setApp((f) => ({ ...f, operatingSystem: v }))}
                placeholder="Web"
              />
              <Field
                label="Price"
                value={app.price}
                onChange={(v) => setApp((f) => ({ ...f, price: v }))}
                placeholder="0"
              />
              <Field
                label="Currency"
                value={app.priceCurrency}
                onChange={(v) => setApp((f) => ({ ...f, priceCurrency: v }))}
                placeholder="USD"
              />
            </div>
            <Field
              label="URL"
              value={app.url}
              onChange={(v) => setApp((f) => ({ ...f, url: v }))}
              placeholder="https://skynetjoe.com/tools/..."
            />
          </div>
        )}
      </div>

      {/* OUTPUT */}
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
            <Braces className="w-3.5 h-3.5" />
            JSON-LD output
          </p>
          <button
            type="button"
            onClick={copyOutput}
            disabled={!hasContent}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--ink)] border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.10)] hover:bg-[rgba(198,107,63,0.20)] hover:border-[var(--terracotta)] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copyState === "copied" ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copyState === "copied" ? "Copied" : "Copy <script> tag"}
          </button>
        </div>
        {!hasContent && (
          <p className="text-xs text-[var(--terracotta-aa)]/90 mb-3">
            Fill in the required fields above to see valid JSON-LD.
          </p>
        )}
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
          <ToolUsage slug="schema-markup-generator" />
        </div>
      </div>

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
            Paste this into your page &lt;head&gt;, then run the AEO audit.
          </h3>
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

      <div
        className="mt-6 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.14)",
        }}
      >
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-2">
            Want it wired across every page?
          </p>
          <h3 className="text-xl md:text-2xl font-extrabold text-[var(--ink)] mb-2">
            Book a 30-min call — schema templates for your whole site, not just
            one page.
          </h3>
        </div>
        <a
          href={`${CAL_URL}?utm_source=schema-markup-generator`}
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
        .smg-input {
          width: 100%;
          background: var(--cream-2);
          border: 1px solid rgba(26,26,26,0.18);
          border-radius: 0.65rem;
          padding: 0.7rem 0.9rem;
          color: var(--ink);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .smg-input::placeholder { color: var(--ink-faint); }
        .smg-input:focus {
          border-color: rgba(198,107,63,0.50);
          box-shadow: 0 0 0 3px rgba(198,107,63,0.15);
        }
        .smg-textarea { resize: vertical; }
      `}</style>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-[var(--terracotta-aa)]/80 font-semibold mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[var(--cream-3)] border border-[rgba(26,26,26,0.18)] focus:border-[var(--terracotta)] rounded-xl px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-faint)] text-sm focus:outline-none transition"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-[var(--terracotta-aa)]/80 font-semibold mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-[var(--cream-3)] border border-[rgba(26,26,26,0.18)] focus:border-[var(--terracotta)] rounded-xl px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-faint)] text-sm focus:outline-none transition resize-y"
      />
    </div>
  );
}
