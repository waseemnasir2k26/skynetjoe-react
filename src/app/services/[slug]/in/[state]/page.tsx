import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, MapPin, Calendar, MessageCircle, CheckCircle2 } from "lucide-react";
import { SERVICE_CATEGORIES, SITE } from "@/lib/site";
import { STATES } from "@/lib/states";
import JsonLd from "@/components/JsonLd";

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
const SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly ServiceItem[]
);

const PROTOTYPE_STATES = ["california"];

export const dynamicParams = false;

export function generateStaticParams() {
  const pairs: { slug: string; state: string }[] = [];
  for (const svc of SERVICES) {
    for (const s of STATES) {
      if (!PROTOTYPE_STATES.includes(s.slug)) continue;
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
  const title = `${svc.label} in ${st.name} — Hire an Expert | SkynetLabs`;
  const description = `${svc.label} services for ${st.name} businesses. ${svc.desc}. Serving ${st.cities.slice(0, 3).join(", ")} and across ${st.abbr}. Ship in 5–14 days.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${svc.slug}/in/${st.slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${svc.slug}/in/${st.slug}`,
      type: "article",
    },
  };
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

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE.url}/services/${svc.slug}/in/${st.slug}#service`,
        name: `${svc.label} in ${st.name}`,
        description: `${svc.desc}. Available across ${st.name} including ${st.cities.join(", ")}.`,
        provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
        areaServed: {
          "@type": "AdministrativeArea",
          name: st.name,
          containsPlace: st.cities.map((c) => ({
            "@type": "City",
            name: c,
            containedInPlace: { "@type": "AdministrativeArea", name: st.name },
          })),
        },
        serviceType: svc.label,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: svc.label, item: `${SITE.url}/services/${svc.slug}` },
          { "@type": "ListItem", position: 4, name: st.name, item: `${SITE.url}/services/${svc.slug}/in/${st.slug}` },
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
              text: `Yes — we serve all of ${st.name} including ${st.cities.join(", ")}. Standard ship window is 5–14 days from kickoff. Remote-first, no on-site travel required.`,
            },
          },
          {
            "@type": "Question",
            name: `How much does ${svc.label} cost in ${st.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Builds typically range from $500 to $8,000 depending on scope. ${st.name} businesses with ${st.industries[0]}-related needs often land mid-range. We send a fixed-price scope within 48 hours of brief.`,
            },
          },
          {
            "@type": "Question",
            name: `How fast can you ship ${svc.label} for a ${st.name} business?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Typical 5–14 day window. Urgent projects ship faster with premium rate. We're based in Bali (GMT+8) — your morning meetings happen during our afternoon, which keeps async tight.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      <section
        className="relative overflow-hidden pt-24 md:pt-32 pb-16"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span className="orb" style={{ width: 540, height: 540, background: "#1E88E5", top: -90, left: -130, opacity: 0.55 }} />
        <span className="orb" style={{ width: 580, height: 580, background: "#00D4FF", top: 80, right: -160, opacity: 0.45, animationDelay: "-7s" }} />

        <div className="container-x px-6 relative z-10">
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-cyan-300">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-cyan-300">Services</Link>
            <span>/</span>
            <Link href={`/services/${svc.slug}`} className="hover:text-cyan-300">{svc.label}</Link>
            <span>/</span>
            <span className="text-cyan-300">{st.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-cyan-500/12 border border-cyan-400/40 text-cyan-200">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-wider uppercase">
                Serving {st.name} ({st.abbr})
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5 text-white">
              {svc.label} in{" "}
              <span
                style={{
                  background: "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {st.name}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl">
              {svc.desc}. Ship-ready in 5–14 days for {st.name} businesses — from{" "}
              {st.industries[0]} in {st.cities[0]} to {st.industries[1]} in{" "}
              {st.cities[1]} and {st.industries[2]} operations across {st.abbr}.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)" }}
              >
                <Calendar className="w-4 h-4" />
                Apply for a discovery call
              </Link>
              <a
                href="https://wa.me/923001001957"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white border border-white/20 hover:border-white/40"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp from {st.abbr}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                Why {st.name} businesses pick us
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                {svc.label} that ships into{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  {st.abbr}.
                </span>
              </h2>

              <div className="space-y-5 text-gray-300 leading-relaxed text-base">
                <p>
                  We deliver {svc.label.toLowerCase()} to companies across {st.name} — from solo founders in{" "}
                  {st.cities[0]} to multi-location operators in {st.cities[1]} and{" "}
                  {st.cities[2]}. Remote-first, async-default, no on-site travel needed.
                </p>
                <p>
                  Our {st.name} clients typically operate in {st.industries[0]},{" "}
                  {st.industries[1]}, or {st.industries[2]}. The patterns repeat:
                  fragmented tools, manual handoffs, no system of record. We connect
                  the pieces so the business runs itself while you sleep.
                </p>
                <p>
                  Fixed-price scopes returned within 48 hours of brief. 5–14 day ship
                  window. 8-hour weekday reply guarantee from Bali (GMT+8) — which
                  means your morning email gets answered during our afternoon.
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-4">
                  Cities we&apos;ve served in {st.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {st.cities.map((c) => (
                    <span
                      key={c}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200"
                    >
                      {svc.label} in {c}, {st.abbr}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-4">
                  Common questions from {st.name}
                </h3>
                <div className="space-y-3">
                  <details className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <summary className="font-semibold text-white cursor-pointer">
                      Do you offer {svc.label} in {st.name}?
                    </summary>
                    <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                      Yes — we serve all of {st.name} including{" "}
                      {st.cities.join(", ")}. Standard ship window is 5–14 days
                      from kickoff. Remote-first, no on-site travel required.
                    </p>
                  </details>
                  <details className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <summary className="font-semibold text-white cursor-pointer">
                      How much does {svc.label} cost in {st.name}?
                    </summary>
                    <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                      Builds typically range from $500 to $8,000 depending on
                      scope. {st.name} businesses with {st.industries[0]}-related
                      needs often land mid-range. We send a fixed-price scope
                      within 48 hours of brief.
                    </p>
                  </details>
                  <details className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <summary className="font-semibold text-white cursor-pointer">
                      How fast can you ship for a {st.name} business?
                    </summary>
                    <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                      Typical 5–14 day window. Urgent projects ship faster with
                      premium rate. We&apos;re based in Bali (GMT+8) — your morning
                      meetings happen during our afternoon, which keeps async tight.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/95 border border-white/60 shadow-lg shadow-cyan-500/5">
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  {svc.label} · {st.name}
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> 5–14 day ship</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Fixed-price, no hourly</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Remote / async / no on-site</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> 8h weekday reply</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Cancel anytime before build kickoff</li>
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
                    .slice(0, 5)
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
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div
            className="rounded-3xl p-8 md:p-12 text-center"
            style={{ background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)" }}
          >
            <CheckCircle2 className="w-10 h-10 text-white/90 mx-auto mb-3" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              {svc.label} for {st.name}?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Send a brief. Yes/no in 8 hours. Fixed scope in 48.
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
