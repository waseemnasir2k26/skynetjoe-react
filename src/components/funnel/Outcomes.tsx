import Link from "next/link";
import { Zap, LayoutDashboard, Sparkles, ArrowRight } from "lucide-react";

const OUTCOMES = [
  {
    icon: Zap,
    title: "60-second follow-up, every lead, 24/7",
    promise:
      "Auto-DM + WhatsApp + email triggers fire the moment a lead lands. No app to open. No reminder to set.",
    proof: "Show-rate jumped 23% → 71% — Grand Mercer Dental, NY",
  },
  {
    icon: LayoutDashboard,
    title: "One dashboard. Every deal. Zero screenshots.",
    promise:
      "GoHighLevel CRM wired into your stack. Every quote, call, and reply in one pipeline you can actually see.",
    proof: "200+ debtor calls/week handled in French — KODIASIMMO",
  },
  {
    icon: Sparkles,
    title: "Content that ships itself, in your voice",
    promise:
      "AI content engine generates 30 voice-locked posts/month across LinkedIn, IG, FB. You approve, it posts.",
    proof: "3 hr/day → 20 min email triage — Takycorp",
  },
];

export default function Outcomes() {
  return (
    <section
      className="section relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #061827 0%, #082234 100%)",
      }}
    >
      <div className="container-x relative z-10">
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            The fix
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-fg">
            Plug every leak.{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Shipped in 14 days.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OUTCOMES.map((o) => {
            const Icon = o.icon;
            return (
              <div
                key={o.title}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-skynet-primary/40 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-skynet-primary/20 to-cyan-400/10 border border-skynet-primary/30">
                  <Icon className="w-5 h-5 text-skynet-primary-light" />
                </div>
                <h3 className="text-lg font-bold text-fg mb-2 leading-snug">
                  {o.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed mb-4">
                  {o.promise}
                </p>
                <div className="pt-3 border-t border-white/[0.06] text-[12px] text-emerald-300/90 font-medium">
                  ✓ {o.proof}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-skynet-primary-light hover:text-skynet-primary font-semibold"
          >
            See all 16 services
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
