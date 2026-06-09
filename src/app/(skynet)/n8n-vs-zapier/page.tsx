import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES, twitterFromOpenGraph } from "@/lib/site";
import { person, personRef } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
  description:
    "Side-by-side n8n vs Zapier comparison from someone who has shipped 180+ workflows across both. 15-row criteria table, 5 real-world scenarios, decision tree, and when to use neither.",
  alternates: { canonical: `${SITE.url}/n8n-vs-zapier` },
  openGraph: {
    title:
      "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
    description:
      "180+ workflows shipped across both. Pricing, self-hosting, branching, compliance, AI nodes — and 5 scenarios with explicit picks.",
    url: `${SITE.url}/n8n-vs-zapier`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: twitterFromOpenGraph({
    title:
      "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
    description:
      "180+ workflows shipped across both. Pricing, self-hosting, branching, compliance, AI nodes — and 5 scenarios with explicit picks.",
  }),
};

// Full @graph schema preserved from the original HTML payload (Article + Table
// + FAQPage). vercel-preview hostnames swapped for SITE.url so structured data
// points at the production domain. This is the single Article node for the URL —
// a previous flat Article duplicate was removed to avoid two conflicting Article
// nodes (different author URLs) for one page.
const graphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE.url}/n8n-vs-zapier#article`,
      headline:
        "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
      description:
        "Side-by-side comparison of n8n and Zapier covering pricing, self-hosting, branching, error handling, AI integrations, compliance, and five real-world scenarios with explicit recommendations.",
      image: `${SITE.url}/og-default.png`,
      // Reference the canonical #person (emitted as a node in this @graph below)
      // instead of a bare un-@id'd author (M15).
      author: personRef,
      publisher: {
        "@type": "Organization",
        name: SITE.brand,
        url: SITE.url,
      },
      datePublished: "2026-05-20",
      dateModified: "2026-05-22",
      mainEntityOfPage: `${SITE.url}/n8n-vs-zapier`,
      about: [
        {
          "@type": "SoftwareApplication",
          name: "n8n",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Cross-platform",
        },
        {
          "@type": "SoftwareApplication",
          name: "Zapier",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
        },
      ],
    },
    {
      "@type": "Table",
      "@id": `${SITE.url}/n8n-vs-zapier#comparison-table`,
      about:
        "Feature comparison between n8n and Zapier across 15 criteria including pricing, self-hosting, branching, error handling, AI integrations, and compliance.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/n8n-vs-zapier#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between n8n and Zapier?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "n8n is open-source, self-hostable workflow infrastructure with native branching, code nodes, and queue mode. Zapier is managed SaaS optimized for non-engineers running a small number of straight-line automations against mainstream apps. n8n wins on cost above 5K tasks/month, on branching complexity, and on compliance via self-hosting. Zapier wins on time-to-fluency and on apps with niche connectors.",
          },
        },
        {
          "@type": "Question",
          name: "When should I pick n8n over Zapier?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pick n8n if you have 5+ active workflows, need branching/loops/custom code, run more than 5K tasks per month, need self-hosting for HIPAA or data residency, or want to ship automation as a service to your own clients without per-task fees eating your margin.",
          },
        },
        {
          "@type": "Question",
          name: "When should I pick Zapier over n8n?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pick Zapier if you have 1–3 workflows, zero engineering capacity, your stack is mainstream SaaS (Gmail, Slack, Sheets, Stripe), task volume is under 2K per month, and you'd rather pay than maintain infrastructure. Zapier ships a 5-step flow in 15–30 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Is n8n cheaper than Zapier at scale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. At 30,000 tasks per month, self-hosted n8n on a small Hetzner VPS costs roughly 10x less than the equivalent Zapier plan. The break-even point is around 5,000 tasks per month assuming someone on your team can own the n8n instance.",
          },
        },
        {
          "@type": "Question",
          name: "Can I migrate from Zapier to n8n without breaking anything?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, one flow at a time. Rebuild the Zap in n8n in parallel, run both for 48 hours with a comparison spreadsheet, then disable Zapier. Never bulk-migrate — you will lose edge-case knowledge that lived in step descriptions. A 12-Zap migration takes about three weeks.",
          },
        },
        {
          "@type": "Question",
          name: "Does n8n support HIPAA compliance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, via self-hosting on HIPAA-compliant infrastructure (your own AWS VPC, Aptible, OpsCompass). You control where PHI lives and how it's logged. Zapier Enterprise also offers HIPAA with a signed BAA — choose Zapier Enterprise if you have no cloud team, n8n self-hosted if you do.",
          },
        },
      ],
    },
    // Canonical #person node so the Article.author @id reference resolves.
    person,
  ],
};

