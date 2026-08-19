import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";

/**
 * GLASSHOUSE hero — massive display typography is server-rendered (this
 * file has no "use client"), so the H1 is present in the initial HTML for
 * LCP regardless of whether the 3D layer, fallback, or neither ever mounts.
 * The floating glass objects live in a separate fixed layer (GlassLayer,
 * mounted once by V6Home) and are purely decorative overlay — nothing here
 * depends on them rendering.
 */
export default function GlassHero() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--cream-3)",
        padding: "clamp(120px, 20vw, 200px) 0 clamp(80px, 12vw, 120px)",
        fontFamily: "var(--font-sans)",
        overflow: "hidden",
      }}
    >
      <div
        className="container-x"
        style={{
          paddingLeft: "clamp(20px, 6vw, 48px)",
          paddingRight: "clamp(20px, 6vw, 48px)",
          maxWidth: 1180,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--terracotta-aa)",
            marginBottom: 28,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              width: 32,
              height: 1,
              background: "var(--terracotta)",
              display: "inline-block",
            }}
          />
          SkynetLabs — automation systems
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.98,
            fontSize: "clamp(42px, 9.5vw, 120px)",
            color: "var(--ink)",
            margin: 0,
            maxWidth: "15ch",
          }}
        >
          Stop losing customers while you&rsquo;re{" "}
          <span style={{ color: "var(--terracotta-aa)" }}>busy.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 3.4vw, 21px)",
            lineHeight: 1.6,
            color: "var(--ink-2)",
            maxWidth: "42ch",
            margin: "clamp(28px, 5vw, 40px) 0 clamp(32px, 6vw, 44px)",
          }}
        >
          We build the AI systems and automations that answer leads, triage the
          inbox, and keep the pipeline moving — so nothing slips through while
          you run the business.
        </p>

        <MagneticButton>
          <Link
            href="/discovery-call"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              padding: "17px 30px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              minHeight: 48,
              boxShadow: "0 18px 44px rgba(198,107,63,0.28)",
            }}
          >
            Book a free 30-min check-up
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </MagneticButton>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--ink-faint)",
            marginTop: 20,
          }}
        >
          — Reply in 8h · scope in 48h · Bali (GMT+8)
        </div>
      </div>
    </section>
  );
}
