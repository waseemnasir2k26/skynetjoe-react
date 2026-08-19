import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Generator from "./Generator";
import { DM_TEMPLATES, PLATFORMS } from "@/data/tools/cold-dm-scripts";
import { Sparkles, Send, Copy, MessageSquare } from "lucide-react";

const PATH = "/tools/cold-dm-generator";

const breadcrumbListSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "Cold DM Script Generator", url: `${SITE.url}${PATH}` },
]);

export const metadata: Metadata = {
  title: "Cold DM Script Generator — Free Outreach Scripts",
  description:
    "Free cold DM script generator for LinkedIn, Instagram, and email. Enter your niche, offer, and proof point — get personalized outreach scripts instantly. Email unlocks the full 15-script pack.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Cold DM Script Generator — personalized outreach in seconds",
    description:
      "Pick a platform, enter your niche, offer, and proof point. Get scripts across 5 outreach angles, copy-ready. Email unlocks all 15.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold DM Script Generator · free outreach scripts",
    description:
      "LinkedIn, Instagram, and email scripts personalized to your niche and offer. Free to preview, email to unlock the full pack.",
  },
};

const faqs = [
  {
    q: "Is this a cold DM script generator I can actually use today?",
    a: "Yes. Pick a platform, type your niche, offer, and one proof point, and every script fills in live — no account, no install. Copy any script straight into LinkedIn, Instagram DMs, or your email client.",
  },
  {
    q: "What do I get for free versus what's gated?",
    a: "The first 3 scripts for your selected platform are free, no email required. The full 15-script pack — 5 LinkedIn, 5 Instagram, 5 email, across 5 different outreach angles — unlocks with an email so I can follow up if you want help wiring it into an actual outbound system.",
  },
  {
    q: "Why 5 angles instead of one 'best' script?",
    a: "Because the same prospect responds differently on different days. Problem-first lands with someone mid-frustration. Proof-first lands with someone skeptical. Curiosity lands with someone bored. Rotating angles across a sequence outperforms sending the same message five times.",
  },
  {
    q: "Do these scripts guarantee replies?",
    a: "No tool can promise that, and I won't pretend otherwise. What these do is remove the blank-page problem and give you a structured starting point across three channels. Reply rates still depend on your list quality, your offer, and how much you personalize past the placeholders.",
  },
];

const angleStats = [
  {
    icon: Send,
    label: "3 platforms",
    body: "LinkedIn, Instagram, email — pick one at a time.",
  },
  {
    icon: MessageSquare,
    label: "5 angles",
    body: "Problem-first, proof-first, curiosity, direct ask, warm observation.",
  },
  {
    icon: Copy,
    label: "One-click copy",
    body: "Filled with your niche, offer, and proof point.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cold DM Script Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description: `Free cold outreach script generator across ${PLATFORMS.length} platforms and 5 angles, producing ${DM_TEMPLATES.length} personalized scripts from a niche, offer, and proof point.`,
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  dateModified: "2026-08-19",
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

export default function ColdDmGeneratorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbListSchema} />
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
                Free preview · Email unlocks all 15
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
              Cold DM scripts that{" "}
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
                don&apos;t read like a template.
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
              Type your niche, your offer, and one proof point. Get scripts
              across LinkedIn, Instagram, and email — 5 different angles so your
              outreach doesn&apos;t sound like a copy-paste blast.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Preview 3 scripts free. Enter your email to unlock the full
              15-script pack across all three platforms.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {angleStats.map(({ icon: Icon, label, body }) => (
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
            <Generator />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this generator exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Most cold DMs fail before the reader gets to the offer.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  I&apos;ve sent thousands of cold messages building this agency
                  — LinkedIn, Instagram, plain email. The pattern that kills
                  reply rates isn&apos;t a bad offer, it&apos;s a generic
                  opener. &quot;Hi, I help businesses like yours grow&quot; gets
                  deleted in under two seconds because it could have been sent
                  to anyone.
                </p>
                <p>
                  This tool doesn&apos;t write your message from scratch —
                  that&apos;s not honest, and it produces the same slop everyone
                  else is already sending. Instead it gives you five
                  structurally different angles built around three specific
                  inputs: who you&apos;re talking to, what you&apos;re offering,
                  and one real proof point. You still have to swap in a real
                  first name and read the message once before you hit send —
                  that&apos;s the 20% that makes the other 80% land.
                </p>
                <p>
                  Why three platforms in one tool? Because the best operators I
                  work with don&apos;t pick one channel — they run the same
                  prospect through LinkedIn and email in parallel, with
                  different angles on each. This tool is built for that
                  workflow, not a single-channel spray-and-pray.
                </p>
                <p>
                  If outreach at this scale starts eating more hours than it
                  saves, that&apos;s usually the sign to wire it into an actual
                  CRM sequence with automated follow-up — which is exactly what
                  a discovery call with me is for.
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
