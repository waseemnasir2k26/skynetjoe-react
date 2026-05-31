import type { ServiceFunnelContent } from "./types";

/**
 * AI Video Creation — full funnel copy.
 * Mined from content/services/ai-video.html + SkynetLabs brand voice:
 * founder-first, public pricing, anti-fluff, founder-face-over-avatar stance.
 * No canonical case maps to ai-video → proof is representative (SkynetLabs
 * internal reference reel, no client metrics). Bali-built, ship in 5-14 days.
 */
const content: ServiceFunnelContent = {
  slug: "ai-video",
  label: "AI Video Creation",

  hero: {
    eyebrow: "AI Content · AI Video · 2026",
    h1: "You filmed 12 minutes of B-roll in Bali. Three weeks later it's still on the SD card.",
    sub: "Footage piles up because editing one reel is four hours in a timeline and you have real client work waiting. Meanwhile a competitor with worse footage posts daily and books the calls. I build a pipeline that turns raw clips into a week of branded reels in under two hours — silence-cut, captioned, B-roll, voice EQ, end card, done. I failed at video editing in 2020 and burned two months in Premiere. The pipeline is what finally worked.",
    primary: { label: "Book the build call", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "First batch in 14 days",
    ],
  },

  pains: [
    {
      title: "Editing is the bottleneck, so the channel goes quiet",
      body: "One reel is four hours in a timeline. When client work lands, the editing slips, then the posting slips, then the channel goes silent for two weeks and the reach never recovers.",
    },
    {
      title: "An editor costs more than the content earns",
      body: "A freelance editor at $50-150 a reel doesn't pencil out for daily short-form, and a full-time hire is a salary you can't justify yet. So you stay stuck between 'too expensive' and 'no time.'",
    },
    {
      title: "Every clip looks slightly different",
      body: "Captions, brand colours, pacing, and end cards drift when you're rushing batches by hand. The feed looks improvised instead of like a channel — and viewers can feel the difference.",
    },
    {
      title: "SaaS 'AI video' tools look like SaaS",
      body: "The one-click tools skip word-level caption timing, real B-roll selection, voice EQ, and ducked music — so the output screams 'made by an app.' You can spot it in two seconds, and so can your audience.",
    },
  ],

  outcomes: [
    {
      title: "A week of reels in under two hours",
      body: "Drop raw footage in Monday, get a batch out Friday. Whisper transcribes, the pipeline silence-cuts and scores hooks for stoppability, then captions, reframes to 9:16, lays B-roll, and end-cards every clip. You go from one-reel-a-week to a real cadence.",
      proof: "Batched once, a week of reels out",
    },
    {
      title: "Branded and identical, clip after clip",
      body: "Caption font, highlight colour, music level, and end-card geometry are locked in one config file. Every reel in the batch matches — change the config once and the whole batch restyles in seconds.",
      proof: "1 brand config drives the batch",
    },
    {
      title: "Edits a human would make, automated",
      body: "Word-by-word pop captions, topic-relevant B-roll, a six-stage voice EQ chain, and music that ducks ~8dB under your voice instead of fighting it. This is the saddamh1 reel rebuilt step by step — that's why it doesn't look like a template.",
      proof: "Hook scores 10 / 9 / 9 on the reference reel",
    },
    {
      title: "You keep the founder face, not a fake avatar",
      body: "Face-to-camera reels out-perform avatar reels by 2-4x on engagement and viewers can tell the difference. The pipeline polishes real footage shot on a phone or a DJI Pocket — no studio, no clone, no uncanny narrator (unless a faceless e-com channel actually needs one).",
      proof: "Shot on a DJI Pocket 3, no mic, full sun",
    },
  ],

  process: [
    {
      title: "Style lock",
      body: "I watch your last 10 reels, listen to your voice, and pull your brand colours into a config file — caption style, BGM library, end-card layout. Then we lock the look on a single test clip you approve before anything scales. (Day 1-3)",
    },
    {
      title: "Build the pipeline",
      body: "The full pipeline gets wired and tested on your real footage: silence-cut, Whisper, 9:16 reframe with push-in, pop captions, B-roll cards, voice EQ, BGM duck, end card. First real batch runs with me on a screen-share to catch edge cases. (Day 4-10)",
    },
    {
      title: "Ship + hand off",
      body: "Pipeline runs in your environment (laptop or VPS) behind a one-command runner. You get a Loom walkthrough, a troubleshooting runbook, and a 14-day fix window — so you own the engine, not a dependency on me. (Day 11-14)",
    },
  ],

  proof: {
    metric: "Batch in hours, not days",
    client: "Representative SkynetLabs build",
    detail:
      "The same pipeline runs on the SkynetLabs reference reel — shot on a DJI Pocket 3 from a Pererenan rooftop, no mic, full sun — silence-cut, captioned, B-rolled, voice-EQ'd and end-carded in one pass. Built to turn a one-person creator's raw footage into a weekly cadence instead of a one-reel-a-week scramble.",
  },

  toolStack: {
    label: "// the actual stack your reels run through",
    items: [
      "Whisper (word-level transcription + caption timing)",
      "FFmpeg (silence-cut, 9:16 reframe, voice EQ chain, BGM duck)",
      "NVENC / CPU fallback (render — ~5 min for a 60s clip on a laptop)",
      "ElevenLabs (synthetic narrator, faceless channels only)",
      "Premiere XML + CapCut JSON (hand-off so your editor can re-cut)",
      "Mixkit + your licensed Epidemic Sound (music, never trending TikTok audio)",
    ],
  },

  fitCheck: {
    forYou: [
      "You're a founder-led brand and the raw footage is already piling up — you just can't get it edited fast enough.",
      "You'd rather own a pipeline that runs on your laptop than rent another SaaS subscription forever.",
      "You shoot real face-to-camera or B-roll on a phone or DJI Pocket and want it to look like a channel, not an app export.",
      "You've got the budget ready and want it built once, properly, in 5-14 days.",
    ],
    notForYou: [
      "You want the cheapest reel on the marketplace — a $5 editor will underbid me and you should take it.",
      "You want a faceless avatar farm pumping out cloned talking heads. I'll build a clean voiceover flow for a real faceless channel, but I won't fake a founder.",
      "You want me to run the channel for you forever — I hand you the engine and a runbook, I'm not a managed editing service.",
    ],
  },

  guarantee: {
    title: "Send one clip before you commit.",
    body: "Send a 60-second clip and I'll send back a finished reel built with this exact pipeline, so you judge the look before paying. Once you're in, scope is locked in writing within 48 hours and every shipped build carries a 14-day fix window for anything that breaks in your environment.",
  },

  faqs: [
    {
      q: "Do I need to be on camera?",
      a: "For a founder-led brand, yes — and I'll push back if you ask for an avatar. Face-to-camera beats avatar reels by 2-4x on engagement and viewers clock the fake one instantly. For a faceless e-commerce or news-style channel where there's no founder, faceless is the right call and I'll set up a clean voiceover or HeyGen-style flow.",
    },
    {
      q: "Will the voice sound like me?",
      a: "If we use your real audio, it is you — the pipeline just EQs it to broadcast-clean and ducks the music under it. If you want a synthetic narrator for a faceless channel, I tune an ElevenLabs voice and lock it across the batch so it's consistent, not robotic. For your own face-to-camera reels, I'd never swap your voice for a clone.",
    },
    {
      q: "Do I need a fancy camera or a GPU?",
      a: "No on both. The reference reel was shot on a DJI Pocket 3 handheld, noon sun, no external mic — captions and EQ do the heavy lifting, and an iPhone 14 or later is plenty. It runs on CPU too: a 60-second clip goes through the full pipeline in roughly five minutes on a normal laptop.",
    },
    {
      q: "Who writes the scripts and picks the topics?",
      a: "Build tiers render around footage and scripts you supply. The monthly retainer includes topic ideation and scripting, so you just hand over raw clips. Either way the hook-scoring step flags your strongest moments, so even unscripted footage gets cut to the best 30 seconds.",
    },
    {
      q: "Can my team still edit clips after the pipeline runs, and what about music rights?",
      a: "Yes — the pipeline writes a Premiere-compatible XML and a CapCut JSON, so an editor can re-time captions or swap B-roll and re-export. On music, I default to Mixkit free-tier and your licensed Epidemic Sound tracks, and never trending TikTok audio in the auto-pipeline because it ages fast and triggers copyright strikes on cross-posted YouTube uploads.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter is one script batch turned into a set of captioned vertical reels; Pro is the full auto-render pipeline with a posting scheduler; the retainer ships a batch a month on autopilot. Fixed scope back within 48 hours of your brief.",
    },
  ],

  finalCta: {
    h2: "Stop letting your SD card hold your channel hostage.",
    body: "Send one 60-second clip. I'll send back a reel built with this exact pipeline so you can judge the look before you commit — then fixed scope in 48 hours.",
    ctaLabel: "Send a clip to test",
  },
};

export default content;
