import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { CASE_STUDIES } from "@/lib/case-studies";

/**
 * Homepage proof section (2026-09-21 simplification) — replaces the old
 * Testimonials + ProofReceipts pair with ONE section.
 *
 * Everything rendered here is read straight from src/lib/case-studies.ts,
 * the one proof file with a no-fabricated-metrics policy in its docblock:
 * the outcome line, the quote and the role-only attribution. Nothing is
 * typed into this component by hand, so it cannot drift from the record.
 *
 * THE ATTRIBUTION STANDARD still applies: quotes carry role + sector only
 * until written consent is on file. testimonialAuthor in case-studies.ts is
 * already role-only for these three records.
 */
const FEATURED_SLUGS = [
  "eu-logistics-email-triage-n8n",
  "northeast-recovery-brand-intake-rescue",
  "us-insurance-gohighlevel-rebuild",
] as const;

const ACCENT = ["var(--terracotta)", "var(--sage)", "var(--terracotta)"];

export default function Proof() {
  const cards = FEATURED_SLUGS.map((slug) =>
    CASE_STUDIES.find((c) => c.slug === slug),
  ).filter((c): c is (typeof CASE_STUDIES)[number] => Boolean(c));

  return (
    <section
      className="section"
      id="proof"
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x">
        <Reveal className="max-w-3xl mb-12">
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
                background: "var(--terracotta-aa)",
                display: "inline-block",
              }}
            />
            Real receipts
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              fontSize: "clamp(28px, 6.5vw, 48px)",
              margin: 0,
              maxWidth: "22ch",
              wordBreak: "break-word",
            }}
          >
            Proof,{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              not a pitch deck.
            </span>
          </h2>
        </Reveal>

      {/* Mobile: one swipeable row instead of three stacked cards — the
          390 px page was 9,963 px tall; card grids were most of it. */}
      <style>{`@media (max-width: 767px){
        .proof-row{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px;
          padding-bottom:6px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
        .proof-row::-webkit-scrollbar{display:none}
        .proof-row>*{flex:0 0 86%;scroll-snap-align:start}
      }`}</style>
        <div className="proof-row grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <article
                style={{
                  position: "relative",
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding:
                    "clamp(22px, 5vw, 28px) clamp(20px, 5vw, 28px) clamp(18px, 4.5vw, 24px)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: ACCENT[i % ACCENT.length],
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--ink-faint)",
                    marginBottom: 12,
                  }}
                >
                  {c.industry} · {c.location}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    margin: "0 0 16px",
                  }}
                >
                  {c.oneLineOutcome}
                </h3>
                <blockquote
                  style={{
                    margin: "0 0 16px",
                    paddingTop: 14,
                    borderTop: "1px solid rgba(26,26,26,0.10)",
                    flex: 1,
                  }}
                >
                  <Quote
                    aria-hidden
                    style={{
                      width: 18,
                      height: 18,
                      color: ACCENT[i % ACCENT.length],
                      opacity: 0.6,
                      marginBottom: 6,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--ink)",
                      lineHeight: 1.55,
                      margin: "0 0 10px",
                    }}
                  >
                    &ldquo;{c.testimonialQuote}&rdquo;
                  </p>
                  <footer
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--ink-faint)",
                    }}
                  >
                    — {c.testimonialAuthor}
                  </footer>
                </blockquote>
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="hover:underline"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--terracotta-aa)",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Read the case study
                  <ArrowRight style={{ width: 12, height: 12 }} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <Link
            href="/case-studies"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--terracotta-aa)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
            }}
          >
            All {CASE_STUDIES.length} case studies
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
