# HERO_CINEMATIC_V2 — Buildable Design Spec for SkynetLabs
**Date:** 2026-05-22 | **Tech pick locked:** Paper Shaders + Framer Motion + Lenis + lazy Spline

---

## 6-Line Summary

1. **Tech pick:** Paper Shaders MeshGradient + Framer Motion + Lenis + a single Spline-exported `.splinecode` lazy-loaded behind IntersectionObserver. No raw R3F. No Three.js direct.
2. **Composition headline:** Full-bleed animated mesh-gradient backdrop, a slow-rotating 3D abstract orb (Spline) anchored top-right, headline + sub + booking CTA + email capture pinned center-left, parallax depth on scroll.
3. **Bundle budget:** Hero JS ≤ 95 KB gzipped (shaders ~12 KB, framer-motion ~32 KB, lenis ~4 KB, Spline runtime lazy ~45 KB on viewport). Initial LCP path ≤ 25 KB.
4. **LCP estimate:** ≤ 2.0 s on 4G Moto G Power equivalent; ≤ 1.2 s on broadband. CLS 0. INP ≤ 150 ms.
5. **Biggest risk:** Spline runtime + WebGL context contention on low-end Android — mitigation: feature-detect `gpu` tier and serve a static WebP fallback below tier 2.
6. **Ship estimate:** 6–9 focused hours for v2 build + A/B wiring; another 2 hours for perf budgets and reduced-motion QA.

---

## PART 1 — Reference Survey (12 sites)

| # | Site | Hero effect | Tech detected | Perf | CTA visible? |
|---|---|---|---|---|---|
| 1 | linear.app | Mesh gradient + glow, subtle parallax | WebGL canvas mesh gradient (Stripe-style minigl), Framer Motion, CSS transforms | ScrollObserver disables when offscreen; reduced-motion respected | Yes, sign-up CTAs pinned |
| 2 | vercel.com | Geist sans + subtle glow, mostly CSS animation | CSS > WAAPI > JS; GPU props only; no autoplay anims | Aggressive — no main-thread JS anims | Yes, "Start Deploying" above fold |
| 3 | framer.com | Sticky-scroll preserve-3D layered cutouts | Native Framer engine (WAAPI + CSS 3D + IntersectionObserver), Lenis-like smooth scroll | Lazy + IntersectionObserver | Yes |
| 4 | stripe.com | Animated mesh gradient (canonical) | Custom `minigl` WebGL (~10 KB), `Gradient.js`, GLSL noise | Excellent — disabled when not visible | Yes |
| 5 | apollo.io | Lottie-style scroll-triggered reveal | GSAP ScrollTrigger + Lenis + Framer Motion | Lazy screenshots | Yes |
| 6 | cult-ui.com | shadcn-style component showcase | Framer Motion + Tailwind + React; no WebGL hero | Light | Yes |
| 7 | cuberto.com | Scroll-driven 3D scene, mouse-reactive shaders | Three.js + GSAP + custom WebGL shaders + Lenis | Heavy hero; preloader gates LCP | CTA after preload — risky |
| 8 | lusion.co | Full-page WebGL with scroll nav | Three.js + custom GLSL + WebGL postprocessing | Heavy; agency target | Not conversion-tuned |
| 9 | igloo.inc | 3D Apple-style scroll-driven house | Three.js scroll-mapped camera transforms | Aggressive preload | CTA delayed |
| 10 | rauno.me | "OS"-style dock + sound, View Transitions, horizontal scroll | Next.js + React + View Transitions API | Lean — no WebGL hero | Portfolio |
| 11 | olafurarnalds.com | Cinematic video bg + scroll reveals | Unconfirmed; treat as reference only | Unknown | Not SaaS CTA |
| 12 | Awwwards SOTY 2025 — landonorris.com (OFF+BRAND) | Cinematic scroll sequences, 3D rotating helmet | Webflow + WebGL + Rive | Preloader, heavy desktop bias | Branding |

**Bounce vs depth bet:** VWO reported a bouncing "Pay Now" button cut conversions 11% (perceived as buggy). Google CrUX: bounce rate **doubles** between 2s and 5s LCP, 53% abandon at >3s mobile. **Cinematic worth it ONLY if LCP stays ≤2.5s.**

---

## PART 2 — Tech Stack Comparison

