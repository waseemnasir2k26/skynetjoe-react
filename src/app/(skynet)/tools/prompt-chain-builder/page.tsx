import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES, CAL_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import Builder from "./Builder";
import { Sparkles, Timer, ShieldCheck, Layers } from "lucide-react";

const PATH = "/tools/prompt-chain-builder";
const TOOL_CAL_URL = `${CAL_URL}?utm_source=prompt-chain-builder`;

export const metadata: Metadata = {
  title: "Prompt Chain Builder — Free Multi-Step Prompt Chain",
  description:
    "Free prompt chain builder. Compose multi-step chains — goal, prompt, expected output, pass-to-next per step. Export as markdown or JSON. Enter your email to unlock the export.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Prompt Chain Builder — Compose Multi-Step AI Prompt Chains",
    description:
      "Step cards for goal, prompt, expected output and pass-to-next. Export a paste-ready markdown or JSON chain. Free. Email to unlock.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Chain Builder · SkynetLabs",
    description:
      "Compose multi-step prompt chains as step cards, export markdown or JSON. Free. Email to unlock.",
  },
};

const faqs = [
  {
    q: "What is a prompt chain, exactly?",
    a: "A sequence of prompts where each step's output feeds the next step's input — research, then draft, then QA, for example. Chaining beats one giant prompt because each step gets the model's full attention on a narrower job, and you can inspect or fix any single link without redoing the whole thing.",
  },
  {
    q: "What do I get in the export?",
    a: "A markdown document with every step's goal, prompt, expected output and pass-to-next note, plus a matching JSON file if you want to feed the chain into an agent framework or automation tool programmatically.",
  },
  {
    q: "Is anything sent to a server?",
    a: "Your chain is built and saved to localStorage entirely in your browser so you can leave and come back. The only thing sent to my CRM is the email you enter to unlock the export.",
  },
  {
    q: "How is this different from just prompting ChatGPT step by step?",
    a: "You can absolutely do that manually. This tool forces you to define expected output and hand-off content per step up front, so the chain is documented and repeatable — reusable by you, a teammate, or an agent, not just something living in your head mid-conversation.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Prompt Chain Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool to compose multi-step prompt chains as step cards (goal, prompt, expected output, pass-to-next) and export as markdown or JSON.",
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
    icon: Layers,
    label: "Step cards",
    body: "Goal, prompt, expected output, pass-to-next.",
  },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Steps stay local. Email unlocks the export.",
  },
  {
    icon: Timer,
    label: "Markdown + JSON",
    body: "Copy or download both formats.",
  },
];

export default function PromptChainBuilderPage() {
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
                Free builder · Email to unlock
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
              One prompt at a time{" "}
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
                stops working.
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
              Build multi-step prompt chains as step cards — goal, prompt,
              expected output, what to pass forward. Export a paste-ready chain
              in markdown or JSON.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Same discipline I use to scope automation builds before I ever
              open n8n — document the hand-offs first.
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

      {/* BUILDER (client) */}
      <section className="section">
        <div className="container-x px-6">
          <div className="max-w-4xl mx-auto">
            <Builder calUrl={TOOL_CAL_URL} />
          </div>
        </div>
      </section>

      {/* WHY THIS */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this builder exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Long single prompts fail quietly. Chains fail loudly, at the
                right step.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  I&apos;ve scoped 240+ automation builds since 2019. The ones
                  that broke in production almost always started as one massive
                  prompt trying to research, draft and QA in a single pass. When
                  it went wrong, nobody could tell which part failed.
                </p>
                <p>
                  Chains fix that. Break the job into steps, define what
                  &ldquo;good&rdquo; looks like per step, and name exactly what
                  carries forward. Now when something breaks, you know which
                  link broke — and you can fix one prompt instead of rewriting
                  the whole thing.
                </p>
                <p>
                  Build your chain here, export it, and either run it manually
                  across a few conversation turns or hand the JSON to whoever is
                  wiring your agent.
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
              Need the system prompt each chain step runs against instead of the
              chain itself? Try the{" "}
              <Link
                href="/tools/system-prompt-generator"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                System Prompt Generator
              </Link>
              . Formalizing an agent that runs a chain unattended? Start with
              the{" "}
              <Link
                href="/tools/ai-agent-spec-writer"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                AI Agent Spec Writer
              </Link>
              . Browse fifty more ready-made prompts in the{" "}
              <Link
                href="/tools/prompt-library"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                Prompt Library
              </Link>
              , or{" "}
              <Link
                href="/discovery-call"
                className="font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                book a free discovery call
              </Link>{" "}
              to have this chain wired into a real agent.
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
