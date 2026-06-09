import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "The AEO Field Guide — Get Cited by Claude, ChatGPT, Perplexity & Gemini",
  description:
    "Eight chapters covering what Answer Engine Optimization actually is, the 5-layer stack to ship, llms.txt and the new robots ecosystem, citation-worthy content patterns, measurement, and a 90-day rollout for service businesses.",
  alternates: { canonical: `${SITE.url}/aeo-guide` },
  openGraph: {
    title:
      "The AEO Field Guide — Get Cited by Claude, ChatGPT, Perplexity & Gemini",
    description:
      "How to structure content so LLM answer engines cite you. Schema, content, authority, distribution, freshness. 90-day rollout.",
    url: `${SITE.url}/aeo-guide`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "The AEO Field Guide — Get Cited by Claude, ChatGPT, Perplexity & Gemini",
  description:
    "8-chapter guide to Answer Engine Optimization: 5-layer stack, llms.txt, citation patterns, measurement, 90-day rollout.",
  url: `${SITE.url}/aeo-guide`,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.assetsUrl}/waseem-portrait.jpg`,
    },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/aeo-guide` },
  about: [
    { "@type": "Thing", name: "Answer Engine Optimization" },
    { "@type": "Thing", name: "Large Language Models" },
    { "@type": "Thing", name: "llms.txt" },
  ],
};

// Full @graph schema preserved from the original HTML payload (Article +
// DefinedTerm + FAQPage + HowTo). vercel-preview hostnames swapped for SITE.url
// so structured data points at the production domain.
const graphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE.url}/aeo-guide#article`,
      headline:
        "The AEO Field Guide — How to Get Cited by Claude, ChatGPT, Perplexity & Gemini in 2026",
      description:
        "Eight chapters covering what Answer Engine Optimization actually is, the five-layer stack to ship, the new robots ecosystem, citation-worthy content patterns, measurement, and a 90-day rollout for service businesses.",
      author: {
        "@type": "Person",
        name: SITE.founder,
        url: `${SITE.url}/author/waseem-nasir`,
      },
      publisher: {
        "@type": "Organization",
        name: SITE.brand,
        url: SITE.url,
      },
      datePublished: "2026-05-20",
      dateModified: "2026-05-22",
      mainEntityOfPage: `${SITE.url}/aeo-guide`,
    },
    {
      "@type": "DefinedTerm",
      "@id": `${SITE.url}/aeo-guide#term-aeo`,
      name: "Answer Engine Optimization (AEO)",
      description:
        "The practice of structuring website content so generative search interfaces (Claude, ChatGPT, Perplexity, Google AI Overview, Gemini) cite the page inside their natural-language answer. AEO ranks claims inside documents rather than whole pages.",
      inDefinedTermSet: `${SITE.url}/glossary#termset`,
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/aeo-guide#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Answer Engine Optimization (AEO)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AEO is the practice of structuring website content so generative search interfaces — Claude, ChatGPT, Perplexity, Google's AI Overview, Gemini — cite your page inside the natural-language answer they show users. AEO ranks claims inside documents, not whole documents like classic SEO.",
          },
        },
        {
          "@type": "Question",
          name: "How is AEO different from SEO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SEO ranks documents and rewards long-form pages with backlinks. AEO ranks claims inside documents and rewards short direct answers, definitions, comparison tables, named authorship, and freshness. AEO citations appear in 2–12 weeks; SEO rankings take 3–6 months.",
          },
        },
        {
          "@type": "Question",
          name: "What are the five layers of the AEO stack?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Schema (JSON-LD markup), content (direct-answer paragraphs and definitions), authority (named author with Person schema), distribution (Reddit, Substack, GitHub README mentions), and freshness (dateModified plus quarterly refreshes). Ship in that order — schema before content, content before distribution.",
          },
        },
        {
          "@type": "Question",
          name: "Which LLM crawlers should I allow in robots.txt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Allow GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot, Google-Extended (Gemini), and CCBot (Common Crawl). Block Bytespider unless you target the China/TikTok market. Add an llms.txt file at the root listing your canonical citable pages.",
          },
        },
        {
          "@type": "Question",
          name: "How long until AEO efforts show citations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Two to twelve weeks. Perplexity updates fastest, often within 7 days of publishing. Claude with web search picks up new content within days. ChatGPT browse and Gemini take longer because they pull from Bing and Google indexes. If nothing appears in 8 weeks, the issue is content quality, not patience.",
          },
        },
        {
          "@type": "Question",
          name: "What is llms.txt and do I need it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "llms.txt is a draft standard (proposed by Jeremy Howard, 2024) for a markdown index file at /llms.txt that tells LLMs which pages on your site are canonical and citable. Claude, Perplexity, and a handful of newer engines have started honoring it. Cost to add: 30 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "What's the maximum length of a direct-answer paragraph for AEO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aim for 60 words, never more than 80. The answer must lead with the noun phrase being defined, contain no preamble, and sit at the top of the page above any narrative or marketing copy. Long-form depth is fine below the answer block.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${SITE.url}/aeo-guide#howto`,
      name: "30/60/90-day AEO rollout for a service business",
      description:
        "Week-by-week implementation of the five-layer AEO stack: schema, content, authority, distribution, freshness.",
      totalTime: "P90D",
      step: [
        {
          "@type": "HowToStep",
          name: "Week 1 — Schema foundation",
          text: "Audit existing JSON-LD. Add Organization, Person, Article, FAQPage schema where applicable. Validate in Rich Results Test. Deploy.",
        },
        {
          "@type": "HowToStep",
          name: "Week 2 — robots.txt + llms.txt",
          text: "Write robots.txt allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot. Block Bytespider unless targeting that market. Write llms.txt listing 10–20 canonical pages.",
        },
        {
          "@type": "HowToStep",
          name: "Week 3–4 — Glossary + FAQs",
          text: "Build 40–60-term glossary with DefinedTermSet schema. Build 25–35 question FAQ with FAQPage schema. Use real client questions.",
        },
        {
          "@type": "HowToStep",
          name: "Week 5–6 — Comparison + decision content",
          text: "Build deep comparison pages for two or three X vs Y queries with 15+ row tables, 5+ scenarios, and decision trees.",
        },
        {
          "@type": "HowToStep",
          name: "Week 7–8 — Author authority",
          text: "Build /author/[name] page with full Person schema and sameAs links. Add bylines to every existing post.",
        },
        {
          "@type": "HowToStep",
          name: "Week 9–10 — Case studies",
          text: "Publish 3–5 named case studies with concrete metrics and time windows. Mark up with Article schema.",
        },
        {
          "@type": "HowToStep",
          name: "Week 11–12 — Distribution + measurement",
          text: "Plant 5–10 authentic mentions on niche subreddits, Substack, GitHub READMEs. Set up weekly citation tracking across 15+ queries on the four major engines.",
        },
      ],
    },
  ],
};

