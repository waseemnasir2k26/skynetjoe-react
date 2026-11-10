import { Star, ExternalLink } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { RATINGS, REVIEWS } from "@/lib/reviews";

/**
 * Real client reviews — verbatim from src/lib/reviews.ts (single source;
 * never edit quote text here). Country + date only, no usernames.
 * Deliberately NO review/aggregateRating JSON-LD.
 */
export default function Reviews() {
  return (
    <section
      className="hv2-section hv2-reviews"
      id="reviews"
      aria-labelledby="reviews-h"
    >
      <div className="hv2-wrap">
        <Reveal className="hv2-head">
          <div>
            <div className="hv2-eyebrow">Client reviews</div>
            <h2 id="reviews-h" className="hv2-h2">
              What clients say <em>after the build.</em>
            </h2>
          </div>
          <div className="hv2-platforms">
            <PlatformLink
              href={RATINGS.fiverr.url}
              label={RATINGS.fiverr.label}
              rating={RATINGS.fiverr.rating}
              count={RATINGS.fiverr.count}
            />
            <PlatformLink
              href={RATINGS.google.url}
              label={RATINGS.google.label}
              rating={RATINGS.google.rating}
              count={RATINGS.google.count}
            />
          </div>
        </Reveal>

        <ul className="hv2-review-grid">
          {REVIEWS.map((r, i) => (
            <li key={`${r.country}-${r.date}-${i}`}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <figure className="hv2-review">
                  <div
                    className="stars"
                    role="img"
                    aria-label={`Rated ${r.stars} out of 5`}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        aria-hidden
                        className={n <= r.stars ? undefined : "off"}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <blockquote>{r.text}</blockquote>
                  <figcaption>
                    Fiverr client · {r.country} · {r.date}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="hv2-review-hint" aria-hidden>
          Swipe for more →
        </p>
      </div>
    </section>
  );
}

function PlatformLink({
  href,
  label,
  rating,
  count,
}: {
  href: string;
  label: string;
  rating: number;
  count: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hv2-rating"
      aria-label={`${label}: ${rating} out of 5 from ${count} reviews (opens in new tab)`}
    >
      <span className="stars" aria-hidden>
        <Star fill="currentColor" strokeWidth={0} />
      </span>
      <span>
        <b>{rating.toFixed(1)}</b>{" "}
        <span className="meta">
          · {count} on {label}
        </span>
      </span>
      <ExternalLink className="ext" aria-hidden />
    </a>
  );
}
