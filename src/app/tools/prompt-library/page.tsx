import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Library from "./Library";
import {
  PROMPT_COUNT,
  CATEGORIES,
} from "@/data/prompts-library";
import { Sparkles, Search, Copy, Library as LibraryIcon } from "lucide-react";

const PATH = "/tools/prompt-library";

export const metadata: Metadata = {
  title: `Prompt Library — ${PROMPT_COUNT} reusable AI prompts for service businesses · SkynetLabs`,
  description:
    "Free library of 50 production-tested AI prompts across sales, marketing, ops, content, data, recruitment, customer service and founder brain. Copy + run in Claude or ChatGPT.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: `Prompt Library · ${PROMPT_COUNT} reusable AI prompts for service businesses`,
    description:
      "Search, filter, copy. Open in Claude or ChatGPT in one click. Built for operators, not prompt-engineers.",
    url: `${SITE.url}${PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Library · 50 reusable AI prompts",
    description:
      "8 categories. 50 prompts. Real-world tested. Open in Claude or ChatGPT in one click.",
  },
};

const faqs = [
  {
    q: "Are these prompts free?",
    a: "Yes. The full library is free, no email gate, no signup. Copy any prompt with one click or open it directly in Claude or ChatGPT via deep link. Use them in your business however you want — no attribution required.",
  },
  {
    q: "What's the difference between this and just asking ChatGPT?",
    a: "Each prompt is structured — it gives the AI clear constraints, specific output format, banned phrases, and a persona. That's the difference between 'write me a cold email' getting you generic slop and getting back something a senior copywriter would ship.",
  },
  {
    q: "Why does each prompt have a recommended model?",
    a: "Claude is sharper for long-form, voice-locked writing, and decision frameworks. GPT-4 is faster for quick variations and structured outputs like tables. Gemini handles certain code and data tasks well. The tag is a starting point — you can override it.",
  },
  {
    q: "Can I submit prompts I've built?",
    a: "Yes. There's a 'Submit a prompt' button at the bottom that opens an email draft. Send the prompt + the result it produced and I'll add the good ones with credit. The library grows from real working prompts, not theoretical ones.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SkynetLabs Prompt Library",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description: `Searchable library of ${PROMPT_COUNT} reusable AI prompts across 8 service-business categories, with one-click copy and Claude/ChatGPT deep links.`,
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Prompt Library",
  url: `${SITE.url}${PATH}`,
  inLanguage: "en",
  description:
    "Curated library of 50 reusable AI prompts for service businesses, organized into 8 categories.",
  hasPart: CATEGORIES.map((c) => ({
    "@type": "Thing",
    name: c.label,
    description: c.blurb,
  })),
};

const heroStats = [
  {
    icon: LibraryIcon,
    label: `${PROMPT_COUNT} prompts`,
    body: "8 categories, 5-8 each.",
  },
  {
    icon: Search,
    label: "Search + filter",
    body: "Instant filter by title, body, category.",
  },
  {
    icon: Copy,
    label: "One-click copy",
    body: "Open in Claude or ChatGPT in one tap.",
  },
];

export default function PromptLibraryPage() {
  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section
        className="relative overflow-hidden pt-24 md:pt-32 pb-12"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 540,
            height: 540,
            background: "#1E88E5",
            top: -90,
            left: -130,
            opacity: 0.5,
          }}
        />
        <span
          className="orb"
          style={{
            width: 580,
            height: 580,
            background: "#14B8A6",
            top: 80,
            right: -160,
            opacity: 0.32,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(94, 234, 212, 0.14)",
                border: "1px solid rgba(94, 234, 212, 0.40)",
                color: "#5eead4",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · No email gate
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6 text-white">
              {PROMPT_COUNT} AI prompts that{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #7ee4ff 0%, #5eead4 50%, #fde68a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                actually work.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4 max-w-2xl">
              Eight categories — sales, marketing, ops, content, data,
              recruitment, customer service, founder brain. Every prompt is
              structured with constraints, banned phrases, and an output
              format. Not 'write me a cold email' — 'write me a cold email
              that ships'.
            </p>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
              Search, filter, copy. Or open any prompt directly in Claude or
              ChatGPT with one click. Anonymous, no signup.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-white">
                    <Icon className="w-4 h-4 text-cyan-300" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIBRARY */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-6xl mx-auto">
            <Library />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              Quick answers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-white">
              Honest FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition open:bg-white/8"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-white font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-cyan-300 transition group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
              }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                Want these prompts wired into your stack?
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                The prompts work standalone. They work 10x better wired into
                your CRM, helpdesk, or n8n workflow. Book a strategy call and
                we&apos;ll map the integration.
              </p>
              <a
                href="https://cal.com/waseemnasir/strategy?source=prompt-library"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-cyan-50 transition"
              >
                Book a strategy call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
