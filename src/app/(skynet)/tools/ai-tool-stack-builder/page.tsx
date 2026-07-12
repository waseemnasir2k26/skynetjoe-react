import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Builder from "./Builder";
import { ROLE_OPTIONS, GOAL_OPTIONS } from "@/data/tools/ai-tool-stack";
import { Sparkles, LayoutGrid, Workflow, Target } from "lucide-react";

const PATH = "/tools/ai-tool-stack-builder";

export const metadata: Metadata = {
  title: "AI Tool Stack Builder — Free Personalized Stack",
  description:
    "Free AI tool stack builder. Pick your role and goal, get a recommended stack of AI tools plus an n8n glue suggestion to wire it together. Email unlocks the full stack doc.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "AI Tool Stack Builder — role + goal in, tool stack out",
    description:
      "6 roles, 5 goals, a curated stack for each combination — chat, content, CRM, automation glue. Email unlocks the full doc.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tool Stack Builder · free, personalized",
    description:
      "Pick your role and goal, get a recommended AI tool stack + n8n glue suggestion.",
  },
};

const faqs = [
  {
    q: "How is this different from a generic 'best AI tools' listicle?",
    a: "Listicles rank tools in isolation. This maps a stack to your actual role and goal — a solo founder trying to save time on repetitive tasks needs a different combination than an agency owner trying to scale outbound. The recommendations are grouped by category (chat, automation glue, CRM, scheduling) so you know what each tool is actually for, not just that it's popular.",
  },
  {
    q: "What's the 'n8n glue suggestion' about?",
    a: "Most AI tool stacks fail not because the individual tools are bad, but because nothing connects them — a lead comes in, a human has to manually copy it into three different places. The glue suggestion is a plain-English description of the automation that would wire your specific stack together, built around n8n as the connector.",
  },
  {
    q: "Do I have to use every tool recommended?",
    a: "No. Treat it as a starting shortlist, not a mandate. If you already have a CRM you like, keep it — swap in the recommended category, not necessarily the exact tool name. The point is coverage: chat/reasoning, content or outreach, a system of record, and something gluing it together.",
  },
  {
    q: "Is the full stack doc really free?",
    a: "The preview (top 3 tools) is free with no email. The full doc — every category plus the goal-specific add-on and the n8n glue suggestion — unlocks with an email so I can follow up if you want help actually wiring it.",
  },
];

const heroStats = [
  {
    icon: Target,
    label: `${ROLE_OPTIONS.length} roles`,
    body: "Founder, marketing, sales, ops, agency, dev.",
  },
  {
    icon: LayoutGrid,
    label: `${GOAL_OPTIONS.length} goals`,
    body: "From saving time to building internal agents.",
  },
  {
    icon: Workflow,
    label: "n8n glue",
    body: "A plain-English automation to wire it together.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Tool Stack Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description: `Free tool that recommends an AI tool stack from ${ROLE_OPTIONS.length} roles and ${GOAL_OPTIONS.length} goals, with a static n8n automation-glue suggestion per combination.`,
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

export default function AiToolStackBuilderPage() {
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
                Free preview · Email unlocks the full doc
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
              Stop guessing which{" "}
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
                AI tools
              </span>{" "}
              you actually need.
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
              Pick your role and your goal. Get a recommended stack grouped by
              category — chat, content, CRM, automation glue — with a
              plain-English n8n suggestion for wiring it together.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Preview 3 tools free. Enter your email to unlock the full stack
              doc.
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

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Builder />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this builder exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Tool sprawl is the new busywork.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Every founder I talk to on a discovery call has the same
                  problem in a different shape: a graveyard of AI tool
                  subscriptions they signed up for after a LinkedIn post, half
                  of which they haven&apos;t opened in a month. New AI tools
                  ship every week and almost none of them are built to work
                  together — you end up doing more manual copy-pasting between
                  tools than the tools ever saved you.
                </p>
                <p>
                  This builder skips the &quot;best tools of 2026&quot; noise
                  and starts from two questions that actually determine what you
                  need: who you are day-to-day, and what you&apos;re trying to
                  fix. A solo founder trying to save time on repetitive tasks
                  needs a completely different first move than an agency owner
                  trying to scale outbound — even though both might land on
                  similar underlying tools.
                </p>
                <p>
                  The categories are deliberately generic (chat/reasoning,
                  automation glue, CRM/pipeline) rather than one hard-coded
                  brand name per slot, because the specific tool matters less
                  than having each category covered. Swap in whatever you
                  already pay for if it fits the category — the goal is
                  coverage, not vendor lock-in.
                </p>
                <p>
                  The n8n glue suggestion is the part most stacks skip entirely.
                  Tools without a connection layer between them stay manual
                  forever. If the stack you get back makes sense but the wiring
                  feels like a project on its own, that&apos;s exactly what a
                  discovery call is for — I&apos;ll map the actual automation on
                  a whiteboard with you.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x">
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
