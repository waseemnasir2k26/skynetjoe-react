import Link from "next/link";
import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { MapPin, ArrowUpRight, ArrowRight, MessageCircle, Calendar, CheckCircle2 } from "lucide-react";
import { STATES } from "@/lib/states";
import { SITE, SERVICE_CATEGORIES, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

type IconCmp = React.ComponentType<{ className?: string }>;

export const metadata: Metadata = {
  title: "AI Automation Services Across All 48 US States | SkynetLabs",
  description:
    "SkynetLabs delivers AI automation, n8n workflows, GoHighLevel CRM, AEO websites and live-chat agents to founders in all 48 contiguous US states. Pick your state — fixed scope, public pricing, 5–14 day ship.",
  alternates: { canonical: `${SITE.url}/locations` },
  openGraph: {
    title: "SkynetLabs — Active in all 48 US states",
    description:
      "AI automation services delivered to founders across the lower 48. Local intent, global stack.",
    url: `${SITE.url}/locations`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

export default function LocationsIndexPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "AI Automation Services Across All 48 US States",
        description:
          "48-state directory of AI automation, n8n, GoHighLevel and AEO services delivered by SkynetLabs.",
        url: `${SITE.url}/locations`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: STATES.length,
          itemListElement: STATES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE.url}/locations/${s.slug}`,
            name: `AI Automation in ${s.name}`,
          })),
        },
      },
      {
        "@type": "Service",
        name: "AI Automation Services — United States",
        provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
        areaServed: STATES.map((s) => ({
          "@type": "AdministrativeArea",
          name: s.name,
          containedInPlace: { "@type": "Country", name: "United States" },
        })),
        serviceType: "AI Automation",
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="section pt-16 md:pt-24 pb-10">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-400/10 border border-green-400/30 text-green-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Active in all 48 states
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              AI Automation Services,{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                delivered across the lower 48.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              SkynetLabs ships n8n workflows, GoHighLevel CRM systems, AEO-tuned
              websites and live-chat agents to founders in every contiguous US
              state — from{" "}
              <Link href="/locations/california" className="text-cyan-300 hover:text-cyan-100 underline decoration-cyan-400/40 underline-offset-4">
                California
              </Link>{" "}
              and{" "}
              <Link href="/locations/texas" className="text-cyan-300 hover:text-cyan-100 underline decoration-cyan-400/40 underline-offset-4">
                Texas
              </Link>{" "}
              to{" "}
              <Link href="/locations/new-york" className="text-cyan-300 hover:text-cyan-100 underline decoration-cyan-400/40 underline-offset-4">
                New York
              </Link>{" "}
              and{" "}
              <Link href="/locations/minnesota" className="text-cyan-300 hover:text-cyan-100 underline decoration-cyan-400/40 underline-offset-4">
                Minnesota
              </Link>
              . All engagements run remote from Bali (GMT+8) with an 8-hour
              weekday reply guarantee.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Apply for a call
              </Link>
              <a
                href="#livechat-open"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-400/40 hover:border-cyan-400/70 text-cyan-200 font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Live chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Hub + Book a Call */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              16 services · 50 states · One operator
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Every service ships{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                into every state.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Pick a service to scope it, or pick a state below to see local
              intent keywords + city coverage.
            </p>
          </div>

          <div className="space-y-10 mb-10">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <h3 className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-5 flex items-center gap-3">
                  <span className="w-8 h-px bg-cyan-300/40" />
                  {cat.name}
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
                        className="group relative p-5 rounded-2xl bg-white/95 border border-white/60 shadow-md shadow-cyan-500/5 hover:shadow-xl hover:shadow-cyan-500/20 hover:border-skynet-primary/60 hover:bg-white transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-skynet-primary/20 to-cyan-400/20 flex items-center justify-center mb-3">
                          <Icon className="w-5 h-5 text-skynet-primary" />
                        </div>
                        <h4 className="text-base font-semibold text-slate-900 mb-1.5">
                          {svc.label}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {svc.desc}
                        </p>
                        <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-slate-400 group-hover:text-skynet-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-8 md:p-10 text-center"
            style={{ background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)" }}>
            <CheckCircle2 className="w-10 h-10 text-white/90 mx-auto mb-3" />
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
              Not sure which service fits your state?
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Send a brief through our short application. If we&apos;re a fit,
              you&apos;ll have a Cal.com link in your inbox within 8 hours. No
              funnel, no upsell.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-cyan-50 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Apply for a call
              </Link>
              <a
                href="#livechat-open"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Live chat instead
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                See all contact options
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 48-state grid */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Pick your state
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Every contiguous US state,{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                local-intent ready.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Each state page lists every service expressed with local keywords,
              5 major-city callouts, and the industries we&apos;ve already
              served there.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {STATES.map((s) => (
              <Link
                key={s.slug}
                href={`/locations/${s.slug}`}
                className="group relative p-5 rounded-2xl bg-white/95 border border-white/60 shadow-md shadow-cyan-500/5 hover:shadow-xl hover:shadow-cyan-500/20 hover:border-skynet-primary/60 hover:bg-white transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-skynet-primary" />
                  <span className="text-xs text-slate-500 font-semibold tracking-wider">
                    {s.abbr}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-slate-900 mb-1">
                  AI Automation in {s.name}
                </h2>
                <p className="text-xs text-slate-500">
                  {s.cities.slice(0, 2).join(", ")}
                </p>
                <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-slate-400 group-hover:text-skynet-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
