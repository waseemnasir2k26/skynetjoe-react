/**
 * Prompt Library — 50 reusable AI prompts for service businesses.
 *
 * 8 categories × 5-8 prompts each. Each prompt is self-contained,
 * variable-friendly (uses [PLACEHOLDER] convention), and ships with
 * a recommended model and a 1-line use-case.
 */

export type PromptCategory =
  | "sales"
  | "customerService"
  | "marketing"
  | "operations"
  | "content"
  | "dataAnalysis"
  | "recruitment"
  | "founderBrain";

export type RecommendedModel = "Claude" | "GPT-4" | "Gemini";

export type Prompt = {
  id: string;
  category: PromptCategory;
  title: string;
  useCase: string;
  body: string;
  model: RecommendedModel;
};

export type CategoryMeta = {
  key: PromptCategory;
  label: string;
  blurb: string;
  icon: string;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    key: "sales",
    label: "Sales",
    blurb: "Cold outreach, qualification, objection handling.",
    icon: "🎯",
  },
  {
    key: "customerService",
    label: "Customer Service",
    blurb: "Chatbots, refunds, complaint de-escalation.",
    icon: "🛟",
  },
  {
    key: "marketing",
    label: "Marketing",
    blurb: "LinkedIn posts, subject lines, ad copy.",
    icon: "📣",
  },
  {
    key: "operations",
    label: "Operations",
    blurb: "SOPs, meeting notes, vendor RFPs.",
    icon: "⚙️",
  },
  {
    key: "content",
    label: "Content",
    blurb: "Blog outlines, social calendars, video scripts.",
    icon: "✍️",
  },
  {
    key: "dataAnalysis",
    label: "Data Analysis",
    blurb: "CSV insights, KPI dashboards, anomaly detection.",
    icon: "📊",
  },
  {
    key: "recruitment",
    label: "Recruitment",
    blurb: "Job descriptions, interview questions, screening.",
    icon: "🧑‍💼",
  },
  {
    key: "founderBrain",
    label: "Founder Brain",
    blurb: "Decision frameworks, weekly planning, OKRs.",
    icon: "🧠",
  },
];

