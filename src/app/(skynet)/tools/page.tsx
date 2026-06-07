import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import {
  Calculator,
  Activity,
  Compass,
  ArrowLeftRight,
  Mic,
  FileText,
  CalendarDays,
  Target,
  Library,
  Film,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Tools — 10-tool suite for service businesses | SkynetLabs",
  description:
    "Ten free utilities from SkynetLabs: revenue calculator, AI readiness score, automation gap analyzer, brand voice builder, executive summary generator, 30-day content calendar, prompt library, video prompt generator, before/after slider and agency stress quiz.",
  alternates: { canonical: `${SITE.url}/tools` },
  openGraph: {
    title: "SkynetLabs Free Tools — 10 calculators, diagnostics and generators",
    description:
      "Find out where your business is losing time and money. Ten free tools: calculators, diagnostics and generators for service businesses.",
    url: `${SITE.url}/tools`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const TOOLS = [
  {
    slug: "revenue-calculator",
    name: "Revenue Recovery Calculator",
    tag: "Calculator",
    blurb:
      "Six sliders. Live math. See exactly what your missed-call queue and manual follow-ups are costing per month — and what we'd recover.",
    Icon: Calculator,
  },
  {
    slug: "agency-stress-quiz",
    name: "Agency Stress Quiz",
    tag: "Diagnostic",
    blurb:
      "60 seconds. 7 questions. One brutally honest score. Diagnoses whether you're at chill operator or full chaos mode — pipes straight into the calculator.",
    Icon: Activity,
  },
  {
    slug: "ai-readiness-score",
    name: "AI Readiness Score",
    tag: "Diagnostic",
    blurb:
      "90 seconds. 10 questions. A 0 to 100 score plus a four-axis breakdown of foundation, process, demand and buy-in — and exactly what to fix first.",
    Icon: Compass,
  },
  {
    slug: "before-after-slider",
    name: "Before/After Slider",
    tag: "Visualiser",
    blurb:
      "Drag-to-compare 6 real workflows: lead response, content production, customer service, CRM data entry, reporting, lead qualification. Visualise the gap manual vs automated.",
    Icon: ArrowLeftRight,
  },
  {
    slug: "voice-persona-builder",
    name: "Brand Voice Persona Builder",
    tag: "Generator",
    blurb:
      "Four steps, eight tone sliders, three example fields. Outputs a paste-ready Brand Voice Profile and AI system prompt that makes Claude and ChatGPT sound like your brand instead of themselves.",
    Icon: Mic,
  },
  {
    slug: "executive-summary-generator",
    name: "Executive Summary Generator",
    tag: "Generator",
    blurb:
      "Paste raw notes, get five ready-to-send formats: TL;DR, email, Slack post, deck slide and investor 1-pager. Built in your browser, instant, uses your own words.",
    Icon: FileText,
  },
  {
    slug: "content-calendar",
    name: "30-Day Content Calendar",
    tag: "Generator",
    blurb:
      "Niche, cadence and goal in. Thirty days of cross-platform post ideas out, across LinkedIn, X, IG, Shorts and email — with CSV, ICS and markdown export.",
    Icon: CalendarDays,
  },
  {
    slug: "automation-gap-analyzer",
    name: "Automation Gap Analyzer",
    tag: "Diagnostic",
    blurb:
      "90 seconds. 12 questions across lead capture, follow-up, reporting, team productivity. One automation gap %, four-axis radar, and the one biggest time-sink to fix first.",
    Icon: Target,
  },
  {
    slug: "prompt-library",
    name: "Prompt Library",
    tag: "Library",
    blurb:
      "Fifty production-tested AI prompts across sales, marketing, ops, content, data, recruitment, customer service and founder brain. Search, copy, open in Claude or ChatGPT.",
    Icon: Library,
  },
  {
    slug: "video-prompt-generator",
    name: "Video Prompt Generator",
    tag: "Generator",
    blurb:
      "One scene, four formats. Build Runway, Pika, Sora and Veo prompts side-by-side from one set of inputs. Save the good ones to local history. Zero backend.",
    Icon: Film,
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Free Tools",
  description:
    "Ten free utilities from SkynetLabs: revenue calculator, AI readiness score, automation gap analyzer, brand voice persona builder, executive summary generator, 30-day content calendar, prompt library, video prompt generator, before/after slider and agency stress quiz.",
  url: `${SITE.url}/tools`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  hasPart: TOOLS.map((t) => ({
    "@type": "SoftwareApplication",
    name: t.name,
    url: `${SITE.url}/tools/${t.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  })),
};

export default function ToolsIndexPage() {
  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO — skyv3 (lp/logistics) design language */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              Ten free tools&nbsp;· <strong>no signup for most</strong>
            </div>

            <h1>
              Find out where your business is <em>losing money.</em>
            </h1>

            <p className="hero-sub">
              Ten utilities I built for myself before I built them for clients.{" "}
              <strong>All free.</strong> Some hand you the result instantly; a
              few ask for an email to unlock it. Just numbers, either way.
            </p>

            <div className="cta-row">
              <Link
                href={SITE.cta.href}
                className="btn-primary"
                data-meta-event="Schedule"
                data-meta-name="tools-book-audit"
              >
                {SITE.cta.label} →
              </Link>
              <Link href="#tools" className="btn-line">
                Browse the tools
              </Link>
            </div>

            <div className="featured-in">
              <span className="featured-lbl">Featured</span>
              <span>Upwork Top Rated Plus</span>
              <span>Fiverr Top Rated</span>
              <span>180+ workflows</span>
              <span>Claude Code Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS DIRECTORY — feature-row of feat-cards */}
      <section id="tools" className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">The toolbox</span>
            <h2>
              Ten free tools, <em>one tab away.</em>
            </h2>
            <p className="section-sub">
              Calculators, diagnostics and generators for service businesses.
              Pick the one that matches the thing that&apos;s nagging you — most
              take under two minutes.
            </p>
          </div>

          <div className="feature-row">
            {TOOLS.map(({ slug, name, tag, blurb, Icon }) => (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                className="feat-card"
                style={{ display: "block" }}
              >
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
                  {tag}
                </span>
                <div className="feat-title">{name}</div>
                <p className="feat-body">{blurb}</p>
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
                  Open the tool
                  <ArrowRight style={{ width: 15, height: 15 }} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER — skyv3 pattern */}
      <section className="closer">
        <div className="closer-scarcity">Free tools only get you so far</div>
        <h2>
          Seen your number? <em>Let&apos;s fix it.</em>
        </h2>
        <p>
          The tools tell you where the money leaks. A 30-min audit tells you the
          three fastest ways to plug it — with a fixed-price scope back in 48
          hours.
        </p>
        <div className="cta-row">
          <Link
            href={SITE.cta.href}
            className="btn-primary"
            data-meta-event="Schedule"
            data-meta-name="tools-closer-book-audit"
          >
            {SITE.cta.label} →
          </Link>
          <Link href="/services" className="btn-line">
            See what we fix
          </Link>
        </div>
      </section>
    </div>
  );
}
