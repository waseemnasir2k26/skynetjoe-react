import Image from "next/image";

/**
 * 3-photo "proof of life" strip — Waseem in real settings, captioned with where the work happens.
 * Sits between sections as a small visual break + authenticity proof.
 */
const SHOTS = [
  {
    src: "/portraits/waseem-garden-tropical.jpg",
    alt: "Waseem in a tropical Bali garden, mid-thought",
    label: "Writing this from Bali",
  },
  {
    src: "/portraits/waseem-cafe-working-side.jpg",
    alt: "Waseem at a cafe laptop, side profile, in flow",
    label: "Pairing with Claude Code",
  },
  {
    src: "/portraits/waseem-airport-lounge.jpg",
    alt: "Waseem in an airport lounge with a laptop",
    label: "Shipping from anywhere",
  },
];

export default function ProofOfLifeStrip() {
  return (
    <section className="section pt-6 pb-6">
      <div className="container-x">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {SHOTS.map((s) => (
            <div
              key={s.src}
              className="relative aspect-[4/5] md:aspect-[5/4] rounded-xl overflow-hidden border border-white/10"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 350px, (min-width: 768px) 33vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.12em] text-white/95">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
