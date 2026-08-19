"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CountUp from "@/components/home/CountUp";
import Reveal from "@/components/home/Reveal";
import { CAPTIONS, PROOF_STATS } from "./particleData";

/**
 * Premium static composition for mobile/touch, prefers-reduced-motion, and
 * WebGL-unavailable browsers — no pin, no 3D, no scroll-scrub. Same 4-state
 * narrative as the pinned particle beat, stacked in normal document flow.
 * Ink background + radial rust gradients stand in for the particle field
 * (CSS-only, per build brief: "pre-designed SVG/gradient with the same
 * narrative captions stacked"), so the story reads identically without a
 * live WebGL context.
 */
export default function V7StaticFallback() {
  return (
    <section
      aria-label="Stop losing customers while you're busy"
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* The sitewide Header is `position:fixed` and transparent until the
          user scrolls (Header.tsx: bg-transparent below scrollY 24) — every
          other route's hero sits on a light/cream background, so the
          header's dark logo + nav text stay legible floating over it. This
          route's hero is deliberately dark ink, so without this band the
          transparent header would float over near-black content and its
          own nav become unreadable. A plain cream band matching the
          header's own footprint (--promo-h + the ~64px nav row already
          assumed elsewhere in Header.tsx's mobile-drawer max-height calc)
          keeps the header legible here exactly like it is everywhere else,
          before the real dark hero starts. */}
      <div
        aria-hidden="true"
        style={{
          height: "calc(var(--promo-h, 44px) + 64px)",
          background: "var(--cream-3)",
        }}
      />
      {/* State 1 — hero */}
      <div
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(40px, 10vw, 80px)",
          paddingBottom: "clamp(48px, 10vw, 88px)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 22% 20%, rgba(198,107,63,0.32) 0, transparent 52%),
              radial-gradient(at 80% 70%, rgba(198,107,63,0.16) 0, transparent 55%)
            `,
          }}
        />
        <div className="container-x relative">
          <div style={{ maxWidth: 640 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta)",
                marginBottom: 20,
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
              V7 preview · particle field
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                fontSize: "clamp(32px, 8.4vw, 60px)",
                margin: "0 0 20px",
                color: "var(--cream)",
                wordBreak: "break-word",
              }}
            >
              Stop losing customers{" "}
              <span style={{ color: "var(--terracotta)" }}>
                while you&rsquo;re busy.
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(15.5px, 4vw, 18px)",
                color: "rgba(242,239,230,0.78)",
                maxWidth: "52ch",
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              We set up smart tools that reply to every new customer in seconds,
              follow up for you automatically, and handle the boring repeat work
              — so you win more jobs without working more hours.
            </p>
            <Link
              href="/discovery-call"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "15px 26px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                minHeight: 48,
              }}
            >
              Book a free 30-min check-up
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* State 2 — workflow */}
      <Reveal>
        <div
          className="container-x"
          style={{
            padding: "clamp(40px, 9vw, 72px) 0",
            borderTop: "1px solid rgba(242,239,230,0.1)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--terracotta)",
              marginBottom: 14,
            }}
          >
            The workflow
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(24px, 6vw, 36px)",
              lineHeight: 1.2,
              color: "var(--cream)",
              maxWidth: "20ch",
            }}
          >
            {CAPTIONS[1]}
          </h2>
          <p className="sr-only">
            A lead reaches the site, an AI agent replies and qualifies it, the
            CRM logs it, and a booking or follow-up goes out automatically.
          </p>
        </div>
      </Reveal>

      {/* State 3 — proof */}
      <Reveal>
        <div
          className="container-x"
          style={{
            padding: "clamp(40px, 9vw, 72px) 0",
            borderTop: "1px solid rgba(242,239,230,0.1)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--terracotta)",
              marginBottom: 14,
            }}
          >
            The receipts
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(24px, 6vw, 36px)",
              lineHeight: 1.2,
              color: "var(--cream)",
              marginBottom: 28,
              maxWidth: "20ch",
            }}
          >
            {CAPTIONS[2]}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROOF_STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  border: "1px solid rgba(242,239,230,0.14)",
                  padding: "18px 14px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(26px, 6vw, 38px)",
                    color: "var(--terracotta)",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "rgba(242,239,230,0.65)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* State 4 — convergence CTA */}
      <Reveal>
        <div
          className="container-x"
          style={{
            padding: "clamp(48px, 10vw, 88px) 0 clamp(56px, 12vw, 96px)",
            borderTop: "1px solid rgba(242,239,230,0.1)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(26px, 6.5vw, 40px)",
              lineHeight: 1.2,
              color: "var(--cream)",
              marginBottom: 24,
              maxWidth: "22ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {CAPTIONS[3]}
          </h2>
          <Link
            href="/discovery-call"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              padding: "17px 30px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              minHeight: 48,
              boxShadow: "0 18px 44px rgba(0,0,0,0.35)",
            }}
          >
            Book a free 30-min check-up
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
