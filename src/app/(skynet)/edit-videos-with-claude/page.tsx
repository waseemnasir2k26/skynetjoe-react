import type { Metadata } from "next";
import EditVideosClient from "./EditVideosClient";
import { VIDEO_SKILLS, VIDEO_SKILL_COUNT } from "@/data/video-skills";

const TITLE = "Edit Your Videos Using Claude Code";
const DESCRIPTION = `The ${VIDEO_SKILL_COUNT} video-editing skills behind every SkynetLabs reel, vlog, and promo — each with the full master prompt you can paste into Claude Code and run. Free. One email unlocks the lot.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/edit-videos-with-claude" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: `Our editing workflows, each as a prompt. ${VIDEO_SKILL_COUNT} Claude Code video-editing master prompts — cinematic reels, kinetic captions, branded proof reels, faceless explainers.`,
    url: "/edit-videos-with-claude",
    type: "website",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-default.png"],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Claude Code video-editing master prompts",
  description: DESCRIPTION,
  numberOfItems: VIDEO_SKILL_COUNT,
  itemListElement: VIDEO_SKILLS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.whatItMakes,
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <EditVideosClient />
    </>
  );
}
