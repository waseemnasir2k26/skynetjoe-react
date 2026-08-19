import ParticleFieldBeat from "./ParticleFieldBeat";
import BundlesSection from "@/components/v3/BundlesSection";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTAInk from "@/components/v3/FinalCTAInk";
import V7CreditLine from "./V7CreditLine";

/**
 * V7 "Particle Field" — full alternative landing page at /v7.
 *
 * Flow: pinned hero-to-proof particle beat (ParticleFieldBeat.tsx — a
 * GPU particle field morphing through 4 states as the section scrubs) ->
 * bundled offers -> testimonials -> final CTA.
 *
 * BundlesSection, Testimonials, and FinalCTAInk are imported directly from
 * their existing, already-shipped homes (src/components/v3/** and
 * src/components/sections/Testimonials.tsx) rather than forked into new v7
 * copies. That is deliberate, not an oversight: the build brief requires
 * the bundle copy to be reused VERBATIM (BUNDLES data + price + proof
 * lines), and importing the real component is the only way to guarantee
 * zero copy drift — a v7-local re-typing of the same JSX would be a second
 * source of truth that could silently diverge from v3's. This route only
 * ever READS those files; nothing in src/components/v3/** or
 * src/components/sections/** is modified as part of this build.
 */
export default function V7Home() {
  return (
    <>
      <ParticleFieldBeat />
      <BundlesSection />
      <Testimonials />
      <FinalCTAInk />
      <V7CreditLine />
    </>
  );
}