// Quotable stats — preserved verbatim.
const QUOTABLES: { stat: string; claim: string; source: string }[] = [
  {
    stat: "5 layers",
    claim:
      "The complete AEO stack: schema, content, authority, distribution, freshness — shipped in that order.",
    source: "SkynetLabs, 2026",
  },
  {
    stat: "2–12 weeks",
    claim:
      "Typical time from publishing AEO-tuned content to first citation in Claude, ChatGPT, Perplexity, or Gemini.",
    source: "SkynetLabs client tracking, 2026",
  },
  {
    stat: "≤80 words",
    claim:
      "Maximum length for the direct-answer paragraph at the top of any AEO page if you want it cited.",
    source: "SkynetLabs AEO Field Guide",
  },
  {
    stat: "6 crawlers",
    claim:
      "LLM user-agents to know in 2026: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bytespider.",
    source: "Verified robots.txt logs, 2026",
  },
];

// Table of contents — preserved verbatim.
const TOC: { id: string; label: string }[] = [
  { id: "section-1", label: "What AEO actually is (and isn't)" },
  {
    id: "section-2",
    label: "Why your SEO playbook stops working in LLM search",
  },
  { id: "section-3", label: "The 5-layer AEO stack" },
  { id: "section-4", label: "llms.txt and the new robots ecosystem" },
  { id: "section-5", label: "Citation-worthy content patterns" },
  { id: "section-6", label: "Measuring AEO: what you can and can't track" },
  { id: "section-7", label: "30/60/90-day AEO rollout for a service business" },
  { id: "section-8", label: "AEO mistakes that kill citations" },
];

