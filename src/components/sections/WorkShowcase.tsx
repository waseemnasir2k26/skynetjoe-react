"use client";

import Image from "next/image";
import { ExternalLink, Play, Star } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6a3.1 3.1 0 0 0-1.3-1.7c-1.1-.7.1-.7.1-.7a2.5 2.5 0 0 1 1.8 1.2 2.5 2.5 0 0 0 3.4 1 2.5 2.5 0 0 1 .8-1.6c-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.3 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.9 5.7-5.6 6a2.8 2.8 0 0 1 .8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>
);

type Gig = {
  slug: string;
  title: string;
  client: string;
  niche: string;
  stack: string[];
  outcome: string;
  liveUrl: string;
  category: "client" | "flagship" | "demo";
};

const GIGS: Gig[] = [
  // Real client work
  {
    slug: "kitts-recovery-services",
    title: "Kitts Recovery Services",
    client: "Majesta Kitts · EdD MPH CPRS · Rhode Island",
    niche: "Wellness / Peer Recovery",
    stack: ["Custom HTML", "Tailwind", "HeyPeers"],
    outcome: "Live peer-led recovery practice. Booking + brand kit shipped in 4 days.",
    liveUrl: "https://www.kittsrecoveryservices.com",
    category: "client",
  },
  {
    slug: "skynetlabs-ariapura-relaunch",
    title: "Ariapura · Sanificazione Condizionatori",
    client: "Italian HVAC client · Bologna",
    niche: "HVAC / Sanitation (IT)",
    stack: ["Next.js", "Tailwind", "Italian SEO"],
    outcome: "Live client relaunch. Multilingual conversion funnel.",
    liveUrl: "https://skynetlabs-ariapura-relaunch.vercel.app",
    category: "client",
  },
  {
    slug: "skynetjoe",
    title: "SkynetLabs · Agency HQ",
    client: "SkynetLabs (in-house · Bali + Lahore)",
    niche: "Agency / Automation",
    stack: ["Next.js 16", "GHL", "n8n"],
    outcome: "Main agency site. AEO-tuned. Pain-first funnel.",
    liveUrl: "https://skynetjoe.com",
    category: "client",
  },
  // Flagships
  {
    slug: "skynetlabs-dental-flagship",
    title: "Grand Mercer Dental · Atelier No. 1",
    client: "Bespoke flagship · SoHo, New York",
    niche: "Luxury Healthcare",
    stack: ["Next.js 16", "Tailwind", "Vercel"],
    outcome: "$50K-tier flagship. Distilled from niche audit — zero template DNA.",
    liveUrl: "https://skynetlabs-dental-flagship.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynet-flagship-realestate",
    title: "Adrián Vega · Compass Beverly Hills",
    client: "Luxury real estate flagship",
    niche: "Luxury Real Estate",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Serhant-tier bespoke build. Listings + insights + SEO sitemap.",
    liveUrl: "https://skynet-flagship-realestate.vercel.app",
    category: "flagship",
  },
  {
    slug: "auberlin-estate-flagship",
    title: "Auberlin Estate · Hudson Valley Wedding Venue",
    client: "Heritage event venue · Est. 1908",
    niche: "Event Venue / Weddings",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Heritage-brand flagship. Editorial design + booking funnel.",
    liveUrl: "https://auberlin-estate-flagship.vercel.app",
    category: "flagship",
  },
  {
    slug: "restaurant-mu-two",
    title: "Ostería Marquez · Modern Mediterranean Chicago",
    client: "Restaurant flagship",
    niche: "Restaurant / Hospitality",
    stack: ["Next.js", "Tailwind", "Resy"],
    outcome: "Bespoke restaurant build w/ reservations + gallery + IG embed.",
    liveUrl: "https://restaurant-mu-two.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynetlabs-law-demo",
    title: "Harrington Lex LLP · Chicago Trial Boutique",
    client: "Law firm flagship",
    niche: "Legal / Litigation",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Commercial litigation boutique. SEO sitemap + robots tuned.",
    liveUrl: "https://skynetlabs-law-demo.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynetlabs-medical-demo",
    title: "Riverside Internal Medicine · Concierge Care",
    client: "Concierge healthcare · Chicago",
    niche: "Concierge Healthcare",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Concierge medicine flagship with patient booking funnel.",
    liveUrl: "https://skynetlabs-medical-demo.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynetlabs-clinic",
    title: "CQC Compliance & Safeguarding Consultancy",
    client: "UK healthcare compliance",
    niche: "Healthcare Compliance (UK)",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "CQC consultancy site. Compliance-grade copy + lead capture.",
    liveUrl: "https://skynetlabs-clinic.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynetlabs-ariapura-cinema",
    title: "Ariapura · Cinema Concept",
    client: "Boutique cinema/villa concept",
    niche: "Hospitality / Cinema",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Concept demo for villa-cinema hybrid. Immersive editorial layout.",
    liveUrl: "https://skynetlabs-ariapura-cinema.vercel.app",
    category: "flagship",
  },
  // Niche demos
  {
    slug: "skynetlabs-accountant-demo",
    title: "Sterling & Co CPA · La Jolla Fractional CFO",
    client: "CPA niche demo · CA CPA #134892",
    niche: "Accounting / CFO",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "La Jolla CPA + fractional CFO with trust-stacked credentials.",
    liveUrl: "https://skynetlabs-accountant-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-autorepair-demo",
    title: "Wrench & Co · Portland Euro + Japanese Repair",
    client: "Auto repair niche demo · ASE Master",
    niche: "Auto Repair",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Portland Euro/JDM specialist with 3-yr warranty positioning.",
    liveUrl: "https://skynetlabs-autorepair-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-cleaning-demo",
    title: "Sparkline Residential · Seminole County FL",
    client: "Residential cleaning niche demo",
    niche: "Residential Cleaning",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Trusted-neighbor cleaning service with booking funnel.",
    liveUrl: "https://skynetlabs-cleaning-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-coolcar-demo",
    title: "Cool Car · 3-Variant Spec Demo (DE)",
    client: "German automotive · variant pitch",
    niche: "Automotive / Configurator",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Editorial / Cinematic / Brutalist Swiss — 3 directions on one deploy.",
    liveUrl: "https://skynetlabs-coolcar-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-gym-demo",
    title: "Boutique Strength Studio · West Hollywood",
    client: "Gym niche demo · 12-member cohorts",
    niche: "Boutique Fitness",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "WeHo strength studio with cohort-based membership funnel.",
    liveUrl: "https://skynetlabs-gym-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-landscaping-demo",
    title: "Verdant Acre · Seattle Landscape Architecture",
    client: "Landscape architect demo · BSLA",
    niche: "Landscape Architecture",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Editorial portfolio + consultation funnel for high-end design.",
    liveUrl: "https://skynetlabs-landscaping-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-logistics-demo",
    title: "Pacific Lane Logistics · POLB Drayage + Customs",
    client: "Logistics niche demo · SCAC PLLO",
    niche: "Logistics / Drayage",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Port of Long Beach drayage + customs broker positioning.",
    liveUrl: "https://skynetlabs-logistics-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-moving-demo",
    title: "Northbound Moving Co · Boston Binding Quotes",
    client: "Moving niche demo · USDOT 2841902",
    niche: "Moving / Relocation",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Boston mover with binding-quote trust positioning.",
    liveUrl: "https://skynetlabs-moving-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-pestcontrol-demo",
    title: "Sentinel Pest Solutions · Phoenix Scorpion-First",
    client: "Pest control niche demo · entomologist-led",
    niche: "Pest Control",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Phoenix scorpion-specialist with credential stack.",
    liveUrl: "https://skynetlabs-pestcontrol-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-photography-demo",
    title: "Cassidy Renfield Studio · Brooklyn Wedding + Portrait",
    client: "Editorial photographer niche demo",
    niche: "Photography",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Editorial wedding + portrait photographer portfolio + booking.",
    liveUrl: "https://skynetlabs-photography-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-plumbing-demo",
    title: "Cardinal Plumbing · Denver Slab Leak Specialists",
    client: "Plumbing niche demo · Denver CO",
    niche: "Plumbing",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Denver plumber w/ slab leak + tankless specialization funnel.",
    liveUrl: "https://skynetlabs-plumbing-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-roofing-demo",
    title: "Summit Roofing · Charlotte GAF Master Elite",
    client: "Roofing niche demo · NC storm specialists",
    niche: "Roofing",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Charlotte GAF Master Elite roofer w/ storm response positioning.",
    liveUrl: "https://skynetlabs-roofing-demo.vercel.app",
    category: "demo",
  },
];

