import Testimonials from "@/components/sections/Testimonials";

/**
 * Wraps the real, unmodified sitewide <Testimonials/> (verbatim quotes, no
 * copy fork) in an inspection-stamp frame — corner brackets, a rotated
 * "INSPECTED" rubber-stamp label and a mono log line. The frame is
 * intentionally the ONLY thing styled here: Testimonials' own internal
 * cards are untouched markup, so this is honest about what "stamped
 * inspection cards" means at this scope (an outer treatment, not a
 * reskin of a shared component's internals).
 */
export default function BlueprintTestimonialsFrame() {
  return (
    <section
      className="section relative"
      style={{
        background: "var(--cream-3)",
        borderBottom: "1px solid rgba(26,26,26,0.14)",
      }}
    >
      <div className="container-x">
        <div className="v5-mono-tag">
          <span className="v5-tick" />
          Fig. 05 — Field inspection log
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 8,
            right: "clamp(16px, 5vw, 24px)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "var(--terracotta-aa)",
            border: "2px solid var(--terracotta-aa)",
            borderRadius: 3,
            padding: "5px 12px",
            transform: "rotate(-3deg)",
            zIndex: 3,
            background: "rgba(250,247,240,0.85)",
          }}
        >
          INSPECTED
        </div>
        <Testimonials />
      </div>
    </section>
  );
}
