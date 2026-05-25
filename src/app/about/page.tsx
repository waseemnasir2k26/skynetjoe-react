import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Sparkles, MapPin, Calendar } from "lucide-react";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Community from "@/components/sections/Community";

const TIMELINE = [
  {
    year: "2019",
    title: "First $10 on Fiverr",
    note: "University student in Lahore. First gig pays $10. Could have quit there. Didn't.",
  },
  {
    year: "2020",
    title: "Video editing — failed",
    note: "Tried to scale a video-editing side hustle. Burned out before it scaled. Lesson: skill ≠ business.",
  },
  {
    year: "2021",
    title: "Ecommerce — failed",
    note: "Dropshipping and Shopify stores. Lost money on ads. Lesson: I'm a builder, not a marketer-of-other-people's-junk.",
  },
  {
    year: "2022",
    title: "Amazon warehouse — failed",
    note: "Inventory, logistics, FBA. Three months of pain, zero traction. Lesson: stop chasing what's trending.",
  },
  {
    year: "2023",
    title: "Bachelor's done · service-first pivot",
    note: "Graduated. Killed the side hustles. Committed full-time to building for clients. Real work, real bills, real ship.",
  },
  {
    year: "2024",
    title: "n8n + AI + the SkynetLabs identity",
    note: "Picked the stack: n8n, Claude/GPT, Next.js. Stopped chasing niches — started shipping systems.",
  },
  {
    year: "2026",
    title: "180+ workflows · 9 countries · Bali base",
    note: "Solo operator, AI as second seat. Public pricing. Same builder, different game.",
  },
];

const BALI_GRID = [
  { src: "/portraits/waseem-cafe-arch.jpg", alt: "Canggu cafe — first deploy of the day", span: "row-span-2" },
  { src: "/portraits/waseem-rooftop-coffee.jpg", alt: "Pererenan rooftop, morning coffee", span: "" },
  { src: "/portraits/waseem-poolside-laptop.jpg", alt: "Poolside push after a green migration", span: "" },
  { src: "/portraits/waseem-veranda-thinking.jpg", alt: "Veranda — thinking through a flow", span: "" },
  { src: "/portraits/waseem-rooftop-smile.jpg", alt: "Friday ship, phone on DND", span: "" },
  { src: "/portraits/waseem-cafe-postit.jpg", alt: "Cafe postits — solving a routing problem", span: "" },
  { src: "/portraits/waseem-garden-tropical.jpg", alt: "Tropical garden break", span: "" },
  { src: "/portraits/waseem-cafe-smile.jpg", alt: "After a client demo lands", span: "" },
];

