import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, Check } from "lucide-react";

/**
 * AiChatbotsLP — bespoke landing page for /services/ai-chatbots
 *
 * Cream editorial pivot. Server component.
 *
 * Hero credential card replaces the founder photo (no face) — terracotta "SL"
 * monogram tile + headline metric + plain credential lines.
 *
 * Asset paths confirmed against /public glob 2026-05-26:
 *  - /case-studies/manhattan-dental-atelier-flagship.jpg (work visual — kept)
 */

function SkynetCredentialCard({
  metric,
  metricLabel,
  lines,
}: {
  metric: string;
  metricLabel: string;
  lines: string[];
}) {
  return (
    <div
      style={{
        background: "var(--cream-3)",
        border: "1px solid rgba(26,26,26,0.12)",
        boxShadow: "0 18px 48px rgba(26,37,64,0.10)",
        maxWidth: 400,
        width: "100%",
        marginLeft: "auto",
        padding: 28,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--terracotta)",
            color: "var(--cream-3)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.02em",
            flexShrink: 0,
          }}
        >
          SL
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#A8451F",
          }}
        >
          SkynetLabs · since 2022
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 56,
          lineHeight: 1,
          color: "var(--terracotta)",
          letterSpacing: "-0.03em",
        }}
      >
        {metric}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--ink-faint)",
          margin: "8px 0 18px",
        }}
      >
        {metricLabel}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {lines.map((l) => (
          <li
            key={l}
            style={{
              display: "grid",
              gridTemplateColumns: "16px 1fr",
              gap: 10,
              padding: "7px 0",
              fontSize: 14,
              color: "var(--ink)",
              lineHeight: 1.5,
            }}
          >
            <Check style={{ width: 14, height: 14, color: "var(--sage)", marginTop: 3 }} />
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PAINS = [
  {
    n: "01",
    title: "Bot answers the wrong question 6x",
    body: "ManyChat flow gets stuck on the same branch. Customer rage-types BYE before a human picks up.",
  },
  {
    n: "02",
    title: "WhatsApp lead at 11pm",
    body: "They DM Wednesday night. You reply Tuesday morning. They already booked your competitor.",
  },
  {
    n: "03",
    title: "Handoff never tags the source",
    body: "Chat lifts to GHL with no source, no UTM, no campaign. Sales blames marketing every Monday.",
  },
];

const BEFORE = [
  "Bot loops customer through 4 wrong branches",
  "After-hours WhatsApps wait 11-14 hours",
  "Handoff dumps chat into GHL with no tag",
  "Same FAQ answered manually 40x a week",
  "ManyChat + GHL + WhatsApp = 3 separate worlds",
];

const AFTER = [
  "Intent-routed flow — wrong branches dropped",
  "8-hour weekday reply baked in, even after-hours",
  "Every handoff carries source, UTM, conversation ID",
  "FAQ trained from your real DMs, in your voice",
  "ManyChat → GHL → WhatsApp in one threaded view",
];

export default function AiChatbotsLP() {
  return (
    <div
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
      }}
    >
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
        — chat flows · ManyChat + GHL + WhatsApp · 8-hour reply
      </div>

      {/* HERO */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0 clamp(56px, 12vw, 80px)",
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
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
          }}
        >
          <style>{`
            @media (min-width: 900px) {
              .lp-hero-grid { grid-template-columns: 7fr 5fr !important; align-items: end !important; }
            }
          `}</style>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta)",
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
                  background: "var(--terracotta)",
                  display: "inline-block",
                }}
              />
              AI chat · WhatsApp + ManyChat · 2026
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 8vw, 76px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
                color: "var(--ink)",
                margin: "0 0 24px",
              }}
            >
              The DM came in at 11pm.{" "}
              <span
                style={{
                  fontStyle: "normal",
                  color: "var(--terracotta)",
                  fontWeight: 700,
                }}
              >
                Reply by 7am.
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 2.5vw, 19px)",
                color: "var(--ink-2)",
                maxWidth: "52ch",
                lineHeight: 1.55,
                marginBottom: 28,
              }}
            >
              Chat that understands what people actually want, answers in your
              voice, and never drops a lead at midnight. When a human needs to
              step in, the full conversation is right there.
            </p>
            <Link
              href="/discovery-call"
              style={{
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
              }}
            >
              Book a 30-min call
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                marginTop: 18,
              }}
            >
              — Bali hours GMT+8 · covers EU mornings + US evenings
            </div>
          </div>
          <div>
            <SkynetCredentialCard
              metric="8h"
              metricLabel="weekday reply window"
              lines={[
                "Chats routed by what people mean, not keywords",
                "Bots that sound like you, not a script",
                "Every handoff lands in your CRM, tagged",
              ]}
            />
          </div>
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
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 5vw, 32px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--oxblood)",
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--oxblood)" }} />
            Real DMs, real damage
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: 40,
              maxWidth: "26ch",
            }}
          >
            Three places chatbots{" "}
            <span style={{ fontStyle: "normal", color: "var(--oxblood)", fontWeight: 700 }}>
              quietly cost you leads.
            </span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {PAINS.map((p, i) => (
              <div
                key={p.n}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "28px",
                  transform:
                    i === 0
                      ? "rotate(-0.3deg)"
                      : i === 1
                      ? "rotate(0.3deg)"
                      : "rotate(-0.2deg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--oxblood)",
                    marginBottom: 10,
                  }}
                >
                  Pain {p.n}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-2)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
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
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(16px, 5vw, 32px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--ink-faint)",
              marginBottom: 14,
            }}
          >
            — Promise, not a marketing claim
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
            8h
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "normal",
              fontSize: "clamp(17px, 3vw, 22px)",
              color: "var(--ink-2)",
              lineHeight: 1.4,
              maxWidth: "34ch",
              margin: "0 auto",
            }}
          >
            weekday reply window. Every chat that lands in your inbox gets a
            human-sounding answer by lunch.
          </p>
        </div>
      </section>

      {/* TESTIMONIAL / CASE WITH FACE */}
      <section
        style={{
          padding: "clamp(48px, 11vw, 80px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-3)",
        }}
      >
        <div
          className="lp-case-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <style>{`
            @media (min-width: 900px) {
              .lp-case-grid { grid-template-columns: 5fr 7fr !important; }
            }
          `}</style>
          <figure
            style={{
              margin: 0,
              transform: "rotate(1deg)",
              background: "var(--cream-3)",
              padding: 10,
              border: "1px solid rgba(26,26,26,0.12)",
              boxShadow: "0 18px 48px rgba(26,37,64,0.18)",
              maxWidth: 380,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                overflow: "hidden",
              }}
            >
              <Image
                src="/case-studies/manhattan-dental-atelier-flagship.jpg"
                alt="Karachi dental flagship — WhatsApp + Signal recovery flow"
                fill
                sizes="(min-width: 900px) 380px, 90vw"
                style={{
                  objectFit: "cover",
                  filter: "none",
                }}
              />
            </div>
            <figcaption
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                textAlign: "center",
                paddingTop: 10,
              }}
            >
              Karachi dental · WhatsApp recovery flow
            </figcaption>
          </figure>
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "normal",
                fontSize: "clamp(18px, 3.2vw, 24px)",
                lineHeight: 1.4,
                color: "var(--ink)",
                margin: "0 0 20px",
              }}
            >
              &ldquo;The bot reads exactly like our front-desk girl. Patients
              don&apos;t even ping the human until they&apos;ve got a date and
              time confirmed. No-shows dropped 70% inside two weeks.&rdquo;
            </p>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--ink-faint)",
              }}
            >
              — Karachi dental flagship · WhatsApp + GHL · 11-day ship
            </div>
          </div>
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
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 5vw, 32px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
            Macro vs human
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: 40,
              maxWidth: "24ch",
            }}
          >
            What changes the day{" "}
            <span style={{ fontStyle: "normal", color: "var(--terracotta)", fontWeight: 700 }}>
              the bot ships.
            </span>
          </h2>
          <div
            className="lp-ba-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
            }}
          >
            <style>{`
              @media (min-width: 760px) {
                .lp-ba-grid { grid-template-columns: 1fr 1fr !important; }
              }
            `}</style>
            <div
              style={{
                background: "var(--cream-2)",
                padding: "28px",
                border: "1px solid rgba(26,26,26,0.12)",
                borderLeftWidth: 3,
                borderLeftColor: "var(--oxblood)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--oxblood)",
                  marginBottom: 12,
                }}
              >
                — Manual · before
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 14,
                }}
              >
                How chat works today
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {BEFORE.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "18px 1fr",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(26,26,26,0.06)",
                      fontSize: 14,
                      color: "var(--ink-2)",
                      lineHeight: 1.5,
                    }}
                  >
                    <X style={{ width: 14, height: 14, color: "var(--oxblood)", marginTop: 4 }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                background: "var(--cream-3)",
                padding: "28px",
                border: "1px solid rgba(26,26,26,0.12)",
                borderLeftWidth: 3,
                borderLeftColor: "var(--sage)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--sage)",
                  marginBottom: 12,
                }}
              >
                — Shipped · after
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 14,
                }}
              >
                How chat works after the build
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {AFTER.map((a) => (
                  <li
                    key={a}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "18px 1fr",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(26,26,26,0.06)",
                      fontSize: 14,
                      color: "var(--ink)",
                      lineHeight: 1.5,
                    }}
                  >
                    <Check style={{ width: 14, height: 14, color: "var(--sage)", marginTop: 4 }} />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          padding: "clamp(56px, 12vw, 88px) 0 clamp(64px, 14vw, 100px)",
          background: "var(--cream)",
        }}
      >
        <div
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
              color: "var(--terracotta)",
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
              lineHeight: 1.08,
              color: "var(--ink)",
              marginBottom: 20,
            }}
          >
            Hand me your DMs.{" "}
            <span style={{ fontStyle: "normal", color: "var(--terracotta)", fontWeight: 700 }}>
              I&apos;ll train the bot.
            </span>
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 2.5vw, 17px)",
              color: "var(--ink-2)",
              maxWidth: "44ch",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            30-min call. Walk me through your 20 most-asked DMs. Scope back in
            48 hours, bot live in 11 days.
          </p>
          <Link
            href="/discovery-call"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              padding: "18px 32px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              minHeight: 44,
            }}
          >
            Book a 30-min call
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
            — 4 builds per month · next slot opens June
          </div>
        </div>
      </section>
    </div>
  );
}
