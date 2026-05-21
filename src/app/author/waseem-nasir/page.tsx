import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "author-waseem-nasir.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Waseem Nasir — Founder, SkynetLabs",
  description:
    "I build automation that doesn't need me to babysit it. Lahore → Singapore → Bangkok → KL → Bali. 180+ workflows, 40+ websites, 9 countries served.",
  alternates: { canonical: "/author/waseem-nasir" },
  openGraph: {
    title: "Waseem Nasir — Founder, SkynetLabs",
    description:
      "Founder of SkynetLabs. n8n automation, AI chatbots and conversion-tuned websites — built from Bali.",
    url: "/author/waseem-nasir",
    type: "profile",
    images: [
      {
        url: "/waseem-portrait.jpg",
        width: 1200,
        height: 1200,
        alt: "Waseem Nasir, founder of SkynetLabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waseem Nasir — Founder, SkynetLabs",
    description:
      "I build automation that doesn't need me to babysit it. 180+ workflows, 40+ websites, 9 countries.",
    creator: "@waseemnasir",
    images: ["/waseem-portrait.jpg"],
  },
};

export default function AuthorPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