export const metadata: Metadata = {
  title: "About — From a $10 Fiverr gig (2019) to 180+ workflows (2026)",
  description:
    "SkynetLabs is run by Waseem Nasir from Bali. Started in 2019 as a uni student in Lahore. Failed at video editing, ecommerce, Amazon — kept building. Today: 180+ automations across 9 countries.",
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: "About SkynetLabs — From $10 Fiverr gig to 180+ workflows",
    description:
      "Solo founder. Bali base. 7 years of failing in public and building in public. Public pricing, AI as second seat.",
    url: `${SITE.url}/about`,
    type: "website",
    images: [`${SITE.url}/portraits/waseem-builder-hero.jpg`],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE.url}/about#aboutpage`,
      url: `${SITE.url}/about`,
      name: `About ${SITE.brand}`,
      description:
        "SkynetLabs is run solo by Waseem Nasir from Bali. Founded 2019 in Lahore as a $10 Fiverr gig, scaled to 180+ workflows across 9 countries by 2026.",
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
      mainEntity: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.brand,
      url: SITE.url,
      foundingDate: "2019",
      description: SITE.description,
      founder: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
      foundingLocation: { "@type": "Place", name: "Lahore, Pakistan" },
      location: { "@type": "Place", name: "Bali, Indonesia" },
      sameAs: [
        SITE.social.linkedin,
        SITE.social.twitter,
        SITE.social.github,
        SITE.social.youtube,
        SITE.social.fiverr,
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section
        className="relative overflow-hidden pt-28 md:pt-36 pb-16"
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
            opacity: 0.45,
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
            opacity: 0.35,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
              <Sparkles className="w-3 h-3" />
              About · since 2019
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
              From a{" "}
              <span
                className="italic font-semibold"
                style={{
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                  background:
                    "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                $10 Fiverr gig
              </span>{" "}
              to 180+ workflows.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-6">
              I&apos;m Waseem. I started in 2019 as a uni student in Lahore.
              Failed at video editing, ecommerce, Amazon warehousing — kept
              building anyway. Today I run SkynetLabs solo from Bali.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                <b className="text-white">7 years</b> shipping
              </span>
              <span className="text-cyan-300/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                Lahore → <b className="text-white">Bali</b>
              </span>
              <span className="text-cyan-300/30">·</span>
              <span>
                <b className="text-white">9</b> countries served
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto rounded-3xl overflow-hidden"
              style={{
                border: "1px solid rgba(0, 212, 255, 0.30)",
                boxShadow: "0 30px 80px -10px rgba(0, 212, 255, 0.40)",
              }}
            >
              <Image
                src="/portraits/waseem-builder-hero.jpg"
                alt="Waseem Nasir, founder of SkynetLabs"
                fill
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 90vw"
                className="object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-5 pt-16"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(6,24,39,0.92) 100%)",
                }}
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-300 mb-1">
                  Solo · Bali base · ships in 14 days
                </div>
                <div className="text-white font-semibold text-lg">
                  Waseem Nasir
                </div>
                <div className="text-sm text-gray-300">
                  Founder · Automation operator
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 md:py-24 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-4xl mx-auto">
          <div className="mb-10">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300">
              The arc
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2 mb-3">
              Seven years of failing in public.
            </h2>
            <p className="text-base text-fg-muted max-w-2xl">
              Every pivot below was a real bet. Most of them lost. The wins
              taught me what to stop doing.
            </p>
          </div>

          <ol className="relative space-y-6 pl-6 md:pl-8 border-l border-cyan-400/25">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[34px] md:-left-[42px] top-1 w-3.5 h-3.5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                    boxShadow: "0 0 0 4px rgba(6, 24, 39, 1), 0 0 0 5px rgba(0, 212, 255, 0.35)",
                  }}
                />
                <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                  <span className="text-cyan-300 font-bold text-sm tracking-wider">
                    {t.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {t.title}
                  </h3>
                </div>
                <p className="text-fg-muted text-sm md:text-base leading-relaxed">
                  {t.note}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* THE LETTER — centerpiece quote */}
      <section
        className="relative py-20 md:py-28 overflow-hidden border-t border-white/[0.08]"
        style={{
          background:
            "linear-gradient(180deg, #061827 0%, #0a2d4a 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 600,
            height: 600,
            background: "#14B8A6",
            top: "10%",
            left: "10%",
            opacity: 0.25,
          }}
        />
        <span
          className="orb"
          style={{
            width: 500,
            height: 500,
            background: "#1E88E5",
            bottom: "10%",
            right: "10%",
            opacity: 0.25,
            animationDelay: "-9s",
          }}
        />
        <div className="container-x px-6 relative z-10 max-w-3xl mx-auto text-center">
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-cyan-300 mb-6 inline-block">
            A letter to 2019
          </span>
          <blockquote
            className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-[1.25] tracking-tight text-white"
            style={{
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
            }}
          >
            <span className="text-cyan-300/60 text-5xl md:text-7xl leading-none align-top mr-1">
              &ldquo;
            </span>
            If I could go back to 2019, I&apos;d say:{" "}
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              2026 Waseem is proud of you. Just don&apos;t quit.
            </span>{" "}
            You did it — with the blessing of God.
            <span className="text-cyan-300/60 text-5xl md:text-7xl leading-none align-top ml-1">
              &rdquo;
            </span>
          </blockquote>
          <footer className="mt-8 text-sm text-cyan-200 tracking-wider">
            — Waseem · 2026
          </footer>
        </div>
      </section>

      {/* BALI LIFE — photo grid */}
      <section className="py-16 md:py-24 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-6xl mx-auto">
          <div className="mb-10 max-w-2xl">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300">
              The builder life
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2 mb-3">
              Bali cafes. Rooftops. Deploys.
            </h2>
            <p className="text-base text-fg-muted">
              Same Waseem you&apos;d hire — actually here, actually shipping. No
              stock photos. No agency Zoom mask.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
            {BALI_GRID.map((p, i) => (
              <figure
                key={p.src}
                className={`relative rounded-2xl overflow-hidden ring-1 ring-white/10 group ${p.span} ${i === 0 ? "col-span-2" : ""}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 50vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(6,24,39,0.92) 100%)",
                  }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition text-xs md:text-sm text-white/95 font-medium">
                  {p.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="py-14 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { num: "7", label: "Years shipping" },
              { num: "180+", label: "Workflows" },
              { num: "40+", label: "Websites" },
              { num: "9", label: "Countries" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-5 md:p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(30,136,229,0.10), rgba(20,184,166,0.08))",
                  border: "1px solid rgba(0,212,255,0.20)",
                }}
              >
                <div
                  className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight"
                  style={{
                    background:
                      "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.num}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider text-fg-muted font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <Community />

      {/* CLOSER */}
      <section className="py-16 md:py-20 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Want to ship something real?
          </h2>
          <p className="text-base text-fg-muted max-w-xl mx-auto mb-7">
            Send a 3-sentence brief. Scope + price back in 8 hours. Same
            builder, same hands.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Start a brief
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border border-white/15 bg-white/[0.04] hover:border-cyan-400/40 transition"
            >
              See case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
