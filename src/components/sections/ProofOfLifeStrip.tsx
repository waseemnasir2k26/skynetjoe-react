import { MapPin, Terminal, Globe } from "lucide-react";

/**
 * No-photo "proof of life" strip — three plain proof lines with icons.
 * Sits between sections as a small visual break + authenticity proof,
 * without any founder/lifestyle photography.
 */
const PROOFS = [
  {
    icon: MapPin,
    label: "Based in Bali",
    line: "Solo founder, GMT+8. You talk to the builder, not a sales desk.",
  },
  {
    icon: Terminal,
    label: "Paired with Claude Code",
    line: "Human-led builds, AI on the keyboard. Every diff reviewed by hand.",
  },
  {
    icon: Globe,
    label: "Shipping worldwide",
    line: "180+ workflows and 40+ sites delivered across 9 countries.",
  },
];

export default function ProofOfLifeStrip() {
  return (
    <section className="section pt-6 pb-6">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {PROOFS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="rounded-xl p-5 flex items-start gap-3"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                }}
              >
                <span
                  aria-hidden
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "#A8451F", color: "var(--cream-3)" }}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#A8451F] mb-1">
                    {p.label}
                  </p>
                  <p className="text-sm text-[var(--ink-2)] leading-relaxed">
                    {p.line}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
