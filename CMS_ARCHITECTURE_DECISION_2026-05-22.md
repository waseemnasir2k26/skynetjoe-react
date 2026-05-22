# CMS Architecture Decision — SkynetLabs (skynetjoe.com)

**Date:** 2026-05-22
**Author:** Research pass for Waseem Nasir
**Status:** Recommendation — awaiting founder confirmation before build
**Stack constraint:** Next.js **16.2.6** + React **19.2.4** + Vercel + Tailwind 4 (verified `app/package.json`)
**Critical project rule (`app/AGENTS.md`):** "This is NOT the Next.js you know" — Next 16 breaking changes mean any CMS that hasn't officially shipped Next 16 support is disqualified.

---

## TL;DR

| | Winner | 2nd place | Hard pass |
|---|---|---|---|
| Pick | **Payload CMS 3 (self-hosted)** | Sanity (free tier) | Keystatic, TinaCMS, Strapi, Custom-Supabase |
| Monthly cost | **$0** (Vercel hobby + Neon/Mongo free) → ~$25 when DB outgrows free tier | $0 free / $15 per seat after | — |
| Ship time | **~14–18 hrs total** | ~10–12 hrs | — |
| Top risk | Postgres free-tier cold start on Neon (1st request slow) | Vendor lock-in (GROQ + asset CDN) | — |

---

## Step 1 — Candidate evaluation

Criteria scoring: **5 = excellent, 1 = poor.** Compatibility with Next.js 16 is **gate** — any "no" = disqualified regardless of score.

### a) Payload CMS 3 — self-hosted, embedded admin

| Criterion | Score | Notes |
|---|---|---|
| Next.js 16 compat | ✅ **Gate pass** | Docs list `16.2.2+` officially. We're on 16.2.6. |
| Setup time | 4 | Single `npx create-payload-app` or manual mount at `/(payload)/admin`. Need a DB. |
| Monthly cost | 5 | Self-host MIT-licensed. Vercel hobby + Neon Postgres free (500MB) or MongoDB Atlas M0 free = **$0/mo** until ~5K docs. |
| Lock-in risk | 5 | Own your DB, own your code, MIT license. Export = pg_dump or mongoexport. |
| Editor UX | 5 | Lexical rich text, drafts, versions, live preview, autosave, scheduled publish — all built-in. |
| Schema flexibility | 5 | TypeScript-native collections + globals + blocks (page-builder pattern). Maps 1:1 to our Page/Service/CaseStudy/Post model. |
| SEO field control | 5 | Official `@payloadcms/plugin-seo` adds title/desc/OG/canonical + preview pill per doc. |
| Image handling | 4 | Built-in upload collection + image resize/crop/focal point. CDN = whatever storage adapter (S3/R2/Vercel Blob/UploadThing). |
| Auth + multi-user | 5 | Built-in auth, roles, access control functions per field/collection. |
| Webhooks → Vercel rebuild | 5 | `afterChange` hook → fetch revalidate endpoint or Vercel deploy hook. Trivial. |
| Migration from `content/*.html` + `src/lib/site.ts` | 4 | Write a one-shot Node migration script that reads our TS data → `payload.create()`. ~3 hrs. |
| AI assist | 3 | No first-party. Community `payload-ai` plugin exists (OpenAI/Anthropic). Easy DIY field-level "generate" buttons since admin is React. |
| Production cred | 5 | Microsoft, Mythical Society, Blue Origin docs, ESPN segment teams, Hello.com. **Acquired by Figma 2026-Q1** — stability ↑, indicates serious enterprise commitment. |

**Strengths for our case:** Admin lives at `/admin` *inside* the same Next.js 16 app — no separate deploy. TypeScript-first matches our codebase. Schema-as-code = git-tracked alongside `src/lib/site.ts`.

**Weaknesses:** Needs a Postgres or Mongo connection (free tier OK but cold-start latency on Neon). Vercel serverless requires storage adapter (Vercel Blob $0.15/GB stored or Cloudflare R2 free 10GB).

---

### b) Sanity — hosted, separate Studio

