/**
 * Real client reviews + platform ratings — ONE place to edit.
 * Source: data/reviews-2026-11-10.json (scraped 2026-11-10 from the public
 * Fiverr agency page and the Google Maps listing). Quotes are verbatim;
 * "…" marks a cut. Never paraphrase. Usernames are intentionally NOT stored.
 * Upwork is deliberately absent (profile private). No review JSON-LD.
 */
export const RATINGS = {
  fiverr: {
    label: "Fiverr",
    rating: 4.8,
    count: 320,
    url: "https://www.fiverr.com/agencies/skynetjoellc",
  },
  google: {
    label: "Google",
    rating: 4.7,
    count: 16,
    url: "https://maps.google.com/?cid=7844488395285612642",
  },
} as const;

export type Review = {
  stars: number;
  country: string;
  date: string; // "Mon YYYY"
  text: string;
};

export const REVIEWS: Review[] = [
  {
    stars: 5,
    country: "United States",
    date: "Apr 2026",
    text: "They created a great website for our moving company. Very professional, excellent communication, a speedy delivery, and ended up with a high quality product for a very good price. I would definitely consider using them again for future website building projects.",
  },
  {
    stars: 5,
    country: "Canada",
    date: "Oct 2025",
    text: "Seller delivered exactly what I needed for N8N social media automation. The workflow was set up quickly and works smoothly. Clear communication throughout. Would definitely order again. Highly recommended",
  },
  {
    stars: 5,
    country: "Netherlands",
    date: "Jan 2026",
    text: "Waseem did a phenomenal job and is very reliable! If he says he’ll get it done, he gets it done. Definitely ordering again!",
  },
  {
    stars: 4,
    country: "Netherlands",
    date: "Dec 2025",
    text: "Working with SkynetLabs was a true delight. We had real smooth communications with them. And also a very kind account manager who really made an effort to bring our briefing to life in AI. We much recommend this company!",
  },
  {
    stars: 5,
    country: "United States",
    date: "Nov 2025",
    text: "amazing results - always a pleasure working with the team they always deliver as promised - will continue to work with them - highly recommended",
  },
  {
    stars: 5,
    country: "United States",
    date: "Oct 2025",
    text: "I’m extremely satisfied with the professionalism and quality of work delivered. The freelancer understood my vision clearly … Communication was fast and clear, and all revisions were handled efficiently.",
  },
];
