import Image from "next/image";
import { Terminal, Globe } from "lucide-react";

/**
 * "Proof of life" trust strip — three plain proof lines.
 * First card carries the small ROUND founder photo ("you talk to the
 * builder, not a sales desk"); the other two use Lucide icons. No other
 * founder/lifestyle photography on the homepage.
 */
const PROOFS = [
  {
    icon: Terminal,
    label: "Paired with Claude Code",
    line: "Human-led builds, AI on the keyboard. Every change reviewed by hand.",
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
          {/* Founder card — small round photo, builder-not-a-sales-desk vibe */}
          <div
            className="rounded-xl p-5 flex items-start gap-3"
            style={{
              background: "var(--cream-2)",
              border: "1px solid rgba(26,26,26,0.12)",
            }}
          >
            <span
              className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden"
              style={{ border: "2px solid #A8451F" }}
            >
              <Image
                src="/portraits/waseem-builder-portrait.jpg"
                alt="Waseem Nasir, founder of SkynetLabs"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </span>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#A8451F] mb-1">
                Based in Bali
              </p>
              <p className="text-sm text-[var(--ink-2)] leading-relaxed">
                Solo founder, GMT+8. You talk to the builder, not a sales desk.
              </p>
            </div>
          </div>

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
