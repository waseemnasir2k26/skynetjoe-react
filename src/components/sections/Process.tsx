import { Search, Wrench, Rocket, TrendingUp, ArrowRight, Calendar } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    n: "01",
    title: "Audit",
    when: "Mon",
    desc: "Free 20-min Loom audit. We map your funnel, find the leak, name the leverage.",
    deliverable: "20-min Loom + 1-pager",
    color: "from-cyan-400 to-sky-500",
  },
  {
    icon: Wrench,
    n: "02",
    title: "Build",
    when: "Tue–Thu",
    desc: "I build the workflow / site / chatbot in 5–14 days. You see daily Loom updates.",
    deliverable: "Daily Looms · live preview URL",
    color: "from-sky-400 to-blue-500",
  },
  {
    icon: Rocket,
    n: "03",
    title: "Ship",
    when: "Fri",
    desc: "Deploy to production. Train your team. Hand over Notion SOPs + Loom library.",
    deliverable: "Production deploy · SOPs · Loom library",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: TrendingUp,
    n: "04",
    title: "Compound",
    when: "Mo+",
    desc: "Optional retainer: I monitor, optimize, and stack new automations monthly.",
    deliverable: "Monthly stack + dashboard",
    color: "from-teal-400 to-cyan-500",
  },
];

export default function Process() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-x relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            <Calendar className="w-3.5 h-3.5" />
            Mon audit · Fri build · Next-Fri ship
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Four steps.{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
              No SOW theater.
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            No 14-slide proposal deck. No 6-week discovery phase. Audit Monday,
            build by Friday, ship by next Friday.
          </p>
        </div>

        <div className="relative">
          {/* Desktop horizontal connector */}
          <div className="hidden lg:block absolute top-[88px] left-[8%] right-[8%] h-px pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                background:
                  "repeating-linear-gradient(to right, rgba(0,212,255,0.45) 0 6px, transparent 6px 12px)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                {/* Mobile vertical connector */}
                {i < STEPS.length - 1 && (
                  <div
                    className="lg:hidden absolute left-8 top-full w-px h-5 z-0"
                    style={{
                      background:
                        "repeating-linear-gradient(to bottom, rgba(0,212,255,0.45) 0 4px, transparent 4px 8px)",
                    }}
                  />
                )}

                {/* Step number bubble (sits on connector) */}
                <div className="relative flex items-center justify-between mb-5 lg:mb-6">
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-xl shadow-cyan-500/30 z-10`}
                  >
                    <s.icon className="w-7 h-7 text-white" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 border-2 border-cyan-300 flex items-center justify-center text-[10px] font-extrabold text-cyan-300">
                      {s.n}
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300 bg-cyan-400/10 border border-cyan-400/30 px-3 py-1.5 rounded-full">
                    {s.when}
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-white/95 border border-white/60 shadow-xl shadow-cyan-500/10 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    {s.title}
                    {i < STEPS.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    )}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <div className="pt-3 border-t border-slate-200/70">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-1">
                      You get
                    </p>
                    <p className="text-xs text-slate-700 font-medium">
                      {s.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0a2d4a]/60 via-[#073846]/40 to-[#0a2d4a]/60 border border-cyan-400/20 backdrop-blur-sm">
          <div className="flex-1">
            <p className="text-sm font-semibold text-cyan-200 mb-1">
              Total clock: 14 days from first Loom to production deploy.
            </p>
            <p className="text-xs text-gray-400">
              No discovery phases. No invoice surprises. Cancel anytime before
              Build kickoff for a full refund.
            </p>
          </div>
          <a
            href="https://cal.com/waseemnasir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold text-sm transition-colors whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            Book your free audit
          </a>
        </div>
      </div>
    </section>
  );
}
