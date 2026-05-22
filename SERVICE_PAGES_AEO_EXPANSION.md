# Service Pages AEO Expansion — 2026-05-22

**Goal:** Apply the same direct-answer + FAQPage AEO pattern from the prior 5-page pass to the remaining 11 service pages.
**Architecture confirmed:** Dynamic `[slug]` route at `src/app/services/[slug]/page.tsx` reads `content/services/<slug>.html`. Edits made to HTML files only (not to the page component or `src/lib/site.ts`).
**Pattern used:** `<aside aria-label="Direct answer">` inserted inside `<header class="wn-hero">` right after `<div class="wn-cta-row">` (matches prior n8n/ai-chatbots/gohighlevel/wordpress-seo/ai-business-systems pattern). FAQPage JSON-LD node appended to existing `@graph` array in the `<script type="application/ld+json">` tag.

## Pages updated (11 / 11)

| Slug | Direct-answer block | FAQ count |
|---|---|---|
| ai-video | yes (≤80 words) | 4 |
| youtube-automation | yes | 4 |
| tiktok-automation | yes | 4 |
| facebook-automation | yes | 4 |
| social-automation | yes | 4 |
| ai-content-creation | yes | 4 |
| ecommerce-automation | yes | 4 |
| vibe-coded-sites | yes | 4 |
| zapier-make | yes | 4 |
| strategy-training | yes | 4 |
| branding-design | yes | 4 |

All direct-answer blocks follow the locked pattern: noun phrase first, definition, who it serves, SkynetLabs differentiator, price floor. All FAQs cover real long-tail buyer queries (cost, comparison, "do I need X if I already have Y", timeline, differentiation).

## Untouched

- The 5 already-done pages: `n8n-automation`, `gohighlevel`, `ai-chatbots`, `wordpress-seo`, `ai-business-systems`.
- `src/lib/site.ts` and the `[slug]/page.tsx` route component (no change needed — content lives in the HTML files).

## Build status

`npm run build` — **PASS**. 870 static pages generated (16 service slugs × 48 states + 14 case studies + flat pages). TypeScript clean. No schema validation errors thrown at build time.

## Verification suggestions (post-deploy)

- Google Rich Results Test on any of the 11 new pages for FAQPage validity.
- Schema.org validator on the `@graph` JSON-LD to confirm Service + Offer + FAQPage all co-exist cleanly.
- Manual: query Claude/ChatGPT "what is YouTube automation" and "how much does TikTok automation cost" in 14-21 days — check for citation lift.
