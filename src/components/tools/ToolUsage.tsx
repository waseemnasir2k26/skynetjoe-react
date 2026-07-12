"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

/**
 * ToolUsage — "N people used this" pill shown on tool cards / tool pages.
 *
 * On mount it reads the current count, then increments exactly once per
 * browser session (guarded by sessionStorage) so a refresh doesn't inflate
 * the number. Backed by /api/tool-usage/[slug]. Fails silent: if the API is
 * unreachable the pill simply doesn't render, never blocking the tool.
 */
export default function ToolUsage({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const key = `tu:${slug}`;
    const alreadyCounted =
      typeof window !== "undefined" && sessionStorage.getItem(key) === "1";

    async function run() {
      try {
        if (alreadyCounted) {
          const res = await fetch(`/api/tool-usage/${slug}`, {
            cache: "no-store",
          });
          const json = await res.json();
          if (alive && json?.ok) setCount(json.count);
        } else {
          const res = await fetch(`/api/tool-usage/${slug}`, {
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

  if (count === null) return null;

  const label = count.toLocaleString("en-US");

  return (
    <span
      title={`${label} people used this`}
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
      <Users
        className="w-3.5 h-3.5"
        aria-hidden
        style={{ color: "var(--terracotta)" }}
      />
      {label} people used this
    </span>
  );
}
