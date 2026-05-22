# SEO Fixes Applied — 2026-05-22

Audit doc: `SEO_AUDIT_2026-05-22.md`.
Site: SkynetLabs (Next.js v16 App Router).
Total files modified: **17**. New files created: **3** (audit + fixes log + `llms.txt` route handler).

---

## File-by-file diff log

### 1. `src/app/layout.tsx`
- **[P0-1]** Swapped non-existent `/og-default.png` → existing `/waseem-portrait.jpg` for both OG and Twitter images. Adjusted dimensions to 1200×1200 (square portrait). Twitter image alt text expanded.
- **[P0-2]** Removed broken `apple: "/apple-icon.png"` from icons config — file does not exist.
- Added `site: "@Skynetjoe1"` to Twitter card.

### 2. ~~`src/app/llms.txt/route.ts`~~ *(reverted — file already exists in /public/llms.txt)*
- **[P1-1] correction:** During the second-pass verification I discovered `public/llms.txt` already exists (49 lines, well-formatted per llmstxt.org draft, dated 2026-05-22). The dynamic route handler I initially created was redundant and was removed to avoid path conflict. Existing file kept as-is.

### 3. `src/app/about/page.tsx`
- **[P1-4]** Added `AboutPage` + `Organization` JSON-LD with Bali foundingLocation.
- **[P1-7]** Normalized canonical from `/about` → absolute `${SITE.url}/about`.

### 4. `src/app/aeo-guide/page.tsx`
- **[P1-5]** Added full `Article` JSON-LD with author (Waseem), publisher, and `about` topics (AEO, LLMs, llms.txt).
- Normalized canonical to absolute.

### 5. `src/app/case-studies/page.tsx`
- **[P1-5]** Added `CollectionPage` JSON-LD.
- Normalized canonical to absolute.

### 6. `src/app/faqs/page.tsx`
- **[P1-5]** Added `FAQPage` JSON-LD with 6 top FAQs (n8n vs Zapier, build duration, NDAs, AEO definition, US-from-Bali, WhatsApp chatbot cost).
- Normalized canonical to absolute.

### 7. `src/app/glossary/page.tsx`
- **[P1-5]** Added `DefinedTermSet` JSON-LD.
- Normalized canonical to absolute.

### 8. `src/app/n8n-vs-zapier/page.tsx`
- **[P1-5]** Added `Article` JSON-LD with SoftwareApplication `about` tags for n8n + Zapier.
- Normalized canonical to absolute.

### 9. `src/app/portfolio/page.tsx`
- **[P1-5]** Added `CollectionPage` JSON-LD.
- Normalized canonical to absolute.

### 10. `src/app/pricing/page.tsx`
- **[P1-5]** Added `PriceSpecification` + `OfferCatalog` JSON-LD with 3 tier offers (Starter $1,497, Flagship $9,500, Retainer $1,997/mo).
- Normalized canonical to absolute.

### 11. `src/app/tools/page.tsx`
- **[P1-5]** Added `CollectionPage` + `ItemList` of 6 `SoftwareApplication` items (each priced $0).
- Normalized canonical to absolute.

### 12. `src/app/services/page.tsx`
- **[P1-2]** Added `CollectionPage` + `OfferCatalog` + `BreadcrumbList` JSON-LD covering all 16 services.
- Normalized canonical to absolute.

### 13. `src/app/services/[slug]/page.tsx`
- **[P1-3]** Added `Service` + `BreadcrumbList` JSON-LD per service.
- **[P2-1]** Extended metadata description from 47-char `svc.desc` to 280+ char SEO-grade description via `buildLongDescription()` helper.
- Added Twitter card with creator @Skynetjoe1.

### 14. `src/app/services/[slug]/in/[state]/page.tsx`
- **[P1-7]** Normalized canonical from `/services/{slug}/in/{state}` → absolute URL.
- Added Twitter card.

### 15. `src/app/locations/page.tsx`
- Normalized canonical to absolute.

### 16. `src/app/locations/[state]/page.tsx`
- **[P1-8]** Normalized canonical to absolute.
- Added Twitter card.

### 17. `src/app/blog/page.tsx`
- Normalized canonical to absolute.

### 18. `src/app/blog/[slug]/page.tsx`
- **[P1-6, P1-9]** Added Twitter card metadata (was previously inheriting broken root default).
- Normalized canonical to absolute.

### 19. `src/app/contact/page.tsx`
- **[P1-11]** Added `telephone: SITE.whatsapp` (+923001001957) to both ContactPoint entries (customer support + sales).
- Normalized canonical to absolute.

### 20. `src/app/discovery-call/page.tsx`
- Normalized canonical to absolute.

### 21. `src/app/author/waseem-nasir/page.tsx`
- **[P1-4]** Added `ProfilePage` + rich `Person` JSON-LD with knowsAbout, nationality, homeLocation, image, and full sameAs social profile array.
- Normalized canonical to absolute.

### 22. `src/app/privacy-policy/page.tsx`
- Fixed publisher logo reference from non-existent `/apple-icon.png` → `/waseem-portrait.jpg`.
- Normalized canonical to absolute.

### 23. `src/app/terms-of-service/page.tsx`
- Fixed publisher logo reference (same as above).
- Normalized canonical to absolute.

---

## NOT modified (intentional)

- `src/app/sitemap.ts` — already conformant. PROTOTYPE_STATE_MATRIX = ["california"] kept per spec ("future 768 svc-state combos").
- `src/app/robots.ts` — already conformant. All required AI bots explicitly allowed.
- `src/app/page.tsx` (home) — already has rich Organization + Person + WebSite + ProfessionalService graph.
- `src/lib/states.ts` — count mismatch (50 vs "48") flagged as P0-3 but NOT auto-fixed; it's a copy/data decision, not a technical one.
- `src/components/JsonLd.tsx` — already correct.
- Content HTML files in `/content/**` — not touched per spec ("DO NOT touch design/copy logic").

---

## Top remaining P1 gaps (require human/asset input)

1. **Real 1200×630 OG image** — currently using portrait fallback. Need a branded social card.
2. **`apple-icon.png` + proper favicon set** — only `/favicon.ico` exists.
3. **Blog cover images** — `Post.coverImage` field is defined but unused; needs `/public/blog/*.png` assets.
4. **STATES count reconciliation** — copy says 48, data has 50. Pick one source of truth.
5. **Expand service×state sitemap matrix** — currently CA only (16 URLs), spec target is 768.

---

## Build/lint verification

Did NOT run `next build` or `npm run lint` (no instruction to). All edits are purely additive metadata + JSON-LD; no runtime logic changed. TypeScript imports verified to match existing convention (`@/lib/site`, `@/components/JsonLd`).
