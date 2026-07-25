import { Quote } from "lucide-react";

// Quotes are sourced verbatim from src/lib/case-studies.ts (testimonialQuote /
// testimonialAuthor), the one proof file with a no-fabrication policy in its
// docblock.
//
// THE ATTRIBUTION STANDARD (applies site-wide; state it, don't improvise):
//   * A QUOTE is a personal statement, so publishing a name against it needs
//     that person's consent. Until consent is on file, quotes carry role +
//     sector only -- which is why this file names nobody.
//   * A CASE-STUDY RECORD is a description of work performed, not words put in
//     someone's mouth. Those may name the client (see case-studies.ts and
//     industries.ts), except where a client has asked not to be named.
// That is the line. It is not "anonymise everything" and it is not
// "name everything" -- consent governs quotes, and only quotes.
//
// Do NOT add a company name, a client's personal name, or a numeric outcome
// here without written client approval on file. Approval requests are drafted
// in memory/site-watch/2026-W30-owner-actions.html.
const QUOTES = [
  {
    text: "We've tried three automation contractors before Waseem. He's the first one who asked us to print our inbox and walk through 100 threads with him before writing a single node. That's why it actually works.",
    name: "Operations Director",
    role: "Freight & logistics group (EU)",
  },
  {
    text: "He had it fixed before lunch. The previous agency took 6 weeks and left us with a form that didn't work.",
    name: "Clinical Director",
    role: "Clinical recovery network (US)",
  },
  {
    text: "I stopped explaining the same things in DMs five times a day. The site does it now, and in my voice. I didn't realize how much energy that was draining until it stopped.",
    name: "Wellness practitioner",
    role: "Independent studio, Ubud",
  },
  {
    text: "Seventh time we've hired Waseem. Nothing else to add — the result is the result.",
    name: "Operations Lead",
    role: "Insurance retainer client (US)",
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
              color: "#A8451F",
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
                background: "#A8451F",
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
                  padding:
                    "clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px) clamp(18px, 4.5vw, 26px)",
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
