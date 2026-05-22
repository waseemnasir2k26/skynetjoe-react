import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  MapPin,
  Calendar,
  MessageCircle,
  CheckCircle2,
  TrendingUp,
  Building2,
  Clock,
} from "lucide-react";
import { SERVICE_CATEGORIES, SITE } from "@/lib/site";
import { STATES, type StateEntry } from "@/lib/states";
import JsonLd from "@/components/JsonLd";
import { getEnrichment } from "@/data/service-state-enrichment";
import {
  isServiceStateIndexable,
  serviceStateQualityScore,
} from "@/lib/sitemap-quality";

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
type CategoryName = (typeof SERVICE_CATEGORIES)[number]["name"];

const SERVICES: (ServiceItem & { category: CategoryName })[] =
  SERVICE_CATEGORIES.flatMap((c) =>
    (c.services as readonly ServiceItem[]).map((s) => ({
      ...s,
      category: c.name,
    }))
  );

// Category -> ribbon-top gradient (OCEAN palette)
const CATEGORY_RIBBON: Record<CategoryName, string> = {
  Automation: "linear-gradient(90deg, #1E88E5 0%, #14B8A6 100%)",
  "AI Content": "linear-gradient(90deg, #14B8A6 0%, #06b6d4 100%)",
  Development: "linear-gradient(90deg, #06b6d4 0%, #1E88E5 100%)",
  Consulting: "linear-gradient(90deg, #5eead4 0%, #1E88E5 100%)",
};

// Mid-market hourly benchmarks (USD/hr) used in comparison snippet.
// Sourced from BLS + Clutch.co 2025 regional advertising/dev rate averages.
const STATE_AGENCY_HOURLY: Record<string, number> = {
  california: 185,
  "new-york": 195,
  texas: 145,
  florida: 135,
  massachusetts: 175,
  illinois: 155,
  washington: 175,
  colorado: 150,
  georgia: 130,
  "north-carolina": 130,
  pennsylvania: 140,
  ohio: 120,
  michigan: 125,
  virginia: 145,
  arizona: 130,
  "new-jersey": 160,
  oregon: 145,
  utah: 135,
  minnesota: 140,
  tennessee: 125,
  maryland: 145,
  connecticut: 165,
  indiana: 115,
  missouri: 115,
  wisconsin: 120,
  "south-carolina": 115,
  alabama: 105,
  louisiana: 110,
  kentucky: 110,
  oklahoma: 110,
  iowa: 115,
  kansas: 110,
  nevada: 130,
  "new-hampshire": 135,
  maine: 120,
  "rhode-island": 135,
  vermont: 120,
  delaware: 140,
  arkansas: 100,
  mississippi: 95,
  "west-virginia": 100,
  nebraska: 115,
  idaho: 115,
  montana: 110,
  "north-dakota": 110,
  "south-dakota": 105,
  wyoming: 105,
  "new-mexico": 115,
};

function agencyRate(slug: string): number {
  return STATE_AGENCY_HOURLY[slug] ?? 125;
}

// Per-service stat shown in hero ribbon (unique anchor per service)
const SERVICE_STAT: Record<string, { value: string; label: string }> = {
  "n8n-automation": { value: "180+", label: "n8n flows shipped" },
  gohighlevel: { value: "40+", label: "GHL pipelines built" },
  "zapier-make": { value: "9", label: "countries integrated" },
  "social-automation": { value: "12k+", label: "auto-DMs/mo" },
  "ai-video": { value: "300+", label: "reels rendered" },
  "youtube-automation": { value: "8", label: "faceless channels live" },
  "tiktok-automation": { value: "40+", label: "TT pages running" },
  "facebook-automation": { value: "60+", label: "FB pages managed" },
  "wordpress-seo": { value: "180+", label: "AEO posts shipped" },
  "ecommerce-automation": { value: "$2M+", label: "GMV touched" },
  "vibe-coded-sites": { value: "7d", label: "Next.js ship window" },
  "ai-chatbots": { value: "5", label: "channels per bot" },
  "ai-business-systems": { value: "48h", label: "ops blueprint return" },
  "strategy-training": { value: "1:1", label: "team workshops" },
  "branding-design": { value: "<14d", label: "identity sprint" },
  "ai-content-creation": { value: "30/mo", label: "voice-locked posts" },
};

