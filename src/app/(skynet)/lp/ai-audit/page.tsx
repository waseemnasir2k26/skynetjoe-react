import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import AiAuditClient from "./client";

// Meta-ads companion page for the free AI Systems Audit call funnel
// (ADSET-AUDIT-CALL-2026-08-22). Conversion location for the campaign:
// booking a slot on the embedded Calendly is the conversion event.
// Claims discipline (CLAIMS-WHITELIST.md rules apply): no statistics,
// no client names/counts, no testimonials, no guarantees, no asserted
// reply-time numbers. The audit is genuinely free and the findings are
// the visitor's to keep — both promises are honored on the call.
const PAGE_URL = `${SITE.url.replace(/\/+$/, "")}/lp/ai-audit`;

export const metadata: Metadata = {
  title: "Free AI Systems Audit — 20-Minute Call | SkynetLabs",
  description:
    "A 20-minute call for business owners: we walk through how your website, phone and inbox actually handle an enquiry, find where leads leak, and map what an AI system would do at each hole. Free — you keep the findings.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Free AI Systems Audit — 20 minutes, on Zoom",
    description:
      "Watch your own enquiry funnel leak, live on the call — and leave with a map of what to fix first.",
    url: PAGE_URL,
    type: "website",
    images: [
      { url: "/og-default.png", width: 1200, height: 630, alt: "SkynetLabs" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Systems Audit — 20 minutes",
    description:
      "Watch your own enquiry funnel leak, live on the call. Free, findings are yours.",
    images: ["/og-default.png"],
  },
};

export default function AiAuditPage() {
  return <AiAuditClient />;
}
