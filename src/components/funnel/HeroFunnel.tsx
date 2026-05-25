"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, AlertCircle } from "lucide-react";
import R3FHeroBackground from "@/components/r3f/R3FHeroBackground";

export default function HeroFunnel() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      style={{
        background:
          "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        color: "#eaf6ff",
      }}
    >
      <span
        className="orb"
        style={{
          width: 540,
          height: 540,
          background: "#1E88E5",
          top: -90,
          left: -130,
          opacity: 0.5,
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
          opacity: 0.4,
          animationDelay: "-7s",
        }}
      />

      {/* Cinematic R3F scene — desktop-only + reduced-motion-aware (skipped on mobile) */}
      <R3FHeroBackground />

      <div className="container-x px-6 relative z-10 grid md:grid-cols-[1.25fr_1fr] gap-10 md:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(244, 114, 114, 0.10)",
              border: "1px solid rgba(244, 114, 114, 0.30)",
              color: "#fda4a4",
            }}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium tracking-wider uppercase">
              For founders losing leads to slow follow-up
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight mb-6">
            Your business{" "}
            <span
              className="italic font-semibold"
              style={{
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                background:
                  "linear-gradient(120deg, #fda4a4 0%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              leaks money
            </span>
            <br />
            every hour you don&apos;t automate.
          </h1>

          <p
            className="text-lg md:text-xl max-w-xl mb-9 leading-relaxed"
            style={{ color: "rgba(234, 246, 255, 0.82)" }}
          >
            Leads ghost. Follow-ups slip. Content rots in drafts. We plug the
            leaks in 14 days with AI automation that pays for itself.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Book free 30-min leak audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-medium transition-colors hover:border-cyan-300/60"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#eaf6ff",
              }}
            >
              See real results
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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
                <b className="text-white">Top Rated Plus</b> · Upwork
              </span>
            </div>
            <span style={{ color: "rgba(234, 246, 255, 0.30)" }}>·</span>
            <span style={{ color: "rgba(234, 246, 255, 0.78)" }}>
              <b className="text-white">180+</b> automations shipped
            </span>
            <span style={{ color: "rgba(234, 246, 255, 0.30)" }}>·</span>
            <span style={{ color: "rgba(234, 246, 255, 0.78)" }}>
              <b className="text-white">9</b> countries
            </span>
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
              src="/portraits/waseem-builder-hero.jpg"
              alt="Waseem Nasir, founder of SkynetLabs"
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
              <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-300 mb-1">
                Built solo · ships in 14 days
              </div>
              <div className="text-white font-semibold">Waseem Nasir</div>
              <div className="text-sm text-gray-300">
                Founder · Automation operator
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
