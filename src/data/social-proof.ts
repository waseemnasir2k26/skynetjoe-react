/**
 * Client outcomes used by TestimonialNumberChip and the /tools social-proof strip.
 *
 * TRUTH RULES (do not relax these):
 *  1. Every entry must be traceable to src/lib/case-studies.ts, which carries a
 *     no-fabricated-metrics policy in its own docblock.
 *  2. Attribution is ROLE + SECTOR only. No client company names and no client
 *     personal names without written permission on file — one client has
 *     explicitly asked not to be named, and the internal record of which client
 *     is which is currently contradictory.
 *  3. There is NO star-rating system on this site. Do not add a `stars` value;
 *     an unearned rating is a fabricated review.
 *  4. A number is welcome only when it is real. There is deliberately no rule
 *     requiring one — the previous version of this file mandated that every
 *     outcome contain a number, and that rule is what produced four invented
 *     figures ("$11K MRR added in 60 days", "Booked 47 calls in 21 days",
 *     "Saved 18 hrs/wk", "4 hours to 90 seconds") attached to the wrong
 *     clients. A qualitative truth beats a quantitative invention.
 */

export type NumericalTestimonial = {
  outcome: string;
  /** Role, not a person's name. */
  name: string;
  /** Sector + region, not a company name. */
  company: string;
};

export const TOP_TESTIMONIALS: NumericalTestimonial[] = [
  {
    outcome: "Routine reply time cut from 6 hours to 6 minutes",
    name: "Operations Director",
    company: "Freight & logistics group (EU)",
  },
  {
    outcome:
      "Monthly bookings doubled in 30 days on the same traffic, no paid ads",
    name: "Wellness practitioner",
    company: "Independent studio, Ubud",
  },
  {
    outcome: "Broken intake form diagnosed and rebuilt inside one working day",
    name: "Clinical Director",
    company: "Clinical recovery network (US)",
  },
  {
    outcome: "Seventh repeat engagement with the same operations team",
    name: "Operations Lead",
    company: "Insurance retainer client (US)",
  },
];

export const DEFAULT_TESTIMONIAL: NumericalTestimonial = TOP_TESTIMONIALS[0];