// SEO vs AEO comparison rows — preserved verbatim.
const SEO_AEO: { dim: string; seo: string; aeo: string }[] = [
  {
    dim: "Unit of ranking",
    seo: "Page (URL)",
    aeo: "Claim inside a page",
  },
  {
    dim: "Primary signal",
    seo: "Backlinks",
    aeo: "Entity mentions + structured data + authorship",
  },
  {
    dim: "Optimal length",
    seo: "1,500–2,500 words",
    aeo: "Layered — short answer up top, depth below",
  },
  {
    dim: "Keyword strategy",
    seo: "Target volume, write thin matches",
    aeo: "Cover the entity graph, write definitions",
  },
  {
    dim: "Content format",
    seo: "Long-form essays",
    aeo: "Definitions, comparison tables, decision trees, lists",
  },
  {
    dim: "Freshness signal",
    seo: "Recent publish date helps",
    aeo: 'dateModified + visible "Last updated" is mandatory',
  },
  {
    dim: "Authority source",
    seo: "High-DA referring domains",
    aeo: "Reddit, Wikipedia, niche forums, named expert authorship",
  },
  {
    dim: "Click model",
    seo: "SERP click-through to your page",
    aeo: "Brand mention in synthesized answer, no click required",
  },
  {
    dim: "Measurement window",
    seo: "3–6 months to first ranking",
    aeo: "1–8 weeks to first citation",
  },
  {
    dim: "Crawler ecosystem",
    seo: "Googlebot, Bingbot",
    aeo: "GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, plus the originals",
  },
];

// The 5-layer stack — preserved verbatim.
const LAYERS: { tag: string; title: string; body: string }[] = [
  {
    tag: "Layer 1",
    title: "Schema — machine-readable foundations",
    body: "Every page needs JSON-LD that describes what it is at the entity level. Article for posts, FAQPage for Q/A blocks, HowTo for procedures, Product for commerce, Organization plus Person for brand pages, DefinedTermSet for glossaries. Without this, an LLM has to guess what your page is. Validate every schema block in Google's Rich Results Test before deploying — one broken block can disqualify the whole page from rich-result eligibility.",
  },
  {
    tag: "Layer 2",
    title: "Content — citation-worthy answers",
    body: 'The content layer is where AEO is won or lost. The rule: every page must answer at least one specific question in the first 80 words, then expand — in plain prose, not a "What is X" heading followed by a feature list. Depth lives below the answer, not above it. Definitions, comparison tables, decision trees, and case studies with named outcomes get cited more often than essays.',
  },
  {
    tag: "Layer 3",
    title: "Authority — named authorship",
    body: 'LLMs weigh authorship signals heavily because they were trained on the open web where most spam is anonymous and most expertise has a name attached. Every page needs an author byline linking to a real Person page with credentials, social profiles, and writing history. Schema.org Person with sameAs links to LinkedIn, GitHub, Twitter is the spine of authority. A glossary by "the editorial team" gets cited at half the rate of one by a named expert.',
  },
  {
    tag: "Layer 4",
    title: "Distribution — citations follow mentions",
    body: "If your brand is named in three Reddit threads, two Substack posts, a GitHub README, and a Hacker News comment, an LLM trained or augmented on that corpus has many independent signals that you exist and are in the topic. Distribution work is unglamorous but it compounds. Treat it like real publishing, not link-building.",
  },
  {
    tag: "Layer 5",
    title: "Freshness — staleness is decay",
    body: 'Answer engines prefer recently-updated content. dateModified in JSON-LD and a visible "Last updated [date]" line are both signals. Rotate updates: refresh your glossary quarterly, comparison pages every six months, case studies annually. A 2024 glossary untouched since loses citation share to a 2026 refresh — even if the 2024 version is better written.',
  },
];

