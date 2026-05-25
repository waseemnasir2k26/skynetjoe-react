"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { Fraunces, Onest, IBM_Plex_Mono } from "next/font/google";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Check,
  X,
  Quote,
  Clock,
  MapPin,
} from "lucide-react";

/**
 * Cream editorial pivot — anti-AI-slop test on /lp/audit only.
 *
 *  - Cream paper ground (#F2EFE6) · ink (#1A1A1A) · terracotta accent (#C66B3F)
 *  - Playfair Display + Inter Tight + JetBrains Mono · serif italic for accent words
 *  - SVG paper grain at 10% multiply blend
 *  - Asymmetric editorial grid · no centered hero
 *  - Flat terracotta CTAs · 2px radius · no glow · no gradient text
 *  - Mono metadata eyebrows with em-dash prefix (drops Lucide chip+icon combo)
 *  - 1deg / -1deg rotation on cards and portrait for hand-set feel
 *
 * Rollback: replace this file with the previous dark-navy version.
 */

// Fraunces — variable serif with optical sizing + dramatic swashy italics.
// Stripe-tier editorial, far less overused than Playfair.
const serif = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

// Onest — modern geometric sans. Distinctive without being weird.
// Avoids the Inter / Geist / Lexend "AI agency default" tell.
const sans = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// IBM Plex Mono — premium-feel mono, instantly recognizable as "designed for"
// not "default code font". Used by IBM brand work, Order Type Foundry refs.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const C = {
  cream: "#F2EFE6",
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  terra2: "#B85A30",
  sage: "#8A9A7B",
  oxblood: "#6B2C2C",
  ochre: "#C9A96E",
  rule: "rgba(26,26,26,0.12)",
  ruleSoft: "rgba(26,26,26,0.06)",
};

const PAINS = [
  "Leads ghost you because nobody replies in under 90 seconds",
  "Your team copy-pastes the same data between 4 tools every day",
  "Your website looks like 2019 and the contact form is silently broken",
  "You spent $4k on \"AI consultants\" and got a PDF you never opened",
];

const BENEFITS = [
  {
    n: "01",
    title: "Find the leak",
    body:
      "30-min audit walks your funnel + stack live. Top 3 fixable losses by dollar value — not vague advice.",
  },
  {
    n: "02",
    title: "Plug it in 14 days",
    body:
      "Fixed-price scope back in your inbox in 48 hours. Most builds ship in 5-14 days, paid 50/50.",
  },
  {
    n: "03",
    title: "Keep the plan either way",
    body:
      "Not the right fit? Walk with a written 60-day plan + 3 vetted operator referrals. Free.",
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
      "We'd tried three automation contractors before. Waseem was the first who asked us to print our inbox and walk through 100 threads with him before writing a single node.",
    image: "/case-studies/eu-logistics-email-triage-n8n.jpg",
  },
  {
    metric: "8 → 17",
    label: "monthly bookings",
    client: "Christelle · Wellness practitioner, Ubud",
    quote:
      "I stopped explaining the same things in DMs five times a day. The site does it now, and in my voice.",
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
    a: "Yes. No payment, no card, no \"upgrade to access.\" The 30 min costs you nothing and you walk with the audit findings in writing whether you hire me or not.",
  },
  {
    q: "Is this just a sales pitch in disguise?",
    a: "No. I run audits, not pitches. About 60% of people I audit don't hire me on the call — they sit on it for 2-6 weeks, then come back.",
  },
  {
    q: "What if my business is too small / too big?",
    a: "Too small (<$2k builds): I point you to my productized offers or a vetted operator. Too big (enterprise of 200+): I point you to an agency partner. Either way you get the audit + a real referral.",
  },
  {
    q: "How fast can you start?",
    a: "Same-week kickoff if scope is locked + 50% deposit in by Friday. Most builds ship 5-14 days after kickoff. 4 builds a month max.",
  },
  {
    q: "What tools do you actually use?",
    a: "n8n (self-hosted), GoHighLevel, Claude + GPT-4o, Next.js + Vercel, Shopify, ManyChat. I don't sell tools — I sell the system.",
  },
];

