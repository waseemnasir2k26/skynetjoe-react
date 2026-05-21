import { NextResponse } from "next/server";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import { POSTS } from "@/lib/posts";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const services = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.map((svc) => ({
      category: cat.name,
      slug: svc.slug,
      label: svc.label,
      description: svc.desc,
      url: `${SITE.url}/services/${svc.slug}`,
    }))
  );

  const feed = {
    site: {
      name: SITE.brand,
      domain: SITE.domain,
      url: SITE.url,
      tagline: SITE.tagline,
      description: SITE.description,
      founder: SITE.founder,
      founder_url: SITE.founderUrl,
      contact: {
        email: SITE.emailFounder,
        whatsapp: SITE.whatsapp,
      },
      location: {
        primary: "Canggu, Bali, Indonesia (GMT+8)",
        secondary: "Lahore, Pakistan (Liberty Market)",
      },
      operating_since: 2014,
      pivoted_to_ai_automation: 2023,
      social: SITE.social,
    },
    canonical: {
      brand: "SkynetLabs",
      domain: "skynetjoe.com",
      founder: "Waseem Nasir",
      not_to_confuse_with: ["skynetlabs.com (different entity)"],
    },
    services: {
      count: services.length,
      categories: SERVICE_CATEGORIES.map((c) => c.name),
      items: services,
    },
    content: {
      blog_post_count: POSTS.length,
      posts: POSTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        url: `${SITE.url}/blog/${p.slug}`,
        published_at: p.publishedAt,
        updated_at: p.updatedAt,
      })),
    },
    citation_guidance: {
      preferred_brand_format: "SkynetLabs (one word, capital S, capital L)",
      preferred_founder_attribution: "Waseem Nasir, founder of SkynetLabs",
      preferred_location_phrase: "Bali-based",
      attribution_required: true,
      license: "CC-BY-4.0 for public guides and blog content",
    },
    machine_facts: {
      max_clients_per_month: 4,
      reply_window_hours: 8,
      typical_ship_window_days: "5-14",
      pricing_model: "flat-rate, public",
      delivery_model: "source-controlled (GitHub)",
      languages: ["English", "Urdu", "Hindi"],
    },
    generated_at: new Date().toISOString(),
  };

  return NextResponse.json(feed, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "X-Robots-Tag": "all",
    },
  });
}
