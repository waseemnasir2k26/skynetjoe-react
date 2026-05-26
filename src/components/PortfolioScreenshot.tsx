"use client";

/**
 * PortfolioScreenshot — used in <WorkShowcase>.
 *
 * Each portfolio card is wrapped in an <a target="_blank"> that navigates to
 * the live deployed site. We DON'T want the screenshot click to fire the
 * lightbox AND the nav. UX: card click = open live site (primary action);
 * small "zoom" badge in the corner = open lightbox to inspect the screenshot.
 *
 * Implementation: <Controlled> with isZoomed driven by local state. The
 * <Image> renders normally. A separate magnifier <button> sits on top and
 * toggles the zoomed state — stopPropagation + preventDefault keeps the
 * outer <a> nav from firing.
 */

import { useState } from "react";
import { Controlled } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

type Props = {
  src: string;
  alt: string;
};

export default function PortfolioScreenshot({ src, alt }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <Controlled
        isZoomed={isZoomed}
        onZoomChange={setIsZoomed}
        classDialog="cream-zoom-dialog"
        zoomMargin={40}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </Controlled>

      <button
        type="button"
        aria-label="Zoom screenshot"
        className="zoom-badge"
        onClick={(e) => {
          // Prevent the outer <a> from navigating to the live site —
          // user explicitly wants to inspect the screenshot.
          e.preventDefault();
          e.stopPropagation();
          setIsZoomed(true);
        }}
      >
        <ZoomIn style={{ width: 12, height: 12 }} />
        Zoom
      </button>
    </>
  );
}
