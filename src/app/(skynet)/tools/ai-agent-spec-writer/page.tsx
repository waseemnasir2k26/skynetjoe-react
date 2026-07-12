import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES, CAL_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import Writer from "./Writer";
import { Sparkles, Timer, ShieldCheck, ListChecks } from "lucide-react";

const PATH = "/tools/ai-agent-spec-writer";
const TOOL_CAL_URL = `${CAL_URL}?utm_source=ai-agent-spec-writer`;

export const metadata: Metadata = {
  title: "AI Agent Spec Writer — Free Agent Spec Template",
  description:
    "Free AI agent spec template. Fill in role, tools, guardrails, success criteria and escalation rules — get a structured agent spec doc ready to hand to a developer or framework. Enter your email to unlock the export.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "AI Agent Spec Writer — Structured Agent Spec Doc",
    description:
      "Role, tools, guardrails, success criteria, escalation. Fill the form, get a paste-ready agent spec + system prompt block. Free. Email to unlock.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Spec Writer · SkynetLabs",
    description:
      "Role, tools, guardrails, success criteria, escalation → one structured agent spec doc. Free. Email to unlock.",
  },
};

const faqs = [
  {
    q: "What is an agent spec template used for?",
    a: "It's the document you write before you build or configure an autonomous agent — what it's allowed to do, what it must never do, and when it should stop and ask a human. Skipping this step is how agents send emails they shouldn't or approve refunds nobody signed off on.",
  },
  {
    q: "What do I actually get?",
    a: "A structured markdown doc with five sections — role, tools/access, guardrails, success criteria, escalation rules — plus a copy-paste system-prompt block built from the same answers, ready to drop into an agent framework or LLM.",
  },
  {
    q: "Is this the same as a system prompt?",
    a: "The spec doc is the source of truth a human reviews and signs off on. The copy-paste block at the bottom of the export is the compressed version you actually paste into an agent. If you only need the prompt and not the review doc, use the System Prompt Generator instead.",
  },
  {
    q: "Is anything sent to a server?",
    a: "Your inputs and the generated spec are built entirely in your browser and saved to localStorage. The only thing sent to my CRM is the email you enter to unlock the export.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Agent Spec Writer",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that turns role, tools, guardrails, success criteria and escalation rules into a structured AI agent spec document with a copy-paste system prompt block.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
  {
    icon: ListChecks,
    label: "5 sections",
    body: "Role, tools, guardrails, success, escalation.",
  },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Inputs stay local. Email unlocks the export.",
  },
  {
    icon: Timer,
    label: "Ready to hand off",
    body: "Doc + system prompt block, both exportable.",
  },
];

export default function AiAgentSpecWriterPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
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
                Free template · Email to unlock
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
              Define the agent{" "}
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
                before you build it.
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
              Role, tools, guardrails, success criteria, escalation rules. Fill
              five fields, get a structured agent spec doc ready to hand to a
              developer, contractor or agent framework.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              The doc I make every client sign off on before I wire an agent
              into their business — now free to fill in yourself.
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

      {/* WRITER (client) */}
      <section className="section">
        <div className="container-x px-6">
          <div className="max-w-4xl mx-auto">
            <Writer calUrl={TOOL_CAL_URL} />
          </div>
        </div>
      </section>

      {/* WHY THIS */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this template exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Every agent I&apos;ve seen go wrong skipped this doc.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Someone gets excited, pastes a rough job description into an
                  agent framework, and ships it. Then it emails a customer
                  something it shouldn&apos;t, or approves a refund nobody
                  authorized, because nobody wrote down the guardrails.
                </p>
                <p>
                  Five sections stop that: exactly what the agent is responsible
                  for, exactly what it can touch, exactly what it can never do,
                  exactly how you&apos;ll know it worked, and exactly when it
                  should stop and ask a human instead of guessing.
                </p>
                <p>
                  Fill it out here, hand the export to whoever configures the
                  agent, and you&apos;ve turned a vague idea into something
                  that&apos;s actually reviewable.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
              More free tools
            </p>
            <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-4">
              Need just the paste-ready prompt, not the full review doc? Use the{" "}
              <Link
                href="/tools/system-prompt-generator"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                System Prompt Generator
              </Link>
              . Building the sequence of steps this agent will run? Try the{" "}
              <Link
                href="/tools/prompt-chain-builder"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                Prompt Chain Builder
              </Link>
              . Turning a manual process into something this agent can automate?
              Start with the{" "}
              <Link
                href="/tools/ai-sop-generator"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                AI SOP Generator
              </Link>
              , or{" "}
              <Link
                href="/discovery-call"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                book a free discovery call
              </Link>{" "}
              to have this agent actually built.
            </p>
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
