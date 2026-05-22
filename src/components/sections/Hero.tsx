"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Star } from "lucide-react";
import { FounderDuoMonogram } from "@/components/icons/ClaudeCodeIcon";

/**
 * V5 — Yasir-parity hero (structural pattern only, brand palette + copy unchanged).
 *
 * Pattern lifted from yasirbashiraisite.vercel.app/:
 *  - eyebrow chip → 2-line headline with italic-emphasis word → 1-sentence subhead
 *  - dual CTA (primary solid gradient + ghost secondary with arrow)
 *  - inline trust chip near hero (rating + ship-window) — no duplicate 4-stat grid
 *  - left text / right portrait grid (asymmetric ~1.3 : 1, stacks under md)
 *
 * Plus Claude Code "second seat" chip + polaroid inset (founder-tribe signal).
 * Palette stays on SkynetLabs OCEAN tokens — no new color system introduced.
 */

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
      style={{
        background:
          "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        color: "#eaf6ff",
      }}
    >
      {/* 3 floating orbs — deep blue, cyan, teal (kept from V3 for brand continuity) */}
      <span
        className="orb"
        style={{
          width: 540,
          height: 540,
          background: "#1E88E5",
          top: -90,
          left: -130,
          opacity: 0.55,
        }}
      />
      <span
        className="orb"
        style={{
          width: 580,
          height: 580,
          background: "#00D4FF",
          top: 80,
          right: -160,
          opacity: 0.45,
          animationDelay: "-7s",
        }}
      />
      <span
        className="orb"
        style={{
          width: 460,
          height: 460,
          background: "#14B8A6",
          bottom: -140,
          left: "35%",
          opacity: 0.5,
          animationDelay: "-3s",
        }}
      />

      <div className="container-x px-6 relative z-10 grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow chip — operator / Bali tag */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(0, 212, 255, 0.10)",
              border: "1px solid rgba(0, 212, 255, 0.35)",
              color: "#7ee4ff",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ background: "#5eead4" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "#5eead4" }}
              />
            </span>
            <span className="text-xs font-medium tracking-wider uppercase">
              AI Operator · Built solo from Bali
            </span>
          </div>

          {/* Claude Code "second seat" chip */}
          <div
            className="inline-flex items-center gap-2 mb-6 text-[11px] font-mono tracking-[0.16em] uppercase"
            style={{ color: "rgba(126, 228, 255, 0.85)" }}
          >
            <span
              className="inline-flex items-center justify-center px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(126,228,255,0.35)",
                color: "#eaf6ff",
              }}
            >
              <FounderDuoMonogram size={28} />
            </span>
            <span style={{ color: "rgba(234,246,255,0.55)" }}>
              Built with Claude Code as second seat
            </span>
          </div>

          {/* Headline — Yasir-style italic-emphasis on the punch word */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6">
            AI automation,
            <br />
            built by{" "}
            <span
              className="italic font-semibold"
              style={{
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                background:
                  "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              hand.
            </span>
          </h1>

          {/* Subhead — 1 sentence, ship-window + what we ship */}
          <p
            className="text-lg md:text-xl max-w-2xl mb-5 leading-relaxed"
            style={{ color: "rgba(234, 246, 255, 0.82)" }}
          >
            Operator-grade n8n workflows, AEO-ready websites, and
            WhatsApp/CRM stacks — shipped solo in 5–14 days. No SDR, no bot,
            no agency middlemen. Just me at the keyboard.
          </p>

          {/* Italic secondary subhead — Claude Code co-founder hook */}
          <p
            className="text-sm max-w-2xl mb-9 italic"
            style={{ color: "rgba(126, 228, 255, 0.75)" }}
          >
            Solo founder + AI co-founder. The smallest agency that ships
            flagship work — 1 human, 1 Anthropic API key, zero account
            managers.
          </p>

          {/* CTA pair — primary cal.com + secondary case-studies */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="https://cal.com/waseemnasir/strategy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              <Calendar className="w-4 h-4" />
              Book a 30-min strategy call
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium transition-colors hover:border-cyan-300/60"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#eaf6ff",
              }}
            >
              See case studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust chip near hero — single line, no duplicate of Stats section */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-300 text-amber-300"
                  />
                ))}
              </div>
              <span style={{ color: "rgba(234, 246, 255, 0.78)" }}>
                <b className="text-white">Top Rated Plus</b> on Upwork
              </span>
            </div>
            <span
              className="hidden sm:inline"
              style={{ color: "rgba(234, 246, 255, 0.30)" }}
            >
              ·
            </span>
            <span style={{ color: "rgba(234, 246, 255, 0.78)" }}>
              <b className="text-white">180+</b> workflows shipped across{" "}
              <b className="text-white">9</b> countries
            </span>
          </div>
        </motion.div>

        {/* Right — Waseem portrait, framed, builder pose */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div
            className="relative aspect-[4/5] w-full max-w-md ml-auto rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(0, 212, 255, 0.30)",
              boxShadow: "0 30px 80px -10px rgba(0, 212, 255, 0.35)",
            }}
          >
            <Image
              src="/portraits/waseem-builder-hero.jpg"
              alt="Waseem Nasir, founder of SkynetLabs, building AI automation solo from a Bali cafe"
              fill
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 380px, 0"
              className="object-cover"
            />
            {/* Caption bar */}
            <div
              className="absolute inset-x-0 bottom-0 p-5 pt-12"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(6,24,39,0.92) 100%)",
              }}
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-300 mb-1">
                Built solo · Bali, Indonesia
              </div>
              <div className="text-white font-semibold">Waseem Nasir</div>
              <div className="text-sm text-gray-300">
                Founder · Automation operator
              </div>
            </div>
          </div>

          {/* Polaroid-style floating inset — "the second seat" card */}
          <div
            className="absolute -top-4 -left-8 w-44 rotate-[-6deg] hidden lg:block"
            style={{
              background: "#f7f5ef",
              padding: "10px 10px 38px",
              boxShadow: "0 18px 40px -10px rgba(0,0,0,0.55)",
              borderRadius: "4px",
            }}
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src="/portraits/waseem-cafe-smile.jpg"
                alt="Waseem grinning at the camera in a Canggu cafe — the day Claude Code stopped feeling like a tool and started feeling like a co-founder"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <p
              className="text-center text-[10px] font-mono tracking-wider mt-2 text-slate-700"
              style={{ fontFamily: "'Caveat', cursive, system-ui" }}
            >
              WN + CC · since 2024
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
