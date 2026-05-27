import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EVENTS = [
  { src: "/bali-trek/heart-frame-group.jpg", caption: "Heart-frame viewpoint · Bali trek crew · May 2026" },
  { src: "/bali-trek/cafe-group.jpg", caption: "Cafe meetup with the Bali community" },
  { src: "/bali-trek/selfie-friend.jpg", caption: "Trek viewpoint with a builder friend" },
  { src: "/community/event-3.jpg", caption: "Cross-border ops dinner" },
  { src: "/community/event-4.jpg", caption: "AI operators Bali · monthly" },
  { src: "/bali-trek/heart-frame-wide.jpg", caption: "Heart frame, jungle vista behind · Friday wrap" },
];

const ROT = ["-1.1deg", "0.8deg", "-0.6deg", "1.0deg", "-0.9deg", "0.5deg"];

export default function Community() {
  return (
    <section
      aria-label="SkynetLabs in the wild — networking + community"
      style={{
        background: "var(--cream-3)",
        padding: "72px 0",
        borderTop: "1px solid rgba(26,26,26,0.10)",
        borderBottom: "1px solid rgba(26,26,26,0.10)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ maxWidth: 720, marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
            In the room, not the inbox
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
              color: "var(--ink)",
              marginBottom: 14,
            }}
          >
            Solo operator.{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 500 }}>
              Not a hermit.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              lineHeight: 1.6,
              maxWidth: "56ch",
              marginBottom: 14,
            }}
          >
            I show up — Bali founder circles, builder meetups, cross-border ops
            dinners. The network you tap when I&apos;m on your project
            isn&apos;t LinkedIn connections. It&apos;s people I&apos;ve broken
            bread with.
          </p>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
            }}
          >
            — Canggu · Ubud · Bali · 2026
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 28,
          }}
        >
          {EVENTS.map((ev, i) => (
            <figure
              key={ev.src}
              style={{
                margin: 0,
                transform: `rotate(${ROT[i] ?? "0deg"})`,
                background: "var(--cream-3)",
                padding: 10,
                border: "1px solid rgba(26,26,26,0.14)",
                boxShadow: "0 14px 36px rgba(26,26,26,0.10)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  background: "var(--cream-2)",
                }}
              >
                <Image
                  src={ev.src}
                  alt={ev.caption}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{
                    objectFit: "cover",
                    filter: "none",
                  }}
                  priority={i === 0}
                />
              </div>
              <figcaption
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: "var(--ink-faint)",
                  paddingTop: 10,
                  lineHeight: 1.5,
                }}
              >
                — {ev.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(26,26,26,0.10)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <p
            style={{
              color: "var(--ink-2)",
              fontSize: 14,
              maxWidth: "52ch",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Want intros? I share the network with clients on retainer — no fee,
            no broker layer, just warm DMs.
          </p>
          <Link
            href="/discovery-call"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              padding: "14px 22px",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            Book a strategy call
            <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
