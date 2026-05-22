# NOT_FOUND_PAGE — Retro Arcade 404

## Aesthetic chosen
**Retro arcade / 8-bit pixel** — broad nerd appeal, clean CSS-only execution, and matches Waseem's "builder energy" without requiring canvas, GSAP, or Three.js. Press Start 2P font does the heavy lifting; rest is layered CSS gradients and one tiny client component.

## Easter egg implemented
**Konami code** (↑↑↓↓←→←→BA) listener.
- Hint chip pinned bottom-right: shows progress as the user types the sequence (`CHEAT 0/10 → 10/10`).
- On complete: full-screen modal "SECRET UNLOCKED — +1 EXTRA LIFE" with copy: *mention KONAMI when booking a discovery call and Waseem will throw in a free AEO audit.*
- CTA in modal routes to `/discovery-call`. Close button + click-outside-to-dismiss both wired.
- Single small client component; rest of page is server-rendered.

## Files created / modified
- **MODIFIED**: `src/app/not-found.tsx` (replaced the old WhatsApp / corporate version — that page hardcoded a wa.me link, which is explicitly banned per spec)
- **CREATED**: `src/components/easter/KonamiUnlock.tsx`
- **CREATED**: this report `app/NOT_FOUND_PAGE.md`
- No other files touched. Sitemap untouched. `robots: { index: false, follow: false }` set in page metadata.

## Build status
`npm run build` from `app/` directory: **clean, 0 errors.**
- Next.js 16.2.6 + Turbopack
- TypeScript pass: green
- Static-page generation: 871/871 in 6.3s
- `_not-found` appears as a prerendered static route, which is correct in Next 16 (the underscore-prefixed entry is how Next 16 lists the 404 — separate from the user route count and not crawled).
- One pre-existing warning about workspace root inferring `C:/Users/info/package-lock.json` — unrelated to this task, existed before any change.

## Screenshot mental-model
The viewport opens onto a dark ocean-into-black radial gradient with a faint cyan grid receding into the horizon and tiny pinprick stars dusted across the field. CRT scanlines pulse softly over everything with a 6-second flicker. A status bar at the top reads `PLAYER-1 · SKYNETLABS · SCORE 000404`. The number `404` dominates the center in cyan with a magenta neon glow, sitting above a magenta `GAME OVER` headline. Below, white pixel text with a blinking underscore reads `THIS LEVEL DOESN'T EXIST._` and then a muted `HAVE YOU TRIED git checkout main ?`. Two chunky pixel buttons sit side by side — a mint-teal `▶ RESPAWN (HOME)` and a cyan-outlined `⚡ CHEAT CODE (CONTACT)` — both with hard pixel-art drop shadows that shake-jiggle on hover. A `── LEVEL SELECT ──` strip lists 5 popular pages styled as world maps (`WORLD-1 HOMEPAGE`, `WORLD-2 SERVICES`, etc.). Pinned bottom-right floats the Konami hint chip; complete the sequence and a modal nukes the screen with a teal-bordered "+1 EXTRA LIFE" unlock. On mobile (≤375px) the pixel grid scales clean — 64px 404, 14px headline, full-width stacked CTAs. Reduced-motion users get a frozen still frame with no flicker or shake.