// LLM crawler ecosystem — preserved verbatim.
const CRAWLERS: { ua: string; op: string; does: string; rec: string }[] = [
  {
    ua: "GPTBot",
    op: "OpenAI",
    does: "Crawls for ChatGPT training + browse",
    rec: "Allow (most cases)",
  },
  {
    ua: "ClaudeBot",
    op: "Anthropic",
    does: "Crawls for Claude training + web search",
    rec: "Allow",
  },
  {
    ua: "PerplexityBot",
    op: "Perplexity",
    does: "Crawls source pages cited in answers",
    rec: "Allow — fastest payoff",
  },
  {
    ua: "Google-Extended",
    op: "Google",
    does: "Separate token for Gemini training data",
    rec: "Allow for AEO; block if paywalled",
  },
  {
    ua: "CCBot",
    op: "Common Crawl",
    does: "Public dataset used by many LLMs",
    rec: "Allow",
  },
  {
    ua: "Bytespider",
    op: "ByteDance",
    does: "TikTok / Doubao training crawler",
    rec: "Block unless targeting that market",
  },
];

const ROBOTS_TXT = `User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Disallow: /

Sitemap: https://yourdomain.com/sitemap.xml`;

const LLMS_TXT = `# SkynetLabs

> AI automation, n8n workflows, AEO/SEO, chatbot development. Bali-based, ships globally.

## Core pages
- [Services](https://yourdomain.com/services): What we build and how
- [Case studies](https://yourdomain.com/case-studies): Anonymized client outcomes
- [Glossary](https://yourdomain.com/glossary): 50 defined terms
- [FAQs](https://yourdomain.com/faqs): 30 founder questions answered

## Reference
- [AEO Field Guide](https://yourdomain.com/aeo-guide): How to get cited by LLMs
- [n8n vs Zapier](https://yourdomain.com/n8n-vs-zapier): Honest comparison`;

// Citation-worthy content patterns — preserved verbatim.
const PATTERNS: { h: string; body: string }[] = [
  {
    h: "How-to with numbered steps",
    body: '"How to migrate from Zapier to n8n in 7 days" with 7 steps, each with a screenshot and a code block. Answer engines pluck individual steps as citations for procedural queries. Mark up with HowTo schema.',
  },
  {
    h: "Glossary with defined terms",
    body: 'Alphabetical list of 30–100 terms with 2–3 sentence definitions. Each term gets its own anchor ID, each definition is self-contained. Use DefinedTermSet + DefinedTerm schema. Gets cited heavily for "what is X" queries.',
  },
  {
    h: "Comparison tables",
    body: '"n8n vs Zapier" with 15+ rows of clearly differentiated criteria. The table itself is what gets cited, often verbatim, because it\'s the densest answer to a comparative question.',
  },
  {
    h: "Decision tree",
    body: '"Should I use n8n or Zapier?" with 5–7 yes/no nodes that funnel to a recommendation. Decision trees rarely get pasted verbatim but the recommendations at the leaves get cited.',
  },
  {
    h: "Named case study with metrics",
    body: '"How we took a cosmetic dental practice\'s intake completion from 34% to 71% in 90 days." Concrete role, concrete metric, concrete time window. A specific, defensible outcome reads as real to a model and gets cited even when the client is anonymized.',
  },
  {
    h: "Data table with sources",
    body: "A table of pricing tiers, error rates, latency benchmarks, etc., with footnoted source links. Models love data tables because they're factual scaffolding for an answer.",
  },
  {
    h: "Definition list with examples",
    body: "Pattern: term, one-line definition, example, counter-example. Repeats well across 20–50 entries and is structurally easy for a model to slice into citations.",
  },
];

