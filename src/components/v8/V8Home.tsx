import HeroWorkshop from "./HeroWorkshop";
import BundlesWorkshop from "./BundlesWorkshop";
import ProofBand from "@/components/v3/ProofBand";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTAWorkshop from "./FinalCTAWorkshop";
import V8CreditLine from "./V8CreditLine";

/**
 * V8 "Workshop" — interactive 3D physics playground alternative landing
 * page at /v8. Flow: hero (grabbable/tossable rapier physics pile, ceramic/
 * ink objects labeled with the automation stack) -> bundles (each card gets
 * a small drop-and-stack physics vignette) -> proof count-up -> testimonials
 * -> final CTA (toss-near-glow delight detail).
 *
 * ProofBand is reused directly from v3 (identical canonical numbers, no
 * fork). Testimonials is the real, unmodified sitewide component (verbatim
 * quotes, no copy fork / no drift risk) — same reuse convention as v3.
 */
export default function V8Home() {
  return (
    <>
      <HeroWorkshop />
      <BundlesWorkshop />
      <ProofBand />
      <Testimonials />
      <FinalCTAWorkshop />
      <V8CreditLine />
    </>
  );
}
