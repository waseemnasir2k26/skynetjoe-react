import Link from "next/link";
import { Check } from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — pricing tiers.
 * cream-2 cards with 1px ink border, featured tier gets terracotta border.
 */

const C = {
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  rule: "rgba(26,26,26,0.12)",
};

const TIERS = [
  {
    name: "Starter Build",
    price: "$1,497",
    cadence: "one-time",
    desc: "One automation, shipped end-to-end. Perfect first project.",
    features: [
      "1 workflow (n8n / Zapier / GHL)",
      "Up to 3 integrations",
      "5-day delivery",
      "Loom walkthrough + SOP doc",
      "14-day support",
    ],
    cta: "Start small",
    featured: false,
  },
  {
    name: "Flagship",
    price: "$5,997",
    cadence: "one-time",
    desc: "Full system rebuild — site + automation + content engine.",
    features: [
      "Custom Next.js site (Vercel)",
      "5-workflow automation stack",
      "AEO-tuned SEO base",
      "Live chat / CRM integration",
      "14-day delivery",
      "30-day support",
      "$497/mo retainer optional",
    ],
    cta: "Book flagship call",
    featured: true,
  },
  {
    name: "Operator Retainer",
    price: "$1,997",
    cadence: "/ month",
    desc: "Ongoing automation operator. Stack new wins monthly.",
    features: [
      "20 hrs/month dedicated",
      "Unlimited Slack / email access",
      "Monthly strategy call",
      "Pause anytime",
      "Min 3-month engagement",
    ],
    cta: "Apply for retainer",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              fontWeight: 600,
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.terra }} />
            Pricing
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: C.ink,
              marginBottom: 16,
            }}
          >
            Three ways to start.{" "}
            <em style={{ fontStyle: "normal", fontWeight: 700, color: C.terra }}>
              No hidden invoice.
            </em>
          </h2>
          <p style={{ fontSize: 17, color: C.ink2, lineHeight: 1.6 }}>
            All projects scoped against a fixed deliverable. No hourly meter. No surprise milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {TIERS.map((t, i) => (
            <div
              key={t.name}
              style={{
                position: "relative",
                padding: 28,
                background: t.featured ? C.cream3 : C.cream2,
                border: t.featured ? `2px solid ${C.terra}` : `1px solid ${C.rule}`,
                transform: t.featured
                  ? "scale(1.02)"
                  : i % 2 === 0
                    ? "rotate(-0.3deg)"
                    : "rotate(0.3deg)",
              }}
            >
              {t.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "4px 12px",
                    background: C.terra,
                    color: C.cream3,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                  }}
                >
                  Most popular
                </div>
              )}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: C.ink,
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {t.name}
              </h3>
              <p style={{ fontSize: 14, color: C.inkFaint, marginBottom: 20 }}>{t.desc}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "normal",
                    fontSize: 40,
                    fontWeight: 700,
                    color: C.terra,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: C.inkFaint,
                    textTransform: "uppercase",
                    letterSpacing: "0.10em",
                  }}
                >
                  {t.cadence}
                </span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                {t.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 14,
                      color: C.ink2,
                      marginBottom: 10,
                      lineHeight: 1.5,
                    }}
                  >
                    <Check style={{ width: 16, height: 16, color: C.terra, flexShrink: 0, marginTop: 2 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?tier=${encodeURIComponent(t.name)}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  gap: 8,
                  padding: "12px 20px",
                  background: t.featured ? C.terra : "transparent",
                  color: t.featured ? C.cream3 : C.ink,
                  border: t.featured ? "none" : `1px solid ${C.ink}`,
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
