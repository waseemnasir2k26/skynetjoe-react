"use client";

import {
  Megaphone,
  Palette,
  Bot,
  Code2,
  Puzzle,
  Wrench,
  Terminal,
} from "lucide-react";

type Card = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
};

// No per-category counts here on purpose: only the categories themselves are
// documented (SERVICE_CATEGORIES in src/lib/site.ts). We don't have receipts
// for a per-category volume breakdown, so we don't publish invented numbers.
const CARDS: Card[] = [
  {
    icon: Megaphone,
    label: "Marketing campaigns",
    sub: "Ad sets, funnels, email drips, content engines.",
  },
  {
    icon: Palette,
    label: "Branding builds",
    sub: "Logos, design systems, deck rebrands, brand books.",
  },
  {
    icon: Bot,
    label: "AI automations",
    sub: "n8n + GHL + custom agents. The kind that survive Mondays.",
  },
  {
    icon: Code2,
    label: "Vibe-coded apps & sites",
    sub: "Next.js, internal tools, one-shot dashboards, weekend builds.",
  },
  {
    icon: Puzzle,
    label: "Chrome extensions",
    sub: "Scrapers, overlays, productivity hacks shipped to the store.",
  },
  {
    icon: Wrench,
    label: "Custom plugins",
    sub: "WordPress, n8n nodes, GHL workflows — glue you can read.",
  },
];

function StatCard({ card, i }: { card: Card; i: number }) {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
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
          fontSize: 20,
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: 6,
          letterSpacing: "-0.01em",
        }}
      >
        {card.label}
      </div>
      <p
        style={{
          fontSize: 14,
          color: "var(--ink-2)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {card.sub}
      </p>
    </div>
  );
}

export default function Achievements() {
  return (
    <section
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
              color: "var(--terracotta-aa)",
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{ width: 28, height: 1, background: "var(--terracotta)" }}
            />
            The receipts · 2019 → 2026
          </div>
          <h2
            id="achievements-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
              color: "var(--ink)",
              marginBottom: 14,
            }}
          >
            Six disciplines.{" "}
            <span
              style={{
                fontStyle: "normal",
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              One keyboard.
            </span>
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
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: 20,
          }}
        >
          {CARDS.map((c, i) => (
            <StatCard key={c.label} card={c} i={i} />
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
              background: "var(--cream-2)",
              padding: 24,
              border: "1px solid rgba(26,26,26,0.12)",
              boxShadow: "0 18px 48px rgba(26,26,26,0.12)",
              width: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--terracotta)",
                borderRadius: 2,
                marginBottom: 16,
              }}
            >
              <Terminal className="w-7 h-7" />
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              1 operator
            </div>
            <figcaption
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                paddingTop: 12,
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
                color: "var(--terracotta-aa)",
                marginBottom: 10,
              }}
            >
              — The person behind the count
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.4vw, 26px)",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.25,
                margin: "0 0 10px",
                letterSpacing: "-0.01em",
              }}
            >
              Waseem Nasir — founder, builder, the one who{" "}
              <span
                style={{
                  fontStyle: "normal",
                  color: "var(--terracotta-aa)",
                  fontWeight: 700,
                }}
              >
                actually ships.
              </span>
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
