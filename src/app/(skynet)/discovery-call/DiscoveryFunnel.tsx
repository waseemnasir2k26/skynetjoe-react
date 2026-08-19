"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarClock,
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

/**
 * Cream editorial pivot 2026-05-25 — discovery call funnel.
 * Mirrors /lp/audit visual system:
 *  - cream paper ground, ink type, terracotta accent
 *  - Fraunces serif headlines with italic terracotta accent words
 *  - mono em-dash eyebrows
 *  - flat 2px-radius terracotta buttons, no glow
 *  - polaroid portrait with rotation
 *  - cream-2 cards with 1px ink border + alternating rotation
 *  - cream-3 form inputs with 1px ink border, focus terracotta
 */

const QUAL_SECTION_ID = "qualify";

const C = {
  cream: "#F2EFE6",
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#56564F", // AA: ~5:1 on cream (was #6B6B65, ~4.0:1, failed)
  terra: "#C66B3F", // backgrounds / borders / icons only
  terraAA: "#A8451F", // accent TEXT — clears 4.5:1 on cream
  terra2: "#B85A30",
  sage: "#8A9A7B",
  oxblood: "#6B2C2C",
  ochre: "#C9A96E",
  rule: "rgba(26,26,26,0.12)",
  ruleSoft: "rgba(26,26,26,0.06)",
};

const STEPS = [
  { id: "brief", label: "Share the brief", short: "Brief" },
  { id: "pick", label: "Pick a slot", short: "Pick" },
  { id: "plan", label: "Get the plan", short: "Plan" },
];

