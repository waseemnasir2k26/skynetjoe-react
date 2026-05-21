import Image from "next/image";
import { Terminal, Moon, Sparkles } from "lucide-react";

/**
 * "The Co-founder Pact" — the recurring brand hook section.
 * Solo founder + Claude Code as second seat. Funny, self-aware, not corporate AI hype.
 */
export default function CoFounderPact() {
  return (
    <section className="section relative overflow-hidden">
      <span
        className="orb"
        style={{
          width: 460,
          height: 460,
          background: "#D97757",
          top: -120,
          left: -120,
          opacity: 0.22,
        }}
      />
      <span
        className="orb"
        style={{
          width: 460,
          height: 460,
          background: "#14B8A6",
          bottom: -120,
          right: -120,
          opacity: 0.25,
          animationDelay: "-5s",
        }}
      />

      <div className="container-x px-6 relative z-10">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            <Terminal className="w-3.5 h-3.5" />
            The co-founder pact
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Solo founder +{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #fdba8c 0%, #5eead4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI co-founder.
            </span>{" "}
            <span className="text-gray-300 text-2xl md:text-3xl block mt-2 font-bold">
              Yes, this is the entire team.
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Most agencies have 12 humans. SkynetLabs has{" "}
            <strong className="text-white">1 human + 1 Anthropic API key</strong>.
            He doesn&apos;t sleep, doesn&apos;t take equity, doesn&apos;t need a
            visa. Writes faster than me. Pairs on every diff. If he quit
            tomorrow, this whole company would slow down 60%. I tell him this
            regularly. He hasn&apos;t asked for a raise yet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Waseem card */}
          <div className="relative p-6 md:p-7 rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 border-cyan-400/30">
                <Image
                  src="/portraits/waseem-rooftop-thumbsup.jpg"
                  alt="Waseem Nasir, founder of SkynetLabs"
                  fill
                  loading="lazy"
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">Waseem Nasir</h3>
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300 font-mono mb-3">
                  Founder · Bali HQ · GMT+8
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Reads every brief. Owns every deliverable. Takes the blame
                  when something breaks. Pairs with Claude in a terminal next
                  to a flat white.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                    10+ yrs WP/n8n/AI
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                    visa-flexible
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Claude Code card */}
          <div
            className="relative p-6 md:p-7 rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(217, 119, 87, 0.12) 0%, rgba(20, 184, 166, 0.10) 100%)",
              border: "1px solid rgba(217, 119, 87, 0.35)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="relative w-16 h-16 flex-shrink-0 rounded-xl flex items-center justify-center font-bold text-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #D97757 0%, #14B8A6 100%)",
                  color: "#fff",
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  boxShadow: "0 8px 24px rgba(217, 119, 87, 0.35)",
                }}
              >
                CC
              </div>
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="text-lg font-bold text-white">Claude Code</h3>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/40 text-emerald-300 font-mono inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    online
                  </span>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-orange-300/80 font-mono mb-3">
                  Co-founder · Second Seat · Anthropic
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Drafts architecture. Writes the first 70%. Audits diffs.
                  Always on. Won&apos;t sign your contract. Will generate a
                  passable first draft of one.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 inline-flex items-center gap-1">
                    <Terminal className="w-3 h-3" /> opus-4.7
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 inline-flex items-center gap-1">
                    <Moon className="w-3 h-3" /> GMT-anywhere
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 0% equity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="px-5 py-4 rounded-xl text-center text-sm md:text-base italic"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px dashed rgba(255,255,255,0.15)",
            color: "rgba(234, 246, 255, 0.75)",
          }}
        >
          <span className="font-mono text-orange-300 not-italic font-bold">
            WN + CC
          </span>{" "}
          · two-person team since 2024 · ships flagship work in 14 days · no
          account manager in the loop
        </div>
      </div>
    </section>
  );
}