// 15-row comparison criteria — preserved verbatim from the original payload.
const CRITERIA: { c: string; n8n: string; zap: string }[] = [
  {
    c: "Pricing model",
    n8n: "Free self-hosted, fair-code license. Cloud: per-execution tiers from a low monthly base.",
    zap: "Per-task pricing. Compounds quickly past ~10K tasks/month.",
  },
  {
    c: "Self-hosting",
    n8n: "First-class. Docker Compose on a small Hetzner VPS works fine.",
    zap: "Not supported. SaaS only.",
  },
  {
    c: "Code nodes",
    n8n: "Native JavaScript + Python (beta) code nodes. Full npm package access on self-hosted.",
    zap: "Code by Zapier (JavaScript / Python) with execution limits and no external packages.",
  },
  {
    c: "Branching",
    n8n: "IF, Switch, and Merge nodes. Visual branching with full join semantics.",
    zap: "Paths feature (Professional+). Limited compared to n8n's branching.",
  },
  {
    c: "Error handling",
    n8n: "Workflow error trigger + per-node continue-on-fail + custom error workflows.",
    zap: "Built-in retries and an error inbox. Less programmable than n8n.",
  },
  {
    c: "Sub-workflows",
    n8n: "Yes — call one workflow from another. Critical for DRY automation libraries.",
    zap: "Multi-step Zaps only — no native sub-workflow primitive.",
  },
  {
    c: "Queue mode",
    n8n: "Yes — Redis-backed worker pool. Handles 10K+ webhooks/hour on a small VPS.",
    zap: "Abstracted away. You don't see it; you also can't tune it.",
  },
  {
    c: "Webhook latency",
    n8n: "Sub-second on self-hosted. ~1–3s on cloud.",
    zap: "2–15 seconds typical. Higher tiers reduce queue time.",
  },
  {
    c: "AI / LLM nodes",
    n8n: "OpenAI, Anthropic, Gemini, plus generic HTTP and LangChain nodes for any custom model.",
    zap: "Decent OpenAI / Claude integration. Less flexible for custom LLM stacks.",
  },
  {
    c: "Marketplace size",
    n8n: "~400 integrations + write-your-own HTTP node for anything missing.",
    zap: "~6,000 apps. The widest integration library in the category.",
  },
  {
    c: "Learning curve",
    n8n: "2–4 weeks to fluency if you have basic API literacy.",
    zap: "2–4 days to fluency. The lowest-barrier automation tool on the market.",
  },
  {
    c: "Compliance (HIPAA / SOC2)",
    n8n: "Self-host gives you full control. Cloud plans add compliance tiers.",
    zap: "Enterprise plans include HIPAA + SOC2 (Zapier holds both).",
  },
  {
    c: "Vendor lock-in",
    n8n: "Low. Workflows export as JSON; you can move providers in a day.",
    zap: "High. Zaps don't export to other platforms in any useful format.",
  },
  {
    c: "Speed of building a 5-step flow",
    n8n: "30–60 minutes once you know the platform.",
    zap: "15–30 minutes — fastest in the category for simple flows.",
  },
  {
    c: "Speed of building a 25-step flow with branching",
    n8n: "4–8 hours including testing. Manageable.",
    zap: "12+ hours and painful — Paths multiply, debugging gets messy.",
  },
];

