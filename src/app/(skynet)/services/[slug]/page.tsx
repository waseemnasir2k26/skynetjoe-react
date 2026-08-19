import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES, SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import { STATES } from "@/lib/states";
import { PRIORITY_STATE_SLUGS } from "@/data/state-priority";
import { getEnrichment } from "@/data/service-state-enrichment";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceFunnel from "@/components/services/ServiceFunnel";
import { SERVICE_FUNNELS } from "@/data/service-funnels";
import { findServicePricing } from "@/lib/service-pricing";

/**
 * 2026-08-19: the former top-5 bespoke-LP slugs (n8n-automation,
 * gohighlevel, ai-chatbots, wordpress-seo, vibe-coded-sites) were migrated
 * onto the same data-driven <ServiceFunnel/> template as the other 11
 * services (src/data/service-funnels/*.ts) so every service page carries
 * FAQPage schema, pricing tiers, and an honest comparison section.
 * The old bespoke components (src/components/services/lp/*) are retired.
 * All 16 slugs now render via SERVICE_FUNNELS; remaining slugs (if any)
 * fall back to the static HTML payload.
 */

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
const SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly (ServiceItem & { href?: string })[],
).filter((s): s is ServiceItem => !("href" in s) || !s.href);
const SLUGS = SERVICES.map((s) => s.slug);

