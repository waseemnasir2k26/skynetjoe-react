import type { Metadata } from "next";
import V6Home from "@/components/v6/V6Home";

// Internal preview route — never indexed, never linked from primary nav.
// Not added to sitemap.ts (out of scope for this build) and page-level
// robots below is the enforcement layer, matching the /v3 and /lp/* noindex
// pattern already used sitewide.
export const metadata: Metadata = {
  title: "SkynetLabs — V6 preview",
  robots: { index: false, follow: false },
};

export default function V6Page() {
  return <V6Home />;
}
