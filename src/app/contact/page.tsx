import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "contact.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Contact — Send a brief, get a fixed-price scope back in 48h",
  description:
    "Skip the 'discovery call' funnel. Write what you need — reply within 8 hours on weekdays from Bali (GMT+8). 9 countries served, 40+ websites delivered.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact SkynetLabs — Waseem Nasir",
    description:
      "Send a brief, get a fixed-price scope back in 48h. Reply guarantee: 8 hours or refund the form.",
    url: "/contact",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact SkynetLabs",
  url: `${SITE.url}/contact`,
  description:
    "Send a brief, get a fixed-price scope back in 48h. Reply within 8 hours on weekdays from Bali (GMT+8).",
  inLanguage: "en",
  mainEntity: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    email: SITE.email,
    founder: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
          validFrom: "2026-01-01",
          validThrough: "2027-01-01",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.emailFounder,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
