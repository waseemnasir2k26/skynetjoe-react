"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            Frequently Asked
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Things founders ask{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              before booking.
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "bg-white/95 border border-cyan-300/60 shadow-xl shadow-cyan-500/15"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors"
                >
                  <span
                    className={`text-base font-semibold ${
                      isOpen ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {f.q}
                  </span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-cyan-300 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
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
