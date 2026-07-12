/**
 * Schema Markup Generator — type definitions + JSON-LD builders.
 *
 * Five schema.org types, each with a small typed field set. Builders emit
 * clean JSON-LD, omitting empty optional fields rather than emitting
 * empty-string placeholders (which would produce invalid/junk markup).
 */

export type SchemaType =
  | "Organization"
  | "FAQPage"
  | "Article"
  | "LocalBusiness"
  | "SoftwareApplication";

export type SchemaTypeMeta = {
  key: SchemaType;
  label: string;
  short: string;
};

export const SCHEMA_TYPES: SchemaTypeMeta[] = [
  {
    key: "Organization",
    label: "Organization",
    short: "Your company/brand entity — name, logo, socials.",
  },
  {
    key: "FAQPage",
    label: "FAQPage",
    short: "Question-and-answer content for FAQ blocks.",
  },
  {
    key: "Article",
    label: "Article",
    short: "Blog posts, guides, and news content.",
  },
  {
    key: "LocalBusiness",
    label: "LocalBusiness",
    short: "A physical or service-area business location.",
  },
  {
    key: "SoftwareApplication",
    label: "SoftwareApplication",
    short: "An app, tool, or SaaS product.",
  },
];

export type OrganizationFields = {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string; // newline-separated URLs
};

export type FaqItem = { question: string; answer: string };
export type FaqPageFields = {
  items: FaqItem[];
};

export type ArticleFields = {
  headline: string;
  description: string;
  authorName: string;
  datePublished: string;
  dateModified: string;
  image: string;
  publisherName: string;
  publisherLogo: string;
};

export type LocalBusinessFields = {
  name: string;
  description: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  telephone: string;
  priceRange: string;
  url: string;
};

export type SoftwareApplicationFields = {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  price: string;
  priceCurrency: string;
  url: string;
};

export const DEFAULT_ORGANIZATION: OrganizationFields = {
  name: "",
  url: "",
  logo: "",
  description: "",
  sameAs: "",
};

export const DEFAULT_FAQ: FaqPageFields = {
  items: [{ question: "", answer: "" }],
};

export const DEFAULT_ARTICLE: ArticleFields = {
  headline: "",
  description: "",
  authorName: "",
  datePublished: "",
  dateModified: "",
  image: "",
  publisherName: "",
  publisherLogo: "",
};

export const DEFAULT_LOCAL_BUSINESS: LocalBusinessFields = {
  name: "",
  description: "",
  streetAddress: "",
  addressLocality: "",
  addressRegion: "",
  postalCode: "",
  addressCountry: "",
  telephone: "",
  priceRange: "",
  url: "",
};

export const DEFAULT_SOFTWARE_APPLICATION: SoftwareApplicationFields = {
  name: "",
  description: "",
  applicationCategory: "",
  operatingSystem: "",
  price: "",
  priceCurrency: "USD",
  url: "",
};

function prune<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

export function buildOrganization(f: OrganizationFields): object {
  const sameAs = f.sameAs
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return prune({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: f.name.trim(),
    url: f.url.trim(),
    logo: f.logo.trim(),
    description: f.description.trim(),
    sameAs: sameAs.length ? sameAs : undefined,
  });
}

export function buildFaqPage(f: FaqPageFields): object {
  const valid = f.items.filter((i) => i.question.trim() && i.answer.trim());
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((i) => ({
      "@type": "Question",
      name: i.question.trim(),
      acceptedAnswer: { "@type": "Answer", text: i.answer.trim() },
    })),
  };
}

export function buildArticle(f: ArticleFields): object {
  return prune({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: f.headline.trim(),
    description: f.description.trim(),
    image: f.image.trim(),
    datePublished: f.datePublished.trim(),
    dateModified: f.dateModified.trim() || f.datePublished.trim(),
    author: f.authorName.trim()
      ? { "@type": "Person", name: f.authorName.trim() }
      : undefined,
    publisher: f.publisherName.trim()
      ? prune({
          "@type": "Organization",
          name: f.publisherName.trim(),
          logo: f.publisherLogo.trim()
            ? { "@type": "ImageObject", url: f.publisherLogo.trim() }
            : undefined,
        })
      : undefined,
  });
}

export function buildLocalBusiness(f: LocalBusinessFields): object {
  const address = prune({
    "@type": "PostalAddress",
    streetAddress: f.streetAddress.trim(),
    addressLocality: f.addressLocality.trim(),
    addressRegion: f.addressRegion.trim(),
    postalCode: f.postalCode.trim(),
    addressCountry: f.addressCountry.trim(),
  });
  return prune({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: f.name.trim(),
    description: f.description.trim(),
    url: f.url.trim(),
    telephone: f.telephone.trim(),
    priceRange: f.priceRange.trim(),
    address: Object.keys(address).length > 1 ? address : undefined,
  });
}

export function buildSoftwareApplication(f: SoftwareApplicationFields): object {
  return prune({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: f.name.trim(),
    description: f.description.trim(),
    applicationCategory: f.applicationCategory.trim(),
    operatingSystem: f.operatingSystem.trim(),
    url: f.url.trim(),
    offers:
      f.price.trim() !== ""
        ? prune({
            "@type": "Offer",
            price: f.price.trim(),
            priceCurrency: f.priceCurrency.trim() || "USD",
          })
        : undefined,
  });
}
