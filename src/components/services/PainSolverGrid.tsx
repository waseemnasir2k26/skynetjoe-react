"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Ghost,
  Plug,
  Sparkles,
  Globe,
  ShoppingCart,
  Search,
  Brain,
  Clock,
  ArrowRight,
} from "lucide-react";

// Cream editorial — 5 muted semantic accent tones cycled across the 8 cards.
// Replaces saturated rainbow (rose/amber/cyan/violet/teal/emerald/fuchsia/indigo).
const ACCENTS = [
  "var(--terracotta)", // #C66B3F
  "var(--ochre)", // #C9A96E
  "var(--sage)", // #8A9A7B
  "var(--oxblood)", // #6B2C2C
  "var(--ink-faint)", // #6B6B65
] as const;

// Text-only accents — WCAG AA on cream. Ochre/sage fail body-text contrast
// (1.83-2.09:1), so for any text-color use rotate only terracotta ↔ oxblood.
const TEXT_ACCENTS = [
  "var(--terracotta)", // #C66B3F
  "var(--oxblood)", // #6B2C2C
] as const;

const PAINS = [
  {
    icon: Ghost,
    pain: "My leads ghost me.",
    fix: "Auto-route every inquiry to WhatsApp + email in under 90 seconds. No lead lands in a forgotten inbox.",
    metric: "Response time 6h → 6min",
    tools: ["n8n", "GoHighLevel", "AI Chatbots"],
    services: [
      { slug: "n8n-automation", label: "n8n Automation" },
      { slug: "gohighlevel", label: "GoHighLevel CRM" },
      { slug: "ai-chatbots", label: "AI Chatbots" },
    ],
  },
  {
    icon: Clock,
    pain: "My team burns hours on copy-paste.",
    fix: "Map every repetitive flow. Replace with one n8n pipeline. Get your team's calendar back.",
    metric: "3 hrs/day → 0 manual triage",
    tools: ["n8n", "Zapier/Make", "AI Business Systems"],
    services: [
      { slug: "n8n-automation", label: "n8n Automation" },
      { slug: "zapier-make", label: "Zapier & Make" },
      { slug: "ai-business-systems", label: "AI Business Systems" },
    ],
  },
  {
    icon: Plug,
    pain: "My tools don't talk to each other.",
    fix: "Stitch CRM, calendar, Stripe, Slack, WhatsApp into one chat-first command surface. One source of truth.",
    metric: "11 tools → 1 stack",
    tools: ["n8n", "GoHighLevel", "Zapier/Make"],
    services: [
      { slug: "gohighlevel", label: "GoHighLevel CRM" },
      { slug: "n8n-automation", label: "n8n Automation" },
      { slug: "zapier-make", label: "Zapier & Make" },
    ],
  },
  {
    icon: Sparkles,
    pain: "My content engine is just me, exhausted.",
    fix: "Daily voice-locked content across LinkedIn, IG, TikTok, YouTube, FB. AI-tell linted before render so it sounds like you, not GPT.",
    metric: "1 founder → 5 channels daily",
    tools: ["AI Content", "Social Automation", "AI Video"],
    services: [
      { slug: "ai-content-creation", label: "AI Content Creation" },
      { slug: "social-automation", label: "Social Automation" },
      { slug: "ai-video", label: "AI Video Creation" },
      { slug: "tiktok-automation", label: "TikTok Automation" },
      { slug: "youtube-automation", label: "YouTube Automation" },
      { slug: "facebook-automation", label: "Facebook Automation" },
    ],
  },
  {
    icon: Globe,
    pain: "My website looks like 2019.",
    fix: "Bespoke Next.js build in 5-14 days. Custom design system, mobile-first, conversion-tuned. Not a template.",
    metric: "Ship in 14 days, not 14 weeks",
    tools: ["Next.js", "Vercel", "Branding"],
    services: [
      { slug: "vibe-coded-sites", label: "Vibe-Coded Websites" },
      { slug: "branding-design", label: "Branding & Design" },
    ],
  },
  {
    icon: Search,
    pain: "Google stopped sending me traffic.",
    fix: "AEO-tuned content engine. Schema + AI-citation blocks + 10-30 articles/mo. Get cited by Claude, ChatGPT, Perplexity.",
    metric: "Cited across 4 LLMs in 8 weeks",
    tools: ["WordPress SEO", "AEO Content"],
    services: [
      { slug: "wordpress-seo", label: "WordPress SEO Blog" },
      { slug: "ai-content-creation", label: "AI Content Creation" },
    ],
  },
  {
    icon: ShoppingCart,
    pain: "I'm losing sales at checkout.",
    fix: "Cart abandonment + post-purchase + courier rates surfaced + returns shortcut. Stop punishing your customer for being human.",
    metric: "Cart-stage surprise: 38% → <3%",
    tools: ["Shopify", "Klaviyo", "n8n"],
    services: [
      { slug: "ecommerce-automation", label: "E-commerce Automation" },
    ],
  },
  {
    icon: Brain,
    pain: "My team doesn't know how to use AI.",
    fix: "Voice-locked playbooks, prompt library, live workshops, fractional AI lead retainer. Stop guessing — start shipping.",
    metric: "Team adoption: 30% → 92%",
    tools: ["Strategy", "Training", "Playbooks"],
    services: [
      { slug: "strategy-training", label: "Strategy & Training" },
      { slug: "ai-business-systems", label: "AI Business Systems" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function PainSolverGrid() {
  return (
    <section
      className="relative py-16 md:py-24"
      style={{ background: "var(--cream)" }}
    >
      <div className="container-x px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div
            className="inline-flex items-center gap-3 mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta)",
                display: "inline-block",
              }}
            />
            Pick the bleed
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--ink)",
              fontSize: "clamp(28px, 5vw, 48px)",
              marginBottom: 14,
            }}
          >
            Which one is{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              costing you
            </em>{" "}
            this week?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              maxWidth: "44rem",
              lineHeight: 1.55,
            }}
          >
            Every brief lands in one of these eight. We close the pain — the
            services below are just the tools we use to do it.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {PAINS.map((p, i) => {
            const Icon = p.icon;
            const accent = ACCENTS[i % ACCENTS.length];
            const textAccent = TEXT_ACCENTS[i % TEXT_ACCENTS.length];
            const rotate = i % 2 === 0 ? "-0.3deg" : "0.3deg";
            return (
              <motion.article
                key={p.pain}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex flex-col"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.10)",
                  padding: "clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px) clamp(22px, 5vw, 30px)",
                  transform: `rotate(${rotate})`,
                  borderLeft: `3px solid ${accent}`,
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span
                    className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--cream-3)",
                      border: `1px solid ${accent}`,
                      color: textAccent,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: textAccent,
                      marginTop: 6,
                    }}
                  >
                    — Pain
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2.5vw, 24px)",
                    fontWeight: 600,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  &ldquo;{p.pain}&rdquo;
                </h3>

                <p
                  style={{
                    fontSize: 14.5,
                    color: "var(--ink-2)",
                    lineHeight: 1.6,
                    marginBottom: 18,
                  }}
                >
                  {p.fix}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "var(--ink-faint)",
                    }}
                  >
                    — Real outcome
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {p.metric}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "4px 9px",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        background: "var(--cream-3)",
                        border: "1px solid rgba(26,26,26,0.10)",
                        color: "var(--ink-2)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3"
                  style={{ borderTop: "1px solid rgba(26,26,26,0.10)" }}
                >
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {p.services.slice(0, 2).map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        style={{
                          fontSize: 12.5,
                          color: textAccent,
                          fontWeight: 600,
                          textUnderlineOffset: 4,
                        }}
                        className="hover:underline"
                      >
                        {s.label}
                      </Link>
                    ))}
                    {p.services.length > 2 && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--ink-faint)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        + {p.services.length - 2} more
                      </span>
                    )}
                  </div>
                  <Link
                    href="/discovery-call"
                    className="inline-flex items-center gap-1.5 transition-transform group-hover:translate-x-1"
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    Fix this
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
