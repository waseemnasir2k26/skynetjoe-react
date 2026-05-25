import { SITE } from "./site";

const person = {
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.founder,
  url: SITE.founderUrl,
  jobTitle: "Founder, SkynetLabs",
  image: `${SITE.assetsUrl}/portraits/waseem-rooftop.jpg`,
  email: SITE.emailFounder,
  worksFor: { "@id": `${SITE.url}/#organization` },
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

const organization = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.brand,
  url: SITE.url,
  logo: `${SITE.url}/favicon.ico`,
  description: SITE.description,
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${opts.slug}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image || `${SITE.assetsUrl}/portraits/waseem-rooftop.jpg`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: person,
    publisher: organization,
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
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", price: opts.priceRange },
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
