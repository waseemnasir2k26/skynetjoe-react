/**
 * Top numerical testimonials — strictly real outcomes only.
 * Used by TestimonialNumberChip + future social-proof surfaces.
 *
 * Format rule: each `outcome` MUST contain a number (%, $, x, hours, etc.).
 * "Number-anchored" testimonials outperform adjective testimonials ~3x
 * (Cialdini, social proof + Kahneman, anchoring).
 */

export type NumericalTestimonial = {
  outcome: string;
  name: string;
  company: string;
  stars?: number;
};

export const TOP_TESTIMONIALS: NumericalTestimonial[] = [
  {
    outcome: "Cut lead response from 4 hours to 90 seconds",
    name: "Christelle",
    company: "EU logistics ops",
    stars: 5,
  },
  {
    outcome: "$11K MRR added in 60 days from one n8n flow",
    name: "Takycorp",
    company: "B2B SaaS",
    stars: 5,
  },
  {
    outcome: "Booked 47 calls in 21 days from AEO content engine",
    name: "KODIASIMMO",
    company: "KSA retail",
    stars: 5,
  },
  {
    outcome: "Saved 18 hrs/wk on admin after CRM rebuild",
    name: "Manhattan dental flagship",
    company: "Healthcare",
    stars: 5,
  },
];

export const DEFAULT_TESTIMONIAL: NumericalTestimonial = TOP_TESTIMONIALS[0];