// Build a SEO-grade description (≤140 chars) from the short svc.desc tagline
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
    // No brand suffix here — the (skynet) layout's title.template
    // (`%s | ${SITE.brand}`) already appends it; a hardcoded suffix rendered
    // "... — SkynetLabs | SkynetLabs".
    title: svc.label,
    description: longDesc,
    alternates: { canonical: `${SITE.url}/services/${svc.slug}` },
    openGraph: {
      title: `${svc.label} — ${SITE.brand}`,
      description: longDesc,
      url: `${SITE.url}/services/${svc.slug}`,
      type: "article",
      images: [...DEFAULT_OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: `${svc.label} — ${SITE.brand}`,
      description: longDesc,
      creator: "@skynetlabs",
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

  // Content source, in priority order:
  //   1. data-driven <ServiceFunnel/> (all 16 funnel services, 2026-08-19)
  //   2. static HTML payload from content/services/{slug}.html (fallback)
  // Git is the CMS — Payload was removed 2026-05-29. Only read the HTML when
  // no funnel content exists, so an unused/deleted payload can never crash
  // a page that no longer renders it.
  const funnel = SERVICE_FUNNELS[slug];
  const html = funnel
    ? null
    : fs.readFileSync(
        path.join(process.cwd(), "content", "services", `${slug}.html`),
        "utf8",
      );
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
        areaServed: [
          { "@type": "Country", name: "United States" },
          ...PRIORITY_STATE_SLUGS.map((stateSlug) => {
            const st = STATES.find((s) => s.slug === stateSlug);
            return {
              "@type": "AdministrativeArea",
              name: st?.name ?? stateSlug,
              containedInPlace: { "@type": "Country", name: "United States" },
            };
          }),
        ],
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
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        offsetTop
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: svc.label },
        ]}
      />
      <style>{`
        .cream-state-pill:hover { border-color: var(--terracotta) !important; }
      `}</style>
      {funnel ? (
        <ServiceFunnel content={funnel} pricing={findServicePricing(slug)} />
      ) : (
        <div
          className="wn-service-shell"
          dangerouslySetInnerHTML={{ __html: html ?? "" }}
        />
      )}

      {/* ──────────────────────────────────────────────────────────────────
          Available in: 8 priority states with deep enrichment + 40 other state pills
          Doorway-page risk killed — all state-keyword content consolidated
          into this single hub. Each accordion card has anchor id so old
          /services/[slug]/in/[state] URLs 301 to #state-[slug].
          <details> renders all content in DOM (SEO-readable) but collapses
          visually by default — best of both worlds, no JS hydration needed.
      ──────────────────────────────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6">
          <div className="max-w-4xl mb-8">
            <div
              className="inline-flex items-center gap-3 mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--terracotta-aa)",
                  display: "inline-block",
                }}
              />
              Available nationwide
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              {svc.label} across{" "}
              <span
                style={{
                  color: "var(--terracotta-aa)",
                  fontWeight: 700,
                }}
              >
                48 states.
              </span>
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6 }}>
              Same fixed-scope build, delivered remotely to any US state. The
              per-state breakdown is being rewritten — it carried first-party
              performance figures we could not substantiate, so it is withheld
              rather than shipped unverified. Ask on the call and you will get
              the local detail directly.
            </p>
          </div>

          {/* Priority-state accordion. Renders nothing while the enrichment is
              withheld (see src/data/service-state-enrichment.ts) -- each entry
              bails on a null cell, so this collapses to an empty list rather
              than a gap, and the states below carry every state instead. */}
          <div className="mb-8">
            {PRIORITY_STATE_SLUGS.map((stateSlug) => {
              const state = STATES.find((s) => s.slug === stateSlug);
              if (!state) return null;
              const enrichment = getEnrichment(svc.slug, stateSlug);
              if (!enrichment) return null;
              return (
                <details
                  key={stateSlug}
                  id={`state-${stateSlug}`}
                  style={{
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.10)",
                    borderRadius: 2,
                  }}
                >
                  <summary
                    style={{
                      padding: "14px 18px",
                      cursor: "pointer",
                      listStyle: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "var(--ink)",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <MapPin
                        className="w-4 h-4"
                        style={{ color: "var(--terracotta)" }}
                      />
                      {svc.label} in {state.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--ink-faint)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {state.abbr} ▾
                    </span>
                  </summary>
                  <div
                    style={{
                      padding: "0 18px 18px 18px",
                      fontSize: 14,
                      color: "var(--ink-2)",
                      lineHeight: 1.7,
                    }}
                  >
                    <p style={{ margin: "0 0 14px" }}>{enrichment}</p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 14,
                        fontSize: 12,
                        color: "var(--ink-faint)",
                      }}
                    >
                      <span>
                        <strong style={{ color: "var(--ink)" }}>Cities:</strong>{" "}
                        {state.cities.slice(0, 5).join(", ")}
                      </span>
                      <span>
                        <strong style={{ color: "var(--ink)" }}>
                          Verticals:
                        </strong>{" "}
                        {state.industries.join(", ")}
                      </span>
                      <Link
                        href={`/locations/${stateSlug}`}
                        style={{
                          color: "var(--terracotta-aa)",
                          textDecoration: "underline",
                        }}
                      >
                        Full {state.name} guide →
                      </Link>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>

          {/* 40 non-priority state pills → /locations/[state] */}
          <div className="max-w-4xl mb-4">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--ink-faint)",
                margin: 0,
              }}
            >
              Delivered in all 48 states
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {/* Previously excluded the 8 priority states because they had their
                own accordion above. That accordion is empty while the
                enrichment is withheld, so excluding them here hid 8 states
                entirely. List all 48. */}
            {STATES.filter(() => true).map((s) => (
              <Link
                key={s.slug}
                href={`/locations/${s.slug}`}
                className="group cream-state-pill flex items-center justify-between gap-2"
                style={{
                  padding: "10px 14px",
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.10)",
                  transition: "border-color 0.18s",
                }}
              >
                <span
                  className="flex items-center gap-1.5"
                  style={{ fontSize: 12, color: "var(--ink)" }}
                >
                  <MapPin
                    className="w-3 h-3"
                    style={{ color: "var(--terracotta)" }}
                  />
                  {s.name}
                </span>
                <ArrowRight
                  className="w-3 h-3 group-hover:translate-x-0.5 transition"
                  style={{ color: "var(--ink-faint)" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
