import type { Metadata } from "next";
import "./v5.css";
import V5Home from "@/components/v5/V5Home";

// Internal preview route — never indexed, never linked from primary nav.
// Not added to sitemap.ts and not added to the BLOCKED_IN_PROD list in
// src/proxy.ts (out of scope for this build) — page-level robots below is
// the enforcement layer, matching the /v2 and /v3 preview-route pattern.
export const metadata: Metadata = {
  title: "SkynetLabs — V5 preview",
  robots: { index: false, follow: false },
};

export default function V5Page() {
  return <V5Home />;
}
