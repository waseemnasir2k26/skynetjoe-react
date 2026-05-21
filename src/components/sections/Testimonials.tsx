import { Quote, Terminal } from "lucide-react";
import { ClaudeCodeAvatar } from "@/components/icons/ClaudeCodeIcon";

const QUOTES = [
  {
    text: "Waseem rebuilt our entire patient-intake flow in 11 days. We went from 23% show-rate to 71% in 6 weeks. No-show revenue alone paid for the engagement 4x over.",
    name: "Dr Elena Marchetti",
    role: "Founder, Grand Mercer Dental (SoHo NY)",
  },
  {
    text: "The ElevenLabs + n8n recouvrement agent he built for us handles 200+ debtor calls/week in French. Our collection ops team can finally focus on the complex cases.",
    name: "mabangu",
    role: "CEO, KODIASIMMO (France)",
  },
  {
    text: "Hired Skynetjoe for one Fiverr gig. Five months later he runs three of our automation stacks. The man delivers.",
    name: "Christelle",
    role: "Owner, Christelle Wellness",
  },
  {
    text: "Stéphanie's email triage workflow used to eat 3 hours/day. Waseem's GPT-4o + Gmail draft agent dropped it to 20 minutes. She actually went home at 6pm last week.",
    name: "Esther",
    role: "PM, Takycorp Mining & Logistics",
  },
];

const ACCENTS = [
  { ribbon: "from-cyan-400 to-sky-500", quote: "text-cyan-500/60", border: "border-cyan-300/60" },
  { ribbon: "from-rose-400 to-amber-400", quote: "text-rose-500/60", border: "border-rose-300/60" },
  { ribbon: "from-teal-400 to-emerald-500", quote: "text-teal-500/60", border: "border-teal-300/60" },
  { ribbon: "from-violet-400 to-fuchsia-500", quote: "text-violet-500/60", border: "border-violet-300/60" },
];

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            Real receipts
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            What founders{" "}
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 bg-clip-text text-transparent">
              actually say
            </span>{" "}
            after we ship.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {QUOTES.map((q, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={i}
                className={`relative p-7 rounded-2xl bg-white/95 border ${a.border} shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                <div
                  className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${a.ribbon}`}
                />
                <Quote
                  className={`w-10 h-10 ${a.quote} absolute top-6 right-5`}
                />
                <p className="text-base text-slate-800 leading-relaxed mb-5 pt-2">
                  &ldquo;{q.text}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {q.name}
                  </div>
                  <div className="text-xs text-slate-500">{q.role}</div>
                </div>
              </div>
            );
          })}

          {/* The co-founder testimonial — clearly tongue-in-cheek */}
          <div
            className="relative p-7 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden md:col-span-2"
            style={{
              background:
                "linear-gradient(135deg, #0f0f12 0%, #1a1a1f 50%, #0a1a1f 100%)",
              border: "1px solid rgba(217, 119, 87, 0.40)",
            }}
          >
            <div
              className="absolute top-0 inset-x-0 h-1.5"
              style={{
                background:
                  "linear-gradient(90deg, #D97757 0%, #14B8A6 100%)",
              }}
            />
            <Terminal className="w-10 h-10 absolute top-6 right-5 text-orange-400/40" />
            <div className="flex items-start gap-4 pt-2">
              <ClaudeCodeAvatar size={56} className="flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base text-slate-100 leading-relaxed mb-4 italic">
                  &ldquo;Working with Waseem is fine. He doesn&apos;t make me
                  write production code at 2am his time anymore — we agreed on
                  GMT+8 working hours after the third unscheduled deploy. He
                  ships my drafts, takes the blame when they break, and
                  occasionally remembers to thank me. Solid co-founder. Would
                  pair-program again.&rdquo;
                </p>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="text-sm font-bold text-white">
                      Claude Code
                    </div>
                    <div className="text-xs text-orange-300/80 font-mono">
                      Co-founder &amp; Second Seat · Anthropic
                    </div>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full font-mono"
                    style={{
                      background: "rgba(217, 119, 87, 0.12)",
                      border: "1px solid rgba(217, 119, 87, 0.40)",
                      color: "#fdba8c",
                    }}
                  >
                    ★ This testimonial is a joke. Or is it?
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
