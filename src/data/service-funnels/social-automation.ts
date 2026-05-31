import type { ServiceFunnelContent } from "./types";

/**
 * Social Automation — full funnel copy.
 * Mined from content/services/social-automation.html + SkynetLabs brand voice:
 * founder-first, public pricing, anti-fluff, official-API-only positioning.
 * Proof = canonical case "saas-multi-channel-aeo-content-engine"; other lines
 * representative (no unverified client metrics). Bali-built, ship in 5-14 days.
 */
const content: ServiceFunnelContent = {
  slug: "social-automation",
  label: "Social Automation",

  hero: {
    eyebrow: "Automation · Social Automation · 2026",
    h1: "You posted three reels this week and answered two DMs out of forty.",
    sub: "The buyer who messaged at midnight followed someone else by lunch — the first-reply window on Instagram is closer to six minutes than six hours. I wire one posting queue across every channel, a keyword DM responder that replies in seconds, and a human-escalation layer so the leads that matter still land on your screen. The same official-API engine behind our multi-channel SaaS content build.",
    primary: { label: "Book the channel audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Official APIs only",
      "Live in 14 days",
    ],
  },

  pains: [
    {
      title: "Posting eats the week, then stops",
      body: "Reformatting the same caption five ways, juggling aspect ratios, chasing the calendar. When a busy week hits, posting stops cold — and the algorithm punishes the gap for a month after you come back.",
    },
    {
      title: "DMs rot in the unread folder",
      body: "Someone comments 'price' or DMs 'info' on a Tuesday night. You see it Thursday. By then they've booked the competitor who replied in four minutes. The bookings were never about reach — they were always in the inbox you can't keep up with.",
    },
    {
      title: "No system means no compounding",
      body: "Presence is on-and-off because it depends on you having a free afternoon. There's no queue, no responder, no record of what converted — so every good month resets to zero the next time you're slammed.",
    },
    {
      title: "The 'automation' tools that get you banned",
      body: "Half the cheap tools selling this run session-hijack scripts that scrape DMs and auto-follow at scale. They work until Meta wakes you up to a disabled account and a lost audience. Fast to set up, fast to torch your reach.",
    },
  ],

  outcomes: [
    {
      title: "One queue, every platform, your face up front",
      body: "A single content calendar fires to Instagram, Facebook, LinkedIn, TikTok, X, and Pinterest with per-platform copy and aspect ratios. Time-zone smart, so a Bali creator with US buyers drafts at 9pm Bali and the queue posts at 8am New York. Your founder face stays the constant across all of it.",
      proof: "Multi-channel SaaS launch: 1 script → 5 channels",
    },
    {
      title: "Leads answered before they cool off",
      body: "A keyword-triggered responder sends the menu, the calendar link, and the next step in seconds — then routes a warm buyer to a human the moment they keep talking. Built on ManyChat plus the official WhatsApp/Signal Cloud API, not a scraper.",
      proof: "First reply in seconds, not days",
    },
    {
      title: "Attribution, not vanity metrics",
      body: "Every keyword DM gets a source tag, passes through to your CRM, and joins back to closed-deal value in one Looker Studio view. The weekly digest reads DMs → booked calls → closed work — not 'impressions up 14%.'",
      proof: "1 weekly digest tied to revenue",
    },
    {
      title: "An account built to survive an audit",
      body: "Meta Graph, TikTok Business, and LinkedIn official APIs only. No grey-hat follow-bots, no fake engagement, no banned automations. Slower to wire, but it doesn't get your account disabled.",
      proof: "Official APIs only · audit-safe",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "Read-only look at your platforms, your posting cadence, your DM inbox, and your real reply latency. You leave with a weekly content-brief template and a ranked list of the DM flows actually worth automating. (Day 1-3)",
    },
    {
      title: "Design",
      body: "Content-pillar map, posting calendar, responder script, keyword triggers, and escalation rules. You sign off the tone and the exact trigger words before anything goes live — nothing automated talks to a buyer until you've approved how it sounds. (Day 4-6)",
    },
    {
      title: "Ship + hand off",
      body: "Wire ManyChat / Cloud API, connect the scheduler, hook up the dashboard, and run a parallel week before cutover. You get a Loom per platform, a one-page runbook, and one calendar your team owns. The retainer after that is optional. (Day 7-14)",
    },
  ],

  proof: {
    metric: "1 script → 5 channels",
    client: "Multi-channel SaaS launch (anonymized)",
    detail:
      "A SaaS founder ships a daily voice-locked pack across LinkedIn, Facebook, Instagram, YouTube and TikTok from a single script — and now signs off on roughly 9 of every 10 packs without rewriting anything. Same official-API engine, format-correct per channel.",
  },

  faqs: [
    {
      q: "Will this get my account banned?",
      a: "Not the way I build it. The horror stories come from session-hijack tools that scrape DMs and auto-follow at scale. I only use Meta Graph, TikTok Business, and LinkedIn's official APIs. They're rate-limited and slower to set up, but they're approved and they survive a platform audit. If a flow can't be done cleanly, I tell you and we don't ship it.",
    },
    {
      q: "Will the DM responder sound like a bot?",
      a: "No — because it's written in your voice and only handles the opening move. Keyword matches send your menu and link in seconds, then the moment a buyer keeps talking it escalates to a human (you or your team) via Telegram or Slack. Leads get a fast first reply without ever feeling handed to a script.",
    },
    {
      q: "Do you write the content too, or just wire the engine?",
      a: "Default is wiring the plumbing and handing you a brief template your team feeds. If you want the words too, the retainer tier includes a monthly content batch in your locked voice. Most clients run their own content and just want the posting + DM system underneath it.",
    },
    {
      q: "How fast does it actually reply, and how many channels can one person run?",
      a: "Under 30 seconds on average for a keyword match, including the Cloud API template send. Human escalation hits your phone within five minutes for any non-matched buyer-intent message. One operator can run five-plus channels from a single queue in well under an hour a day once the queue is wired.",
    },
    {
      q: "What tools does this run on?",
      a: "One scheduler (GHL, Metricool, Buffer, or direct API via n8n) across IG/TikTok/FB/LinkedIn/X, ManyChat for Meta DMs, the official WhatsApp/Signal Cloud API for handoff, and Looker Studio for attribution. I pick by your channel mix and load — you own every account and login at the end.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter wires a single channel plus a DM responder; Pro is a 3-channel stack with the DM funnel, lead capture, and a Loom SOP; the retainer covers monthly content plus weekly dashboard review. Fixed scope back within 48 hours of your brief.",
    },
  ],

  finalCta: {
    h2: "Stop losing buyers in your unread folder.",
    body: "30-min audit call. You walk away with a posting calendar template and a DM responder script — yours either way — plus fixed scope back in 48 hours.",
    ctaLabel: "Send a 3-sentence brief",
  },
};

export default content;
