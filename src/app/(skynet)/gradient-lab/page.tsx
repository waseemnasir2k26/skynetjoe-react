import fs from "fs";
import { pageTitle, pageDescription } from "@/lib/site";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "gradient-lab.html"),
  "utf8",
);

export const metadata: Metadata = {
  title: pageTitle("Gradient Lab — 10 landing palettes"),
  description:
    pageDescription("10 hero variants in different gradient palettes. Pick one to swap into the live homepage."),
  robots: { index: false, follow: false },
};

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
