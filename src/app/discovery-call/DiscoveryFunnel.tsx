"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CalendarClock,
  Star,
  Hammer,
  Quote,
  ShieldCheck,
  Compass,
  ChevronDown,
  Check,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import Qualifier, { type QualifierState } from "./Qualifier";
import CalendlyEmbed, { CALENDLY_SECTION_ID } from "./CalendlyEmbed";

const QUAL_SECTION_ID = "qualify";

const STEPS = [
  { id: "brief", label: "Share the brief", short: "Brief" },
  { id: "pick", label: "Pick a slot", short: "Pick" },
  { id: "plan", label: "Get the plan", short: "Plan" },
];

const TRUST_CARDS = [
  {
    icon: Compass,
    title: "Your 60-day roadmap",
    body: "Top 3 leaks ranked by recovered revenue. Sequenced so you ship the biggest first.",
  },
  {
    icon: Hammer,
    title: "Fixed scope in 48 hours",
    body: "One-pager: deliverables, timeline, stack, price. No tier ladders, no upsell theatre.",
  },
  {
    icon: ShieldCheck,
    title: "Honest 'no' if wrong fit",
    body: "If your job needs an agency of 20, I'll point you to one of 30+ vetted operators.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this a sales pitch?",
    a: "No. I run audits, not pitches. We look at your stack for 30 minutes, I name the 3 fastest fixes, then you decide. If a paid build comes from it — great. If not, you've still got a plan you can hand to anyone.",
  },
  {
    q: "What if I'm not ready to commit to anything?",
    a: "Most folks on this call aren't. About 60% take the audit, sit on it for 2–6 weeks, then come back when budget clears. I'd rather you book later than buy something you regret.",
  },
  {
    q: "Can I bring my team?",
    a: "Yes — up to 3 people. Add them as guests in the Calendly booking. Bring your ops lead or whoever owns the broken thing.",
  },
  {
    q: "What if I'm in a different timezone?",
    a: "Calendly auto-converts. My slots are 9am–6pm Bali (GMT+8), which covers Europe mornings, US evenings, Australia mid-day, and all of Asia. If literally nothing fits, email me.",
  },
  {
    q: "How long until you scope my project?",
    a: "48 hours from call end. You get a one-page brief: deliverables, price, ship date, tech stack. 50% deposit unlocks work — fixed price, no hourly creep.",
  },
  {
    q: "What if my budget is small?",
    a: "I'll tell you straight on the call. Builds under $2k I usually point to my productized offers or a 30+ vetted-operator referral list. No 'let me put together a custom proposal' theatre.",
  },
];

