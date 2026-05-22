"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Megaphone,
  Palette,
  Bot,
  Code2,
  Puzzle,
  Wrench,
} from "lucide-react";

type Card = {
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  suffix: string;
  label: string;
  sub: string;
  accent: { grad: string; ring: string; glow: string; chip: string };
};

const CARDS: Card[] = [
  {
    icon: Megaphone,
    count: 320,
    suffix: "+",
    label: "Marketing campaigns",
    sub: "Ad sets, funnels, email drips, content engines.",
    accent: {
      grad: "from-cyan-300 to-sky-400",
      ring: "ring-cyan-300/30",
      glow: "shadow-cyan-500/30",
      chip: "text-cyan-300 bg-cyan-400/10 border-cyan-400/30",
    },
  },
  {
    icon: Palette,
    count: 180,
    suffix: "+",
    label: "Branding builds",
    sub: "Logos, design systems, deck rebrands, brand books.",
    accent: {
      grad: "from-amber-300 to-orange-400",
      ring: "ring-amber-300/30",
      glow: "shadow-amber-500/30",
      chip: "text-amber-300 bg-amber-400/10 border-amber-400/30",
    },
  },
  {
    icon: Bot,
    count: 240,
    suffix: "+",
    label: "AI automations",
    sub: "n8n + GHL + custom agents. The kind that survive Mondays.",
    accent: {
      grad: "from-teal-300 to-emerald-400",
      ring: "ring-teal-300/30",
      glow: "shadow-teal-500/30",
      chip: "text-teal-300 bg-teal-400/10 border-teal-400/30",
    },
  },
  {
    icon: Code2,
    count: 110,
    suffix: "+",
    label: "Vibe-coded apps & sites",
    sub: "Next.js, internal tools, one-shot dashboards, weekend builds.",
    accent: {
      grad: "from-fuchsia-300 to-pink-400",
      ring: "ring-fuchsia-300/30",
      glow: "shadow-fuchsia-500/30",
      chip: "text-fuchsia-300 bg-fuchsia-400/10 border-fuchsia-400/30",
    },
  },
  {
    icon: Puzzle,
    count: 60,
    suffix: "+",
    label: "Chrome extensions",
    sub: "Scrapers, overlays, productivity hacks shipped to the store.",
    accent: {
      grad: "from-violet-300 to-purple-400",
      ring: "ring-violet-300/30",
      glow: "shadow-violet-500/30",
      chip: "text-violet-300 bg-violet-400/10 border-violet-400/30",
    },
  },
  {
    icon: Wrench,
    count: 90,
    suffix: "+",
    label: "Custom plugins",
    sub: "WordPress, n8n nodes, GHL workflows — glue you can read.",
    accent: {
      grad: "from-rose-300 to-red-400",
      ring: "ring-rose-300/30",
      glow: "shadow-rose-500/30",
      chip: "text-rose-300 bg-rose-400/10 border-rose-400/30",
    },
  },
];

function useCount(target: number, durationMs = 1400, start: boolean) {
  const [value, setValue] = useState(0);
  const startedAt = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const tick = (now: number) => {
      if (startedAt.current === null) startedAt.current = now;
      const elapsed = now - startedAt.current;
      const t = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [start, target, durationMs]);

  return value;
}

function StatCard({ card, start }: { card: Card; start: boolean }) {
  const value = useCount(card.count, 1500, start);
  const Icon = card.icon;
  return (
    <div
      className={`relative p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-xl ${card.accent.glow}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.accent.grad} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-slate-900" />
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.16em] px-2 py-1 rounded-full border ${card.accent.chip}`}
        >
          Shipped
        </span>
      </div>
      <div
        className={`text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-br ${card.accent.grad} bg-clip-text text-transparent tabular-nums leading-none`}
      >
        {value}
        <span className="text-3xl md:text-4xl align-top">{card.suffix}</span>
      </div>
      <div className="text-sm md:text-base font-semibold text-white mb-1">
        {card.label}
      </div>
      <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
        {card.sub}
      </p>
    </div>
  );
}

export default function Achievements() {
  const [start, setStart] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStart(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section overflow-hidden"
      aria-labelledby="achievements-heading"
      style={{
        background:
          "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
      }}
    >
      {/* ambient orbs */}
      <span
        className="orb"
        style={{
          width: 460,
          height: 460,
          background: "#00D4FF",
          top: -100,
          left: -120,
          opacity: 0.35,
        }}
      />
      <span
        className="orb"
        style={{
          width: 520,
          height: 520,
          background: "#14B8A6",
          bottom: -160,
          right: -120,
          opacity: 0.3,
          animationDelay: "-6s",
        }}
      />

      <div className="container-x relative z-10 px-6">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            The receipts · 2022 → 2026
          </div>
          <h2
            id="achievements-heading"
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white"
          >
            1,000+ shipped.{" "}
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
              Most under one keyboard.
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl">
            Four years, one operator, one AI cofounder. No SDR team, no offshore
            handoff — just one human stacking work, week after week, from a Bali
            cafe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {CARDS.map((c) => (
            <StatCard key={c.label} card={c} start={start} />
          ))}
        </div>

        {/* The human behind the number */}
        <div className="mt-14 md:mt-16 grid md:grid-cols-[auto_1fr] gap-7 md:gap-9 items-center">
          <div
            className="relative w-40 h-52 md:w-56 md:h-72 rounded-2xl overflow-hidden ring-1 ring-cyan-400/30 shadow-2xl shadow-cyan-500/20 mx-auto md:mx-0"
            style={{ flexShrink: 0 }}
          >
            <Image
              src="/portraits/waseem-builder-portrait.jpg"
              alt="Waseem Nasir, founder of SkynetLabs, at a Bali cafe — the one who actually ships"
              fill
              sizes="(min-width: 768px) 224px, 160px"
              className="object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(6,24,39,0.85) 100%)",
              }}
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-2">
              The person behind the count
            </p>
            <p className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
              Waseem Nasir — founder, builder, the one who actually ships.
            </p>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl">
              No account managers. No junior layer. When you hire SkynetLabs
              you hire this guy and the Claude session running on his second
              monitor. Bali → your business, in 5–14 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
