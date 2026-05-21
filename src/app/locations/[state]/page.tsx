import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { STATES, getStateBySlug } from "@/lib/states";
import { SERVICE_CATEGORIES, SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

type IconCmp = React.ComponentType<{ className?: string }>;

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
  const title = `AI Automation Expert in ${s.name} — n8n + AEO + Chatbots | ${SITE.brand}`;
  const description = `AI automation, n8n workflows, AEO-tuned websites and WhatsApp chatbots for ${s.name} founders. Serving ${s.cities.slice(0, 3).join(", ")} and surrounding ${s.abbr} businesses. Fixed scope, 5–14 day ship.`;
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

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) notFound();

  type SvcItem = { slug: string; label: string; icon: string; desc: string };
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
        description: `n8n workflows, AI chatbots, AEO-tuned websites and CRM automation for ${s.name} businesses.`,
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
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-4">
              Serving {s.name} · {s.abbr}
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              AI Automation Expert in{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                {s.name}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {s.name} founders waste 14+ hours a week on tasks software should
              already be doing. I build n8n workflows, AI chatbots, AEO-tuned
              websites and WhatsApp automation that quietly run the back-office
              for businesses across {s.cities.slice(0, 3).join(", ")} and beyond.
              Fixed scope, public pricing, 5–14 day ship window.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold transition-colors"
              >
                Get a {s.name} scope back in 48h
                <Icons.ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-200 font-semibold transition-colors"
              >
                See public pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section py-12">
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

      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Every service, available in {s.name}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              16 builds for {s.name}{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                operators.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Whether you run a {s.industries[0]} practice in {s.cities[0]}, a{" "}
              {s.industries[1]} firm in {s.cities[1]}, or a {s.industries[2]}{" "}
              operation in {s.cities[2]} — these 16 services are ready to ship
              into your stack.
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
                          {svc.label} in {s.name}
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
        </div>
      </section>

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
                <ul className="grid grid-cols-2 gap-2">
                  {s.cities.map((city) => (
                    <li
                      key={city}
                      className="flex items-center gap-2 text-gray-200"
                    >
                      <Icons.MapPin className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                      <span className="text-sm">
                        AI automation in {city}, {s.abbr}
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
                  <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                Nearby states
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                Also serving founders in
              </h3>
              <p className="text-gray-300">
                SkynetLabs delivers AI automation across all 48 contiguous US
                states. {s.name} engagements happen alongside builds for
                operators nearby.
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
