"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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

      <div className="container-x px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
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
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{ color: "rgba(234, 246, 255, 0.82)" }}
          >
            We wire them in n8n, replace 4 paid tools with one stack, and hand
            it back so it runs without you. Built solo in Bali, shipped in 5–14
            days, served to 9 countries.
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
      </div>
    </section>
  );
}