// Industry-tuned phrasing (light variants — keeps copy fresh per industry)
function tuneForIndustry(svcLabel: string, industry: string): string {
  const lc = industry.toLowerCase();
  if (lc === "tech" || lc === "fintech" || lc === "biotech" || lc === "cybersecurity") {
    return `${svcLabel} tuned for ${industry} teams that need internal tooling and customer-facing flows wired in the same sprint`;
  }
  if (lc === "healthcare" || lc === "pharma" || lc === "wellness") {
    return `${svcLabel} for ${industry} operators handling HIPAA-adjacent intake, scheduling and patient follow-up`;
  }
  if (lc === "real estate" || lc === "hospitality" || lc === "tourism") {
    return `${svcLabel} for ${industry} businesses chasing lead speed-to-contact and post-booking ops`;
  }
  if (lc === "manufacturing" || lc === "logistics" || lc === "automotive" || lc === "aerospace") {
    return `${svcLabel} for ${industry} ops cutting handoff time between quote, order and dispatch`;
  }
  if (lc === "energy" || lc === "agriculture" || lc === "mining" || lc === "forestry") {
    return `${svcLabel} for ${industry} operators consolidating field reports, vendor docs and compliance trails`;
  }
  if (lc === "education") {
    return `${svcLabel} for ${industry} institutions automating enrollment, parent comms and faculty handoffs`;
  }
  if (lc === "finance" || lc === "insurance" || lc === "legal") {
    return `${svcLabel} for ${industry} firms tightening intake, document collection and matter-routing`;
  }
  if (lc === "retail" || lc === "ecommerce") {
    return `${svcLabel} for ${industry} brands closing the gap between cart, fulfillment and post-purchase`;
  }
  if (
    lc === "entertainment" ||
    lc === "media" ||
    lc === "music" ||
    lc === "film" ||
    lc === "fashion"
  ) {
    return `${svcLabel} for ${industry} teams shipping content workflows that don't stall the creative side`;
  }
  if (lc === "gaming" || lc === "cannabis" || lc === "bourbon" || lc === "seafood" || lc === "dairy") {
    return `${svcLabel} for ${industry} operators handling compliance-heavy customer flows`;
  }
  if (lc === "outdoor" || lc === "outdoor recreation" || lc === "shipping" || lc === "chemical" || lc === "defense" || lc === "transportation") {
    return `${svcLabel} for ${industry} teams that live in spreadsheets and want a system of record`;
  }
  return `${svcLabel} tuned for ${industry} operators who want automation without ripping out the existing stack`;
}

// Per-city paragraph seed — 5 unique blurbs per page anchored to city slot
const CITY_HOOKS: string[] = [
  "Founders here usually start with one painful manual workflow — invoicing, lead routing, or scheduling. We start there and expand the system once the first win is visible.",
  "Engagements with operators in this market typically begin with a CRM audit — most lose 20–30% of leads before the first follow-up touch. Plugging that hole alone covers the build cost.",
  "Teams in this city tend to be lean — three to twelve people doing the work of twenty. Automation is the only way to scale without hiring, and we build for that exact ceiling.",
  "Most clients in this area run on a patchwork of Google Sheets, free Zapier zaps and a CRM nobody fully trusts. We consolidate the stack into one source of truth in 5–14 days.",
  "Operators based here often ask for one workflow and discover four others worth automating during scoping. Fixed-price means scope creep gets handled, not billed.",
];

export const dynamicParams = false;

