# Tools Batch 1 — Automation Gap / Prompt Library / Video Prompt Generator

Three interactive tools ported from the WordPress source (`_source-extract/page-tools.php`) into Next.js 16. WP source consulted for **logic only** — no visual, branding, or color reuse. Visual design calibrated to existing `/tools/revenue-calculator` and `/tools/ai-readiness-score` using the OCEAN palette (`#061827` / `#0a2d4a` / `#073846` background, `#1E88E5` → `#14B8A6` gradient accents, cyan-200/300 text accents). All three tools are mobile-first, respect `prefers-reduced-motion`, and ship JSON-LD schema for Quiz + SoftwareApplication + FAQPage where applicable.

---

## 1. Automation Gap Analyzer — `/tools/automation-gap-analyzer`

12-question diagnostic across 4 axes. Output is an automation gap % (0-100), 4-axis SVG radar, and a "biggest leak" callout with axis-specific recommendations.

### Model

- 4 axes × 3 questions = 12 questions, each option weighted 0-10
- Raw 0-120 → normalized to 0-100 automation %
- Axes: `leadCapture` / `followUp` / `reporting` / `teamProductivity`
- Buckets: chaos (0-30) / patchwork (31-55) / running (56-80) / automated (81-100)
- Implied manual hours/week computed from axes scoring below 50% (each weak axis contributes 6-12 hrs)

### CTAs

1. Book strategy call → Cal.com prefilled w/ score, bucket, weakest axis, axes breakdown
2. Revenue Calculator → prefilled w/ implied manual hours
3. Share result → URL with `?result=&bucket=`

### Files

- `src/app/tools/automation-gap-analyzer/page.tsx` — server shell, hero, 4-axis preview, FAQ; metadata + 3 JSON-LD blocks (Quiz, SoftwareApplication, FAQPage)
- `src/app/tools/automation-gap-analyzer/Quiz.tsx` — client state machine (quiz → loading → result), hand-coded 4-axis SVG radar, count-up score animation, localStorage persistence w/ 14-day TTL, shareable URL hydration
- `src/data/automation-gap-questions.ts` — typed question bank, axis metadata, scoring + bucket logic, calculator + booking URL builders

---

## 2. Prompt Library — `/tools/prompt-library`

Searchable + filterable library of 50 production-quality AI prompts across 8 categories. Real-time search filters by title, use-case, body and category. Multi-select category chips. Click any card → modal with full prompt, character count, copy + deep-link buttons.

### Catalog

8 categories × 5-8 prompts = 50 total:
- Sales (7): cold email, discovery questions, objection handling, 7-touch follow-up, BANT+ qualification, post-call recap, proposal tightening
- Customer Service (6): chatbot greeting, refund script, complaint de-escalation, FAQ builder, canned responses, SaaS onboarding
- Marketing (7): LinkedIn contrarian post, subject lines, Meta ad copy, positioning, landing hero, press release, case study outline
- Operations (6): SOP builder, meeting summary, vendor RFP, hiring runbook, decision memo, postmortem
- Content (7): SEO blog outline, 60s video script, social calendar, newsletter, LinkedIn carousel, podcast show notes, tweet thread
- Data Analysis (5): CSV insights, KPI dashboard, cohort analysis, pricing tier, funnel leakage
- Recruitment (5): job description, interview rubric, resume screen, offer letter, reference call
- Founder Brain (7): quarterly OKRs, weekly planning, decision framework, pre-mortem, investor update, saying no, 90-day plan

Each prompt: id, category, title, useCase (1-line), body (200-800 chars), recommended model.

### UI

- Search bar w/ clear button + live result count
- 8 category chip filters w/ per-category counts, multi-select toggle, "Clear" reset
- Responsive 3-col / 2-col / 1-col card grid
- Modal on card click — full body in monospace, copy button, deep links to Claude (`claude.ai/new?q=`) and ChatGPT (`chat.openai.com/?q=`)
- Per-card inline copy button (independent of modal)
- "Submit a prompt" mailto CTA at bottom

### Files

- `src/app/tools/prompt-library/page.tsx` — server shell, hero, FAQ, CTA; metadata + JSON-LD (CollectionPage, SoftwareApplication, FAQPage)
- `src/app/tools/prompt-library/Library.tsx` — client search/filter state, card grid, modal w/ Escape key + body-scroll-lock
- `src/data/prompts-library.ts` — 50-prompt catalog, category metadata, `buildModelLink()` helper for deep links

---

## 3. Video Prompt Generator — `/tools/video-prompt-generator`

8 input fields → 4 model-native prompts composed side-by-side. Pure client-side string composition, zero backend. Save up to 20 generations to localStorage history.

### Inputs

- Subject/scene (textarea)
- Camera movement (select: dolly-in / pan / aerial / handheld / static / orbit)
- Mood (select: cinematic / documentary / dreamlike / energetic / melancholic / luxury)
- Lighting (select: golden hour / overcast / neon / studio / candlelit / harsh-noon)
- Duration (radio: 4s / 8s / 16s / 30s)
- Style (radio: realistic / anime / 3D / claymation / film-noir / watercolor)
- Aspect ratio (radio: 16:9 / 9:16 / 1:1 / 21:9)
- Negative prompts (input, optional)

### Outputs (4 model-native composers)

- **Runway Gen-3** — verbose, technical params (motion bracket, fps, upscale)
- **Pika** — short, motion-focused, `--ar / --fps / --motion / --no` flags
- **Sora** — cinematographic narrative
- **Veo** — structured key:value block

Each output card: format label, color dot, description, char count, copy button.

### Controls

- Regenerate with variation (salts the adjective bank for fresh wording)
- Save (to localStorage history, max 20 entries)
- Reset (defaults)
- Per-output copy buttons
- History panel: load entry, delete entry, clear all

### Files

- `src/app/tools/video-prompt-generator/page.tsx` — server shell, hero, FAQ, CTA; metadata + JSON-LD (SoftwareApplication, FAQPage)
- `src/app/tools/video-prompt-generator/Generator.tsx` — client component with all inputs, 4 composers, history, sticky-input layout on lg+

---

## Cross-cutting

### Tools index + sitemap (APPEND ONLY)

- `src/app/tools/page.tsx` — added 3 new entries to the TOOLS array (Target / Library / Film icons)
- `src/app/sitemap.ts` — appended 3 routes to `staticRoutes`

### Visual system

- Hero: same gradient `linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)` + two floating `.orb` blurs as in `ai-readiness-score`
- Type ramp: `text-5xl md:text-7xl` h1 w/ multi-stop gradient highlight; `text-3xl md:text-4xl` h2; `font-extrabold tracking-tight` throughout
- Cards: `rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md`
- Primary CTA: `linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)` button
- Accents: cyan-200/300 for labels, cyan-400 hover borders
- Per-tool brand color: orange→yellow→cyan→emerald for buckets (matches ai-readiness palette)

### Accessibility / motion

- All animations gated behind `@media (prefers-reduced-motion: reduce)`
- Modal: `role="dialog"` + `aria-modal` + Escape close + body-scroll-lock + click-outside dismiss
- Radio buttons use `aria-pressed`
- SVG radar has `role="img"` + `aria-label`
- Native form `<select>` for dropdowns (keyboard + screen-reader friendly)

### Build status

`npm run build` — **clean**. All 3 tool routes prerendered as static:
```
○ /tools/automation-gap-analyzer
○ /tools/prompt-library
○ /tools/video-prompt-generator
```
Only warning is the pre-existing multi-lockfile / turbopack.root notice unrelated to this batch. No new TypeScript errors, no new ESLint failures.
