import type { Metadata } from "next";
import V3Home from "@/components/v3/V3Home";

// Internal preview route — never indexed, never linked from primary nav.
// Not added to sitemap.ts (out of scope for this build) and page-level
// robots below is the enforcement layer, matching the /lp/* noindex pattern
// already used sitewide (see src/app/(skynet)/lp/logistics/page.tsx).
export const metadata: Metadata = {
  title: "SkynetLabs — V3 preview",
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return <V3Home />;
}
