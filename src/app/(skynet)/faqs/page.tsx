import Link from "next/link";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation FAQs — 30 Questions Answered",
  description:
    "Real founder questions about n8n, Zapier, AEO/SEO, chatbots, live chat, and working with SkynetLabs. Honest answers — including when the answer is 'don't hire us.'",
  alternates: { canonical: `${SITE.url}/faqs` },
  openGraph: {
    title: "AI Automation FAQs — 30 Questions Answered",
    description:
      "30 real founder questions on n8n, AEO, chatbots, and working with SkynetLabs. Concrete answers, no hedging.",
    url: `${SITE.url}/faqs`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
};

// Top-level FAQs surfaced for FAQPage schema. The full 30 live in SECTIONS
// below; these 6 are the most common and act as the citation surface.
const TOP_FAQS = [
  {
    q: "What's the difference between n8n and Zapier?",
    a: "n8n is open-source, self-hostable, and unmetered (you pay for the server). Zapier is SaaS-only with per-task pricing. For >10k runs/month or self-hosting requirements, n8n wins on cost; for <1k runs/month with non-technical owners, Zapier is faster to deploy.",
  },
  {
    q: "How long does a typical build take?",
    a: "Most SkynetLabs builds ship in 5 to 14 days from kickoff. Starter scopes ($1,497) ship in 5 days; flagship sites and full automation systems ($9,500) ship in 10 to 14 days.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, we sign yours. We don't ask you to sign ours. NDA review takes 24 to 48 hours; we recommend skipping NDAs for sub-$5k engagements to keep velocity up.",
  },
  {
    q: "What does AEO mean?",
    a: "AEO stands for Answer Engine Optimization. It's the practice of structuring content so LLM-powered answer engines (Claude, ChatGPT, Perplexity, Gemini) cite your site as a source when users ask questions in your domain.",
  },
  {
    q: "Do you work with US clients from Bali?",
    a: "Yes. We work async-first with all US time zones. Bali is GMT+8, so US morning meetings land in our afternoon — async handoffs keep velocity high. We've shipped to clients in 9 countries.",
  },
  {
    q: "How much does a WhatsApp chatbot cost?",
    a: "WhatsApp chatbot builds start at $1,497 for a single-flow bot (booking, FAQ, lead capture) and scale to $9,500 for multi-agent voice + WhatsApp systems with CRM integration. WhatsApp Business API hosting is separate (~$5–50/month).",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE.url}/faqs`,
  inLanguage: "en",
  mainEntity: TOP_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
  publisher: { "@id": `${SITE.url}/#organization` },
};

// The full 30 questions, grouped by section. Anchors (id) preserved from the
// previous HTML content so existing deep links keep working.
type Faq = { q: string; a: React.ReactNode };
type Section = { id: string; title: string; faqs: Faq[] };

