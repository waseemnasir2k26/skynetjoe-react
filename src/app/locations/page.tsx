import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, ArrowUpRight } from "lucide-react";
import { STATES } from "@/lib/states";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation Across the US — 48 States | SkynetLabs",
  description:
    "AI automation, n8n workflows, AEO websites and WhatsApp chatbots for founders across all 48 contiguous US states. Find your state — fixed scope, public pricing, 5–14 day ship.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "SkynetLabs — AI automation in 48 US states",
    description:
      "Find your state. Local SEO. Fixed scope, public pricing, 5–14 day ship window.",
    url: "/locations",
    type: "website",
  },
};

export default function LocationsIndexPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Automation Across the US",
    description:
      "48-state directory of AI automation, n8n and AEO services by SkynetLabs.",
    url: `${SITE.url}/locations`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: STATES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}/locations/${s.slug}`,
        name: `AI Automation in ${s.name}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="section pt-16 md:pt-24 pb-10">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-4">
              48 contiguous US states
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              AI Automation,{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                anywhere in the US.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              n8n workflows, AI chatbots, AEO-tuned websites and WhatsApp
              automation for US founders. Pick your state for a local scope —
              all engagements run remote from Bali (GMT+8), reply within 8 hours
              on weekdays.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
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
                  {s.name}
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
