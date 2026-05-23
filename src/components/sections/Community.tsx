import Image from "next/image";
import { MapPin, Users } from "lucide-react";

const EVENTS = [
  { src: "/community/event-1.jpg", caption: "Bali founders circle · May 2026" },
  { src: "/community/event-2.jpg", caption: "Canggu builders meetup" },
  { src: "/community/event-3.jpg", caption: "Cross-border ops dinner" },
  { src: "/community/event-4.jpg", caption: "AI operators Bali · monthly" },
  { src: "/community/event-5.jpg", caption: "Founder roundtable · Ubud" },
  { src: "/community/event-6.jpg", caption: "Friday wrap · the network" },
];

export default function Community() {
  return (
    <section
      className="relative section overflow-hidden"
      aria-label="SkynetLabs in the wild — networking + community"
      style={{
        background:
          "linear-gradient(180deg, #100f14 0%, #0a1820 60%, #082234 100%)",
      }}
    >
      <div className="container-x px-6">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            <Users className="w-3.5 h-3.5" />
            In the room, not the inbox
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.05]">
            Solo operator.{" "}
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 bg-clip-text text-transparent">
              Not a hermit.
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
            I show up — Bali founder circles, builder meetups, cross-border ops
            dinners. The network you tap when I&apos;m on your project
            isn&apos;t LinkedIn connections. It&apos;s people I&apos;ve broken
            bread with.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-cyan-300/80">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-mono tracking-wide">
              Canggu · Ubud · Bali · 2026
            </span>
          </div>
        </div>

        {/* Bento — hero left (2 cols, full height) + 2x2 thumbs right on lg */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Hero — large left, spans 2x2 on md+ */}
          <figure className="relative aspect-[4/3] md:aspect-auto md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl ring-1 ring-white/10 group col-span-2">
            <Image
              src={EVENTS[0].src}
              alt={EVENTS[0].caption}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(10,24,32,0.85) 100%)",
              }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-sm md:text-base text-white/95 font-medium leading-snug">
                {EVENTS[0].caption}
              </p>
            </figcaption>
          </figure>

          {/* 4 medium thumbs */}
          {EVENTS.slice(1, 5).map((ev) => (
            <figure
              key={ev.src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10 group"
            >
              <Image
                src={ev.src}
                alt={ev.caption}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(10,24,32,0.85) 100%)",
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[12px] md:text-sm text-white/95 font-medium leading-snug">
                  {ev.caption}
                </p>
              </figcaption>
            </figure>
          ))}

          {/* Wide bottom strip — last event spans 3 cols on md */}
          <figure className="relative aspect-[16/6] md:aspect-[16/5] md:col-span-3 overflow-hidden rounded-2xl ring-1 ring-white/10 group col-span-2">
            <Image
              src={EVENTS[5].src}
              alt={EVENTS[5].caption}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(10,24,32,0.85) 100%)",
              }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-sm md:text-base text-white/95 font-medium leading-snug">
                {EVENTS[5].caption}
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-sm">
          <p className="text-gray-400 max-w-xl">
            Want intros? I share the network with clients on retainer — no fee,
            no broker layer, just warm DMs.
          </p>
          <a
            href="/discovery-call"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
              boxShadow: "0 6px 20px rgba(30,136,229,0.30)",
            }}
          >
            Book a strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
