import Image from "next/image";
import { MapPin, Users } from "lucide-react";

const EVENTS = [
  {
    src: "/community/event-1.jpg",
    caption: "Bali founders circle · May 2026",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/community/event-2.jpg",
    caption: "Canggu builders meetup",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/community/event-3.jpg",
    caption: "Cross-border ops dinner",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/community/event-4.jpg",
    caption: "AI operators Bali · monthly",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/community/event-5.jpg",
    caption: "Founder roundtable · Ubud",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/community/event-6.jpg",
    caption: "Friday wrap · the network",
    span: "lg:col-span-2 lg:row-span-1",
  },
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
            I show up — Bali founder circles, builder meetups, cross-border
            ops dinners. The network you tap when I&apos;m on your project
            isn&apos;t LinkedIn connections. It&apos;s people I&apos;ve broken
            bread with.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-cyan-300/80">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-mono tracking-wide">Canggu · Ubud · Bali · 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 md:gap-4 auto-rows-[220px] lg:auto-rows-[260px]">
          {EVENTS.map((ev, i) => (
            <figure
              key={ev.src}
              className={`relative overflow-hidden rounded-2xl ring-1 ring-white/10 group ${ev.span}`}
            >
              <Image
                src={ev.src}
                alt={ev.caption}
                fill
                sizes={
                  i === 0
                    ? "(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(10,24,32,0.85) 100%)",
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="text-[12px] md:text-sm text-white/95 font-medium leading-snug">
                  {ev.caption}
                </p>
              </figcaption>
            </figure>
          ))}
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
