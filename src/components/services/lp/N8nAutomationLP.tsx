import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, Check } from "lucide-react";

/**
 * N8nAutomationLP — bespoke landing page for /services/n8n-automation
 *
 * Cream editorial pivot. Server component (no client hooks).
 * CTAs are plain <Link> to /discovery-call.
 *
 * Hero credential card replaces the founder photo (no face) — terracotta "SL"
 * monogram tile + headline metric + plain credential lines.
 *
 * Asset paths confirmed against /public glob 2026-05-26:
 *  - /case-studies/eu-logistics-email-triage-n8n.jpg (work visual — kept)
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
    title: "$400/mo Zapier bleed",
    body: "Six flows on Zapier, bill creeping past $400. Half the tasks fail silently.",
  },
  {
    n: "02",
    title: "Tribal knowledge walked out",
    body: "Engineer left. Nobody knows how the flows wire together. Edits feel like surgery in the dark.",
  },
  {
    n: "03",
    title: "Form silently broke",
    body: "Contact form pushed leads to /dev/null for 3 weeks. Found out from a refund request.",
  },
];

const BEFORE = [
  "6 Zapier zaps, $400/mo, no version control",
  "Manual CSV exports every Monday morning",
  "Slack pings whenever a webhook 500s",
  "Engineer-only edits, week-long turnarounds",
  "No retry logic — failures are silent",
];

const AFTER = [
  "n8n on $7/mo Hostinger VPS, git-versioned",
  "Scheduled flows + auto-retry + Slack alerts",
  "JSON exports of every workflow, readable",
  "I edit Mon-Wed, you sign off Thu, ship Fri",
  "Sub-flows reused across 12 jobs, DRY",
];

export default function N8nAutomationLP() {
  return (
    <div
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        position: "relative",
      }}
    >
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
        — n8n workflows · $7/mo VPS · ship in 11 days · 4 builds left
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
            gap: "clamp(28px, 6vw, 40px)",
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
              n8n · workflow automation · 2026
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
              Stop renting Zapier.{" "}
              <span
                style={{
                  fontStyle: "normal",
                  color: "var(--terracotta)",
                  fontWeight: 700,
                }}
              >
                Own your automation.
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
              Keep the automations you rely on — without the rising monthly
              bill. The same flows you pay $400/mo for, rebuilt to run for a few
              dollars, with auto-retry so they stop failing in silence.
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
              — Bali hours GMT+8 · 8-hour weekday reply
            </div>
          </div>

          <div>
            <SkynetCredentialCard
              metric="180+"
              metricLabel="n8n workflows shipped"
              lines={[
                "Self-hosted on a $7/mo VPS",
                "Git-versioned · retry-safe",
                "9 countries · zero retainers",
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
            What I keep seeing
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
            Three pains that show up{" "}
            <span style={{ fontStyle: "normal", color: "var(--oxblood)", fontWeight: 700 }}>
              in every audit call.
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
            — Receipts, not promises
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
            180+
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "normal",
              fontSize: "clamp(17px, 3vw, 22px)",
              color: "var(--ink-2)",
              lineHeight: 1.4,
              maxWidth: "32ch",
              margin: "0 auto",
            }}
          >
            workflows shipped from a Canggu cafe since 2022. 9 countries.
            Zero retainers.
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
            gap: "clamp(28px, 6vw, 48px)",
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
              width: "100%",
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
                src="/case-studies/eu-logistics-email-triage-n8n.jpg"
                alt="EU logistics email triage n8n build"
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
              EU logistics · email triage · n8n
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
              &ldquo;Three contractors before Waseem. He&apos;s the first who
              asked us to print our inbox and walk through 100 threads before
              writing a single node. Response time went from 6 hours to 6
              minutes.&rdquo;
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
              — Operations Director · EU Logistics · 11-day ship
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
            Manual vs shipped
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
              we cut the Zapier cord.
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
                borderLeft: "3px solid var(--oxblood)",
                padding: "28px 28px",
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
                The way it works today
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
                padding: "28px 28px",
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
                The way it works in 11 days
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
            Tell me what&apos;s breaking.{" "}
            <span style={{ fontStyle: "normal", color: "var(--terracotta)", fontWeight: 700 }}>
              I&apos;ll wire the fix.
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
            30-min discovery call. Top 3 leaks ranked by dollar value. Fixed
            scope back in 48 hours.
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
