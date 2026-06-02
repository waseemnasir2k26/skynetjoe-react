# SESSION-STATE — Full-Site Redesign

**Project:** skynetjoe.com (brand: SkynetLabs) full-site redesign + readability/plain-language overhaul
**Started:** 2026-06-01
**Current phase:** Discovery ANSWERED 2026-06-02 (see below). Awaiting owner "go" → then build whole site (review-once).

## ✅ DISCOVERY ANSWERS (owner, 2026-06-02)
1. **"Leak" metaphor → DROP fully.** No leak/plug wording anywhere.
2. **Tone → punchy & direct** (cleaner, not enterprise-calm).
3. **Jargon → hide ALL tool names up top** (n8n/AEO/CRM/GPT/GoHighLevel) — only in low "tools we use" strip, plain words first.
4. **Hero → approved north-star** ("Stop losing customers while you're busy" + plain sub-line) as starting point.
5. **Founder presence → small ROUND PHOTO** (not monogram), placed in: trust strip + About + footer.
6. **⚠️ PHOTO SCOPE OVERRIDE (differs from §4 req1):** KEEP all personal photos site-wide EXCEPT remove from **homepage + service pages** only. Those two get **icons-only**. All other pages keep photos as-is.
7. **Home/service fill → Lucide icons.**
8. **⚠️ MOTION:** homepage = clean/simple/fast (minimal motion). ALL OTHER pages get **animations + cinematic style** (Framer Motion).
9. **Type → ONE clean sans** for body + headings. No italic serif anywhere. body ≥17px / lh ≥1.6.
10. **Palette → owner delegated** ("you pick best"): keep brand warmth, max readability. Fix footer-h5 3.9:1 fail regardless.
11. **Testimonials → ALL REAL, keep** (Marchetti/Grand Mercer, Mabangu/KODIASIMMO, Dubois, Kalala/Takycorp).
12. **"78% of buyers" stat → soft reword**, no fake number, no source needed.
13. **Delivery → BUILD ALL, review once** (not wave-by-wave gate). Still build design system first internally, then propagate.
14. **Interior pages → rebuild freely** (full layout freedom on weak pages).
15. **Primary CTA → /discovery-call.**
16. **Scope → touch EVERYTHING** incl /lp/* ad pages + legal.
17. Auto-fixes greenlit: Twitter `@Skynetjoe1`→`@skynetlabs`; repoint schema.ts default OG off `waseem-rooftop.jpg`.

## Stack
Next.js 16.2.6 · React 19.2.4 · Tailwind v4 (theme in `src/app/globals.css` `@theme`) · Framer Motion 12 · `output: standalone`. Deploy: Hostinger (apex+www live) via MCP pipeline; Vercel previews available.

## ⏪ RESTORE / ROLLBACK
- **Backup git tag:** `pre-redesign-backup-2026-06-01`
- **Backup branch:** `backup/pre-redesign-2026-06-01`
- **Backup HEAD hash:** `222b09a8a7fae567b366af039b88e7ec0996ce95`
- **Off-tree zip:** `C:\Users\info\GITHUB\skynetjoe-backup-2026-06-01.zip` (77 MB, tracked files only)
- **Work branch:** `redesign/full-site` (off HEAD `222b09a`)
- **Rollback commands:**
  - Code: `git checkout pre-redesign-backup-2026-06-01` (or `git reset --hard backup/pre-redesign-2026-06-01`)
  - Files: unzip `../skynetjoe-backup-2026-06-01.zip`
  - Live: production stays as-is; redesign deploys to Vercel preview/branch only — promote/rollback in Vercel dashboard. Do NOT touch prod env vars or domains.
- **Rule:** never delete/rebase/force-push the backup tag or branch. Each wave gets its own sub-branch off `redesign/full-site`, merged via PR — revert any wave independently.

## Phase log
- ✅ §0.1 Backup (tag + branch + zip) — confirmed
- ✅ Phase A audit (5 parallel agents: typography/contrast, imagery+IA, copy, SEO/deploy, Webex+research) — see AUDIT.md
- ✅ Phase B reference (Webex pattern-level — site 403'd) — see REFERENCE-NOTES.md
- ✅ PAGE-TRACKER.md built (full route inventory)
- ⛔ Discovery Gate — questions presented, awaiting owner. NO redesign code until answered.

## ▶️ RESUME HERE (paused 2026-06-02, owner back in 1-2h)
Owner said **"go"** (perfect). Build approved. On resume:
1. **FIRST:** inspect 33 dirty files + 6 `worktree-agent-*` branches on `redesign/full-site` — decide diff-and-keep vs stash-clean. Do NOT build on stale state. (Owner leaned: confirm before building.)
2. Wave 0 — design-system tokens in `globals.css @theme`: one clean sans (body+headings, NO italic serif), tuned cream palette, Lucide icons, spacing/buttons/cards. Run Lighthouse baseline (A5 still pending).
3. Rebuild homepage (clean/minimal motion) as reference.
4. Propagate to ALL pages on locked tokens — interior pages get Framer animation + cinematic; rebuild weak pages freely; parallel sub-agents per page.
5. Apply photo rule: strip personal photos from HOME + SERVICE pages → Lucide icons; KEEP photos everywhere else; founder = small round photo in trust strip + About + footer.
6. Copy: drop "leak", punchy+plain, no jargon up top, soft-reword 78% stat, keep real testimonials. One copy file per page in `copy/`.
7. Auto-fixes: Twitter→@skynetlabs, repoint schema OG.
8. Build ALL → hand whole site for single review.
Delivery = build-all-review-once (NOT wave-gated). Branch `redesign/full-site`. Backup intact (tag/branch/zip).

## Next on owner answers
1. Restate brief in 5-8 bullets, get "go".
2. Wave 0 — design system tokens + rebuilt homepage as reference. Approve before propagating.
3. Waves 1-3 per §4c — parallel sub-agents per page, all on locked tokens.

## Open blockers / notes
- `schema.ts` default OG = `/portraits/waseem-rooftop.jpg` → repoint to logo/OG card when removing portraits.
- Twitter `creator: @Skynetjoe1` violates @skynetlabs handle rule — fix during Wave 0.
- A5 Lighthouse baseline NOT yet run (needs build/serve) — do at Wave 0 start for before/after.
- `/glossary` + `/faqs` in footer but agent couldn't confirm implementations — verify exist before Wave 3.
