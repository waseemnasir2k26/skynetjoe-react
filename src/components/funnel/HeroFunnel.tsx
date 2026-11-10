"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, Zap, Repeat, ListChecks } from "lucide-react";
import NodeGraphHero from "@/components/home/NodeGraphHero";
import MagneticButton from "@/components/home/MagneticButton";
import ScrambleText from "@/components/home/ScrambleText";
import { WHATSAPP } from "@/lib/site";
import { RATINGS, REVIEWS } from "@/lib/reviews";

// Shortest verbatim 5-star quote for the hero card.
const HERO_QUOTE = REVIEWS.find((r) => r.country === "Netherlands" && r.stars === 5) ?? REVIEWS[0];

/**
 * Cream editorial hero (2026-06-01 readability + plain-language overhaul).
 *
 *  - Plain-language headline + sub: leads with the OUTCOME, no jargon, no
 *    "automate" above the fold. A non-technical shop owner gets it in 5s.
 *  - Inter h1 (no serif, no italic) — one accent phrase in AA-safe terracotta.
 *  - Founder photo REMOVED. Right column is an icon-driven "what we set up"
 *    card (Lucide icons) per the Webex pattern — diagrams not personal photos.
 *  - Mono em-dash eyebrow + platform trust strip kept; the "180+ workflows /
 *    9 countries" micro-stats were dropped 2026-09-21 (untraceable).
 */

