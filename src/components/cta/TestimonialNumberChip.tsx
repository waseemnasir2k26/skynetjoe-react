/**
 * TestimonialNumberChip — inline social-proof chip with star rating + numerical outcome.
 *
 * Psychology stack:
 *   - Cialdini social proof (real client, real outcome)
 *   - Anchoring (Kahneman): leading with a NUMBER (% / $ / hrs / 2x) tightens belief
 *
 * Server component. Pulls from src/data/social-proof.ts so testimonials
 * are editable in one file sitewide.
 *
 * Format: ★★★★★ "[number outcome]" — [name], [company]
 */

import {
  DEFAULT_TESTIMONIAL,
  type NumericalTestimonial,
} from "@/data/social-proof";

export type TestimonialNumberChipProps = {
  testimonial?: NumericalTestimonial;
  className?: string;
  size?: "sm" | "md";
};

export default function TestimonialNumberChip({
  testimonial = DEFAULT_TESTIMONIAL,
  className = "",
  size = "sm",
}: TestimonialNumberChipProps) {
  const stars = testimonial.stars ?? 5;
  const isSm = size === "sm";

  return (
    <figure
      className={`inline-flex items-center gap-2.5 max-w-full rounded-full ${
        isSm ? "px-3 py-1.5" : "px-4 py-2"
      } ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(126, 228, 255, 0.20)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <span
        aria-label={`${stars} out of 5 stars`}
        className={`text-amber-400 tracking-tight shrink-0 ${
          isSm ? "text-[11px]" : "text-xs"
        }`}
      >
        {"★".repeat(stars)}
      </span>
      <blockquote
        className={`text-white font-medium leading-snug truncate ${
          isSm ? "text-xs" : "text-sm"
        }`}
      >
        &ldquo;{testimonial.outcome}&rdquo;
      </blockquote>
      <figcaption
        className={`text-cyan-300/80 font-semibold shrink-0 ${
          isSm ? "text-[11px]" : "text-xs"
        }`}
      >
        — {testimonial.name}, {testimonial.company}
      </figcaption>
    </figure>
  );
}