const CATEGORY_LABELS: Record<Gig["category"], { label: string; color: string }> = {
  client: { label: "Real Client", color: "bg-emerald-400/15 text-emerald-200 border-emerald-300/40" },
  flagship: { label: "Flagship", color: "bg-amber-400/15 text-amber-200 border-amber-300/40" },
  demo: { label: "Niche Demo", color: "bg-cyan-400/15 text-cyan-200 border-cyan-300/40" },
};

export default function WorkShowcase() {
  return (
    <section
      className="relative overflow-hidden pt-24 md:pt-32 pb-12"
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
          opacity: 0.5,
        }}
      />

      <div className="container-x px-6 relative z-10">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
            Recent Projects · Real screenshots
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.05]">
            23 builds shipped.{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Click any tile.
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            Live screenshots, not mockups. Every tile links to the deployed
            site. Built solo from Bali + Lahore. Video below walks through one
            being built end-to-end in Claude Code.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12 aspect-video bg-black/40">
          <iframe
            src="https://www.youtube.com/embed/5lT9vrzssU0"
            title="WordPress plugin development using Claude Code by Anthropic — Waseem Nasir"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {GIGS.map((g) => {
            const cat = CATEGORY_LABELS[g.category];
            return (
              <a
                key={g.slug}
                href={g.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-400/60 transition-all hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-video bg-black/40 overflow-hidden">
                  <Image
                    src={`/portfolio/${g.slug}.jpg`}
                    alt={`${g.title} — live screenshot`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-black/55 text-white/95 backdrop-blur border border-white/10">
                    {g.niche}
                  </span>
                  <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border backdrop-blur ${cat.color}`}>
                    {cat.label}
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded bg-cyan-400/15 text-cyan-100 border border-cyan-300/40 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3 h-3" /> Live
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-white font-bold mb-1 leading-tight">
                    {g.title}
                  </h2>
                  <p className="text-[11px] text-cyan-300/80 font-mono mb-3 truncate">
                    {g.client}
                  </p>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {g.outcome}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {g.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[#0a2d4a]/80 via-[#073846]/60 to-[#0a2d4a]/80 border border-cyan-400/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/40 flex-shrink-0">
              <Image
                src="/portraits/waseem-poolside.jpg"
                alt="Waseem Nasir"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-cyan-300 text-xs uppercase tracking-wider font-semibold mb-1">
                Built by Waseem · solo, Bali-based
              </p>
              <p className="text-white font-bold text-lg leading-tight">
                Want yours on this page next?
              </p>
              <p className="text-gray-300 text-sm">
                3-min brief. 8-hour reply. 4 slots/month.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://github.com/waseemnasir2k26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:border-cyan-400 transition"
            >
              <Star className="w-4 h-4" /> All repos
            </a>
            <a
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              <Play className="w-4 h-4" /> Book free audit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
