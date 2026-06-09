import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  WhatsAppCRM,
  AIDispatcher,
  ContentPipeline,
} from "@/components/illustrations";

const OUTCOMES = [
  {
    title: "60-second follow-up, every lead, 24/7",
    promise:
      "Automatic messages fire the moment a lead lands. No app to open. No reminder to set.",
    proof: "Intake completion 34% → 71% — NY cosmetic dental practice",
    Art: WhatsAppCRM,
  },
  {
    title: "An AI voice that answers your calls",
    promise:
      "It picks up, asks the right questions, and follows up in your language — so no conversation slips through the cracks.",
    proof: "200+ debtor calls/week handled — clinical recovery network",
    Art: AIDispatcher,
  },
  {
    title: "Hours of inbox work, gone by lunch",
    promise:
      "Your inbox gets sorted and pre-drafted the moment mail lands. You skim, approve, and move on with your day.",
    proof: "3 hr/day → 20 min email triage — US insurance client",
    Art: ContentPipeline,
  },
];

export default function Outcomes() {
  return (
    <section
      className="section relative overflow-hidden"
      style={{
        background: "var(--cream-3)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x relative z-10">
        <div className="max-w-2xl mb-12">
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
            Real shipped builds
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              fontSize: "clamp(26px, 6vw, 40px)",
              margin: 0,
              maxWidth: "22ch",
              wordBreak: "break-word",
            }}
          >
            Win back lost customers.{" "}
            <span
              style={{
                fontStyle: "normal",
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              Shipped in 14 days.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OUTCOMES.map((o, i) => {
            const Art = o.Art;
            return (
              <div
                key={o.title}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding:
                    "clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px) clamp(18px, 4vw, 24px)",
                  // Tilt removed — same ±0.3deg card rotation repeated across
                  // PainPoints → Outcomes → Testimonials read as a template tic.
                  // Tilt now lives only on Testimonials. (P3 motif variety)
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Bespoke decorative SVG (no photo) */}
                <div
                  aria-hidden
                  style={{
                    marginBottom: 18,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(26,26,26,0.10)",
                    aspectRatio: "320 / 180",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <Art className="w-full h-full block" />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "normal",
                    fontSize: 36,
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
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {o.title}
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
                  {o.promise}
                </p>
                <div
                  style={{
                    paddingTop: 12,
                    borderTop: "1px solid rgba(26,26,26,0.10)",
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
                  <span>{o.proof}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/services"
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
            See all 16 services
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
