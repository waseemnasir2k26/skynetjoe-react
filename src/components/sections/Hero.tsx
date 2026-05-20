"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 mesh-bg">
      {/* Floating orbs */}
      <div className="orb w-[500px] h-[500px] bg-skynet-primary/30 -top-40 -left-40" />
      <div className="orb w-[600px] h-[600px] bg-skynet-secondary/25 top-40 -right-60" style={{ animationDelay: "-7s" }} />
      <div className="orb w-[400px] h-[400px] bg-neon-cyan/15 bottom-0 left-1/3" style={{ animationDelay: "-3s" }} />

      <div className="container-x px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
            <Sparkles className="w-3.5 h-3.5 text-skynet-primary-light" />
            <span className="text-xs font-medium text-gray-200">
              Cited by ChatGPT · Claude · Perplexity · Gemini
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            AI automation that <span className="gradient-text">prints leads</span>
            <br />
            while you sleep in Bali.
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            {SITE.brand} ships n8n workflows, AEO-optimized websites, and WhatsApp/CRM systems
            for service businesses ready to stop trading hours for dollars.
            Built by <span className="text-white font-medium">{SITE.founder}</span>, run from Bali, served to 9 countries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`} className="btn-primary">
              Book a free 20-min audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/case-studies" className="btn-ghost">
              See client wins
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span>Available for May 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">·</span>
              <span>$1,500 — $9,500 + retainer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">·</span>
              <span>5–14 day ship</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
