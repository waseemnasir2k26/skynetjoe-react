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
  ...imageProps
}: ZoomableImageProps) {
  if (!zoomable) {
    return <Image {...imageProps} />;
  }

  const classDialog = zoomClassName
    ? `cream-zoom-dialog ${zoomClassName}`
    : "cream-zoom-dialog";

  return (
    <Zoom classDialog={classDialog} zoomMargin={40}>
      <Image {...imageProps} />
    </Zoom>
  );
}
