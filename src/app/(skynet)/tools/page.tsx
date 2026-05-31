import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { Calculator, Activity, Compass, ArrowLeftRight, Mic, FileText, CalendarDays, Target, Library, Film, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Tools — 10-tool suite for service businesses | SkynetLabs",
  description:
    "Ten free utilities from SkynetLabs: revenue calculator, AI readiness score, automation gap analyzer, brand voice builder, executive summary generator, 30-day content calendar, prompt library, video prompt generator, before/after slider and agency stress quiz.",
  alternates: { canonical: `${SITE.url}/tools` },
  openGraph: {
    title: "SkynetLabs Free Tools — 10 calculators, diagnostics and generators",
    description:
      "Find out what your business is leaking. Ten free tools: calculators, diagnostics and generators for service businesses.",
    url: `${SITE.url}/tools`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const TOOLS = [
  {
    slug: "revenue-calculator",
    name: "Revenue Recovery Calculator",
    blurb:
      "Six sliders. Live math. See exactly what your missed-call queue and manual follow-ups are costing per month — and what we'd recover.",
    Icon: Calculator,
  },
  {
    slug: "agency-stress-quiz",
    name: "Agency Stress Quiz",
    blurb:
      "60 seconds. 7 questions. One brutally honest score. Diagnoses whether you're at chill operator or full chaos mode — pipes straight into the calculator.",
    Icon: Activity,
  },
  {
    slug: "ai-readiness-score",
    name: "AI Readiness Score",
    blurb:
      "90 seconds. 10 questions. A 0 to 100 score plus a four-axis breakdown of foundation, process, demand and buy-in — and exactly what to fix first.",
    Icon: Compass,
  },
  {
    slug: "before-after-slider",
    name: "Before/After Slider",
    blurb:
      "Drag-to-compare 6 real workflows: lead response, content production, customer service, CRM data entry, reporting, lead qualification. Visualise the gap manual vs automated.",
    Icon: ArrowLeftRight,
  },
  {
    slug: "voice-persona-builder",
    name: "Brand Voice Persona Builder",
    blurb:
      "Four steps, eight tone sliders, three example fields. Outputs a paste-ready Brand Voice Profile and AI system prompt that makes Claude and ChatGPT sound like your brand instead of themselves.",
    Icon: Mic,
  },
  {
    slug: "executive-summary-generator",
    name: "Executive Summary Generator",
    blurb:
      "Paste raw notes, get five ready-to-send formats: TL;DR, email, Slack post, deck slide and investor 1-pager. Built in your browser, instant, uses your own words.",
    Icon: FileText,
  },
  {
    slug: "content-calendar",
    name: "30-Day Content Calendar",
    blurb:
      "Niche, cadence and goal in. Thirty days of cross-platform post ideas out, across LinkedIn, X, IG, Shorts and email — with CSV, ICS and markdown export.",
    Icon: CalendarDays,
  },
  {
    slug: "automation-gap-analyzer",
    name: "Automation Gap Analyzer",
    blurb:
      "90 seconds. 12 questions across lead capture, follow-up, reporting, team productivity. One automation gap %, four-axis radar, and the one biggest leak to fix first.",
    Icon: Target,
  },
  {
    slug: "prompt-library",
    name: "Prompt Library",
    blurb:
      "Fifty production-tested AI prompts across sales, marketing, ops, content, data, recruitment, customer service and founder brain. Search, copy, open in Claude or ChatGPT.",
    Icon: Library,
  },
  {
    slug: "video-prompt-generator",
    name: "Video Prompt Generator",
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
    <>
      <JsonLd data={schema} />
      <main
        style={{
          minHeight: "100vh",
          background: "var(--cream)",
          color: "var(--ink)",
        }}
      >
        <section
          className="container-x px-6 pt-32 pb-16 md:pt-40"
          style={{ background: "var(--cream-3)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="max-w-3xl">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta)",
                fontWeight: 600,
                marginBottom: 22,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
              Ten free tools
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: 18,
              }}
            >
              Find out what your business is{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                leaking.
              </em>
            </h1>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: "52ch", lineHeight: 1.6 }}>
              Ten utilities I built for myself before I built them for clients.
              All free. Some hand you the result instantly; a few ask for an
              email to unlock it. Just numbers, either way.
            </p>
          </div>
        </section>
        <section className="container-x px-6 py-20">
          <div className="grid md:grid-cols-2 gap-6">
            {TOOLS.map(({ slug, name, blurb, Icon }, i) => (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                className="group relative"
                style={{
                  display: "block",
                  padding: 28,
                  background: "var(--cream-2)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  color: "var(--ink)",
                  transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--cream-3)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "var(--terracotta)" }} />
                  </div>
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-all"
                    style={{ color: "var(--ink-faint)" }}
                  />
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 600,
                    marginBottom: 12,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {name}
                </h2>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>{blurb}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
