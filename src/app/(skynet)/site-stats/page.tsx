import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEWS } from "@/lib/news";
import { POSTS } from "@/lib/posts";
import { CASE_STUDIES } from "@/lib/case-studies";
import { STATES } from "@/lib/states";
import { SERVICE_CATEGORIES, SITE } from "@/lib/site";
import { INDUSTRIES } from "@/data/industries";
import {
  publishedServiceStatePairs,
  isNewsIndexable,
  isCaseStudyIndexable,
} from "@/lib/sitemap-quality";

export const metadata: Metadata = {
  title: "Site stats — internal",
  description: "Live page-count dashboard for SkynetLabs site.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/site-stats` },
};

export const dynamic = "force-static";

type FileWalk = {
  staticCount: number;
  programmaticCount: number;
  list: string[];
};

function walkPages(root: string): FileWalk {
  const out: FileWalk = { staticCount: 0, programmaticCount: 0, list: [] };
  function step(d: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) step(p);
      else if (e.name === "page.tsx") {
        const rel = p.replace(/\\/g, "/").split("src/app/")[1] ?? p;
        if (rel.includes("[")) out.programmaticCount++;
        else out.staticCount++;
        out.list.push(rel);
      }
    }
  }
  step(root);
  return out;
}

function walkApi(root: string): string[] {
  const out: string[] = [];
  function step(d: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) step(p);
      else if (e.name === "route.ts") {
        const rel = p.replace(/\\/g, "/").split("src/app/")[1] ?? p;
        out.push(rel);
      }
    }
  }
  step(root);
  return out;
}

