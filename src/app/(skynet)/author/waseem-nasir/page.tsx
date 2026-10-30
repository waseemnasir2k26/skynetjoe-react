import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE, pageTitle, pageDescription } from "@/lib/site";
import { person } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "author-waseem-nasir.html"),
  "utf8",
);

export const metadata: Metadata = {
  // No ", SkynetLabs" here — title.template in (skynet)/layout.tsx appends
  // " | SkynetLabs", which produced "... SkynetLabs | SkynetLabs" live.
  title: pageTitle("Waseem Nasir — Founder & Automation Engineer"),
  description:
    pageDescription("Founder of SkynetLabs. n8n workflows, AI chatbots and conversion-tuned websites, built solo from Bali for service businesses worldwide."),
  alternates: { canonical: `${SITE.url}/author/waseem-nasir` },
  openGraph: {
    title: "Waseem Nasir — Founder, SkynetLabs",
    description:
      "Founder of SkynetLabs. n8n automation, AI chatbots and conversion-tuned websites — built from Bali.",
    url: `${SITE.url}/author/waseem-nasir`,
    type: "profile",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "SkynetLabs — AI automation, chatbots and conversion-tuned websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waseem Nasir — Founder, SkynetLabs",
    description:
      "I build automation that doesn't need me to babysit it. 180+ workflows, 40+ websites, 9 countries.",
    creator: "@Skynetjoe1",
    images: ["/og-default.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE.url}/author/waseem-nasir#profilepage`,
      url: `${SITE.url}/author/waseem-nasir`,
      name: `${SITE.founder} — Founder, ${SITE.brand}`,
      mainEntity: { "@id": `${SITE.url}/#person` },
      inLanguage: "en",
    },
    person,
  ],
};

export default function AuthorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <HtmlCreamWrap html={html} />
    </>
  );
}