export const PROMPTS: Prompt[] = [
  /* ────────── SALES (7) ────────── */
  {
    id: "sales-cold-email",
    category: "sales",
    title: "Cold email opener (no template tone)",
    useCase: "Write a cold email that doesn't sound copy-pasted.",
    body: `Write a 90-word cold email from [YOUR NAME] at [YOUR COMPANY] to [PROSPECT NAME] at [PROSPECT COMPANY]. We sell [PRODUCT/SERVICE]. Their public signal: [RECENT POST / HIRE / FUNDING / EXPANSION]. Ban: "I hope this email finds you well", "synergy", "circle back", and any sentence that could apply to any other company. Open with a specific observation about them. Close with one yes/no question they can answer in 5 seconds. No CTA buttons, no calendar links.`,
    model: "Claude",
  },
  {
    id: "sales-discovery-questions",
    category: "sales",
    title: "Discovery call question bank",
    useCase: "Generate 10 sharp questions before a sales call.",
    body: `I'm running a discovery call with [PROSPECT TITLE] at a [INDUSTRY] company doing [APPROX REVENUE]. The product I sell is [PRODUCT]. Give me 10 questions to ask, ranked by leverage. Rules: open-ended only, ban yes/no, ban "how can I help", each question should reveal one specific cost they're paying today. Group them: 3 about current state, 3 about consequences of inaction, 2 about decision process, 2 about future state if we solved it.`,
    model: "Claude",
  },
  {
    id: "sales-objection",
    category: "sales",
    title: "Objection handling responses",
    useCase: "Draft replies to the 5 most common objections.",
    body: `For a [PRODUCT/SERVICE] sold to [BUYER PERSONA], write the response to each of these objections: (1) too expensive, (2) we already use [COMPETITOR], (3) bad timing — Q4 budget frozen, (4) we tried something like this and it failed, (5) I need to check with my team. Each response: max 60 words, acknowledges the concern in one sentence, reframes with one specific question, ends with an offer that doesn't require buying anything today. No hard sells.`,
    model: "GPT-4",
  },
  {
    id: "sales-followup-sequence",
    category: "sales",
    title: "7-touch follow-up sequence",
    useCase: "Build the persistence layer most reps skip.",
    body: `Build a 7-touch follow-up sequence for a [B2B/B2C] [PRODUCT] sold at [PRICE POINT] to [BUYER PERSONA]. Touches go out over 21 days. Mix: 3 emails, 2 LinkedIn touches, 1 voicenote, 1 phone call. Each touch: subject (if email) + 60 words max + clear single CTA. Each touch must add NEW value — case study, industry insight, fresh question. Ban "just following up", "circling back", "any update". Final touch is a polite break-up letter that often gets a reply.`,
    model: "Claude",
  },
  {
    id: "sales-qualification",
    category: "sales",
    title: "BANT+ qualification rubric",
    useCase: "Decide in 5 minutes if a lead is worth your time.",
    body: `I'm qualifying a lead for [PRODUCT] which starts at [PRICE]. Score this lead 0-10 on Budget, Authority, Need, Timing, and Fit. Here's the lead: [PASTE LEAD INFO]. For each axis: give the score, the one signal you used, the one missing piece you'd ask for, and a 3-word verdict. Final line: GO / SLOW DOWN / PASS. Be honest — if they're not ready I'd rather lose this deal than waste 3 hours of demos.`,
    model: "Claude",
  },
  {
    id: "sales-quote-recap",
    category: "sales",
    title: "Post-call recap with next steps",
    useCase: "Send a recap that locks in commitments.",
    body: `Turn these meeting notes into a recap email from [SALES PERSON] to [PROSPECT]: [PASTE NOTES]. Structure: (1) one-sentence summary of what we agreed they're trying to solve, (2) bulleted recap of their stated pains and metrics, (3) what I proposed and why, (4) the specific 3 things THEY agreed to do by [DATE], (5) the 2 things I'M doing by [DATE], (6) the proposed next call. Tone: professional but human. End with one open question.`,
    model: "Claude",
  },
  {
    id: "sales-proposal-rewrite",
    category: "sales",
    title: "Tighten a proposal in one pass",
    useCase: "Cut 30% of fluff before sending.",
    body: `Rewrite this sales proposal: [PASTE PROPOSAL]. Cut every sentence that doesn't either (a) describe the prospect's problem in their language, (b) describe what we'll do, (c) describe the outcome with a number. Target: 40% shorter. Keep the structure but ruthlessly compress. If a paragraph doesn't include a noun the prospect would recognize, delete it. End with a single bolded CTA.`,
    model: "GPT-4",
  },

  /* ────────── CUSTOMER SERVICE (6) ────────── */
  {
    id: "cs-chatbot-greeting",
    category: "customerService",
    title: "Chatbot opening + intent capture",
    useCase: "First 3 turns of a support chatbot.",
    body: `Write the opening sequence for a customer-service chatbot for [COMPANY] which sells [PRODUCT]. Turn 1: warm 1-line greeting (no exclamation points). Turn 2: 4 quick-reply buttons for the 4 most common reasons people contact us — billing, technical, refund, other. Turn 3: for each path, the question that captures the order number or account email without making the user repeat info from earlier in the chat. Tone: confident, human, not chirpy.`,
    model: "Claude",
  },
  {
    id: "cs-refund-script",
    category: "customerService",
    title: "Refund handling script",
    useCase: "Honor refunds without giving away the farm.",
    body: `Write the script a CS agent at [COMPANY] uses when a customer requests a refund for [PRODUCT]. Cover four scenarios: (1) within policy → process immediately, (2) outside policy but valid reason → escalate, (3) outside policy, no valid reason → offer alternative (credit, partial, exchange), (4) clear abuse pattern → polite decline. For each: opening sentence, the qualifying question, the offer, and the exact line if they push back. Tone: empathetic but firm. Never apologize for the policy.`,
    model: "Claude",
  },
  {
    id: "cs-complaint-deescalation",
    category: "customerService",
    title: "De-escalate an angry customer",
    useCase: "Turn a 1-star into a 4-star in one reply.",
    body: `Here's a complaint we received: [PASTE COMPLAINT]. Write the response. Structure: (1) acknowledge their specific frustration (not generic), (2) take ownership without grovelling — one sentence, (3) the concrete action we'll take and by when, (4) what we'll do to prevent it next time, (5) one human line that shows we read what they wrote. Ban: "we're sorry you feel that way", "we appreciate your feedback", "thank you for your patience". Under 150 words.`,
    model: "Claude",
  },
  {
    id: "cs-faq-builder",
    category: "customerService",
    title: "Build a 20-question FAQ from tickets",
    useCase: "Compress 6 months of tickets into a help center.",
    body: `Here's a CSV of our last 200 customer tickets: [PASTE TICKETS]. Cluster them into the 20 most common questions. For each: write the question the way customers actually ask it (not how we'd write it internally), the answer in 60 words max, the related questions someone might also have, and a difficulty tag (self-serve / needs a human / escalation). Output as markdown ready to drop into a help center.`,
    model: "Claude",
  },
  {
    id: "cs-canned-responses",
    category: "customerService",
    title: "10 canned reply templates",
    useCase: "Bank of templates that don't sound canned.",
    body: `Write 10 canned customer service replies for [COMPANY] selling [PRODUCT]. Cover: order status, shipping delay, broken product, password reset, refund processed, technical issue, account locked, subscription cancellation, billing question, positive review thank-you. Each: 40 words, one named greeting, one specific next step, one signature line. Voice: warm, competent, brief. No "thank you for reaching out" openers.`,
    model: "GPT-4",
  },
  {
    id: "cs-saas-onboarding",
    category: "customerService",
    title: "SaaS 7-day onboarding email series",
    useCase: "Drive activation without spamming.",
    body: `Write a 7-day email onboarding series for a new user of [SAAS PRODUCT]. Goal: get them to [KEY ACTIVATION EVENT] by day 7. Each email: subject line, 80 words, one job-to-be-done per email, one CTA. Day 1: welcome + their first win. Day 2: the feature most users miss. Day 3: a customer story. Day 4: the integration that 10x's value. Day 5: invite their team. Day 6: power-user tip. Day 7: ask for feedback. No marketing-speak.`,
    model: "Claude",
  },

  /* ────────── MARKETING (7) ────────── */
  {
    id: "mkt-linkedin-post",
    category: "marketing",
    title: "LinkedIn post with contrarian hook",
    useCase: "Write a post that actually gets read.",
    body: `Write a 200-word LinkedIn post for [YOUR NAME], a [TITLE] at [COMPANY]. Topic: [TOPIC]. Open with a contrarian one-liner that contradicts conventional wisdom in [INDUSTRY]. Then a 1-sentence reframe. Then 3 short paragraphs (max 2 sentences each) that prove the contrarian point using a specific story, number, or experience. Vulnerability beat in the middle — what I got wrong. End with one question that invites comments. Ban hashtag spam — max 3 hashtags. Ban "in today's market", "synergy", "moving the needle".`,
    model: "Claude",
  },
  {
    id: "mkt-subject-lines",
    category: "marketing",
    title: "10 email subject lines to A/B test",
    useCase: "Push open rate past 35%.",
    body: `Write 10 email subject lines for an email going to [AUDIENCE]. Topic: [EMAIL TOPIC]. Mix: 3 curiosity gaps (no clickbait), 3 specific number-driven, 2 question-based, 1 contrarian, 1 plain-spoken. Each under 50 chars. Ban: emojis, ALL CAPS, "important", "urgent", "don't miss", "last chance". For each line, give a 1-line hypothesis on who would open it. Rank them 1-10 by my odds of beating control.`,
    model: "GPT-4",
  },
  {
    id: "mkt-ad-copy-meta",
    category: "marketing",
    title: "Meta ad copy with 3 variants",
    useCase: "Test creative against the same offer.",
    body: `Write 3 Meta ad variants for [PRODUCT] targeting [AUDIENCE]. Offer: [OFFER]. For each variant: 4-word hook, 30-word body, 5-word CTA. Variant A: pain-led. Variant B: outcome-led. Variant C: identity-led ("for [PERSONA] who [BEHAVIOR]"). Each variant must work without an image. Include a 1-line hypothesis on which persona each variant targets. No emojis except where it earns its place.`,
    model: "GPT-4",
  },
  {
    id: "mkt-positioning-statement",
    category: "marketing",
    title: "Crisp positioning statement",
    useCase: "Lock the one-sentence pitch.",
    body: `My company [NAME] sells [PRODUCT] to [BUYER]. We're different because [DIFFERENTIATOR]. Help me write a single positioning sentence that fits this template, then 5 variants that test different emphasis. Template: "For [BUYER] who [PAIN], [COMPANY] is the [CATEGORY] that [UNIQUE BENEFIT], unlike [ALTERNATIVE]". Each variant ≤ 25 words. Rank them on memorability and clarity. End with the one you'd put on the homepage.`,
    model: "Claude",
  },
  {
    id: "mkt-landing-headline",
    category: "marketing",
    title: "Landing page hero variants",
    useCase: "10 hero options to A/B test.",
    body: `Write 10 hero section variants for [PRODUCT] landing page. Audience: [AUDIENCE]. Promise: [OUTCOME]. Each variant: H1 (8-12 words), subhead (15-25 words), CTA button (3-5 words). Mix: 3 outcome-driven, 2 social-proof-driven, 2 contrarian, 2 "for X who Y", 1 plain-spoken. Each must answer "what is it, who is it for, why now". Rank top 3 by conversion bet.`,
    model: "Claude",
  },
  {
    id: "mkt-press-release",
    category: "marketing",
    title: "Press release that journalists open",
    useCase: "Announce a launch without sounding like a corporate template.",
    body: `Write a 400-word press release announcing [LAUNCH/MILESTONE] from [COMPANY]. Lead: the news in 1 sentence using a journalist's hook (what changed, for whom, why now). Paragraph 2: the specific number that matters. Paragraph 3: 1 quote from [SPOKESPERSON] that sounds human, not corporate. Paragraph 4: customer or external validation. Paragraph 5: what happens next + contact info. Ban: "industry-leading", "innovative", "revolutionary", "delighted to announce".`,
    model: "Claude",
  },
  {
    id: "mkt-case-study-outline",
    category: "marketing",
    title: "Case study outline from one client win",
    useCase: "Turn a client interview into a publishable story.",
    body: `Here's a client win: [PASTE NOTES]. Outline a case study. Structure: (1) one-sentence outcome with number, (2) the client and their world in 50 words, (3) the problem in their words, (4) why other solutions failed, (5) what we did in 3 phases, (6) the measurable outcome, (7) the 1 quote from the client that does emotional work, (8) what they're doing next. Each section: 1-2 bullets I need to fill in or interview to capture.`,
    model: "Claude",
  },

  /* ────────── OPERATIONS (6) ────────── */
  {
    id: "ops-sop-builder",
    category: "operations",
    title: "Build an SOP from one process",
    useCase: "Document what's in your head before you forget.",
    body: `I run [PROCESS] in my business. Walk me through extracting it into an SOP. Ask me one question at a time: (1) what triggers the process, (2) what's the desired outcome, (3) who runs it, (4) what tools are involved, (5) what's the first step, then the next, then the next. After I describe each step, summarize it in 1 sentence. At the end, give me the SOP as numbered steps with: tool, action, expected output, time estimate, escalation path.`,
    model: "Claude",
  },
  {
    id: "ops-meeting-summary",
    category: "operations",
    title: "Meeting transcript → action items",
    useCase: "Turn 45 minutes of audio into 5 next moves.",
    body: `Here's a meeting transcript: [PASTE TRANSCRIPT]. Extract: (1) what we agreed (one sentence per agreement, with owner), (2) what we disagreed on (one sentence per disagreement), (3) the 5 action items in priority order — each with owner, due date estimate, and one-line description, (4) the 3 open questions nobody answered, (5) what we should put on the next agenda. Format as markdown. Ignore small talk and tangents.`,
    model: "Claude",
  },
  {
    id: "ops-vendor-rfp",
    category: "operations",
    title: "Vendor RFP template",
    useCase: "Get apples-to-apples vendor comparisons.",
    body: `I'm evaluating vendors for [CATEGORY — e.g. CRM, helpdesk, dev agency]. Write an RFP template. Sections: (1) about us in 100 words, (2) the problem we're solving, (3) functional requirements as a checklist, (4) integration requirements, (5) implementation timeline, (6) pricing structure question, (7) 5 references format, (8) deal-breakers we won't compromise on. End with a scoring rubric I can fill in for each vendor.`,
    model: "GPT-4",
  },
  {
    id: "ops-hiring-runbook",
    category: "operations",
    title: "30-day onboarding runbook",
    useCase: "Stop reinventing onboarding for every hire.",
    body: `Build a 30-day onboarding runbook for a new [ROLE] at [COMPANY]. Day 1 to 7: setup, intros, context. Day 8 to 21: shadowing + first independent task. Day 22 to 30: owning a small project + first feedback loop. For each day-block: the goal, the 3 specific tasks, who they meet with, what good looks like at the end. Include a checklist of accounts and tools to provision on day 0. Final section: the questions their manager should answer for them in week 1.`,
    model: "Claude",
  },
  {
    id: "ops-decision-doc",
    category: "operations",
    title: "1-page decision memo",
    useCase: "Lock decisions on paper before the room forgets.",
    body: `I need to make a decision about [DECISION]. Help me write a 1-page decision memo. Sections: (1) the decision in one sentence, (2) the 3 options I considered, (3) the criteria I weighted (with weights), (4) how each option scored, (5) what could go wrong with the chosen option, (6) the kill criteria — what would make me reverse this, (7) by when do I need to commit. Ask me one question at a time to fill each section.`,
    model: "Claude",
  },
  {
    id: "ops-incident-postmortem",
    category: "operations",
    title: "Blameless postmortem",
    useCase: "Learn from outages without finger-pointing.",
    body: `An incident happened: [DESCRIBE INCIDENT]. Help me write a blameless postmortem. Sections: (1) timeline of what happened (UTC times), (2) impact in customer-facing terms + business metric, (3) detection — how did we find out, (4) root cause analysis using 5-whys, (5) what went well, (6) what didn't, (7) action items with owners and dates, (8) one process change to prevent the class of problem. No names of who caused what. Focus on system, not people.`,
    model: "Claude",
  },

  /* ────────── CONTENT (7) ────────── */
  {
    id: "content-blog-outline",
    category: "content",
    title: "SEO blog outline (1500 words)",
    useCase: "Outline a post that earns the click.",
    body: `Outline a 1500-word blog post targeting the search term [KEYWORD]. Audience: [PERSONA]. Goal: rank top 5 AND convert. Structure: (1) H1 that uses the keyword AND a curiosity gap, (2) intro that names the problem in 80 words, (3) 5-7 H2 sections, each with H3 sub-sections, (4) what the answer-box snippet should look like, (5) an embedded checklist or table, (6) original data or quote opportunity, (7) closing with a soft CTA. Include the 3 internal links I should add and the 2 external authority links.`,
    model: "Claude",
  },
  {
    id: "content-video-script",
    category: "content",
    title: "60-second video script",
    useCase: "Talking-head reel that doesn't bore.",
    body: `Write a 60-second talking-head script for [PRESENTER] on [TOPIC]. Audience: [PERSONA]. Structure: (1) hook in first 3 seconds — must include the pattern interrupt, (2) 5-second context, (3) 3 specific points (10 seconds each), (4) 5-second turn — the reframe, (5) closing CTA in 10 seconds. Total ~150-160 words. Spoken voice, no jargon. Mark the b-roll moments in [brackets]. End with one line they'll quote in comments.`,
    model: "Claude",
  },
  {
    id: "content-social-calendar",
    category: "content",
    title: "30-day social calendar",
    useCase: "Plan a month of content in one sitting.",
    body: `Build a 30-day social calendar for [BRAND] across [PLATFORMS — e.g. LinkedIn + Instagram + Twitter]. Themes: [LIST 3-5 PILLARS]. For each day: pillar, format (text / carousel / reel / image), 1-line hook, 1-line value-add, 1-line CTA. Mix: 40% educational, 25% personal story, 20% behind-the-scenes, 10% promotional, 5% community. Mark 4 cornerstone pieces that get repurposed across all platforms. Output as a table.`,
    model: "Claude",
  },
  {
    id: "content-newsletter",
    category: "content",
    title: "Newsletter issue (one-link, one-idea)",
    useCase: "Send something people forward.",
    body: `Write a weekly newsletter issue for [NEWSLETTER NAME] aimed at [AUDIENCE]. This week's idea: [IDEA]. Structure: subject line (~50 char), opening line that's a story or contrarian observation, the idea in 250-400 words with one concrete example, one practical takeaway the reader can use this week, one piece of homework, and a P.S. that does emotional work. No "in this issue" tables of contents. Voice: smart, opinionated, generous.`,
    model: "Claude",
  },
  {
    id: "content-carousel-li",
    category: "content",
    title: "LinkedIn carousel (8 slides)",
    useCase: "Visual breakdown of one concept.",
    body: `Write an 8-slide LinkedIn carousel on [TOPIC] for [AUDIENCE]. Slide 1: hook + value promise. Slides 2-7: one idea per slide — each with a 5-word headline, 1-line setup, 2-3 punchy points, 1 visual cue [in brackets]. Slide 8: recap + question CTA. Total ≤ 350 words. Each slide standalone-quotable. Mark which 2 slides are the "screenshot bait" slides that people save.`,
    model: "Claude",
  },
  {
    id: "content-podcast-show-notes",
    category: "content",
    title: "Podcast episode show notes",
    useCase: "Turn a recorded episode into a publishable post.",
    body: `Here's a podcast transcript: [PASTE TRANSCRIPT]. Turn it into show notes. Include: (1) 1-paragraph episode summary that makes someone want to listen, (2) 5 quotable lines from the guest with timestamps, (3) a timestamped chapter list, (4) resources/people mentioned with links, (5) 3 tweet-sized takeaways, (6) the unanswered question we should follow up on next time. Bonus: write the X / LinkedIn promo posts for this episode in 2 different voices.`,
    model: "Claude",
  },
  {
    id: "content-tweet-thread",
    category: "content",
    title: "Tweet thread (10 tweets)",
    useCase: "Long-form learnings, X-native format.",
    body: `Write a 10-tweet thread on [TOPIC]. Audience: [PERSONA]. Tweet 1: hook that promises a specific takeaway. Tweets 2-9: one idea each, ≤ 250 chars, with a number, story, or contrarian beat. Mix narrative and listicle. Tweet 10: CTA — what to do, who to follow, or what to bookmark. Each tweet must work standalone as a quote. No emojis unless they earn it. No "🧵" cliché.`,
    model: "Claude",
  },

  /* ────────── DATA ANALYSIS (5) ────────── */
  {
    id: "data-csv-insights",
    category: "dataAnalysis",
    title: "Extract insights from a CSV",
    useCase: "Get the 3 things that matter from messy data.",
    body: `Here's a CSV: [PASTE OR DESCRIBE COLUMNS]. Analyze it and tell me: (1) the 3 most important patterns you see (not just descriptive — what's the SO WHAT), (2) the 2 anomalies that need investigation, (3) the 1 question I should ask next, (4) what data I'm missing that would unlock a bigger insight, (5) the chart I should build to communicate this to a non-technical exec. Use real numbers from the data. Don't speculate.`,
    model: "Claude",
  },
  {
    id: "data-kpi-dashboard",
    category: "dataAnalysis",
    title: "Design a KPI dashboard",
    useCase: "Decide what to actually track.",
    body: `I run a [BUSINESS TYPE] with [APPROX REVENUE/SIZE]. Design a 1-page KPI dashboard. Output: (1) the 3 north-star metrics I should obsess over, (2) the 6 supporting metrics broken into acquisition / activation / retention / revenue / referral, (3) the leading vs lagging indicator for each, (4) the threshold or trend that triggers action, (5) which 2 metrics are vanity and should be removed. Format as a table with: metric, formula, source, refresh cadence, owner.`,
    model: "Claude",
  },
  {
    id: "data-cohort-analysis",
    category: "dataAnalysis",
    title: "Cohort analysis interpretation",
    useCase: "Read a retention curve like an operator.",
    body: `Here's a cohort retention table for [PRODUCT]: [PASTE DATA]. Interpret it for me. Answer: (1) is retention stable, improving, or declining, (2) is the curve flattening (good) or still bleeding (bad), (3) which cohort is the anomaly and why might that be, (4) what's the long-term value implication, (5) the 1 thing I should ship to improve the next cohort. Don't just describe the numbers — give me the operator action.`,
    model: "Claude",
  },
  {
    id: "data-pricing-analysis",
    category: "dataAnalysis",
    title: "Pricing tier analysis",
    useCase: "Decide whether to add, remove, or reprice a tier.",
    body: `Here's my pricing tier data: tier name, monthly price, % of customers, % of revenue, average tenure, churn rate. [PASTE]. Analyze: (1) which tier is the wedge — bringing customers in, (2) which is the revenue driver, (3) which is bloated or underperforming, (4) the price test I should run on the middle tier, (5) the bundle or add-on I should test. Recommend keep / remove / reprice / add for each tier with reasoning.`,
    model: "Claude",
  },
  {
    id: "data-funnel-leakage",
    category: "dataAnalysis",
    title: "Funnel leakage hunt",
    useCase: "Find the biggest conversion drop in the funnel.",
    body: `Here's my funnel: [PASTE STEPS WITH COUNTS]. Find the biggest leakage point. Answer: (1) where is the worst conversion drop relative to industry benchmark, (2) why might that step be losing people — 3 hypotheses, (3) the test I'd run first and what success looks like, (4) the metric to instrument to confirm the cause, (5) the secondary leak I should investigate next.`,
    model: "Claude",
  },

  /* ────────── RECRUITMENT (5) ────────── */
  {
    id: "recruit-job-description",
    category: "recruitment",
    title: "Job description that filters in not out",
    useCase: "Attract A-players, repel mismatches.",
    body: `Write a job description for [ROLE] at [COMPANY]. Audience: [PERSONA — e.g. mid-senior IC who's done this before]. Structure: (1) one-line about us that names the bet we're making, (2) the problem this role solves (not "responsibilities") — 3 specific outcomes, (3) what good looks like in 30 / 90 / 180 days, (4) the must-haves (3-5 max, real signals not checklists), (5) what we'll teach, (6) deal-breakers — the people who'd hate this job, (7) honest comp range, (8) hiring process in 4 steps. Ban: "rockstar", "ninja", "fast-paced environment".`,
    model: "Claude",
  },
  {
    id: "recruit-interview-questions",
    category: "recruitment",
    title: "Interview question bank",
    useCase: "Ask questions that surface real signal.",
    body: `Build a 10-question interview rubric for [ROLE]. Mix: 3 questions about a real project they led — drill into specifics not vibes, 3 questions about a time they failed or were wrong, 2 questions about their decision-making — given X and Y, what would you do, 1 question about why this role specifically, 1 question for them to ask us. For each question: the question, the signal we're looking for, the red flag, and the follow-up question if they give a vague answer.`,
    model: "Claude",
  },
  {
    id: "recruit-resume-screen",
    category: "recruitment",
    title: "Resume screen in 90 seconds",
    useCase: "Decide pass / no-pass without reading every word.",
    body: `Screen this resume for [ROLE]: [PASTE RESUME]. Required signals: [LIST 3-5]. Output: (1) yes / no / maybe — one word, (2) the 2 strongest signals, (3) the 1 missing signal that worries me, (4) the 1 question I'd ask in a 15-min phone screen to confirm fit, (5) red flags — gaps, job-hopping, scope mismatch — if any. Be honest. Cost of false positive = wasted interview slots.`,
    model: "Claude",
  },
  {
    id: "recruit-offer-letter",
    category: "recruitment",
    title: "Offer letter with sell-through",
    useCase: "Close the candidate, not just paper.",
    body: `Write an offer letter from [HIRING MANAGER] to [CANDIDATE] for [ROLE] at [COMPANY]. Comp: [DETAILS]. Beyond the standard terms, include: (1) the specific reason WE want this candidate (not generic), (2) the 3 things they said in interview that we agree with, (3) what their first 90 days will feel like, (4) the people they'll work closely with, (5) how we'll measure their success, (6) honest description of one challenge they'll face. Tone: warm and direct, no corporate-speak.`,
    model: "Claude",
  },
  {
    id: "recruit-reference-call",
    category: "recruitment",
    title: "Reference call questions",
    useCase: "Verify the story without trapping the referee.",
    body: `Write the 8 questions for a reference call on [CANDIDATE], who'd be joining as [ROLE]. Ask only questions where the referee CAN say something useful — avoid yes/no traps. Cover: (1) context of how they worked together, (2) what the candidate is best at — specific examples, (3) where they grow next — without asking "weakness", (4) how they handle conflict or stress, (5) would you hire them again, (6) what management style brings out their best, (7) anything I should know that I'd kick myself for missing, (8) anything else.`,
    model: "Claude",
  },

  /* ────────── FOUNDER BRAIN (7) ────────── */
  {
    id: "founder-okrs",
    category: "founderBrain",
    title: "Quarterly OKRs from messy goals",
    useCase: "Turn 12 vague priorities into 3 OKRs.",
    body: `Here's my list of priorities for next quarter: [PASTE LIST]. Help me cut this to 3 OKRs. Output: (1) the 3 objectives — qualitative, ambitious, memorable, (2) for each: 3 measurable key results with specific numbers and dates, (3) what we explicitly will NOT do, (4) the kill criteria for each — what would make me drop this objective mid-quarter, (5) the 1 decision I need to make in week 1 to set this up. Force me to cut, not add.`,
    model: "Claude",
  },
  {
    id: "founder-weekly-planning",
    category: "founderBrain",
    title: "Weekly priority planning",
    useCase: "Decide what gets your Monday.",
    body: `Help me plan the week. My quarterly OKR is [PASTE]. Last week's wins: [PASTE]. Open commitments: [PASTE]. Output: (1) the ONE thing I should ship this week — be specific, (2) the 3 supporting moves, (3) the 2 things I'm dropping or saying no to, (4) the calendar blocks I should defend — when I do deep work, when I take calls, (5) the metric I'll review on Friday to know if the week mattered. Tough love. Cut my list to size.`,
    model: "Claude",
  },
  {
    id: "founder-decision-framework",
    category: "founderBrain",
    title: "Decision framework on autopilot",
    useCase: "Stop re-deciding the same decisions.",
    body: `I keep facing this decision class: [DESCRIBE DECISION CLASS — e.g. should we take this customer, should we hire here, should we pivot]. Build me a 5-step decision framework. For each step: the question to ask, the disqualifier, the green light, the data needed, the time-box. End with: when to escalate to my advisor / cofounder / board, and when to just decide and move. Make the framework runnable in 15 minutes.`,
    model: "Claude",
  },
  {
    id: "founder-pre-mortem",
    category: "founderBrain",
    title: "Pre-mortem: how will this fail?",
    useCase: "Stress-test a plan before you commit.",
    body: `I'm about to commit to [PLAN/PROJECT]. Run a pre-mortem. Imagine it's 6 months from now and this failed badly. Output: (1) the 5 most likely failure modes, ranked by probability × impact, (2) for each failure mode, the 1-2 leading indicators I'd see, (3) the prevention move for each, (4) the kill criteria — when to walk away, (5) which failure mode I'm most underestimating and why. Be harsh. Founder optimism bias is the enemy here.`,
    model: "Claude",
  },
  {
    id: "founder-investor-update",
    category: "founderBrain",
    title: "Monthly investor update",
    useCase: "Update investors without burning a day.",
    body: `Write a monthly investor update for [COMPANY]. This month's numbers: [PASTE METRICS]. Wins: [PASTE]. Losses: [PASTE]. Asks: [PASTE]. Structure: (1) one-paragraph summary — net direction and the bet we're testing, (2) key metrics with last month for comparison, (3) wins — concrete and brief, (4) losses and what we learned, (5) what's on deck for next month, (6) specific asks — intros, hires, customers. Tone: direct, no spin. Investors trust founders who name reality.`,
    model: "Claude",
  },
  {
    id: "founder-saying-no",
    category: "founderBrain",
    title: "Say no without burning the bridge",
    useCase: "Decline requests with grace.",
    body: `Someone is asking me for [REQUEST]. Context: [PASTE]. Write the polite-but-firm no. Structure: (1) acknowledge what they're asking and why it matters to them, (2) the no in plain language — not "circle back later", not "let me think", (3) the reason — honest but not over-explained, (4) the alternative offer if any (intro, resource, deferred timeline), (5) a warm sign-off. Max 100 words. Voice: confident, kind, not apologetic.`,
    model: "Claude",
  },
  {
    id: "founder-90day-plan",
    category: "founderBrain",
    title: "Founder's 90-day plan",
    useCase: "Lock the next quarter into one document.",
    body: `Help me write my 90-day plan as [FOUNDER ROLE] at [COMPANY]. Current stage: [STAGE]. Biggest constraint: [CONSTRAINT]. Output: (1) the 1 outcome that defines a successful 90 days, (2) the 3 mile-markers at days 30, 60, 90, (3) where I'll spend my 480 hours — % on product, sales, hiring, ops, (4) the 5 things I'm hiring out or saying no to, (5) the leading indicator I'll review weekly, (6) the personal goal that keeps me sane. Be ruthless about focus.`,
    model: "Claude",
  },
];

/* ────────── helpers ────────── */

export const PROMPT_COUNT = PROMPTS.length;

export function promptsByCategory(key: PromptCategory): Prompt[] {
  return PROMPTS.filter((p) => p.category === key);
}

/** Build a deep link that opens this prompt in ChatGPT or Claude. */
export function buildModelLink(
  model: "chatgpt" | "claude",
  promptBody: string
): string {
  const q = encodeURIComponent(promptBody);
  if (model === "chatgpt") {
    return `https://chat.openai.com/?q=${q}`;
  }
  return `https://claude.ai/new?q=${q}`;
}
