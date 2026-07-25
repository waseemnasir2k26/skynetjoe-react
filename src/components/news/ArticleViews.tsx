"use client";

import { useEffect, useState } from "react";

/**
 * ArticleViews — the "eye" preview counter shown in a news article's meta row.
 *
 * On mount it reads the current count, then increments exactly once per
 * browser session (guarded by sessionStorage) so a refresh doesn't inflate
 * the number. Backed by /api/views/[slug]. Fails silent: if the API is
 * unreachable the pill simply doesn't render, never blocking the article.
 */
export default function ArticleViews({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const key = `nv:${slug}`;
    const alreadyCounted =
      typeof window !== "undefined" && sessionStorage.getItem(key) === "1";

    async function run() {
      try {
        if (alreadyCounted) {
          const res = await fetch(`/api/views/${slug}`, { cache: "no-store" });
          const json = await res.json();
          if (alive && json?.ok) setCount(json.count);
        } else {
          const res = await fetch(`/api/views/${slug}`, {
            method: "POST",
            cache: "no-store",
          });
          const json = await res.json();
          if (json?.ok) {
            try {
              sessionStorage.setItem(key, "1");
            } catch {
              /* private mode — ignore */
            }
            if (alive) setCount(json.count);
          }
        }
      } catch {
        /* network/API down — render nothing */
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, [slug]);

  // Hide the counter entirely below a handful of real reads. The API no longer
  // seeds an invented baseline, so an unread article honestly returns 0 — and
  // "0 reads" under a headline is worse than no counter at all.
  if (count === null || count < 5) return null;

  const label = count.toLocaleString("en-US");

  return (
    <span
      title={`${label} previews`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.10em",
        color: "var(--ink-faint)",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        style={{ color: "var(--terracotta)" }}
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {label} reads
    </span>
  );
}