// Five real-world scenarios — preserved verbatim.
const SCENARIOS: { h: string; body: string[]; verdict: string }[] = [
  {
    h: 'Scenario 1: "I have one marketing flow and zero engineering"',
    body: [
      "You're a solo founder or small marketing team. You want new HubSpot leads to land in a Google Sheet, trigger an internal Slack notification, and send a welcome email via your ESP. That's it. You don't want to think about hosting, you don't want to write code, you don't want to fix queue mode in six months when traffic doubles.",
      "Zapier wins this cleanly. The UI is the friendliest in the category. The connector for HubSpot, Google Sheets, Slack, and your ESP is one click each. You'll build the flow in 25 minutes and forget it exists. The premium for not thinking about infrastructure is worth it at this scale. If you're processing under 750 tasks per month, the cost is trivial.",
    ],
    verdict: "Verdict — Zapier Starter plan. Don't overthink it.",
  },
  {
    h: 'Scenario 2: "I have 12 internal ops flows and 1 dev"',
    body: [
      "You're a 20-person company. Ops, sales, support, and finance all want their own automations. Lead routing, invoice processing, support ticket enrichment, CRM hygiene, weekly reports. Task volume is around 30K/month across the lot. You have a developer who can help maintain but who has bigger product work to ship.",
      'n8n wins this. Self-host on a small Hetzner VPS with Docker Compose, Postgres for state, Caddy for HTTPS, and let the developer set up workflow versioning in Git. At 30K tasks/month Zapier would cost roughly 10x what running your own VPS does. The sub-workflow primitive lets you build shared "send Slack alert" or "look up account in CRM" subroutines once and reuse them across 12 flows. By month six, the time saved on DRY refactors pays back the setup investment.',
    ],
    verdict: "Verdict — n8n self-hosted. Hetzner + Docker + Postgres + Caddy.",
  },
  {
    h: 'Scenario 3: "I need HIPAA compliance"',
    body: [
      "You're in healthcare, mental health, or any vertical where PHI flows through your automation. Patient names, appointment data, insurance numbers — anything that would land you in legal trouble if it leaked through an unaudited third party.",
      "Both can do this but the path differs. Zapier Enterprise has HIPAA available with a signed BAA — fast to set up, expensive monthly, no infrastructure questions. n8n self-hosted on your own AWS VPC or HIPAA-compliant hosting (Aptible, OpsCompass) gives you full control of where PHI lives and how it's logged. The right choice depends on whether you're already on AWS — if yes, n8n self-hosted is cheaper and tighter. If you're a small clinic with no cloud team, Zapier Enterprise removes a whole category of risk.",
    ],
    verdict:
      "Verdict — Zapier Enterprise if no cloud team. n8n self-hosted on HIPAA-compliant infra if you have one.",
  },
  {
    h: 'Scenario 4: "I run an agency selling automation as a service"',
    body: [
      "You're an agency. You sell automation builds to clients ranging from solopreneurs to mid-market. You want a stack where you can ship fast, white-label nothing, and not have your margin eaten by per-task fees flowing through your reseller account.",
      'n8n wins this convincingly. Self-host one n8n instance per client on a cheap Hetzner VPS, or run multi-tenant with isolated databases. Workflows export as JSON which means you can build a library of templated flows ("Stripe-to-Notion lead capture," "Calendly-to-CRM intake") and clone them across clients in minutes. Zapier\'s per-task billing makes reseller economics painful — every time a client\'s flows scale, your margin shrinks. GoHighLevel is another agency-friendly alternative if your clients want marketing-focused features.',
    ],
    verdict:
      "Verdict — n8n self-hosted, one instance per client. GHL as alternative if marketing-focused.",
  },
  {
    h: 'Scenario 5: "I\'m migrating off Zapier — should I"',
    body: [
      "You've been on Zapier for two years. You have 8–15 Zaps and your monthly bill has crept north of what feels reasonable. You're wondering if the migration tax is worth it.",
      "Honest answer: only if you have at least 5 Zaps, more than 5K tasks/month, and a developer or technically-comfortable operator who can own the n8n instance. Below those thresholds, the migration tax (40–80 hours of rebuilding, testing, and re-credentialing) eats your savings for a year. Above those thresholds, the payback period is typically 3–4 months. Never bulk-migrate — one flow at a time, run both for 48 hours in parallel with a comparison spreadsheet, then disable Zapier. A typical 12-Zap migration takes us about 3 weeks at SkynetLabs.",
    ],
    verdict:
      "Verdict — migrate if 5+ flows AND 5K+ tasks/month AND someone owns it. Otherwise stay.",
  },
];

