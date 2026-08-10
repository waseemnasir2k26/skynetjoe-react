import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import SpeedToLeadClient from "./client";

// Meta-ads companion page for the HVAC AI Speed-to-Lead system
// ($2,500 setup + $395/mo). Illustration page, not a demo: the Instant Form
// thank-you button and the 15-min sales call both land here.
// Claims discipline (CLAIMS-WHITELIST.md rules apply): no statistics, no
// client names/counts, no testimonials, no guarantees, no asserted reply-time
// numbers. The animated SMS walkthrough (client.tsx) is fictional and labeled
// "Simulated demonstration" as its FIRST visible element (hard rule).
const PAGE_URL = `${SITE.url.replace(/\/+$/, "")}/lp/speed-to-lead`;

export const metadata: Metadata = {
  title: "HVAC Missed-Call Rescue — AI Speed-to-Lead System | SkynetLabs",
  description:
    "For HVAC owner-operators running 1–5 trucks. When a call rings out, the system texts the homeowner back, qualifies the job (AC repair, heating, emergency call-outs) and books it onto your calendar while you stay on the tools.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "HVAC Missed-Call Rescue — AI Speed-to-Lead",
    description:
      "Missed HVAC calls become booked jobs. AI texts the caller back, qualifies, and books — while you stay on the tools.",
    url: PAGE_URL,
    type: "website",
    images: [
      { url: "/og-default.png", width: 1200, height: 630, alt: "SkynetLabs" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Missed-Call Rescue — AI Speed-to-Lead",
    description:
      "Missed HVAC calls become booked jobs. AI texts back, qualifies, books.",
    images: ["/og-default.png"],
  },
};

export default function SpeedToLeadPage() {
  return <SpeedToLeadClient />;
}
