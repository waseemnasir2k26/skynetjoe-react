import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import {
  Brain,
  Rocket,
  Code2,
  FileCode,
  Sparkles,
  Coffee,
  Send,
  Users,
  Eye,
  Globe,
  Mail,
  Zap,
  Wrench,
  Layers,
  Cpu,
  PenTool,
  Bot,
  ChevronRight,
} from "lucide-react";

const CAL_URL = "https://calendly.com/skynetlabs/schedule-a-free-consultation";

export const metadata: Metadata = {
  title:
    "Vibe Coding by SkynetLabs — Ship Real Apps in 5–14 Days with Claude Code + the AI Toolchain",
  description:
    "Vibe coding is Waseem Nasir's human-led, AI-paired build workflow from Bali. Claude Code as primary, Cursor + Replit + Codex + Gemini as backup. Ship in 5–14 days.",
  alternates: { canonical: `${SITE.url}/vibe-coding` },
  openGraph: {
    title: "Vibe Coding by SkynetLabs — Real Human, AI Pair, 5–14 Day Ship",
    description:
      "Human-led, AI-paired builds from Bali. Claude Code primary + Cursor/Replit/Codex/Gemini. Real Waseem at a real keyboard, just typing 12x faster.",
    url: `${SITE.url}/vibe-coding`,
    type: "website",
    images: [
      {
        url: `${SITE.assetsUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Vibe Coding by SkynetLabs — human-led, AI-paired builds in 5–14 days",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding — SkynetLabs",
    description:
      "Human-led, AI-paired builds from Bali. Ship real apps in 5–14 days.",
    images: [`${SITE.assetsUrl}/og-default.png`],
  },
};

const faqs = [
  {
    q: "Is this a coding bootcamp?",
    a: "No. It's a done-for-you build service. I sit at the keyboard, Claude Code sits next to me, and we ship your thing. You get the working product, the source code, and a hand-off doc. You don't have to learn anything unless you want to.",
  },
  {
    q: "Do you write the code or does AI?",
    a: "Both of us, every line. Claude Code drafts, I read every diff, I push back on bad calls, I rewrite anything that looks wrong. AI types fast. I bring the taste, the judgment, and the 'no, that pattern will bite you in 6 months' instinct. You're hiring a human builder with a very fast typist as a pair partner.",
  },
  {
    q: "What happens after delivery?",
    a: "You get the repo, the deployment, a written hand-off doc, and 14 days of free bug fixes. After that, I offer a flat monthly maintenance retainer if you want me on call. Most clients don't need it. The code is yours, in your GitHub, no lock-in.",
  },
  {
    q: "Can I watch you build live?",
    a: "Yes. I run screenshare sessions during the heavy build days (usually day 2 to day 4). Some clients love this, some find it overwhelming. It's optional. Async daily updates with screenshots and a Loom are the default.",
  },
  {
    q: "What if I change my mind mid-build?",
    a: "Tell me. Most scope adjustments cost nothing if they happen before staging. Bigger pivots get a new fixed quote, no surprises. I'd rather rebuild section 3 on day 4 than ship something you don't love. The whole point of the 5–14 day window is that pivoting is cheap.",
  },
  {
    q: "Why Claude Code and not just GitHub Copilot?",
    a: "Copilot is a faster autocomplete. Claude Code is a teammate. It holds the entire codebase in context, plans multi-file refactors, runs the tests, and tells me when my approach is dumb. For greenfield builds that have to ship in days, that gap is everything. Copilot still rides shotgun on small inline edits inside Cursor.",
  },
];

const toolchain = [
  {
    name: "Claude Code",
    badge: "Primary",
    role: "The brain. Long-context refactors, multi-file edits, agent loops.",
    when: "Every build. From the first scaffold to the final deploy. It reads the whole repo and plans the work.",
    icon: Brain,
  },
  {
    name: "Replit",
    badge: "Speed",
    role: "When the deploy needs to be live in 8 minutes.",
    when: "Throwaway demos, client pitch sandboxes, the 'can you just show me' builds that don't deserve a full repo.",
    icon: Rocket,
  },
  {
    name: "Cursor",
    badge: "IDE",
    role: "When you want IDE-grade inline edits.",
    when: "Mid-build, when I'm touching specific files and want tab-complete + a small chat that sees only the open buffer.",
    icon: Code2,
  },
  {
    name: "Codex",
    badge: "Volume",
    role: "Heavy code-gen, batch boilerplate, throwaway scripts.",
    when: "When I need 40 similar API route handlers, or a CSV-to-TS-types pipeline. It's the boring-bulk specialist.",
    icon: FileCode,
  },
  {
    name: "Gemini",
    badge: "Context",
    role: "Long-doc analysis, big-context image grounding.",
    when: "When the client sends a 90-page PDF spec, or 30 screenshots of their old site. Million-token window earns its keep.",
    icon: Sparkles,
  },
];

const pipeSteps = [
  {
    num: "01",
    label: "Vibe check",
    icon: Coffee,
    body: "30-min call. You describe the dream out loud. I ask the awkward questions about budget, deadline, and what 'done' actually looks like. No deck, no slide funnel.",
  },
  {
    num: "02",
    label: "Pipe it in",
    icon: Send,
    body: "You send the artifacts: PDFs, screenshots, voice memos, a Loom of you using the thing you wish existed. I read all of it before I touch a line.",
  },
  {
    num: "03",
    label: "Pair with the agents",
    icon: Users,
    body: "I sit at the cafe, Claude Code sits next to me, we ship the first working version. Multi-hour build sessions. Live screenshare if you want it.",
  },
  {
    num: "04",
    label: "Ship to staging",
    icon: Eye,
    body: "Vercel preview link in your inbox. You click around, scream-test it, send me 'more pop on the hero' and 'this button needs to live on the right'. I iterate.",
  },
  {
    num: "05",
    label: "Live within the week",
    icon: Globe,
    body: "Production deploy. DNS cutover. Monitoring wired up. Hand-off doc in your inbox. 14 days of free bug fixes. The repo is yours.",
  },
];

const buildTypes = [
  {
    icon: Layers,
    title: "Next.js sites",
    body: "Marketing sites, flagship clinic builds, SaaS landing pages, agency sites.",
    price: "$3.5k–9k",
    ship: "5 days",
  },
  {
    icon: Wrench,
    title: "Chrome extensions",
    body: "Sales-team helpers, scraping tools, in-page widgets for niche workflows.",
    price: "$2.5k–6k",
    ship: "5 days",
  },
  {
    icon: Cpu,
    title: "n8n custom nodes",
    body: "Private nodes for client-only integrations. TypeScript, fully versioned.",
    price: "$1.8k–4k",
    ship: "5 days",
  },
  {
    icon: Bot,
    title: "AI-agent micro-products",
    body: "Small revenue-earning agents: a paid extension, a niche SaaS, a one-job tool.",
    price: "$4k–12k",
    ship: "10 days",
  },
  {
    icon: PenTool,
    title: "WordPress plugins",
    body: "Custom blocks, ACF dashboards, admin tools. Still ship a lot of these.",
    price: "$2k–5k",
    ship: "5 days",
  },
  {
    icon: Zap,
    title: "Internal ops dashboards",
    body: "The 'I wish I could see all my orders in one screen' dashboards. Auth + charts + filters.",
    price: "$3k–8k",
    ship: "7 days",
  },
];

const shippedCases = [
  {
    slug: "manhattan-dental-atelier-flagship",
    title: "Manhattan dental atelier flagship",
    outcome: "14-section bespoke Next.js, end-to-end in 12 days.",
    tag: "Next.js + Tailwind",
  },
  {
    slug: "bali-wellness-conversion-funnel",
    title: "Bali wellness conversion funnel",
    outcome: "Doubled monthly bookings on a single-page voice-locked funnel.",
    tag: "Next.js + scheduling",
  },
  {
    slug: "premium-auto-dealership-network-demo",
    title: "Premium auto dealership network",
    outcome: "Multi-location dealership site with inventory feed integration.",
    tag: "Next.js + feeds",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE.url}/vibe-coding#service`,
      name: "Vibe Coding — Human-led, AI-paired app and website builds",
      serviceType: "Software development",
      description:
        "Done-for-you app, site, and tool builds delivered in 5–14 days using Claude Code as the primary AI pair-programmer alongside Cursor, Replit, Codex, and Gemini.",
      provider: {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.brand,
        url: SITE.url,
      },
      areaServed: { "@type": "Place", name: "Worldwide" },
      url: `${SITE.url}/vibe-coding`,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "1800",
        highPrice: "12000",
        offerCount: "6",
      },
      performer: {
        "@type": "Person",
        "@id": `${SITE.url}/about#waseem`,
        name: SITE.founder,
        url: SITE.founderUrl,
        jobTitle: "Founder and lead builder",
        worksFor: { "@id": `${SITE.url}/#organization` },
        image: `${SITE.assetsUrl}/og-default.png`,
        homeLocation: { "@type": "Place", name: "Bali, Indonesia" },
        knowsAbout: [
          "Claude Code",
          "Next.js",
          "TypeScript",
          "n8n",
          "AI agents",
          "Tailwind",
          "Vercel",
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/vibe-coding#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function VibeCodingPage() {
  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO — skyv3 (lp/logistics) design language */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              Vibe coding&nbsp;· <strong>5–14 day ship</strong>
            </div>

            <h1>
              Real human at a real keyboard.{" "}
              <em>Just one that types 12x faster now.</em>
            </h1>

            <p className="hero-sub">
              Vibe coding is how I (Waseem, the actual person you&apos;ll be
              talking to) ship real apps, sites, and tools from a cafe in Bali,
              with <strong>Claude Code as my pair partner</strong> and the rest
              of the AI toolchain on the bench. 5 to 14 days from brief to live
              — no agency layer, no PM email chain, no SDR funnel.
            </p>

            <div className="cta-row">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-meta-event="Schedule"
                data-meta-name="vibe-hero-book-vibe-check"
              >
                Book a 30-min vibe check →
              </a>
              <a href="#toolchain" className="btn-line">
                See the toolchain
              </a>
            </div>

            <div className="featured-in">
              <span className="featured-lbl">Featured</span>
              <span>Claude Code primary</span>
              <span>Repo in your GitHub</span>
              <span>14-day free bug fixes</span>
              <span>Live from Canggu, Bali</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS VIBE CODING — direct answer */}
      <section className="section tinted">
        <div className="wrap">
          <div
            className="section-head"
            style={{ marginInline: "auto", textAlign: "center" }}
          >
            <span className="section-kicker">Direct answer</span>
            <h2 style={{ margin: "0 auto 18px" }}>
              What is <em>vibe coding</em>?
            </h2>
          </div>
          <div className="value-stack" style={{ maxWidth: 860 }}>
            <p
              className="feat-body"
              style={{ fontSize: 18, lineHeight: 1.7, color: "var(--ink)" }}
            >
              Vibe coding is a human-led, AI-paired build workflow in which an
              experienced developer drives the design and judgment calls while
              large language models like Claude Code, Cursor, and Codex handle
              the typing, the scaffolding, and the multi-file refactors. At
              SkynetLabs, Waseem Nasir runs the workflow from Bali and ships
              production websites, Chrome extensions, n8n nodes, and AI
              micro-products in a fixed 5 to 14 day window.{" "}
              <strong>
                The vibe is not the laptop. The vibe is the builder.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* HUMAN IN THE LOOP */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">The human in the loop</span>
            <h2>
              You talk to me. <em>Not a chatbot.</em>
            </h2>
            <p className="section-sub">
              I sit at the cafe under the brick arch in Canggu most mornings.
              Blue polo, oat-milk americano, a 14-inch laptop, and Claude Code
              humming in the terminal. That&apos;s where your build happens.
            </p>
          </div>

          <div className="feature-row">
            <div className="feat-card">
              <span className="feat-tag">One builder · one inbox</span>
              <div className="feat-title">No account-manager relay</div>
              <p className="feat-body">
                No offshored ticketing system, no &quot;your account manager
                will be in touch&quot;, no AI-only agency. When you ping me on
                email, you get me.
              </p>
              <ul className="feat-list">
                <li>Email me, you get me — no relay.</li>
                <li>Hop on a call, it&apos;s the founder on the other end.</li>
                <li>
                  Production breaks at 2am Bali time, the reply comes from me,
                  not a queue.
                </li>
              </ul>
            </div>
            <div className="feat-card">
              <span className="feat-tag">The judgment layer</span>
              <div className="feat-title">Taste is the part you pay for</div>
              <p className="feat-body">
                The AI part of the stack is loud and impressive and it deserves
                a page like this. The human part is the part that actually
                decides if your thing is any good. When we hop on a call, you
                see my face — and when something breaks, you get a reply from
                me.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLCHAIN */}
      <section id="toolchain" className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">The toolchain</span>
            <h2>
              5 models on the bench. <em>One picks the lineup.</em>
            </h2>
            <p className="section-sub">
              No single model is best at everything. Here&apos;s the lineup and
              when each one comes in.
            </p>
          </div>

          <div className="feature-row">
            {toolchain.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.name} className="feat-card">
                  <span className="feat-tag">
                    <Icon
                      aria-hidden
                      style={{
                        width: 13,
                        height: 13,
                        verticalAlign: "-2px",
                        marginRight: 6,
                      }}
                    />
                    {t.badge}
                  </span>
                  <div className="feat-title">{t.name}</div>
                  <p className="feat-body">{t.role}</p>
                  <ul className="feat-list">
                    <li>{t.when}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PIPE CODING FLOW */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">The pipe coding flow</span>
            <h2>
              From vibe check to live, <em>in 5 moves.</em>
            </h2>
            <p className="section-sub">
              Same flow for every build. Same fixed window. No surprise
              invoices, no &quot;phase 2 of 6&quot; deck.
            </p>
          </div>

          <div className="feature-row">
            {pipeSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="feat-card">
                  <span className="feat-tag">
                    <Icon
                      aria-hidden
                      style={{
                        width: 13,
                        height: 13,
                        verticalAlign: "-2px",
                        marginRight: 6,
                      }}
                    />
                    Step {s.num}
                  </span>
                  <div className="feat-title">{s.label}</div>
                  <p className="feat-body">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT WE VIBE-CODE */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">What we vibe-code</span>
            <h2>
              Six lanes, <em>all fixed-price.</em>
            </h2>
            <p className="section-sub">
              If it&apos;s code that ships in under two weeks, it probably fits
              in one of these.
            </p>
          </div>

          <div className="feature-row">
            {buildTypes.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="feat-card">
                  <span className="feat-tag">
                    <Icon
                      aria-hidden
                      style={{
                        width: 13,
                        height: 13,
                        verticalAlign: "-2px",
                        marginRight: 6,
                      }}
                    />
                    {b.ship} ship
                  </span>
                  <div className="feat-title">{b.title}</div>
                  <p className="feat-body">{b.body}</p>
                  <p
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: "1px dashed var(--rule)",
                      fontFamily: "var(--font-mono-plex), monospace",
                      fontWeight: 700,
                      color: "var(--terracotta-aa)",
                    }}
                  >
                    {b.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A FEW WE'VE SHIPPED */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">A few we&apos;ve shipped</span>
            <h2>
              Real builds, <em>real domains.</em>
            </h2>
            <p className="section-sub">
              Three vibe-coded case studies you can read in full.
            </p>
          </div>

          <div className="feature-row">
            {shippedCases.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="feat-card"
                style={{ display: "block" }}
              >
                <span className="feat-tag">{c.tag}</span>
                <div className="feat-title">{c.title}</div>
                <p className="feat-body">{c.outcome}</p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 16,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--terracotta-aa)",
                  }}
                >
                  Read the build story
                  <ChevronRight style={{ width: 15, height: 15 }} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REAL TALK / WHY HUMAN */}
      <section className="section tinted">
        <div className="wrap">
          <div className="risk">
            <div className="risk-inner">
              <div>
                <div
                  className="section-kicker"
                  style={{ color: "var(--ochre)" }}
                >
                  Real talk
                </div>
                <p className="risk-h">
                  &ldquo;AI doesn&apos;t replace the builder. It replaces the
                  typing. The judgment, the taste, the &lsquo;no, that button
                  needs to live on the right&rsquo; —{" "}
                  <em>that&apos;s still me.</em>&rdquo;
                </p>
                <p className="risk-p">
                  A team of agents can scaffold a Next.js app in 90 seconds.
                  None of them know your client base. None of them know that the
                  dental atelier in Manhattan won&apos;t trust a site that hides
                  pricing. None of them know that a Bali wellness funnel needs
                  to address the &quot;is this only for people who already
                  meditate&quot; objection in the hero. That&apos;s the judgment
                  layer. That&apos;s what you&apos;re paying for.
                </p>
                <p
                  className="risk-p"
                  style={{ marginTop: 12, fontWeight: 600 }}
                >
                  Waseem Nasir, founder, SkynetLabs
                </p>
              </div>
              <ul className="risk-list">
                <li>
                  <strong>Every line read.</strong> Claude Code drafts, I review
                  every diff.
                </li>
                <li>
                  <strong>Repo in your GitHub.</strong> No lock-in, the code is
                  yours.
                </li>
                <li>
                  <strong>14 days free bug fixes.</strong> Plus an optional flat
                  retainer.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <div
            className="section-head"
            style={{ marginInline: "auto", textAlign: "center" }}
          >
            <span className="section-kicker">FAQ</span>
            <h2 style={{ margin: "0 auto" }}>
              The <em>honest answers.</em>
            </h2>
          </div>

          <div
            style={{
              maxWidth: 820,
              margin: "0 auto",
              display: "grid",
              gap: 12,
            }}
          >
            {faqs.map((f) => (
              <details
                key={f.q}
                className="feat-card"
                style={{ padding: "20px 24px" }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  <span>{f.q}</span>
                  <ChevronRight
                    style={{
                      width: 18,
                      height: 18,
                      color: "var(--terracotta)",
                      flexShrink: 0,
                    }}
                  />
                </summary>
                <p className="feat-body" style={{ marginTop: 14 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER — skyv3 pattern */}
      <section className="closer">
        <div className="closer-scarcity">30-min call, free</div>
        <h2>
          Book a <em>vibe check.</em>
        </h2>
        <p>
          A real call with me. Not a salesperson, not a bot, not a discovery
          funnel. You describe what you want built, I tell you if I can ship it
          in the window, we either book it or we don&apos;t.
        </p>
        <div className="cta-row">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            data-meta-event="Schedule"
            data-meta-name="vibe-closer-book-vibe-check"
          >
            Grab a 30-min slot →
          </a>
          <a
            href={`mailto:${SITE.emailFounder}?subject=Vibe%20coding%20brief`}
            className="btn-line"
          >
            <Mail
              aria-hidden
              style={{
                width: 14,
                height: 14,
                verticalAlign: "-2px",
                marginRight: 6,
              }}
            />
            Email me the brief
          </a>
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono-plex), monospace",
            fontSize: 11,
            color: "var(--ink-faint)",
            marginTop: 24,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
          }}
        >
          {SITE.emailFounder} · Bali timezone (GMT+8) · Replies within 8 working
          hours
        </p>
      </section>
    </div>
  );
}
