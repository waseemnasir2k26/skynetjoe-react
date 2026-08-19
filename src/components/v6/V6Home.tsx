import GlassLayer from "./GlassLayer";
import GlassHero from "./GlassHero";
import BundlesGlass from "./BundlesGlass";
import ProofGlass from "./ProofGlass";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTAGlass from "./FinalCTAGlass";
import V6CreditLine from "./V6CreditLine";

/**
 * V6 "GLASSHOUSE" — refractive-glass editorial landing page at /v6. Huge
 * cream-paper display typography with a single fixed-viewport 3D layer
 * (GlassLayer) floating up to 3 rust-tinted MeshTransmissionMaterial forms
 * over the whole page, drifting with scroll + cursor.
 *
 * Flow: hero (massive H1 + CTA) -> bundles (3 frosted-glass panels, copy
 * verbatim from v3/bundlesData.ts) -> proof (glass gauge cards + count-up,
 * canonical stats) -> testimonials (real, unmodified sitewide component,
 * verbatim quotes) -> final CTA (glass button, rust glow) -> credit line.
 *
 * GlassLayer is mounted once, here, at the top — it renders a
 * position:fixed overlay (pointer-events:none) so it sits above every
 * section without being re-mounted per section and without ever blocking a
 * click.
 */
export default function V6Home() {
  return (
    <>
      <GlassLayer />
      <GlassHero />
      <BundlesGlass />
      <ProofGlass />
      <Testimonials />
      <FinalCTAGlass />
      <V6CreditLine />
    </>
  );
}
