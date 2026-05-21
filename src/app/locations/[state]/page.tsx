import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { ArrowRight, MessageCircle, Calendar, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { STATES, getStateBySlug, type StateEntry } from "@/lib/states";
import { SERVICE_CATEGORIES, SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

type IconCmp = React.ComponentType<{ className?: string }>;
type SvcItem = { slug: string; label: string; icon: string; desc: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return {};
  const title = `AI Automation Expert in ${s.name} — n8n, GoHighLevel & AEO | ${SITE.brand}`;
  const description = `Hire an AI automation expert serving ${s.name} founders. n8n workflows, GoHighLevel CRM, AEO websites and WhatsApp chatbots delivered to ${s.cities.slice(0, 3).join(", ")} and surrounding ${s.abbr} businesses. Fixed scope, 5–14 day ship.`;
  return {
    title,
    description,
    alternates: { canonical: `/locations/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `/locations/${s.slug}`,
      type: "website",
    },
  };
}

// Local SEO keyword variants per service × state
function buildKeywordPhrases(svc: SvcItem, s: StateEntry): string[] {
  const label = svc.label;
  return [
    `${label} expert in ${s.name}`,
    `${label} services for ${s.name} founders`,
    `${label} consultant near ${s.cities[0]}`,
    `${label} agency in ${s.abbr}`,
    `Hire ${label} freelancer in ${s.name}`,
    `Best ${label} provider near ${s.cities[1]}`,
  ];
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) notFound();

  const allServices: SvcItem[] = SERVICE_CATEGORIES.flatMap(
    (c) => c.services as readonly SvcItem[]
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE.url}/locations/${s.slug}#service`,
        name: `AI Automation in ${s.name}`,
        description: `n8n workflows, AI chatbots, AEO-tuned websites, GoHighLevel CRM and WhatsApp automation for ${s.name} businesses across ${s.cities.join(", ")}.`,
        provider: {
          "@type": "Organization",
          name: SITE.brand,
          url: SITE.url,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: s.name,
          containedInPlace: { "@type": "Country", name: "United States" },
        },
        serviceType: "AI Automation",
        offers: allServices.map((svc) => ({
          "@type": "Offer",
          name: `${svc.label} in ${s.name}`,
          url: `${SITE.url}/services/${svc.slug}`,
          description: svc.desc,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `SkynetLabs services for ${s.name}`,
          itemListElement: allServices.map((svc) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${svc.label} expert in ${s.name}`,
              url: `${SITE.url}/services/${svc.slug}`,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE.url}/locations` },
          { "@type": "ListItem", position: 3, name: s.name, item: `${SITE.url}/locations/${s.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="section pt-16 md:pt-24 pb-12">
        <div className="container-x">
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-cyan-300">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-cyan-300">Locations</Link>
            <span>/</span>
            <span className="text-gray-200">{s.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-400/10 border border-green-400/30 text-green-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Serving {s.name} · {s.abbr}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              AI Automation Expert in{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                {s.name}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {s.name} founders waste 14+ hours a week on tasks software should
              already be doing. SkynetLabs builds n8n workflows, GoHighLevel CRM
              systems, AI chatbots and AEO-tuned websites for operators across{" "}
              {s.cities.slice(0, 3).join(", ")} and beyond. Fixed scope, public
              pricing, 5–14 day ship window — delivered remotely from Bali.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/923001001957"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp from {s.abbr}
              </a>
              <a
                href="https://cal.com/waseemnasir"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-400/40 hover:border-cyan-400/70 text-cyan-200 font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book a call
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 text-gray-200 font-semibold transition-colors"
              >
                See pricing first
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section py-10">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { k: "180+", v: "workflows shipped" },
              { k: "9", v: "countries served" },
              { k: "5–14d", v: `ship window into ${s.abbr}` },
            ].map((stat) => (
              <div
                key={stat.v}
                className="rounded-2xl bg-white/95 border border-white/60 p-6 shadow-lg shadow-cyan-500/5"
              >
                <div className="text-3xl font-extrabold bg-gradient-to-r from-skynet-primary to-cyan-500 bg-clip-text text-transparent mb-1">
                  {stat.k}
                </div>
                <div className="text-sm text-slate-600">{stat.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Hub + Book a Call */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Every service, available in {s.name}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              16 builds for {s.name}{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                operators.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              From {s.industries[0]} practices in {s.cities[0]} to{" "}
              {s.industries[1]} firms in {s.cities[1]} and{" "}
              {s.industries[2]} operations in {s.cities[2]} — these 16 services
              are ready to ship into your stack.
            </p>
          </div>

          <div className="space-y-12">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <h3 className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-5 flex items-center gap-3">
                  <span className="w-8 h-px bg-cyan-300/40" />
                  {cat.name} · {s.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.services.map((svc) => {
                    const Icon =
                      ((Icons as unknown) as Record<string, IconCmp>)[svc.icon] ??
                      ((Icons as unknown) as Record<string, IconCmp>).Bot;
                    return (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className="group relative p-6 rounded-2xl bg-white/95 border border-white/60 shadow-lg shadow-cyan-500/5 hover:shadow-xl hover:shadow-cyan-500/20 hover:border-skynet-primary/60 hover:bg-white transition-all duration-300 hover:-translate-y-1.5"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-skynet-primary/20 to-cyan-400/20 flex items-center justify-center mb-4 group-hover:from-skynet-primary/30 group-hover:to-cyan-400/30 transition-colors">
                          <Icon className="w-5 h-5 text-skynet-primary" />
                        </div>
                        <h4 className="text-base font-semibold text-slate-900 mb-1">
                          {svc.label}
                        </h4>
                        <p className="text-xs text-slate-500 mb-2">
                          {svc.label} expert in {s.name}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {svc.desc}
                        </p>
                        <Icons.ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-slate-400 group-hover:text-skynet-primary transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Book-a-call CTA between services + keywords */}
          <div className="mt-12 rounded-3xl p-8 md:p-10 text-center"
            style={{ background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)" }}>
            <CheckCircle2 className="w-10 h-10 text-white/90 mx-auto mb-3" />
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
              Building in {s.name}? Let&apos;s scope it.
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              30-min Zoom, free. Bring your stack — leave with a fixed-price
              one-pager and a 14-day ship window.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://cal.com/waseemnasir"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-cyan-50 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book a call from {s.abbr}
              </a>
              <a
                href="https://wa.me/923001001957"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp instead
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                All contact options
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO keyword expansion */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Local intent · {s.name}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Searching in {s.abbr}?{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                You&apos;re in the right place.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Whatever exact phrase brought you here — &ldquo;n8n expert near
              {" "}{s.cities[0]}&rdquo;, &ldquo;GoHighLevel agency in {s.abbr}&rdquo;,
              &ldquo;AI chatbot consultant for {s.industries[0]}&rdquo; — these
              are all the same one operator. Click any phrase to scope that
              service for {s.name}.
            </p>
          </div>

          <div className="space-y-6">
            {allServices.map((svc) => {
              const Icon =
                ((Icons as unknown) as Record<string, IconCmp>)[svc.icon] ??
                ((Icons as unknown) as Record<string, IconCmp>).Bot;
              const phrases = buildKeywordPhrases(svc, s);
              return (
                <div
                  key={svc.slug}
                  className="rounded-2xl bg-white/95 border border-white/60 p-6 md:p-7 shadow-md shadow-cyan-500/5"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-skynet-primary/20 to-cyan-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-skynet-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                        {svc.label} — {s.name}
                      </h3>
                      <p className="text-sm text-slate-600">{svc.desc}</p>
                    </div>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="hidden sm:inline-flex items-center gap-1.5 text-skynet-primary font-semibold text-sm hover:gap-2.5 transition-all"
                    >
                      Scope it
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phrases.map((p) => (
                      <Link
                        key={p}
                        href={`/services/${svc.slug}`}
                        className="px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-slate-700 text-xs font-medium hover:bg-cyan-100 hover:border-skynet-primary hover:text-skynet-primary transition-colors"
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities + Industries */}
      <section className="section">
        <div className="container-x">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a2d4a]/80 via-[#073846]/60 to-[#0a2d4a]/80 border border-cyan-400/20 p-8 md:p-12 backdrop-blur-md">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                  Cities served in {s.name}
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-white">
                  AI automation across {s.abbr}
                </h3>
                <ul className="grid grid-cols-1 gap-2">
                  {s.cities.map((city) => (
                    <li
                      key={city}
                      className="flex items-center gap-2 text-gray-200"
                    >
                      <MapPin className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                      <span className="text-sm">
                        AI automation services in {city}, {s.abbr}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                  Industries served
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-white">
                  Built for {s.name} verticals
                </h3>
                <p className="text-gray-300 mb-4">
                  Most {s.name} engagements come from{" "}
                  <strong className="text-cyan-200">{s.industries[0]}</strong>,{" "}
                  <strong className="text-cyan-200">{s.industries[1]}</strong>,
                  and{" "}
                  <strong className="text-cyan-200">{s.industries[2]}</strong>{" "}
                  operators looking to cut admin time and ship lead capture that
                  actually works.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-100 font-semibold"
                >
                  Get a {s.name} engagement scoped
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby states */}
      <section className="section">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                Nearby states
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                Also active in
              </h3>
              <p className="text-gray-300">
                SkynetLabs delivers AI automation across all 48 contiguous US
                states. {s.name} engagements run alongside builds for operators
                in every other state.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {STATES.filter((x) => x.slug !== s.slug)
                .slice(0, 12)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/locations/${other.slug}`}
                    className="px-3 py-1.5 rounded-full bg-white/95 border border-white/60 text-slate-700 text-xs font-medium hover:border-cyan-400 hover:text-skynet-primary transition-colors"
                  >
                    {other.name}
                  </Link>
                ))}
              <Link
                href="/locations"
                className="px-3 py-1.5 rounded-full bg-cyan-400 text-slate-900 text-xs font-semibold hover:bg-cyan-300 transition-colors"
              >
                All 48 states →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
