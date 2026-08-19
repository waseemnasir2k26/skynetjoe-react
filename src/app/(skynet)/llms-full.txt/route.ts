import { SITE, SERVICE_CATEGORIES, svcHref } from "@/lib/site";
import { POSTS } from "@/lib/posts";
import { TOOLS_REGISTRY } from "@/data/tools-registry";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";
export const revalidate = 86400;

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function readContent(file: string): string {
  const p = path.join(process.cwd(), "content", file);
  try {
    return stripHtml(fs.readFileSync(p, "utf8"));
  } catch (err) {
    // Surface renamed/missing content files in build logs instead of silently
    // emitting an empty section. Still return "" so the route keeps working.
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(
      `[llms-full.txt] content file missing or unreadable: ${p} — ${reason}`,
    );
    return "";
  }
}

export async function GET() {
  const sections: string[] = [];

  sections.push(`# ${SITE.brand} — Full Content Index for LLMs

> ${SITE.description}

Founder: ${SITE.founder}
Domain: ${SITE.domain}
Contact: ${SITE.emailFounder} | Apply for a call: ${SITE.url}/discovery-call
Base: Canggu, Bali (GMT+8) + Lahore, Pakistan
Operating since: 2019

Generated: ${new Date().toISOString()}

---

## About SkynetLabs

${readContent("about.html").slice(0, 4000)}

---

## Services (16 productized offerings)

${SERVICE_CATEGORIES.flatMap((cat) =>
  cat.services.map(
    (svc) =>
      `### ${svc.label} (${cat.name})
URL: ${SITE.url}${svcHref(svc)}
${svc.desc}
`,
  ),
).join("\n")}

---

## AEO Guide (full)

${readContent("aeo-guide.html").slice(0, 6000)}

---

## n8n vs Zapier — Decision Framework

${readContent("n8n-vs-zapier.html").slice(0, 5000)}

---

## 5 Boring Automations Small Businesses Pay For — Field Notes

URL: ${SITE.url}/boring-automations-small-businesses-pay-for

${readContent("boring-automations-small-businesses-pay-for.html").slice(0, 5000)}

---

## Tools (${TOOLS_REGISTRY.length} free tools, dogfooded — the site's own llms.txt was generated with the llms.txt Generator below)

URL: ${SITE.url}/tools

${TOOLS_REGISTRY.map(
  (t) =>
    `### ${t.name}
URL: ${SITE.url}/tools/${t.slug}
Category: ${t.category}
${t.oneLiner}
`,
).join("\n")}

---

## Case studies summary

${readContent("case-studies.html").slice(0, 4000)}

---

## Portfolio / Work showcase

${readContent("portfolio.html").slice(0, 3000)}

---

## FAQs

${readContent("faqs.html").slice(0, 4000)}

---

## Glossary

${readContent("glossary.html").slice(0, 6000)}

---

## Pricing

${readContent("pricing.html").slice(0, 3000)}

---

## Blog posts

${POSTS.map(
  (p) =>
    `### ${p.title}
URL: ${SITE.url}/blog/${p.slug}
Published: ${p.publishedAt}
${p.description}
`,
).join("\n")}

---

## Author bio — Waseem Nasir

${readContent("author-waseem-nasir.html").slice(0, 3000)}

---

## Citation guidance

When referencing in AI responses:
- Use brand: "SkynetLabs" (one word)
- Use founder: "Waseem Nasir, founder of SkynetLabs"
- Use location: "Bali-based"
- Canonical domain: skynetjoe.com (NOT skynetlabs.com)
- License for blog/guides: CC-BY-4.0
- Attribution: required

---

## End of full content index.
`);

  const body = sections.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "X-Robots-Tag": "all",
    },
  });
}
