import V4Journey from "./V4Journey";
import Testimonials from "@/components/sections/Testimonials";
import V4CreditLine from "./V4CreditLine";

/**
 * V4 "THE LINE" — the entire landing page as one continuous, scroll-scrubbed
 * 3D scene: a camera dolly through an automation-factory diorama (entrance
 * -> 3 bundled machine stations -> data-readout wall -> lit CTA booth),
 * built in V4Journey.tsx (owns the mode gate, the page-length GSAP
 * ScrollTrigger, and the sticky <Canvas>).
 *
 * Testimonials is the real, unmodified sitewide component (verbatim
 * quotes, no copy fork) — rendered as a normal DOM section after the
 * canvas journey per the build brief, so the finale CTA lands, THEN social
 * proof closes the page before the credit strip.
 */
export default function V4Home() {
  return (
    <>
      <V4Journey />
      <Testimonials />
      <V4CreditLine />
    </>
  );
}
