import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { CASE_STUDIES } from "@/lib/case-studies";
import JsonLd from "@/components/JsonLd";
import InlineCTABand from "@/components/cta/InlineCTABand";

const rawHtml = fs.readFileSync(
  path.join(process.cwd(), "content", "case-studies.html"),
  "utf8"
);

// Wrap each `<article class="wn-x-card">…</article>` block in an anchor that
// links to the matching detail page. Cards appear in numerical order (01..09)
// inside `<section class="wn-x-grid">…</section>`, matching CASE_STUDIES
// ordered by `position`. Also injects a real AI-generated hero image into the
// `.wn-x-thumb` div (replaces the gradient placeholder + glyph text) and a
// "Read full case study →" link inside each card body.
function injectCardLinks(html: string): string {
  const ordered = [...CASE_STUDIES].sort((a, b) => a.position - b.position);
  let i = 0;
  let j = 0;
  return html
    .replace(/<article class="wn-x-card">/g, () => {
      const c = ordered[i++];
      if (!c) return '<article class="wn-x-card">';
      return `<article class="wn-x-card" data-slug="${c.slug}" style="position:relative;">`;
    })
    // Insert real image inside .wn-x-thumb (keep the number badge, drop the glyph)
    .replace(
      /<div class="wn-x-thumb (g\d+)" aria-hidden="true">\s*<span class="wn-x-thumb-num">([^<]+)<\/span>\s*<span class="wn-x-thumb-glyph">[^<]+<\/span>\s*<\/div>/g,
      (_match, gClass, num) => {
        const c = ordered[j++];
        if (!c)
          return `<div class="wn-x-thumb ${gClass}" aria-hidden="true"><span class="wn-x-thumb-num">${num}</span></div>`;
        return `<a href="/case-studies/${c.slug}" class="wn-x-thumb ${gClass}" style="display:block;position:relative;text-decoration:none;"><img src="${c.coverImage}" alt="${c.clientName} — ${c.industry}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" /><span class="wn-x-thumb-num" style="z-index:3;">${num}</span><span aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,24,39,0) 55%, rgba(6,24,39,0.55) 100%);z-index:2;"></span></a>`;
      }
    )
    .replace(/<\/ul>\s*<\/div>\s*<\/article>/g, (match) => {
      const c = ordered.shift();
      if (!c) return match;
      const link = `</ul><a href="/case-studies/${c.slug}" style="display:inline-flex;align-items:center;gap:.4rem;margin-top:.85rem;color:#5EEAD4;font-size:.85rem;font-weight:600;text-decoration:none;">Read full case study →</a></div></article>`;
      return link;
    });
}

const html = injectCardLinks(rawHtml);

export const metadata: Metadata = {
  title: "Case Studies — 9 builds across automation, websites & AI content",
  description:
    "Nine anonymized client wins from SkynetLabs: n8n automation, flagship websites, AEO content engines and CRM rebuilds. Honest outcomes, no vanity metrics.",
  alternates: { canonical: `${SITE.url}/case-studies` },
  openGraph: {
    title: "SkynetLabs Case Studies — 9 shipped builds",
    description:
      "EU logistics, Manhattan dental, Bali wellness, KSA retail and more — anonymized where contracts require it.",
    url: `${SITE.url}/case-studies`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Case Studies",
  description:
    "Nine anonymized client wins across automation, websites, AEO content engines and CRM rebuilds.",
  url: `${SITE.url}/case-studies`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
  about: { "@id": `${SITE.url}/#organization` },
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <InlineCTABand
        variant="default"
        headline="Want your name on this page next quarter?"
        subhead="9 builds shipped. 4 slots open per month. 30-min call decides if we're the right fit — yes/no in 8 hours."
        primaryCTA={{
          label: "Apply for a discovery call",
          href: "/discovery-call",
        }}
        secondaryCTA={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