export default function HeroFunnel() {
  // P0 LCP fix (audit-2026-06-28): use reduced-motion preference to skip
  // animation entirely for users who opt out, and always start at opacity:1
  // so the hero H1 and card are visible on first paint — not hidden behind a
  // JS-driven fade-in that inflates Largest Contentful Paint.
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background: "var(--cream-3)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
        paddingTop: "calc(var(--promo-h, 44px) + clamp(96px, 18vw, 144px))",
        paddingBottom: "clamp(56px, 12vw, 112px)",
      }}
    >
      <style>{`@media (max-width: 400px){.trust-sep{display:none}}`}</style>
      <NodeGraphHero />
      <div
        className="container-x relative z-10 grid md:grid-cols-[1.3fr_1fr] items-end"
        style={{
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
          gap: "clamp(28px, 6vw, 56px)",
        }}
      >
        <motion.div
          // LCP fix: hero H1 paints at full opacity on first render.
          // Only the y-transform animates; opacity stays at 1 throughout.
          // prefers-reduced-motion: initial={false} = snap to final state, no motion.
          initial={reducedMotion ? false : { opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
        >
          {/* Mono em-dash eyebrow */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#A8451F",
              marginBottom: 22,
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
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
            AI automation studio · built solo from Bali
            <span style={{ color: "rgba(26,26,26,0.30)" }}>·</span>
            For founders losing leads to slow follow-up
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: "var(--ink)",
              fontSize: "clamp(32px, 8vw, 68px)",
              margin: "0 0 24px",
              wordBreak: "break-word",
            }}
          >
            <ScrambleText text="Stop losing customers" />{" "}
            <em
              style={{
                fontStyle: "normal",
                color: "#A8451F",
                fontWeight: 700,
              }}
            >
              <ScrambleText text="while you're busy." />
            </em>
          </h1>

          <p
            style={{
              fontSize: "clamp(17px, 4vw, 20px)",
              color: "var(--ink-2)",
              maxWidth: "54ch",
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            We set up smart tools that reply to every new customer in seconds,
            follow up for you automatically, and handle the boring repeat
            work&nbsp;— so you win more jobs without working more hours.
          </p>

          {/* Trust strip — mono, minimal */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "var(--ink-faint)",
              marginBottom: 28,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              rowGap: 8,
            }}
          >
            <span style={{ color: "#A8451F" }}>
              <Star
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  verticalAlign: "-2px",
                  marginRight: 4,
                  fill: "#A8451F",
                  stroke: "none",
                }}
              />
              Level 2 agency · Fiverr
            </span>
            <span
              className="trust-sep"
              style={{ margin: "0 8px", color: "rgba(26,26,26,0.18)" }}
            >
              ·
            </span>
            <span style={{ color: "#A8451F" }}>
              <Star
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  verticalAlign: "-2px",
                  marginRight: 4,
                  fill: "#A8451F",
                  stroke: "none",
                }}
              />
              Established 2018
            </span>
            {/* 2026-09-21: "180+ workflows · 9 countries" removed — not
                traceable to src/lib/case-studies.ts (board-truth rule). */}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 24,
            }}
          >
            <MagneticButton>
              <Link
                href={WHATSAPP.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "14px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "background 0.18s",
                  textDecoration: "none",
                  minHeight: 48,
                }}
              >
                Chat on WhatsApp
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
            </MagneticButton>
            <Link
              href="/case-studies"
              className="hover:underline"
              style={{
                background: "transparent",
                color: "var(--ink-faint)",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                textUnderlineOffset: 3,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              See real results
              <ArrowRight style={{ width: 13, height: 13 }} />
            </Link>
          </div>

          {/* Real review proof in the hero (single source: src/lib/reviews.ts).
              2026-11-10: was a small mono line Waseem couldn't spot — now a
              visible card: stars, rating, one verbatim quote, links. */}
          <div
            style={{
              marginTop: 22,
              maxWidth: 560,
              background: "var(--cream-2, #F3EEE6)",
              border: "1px solid rgba(26,26,26,0.12)",
              borderLeft: "3px solid #A8451F",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                columnGap: 10,
                rowGap: 4,
              }}
            >
              <span role="img" aria-label={`Rated ${RATINGS.fiverr.rating} out of 5`} style={{ display: "inline-flex", gap: 2 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    style={{ width: 16, height: 16, fill: "#A8451F", stroke: "#A8451F", strokeWidth: 0 }}
                  />
                ))}
              </span>
              <a
                href={RATINGS.fiverr.url}
                target="_blank"
                rel="noopener"
                className="hover:underline"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--ink)",
                  textDecoration: "none",
                  textUnderlineOffset: 3,
                }}
              >
                {RATINGS.fiverr.rating}/5 from {RATINGS.fiverr.count} reviews on Fiverr
              </a>
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--ink)",
              }}
            >
              “{HERO_QUOTE.text}”{" "}
              <span style={{ color: "var(--ink-faint)", fontSize: 12 }}>
                — Fiverr client, {HERO_QUOTE.country}
              </span>
            </p>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.04em",
                display: "flex",
                flexWrap: "wrap",
                columnGap: 16,
                rowGap: 6,
              }}
            >
              <a href="#reviews" className="hover:underline" style={{ color: "#A8451F", textDecoration: "none", textUnderlineOffset: 3 }}>
                Read client reviews ↓
              </a>
              <a
                href={RATINGS.google.url}
                target="_blank"
                rel="noopener"
                className="hover:underline"
                style={{ color: "#A8451F", textDecoration: "none", textUnderlineOffset: 3 }}
              >
                ★ {RATINGS.google.rating} · {RATINGS.google.count} Google reviews
              </a>
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
              marginTop: 12,
            }}
          >
            — Bali hours · GMT+8 · usually books within 48 hours
          </div>
        </motion.div>

        {/* Icon-driven "what we set up" card — replaces founder photo.
            Diagrams/icons, not personal photography (Webex pattern). */}
        <motion.div
          // LCP fix: card starts visible (opacity:1); only scale eases in.
          // prefers-reduced-motion: snap to final state.
          initial={reducedMotion ? false : { opacity: 1, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            delay: reducedMotion ? 0 : 0.15,
          }}
          className="relative block"
          style={{
            width: "100%",
            maxWidth: 420,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.14)",
              borderRadius: 4,
              boxShadow: "0 18px 48px rgba(26,26,26,0.10)",
              padding: "clamp(20px, 5vw, 28px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#A8451F",
                marginBottom: 18,
              }}
            >
              What we set up for you
            </div>
            {[
              {
                Icon: Zap,
                title: "Instant replies",
                body: "Every new lead gets a friendly answer within a minute — day or night.",
              },
              {
                Icon: Repeat,
                title: "Automatic follow-up",
                body: "Polite reminders go out for you until they book or buy. Nothing slips.",
              },
              {
                Icon: ListChecks,
                title: "Repeat work, handled",
                body: "The boring admin runs itself, so your team works on what actually pays.",
              },
            ].map(({ Icon, title, body }, i) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  paddingTop: i === 0 ? 0 : 16,
                  paddingBottom: 16,
                  borderTop: i === 0 ? "none" : "1px solid rgba(26,26,26,0.08)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: 40,
                    height: 40,
                    borderRadius: 4,
                    background: "rgba(168,69,31,0.08)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={{ width: 20, height: 20, color: "#A8451F" }}
                    strokeWidth={2}
                  />
                </span>
                <span>
                  <span
                    style={{
                      display: "block",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "var(--ink)",
                      marginBottom: 2,
                    }}
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--ink-2)",
                    }}
                  >
                    {body}
                  </span>
                </span>
              </div>
            ))}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                paddingTop: 14,
                borderTop: "1px solid rgba(26,26,26,0.08)",
              }}
            >
              Live in about 14 days
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