| Criterion | Score | Notes |
|---|---|---|
| Next.js 16 compat | ✅ Gate pass | `next-sanity` SDK is framework-agnostic fetch — works with any Next version. |
| Setup time | 5 | `npm create sanity@latest` + paste schemas. ~6 hrs to model + wire fetches. |
| Monthly cost | 5 free → 2 | Free tier covers us (20 users, 10K docs, 100GB bandwidth, 100GB assets). Once we hit 50 seats or need SSO, it's $15/seat or $1399/mo SSO addon. |
| Lock-in risk | 2 | **Content lives in Sanity's Content Lake.** Export via CLI is possible but GROQ queries don't port to anything else. Image URLs are sanity CDN. |
| Editor UX | 5 | Best-in-class. Portable Text, presence indicators, real-time collab, custom input components. |
| Schema flexibility | 5 | JS schema definitions, references, portable text, custom components. |
| SEO field control | 4 | No first-party SEO plugin; community ones exist; trivial to model. |
| Image handling | 5 | Best-in-class image pipeline + global CDN + on-the-fly transforms (`?w=800&fm=webp`). Hotspot/crop UI. |
| Auth + multi-user | 5 | Sanity-managed. Roles = Admin/Editor/Viewer (free tier). Custom roles paywalled. |
| Webhooks → Vercel | 5 | Native webhook UI. |
| Migration | 3 | Write `sanity import` NDJSON. Need to reshape every TS object. ~4 hrs. |
| AI assist | 5 | **Sanity AI Assist** included on free tier (1,000 credits/mo). Generate alt text, summarize, translate. |
| Production cred | 5 | PUMA, Figma (pre-acquisition), Cloudflare, Morning Brew, Mejuri, Loom (publicly stated). |

**Strengths:** Zero infra to manage. Image CDN solves our biggest pain. AI Assist is the only candidate with mature first-party AI for our content-heavy use case.

