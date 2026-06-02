import type { ServiceFunnelContent } from "./types";

/**
 * Facebook Automation — full funnel copy (Phase B).
 * Mined from content/services/facebook-automation.html + SkynetLabs brand voice:
 * founder-first, public pricing, specific, anti-fluff. No canonical case maps
 * to facebook-automation → proof is representative (no client metrics, no
 * de-anonymized names). Tiers from service-pricing.ts:
 * Starter $1,297 / Pro $3,497 / Custom $1,297/mo.
 */
const content: ServiceFunnelContent = {
  slug: "facebook-automation",
  label: "Facebook Automation",

  hero: {
    eyebrow: "AI Content · Facebook Automation · 2026",
    h1: "Every lead that DMs your page gets answered in 4 minutes, not next Tuesday.",
    sub: "Buyers comment on your post, message your page, ask the price — then sit unanswered until they buy from whoever replies first. I wire a keyword DM funnel, comment auto-reply, and a posting schedule into one system so the page books calls while you sleep. Built on the official Graph API and ManyChat, Meta's approved automation partner — not a browser bot that gets pages banned.",
    primary: { label: "Book the page audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "Live in 5-10 days",
    ],
  },

  pains: [
    {
      title: "Leads rot in the inbox",
      body: "Someone messages \"how much?\" at 9pm and gets a reply at noon the next day — if at all. By then they've messaged two competitors. The page generates interest you never convert because nobody is on the inbox at the moment intent peaks.",
    },
    {
      title: "Comments are a missed funnel",
      body: "Every \"interested\" and \"price?\" under your post is a buyer raising a hand. Most pages reply with a thumbs-up emoji and lose them. There's no system that turns a comment into a DM into a booked call.",
    },
    {
      title: "Posting stops the week you get busy",
      body: "The page goes dark the moment a launch or a sick kid eats your week, and Facebook's reach craters to double digits within days. No buffer, no schedule, no recovery — just a feed that looks abandoned to anyone who lands on it.",
    },
    {
      title: "No follow-up after the first reply",
      body: "A lead replies once, you answer, and then nothing. No nudge, no booking link, no second touch. The deals that need three messages to close never get the second or third — they just go cold in a thread you forgot to scroll back to.",
    },
  ],

  outcomes: [
    {
      title: "Every DM answered on the first touch",
      body: "A ManyChat keyword funnel catches \"price\", \"info\", and \"demo\" the second they land, sends the menu, and drops a calendar link — then escalates to you only when the buyer keeps typing. No lead waits overnight again.",
      proof: "First reply in seconds, not next day",
    },
    {
      title: "Comments become booked calls",
      body: "Comment auto-reply on your ad and post comments turns \"interested\" into a DM thread automatically, inside Meta's policy. The hand-raise gets a response while the buyer is still on the post, not three days later.",
      proof: "Comments converted while still warm",
    },
    {
      title: "A page that never goes dark",
      body: "A 9-card weekly post mix — educational, story, sell — scheduled a month ahead from one content source, each ending in a comment prompt because the algorithm rewards conversation, not broadcast.",
      proof: "9-card mix, a month scheduled ahead",
    },
    {
      title: "Every lead lands in one place, ready to follow up",
      body: "Page DMs, comment captures, and Lead Form submissions land in one follow-up tool tagged by source, so follow-up messages fire automatically and nothing depends on you remembering to scroll back through Messenger.",
      proof: "0 leads lost to the inbox",
    },
  ],

  comparison: {
    heading: "Me vs the social-media agency you almost hired.",
    cols: ["", "With me", "Typical social agency / Meta freelancer"],
    rows: [
      {
        dimension: "Who builds it",
        us: "I do — the founder who'll run your screen-share, not a junior under a logo.",
        them: "A junior or an offshore VA you never meet, working off a template brief.",
      },
      {
        dimension: "What you actually get",
        us: "A DM + comment + posting system wired into your follow-up tool that you keep.",
        them: "A monthly 'we'll manage your page' retainer with nothing you own.",
      },
      {
        dimension: "Pricing",
        us: "Public, fixed tiers on this page. Fixed scope back in 48 hours.",
        them: "'Book a strategy call for a custom quote' — then a number that moves.",
      },
      {
        dimension: "Ban risk",
        us: "Official Graph API + ManyChat, 24-hour window respected, audit-safe.",
        them: "Sometimes browser-emulation 'auto-DM' tools that can get a page flagged.",
      },
      {
        dimension: "Lock-in",
        us: "You get ManyChat builder access, the GHL pipeline, and a runbook on day 10.",
        them: "Everything lives in their account — leave and the funnel leaves with them.",
      },
      {
        dimension: "Always-on coverage",
        us: "Solo. If a DM needs a human at 3am, the bot holds it; I'm not staffing a desk.",
        them: "A bigger team can put a real person on live chat across more hours.",
      },
    ],
  },

  process: [
    {
      title: "Audit",
      body: "I read the page and inbox: reach per post, average DM reply time, which comments went unanswered, and where the highest-intent buyers drop off. You get a written kill / keep / build list before anything is wired. (Day 1-2)",
    },
    {
      title: "Build",
      body: "ManyChat keyword funnel, comment auto-reply, and the GHL pipeline wired and tested with real test messages. The first month of the 9-card post mix is scheduled, each post carrying a comment prompt. (Day 3-7)",
    },
    {
      title: "Hand off",
      body: "We run a parallel week with you on the screen-share watching live DMs flow in, then I hand over a one-page runbook per channel, ManyChat builder access, and a weekly attribution review. (Day 8-10)",
    },
  ],

  fitCheck: {
    forYou: [
      "You already have a page with traffic — comments, DMs, ad replies — that nobody is answering fast enough.",
      "You've got budget ready and want a system you own, not another monthly 'we'll handle it' invoice.",
      "You run a local service, coaching, or community brand where a DM-to-call is the real sale.",
      "You want the funnel wired into your follow-up tool so follow-up fires without you scrolling Messenger.",
    ],
    notForYou: [
      "You want the cheapest quote — a Fiverr gig will undercut me and you'll get a Fiverr funnel.",
      "You want me to run your page forever; I build it, hand it over, and you keep the keys.",
      "You're starting from zero audience — fix that with ads first, then automate the inbox.",
    ],
  },

  proof: {
    metric: "Comment → DM → booked call",
    client: "Representative SkynetLabs build",
    detail:
      "The repeatable play: a ManyChat keyword funnel that answers \"price\" and \"info\" on the first touch, comment auto-reply that turns a hand-raise into a DM thread while the buyer is still on the post, and a 9-card weekly mix that keeps the page from going dark — all inside Meta's official Graph API, audit-safe.",
  },

  secondaryProof: {
    metric: "1 source → 9-card month",
    client: "Representative / internal SkynetLabs build",
    detail:
      "Internal build, not a client metric: one content source fans out into a 9-card weekly mix — educational, story, sell — scheduled a month ahead in a Notion calendar, each card ending in a comment prompt that feeds the same keyword funnel. The point isn't volume; it's a page that never goes dark and never depends on me remembering to post.",
  },

  faqs: [
    {
      q: "Isn't Facebook dead for organic reach?",
      a: "Dead for static-image broadcasts, very much alive for DM funnels, comments, Reels, and Groups. For local services, coaches, and community-led brands sitting on an audience that already opted in, Facebook still has the cheapest DM-to-booked-call conversion of any organic channel. I build on the surfaces that still work and skip the page-broadcast trap.",
    },
    {
      q: "How fast does it go live?",
      a: "Starter is live in about 5 days — page optimisation, 10 posts, and the ManyChat keyword funnel. The Pro build (page + groups + ad-comment automation + lead capture) runs around 10 days. Need it faster? The rush add-on cuts ship time in half.",
    },
    {
      q: "Is the DM bot going to get my page banned?",
      a: "No. Everything runs through Meta's official Graph API and ManyChat, the approved automation partner — no browser-emulation tools, no session hijack, and it respects the 24-hour messaging window. The method is auditable and policy-safe; you can only get flagged on content, not on how it's wired.",
    },
    {
      q: "Do I own the funnel and content after handoff?",
      a: "Yes. You get ManyChat builder access, the GHL pipeline, and a one-page runbook per channel. The post mix lives in a Notion calendar you keep. Nothing is locked behind my login — about a third of clients keep me on the monthly retainer because they'd rather outsource the review, not because they have to.",
    },
    {
      q: "Can you wire the leads into our existing CRM, not just GHL?",
      a: "GoHighLevel is the default because the funnel, calendar, and follow-up cadences live in one place. But the capture layer is just a webhook — I've pushed Facebook leads into HubSpot, Pipedrive, and plain Google Sheets the same way. Tell me your stack on the call and I'll wire to it.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter is page setup, 10 posts, and a ManyChat DM funnel; Pro adds groups, ad-comment automation, and a full lead-capture funnel into your CRM; the retainer covers 30 posts a month plus DM monitoring and reporting. Fixed scope back within 48 hours of your brief.",
    },
  ],

  finalCta: {
    h2: "Stop letting buyers DM your page into the void.",
    body: "30-min discovery call. I'll audit your page and inbox, rank the gaps by how many leads they cost you, and have a fixed-scope build plan back in 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
