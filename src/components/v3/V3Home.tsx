import InkShaderHero from "./InkShaderHero";
import ServiceStrip from "./ServiceStrip";
import ProofBand from "./ProofBand";
import ProcessSteps from "./ProcessSteps";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTAInk from "./FinalCTAInk";
import V3CreditLine from "./V3CreditLine";

/**
 * V3 "Shader Ink-Flow" — full alternative landing page at /v3.
 * Testimonials section is the real, unmodified sitewide component
 * (verbatim quotes, no copy fork / no drift risk).
 */
export default function V3Home() {
  return (
    <>
      <InkShaderHero />
      <ServiceStrip />
      <ProofBand />
      <ProcessSteps />
      <Testimonials />
      <FinalCTAInk />
      <V3CreditLine />
    </>
  );
}
