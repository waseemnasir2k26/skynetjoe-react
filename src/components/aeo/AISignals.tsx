/**
 * AISignals — head-injected meta tags + link rels that help LLM crawlers + AI search engines
 * understand site identity, content type, and citation preferences.
 */
import { SITE } from "@/lib/site";

export default function AISignals() {
  return (
    <>
      <link rel="alternate" type="text/plain" title="LLMs.txt" href="/llms.txt" />
      <link
        rel="alternate"
        type="text/plain"
        title="LLMs.txt Full Content"
        href="/llms-full.txt"
      />
      <link
        rel="alternate"
        type="application/json"
        title="LLMs JSON Feed"
        href="/api/llms-feed"
      />
      <link rel="alternate" type="text/plain" title="AI Policy" href="/ai.txt" />
      <meta name="ai-content-declaration" content="human-authored-with-ai-assist" />
      <meta name="author" content={SITE.founder} />
      <meta name="publisher" content={SITE.brand} />
      <meta name="citation_author" content={SITE.founder} />
      <meta name="citation_publisher" content={SITE.brand} />
      <meta name="generator" content={`${SITE.brand} on Next.js 16`} />
      <meta property="og:site_name" content={SITE.brand} />
      <meta name="format-detection" content="telephone=no" />
    </>
  );
}
