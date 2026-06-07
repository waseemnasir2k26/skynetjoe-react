"use client";

import Link from "next/link";
import { ArrowRight, X, Check, Hourglass, UserX, Gauge } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ShopifyStore, RetailCommerce } from "@/components/illustrations";

/**
 * VibeCodedSitesLP — bespoke landing page for /services/vibe-coded-sites
 *
 * Redesign 2026-06-02. Client component for cinematic Framer Motion.
 *  - NO photos / NO founder face — Lucide icons + bespoke ShopifyStore / RetailCommerce SVGs.
 *  - Plain-language, outcome-first hero. Tool names kept to a quiet sub-line.
 *  - AA: accent TEXT = var(--terracotta-aa); raw var(--terracotta) only for
 *    backgrounds and the large display metric.
 *  - "Leak"/"plug" metaphor removed everywhere.
 */

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={
        reduce ? false : { opacity: 0, y: 28, clipPath: "inset(0 0 12% 0)" }
      }
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Stagger({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}

function Item({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}

const PAINS = [
  {
    icon: Hourglass,
    title: "A template site from years ago",
    body: "It looks tired and sales are flat. No developer wants to touch the old code, and you don't blame them.",
  },
  {
    icon: UserX,
    title: "The designer vanished mid-rebuild",
    body: "You're left with half a design, a half-finished build, and an invoice from someone who won't reply.",
  },
  {
    icon: Gauge,
    title: "It crawls on a phone",
    body: "Pages take seconds to load on mobile. Slow sites get skipped — by buyers and by AI answers alike.",
  },
];

const BEFORE = [
  "Built on a platform that locks you to one tool",
  "The code lives in a vendor's cloud, not yours",
  "Slow on phones, heavy with extra requests",
  "Behind-the-scenes data patched from several plugins",
  "Every small change means another invoice",
];

const AFTER = [
  "Built on modern code you fully own",
  "Versioned, preview-before-live, easy to roll back",
  "Loads in under two seconds on a phone",
  "Clean data built right into each section",
  "You edit your own copy — no invoice",
];

const FACTS = [
  "You own the code, the deploy and the design",
  "Fast on mobile — loads in under two seconds",
  "Edit your own copy, no invoice required",
];

export default function VibeCodedSitesLP() {
  return (
    <div
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        position: "relative",
      }}
    >
      <style>{`
        .lp-hero-grid { display: grid; grid-template-columns: 1fr; gap: clamp(28px, 6vw, 44px); align-items: center; }
        @media (min-width: 900px) { .lp-hero-grid { grid-template-columns: 7fr 5fr; align-items: center; } }
        .lp-illo { width: 100%; height: auto; aspect-ratio: 16 / 10; border-radius: 12px; display: block; box-shadow: 0 22px 60px rgba(26,37,64,0.18); border: 1px solid rgba(26,26,26,0.10); }
        .lp-ba-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 760px) { .lp-ba-grid { grid-template-columns: 1fr 1fr; } }
        .lp-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
      `}</style>

      {/* Top utility strip */}
      <div
        style={{
          background: "var(--terracotta)",
          color: "var(--cream-3)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          textAlign: "center",
          padding: "10px 16px",
        }}
      >
        — A fast site you own outright · shipped in 11 days
      </div>

      {/* HERO */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0 clamp(56px, 12vw, 80px)",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-3)",
          overflow: "hidden",
        }}
      >
        <div
          className="lp-hero-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
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
                  background: "var(--terracotta-aa)",
                  display: "inline-block",
                }}
              />
              Custom-built sites · 2026
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 8vw, 72px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                margin: "0 0 24px",
                maxWidth: "16ch",
              }}
            >
              A site that loads fast and{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                belongs to you.
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(17px, 2.5vw, 19px)",
                color: "var(--ink-2)",
                maxWidth: "52ch",
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              A custom-built site, shipped in 11 days, that you own outright. It
              loads in under two seconds, you edit your own copy without an
              invoice, and nobody can lock you out of your own work.
            </p>
            <Link href="/discovery-call" style={primaryBtn}>
              Book a free 30-min audit
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <div style={subline}>— Bali hours GMT+8 · 8-hour weekday reply</div>
            <div
              style={{
                marginTop: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
              }}
            >
              Tools we use: Next.js · Vercel · Claude Code
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 36, rotate: -1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            aria-hidden
          >
            <ShopifyStore className="lp-illo" />
          </motion.div>
        </div>
      </section>

      {/* PAIN CARDS */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-2)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <Eyebrow color="var(--oxblood)">Why sites stall</Eyebrow>
            <H2>
              Three reasons your site{" "}
              <span style={{ color: "var(--oxblood)", fontWeight: 700 }}>
                never gets the rebuild.
              </span>
            </H2>
          </Reveal>
          <Stagger className="lp-card-grid">
            {PAINS.map((p, i) => (
              <Item
                key={p.title}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 28,
                  transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                }}
              >
                <p.icon
                  style={{
                    width: 26,
                    height: 26,
                    color: "var(--oxblood)",
                    marginBottom: 14,
                  }}
                />
                <h3 style={cardH3}>{p.title}</h3>
                <p style={cardBody}>{p.body}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* BIG PROOF NUMBER */}
      <section
        style={{
          padding: "clamp(56px, 12vw, 96px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream)",
          textAlign: "center",
        }}
      >
        <Reveal
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <div style={proofEyebrow}>
            — Our own platform move · old site to new
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(96px, 18vw, 180px)",
              lineHeight: 0.9,
              color: "var(--terracotta)",
              letterSpacing: "-0.04em",
              marginBottom: 18,
            }}
          >
            915
          </div>
          <p style={proofDetail}>
            pages moved to modern, fast code in one cutover. Same look, far
            quicker, and yours to edit.
          </p>
        </Reveal>
      </section>

      {/* WHAT YOU GET — illustration + facts (replaces photo case panel) */}
      <section
        style={{
          padding: "clamp(48px, 11vw, 80px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-3)",
        }}
      >
        <div
          className="lp-hero-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <Eyebrow color="var(--terracotta-aa)">What we hand over</Eyebrow>
            <H2>
              A premium site,{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                shipped in days.
              </span>
            </H2>
            <p
              style={{
                ...cardBody,
                fontSize: 16,
                maxWidth: "44ch",
                marginBottom: 20,
              }}
            >
              &ldquo;The demo looked like a top-tier custom build. He shipped it
              in a weekend from a Canggu villa. We hired him before the
              follow-up call.&rdquo;
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {FACTS.map((f) => (
                <li key={f} style={factLi}>
                  <Check
                    style={{
                      width: 16,
                      height: 16,
                      color: "var(--sage)",
                      marginTop: 2,
                    }}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div style={{ ...subline, marginTop: 18 }}>
              — Niche-demo round · 20+ sites shipped 2025-26
            </div>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            aria-hidden
          >
            <RetailCommerce className="lp-illo" />
          </motion.div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section
        style={{
          padding: "clamp(48px, 11vw, 80px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-2)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <Eyebrow color="var(--terracotta-aa)">Before vs after</Eyebrow>
            <H2>
              What changes the day{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                you own the code.
              </span>
            </H2>
          </Reveal>
          <Stagger className="lp-ba-grid">
            <BeforeCard label="The site you're stuck with" items={BEFORE} />
            <AfterCard label="The site you ship from" items={AFTER} />
          </Stagger>
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCta
        h2={
          <>
            Drop the old template.{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              Get a site that's yours.
            </span>
          </>
        }
        body="A free 30-minute check-up. Tell us the niche, the funnel, the deadline. Fixed scope back in 48 hours, repo handed over on day 11."
      />
    </div>
  );
}

// ── shared local presentational helpers ────────────────────────────────────
const primaryBtn: React.CSSProperties = {
  background: "var(--terracotta)",
  color: "var(--cream-3)",
  padding: "16px 28px",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 2,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  textDecoration: "none",
  minHeight: 44,
};
const subline: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--ink-faint)",
  marginTop: 18,
};
const cardH3: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 22,
  fontWeight: 600,
  color: "var(--ink)",
  marginBottom: 10,
  letterSpacing: "-0.01em",
};
const cardBody: React.CSSProperties = {
  color: "var(--ink-2)",
  fontSize: 15,
  lineHeight: 1.6,
  margin: 0,
};
const factLi: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "16px 1fr",
  gap: 10,
  padding: "7px 0",
  fontSize: 15,
  color: "var(--ink)",
  lineHeight: 1.55,
};
const proofEyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "var(--ink-faint)",
  marginBottom: 14,
};
const proofDetail: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(17px, 3vw, 22px)",
  color: "var(--ink-2)",
  lineHeight: 1.45,
  maxWidth: "34ch",
  margin: "0 auto",
};

