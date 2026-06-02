# REFERENCE-NOTES — Webex study + research (Phase B)

⚠️ webex.com returned 403 on every fetch + cache stripped. Patterns below = Webex's documented design system + standard enterprise-B2B convention, NOT a live pixel teardown.

## Webex patterns → SkynetLabs choices
- **Hero = 1 headline + 1 sub-line + 1 button.** Kill competing hero CTAs. SkynetLabs: outcome line + clarifying sub-line + single "Book a free 30-min check-up".
- **Rotating sub-line:** animate only the swap word (e.g. "never miss a lead / a booking / a follow-up"), 2.5s fade; static line stays legible.
- **Alternating icon/diagram rows:** 3-4 bands, text-left/flow-diagram-right then mirror. One 2-color line-icon set. Automation flow diagrams, NOT personal photos.
- **Stats band:** one full-width strip, max 3 numbers, all real/defensible (no-fake-claims rule). Pull from real case studies or label representative.
- **Logo wall + 1 pull-quote:** muted logo row + one strong named client quote. If no logos, "trusted by founders in [verticals]" — don't fake marks.
- **One dominant CTA repeated** hero→mid→footer, same verb+color. No "Learn more" siblings diluting.
- **Color/whitespace:** near-white/cream canvas + ONE accent (emerald) for every primary button + stat number; 96-128px section gaps. Restraint = "expensive".

## Font recommendation
Legibility for non-technical/older/mobile/bright-light: **Inter ≈ system-ui > Helvetica/Arial > Geist.** Inter = large x-height, open apertures, screen-tuned. Optional max-accessibility: **Atkinson Hyperlegible** (Braille Institute, disambiguates confusable glyphs) for body + Inter for headings.
Numbers (mobile-first): body **≥16px, prefer 17-18**; line-height **1.5** body / 1.1-1.25 headings; weight **400-450** body (avoid 300 on cream), 600-700 headings; letter-spacing ~0 body (must survive +0.12em per WCAG 1.4.12), slight negative only on large headings; body contrast **≥4.5:1** — use near-black #1A1A1A/#222, not gray.
**Avoid italic serif at body size:** serif high-freq detail smears on mobile sub-pixel; slant disrupts baseline scan; italics lower per-char distinctiveness — all worse in glare/aging vision. Italics for short emphasis only.

## The "78%" stat — replace, don't cite
"78% buy from first vendor who replies" = circular vendor-blog sourcing (Vendasta/LeadConnect), no primary study. Defensible swaps:
1. "Up to half of B2B sales go to whoever answers first." — InsideSales/CEB-Google (35-50%).
2. "Reply to a web lead within 5 minutes and you're 21× more likely to qualify it." — HBR/MIT, Oldroyd et al. 2011 ("Short Life of Online Sales Leads"). NOTE: study measures contact/qualify, not closed sales — word accordingly.

## Sources
- HBR 2011 Short Life of Online Sales Leads · MIT/InsideSales Lead Response Mgmt Study 2007 · leadresponsemanagement.org · NN/g Legibility-Readability-Comprehension · WCAG 2.2 typography · Atkinson Hyperlegible · webex.design (homepage 403).
