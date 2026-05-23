import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
          style={{
            background:
              "linear-gradient(135deg, #061827 0%, #0a2d4a 50%, #082b3e 100%)",
            border: "1px solid rgba(126,228,255,0.18)",
          }}
        >
          <div className="orb w-[400px] h-[400px] bg-skynet-primary/30 -top-32 -left-32" />
          <div
            className="orb w-[400px] h-[400px] bg-cyan-400/20 -bottom-32 -right-32"
            style={{ animationDelay: "-5s" }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-fg">
              Find your biggest leak in{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                30 minutes.
              </span>
            </h2>
            <p className="text-lg text-fg-muted mb-8">
              Free audit. We screen-share, find the one automation that pays for
              itself fastest, and Loom you a build plan. No pitch deck.
            </p>
            <Link
              href="/discovery-call"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-transform hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Book free 30-min audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-fg-faint mt-4">
              Replies within 6 hours · Bali (GMT+8) · 9 countries served
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