**R3F + drei + Lenis**
- Bundle: 155–170 KB gz Three.js + 10 KB R3F + drei selective. Largest payload.
- Dev: 3–5 days production-grade. Steep shader work.
- Mobile: heavy GPU; needs tier detection. Battery cost.
- A11y: manual `prefers-reduced-motion`. iOS Safari WebGL context limit (~8).

**Spline (runtime + .splinecode)**
- Bundle: 500 KB–1 MB scene-heavy; React runtime ~45 KB gz lazy.
- Dev: hours. Designer-friendly.
- Mobile: GPU-bound but auto-degrades.
- A11y: replace with static export PNG on reduced-motion.

**Rive (.riv)**
- Bundle: ~200 KB WASM + tiny .riv (2–16 KB).
- Dev: needs designer in Rive editor. Best for vector state machines.
- Mobile: very lean once loaded.

**Lottie / dotLottie**
- Bundle: ~50 KB runtime + .lottie 40–70% smaller than .json.
- Dev: fastest. AE export.
- Mobile: CPU rasterization can jank.

**GSAP ScrollTrigger + Lenis + canvas/SVG**
- Bundle: GSAP core ~23 KB + ScrollTrigger ~12 KB + Lenis ~4 KB = ~40 KB.
- Dev: verbose but powerful pin/scrub.
- Mobile: lean.

**Framer Motion + CSS 3D + Lenis (leanest cinematic)**
- Bundle: ~32 KB gz Motion + 4 KB Lenis.
- Dev: fastest in React. Declarative.
- Mobile: best perf, GPU transforms.
- A11y: built-in `useReducedMotion()`.

**Native WebGL shader (Paper Shaders)**
- Bundle: ~10–15 KB gz `<MeshGradient />`. Best wow-per-KB.
- Dev: minutes.
- Mobile: GPU-friendly.

---

## PART 3 — Psychology Slice (hero animation × conversion)

Motion is double-edged. VWO's bouncing-button finding (−11% when motion read as glitchy) shows decorative/erratic animation hurts trust; purposeful motion (directing eye to action) gains 15–40% CTR. Stripe's WebGL gradient survives by animating **behind** the CTA, never delaying it.

Bounce math unforgiving: CrUX bounce roughly doubles 2s→5s LCP, 53% mobile leaves at >3s. Every 100ms of animation on LCP path costs real money. Reduced-motion users estimated low single digits (1–5% from older accessibility surveys), but cohort skews high-intent. Always ship static fallback.

**Bottom line for SkynetLabs:** Cinematic hero worth it IF (a) CTA renders ≤800ms, (b) animation in background layer never blocks form, (c) LCP image preloaded, (d) reduced-motion users get beautiful static.

---

## PART 4 — Recommended Design Spec

### Tech Pick (Justified)
**Paper Shaders `<MeshGradient />` (bg) + Framer Motion (choreography) + Lenis (smooth scroll) + lazy `@splinetool/react-spline` (3D orb)**. Cheapest path to Stripe/Linear-grade gradient (~12 KB), Framer Motion gives `useReducedMotion()` + `useScroll()` for parallax without GSAP surface, Lenis = de-facto cinematic scroll, Spline lets designer iterate orb without R3F shader code. Hero JS ≤95 KB gz.

### Hero Composition (12-col, 100vh / 100svh mobile)
- **Layer 0 (z=0):** Full-bleed Paper Shaders MeshGradient (deep blue → violet → warm magenta, speed 0.15, distortion 0.6). `position: fixed inset-0`.
- **Layer 1 (z=10):** Film grain overlay (CSS noise SVG, 4% opacity). Pointer-events none.
- **Layer 2 (z=20, cols 1–7):** Eyebrow + H1 (3 lines, 56–72px, Geist/Inter) + sub (18–20px) + CTA row: primary "Book a 15-min strategy call" → Cal.com modal, secondary email capture w/ floating-label input + "Get the playbook".
- **Layer 3 (z=30, cols 8–12):** Spline 3D orb (480×480px abstract iridescent sphere w/ bloom), slow rotate, mouse-parallax tilt ≤8°. Never overlaps headline.
- **Layer 4 (z=40, bottom):** Scroll indicator + chevron, fades after 80px scroll.
- **Trust strip at y=85vh:** Past-client logo lockup visible without scroll on tall monitors.

