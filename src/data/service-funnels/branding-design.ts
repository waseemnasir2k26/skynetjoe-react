import type { ServiceFunnelContent } from "./types";

/**
 * Branding & Design — full funnel copy.
 * Pain: inconsistent brand, DIY-looking assets, no system to stay consistent.
 * Outcome: a cohesive brand kit + reusable templates so everything looks intentional.
 * Proof = canonical case "northeast-recovery-brand-intake-rescue" (KODIASIMMO),
 * which lists branding-design as a related service. Illustration line is
 * representative (no unpublished client pairings).
 */
const content: ServiceFunnelContent = {
  slug: "branding-design",
  label: "Branding & Design",

  hero: {
    eyebrow: "Consulting · Branding & Design · 2026",
    h1: "Your brand looks different on every page. Buyers notice before you do.",
    sub: "The logo says one thing, the Instagram grid another, the pitch deck a third. Nothing's wrong with any single piece — but stacked together they read DIY, and that quietly knocks a zero off what people think you can charge. I build the parts that actually move a buyer (voice, palette, type, photo direction) into one kit and a Figma library your team runs on, so everything you ship from now on looks like it came from the same room.",
    primary: { label: "Book the brand audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "9 countries",
      "Public pricing",
      "Figma-delivered",
      "Ships in 5-14 days",
    ],
  },

  pains: [
    {
      title: "Death by a thousand small differences",
      body: "Each asset is fine on its own. Together they're a slightly different blue, a different font, a caption written in a voice you don't recognise. A buyer comparing you to a competitor can't name it, but they feel the wobble — and the wobble reads as risk.",
    },
    {
      title: "A $300 logo carrying the whole brand",
      body: "You bought a mark on Fiverr in 2021 and nothing was ever built behind it. No palette with real rules, no type scale, no photo direction. So every new flyer, deck, or post is a fresh guess, and half of them look like a different company made them.",
    },
    {
      title: "Nobody can stay on-brand without you in the room",
      body: "Hand the brand to a VA, a freelance designer, or a new hire and it drifts inside a week — because the rules live in your head, not in a file anyone can open. Every asset becomes a re-brief, and re-briefing is the thing eating your Tuesday.",
    },
    {
      title: "It works on the laptop, falls apart on the phone",
      body: "The identity was designed in a desktop mockup that nobody actually sees. On a phone — where the buyer really meets you — the logo's illegible, the palette muddies, and the photography looks like the same three stock images everyone else uses.",
    },
  ],

  outcomes: [
    {
      title: "One kit, and everything matches",
      body: "Logo, palette with semantic tokens, type pairing with a real sizing scale, and a photo direction (mood board, shot list, Lightroom LUT) so a phone snap in your own space lands consistent without looking like stock. Pick from three directions before anything gets built — no big reveal you secretly hate.",
      proof: "3 directions before you commit",
    },
    {
      title: "A Figma library your team builds on",
      body: "Colours, type, and spacing as variables. Components for buttons, cards, hero blocks, social, email, and decks. Whoever applies the brand opens the file and produces on-brand work the same afternoon — no Figma-to-design translation loss.",
      proof: "Figma variables + component library",
    },
    {
      title: "Templates so 'on-brand' stops being your job",
      body: "Reusable social, document, and pitch-deck templates plus a 20-page operating brand book (not an 80-page trophy nobody opens). A new hire or freelancer gets consistent in about 30 minutes, and you stop being the bottleneck.",
      proof: "20-page operating book, not 80",
    },
    {
      title: "Pixel-level finishing when it counts",
      body: "Retouch and illustration for the surfaces that carry weight — founder photos, product shots, pitch covers, even long-form illustrated work like a multi-chapter graphic-novel character system. Done in-house, so the finishing matches the rest of the kit instead of reading as stock.",
      proof: "Retouch + illustration in-house",
    },
  ],

  process: [
    {
      title: "Audit & position",
      body: "Pull every brand artifact you currently use, tear down three competitors, and interview you plus a couple of your best clients. Out of it: a positioning statement, a voice profile, and the three real tensions your brand has to resolve. (Days 1-4)",
    },
    {
      title: "Direction & system",
      body: "Three identity directions on the table — you pick one before a full system gets built. Then the kit, the Figma library with tokens and components, the photo direction, and six to eight application examples (homepage hero, social card, email signature, one-pager). (Days 5-12)",
    },
    {
      title: "Ship & hand off",
      body: "The 20-page operating brand book, the Figma handover, and two training sessions with whoever applies the brand day to day. Live-apply the new system to your top three surfaces, then a 30-day quality review so it sticks. (Days 13-14)",
    },
  ],

  proof: {
    metric: "Brand restored to founder-spec",
    client: "Northeast US clinical recovery network (KODIASIMMO)",
    detail:
      "Inherited a half-built brand kit from a previous agency — off-spec palette, a wordmark that didn't match the asset file. We reconciled it in a single working day, restoring the founder's actual logo asset and a Pantone-aligned palette in time for a major referral-partnership announcement. As the Clinical Director put it: \"He had it fixed before lunch.\"",
  },

  faqs: [
    {
      q: "Do we need a full rebrand or just a refresh?",
      a: "Often a refresh. If the logo has equity worth keeping and the real problem is drift — inconsistent application, weak templates, no Figma library — we keep the mark, fix the system around it, and the old logo starts looking better in context. Full rebrand is right when the positioning or audience has genuinely shifted. I'll tell you which one your situation needs before you pay for the bigger one.",
    },
    {
      q: "Will you change our logo?",
      a: "Only if it earns its keep. A fair share of engagements end with the same logo, refined type, a new palette, and a system that makes the mark look more expensive than it did. Re-drawing the logo while the rest of the brand is broken is fresh paint on a leaking roof.",
    },
    {
      q: "Do we own the files, or are we renting them?",
      a: "You own everything — Figma source with editable variables and components, the brand book, the photo LUT, the lot. The whole point is that your team can extend the system without coming back to me for every asset. No locked files, no hostage situation.",
    },
    {
      q: "How many revisions do I get?",
      a: "You see three directions up front and pick one, so we're refining a choice you already made rather than guessing in the dark. Starter includes three revision rounds on the mark; the full system bakes in two rounds across the build. Extra rounds are a public, fixed add-on if you want them — no surprise invoices.",
    },
    {
      q: "Can you build the website on top of this too?",
      a: "Yes, and it's the most common next step. We hand the Figma library to our Next.js build team and ship a site on the exact system — same studio, same accountable person, no translation loss between design and dev. It's scoped and priced separately so you're never paying for something you didn't ask for.",
    },
    {
      q: "What does it cost and how long?",
      a: "Public, fixed pricing — see the tiers above. Starter (logo, palette, type, one-page sheet) ships in 5-7 days; the full identity system with Figma library and templates runs 10-14. Fixed scope back in your inbox within 48 hours of the brief.",
    },
  ],

  finalCta: {
    h2: "Stop looking like three different companies.",
    body: "30-minute discovery call. I'll audit where your brand drifts, show you the three biggest leaks, and have fixed scope back in 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