export default function SiteStats() {
  if (process.env.NODE_ENV === "production") notFound();
  const services: { slug: string }[] = SERVICE_CATEGORIES.flatMap(
    (c) => c.services as readonly { slug: string }[],
  );
  const servicesNoHref = services.filter(
    (s) => !("href" in s && (s as { href?: string }).href),
  );
  const indexableServiceStates =
    publishedServiceStatePairs(servicesNoHref).length;

  const newsCount = NEWS.length;
  const indexableNewsCount = NEWS.filter((n) => isNewsIndexable(n.slug)).length;

  const caseStudiesCount = CASE_STUDIES.length;
  const indexableCaseStudiesCount = CASE_STUDIES.filter((c) =>
    isCaseStudyIndexable(c.slug),
  ).length;

  const appRoot = path.join(process.cwd(), "src/app");
  const fileCounts = walkPages(appRoot);
  const apiRoutes = walkApi(appRoot);

  const programmaticBreakdown = [
    {
      route: "/services/[slug]",
      label: "Services",
      count: servicesNoHref.length,
    },
    {
      route: "/services/[slug]/in/[state]",
      label: "Services × States (indexable)",
      count: indexableServiceStates,
    },
    {
      route: "/industries/[slug]",
      label: "Industries",
      count: INDUSTRIES.length,
    },
    {
      route: "/locations/[state]",
      label: "Locations (US states)",
      count: STATES.length,
    },
    { route: "/news/[slug]", label: "News articles", count: newsCount },
    { route: "/blog/[slug]", label: "Blog posts", count: POSTS.length },
    {
      route: "/case-studies/[slug]",
      label: "Case studies",
      count: caseStudiesCount,
    },
  ];

  const programmaticTotal = programmaticBreakdown.reduce(
    (a, b) => a + b.count,
    0,
  );
  const total = fileCounts.staticCount + programmaticTotal;

  const builtAt = new Date().toISOString().slice(0, 19) + "Z";

  const cardStyle: React.CSSProperties = {
    background: "var(--cream-3)",
    border: "1px solid rgba(26,26,26,0.18)",
    borderRadius: 2,
    padding: 24,
  };
  const monoLabel: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "var(--ink-faint)",
  };

  return (
    <div className="sky">
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              Internal&nbsp;· build snapshot
            </div>
            <h1>
              Site <em>stats.</em>
            </h1>
            <p className="hero-sub">
              Live page-count dashboard — {total} pages rendered as of {builtAt}
              .
            </p>
          </div>
        </div>
      </section>

      <main
        style={{
          padding:
            "clamp(8px, 3vw, 24px) clamp(16px, 5vw, 32px) clamp(32px, 6vw, 64px)",
          fontFamily: "var(--font-sans)",
          color: "var(--ink)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Hero number */}
        <div
          style={{
            ...cardStyle,
            background: "var(--cream-2)",
            padding: 48,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(72px, 12vw, 128px)",
              lineHeight: 1,
              color: "var(--terracotta)",
              letterSpacing: "-0.04em",
            }}
          >
            {total}
          </div>
          <div style={{ marginTop: 12, ...monoLabel }}>
            total pages rendered
          </div>
        </div>

        {/* Static vs programmatic vs API */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div style={cardStyle}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              {fileCounts.staticCount}
            </div>
            <div style={{ ...monoLabel, marginTop: 8 }}>static</div>
          </div>
          <div style={cardStyle}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              {programmaticTotal}
            </div>
            <div style={{ ...monoLabel, marginTop: 8 }}>programmatic</div>
          </div>
          <div style={cardStyle}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              {apiRoutes.length}
            </div>
            <div style={{ ...monoLabel, marginTop: 8 }}>API routes</div>
          </div>
        </div>

        {/* Programmatic breakdown table */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 24,
            marginBottom: 16,
            letterSpacing: "-0.01em",
          }}
        >
          Programmatic breakdown
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: 40,
            fontSize: 14,
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid var(--terracotta)" }}>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  ...monoLabel,
                }}
              >
                Route
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  ...monoLabel,
                }}
              >
                Type
              </th>
              <th
                style={{
                  textAlign: "right",
                  padding: "10px 12px",
                  ...monoLabel,
                }}
              >
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {programmaticBreakdown.map((r) => (
              <tr
                key={r.route}
                style={{ borderBottom: "1px solid rgba(26,26,26,0.10)" }}
              >
                <td
                  style={{
                    padding: "12px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                  }}
                >
                  {r.route}
                </td>
                <td style={{ padding: "12px" }}>{r.label}</td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    color: "var(--terracotta)",
                  }}
                >
                  {r.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Sitemap-quality filters */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 24,
            marginBottom: 16,
            letterSpacing: "-0.01em",
          }}
        >
          Indexability filters
        </h2>
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            fontSize: 14,
            lineHeight: 1.8,
            marginBottom: 40,
          }}
        >
          <li>
            <strong>News:</strong> {indexableNewsCount}/{newsCount} indexable
          </li>
          <li>
            <strong>Case studies:</strong> {indexableCaseStudiesCount}/
            {caseStudiesCount} indexable
          </li>
          <li>
            <strong>Service × State:</strong> {indexableServiceStates}/
            {servicesNoHref.length * STATES.length} cells qualify (
            {servicesNoHref.length} svc × {STATES.length} states)
          </li>
        </ul>

        {/* Static list */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 24,
            marginBottom: 16,
            letterSpacing: "-0.01em",
          }}
        >
          All page.tsx files ({fileCounts.list.length})
        </h2>
        <details style={{ marginBottom: 40 }}>
          <summary
            style={{
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--terracotta)",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
            }}
          >
            Show full list ↓
          </summary>
          <pre
            style={{
              ...cardStyle,
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              overflow: "auto",
              maxHeight: 480,
              lineHeight: 1.6,
              marginTop: 12,
            }}
          >
            {fileCounts.list.sort().join("\n")}
          </pre>
        </details>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 24,
            marginBottom: 16,
            letterSpacing: "-0.01em",
          }}
        >
          API routes ({apiRoutes.length})
        </h2>
        <pre
          style={{
            ...cardStyle,
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            overflow: "auto",
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          {apiRoutes.sort().join("\n")}
        </pre>
      </main>
    </div>
  );
}
