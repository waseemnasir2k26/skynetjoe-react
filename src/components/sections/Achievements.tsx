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
};

const CARDS: Card[] = [
  {
    icon: Megaphone,
    count: 320,
    suffix: "+",
    label: "Marketing campaigns",
    sub: "Ad sets, funnels, email drips, content engines.",
  },
  {
    icon: Palette,
    count: 180,
    suffix: "+",
    label: "Branding builds",
    sub: "Logos, design systems, deck rebrands, brand books.",
  },
  {
    icon: Bot,
    count: 240,
    suffix: "+",
    label: "AI automations",
    sub: "n8n + GHL + custom agents. The kind that survive Mondays.",
  },
  {
    icon: Code2,
    count: 110,
    suffix: "+",
    label: "Vibe-coded apps & sites",
    sub: "Next.js, internal tools, one-shot dashboards, weekend builds.",
  },
  {
    icon: Puzzle,
    count: 60,
    suffix: "+",
    label: "Chrome extensions",
    sub: "Scrapers, overlays, productivity hacks shipped to the store.",
  },
  {
    icon: Wrench,
    count: 90,
    suffix: "+",
    label: "Custom plugins",
    sub: "WordPress, n8n nodes, GHL workflows — glue you can read.",
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

function StatCard({ card, start, i }: { card: Card; start: boolean; i: number }) {
  const value = useCount(card.count, 1500, start);
  const Icon = card.icon;
  const rotate = i % 2 === 0 ? "-0.3deg" : "0.3deg";
  return (
    <div
      style={{
        background: "var(--cream-2)",
        border: "1px solid rgba(26,26,26,0.12)",
        padding: "28px",
        transform: `rotate(${rotate})`,
        transition: "transform 0.25s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--terracotta)",
            borderRadius: 2,
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "var(--ink-faint)",
          }}
        >
          — shipped
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 56,
          fontWeight: 500,
          color: "var(--terracotta)",
          lineHeight: 1,
          marginBottom: 10,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
        <span style={{ fontSize: 32 }}>{card.suffix}</span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: 6,
          letterSpacing: "-0.01em",
        }}
      >
        {card.label}
      </div>
      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>
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
      aria-labelledby="achievements-heading"
      style={{
        background: "var(--cream-3)",
        padding: "72px 0",
        borderTop: "1px solid rgba(26,26,26,0.10)",
        borderBottom: "1px solid rgba(26,26,26,0.10)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ maxWidth: 720, marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
            The receipts · 2022 → 2026
          </div>
          <h2
            id="achievements-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
              color: "var(--ink)",
              marginBottom: 14,
            }}
          >
            1,000+ shipped.{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 500 }}>
              Most under one keyboard.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              lineHeight: 1.6,
              maxWidth: "52ch",
            }}
          >
            Four years, one operator, one AI cofounder. No SDR team, no offshore
            handoff — just one human stacking work, week after week, from a Bali
            cafe.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {CARDS.map((c, i) => (
            <StatCard key={c.label} card={c} start={start} i={i} />
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 28,
            alignItems: "center",
          }}
          className="ach-author"
        >
          <style>{`
            @media (max-width: 640px) {
              .ach-author { grid-template-columns: 1fr !important; text-align: center; }
              .ach-author figure { margin: 0 auto; }
            }
          `}</style>
          <figure
            style={{
              margin: 0,
              transform: "rotate(-1.2deg)",
              background: "var(--cream-3)",
              padding: 10,
              border: "1px solid rgba(26,26,26,0.12)",
              boxShadow: "0 18px 48px rgba(26,26,26,0.12)",
              width: 220,
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
                src="/portraits/waseem-builder-portrait.jpg"
                alt="Waseem Nasir, founder of SkynetLabs, at a Bali cafe — the one who actually ships"
                fill
                sizes="220px"
                style={{
                  objectFit: "cover",
                  filter: "none",
                }}
              />
            </div>
            <figcaption
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                textAlign: "center",
                paddingTop: 10,
              }}
            >
              Waseem · Bali · GMT+8
            </figcaption>
          </figure>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--terracotta)",
                marginBottom: 10,
              }}
            >
              — The person behind the count
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.4vw, 26px)",
                fontWeight: 500,
                color: "var(--ink)",
                lineHeight: 1.25,
                margin: "0 0 10px",
                letterSpacing: "-0.01em",
              }}
            >
              Waseem Nasir — founder, builder, the one who{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                actually ships.
              </em>
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.65,
                maxWidth: "52ch",
                margin: 0,
              }}
            >
              No account managers. No junior layer. When you hire SkynetLabs you
              hire this guy and the Claude session running on his second
              monitor. Bali → your business, in 5–14 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