**Weaknesses:** Hard vendor lock. Studio is a *separate* SPA (can be mounted at `/studio` route inside Next, but is not really "of" the app — it's an embedded React app from a different package). Long-term cost cliff if we add 3+ editors with custom roles.

---

### c) Keystatic — file-based, git-backed

| Criterion | Score | Notes |
|---|---|---|
| Next.js 16 compat | ⚠️ **Unconfirmed** | Docs reference Next.js 14 app dir. No public statement on Next 16 + React 19. Likely works (App Router) but no SLA. **Disqualifying for production confidence.** |
| Setup time | 5 | `npm install @keystatic/core @keystatic/next @markdoc/markdoc`. |
| Monthly cost | 5 | 100% free, no Cloud required for basic use. |
| Lock-in risk | 5 | Content = MDX/JSON in your repo. Switch to anything else trivially. |
| Editor UX | 3 | Decent rich text (Markdoc). No real-time presence. No scheduled publish on git-mode without custom Action. |
| Schema flexibility | 4 | Collections + singletons. Field types are solid. |
| SEO field control | 4 | DIY in schema — easy. |
| Image handling | 2 | **Images commit to git repo as binary** unless Keystatic Cloud paid (pricing opaque). For an agency posting weekly case studies with hero images, repo will bloat fast. |
| Auth + multi-user | 3 | Auth = "anyone with write access to the GitHub repo." Fine for 1–3 trusted editors; awkward beyond. |
| Webhooks → Vercel | 5 | Every save = git commit = Vercel rebuild. Native. |
| Migration | 3 | Manual rewrite of TS → MDX. ~5 hrs. |
| AI assist | 1 | None. |
| Production cred | 3 | Thinkmill (creator), some indie agency sites. Not enterprise-proven. |

**Verdict:** Beautiful philosophy, but Next 16 uncertainty + binary-in-repo image storage kill it for our weekly-news use case.

---

### d) TinaCMS — file-based + cloud, visual editing

| Criterion | Score | Notes |
|---|---|---|
| Next.js 16 compat | ⚠️ Unconfirmed | Docs talk Next 13/14. Likely OK with workarounds, but the team has been slow on Next 15 migration historically. |
| Setup time | 3 | More moving parts (Tina Cloud auth + git backend + GraphQL layer). |
| Monthly cost | 3 | Free tier = **2 users only**, community support. Team = $24/mo for 4 users. Business = $249/mo. |
| Lock-in risk | 4 | Content = MD/JSON in repo. Tina Cloud is the GraphQL+auth layer. |
| Editor UX | 4 | Visual editing on the live page is the hero feature. Otherwise side-panel form. |
| Schema flexibility | 4 | Schema-defined collections + blocks. |
| SEO field control | 4 | DIY. |
| Image handling | 3 | Cloudinary integration on paid tiers, repo on free. |
| Auth + multi-user | 3 | Tina Cloud auth, 2 free / paid scales. |
| Webhooks → Vercel | 5 | Git commit triggers Vercel. |
| Migration | 3 | Same effort as Keystatic. |
| AI assist | 1 | "Coming soon" on all tiers — has been for 2+ years. |
| Production cred | 3 | Smashing Magazine (notable), some indie. |

**Verdict:** Visual editing is nice-to-have, but Next 16 risk + slow AI roadmap + 2-user free cap make it worse than Keystatic for our budget, and worse than Sanity for capability.

---

### e) Sanity vs Contentful vs Strapi — quick differential

- **Contentful:** Free tier capped at 5 users + 25K records, but starter plan jumps to **$300/mo**. Disqualified on cost cliff alone.
- **Strapi:** Open-source self-host, Node-based, has its own admin (separate from Next). Adds a second deployable surface. No Next.js 16 advantage over Payload, and Payload's Next-native embedding wins decisively for our single-Vercel-app constraint.
- Use this row only if Payload self-host hits a snag.

---

### f) Custom — Next.js admin route + Supabase

| Criterion | Score | Notes |
|---|---|---|
| Next.js 16 compat | ✅ Pass | We control everything. |
| Setup time | 1 | Building a CMS from scratch = **40–80 hrs minimum** before feature parity with Payload. |
| Monthly cost | 4 | Supabase free (500MB DB / 1GB storage) → $25/mo Pro when outgrown. Cheap, but you'd spend 60 hrs of build labor that Payload gives for free. |
| Lock-in risk | 5 | Postgres = portable. |
| Editor UX | 1 | Whatever you build. Rich text + media library + draft preview = weeks. |
| Schema flexibility | 5 | Anything. |
| SEO field control | 5 | DIY. |
| Image handling | 3 | Supabase Storage works; image transforms paywalled ($5/1000 origin). |
| Auth + multi-user | 4 | Supabase Auth solid. |
| Webhooks → Vercel | 4 | DIY trigger. |
| Migration | 3 | Same SQL work either way. |
| AI assist | 3 | DIY = bespoke; you can integrate Anthropic SDK directly. |
| Production cred | n/a | One-off. |

**Verdict:** Only worth it if Payload has a dealbreaker. Time-to-ship math doesn't work for a solo Bali founder shipping client work.

---

## Step 2 — Recommendation: **Payload CMS 3 (self-hosted on Vercel + MongoDB Atlas M0 free)**

Why Payload wins for *this* project, *this* week:

1. **Only candidate with official Next.js 16.2.2+ support.** Our `package.json` is on 16.2.6. Every other candidate is "probably works" — for a founder site that's *also* the agency's flagship demo, "probably" is unacceptable.
2. **Admin embeds in the same Next.js app at `/admin`.** One repo, one Vercel deployment, one set of env vars. No second SPA to babysit (kills Sanity Studio's deployment overhead and Strapi's separate-server pattern).
3. **TypeScript-native schemas** that live next to `src/lib/site.ts` — Waseem already thinks in TS-typed config. Migration from `src/data/case-studies.ts` is a `payload.create()` loop, not a re-modeling exercise.
4. **MIT-licensed, MongoDB Atlas M0 free tier (512MB, 5GB transfer) = $0/mo** for the foreseeable single-author phase. When we outgrow, $9/mo M10 or Neon Postgres $19/mo. Hard ceiling at $25–30/mo even at 2026-end scale.
5. **Figma acquisition (announced Q1 2026)** = backed by a 13-figure-valuation company. Lock-in risk *decreased* relative to a year ago; this is now safer than betting on Sanity's pricing roadmap.
6. **`@payloadcms/plugin-seo` ships exactly the SEO override model we need** (per-doc title/desc/OG/canonical, with live preview pill) — solves the biggest pain in our SEO-AUDIT docs.
7. **Lexical rich text + drafts + scheduled publish + revisions** out of the box — the news system (`/news`) requirement is satisfied without bolting on libraries.

**Dealbreakers I checked and cleared:**
- React 19 — Payload 3 ships React 19 components in the admin. No conflict.
- Vercel serverless cold starts — admin runs in serverless functions; first hit ~2–4s, subsequent <500ms. Acceptable for an admin (not a public route).
- Image storage on serverless — use `@payloadcms/storage-vercel-blob` ($0.15/GB stored, generous free tier) OR `@payloadcms/storage-s3` pointed at Cloudflare R2 (10GB free, zero egress fees).

---

## Step 3 — Implementation plan

### Install (one-time, target branch `feature/cms`)

```bash
cd app
pnpm add payload @payloadcms/next @payloadcms/db-mongodb @payloadcms/richtext-lexical @payloadcms/plugin-seo @payloadcms/storage-vercel-blob sharp graphql
pnpm add -D @types/node
```

### File layout to create

```
app/
  payload.config.ts                  # root config
  src/
    payload/
      collections/
        Pages.ts
        NewsPosts.ts
        Services.ts
        CaseStudies.ts
        Media.ts
        Users.ts
      globals/
        SiteSettings.ts
        Navigation.ts
        Footer.ts
      blocks/
        HeroBlock.ts
        FAQBlock.ts
        TestimonialBlock.ts
        CTABlock.ts
        RichTextBlock.ts
  src/app/
    (payload)/
      admin/
        [[...segments]]/
          page.tsx                   # mounts Payload admin
        layout.tsx
      api/
        [...slug]/
          route.ts                   # REST + GraphQL endpoints
    news/
      page.tsx                       # NEW — news index
      [slug]/
        page.tsx                     # NEW — news detail
```

### `payload.config.ts` shape

```ts
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";

import { Pages, NewsPosts, Services, CaseStudies, Media, Users } from "./src/payload/collections";
import { SiteSettings, Navigation, Footer } from "./src/payload/globals";

export default buildConfig({
  admin: { user: "users" },
  collections: [Pages, NewsPosts, Services, CaseStudies, Media, Users],
  globals: [SiteSettings, Navigation, Footer],
  editor: lexicalEditor({}),
  db: mongooseAdapter({ url: process.env.DATABASE_URI! }),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: { outputFile: path.resolve(process.cwd(), "src/payload-types.ts") },
  plugins: [
    seoPlugin({ collections: ["pages", "news-posts", "services", "case-studies"], uploadsCollection: "media" }),
    vercelBlobStorage({ collections: { media: true }, token: process.env.BLOB_READ_WRITE_TOKEN! }),
  ],
  hooks: {
    // Revalidate static pages on Vercel after publish
    afterChange: [async ({ doc, collection }) => {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=/${doc.slug ?? ""}&secret=${process.env.REVALIDATE_SECRET}`);
    }],
  },
});
```

### Schema models

| Model | Type | Maps from | Key fields |
|---|---|---|---|
| **Pages** | Collection | `content/*.html` | `slug`, `title`, `blocks[]` (page-builder), `seo` group |
| **NewsPosts** | Collection | `src/lib/posts.ts` | `slug`, `title`, `description`, `category`, `tags`, `publishedAt`, `coverImage`, `body` (lexical), `author` (rel→Users), `seo` |
| **Services** | Collection | `src/lib/site.ts` `SERVICE_CATEGORIES` | `slug`, `label`, `category`, `icon`, `desc`, `longCopy`, `seo` |
| **CaseStudies** | Collection | `src/lib/case-studies.ts` | mirrors `CaseStudy` type 1:1 — `clientName`, `problemStatement`, `solutionStack`, `keyMetrics[]`, `testimonial`, `seo` |
| **Media** | Collection | (new) | `alt` (required), `caption`, file (auto via Vercel Blob) |
| **Users** | Collection | (new) | `email`, `role` (admin/editor), Payload built-in auth |
| **SiteSettings** | Global | `SITE` in `src/lib/site.ts` | name, tagline, email, whatsapp, social URLs |
| **Navigation** | Global | `NAV_PRIMARY` | `items[]` |
| **Footer** | Global | footer config | `columns[]`, `legal` |

**Blocks** (reusable across Pages.blocks): HeroBlock, FAQBlock, TestimonialBlock, CTABlock, RichTextBlock, StatsBlock.

### Migration of existing content (one-shot script: `scripts/migrate-to-payload.ts`)

```
1. Boot Payload locally (`pnpm payload`)
2. Read src/lib/site.ts → upsert SiteSettings + Navigation + Services
3. Read src/lib/case-studies.ts → for each → payload.create({ collection: "case-studies", data })
4. Read src/lib/posts.ts → upsert NewsPosts (body stays HTML for now, convert to lexical later)
5. Read content/*.html → for each top-level page → create a Page with a single RichTextBlock
6. Commit src/payload-types.ts (generated) — TS types now flow from CMS schema
```

### Public routes to wire

- `/news` — list (already has `content/blog.html` but currently static; replace fetch from `payload.find({ collection: "news-posts", limit: 20, sort: "-publishedAt" })`)
- `/news/[slug]` — detail (new, ~80 lines reusing existing post page styling)
- `/case-studies` and `/case-studies/[slug]` — swap `CASE_STUDIES` import for `payload.find`
- `/services/[slug]` — swap `SERVICE_CATEGORIES` array for `payload.find`
- All ISR: `export const revalidate = 3600` + the `afterChange` webhook above for instant updates

### Admin URL: **`/admin`** (Payload default)

### Vercel deploy considerations

- Set env vars: `DATABASE_URI` (MongoDB Atlas connection string), `PAYLOAD_SECRET` (random 32 chars), `BLOB_READ_WRITE_TOKEN` (auto-set when you enable Vercel Blob), `REVALIDATE_SECRET` (random), `NEXT_PUBLIC_SITE_URL`.
- **Vercel function memory:** bump admin route to 1024MB in `vercel.json` (Payload admin compile is heavy).
- **Build:** Payload generates types and admin bundle at build time. First Vercel build will be 2–3 min; subsequent ~90s.
- **Cold start:** admin route ~2–4s first hit. Public routes unaffected (ISR cached).
- **MongoDB Atlas M0 (free):** add Vercel IP ranges (0.0.0.0/0 is fine for M0, no production data risk).

### Ship time estimate

| Phase | Hours |
|---|---|
| Install + boot + DB connect | 1 |
| Schema authoring (6 collections + 3 globals + 6 blocks) | 4 |
| SEO plugin + Blob storage + revalidate hook wiring | 1 |
| Migration script + dry-run + execute | 3 |
| Rewrite `/news`, `/case-studies`, `/services` pages to fetch from Payload | 3 |
| `/news/[slug]` new route + styling | 2 |
| Auth setup for 1 admin + 1 editor role | 0.5 |
| QA pass (`/qa` skill) + Vercel deploy + smoke | 1.5 |
| **Total** | **~16 hrs** (call it 2 focused builder days) |

---

## Step 4 — Fallback: **Sanity (free tier)**

**When to switch:**
- Payload admin cold-start exceeds 6s on Vercel hobby and we can't justify the Pro upgrade.
- MongoDB Atlas M0 free tier proves flaky in Bali region and Neon Postgres free also has cold-start issues.
- We discover a hard Next.js 16 bug in Payload's admin bundle (low probability — they explicitly support 16.2.2+, but possible).
- Waseem wants real-time multi-editor collab in <3 months (Sanity's presence indicators are unmatched).

**Sanity switch cost:**
- Schemas rewrite from Payload TS → Sanity schema JS: ~3 hrs.
- Studio mount at `/studio` route via `next-sanity`: ~1 hr.
- Migration: re-export Payload JSON → `sanity import` NDJSON: ~2 hrs.
- Image URLs change format (rewrite components): ~2 hrs.
- **Total switch: ~8 hrs** if we hit this within 30 days of Payload ship.

**Why Sanity is the right fallback (not Keystatic/Tina):** It's the only other option with mature Next.js compatibility, an in-house AI Assist, and a free tier that genuinely covers our scale. The lock-in we'd take is offset by its operational robustness — exactly the trade-off we *don't* want from the primary choice but is acceptable as plan B.

---

## Open questions for Waseem before I start building

1. **DB choice:** MongoDB Atlas M0 (zero config, faster cold starts) vs Neon Postgres (SQL feels more standard, schema migrations are cleaner). Recommendation: **MongoDB Atlas** for v1 — switch to Postgres if/when we add complex reporting queries.
2. **Image storage:** Vercel Blob (paid usage-based, $0.15/GB stored, simplest) vs Cloudflare R2 (10GB free + zero egress, more setup). Recommendation: **Vercel Blob** for first 90 days, migrate to R2 if monthly cost > $5.
3. **Editor count at launch:** confirm "single author" — if there's a 2nd editor in the next 30 days, set up roles in `Users.ts` upfront (cheap to add now, awkward to retrofit).
4. **News legacy posts:** the 3 entries in `src/lib/posts.ts` only have metadata, no body. Should I write placeholder bodies from the existing `content/blog.html` index page copy, or import as drafts for Waseem to fill in?
5. **`AGENTS.md` enforcement:** confirm we should pin Payload to the exact `next@16.2.6` Payload tested against, and skip the auto-upgrade-on-build pattern that broke our prior builds.

---

**End of report — 5-line summary:**

> Winner: **Payload CMS 3 self-hosted at `/admin`** on Next.js 16.2.6 + MongoDB Atlas free tier + Vercel Blob storage.
> Monthly cost: **$0** through ~5K docs, then ~$25/mo at scale.
> Ship time: **~16 hrs** (2 focused builder days) for full migration of pages + services + case studies + news.
> Top risk: **Vercel serverless cold-start on admin route** (2–4s first hit); fallback = Sanity free tier, ~8 hrs to switch.
> **Confirm to proceed** — answer the 5 questions above and I'll open `feature/cms` and start with the install + schema scaffold.
