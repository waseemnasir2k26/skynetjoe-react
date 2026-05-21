import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "gradient-lab.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Gradient Lab — 10 landing palettes | SkynetLabs",
  description: "10 hero variants in different gradient palettes. Pick one to swap into the live homepage.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