export function generateStaticParams() {
  const pairs: { slug: string; state: string }[] = [];
  for (const svc of SERVICES) {
    for (const s of STATES) {
      pairs.push({ slug: svc.slug, state: s.slug });
    }
  }
  return pairs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; state: string }>;
}): Promise<Metadata> {
  const { slug, state } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  const st = STATES.find((s) => s.slug === state);
  if (!svc || !st) return {};
  const title = `${svc.label} in ${st.name} — Hire an Expert | ${SITE.brand}`;
  const description = `${svc.label} for ${st.name} businesses across ${st.cities
    .slice(0, 3)
    .join(", ")} and ${st.abbr}. ${svc.desc}. Fixed scope, 5–14 day ship, no on-site.`;

  // Thin-content protection: pages below the quality threshold ship with
  // robots: { index: false, follow: true } so Google crawls links but won't
  // index the duplicate-template shell.
  const indexable = isServiceStateIndexable(svc.slug, st.slug);

  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/services/${svc.slug}/in/${st.slug}` },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/services/${svc.slug}/in/${st.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Skynetjoe1",
    },
  };
}

// Deterministic small "nearby" pill cluster per state — slug-hash slice so every
// page shows a different sibling set (kills duplicate-content footprint).
function nearbyStates(s: StateEntry): StateEntry[] {
  const others = STATES.filter((x) => x.slug !== s.slug);
  let hash = 0;
  for (let i = 0; i < s.slug.length; i++) {
    hash = (hash * 31 + s.slug.charCodeAt(i)) >>> 0;
  }
  const start = hash % others.length;
  const ring = [...others.slice(start), ...others.slice(0, start)];
  return ring.slice(0, 8);
}

export default async function ServiceStatePage({
  params,
}: {
  params: Promise<{ slug: string; state: string }>;
}) {
  const { slug, state } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  const st = STATES.find((s) => s.slug === state);
  if (!svc || !st) notFound();

  const stat = SERVICE_STAT[svc.slug] ?? { value: "5–14d", label: "ship window" };
  const ribbon = CATEGORY_RIBBON[svc.category];
  const hourly = agencyRate(st.slug);
  const annualSavings = Math.round(hourly * 1.4 * 10) * 100; // ~1.4h/wk × 52 × hourly, rounded to $100
  const nearby = nearbyStates(st);
  const enrichment = getEnrichment(svc.slug, st.slug);
  const qualityScore = serviceStateQualityScore(svc.slug, st.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE.url}/services/${svc.slug}/in/${st.slug}#service`,
        name: `${svc.label} in ${st.name}`,
        description: `${svc.desc}. Available across ${st.name} including ${st.cities.join(
          ", "
        )}.`,
        provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
        areaServed: {
          "@type": "AdministrativeArea",
          name: st.name,
          containedInPlace: { "@type": "Country", name: "United States" },
          containsPlace: st.cities.map((c) => ({
            "@type": "City",
            name: c,
            containedInPlace: { "@type": "AdministrativeArea", name: st.name },
          })),
        },
        serviceType: svc.label,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${svc.label} packages for ${st.name}`,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${svc.label} starter for ${st.name}`,
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "USD",
                minPrice: 500,
                maxPrice: 1500,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${svc.label} growth for ${st.name}`,
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "USD",
                minPrice: 1500,
                maxPrice: 4000,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${svc.label} enterprise for ${st.name}`,
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "USD",
                minPrice: 4000,
                maxPrice: 8000,
              },
            },
          ],
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
          {
            "@type": "ListItem",
            position: 4,
            name: st.name,
            item: `${SITE.url}/services/${svc.slug}/in/${st.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Do you offer ${svc.label} in ${st.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes — we serve all of ${st.name} including ${st.cities.join(
                ", "
              )}. Standard ship window is 5–14 days. Remote-first, no on-site travel required.`,
            },
          },
          {
            "@type": "Question",
            name: `How much does ${svc.label} cost in ${st.name} vs hiring a local agency?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Mid-market ${st.name} agency rates average $${hourly}/hr — a typical ${svc.label} engagement runs 30–60 hours, or roughly $${hourly * 30}–$${hourly * 60}. Our fixed-scope range is $500–$8,000 depending on complexity, often 30–50% lower than ${st.abbr} agency hourly totals.`,
            },
          },
          {
            "@type": "Question",
            name: `Which ${st.name} industries do you typically build for?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Most ${st.name} engagements come from ${st.industries[0]}, ${st.industries[1]} and ${st.industries[2]} operators — verticals with high admin overhead that respond well to ${svc.label.toLowerCase()}.`,
            },
          },
          {
            "@type": "Question",
            name: `How fast can you ship ${svc.label} for a ${st.name} business?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Typical 5–14 day window from kickoff. Urgent ${st.name} projects ship faster with premium rate. We're based in Bali (GMT+8) — your morning happens during our afternoon, which keeps async tight.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* Ribbon-top category strip */}
      <div className="h-1.5 w-full" style={{ background: ribbon }} aria-hidden />

      {/* Hero */}
      <section
        className="relative overflow-hidden pt-20 md:pt-28 pb-14"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 540,
            height: 540,
            background: "#1E88E5",
            top: -90,
            left: -130,
            opacity: 0.55,
          }}
        />
        <span
          className="orb"
          style={{
            width: 580,
            height: 580,
            background: "#00D4FF",
            top: 80,
            right: -160,
            opacity: 0.45,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10">
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-cyan-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-cyan-300">
              Services
            </Link>
            <span>/</span>
            <Link
              href={`/services/${svc.slug}`}
              className="hover:text-cyan-300"
            >
              {svc.label}
            </Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-cyan-300">
              Locations
            </Link>
            <span>/</span>
            <span className="text-cyan-300">{st.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-cyan-500/12 border border-cyan-400/40 text-cyan-200">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-wider uppercase">
                {svc.category} · Serving {st.name} ({st.abbr})
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5 text-white">
              {svc.label} in {st.name}
              <span className="block text-2xl md:text-3xl mt-3 font-semibold text-cyan-200/90">
                {st.cities[0]} to {st.cities[st.cities.length - 1]} — one
                operator, fixed scope.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl">
              {svc.desc}. Built for {st.name} businesses across{" "}
              {st.cities.slice(0, 4).join(", ")} and beyond — fixed-price,
              ship-ready in 5–14 days, remote-first from Bali.
            </p>

            {/* State-anchored stat strip */}
            <div className="inline-flex items-center gap-3 mb-8 px-5 py-3 rounded-2xl bg-white/5 border border-cyan-400/20">
              <TrendingUp className="w-5 h-5 text-cyan-300" />
              <span className="text-sm text-gray-200">
                <strong className="text-white">{stat.value}</strong> {stat.label}{" "}
                — including operators across {st.abbr}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                }}
              >
                <Calendar className="w-4 h-4" />
                Apply for a discovery call
              </Link>
              <a
                href="#livechat-open"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white border border-white/20 hover:border-white/40"
              >
                <MessageCircle className="w-4 h-4" />
                Live chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why-state-specific block (industry-tuned) */}
      <section className="section pt-14">
        <div className="container-x">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Why {st.name} specifically
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
              {svc.label} built for {st.abbr} verticals
            </h2>
            <p className="text-gray-300 leading-relaxed mb-5">
              {st.name} has a distinct operator profile. Our{" "}
              {svc.label.toLowerCase()} engagements in the state cluster around
              three verticals — and we&apos;ve standardized playbooks for each.
            </p>

            {enrichment && (
              <div
                className="mb-6 p-6 rounded-2xl bg-white/95 border border-cyan-200/60 shadow-md shadow-cyan-500/10"
                data-quality-score={qualityScore}
              >
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                  {enrichment}
                </p>
              </div>
            )}
            <ul className="space-y-3 mb-2">
              {st.industries.map((ind) => (
                <li
                  key={ind}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/95 border border-white/60 shadow-md shadow-cyan-500/5"
                >
                  <Building2 className="w-5 h-5 text-skynet-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm md:text-base leading-relaxed">
                    {tuneForIndustry(svc.label, ind)}.
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Local-intent block: 5 unique city paragraphs */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              City-by-city · {st.name}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              {svc.label} across {st.abbr}
            </h2>
            <p className="text-gray-300">
              Same operator, same fixed-scope build, slightly different first
              workflow depending on where in {st.name} you sit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {st.cities.map((city, idx) => (
              <article
                key={city}
                className="p-6 rounded-2xl bg-white/95 border border-white/60 shadow-lg shadow-cyan-500/5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-skynet-primary" />
                  <h3 className="text-base font-bold text-slate-900">
                    {svc.label} in {city}, {st.abbr}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {CITY_HOOKS[idx % CITY_HOOKS.length]} For {city} operators,
                  the {svc.label.toLowerCase()} engagement maps cleanly to the{" "}
                  {st.industries[idx % st.industries.length]} pattern we&apos;ve
                  shipped repeatedly.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison snippet: SkynetLabs vs local agency w/ state cost benchmarks */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Cost comparison · {st.name}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
              {svc.label} vs hiring a {st.name} agency
            </h2>
            <div className="rounded-3xl bg-gradient-to-br from-[#0a2d4a]/80 via-[#073846]/60 to-[#0a2d4a]/80 border border-cyan-400/20 p-7 md:p-9 backdrop-blur-md">
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                  <span>
                    Mid-market {st.name} agency rates average{" "}
                    <strong className="text-white">${hourly}/hr</strong>. A
                    typical {svc.label.toLowerCase()} build runs 30–60 hours
                    locally — that&apos;s{" "}
                    <strong className="text-white">
                      ${(hourly * 30).toLocaleString()}–$
                      {(hourly * 60).toLocaleString()}
                    </strong>{" "}
                    before retainer.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                  <span>
                    Our fixed-scope {svc.label.toLowerCase()} engagement lands{" "}
                    <strong className="text-white">$500–$8,000</strong>{" "}
                    depending on complexity — typically 30–50% under {st.abbr}{" "}
                    agency hourly totals, with no scope-creep billing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                  <span>
                    Even after build, automated workflows save the average{" "}
                    {st.name} operator ~1.4 hours of admin/week — about{" "}
                    <strong className="text-white">
                      ${annualSavings.toLocaleString()}/yr
                    </strong>{" "}
                    in recovered owner time at local market rates.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cities + FAQ + Aside */}
      <section className="section">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                Common questions from {st.name}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
                {svc.label} FAQ · {st.abbr}
              </h2>
              <div className="space-y-3">
                <details
                  open
                  className="rounded-xl bg-white/5 border border-white/10 p-5"
                >
                  <summary className="font-semibold text-white cursor-pointer">
                    Do you offer {svc.label} in {st.name}?
                  </summary>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                    Yes — we serve all of {st.name} including{" "}
                    {st.cities.join(", ")}. Remote-first, no on-site travel
                    required. Standard ship window is 5–14 days from kickoff.
                  </p>
                </details>
                <details className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <summary className="font-semibold text-white cursor-pointer">
                    How much does {svc.label} cost in {st.name} vs hiring a
                    local agency?
                  </summary>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                    Mid-market {st.name} agency rates average ${hourly}/hr — a
                    30–60 hour {svc.label.toLowerCase()} build runs $
                    {(hourly * 30).toLocaleString()}–$
                    {(hourly * 60).toLocaleString()} locally. Our fixed-scope
                    range is $500–$8,000, often 30–50% lower than {st.abbr}{" "}
                    agency hourly totals.
                  </p>
                </details>
                <details className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <summary className="font-semibold text-white cursor-pointer">
                    Which {st.name} industries do you typically build for?
                  </summary>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                    Most {st.name} engagements come from {st.industries[0]},{" "}
                    {st.industries[1]} and {st.industries[2]} operators —
                    verticals with high admin overhead that respond well to{" "}
                    {svc.label.toLowerCase()}.
                  </p>
                </details>
                <details className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <summary className="font-semibold text-white cursor-pointer">
                    How fast can you ship for a {st.name} business?
                  </summary>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                    Typical 5–14 day window. Urgent {st.name} projects ship
                    faster with premium rate. We&apos;re based in Bali (GMT+8) —
                    your morning email gets answered during our afternoon, which
                    keeps async tight.
                  </p>
                </details>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/95 border border-white/60 shadow-lg shadow-cyan-500/5">
                <div
                  className="h-1 -mx-6 -mt-6 mb-5 rounded-t-2xl"
                  style={{ background: ribbon }}
                  aria-hidden
                />
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  {svc.label} · {st.name}
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{" "}
                    5–14 day ship into {st.abbr}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{" "}
                    Fixed-price, no hourly
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{" "}
                    Remote / async / no on-site
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{" "}
                    8h weekday reply (Bali GMT+8)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{" "}
                    Cancel before kickoff, full refund
                  </li>
                </ul>
                <Link
                  href="/discovery-call"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-skynet-primary text-white font-semibold hover:bg-skynet-primary/90 transition"
                >
                  Apply for a call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Related services in {st.name}
                </h4>
                <ul className="space-y-2">
                  {SERVICES.filter((s) => s.slug !== svc.slug)
                    .slice(0, 6)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}/in/${st.slug}`}
                          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1 group"
                        >
                          {s.label} in {st.name}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-semibold text-white mb-3">
                  {svc.label} in other states
                </h4>
                <div className="flex flex-wrap gap-2">
                  {nearby.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/services/${svc.slug}/in/${other.slug}`}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200 hover:border-cyan-400/60 hover:text-cyan-200 transition"
                    >
                      {other.abbr}
                    </Link>
                  ))}
                  <Link
                    href={`/services/${svc.slug}`}
                    className="px-2.5 py-1 rounded-full bg-cyan-400 text-slate-900 text-xs font-semibold hover:bg-cyan-300 transition"
                  >
                    All 48 →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <div className="container-x">
          <div
            className="rounded-3xl p-8 md:p-12 text-center"
            style={{
              background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            }}
          >
            <CheckCircle2 className="w-10 h-10 text-white/90 mx-auto mb-3" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              {svc.label} for {st.name}?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Send a brief. Yes/no in 8 hours. Fixed scope in 48. Shipped to{" "}
              {st.cities[0]}, {st.cities[1]} or anywhere in {st.abbr}.
            </p>
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-cyan-50 transition"
            >
              Apply for a discovery call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
