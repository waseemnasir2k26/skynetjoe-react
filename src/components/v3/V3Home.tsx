import InkShaderHero from "./InkShaderHero";
import MachineBeat from "./MachineBeat";
import BundlesSection from "./BundlesSection";
import ProofBand from "./ProofBand";
import ProcessSteps from "./ProcessSteps";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTAInk from "./FinalCTAInk";
import V3CreditLine from "./V3CreditLine";

/**
 * V3 "Shader Ink-Flow" — full alternative landing page at /v3.
 *
 * Flow: hero (ink shader) -> THE MACHINE (pinned 3D scroll-scrub beat,
 * MachineBeat.tsx) -> bundled big-problem-solver offers (BundlesSection.tsx,
 * replaces the old 5-simple-service ServiceStrip) -> proof -> process ->
 * testimonials -> final CTA.
 *
 * Testimonials section is the real, unmodified sitewide component
 * (verbatim quotes, no copy fork / no drift risk).
 */
export default function V3Home() {
  return (
    <>
      <InkShaderHero />
      <MachineBeat />
      <BundlesSection />
      <ProofBand />
      <ProcessSteps />
      <Testimonials />
      <FinalCTAInk />
      <V3CreditLine />
    </>
  );
}
