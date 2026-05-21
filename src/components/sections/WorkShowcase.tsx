"use client";

import Image from "next/image";
import { ExternalLink, Play, Star } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6a3.1 3.1 0 0 0-1.3-1.7c-1.1-.7.1-.7.1-.7a2.5 2.5 0 0 1 1.8 1.2 2.5 2.5 0 0 0 3.4 1 2.5 2.5 0 0 1 .8-1.6c-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.3 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.9 5.7-5.6 6a2.8 2.8 0 0 1 .8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>
);

type Gig = {
  title: string;
  client: string;
  stack: string[];
  outcome: string;
  liveUrl?: string;
  githubUrl?: string;
  thumb: "n8n" | "wp" | "next" | "shopify" | "ghl" | "ai";
};

const GIGS: Gig[] = [
  {
    title: "Dental no-show automation",
    client: "Manhattan dental atelier",
    stack: ["GHL", "WhatsApp", "n8n", "Twilio"],
    outcome: "30% no-show → 8% in 6 weeks. +$24K/mo recovered.",
    githubUrl: "https://github.com/waseemnasir2k26/dental-noshow-flow",
    thumb: "ghl",
  },
  {
    title: "EU logistics dispatch flow",
    client: "Meta Logistics — Berlin",
    stack: ["n8n", "Airtable", "Slack", "Postgres"],
    outcome: "4 paid SaaS tools replaced. €2.1K/mo saved.",
    githubUrl: "https://github.com/waseemnasir2k26/meta-logistics-relaunch",
    thumb: "n8n",
  },
  {
    title: "KSA retail WhatsApp catalog",
    client: "Riyadh fashion boutique",
    stack: ["WhatsApp Business API", "n8n", "Shopify"],
    outcome: "47% reply→sale conversion. 800 SKUs synced live.",
    thumb: "shopify",
  },
  {
    title: "Wellness DNA flagship site",
    client: "Vow Sanctuary — Asheville NC",
    stack: ["Next.js 16", "Tailwind", "Vercel", "Sanity"],
    outcome: "Lighthouse 98/100. 3-day ship. $7K MRR pipeline.",
    liveUrl: "https://vow-sanctuary.vercel.app",
    githubUrl: "https://github.com/waseemnasir2k26/vow-sanctuary",
    thumb: "next",
  },
  {
    title: "GutReno LP + funnel",
    client: "Functional medicine clinic",
    stack: ["WordPress", "GHL", "Stripe", "Calendly"],
    outcome: "12% landing→booked-consult. $4K/mo lead value.",
    githubUrl: "https://github.com/waseemnasir2k26/gutreno-funnel",
    thumb: "wp",
  },
  {
    title: "Christelle French → English flow",
    client: "Paris translation agency",
    stack: ["n8n", "OpenAI", "DeepL", "Google Docs API"],
    outcome: "60% turnaround cut. 200+ docs/month auto-routed.",
    thumb: "ai",
  },
  {
    title: "AEO content engine",
    client: "SkynetLabs internal + 5 clients",
    stack: ["Claude API", "n8n", "Next.js", "Pinecone"],
    outcome: "Cited by Perplexity + ChatGPT for 14 brand queries.",
    githubUrl: "https://github.com/waseemnasir2k26/skynet-aeo-engine",
    thumb: "ai",
  },
  {
    title: "26-niche demo battery",
    client: "SkynetLabs sales arm",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "26 deployable niche sites, 7-day swap-in per client.",
    githubUrl: "https://github.com/waseemnasir2k26/wt-skynet",
    thumb: "next",
  },
];

const thumbColor: Record<Gig["thumb"], string> = {
  n8n: "from-rose-500 via-rose-600 to-pink-700",
  wp: "from-sky-500 via-blue-600 to-indigo-700",
  next: "from-slate-700 via-slate-900 to-black",
  shopify: "from-emerald-500 via-green-600 to-teal-700",
  ghl: "from-amber-500 via-orange-600 to-rose-700",
  ai: "from-violet-500 via-purple-600 to-fuchsia-700",
};

const thumbLabel: Record<Gig["thumb"], string> = {
  n8n: "n8n",
  wp: "WordPress",
  next: "Next.js",
  shopify: "Shopify",
  ghl: "GoHighLevel",
  ai: "AI / Claude",
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
            Real gigs, real repos
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.05]">
            55+ builds shipped.{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
              GitHub open.
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            Source-controlled deliverables. Click any tile to see the actual repo
            or live deploy — no PDF case-study theater. The video below shows how
            a WordPress plugin gets built end-to-end using Claude Code in a
            single afternoon.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {GIGS.map((g) => (
            <article
              key={g.title}
              className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-400/60 transition-all hover:-translate-y-1"
            >
              <div
                className={`relative aspect-video bg-gradient-to-br ${thumbColor[g.thumb]} p-4 flex flex-col justify-between`}
              >
                <span className="self-start text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-black/40 text-white/90 backdrop-blur">
                  {thumbLabel[g.thumb]}
                </span>
                <div className="text-white/90 text-xs font-mono opacity-70 group-hover:opacity-100 transition">
                  {g.client}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold mb-2 leading-tight">
                  {g.title}
                </h3>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                  {g.outcome}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {g.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 text-xs">
                  {g.githubUrl && (
                    <a
                      href={g.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                    >
                      <Github className="w-3.5 h-3.5" /> Repo
                    </a>
                  )}
                  {g.liveUrl && (
                    <a
                      href={g.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/20 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
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
              <Play className="w-4 h-4" /> Apply for a call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
