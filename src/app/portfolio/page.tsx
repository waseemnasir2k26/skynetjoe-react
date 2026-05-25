import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import WorkShowcase from "@/components/sections/WorkShowcase";

export const metadata: Metadata = {
  title: "Portfolio — Recent Projects | SkynetLabs",
  description:
    "Live screenshots of every shipped SkynetLabs build: dental flagship, real estate, wellness, HVAC, logistics, legal, healthcare. 20+ deployed sites. Built solo from Bali by Waseem Nasir.",
  alternates: { canonical: `${SITE.url}/portfolio` },
  openGraph: {
    title: "SkynetLabs Portfolio — Recent Projects",
    description:
      "Live screenshots of 20+ shipped builds. Click any tile for the deployed site.",
    url: `${SITE.url}/portfolio`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Portfolio — Recent Projects",
  description:
    "Live screenshots of every shipped build across nine countries.",
  url: `${SITE.url}/portfolio`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div
        className="portfolio-cream-wrap"
        style={{
          background: "var(--cream-3)",
          padding: "112px 0 64px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <style>{`
          .portfolio-cream-wrap { color: var(--ink); }
          .portfolio-cream-wrap h1,
          .portfolio-cream-wrap h2,
          .portfolio-cream-wrap h3 { color: var(--ink) !important; font-family: var(--font-display) !important; }
          .portfolio-cream-wrap p { color: var(--ink-2) !important; }
          .portfolio-cream-wrap .text-white,
          .portfolio-cream-wrap .text-gray-100,
          .portfolio-cream-wrap .text-gray-200,
          .portfolio-cream-wrap .text-gray-300,
          .portfolio-cream-wrap .text-gray-400 { color: var(--ink-2) !important; }
          .portfolio-cream-wrap .bg-white\\/5,
          .portfolio-cream-wrap .bg-white\\/10 { background-color: var(--cream-2) !important; }
          .portfolio-cream-wrap .border-white\\/10,
          .portfolio-cream-wrap .border-white\\/15,
          .portfolio-cream-wrap .border-white\\/20 { border-color: rgba(26,26,26,0.12) !important; }
          .portfolio-cream-wrap section { background: transparent !important; }
        `}</style>
        <WorkShowcase />
      </div>
    </>
  );
}