const TRUST_CARDS = [
  {
    icon: Compass,
    title: "Your 60-day roadmap",
    body: "Your top 3 fixes, ranked by money recovered, biggest first. Sequenced so you ship the highest-impact one first.",
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
    a: "Most folks on this call aren't. Plenty take the audit, sit on it for a few weeks, then come back when budget clears. I'd rather you book later than buy something you regret.",
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
      style={{
        position: "sticky",
        top: 64,
        zIndex: 30,
        background: C.cream3,
        borderBottom: `1px solid ${C.rule}`,
      }}
    >
      <div className="container-x px-6 py-3">
        <ol className="flex items-center justify-center gap-2 sm:gap-4">
          {STEPS.map((s, i) => {
            const done = i < activeStep;
            const current = i === activeStep;
            return (
              <li key={s.id} className="flex items-center gap-2 sm:gap-3">
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold transition-all"
                  style={{
                    background: done || current ? C.terra : C.cream2,
                    color: done || current ? C.cream3 : C.inkFaint,
                    border: `1px solid ${done || current ? C.terra : C.rule}`,
                  }}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </span>
                <span
                  className="text-xs sm:text-sm font-semibold transition-colors"
                  style={{
                    color: current ? C.ink : done ? C.terra : C.inkFaint,
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.10em",
                    fontSize: 11,
                  }}
                >
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.short}</span>
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    className="w-6 sm:w-12 h-px transition-colors"
                    style={{ background: done ? C.terra : C.rule }}
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
  const [leadId, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    const ts = Date.now().toString(36);
    const rnd = Math.random().toString(36).slice(2, 8);
    setLeadId(`lead_${ts}_${rnd}`);
  }, []);
  const [qualification, setQualification] = useState<QualifierState | null>(
    null,
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState(0);

  const qualRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ref.current.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    },
    [],
  );

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
        // Inspect the response. This previously ignored it entirely, so a 429
        // or a 502 looked identical to success and the funnel advanced anyway,
        // discarding the answers the visitor had just typed.
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId,
            source: "discovery-call",
            qualification: state,
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          console.error(
            "[discovery-call] qualifier POST rejected — lead may not have been recorded",
            { status: res.status },
          );
        }
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

  // `color` drives the decorative rule (large/non-text); accent TEXT always
  // uses the AA-safe terracotta so micro-copy clears 4.5:1 on cream.
  const eyebrow = (color: string, label: string) => (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        color: color === C.terra ? C.terraAA : color,
        marginBottom: 16,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span style={{ width: 28, height: 1, background: color }} />
      {label}
    </div>
  );

  return (
    <div
      style={{
        background: C.cream,
        color: C.ink,
        fontFamily: "var(--font-sans)",
      }}
    >
      <StickyProgress activeStep={activeStep} />

      {/* ============================================================
          HERO — cream paper, polaroid portrait
          ============================================================ */}
      <section
        style={{
          padding: "72px 0 80px",
          borderBottom: `1px solid ${C.rule}`,
          background: C.cream3,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="container-x px-6">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {eyebrow(C.terra, "Field notes · discovery · 2026")}

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 6.5vw, 72px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.04,
                  color: C.ink,
                  margin: "0 0 24px",
                }}
              >
                Find what&apos;s costing you.{" "}
                <span
                  style={{
                    fontStyle: "normal",
                    color: C.terraAA,
                    fontWeight: 700,
                  }}
                >
                  Fixed in 14 days.
                </span>
              </h1>

              <p
                style={{
                  fontSize: 19,
                  color: C.ink2,
                  maxWidth: "52ch",
                  lineHeight: 1.55,
                  marginBottom: 28,
                }}
              >
                30-minute audit. 3 concrete plays you can ship this quarter. A
                fixed-price scope back in your inbox 48 hours later. No deck. No
                SDR. No fake urgency.
              </p>

              {/* Trust strip */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: C.inkFaint,
                  marginBottom: 28,
                }}
              >
                <span>
                  <span style={{ color: C.ink }}>180+</span> workflows
                </span>
                <span style={{ margin: "0 12px", color: C.rule }}>·</span>
                <span>
                  <span style={{ color: C.ink }}>9</span> countries
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollTo(qualRef)}
                  style={{
                    background: C.terra,
                    color: C.cream3,
                    border: "none",
                    padding: "16px 28px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Start the brief
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <button
                  type="button"
                  onClick={() => scrollTo(calRef)}
                  style={{
                    background: "transparent",
                    color: C.ink,
                    border: `1px solid ${C.ink}`,
                    padding: "15px 26px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <CalendarClock className="w-4 h-4" />
                  Skip to calendar
                </button>
              </div>

              {/* Pull quote — cream-2 paper */}
              <blockquote
                style={{
                  background: C.cream2,
                  border: `1px solid ${C.rule}`,
                  padding: 20,
                  maxWidth: 560,
                  margin: 0,
                  borderRadius: 2,
                  transform: "rotate(-0.4deg)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Quote
                    style={{
                      width: 18,
                      height: 18,
                      color: C.terra,
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "normal",
                        fontSize: 17,
                        lineHeight: 1.45,
                        color: C.ink,
                        margin: 0,
                      }}
                    >
                      Routine reply time went from 6 hours to{" "}
                      <span style={{ color: C.terraAA, fontWeight: 600 }}>
                        6 minutes.
                      </span>
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: C.inkFaint,
                        marginTop: 8,
                      }}
                    >
                      — Operations Director · Logistics group, EU
                    </p>
                  </div>
                </div>
              </blockquote>
            </motion.div>

            {/* Polaroid portrait */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:sticky lg:top-[140px]"
            >
              <figure
                style={{
                  margin: 0,
                  transform: "rotate(-1.2deg)",
                  background: C.cream3,
                  padding: 10,
                  border: `1px solid ${C.rule}`,
                  boxShadow: "0 18px 48px rgba(26,26,26,0.14)",
                  maxWidth: 420,
                  marginLeft: "auto",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    overflow: "hidden",
                    background: C.cream2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      width: 116,
                      height: 116,
                      borderRadius: "50%",
                      background: "#A8451F",
                      color: C.cream3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: 42,
                      letterSpacing: "0.04em",
                    }}
                  >
                    SL
                  </div>
                </div>
                <figcaption
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.10em",
                    color: C.inkFaint,
                    textAlign: "center",
                    paddingTop: 12,
                  }}
                >
                  Waseem · founder · Bali · GMT+8
                </figcaption>
                <div style={{ padding: "12px 6px 6px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "normal",
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: C.ink2,
                      margin: "0 0 14px",
                    }}
                  >
                    &ldquo;You don&apos;t get an SDR. You get me on Zoom with
                    your funnel pulled up on my second monitor.&rdquo;
                  </p>
                  <div
                    className="grid grid-cols-3 gap-2"
                    style={{
                      borderTop: `1px solid ${C.ruleSoft}`,
                      paddingTop: 12,
                    }}
                  >
                    <Stat value="180+" label="Workflows" />
                    <Stat value="40+" label="Sites" />
                    <Stat value="9" label="Countries" />
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: C.inkFaint,
                      display: "flex",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <MapPin style={{ width: 11, height: 11 }} />
                      Bali · GMT+8
                    </span>
                    <span style={{ color: C.rule }}>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock style={{ width: 11, height: 11 }} />
                      Solo since 2019
                    </span>
                  </div>
                </div>
              </figure>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          STEP 1 — Qualifier (cream bg)
          ============================================================ */}
      <section
        id={QUAL_SECTION_ID}
        ref={qualRef}
        style={{
          padding: "80px 0",
          borderBottom: `1px solid ${C.rule}`,
          background: C.cream,
          position: "relative",
          zIndex: 2,
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
            <div style={{ display: "inline-block", textAlign: "left" }}>
              {eyebrow(C.terra, "Step 1 · The brief")}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: C.ink,
                margin: "0 0 16px",
              }}
            >
              Seven quick questions.{" "}
              <span style={{ color: C.terraAA, fontWeight: 700 }}>
                Ninety seconds.
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: C.ink2,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              I read these before our call so we don&apos;t burn 20 minutes on
              context. Rather skip? Hit{" "}
              <strong style={{ fontWeight: 700, color: C.ink }}>
                Skip to calendar
              </strong>{" "}
              on any question.
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
                  style={{
                    background: C.cream2,
                    border: `1px solid ${C.rule}`,
                    padding: 32,
                    textAlign: "center",
                    transform: "rotate(-0.3deg)",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: C.cream3,
                      border: `1px solid ${C.terra}`,
                      marginBottom: 16,
                    }}
                  >
                    <ShieldCheck
                      style={{ width: 24, height: 24, color: C.terra }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 28,
                      fontWeight: 600,
                      color: C.ink,
                      letterSpacing: "-0.01em",
                      marginBottom: 8,
                    }}
                  >
                    Brief saved.
                  </h3>
                  <p style={{ fontSize: 14, color: C.ink2, marginBottom: 24 }}>
                    I&apos;ll have your answers open during the call so we go
                    straight to the audit.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo(calRef)}
                    style={{
                      background: C.terra,
                      color: C.cream3,
                      border: "none",
                      padding: "14px 24px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: "pointer",
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
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
          STEP 2 — Calendly (cream-2 section, cream-3 paper container)
          ============================================================ */}
      <section
        id={CALENDLY_SECTION_ID}
        ref={calRef}
        style={{
          padding: "80px 0",
          borderBottom: `1px solid ${C.rule}`,
          background: C.cream2,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="container-x px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div style={{ display: "inline-block", textAlign: "left" }}>
              {eyebrow(C.terra, "Step 2 · Pick your slot")}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: C.ink,
                margin: "0 0 16px",
              }}
            >
              Thirty minutes.{" "}
              <span style={{ color: C.terraAA, fontWeight: 700 }}>
                One real audit.
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: C.ink2,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              No deck. No SDR. Just me, your funnel, and a shared screen. Show
              up with your numbers — you leave with a roadmap.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <CalendlyEmbed qualification={qualification} leadId={leadId} />
          </div>

          {/* Trust cards — cream-2 with rotation */}
          <div className="max-w-5xl mx-auto mt-16">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: C.terraAA,
                marginBottom: 28,
                textAlign: "center",
              }}
            >
              — What you walk away with
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
              {TRUST_CARDS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1] as const,
                        },
                      },
                    }}
                    style={{
                      background: C.cream3,
                      border: `1px solid ${C.rule}`,
                      padding: 24,
                      transform:
                        i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: C.cream2,
                        border: `1px solid ${C.rule}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                      }}
                    >
                      <Icon style={{ width: 20, height: 20, color: C.terra }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 17,
                        fontWeight: 600,
                        color: C.ink,
                        marginBottom: 8,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {c.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: C.ink2,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
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
          FAQ — cream-2 cards with terracotta + icon
          ============================================================ */}
      <section
        style={{
          padding: "80px 0",
          background: C.cream,
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
            <div style={{ display: "inline-block", textAlign: "left" }}>
              {eyebrow(C.terra, "Before you book")}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: C.ink,
                margin: 0,
              }}
            >
              The six questions{" "}
              <span style={{ color: C.terraAA, fontWeight: 700 }}>
                I get most.
              </span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  style={{
                    background: C.cream2,
                    border: `1px solid ${C.rule}`,
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: 20,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    aria-expanded={open}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 600,
                        color: C.ink,
                        paddingRight: 16,
                      }}
                    >
                      {f.q}
                    </span>
                    <ChevronDown
                      style={{
                        width: 20,
                        height: 20,
                        color: C.terra,
                        flexShrink: 0,
                        transition: "transform 0.2s",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      }}
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
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            padding: "0 20px 20px",
                            fontSize: 15,
                            color: C.ink2,
                            lineHeight: 1.65,
                            margin: 0,
                          }}
                        >
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
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: C.inkFaint,
                marginBottom: 16,
              }}
            >
              — Still reading? You&apos;ve got more than enough info.
            </p>
            <button
              type="button"
              onClick={() => scrollTo(calRef)}
              style={{
                background: C.terra,
                color: C.cream3,
                border: "none",
                padding: "14px 24px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CalendarClock className="w-4 h-4" />
              Grab my slot
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "normal",
          fontSize: 18,
          fontWeight: 600,
          color: "#A8451F",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "#56564F",
          marginTop: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}
