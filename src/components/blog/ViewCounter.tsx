"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

/**
 * Real per-article view counter backed by the free Abacus hit-counter API
 * (https://abacus.jasoncameron.dev — open source, no key). Each page load
 * hits /hit/<namespace>/<slug> which increments and returns the count.
 * Renders nothing until the count arrives; renders nothing on failure —
 * never a fabricated number.
 */
export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://abacus.jasoncameron.dev/hit/skynetjoe.com/blog-${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.value === "number") setViews(d.value);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5">
      <Eye className="w-3.5 h-3.5" />
      {new Intl.NumberFormat("en-US").format(views)} views
    </span>
  );
}
