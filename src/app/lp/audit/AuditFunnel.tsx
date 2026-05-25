"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CalendarClock,
  Star,
  Check,
  X,
  Quote,
  Clock,
  ShieldCheck,
  MapPin,
  Zap,
  AlertTriangle,
  Workflow,
  TrendingUp,
} from "lucide-react";

/**
 * Cold-traffic LP for Meta / paid social.
 *  - No site nav, no footer (already hidden on /lp/* by Header.tsx + Footer.tsx)
 *  - ONE primary action: Book strategy call (Calendly-linked)
 *  - CTA repeated 4-5x, each contextually placed
 *  - Mobile-first (Meta = mostly mobile)
 *  - Pattern-interrupt hero, hard pain agitation, named-client proof, soft scarcity
 */

const PAINS = [
  {
    text: "Leads ghost you because nobody replies in under 90 seconds",
  },
  {
    text: "Your team copy-pastes the same data between 4 tools every day",
  },
  {
    text: "Your website looks like 2019 and the contact form is silently broken",
  },
  {
    text: "You spent $4k on \"AI consultants\" and got a PDF you never opened",
  },
];

const BENEFITS = [
  {
    icon: Workflow,
    title: "Find the leak",
    body: "30-min audit walks your funnel + stack live. I name the top 3 fixable losses by dollar value, not vague advice.",
  },
  {
    icon: Zap,
    title: "Plug it in 14 days",
    body: "Fixed-price scope back in your inbox in 48 hours. Most builds ship in 5-14 days, paid 50/50.",
  },
  {
    icon: TrendingUp,
    title: "Keep the plan either way",
    body: "If we're not the right fit, you still walk with a written 60-day plan + 3 vetted operator referrals. Free.",
  },
];

const PROOFS = [
  {
    metric: "23% → 71%",
    label: "show rate",
    client: "Dr. Elena Marchetti · Grand Mercer Dental",
    quote:
      "We were losing PKR 480,000/month to no-shows. Six weeks after Waseem shipped the n8n + SMS flow, it was a non-issue.",
    image: "/case-studies/manhattan-dental-atelier-flagship.jpg",
  },
  {
    metric: "6 hrs → 6 min",
    label: "response time",
    client: "Operations Director · EU Logistics",
    quote:
      "We'd tried three automation contractors before. Waseem was the first one who asked us to print our inbox and walk through 100 threads with him before writing a single node.",
    image: "/case-studies/eu-logistics-email-triage-n8n.jpg",
  },
  {
    metric: "8 → 17",
    label: "monthly bookings",
    client: "Christelle · Wellness practitioner, Ubud",
    quote:
      "I stopped explaining the same things in DMs five times a day. The site does it now, and in my voice. I didn't realize how much energy that was draining until it stopped.",
    image: "/case-studies/bali-wellness-conversion-funnel.jpg",
  },
];

const WHATS_INSIDE = [
  "Live audit of your funnel + stack on Zoom (your screen, my second monitor)",
  "Top 3 revenue leaks ranked by $ recovered — specific, not generic",
  "60-day automation roadmap delivered in writing within 48 hours",
  "Fixed-price scope with deliverables, timeline, tech stack — no tier ladders",
  "Honest \"not us\" referral if you'd be better served elsewhere",
];

const STEPS = [
  {
    n: "01",
    title: "Book a slot",
    body: "Pick any 30-min slot. Bali hours (GMT+8) covers EU mornings, US evenings, all of Asia.",
  },
  {
    n: "02",
    title: "Run the audit",
    body: "Show up with your numbers. Leave 30 min later with 3 concrete plays.",
  },
  {
    n: "03",
    title: "Get the plan",
    body: "48 hours after the call — a fixed-price scope in your inbox. Yes, no, or 'park it.'",
  },
];

const FAQS = [
  {
    q: "Is this actually free?",
    a: "Yes. No payment, no card, no \"upgrade to access.\" The 30 min costs you nothing and you walk with the audit findings in writing whether you hire me or not. I'm a builder who needs leads — the call is my marketing.",
  },
  {
    q: "Is this just a sales pitch in disguise?",
    a: "No. I run audits, not pitches. About 60% of people I audit don't hire me on the call — they sit on it for 2-6 weeks, then come back. I'd rather you book later than buy something you regret.",
  },
  {
    q: "What if my business is too small / too big?",
    a: "Too small (<$2k builds): I'll point you to my productized offers or a vetted operator. Too big (enterprise of 200+): I'll point you to an agency partner. Either way you get the audit + a real referral, not a no.",
  },
  {
    q: "How fast can you start?",
    a: "Same-week kickoff if scope is locked + 50% deposit in by Friday. Most builds ship 5-14 days after kickoff. I run 4 builds a month max — fast, but capped.",
  },
  {
    q: "What tools do you actually use?",
    a: "n8n (self-hosted), GoHighLevel, Claude + GPT-4o, Next.js + Vercel, Shopify, ManyChat. I don't sell tools — I sell the system. If your stack already has half of these, we keep what works.",
  },
];

