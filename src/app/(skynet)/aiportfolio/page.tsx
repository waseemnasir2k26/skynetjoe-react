import type { Metadata } from "next";
import {
  SITE,
  DEFAULT_OG_IMAGES,
  pageTitle,
  pageDescription,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import AiPortfolioGallery from "@/components/AiPortfolioGallery";
import {
  AI_CATEGORIES,
  AI_VIDEOS,
  driveOpenUrl,
  thumbUrl,
} from "@/lib/ai-portfolio";
import "./aiportfolio.css";

export const metadata: Metadata = {
  title: pageTitle("AI Video Portfolio"),
  description: pageDescription(
    `${AI_VIDEOS.length} AI-generated videos across ${AI_CATEGORIES.length} categories: spokesperson ads, automotive, real estate, product, pets, healthcare, explainers and more. Made by SkynetLabs in Bali.`,
  ),
  alternates: { canonical: `${SITE.url}/aiportfolio` },
  openGraph: {
    title: "SkynetLabs AI Video Portfolio",
    description: `${AI_VIDEOS.length} finished AI videos, sorted by category. Click any tile to play.`,
    url: `${SITE.url}/aiportfolio`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs AI Video Portfolio",
  description: `${AI_VIDEOS.length} AI-generated videos in ${AI_CATEGORIES.length} categories.`,
  url: `${SITE.url}/aiportfolio`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "SkynetLabs AI videos",
  numberOfItems: AI_VIDEOS.length,
  itemListElement: AI_VIDEOS.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: v.title,
      thumbnailUrl: `${SITE.url}${thumbUrl(v.id)}`,
      contentUrl: driveOpenUrl(v.id),
      embedUrl: `https://drive.google.com/file/d/${v.id}/preview`,
      uploadDate: "2026-10-07",
      genre: AI_CATEGORIES.find((c) => c.key === v.cat)?.name,
    },
  })),
};

const crumbs = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "AI Portfolio", url: `${SITE.url}/aiportfolio` },
]);

export default function AiPortfolioPage() {
  const portrait = AI_VIDEOS.filter((v) => v.orient === "portrait").length;
  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={crumbs} />
      <section className="aip-hero">
        <div className="aip-hero-inner">
          <p className="aip-eyebrow">
            AI video · generated, directed, delivered
          </p>
          <h1 className="aip-h1">
            Video that used to need a <em>crew</em>.
          </h1>
          <p className="aip-lede">
            Every clip below was generated, not filmed: spokesperson ads, car
            spots, listings, product heroes, mascots and explainers for clients
            and for our own channels. Pick a category, tap a tile, watch it
            play.
          </p>
          <div className="aip-stats">
            <span>
              <strong>{AI_VIDEOS.length}</strong>finished pieces
            </span>
            <span>
              <strong>{AI_CATEGORIES.length}</strong>categories
            </span>
            <span>
              <strong>{portrait}</strong>vertical ·{" "}
              <strong>{AI_VIDEOS.length - portrait}</strong>widescreen
            </span>
          </div>
        </div>
      </section>
      <AiPortfolioGallery />
    </>
  );
}
