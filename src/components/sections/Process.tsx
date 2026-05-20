import { Search, Wrench, Rocket, TrendingUp } from "lucide-react";

const STEPS = [
  { icon: Search, n: "01", title: "Audit", desc: "Free 20-min Loom audit. We map your funnel, find the leak, name the leverage." },
  { icon: Wrench, n: "02", title: "Build", desc: "I build the workflow / site / chatbot in 5–14 days. You see daily Loom updates." },
  { icon: Rocket, n: "03", title: "Ship", desc: "Deploy to production. Train your team. Hand over Notion SOPs + Loom library." },
  { icon: TrendingUp, n: "04", title: "Compound", desc: "Optional retainer: I monitor, optimize, and stack new automations monthly." },
];

export default function Process() {
  return (
    <section className="section bg-skynet-darker/40">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-skynet-primary-light font-semibold mb-3">
            How we work
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Four steps. <span className="gradient-text">No SOW theater.</span>
          </h2>
          <p className="text-lg text-gray-300">
            No 14-slide proposal deck. No 6-week discovery phase. Audit Monday, build by Friday, ship by next Friday.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="relative p-7 rounded-2xl bg-skynet-surface/60 border border-white/5">
              <div className="text-5xl font-extrabold text-skynet-primary/20 absolute top-4 right-5">{s.n}</div>
              <s.icon className="w-7 h-7 text-skynet-primary-light mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
