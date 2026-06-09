import Link from "next/link";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES, twitterFromOpenGraph } from "@/lib/site";
import { person, personRef, organization } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation & AEO Glossary — 50+ Terms Defined",
  description:
    "Working reference for the vocabulary that comes up when shipping LLM features, automation workflows, and content that gets cited by answer engines. 50+ terms, plain definitions, no fluff.",
  alternates: { canonical: `${SITE.url}/glossary` },
  openGraph: {
    title: "AI Automation & AEO Glossary — 50+ Terms Defined",
    description:
      "50 definitions covering AEO, SEO, n8n, automation, LLMs, RAG, agents, schema markup. By Waseem Nasir, SkynetLabs.",
    url: `${SITE.url}/glossary`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: twitterFromOpenGraph({
    title: "AI Automation & AEO Glossary — 50+ Terms Defined",
    description:
      "50 definitions covering AEO, SEO, n8n, automation, LLMs, RAG, agents, schema markup. By Waseem Nasir, SkynetLabs.",
  }),
};

const termSetSchema = {
  "@type": "DefinedTermSet",
  "@id": `${SITE.url}/glossary#termset`,
  name: "AI Automation & AEO Glossary",
  description:
    "50 definitions covering AEO, SEO, n8n, automation, LLMs, RAG, agents, schema markup, and the vocabulary that comes up when shipping LLM features and content for answer engines.",
  url: `${SITE.url}/glossary`,
  inLanguage: "en",
  inDefinedTermSet: `${SITE.url}/glossary`,
  // Canonical author/publisher refs (M15).
  author: personRef,
  publisher: { "@id": `${SITE.url}/#organization` },
  hasDefinedTerm: [
    {
      name: "Action",
      description:
        "The end step of a workflow that produces a side effect — sending an email, writing to a database, calling an API.",
    },
    {
      name: "AEO",
      description:
        "Answer Engine Optimization — structuring content so LLM-driven engines cite you in generated responses.",
    },
    {
      name: "Agent",
      description:
        "An LLM-powered system that uses tools in a loop to accomplish multi-step goals.",
    },
    {
      name: "Answer Engine",
      description:
        "A search interface returning synthesized natural-language answers instead of a list of links.",
    },
    {
      name: "API",
      description:
        "Application Programming Interface — a defined contract for two systems to exchange data.",
    },
    {
      name: "Branching",
      description:
        "A workflow node that splits execution down two or more paths based on a condition.",
    },
    {
      name: "CCBot",
      description:
        "The user-agent string used by Common Crawl, the nonprofit web archive whose dataset trains a meaningful fraction of every major LLM.",
    },
    {
      name: "Chatbot",
      description:
        "A conversational interface that exchanges text or voice messages with a user.",
    },
    {
      name: "Citation",
      description:
        "A link or named reference inside an LLM-generated answer that attributes a claim to a source.",
    },
    {
      name: "ClaudeBot",
      description:
        "The user-agent string Anthropic uses when crawling the web for Claude's training and search features.",
    },
    {
      name: "CMS",
      description: "Content Management System — where editors author content.",
    },
    {
      name: "Condition",
      description:
        "A boolean check inside a workflow that decides whether to branch, skip, or continue.",
    },
    {
      name: "Cron",
      description:
        "A scheduled-trigger syntax originating from Unix that runs a job at fixed intervals.",
    },
    {
      name: "CRM",
      description:
        "Customer Relationship Management system holding the authoritative customer record.",
    },
    {
      name: "DefinedTerm",
      description:
        "A schema.org type used to mark up vocabulary entries in a glossary.",
    },
    {
      name: "EEAT",
      description:
        "Google's quality framework: Experience, Expertise, Authoritativeness, Trustworthiness.",
    },
    {
      name: "Embeddings",
      description:
        "Numerical vectors representing text meaning so similarity is computed by distance.",
    },
    {
      name: "ETL",
      description:
        "Extract, Transform, Load — the classical data-pipeline pattern.",
    },
    {
      name: "Fine-tuning",
      description:
        "Updating an LLM's weights on a domain-specific dataset to learn a style, format, or knowledge area.",
    },
    {
      name: "Function Calling",
      description:
        "The pattern where an LLM emits structured JSON describing a tool to invoke instead of free text.",
    },
    {
      name: "GEO",
      description: "Generative Engine Optimization — a near-synonym for AEO.",
    },
    {
      name: "GHL",
      description:
        "GoHighLevel — a bundled CRM, marketing automation, and white-label SaaS platform popular with agencies.",
    },
    {
      name: "Google-Extended",
      description:
        "A separate user-agent token Google introduced so site owners can allow Googlebot while blocking Google's AI training crawler.",
    },
    {
      name: "GPTBot",
      description:
        "OpenAI's user-agent for crawling sites to train and improve GPT models.",
    },
    {
      name: "HowTo",
      description:
        "A schema.org type for step-by-step instructions with structured properties for tools, supplies, and timing.",
    },
    {
      name: "Idempotency",
      description:
        "The property that running the same operation twice produces the same result as running it once.",
    },
    {
      name: "JSON-LD",
      description:
        "JSON for Linked Data — the structured-data format Google, Bing, and LLMs prefer for parsing schema.org markup.",
    },
    {
      name: "Knowledge Graph",
      description:
        "A structured database of entities and the relationships between them.",
    },
    {
      name: "LLM",
      description:
        "Large Language Model — a neural network trained on a large text corpus to predict the next token.",
    },
    {
      name: "llms.txt",
      description:
        "A draft standard for a markdown index file at /llms.txt telling LLMs which pages are canonical and citable.",
    },
    {
      name: "MCP",
      description:
        "Model Context Protocol — an open protocol for connecting LLM clients to external tools and data sources.",
    },
    {
      name: "Microdata",
      description:
        "An older inline format for structured data embedded directly in HTML attributes.",
    },
    {
      name: "n8n",
      description:
        "An open-source workflow automation platform with self-hosting, branching, code nodes, and a node library covering 400+ services.",
    },
    {
      name: "OAuth",
      description:
        "An authorization protocol letting a user grant a third-party app limited access without sharing their password.",
    },
    {
      name: "OpenAPI",
      description:
        "A specification format for describing REST APIs in a machine-readable YAML or JSON document.",
    },
    {
      name: "Observability",
      description:
        "Instrumenting a system so you can answer why it did that from logs, metrics, and traces without redeploying.",
    },
    {
      name: "PerplexityBot",
      description:
        "The user-agent Perplexity uses for crawling source pages it cites in answers.",
    },
    {
      name: "Prompt Engineering",
      description:
        "Writing inputs to an LLM that reliably produce useful outputs.",
    },
    {
      name: "Queue",
      description:
        "A data structure that holds pending work items so they can be processed asynchronously and in order.",
    },
    {
      name: "RAG",
      description:
        "Retrieval-Augmented Generation — fetching relevant documents from a knowledge base and passing them to an LLM as context.",
    },
    {
      name: "Rate Limiting",
      description:
        "A cap on how many requests an API will accept per time window.",
    },
    {
      name: "robots.txt",
      description:
        "A plain-text file at /robots.txt that tells crawlers which paths and user-agents are allowed or disallowed.",
    },
    {
      name: "Schema Markup",
      description:
        "Structured data following the schema.org vocabulary embedded as JSON-LD or microdata.",
    },
    {
      name: "Sitemap",
      description:
        "An XML file at /sitemap.xml listing every URL you want crawled, with lastmod timestamps.",
    },
    {
      name: "Structured Data",
      description:
        "Machine-readable annotation of page content following a known vocabulary.",
    },
    {
      name: "System Prompt",
      description:
        "The persistent instruction set prepended to every LLM conversation defining role, constraints, tone, and tool-use rules.",
    },
    {
      name: "Tool Use",
      description:
        "The capability for an LLM to invoke external functions during a conversation.",
    },
    {
      name: "Trigger",
      description:
        "The starting event of a workflow — a webhook, scheduled cron tick, new sheet row, or inbound email.",
    },
    {
      name: "User-agent",
      description:
        "The identifier string a crawler sends in HTTP request headers.",
    },
    {
      name: "Vector Database",
      description:
        "A database optimized for storing and querying embeddings by similarity.",
    },
    {
      name: "Webhook",
      description:
        "An HTTP POST sent from one system to another when an event happens.",
    },
    {
      name: "Webhook Signature",
      description:
        "A cryptographic hash sent in a header so the receiver can verify the webhook came from the expected sender.",
    },
    {
      name: "Workflow",
      description:
        "A defined sequence of trigger, actions, and conditions that automates a process.",
    },
  ].map((t) => ({ "@type": "DefinedTerm", ...t })),
};

