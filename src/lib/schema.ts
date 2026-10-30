import { SITE } from "./site";

const person = {
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.founder,
  givenName: "Waseem",
  familyName: "Nasir",
  // Canonical Person.url = on-site author page; waseemnasir.com lives in sameAs.
  url: `${SITE.url}/author/waseem-nasir`,
  image: `${SITE.assetsUrl}/waseem-portrait.jpg`,
  jobTitle: "Founder, SkynetLabs",
  worksFor: { "@id": `${SITE.url}/#organization` },
  nationality: { "@type": "Country", name: "Pakistan" },
  birthPlace: { "@type": "Place", name: "Lahore, Pakistan" },
  homeLocation: { "@type": "Place", name: "Bali, Indonesia" },
  description:
    "Founder of SkynetLabs. Builds n8n automation, AI chatbots and conversion-tuned websites for service businesses across 9 countries.",
  knowsAbout: [
    "n8n workflow automation",
    "Zapier and Make integrations",
    "AI chatbot development",
    "Anthropic Claude API",
    "OpenAI GPT API",
    "Google Gemini API",
    "WordPress development",
    "Next.js development",
    "Answer Engine Optimization (AEO)",
    "Generative Engine Optimization (GEO)",
    "Schema.org structured data",
    "Conversational APIs (WhatsApp Cloud, Telegram)",
    "GoHighLevel CRM",
    "Shopify e-commerce automation",
    "Retrieval-Augmented Generation (RAG)",
    "Vector databases (Qdrant, pgvector)",
    "Headless CMS (Sanity, Contentful)",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "AI Automation Agency Founder",
    occupationLocation: { "@type": "City", name: "Bali, Indonesia" },
    skills:
      "n8n, OpenAI, Anthropic Claude, Next.js, WordPress, AEO, schema markup, RAG, chatbot development",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Self-taught — 180+ shipped automation workflows and 40+ websites since 2019",
  },
  award: [
    "180+ n8n workflows shipped (2019–2026)",
    "40+ websites delivered across 9 countries",
    "Top Rated Plus on Upwork",
    "Top Rated on Fiverr",
  ],
  email: SITE.emailFounder,
  sameAs: [
    SITE.founderUrl,
    SITE.social.linkedin,
    SITE.social.twitter,
    SITE.social.github,
    SITE.social.youtube,
    SITE.social.fiverr,
    "https://www.upwork.com/freelancers/muhammadwaseemnasir",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Canggu",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
};

/**
 * Light-weight Person / Organization nodes for page-level schema (Article,
 * BlogPosting, VideoObject...). They carry the same stable @id as the full
 * nodes on the home / author pages so graph consumers merge them into ONE
 * entity instead of 100+ anonymous duplicates.
 */
export const personRef = {
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.founder,
  url: `${SITE.url}/author/waseem-nasir`,
} as const;

export const organizationRef = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.brand,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/icon-512.png`,
    width: 512,
    height: 512,
  },
} as const;

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
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
      telephone: "+6281316077185",
    email: SITE.email,
    url: `${SITE.url}/contact`,
    availableLanguage: ["en"],
  },
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${opts.slug}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image || `${SITE.url}/og-default.png`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: personRef,
    publisher: organizationRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${opts.slug}` },
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
        // (speakable removed: schema.org only allows it on Article/WebPage,
        // and the xpath pointed at an itemprop no page renders.)
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

export { person, organization };
