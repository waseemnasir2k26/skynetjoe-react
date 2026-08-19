import type { Metadata } from "next";
import Testimonials from "@/components/sections/Testimonials";
import V2Experience from "@/components/v2/V2Experience";
import V2Hero from "@/components/v2/V2Hero";
import V2WhatWeAutomate from "@/components/v2/V2WhatWeAutomate";
import V2Proof from "@/components/v2/V2Proof";
import V2FinalCTA from "@/components/v2/V2FinalCTA";

// Preview variant — not a real indexable route yet, so it stays out of
// search results and the sitemap entirely.
export const metadata: Metadata = {
  title: "SkynetLabs — V2 preview",
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return (
    <V2Experience>
      <V2Hero />
      <V2WhatWeAutomate />
      <V2Proof />
      <Testimonials />
      <V2FinalCTA />
    </V2Experience>
  );
}
