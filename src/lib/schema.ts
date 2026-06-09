import { SITE } from "./site";

/**
 * Canonical Person node — Waseem Nasir (M15).
 *
 * This is the SINGLE source of truth for the `#person` entity. Every page that
 * needs Waseem as an author/founder/performer must REFERENCE this by
 * `{ "@id": `${SITE.url}/#person` }` (see `personRef`) rather than re-declaring
 * a divergent Person inline. Previously author/discovery-call/vibe-coding/
 * n8n-vs-zapier each emitted conflicting jobTitle/image/sameAs (and a second
 * `/about#waseem` id), fragmenting the entity graph and duplicating
 * x.com/skynetlabs across two different X handles.
 *
 * sameAs contains ONLY real, verified profiles, sourced from SITE.social so
 * there is one place to edit them. Unverified/duplicate handles
 * (linkedin.com/in/waseemnasir, x.com/waseemnasir, an unconfirmed Upwork URL)
 * were intentionally dropped — do not re-add without verification.
 */
const person = {
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.founder,
  givenName: "Waseem",
  familyName: "Nasir",
  url: SITE.founderUrl,
  jobTitle: "Founder, SkynetLabs",
  image: `${SITE.url}/og-default.png`,
  email: SITE.emailFounder,
  description:
    "Founder of SkynetLabs. Builds n8n automation, AI chatbots and conversion-tuned websites for service businesses across 9 countries.",
  worksFor: { "@id": `${SITE.url}/#organization` },
  homeLocation: { "@type": "Place", name: "Bali, Indonesia" },
  knowsAbout: [
    "n8n workflow automation",
    "Zapier and Make integrations",
    "AI chatbot development",
    "Anthropic Claude API",
    "OpenAI GPT API",
    "Next.js development",
    "WordPress development",
    "Answer Engine Optimization (AEO)",
    "Schema.org structured data",
    "GoHighLevel CRM",
    "Shopify e-commerce automation",
    "Retrieval-Augmented Generation (RAG)",
  ],
  sameAs: [
    SITE.social.linkedin,
    SITE.social.twitter,
    SITE.social.github,
    SITE.social.youtube,
    SITE.social.fiverr,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Canggu",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
};

/**
 * Reference to the canonical #person. Use this in author/founder/performer
 * slots so the page links to the single Person entity instead of re-declaring
 * it. The full `person` node must be emitted somewhere in the same page's
 * JSON-LD (or site-wide) for the @id to resolve.
 */
const personRef = { "@id": `${SITE.url}/#person` } as const;

const organization = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.brand,
  url: SITE.url,
  // Google rejects .ico for logo rich results; use a PNG ImageObject.
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/icon-512.png`,
    width: 512,
    height: 512,
  },
  description: SITE.description,
  // TODO(reviews): wire aggregateRating/review here using ONLY real,
  // attributable testimonial data. Current testimonials in
  // src/components/sections/Testimonials.tsx are named text quotes with NO
  // numeric ratings — adding ratingValue/reviewCount would be fabricated.
  founder: { "@id": `${SITE.url}/#person` },
  email: SITE.email,
  sameAs: [
    SITE.social.linkedin,
    SITE.social.twitter,
    SITE.social.github,
    SITE.social.youtube,
    SITE.social.fiverr,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Canggu",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
};

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
  /** URL path prefix the article lives under. Defaults to "/blog" so existing
   *  BlogPosting callers are unchanged; pass "/news" for NewsArticle pages. */
  basePath?: string;
  /** schema.org article subtype. Defaults to "BlogPosting"; pass
   *  "NewsArticle" for dated /news pages. */
  type?: string;
}) {
  const basePath = opts.basePath ?? "/blog";
  const type = opts.type ?? "BlogPosting";
  const url = `${SITE.url}${basePath}/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image || `${SITE.url}/og-default.png`,
    url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: person,
    publisher: organization,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: opts.keywords?.join(", "),
    inLanguage: "en",
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ['//*[@itemprop="answer"]'],
        },
      },
    })),
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
  estimatedCost?: { currency: string; value: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    totalTime: opts.totalTime,
    estimatedCost: opts.estimatedCost
      ? {
          "@type": "MonetaryAmount",
          currency: opts.estimatedCost.currency,
          value: opts.estimatedCost.value,
        }
      : undefined,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/services/${opts.slug}#service`,
    name: opts.name,
    description: opts.description,
    url: `${SITE.url}/services/${opts.slug}`,
    provider: organization,
    areaServed: "Worldwide",
    serviceType: opts.name,
    offers: opts.priceRange
      ? {
          // priceRange is a free-form range string (e.g. "$2k–$8k") with no
          // single parseable number, so `price` (which expects a number) is
          // invalid. Use the valid `priceRange` field on the Offer instead.
          "@type": "Offer",
          priceCurrency: "USD",
          priceRange: opts.priceRange,
        }
      : undefined,
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function videoSchema(opts: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl,
    uploadDate: opts.uploadDate,
    embedUrl: opts.embedUrl,
    duration: opts.duration,
    publisher: organization,
  };
}

export function reviewSchema(opts: {
  itemReviewed: string;
  author: string;
  reviewBody: string;
  rating: number;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: opts.itemReviewed },
    author: { "@type": "Person", name: opts.author },
    reviewBody: opts.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: opts.rating,
      bestRating: 5,
    },
    datePublished: opts.datePublished,
  };
}

export const SPEAKABLE_TLDR = {
  "@type": "SpeakableSpecification",
  cssSelector: [".tldr", "h1", "h2", '[data-speakable="true"]'],
};

export { person, personRef, organization };
