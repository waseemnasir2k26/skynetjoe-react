import fs from "fs";
import path from "path";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Achievements from "@/components/sections/Achievements";
import Community from "@/components/sections/Community";

const PHOTO_STRIP = [
  {
    src: "/portraits/waseem-cafe-arch.jpg",
    caption: "8:14am, Canggu cafe. The third coffee of the day, the first deploy.",
  },
  {
    src: "/portraits/waseem-poolside-laptop.jpg",
    caption: "After the n8n migration finally goes green. The grin is honest.",
  },
  {
    src: "/portraits/waseem-rooftop-smile.jpg",
    caption: "Rooftop in Pererenan. End-of-Friday ship. Phone's on Do Not Disturb.",
  },
];

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "about.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "About SkynetLabs — One founder, AI as cofounder, 180 workflows shipped",
  description:
    "SkynetLabs is a one-founder automation studio in Bali. Six principles, public pricing, source-controlled deliverables. Run by Waseem Nasir + Claude as second seat.",
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: "About SkynetLabs — One founder, AI as cofounder",
    description:
      "How we operate: solo founder, AI as second seat, 5–14d ship window, public pricing, source-controlled workflows.",
    url: `${SITE.url}/about`,
    type: "website",
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
        "How SkynetLabs operates: solo founder, AI as second seat, 5–14d ship window, public pricing, source-controlled workflows.",
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
      mainEntity: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.brand,
      url: SITE.url,
      description: SITE.description,
      founder: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
      foundingLocation: { "@type": "Place", name: "Bali, Indonesia" },
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
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {/* The working day — a 3-photo strip to humanize the about page */}
      <section
        className="relative section overflow-hidden"
        aria-label="A working day with Waseem"
        style={{ background: "#100f14" }}
      >
        <div className="container-x px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              A working day
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              Not a stock photo.{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Actually him, actually shipping.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl">
              When you hire SkynetLabs you don&apos;t get a logo on a Zoom call.
              You get this guy and the Claude window on his second monitor.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PHOTO_STRIP.map((p) => (
              <figure
                key={p.src}
                className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl shadow-cyan-500/10 group"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={p.src}
                    alt={p.caption}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(16,15,20,0.92) 100%)",
                    }}
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-sm md:text-base text-white/95 leading-snug font-medium">
                    {p.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Community />
      <Achievements />
    </>
  );
}
