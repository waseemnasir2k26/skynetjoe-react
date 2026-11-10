import Link from "next/link";
import { ArrowRight, Star, ExternalLink, CalendarCheck } from "lucide-react";
import { WHATSAPP } from "@/lib/site";
import { RATINGS } from "@/lib/reviews";

/**
 * Homepage v2 hero — server component, zero client JS.
 *
 * The H1 is plain server-rendered text (LCP-friendly, no JS fade-in). The
 * right column is an illustrative WhatsApp-style conversation showing what
 * a lead experiences with an AI assistant: ask → instant reply → booked.
 * It is labelled as an example; it is not a transcript or a metric.
 *
 * Facts on this block and their sources:
 *   - "Level 2 agency · Fiverr" — src/components/funnel/HeroFunnel.tsx (prior hero)
 *   - Bali, GMT+8 — src/app/(skynet)/contact/page.tsx
 *   - 5–14 day ship — src/components/sections/FAQHome.tsx (HOME_FAQS)
 *   - 4.8/5 · 320 Fiverr, 4.7/5 · 16 Google — src/lib/reviews.ts (RATINGS)
 *   - 8-hour reply on weekdays, 48-hour fixed-price scope — contact page
 */
export default function Hero() {
  return (
    <section id="hero" className="hv2-hero" aria-labelledby="hero-h">
      <div className="hv2-wrap hv2-hero-grid">
        <div>
          <div className="hv2-hero-eyebrow">
            <strong>AI automation for service businesses</strong>
            <span className="dot" aria-hidden />
            <span>Level 2 agency · Fiverr</span>
            <span className="dot" aria-hidden />
            <span>Bali · GMT+8</span>
          </div>

          <h1 id="hero-h" className="hv2-h1">
            Stop losing leads to <em>slow replies.</em>
          </h1>

          <p className="hv2-hero-sub">
            SkynetLabs sets up a <strong>WhatsApp AI assistant</strong>, instant
            lead replies, follow-up automation and booking flows for your
            service business — fixed price, live in <strong>5–14 days</strong>.
          </p>

          <div className="hv2-hero-ctas">
            <a
              href={WHATSAPP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hv2-btn hv2-btn-primary"
              data-cta="hero-whatsapp"
            >
              Chat on WhatsApp
              <ArrowRight aria-hidden />
            </a>
            <Link href="/pricing" className="hv2-btn hv2-btn-ghost">
              See pricing
            </Link>
          </div>
          <div className="hv2-hero-note">
            Reply within 8 hours on weekdays · fixed-price scope in 48 hours
          </div>

          <div className="hv2-ratings" aria-label="Client ratings">
            <RatingPill
              href={RATINGS.fiverr.url}
              rating={RATINGS.fiverr.rating}
              count={RATINGS.fiverr.count}
              label={RATINGS.fiverr.label}
            />
            <RatingPill
              href={RATINGS.google.url}
              rating={RATINGS.google.rating}
              count={RATINGS.google.count}
              label={RATINGS.google.label}
            />
          </div>
        </div>

        <div>
          <ChatMock />
          <p className="hv2-chat-note">
            Example conversation — what a lead sees when the assistant is live.
          </p>
        </div>
      </div>
    </section>
  );
}

function RatingPill({
  href,
  rating,
  count,
  label,
}: {
  href: string;
  rating: number;
  count: number;
  label: string;
}) {
  const full = Math.round(rating);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hv2-rating"
      aria-label={`${label}: rated ${rating} out of 5 from ${count} reviews (opens in new tab)`}
    >
      <span className="stars" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            fill={n <= full ? "currentColor" : "none"}
            strokeWidth={1.75}
          />
        ))}
      </span>
      <span>
        <b>{rating.toFixed(1)}/5</b>{" "}
        <span className="meta">
          · {count} reviews on {label}
        </span>
      </span>
      <ExternalLink className="ext" aria-hidden />
    </a>
  );
}

function ChatMock() {
  return (
    <div
      className="hv2-chat"
      role="img"
      aria-label="Example WhatsApp conversation: a lead asks about availability late at night, the AI assistant replies in seconds with open slots, the lead picks one, and the booking is confirmed."
    >
      <div className="hv2-chat-top" aria-hidden>
        <div className="av">S</div>
        <div>
          <div className="name">Your business · assistant</div>
          <div className="status">online · replies in seconds</div>
        </div>
        <div className="time">22:41</div>
      </div>
      <div className="hv2-chat-body" aria-hidden>
        <div className="hv2-msg lead">
          Hi — do you have anything this Saturday for a deep clean? 3-bed house.
          <span className="t">22:41</span>
        </div>
        <div className="hv2-msg bot">
          Yes. Saturday 09:00 or 13:30 are open for a 3-bed deep clean. Which
          one works for you?
          <span className="t">22:41</span>
        </div>
        <div className="hv2-msg lead">
          13:30 please.
          <span className="t">22:42</span>
        </div>
        <div className="hv2-msg bot">
          Done — Saturday 13:30 is held for you. Confirmation and a reminder are
          on their way. Anything else I can help with?
          <span className="t">22:42</span>
        </div>
      </div>
      <div className="hv2-chat-tag" aria-hidden>
        <span>Lead → CRM → calendar</span>
        <span className="booked">
          <CalendarCheck />
          Booked while you slept
        </span>
      </div>
    </div>
  );
}
