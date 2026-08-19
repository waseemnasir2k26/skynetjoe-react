import type { Metadata } from "next";
import V4Home from "@/components/v4/V4Home";

// Internal preview route — never indexed, never linked from primary nav.
// Not added to sitemap.ts (out of scope for this build) and page-level
// robots below is the enforcement layer, matching the /v3 and /lp/*
// noindex pattern already used sitewide.
export const metadata: Metadata = {
  title: "SkynetLabs — V4 preview",
  robots: { index: false, follow: false },
};

export default function V4Page() {
  return <V4Home />;
}
