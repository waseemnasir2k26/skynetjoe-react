"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowDown,
  CalendarClock,
  Star,
  Award,
  Hammer,
  Quote,
  ShieldCheck,
  Compass,
  Rocket,
  ChevronDown,
} from "lucide-react";
import Qualifier, { type QualifierState } from "./Qualifier";
import CalendlyEmbed, { CALENDLY_SECTION_ID } from "./CalendlyEmbed";

const QUAL_SECTION_ID = "qualify";

// 5 weekly slots, ~3 remaining (real-feeling scarcity, adjustable)
const SLOTS_TOTAL = 5;
const SLOTS_REMAINING = 3;

const TRUST_CARDS = [
  {
    icon: Compass,
    title: "Your 60-day automation roadmap",
    body:
      "Top 3 leaks ranked by $ recovered. Sequenced so you ship the biggest first.",
  },
  {
    icon: Hammer,
    title: "A fixed-price scope in 48 hours",
    body:
      "One-pager: deliverables, timeline, stack, price. No tier ladders, no upsell.",
  },
  {
    icon: ShieldCheck,
    title: "Honest 'no' if we're wrong fit",
    body:
      "If your job needs an agency of 20, I'll point you to one of 30+ vetted operators.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this a sales pitch?",
    a: "No. I run audits, not pitches. We look at your stack for 30 minutes, I name the 3 fastest fixes, then you decide. If a paid build comes from it — great. If not, you've still got a plan you can hand to anyone.",
  },
  {
    q: "What if I'm not ready to commit to anything?",
    a: "Most folks on this call aren't. About 60% take the audit, sit on it for 2 – 6 weeks, then come back when budget clears. I'd rather you book later than buy something you regret.",
  },
  {
    q: "Can I bring my team?",
    a: "Yes — up to 3 people. Add them as guests in the Calendly booking. Bring your ops lead or whoever owns the broken thing.",
  },
  {
    q: "What if I'm in a different timezone?",
    a: "Calendly auto-converts. My slots are 9am – 6pm Bali (GMT+8), which covers Europe mornings, US evenings, Australia mid-day, and all of Asia. If literally nothing fits, email me.",
  },
  {
    q: "How long until you scope my project?",
    a: "48 hours from call end. You get a one-page brief: deliverables, price, ship date, tech stack. 50% deposit unlocks work — fixed price, no hourly creep.",
  },
  {
    q: "What if my budget is small?",
    a: "I'll tell you straight on the call. Builds under $2k I usually point to my Fiverr productized offers or a 30+ vetted-operator referral list. No 'let me put together a custom proposal' theatre.",
  },
];

