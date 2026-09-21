import type { Metadata } from "next";
import { SITE, pageTitle, pageDescription } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articleSchema } from "@/lib/schema";
import { getPost } from "@/lib/posts";
import EditVideosClient from "./EditVideosClient";
import { VIDEO_SKILLS, VIDEO_SKILL_COUNT } from "@/data/video-skills";

// Moved from /edit-videos-with-claude → /blog/edit-videos-with-claude on
// 2026-09-21 (301 in place). Listed on /blog via src/lib/posts.ts (layout: "page").
const SLUG = "edit-videos-with-claude";
const post = getPost(SLUG)!;

const TITLE = post.title;
const DESCRIPTION = post.description;

export const metadata: Metadata = {
  title: pageTitle(TITLE),
  description: pageDescription(DESCRIPTION),
  alternates: { canonical: `${SITE.url}/blog/${SLUG}` },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: `Our editing workflows, each as a prompt. ${VIDEO_SKILL_COUNT} Claude Code video-editing master prompts — cinematic reels, kinetic captions, branded proof reels, faceless explainers.`,
    url: `${SITE.url}/blog/${SLUG}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: [SITE.founder],
    tags: post.tags,
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-default.png"],
  },
};

const postSchema = articleSchema({
  title: TITLE,
  description: DESCRIPTION,
  slug: SLUG,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  keywords: post.tags,
});

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
      <JsonLd data={postSchema} />
      <JsonLd data={itemListSchema} />
      <Breadcrumbs
        offsetTop
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: TITLE },
        ]}
      />
      <EditVideosClient
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
      />
    </>
  );
}
