import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "portfolio.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Portfolio — 12 visual case studies from SkynetLabs",
  description:
    "Twelve anonymized builds shipped by SkynetLabs across nine countries: EU logistics automation, Manhattan dental atelier, KSA retail, Bali wellness, French translation flow, AEO engines and more.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "SkynetLabs Portfolio — 12 shipped builds",
    description:
      "Visual showcase of 12 SkynetLabs builds. Click any tile to see the full case study.",
    url: "/portfolio",
    type: "website",
  },
};

export default function PortfolioPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
