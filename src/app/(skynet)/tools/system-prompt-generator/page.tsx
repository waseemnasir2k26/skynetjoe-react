import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES, CAL_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import Generator from "./Generator";
import { Sparkles, Timer, ShieldCheck, Terminal } from "lucide-react";

const PATH = "/tools/system-prompt-generator";
const TOOL_CAL_URL = `${CAL_URL}?utm_source=system-prompt-generator`;

export const metadata: Metadata = {
  title: "System Prompt Generator — Free Agent/GPT System Prompt",
  description:
    "Free system prompt generator for custom GPTs and AI agents. Role, constraints, tone and output format in — a production-ready system prompt out. Enter your email to unlock the full prompt pack.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "System Prompt Generator — Production System Prompts for Agents & GPTs",
    description:
      "Role, constraints, tone, output format. Fill the form, get a paste-ready system prompt for your custom GPT or agent. Free. Email to unlock.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Prompt Generator · SkynetLabs",
    description:
      "Role, constraints, tone, output format → one production-ready system prompt for agents and custom GPTs. Free. Email to unlock.",
  },
};

const faqs = [
  {
    q: "Is this the same as the Voice Persona Builder?",
    a: "No — different job. The Voice Persona Builder produces a brand voice profile for writing copy that sounds like your brand (marketing, emails, social posts). This tool produces a functional system prompt for an agent or custom GPT — what it's allowed to do, what tone to use, and exactly what format to reply in. If you're building a brand-voice writing assistant, start with the Voice Persona Builder. If you're building a functional agent or GPT, use this one.",
  },
  {
    q: "What platforms does the output work on?",
    a: "Any platform that accepts a system message or custom instructions — ChatGPT custom GPTs, Claude Projects, Gemini Gems, or a system prompt field in an agent framework like LangChain, CrewAI or n8n's AI Agent node.",
  },
  {
    q: "Why does output format matter so much?",
    a: "It's the single most common failure mode I see — a well-designed agent that replies in the wrong shape. A support bot that returns markdown headers in a plain-text chat widget looks broken even when the reasoning is correct. Locking the format up front avoids that entirely.",
  },
  {
    q: "Is anything sent to a server?",
    a: "Your inputs and the generated prompt are built entirely in your browser and saved to localStorage. The only thing sent to my CRM is the email you enter to unlock the full pack.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "System Prompt Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that turns role, constraints, tone and output format into a production-ready system prompt for custom GPTs and AI agents.",
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
    icon: Terminal,
    label: "4 fields",
    body: "Role, constraints, tone, output format.",
  },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Inputs stay local. Email unlocks the pack.",
  },
  {
    icon: Timer,
    label: "Production-ready",
    body: "Paste straight into a custom GPT or agent.",
  },
];

export default function SystemPromptGeneratorPage() {
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
                Free generator · Email to unlock
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
              A system prompt your{" "}
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
                agent actually obeys.
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
              Role, constraints, tone, output format. Four fields, one
              production-ready system prompt for a custom GPT or AI agent —
              copy-paste, no boilerplate to strip out.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 8,
                maxWidth: "52ch",
              }}
            >
              For an agent&apos;s function, not your brand&apos;s writing voice
              — for brand voice, use the{" "}
              <Link
                href="/tools/voice-persona-builder"
                style={{ color: "var(--terracotta-aa)", fontWeight: 600 }}
              >
                Voice Persona Builder
              </Link>{" "}
              instead.
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
                Most system prompts fail on format, not intelligence.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  I build custom GPTs and agents for clients weekly. The model
                  is smart enough almost every time — what breaks is the
                  wrapper. Wrong tone for the channel, no output-format rule, no
                  fallback for when a request conflicts with a constraint.
                </p>
                <p>
                  This generator forces those four decisions up front: who the
                  agent is, what it must never do, how it should sound, and
                  exactly what shape its replies take. That&apos;s usually 80%
                  of what separates a demo from something you can actually ship
                  to users.
                </p>
                <p>
                  Note this is a functional agent prompt, not a brand-voice
                  document — if you&apos;re trying to make an LLM write
                  marketing copy that sounds like your company, use the Voice
                  Persona Builder instead.
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
              Writing brand copy, not a functional agent? Use the{" "}
              <Link
                href="/tools/voice-persona-builder"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                Voice Persona Builder
              </Link>
              . Need the full review doc with guardrails and escalation rules,
              not just the prompt? Try the{" "}
              <Link
                href="/tools/ai-agent-spec-writer"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                AI Agent Spec Writer
              </Link>
              . Chaining several prompts together? Use the{" "}
              <Link
                href="/tools/prompt-chain-builder"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                Prompt Chain Builder
              </Link>
              , or{" "}
              <Link
                href="/discovery-call"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                book a free discovery call
              </Link>{" "}
              to have this agent actually wired into your stack.
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
