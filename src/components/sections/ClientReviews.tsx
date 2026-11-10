import { Star } from "lucide-react";
import { RATINGS, REVIEWS } from "@/lib/reviews";

/**
 * Real Fiverr client reviews (verbatim, from src/lib/reviews.ts).
 * Server component — no client JS. Deliberately no review/rating JSON-LD.
 */
export default function ClientReviews() {
  return (
    <section
      className="section"
      id="reviews"
      aria-labelledby="reviews-h"
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x">
        <div className="max-w-3xl mb-10">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta-aa)",
              marginBottom: 16,
            }}
          >
            ★ {RATINGS.fiverr.rating} · {RATINGS.fiverr.count} reviews on Fiverr
          </div>
          <h2
            id="reviews-h"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: "clamp(28px, 6.5vw, 48px)",
              margin: 0,
              wordBreak: "break-word",
            }}
          >
            What clients{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>say about us.</span>
          </h2>
        </div>

        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {REVIEWS.map((r, i) => (
            <li key={i}>
              <figure
                style={{
                  margin: 0,
                  height: "100%",
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "clamp(20px, 5vw, 28px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  role="img"
                  aria-label={`Rated ${r.stars} out of 5`}
                  style={{ display: "flex", gap: 2 }}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      aria-hidden
                      style={{
                        width: 16,
                        height: 16,
                        fill: n <= r.stars ? "#A8451F" : "none",
                        stroke: "#A8451F",
                        strokeWidth: n <= r.stars ? 0 : 1.5,
                      }}
                    />
                  ))}
                </div>
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    flex: 1,
                  }}
                >
                  “{r.text}”
                </blockquote>
                <figcaption
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--ink-faint)",
                  }}
                >
                  Fiverr client · {r.country} · {r.date}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: 28, fontSize: 15 }}>
          <a
            href={RATINGS.fiverr.url}
            target="_blank"
            rel="noopener"
            className="hover:underline"
            style={{
              color: "var(--terracotta-aa)",
              fontWeight: 600,
              textUnderlineOffset: 3,
            }}
          >
            Read all {RATINGS.fiverr.count} reviews on Fiverr →
          </a>
        </p>
      </div>
    </section>
  );
}
