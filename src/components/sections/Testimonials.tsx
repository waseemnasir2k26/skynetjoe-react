import { Quote } from "lucide-react";

const QUOTES = [
  {
    text: "Waseem rebuilt our entire patient-intake flow in 11 days. We went from 23% show-rate to 71% in 6 weeks. No-show revenue alone paid for the engagement 4x over.",
    name: "Dr Elena Marchetti",
    role: "Founder, Grand Mercer Dental (SoHo NY)",
  },
  {
    text: "The ElevenLabs + n8n recouvrement agent he built for us handles 200+ debtor calls/week in French. Our collection ops team can finally focus on the complex cases.",
    name: "Patrick Mabangu",
    role: "CEO, KODIASIMMO (France)",
  },
  {
    text: "Hired Skynetjoe for one Fiverr gig. Five months later he runs three of our automation stacks. The man delivers.",
    name: "Christelle Dubois",
    role: "Owner, Christelle Wellness",
  },
  {
    text: "Stéphanie's email triage workflow used to eat 3 hours/day. Waseem's GPT-4o + Gmail draft agent dropped it to 20 minutes. She actually went home at 6pm last week.",
    name: "Esther Kalala",
    role: "PM, Takycorp Mining & Logistics",
  },
];

// Alternate terracotta + sage rule colors, slight rotation per card
const ACCENT = [
  { ruleColor: "var(--terracotta)", rotate: "-0.4deg" },
  { ruleColor: "var(--sage)", rotate: "0.4deg" },
  { ruleColor: "var(--terracotta)", rotate: "0.3deg" },
  { ruleColor: "var(--sage)", rotate: "-0.3deg" },
];

export default function Testimonials() {
  return (
    <section
      className="section"
      id="testimonials"
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x">
        <div className="max-w-3xl mb-12">
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
              maxWidth: "26ch",
              wordBreak: "break-word",
            }}
          >
            What founders{" "}
            <span
              style={{
                fontStyle: "normal",
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              actually say
            </span>{" "}
            after we ship.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {QUOTES.map((q, i) => {
            const a = ACCENT[i % ACCENT.length];
            return (
              <article
                key={i}
                style={{
                  position: "relative",
                  padding: "clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px) clamp(18px, 4.5vw, 26px)",
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  transform: `rotate(${a.rotate})`,
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
                    background: a.ruleColor,
                  }}
                />
                <Quote
                  style={{
                    width: 32,
                    height: 32,
                    color: a.ruleColor,
                    opacity: 0.4,
                    position: "absolute",
                    top: 18,
                    right: 18,
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    // Roman (non-italic) for mobile legibility — long serif
                    // italic quote bodies tax readability. (P2 legibility)
                    fontStyle: "normal",
                    fontSize: "clamp(15px, 3.6vw, 17px)",
                    color: "var(--ink)",
                    lineHeight: 1.55,
                    marginBottom: 18,
                    paddingTop: 6,
                    paddingRight: 40,
                    maxWidth: "44ch",
                  }}
                >
                  &ldquo;{q.text}&rdquo;
                </p>
                <footer>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {q.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--ink-faint)",
                      marginTop: 4,
                    }}
                  >
                    — {q.role}
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
