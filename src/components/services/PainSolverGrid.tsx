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
    accent: "from-rose-500/30 via-rose-400/10 to-transparent",
    border: "rose-400/30",
    glow: "rgba(244,114,114,0.20)",
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
    accent: "from-amber-500/30 via-amber-400/10 to-transparent",
    border: "amber-400/30",
    glow: "rgba(255,181,71,0.20)",
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
    accent: "from-cyan-500/30 via-cyan-400/10 to-transparent",
    border: "cyan-400/30",
    glow: "rgba(0,212,255,0.22)",
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
    accent: "from-violet-500/30 via-violet-400/10 to-transparent",
    border: "violet-400/30",
    glow: "rgba(167,139,250,0.22)",
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
    accent: "from-teal-500/30 via-teal-400/10 to-transparent",
    border: "teal-400/30",
    glow: "rgba(20,184,166,0.22)",
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
    accent: "from-emerald-500/30 via-emerald-400/10 to-transparent",
    border: "emerald-400/30",
    glow: "rgba(52,211,153,0.22)",
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
    accent: "from-fuchsia-500/30 via-fuchsia-400/10 to-transparent",
    border: "fuchsia-400/30",
    glow: "rgba(232,121,249,0.22)",
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
    accent: "from-indigo-500/30 via-indigo-400/10 to-transparent",
    border: "indigo-400/30",
    glow: "rgba(129,140,248,0.22)",
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
    <section className="relative py-16 md:py-24">
      <div className="container-x px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
            <Sparkles className="w-3 h-3" />
            Pick the bleed
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Which one is{" "}
            <span
              className="italic font-semibold"
              style={{
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                background:
                  "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              costing you
            </span>{" "}
            this week?
          </h2>
          <p className="text-base md:text-lg text-fg-muted max-w-2xl">
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
          {PAINS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.pain}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl p-6 md:p-7 flex flex-col bg-white/[0.03] border border-white/10 hover:border-white/25 transition-colors"
                style={{
                  boxShadow: `0 20px 60px -30px ${p.glow}`,
                }}
              >
                {/* Color wash on hover */}
                <span
                  aria-hidden
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${p.accent} pointer-events-none`}
                />

                <div className="relative flex items-start justify-between gap-4 mb-4">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(30,136,229,0.18), rgba(20,184,166,0.18))",
                      border: "1px solid rgba(126,228,255,0.30)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-fg-faint font-semibold mt-1.5">
                    Pain →
                  </span>
                </div>

                <h3 className="relative text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug mb-2">
                  &ldquo;{p.pain}&rdquo;
                </h3>

                <p className="relative text-sm md:text-[15px] text-fg-muted leading-relaxed mb-5">
                  {p.fix}
                </p>

                <div className="relative flex items-center gap-2 mb-5">
                  <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold">
                    Real outcome
                  </span>
                  <span className="text-[11px] text-fg-faint">·</span>
                  <span className="text-sm font-bold text-white">
                    {p.metric}
                  </span>
                </div>

                <div className="relative flex flex-wrap gap-1.5 mb-5">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.05] border border-white/10 text-fg-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="relative mt-auto pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {p.services.slice(0, 2).map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="text-xs text-cyan-300 hover:text-cyan-200 font-semibold underline-offset-4 hover:underline"
                      >
                        {s.label}
                      </Link>
                    ))}
                    {p.services.length > 2 && (
                      <span className="text-xs text-fg-faint">
                        + {p.services.length - 2} more
                      </span>
                    )}
                  </div>
                  <Link
                    href="/discovery-call"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-transform group-hover:translate-x-1"
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