// 30/60/90 rollout weeks — preserved verbatim.
const WEEKS: { w: string; body: string }[] = [
  {
    w: "Week 1 — Schema foundation",
    body: "Audit existing JSON-LD across all pages. Add Organization + Person schema to /about. Add Article schema to every blog post. Add FAQPage schema where applicable. Validate every block in Google's Rich Results Test. Deploy.",
  },
  {
    w: "Week 2 — robots.txt + llms.txt",
    body: "Write robots.txt allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot. Block Bytespider unless targeting that market. Write llms.txt listing 10–20 canonical pages with one-line descriptions. Deploy.",
  },
  {
    w: "Week 3–4 — Glossary + FAQs",
    body: "Build a 40–60-term glossary using DefinedTermSet schema. Build a 25–35 question FAQ page using FAQPage schema. Both should answer the actual questions clients send by email, not made-up ones.",
  },
  {
    w: "Week 5–6 — Comparison + decision content",
    body: 'Identify the two or three "X vs Y" queries your prospects actually ask. Build a deep comparison page for each with 15+ row tables, 5+ real-world scenarios, and a decision tree. Use Article + Table schema.',
  },
  {
    w: "Week 7–8 — Author authority",
    body: "Build an /author/[your-name] page with full Person schema, sameAs links to LinkedIn, Twitter, GitHub, and any other public profiles. Add author bylines to every existing post that links to the author page. Backfill bylines as needed.",
  },
  {
    w: "Week 9–10 — Case studies",
    body: "Publish 3–5 named case studies with concrete metrics and time windows. Anonymize where required but keep specifics (industry, size, problem) intact. Mark up with Article schema; include CreativeWork if applicable.",
  },
  {
    w: "Week 11–12 — Distribution + measurement",
    body: "Plant 5–10 authentic mentions: niche subreddits, Substack posts, GitHub READMEs of relevant tools, Hacker News comment threads. Set up weekly citation tracking spreadsheet covering 15+ queries across the four major engines. First trend data appears around week 12–14.",
  },
];

// Mistakes that kill citations — preserved verbatim (faq-wrap / details).
const MISTAKES: { h: string; body: string }[] = [
  {
    h: "1. Burying the answer below 600 words of preamble",
    body: 'The recipe-blog format ("My grandmother used to say…" before the recipe) is poison. Answer in the first 80 words, expand below.',
  },
  {
    h: "2. Anonymous content",
    body: '"By the team" or no byline at all. Models discount unsigned sources. Real human, real page, real credentials.',
  },
  {
    h: "3. Blocking LLM crawlers in robots.txt by default",
    body: 'Some agencies block GPTBot and ClaudeBot to "protect content" then wonder why nobody cites their site. Allow them.',
  },
  {
    h: "4. Schema markup that doesn't match visible content",
    body: "Generating FAQPage schema with questions that aren't actually on the page. Google now penalizes this and LLMs notice the inconsistency.",
  },
  {
    h: "5. Stale dateModified",
    body: "Last updated 2022 on a topic that moves quarterly. Refresh content and refresh the timestamp. Don't refresh the timestamp without changing content — engines catch that.",
  },
  {
    h: "6. Generic claims with no numbers",
    body: '"We scale well" instead of "n8n\'s queue mode plus Redis handles 10K webhooks per hour on a small Hetzner VPS." Numbers get cited; vibes don\'t.',
  },
  {
    h: "7. Walled gardens",
    body: "Putting your best content behind email-gate forms or paywalls that the crawler can't read. The citation is worth more than the email.",
  },
  {
    h: "8. Keyword stuffing reborn as entity stuffing",
    body: 'Repeating "AI automation" 47 times in a 1,000-word post doesn\'t help. Cover the entity graph (related concepts) once and well.',
  },
  {
    h: "9. No internal linking",
    body: "Glossary terms that don't link to the FAQ that doesn't link to the case study that doesn't link to the service page. Build the graph.",
  },
  {
    h: "10. Set-and-forget",
    body: "Shipping the AEO stack once and never updating. Engines weight freshness. Quarterly refreshes are the price of admission.",
  },
];

const preStyle: React.CSSProperties = {
  background: "var(--cream-3)",
  border: "1px solid var(--rule)",
  borderRadius: 4,
  padding: "18px 20px",
  overflowX: "auto",
  fontFamily: "var(--font-mono-plex), ui-monospace, monospace",
  fontSize: 13.5,
  color: "var(--ink-2)",
  lineHeight: 1.6,
  margin: "16px 0 0",
  whiteSpace: "pre",
};

