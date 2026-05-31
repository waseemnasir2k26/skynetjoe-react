import type { ServiceFunnelContent } from "./types";

/**
 * TikTok Automation — full funnel.
 * Mined from content/services/tiktok-automation.html + SkynetLabs brand voice:
 * founder-first, public pricing, specific, anti-fluff. No canonical case maps
 * to tiktok-automation → proof is representative (no client metrics, no
 * de-anonymized names). "ship in 14 days".
 */
const content: ServiceFunnelContent = {
  slug: "tiktok-automation",
  label: "TikTok Automation",

  hero: {
    eyebrow: "AI Content · TikTok · 2026",
    h1: "Daily TikToks, batched once a week, posted while you sleep.",
    sub: "TikTok wants volume and speed no human can keep up by hand — and the algorithm decides whether to show you in the first 0.8 seconds. I build the batch-and-post engine: a hook bank rotated by weekday, frame-one stoppable thumbnails, kinetic captions, and a scheduler that ships daily and cross-posts to Reels and Shorts. You record once; the pipeline does the rest. Built from a Canggu cafe, shipped in 14 days.",
    primary: { label: "Book the hook audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "Engine ships in ~14 days",
    ],
  },

  pains: [
    {
      title: "The volume is unsustainable by hand",
      body: "TikTok punishes you for slowing down and rewards daily posting. Editing one clip a day around real work is a job nobody keeps up past month three — so the account goes quiet right when it was starting to move.",
    },
    {
      title: "The hook dies in the first second",
      body: "The algorithm judges frame one in under a second. If it isn't a stoppable image and a contrarian opening line, the video stops being shown — and you never see why, because the view count just quietly flatlines.",
    },
    {
      title: "By the time you've edited, the trend has peaked",
      body: "A sound or format is hot for days, not weeks. Manual editing means you're always reacting late, posting to a trend that already crested and is on its way down.",
    },
    {
      title: "Posting daily without data just makes more bad videos",
      body: "\"Post daily and the algorithm will find you\" is half the advice. Without retention data you can't see which hook formats are bleeding views on the third repeat — so you scale the mistakes instead of killing them.",
    },
  ],

  outcomes: [
    {
      title: "A week of clips from one recording session",
      body: "You batch once; the pipeline cuts, captions, scores, and queues the whole week. No daily scramble, no living inside the app, no editing on a Sunday night to keep the streak alive.",
      proof: "Batch once, post all week",
    },
    {
      title: "Hooks that earn the second second",
      body: "A frame-one stoppable title card and a weekday-rotated hook bank — Monday contrarian, Tuesday prompt-exposure, Thursday client-proof — with two A/B variants a day, so the first second consistently buys you the rest of the video.",
      proof: "Two hook variants a day, scored",
    },
    {
      title: "Posted on schedule, cross-posted clean",
      body: "The scheduler ships daily at your audience's peak window and re-renders each clip for Instagram Reels and YouTube Shorts — no TikTok watermark, platform-specific captions and hashtags generated per channel, not copy-pasted.",
      proof: "One session feeds three platforms",
    },
    {
      title: "A kill list, not just a post count",
      body: "A weekly retention heatmap shows which videos lost half their viewers in second one and which hit 75% completion — so we retire dead hook formats early instead of riding them down.",
      proof: "14 weekday-rotated hooks, each scored 7+",
    },
  ],

  process: [
    {
      title: "Hook audit",
      body: "I pull your last 30 videos, score the hook on each, and map your retention curve to find the three formats quietly killing your reach. You get a written kill list before we build anything. (Day 1–3)",
    },
    {
      title: "Build the bank",
      body: "We design the weekday hook bank, lock caption style, BGM library, and end-card look on a single pilot video you approve — so the whole batch inherits a format you've already signed off on. (Day 4–7)",
    },
    {
      title: "Ship & hand off",
      body: "Pipeline runs in your environment, scheduling daily via the TikTok Business API with the first week on a screen-share to catch edge cases. You keep the runbook, the hook-bank doc, the retention dashboard, and the BGM library. (Day 8–14)",
    },
  ],

  toolStack: {
    label: "Runs on the same render stack I use for every client reel",
    items: [
      "FFmpeg + ASS kinetic captions",
      "Whisper transcription",
      "CapCut / Premiere export handoff",
      "TikTok Business API scheduler",
      "ElevenLabs voiceover (faceless modes)",
      "Looker Studio retention dashboard",
    ],
  },

  fitCheck: {
    forYou: [
      "You, if you've got a real offer and the budget ready, and you're tired of the channel going quiet every time client work lands.",
      "You, if you'll record one batch a week and let the pipeline handle the cutting, captions, scoring, and posting.",
      "You, if you want to own the engine — runbook, hook-bank doc, retention dashboard — so a VA can run it in 30 minutes a day.",
    ],
    notForYou: [
      "Not us, if you want the cheapest quote. I publish fixed pricing and I'm not the floor.",
      "Not us, if you want me to manage your TikTok forever. I build the engine and hand it over; the retainer is optional, not a leash.",
      "Not us, if you want guaranteed follower counts. I move first-frame retention and median views — the inputs you control — not vanity numbers I can't promise.",
    ],
  },

  proof: {
    metric: "Hook bank + frame-one card",
    client: "Representative SkynetLabs build",
    detail:
      "The repeatable lever: a weekday-rotated hook bank, frame-one stoppable title cards, and a weekly retention review that retires dying formats early — daily posting from one batch, no new gear, the same camera and face throughout. Built to move first-frame retention and median views, the inputs you actually control.",
  },

  guarantee: {
    title: "Fixed scope in 48 hours, then a 14-day fix window.",
    body: "After the hook audit I lock the full scope in writing within 48 hours, before you pay a cent — you know exactly what ships. Once the engine is live you get 14 days to surface anything that misfires and I fix it. I won't promise follower counts or revenue; those live in your offer and your market, not my pipeline.",
  },

  faqs: [
    {
      q: "Do I need to be on camera?",
      a: "No. The pipeline runs faceless modes too — kinetic text reels, voiceover-only, motion graphics, B-roll compilations — and for e-commerce or faceless niches I default to the kinetic-text-plus-voiceover combination. If you are on camera, the same hook bank and frame-one card wrap around your footage.",
    },
    {
      q: "How fast does the engine ship, and how fast do views move?",
      a: "The engine is live in about 14 days. Views are honest work: I won't promise follower counts, because they're downstream of things I don't fully control. I do commit to a measurable lift in first-frame retention and median views, because those are inputs the hook bank and frame-one card directly move — fix retention and the followers follow.",
    },
    {
      q: "Do I own the system, or am I locked into you?",
      a: "You own it. It runs on your accounts in your environment, and a VA can operate the whole thing in about 30 minutes a day from the runbook and hook-bank doc. The retention dashboard stays yours even if you change operators or drop the retainer entirely.",
    },
    {
      q: "What about shadowbans and the algorithm?",
      a: "Real TikTok shadowbans are rare and almost always tied to policy violations, not posting frequency. When reach drops it's nearly always a hook format that's gone stale, which is exactly what the weekly retention review catches — so we kill the dying format before it drags the account down with it.",
    },
    {
      q: "How does cross-posting to Reels and Shorts work?",
      a: "Each clip is re-rendered without the TikTok watermark and re-uploaded to Instagram Reels and YouTube Shorts with captions and hashtags generated per platform, not copy-pasted. One recording session feeds three platforms, which is most of where the leverage is.",
    },
    {
      q: "What tools does it run on, and what does it cost?",
      a: "An ffmpeg render pipeline with ASS kinetic captions, Whisper for transcription, Gemini for hook scoring, the TikTok Business API for scheduling, licensed Mixkit and Epidemic Sound for trend-matched BGM (never copyright-risky trending audio that gets stripped on cross-post), and Looker Studio for the retention dashboard. Pricing is public and fixed — see the tiers above. Fixed scope back within 48 hours of your brief.",
    },
  ],

  finalCta: {
    h2: "Earn the second second.",
    body: "30-min discovery call. I'll audit your last 30 videos, map the retention curve, and send a written kill list of dying hook formats plus fixed scope within 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
