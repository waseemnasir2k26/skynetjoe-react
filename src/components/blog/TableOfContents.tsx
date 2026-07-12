"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string };

/**
 * Sticky table of contents for blog posts. Desktop (lg+): fixed-position
 * rail beside the article with IntersectionObserver active-section
 * highlight. Mobile: collapsible <details> box above the content.
 * Rendered only when the post fragment has >= 3 anchored h2s.
 */
export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  const list = (onClick?: () => void) => (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onClick}
            className="block text-sm leading-snug transition-colors"
            style={{
              color:
                activeId === item.id ? "var(--terracotta-aa)" : "var(--ink-2)",
              fontWeight: activeId === item.id ? 600 : 400,
              borderLeft:
                activeId === item.id
                  ? "2px solid var(--terracotta)"
                  : "2px solid transparent",
              paddingLeft: 10,
            }}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsible box above content */}
      <details
        className="lg:hidden mb-8 p-4"
        style={{
          background: "var(--cream-3)",
          border: "1px solid var(--border)",
          borderRadius: 2,
        }}
      >
        <summary
          className="cursor-pointer text-xs uppercase tracking-wider font-semibold"
          style={{
            color: "var(--terracotta-aa)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.14em",
          }}
        >
          On this page
        </summary>
        <nav className="mt-4">{list()}</nav>
      </details>

      {/* Desktop: sticky rail */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky self-start"
        style={{ top: 96 }}
      >
        <div
          className="text-xs uppercase tracking-wider font-semibold mb-4"
          style={{
            color: "var(--terracotta-aa)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.14em",
          }}
        >
          On this page
        </div>
        {list()}
      </nav>
    </>
  );
}
