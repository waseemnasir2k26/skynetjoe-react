import BlueprintHero from "./BlueprintHero";
import BlueprintBundles from "./BlueprintBundles";
import BlueprintProof from "./BlueprintProof";
import BlueprintProcess from "./BlueprintProcess";
import BlueprintTestimonialsFrame from "./BlueprintTestimonialsFrame";
import BlueprintFinalCTA from "./BlueprintFinalCTA";
import V5CreditLine from "./V5CreditLine";

/**
 * V5 "BLUEPRINT" — ink/plotter-line technical-drawing aesthetic, full
 * alternative landing page at /v5. Flow: hero (wireframe robot draws itself)
 * -> bundles as exploded assembly diagrams -> proof as an instrument panel
 * -> process as a drawn flowchart -> testimonials (verbatim, framed as an
 * inspection log) -> final CTA (ink stamp).
 */
export default function V5Home() {
  return (
    <>
      <BlueprintHero />
      <BlueprintBundles />
      <BlueprintProof />
      <BlueprintProcess />
      <BlueprintTestimonialsFrame />
      <BlueprintFinalCTA />
      <V5CreditLine />
    </>
  );
}
