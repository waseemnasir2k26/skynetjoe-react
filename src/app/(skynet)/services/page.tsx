import Link from "next/link";
import type { Metadata } from "next";
import {
  SITE,
  SERVICE_CATEGORIES,
  DEFAULT_OG_IMAGES,
  twitterFromOpenGraph,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PainSolverGrid from "@/components/services/PainSolverGrid";
import ServiceMenuCollapsed from "@/components/services/ServiceMenuCollapsed";

export const metadata: Metadata = {
  title: "Services — We don't sell services. We fix what's costing you.",
  description:
    "Eight founder problems, eight done-for-you fixes. Behind them: 16 production-grade services across automation, AI content, websites and consulting. Fixed scope, public pricing, 5-14 day ship.",
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: "SkynetLabs — We fix the problem, not sell you a service",
    description:
      "Pick the problem. We fix it. Eight founder problems mapped to 16 production services. Fixed scope, public pricing.",
    url: `${SITE.url}/services`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: twitterFromOpenGraph({
    title: "SkynetLabs — We fix the problem, not sell you a service",
    description:
      "Pick the problem. We fix it. Eight founder problems mapped to 16 production services. Fixed scope, public pricing.",
  }),
};

type ServiceItem = {
  slug: string;
  label: string;
  icon: string;
  desc: string;
  href?: string;
};
// Only items WITHOUT an `href` are real /services/[slug] detail pages.
// Items with an `href` (e.g. freightops-logistics → /lp/logistics) are
// excluded from generateStaticParams, so emitting /services/<slug> 404s.
const allServices: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly ServiceItem[],
).filter((svc) => !svc.href);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/services#collection`,
      name: `${SITE.brand} Services`,
      description:
        "Eight founder problems, eight done-for-you fixes. Sixteen production-grade services across workflow automation, AI content, modern websites and operator consulting.",
      url: `${SITE.url}/services`,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${SITE.url}/services#catalog`,
      name: `${SITE.brand} Service Catalog`,
      url: `${SITE.url}/services`,
      provider: { "@id": `${SITE.url}/#organization` },
      itemListElement: allServices.map((svc, i) => ({
        "@type": "Offer",
        position: i + 1,
        url: `${SITE.url}/services/${svc.slug}`,
        itemOffered: {
          "@type": "Service",
          name: svc.label,
          description: svc.desc,
          url: `${SITE.url}/services/${svc.slug}`,
          provider: { "@id": `${SITE.url}/#organization` },
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE.url}/services`,
        },
      ],
    },
  ],
};

export default function ServicesIndexPage() {
  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO — skyv3 (lp/logistics) design language */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              We fix the problem&nbsp;· not sell you a service
            </div>

            <h1>
              16 production services. <em>One done-for-you fix</em> for whatever
              is costing you.
            </h1>

            <p className="hero-sub">
              Workflow automation, AI chat + voice agents, fast SEO-ready
              websites, and CRM setup — built and handed over with the code.{" "}
              <strong>180+ workflows · 40+ websites · 9 countries</strong> —
              fixed scope, public pricing, and your{" "}
              <strong>repo in your GitHub on launch day</strong>. We ship in
              5–14 days, not 14 weeks.
            </p>

            <div className="cta-row">
              <Link
                href={SITE.cta.href}
                className="btn-primary"
                data-meta-event="Schedule"
                data-meta-name="services-book-audit"
              >
                {SITE.cta.label} →
              </Link>
              <Link href="/case-studies" className="btn-line">
                See real fixes
              </Link>
            </div>

            <div className="hero-scarcity">
              <strong>Limited monthly builds</strong>&nbsp;· 8-hour reply window
            </div>

            <div className="featured-in">
              <span className="featured-lbl">Featured</span>
              <span>Upwork Top Rated Plus</span>
              <span>Fiverr Top Rated</span>
              <span>180+ workflows</span>
              <span>9 countries</span>
              <span>Claude Code Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8 PAIN CARDS — self-contained cream-editorial section, inherits .sky tokens */}
      <PainSolverGrid />

      {/* COLLAPSED FULL MENU (SEO + power browsers) — inherits .sky tokens */}
      <ServiceMenuCollapsed />

      {/* CLOSER — skyv3 pattern */}
      <section className="closer">
        <div className="closer-scarcity">
          Every week you wait, it costs you more
        </div>
        <h2>
          Pick the problem. <em>We fix it.</em>
        </h2>
        <p>
          One 30-min call. Honest scope. Fixed price. No back-and-forth — a
          clear yes or no within 8 hours.
        </p>
        <div className="cta-row">
          <Link
            href={SITE.cta.href}
            className="btn-primary"
            data-meta-event="Schedule"
            data-meta-name="services-closer-book-audit"
          >
            {SITE.cta.label} →
          </Link>
          <Link href="/pricing" className="btn-line">
            See pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
