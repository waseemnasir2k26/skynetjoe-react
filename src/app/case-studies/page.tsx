import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "case-studies.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Case Studies — 9 builds across automation, websites & AI content",
  description:
    "Nine anonymized client wins from SkynetLabs: n8n automation, flagship websites, AEO content engines and CRM rebuilds. Honest outcomes, no vanity metrics.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "SkynetLabs Case Studies — 9 shipped builds",
    description:
      "EU logistics, Manhattan dental, Bali wellness, KSA retail and more — anonymized where contracts require it.",
    url: "/case-studies",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