export default function AuditFunnel() {
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToCTA = useCallback(() => {
    if (!ctaRef.current) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ctaRef.current.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const goBook = useCallback(() => {
    // Send to the main discovery-call page (which has the full Calendly flow)
    if (typeof window !== "undefined") {
      window.location.href = "/discovery-call#qualify";
    }
  }, []);

  return (
    <div style={{ background: "#061827", color: "white", minHeight: "100vh" }}>
      {/* Pixel-thin trust bar at the very top */}
      <div
        className="w-full text-center py-2.5 text-[11px] uppercase tracking-[0.22em] font-bold"
        style={{
          background: "linear-gradient(90deg, #1E88E5 0%, #14B8A6 100%)",
          color: "#061827",
        }}
      >
        Free · 30-min audit · Yes / no in 48 hours · 4 builds left this month
      </div>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section
        className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-24"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 540,
            height: 540,
            background: "#1E88E5",
            top: -110,
            left: -150,
            opacity: 0.40,
          }}
          aria-hidden
        />
        <span
          className="orb"
          style={{
            width: 580,
            height: 580,
            background: "#00D4FF",
            top: 120,
            right: -180,
            opacity: 0.30,
            animationDelay: "-7s",
          }}
          aria-hidden
        />

        <div className="container-x px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
                <Sparkles className="w-3 h-3" />
                For founders losing leads to slow follow-up
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-white mb-5">
                Find the leak.{" "}
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
                  Plug it in 14 days.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-7 max-w-xl">
                Free 30-min audit. The top 3 revenue leaks in your funnel,
                ranked by dollar value. Fixed-price scope back in your inbox 48
                hours later. No deck. No SDR. No fake urgency.
              </p>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300 mb-7">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-current" />
                  <b className="text-white">4.9 / 5</b> · 47 reviews
                </span>
                <span className="text-cyan-300/30">·</span>
                <span>
                  <b className="text-white">180+</b> workflows shipped
                </span>
                <span className="text-cyan-300/30">·</span>
                <span>
                  <b className="text-white">9</b> countries
                </span>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goBook}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-base motion-reduce:transform-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                    boxShadow: "0 12px 36px rgba(0, 212, 255, 0.35)",
                  }}
                >
                  Book my free audit
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <button
                  type="button"
                  onClick={scrollToCTA}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-cyan-200 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition"
                >
                  See what's inside
                </button>
              </div>

              <p className="mt-4 text-xs text-fg-faint">
                Bali hours · GMT+8 · usually books within 48-72 hours
              </p>
            </motion.div>

            {/* Founder portrait card */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(10,32,52,0.7) 0%, rgba(7,56,70,0.55) 100%)",
                  border: "1px solid rgba(0,212,255,0.25)",
                  boxShadow: "0 30px 80px -25px rgba(0,212,255,0.32)",
                  backdropFilter: "blur(14px) saturate(140%)",
                }}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/portraits/waseem-builder-hero.jpg"
                    alt="Waseem Nasir — Founder, SkynetLabs"
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "center top" }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(6,24,39,0.92) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="inline-flex items-center gap-1.5 mb-2 text-[10px] uppercase tracking-[0.18em] text-cyan-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Runs every call personally
                    </div>
                    <div className="text-white font-extrabold text-lg leading-tight">
                      Waseem Nasir
                    </div>
                    <div className="text-sm text-gray-300 mt-0.5">
                      Founder · SkynetLabs
                    </div>
                    <div className="flex items-center gap-3 text-xs text-cyan-200/85 mt-2">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Bali · GMT+8
                      </span>
                      <span className="text-cyan-300/30">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Solo since 2019
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          PAIN AGITATION
          ============================================================ */}
      <section className="py-16 md:py-24 border-t border-white/[0.05]">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-rose-300 mb-4 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/25">
              <AlertTriangle className="w-3 h-3" />
              Sound familiar?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-snug">
              You&apos;re probably losing money on{" "}
              <span
                className="italic"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: "#fda4a4",
                }}
              >
                at least one of these.
              </span>
            </h2>
          </motion.div>

          <ul className="space-y-3">
            {PAINS.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-rose-400/15"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-rose-500/15 border border-rose-400/30 mt-0.5">
                  <X className="w-3.5 h-3.5 text-rose-300" />
                </span>
                <span className="text-base md:text-lg text-fg-muted leading-snug">
                  {p.text}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={goBook}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              I&apos;ll fix at least one of these — book my audit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          BENEFITS — 3 cards
          ============================================================ */}
      <section
        className="py-16 md:py-24 border-t border-white/[0.05]"
        style={{
          background:
            "linear-gradient(180deg, #061827 0%, #082234 100%)",
        }}
      >
        <div className="container-x px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
              Here&apos;s the shift
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.08]">
              Three things change after our{" "}
              <span
                className="italic"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  background:
                    "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                30 minutes together.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
                    },
                  }}
                  className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/35 transition"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(30,136,229,0.20), rgba(20,184,166,0.20))",
                      border: "1px solid rgba(126,228,255,0.32)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <h3 className="text-white font-extrabold text-lg mb-2 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {b.body}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          PROOF — 3 cards
          ============================================================ */}
      <section className="py-16 md:py-24 border-t border-white/[0.05]">
        <div className="container-x px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-300 mb-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/25">
              <ShieldCheck className="w-3 h-3" />
              Real shipped builds
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.08]">
              Same call, same audit,{" "}
              <span
                className="italic"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  background:
                    "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                these results.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROOFS.map((p) => (
              <motion.article
                key={p.client}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.client}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(6,24,39,0.10) 0%, rgba(6,24,39,0.85) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div
                      className="text-3xl font-extrabold tracking-tight"
                      style={{
                        background:
                          "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {p.metric}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-cyan-200/85 font-bold">
                      {p.label}
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <Quote className="w-4 h-4 text-cyan-300 mb-2" />
                  <p className="text-sm text-fg-muted leading-relaxed italic mb-4 flex-1">
                    &ldquo;{p.quote}&rdquo;
                  </p>
                  <footer className="text-xs text-cyan-200 font-semibold">
                    — {p.client}
                  </footer>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT'S INSIDE — checklist
          ============================================================ */}
      <section
        className="py-16 md:py-24 border-t border-white/[0.05]"
        style={{
          background:
            "linear-gradient(180deg, #061827 0%, #073846 100%)",
        }}
      >
        <div className="container-x px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
              What you actually get
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.08]">
              Five things in the box.{" "}
              <span
                className="italic"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  background:
                    "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                All free.
              </span>
            </h2>
          </motion.div>

          <ul className="space-y-3 mb-10">
            {WHATS_INSIDE.map((line, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/[0.05] border border-cyan-400/20"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-cyan-500/20 border border-cyan-400/40 mt-0.5">
                  <Check className="w-4 h-4 text-cyan-300" />
                </span>
                <span className="text-base text-white leading-snug">
                  {line}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="text-center">
            <button
              type="button"
              onClick={goBook}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 12px 36px rgba(0, 212, 255, 0.30)",
              }}
            >
              Claim my free audit slot
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-3 text-xs text-fg-faint">
              4 builds left this month · bookings move fast on Mondays
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS — 3 steps
          ============================================================ */}
      <section className="py-16 md:py-24 border-t border-white/[0.05]">
        <div className="container-x px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.08]">
              Three steps,{" "}
              <span
                className="italic"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  background:
                    "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                no surprises.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10"
              >
                <div
                  className="text-4xl font-black tracking-tight mb-3"
                  style={{
                    background:
                      "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.n}
                </div>
                <h3 className="text-white font-extrabold text-lg mb-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section
        className="py-16 md:py-24 border-t border-white/[0.05]"
        style={{
          background:
            "linear-gradient(180deg, #061827 0%, #082234 100%)",
        }}
      >
        <div className="container-x px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
              Before you book
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.08]">
              The questions{" "}
              <span
                className="italic"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  background:
                    "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                I get most.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-2.5">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-white font-semibold">
                  <span>{f.q}</span>
                  <span className="text-cyan-300 text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-fg-muted text-sm leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA BAND
          ============================================================ */}
      <section
        ref={ctaRef}
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.3) 0%, transparent 50%)",
          }}
        />

        <div className="container-x px-6 relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/85 mb-5 px-3 py-1 rounded-full bg-white/15 border border-white/25">
            <CalendarClock className="w-3 h-3" />
            4 audit slots left this month
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05] mb-5">
            Every week you wait,{" "}
            <span
              className="italic"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              the bleed gets bigger.
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto mb-8">
            30 free minutes. 3 concrete plays. A scope in 48 hours. Yes, no, or
            referral — you walk with the findings either way.
          </p>
          <motion.button
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={goBook}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-extrabold text-base motion-reduce:transform-none"
            style={{
              background: "white",
              color: "#061827",
              boxShadow: "0 16px 40px rgba(0,0,0,0.30)",
            }}
          >
            Book my free 30-min audit
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="mt-5 text-xs text-white/70">
            No card. No SDR. No spam. Just the audit.
          </p>
        </div>
      </section>
    </div>
  );
}
