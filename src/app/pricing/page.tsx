import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "pricing.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Pricing — Public, honest, no 'request a quote'",
  description:
    "Three transparent tiers from SkynetLabs: Starter $1,497, Flagship $9,500, Retainer from $1,997/mo. Plus six fixed-scope micros. No hidden enterprise tier, no discovery dance.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "SkynetLabs Pricing — public, honest, no quote form",
    description:
      "Starter $1,497 · Flagship $9,500 · Retainer from $1,997/mo. Public pricing, fixed scopes, 5–14d ship.",
    url: "/pricing",
    type: "website",
  },
};

export default function PricingPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
