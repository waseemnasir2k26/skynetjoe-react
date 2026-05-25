import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Calendar from "./Calendar";
import { Sparkles, CalendarDays, Layers, Download } from "lucide-react";

const PATH = "/tools/content-calendar";
const CAL_URL = "https://cal.com/skynetjoe/30min?utm_source=content-calendar";

export const metadata: Metadata = {
  title:
    "30-Day Content Calendar Generator — cross-platform posts in 30 seconds · SkynetLabs",
  description:
    "Free 30-day cross-platform content calendar. Set niche, cadence and goal. Get LinkedIn, X, IG, Shorts and email ideas — with CSV, ICS and markdown export.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "30-Day Content Calendar Generator · CSV + ICS + markdown export",
    description:
      "Niche + cadence + goal → 30 days of cross-platform post ideas. Free, no email gate.",
    url: `${SITE.url}${PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "30-Day Content Calendar Generator · SkynetLabs",
    description:
      "Niche + cadence + goal → 30 days of post ideas across 5 platforms.",
  },
};

const faqs = [
  {
    q: "Are these AI-generated posts?",
    a: "No — and that's the point. They're parameterised templates: proven hook patterns that get filled in with your niche, audience and platform. You get a structured pipeline of ideas you can paste into your scheduler, not a wall of LLM filler. Every cell has a body angle, CTA, tags and asset recommendation.",
  },
  {
    q: "Can I export this?",
    a: "Yes. Three formats. CSV (date / platform / hook / body / CTA / tags / asset — drop into GoHighLevel, Buffer, Notion, anywhere). ICS (drag into Google Calendar, Apple Calendar, Outlook — each post becomes an event). Markdown checklist (paste into Notion or a doc to tick off as you ship). All local, all instant.",
  },
  {
    q: "What if I want a different mix?",
    a: "Hit Regenerate at the top — same inputs, fresh idea shuffle. Change the cadence sliders to up or down a platform. Change the goal dropdown to shift the mix (Awareness leans educational, Sales leans proof+CTA, etc). The calendar updates in real time.",
  },
  {
    q: "Does the calendar respect prefers-reduced-motion?",
    a: "Yes. The animated counters and transitions auto-disable when your OS asks for reduced motion. Everything is keyboard-navigable and the grid is screen-reader friendly.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "30-Day Content Calendar Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free browser tool that generates a 30-day cross-platform content calendar from niche, audience and posting cadence, with CSV, ICS and markdown export.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
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
  { icon: CalendarDays, label: "30 days", body: "5 weeks, Mon–Sun grid." },
  {
    icon: Layers,
    label: "5 platforms",
    body: "LinkedIn · X · IG · Shorts · Email.",
  },
  {
    icon: Download,
    label: "3 exports",
    body: "CSV · ICS · markdown checklist.",
  },
];

export default function ContentCalendarPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section
        style={{ position: "relative", padding: "96px 0 48px", background: "var(--cream-3)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(94, 234, 212, 0.14)",
                border: "1px solid rgba(94, 234, 212, 0.40)",
                color: "#5eead4",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free generator · No email gate
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.04, color: "var(--ink)", marginBottom: 22 }}>
              30 days of content,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #7ee4ff 0%, #5eead4 50%, #fde68a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                generated in 30 seconds.
              </span>
            </h1>

            <p style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14, maxWidth: "52ch" }}>
              Tell us your niche, your audience, your weekly cadence and the
              goal of the month. Get back a 30-day, 5-platform calendar grid
              with hooks, body angles, CTAs, tags and asset recommendations.
            </p>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "52ch" }}>
              Export to CSV, ICS or markdown. Nothing leaves your browser.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-white">
                    <Icon className="w-4 h-4 text-cyan-300" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section className="section">
        <div className="container-x px-6">
          <div className="max-w-6xl mx-auto">
            <Calendar calUrl={CAL_URL} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              Quick answers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-white">
              Honest FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition open:bg-white/8"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-white font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-cyan-300 transition group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">
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
