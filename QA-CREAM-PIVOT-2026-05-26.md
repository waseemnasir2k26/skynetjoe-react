# Cream Pivot QA — 2026-05-26

Sitewide visual audit of cream editorial rebrand. 5 parallel batches × ~80 routes. Static + HTML fetch (browse skill broken on Win box — `bun.exe` not on PATH for `browse.exe`).

---

## ROOT CAUSES (fix these = collapse 70% of bugs)

### RC1 · Bulk regex CTA auto-flip = black-on-black
Tool pages: CTA backgrounds set to `var(--ink)` (#1A1A1A) AND text kept as `text-[var(--ink)]` → invisible buttons + modals + output panels across 8 tools.
**Fix:** swap CTA pattern → `bg: var(--terracotta)` + `text: var(--cream)`. OR keep `bg: var(--ink)` + flip text to `var(--cream)`.

### RC2 · `HtmlCreamWrap.tsx` whitelist too narrow
Catches `.wn-card, .wn-proof-item, .wn-price, .wn-block, .wn-row, .wn-feature` only. 15+ other `.wn-*` cards (`.wn-toc`, `.wn-stack`, `.wn-tree`, `.wn-week`, `.wn-quotable`, `.wn-jump`, `.wn-scenario`, `.wn-node`, `.wn-leaf-*`, `.wn-tldr`, `.wn-pick-*`, `.wn-direct`, `.wn-anti`) ship dark hex bgs from legacy content. Body text already gets cream override → dark text on dark card = unreadable.
**Fix:** broaden selector to `article[class*="wn-"] [class*="wn-"]` OR add missing classes to whitelist at `src/components/HtmlCreamWrap.tsx:63-69`.

### RC3 · 16x `content/services/*.html` ship inline dark `<style>`
Hard-coded `--wn-bg:#100f14, --wn-fg:#f7f7f7, --wn-surface:#1f1f23` + blue/cyan/teal accents (`#1E88E5, #00D4FF, #14B8A6`). Inline `<style>` beats globals.css via specificity → 16 service slug pages = dark zinc islands inside cream site.
**Fix:** strip default-dark block from each `content/services/*.html` OR replace with cream tokens. Bulk script possible (all 16 share same skeleton).

### RC4 · `LetterArticle.tsx` still ocean+gold (8 legacy news routes)
`--navy:#1a2540` + `--gold:#c9985a` used 75+ times across hero, links, h2, `.closer` panel, sticky nav, photo sepia 0.18 (spec 0.06-0.10), CTA pointing to external `cal.com/skynetjoe/audit` (should be `/discovery-call`). Also double-header (LetterShell injects own nav over site Header).
**Fix:** rewrite `src/components/letter/LetterArticle.tsx` to consume cream tokens. OR port 8 legacy articles → dynamic `/news/[slug]` template (move bodies into `news.ts`, delete 8 page.tsx folders). One change = 8 routes fixed.

### RC5 · `<html>` className missing `light` class
`globals.css` has ~80 lines of `html.light .text-gray-300 {...}` overrides flipping legacy dark Tailwind utilities to cream. Dead code unless `<html class="light">`. Cream `:root` tokens still active (so cream IS default), but legacy `text-gray-*`, `bg-skynet-darker`, `border-white/10` etc. render dark.
**Fix:** `src/app/layout.tsx:105` — add `light` to className. One-line fix.

### RC6 · `/case-studies` index ships legacy dark HTML
`content/case-studies.html` has `--x-bg:#100f14`, blue/cyan gradient text on chips. Rendered via `dangerouslySetInnerHTML` in `src/app/case-studies/page.tsx:176`. Chip contrast 1.04-2.86:1.
**Fix:** rewrite `content/case-studies.html` → cream tokens. OR kill dangerouslySetInnerHTML, build as React.

---

## P0 — block ship

| # | Route/Component | Issue | File:line |
|---|---|---|---|
| 1 | `/case-studies` index | Legacy dark `content/case-studies.html` block — blue gradient text + illegible chips | `content/case-studies.html:3-30` · `src/app/case-studies/page.tsx:11,176` |
| 2 | `/aeo-guide`, `/glossary`, `/n8n-vs-zapier` | `.wn-*` cards (toc/stack/tree/quotable/jump/scenario) render dark — text now cream-ink = unreadable | `src/components/HtmlCreamWrap.tsx:63-69` |
| 3 | All 16 `/services/[slug]` | Hard-coded dark inline `<style>` overrides cream cascade | `content/services/*.html:line 3` (16 files) |
| 4 | 8 legacy `/news/*` | `LetterArticle.tsx` navy+gold tokens, 75+ leak occurrences | `src/components/letter/LetterArticle.tsx:6,9,10,14,22,25,28,29,36,43,47,62-65,68,86,130-139,135,221` |
| 5 | Home Testimonials | `ClaudeCodeAvatar` dark gradient `#2a1810→#4a2820→CORAL_DARK` + inner CC chip `#0a0606` | `src/components/icons/ClaudeCodeIcon.tsx:87,107` |
| 6 | `/tools/ai-readiness-score` | CTA black-on-black (text+bg both `var(--ink)`) | `Quiz.tsx:754-757` |
| 7 | `/tools/automation-gap-analyzer` | Same black-on-black CTA | `Quiz.tsx:728-730` |
| 8 | `/tools/before-after-slider` | "Want this..." section black-on-black | `Slider.tsx:332,335,338` |
| 9 | `/tools/content-calendar` | Modal panel + CTA black-on-black | `Calendar.tsx:733-735,755,785,788` |
| 10 | `/tools/executive-summary-generator` | Generate btn + output panel + Book CTA all black-on-black | `Generator.tsx:606-608,692-697,836-838` |
| 11 | `/tools/prompt-library` | Modal title + `<pre>` body black-on-black | `Library.tsx:295,323,331` |
| 12 | `/tools/revenue-calculator` | Sticky mobile bar + page CTA all black-on-black | `Calculator.tsx:625,635,643-645` · `page.tsx:300,317,320` |
| 13 | `/tools/video-prompt-generator` | Output `<pre>` + Regenerate btn + `<option>`s all black-on-black | `Generator.tsx:451-453,512,640` |
| 14 | `/tools/voice-persona-builder` | Next-step btn + result `<pre>` + Book CTA all black-on-black | `Builder.tsx:758-760,822-825,853-855` |

## P1 — fix soon

| # | Route/Component | Issue | File:line |
|---|---|---|---|
| 15 | `/discovery-call` | React hydration mismatch — `Date.now()+Math.random()` in useState init | `DiscoveryFunnel.tsx:160-165` |
| 16 | `/`, `/services`, `/news` | Ochre `#C9A96E` body text on cream = 1.83-2.09:1 (AA needs 4.5:1) | `HeroFunnel.tsx:111` · `PainSolverGrid.tsx:349` · `news/page.tsx:49,52` |
| 17 | `/services`, `/case-studies` | Sage `#8A9A7B` body text = 2.46:1 | `PainSolverGrid.tsx:349` |
| 18 | `/not-found` | KonamiUnlock idle hint chip always visible — dark `rgba(3,16,26,0.55)` + teal `#5EEAD4` on cream | `KonamiUnlock.tsx:48-59` |
| 19 | Exported icon | `FounderDuoMonogram` teal→blue gradient `#14B8A6,#1E88E5` (not currently rendered but exported) | `ClaudeCodeIcon.tsx:149` |
| 20 | `/faqs` | `.wn-cta` legacy teal gradient bg | `content/faqs.html:15` |
| 21 | `/author/waseem-nasir` | Possible `.wn-*` dark cards (verify post-RC2 fix) | `content/author-waseem-nasir.html` |
| 22 | All 16 `/services/[slug]` | Font drift: inline CSS uses Lexend (not in cream spec Fraunces/Onest/Plex Mono) | `content/services/*.html` |
| 23 | All 16 `/services/[slug]` | Blue/cyan/teal accent palette clashes terracotta/ochre/sage/oxblood quad | `content/services/*.html` |
| 24 | `/tools/voice-persona-builder` | Result CTA box legacy blue/teal gradient | `Builder.tsx:836-838` |

## P2 — polish

| # | Route/Component | Issue | File:line |
|---|---|---|---|
| 25 | `/news` chips | "Stack" pill cream-on-ochre = 2.09:1, "Field notes" cream-on-sage = 2.81:1 | `news/page.tsx:46-54` CATEGORY_COLORS |
| 26 | Mobile `/not-found` | StickyBookCallBar + Konami chip both bottom-3 right-3 z-overlap | `StickyBookCallBar.tsx:166` · `KonamiUnlock.tsx:49` |
| 27 | All routes scroll | Header z-50 vs StickyBookCallBar z-60 → bar can cover logo/nav | `Header.tsx:88` · `StickyBookCallBar.tsx:97` |
| 28 | DiscoveryPopup | Timer = 22s, spec = 30s | `DiscoveryPopup.tsx:38` |
| 29 | Popup coordination | DiscoveryPopup + ExitIntentModal both bind mouseleave w/ no coord | `DiscoveryPopup.tsx:40-43` · `ExitIntentModal.tsx:44+` |
| 30 | Dead code | `CoFounderPact.tsx` + `Founder.tsx` unimported but full dark palette (delete or rebuild) | `sections/CoFounderPact.tsx`, `sections/Founder.tsx` |
| 31 | All `.wn-*` photos | hero sepia 0.18, card sepia 0.12 (spec 0.06-0.10) | `LetterArticle.tsx:28,86` |
| 32 | LetterArticle CTA | Points to external `cal.com/skynetjoe/audit` not internal `/discovery-call` | `LetterArticle.tsx:135,221` |
| 33 | Lexend font | Still loaded site-wide via layout but spec is Fraunces/Onest/Plex Mono only | `layout.tsx:17-22,105` · `globals.css:121-122` |
| 34 | `/tools/video-prompt-generator` | Select caret SVG cyan stroke `%237ee4ff` legacy | `Generator.tsx:630` |
| 35 | Tooling | `/browse` skill broken — bun spawn fail on Win. Run `cd ~/.claude/skills/gstack && ./setup` | — |

---

## Clean routes (no findings)

`/about`, `/contact`, `/pricing`, `/lp/audit`, `/error`, `/loading`, `/portfolio`, `/case-studies/[slug]` (9 detail routes), `/news/[slug]` (16 dynamic), `/services/[slug]/in/[state]`, `Header` mega menu (4 categories), `Footer`, ExitIntentModal, SocialProofPopup, StickyBookCallBar, IncomingCallPopup, LiveChat, InlineCTABand.

---

## Fix order (collapse work)

1. **RC5** — add `light` to `<html>` className. 1-line. May auto-fix many `html.light .*` dead-code leaks.
2. **RC1** — bulk replace tool CTA pattern. ~30 lines across 8 files. Black-on-black fix.
3. **RC2** — broaden `HtmlCreamWrap` whitelist. 1 file. Unblocks aeo-guide/glossary/n8n-vs-zapier.
4. **RC4** — rewrite `LetterArticle.tsx` cream tokens OR port 8 articles to `/news/[slug]` template. 8 routes.
5. **RC6** — rewrite `content/case-studies.html` cream.
6. **RC3** — bulk replace `content/services/*.html` inline dark blocks (16 files, shared skeleton).
7. P1 contrast — switch ochre/sage from body-text use to chip-bg only (ochre/sage = decorative not text accent).
8. P1 hydration — move `leadId` init to `useEffect`.
9. Home ClaudeCodeAvatar — restyle to cream-friendly palette.
10. P2 cleanup — Konami chip, dead-code sections, popup timer, Lexend removal.

---

## Verify before fix

- RC5 claim: confirmed `<html>` has no `light` class (`layout.tsx:103-107`), `globals.css` has `html.light` overrides (line 347+). Adding `light` may auto-resolve many leaks — test first on dev before committing.
- Browse skill broken — manual phone QA recommended after fixes.
