import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICE_CATEGORIES, SITE } from "@/lib/site";

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
const SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly ServiceItem[]
);
const SLUGS = SERVICES.map((s) => s.slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: `${svc.label} — ${SITE.brand}`,
    description: svc.desc,
    alternates: { canonical: `${SITE.url}/services/${svc.slug}` },
    openGraph: {
      title: `${svc.label} — ${SITE.brand}`,
      description: svc.desc,
      url: `${SITE.url}/services/${svc.slug}`,
      type: "article",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();

  const file = path.join(
    process.cwd(),
    "content",
    "services",
    `${slug}.html`
  );
  const html = fs.readFileSync(file, "utf8");

  return (
    <div
      className="wn-service-shell"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
