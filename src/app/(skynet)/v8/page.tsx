import type { Metadata } from "next";
import V8Home from "@/components/v8/V8Home";

// Internal preview route — never indexed, never linked from primary nav.
// Not added to sitemap.ts (out of scope for this build) and page-level
// robots below is the enforcement layer, matching the /v3, /lp/* noindex
// pattern already used sitewide.
export const metadata: Metadata = {
  title: "SkynetLabs — V8 preview",
  robots: { index: false, follow: false },
};

export default function V8Page() {
  return <V8Home />;
}
