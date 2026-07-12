import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(
    process.cwd(),
    "content",
    "boring-automations-small-businesses-pay-for.html",
  ),
  "utf8",
);

export const metadata: Metadata = {
  title:
    "The 5 Boring Automations Small Businesses Actually Pay For — Field Notes",
  description:
    "Five automations I shipped and got paid for — email triage, after-hours lead capture, quote tracking, order ops, and a posting engine — grounded in real builds, with the honest lesson from over-engineering one.",
  alternates: {
    canonical: `${SITE.url}/boring-automations-small-businesses-pay-for`,
  },
  openGraph: {
    title:
      "The 5 Boring Automations Small Businesses Actually Pay For — Field Notes",
    description:
      "Field notes from real builds: inbox triage, 11pm lead capture, quote tracking, a 205-node order flow, and a posting engine. The dull systems that quietly earn their keep.",
    url: `${SITE.url}/boring-automations-small-businesses-pay-for`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
};

// JSON-LD (Article + FAQPage @graph) lives inline in the content HTML —
// single source of truth, so no JsonLd component here (avoids a duplicate Article node).
export default function BoringAutomationsPage() {
  return <HtmlCreamWrap html={html} />;
}