// Emit the term set alongside the canonical #person / #organization so the
// author/publisher @id references resolve (M15).
const schema = {
  "@context": "https://schema.org",
  "@graph": [termSetSchema, person, organization],
};

// Glossary terms grouped by letter. `id` values preserved from the previous
// HTML content so existing deep links (#term-aeo etc.) keep working.
type Term = { id: string; name: string; def: string };
type Group = { letter: string; terms: Term[] };

const GROUPS: Group[] = [
  {
    letter: "A",
    terms: [
      {
        id: "term-action",
        name: "Action",
        def: "The end step of a workflow that produces a side effect — sending an email, writing to a database, calling an API. In n8n and Zapier, every flow is a chain of trigger plus one or more actions; the action is where the work actually lands.",
      },
      {
        id: "term-aeo",
        name: "AEO (Answer Engine Optimization)",
        def: "The practice of structuring content so LLM-driven answer engines (Claude, ChatGPT, Perplexity, Gemini) cite you in generated responses. AEO rewards direct definitions, structured data, comparison tables, and clear authorship over keyword density.",
      },
      {
        id: "term-agent",
        name: "Agent",
        def: "An LLM-powered system that uses tools (function calls, web browsing, code execution) in a loop to accomplish a goal that requires more than one inference step. An agent decides what to do next based on prior tool outputs; a chatbot just generates text replies.",
      },
      {
        id: "term-answer-engine",
        name: "Answer Engine",
        def: "A search interface that returns synthesized natural-language answers instead of (or alongside) a list of links. Perplexity, ChatGPT search, and Google's AI Overview are answer engines; classic Google is a search engine.",
      },
      {
        id: "term-api",
        name: "API",
        def: "An Application Programming Interface — a defined contract for two systems to exchange data. In automation, every integration is fundamentally an API call: read from this one, transform, write to that one.",
      },
    ],
  },
  {
    letter: "B",
    terms: [
      {
        id: "term-branching",
        name: "Branching",
        def: "A workflow node that splits execution down two or more paths based on a condition. Healthy automations branch early and merge late; flows that try to handle every case in one straight line become un-debuggable within months.",
      },
    ],
  },
  {
    letter: "C",
    terms: [
      {
        id: "term-ccbot",
        name: "CCBot",
        def: "The user-agent string used by Common Crawl, the nonprofit web archive whose dataset trains a meaningful fraction of every major LLM. Blocking CCBot removes you from future model training data — usually the wrong call for service businesses.",
      },
      {
        id: "term-chatbot",
        name: "Chatbot",
        def: "A conversational interface that exchanges text (or voice) messages with a user. Modern chatbots wrap an LLM with system prompts, tool use, and memory; older rule-based bots match keywords to canned replies.",
      },
      {
        id: "term-citation",
        name: "Citation",
        def: "A link or named reference inside an LLM-generated answer that attributes a claim to a source. Citations are the AEO equivalent of organic rankings: they drive clicks, brand exposure, and downstream trust.",
      },
      {
        id: "term-claudebot",
        name: "ClaudeBot",
        def: "The user-agent string Anthropic uses when crawling the web for Claude's training and search features. ClaudeBot respects robots.txt and llms.txt; allowing it is generally beneficial for AEO unless your content is paywalled.",
      },
      {
        id: "term-cms",
        name: "CMS",
        def: "A Content Management System — WordPress, Sanity, Contentful, Webflow, Strapi. The CMS is where editors author content; everything downstream (your site, your search index, your AEO surface) renders from what's stored there.",
      },
      {
        id: "term-condition",
        name: "Condition",
        def: "A boolean check inside a workflow that decides whether to branch, skip, or continue. Good automations log condition outcomes so you can audit why a record took the path it did three months later.",
      },
      {
        id: "term-cron",
        name: "Cron",
        def: "A scheduled-trigger syntax (originating from Unix) that runs a job at fixed intervals: every five minutes, every Monday at 9am, the first of the month at midnight. In n8n it's the Schedule Trigger; in serverless platforms it's a cron job.",
      },
      {
        id: "term-crm",
        name: "CRM",
        def: "A Customer Relationship Management system — HubSpot, Salesforce, Pipedrive, GoHighLevel. The CRM holds the authoritative customer record; automations either feed it (new lead capture) or read from it (personalized outreach).",
      },
    ],
  },
  {
    letter: "D",
    terms: [
      {
        id: "term-defined-term",
        name: "DefinedTerm",
        def: "A schema.org type used to mark up vocabulary entries in a glossary so search engines and LLMs can parse them as structured definitions. Pairing DefinedTerm with DefinedTermSet (this page) is one of the cleanest AEO patterns.",
      },
    ],
  },
  {
    letter: "E",
    terms: [
      {
        id: "term-eeat",
        name: "EEAT",
        def: "Google's quality framework: Experience, Expertise, Authoritativeness, Trustworthiness. Originally an SEO ranking signal, EEAT has bled into LLM ranking heuristics — authored content by named humans with verifiable credentials outranks anonymous content.",
      },
      {
        id: "term-embeddings",
        name: "Embeddings",
        def: "Numerical vectors (usually 768 or 1536 dimensions) that represent the meaning of a piece of text in a way that lets you compute similarity by distance. Embeddings power semantic search, retrieval for RAG, and de-duplication of generated content.",
      },
      {
        id: "term-etl",
        name: "ETL",
        def: 'Extract, Transform, Load — the classical data-pipeline pattern. Pull data from a source, reshape it, push it to a destination. Most n8n workflows are small ETL jobs even when they\'re called "automations."',
      },
    ],
  },
  {
    letter: "F",
    terms: [
      {
        id: "term-fine-tuning",
        name: "Fine-tuning",
        def: "Updating an LLM's weights on a domain-specific dataset so it learns a style, format, or knowledge area you can't reliably get from prompting. Useful for narrow tasks with thousands of examples; almost always the wrong first move when prompting plus RAG would suffice.",
      },
      {
        id: "term-function-calling",
        name: "Function Calling",
        def: 'The pattern where an LLM emits a structured JSON object describing a tool to invoke (and arguments) instead of free text. Function calling is how chatbots cross from "generates text" to "does things in the real world."',
      },
    ],
  },
  {
    letter: "G",
    terms: [
      {
        id: "term-geo",
        name: "GEO (Generative Engine Optimization)",
        def: "A near-synonym for AEO used by some agencies to sound new. The tactics overlap heavily; the framing emphasizes optimizing for generative answers rather than answer engines specifically. Use whichever term your client uses.",
      },
      {
        id: "term-ghl",
        name: "GHL (GoHighLevel)",
        def: "A bundled CRM, marketing automation, and white-label SaaS platform popular with agencies. Has built-in workflow automation, SMS/email/voice, and a snapshot system for cloning client setups — strong for agencies, less flexible than n8n for engineering-heavy work.",
      },
      {
        id: "term-google-extended",
        name: "Google-Extended",
        def: "A separate user-agent token Google introduced so site owners can allow Googlebot (for Search) while blocking Google's AI training crawler. Setting User-agent: Google-Extended Disallow: / removes you from Bard/Gemini training while preserving Search visibility.",
      },
      {
        id: "term-gptbot",
        name: "GPTBot",
        def: "OpenAI's user-agent for crawling sites to train and improve GPT models. Respected by robots.txt directives. Most service businesses should allow GPTBot — being in training data is upstream of being cited.",
      },
    ],
  },
  {
    letter: "H",
    terms: [
      {
        id: "term-howto",
        name: "HowTo (schema)",
        def: "A schema.org type for step-by-step instructions, with structured properties for tools, supplies, and timing. HowTo markup is one of the strongest signals LLMs use to pick a source for procedural answers.",
      },
    ],
  },
  {
    letter: "I",
    terms: [
      {
        id: "term-idempotency",
        name: "Idempotency",
        def: "The property that running the same operation twice produces the same result as running it once. Webhooks must be idempotent or retries will double-charge customers, send duplicate emails, and create duplicate database rows. Always pass an idempotency key.",
      },
    ],
  },
  {
    letter: "J",
    terms: [
      {
        id: "term-jsonld",
        name: "JSON-LD",
        def: "JSON for Linked Data — the structured-data format Google, Bing, and LLMs prefer for parsing schema.org markup. Goes in a script tag with type application/ld+json. Easier to maintain than microdata or RDFa because it's separate from your visible HTML.",
      },
    ],
  },
  {
    letter: "K",
    terms: [
      {
        id: "term-knowledge-graph",
        name: "Knowledge Graph",
        def: "A structured database of entities (people, places, organizations, concepts) and the relationships between them. Google has one; LLMs build implicit ones from training data. Getting your entities into the right relationships is core AEO work.",
      },
    ],
  },
  {
    letter: "L",
    terms: [
      {
        id: "term-llm",
        name: "LLM",
        def: "Large Language Model — a neural network trained on a large text corpus to predict the next token given prior tokens. Modern LLMs (GPT-4, Claude, Gemini) add instruction tuning, RLHF, and tool use on top of that base capability.",
      },
      {
        id: "term-llms-txt",
        name: "llms.txt",
        def: "A draft standard (proposed by Jeremy Howard) for a markdown index file at /llms.txt that tells LLMs which of your pages are canonical, citable, and structured for ingestion. Adoption is partial; cost to add is 30 minutes and the upside is compounding.",
      },
    ],
  },
  {
    letter: "M",
    terms: [
      {
        id: "term-mcp",
        name: "MCP (Model Context Protocol)",
        def: "An open protocol introduced by Anthropic for connecting LLM clients to external tools, data sources, and services. MCP standardizes the function-calling contract across providers so a single tool server works with Claude, ChatGPT, and other compatible clients.",
      },
      {
        id: "term-microdata",
        name: "Microdata",
        def: "An older inline format for structured data, embedded directly in HTML attributes (itemscope, itemtype, itemprop). Still parsed by Google but harder to maintain than JSON-LD; new sites should pick JSON-LD.",
      },
    ],
  },
  {
    letter: "N",
    terms: [
      {
        id: "term-n8n",
        name: "n8n",
        def: 'An open-source workflow automation platform with self-hosting, branching, code nodes, and a node library covering 400+ services. Pronounced "nodemation." Built around a fair-code license that allows self-hosting for free but restricts commercial resale.',
      },
    ],
  },
  {
    letter: "O",
    terms: [
      {
        id: "term-oauth",
        name: "OAuth",
        def: "An authorization protocol (currently OAuth 2.0) that lets a user grant a third-party app limited access to their account without sharing their password. Most modern API integrations use OAuth; the token-refresh dance is where many automation bugs live.",
      },
      {
        id: "term-openapi",
        name: "OpenAPI",
        def: "A specification format (formerly Swagger) for describing REST APIs in a machine-readable YAML or JSON document. Tools generate clients, docs, and validators from OpenAPI; LLMs can call an API directly given its OpenAPI spec.",
      },
      {
        id: "term-observability",
        name: "Observability",
        def: 'The discipline of instrumenting a system so you can answer "why did it do that" from logs, metrics, and traces — without redeploying. For automations, observability means structured logs at every node and an alert when error rate exceeds a threshold.',
      },
    ],
  },
  {
    letter: "P",
    terms: [
      {
        id: "term-perplexitybot",
        name: "PerplexityBot",
        def: "The user-agent Perplexity uses for crawling source pages it cites in answers. Perplexity tends to update its index fastest of the major answer engines — sometimes within 7 days of publishing — so allowing PerplexityBot has the quickest AEO payoff.",
      },
      {
        id: "term-prompt-engineering",
        name: "Prompt Engineering",
        def: "The practice of writing inputs to an LLM that reliably produce useful outputs. Includes role assignment, few-shot examples, output schemas, chain-of-thought scaffolding, and negative instructions. A discipline, not a hack — the difference between a flaky bot and a reliable one is mostly prompt quality.",
      },
    ],
  },
  {
    letter: "Q",
    terms: [
      {
        id: "term-queue",
        name: "Queue",
        def: "A data structure that holds pending work items so they can be processed asynchronously and in order. In n8n, queue mode uses Redis to decouple workflow scheduling from execution; in any production automation, a queue is what prevents one slow job from blocking everything.",
      },
    ],
  },
  {
    letter: "R",
    terms: [
      {
        id: "term-rag",
        name: "RAG (Retrieval-Augmented Generation)",
        def: 'The pattern of fetching relevant documents from a knowledge base and passing them to an LLM as context before generation. Solves the "model doesn\'t know my data" problem without fine-tuning. Most production chatbots are RAG systems wearing different UI.',
      },
      {
        id: "term-rate-limiting",
        name: "Rate Limiting",
        def: "A cap on how many requests an API will accept per time window. Production automations must respect rate limits with exponential backoff, queue draining, and idempotent retries — otherwise you'll get IP-banned at the worst possible moment.",
      },
      {
        id: "term-robots-txt",
        name: "robots.txt",
        def: "A plain-text file at /robots.txt that tells crawlers which paths and user-agents are allowed or disallowed. Honored by ethical crawlers (Googlebot, GPTBot, ClaudeBot, PerplexityBot); ignored by scrapers. The first file every LLM crawler reads.",
      },
    ],
  },
  {
    letter: "S",
    terms: [
      {
        id: "term-schema-markup",
        name: "Schema Markup",
        def: "Structured data following the schema.org vocabulary — Product, Article, FAQPage, Organization, Person — embedded as JSON-LD or microdata. Schema markup tells search engines and LLMs what your page is about at the entity level.",
      },
      {
        id: "term-sitemap",
        name: "Sitemap",
        def: "An XML file at /sitemap.xml listing every URL on your site you want crawled, with lastmod timestamps. Sitemaps don't directly boost rankings but they make sure crawlers know what exists, especially deep pages with few internal links.",
      },
      {
        id: "term-structured-data",
        name: "Structured Data",
        def: 'Any machine-readable annotation of page content following a known vocabulary (schema.org being the dominant one). Structured data is the difference between "this page is about something" and "this page is about a Product called X with price Y and rating Z."',
      },
      {
        id: "term-system-prompt",
        name: "System Prompt",
        def: "The persistent instruction set prepended to every conversation with an LLM, defining role, constraints, tone, and tool-use rules. Live in version control like code, not in a Notion doc — they drift fast.",
      },
    ],
  },
  {
    letter: "T",
    terms: [
      {
        id: "term-tool-use",
        name: "Tool Use",
        def: "The capability for an LLM to invoke external functions (search, calculator, database query, custom API) during a conversation. Tool use plus a reasoning loop is what turns a chatbot into an agent that can complete real-world tasks.",
      },
      {
        id: "term-trigger",
        name: "Trigger",
        def: "The starting event of a workflow — a webhook firing, a scheduled cron tick, a new row in a sheet, an inbound email. Every n8n or Zapier flow starts with exactly one trigger; everything downstream is reaction.",
      },
    ],
  },
  {
    letter: "U",
    terms: [
      {
        id: "term-user-agent",
        name: "User-agent",
        def: "The identifier string a crawler sends in HTTP request headers (GPTBot, ClaudeBot, PerplexityBot, Googlebot). robots.txt rules match against user-agent. Knowing the right strings is the foundation of controlling who reads your content.",
      },
    ],
  },
  {
    letter: "V",
    terms: [
      {
        id: "term-vector-db",
        name: "Vector Database",
        def: "A database optimized for storing and querying embeddings by similarity — Qdrant, Pinecone, Weaviate, Postgres with pgvector. The retrieval half of RAG runs here. For most projects under 1M documents, pgvector on your existing Postgres is the right answer.",
      },
    ],
  },
  {
    letter: "W",
    terms: [
      {
        id: "term-webhook",
        name: "Webhook",
        def: "An HTTP POST sent from one system to another when an event happens — new order, completed payment, form submission. Webhooks are how systems push data without you polling them; they require idempotency, signature verification, and timeouts to be production-safe.",
      },
      {
        id: "term-webhook-signature",
        name: "Webhook Signature",
        def: "A cryptographic hash (usually HMAC-SHA256 of the body using a shared secret) sent in a header so the receiver can verify the webhook came from the expected sender. Skipping signature verification is how attackers inject fake events into your CRM.",
      },
      {
        id: "term-workflow",
        name: "Workflow",
        def: "A defined sequence of trigger plus actions plus conditions that automates a process. In n8n, Zapier, Make, and GoHighLevel, workflow is the unit of automation. A clean workflow does one thing well; a messy workflow does seven things and breaks weekly.",
      },
    ],
  },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PRESENT = new Set(GROUPS.map((g) => g.letter));

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div className="sky">
        <header className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                AI · automation · AEO&nbsp;· <strong>50+ terms</strong>
              </div>

              <h1>
                Every term you&apos;ll hit shipping{" "}
                <em>AI &amp; automation.</em>
              </h1>

              <p className="hero-sub">
                A working reference for the vocabulary that comes up when you
                ship LLM features, automation workflows, and content that gets
                cited by answer engines.{" "}
                <strong>Three sentences, not three paragraphs.</strong>
              </p>

              <div className="cta-row">
                <Link
                  href={SITE.cta.href}
                  className="btn-primary"
                  data-meta-event="Schedule"
                  data-meta-name="glossary-book-audit"
                >
                  {SITE.cta.label} →
                </Link>
                <Link href="/faqs" className="btn-line">
                  Read the FAQs
                </Link>
              </div>

              <nav className="featured-in" aria-label="Jump to letter">
                {ALPHABET.map((letter) =>
                  PRESENT.has(letter) ? (
                    <span key={letter}>
                      <a href={`#letter-${letter.toLowerCase()}`}>{letter}</a>
                    </span>
                  ) : null,
                )}
              </nav>
            </div>
          </div>
        </header>

        {GROUPS.map((group, i) => (
          <section
            key={group.letter}
            className={i % 2 === 1 ? "section tinted" : "section"}
          >
            <div className="wrap">
              <div className="section-head">
                <span className="section-kicker">{group.letter}</span>
                <h2 id={`letter-${group.letter.toLowerCase()}`}>
                  {group.letter}
                </h2>
              </div>

              <div className="feature-row">
                {group.terms.map((term) => (
                  <div className="feat-card" id={term.id} key={term.id}>
                    <div className="feat-title">{term.name}</div>
                    <p className="feat-body">{term.def}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="closer">
          <span className="closer-scarcity">Missing a term?</span>
          <h2>
            Know the words. Then <em>let us ship the system.</em>
          </h2>
          <p>
            Definitions are free. The hard part is wiring LLMs, n8n, and AEO
            into a system that actually runs. That part we do in 5 to 14 days.
          </p>
          <div className="cta-row">
            <Link
              href={SITE.cta.href}
              className="btn-primary"
              data-meta-event="Schedule"
              data-meta-name="glossary-closer-book-audit"
            >
              {SITE.cta.label} →
            </Link>
            <Link href="/case-studies" className="btn-line">
              See real results
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