export default function DiscoveryFunnel() {
  const [leadId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const ts = Date.now().toString(36);
    const rnd = Math.random().toString(36).slice(2, 8);
    return `lead_${ts}_${rnd}`;
  });
  const [qualification, setQualification] = useState<QualifierState | null>(
    null,
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const qualRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  // When the qualifier completes, POST partial lead (qualification only) so
  // GHL gets the answers even if the user bounces before scheduling.
  const handleQualifyComplete = useCallback(
    async (state: QualifierState) => {
      setQualification(state);
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId,
            source: "discovery-call",
            qualification: state,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("[discovery-call] qualifier POST failed", err);
      }
      // DataLayer
      if (
        typeof window !== "undefined" &&
        (window as unknown as { dataLayer?: unknown[] }).dataLayer
      ) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "discovery_qualifier_completed",
          leadId,
          urgency: state.urgency,
          revenueRange: state.revenueRange,
        });
      }
      // Scroll to calendar
      window.setTimeout(() => scrollTo(calRef), 80);
    },
    [leadId, scrollTo],
  );

  const handleSkipQualify = useCallback(() => {
    scrollTo(calRef);
  }, [scrollTo]);

  // Hash deep-link support
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash === QUAL_SECTION_ID && qualRef.current) {
      window.setTimeout(() => scrollTo(qualRef), 120);
    } else if (hash === CALENDLY_SECTION_ID && calRef.current) {
      window.setTimeout(() => scrollTo(calRef), 120);
    }
  }, [scrollTo]);

  return (
    <>
      {/* ============================================================
          PHASE 1 — Landing hero
          ============================================================ */}
      <section
        className="relative overflow-hidden pt-24 md:pt-32 pb-20 md:pb-24"
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
            top: -90,
            left: -130,
            opacity: 0.55,
          }}
          aria-hidden
        />
        <span
          className="orb"
          style={{
            width: 580,
            height: 580,
            background: "#00D4FF",
            top: 80,
            right: -160,
            opacity: 0.45,
            animationDelay: "-7s",
          }}
          aria-hidden
        />

        <div className="container-x px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
            <div className="max-w-3xl">
              {/* Eyebrow chip */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(0, 212, 255, 0.12)",
                  border: "1px solid rgba(0, 212, 255, 0.40)",
                  color: "#7ee4ff",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-wider uppercase">
                  Free 30-min strategy call · Bali hours · No SDR
                </span>
              </div>

              {/* Hero headline — pain-driven, loss-framed */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight mb-5 text-white">
                Your CRM is bleeding{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #FF6B6B 0%, #ffb86b 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  $4,200/month.
                </span>{" "}
                Let&apos;s plug it in{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  14 days.
                </span>
              </h1>

              {/* Subhead — what they get */}
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6 max-w-2xl">
                30-minute audit, 3 concrete plays you can ship this quarter, and
                a fixed-price scope back in your inbox 48 hours later. No tier
                ladders. No SDR follow-up. No fake urgency.
              </p>

              {/* Trust chip row */}
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(255, 215, 0, 0.10)",
                    border: "1px solid rgba(255, 215, 0, 0.35)",
                    color: "#ffd54f",
                  }}
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                  4.9 / 5 · 47 reviews
                </div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(126, 228, 255, 0.10)",
                    border: "1px solid rgba(126, 228, 255, 0.30)",
                    color: "#7ee4ff",
                  }}
                >
                  <Award className="w-3.5 h-3.5" />
                  Top Rated Plus on Upwork
                </div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(94, 234, 212, 0.10)",
                    border: "1px solid rgba(94, 234, 212, 0.30)",
                    color: "#5eead4",
                  }}
                >
                  <Hammer className="w-3.5 h-3.5" />
                  180+ workflows shipped
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollTo(qualRef)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-base motion-reduce:transform-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                    boxShadow: "0 12px 36px rgba(0, 212, 255, 0.35)",
                  }}
                >
                  Get my custom recovery plan
                  <ArrowDown className="w-4 h-4" />
                </motion.button>
                <button
                  type="button"
                  onClick={() => scrollTo(calRef)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-cyan-200 border-2 border-cyan-400/40 hover:border-cyan-400 hover:bg-cyan-400/5 transition"
                >
                  <CalendarClock className="w-4 h-4" />
                  Skip to calendar
                </button>
              </div>

              {/* Concrete testimonial under CTA */}
              <div className="rounded-2xl bg-white/5 border border-cyan-400/20 p-4 max-w-xl mb-5">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base md:text-lg text-white font-semibold leading-snug">
                      &ldquo;23% show-rate to{" "}
                      <span className="text-cyan-300">71% in 6 weeks.</span>
                      &rdquo;
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      — Dr. Elena Marchetti, Grand Mercer Dental
                    </p>
                  </div>
                </div>
              </div>

              {/* Scarcity */}
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-semibold">
                  {SLOTS_REMAINING} of {SLOTS_TOTAL} free strategy slots left
                  this week
                </span>
              </div>
            </div>

            {/* Founder card — right rail */}
            <aside className="lg:sticky lg:top-32">
              <div
                className="rounded-2xl p-5 backdrop-blur-md"
                style={{
                  background: "rgba(6, 24, 39, 0.55)",
                  border: "1px solid rgba(126, 228, 255, 0.20)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/50 flex-shrink-0">
                    <Image
                      src="/portraits/waseem-bluepolo.jpg"
                      alt="Waseem Nasir"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Waseem Nasir</p>
                    <p className="text-xs text-cyan-200">
                      Founder · runs every call personally
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Bali · GMT+8 · solo since 2014
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;You don&apos;t get an SDR. You get me on Zoom with your
                  funnel pulled up on my second monitor. We ship plans, not
                  proposals.&rdquo;
                </p>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
                  <Stat value="180+" label="Workflows" />
                  <Stat value="40+" label="Sites" />
                  <Stat value="9" label="Countries" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          PHASE 2 — Qualifier
          ============================================================ */}
      <section
        id={QUAL_SECTION_ID}
        ref={qualRef}
        className="py-20 md:py-24 relative"
        style={{ background: "var(--bg)" }}
      >
        <div className="container-x px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Step 1 of 2
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              7 quick questions.{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                90 seconds.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              I read these before our call so we don&apos;t burn 20 minutes on
              context. If you&apos;d rather skip and just grab a slot, hit{" "}
              <em>Skip to calendar</em> at the top of any question.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {qualification ? (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/30 p-6 md:p-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Brief saved
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">
                  Got your answers. Calendar below.
                </h3>
                <p className="text-sm text-gray-300 mb-5">
                  I&apos;ll have your answers open during the call so we can go
                  straight to the audit.
                </p>
                <button
                  type="button"
                  onClick={() => scrollTo(calRef)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:scale-[1.02] transition"
                >
                  Pick my slot <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Qualifier
                onComplete={handleQualifyComplete}
                onSkip={handleSkipQualify}
              />
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          PHASE 3 — Calendly embed + close
          ============================================================ */}
      <section
        id={CALENDLY_SECTION_ID}
        ref={calRef}
        className="py-20 md:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #061827 0%, #0a2d4a 60%, #061827 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 460,
            height: 460,
            background: "#14B8A6",
            top: 40,
            right: -120,
            opacity: 0.35,
          }}
          aria-hidden
        />

        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Step 2 of 2
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Pick your slot.{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                30 minutes, real audit.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              No deck. No SDR. Just me, your funnel, and a shared screen. Show
              up with your numbers — you&apos;ll leave with a roadmap.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <CalendlyEmbed
              qualification={qualification}
              leadId={leadId}
            />
          </div>

          {/* Trust block — 3 cards */}
          <div className="max-w-5xl mx-auto mt-14">
            <p className="text-center text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-6">
              What you walk away with
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TRUST_CARDS.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-400/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ — buyer-objection close
          ============================================================ */}
      <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="container-x px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <Rocket className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Before you book
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white">
              The 6 questions{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                I get most.
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between text-left p-5 md:p-6 hover:bg-white/[0.07] transition"
                    aria-expanded={open}
                  >
                    <span className="text-base md:text-lg font-bold text-white pr-4">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-300 flex-shrink-0 transition-transform motion-reduce:transition-none ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-5 md:px-6 pb-5 md:pb-6 motion-reduce:transition-none"
                    >
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final scroll-back nudge */}
          <div className="max-w-2xl mx-auto text-center mt-12">
            <p className="text-sm text-gray-400 mb-3">
              Still reading? You&apos;ve got more than enough info.
            </p>
            <button
              type="button"
              onClick={() => scrollTo(calRef)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              <CalendarClock className="w-4 h-4" />
              Grab my slot now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-lg font-extrabold text-cyan-300">{value}</div>
      <div className="text-[10px] uppercase text-gray-400 tracking-wider">
        {label}
      </div>
    </div>
  );
}