### Animation Choreography (T=0 → 1500ms)
- T=0ms: MeshGradient mount, opacity 0.6→1.0 over 600ms.
- T=100ms: H1 mask-reveal upward, 700ms easeOut, lines staggered 80ms.
- T=300ms: Sub opacity 0→1 + y 12→0, 500ms.
- T=500ms: CTA row scale 0.96→1 + opacity, 400ms spring `{stiffness:280, damping:24}`.
- T=700ms: Email input border glow pulse, one-shot.
- T=900ms: Spline orb fade 0→1 over 600ms (preloaded), gentle rotate.
- T=1500ms: Scroll cue chevron fades in, 8px y-bounce loop.
- Hover: CTA primary lifts y=-2 + shadow expands; orb rotation 2× on cursor-near.

### 3D Element Pick: **Abstract Iridescent Orb (Spline)**
NOT Waseem portrait on 3D plane (kitsch, dates fast). NOT Bali landscape (irrelevant B2B signal). NOT floating case-study cards (belongs section 2). Orb = symbol of "we craft polished premium digital objects", reads Stripe/Apple-tier without competing with text. Cheap to render, easy to swap. Waseem photo lives in About strip.

### Lenis Config
```js
new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,        // do NOT smooth touch — feels broken on mobile
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
})
```
Wrap `<LenisProvider>` client at root layout. Bail on `useReducedMotion()`.

### Scroll-Driven Hero Behavior
- Hero NOT sticky-pinned (delays content discovery for high-intent clickers).
- Parallax via `useScroll` + `useTransform`:
  - Mesh gradient: y 0→80px over first 100vh (slowest, deepest).
  - Spline orb: y 0→200px + scale 1→0.8 + opacity 1→0.4.
  - Headline group: y 0→-40px (dolly-out).
- Section 2 (case-study row) slides in over fading hero. No frame-sequence video.

### Lead Capture Mechanic
- Email input on Layer 2, always in DOM from T=0 (not gated by animation). `aria-live` polite confirmation. POST to API. Honeypot.
- "Book a call" opens Cal.com modal (lazy iframe on click — 0 KB initial).
- Focused input draws 1px gradient border, animated clockwise (CSS conic + `@property --angle`). Submit success → button morphs to green check, 200ms spring.
- Sticky mini-CTA in nav after 600px scroll: "Book a call" pill, transform-only.

### Mobile (≤768px)
- Single column. Mesh gradient stays (cheap). Spline orb **swapped for static AVIF/WebP** (≤8 KB) — keeps 70% impact at 0 KB JS.
- Parallax disabled on touch — only intro fade-in.
- CTAs stack. Email full-width.
- Total mobile hero JS: ≤45 KB gz.

### prefers-reduced-motion Fallback
- `useReducedMotion()` → MeshGradient speed=0 (static), Spline → static image, Lenis disabled, all Motion variants skip to final state.
- CSS escape hatch: `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`.

### Asset List
- `/public/hero/orb-fallback.avif` (mobile + reduced-motion, ≤8 KB, AVIF + WebP fallback)
- `/public/hero/orb.splinecode` (~300–600 KB, lazy after `requestIdleCallback`)
- `/public/hero/grain.svg` (~1 KB)
- Waseem portrait NOT in hero — relocated to /about strip

### Bundle Budget (Hero, Gzipped)
| Item | Budget |
|---|---|
| Paper Shaders | 12 KB |
| Framer Motion | 32 KB |
| Lenis | 4 KB |
| Spline react runtime (lazy) | 45 KB (deferred) |
| Hero component code | 6 KB |
| **Hero initial JS** | **≤54 KB gz** |
| **Hero total after idle** | **≤99 KB gz** |

### Performance Budgets
- **LCP ≤ 2.0 s** (ceiling 2.5 s). LCP element = H1 text, not orb.
- **CLS = 0** — reserve orb box with `aspect-ratio`.
- **INP ≤ 200 ms** — no main-thread blocking.
- **TBT ≤ 150 ms.**
- **Lighthouse Mobile target:** Perf 92+, A11y 100, BP 100, SEO 100.

---

## PART 5 — Implementation Order

Files to create/touch:
- `src/components/sections/HeroV2.tsx` (new)
- `src/components/three/MeshGradientBg.tsx` (new, client)
- `src/components/three/SplineOrb.tsx` (new, client, lazy)
- `src/components/hero/HeadlineGroup.tsx` (new)
- `src/components/hero/LeadCaptureInline.tsx` (new)
- `src/components/providers/LenisProvider.tsx` (new, client)
- `src/components/hero/HeroSwitch.tsx` (new — feature flag → V1 or V2)
- `src/lib/flags.ts` (new — Flags SDK)
- `middleware.ts` (edit — assign cohort cookie)
- `app/layout.tsx` (edit — wrap children in LenisProvider)
- `app/page.tsx` (edit — replace `<Hero />` with `<HeroSwitch />`)

