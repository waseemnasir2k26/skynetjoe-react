import type { Metadata } from "next";
import V10Client from "@/components/v10/V10Client";

// Internal preview route — never indexed, never linked from primary nav.
// Not added to sitemap.ts (out of scope for this build) and page-level
// robots below is the enforcement layer, matching the /v3, /v8, /lp/*
// noindex pattern already used sitewide. Metadata shape cloned verbatim
// from app/(skynet)/v8/page.tsx.
export const metadata: Metadata = {
  title: "SkynetLabs — V10 preview",
  robots: { index: false, follow: false },
};

export default function V10Page() {
  return <V10Client />;
}
