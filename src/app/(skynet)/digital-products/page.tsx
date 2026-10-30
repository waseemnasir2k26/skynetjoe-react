import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  SITE,
  DEFAULT_OG_IMAGES,
  pageTitle,
  pageDescription,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/motion/Reveal";
import {
  DIGITAL_PRODUCTS,
  STORE_LABEL,
  categoryAnchor,
  groupByCategory,
  type DigitalProduct,
} from "./products";

// Static page: product list is a code constant, no per-request data.
export const dynamic = "force-static";

const PATH = "/digital-products";

export const metadata: Metadata = {
  title: pageTitle("Digital Products: Templates, Scripts & Trackers"),
  description: pageDescription(
    "Ready-made templates, trackers and printables for realtors, agents, clinics, small businesses and Christmas. Instant download.",
  ),
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "Digital Products: templates, trackers and printables",
    description:
      "Ready-made kits for small businesses and the holidays. Buy on Etsy or Gumroad and download instantly.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

// Product schema without ratings or reviews (none exist on this page).
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "SkynetLabs digital products",
  url: `${SITE.url}${PATH}`,
  itemListElement: DIGITAL_PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.inside,
      image: `${SITE.url}${p.image}`,
      brand: { "@type": "Brand", name: SITE.brand },
      offers: {
        "@type": "Offer",
        url: p.url,
        price: p.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

const crumbs = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Digital Products", url: `${SITE.url}${PATH}` },
]);

const mono = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
} as const;

const GROUPS = groupByCategory();

function StoreButton({ p }: { p: DigitalProduct }) {
  const store = STORE_LABEL[p.store];
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${p.name} on ${store} (opens in a new tab)`}
      className="inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
      style={{
        background: "var(--terracotta-aa)",
        color: "#fff",
        fontWeight: 600,
        fontSize: 14,
        padding: "11px 18px",
        borderRadius: 2,
        minHeight: 44,
        borderBottom: "none",
      }}
    >
      View on {store}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

function Card({ p }: { p: DigitalProduct }) {
  return (
    <article
      className="flex flex-col"
      style={{
        background: "var(--cream-3)",
        border: "1px solid rgba(26,26,26,0.12)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Image
        src={p.image}
        alt={`${p.name} cover image`}
        width={800}
        height={800}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
        className="w-full h-auto"
        style={{ borderBottom: "1px solid rgba(26,26,26,0.10)" }}
      />
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 22,
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            color: "var(--ink)",
            margin: 0,
          }}
        >
          {p.name}
        </h3>
        {p.forWho && (
          <p style={{ fontSize: 14, color: "var(--ink-2)", margin: 0 }}>
            <b style={{ color: "var(--ink)" }}>For: </b>
            {p.forWho}
          </p>
        )}
        {p.inside && (
          <p style={{ fontSize: 14, color: "var(--ink-2)", margin: 0 }}>
            <b style={{ color: "var(--ink)" }}>Inside: </b>
            {p.inside}
          </p>
        )}
        <div className="mt-auto pt-3 flex items-center justify-between gap-3 flex-wrap">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 26,
              color: "var(--ink)",
            }}
          >
            ${p.price.toFixed(2)}
          </span>
          <StoreButton p={p} />
        </div>
      </div>
    </article>
  );
}

export default function DigitalProductsPage() {
  const total = DIGITAL_PRODUCTS.length;
  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={crumbs} />

      {/* HERO */}
      <section
        className="relative pt-32 md:pt-40 pb-14"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <Reveal
          initialVisible
          className="container-x px-6 relative z-10 max-w-4xl"
        >
          <div
            className="inline-flex items-center gap-3 mb-5"
            style={{ ...mono, color: "var(--terracotta-aa)" }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta)",
                display: "inline-block",
              }}
            />
            Digital Products · SkynetLabs
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              fontSize: "clamp(36px, 6vw, 64px)",
              margin: "0 0 20px",
            }}
          >
            Ready-made kits for{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              small businesses
            </span>{" "}
            and the holidays.
          </h1>
          <p
            style={{
              fontSize: 19,
              color: "var(--ink-2)",
              maxWidth: "54ch",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {total} ready-made templates, scripts, trackers and printables.
            Formats differ by kit (Word, Google Docs, PDF, Excel or Google
            Sheets), and each card says what is inside. Buy on Etsy or Gumroad
            and download instantly.
          </p>
        </Reveal>
      </section>

      {/* CATEGORY CHIPS */}
      <nav
        aria-label="Product categories"
        className="sticky z-20"
        style={{
          top: 64,
          background: "var(--cream)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 max-w-6xl mx-auto">
          <ul
            className="flex gap-2 py-3 m-0 list-none overflow-x-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {GROUPS.map((g) => (
              <li key={g.category} className="shrink-0">
                <a
                  href={`#${categoryAnchor(g.category)}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap"
                  style={{
                    border: "1px solid rgba(26,26,26,0.22)",
                    borderRadius: 999,
                    padding: "8px 14px",
                    fontSize: 14,
                    minHeight: 44,
                    color: "var(--ink)",
                    background: "var(--cream-3)",
                  }}
                >
                  {g.category}
                  <span style={{ color: "var(--ink-faint)", fontSize: 12 }}>
                    {g.products.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* GRID */}
      <section
        className="pb-16 md:pb-20"
        style={{ background: "var(--cream)" }}
      >
        <div className="container-x px-6 max-w-6xl mx-auto">
          {GROUPS.map((g) => (
            <section
              key={g.category}
              id={categoryAnchor(g.category)}
              aria-labelledby={`h-${categoryAnchor(g.category)}`}
              style={{ scrollMarginTop: 140, paddingTop: 40 }}
            >
              <h2
                id={`h-${categoryAnchor(g.category)}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(26px, 3.5vw, 34px)",
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: "0 0 24px",
                }}
              >
                {g.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {g.products.map((p) => (
                  <Card key={p.slug} p={p} />
                ))}
              </div>
            </section>
          ))}
          <p
            style={{
              marginTop: 28,
              fontSize: 13,
              color: "var(--ink-faint)",
              maxWidth: "70ch",
            }}
          >
            Digital downloads, sold and delivered by Etsy or Gumroad. Prices
            shown are the store prices today; prices on the store may change.
          </p>
        </div>
      </section>
    </>
  );
}