export default function AeoGuidePage() {
  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={graphSchema} />

      <div className="sky">
        {/* HERO — answer-engine optimization guide angle */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                Field guide&nbsp;· <strong>8 chapters</strong>&nbsp;· Updated
                May 2026
              </div>

              <h1>
                The <em>answer-engine optimization</em> field guide.
              </h1>

              <p className="hero-sub">
                How to structure content so{" "}
                <strong>Claude, ChatGPT, Perplexity, and Gemini</strong> cite
                your page inside the answer they show users. The 5-layer stack,
                llms.txt and the new robots ecosystem, citation-worthy patterns,
                measurement, and a 90-day rollout for service businesses.
              </p>

              <div className="cta-row">
                <Link
                  href={SITE.cta.href}
                  className="btn-primary"
                  data-meta-event="Schedule"
                  data-meta-name="aeo-guide-hero-book-audit"
                >
                  {SITE.cta.label} →
                </Link>
                <a href="#section-1" className="btn-line">
                  Start reading
                </a>
              </div>

              <div className="featured-in">
                <span className="featured-lbl">By</span>
                <span>Waseem Nasir, SkynetLabs</span>
                <span>Bali-based, ships globally</span>
                <span>Last updated 22 May 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* DIRECT ANSWER + QUOTABLES */}
        <section className="section tinted">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Direct answer</span>
              <h2>
                What AEO <em>is.</em>
              </h2>
              <p className="section-sub">
                <strong>Answer Engine Optimization (AEO)</strong> is the
                practice of structuring website content so generative search
                interfaces — Claude, ChatGPT, Perplexity, Google&apos;s AI
                Overview, and Gemini — cite your page inside the
                natural-language answer they show users. AEO ranks{" "}
                <em>claims inside documents</em>, not whole documents like
                classic SEO. The five-layer stack to ship is: schema markup,
                citation-worthy content, named-author authority, distribution on
                Reddit and Substack, and freshness.
              </p>
            </div>

            <div className="pain-row">
              {QUOTABLES.map((q) => (
                <div className="pain-cell" key={q.stat}>
                  <div className="pain-stat">{q.stat}</div>
                  <div className="pain-line">{q.claim}</div>
                  <div className="pain-src">{q.source}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTENTS */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Contents</span>
              <h2>
                Eight <em>chapters.</em>
              </h2>
            </div>
            <div className="feature-row">
              {TOC.map((t, i) => (
                <a className="feat-card" key={t.id} href={`#${t.id}`}>
                  <span className="feat-tag">Chapter {i + 1}</span>
                  <div className="feat-title" style={{ fontSize: 20 }}>
                    {t.label}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 1. What AEO is */}
        <section className="section tinted" id="section-1">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Chapter 1</span>
              <h2>
                What AEO actually is <em>(and isn&apos;t).</em>
              </h2>
            </div>
            <p className="section-sub" style={{ marginBottom: 16 }}>
              Answer Engine Optimization is the practice of structuring content
              so generative search interfaces — Claude with web search, ChatGPT
              search, Perplexity, Google&apos;s AI Overview, Gemini, Bing
              Copilot — cite your page inside the natural-language answer they
              hand the user. It&apos;s the post-2024 evolution of SEO, shaped by
              the reality that the user no longer always clicks through to ten
              blue links.
            </p>
            <p className="section-sub" style={{ marginBottom: 16 }}>
              AEO is <strong>not</strong> a rebrand of SEO with a fresh logo.
              SEO ranks documents; AEO ranks <em>claims inside documents</em>. A
              page can be ranked third on Google and never be cited by
              Perplexity, because Perplexity needs a clean, directly-answered
              claim, not a long-form essay buried under a recipe story. The new
              unit of optimization is the paragraph that answers the question in
              one breath.
            </p>
            <p className="section-sub">
              AEO is also not separate infrastructure. Same site, same CMS, same
              hosting. What changes is the way you write, what you mark up with
              structured data, where you publish, and how you reason about
              freshness. Teams that try to &ldquo;do AEO as a side
              project&rdquo; without rethinking content patterns end up shipping
              the same blog posts they shipped in 2022 and wondering why the
              citations don&apos;t come.
            </p>
          </div>
        </section>

        {/* 2. SEO playbook stops working */}
        <section className="section" id="section-2">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Chapter 2</span>
              <h2>
                Why your SEO playbook <em>stops working.</em>
              </h2>
              <p className="section-sub">
                The old playbook — pick a keyword, write 1,800 words, build
                backlinks, wait — was tuned for an algorithm that read your page
                and scored it. The new playbook accounts for a model that reads
                your page, summarizes it in its own words, and decides whether
                your claim is the one to cite. Different game, different rules.
              </p>
            </div>

            <div className="compare-wrap">
              <table className="compare-tbl">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>SEO (2015–2023)</th>
                    <th className="us">AEO (2024–present)</th>
                  </tr>
                </thead>
                <tbody>
                  {SEO_AEO.map((r) => (
                    <tr key={r.dim}>
                      <td>{r.dim}</td>
                      <td className="bad">{r.seo}</td>
                      <td className="us">{r.aeo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="section-sub" style={{ marginTop: 24 }}>
              The rightmost column is the playbook for the next five years. The
              left column keeps working for navigational queries (&ldquo;nike
              shoes&rdquo;) and high-intent commercial keywords — but for
              informational queries, which is most of what brings traffic, the
              answer engines are eating the share.
            </p>
          </div>
        </section>

        {/* 3. 5-layer stack */}
        <section className="section tinted" id="section-3">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Chapter 3</span>
              <h2>
                The 5-layer <em>AEO stack.</em>
              </h2>
              <p className="section-sub">
                When we ship an AEO engagement, we run through five layers in
                order. Skipping a layer is the most common reason citations
                don&apos;t materialize. Each layer compounds on the one below
                it.
              </p>
            </div>
            <div className="feature-row">
              {LAYERS.map((l) => (
                <div className="feat-card" key={l.tag}>
                  <span className="feat-tag">{l.tag}</span>
                  <div className="feat-title">{l.title}</div>
                  <p className="feat-body">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. llms.txt + robots */}
        <section className="section" id="section-4">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Chapter 4</span>
              <h2>
                llms.txt and the new <em>robots ecosystem.</em>
              </h2>
              <p className="section-sub">
                Beyond Googlebot and Bingbot, there are now half a dozen
                LLM-specific user-agents you should know by name. Allow or block
                them in robots.txt at the root of your domain, with an optional
                llms.txt for finer-grained guidance.
              </p>
            </div>

            <div className="compare-wrap">
              <table className="compare-tbl">
                <thead>
                  <tr>
                    <th>User-agent</th>
                    <th>Operator</th>
                    <th>What it does</th>
                    <th className="us">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {CRAWLERS.map((c) => (
                    <tr key={c.ua}>
                      <td>{c.ua}</td>
                      <td>{c.op}</td>
                      <td>{c.does}</td>
                      <td className="us">{c.rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="section-sub" style={{ marginTop: 28 }}>
              A reasonable robots.txt for a service business looks like this:
            </p>
            <pre style={preStyle}>{ROBOTS_TXT}</pre>

            <p className="section-sub" style={{ marginTop: 28 }}>
              Then add an llms.txt at the root listing your canonical citable
              pages in markdown:
            </p>
            <pre style={preStyle}>{LLMS_TXT}</pre>

            <p className="section-sub" style={{ marginTop: 24 }}>
              llms.txt is not enforced by every engine yet, but Claude,
              Perplexity, and a handful of newer answer engines have started
              honoring it. The cost to add is 30 minutes; the upside is real for
              any site with more than 20 pages.
            </p>
          </div>
        </section>

        {/* 5. Citation-worthy patterns */}
        <section className="section tinted" id="section-5">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Chapter 5</span>
              <h2>
                Citation-worthy <em>content patterns.</em>
              </h2>
              <p className="section-sub">
                After auditing hundreds of citations across the four major
                answer engines, seven content patterns appear repeatedly. Build
                pages in these shapes and you stack the deck.
              </p>
            </div>
            <div className="feature-row">
              {PATTERNS.map((p, i) => (
                <div className="feat-card" key={p.h}>
                  <span className="feat-tag">Pattern {i + 1}</span>
                  <div className="feat-title" style={{ fontSize: 20 }}>
                    {p.h}
                  </div>
                  <p className="feat-body">{p.body}</p>
                </div>
              ))}
            </div>
            <p className="section-sub" style={{ marginTop: 24 }}>
              One pattern that gets ignored: the 2,500-word &ldquo;Ultimate
              Guide&rdquo; with 14 H2 sections and a recipe-style introduction.
              Models will index it but rarely cite from it because the citable
              claims are buried.
            </p>
          </div>
        </section>

        {/* 6. Measurement */}
        <section className="section" id="section-6">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Chapter 6</span>
              <h2>
                Measuring AEO: what you <em>can and can&apos;t</em> track.
              </h2>
              <p className="section-sub">
                There is no Google Search Console for LLM citations. You cannot
                pull a definitive list of every place ChatGPT mentioned your
                brand last week. What you can do is approximate, triangulate,
                and trend.
              </p>
            </div>

            <div className="feature-row">
              <div className="feat-card">
                <span className="feat-tag">What you can track</span>
                <ul className="feat-list">
                  <li>
                    <strong>Perplexity Pages</strong> — public pages expose
                    citations; watch frequency over time via brand-name
                    searches.
                  </li>
                  <li>
                    <strong>Brand mention queries</strong> — query Claude,
                    ChatGPT, Perplexity, and Gemini weekly with a fixed set of
                    10–20 questions; log whether your brand is cited.
                  </li>
                  <li>
                    <strong>Referrer logs</strong> — look for chat.openai.com,
                    perplexity.ai, claude.ai, gemini.google.com in analytics.
                  </li>
                  <li>
                    <strong>Brand search volume</strong> — a delayed indicator:
                    branded search rises in Search Console when AEO works.
                  </li>
                  <li>
                    <strong>Citation tracking tools</strong> — tools like
                    citelift.app (one we built) automate the manual-query
                    process across the four major engines.
                  </li>
                </ul>
              </div>
              <div className="feat-card">
                <span className="feat-tag">What you can&apos;t yet track</span>
                <ul className="feat-list">
                  <li>
                    Total citations across all four engines for an arbitrary
                    query universe — no engine publishes this.
                  </li>
                  <li>
                    Per-citation click-through — citations don&apos;t always
                    link, and clicks collapse into regular referral traffic.
                  </li>
                  <li>
                    The exact reason a model picked your source over a
                    competitor&apos;s — no transparency into the ranking
                    signals.
                  </li>
                </ul>
              </div>
            </div>

            <p className="section-sub" style={{ marginTop: 24 }}>
              The honest framing for clients: AEO measurement in 2026 is where
              SEO measurement was in 2006 — directional, manual, requires
              discipline to track weekly. The teams that win are the teams that
              bother.
            </p>
          </div>
        </section>

        {/* 7. 30/60/90 rollout */}
        <section className="section tinted" id="section-7">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Chapter 7</span>
              <h2>
                The 30/60/90-day <em>rollout.</em>
              </h2>
              <p className="section-sub">
                For a service business with an existing site (10–50 pages) that
                wants to start getting cited inside 90 days, this is the order
                we ship. It is sequential by design: schema makes content
                findable, content gives authority something to boost,
                distribution amplifies what already exists.
              </p>
            </div>
            <div className="feature-row">
              {WEEKS.map((w) => (
                <div className="feat-card" key={w.w}>
                  <div className="feat-title" style={{ fontSize: 20 }}>
                    {w.w}
                  </div>
                  <p className="feat-body">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Mistakes — faq-wrap details */}
        <section className="section" id="section-8">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Chapter 8</span>
              <h2>
                AEO mistakes that <em>kill citations.</em>
              </h2>
            </div>
            <div className="faq-wrap">
              {MISTAKES.map((m) => (
                <details key={m.h}>
                  <summary>{m.h}</summary>
                  <p>{m.body}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSER */}
        <section className="mid-cta">
          <div className="mid-cta-inner">
            <h3>
              Want SkynetLabs to ship your <em>AEO stack?</em>
            </h3>
            <p>
              Schema, content, authority, distribution, freshness — all five
              layers. 90-day rollout, fixed price, no retainer required.
            </p>
            <Link
              href={SITE.cta.href}
              className="btn-primary"
              data-meta-event="Schedule"
              data-meta-name="aeo-guide-closer-book-audit"
            >
              {SITE.cta.label} →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
