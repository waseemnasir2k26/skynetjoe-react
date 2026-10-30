"use client";

/**
 * ZoomableImage — drop-in replacement for next/image that opens the image
 * in a full-screen pan + zoom lightbox on click.
 *
 * - Wraps next/image so existing layout / `fill` / `sizes` keep working.
 * - Lightbox styled to match cream editorial palette (see globals.css
 *   `.cream-zoom-dialog` selector for overlay + button tints).
 * - Pass `zoomable={false}` to render a plain Image without the lightbox
 *   wrapper — useful for thumbnails inside a link/navigation card.
 * - ESC closes. Click outside closes. Animated open/close.
 *
 * Implementation note: `react-medium-image-zoom` requires the image to be
 * rendered as a real DOM child it can clone. `next/image` with `fill`
 * does that correctly — verified.
 */

import { useEffect, useRef } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image, { type ImageProps } from "next/image";

type ZoomableImageProps = ImageProps & {
  /** When false, render a plain next/image with no lightbox. Default true. */
  zoomable?: boolean;
  /** Extra class on the Zoom dialog (merged with cream-zoom-dialog). */
  zoomClassName?: string;
};

export default function ZoomableImage({
  zoomable = true,
  zoomClassName,
  alt,
  ...imageProps
}: ZoomableImageProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  // react-medium-image-zoom sets aria-owns on its wrapper pointing at a modal
  // id that only exists while open → invalid ARIA reference while closed.
  // Strip it (kept out while open too; the dialog is announced on its own).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !zoomable) return;
    const strip = () =>
      el.querySelectorAll("[data-rmiz][aria-owns]").forEach((n) =>
        n.removeAttribute("aria-owns"),
      );
    strip();
    const mo = new MutationObserver(strip);
    mo.observe(el, { attributes: true, attributeFilter: ["aria-owns"], subtree: true, childList: true });
    return () => mo.disconnect();
  }, [zoomable]);

  if (!zoomable) {
    return <Image alt={alt} {...imageProps} />;
  }

  const classDialog = zoomClassName
    ? `cream-zoom-dialog ${zoomClassName}`
    : "cream-zoom-dialog";

  return (
    <span ref={wrapRef} style={{ display: "contents" }}>
      <Zoom classDialog={classDialog} zoomMargin={40}>
        <Image alt={alt} {...imageProps} />
      </Zoom>
    </span>
  );
}
