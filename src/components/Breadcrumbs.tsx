import Link from "next/link";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

/**
 * Breadcrumbs — server-safe wayfinding for deep dynamic routes.
 *
 * Renders BOTH:
 *   1. A visible <nav aria-label="Breadcrumb"> trail (mono, AA-safe terracotta
 *      links + ink current page, "/" separators). Last item is the current
 *      page — not a link, marked aria-current="page".
 *   2. A schema.org BreadcrumbList JSON-LD (ListItem position/name/item).
 *      The current (last) entry omits `item` per schema.org guidance.
 *
 * Why a shared component: search-landing visitors deep-linked onto a [slug]
 * page had no way to tell where they were (P2 wayfinding gap). Centralizing
 * the trail + JSON-LD keeps every deep route consistent and AEO-friendly.
 *
 * `offsetTop`: when the breadcrumb is rendered ABOVE a hero that does NOT
 * already provide the fixed-header top offset, set this true so the trail
 * clears the fixed Header. When placed INSIDE an already-offset hero, leave
 * it false (default).
 *
 * `bare`: drop the `container-x px-6` wrapper so the trail inherits the
 * width/padding of an EXISTING surrounding container (use when inserting the
 * crumb inside a hero that already centers its content). Default false adds
 * its own container so it aligns with the site grid when standalone.
 */

export type Crumb = { label: string; href?: string };

function toAbsolute(href: string): string {
  if (/^https?:\/\//.test(href)) return href;
  return `${SITE.url}${href.startsWith("/") ? "" : "/"}${href}`;
}

export default function Breadcrumbs({
  items,
  offsetTop = false,
  bare = false,
  marginBottom = 18,
}: {
  items: Crumb[];
  offsetTop?: boolean;
  bare?: boolean;
  marginBottom?: number;
}) {
  if (!items.length) return null;

  const lastIndex = items.length - 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => {
      const li: {
        "@type": "ListItem";
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
      };
      // Skip `item` for the current (last) entry per schema.org guidance.
      if (i !== lastIndex && c.href) li.item = toAbsolute(c.href);
      return li;
    }),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav
        aria-label="Breadcrumb"
        className={bare ? undefined : "container-x px-6"}
        style={{
          // When rendered above a hero that lacks the fixed-header offset,
          // clear the fixed Header (~56px tall) with breathing room.
          paddingTop: offsetTop
            ? "calc(var(--promo-h, 44px) + clamp(88px, 14vw, 104px))"
            : undefined,
          marginBottom,
        }}
      >
        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(12px, 1.4vw, 13px)",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
          }}
        >
          {items.map((c, i) => {
            const isLast = i === lastIndex;
            return (
              <li
                key={`${c.label}-${i}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minWidth: 0,
                }}
              >
                {!isLast && c.href ? (
                  <Link
                    href={c.href}
                    style={{
                      color: "#A8451F",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    style={{
                      color: "var(--ink)",
                      // Truncate long current-page titles so mobile never overflows.
                      maxWidth: "min(60vw, 32ch)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={isLast ? c.label : undefined}
                  >
                    {c.label}
                  </span>
                )}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    style={{ color: "var(--ink-faint)" }}
                  >
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
