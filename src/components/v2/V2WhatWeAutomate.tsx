import { Check } from "lucide-react";

/**
 * Glass overlay cards sitting over the still-visible 3D scene (semi-
 * transparent + backdrop-blur, so the node cluster the camera has dollied
 * into stays readable behind the copy). Content is the same truthful
 * outcomes already published on the main homepage (Outcomes.tsx) — titles/
 * promises/proof lines copied verbatim, no new numbers invented for V2.
 */
const ITEMS = [
  {
    title: "60-second follow-up, every lead, 24/7",
    promise:
      "Automatic messages fire the moment a lead lands. No app to open. No reminder to set.",
    proof:
      "Bookings doubled in 30 days on the same traffic — wellness studio, Ubud",
  },
  {
    title: "An AI voice that answers your calls",
    promise:
      "It picks up, asks the right questions, and follows up in your language — so no conversation slips through the cracks.",
    proof: "Answers, qualifies, and books the job while you're on site",
  },
  {
    title: "Hours of inbox work, gone by lunch",
    promise:
      "Your inbox gets sorted and pre-drafted the moment mail lands. You skim, approve, and move on with your day.",
    proof: "Routine reply time 6 h → 6 min — logistics group (EU)",
  },
];

export default function V2WhatWeAutomate() {
  return (
    <section
      className="relative flex items-center"
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(48px, 10vw, 96px)",
        paddingBottom: "clamp(48px, 10vw, 96px)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        className="container-x relative"
        style={{
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
        }}
      >
        <div className="max-w-2xl mb-10">
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
              }}
            />
            What we automate
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              fontSize: "clamp(28px, 6vw, 44px)",
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            Real shipped builds.{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>
              Not slideware.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              style={{
                background: "rgba(250, 247, 240, 0.62)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(26,26,26,0.14)",
                borderRadius: 6,
                padding: "clamp(20px, 5vw, 26px)",
                boxShadow: "0 18px 44px rgba(26,26,26,0.10)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "var(--terracotta-aa)",
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                0{i + 1}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 19,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 10,
                  lineHeight: 1.25,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  marginBottom: 16,
                  flex: 1,
                }}
              >
                {item.promise}
              </p>
              <div
                style={{
                  paddingTop: 12,
                  borderTop: "1px solid rgba(26,26,26,0.12)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--ink)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <Check
                  style={{
                    width: 13,
                    height: 13,
                    marginTop: 2,
                    flexShrink: 0,
                    color: "var(--sage)",
                  }}
                />
                <span>{item.proof}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
