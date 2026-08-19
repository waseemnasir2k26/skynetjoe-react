import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";

/**
 * Final CTA — opaque rust band, same offer copy as the main site's
 * FinalCTA.tsx (no new claims for the V2 variant). By the time the user
 * scrolls here the pinned canvas underneath has dollied into its "lattice"
 * pose (see CAMERA_KEYFRAMES[4] in V2SceneContent.tsx); this section
 * simply covers it with the brand's rust CTA treatment.
 */
export default function V2FinalCTA() {
  return (
    <section
      className="relative"
      style={{
        background: "var(--terracotta)",
        padding: "clamp(56px, 12vw, 100px) 0 clamp(64px, 14vw, 112px)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="container-x">
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--cream-3)",
              marginBottom: 20,
              opacity: 0.85,
            }}
          >
            — Limited audits each month
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 7vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--cream-3)",
              marginBottom: 20,
            }}
          >
            Find the gaps in{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
              }}
            >
              30 minutes.
            </span>
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 3.6vw, 17px)",
              color: "rgba(250, 247, 240, 0.92)",
              maxWidth: "46ch",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            A free 30-min check-up. We share screens, spot the one fix that pays
            off fastest, and send you a short build plan. No pitch deck.
          </p>
          <MagneticButton>
            <Link
              href="/discovery-call"
              style={{
                background: "var(--cream-3)",
                color: "var(--terracotta-aa)",
                padding: "16px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                boxShadow: "0 16px 40px rgba(26,26,26,0.18)",
                minHeight: 48,
              }}
            >
              Book a free 30-min check-up
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </MagneticButton>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(250, 247, 240, 0.78)",
              marginTop: 22,
            }}
          >
            — Reply in 8h · scope in 48h · Bali (GMT+8) · 9 countries served
          </div>
        </div>
      </div>
    </section>
  );
}
