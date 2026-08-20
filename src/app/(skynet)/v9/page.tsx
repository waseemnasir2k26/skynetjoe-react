import type { Metadata } from "next";
import V9Client from "@/components/v9/V9Client";

// Internal preview route — never indexed, never linked from primary nav.
// Not added to sitemap.ts (out of scope for this build) and page-level
// robots below is the enforcement layer, matching the /v3, /v8, /lp/*
// noindex pattern already used sitewide.
export const metadata: Metadata = {
  title: "SkynetLabs — V9 preview",
  robots: { index: false, follow: false },
};

export default function V9Page() {
  return <V9Client />;
}
