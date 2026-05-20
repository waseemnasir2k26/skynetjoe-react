import { Quote } from "lucide-react";

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

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-skynet-primary-light font-semibold mb-3">
            Real receipts
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            What founders <span className="gradient-text">actually say</span> after we ship.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {QUOTES.map((q, i) => (
            <div key={i} className="p-7 rounded-2xl bg-skynet-surface/60 border border-white/5 relative">
              <Quote className="w-8 h-8 text-skynet-primary/30 absolute top-5 right-5" />
              <p className="text-base text-gray-200 leading-relaxed mb-5">&ldquo;{q.text}&rdquo;</p>
              <div>
                <div className="text-sm font-semibold text-white">{q.name}</div>
                <div className="text-xs text-gray-500">{q.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
