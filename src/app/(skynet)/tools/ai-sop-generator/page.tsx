import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES, CAL_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import Generator from "./Generator";
import { Sparkles, Timer, ShieldCheck, Bot } from "lucide-react";

const PATH = "/tools/ai-sop-generator";
const TOOL_CAL_URL = `${CAL_URL}?utm_source=ai-sop-generator`;

export const metadata: Metadata = {
  title: "Free SOP Generator — AI Automation Flags per Step",
  description:
    "Free SOP generator. Enter a process name and steps, get a formatted standard operating procedure with automation-candidate flags on every step. Enter your email to unlock the full doc.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Free SOP Generator — Formatted SOP + Automation Flags",
    description:
      "Process name, owner, steps. Flag which steps are automation candidates as you go. Export a formatted SOP doc. Free. Email to unlock.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SOP Generator · SkynetLabs",
    description:
      "Process + steps → a formatted SOP with automation-candidate flags per step. Free. Email to unlock.",
  },
};

const faqs = [
  {
    q: "What makes this different from a plain SOP template?",
    a: "Every step gets a checkbox — automation candidate or not. Steps you flag get called out in the doc with a note on why they're worth automating, plus a summary section listing every flagged step together. It's built to be the first artifact you hand an automation contractor, not just internal documentation.",
  },
  {
    q: "How do I decide what to flag?",
    a: "Ask three questions per step: is it repetitive (same steps, different data, every time)? Is it rule-based (if X then Y, no judgment call)? Is it high-volume (happens often enough that saved minutes add up)? Two or three yeses means flag it.",
  },
  {
    q: "What do I get in the export?",
    a: "A markdown SOP with process owner, numbered steps, an automation-candidate note under each flagged step, and a summary list of every flagged step at the bottom — ready to paste into Notion, Confluence, Google Docs, or hand straight to whoever's building the automation.",
  },
  {
    q: "Is anything sent to a server?",
    a: "Your process and steps are built entirely in your browser and saved to localStorage. The only thing sent to my CRM is the email you enter to unlock the export.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI SOP Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that turns a process name and step list into a formatted standard operating procedure with automation-candidate flags on each step.",
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
    icon: Bot,
    label: "Per-step flags",
    body: "Mark automation candidates as you write.",
  },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Steps stay local. Email unlocks the doc.",
  },
  {
    icon: Timer,
    label: "Ready to hand off",
    body: "Paste into Notion, Docs, or send to a contractor.",
  },
];

export default function AiSopGeneratorPage() {
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
                Free SOP generator · Email to unlock
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
              Write the SOP.{" "}
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
                Flag what to automate.
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
              Name your process, list the steps, tick a box on the ones that are
              repetitive or rule-based. Export a formatted SOP with automation
              candidates already flagged.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              The same doc I ask every new client for before I automate anything
              — now free to build yourself.
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

      {/* GENERATOR (client) */}
      <section className="section">
        <div className="container-x px-6">
          <div className="max-w-4xl mx-auto">
            <Generator calUrl={TOOL_CAL_URL} />
          </div>
        </div>
      </section>

      {/* WHY THIS */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this generator exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                You can&apos;t automate a process nobody wrote down.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  The first thing I ask a new client for is the SOP — and half
                  the time it doesn&apos;t exist. It&apos;s in someone&apos;s
                  head, or scattered across three Slack threads. Before I can
                  automate anything, someone has to write the steps down.
                </p>
                <p>
                  So this generator makes that the whole point of the exercise.
                  Write each step, tick the box if it&apos;s repetitive,
                  rule-based or high-volume, and you end a 30-minute exercise
                  with a real SOP and a short list of exactly what&apos;s worth
                  automating first.
                </p>
                <p>
                  Export it, share it with your team, and hand the flagged steps
                  to whoever&apos;s building your automation.
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
              Ready to turn a flagged step into an actual agent? Start with the{" "}
              <Link
                href="/tools/ai-agent-spec-writer"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                AI Agent Spec Writer
              </Link>{" "}
              to define role, guardrails and escalation, then the{" "}
              <Link
                href="/tools/system-prompt-generator"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                System Prompt Generator
              </Link>{" "}
              for the prompt itself. If the step is actually a multi-step AI
              workflow, build it with the{" "}
              <Link
                href="/tools/prompt-chain-builder"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                Prompt Chain Builder
              </Link>
              , or skip straight to{" "}
              <Link
                href="/discovery-call"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                booking a free discovery call
              </Link>{" "}
              and I&apos;ll build it for you.
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