const SECTIONS: Section[] = [
  {
    id: "pricing",
    title: "Pricing & Process",
    faqs: [
      {
        q: "How fast can a 5-step n8n workflow be shipped?",
        a: "Five to seven business days end-to-end if you have credentials ready (API keys, OAuth, sample data) on day one. Three days of build, one day of test with real payloads, one day for you to dogfood it before we flip it live. If you have to chase a vendor's IT team for an API key, the clock pauses — that wait is the bottleneck in 80% of projects, not the building.",
      },
      {
        q: "What does a typical engagement look like from inquiry to launch?",
        a: (
          <>
            Day 0 you fill the brief. Day 1 we send a Loom walking through
            scope, edge cases, and what we&apos;re <em>not</em> doing. Day 2-3
            you approve, send credentials, and we kick off. Day 4-10 we build in
            a shared Notion with daily 60-second progress videos. Day 11-14 you
            run live with real data while we sit on standby. Total: 14 days for
            one workflow, 21-28 for a bundle of three. No discovery calls longer
            than 45 minutes.
          </>
        ),
      },
      {
        q: "Do you do fixed-price or hourly?",
        a: "Fixed-price per workflow or per site. Hourly billing rewards slow building — it's bad for both sides. A 5-step n8n automation is a fixed scope: trigger, transform, branch, action, log. We quote it, write it, ship it. If scope changes mid-build, we send a change order with a new fixed number before continuing.",
      },
      {
        q: "What's your minimum project size?",
        a: "One workflow, one website, or one chatbot. We don't do \"an hour of help\" gigs — context-switching costs more than the hour pays. If you need a 20-minute tweak to an existing automation we already built, that's included in a 30-day handover window. After that we move you to a small retainer.",
      },
      {
        q: "Do you offer ongoing support or just one-time builds?",
        a: "Both. Every build includes a 30-day bug-fix window. After that you pick: no retainer (we're on standby at hourly), light retainer (4 hours per month, monitoring + small tweaks), or growth retainer (16+ hours, new flows and optimization). Most clients pick light retainer for the first quarter then upgrade once the wins compound.",
      },
      {
        q: "Can I see real work before paying?",
        a: (
          <>
            Yes. <Link href="/case-studies">/case-studies</Link> has anonymized
            writeups of shipped projects with screenshots, n8n graph exports,
            and outcome metrics. For specific stacks (HIPAA, Shopify, healthcare
            scheduling) we send a 5-minute Loom walking through a live build we
            own. We do not share client production URLs without their consent.
          </>
        ),
      },
    ],
  },
  {
    id: "n8n",
    title: "n8n & Automation",
    faqs: [
      {
        q: "What's the difference between n8n and Zapier and when do I pick which?",
        a: "Zapier is rented infrastructure with a polished UI; n8n is self-hostable infrastructure with a less polished UI. Pick Zapier if you have one or two simple flows, no engineers, and zero interest in hosting anything. Pick n8n if you have more than five flows, any need for branching/loops, or you want to avoid per-task pricing that compounds. Above ~50K tasks/month, self-hosted n8n on a cheap VPS beats Zapier's bill by roughly a factor of 10.",
      },
      {
        q: "Can I migrate from Zapier to n8n without breaking running workflows?",
        a: "Yes, but do it one flow at a time. Export the Zapier zap as a screenshot map of steps, rebuild in n8n in parallel, run both for 48 hours with a comparison dashboard, then disable the Zapier version. Never bulk-migrate — you'll lose tribal knowledge about edge cases that lived in step descriptions. A typical 12-zap migration takes us 3 weeks.",
      },
      {
        q: "Do I need to self-host n8n or can I use n8n Cloud?",
        a: "n8n Cloud is fine until you hit one of three walls: you need IP allowlisting for an enterprise API, you need to run more than ~10 concurrent executions, or you want to write custom nodes in TypeScript. Self-host on a small Hetzner VPS with Docker + Caddy + Postgres takes 90 minutes to set up. We do this for every client who plans to run 10+ flows.",
      },
      {
        q: "How do I handle errors and retries properly in n8n?",
        a: "Three layers: workflow-level error trigger (catches uncaught exceptions, sends to Slack), node-level \"continue on fail\" with a branched error path that logs to a Postgres table, and a daily cron that re-runs anything in the error table within a retry window. Never just rely on n8n's default retry — it doesn't handle webhook idempotency, so you can double-charge a customer if you're not careful.",
      },
      {
        q: "What's queue mode and when do I need it?",
        a: "Queue mode separates the n8n main process from worker processes using Redis as the broker. You need it when a single execution can take longer than your webhook timeout, when you process more than ~1K executions/hour, or when you want zero-downtime restarts. For a one-VPS setup with light traffic, regular mode is fine — don't over-engineer.",
      },
      {
        q: "Can n8n call OpenAI / Anthropic / Gemini APIs reliably?",
        a: (
          <>
            Yes — there are first-party LLM nodes plus generic HTTP request
            nodes for anything not yet wrapped. The real reliability question
            is: what do you do when the LLM returns malformed JSON? We always
            parse with a try/catch in a Code node, fall back to a smaller model
            on first failure, and log the bad output to Postgres for prompt
            iteration. Don&apos;t trust LLM output to be schema-valid without
            verification.
          </>
        ),
      },
    ],
  },
  {
    id: "aeo",
    title: "AEO / SEO",
    faqs: [
      {
        q: "Why does Google's AI Overview ignore my product page?",
        a: "Three usual culprits: your page lacks structured data that maps to the entities Google's ranking models care about (Product, Offer, FAQPage), your content reads like sales copy instead of answering a question directly in the first 80 words, and you have no external mentions on sites that LLMs treat as authoritative (Wikipedia, Reddit, niche industry forums). Fix all three before blaming the algorithm.",
      },
      {
        q: "What's the difference between SEO, AEO, and GEO?",
        a: "SEO optimizes for the ten blue links — keyword targeting, backlinks, page speed. AEO (Answer Engine Optimization) optimizes for LLM chat answers — Claude, ChatGPT, Perplexity, Gemini citing you in a generated paragraph. GEO (Generative Engine Optimization) is a near-synonym for AEO that some agencies use to sound new. They share fundamentals but the surface area is different: AEO rewards definitions, lists, comparison tables, and clear authorship.",
      },
      {
        q: "Should I block GPTBot and ClaudeBot in robots.txt?",
        a: "Only if you sell your content as the product (paywalled news, paid research). For a service business, blocking them is shooting yourself in the foot — you want LLMs to scrape, index, and cite you. Add an llms.txt file explicitly listing what you allow them to use. The ROI of one citation in a Perplexity answer outweighs the marginal cost of being scraped.",
      },
      {
        q: "How long until AEO efforts show citations?",
        a: "Two to twelve weeks depending on freshness signals and how the four engines index. Perplexity tends to update fastest (often within 7 days of publishing). ChatGPT browse and Gemini take longer because they pull from Bing and Google Search indexes. Claude with web search now picks up new content within days. Track citation appearance in a sheet weekly — if nothing shows in 8 weeks, the issue is content quality, not patience.",
      },
      {
        q: "What is llms.txt and do I actually need it?",
        a: "llms.txt is a draft standard (proposed by Jeremy Howard) for a markdown index file at /llms.txt that tells LLMs which of your pages are canonical, citable, and structured for ingestion. It's not yet enforced by any major engine, but Claude, Perplexity, and a few others have started honoring it. Cost to add: 30 minutes. Upside: small but compounding. Yes, add one.",
      },
      {
        q: "Does schema markup still matter when LLMs read the whole page?",
        a: 'More than ever, because schema is how an LLM disambiguates entities. Without it, "Bali" could be the island, the type of cat, or a restaurant name. With Place + geo coordinates, the model knows. Schema is also a freshness signal: dateModified in JSON-LD is a heuristic LLMs use to prefer your version over a stale Reddit thread.',
      },
    ],
  },
  {
    id: "chatbots",
    title: "Chatbots & Messaging",
    faqs: [
      {
        q: "Should I build my chatbot on GPT-4 or Claude or Gemini?",
        a: (
          <>
            Use the model that wins on your specific evals, not the one with the
            loudest marketing. For tool-use heavy bots (booking, CRM updates)
            Claude tends to lead on instruction following. For long-context
            document Q&amp;A, Gemini&apos;s 2M context is hard to beat. For raw
            price-per-token on simple replies, Haiku and Gemini Flash are both
            cheap. Build with the SDK that lets you swap providers in 10
            minutes.
          </>
        ),
      },
      {
        q: "How do I keep a chatbot from hallucinating about my pricing?",
        a: 'Don\'t let the model generate prices freely. Put pricing in a structured tool call: the bot asks "do you want pricing for X?" then calls a function that returns the current price from your CMS or a static JSON file. The model only paraphrases — it never invents. We use this pattern on every commerce-adjacent bot we ship.',
      },
      {
        q: "What's RAG and when do I actually need it?",
        a: "RAG (Retrieval-Augmented Generation) means the bot searches your knowledge base first, then passes relevant chunks to the LLM as context. You need it when your content base is bigger than ~30K tokens (the comfort zone for stuffing everything into a system prompt). For a 50-page FAQ, a 500-row product table, or a year of email transcripts, RAG with a vector DB like Qdrant or Postgres + pgvector is the right call.",
      },
      {
        q: "How do I integrate a chatbot with Meta's messaging APIs properly?",
        a: "Use the official Meta Cloud API via Business Manager — not unofficial wrappers that get your number banned. Verify your business, get a template message approved for outbound, then use freeform replies inside the 24-hour session window. For automation, route inbound through n8n or a custom webhook that decides: send to LLM, send to human, send to template. Approval for the first template takes 1-2 days.",
      },
      {
        q: "Can a chatbot handle bookings and payment without a human?",
        a: "Yes for low-ticket transactions (small average order). Above the impulse-purchase threshold, conversion drops because buyers want at least one human touchpoint before committing. Our pattern: bot qualifies and books a 15-minute call, human closes. For services where the customer already knows what they want (haircut appointment, dental cleaning), bot can close end-to-end — we've shipped these.",
      },
      {
        q: "How do I measure if a chatbot is actually working?",
        a: "Three metrics, not vanity ones. Containment rate: % of conversations the bot resolves without human handoff. Goal conversion rate: % of conversations that hit your defined outcome (booking, lead capture, purchase). CSAT or thumbs-up rate per conversation. Track these weekly. If containment is over 60% and CSAT is over 4/5, the bot is working. Below either, the bot is making your service worse.",
      },
    ],
  },
  {
    id: "working",
    title: "Working with SkynetLabs",
    faqs: [
      {
        q: "Who actually does the work?",
        a: "Waseem Nasir leads every project. For larger builds a senior partner handles video/visual work. We don't subcontract to junior offshore teams — if you hire SkynetLabs you get the founder on Slack. This caps how many projects we run concurrently (4-6 at a time). When the queue is full we say so and propose a start date.",
      },
      {
        q: "What time zone do you work in?",
        a: 'Bali (UTC+8) currently. Overlap windows: 7am-12pm GMT, 2pm-7pm EST, all day APAC. We schedule sync calls in your window when possible. Async is the default — daily Loom updates, shared Notion, message-when-needed. Most clients prefer this once they realize they don\'t need to "meet" to get progress.',
      },
      {
        q: "Do you sign NDAs?",
        a: "Yes — happy to sign your standard NDA before scope discussion. We also have our own one-pager mutual NDA we can send if you don't have one ready. We don't sign non-competes that prevent working in your industry — that's how agencies lose the ability to take any client and we'd rather walk away than agree.",
      },
      {
        q: "What happens if a project goes sideways?",
        a: "We've shipped 180+ workflows and 40+ websites — projects do occasionally go sideways. The protocol: we call it out the same day, propose a fix in writing within 24 hours, and if the fix is our fault we eat the cost. If the issue is scope creep or third-party blocker, we send a change order. We don't ghost. We don't blame the client. We've issued a refund twice in three years; both came with a written postmortem.",
      },
      {
        q: "Can you work with my existing developer / agency?",
        a: "Yes, often. We slot in as the automation/AEO specialist while your dev handles the main product. We document everything in your tools (your Linear, your Notion, your Slack) so there's no handover tax later. We've co-shipped with internal teams in 12 of the last 30 projects.",
      },
      {
        q: "What if I'm not technical at all?",
        a: "Fine — most clients aren't. We translate every decision into outcomes (\"this saves 4 hours of manual data entry per week\") and document the build in plain English. After ship, you get a 20-minute walkthrough video and a one-page operations doc. You should be able to explain what your automation does to a friend over coffee. If you can't, we didn't document it well enough.",
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div className="sky">
        <header className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                Real founder questions&nbsp;· <strong>30 answered</strong>
              </div>

              <h1>
                The questions founders actually <em>ask us.</em>
              </h1>

              <p className="hero-sub">
                Real questions sent by email, voice note, and DM — about n8n,
                Zapier, AEO/SEO, chatbots, and working with us.{" "}
                <strong>Honest answers</strong>, including when the answer is
                &quot;don&apos;t hire us.&quot;
              </p>

              <div className="cta-row">
                <Link
                  href={SITE.cta.href}
                  className="btn-primary"
                  data-meta-event="Schedule"
                  data-meta-name="faqs-book-audit"
                >
                  {SITE.cta.label} →
                </Link>
                <Link href="/contact" className="btn-line">
                  Ask a different question
                </Link>
              </div>
            </div>
          </div>
        </header>

        {SECTIONS.map((section, i) => (
          <section
            key={section.id}
            className={i % 2 === 1 ? "section tinted" : "section"}
          >
            <div className="wrap">
              <div className="section-head">
                <span className="section-kicker">{section.title}</span>
                <h2 id={section.id}>{section.title}</h2>
              </div>

              <div className="faq-wrap">
                {section.faqs.map((faq) => (
                  <details key={faq.q}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="closer">
          <span className="closer-scarcity">
            Didn&apos;t find your question?
          </span>
          <h2>
            Email it. We answer <em>everything</em> within 24 hours.
          </h2>
          <p>
            Bali time. No bots on the first reply — you get a real answer from
            the founder, including an honest &quot;that&apos;s not us.&quot;
          </p>
          <div className="cta-row">
            <Link
              href={SITE.cta.href}
              className="btn-primary"
              data-meta-event="Schedule"
              data-meta-name="faqs-closer-book-audit"
            >
              {SITE.cta.label} →
            </Link>
            <Link href="/contact" className="btn-line">
              Send us your question
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
