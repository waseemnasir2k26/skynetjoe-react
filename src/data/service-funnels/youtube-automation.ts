import type { ServiceFunnelContent } from "./types";

/**
 * YouTube Automation — full funnel.
 * Mined from content/services/youtube-automation.html + SkynetLabs brand voice:
 * founder-first, public pricing, specific, anti-fluff. No canonical case maps
 * to youtube-automation → proof is representative (no client metrics, no
 * de-anonymized names). "ship in 14 days".
 */
const content: ServiceFunnelContent = {
  slug: "youtube-automation",
  label: "YouTube Automation",

  hero: {
    eyebrow: "AI Content · YouTube · 2026",
    h1: "A channel that uploads every week — without you in the edit bay.",
    sub: "Right now every video is a day-long project: research, script, edit, thumbnail, upload. Miss two weeks and the algorithm forgets you exist. I build the publishing machine that turns one long-form into shorts, picks topics by gap analysis, tests three thumbnails before it goes live, and ships on a fixed cadence whether you feel like it or not. Built from a Canggu cafe, shipped in 14 days.",
    primary: { label: "Book the channel audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "First videos ship in ~14 days",
    ],
  },

  pains: [
    {
      title: "Every video is a full-day project",
      body: "Research, script, voiceover, edit, thumbnail, upload — one video eats a whole working day. So you batch one good week, then go dark for a month, and start the climb over from zero.",
    },
    {
      title: "Inconsistent publishing kills the algorithm",
      body: "YouTube rewards cadence above almost everything. Sporadic uploads tell the recommendation engine the channel is abandoned, and the watch-time momentum you fought for evaporates faster than it built.",
    },
    {
      title: "The click-driving work gets cut first",
      body: "When you're racing to ship the edit, thumbnails, titles, and metadata are the corners you cut. A great video with a 3% thumbnail dies in Impressions while a worse one with a tested thumbnail eats your audience.",
    },
    {
      title: "Long-form sits there as one asset",
      body: "You spent a day on a 12-minute video and posted it once. The five Shorts hiding inside it — the ones that actually find new subscribers — never get cut, because cutting them is another half-day you don't have.",
    },
  ],

  outcomes: [
    {
      title: "A real upload cadence the channel can't break",
      body: "Long-form and Shorts ship on a fixed schedule from a pipeline, not your willpower. The channel keeps publishing the week you're sick, travelling, or buried in client work.",
      proof: "Fixed cadence, not willpower",
    },
    {
      title: "One long-form becomes a week of Shorts",
      body: "The pipeline pulls the strongest 30-second moments out of each long-form, reframes them 9:16 with kinetic captions, and queues them as Shorts. The long-form earns ad revenue; the Shorts feed it new subscribers.",
      proof: "1 long-form → 4–6 Shorts",
    },
    {
      title: "Thumbnails and metadata are part of the build",
      body: "Three thumbnail variants per video, scored against your channel's CTR baseline and rotated through YouTube's experiment feature. Titles, descriptions, chapters, and tags are generated to a template, not skipped under deadline.",
      proof: "3 thumbnails tested per video",
    },
    {
      title: "A channel you can read on one dashboard",
      body: "Weekly Looker Studio digest: CTR per thumbnail, retention drop-off, top topics, recommendation lift. You stop guessing and make more of what the data says works.",
      proof: "1 weekly analytics digest",
    },
  ],

  process: [
    {
      title: "Audit & plan",
      body: "Channel teardown, niche gap analysis, competitor outlier detection. You get a written 10-video topic plan with predicted view ranges and the three thumbnail/title patterns we'll test first. (Day 1–4)",
    },
    {
      title: "Lock the look",
      body: "Voice profile, thumbnail style guide, end-card layout, and the long-form → Shorts cut rules are locked on one fully-produced pilot video — so the whole pipeline inherits a look you've already approved. (Day 5–7)",
    },
    {
      title: "Ship & hand off",
      body: "Pipeline runs in your environment. First three videos produced with me on the screen-share to catch edge cases, then scheduled via the YouTube API. You get a one-command runner, weekly batch SOP, thumbnail Figma file, and the dashboard. (Day 8–14)",
    },
  ],

  proof: {
    metric: "1 long-form → a week of Shorts",
    client: "Representative SkynetLabs build",
    detail:
      "A typical hybrid channel build: founder on camera for the main long-form, a clean voiceover for the B-segments, one editor reviewing each batch, and three-variant thumbnail testing run through the YouTube experiment API against the channel's own CTR baseline. The pipeline ships on a fixed weekly cadence instead of the channel's willpower.",
  },

  faqs: [
    {
      q: "Do I need to be on camera for this to work?",
      a: "No. The pipeline runs fully faceless — ElevenLabs voiceover over layered B-roll, Flux stills, and motion graphics, which is plenty for finance, history, science, and news niches. If you'd rather appear, it takes your filmed footage through the same edit. A common hybrid setup is founder on camera for the main video and a clean voiceover for the B-segments.",
    },
    {
      q: "How long until the first videos ship, and until the channel earns?",
      a: "First videos ship inside about 14 days of the brief, with early CTR and retention data by video three. AdSense is a different timeline and I won't lie about it: hitting the 1,000-sub / 4,000-hour threshold depends on niche demand and consistency. I've seen it happen inside 90 days when both hold — but I never quote a dollar figure or promise revenue upfront.",
    },
    {
      q: "Do I own the pipeline, or am I locked into you?",
      a: "You own it. It runs in your environment on your accounts, and you get a one-command runner, a weekly batch SOP, the thumbnail Figma file, and the analytics dashboard. A VA or in-house editor can run the whole thing for roughly $150–200/mo in tool costs. The retainer is optional — keep it only if you'd rather I run the batches.",
    },
    {
      q: "Will YouTube demonetise a faceless AI channel?",
      a: "Only the low-effort kind — reuploads and near-identical template farms, which YouTube's 2024 rules specifically target. This pipeline produces original scripts, real voice, layered B-roll with motion graphics, and custom thumbnails per video. That's the high-effort side of the line, and channels I've shipped have passed monetisation review.",
    },
    {
      q: "Can I do Shorts only, or long-form only?",
      a: "Either, but I'll usually argue for both. Shorts feed the algorithm and surface the channel to new people; long-form converts those people into subscribers and earns the ad revenue. The pipeline is built to turn each long-form into 4–6 Shorts automatically, so you get the volume of a Shorts channel and the revenue ceiling of a long-form one from the same shoot.",
    },
    {
      q: "What tools does it run on, and what does it cost?",
      a: "Claude and GPT-4o for scripts, ElevenLabs or PlayHT for voice, Pexels and Flux for visuals, an ffmpeg render pipeline, the YouTube Data API for publishing and thumbnail experiments, and Looker Studio for the dashboard. Pricing is public and fixed — see the tiers above. Fixed scope back within 48 hours of your brief.",
    },
  ],

  finalCta: {
    h2: "Stop being channel number 412 in your niche.",
    body: "30-min discovery call. I'll run the gap analysis and have a written 10-video topic plan plus fixed scope in your hands within 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
