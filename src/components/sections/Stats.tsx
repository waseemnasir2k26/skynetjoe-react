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
      </div>
    </section>
  );
}