function StickyProgress({ activeStep }: { activeStep: number }) {
  return (
    <div
      className="sticky top-[64px] z-30 backdrop-blur-xl border-b border-white/[0.06]"
      style={{ background: "rgba(6,24,39,0.78)" }}
    >
      <div className="container-x px-6 py-3">
        <ol className="flex items-center justify-center gap-2 sm:gap-4">
          {STEPS.map((s, i) => {
            const done = i < activeStep;
            const current = i === activeStep;
            return (
              <li key={s.id} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold transition-all ${
                    done
                      ? "bg-cyan-400 text-[#061827]"
                      : current
                        ? "bg-gradient-to-br from-cyan-400 to-teal-400 text-[#061827] ring-4 ring-cyan-400/25"
                        : "bg-white/10 text-fg-muted"
                  }`}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </span>
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors ${
                    current
                      ? "text-white"
                      : done
                        ? "text-cyan-200"
                        : "text-fg-faint"
                  }`}
                >
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.short}</span>
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    className={`w-6 sm:w-12 h-px transition-colors ${
                      done ? "bg-cyan-400/60" : "bg-white/15"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

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
  const [activeStep, setActiveStep] = useState(0);

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

  // Track active step via intersection observers on section refs
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const qualTop = qualRef.current?.getBoundingClientRect().top ?? Infinity;
      const calTop = calRef.current?.getBoundingClientRect().top ?? Infinity;
      const offset = 200;
      if (calTop < offset) setActiveStep(2);
      else if (qualTop < offset) setActiveStep(1);
      else setActiveStep(0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      window.setTimeout(() => scrollTo(calRef), 80);
    },
    [leadId, scrollTo],
  );

  const handleSkipQualify = useCallback(() => {
    scrollTo(calRef);
  }, [scrollTo]);

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
      <StickyProgress activeStep={activeStep} />

      {/* ============================================================
          HERO — elegant, story-first
          ============================================================ */}
      <section
        className="relative overflow-hidden pt-16 md:pt-20 pb-20 md:pb-28"
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
            opacity: 0.35,
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
            opacity: 0.25,
            animationDelay: "-7s",
          }}
          aria-hidden
        />

        <div className="container-x px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-6 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
                <Sparkles className="w-3 h-3" />
                30-min strategy call · Bali hours · No SDR
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight text-white mb-6">
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
                30-minute audit. 3 concrete plays you can ship this quarter. A
                fixed-price scope back in your inbox 48 hours later. No deck.
                No SDR. No fake urgency.
              </p>

              {/* Trust strip — softer */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300 mb-8">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-current" />
                  <b className="text-white">4.9 / 5</b> · 47 reviews
                </span>
                <span className="text-cyan-300/30">·</span>
                <span>
                  <b className="text-white">180+</b> workflows
                </span>
                <span className="text-cyan-300/30">·</span>
                <span>
                  <b className="text-white">9</b> countries
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollTo(qualRef)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-base motion-reduce:transform-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                    boxShadow: "0 12px 36px rgba(0, 212, 255, 0.30)",
                  }}
                >
                  Start the brief
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <button
                  type="button"
                  onClick={() => scrollTo(calRef)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-cyan-200 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition"
                >
                  <CalendarClock className="w-4 h-4" />
                  Skip to calendar
                </button>
              </div>

              {/* Pull quote */}
              <blockquote
                className="rounded-2xl p-5 max-w-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(20,184,166,0.04) 100%)",
                  border: "1px solid rgba(0,212,255,0.18)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base md:text-lg text-white leading-snug font-medium">
                      23% show-rate to{" "}
                      <span
                        className="italic"
                        style={{
                          fontFamily:
                            '"Playfair Display", Georgia, serif',
                          color: "#5EEAD4",
                        }}
                      >
                        71% in 6 weeks.
                      </span>
                    </p>
                    <p className="text-xs text-fg-faint mt-1.5">
                      — Dr. Elena Marchetti, Grand Mercer Dental
                    </p>
                  </div>
                </div>
              </blockquote>
            </motion.div>

            {/* Founder card — elegant, larger portrait */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-[140px]"
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(10,32,52,0.65) 0%, rgba(7,56,70,0.55) 100%)",
                  border: "1px solid rgba(0,212,255,0.22)",
                  boxShadow: "0 30px 80px -25px rgba(0,212,255,0.30)",
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
                    <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                      <span>Founder · SkynetLabs</span>
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

                <div className="p-5">
                  <p className="text-sm text-fg-muted leading-relaxed italic mb-4">
                    &ldquo;You don&apos;t get an SDR. You get me on Zoom with
                    your funnel pulled up on my second monitor. We ship plans,
                    not proposals.&rdquo;
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.07]">
                    <Stat value="180+" label="Workflows" />
                    <Stat value="40+" label="Sites" />
                    <Stat value="9" label="Countries" />
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          STEP 1 — Qualifier
          ============================================================ */}
      <section
        id={QUAL_SECTION_ID}
        ref={qualRef}
        className="py-20 md:py-28 relative"
        style={{
          background:
            "linear-gradient(180deg, #061827 0%, #082234 100%)",
        }}
      >
        <div className="container-x px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
              Step 1 · The brief
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white leading-[1.08]">
              Seven quick questions.{" "}
              <span
                className="italic"
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
                Ninety seconds.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              I read these before our call so we don&apos;t burn 20 minutes on
              context. Rather skip? Hit <em>Skip to calendar</em> on any
              question.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {qualification ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl p-8 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(0,212,255,0.08) 100%)",
                    border: "1px solid rgba(20,184,166,0.35)",
                  }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-emerald-500/20 border border-emerald-400/40">
                    <ShieldCheck className="w-6 h-6 text-emerald-300" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
                    Brief saved.
                  </h3>
                  <p className="text-sm text-fg-muted mb-6">
                    I&apos;ll have your answers open during the call so we go
                    straight to the audit.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo(calRef)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                      boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
                    }}
                  >
                    Pick my slot
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Qualifier
                    onComplete={handleQualifyComplete}
                    onSkip={handleSkipQualify}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ============================================================
          STEP 2 — Calendly
          ============================================================ */}
      <section
        id={CALENDLY_SECTION_ID}
        ref={calRef}
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #082234 0%, #0a2d4a 50%, #061827 100%)",
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
            opacity: 0.25,
          }}
          aria-hidden
        />

        <div className="container-x px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
              Step 2 · Pick your slot
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white leading-[1.08]">
              Thirty minutes.{" "}
              <span
                className="italic"
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
                One real audit.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              No deck. No SDR. Just me, your funnel, and a shared screen. Show
              up with your numbers — you leave with a roadmap.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <CalendlyEmbed
              qualification={qualification}
              leadId={leadId}
            />
          </div>

          {/* Trust block */}
          <div className="max-w-5xl mx-auto mt-16">
            <p className="text-center text-[11px] uppercase tracking-[0.22em] text-cyan-300 font-bold mb-8">
              What you walk away with
            </p>
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
              {TRUST_CARDS.map((c) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
                      },
                    }}
                    className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 transition"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(30,136,229,0.18), rgba(20,184,166,0.18))",
                        border: "1px solid rgba(126,228,255,0.28)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {c.body}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--bg, #061827)" }}
      >
        <div className="container-x px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
              Before you book
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-white leading-[1.08]">
              The six questions{" "}
              <span
                className="italic"
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
                I get most.
              </span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-2.5">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between text-left p-5 md:p-6"
                    aria-expanded={open}
                  >
                    <span className="text-base md:text-lg font-semibold text-white pr-4">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-300 flex-shrink-0 transition-transform motion-reduce:transition-none ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-fg-muted leading-relaxed">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-14">
            <p className="text-sm text-fg-faint mb-4">
              Still reading? You&apos;ve got more than enough info.
            </p>
            <button
              type="button"
              onClick={() => scrollTo(calRef)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              <CalendarClock className="w-4 h-4" />
              Grab my slot
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
      <div className="text-lg font-extrabold text-cyan-300 tracking-tight">
        {value}
      </div>
      <div className="text-[10px] uppercase text-fg-faint tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
}
