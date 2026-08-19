import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";

/**
 * SSR hero copy, laid directly over the sticky 3D canvas (see
 * V2Experience.tsx). This <h1> is real server-rendered HTML — it is the
 * LCP element, not the WebGL scene. Copy is the same pain-first framing
 * already proven on the main homepage hero (HeroFunnel.tsx) — no new
 * claims invented for this variant.
 */
export default function V2Hero() {
  return (
    <section
      className="relative flex items-end"
      style={{
        height: "100svh",
        minHeight: 560,
        paddingTop: "calc(var(--promo-h, 44px) + clamp(72px, 10vw, 104px))",
        paddingBottom: "clamp(48px, 9vw, 96px)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Legibility scrim: the 3D node cluster roams the full frame across
          scroll beats, so instead of hand-tuning every node to dodge the
          text column (fragile, breaks on resize), a soft gradient guarantees
          the headline stays readable "at every point" wherever the nodes
          happen to be. Right two-thirds of the canvas stays fully clear. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg, rgba(242,239,230,0.94) 0%, rgba(242,239,230,0.82) 38%, rgba(242,239,230,0.35) 62%, rgba(242,239,230,0) 78%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="container-x relative"
        style={{
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "#A8451F",
            marginBottom: 22,
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              width: 28,
              height: 1,
              background: "#A8451F",
              display: "inline-block",
            }}
          />
          AI automation studio · built solo from Bali
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: "var(--ink)",
            fontSize: "clamp(34px, 8.5vw, 76px)",
            margin: "0 0 24px",
            maxWidth: "16ch",
            wordBreak: "break-word",
            textShadow: "0 1px 0 rgba(250,247,240,0.6)",
          }}
        >
          Stop losing customers{" "}
          <em
            style={{ fontStyle: "normal", color: "#A8451F", fontWeight: 700 }}
          >
            while you&rsquo;re busy.
          </em>
        </h1>

        <p
          style={{
            fontSize: "clamp(17px, 4vw, 21px)",
            color: "var(--ink-2)",
            maxWidth: "50ch",
            lineHeight: 1.6,
            marginBottom: 30,
          }}
        >
          We set up smart tools that reply to every new customer in seconds,
          follow up for you automatically, and handle the boring repeat work
          &nbsp;— so you win more jobs without working more hours.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 24,
          }}
        >
          <MagneticButton>
            <Link
              href="/discovery-call"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "15px 26px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                minHeight: 48,
                boxShadow: "0 18px 44px rgba(26,26,26,0.16)",
              }}
            >
              Book a free 30-min check-up
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </MagneticButton>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--ink-faint)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Star
              style={{ width: 12, height: 12, fill: "#A8451F", stroke: "none" }}
            />
            Top Rated Plus · Upwork
          </span>
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--ink-faint)",
            marginTop: 22,
          }}
        >
          — Scroll to see how it&rsquo;s built ↓
        </div>
      </div>
    </section>
  );
}
