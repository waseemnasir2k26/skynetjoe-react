"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — FAQ section.
 * cream-2 cards with 1px ink border, terracotta accent icon.
 */

const C = {
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  rule: "rgba(26,26,26,0.12)",
};

const FAQS = [
  {
    q: "How fast can you ship?",
    a: "Starter automations: 5 days. Flagship site rebuilds: 14 days. AI agent stacks (voice / live chat / CRM): 7–10 days. Audit booked Monday → first deliverable shipped by end of next week. No 6-week discovery phase.",
  },
  {
    q: "Are you a solo operator or an agency?",
    a: "Solo. I run SkynetLabs alone with Claude (Anthropic's Opus 4.7) as my engineering cofounder. You talk directly to the person doing the work. No PMs, no junior layer, no offshored handoff.",
  },
  {
    q: "What's your stack?",
    a: "n8n (self-hosted), Next.js + Vercel, Supabase, WordPress, GoHighLevel, ElevenLabs, OpenAI / Anthropic / Gemini APIs, Twilio, Stripe, JotForm, ManyChat. Anything that exposes a webhook or REST endpoint is fair game.",
  },
  {
    q: "Do you take retainer clients?",
    a: "Yes — but only after we ship one fixed-scope project together. Retainer is $1,997/mo for 20 hrs. Cap at 3 retainer clients at a time so quality stays high.",
  },
  {
    q: "Why are you in Bali?",
    a: "Digital nomad route since Lahore → Singapore → Bangkok → Malaysia → Bali. Bali is 4–8 hour overlap with EU / US East / APAC clients simultaneously. Plus Wi-Fi in Canggu is genuinely better than Lahore.",
  },
  {
    q: "Will my data be safe?",
    a: "Yes. All client credentials live in your environment (your n8n instance, your CRM, your Vercel). I get scoped access, do the work, then rotate. Source code is yours on day one — pushed to your GitHub, not mine.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <div className="mb-12">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              fontWeight: 600,
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.terra }} />
            Frequently asked
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: C.ink,
            }}
          >
            Things founders ask{" "}
            <em style={{ fontStyle: "italic", color: C.terra }}>
              before booking.
            </em>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: isOpen ? C.cream3 : C.cream2,
                  border: isOpen ? `1px solid ${C.terra}` : `1px solid ${C.rule}`,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: 20,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 17,
                      fontWeight: 600,
                      color: C.ink,
                    }}
                  >
                    {f.q}
                  </span>
                  {isOpen ? (
                    <Minus style={{ width: 18, height: 18, color: C.terra, flexShrink: 0 }} />
                  ) : (
                    <Plus style={{ width: 18, height: 18, color: C.terra, flexShrink: 0 }} />
                  )}
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 20px 20px",
                      fontSize: 15,
                      color: C.ink2,
                      lineHeight: 1.65,
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
