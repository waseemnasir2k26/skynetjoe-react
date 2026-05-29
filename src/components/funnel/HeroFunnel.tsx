"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

/**
 * Cream editorial hero — converted from dark navy + R3F orbs.
 *
 *  - Cream paper ground, ink type, terracotta accent (mirrors /lp/audit)
 *  - Fraunces serif h1 with italic terracotta accent on key phrase
 *  - Mono em-dash eyebrow (drops chip/pill)
 *  - Flat terracotta primary CTA + ghost ink-border secondary, 2px radius, no glow
 *  - Polaroid portrait, rotated, sepia filter, 1px ink border
 *  - Trust strip in mono with bullet separators
 *  - R3F orbs removed (no decorative noise on cream)
 */

export default function HeroFunnel() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--cream-3)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
        paddingTop: "clamp(96px, 18vw, 144px)",
        paddingBottom: "clamp(56px, 12vw, 112px)",
      }}
    >
      <style>{`@media (max-width: 400px){.trust-sep{display:none}}`}</style>
      <div
        className="container-x relative z-10 grid md:grid-cols-[1.3fr_1fr] items-end"
        style={{
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
          gap: "clamp(28px, 6vw, 56px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mono em-dash eyebrow */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 22,
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
            For founders losing leads to slow follow-up
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "var(--ink)",
              fontSize: "clamp(32px, 8vw, 72px)",
              margin: "0 0 24px",
              wordBreak: "break-word",
            }}
          >
            Your business{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              leaks money
            </em>
            <br />
            every hour you don&apos;t automate.
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 4vw, 19px)",
              color: "var(--ink-2)",
              maxWidth: "52ch",
              lineHeight: 1.55,
              marginBottom: 28,
            }}
          >
            Leads ghost. Follow-ups slip. Content rots in drafts. We plug the
            leaks in 14 days with AI automation that pays for itself.
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
            <span style={{ color: "var(--terracotta)" }}>
              <Star
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  verticalAlign: "-2px",
                  marginRight: 4,
                  fill: "var(--terracotta)",
                  stroke: "none",
                }}
              />
              Top Rated Plus · Upwork
            </span>
            <span className="trust-sep" style={{ margin: "0 8px", color: "rgba(26,26,26,0.18)" }}>·</span>
            <span style={{ color: "var(--terracotta)" }}>
              <Star
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  verticalAlign: "-2px",
                  marginRight: 4,
                  fill: "var(--terracotta)",
                  stroke: "none",
                }}
              />
              Top Rated · Fiverr
            </span>
            <span className="trust-sep" style={{ margin: "0 8px", color: "rgba(26,26,26,0.18)" }}>·</span>
            <span>
              <span style={{ color: "var(--ink)" }}>180+</span> automations
            </span>
            <span className="trust-sep" style={{ margin: "0 8px", color: "rgba(26,26,26,0.18)" }}>·</span>
            <span>
              <span style={{ color: "var(--ink)" }}>9</span> countries
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/discovery-call"
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
              Book free 30-min leak audit
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link
              href="/case-studies"
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                padding: "13px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                minHeight: 48,
              }}
            >
              See real results
            </Link>
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
              marginTop: 20,
            }}
          >
            — Bali hours · GMT+8 · usually books within 48 hours
          </div>
        </motion.div>

        {/* Polaroid portrait — rotated, sepia, 1px ink border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative block"
        >
          <figure
            style={{
              margin: 0,
              transform: "rotate(-1.2deg)",
              background: "var(--cream-3)",
              padding: 10,
              border: "1px solid rgba(26,26,26,0.18)",
              boxShadow: "0 18px 48px rgba(26,26,26,0.18)",
              width: "100%",
              maxWidth: 420,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
              }}
            >
              <Image
                src="/portraits/waseem-builder-hero.jpg"
                alt="Waseem Nasir, founder of SkynetLabs"
                fill
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 380px, 90vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "contrast(1.02)",
                }}
              />
            </div>
            <figcaption
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                color: "var(--ink-faint)",
                textAlign: "center",
                paddingTop: 12,
              }}
            >
              Waseem · founder · Bali · GMT+8
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
