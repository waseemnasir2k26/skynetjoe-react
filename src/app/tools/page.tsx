import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { Calculator, Activity, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Tools — Revenue Calculator + Agency Stress Quiz | SkynetLabs",
  description:
    "Two free utilities from SkynetLabs: a revenue-recovery calculator that shows what your missed leads are costing, and a 60-second agency stress quiz that diagnoses your operational chaos.",
  alternates: { canonical: `${SITE.url}/tools` },
  openGraph: {
    title: "SkynetLabs Free Tools — calculator + diagnostic quiz",
    description:
      "Find out what your business is leaking. Two free tools, no email gate.",
    url: `${SITE.url}/tools`,
    type: "website",
  },
};

const TOOLS = [
  {
    slug: "revenue-calculator",
    name: "Revenue Recovery Calculator",
    blurb:
      "Six sliders. Live math. See exactly what your missed-call queue and manual follow-ups are costing per month — and what we'd recover.",
    Icon: Calculator,
  },
  {
    slug: "agency-stress-quiz",
    name: "Agency Stress Quiz",
    blurb:
      "60 seconds. 7 questions. One brutally honest score. Diagnoses whether you're at chill operator or full chaos mode — pipes straight into the calculator.",
    Icon: Activity,
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Free Tools",
  description:
    "Free utilities from SkynetLabs: revenue-recovery calculator and agency stress quiz.",
  url: `${SITE.url}/tools`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  hasPart: TOOLS.map((t) => ({
    "@type": "SoftwareApplication",
    name: t.name,
    url: `${SITE.url}/tools/${t.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  })),
};

export default function ToolsIndexPage() {
  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-gradient-to-br from-[#061827] via-[#0a2d4a] to-[#073846] text-white">
        <section className="container-x px-6 pt-32 pb-16 md:pt-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-6 border border-cyan-300/35 bg-cyan-300/10 text-cyan-200">
              Free · No email gate
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
              Find out what your business is leaking.
            </h1>
            <p className="text-lg text-white/75 max-w-2xl">
              Two utilities I built for myself before I built them for clients.
              No signup, no funnel, no follow-up email sequence. Just numbers.
            </p>
          </div>
        </section>
        <section className="container-x px-6 pb-32">
          <div className="grid md:grid-cols-2 gap-6">
            {TOOLS.map(({ slug, name, blurb, Icon }) => (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                className="group relative rounded-2xl p-7 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-300/40 transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E88E5] to-[#14B8A6] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{name}</h2>
                <p className="text-white/70 leading-relaxed">{blurb}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