function Eyebrow({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        color,
        marginBottom: 16,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          width: 28,
          height: 1,
          background: color,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.12,
        color: "var(--ink)",
        marginBottom: 40,
        maxWidth: "26ch",
      }}
    >
      {children}
    </h2>
  );
}

function BeforeCard({ label, items }: { label: string; items: string[] }) {
  return (
    <Item
      style={{
        background: "var(--cream-2)",
        padding: 28,
        border: "1px solid rgba(26,26,26,0.12)",
        borderLeft: "3px solid var(--oxblood)",
      }}
    >
      <div style={{ ...cardMeta, color: "var(--oxblood)" }}>— Before</div>
      <h3 style={{ ...cardH3, fontSize: 20 }}>{label}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((b) => (
          <li key={b} style={{ ...listLi, color: "var(--ink-2)" }}>
            <X
              style={{
                width: 14,
                height: 14,
                color: "var(--oxblood)",
                marginTop: 4,
              }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Item>
  );
}

function AfterCard({ label, items }: { label: string; items: string[] }) {
  return (
    <Item
      style={{
        background: "var(--cream-3)",
        padding: 28,
        border: "1px solid rgba(26,26,26,0.12)",
        borderLeft: "3px solid var(--sage)",
      }}
    >
      <div style={{ ...cardMeta, color: "var(--oxblood)" }}>— After</div>
      <h3 style={{ ...cardH3, fontSize: 20 }}>{label}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((a) => (
          <li key={a} style={{ ...listLi, color: "var(--ink)" }}>
            <Check
              style={{
                width: 14,
                height: 14,
                color: "var(--sage)",
                marginTop: 4,
              }}
            />
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </Item>
  );
}

const cardMeta: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  marginBottom: 12,
};
const listLi: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "18px 1fr",
  gap: 12,
  padding: "10px 0",
  borderBottom: "1px solid rgba(26,26,26,0.06)",
  fontSize: 15,
  lineHeight: 1.55,
};

function FinalCta({ h2, body }: { h2: React.ReactNode; body: string }) {
  return (
    <section
      style={{
        padding: "clamp(56px, 12vw, 88px) 0 clamp(64px, 14vw, 100px)",
        background:
          "linear-gradient(180deg, var(--cream) 0%, color-mix(in srgb, var(--terracotta) 8%, var(--cream)) 100%)",
      }}
    >
      <Reveal
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 clamp(16px, 5vw, 32px)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "var(--terracotta-aa)",
            marginBottom: 20,
          }}
        >
          — Start the brief
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--ink)",
            marginBottom: 20,
          }}
        >
          {h2}
        </h2>
        <p
          style={{
            fontSize: "clamp(15px, 2.5vw, 17px)",
            color: "var(--ink-2)",
            maxWidth: "46ch",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          {body}
        </p>
        <Link
          href="/discovery-call"
          style={{
            ...primaryBtn,
            padding: "18px 32px",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Book a free 30-min audit
          <ArrowRight style={{ width: 16, height: 16 }} />
        </Link>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--ink-faint)",
            marginTop: 22,
          }}
        >
          — 4 builds per month · 8-hour weekday reply
        </div>
      </Reveal>
    </section>
  );
}