// Inline SVG grain — paper texture overlay
const GRAIN_URI =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/></svg>\")";

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
    if (typeof window !== "undefined") {
      window.location.href = "/discovery-call#qualify";
    }
  }, []);

  return (
    <div
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      style={{
        background: C.cream,
        color: C.ink,
        fontFamily: "var(--font-sans)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Paper grain overlay — fixed, full viewport */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: GRAIN_URI,
          opacity: 0.10,
          mixBlendMode: "multiply",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Top utility strip */}
      <div
        style={{
          background: C.terra,
          color: C.cream3,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          textAlign: "center",
          padding: "10px 16px",
          position: "relative",
          zIndex: 2,
        }}
      >
        — free 30-min audit · yes/no in 48h · 4 builds left this month
      </div>

      {/* ============================================================
          HERO — asymmetric editorial
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
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
          }}
          className="hero-grid"
        >
          <style>{`
            @media (min-width: 900px) {
              .hero-grid { grid-template-columns: 7fr 5fr !important; align-items: end !important; }
            }
          `}</style>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: C.terra,
                marginBottom: 24,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: C.terra,
                  display: "inline-block",
                }}
              />
              Field notes · audit · 2026
            </div>

            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 6.5vw, 76px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
                color: C.ink,
                margin: "0 0 24px",
              }}
            >
              Your funnel is leaking money.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: C.terra,
                  fontWeight: 500,
                }}
              >
                I&apos;ll find it.
              </em>
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
              30-min audit. Top 3 leaks ranked by dollar value. Fixed-price
              scope back in 48 hours. One operator from Bali. No SDR, no deck,
              no fake urgency.
            </p>

            {/* Trust strip — mono, minimal */}
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
              <span style={{ color: C.ochre }}>
                <Star
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    verticalAlign: "-2px",
                    marginRight: 4,
                    fill: C.ochre,
                    stroke: "none",
                  }}
                />
                4.9
              </span>
              <span style={{ margin: "0 12px", color: C.rule }}>·</span>
              <span><span style={{ color: C.ink }}>180+</span> workflows</span>
              <span style={{ margin: "0 12px", color: C.rule }}>·</span>
              <span><span style={{ color: C.ink }}>9</span> countries</span>
              <span style={{ margin: "0 12px", color: C.rule }}>·</span>
              <span>solo since 2019</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button
                type="button"
                onClick={goBook}
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
                  transition: "background 0.18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.terra2)}
                onMouseLeave={(e) => (e.currentTarget.style.background = C.terra)}
              >
                Book my free audit
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
              <button
                type="button"
                onClick={scrollToCTA}
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
                }}
              >
                See what&apos;s inside
              </button>
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: C.inkFaint,
                marginTop: 20,
              }}
            >
              — Bali hours · GMT+8 · usually books within 48-72 hours
            </div>
          </div>

          {/* Portrait — polaroid-style with rotation */}
          <div>
            <figure
              style={{
                margin: 0,
                transform: "rotate(-1.2deg)",
                background: C.cream3,
                padding: 10,
                border: `1px solid ${C.rule}`,
                boxShadow: "0 18px 48px rgba(26,37,64,0.18)",
                maxWidth: 400,
                marginLeft: "auto",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/portraits/waseem-builder-hero.jpg"
                  alt="Waseem Nasir — Founder, SkynetLabs"
                  fill
                  priority
                  sizes="(min-width: 900px) 400px, 90vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: "sepia(0.10) saturate(0.95) contrast(1.02)",
                  }}
                />
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
            </figure>
          </div>
        </div>
      </section>

      {/* ============================================================
          PAIN AGITATION
          ============================================================ */}
      <section
        style={{
          padding: "72px 0",
          borderBottom: `1px solid ${C.rule}`,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.oxblood,
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.oxblood }} />
            Sound familiar?
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: C.ink,
              marginBottom: 36,
              maxWidth: "22ch",
            }}
          >
            You&apos;re probably losing money on{" "}
            <em style={{ fontStyle: "italic", color: C.oxblood }}>
              at least one of these.
            </em>
          </h2>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
            {PAINS.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "24px 1fr",
                  gap: 18,
                  alignItems: "start",
                  padding: "18px 0",
                  borderBottom: `1px solid ${C.ruleSoft}`,
                  fontSize: 17,
                  color: C.ink2,
                  lineHeight: 1.55,
                }}
              >
                <X
                  style={{
                    width: 18,
                    height: 18,
                    color: C.oxblood,
                    marginTop: 3,
                  }}
                />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>

          <button
            type="button"
            onClick={goBook}
            style={{
              background: C.terra,
              color: C.cream3,
              border: "none",
              padding: "14px 24px",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            I&apos;ll fix at least one — book my audit
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </section>

      {/* ============================================================
          BENEFITS
          ============================================================ */}
      <section
        style={{
          padding: "72px 0",
          borderBottom: `1px solid ${C.rule}`,
          background: C.cream3,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.terra }} />
            Here&apos;s the shift
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: C.ink,
              marginBottom: 40,
              maxWidth: "26ch",
            }}
          >
            Three things change after our{" "}
            <em style={{ fontStyle: "italic", color: C.terra }}>
              30 minutes together.
            </em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{
                  background: C.cream2,
                  border: `1px solid ${C.rule}`,
                  padding: "28px 28px 32px",
                  transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 36,
                    fontWeight: 500,
                    color: C.terra,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {b.n}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 22,
                    fontWeight: 600,
                    color: C.ink,
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    color: C.ink2,
                    fontSize: 14,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {b.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PROOF
          ============================================================ */}
      <section
        style={{
          padding: "72px 0",
          borderBottom: `1px solid ${C.rule}`,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.sage,
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.sage }} />
            Real shipped builds
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: C.ink,
              marginBottom: 40,
              maxWidth: "22ch",
            }}
          >
            Same call, same audit,{" "}
            <em style={{ fontStyle: "italic", color: C.terra }}>
              these results.
            </em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {PROOFS.map((p, i) => (
              <motion.article
                key={p.client}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{
                  background: C.cream3,
                  border: `1px solid ${C.rule}`,
                  display: "flex",
                  flexDirection: "column",
                  transform: i === 1 ? "rotate(0.3deg)" : "rotate(-0.3deg)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    overflow: "hidden",
                    borderBottom: `1px solid ${C.rule}`,
                  }}
                >
                  <Image
                    src={p.image}
                    alt={p.client}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    style={{
                      objectFit: "cover",
                      filter: "sepia(0.10) saturate(0.92)",
                    }}
                  />
                </div>
                <div style={{ padding: "24px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 32,
                      fontWeight: 600,
                      color: C.terra,
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {p.metric}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: C.inkFaint,
                      marginBottom: 16,
                    }}
                  >
                    — {p.label}
                  </div>
                  <Quote
                    style={{
                      width: 16,
                      height: 16,
                      color: C.terra,
                      marginBottom: 8,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: C.ink,
                      flex: 1,
                      marginBottom: 14,
                    }}
                  >
                    &ldquo;{p.quote}&rdquo;
                  </p>
                  <footer
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: C.inkFaint,
                    }}
                  >
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
        style={{
          padding: "72px 0",
          borderBottom: `1px solid ${C.rule}`,
          background: C.cream3,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.terra }} />
            What you actually get
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: C.ink,
              marginBottom: 32,
              maxWidth: "20ch",
            }}
          >
            Five things in the box.{" "}
            <em style={{ fontStyle: "italic", color: C.terra }}>All free.</em>
          </h2>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px" }}>
            {WHATS_INSIDE.map((line, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "28px 1fr",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: `1px solid ${C.ruleSoft}`,
                  fontSize: 16,
                  color: C.ink,
                  lineHeight: 1.5,
                }}
              >
                <Check
                  style={{
                    width: 18,
                    height: 18,
                    color: C.terra,
                    marginTop: 3,
                  }}
                />
                <span>{line}</span>
              </motion.li>
            ))}
          </ul>

          <button
            type="button"
            onClick={goBook}
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
            onMouseEnter={(e) => (e.currentTarget.style.background = C.terra2)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.terra)}
          >
            Claim my free audit slot
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: C.inkFaint,
              marginTop: 14,
            }}
          >
            — 4 builds left this month · bookings move fast on Mondays
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS
          ============================================================ */}
      <section
        style={{
          padding: "72px 0",
          borderBottom: `1px solid ${C.rule}`,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.terra }} />
            How it works
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: C.ink,
              marginBottom: 40,
              maxWidth: "20ch",
            }}
          >
            Three steps,{" "}
            <em style={{ fontStyle: "italic", color: C.terra }}>no surprises.</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                style={{
                  background: C.cream2,
                  border: `1px solid ${C.rule}`,
                  padding: "28px",
                  transform: i === 1 ? "rotate(0.3deg)" : "rotate(-0.3deg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 44,
                    fontWeight: 500,
                    color: C.terra,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: C.ink,
                    marginBottom: 8,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: C.ink2,
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section
        style={{
          padding: "72px 0",
          borderBottom: `1px solid ${C.rule}`,
          background: C.cream3,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.terra }} />
            Before you book
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: C.ink,
              marginBottom: 32,
              maxWidth: "20ch",
            }}
          >
            The questions{" "}
            <em style={{ fontStyle: "italic", color: C.terra }}>I get most.</em>
          </h2>

          <div>
            {FAQS.map((f) => (
              <details
                key={f.q}
                style={{
                  borderBottom: `1px solid ${C.rule}`,
                  padding: "20px 0",
                  cursor: "pointer",
                }}
              >
                <summary
                  style={{
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    fontFamily: "var(--font-serif)",
                    fontSize: 19,
                    fontWeight: 600,
                    color: C.ink,
                    letterSpacing: "-0.005em",
                  }}
                >
                  <span>{f.q}</span>
                  <span style={{ color: C.terra, fontSize: 22, lineHeight: 1 }}>+</span>
                </summary>
                <p
                  style={{
                    marginTop: 14,
                    color: C.ink2,
                    fontSize: 15,
                    lineHeight: 1.65,
                  }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section
        ref={ctaRef}
        style={{
          padding: "88px 0 100px",
          background: C.ink,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              marginBottom: 20,
            }}
          >
            — 4 audit slots left this month
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: C.cream3,
              marginBottom: 20,
            }}
          >
            Every week you wait,{" "}
            <em style={{ fontStyle: "italic", color: C.terra }}>
              the bleed gets bigger.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(242, 239, 230, 0.78)",
              maxWidth: "44ch",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            30 free minutes. 3 concrete plays. A scope in 48 hours. Yes, no, or
            referral — you walk with the findings either way.
          </p>
          <button
            type="button"
            onClick={goBook}
            style={{
              background: C.terra,
              color: C.cream3,
              border: "none",
              padding: "18px 32px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "background 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.terra2)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.terra)}
          >
            Book my free 30-min audit
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(242, 239, 230, 0.55)",
              marginTop: 22,
            }}
          >
            — no card · no SDR · no spam · just the audit
          </div>
        </div>
      </section>
    </div>
  );
}
