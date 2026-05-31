import type { ServiceFunnelContent } from "./types";

/**
 * AI Content Creation — full funnel copy.
 * Pain: content is slow, inconsistent, or sounds generic / AI.
 * Outcome: a brand-voiced content engine producing batches on cadence (AEO / content-engine work).
 * Proof = canonical case "internal-carousel-content-engine-200-asset" (SkynetLabs internal R&D).
 * Meta-credibility note: this copy must itself NOT read as AI-written. Kept human, specific, blunt.
 */
const content: ServiceFunnelContent = {
  slug: "ai-content-creation",
  label: "AI Content Creation",

  hero: {
    eyebrow: "Consulting · AI Content Creation · 2026",
    h1: "Post every day, in your voice, without it eating your week.",
    sub: "Most AI content fails the same way: it's fast, it's on time, and it sounds like nobody. I do the opposite. We lock your actual voice into a documented profile — your hooks, your tics, the phrases you'd never say — then build an engine that turns one voice memo into a week of posts, carousels, and AEO copy that read like you wrote them at 6am with a coffee, not like a model on a deadline.",
    primary: { label: "Lock the voice", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "9 countries",
      "Public pricing",
      "Voice-linted",
      "First batch in 5 days",
    ],
  },

  pains: [
    {
      title: "It's obvious a robot wrote it",
      body: "The giveaways are everywhere — 'unlock', 'seamless', 'in today's fast-paced world', three-item lists that say nothing, an em-dash every other sentence. Readers can't always name it, but they smell it, and the moment they do they stop trusting the account. Slop doesn't just underperform; it costs you credibility you already earned.",
    },
    {
      title: "Volume and voice pull in opposite directions",
      body: "You can post daily, or you can sound like yourself — pick one. That's the trap. Push the cadence up and the voice flattens; protect the voice and the channel goes quiet for three weeks. Nobody's solved it by trying harder, because effort isn't the missing piece. A system is.",
    },
    {
      title: "Every post starts from a blank page",
      body: "No hook bank, no template, no idea what Thursday's post is until Thursday. So you either skip it or panic-write something off-brand at 11pm. There's no engine — just you, the cursor, and the slow dread of the empty box.",
    },
    {
      title: "The voice walks out when the writer does",
      body: "You hired a ghostwriter who finally 'got it' after a month. Then they quit, and your voice left with them. Or a VA drafts in their voice, you rewrite all of it, and you're back to doing the thing you paid to stop doing.",
    },
  ],

  outcomes: [
    {
      title: "A voice profile, not a vibe",
      body: "A documented profile pulled from your best work: hook style, sentence rhythm, the words you use, the words you'd never say, where you let a real flaw show. Explicit enough that a junior writer — or a model — has nowhere to drift to. The voice stops living only in your head.",
      proof: "12-page voice profile from your archive",
    },
    {
      title: "A linter that kills the tells before you see them",
      body: "Every draft runs through a voice linter that hard-fails on 60-plus AI signals — banned words, em-dash spam, empty triads, 'in today's', vague 'studies show' attributions. If it triggers, it doesn't ship. This page passed the same linter, which is the only kind of proof that matters here.",
      proof: "Hard-fails 60+ AI tells pre-publish",
    },
    {
      title: "An engine that turns one input into a week",
      body: "Record a five-minute voice memo, drop a rough draft, or paste an interview transcript. The pipeline spins it into LinkedIn posts, carousels, blog and AEO copy, and short captions — each pre-named to a slot on a 30-day calendar, each linted. The channel stops going dark.",
      proof: "1 input → a week of cross-channel content",
    },
    {
      title: "AEO copy that gets your brand quoted by the models",
      body: "The same content engine that writes your posts writes answer-first copy structured to get cited when someone asks Claude or ChatGPT about your space. Built on the AEO/content-engine work behind SkynetLabs' own pipeline — not theory, the thing I run on myself.",
      proof: "Answer-first structure, schema-ready",
    },
  ],

  process: [
    {
      title: "Sample your voice",
      body: "Send 30 posts you're proud of and 5 you regret — the regrets teach the linter as much as the wins. If you're early and don't have 30, we do a 90-minute call and sample your spoken voice instead; most founders write about 80% the way they talk once you strip the conference filler. (Days 1-3)",
    },
    {
      title: "Lock & sample back",
      body: "Build the voice profile, the day-of-week hook bank, the arc templates, and the lint rules. Then I draft three fresh posts in the locked voice and put them in front of you. You either nod, or we tune the rules until you do — before any pipeline gets wired. (Days 4-10)",
    },
    {
      title: "Wire the engine & hand off",
      body: "Stand up the content engine, connect the linter, load the 30-day calendar, and train whoever drives it day to day. Two weeks of co-editing the live calendar with you, then your team runs it solo while I stay on for drift checks. (Days 11-14)",
    },
  ],

  proof: {
    metric: "1 brief → 200-asset batch",
    client: "SkynetLabs internal R&D",
    detail:
      "The same engine runs the SkynetLabs internal content pipeline — one topic brief turned into a 200-slide carousel batch, every slide passed through a 60+ phrase AI-tell linter and an image-rotation log before it renders. The voice holds because the documented profile and the linter, not the writer, are the source of truth. It's the exact engine I run my own content on.",
  },

  toolStack: {
    label: "The engine under the hood",
    items: [
      "Claude Code",
      "Custom 60+ AI-tell linter",
      "n8n",
      "html2canvas",
      "GPT-4o",
      "Sharp",
    ],
  },

  guarantee: {
    title: "The first batch proves it, or you walk.",
    body: "Scope and price locked in writing within 48 hours, before you pay a cent. Every asset runs through the AI-tell linter before it renders — nothing ships that trips a tell. If the first batch doesn't read like you, we tune the profile inside a 14-day fix window until it does.",
  },

  secondaryProof: {
    metric: "30% → 92%",
    client: "Multi-channel SaaS launch (anonymized)",
    detail:
      "A founder who refused to ship AI content under his own face went from approving 30% of drafts to 92% — one script feeding five channels, every post linted to zero AI tells before render. The only metric that mattered: he'd actually hit publish.",
  },

  faqs: [
    {
      q: "Will this actually stop sounding like ChatGPT?",
      a: "That's the whole job, and the linter is how we enforce it instead of just promising it. It hard-fails on 60-plus tells: 'unlock', 'elevate', 'seamless', 'robust', 'delve', 'in today's', em-dash overuse, three-part lists that carry no weight, vague 'experts say' attributions. A draft that trips any of them doesn't publish. As new tells appear, we add them. You can read this page as the receipt — it shipped through the same filter.",
    },
    {
      q: "Will it actually sound like me, or like a brand voice someone invented?",
      a: "It's built from your archive, not from a persona I made up. The profile captures your real hooks, your rhythm, even the flaws you let show — because those are what make it read human. When we sample back three posts in week one, the test is simple: would you have hit publish on these yourself? We tune until the answer is yes.",
    },
    {
      q: "Can my VA or a junior writer run this?",
      a: "Yes — that's the point of writing it all down. The profile is explicit enough that a competent junior drafts in your voice from day one, and the linter catches drift before it ever reaches you. Most clients run the engine with an affordable VA once the system is locked. You stop being the bottleneck.",
    },
    {
      q: "Do you write the posts forever, or do I own the system?",
      a: "You own the system — the voice profile, the hook bank, the templates, the prompt library, all of it, yours to keep and extend. I build the engine and prove it with the first batch. Ongoing drafting can stay with your team or come back to me on a retainer; either way you're never renting your own voice back from me.",
    },
    {
      q: "What if my voice changes as I grow?",
      a: "It will, and a frozen profile is how content slowly stops sounding like you. The retainer includes a quarterly refresh: we re-sample your 20 best recent posts, update the profile, retire stale hooks, add new banned phrases. The voice ages with you instead of getting stuck in the version of you from this quarter.",
    },
    {
      q: "What does it cost and how fast is the first batch?",
      a: "Public, fixed pricing — see the tiers above. Starter (voice lock-in plus a 15-post batch) lands in about 5 days; the full engine with carousels, AEO copy, and an auto-publish pipeline runs 10-14. Fixed scope back in your inbox within 48 hours of the brief.",
    },
  ],

  finalCta: {
    h2: "Lock the voice before you scale the volume.",
    body: "30-minute discovery call. We'll sample a few of your posts live, I'll show you exactly which AI tells your current content trips, and you'll have fixed scope back in 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
