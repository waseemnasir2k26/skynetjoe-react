import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Ghost, Plug, Sparkles } from "lucide-react";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import InlineCTABand from "@/components/cta/InlineCTABand";
import ScarcityChip from "@/components/cta/ScarcityChip";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "services-index.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Services — 16 builds across automation, AI content, development & consulting",
  description:
    "Sixteen production-grade services from SkynetLabs across n8n automation, AI content, Next.js development and operator consulting. Fixed scope, public pricing, 5–14d ship.",
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: "SkynetLabs Services — 16 builds, 4 categories",
    description:
      "Automation, AI content, development, consulting. Sixteen real services, fixed scopes, 5–14 day ship window.",
    url: `${SITE.url}/services`,
    type: "website",
  },
};

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
const allServices: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly ServiceItem[]
);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/services#collection`,
      name: `${SITE.brand} Services`,
      description:
        "Sixteen production-grade services across n8n automation, AI content, Next.js development and operator consulting.",
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

/**
 * T01 — Hick's Law collapse: 16 services -> 3 outcome shortcuts above the grid.
 * Keeps the full 16-service catalog below for SEO + intent-rich browsers.
 */
const OUTCOMES = [
  {
    icon: Ghost,
    title: "Leads that ghost.",
    body: "Auto-route every inquiry to WhatsApp + email in under 90 sec — n8n + GoHighLevel.",
    href: "/services/n8n-automation",
    cta: "Fix lead leakage",
  },
  {
    icon: Plug,
    title: "Tools that don't talk.",
    body: "Stitch your CRM, calendar, Stripe, Slack into one chat-first command surface.",
    href: "/services/gohighlevel",
    cta: "Wire my stack",
  },
  {
    icon: Sparkles,
    title: "Content you don't have time to make.",
    body: "AI content engine: 20 LinkedIn posts + 8 reels + a blog drop, monthly, your voice.",
    href: "/services/ai-content-creation",
    cta: "See content engine",
  },
] as const;

function ThreeOutcomesBlock() {
  return (
    <section
      className="px-4 md:px-6 pt-24 md:pt-28 pb-10 md:pb-16"
      aria-label="Three outcome shortcuts"
    >
      <div className="container-x">
        <div className="max-w-2xl mb-8 md:mb-10">
          <div className="mb-4">
            <ScarcityChip tone="amber" size="sm" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.04] text-white mb-4">
            I fix{" "}
            <span
              style={{
                background:
                  "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              3 things.
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            16 deliverables, 4 categories — but every brief lands in one of
            these three. Pick the bleed, see the fix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OUTCOMES.map((o) => {
            const Icon = o.icon;
            return (
              <Link
                key={o.title}
                href={o.href}
                className="group relative rounded-2xl p-6 md:p-7 transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(10,45,74,0.65) 0%, rgba(7,56,70,0.55) 100%)",
                  border: "1px solid rgba(126, 228, 255, 0.18)",
                  boxShadow: "0 20px 40px -20px rgba(0, 212, 255, 0.30)",
                  backdropFilter: "blur(14px) saturate(140%)",
                  WebkitBackdropFilter: "blur(14px) saturate(140%)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30,136,229,0.30) 0%, rgba(20,184,166,0.30) 100%)",
                    border: "1px solid rgba(126, 228, 255, 0.30)",
                  }}
                >
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                  {o.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-5">
                  {o.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-cyan-300 text-sm font-semibold group-hover:gap-2.5 transition-all">
                  {o.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 mt-8 text-center">
          Need the full menu? The 16-service catalog is just below.
        </p>
      </div>
    </section>
  );
}

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd data={schema} />
      <ThreeOutcomesBlock />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <InlineCTABand
        variant="loss-frame"
        headline="Every week you wait is leads landing in someone else's inbox."
        subhead="One 30-min call. Honest scope. Fixed price. No discovery dance."
        primaryCTA={{
          label: "Book my strategy call",
          href: "/discovery-call",
        }}
        secondaryCTA={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
