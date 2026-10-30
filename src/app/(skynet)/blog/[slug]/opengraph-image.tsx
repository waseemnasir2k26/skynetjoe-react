import { ImageResponse } from "next/og";
import { getPost, postsByDate } from "@/lib/posts";

// Per-post OG image (SEO-02). File-based metadata outranks the page's
// generateMetadata images, so every programmatic post gets its own card.
// Static pages keep /og-default.png.
export const alt = "SkynetLabs Journal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same set as the page: layout "page" posts ship their own route.
export function generateStaticParams() {
  return postsByDate()
    .filter((p) => p.layout !== "page")
    .map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getPost(slug)?.title ?? "SkynetLabs Journal";
  const fontSize = title.length > 90 ? 48 : title.length > 60 ? 56 : 66;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2efe6",
          border: "20px solid #faf7f0",
          padding: "52px 64px",
          color: "#1a1a1a",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Skynet<span style={{ color: "#a8451f" }}>Labs</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            color: "#a8451f",
          }}
        >
          <div style={{ width: 40, height: 2, background: "#c66b3f" }} />
          skynetjoe.com / blog
        </div>
      </div>
    ),
    { ...size },
  );
}
