"use client";

import Link from "next/link";
import {
  ArrowRight,
  X,
  Check,
  MessageSquareDashed,
  MoonStar,
  GitBranch,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppCRM, AIDispatcher } from "@/components/illustrations";

/**
 * AiChatbotsLP — bespoke landing page for /services/ai-chatbots
 *
 * Redesign 2026-06-02. Client component for cinematic Framer Motion.
 *  - NO photos / NO founder face — Lucide icons + bespoke WhatsAppCRM / AIDispatcher SVGs.
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
    icon: MessageSquareDashed,
    title: "It answers the wrong thing, six times",
    body: "The flow gets stuck on one branch. The customer rage-types BYE before a human picks up.",
  },
  {
    icon: MoonStar,
    title: "A lead at 11pm, a reply on Tuesday",
    body: "They message Wednesday night. You answer days later. By then they have booked someone else.",
  },
  {
    icon: GitBranch,
    title: "The handoff drops the whole story",
    body: "Chat lifts to your CRM with no source, no campaign. Sales blames marketing every Monday.",
  },
];

const BEFORE = [
  "The bot loops people through wrong answers",
  "After-hours messages wait half a day",
  "Handoff dumps the chat with no detail attached",
  "The same question answered by hand forty times a week",
  "Chat, CRM and messaging live in three separate places",
];

const AFTER = [
  "It reads what people mean and routes them right",
  "A reply by lunch, even on the messages that land overnight",
  "Every handoff carries the source and the full thread",
  "Common questions answered in your own words",
  "One threaded view across chat, CRM and messaging",
];

const FACTS = [
  "Reads what people mean, not just keywords",
  "Sounds like you, not a script",
  "Every handoff lands in your CRM, tagged",
];

export default function AiChatbotsLP() {
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
        — Chat that answers like you · never sleeps · 8-hour weekday reply
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
              Always-on chat · 2026
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
              The message came in at 11pm.{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                Answer it now.
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
              Chat that understands what people actually want, answers in your
              voice, and never drops a lead at midnight. When a human needs to
              step in, the full conversation is right there.
            </p>
            <Link href="/discovery-call" style={primaryBtn}>
              Book a free 30-min audit
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <div style={subline}>
              — Bali hours GMT+8 · covers EU mornings + US evenings
            </div>
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
              Tools we use: WhatsApp · chat flows · your CRM
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 36, rotate: -1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            aria-hidden
          >
            <AIDispatcher className="lp-illo" />
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
            <Eyebrow color="var(--oxblood)">Real messages, real damage</Eyebrow>
            <H2>
              Three places chat{" "}
              <span style={{ color: "var(--oxblood)", fontWeight: 700 }}>
                quietly costs you customers.
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
          <div style={proofEyebrow}>— A promise, not a marketing claim</div>
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
            8h
          </div>
          <p style={proofDetail}>
            weekday reply window. Every message that lands in your inbox gets a
            human-sounding answer by lunch.
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
              Chat that sounds like you,{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                not a robot.
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
              &ldquo;It reads exactly like our front-desk team. People barely
              notice they started with a bot — they have a date and time
              confirmed before a human ever steps in.&rdquo;
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
              — Practice owner · dental flagship · 11-day ship
            </div>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            aria-hidden
          >
            <WhatsAppCRM className="lp-illo" />
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
                the chat goes live.
              </span>
            </H2>
          </Reveal>
          <Stagger className="lp-ba-grid">
            <BeforeCard label="The way chat works today" items={BEFORE} />
            <AfterCard label="The way it works in 11 days" items={AFTER} />
          </Stagger>
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCta
        h2={
          <>
            Hand us your messages.{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              We&apos;ll train the chat.
            </span>
          </>
        }
        body="A free 30-minute check-up. Walk us through your 20 most-asked messages. Fixed scope back in 48 hours, live in 11 days."
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
