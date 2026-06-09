import type { Metadata } from "next";
import LetterArticle from "@/components/letter/LetterArticle";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articleSchema } from "@/lib/schema";
import { getArticle, relatedFor } from "@/lib/news";
import { SITE, twitterFromOpenGraph } from "@/lib/site";

const SLUG = "aeo-2026-meaning";
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: { canonical: `${SITE.url}/news/${SLUG}` },
  openGraph: {
    title: article.title,
    description: article.description,
    url: `${SITE.url}/news/${SLUG}`,
    type: "article",
    publishedTime: article.publishedAt,
    authors: [SITE.founder],
    tags: article.tags,
    images: [{ url: article.heroImage }],
  },
  twitter: twitterFromOpenGraph({
    title: article.title,
    description: article.description,
    images: [article.heroImage],
  }),
};

export default function Page() {
  const schema = articleSchema({
    title: article.title,
    description: article.description,
    slug: SLUG,
    basePath: "/news",
    type: "NewsArticle",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    image: `${SITE.assetsUrl}${article.heroImage}`,
    keywords: article.tags,
  });

  const related = relatedFor(SLUG, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
    deck: r.deck,
  }));

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        offsetTop
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />
      <LetterArticle
        eyebrow={article.eyebrow}
        title={article.title}
        deck={article.deck}
        heroImage={article.heroImage}
        heroCaption={article.heroCaption}
        datePublished={article.publishedAt}
        readingTime={article.readingTime}
        category={article.category}
        signatureMeta="— Lahore desk · 2026-05-11"
        related={related}
      >
        <p>
          A wellness brand founder messaged me last month:{" "}
          <em>
            &quot;my new SEO agency is now charging $1,800/month for AEO. What
            is it?&quot;
          </em>
        </p>
        <p>
          I asked her to forward the proposal. Eight pages of slides. Words like
          &quot;optimized for answer engines,&quot; &quot;LLM-friendly
          schema,&quot; &quot;Bing Copilot positioning.&quot; Zero mentions of
          retrieval, embeddings, or what an actual LLM does with a web page at
          query time. The deliverable list was — and I&apos;m not making this up
          — &quot;FAQ schema, glossary pages, and a monthly blog post.&quot;
          Twenty-two hundred dollars a month for schema markup and a blog post.
          They were selling 2017 SEO with a new wrapper.
        </p>
        <p>
          AEO — answer-engine optimization — is a real discipline. It&apos;s
          also structurally different from SEO in ways that most agencies
          haven&apos;t internalized yet. This essay is the explanation I wish
          someone had given me two years ago, written in plain English, with the
          underlying retrieval mechanics that actually drive whether you get
          cited inside ChatGPT, Claude, and Perplexity.
        </p>

        <h2>The one-line definition</h2>
        <p>
          <mark>
            AEO is the discipline of getting your business cited inside an
            LLM&apos;s answer.
          </mark>{" "}
          Not ranked on a search results page. Not featured in a snippet. Cited
          — by name, with a source link — inside the reply text when a user asks
          an LLM a question your business should answer.
        </p>
        <p>
          The structural shift is the surface area. In Google, the user types a
          query and sees 10 blue links. In an LLM, the user types a question and
          sees one synthesized answer that may or may not mention your brand. If
          you&apos;re not in the answer, you might as well not exist. There are
          no &quot;page two&quot; consolations.
        </p>

        <h2>How LLMs actually answer your customer&apos;s question</h2>
        <p>
          The mechanism that matters:{" "}
          <strong>retrieval-augmented generation</strong> (RAG). When a user
          asks ChatGPT or Perplexity a question that requires fresh, factual, or
          local information, the model runs a web search, retrieves the top 5–10
          results, reads them, and synthesizes an answer that cites a subset of
          those sources.
        </p>
        <p>
          The retrieval step is doing most of the work. The model isn&apos;t
          choosing your business because it &quot;knows&quot; you. It&apos;s
          choosing your page because:
        </p>
        <ol>
          <li>Your page ranked in the retrieval search</li>
          <li>The retrieved snippet contained a clear, citable claim</li>
          <li>The claim matched the user&apos;s question</li>
          <li>
            The model trusted the source (domain authority, freshness,
            structured data)
          </li>
        </ol>
        <p>
          Four steps. AEO works on all four, with different leverage. SEO mostly
          works on step one. That&apos;s the entire difference.
        </p>

        <h2>What the five AEO things SkynetLabs actually ships</h2>

        <h3>One: speakable, extractable answer blocks</h3>
        <p>
          Every page on a SkynetLabs-built site has at least one TL;DR block — a
          2-4 sentence summary near the top, tagged with
          <code>data-speakable=&quot;true&quot;</code> and matching a common
          user question phrasing. The LLM&apos;s retrieval picks these up
          cleanly because they&apos;re short, declarative, and contain the
          entity name + the claim in the same sentence.
        </p>
        <p>
          A bad answer block:{" "}
          <em>
            &quot;We provide premium services to businesses of all sizes.&quot;
          </em>{" "}
          Zero useful claims. Won&apos;t get cited.
        </p>
        <p>
          A good answer block:{" "}
          <em>
            &quot;SkynetLabs builds n8n + GoHighLevel + Signal automation
            systems for service businesses. Public pricing starts at $1,497,
            ships in 14 days, founder-led by Waseem Nasir from Canggu,
            Bali.&quot;
          </em>{" "}
          Three concrete claims, one named entity, geo-tag, founder name. Easy
          to cite.
        </p>

        <h3>Two: structured data that mirrors the answer schema</h3>
        <p>
          Every page ships with JSON-LD for the relevant schema.org type —
          Service, FAQPage, BlogPosting, HowTo, LocalBusiness. The critical bit
          isn&apos;t the schema existing; it&apos;s that the structured data{" "}
          <em>matches</em> the user-facing content. LLMs can detect mismatches
          and discount the page.
        </p>
        <p>
          The schemas that move the needle: <code>FAQPage</code> (because the
          LLM is literally answering a question), <code>HowTo</code>
          (for procedural queries), <code>Service</code> with
          <code> areaServed</code> and <code>priceRange</code> (because LLMs
          love location and price specifics), <code>Person</code>
          with <code>sameAs</code> linking to LinkedIn and GitHub (entity
          disambiguation).
        </p>

        <h3>Three: entity grounding</h3>
        <p>
          LLMs disambiguate entities by their cross-references. If &quot;Waseem
          Nasir&quot; the SkynetLabs founder is linked from a LinkedIn profile
          that links to a YouTube channel that links back to skynetjoe.com, the
          model can confidently identify the entity. If those links are missing
          or broken, the model treats the name as ambiguous and demotes
          citations.
        </p>
        <p>
          On a SkynetLabs build we wire up the <code>sameAs</code> graph on
          every page that mentions a person, a place, or a product. Every named
          client gets a backlink from a case study to their live site. Every
          author bio links to LinkedIn and a public GitHub. The graph is the
          moat.
        </p>

        <h3>Four: freshness signals</h3>
        <p>
          LLMs that do live retrieval (ChatGPT&apos;s web mode, Perplexity,
          Claude with web search) heavily favor content with recent
          <code> dateModified</code> values. We update the modified date on key
          pages monthly, even if the content change is small. A page that says
          &quot;updated October 2026&quot; ranks higher in retrieval than the
          same content with a 2024 date stamp.
        </p>
        <p>
          The frequency matters. Quarterly is enough. Monthly is better.
          Anything more is hygiene theater.
        </p>

        <h3>Five: domain-level authority + topical coherence</h3>
        <p>
          A site that publishes one blog post a month on twelve unrelated topics
          will not rank in retrieval. A site that publishes the same volume but
          narrowly focused — say, a dozen pieces on GoHighLevel automation —
          will get cited as an authority on GoHighLevel.
        </p>
        <p>
          This is unintuitive because it&apos;s the opposite of the traditional
          SEO advice (&quot;cover broad search intent&quot;). For AEO, the rule
          is the opposite:{" "}
          <strong>be the deepest source on a narrow topic</strong>, not the
          broadest source on a wide one.
        </p>

        <h2>Three things AEO is not</h2>
        <p>
          Now the deletion list. These are the things I see agencies sell as AEO
          that are either useless or actively harmful.
        </p>
        <p>
          <strong>One: keyword stuffing for &quot;LLM keywords.&quot;</strong>
          There&apos;s no such thing. LLMs don&apos;t use TF-IDF the way
          traditional search does. Repeating a phrase 15 times in a paragraph
          signals manipulation, not authority. The retrieval step is mostly
          about whether your sentence answers the question, not whether it
          contains the magic word eight times.
        </p>
        <p>
          <strong>
            Two: paying for &quot;AEO directory submissions.&quot;
          </strong>
          The whole point of LLM retrieval is that the model picks high-quality
          sources. Cheap directory listings have negative authority. Avoid.
        </p>
        <p>
          <strong>Three: schema markup as a deliverable.</strong> Schema markup
          is table-stakes hygiene, like having an HTTPS certificate. Selling it
          as a $400/month line item is selling table salt at steakhouse prices.
        </p>

        <h2>How to measure if AEO is working</h2>
        <p>
          The traditional tools don&apos;t measure this yet. Google Search
          Console shows you nothing about LLM citations. Ahrefs and Semrush are
          catching up but the data is sparse.
        </p>
        <p>The honest measurement loop, today:</p>
        <ol>
          <li>
            Maintain a list of 15-25 questions your customer would ask an LLM at
            the start of their buying journey.
          </li>
          <li>
            Run that list against Claude, ChatGPT, and Perplexity weekly. Log
            which answers cite you and which don&apos;t.
          </li>
          <li>
            Track citation rate (cited / queried) and position (first mention
            vs. third) over time.
          </li>
        </ol>
        <p>
          We do this for clients via a small Claude API harness that runs weekly
          and writes results to a Notion table. Total cost: under $5/month in
          API tokens per client. Total insight: you can see a citation rate
          improve from 8% to 34% within two months of shipping the AEO fixes.
        </p>
        <div className="margin-note">the measurement loop is the moat</div>

        <h2>The thing nobody&apos;s saying out loud</h2>
        <p>
          AEO is a smaller market than SEO and probably always will be. The
          dominant LLM interfaces today route maybe 5-15% of search-like
          queries, depending on whose data you trust. That share is growing, but
          it&apos;s not replacing Google overnight.
        </p>
        <p>
          So the right framing is: AEO is the new SEO frontier where the
          competition is sparse and the leverage is high, not the replacement
          for SEO. The brands that win the next three years will do both — keep
          ranking in Google for the 85% of queries that still go there, and
          dominate citations in the 15% that now go to LLMs.
        </p>
        <p>
          Doing both is the same writer, the same content team, the same schema.
          The work is 80% overlapping. Anyone telling you AEO requires a
          separate retainer and a separate strategy is selling you a new line
          item, not a new capability.
        </p>

        <h2>If you want the audit</h2>
        <p>
          The free 15-minute audit looks at your top 20 buyer-journey questions,
          queries them against the three major LLMs, and gives you a
          citation-rate baseline plus the three highest-leverage fixes. No deck.
          No retainer pitch. Yes, no, or referral.
        </p>
      </LetterArticle>
    </>
  );
}
