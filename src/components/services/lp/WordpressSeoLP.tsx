"use client";

import Link from "next/link";
import { ArrowRight, X, Check, FileX2, Quote, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WordPressSite, AEOEngine } from "@/components/illustrations";

/**
 * WordpressSeoLP — bespoke landing page for /services/wordpress-seo
 *
 * Redesign 2026-06-02. Client component for cinematic Framer Motion.
 *  - NO photos / NO founder face — Lucide icons + bespoke WordPressSite / AEOEngine SVGs.
 *  - Plain-language, outcome-first hero. Tool/method names kept to a quiet sub-line.
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
    icon: FileX2,
    title: "Hundreds of thin pages dragging you down",
    body: "An old playbook left you with a pile of one-paragraph pages that have weighed on your site for years.",
  },
  {
    icon: Quote,
    title: "The answer names a competitor",
    body: "Search now answers your question on the page — and the credit goes to the business next door.",
  },
  {
    icon: Wrench,
    title: "Your markup quietly broke",
    body: "No rich results in months. The behind-the-scenes data has been silently invalid since a past migration.",
  },
];

const BEFORE = [
  "Hundreds of thin pages weighing on your site",
  "Behind-the-scenes data broken, no rich results",
  "Search answers name competitors for your own brand",
  "The same page title repeated across dozens of pages",
  "Internal links scattered with no clear structure",
];

const AFTER = [
  "Hundreds of weak pages merged or redirected to strong ones",
  "Clean, valid data so rich results show again",
  "Your brand named when search answers questions about it",
  "Each title written for the right search and your name",
  "Pages grouped around the ones that actually earn money",
];

const FACTS = [
  "Tuned so AI answers name your business",
  "Clean, valid data across the whole site",
  "Your brand owns its own answer",
];

export default function WordpressSeoLP() {
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
        — Get named in the answers people read · clean data · ready for AI
        search
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
              Get found in 2026
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
              Get named in the answers,{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                not buried below them.
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
              People now read the answer instead of clicking through. We clean
              up your site so those answers name your business — not the
              competitor next door. Pages that earn their place, data search can
              trust.
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
              Tools we use: WordPress · structured data · AI-search tuning
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 36, rotate: -1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            aria-hidden
          >
            <AEOEngine className="lp-illo" />
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
            <Eyebrow color="var(--oxblood)">What the check-up finds</Eyebrow>
            <H2>
              Three reasons sites{" "}
              <span style={{ color: "var(--oxblood)", fontWeight: 700 }}>
                vanish in the AI era.
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
            — A Spanish learning platform · sitewide rebuild
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
            640
          </div>
          <p style={proofDetail}>
            thin pages merged or redirected to stronger hubs. Crawl budget back,
            answers starting to name the brand.
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
              Fewer pages, doing{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                far more work.
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
              &ldquo;We had close to a thousand pages and most of them were
              doing nothing. He walked us through the cut list, kept the ones
              that earned their slot, and the AI answers started picking us up
              within the month.&rdquo;
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
              — Founder · Spanish learning platform · 5-week rebuild
            </div>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            aria-hidden
          >
            <WordPressSite className="lp-illo" />
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
              What changes when the{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                cleanup ships.
              </span>
            </H2>
          </Reveal>
          <Stagger className="lp-ba-grid">
            <BeforeCard
              label="The playbook that stopped working"
              items={BEFORE}
            />
            <AfterCard label="The way it works in 2026" items={AFTER} />
          </Stagger>
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCta
        h2={
          <>
            Send us the page list.{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              We&apos;ll mark the cut.
            </span>
          </>
        }
        body="A free 30-minute check-up. We find the weak pages, the broken data, the answers naming someone else. Fixed scope back in 48 hours."
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
