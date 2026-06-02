import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — generic CTA section.
 * Terracotta colour event with cream-3 text + flat 2px button.
 */

const C = {
  cream3: "#FAF7F0",
  terra: "#C66B3F",
  terra2: "#B85A30",
};

export default function CTA() {
  return (
    <section className="section">
      <div className="container-x">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "72px 32px",
            textAlign: "center",
            background: C.terra,
          }}
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: C.cream3,
                opacity: 0.85,
                marginBottom: 18,
              }}
            >
              — Stop trading hours for dollars
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 5vw, 52px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: C.cream3,
                marginBottom: 16,
              }}
            >
              Start trading{" "}
              <em
                style={{
                  fontStyle: "normal",
                  fontWeight: 700,
                  textDecoration: "underline",
                  textDecorationThickness: "1px",
                  textUnderlineOffset: "8px",
                }}
              >
                systems for revenue.
              </em>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "rgba(250, 247, 240, 0.92)",
                maxWidth: "44ch",
                margin: "0 auto 32px",
                lineHeight: 1.6,
              }}
            >
              Free 20-min audit. We&apos;ll Loom you where you&apos;re losing customers and the 1 automation that fixes it.
              No deck. No pitch. Pure signal.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 28px",
                background: C.cream3,
                color: C.terra,
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
              }}
            >
              Start a project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(250, 247, 240, 0.78)",
                marginTop: 18,
              }}
            >
              — Replies in 6 hours · Bali · 9 countries served
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