// Decision tree — preserved verbatim. tone: zap | n8n | alt drives accent.
const TREE: { q: string; arrow: string; leaf: string; tone: string }[] = [
  {
    q: "Q1. Do you have more than 5 active workflows (or plan to within 6 months)?",
    arrow: "└── No →",
    leaf: "→ Zapier (don't overthink small)",
    tone: "zap",
  },
  {
    q: "Q2. Do you (or anyone on your team) need branching, loops, or custom code in a workflow?",
    arrow: "└── No →",
    leaf: "→ Zapier Professional",
    tone: "zap",
  },
  {
    q: "Q3. Is your monthly task volume above ~5K?",
    arrow: "└── No →",
    leaf: "→ Zapier Professional + Paths feature",
    tone: "zap",
  },
  {
    q: "Q4. Do you have someone (in-house or contractor) who can own infrastructure?",
    arrow: "└── No →",
    leaf: "→ n8n Cloud (skip self-hosting, accept cost)",
    tone: "alt",
  },
  {
    q: "Q5. Do you need HIPAA, SOC2, or data-residency compliance?",
    arrow: "└── No →",
    leaf: "→ n8n self-hosted on Hetzner/DigitalOcean",
    tone: "n8n",
  },
  {
    q: "Q6. Are you already running on AWS, Azure, or GCP with a security team?",
    arrow: "└── No →",
    leaf: "→ Zapier Enterprise with signed BAA",
    tone: "alt",
  },
];

