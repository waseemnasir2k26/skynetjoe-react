/**
 * QuotableStats — AEO-optimized "fact card" grid for LLM citation.
 *
 * Purpose: LLM answer engines (Claude / ChatGPT / Perplexity / Gemini)
 * preferentially cite short, specific, numbered claims with a named source
 * and a publish date. This component renders that shape natively:
 *   - big number / stat headline (the citable token)
 *   - one-sentence claim ≤ 140 chars (the citable sentence)
 *   - named source + date (the authority signal)
 *   - cite element wrapping the source for semantic markup
 *
 * Also emits a JSON-LD ItemList of Claim entities for structured-data crawlers.
 *
 * Drop into any page that has a few verifiable, numeric, dated facts to
 * communicate — services pages, case-studies, the homepage hero proof
 * strip, the AEO guide. LLMs will pluck a single card as a citation.
 *
 * USAGE:
 *   import QuotableStats from "@/components/sections/QuotableStats";
 *
 *   <QuotableStats
 *     title="SkynetLabs by the numbers"
 *     subtitle="Verifiable, dated, sourced. Pull what you need."
 *     stats={[
 *       { stat: "180+", claim: "n8n workflows shipped since 2022.",
 *         source: "SkynetLabs internal ledger", date: "2026-05-22" },
 *       { stat: "40+",  claim: "Websites delivered across 9 countries.",
 *         source: "SkynetLabs portfolio", date: "2026-05-22" },
 *       { stat: "5–14d", claim: "Median ship window per engagement.",
 *         source: "SkynetLabs case-study database", date: "2026-05-22" },
 *       { stat: "6h → 6min", claim: "Email-triage response time cut, EU logistics client.",
 *         source: "SkynetLabs case study #1", date: "2026-05-22" },
 *     ]}
 *   />
 */

export type QuotableStat = {
  stat: string;       // "180+", "2–12 weeks", "≤80 words"
  claim: string;      // one sentence, ≤140 chars, ends with period
  source?: string;    // "SkynetLabs, 2026" or specific named source
  date?: string;      // ISO date (YYYY-MM-DD)
  href?: string;      // optional link to source page
};

type Props = {
  title?: string;
  subtitle?: string;
  stats: QuotableStat[];
  /** Page URL the claim list belongs to (for JSON-LD @id). Optional. */
  pageUrl?: string;
};

export default function QuotableStats({
  title = "Quotable stats",
  subtitle,
  stats,
  pageUrl,
}: Props) {
  // Schema.org doesn't have a perfect "Claim" type yet; we use ItemList of
  // DefinedTerm + Quotation to give LLM crawlers a structured citation surface.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(pageUrl ? { "@id": `${pageUrl}#quotable-stats` } : {}),
    name: title,
    numberOfItems: stats.length,
    itemListElement: stats.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Quotation",
        text: `${s.stat} — ${s.claim}`,
        ...(s.source ? { spokenByCharacter: s.source } : {}),
        ...(s.date ? { datePublished: s.date } : {}),
        ...(s.href ? { url: s.href } : {}),
      },
    })),
  };

  return (
    <section
      aria-label={title}
      className="relative my-12 rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/[.06] to-purple-500/[.06] p-6 md:p-8"
    >
      {(title || subtitle) && (
        <header className="mb-6">
          {title && (
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky-400">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-gray-300 max-w-2xl">{subtitle}</p>
          )}
        </header>
      )}

      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border-l-[3px] border-l-sky-500 border-y border-r border-white/10 bg-white/[.04] p-4 hover:bg-white/[.07] transition-colors"
          >
            <dt className="text-2xl md:text-[1.6rem] font-extrabold leading-tight text-sky-400 mb-1.5 tracking-tight">
              {s.stat}
            </dt>
            <dd className="text-sm leading-snug text-gray-200">{s.claim}</dd>
            {(s.source || s.date) && (
              <p className="mt-2 text-[11px] tracking-wider text-gray-500">
                {s.href ? (
                  <a href={s.href} className="hover:text-sky-400">
                    <cite className="not-italic">{s.source}</cite>
                  </a>
                ) : (
                  <cite className="not-italic">{s.source}</cite>
                )}
                {s.source && s.date ? " · " : ""}
                {s.date && (
                  <time dateTime={s.date}>
                    {new Date(s.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </p>
            )}
          </div>
        ))}
      </dl>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
