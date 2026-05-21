import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "tools.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Free Tools — AEO score, schema builder, citation monitor & more",
  description:
    "Six free utilities from SkynetLabs: AEO Score Check, n8n vs Zapier Quiz, Voice Profile Generator, Meta Messaging Bot Sandbox, Schema Markup Builder, Citation Monitor.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "SkynetLabs Free Tools — six utilities, no email gate",
    description:
      "AEO scoring, schema generation, voice profiling, Meta messaging sandbox, citation tracking. Free, public, dogfood-grade.",
    url: "/tools",
    type: "website",
  },
};

export default function ToolsPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
