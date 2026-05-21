import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "about.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "About SkynetLabs — One founder, AI as cofounder, 180 workflows shipped",
  description:
    "SkynetLabs is a one-founder automation studio in Bali. Six principles, public pricing, source-controlled deliverables. Run by Waseem Nasir + Claude as second seat.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About SkynetLabs — One founder, AI as cofounder",
    description:
      "How we operate: solo founder, AI as second seat, 5–14d ship window, public pricing, source-controlled workflows.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
