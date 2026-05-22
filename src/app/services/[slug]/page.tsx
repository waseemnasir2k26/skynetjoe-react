import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES, SITE } from "@/lib/site";
import { STATES } from "@/lib/states";
import JsonLd from "@/components/JsonLd";

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
const SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly ServiceItem[]
);
const SLUGS = SERVICES.map((s) => s.slug);

// Build a SEO-grade description (≥140 chars) from the short svc.desc tagline
// so meta-description, OG description, and Service schema all pass length floors.
function buildLongDescription(svc: ServiceItem): string {
  return (
    `${svc.label} from ${SITE.brand} — ${svc.desc}. ` +
    `Fixed-price scope returned within 48 hours of brief, ship window 5 to 14 days, ` +
    `delivered remotely from Bali by founder ${SITE.founder}. ` +
    `8-hour weekday reply guarantee, source-controlled deliverables, public pricing — no quote dance.`
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return {};
  const longDesc = buildLongDescription(svc);
  return {
    title: `${svc.label} — ${SITE.brand}`,
    description: longDesc,
    alternates: { canonical: `${SITE.url}/services/${svc.slug}` },
    openGraph: {
      title: `${svc.label} — ${SITE.brand}`,
      description: longDesc,
      url: `${SITE.url}/services/${svc.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${svc.label} — ${SITE.brand}`,
      description: longDesc,
      creator: "@Skynetjoe1",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();

  const file = path.join(
    process.cwd(),
    "content",
    "services",
    `${slug}.html`
  );
  const html = fs.readFileSync(file, "utf8");
  const svc = SERVICES.find((s) => s.slug === slug)!;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE.url}/services/${svc.slug}#service`,
        name: svc.label,
        description: buildLongDescription(svc),
        url: `${SITE.url}/services/${svc.slug}`,
        serviceType: svc.label,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 297,
            maxPrice: 9500,
            priceCurrency: "USD",
          },
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/services/${svc.slug}`,
        },
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
          {
            "@type": "ListItem",
            position: 3,
            name: svc.label,
            item: `${SITE.url}/services/${svc.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className="wn-service-shell"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Available in 48 states — feeds the /services/[slug]/in/[state] matrix */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Available nationwide
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              {svc.label} in all 48 states
            </h2>
            <p className="text-gray-300">
              Same fixed-scope build, delivered remotely to any US state.
              Tap your state to see {svc.label.toLowerCase()} tuned for local
              verticals, agency cost benchmarks and city-level intent.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {STATES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${svc.slug}/in/${s.slug}`}
                className="group flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/60 hover:bg-white/10 transition"
              >
                <span className="flex items-center gap-1.5 text-xs text-gray-200">
                  <MapPin className="w-3 h-3 text-cyan-300" />
                  {s.name}
                </span>
                <ArrowRight className="w-3 h-3 text-gray-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
