import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Generator from "./Generator";
import { Sparkles, Timer, ShieldCheck, Wand2 } from "lucide-react";

const PATH = "/tools/executive-summary-generator";
const CAL_URL = "https://calendly.com/skynetlabs/schedule-a-free-consultation?utm_source=exec-summary-generator";

export const metadata: Metadata = {
  title:
    "Executive Summary Generator — paste raw notes, get 5 ready-to-send formats · SkynetLabs",
  description:
    "Free tool. Paste meeting notes, project docs or call transcripts. Out comes a TL;DR, email, Slack post, deck slide and investor 1-pager. No API key — enter your email to unlock the formats.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "Executive Summary Generator · 5 formats from one block of notes",
    description:
      "TL;DR, email, Slack, deck and investor 1-pager from any raw text. Free. Enter your email to unlock the formats.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Summary Generator · SkynetLabs",
    description:
      "Paste raw notes, get 5 ready-to-send formats. Free. Email to unlock.",
  },
};

const faqs = [
  {
    q: "Is this a real AI summary?",
    a: "No. This is a structured-prettifier — it parses your text, pulls the strongest sentences, and pours them into five battle-tested formats. The advantage: it's instant, private, deterministic and uses YOUR words, not a language model's. The disadvantage: it can't infer information that isn't already in the text. If you want a true AI summary tailored to your workflow, book the call linked at the bottom and we'll scope a custom prompt for your team.",
  },
  {
    q: "Does it work for any kind of text?",
    a: "Best on prose with sentences and paragraphs — meeting transcripts, project briefs, sales call notes, design docs, internal memos. It'll cope with bullet lists too, but it's at its strongest when there are full sentences to rank and pull from. 1,000 to 8,000 characters is the sweet spot.",
  },
  {
    q: "Is my pasted text sent to a server?",
    a: "No. Your notes are parsed and the five formats are built entirely in your browser — your text never leaves the page, so you can paste sensitive client notes safely. The only thing sent to my CRM is the email you enter to unlock the formats.",
  },
  {
    q: "Why five formats?",
    a: "Because the same content gets reused in different rooms. The deck slide goes to the board, the Slack post goes to the team, the investor 1-pager goes to capital, the email goes to a client, the TL;DR goes at the top of every doc. Generating all five at once means you stop rewriting the same idea four times.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Executive Summary Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free browser-only tool that parses raw notes and produces TL;DR, email, Slack-ready, deck-slide and investor 1-pager summaries.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  provider: {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.brand,
    url: SITE.url,
  },
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

const heroStats = [
  { icon: Timer, label: "Under 2 sec", body: "Click generate, see five tabs." },
  {
    icon: ShieldCheck,
    label: "Notes stay private",
    body: "Your notes never leave the browser. Email unlocks the result.",
  },
  {
    icon: Wand2,
    label: "5 formats",
    body: "TL;DR · email · Slack · deck · investor.",
  },
];

export default function ExecutiveSummaryGeneratorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section
        style={{ position: "relative", padding: "96px 0 48px", background: "var(--cream-3)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(198,107,63,0.10)",
                border: "1px solid rgba(198,107,63,0.40)",
                color: "var(--terracotta)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free tool · Email to unlock
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.04, color: "var(--ink)", marginBottom: 22 }}>
              One paste,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, var(--terracotta) 0%, var(--ink) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                five formats.
              </span>
            </h1>

            <p style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14, maxWidth: "52ch" }}>
              Drop in meeting notes, call transcripts or a half-written brief.
              Out comes a TL;DR, a polished email, a Slack-ready post, a deck
              slide and an investor 1-pager — using your own words, not
              AI&apos;s.
            </p>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "52ch" }}>
              Your notes stay in your browser. Enter your email to unlock the formats. Free and instant.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-[var(--ink)]">
                    <Icon className="w-4 h-4 text-[var(--terracotta)]" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--ink-faint)] leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GENERATOR */}
      <section className="section">
        <div className="container-x px-6">
          <div className="max-w-4xl mx-auto">
            <Generator calUrl={CAL_URL} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold mb-3 text-center">
              Quick answers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Honest FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4 transition open:bg-[var(--cream-2)]"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[var(--ink)] font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-[var(--terracotta)] transition group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-[var(--ink-2)] leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
