import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, howToSchema } from "@/lib/schema";
import Generator from "./Generator";
import { Sparkles, Timer, ShieldCheck, Wand2 } from "lucide-react";

const PATH = "/tools/executive-summary-generator";

const breadcrumbListSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "Executive Summary Generator", url: `${SITE.url}${PATH}` },
]);
const CAL_URL =
  "https://calendly.com/skynetlabs/schedule-a-free-consultation?utm_source=exec-summary-generator";

export const metadata: Metadata = {
  title:
    "Free Executive Summary Generator — Raw Notes to 5 Ready-to-Send Formats",
  description:
    "Free tool. Paste meeting notes, project docs or call transcripts. Out comes a TL;DR, email, Slack post, deck slide and investor 1-pager. No API key — enter your email to unlock the formats.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Executive Summary Generator · 5 formats from one block of notes",
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
  dateModified: "2026-08-19",
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

const howToSteps = howToSchema({
  name: "How to use the Executive Summary Generator",
  description:
    "Paste raw notes and generate five ready-to-send summary formats.",
  steps: [
    {
      name: "Paste your notes",
      text: "Paste raw notes, a transcript, or a project doc — 1,000 to 8,000 characters works best.",
    },
    {
      name: "Generate",
      text: "Click generate. Five tabs appear: TL;DR, email, Slack post, deck slide, investor 1-pager.",
    },
    {
      name: "Unlock",
      text: "Enter your email to unlock and copy the format you need.",
    },
    {
      name: "Ship it",
      text: "Paste the result where it's going — no further editing usually needed.",
    },
  ],
});

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
      <JsonLd data={breadcrumbListSchema} />
      <JsonLd data={howToSteps} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "96px 0 48px",
          background: "var(--cream-3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(198,107,63,0.10)",
                border: "1px solid rgba(198,107,63,0.40)",
                color: "var(--terracotta-aa)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free tool · Email to unlock
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(42px, 6.5vw, 72px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
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

            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 14,
                maxWidth: "52ch",
              }}
            >
              Drop in meeting notes, call transcripts or a half-written brief.
              Out comes a TL;DR, a polished email, a Slack-ready post, a deck
              slide and an investor 1-pager — using your own words, not
              AI&apos;s.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Your notes stay in your browser. Enter your email to unlock the
              formats. Free and instant.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-[var(--ink)]">
                    <Icon className="w-4 h-4 text-[var(--terracotta-aa)]" />
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

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                What is an executive summary, really
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Not a shorter version of your notes — a different shape for each
                room.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  An executive summary front-loads the decision or outcome, then
                  backs it with the minimum supporting detail the reader needs
                  to act — no chronology, no throat-clearing. The same
                  underlying facts read differently depending on the room: a
                  board wants risk and ask, a team wants next steps, a client
                  wants what changed for them.
                </p>
                <p>
                  This tool parses whatever you paste — meeting notes, a call
                  transcript, a half-written brief — and rewrites it into five
                  shapes built for five different rooms, using sentences already
                  present in your text rather than inventing new claims.
                </p>
              </div>
              <h3 className="text-lg font-bold mt-8 mb-3 text-[var(--ink)]">
                How to use it
              </h3>
              <ol className="space-y-2 text-[var(--ink-2)] text-sm md:text-base list-decimal list-inside">
                <li>
                  Paste raw notes, a transcript, or a project doc — 1,000 to
                  8,000 characters works best.
                </li>
                <li>
                  Click generate. Five tabs appear: TL;DR, email, Slack post,
                  deck slide, investor 1-pager.
                </li>
                <li>
                  Enter your email to unlock and copy the format you need.
                </li>
                <li>
                  Paste the result where it's going — no further editing usually
                  needed.
                </li>
              </ol>
              <h3 className="text-lg font-bold mt-8 mb-3 text-[var(--ink)]">
                Who this is for
              </h3>
              <ul className="space-y-2 text-[var(--ink-2)] text-sm md:text-base list-disc list-inside">
                <li>
                  Founders who leave a meeting with notes and no time to rewrite
                  them five ways.
                </li>
                <li>
                  Ops and project leads who report the same update to a team, a
                  client, and a boss.
                </li>
                <li>
                  Anyone prepping a board or investor update from a pile of raw
                  call notes.
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/tools/ai-sop-generator"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Turn a process into an SOP
                </a>
                <a
                  href="/tools/content-calendar"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Plan a content calendar
                </a>
                <a
                  href="/tools/prompt-library"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Browse the prompt library
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
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
                    <span className="text-[var(--terracotta-aa)] transition group-open:rotate-45 text-xl leading-none">
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
