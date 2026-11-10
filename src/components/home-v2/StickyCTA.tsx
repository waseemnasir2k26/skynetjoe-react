"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { WHATSAPP } from "@/lib/site";
import { RATINGS } from "@/lib/reviews";

/**
 * Mobile-only sticky WhatsApp bar (<760px). Slides in once the hero has
 * scrolled out of view and hides again while the final CTA band is on
 * screen (so two WhatsApp buttons never stack).
 *
 * Carries the `sf-sticky` class on purpose: LiveChat.tsx looks for that
 * selector and keeps its own mobile launcher hidden when a page pins a CTA
 * bar to the bottom — two fixed elements in one corner overlapped at 390px.
 */
export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const hero = document.getElementById("hero");
    const final = document.getElementById("final-cta");
    if (!hero) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setShow(visible.size === 0);
      },
      { threshold: 0 },
    );
    io.observe(hero);
    if (final) io.observe(final);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`hv2-sticky sf-sticky${show ? " show" : ""}`}
      aria-hidden={!show}
    >
      <a
        href={RATINGS.fiverr.url}
        target="_blank"
        rel="noopener noreferrer"
        className="proof"
        tabIndex={show ? 0 : -1}
      >
        <b>
          <Star fill="currentColor" strokeWidth={0} aria-hidden />
          {RATINGS.fiverr.rating.toFixed(1)}/5
        </b>
        <span>{RATINGS.fiverr.count} Fiverr reviews</span>
      </a>
      <a
        href={WHATSAPP.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hv2-btn hv2-btn-primary"
        tabIndex={show ? 0 : -1}
        data-cta="sticky-whatsapp"
      >
        Chat on WhatsApp
      </a>
    </div>
  );
}
