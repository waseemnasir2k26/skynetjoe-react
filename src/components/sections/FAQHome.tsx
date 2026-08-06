/**
 * Homepage FAQ — answer-first, question-phrased headings.
 *
 * Facts sourced only from what's already published elsewhere in this repo:
 *   - Pricing (Starter $1,497 / Pro $5,000, 5-14 day ship window) from
 *     src/lib/service-pricing.ts + src/app/(skynet)/pricing/page.tsx.
 *   - Service catalog (16 services / 4 categories) from src/lib/site.ts
 *     (SERVICE_CATEGORIES).
 *   - NDA facts (sign client NDA, own one-page mutual NDA) from
 *     content/faqs.html; scope-turnaround from
 *     src/app/(skynet)/discovery-call/page.tsx (48h scope, 50% deposit).
 *   - Location/coverage: discovery-call schema's Bali GMT+8, 9am-6pm slot
 *     overlap facts (Europe mornings / US evenings).
 *
 * HOME_FAQS is exported so page.tsx can build the FAQPage JSON-LD from the
 * exact same array — DOM text and schema text can never drift apart.
 */
export const HOME_FAQS = [
  {
    q: "What does SkynetLabs actually do?",
    a: "We build n8n + AI automation, AEO-optimized websites, and chat-first CRM systems for service businesses — 16 services across 4 categories (Automation, AI Content, Development, Consulting), run solo by founder Waseem Nasir from Bali.",
  },
  {
    q: "How much does a project cost?",
    a: "Pricing is public, not a quote form. A single-workflow Starter build runs $1,497 one-time; a multi-system Pro build runs $5,000. Full per-service tiers and a live calculator are on the Pricing page.",
  },
  {
    q: "How fast can you ship?",
    a: "Most builds ship in 5 to 14 days from kickoff — Starter scopes in about 5 to 7 days, larger Pro/flagship builds in 10 to 14 days.",
  },
  {
    q: "What happens after I book the free call?",
    a: "You get a 30-minute audit (not a pitch), then a one-page scope back within 48 hours — deliverables, price, and ship date. A 50% deposit unlocks work at a fixed price, no hourly creep.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes — we sign your standard NDA before scope discussion, and we have a one-page mutual NDA ready if you don't have one. We don't sign non-competes that lock us out of your industry.",
  },
  {
    q: "Do you work with US clients from Bali?",
    a: "Yes. We're async-first from Bali (GMT+8) — call slots run 9am-6pm Bali, which covers Europe mornings and US evenings, with daily Loom updates in between. We've shipped to clients in multiple countries.",
  },
] as const;

export default function FAQHome() {
  return (
    <section
      className="section"
      id="faq"
      style={{
        background: "var(--cream)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
        padding: "clamp(48px, 10vw, 88px) 0",
      }}
    >
      <div
        className="container-x"
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 clamp(16px, 5vw, 24px)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "var(--terracotta-aa)",
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
              background: "var(--terracotta)",
              display: "inline-block",
            }}
          />
          FAQ
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Questions founders{" "}
          <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
            ask before booking.
          </span>
        </h2>
        <div>
          {HOME_FAQS.map((f) => (
            <details
              key={f.q}
              className="group"
              style={{
                borderBottom: "1px solid rgba(26,26,26,0.12)",
                padding: "18px 0",
              }}
            >
              <summary
                className="cursor-pointer flex items-center justify-between gap-4"
                style={{
                  listStyle: "none",
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "-0.005em",
                }}
              >
                <span>{f.q}</span>
                <span
                  className="group-open:rotate-45 transition-transform"
                  style={{
                    color: "var(--terracotta-aa)",
                    fontSize: 20,
                    lineHeight: 1,
                    flex: "none",
                  }}
                >
                  +
                </span>
              </summary>
              <div
                style={{
                  paddingTop: 10,
                  fontSize: 16,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                }}
              >
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
