import type { ServiceFunnelContent } from "./types";

/**
 * E-commerce Automation — full funnel copy (Phase B).
 * Mined from content/services/ecommerce-automation.html + SkynetLabs brand voice:
 * founder-first, public pricing, specific, anti-fluff. Proof = canonical case
 * "ksa-fashion-retailer-shopify-ecommerce" (KSA fashion retailer, anonymized) —
 * NOT the Northeast US recovery network, which is a different case.
 * Tiers from service-pricing.ts: Starter $2,997 / Pro $8,500 / Custom $2,497/mo.
 */
const content: ServiceFunnelContent = {
  slug: "ecommerce-automation",
  label: "E-commerce Automation",

  hero: {
    eyebrow: "Development · E-commerce Automation · 2026",
    h1: "One order trigger handles fulfilment, the cart, and the review request — while you sleep.",
    sub: "Your store earns despite the stack, not because of it: an inventory sheet, a label tool, a Klaviyo flow that won't fire on the right tag, and a support inbox three days behind. I wire Shopify or Woo, Stripe, and Klaviyo into one event-driven system so a single order trigger runs everything downstream. Same discipline behind the bilingual KSA fashion Shopify store we shipped null-to-launch in 14 days.",
    primary: { label: "Book the stack audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "Ship in 7-14 days",
    ],
  },

  pains: [
    {
      title: "Fulfilment runs on three tabs and a sticky note",
      body: "Order comes in, you copy it to the inventory sheet, paste it into ShipStation, check stock by eye, paste the tracking number back. Twelve manual minutes per order, every order — and one mistyped SKU ships the wrong thing to the wrong country.",
    },
    {
      title: "Carts walk away and never come back",
      body: "Most checkouts get abandoned, and the recovery email either doesn't exist or fires on the wrong tag two days too late. That's money walking out of the store every single day with no system catching it.",
    },
    {
      title: "Buyers vanish after the first order",
      body: "A first-time buyer never hears from you again — no review request, no post-purchase nudge, no reorder reminder. Lifetime value flatlines, so you're stuck buying the same customer twice on ad spend that keeps getting more expensive.",
    },
    {
      title: "Supplier and stock data drift apart",
      body: "Shopify says 8 in stock, the warehouse has 2, the supplier sheet is a week stale. You find out you oversold when the angry email lands — and reconciling it by hand eats the afternoon you needed for marketing.",
    },
  ],

  comparison: {
    heading: "Me vs the Shopify agency you almost hired.",
    cols: ["", "With me", "Typical Shopify agency / app-stack DIY"],
    rows: [
      {
        dimension: "Who builds it",
        us: "I build and wire every flow myself — same person on the audit, the build, and the hand-off call.",
        them: "A salesperson scopes it, a junior or an offshore team builds it, and you never speak to whoever actually touched your store.",
      },
      {
        dimension: "Pricing",
        us: "Public, fixed tiers on the page. Scope locked in writing within 48 hours of your brief.",
        them: '"Book a call for a quote." Stacked monthly app fees that creep as order volume grows.',
      },
      {
        dimension: "What you own",
        us: "n8n flows in Git, on your account or VPS — fork it, extend it, self-host it. No per-order fee, nothing behind my login.",
        them: "Logic trapped inside Shopify apps you rent forever; cancel the app and the automation dies with it.",
      },
      {
        dimension: "Storefront speed",
        us: "Cart, inventory, and lifecycle logic moves to background workflows — less script weight on the page.",
        them: "Five apps each loading their own scripts on every storefront visit, dragging LCP down.",
      },
      {
        dimension: "When it breaks",
        us: "A one-page runbook per flow plus a 14-day fix window, so a launch-week edge case doesn't catch you alone.",
        them: "A support ticket queue and a chatbot that doesn't know your store.",
      },
      {
        dimension: "Team size",
        us: "One founder in Bali. If I'm asleep when it breaks at 3am, you wait for my morning.",
        them: "A bigger bench and a support rota that can answer around the clock.",
      },
    ],
  },

  outcomes: [
    {
      title: "Order to fulfilment, no human in the middle",
      body: "Shopify order webhook → n8n routes by SKU → inventory check → ShipStation label → tracking number into the Klaviyo confirmation flow. The manual paste-between-tabs step disappears, and one ops person handles far more volume.",
      proof: "Order-to-label, no human in the loop",
    },
    {
      title: "Carts recovered while you do nothing",
      body: 'A two-hour email nudge, a 24-hour SMS with an offer, a 72-hour "what went wrong" survey — all source-tagged so recovery attribution joins back to ad spend instead of guessing.',
      proof: "Recovery flow runs unattended",
    },
    {
      title: "Post-purchase that compounds into repeat revenue",
      body: "Review request at the right delivery moment, reorder reminder timed to the product's burn rate, win-back when they go quiet. The lifecycle turns one-time buyers into repeat orders without touching ad budget.",
      proof: "Review + reorder + win-back wired",
    },
    {
      title: "Supplier and stock that stay in sync",
      body: 'Low-stock threshold trips a Slack alert and a draft reorder PO to the supplier; inbound restocks write back to Shopify. No more "we sold out yesterday" surprises or oversold orders to refund.',
      proof: "0 manual stock reconciliations",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "I map every manual paste-job: Shopify apps, Klaviyo flows, ShipStation rules, the support inbox, the supplier sheet. You get a written kill / keep / rebuild report and a workflow diagram before I touch the store. (Day 1-4)",
    },
    {
      title: "Build",
      body: "n8n flows built in staging — order-to-fulfilment, abandoned cart, post-purchase lifecycle, supplier sync — then parallel-run against real orders for several days. We cut over only after zero errors, migrating Klaviyo flows last. (Day 5-12)",
    },
    {
      title: "Hand off",
      body: "A one-page runbook per workflow, Loom walkthroughs, the operations dashboard handed to your team, and a fix window so a launch-week edge case doesn't catch you alone. (Day 13-14)",
    },
  ],

  proof: {
    metric: "Cart-surprise ~38% → <3%",
    client: "KSA fashion retailer (anonymized)",
    detail:
      "A bilingual RTL-native Shopify shoe store shipped null-to-launch in 14 days, with the Aramex courier rate surfaced on the cart page — cutting cart-stage shipping surprise from roughly 38% to under 3% and pulling the size-return rate from 22% to 9%. Showroom appointments roughly doubled, from about 12 a month to 25.",
  },

  secondaryProof: {
    metric: "Size returns 22% → 9%",
    client: "KSA fashion retailer (anonymized)",
    detail:
      "Same bilingual Arabic-English Shopify build: a 'wrong size?' shortcut on the order page swapped the punishing returns form for a same-size, different-fit exchange, dropping the size-return rate by 13 points. Showroom appointments climbed from about 12 a month to roughly 25 — buyers walked in saying they'd already seen the shoe online.",
  },

  guarantee: {
    title: "Fixed scope before you pay. Fixed for 14 days after.",
    body: "After the audit I lock the build scope in writing within 48 hours, so you know exactly what ships and what it costs before any money moves. Every workflow then carries a 14-day post-launch fix window — if an edge case breaks in your store, I fix it. I don't promise revenue numbers I can't control, and there are no refunds; what I guarantee is the build and the fix window.",
  },

  faqs: [
    {
      q: "Do you only work with Shopify, or Woo too?",
      a: "Both. The pattern is identical: a webhook leaves the platform, n8n handles routing, Stripe handles money, Klaviyo handles email. Shopify is the default because most clients are already on it; WooCommerce works well for content-heavy or WordPress-native stores. BigCommerce and headless setups follow the same shape.",
    },
    {
      q: "How long does a build take?",
      a: "Starter — order-to-fulfilment plus abandonment recovery with a SKU import — ships in 7-10 days. The full Pro store ops rebuild with returns, post-purchase lifecycle, and courier integration runs 12-14 days. I work in parallel with your live store, so there's no migration downtime and no order goes dark mid-build.",
    },
    {
      q: "Do I own the automations, or am I renting them from you?",
      a: "You own them. The orchestration lives in n8n, version-controlled in Git, on your account or your VPS. Every workflow comes with a one-page runbook and a Loom. Unlike a Shopify app, there's no per-order fee and nothing locked behind my login — you can extend, fork, or self-host whenever you want.",
    },
    {
      q: "Won't all this automation slow my storefront down?",
      a: "It's usually the opposite. Most of what I replace is Shopify apps loading scripts on the storefront. Moving abandoned-cart, inventory, and lifecycle logic into background n8n workflows takes that weight off the page — stores I've migrated typically see a 30-50% LCP improvement.",
    },
    {
      q: "Does this connect to my 3PL, courier, and supplier feeds?",
      a: "Yes. ShipStation, Easyship, and most courier APIs connect straight into the routing layer; supplier reorder POs go out by email or API; subscriptions run through Recharge or Stripe Billing. The whole point is one hub everything feeds into, instead of five apps that each know a different slice of the order.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter is theme install plus abandonment recovery and a 50-SKU import; Pro is a full store ops rebuild with custom theme, post-purchase lifecycle, and returns and courier integration; the retainer covers monthly launches, campaign automation, and BFCM prep. Fixed scope back within 48 hours of your brief.",
    },
  ],

  finalCta: {
    h2: "Stop running fulfilment on three tabs and a sticky note.",
    body: "30-min discovery call. I'll audit the stack, rank where you're losing money — abandoned carts, manual ops hours, dead post-purchase — by dollar value, and have a fixed-scope build plan back in 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
