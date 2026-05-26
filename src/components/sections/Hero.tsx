"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Star } from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — legacy main hero.
 * Mirrors /lp/audit visual system. Polaroid portrait, Fraunces serif
 * headline with italic terracotta accent. Drop neon orbs + cyan gradients.
 */

const C = {
  cream: "#F2EFE6",
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  terra2: "#B85A30",
  ochre: "#C9A96E",
  rule: "rgba(26,26,26,0.12)",
};

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 0 96px",
        background: C.cream3,
        borderBottom: `1px solid ${C.rule}`,
        color: C.ink,
      }}
    >
      <div className="container-x px-6 relative z-10 grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow — mono em-dash */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              marginBottom: 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.terra }} />
            AI Operator · Built solo from Bali
          </div>

          {/* Second seat chip */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: C.inkFaint,
              marginBottom: 24,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                background: C.cream2,
                border: `1px solid ${C.rule}`,
                padding: "2px 8px",
                color: C.ink,
                fontWeight: 600,
              }}
            >
              WN + CC
            </span>
            <span>Built with Claude Code as second seat</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6.5vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: C.ink,
              margin: "0 0 24px",
            }}
          >
            AI automation,
            <br />
            built by{" "}
            <em
              style={{
                fontStyle: "italic",
                color: C.terra,
                fontWeight: 500,
              }}
            >
              hand.
            </em>
          </h1>

          <p
            style={{
              fontSize: 19,
              color: C.ink2,
              maxWidth: "52ch",
              lineHeight: 1.55,
              marginBottom: 20,
            }}
          >
            Operator-grade n8n workflows, AEO-ready websites, and
            WhatsApp/CRM stacks — shipped solo in 5–14 days. No SDR, no bot,
            no agency middlemen. Just me at the keyboard.
          </p>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 15,
              color: C.inkFaint,
              maxWidth: "52ch",
              marginBottom: 32,
            }}
          >
            Solo founder + AI co-founder. The smallest agency that ships
            flagship work — 1 human, 1 Anthropic API key, zero account
            managers.
          </p>

          {/* CTA pair */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="https://calendly.com/skynetlabs/schedule-a-free-consultation"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "16px 26px",
                background: C.terra,
                color: C.cream3,
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
              }}
            >
              <Calendar className="w-4 h-4" />
              Book a 30-min strategy call
            </Link>
            <Link
              href="/case-studies"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "15px 24px",
                background: "transparent",
                border: `1px solid ${C.ink}`,
                color: C.ink,
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
              }}
            >
              See case studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust strip — mono */}
          <div
            style={{
              marginTop: 28,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: C.inkFaint,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: C.ochre }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    style={{
                      display: "inline-block",
                      width: 11,
                      height: 11,
                      fill: C.ochre,
                      stroke: "none",
                    }}
                  />
                ))}
              </span>
              <span>
                <span style={{ color: C.ink, fontWeight: 600 }}>Top Rated Plus</span> on Upwork
              </span>
            </div>
            <span style={{ color: C.rule }}>·</span>
            <span>
              <span style={{ color: C.ink, fontWeight: 600 }}>180+</span> workflows ·{" "}
              <span style={{ color: C.ink, fontWeight: 600 }}>9</span> countries
            </span>
          </div>
        </motion.div>

        {/* Polaroid portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <figure
            style={{
              margin: 0,
              transform: "rotate(-1.2deg)",
              background: C.cream3,
              padding: 10,
              border: `1px solid ${C.rule}`,
              boxShadow: "0 18px 48px rgba(26,26,26,0.14)",
              maxWidth: 440,
              marginLeft: "auto",
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
                alt="Waseem Nasir, founder of SkynetLabs, building AI automation solo from a Bali cafe"
                fill
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 380px, 0"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "sepia(0.10) saturate(0.95) contrast(1.02)",
                }}
              />
            </div>
            <figcaption
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                color: C.inkFaint,
                textAlign: "center",
                padding: "12px 0 4px",
              }}
            >
              — Waseem · founder · Bali · GMT+8
            </figcaption>
          </figure>

          {/* Polaroid floating inset */}
          <div
            className="absolute -top-4 -left-8 w-44 hidden lg:block"
            style={{
              transform: "rotate(-6deg)",
              background: C.cream3,
              padding: "10px 10px 32px",
              boxShadow: "0 18px 40px rgba(26,26,26,0.18)",
              border: `1px solid ${C.rule}`,
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
              <Image
                src="/portraits/waseem-cafe-smile.jpg"
                alt="Waseem grinning in a Canggu cafe — the day Claude Code started feeling like a co-founder"
                fill
                sizes="180px"
                style={{ objectFit: "cover", filter: "sepia(0.12) saturate(0.94)" }}
              />
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                marginTop: 8,
                color: C.inkFaint,
                textTransform: "uppercase",
              }}
            >
              WN + CC · since 2024
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
