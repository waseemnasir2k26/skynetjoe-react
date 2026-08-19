import type { Metadata } from "next";
import V7Home from "@/components/v7/V7Home";

// Internal preview route — never indexed, never linked from primary nav.
// Not added to sitemap.ts (route-list is hand-maintained there, not a
// glob over app/, so a new /v7 dir is never auto-included) and page-level
// robots below is the enforcement layer, matching the /v3, /lp/* noindex
// pattern already used sitewide.
export const metadata: Metadata = {
  title: "SkynetLabs — V7 preview",
  robots: { index: false, follow: false },
};

export default function V7Page() {
  return <V7Home />;
}
