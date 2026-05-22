# Collision Reconcile — 2026-05-22

Two background agents (programmatic-SEO + technical-SEO) ran in parallel on `app/`. AEO agent ran earlier. Risk: snapshot-then-write race could have clobbered shared files. This pass audits and reconciles 4 files.

---

## File 1 — `src/app/sitemap.ts`

**Expected (Agent 1 — programmatic SEO):** 768-entry `serviceStateRoutes` matrix (16 services × 48 states), absolute canonicals via `${base}`, lastModified.

**Expected (Agent 2 — technical SEO):** "NOT modified" per `SEO_FIXES_APPLIED.md` line 105 ("PROTOTYPE_STATE_MATRIX kept"). So Agent 2's report was already pre-collision-aware and correctly recognized the file as already conformant.

**Current state — VERIFIED INTACT:**
- Lines 60-69: Full `SERVICE_CATEGORIES.flatMap → cat.services.flatMap → STATES.map` matrix = 16 × 48 = 768 entries.
- Comment on line 59: "Full programmatic SEO matrix: 16 services × 48 states = 768 pages."
- Absolute URL base `${SITE.url}` used throughout.
- lastModified set to `now` consistently.

**Restoration needed:** None. Agent 2 correctly identified Agent 1's work and stood down.

---

## File 2 — `src/app/contact/page.tsx`

**Expected (Agent 2 — technical SEO):** `[P1-11]` Added `telephone: SITE.whatsapp` to both ContactPoint entries (customer support + sales). Absolute canonical.

**Expected (AEO agent — speculative per user note):** Direct-answer block.

**Verified against `AEO_AUDIT_2026-05-22.md`:** AEO audit doc contains NO mention of `/contact` page (verified via grep). User's "earlier AEO agent added a direct-answer block" was speculative and not actually shipped per the audit doc inventory. No AEO direct-answer block intended for this page.

**Current state — VERIFIED INTACT:**
- Line 35: `alternates: { canonical: \`${SITE.url}/contact\` }` — absolute canonical present.
- Line 64: `telephone: SITE.whatsapp` on customer-support ContactPoint.
- Line 72: `telephone: SITE.whatsapp` on sales ContactPoint.

**Restoration needed:** None.

---

## File 3 — `src/app/author/waseem-nasir/page.tsx`

**Expected (AEO agent — `AEO_AUDIT_2026-05-22.md` §7):**
- `knowsAbout` expanded from 6 generic → 17 named entities.
- `hasOccupation` (Occupation type + occupationLocation + skills).
- `alumniOf` (self-taught + ledger reference).
- `nationality` (Pakistan) + `birthPlace` (Lahore).
- `award` array (3 verifiable claims).
- `sameAs` expanded 4 → 10 URLs.

**Expected (Agent 2 — technical SEO `SEO_FIXES_APPLIED.md` §21):** `ProfilePage` wrapper + Person JSON-LD with knowsAbout, nationality, homeLocation, image, sameAs. Absolute canonical.

**Pre-reconcile state:** Page.tsx had Agent 2's `ProfilePage`+`Person` graph but Person carried ONLY 8 knowsAbout (vs AEO's 17), 5 sameAs (vs AEO's 10), and was missing `hasOccupation`, `alumniOf`, `birthPlace`, `award`, `givenName`/`familyName`. Agent 2's later write evidently overwrote Agent 1/AEO's richer Person — classic snapshot-race. The rich AEO schema does still ship via the inline `<script type="application/ld+json">` block in `content/author-waseem-nasir.html` (lines 488-560) but the page.tsx `JsonLd` constant was thinned.

**Restoration applied (page.tsx:54-99):** Merged Agent 2's `ProfilePage` wrapper + absolute canonical with AEO's full Person enrichments:
- 17-entity `knowsAbout` array (line 65-83).
- `hasOccupation` (lines 84-90).
- `alumniOf` (lines 91-94).
- `birthPlace` (line 62).
- `nationality` upgraded from string `"Pakistani"` → `{ "@type": "Country", name: "Pakistan" }` to match AEO spec (line 61).
- `award` array (lines 95-99).
- `sameAs` expanded from 5 → 10 URLs (lines 100-110): adds second LinkedIn handle, second X handle, Upwork, skynetjoe.com root, waseemnasir.com.
- `givenName`, `familyName` added (lines 57-58).
- All Agent 2 contributions preserved: `@id`, `worksFor` ref to `#organization`, ProfilePage wrapper, absolute canonical.

---

## File 4 — `src/app/about/page.tsx`

**Expected (Agent 2 — `SEO_FIXES_APPLIED.md` §3):** AboutPage + Organization JSON-LD with Bali foundingLocation. Absolute canonical.

**AEO doc check:** No `/about` entry in `AEO_AUDIT_2026-05-22.md`. (AEO doc page-by-page inventory covers aeo-guide, n8n-vs-zapier, faqs, glossary, services/[slug], case-studies, author — not about.)

**Current state — VERIFIED INTACT:**
- Line 16: absolute canonical.
- Lines 26-57: `@graph` with AboutPage (`#aboutpage`) + Organization (`#organization`), foundingLocation Bali, founder, sameAs to 5 socials.

**Restoration needed:** None. (The content/about.html also carries its own inline `<script type="application/ld+json">` graph with Organization + AboutPage — already shipping.)

---

## Build verification

Ran `npm run build` from `app/`. Result:

- Turbopack compile: PASSED (`✓ Compiled successfully in 4.4s`).
- TypeScript: FAILED at `src/app/services/page.tsx:26` — `SERVICE_CATEGORIES.flatMap((c) => c.services)` cannot unify the `as const` discriminated tuple types into a single union. This error is in **a file outside my 4-file scope** (it was edited by Agent 2 per `SEO_FIXES_APPLIED.md` §12: "CollectionPage + OfferCatalog + BreadcrumbList JSON-LD").

  Per task instructions ("Touch ONLY the 4 files listed above"), I did NOT modify `services/page.tsx`. The 862-page generation step never executed because TS gate failed first.

  **Recommended follow-up (out of scope here):** cast the flatMap return in `services/page.tsx:26` — change to `const allServices = SERVICE_CATEGORIES.flatMap((c) => c.services as readonly { slug: string; label: string; icon: string; desc: string; }[]);` or widen `SERVICE_CATEGORIES` typing in `src/lib/site.ts`.

  Note: `PROGRAMMATIC_SEO_SCAFFOLD_2026-05-22.md` claimed `✓ Generating static pages (862/862)` at scaffold time — implying the TS regression was introduced AFTER that report, almost certainly by Agent 2's same `services/page.tsx` edit. So this is collision-collateral, not a 4-file-reconcile collision.

## Summary

| File | Collision? | Action |
|---|---|---|
| `sitemap.ts` | No (Agent 2 stood down) | None — verified 768 entries intact |
| `contact/page.tsx` | No (AEO never touched it) | None — telephone present on both ContactPoints |
| `author/waseem-nasir/page.tsx` | YES — Agent 2 thinned AEO Person | MERGED: 17 knowsAbout, hasOccupation, alumniOf, birthPlace, award, 10 sameAs all restored alongside Agent 2's ProfilePage wrapper |
| `about/page.tsx` | No (AEO never touched it) | None — AboutPage + Organization graph intact |

Changes staged in working tree. No commit. Out-of-scope TS error in `services/page.tsx` flagged for follow-up.
