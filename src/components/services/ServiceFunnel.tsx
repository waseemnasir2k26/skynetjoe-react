import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import type { ServiceFunnelContent } from "@/data/service-funnels/types";
import type { findServicePricing } from "@/lib/service-pricing";

/**
 * ServiceFunnel — reusable, data-driven conversion funnel for the non-top-5
 * service pages. Cream editorial style matched to N8nAutomationLP. Server
 * component (no client hooks) — accordions use native <details>, sticky mobile
 * CTA is pure CSS, all CTAs are plain <Link> to /discovery-call.
 *
 * Sections, in order:
 *   1. Utility strip
 *   2. Hero (eyebrow + Fraunces H1 + sub + dual CTA + trust chips)
 *   3. Pain ("the problem" cards)
 *   4. Outcomes (after-state cards) + mid-page CTA
 *   5. Process (3 numbered steps)
 *   6. Proof (mini case receipt — big metric)
 *   7. Pricing (3 tiers from findServicePricing; skipped if null)
 *   8. FAQ (<details> accordions + FAQPage JSON-LD)
 *   9. Final CTA (terracotta-tint section)
 *  10. Sticky mobile CTA bar (mobile only)
 */

type Pricing = ReturnType<typeof findServicePricing>;

const fmtPrice = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function ServiceFunnel({
  content,
  pricing,
}: {
  content: ServiceFunnelContent;
  pricing: Pricing;
}) {
  const tiers = pricing?.tiers ?? [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Shared inline styles -----------------------------------------------------
  const eyebrow = (color: string): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color,
    marginBottom: 16,
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
  });
  const rule = (color: string): React.CSSProperties => ({
    width: 28,
    height: 1,
    background: color,
    display: "inline-block",
  });
  const h2style: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: "var(--ink)",
    marginBottom: 40,
    maxWidth: "26ch",
  };
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
  const ghostBtn: React.CSSProperties = {
    color: "var(--terracotta-aa)",
    padding: "16px 8px",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    minHeight: 44,
  };

  return (
    <div
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        position: "relative",
      }}
    >
      <JsonLd data={faqSchema} />

      <style>{`
        .sf-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
        .sf-tiers { display: grid; gap: 20px; grid-template-columns: 1fr; }
        @media (min-width: 820px) { .sf-tiers { grid-template-columns: repeat(3, 1fr); align-items: stretch; } }
        .sf-sticky { position: fixed; left: 0; right: 0; bottom: 0; z-index: 50; display: flex; }
        @media (min-width: 760px) { .sf-sticky { display: none; } }
        .sf-pad-mobile { display: none; }
        @media (max-width: 759px) { .sf-pad-mobile { display: block; height: 72px; } }
        @media (prefers-reduced-motion: reduce) { .sf-tilt { transform: none !important; } }
      `}</style>

      {/* 1. UTILITY STRIP */}
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
        — {content.label} · public pricing · ship in 14 days · Bali GMT+8
      </div>

      {/* 2. HERO */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0 clamp(56px, 12vw, 80px)",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-3)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <div style={eyebrow("var(--terracotta-aa)")}>
            <span style={rule("var(--terracotta-aa)")} />
            {content.hero.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 8vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.03,
              color: "var(--ink)",
              margin: "0 0 24px",
              maxWidth: "18ch",
            }}
          >
            {content.hero.h1}
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 19px)",
              color: "var(--ink-2)",
              maxWidth: "56ch",
              lineHeight: 1.55,
              marginBottom: 28,
            }}
          >
            {content.hero.sub}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <Link href={content.hero.primary.href} style={primaryBtn}>
              {content.hero.primary.label}
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link href={content.hero.secondary.href} style={ghostBtn}>
              {content.hero.secondary.label}
              <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
          {/* trust chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 26,
            }}
          >
            {content.hero.trust.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: "var(--ink-faint)",
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "7px 12px",
                  borderRadius: 999,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PAIN */}
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
          <div style={eyebrow("var(--oxblood)")}>
            <span style={rule("var(--oxblood)")} />
            The problem
          </div>
          <h2 style={h2style}>
            What it&apos;s{" "}
            <em style={{ fontStyle: "italic", color: "var(--oxblood)" }}>
              costing you right now.
            </em>
          </h2>
          <div className="sf-grid">
            {content.pains.map((p, i) => (
              <div
                key={p.title}
                className="sf-tilt"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 28,
                  transform: `rotate(${i % 2 === 0 ? "-0.3deg" : "0.3deg"})`,
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
                  Pain {String(i + 1).padStart(2, "0")}
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

      {/* 4. OUTCOMES + MID CTA */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-3)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <div style={eyebrow("var(--terracotta-aa)")}>
            <span style={rule("var(--terracotta-aa)")} />
            The after-state
          </div>
          <h2 style={h2style}>
            What you walk away{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
              owning.
            </em>
          </h2>
          <div className="sf-grid">
            {content.outcomes.map((o) => (
              <div
                key={o.title}
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  borderLeft: "3px solid var(--sage)",
                  padding: 28,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {o.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-2)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: o.proof ? "0 0 12px" : 0,
                  }}
                >
                  {o.body}
                </p>
                {o.proof && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      color: "var(--sage)",
                    }}
                  >
                    — {o.proof}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MID-PAGE CTA */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Link href="/discovery-call" style={primaryBtn}>
              Book a 30-min call
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
              }}
            >
              — fixed scope back in 48 hours · no quote dance
            </span>
          </div>
        </div>
      </section>

      {/* 4b. COMPARISON (optional) */}
      {content.comparison && (
        <section
          style={{
            padding: "clamp(48px, 10vw, 72px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream)",
          }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(16px, 5vw, 32px)" }}>
            <div style={eyebrow("var(--terracotta-aa)")}>
              <span style={rule("var(--terracotta-aa)")} />
              The honest comparison
            </div>
            <h2 style={h2style}>{content.comparison.heading}</h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                  minWidth: 520,
                }}
              >
                <thead>
                  <tr>
                    {content.comparison.cols.map((c, i) => (
                      <th
                        key={i}
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: i === 1 ? "var(--terracotta)" : "var(--ink-faint)",
                          borderBottom: "1px solid rgba(26,26,26,0.16)",
                          background: i === 1 ? "var(--cream-2)" : "transparent",
                        }}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.comparison.rows.map((r) => (
                    <tr key={r.dimension}>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "var(--ink)",
                          fontWeight: 600,
                          borderBottom: "1px solid rgba(26,26,26,0.08)",
                          verticalAlign: "top",
                        }}
                      >
                        {r.dimension}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "var(--ink)",
                          borderBottom: "1px solid rgba(26,26,26,0.08)",
                          background: "var(--cream-2)",
                          verticalAlign: "top",
                          lineHeight: 1.5,
                        }}
                      >
                        <span aria-hidden style={{ color: "var(--sage)", marginRight: 8 }}>
                          ✓
                        </span>
                        {r.us}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "var(--ink-2)",
                          borderBottom: "1px solid rgba(26,26,26,0.08)",
                          verticalAlign: "top",
                          lineHeight: 1.5,
                        }}
                      >
                        {r.them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 5. PROCESS */}
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
          <div style={eyebrow("var(--terracotta-aa)")}>
            <span style={rule("var(--terracotta-aa)")} />
            How it works
          </div>
          <h2 style={h2style}>
            Three steps,{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
              no mystery.
            </em>
          </h2>
          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {content.process.map((s, i) => (
              <div
                key={s.title}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 28,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 4,
                    background: "var(--terracotta)",
                    color: "var(--cream-3)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 18,
                    marginBottom: 14,
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-2)",
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

      {/* 5b. TOOL STACK (optional) */}
      {content.toolStack && (
        <section
          style={{
            padding: "clamp(32px, 7vw, 48px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-3)",
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--ink-faint)",
              }}
            >
              {content.toolStack.label}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {content.toolStack.items.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--ink)",
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.12)",
                    padding: "6px 12px",
                    borderRadius: 4,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5c. FIT CHECK (optional) */}
      {content.fitCheck && (
        <section
          style={{
            padding: "clamp(48px, 10vw, 72px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-2)",
          }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(16px, 5vw, 32px)" }}>
            <div style={eyebrow("var(--terracotta-aa)")}>
              <span style={rule("var(--terracotta-aa)")} />
              Honest fit check
            </div>
            <h2 style={{ ...h2style, marginBottom: 28 }}>
              The right fit,{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                or an honest no.
              </em>
            </h2>
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              <div
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  borderLeft: "3px solid var(--sage)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--sage)",
                    marginBottom: 14,
                  }}
                >
                  This is for you if
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {content.fitCheck.forYou.map((f) => (
                    <li
                      key={f}
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
                      <span aria-hidden style={{ color: "var(--sage)" }}>
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  borderLeft: "3px solid var(--oxblood)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--oxblood)",
                    marginBottom: 14,
                  }}
                >
                  We&apos;re not a fit if
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {content.fitCheck.notForYou.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "16px 1fr",
                        gap: 10,
                        padding: "7px 0",
                        fontSize: 14,
                        color: "var(--ink-2)",
                        lineHeight: 1.5,
                      }}
                    >
                      <span aria-hidden style={{ color: "var(--oxblood)" }}>
                        ✕
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. PROOF */}
      <section
        style={{
          padding: "clamp(56px, 12vw, 96px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
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
              fontWeight: 500,
              fontSize: "clamp(48px, 11vw, 110px)",
              lineHeight: 0.95,
              color: "var(--terracotta)",
              letterSpacing: "-0.03em",
              marginBottom: 18,
            }}
          >
            {content.proof.metric}
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(17px, 3vw, 22px)",
              color: "var(--ink-2)",
              lineHeight: 1.4,
              maxWidth: "40ch",
              margin: "0 auto 12px",
            }}
          >
            {content.proof.detail}
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
            — {content.proof.client}
          </div>
        </div>
      </section>

      {/* 6b. SECONDARY PROOF (optional) */}
      {content.secondaryProof && (
        <section
          style={{
            padding: "clamp(40px, 9vw, 64px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-2)",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: "0 22px",
                borderLeft: "3px solid var(--terracotta)",
                paddingLeft: 22,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(30px, 6vw, 52px)",
                  color: "var(--terracotta)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {content.secondaryProof.metric}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 2.5vw, 19px)",
                  color: "var(--ink-2)",
                  lineHeight: 1.4,
                  margin: 0,
                  flex: 1,
                  minWidth: 240,
                }}
              >
                {content.secondaryProof.detail}
              </p>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--ink-faint)",
                paddingLeft: 22,
                marginTop: 12,
              }}
            >
              — {content.secondaryProof.client}
            </div>
          </div>
        </section>
      )}

      {/* 7. PRICING */}
      {tiers.length > 0 && (
        <section
          style={{
            padding: "clamp(48px, 10vw, 72px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-3)",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
            }}
          >
            <div style={eyebrow("var(--terracotta-aa)")}>
              <span style={rule("var(--terracotta-aa)")} />
              Investment
            </div>
            <h2 style={h2style}>
              Public pricing.{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                No quote dance.
              </em>
            </h2>
            <div className="sf-tiers">
              {tiers.map((tier) => {
                const featured = Boolean(tier.badge);
                return (
                  <div
                    key={tier.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: featured ? "var(--cream-2)" : "var(--cream-3)",
                      border: featured
                        ? "1px solid var(--terracotta)"
                        : "1px solid rgba(26,26,26,0.12)",
                      padding: 28,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.16em",
                          color: "var(--ink-faint)",
                        }}
                      >
                        {tier.name}
                      </span>
                      {tier.badge && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: "var(--cream-3)",
                            background: "var(--terracotta)",
                            padding: "4px 8px",
                            borderRadius: 999,
                          }}
                        >
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 38,
                        color: "var(--ink)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {fmtPrice(tier.price)}
                      {tier.cadence === "monthly" && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 13,
                            color: "var(--ink-faint)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {" "}
                          /mo
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--ink-faint)",
                        margin: "8px 0 14px",
                      }}
                    >
                      Ship: {tier.ship}
                    </div>
                    <p
                      style={{
                        color: "var(--ink-2)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        margin: "0 0 16px",
                      }}
                    >
                      {tier.tagline}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 22px",
                        flexGrow: 1,
                      }}
                    >
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "16px 1fr",
                            gap: 10,
                            padding: "8px 0",
                            borderBottom: "1px solid rgba(26,26,26,0.06)",
                            fontSize: 13.5,
                            color: "var(--ink)",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            aria-hidden
                            style={{ color: "var(--sage)", marginTop: 1 }}
                          >
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={tier.ctaHref}
                      style={{
                        ...primaryBtn,
                        justifyContent: "center",
                        background: featured
                          ? "var(--terracotta)"
                          : "transparent",
                        color: featured ? "var(--cream-3)" : "var(--terracotta-aa)",
                        border: featured
                          ? "1px solid var(--terracotta)"
                          : "1px solid var(--terracotta-aa)",
                      }}
                    >
                      {tier.ctaLabel}
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7b. GUARANTEE / RISK-REVERSAL (optional) */}
      {content.guarantee && (
        <section
          style={{
            padding: "clamp(40px, 9vw, 64px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "color-mix(in srgb, var(--sage) 10%, var(--cream-3))",
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
                color: "var(--sage)",
                marginBottom: 14,
              }}
            >
              — The risk is on me
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--ink)",
                marginBottom: 14,
              }}
            >
              {content.guarantee.title}
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 2.5vw, 17px)",
                color: "var(--ink-2)",
                maxWidth: "52ch",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              {content.guarantee.body}
            </p>
          </div>
        </section>
      )}

      {/* 8. FAQ */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-2)",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <div style={eyebrow("var(--terracotta-aa)")}>
            <span style={rule("var(--terracotta-aa)")} />
            Questions
          </div>
          <h2 style={{ ...h2style, marginBottom: 28 }}>
            Before you{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
              book the call.
            </em>
          </h2>
          {content.faqs.map((f) => (
            <details
              key={f.q}
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.12)",
                borderRadius: 2,
                marginBottom: 10,
              }}
            >
              <summary
                style={{
                  padding: "16px 18px",
                  cursor: "pointer",
                  listStyle: "none",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "var(--ink)",
                  minHeight: 44,
                }}
              >
                {f.q}
              </summary>
              <div
                style={{
                  padding: "0 18px 18px",
                  fontSize: 14,
                  color: "var(--ink-2)",
                  lineHeight: 1.7,
                }}
              >
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section
        style={{
          padding: "clamp(56px, 12vw, 88px) 0 clamp(64px, 14vw, 100px)",
          background:
            "linear-gradient(180deg, var(--cream) 0%, color-mix(in srgb, var(--terracotta) 8%, var(--cream)) 100%)",
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
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--ink)",
              marginBottom: 20,
            }}
          >
            {content.finalCta.h2}
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
            {content.finalCta.body}
          </p>
          <Link
            href="/discovery-call"
            style={{ ...primaryBtn, padding: "18px 32px", fontWeight: 700, fontSize: 16 }}
          >
            {content.finalCta.ctaLabel}
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
        </div>
      </section>

      {/* spacer so sticky bar never covers final content on mobile */}
      <div className="sf-pad-mobile" aria-hidden />

      {/* 10. STICKY MOBILE CTA */}
      <div
        className="sf-sticky"
        style={{
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.16)",
          boxShadow: "0 -6px 24px rgba(26,37,64,0.10)",
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
        }}
      >
        <Link
          href="/discovery-call"
          style={{
            ...primaryBtn,
            flex: 1,
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          Book a 30-min call
          <ArrowRight style={{ width: 16, height: 16 }} />
        </Link>
      </div>
    </div>
  );
}
