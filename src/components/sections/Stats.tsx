import { STATS } from "@/lib/site";

const ACCENTS = [
  { grad: "from-cyan-300 to-sky-400", glow: "shadow-cyan-500/30" },
  { grad: "from-amber-300 to-orange-400", glow: "shadow-amber-500/30" },
  { grad: "from-teal-300 to-emerald-400", glow: "shadow-teal-500/30" },
  { grad: "from-fuchsia-300 to-pink-400", glow: "shadow-fuchsia-500/30" },
];

export default function Stats() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={stat.label}
                className={`relative text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-xl ${a.glow}`}
              >
                <div
                  className={`text-4xl md:text-6xl font-extrabold mb-2 bg-gradient-to-br ${a.grad} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider text-gray-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* The team-size stat — the co-founder hook */}
        <div className="mt-5 flex justify-center">
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(217, 119, 87, 0.10) 0%, rgba(20, 184, 166, 0.10) 100%)",
              border: "1px solid rgba(217, 119, 87, 0.30)",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <span
              className="text-base font-extrabold tracking-tight"
              style={{
                background:
                  "linear-gradient(120deg, #fdba8c 0%, #5eead4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              1 human + 1 Claude Code
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-gray-400">
              = 2-person agency. Most have 12.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
