"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FounderDuoMonogram } from "@/components/icons/ClaudeCodeIcon";

// V3 OCEAN hero — picked from /gradient-lab#picked-03
// Dark ocean gradient bg + 3 orbs (deep blue, cyan, teal) + cyan→mint text gradient

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
      {/* 3 floating orbs — deep blue, cyan, teal */}
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

      <div className="container-x px-6 relative z-10 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(0, 212, 255, 0.12)",
              border: "1px solid rgba(0, 212, 255, 0.40)",
              color: "#7ee4ff",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-medium tracking-wider uppercase">
              Cited by ChatGPT · Claude · Perplexity · Gemini
            </span>
          </div>

          <div
            className="inline-flex items-center gap-2 mb-4 text-[11px] font-mono tracking-[0.16em] uppercase"
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

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Your CRM, calendar, and inbox{" "}
            <span
              style={{
                background:
                  "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              never talk to each other.
            </span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mb-6 leading-relaxed"
            style={{ color: "rgba(234, 246, 255, 0.82)" }}
          >
            We wire them in n8n, replace 4 paid tools with one stack, and hand
            it back so it runs without you. Built solo in Bali, shipped in 5–14
            days, served to 9 countries.
          </p>

          <p
            className="text-sm max-w-2xl mb-10 italic"
            style={{ color: "rgba(126, 228, 255, 0.75)" }}
          >
            Solo founder + AI co-founder. The smallest agency that ships
            flagship work — 1 human, 1 Anthropic API key, zero account
            managers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-transform"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Wire it up
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/n8n-vs-zapier"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium transition-colors"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#eaf6ff",
              }}
            >
              n8n vs Zapier — honest take
            </Link>
          </div>

          <div
            className="mt-14 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.14)" }}
          >
            <div className="flex flex-col gap-1">
              <b className="text-2xl font-extrabold tracking-tight">180+</b>
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: "rgba(234, 246, 255, 0.65)" }}
              >
                Workflows shipped
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <b className="text-2xl font-extrabold tracking-tight">40+</b>
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: "rgba(234, 246, 255, 0.65)" }}
              >
                Websites delivered
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <b className="text-2xl font-extrabold tracking-tight">9</b>
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: "rgba(234, 246, 255, 0.65)" }}
              >
                Countries served
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <b className="text-2xl font-extrabold tracking-tight">5–14d</b>
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: "rgba(234, 246, 255, 0.65)" }}
              >
                Ship window
              </span>
            </div>
          </div>
        </motion.div>

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
              src="/portraits/waseem-cafe-arch.jpg"
              alt="Waseem Nasir, founder of SkynetLabs, building automation from a Bali cafe"
              fill
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 380px, 0"
              className="object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 p-5 pt-12"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(6,24,39,0.92) 100%)",
              }}
            >
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300 mb-1">
                Built solo · 🌴 Bali
              </div>
              <div className="text-white font-semibold">Waseem Nasir</div>
              <div className="text-sm text-gray-300">
                Founder · automation operator
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