**Steps:**
1. `npm i lenis framer-motion @paper-design/shaders-react @splinetool/react-spline @splinetool/runtime`
2. `npm i -D @next/bundle-analyzer`
3. `LenisProvider.tsx` ("use client") wrapping children w/ `lenis` instance; bail on reduced-motion.
4. Wrap `app/layout.tsx` body children in `<LenisProvider>`.
5. `MeshGradientBg.tsx` — `<MeshGradient colors={...} speed={0.15} distortion={0.6} />`, `position: fixed inset-0 z-0`, prop-disable on reduced-motion.
6. `SplineOrb.tsx` w/ `dynamic(() => import('@splinetool/react-spline'), { ssr: false, loading: () => <StaticOrbImage /> })`; gate behind IntersectionObserver + `(min-width: 768px)`.
7. `HeadlineGroup.tsx` Framer Motion staggered children; export variants.
8. `LeadCaptureInline.tsx` (email input + submit + checkmark + Cal.com modal trigger).
9. Compose `HeroV2.tsx` Layer 0–4 z-stack; wire `useScroll` parallax.
10. `HeroSwitch.tsx` reads `hero_variant` cookie/flag.
11. `npm i @vercel/flags`. Define flag in `src/lib/flags.ts` 50/50.
12. `middleware.ts` — read/assign cohort cookie on first hit.
13. Analytics events: `hero_view`, `hero_cta_book_click`, `hero_email_submit`, `hero_scroll_past`. Tag w/ variant.
14. `next build && ANALYZE=true next build`; verify hero chunk ≤55 KB gz initial.
15. Lighthouse mobile on Vercel preview; gate Perf ≥92, LCP ≤2.5s, CLS=0.

---

## A/B Testing V1 vs V2

- Keep existing `Hero.tsx` intact.
- `HeroSwitch.tsx` reads `hero_variant` cookie/flag → renders `<Hero />` or `<HeroV2 />`.
- Vercel Edge Config + Flags SDK splits 50/50, sticky per visitor (p99 ≤15ms read). Edge-level rewrites = **no client JS for experiment**, no CLS from late swap.
- Success metric: primary = booking CTR; secondary = email submit rate; guardrail = LCP p75 ≤2.5s on V2 cohort.
- Min 2 weeks OR 800 visitors per arm.

---

## Contradictions / Gaps Flagged
- No canonical 2025 telemetry on `prefers-reduced-motion` adoption — older 1–5% estimates only.
- Olafurarnalds.com tech stack unconfirmed.
- VWO/Apollo/NN-Group joint hero study does not exist as cited; numbers from CrUX + VWO blog + Google mobile-load study.
- Lusion / Cuberto / Igloo / Bruno-Simon are agency/portfolio — do NOT imitate preloader-gated pattern for SkynetLabs.

---

## Sources
- [Linear rebuild repo](https://github.com/frontendfyi/rebuilding-linear.app)
- [Stripe gradient deconstruction](https://www.bram.us/2021/10/13/how-to-create-the-stripe-website-gradient-effect/)
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)
- [Paper Shaders MeshGradient](https://shaders.paper.design/mesh-gradient)
- [Paper Shaders GitHub](https://github.com/paper-design/shaders)
- [Lenis (darkroomengineering)](https://github.com/darkroomengineering/lenis)
- [Lenis + Next.js setup](https://bridger.to/lenis-nextjs)
- [Rive vs Lottie 2025](https://dev.to/uianimation/rive-vs-lottie-which-animation-tool-should-you-use-in-2025-p4m)
- [GSAP vs Framer Motion 2026](https://codolve.com/blog/gsap-vs-framer-motion)
- [Motion React scroll animations](https://motion.dev/docs/react-scroll-animations)
- [Codrops Reactive Depth scroll](https://tympanus.net/codrops/2026/02/17/reactive-depth-building-a-scroll-driven-3d-image-tube-with-react-three-fiber/)
- [LCP web.dev](https://web.dev/articles/lcp)
- [prefers-reduced-motion web.dev](https://web.dev/articles/prefers-reduced-motion)
- [Vercel Flags SDK](https://vercel.com/docs/flags/flags-sdk-reference)
- [Spline + Next.js](https://dev.to/nyctonio/next-js-3d-elements-with-spline-3m84)