export default function N8nVsZapierPage() {
  return (
    <>
      <JsonLd data={graphSchema} />

      <div className="sky">
        {/* HERO — verdict-first comparison angle */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                Engineer&apos;s field notes&nbsp;·{" "}
                <strong>180+ workflows</strong>&nbsp;· Updated May 2026
              </div>

              <h1>
                n8n vs Zapier — <em>when to pick which.</em>
              </h1>

              <p className="hero-sub">
                A side-by-side comparison from someone who has shipped 180+
                workflows across both platforms.{" "}
                <strong>
                  No affiliate links. No &ldquo;it depends.&rdquo;
                </strong>{" "}
                Concrete recommendations, a 15-row criteria table, 5 real-world
                scenarios, and a decision tree.
              </p>

              <div className="cta-row">
                <Link
                  href={SITE.cta.href}
                  className="btn-primary"
                  data-meta-event="Schedule"
                  data-meta-name="n8n-zapier-hero-book-audit"
                >
                  {SITE.cta.label} →
                </Link>
                <a href="#comparison" className="btn-line">
                  Jump to the comparison
                </a>
              </div>

              <div className="featured-in">
                <span className="featured-lbl">By</span>
                <span>Waseem Nasir, SkynetLabs</span>
                <span>180+ workflows shipped</span>
                <span>Both stacks in production</span>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR — the two-sided verdict */}
        <section className="section tinted">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">TL;DR</span>
              <h2>
                Different shapes of the <em>same problem.</em>
              </h2>
              <p className="section-sub">
                n8n and Zapier are not head-to-head competitors. Zapier is a
                managed SaaS for non-engineers shipping a small number of
                straight-line automations against well-known APIs. n8n is
                open-source infrastructure for engineers shipping many
                automations — branching, looping, custom code, and self-hosted
                compliance. They compete only at the edges of each other&apos;s
                strong zones.
              </p>
            </div>

            <div className="feature-row">
              <div className="feat-card">
                <span className="feat-tag">Pick n8n if</span>
                <p className="feat-body">
                  You have 5+ flows, need branching/loops/code, run more than 5K
                  tasks/month, need self-hosting for HIPAA or data residency, or
                  want to ship automation as a service to your own clients.
                </p>
              </div>
              <div className="feat-card">
                <span className="feat-tag">Pick Zapier if</span>
                <p className="feat-body">
                  You have 1–3 flows, zero engineering capacity, your stack is
                  mainstream SaaS (Gmail, Slack, Sheets, Stripe), task volume is
                  under 2K/month, and you&apos;d rather pay than maintain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SIDE-BY-SIDE COMPARISON TABLE */}
        <section className="section" id="comparison">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Side by side</span>
              <h2>
                15 criteria, <em>head to head.</em>
              </h2>
            </div>

            <div className="compare-wrap">
              <table className="compare-tbl">
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th className="us">n8n</th>
                    <th>Zapier</th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA.map((row) => (
                    <tr key={row.c}>
                      <td>{row.c}</td>
                      <td className="us">{row.n8n}</td>
                      <td className="bad">{row.zap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FIVE SCENARIOS */}
        <section className="section tinted" id="scenarios">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">In practice</span>
              <h2>
                Five real-world <em>scenarios.</em>
              </h2>
            </div>

            <div className="feature-row">
              {SCENARIOS.map((s) => (
                <div className="feat-card" key={s.h}>
                  <h3 className="feat-title">{s.h}</h3>
                  {s.body.map((p, i) => (
                    <p className="feat-body" key={i} style={{ marginTop: 12 }}>
                      {p}
                    </p>
                  ))}
                  <span className="feat-tag" style={{ marginTop: 16 }}>
                    {s.verdict}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DECISION TREE */}
        <section className="section" id="decision-tree">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Decision tree</span>
              <h2>
                Six questions to the <em>right pick.</em>
              </h2>
            </div>

            <div className="value-stack" style={{ maxWidth: 820 }}>
              {TREE.map((node, i) => (
                <div key={i}>
                  <p
                    className="feat-body"
                    style={{
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginTop: i === 0 ? 0 : 18,
                    }}
                  >
                    {node.q}
                  </p>
                  <p
                    className="mono"
                    style={{
                      fontSize: 13,
                      color: "var(--ink-faint)",
                      margin: "6px 0 4px",
                    }}
                  >
                    {node.arrow}
                  </p>
                  <span
                    className="value-saved"
                    style={{
                      color:
                        node.tone === "n8n"
                          ? "var(--sage)"
                          : node.tone === "alt"
                            ? "#7a6435"
                            : "var(--terracotta)",
                      background:
                        node.tone === "n8n"
                          ? "var(--sage-soft)"
                          : node.tone === "alt"
                            ? "rgba(201,169,110,0.18)"
                            : "var(--terracotta-soft)",
                    }}
                  >
                    {node.leaf}
                  </span>
                  <p
                    className="mono"
                    style={{
                      fontSize: 13,
                      color: "var(--ink-faint)",
                      margin: "10px 0 0",
                    }}
                  >
                    └── Yes ↓
                  </p>
                </div>
              ))}
              <span
                className="value-saved"
                style={{ marginTop: 16, color: "var(--sage)" }}
              >
                → n8n self-hosted on your VPC with audited PHI handling
              </span>
            </div>
          </div>
        </section>

        {/* WHEN NEITHER */}
        <section className="section tinted" id="when-neither">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Honest take</span>
              <h2>
                When <em>neither</em> is the answer.
              </h2>
              <p className="section-sub">
                Automation evangelism forgets that some problems aren&apos;t
                workflow problems. Three cases where n8n and Zapier are both
                wrong.
              </p>
            </div>

            <div className="feature-row">
              <div className="feat-card">
                <h3 className="feat-title">
                  1. You need a real durable event-driven system
                </h3>
                <p className="feat-body">
                  Orchestrating long-running transactions, multi-step sagas, or
                  anything needing strict exactly-once semantics at scale
                  (financial reconciliation, multi-system order fulfillment with
                  rollback)? n8n&apos;s queue mode and Zapier&apos;s retry logic
                  are both insufficient. You want AWS Step Functions, Temporal,
                  or Inngest — built for production-grade orchestration with
                  proper retry policies, idempotency keys, and state durability.
                </p>
              </div>
              <div className="feat-card">
                <h3 className="feat-title">
                  2. The logic is trivial and you have engineers
                </h3>
                <p className="feat-body">
                  If the &ldquo;automation&rdquo; is fetch from API A,
                  transform, write to API B, on a cron — that&apos;s 40 lines of
                  Python plus a cron job on the smallest VPS your host offers.
                  Wrapping it in n8n or Zapier adds operational overhead for
                  negative engineering value. A Python script with a logging
                  library and a Slack-notify-on-failure handler is the right
                  tool.
                </p>
              </div>
              <div className="feat-card">
                <h3 className="feat-title">
                  3. You&apos;re really doing marketing automation
                </h3>
                <p className="feat-body">
                  If 80% of what you call &ldquo;automation&rdquo; is drip
                  campaigns, lead nurturing, SMS sequences, and pipeline
                  triggers tied to a CRM — Make is more visual-friendly,
                  GoHighLevel bundles CRM + automation + SMS + email + booking,
                  and HubSpot Operations Hub integrates more tightly with
                  HubSpot CRM. n8n and Zapier can technically do these but
                  you&apos;ll fight the tool. Pick the platform built for the
                  use case.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSER */}
        <section className="mid-cta">
          <div className="mid-cta-inner">
            <h3>
              We ship <em>both stacks.</em>
            </h3>
            <p>
              We&apos;ll tell you straight which fits your business — even if
              the honest answer is &ldquo;neither, you need Make or a Python
              script.&rdquo;
            </p>
            <Link
              href={SITE.cta.href}
              className="btn-primary"
              data-meta-event="Schedule"
              data-meta-name="n8n-zapier-closer-book-audit"
            >
              {SITE.cta.label} →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
