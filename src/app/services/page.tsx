import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "services-index.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Services — 16 builds across automation, AI content, development & consulting",
  description:
    "Sixteen production-grade services from SkynetLabs across n8n automation, AI content, Next.js development and operator consulting. Fixed scope, public pricing, 5–14d ship.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "SkynetLabs Services — 16 builds, 4 categories",
    description:
      "Automation, AI content, development, consulting. Sixteen real services, fixed scopes, 5–14 day ship window.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
