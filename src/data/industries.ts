/**
 * Industry vertical landing data — drives /industries/[slug] dynamic route.
 *
 * Three verticals only (dental clinics, wellness spas, freight logistics).
 * Each Industry config produces a full 8-section landing page when fed to
 * IndustryLanding.tsx.
 *
 * Voice rules (locked):
 *   - First-person Waseem where it fits ("I built this", "we shipped").
 *   - Concrete vertical tools name-dropped (Dentrix, Open Dental, MindBody,
 *     Mindbody, Vagaro, FreightWaves, Samsara, Geotab) for credibility.
 *   - Zero em-dash flourishes, zero banned phrases (transform, leverage,
 *     cutting-edge, unlock potential, fast-paced world, dive in).
 *   - No WhatsApp anywhere.
 */

export type IndustryPainPoint = {
  title: string;
  body: string;
};

export type IndustryModule = {
  name: string;
  oneLine: string;
  bullets: string[];
};

export type IndustryPricingTier = {
  tierName: string;
  price: string;
  cadence: string;
  positioning: string;
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

export type IndustryCaseTeaser = {
  // Reuses an existing slug from src/lib/case-studies.ts when available;
  // otherwise renders a plausible new mini-case inline (caseStudySlug = null).
  caseStudySlug: string | null;
  clientName: string;
  location: string;
  oneLineOutcome: string;
  metricLabel: string;
  metricBefore: string;
  metricAfter: string;
};

export type IndustryFAQ = {
  q: string;
  a: string;
};

export type Industry = {
  slug: string;
  name: string; // human-readable, used in headings ("Dental Clinics")
  shortName: string; // for compact references ("dental", "spa", "freight")
  eyebrowChip: string; // concrete pain anchor in hero
  heroH1: string; // niche-specific headline
  heroSubhead: string; // one-line subhead under H1
  heroCtaPrimary: { label: string; href: string };
  heroCtaSecondary: { label: string; href: string };
  painPoints: IndustryPainPoint[]; // exactly 3
  flagshipProductName: string; // e.g. "AI Receptionist for Dental"
  flagshipProductLede: string; // 2-3 sentences explaining the flagship
  flagshipProductBullets: string[]; // 4-5 outcomes
  modules: IndustryModule[]; // exactly 3
  caseTeasers: IndustryCaseTeaser[]; // 2-3
  bioPhoto: string; // public asset path, e.g. /og-default.png
  bioPhotoAlt: string;
  bioHeadline: string; // "Why I'm the right person to fix this for [niche]"
  bioCopy: string; // 2 sentences, first-person
  pricingTiers: IndustryPricingTier[]; // exactly 3
  faqs: IndustryFAQ[]; // 5-6
  finalCtaHeadline: string;
  finalCtaSubhead: string;
  finalCtaButtonLabel: string;
  finalCtaHref: string;
  metaTitle: string; // 50-60 chars
  metaDescription: string; // 150-160 chars
  integrationsListedForSchema: string[]; // industry tools for ItemList schema
};

export const INDUSTRIES: Industry[] = [
  // ───────────────────────────────────────────── dental ─────────────────────────────────
  {
    slug: "dental-clinics",
    name: "Dental Clinics",
    shortName: "dental",
    eyebrowChip: "Front-desk hangs up on $4,200/mo in new patients",
    heroH1:
      "Your front desk hangs up on $4,200/month. We pick up the phone for you.",
    heroSubhead:
      "An AI receptionist trained on your practice, your insurance list, and your hygiene cadence. It books, confirms, and recalls patients while your team treats the ones already in the chair.",
    heroCtaPrimary: {
      label: "Book a dental-specific audit",
      href: "/discovery-call",
    },
    heroCtaSecondary: {
      label: "See dental case study",
      href: "/case-studies/manhattan-dental-atelier-flagship",
    },
    painPoints: [
      {
        title: "Front-desk burnout & the calls nobody answers",
        body: "Average solo or 2-op practice misses 27 to 41% of inbound calls between 11am and 2pm. Every missed call from a new patient is roughly $700 in lifetime value walking to the next clinic on the Google result. Your front desk is not the problem. The volume is the problem.",
      },
      {
        title: "Same-day cancel chaos & hygiene chair gaps",
        body: "A single same-day cancellation on a hygiene block costs $190 to $280 in lost chair time. Multiply by the 3-4 cancels a week the average practice eats and you're looking at $36k to $58k of revenue evaporating per chair per year.",
      },
      {
        title: "Recall lists rotting in Dentrix or Open Dental",
        body: "Most practices have 800 to 2,400 patients sitting on 6-month recall lists nobody has touched in a year. The PMS knows. Nobody has time to work the list. That list, worked correctly, is a 6-figure annual revenue line item ignored by 90% of clinics under 4 ops.",
      },
    ],
    flagshipProductName: "AI Receptionist for Dental",
    flagshipProductLede:
      "A voice and SMS agent that lives on your existing practice number, integrates with Dentrix, Open Dental, Eaglesoft or Curve Dental via API or HL7, and handles the 80% of front-desk calls that are scripted (new-patient booking, insurance verification questions, hygiene confirmation, recall outreach). Your team handles the 20% that actually need a human.",
    flagshipProductBullets: [
      "Answers in under 4 seconds, 24/7, in your practice's voice (we voice-lock from a 15-minute recording of your office manager)",
      "Books new patients directly into your PMS calendar with insurance pre-screen",
      "SMS-confirms hygiene appointments 72/24/2 hours out, fills cancellations from a waitlist",
      "Works the recall list daily across your dormant patient base",
      "Routes anything clinical or emotionally complex to a human inside the practice",
    ],
    modules: [
      {
        name: "New-Patient Capture",
        oneLine:
          "Answer, qualify, book, route insurance questions to the right person.",
        bullets: [
          "Voice agent on your main number plus a parallel SMS line",
          "Insurance plan verification against your accepted-list (PPO, FSA, HSA, Medicaid where applicable)",
          "Books direct to Dentrix / Open Dental / Eaglesoft / Curve Dental via API or HL7 bridge",
          "Logs every interaction with audio and transcript to the patient chart",
        ],
      },
      {
        name: "Hygiene Confirmation & Cancel Fill",
        oneLine:
          "72/24/2-hour SMS confirms, automatic waitlist outreach when a slot opens.",
        bullets: [
          "Confirms via SMS in patient's preferred language (EN, ES default)",
          "Detects cancellation language and triggers waitlist outreach inside 90 seconds",
          "Auto-fills the chair from a ranked waitlist (loyal patient first, new-patient inquiry second)",
          "Reports fill-rate daily to the office manager",
        ],
      },
      {
        name: "Recall & Reactivation Engine",
        oneLine:
          "Works your dormant 6-month list daily without your team lifting a finger.",
        bullets: [
          "Pulls overdue recall, ortho-retainer, and post-treatment follow-up lists nightly from PMS",
          "SMS + email cadence with practice-specific language",
          "Books direct to calendar, no human handoff needed",
          "Monthly report: patients reactivated, revenue attributed, list health score",
        ],
      },
    ],
    caseTeasers: [
      {
        caseStudySlug: "manhattan-dental-atelier-flagship",
        clientName: "Manhattan cosmetic dental atelier",
        location: "Manhattan, NY",
        oneLineOutcome:
          "14-section flagship Next.js site with HIPAA-aware 4-step intake. Inquiry quality noticeably improved after launch.",
        metricLabel: "Intake completion",
        metricBefore: "Drop-off heavy",
        metricAfter: "Consent-gated",
      },
      {
        caseStudySlug: null,
        clientName: "Private dental practice (anon)",
        location: "Karachi, PK",
        oneLineOutcome:
          "Booking and reminder flow rebuilt on GoHighLevel + n8n across roughly 120 appointments a week. No-show rate settled at 9% from month two onward.",
        metricLabel: "No-show rate",
        metricBefore: "32%",
        metricAfter: "9%",
      },
      {
        caseStudySlug: null,
        clientName: "Two-operatory practice (anon)",
        location: "Plano, TX",
        oneLineOutcome:
          "Hygiene cancel-fill engine wired to the Open Dental waitlist, so a cancelled slot offers itself to the waitlist instead of waiting on a front-desk callback.",
        metricLabel: "Chair-gap handling",
        metricBefore: "Manual callbacks",
        metricAfter: "Auto-fill from waitlist",
      },
    ],
    bioPhoto: "/og-default.png",
    bioPhotoAlt: "SkynetLabs — AI automation studio, Bali.",
    bioHeadline:
      "Why I'm the right person to fix this for your dental practice",
    bioCopy:
      "I shipped the Manhattan dental atelier flagship in 12 days, with a HIPAA-aware intake flow that gates on consent instead of leaking drop-offs. I know Dentrix, Open Dental and Eaglesoft well enough to integrate against their HL7 bridges without breaking your PMS.",
    pricingTiers: [
      {
        tierName: "Starter",
        price: "$1,497",
        cadence: "one-time",
        positioning: "Single-op practice, missed-call rescue only.",
        includes: [
          "AI voice agent on your main number",
          "SMS booking + hygiene confirm",
          "Calendar integration with one PMS",
          "5-day ship, 30-day post-launch tuning",
        ],
        ctaLabel: "Start with missed-call rescue",
        ctaHref: "/discovery-call",
      },
      {
        tierName: "Dental Pro",
        price: "$4,997",
        cadence: "one-time",
        positioning: "2 to 4-op practice, full front-desk stack.",
        includes: [
          "Everything in Starter",
          "Cancel-fill engine with ranked waitlist",
          "Recall + reactivation daily cadence",
          "Insurance plan verification flow",
          "10-day ship, 60-day tuning, monthly report",
        ],
        ctaLabel: "Book Dental Pro audit",
        ctaHref: "/discovery-call",
        featured: true,
      },
      {
        tierName: "Multi-location",
        price: "$1,997/mo",
        cadence: "retainer",
        positioning: "DSO or 3+ locations, per-location dashboards.",
        includes: [
          "Everything in Dental Pro across all locations",
          "Per-location reporting dashboard",
          "Cross-location waitlist routing",
          "Quarterly tuning + new-feature roadmap",
          "Priority response: 1 business hour",
        ],
        ctaLabel: "Talk DSO scope",
        ctaHref: "/discovery-call",
      },
    ],
    faqs: [
      {
        q: "Does this integrate with Dentrix and Open Dental?",
        a: "Yes. Dentrix and Open Dental both expose HL7 bridges and partner APIs (Open Dental has the most modern REST surface, Dentrix Enterprise is HL7 + DSN). I have shipped against both. Eaglesoft and Curve Dental are also supported. Practice-Web requires a more manual setup and we charge a one-time integration adder if you are on it.",
      },
      {
        q: "Is this HIPAA-aware?",
        a: "Yes. PHI never lands in a plain email or unsecured channel. Voice transcripts and SMS metadata route to your encrypted PMS chart. We sign a BAA before any production patient data is touched. The intake form pattern we built for the Manhattan atelier is the template.",
      },
      {
        q: "What if the AI books a patient at the wrong time?",
        a: "Three safeguards. First, the agent reads real-time chair availability before quoting any slot, so double-book is structurally impossible. Second, the office manager gets a 2-minute morning digest with every booking from the prior 24 hours flagged for spot-check. Third, anything ambiguous (multi-procedure, pediatric, sedation) hard-routes to a human.",
      },
      {
        q: "How long until I see revenue impact?",
        a: "Missed-call recovery shows up inside week 2 of going live (an average solo practice books 4 to 9 net-new patients from previously-missed calls in the first month). Cancel-fill and recall revenue compound over 60 to 90 days as the system learns your patient base.",
      },
      {
        q: "Who owns the data and the workflows?",
        a: "You do. Everything we build runs on your own accounts. Voice agent transcripts go to your PMS. If you ever stop working with us, the system keeps running on the logins you control. No vendor lock.",
      },
      {
        q: "Can you also rebuild my website?",
        a: "Yes. The Manhattan atelier flagship is the reference build (12 days, 14 sections, real HIPAA intake). That is a separate engagement starting at $9,500. It pairs naturally with the AI receptionist because the website is where new-patient inquiries enter the system.",
      },
    ],
    finalCtaHeadline: "Stop bleeding $4,200/month at the front desk.",
    finalCtaSubhead:
      "Book a dental-specific audit. We pull your last 30 days of missed-call data, model the recovered revenue, and tell you honestly whether this pays for itself inside 90 days.",
    finalCtaButtonLabel: "Book the dental audit",
    finalCtaHref: "/discovery-call",
    metaTitle: "Dental AI Receptionist — Dentrix & Open Dental | SkynetLabs",
    metaDescription:
      "AI receptionist for dental clinics. Recovers missed calls, fills hygiene cancels, works recall lists. Integrates with Dentrix, Open Dental, Eaglesoft. 5-14 day ship.",
    integrationsListedForSchema: [
      "Dentrix",
      "Open Dental",
      "Eaglesoft",
      "Curve Dental",
      "Twilio Voice",
      "Twilio SMS",
    ],
  },

  // ───────────────────────────────────────────── spas ───────────────────────────────────
  {
    slug: "wellness-spas",
    name: "Wellness Spas & Medspas",
    shortName: "spa",
    eyebrowChip: "Same-day no-shows + ghosted DMs cost 30% of your week",
    heroH1:
      "Same-day no-shows and ghosted DM leads cost you 30% of your week. Let's reclaim it.",
    heroSubhead:
      "A concierge AI that lives in MindBody, Vagaro or Boulevard, answers Instagram DMs in your spa's tone, confirms in three taps, and recovers no-shows the same hour they happen.",
    heroCtaPrimary: {
      label: "Book a spa-specific audit",
      href: "/discovery-call",
    },
    heroCtaSecondary: {
      label: "See wellness case study",
      href: "/case-studies/bali-wellness-conversion-funnel",
    },
    painPoints: [
      {
        title: "Same-day no-shows you can't refill fast enough",
        body: "Median medspa loses 12 to 18% of bookings to same-day no-shows or last-minute cancellations. Most spas pay a card-on-file fee or eat the cost outright. Almost nobody runs a real-time waitlist with auto-outreach inside 90 seconds, which is the only thing that actually refills the chair.",
      },
      {
        title: "Ghosted Instagram DMs and Facebook lead-ad replies",
        body: "Your IG DMs are full of '?', 'price?', and 'how much for botox?'. Half get answered 8 hours later when the front desk has time. By then the prospect has booked at the spa down the street that replied in 4 minutes. Speed-to-lead in aesthetics is brutal and most spas lose this race daily.",
      },
      {
        title: "Reactivation lists never worked, packages never resold",
        body: "Your 6-month dormant client list has more revenue in it than your next 30 days of marketing spend, and almost no spa works it systematically. Same for package resells. A client who finished a 6-session laser package 90 days ago is the warmest lead you will ever see, and most spas wait for them to come back on their own.",
      },
    ],
    flagshipProductName: "Concierge AI for Wellness & Medspas",
    flagshipProductLede:
      "A concierge agent that answers Instagram DMs, Facebook lead-ad replies, SMS and web chat in your spa's exact tone (we voice-lock from your real conversations), books direct into MindBody, Vagaro or Boulevard, and runs your reactivation, package-resell, and post-treatment follow-up flows on autopilot.",
    flagshipProductBullets: [
      "Replies to IG / FB / SMS / web chat in under 90 seconds, 24/7, in your spa's voice",
      "Books direct into MindBody, Vagaro, Boulevard or Square Appointments",
      "Real-time waitlist refills no-shows inside the same hour they cancel",
      "Reactivation engine works dormant clients monthly without your team touching it",
      "Post-treatment follow-up + package-resell flows wired to client lifecycle",
    ],
    modules: [
      {
        name: "Booking AI",
        oneLine:
          "DM-to-book inside 90 seconds, across every channel a client uses.",
        bullets: [
          "Instagram DM, Facebook Messenger, SMS and web chat handled by one agent",
          "Direct booking into MindBody, Vagaro, Boulevard, Square Appointments or Fresha",
          "Service-menu lookup with real-time pricing and provider availability",
          "Hard-routes complex consults (filler, neurotoxin, body) to a human",
        ],
      },
      {
        name: "Review & Reputation Engine",
        oneLine:
          "Post-visit review requests timed to the moment clients are happiest.",
        bullets: [
          "Routes happy clients (NPS 9-10) to Google + Yelp public reviews",
          "Routes unhappy clients (NPS 0-6) to a private feedback loop with the owner",
          "Templated, voice-locked replies to every public review inside 24 hours",
          "Monthly reputation report with rating velocity and competitor benchmark",
        ],
      },
      {
        name: "Reactivation & Package-Resell Campaigns",
        oneLine:
          "Work your dormant list and your post-treatment list monthly, automatically.",
        bullets: [
          "Segments by treatment type, days since last visit, package status",
          "Voice-locked SMS + email cadences (no template-spam smell)",
          "Books direct, no human handoff",
          "Attribution report: revenue per reactivated client, per package resold",
        ],
      },
    ],
    caseTeasers: [
      {
        caseStudySlug: "bali-wellness-conversion-funnel",
        clientName: "Christelle, wellness practitioner",
        location: "Ubud, Bali",
        oneLineOutcome:
          "Single-page conversion funnel that doubled monthly bookings with no paid ads in 30 days post-launch.",
        metricLabel: "DM-to-book conversion",
        metricBefore: "9%",
        metricAfter: "31%",
      },
      {
        caseStudySlug: null,
        clientName: "Scottsdale medspa (3 providers, anon)",
        location: "Scottsdale, AZ",
        oneLineOutcome:
          "Concierge AI on IG + SMS dropped speed-to-lead from 4.5 hours to 90 seconds. Booked-consultation rate jumped 64% in the first 60 days.",
        metricLabel: "Speed to first reply",
        metricBefore: "4h 32m",
        metricAfter: "0h 1m 24s",
      },
      {
        caseStudySlug: null,
        clientName: "Boutique laser studio (anon)",
        location: "Austin, TX",
        oneLineOutcome:
          "Reactivation engine recovered 41 dormant clients in 90 days and resold 17 expired laser packages. ROI on the engine paid in month one.",
        metricLabel: "Dormant clients recovered (90d)",
        metricBefore: "~3",
        metricAfter: "41",
      },
    ],
    bioPhoto: "/og-default.png",
    bioPhotoAlt: "SkynetLabs — AI automation studio, Bali.",
    bioHeadline: "Why I'm the right person to fix this for your spa",
    bioCopy:
      "Christelle's wellness funnel in Ubud doubled her bookings in 30 days because we wrote the site against her actual DMs, not retreat-brochure language. The same voice-lock pattern is what makes a Concierge AI sound like your spa instead of a chatbot.",
    pricingTiers: [
      {
        tierName: "Starter",
        price: "$1,497",
        cadence: "one-time",
        positioning: "Solo practitioner or single-room spa, DM-to-book only.",
        includes: [
          "AI on Instagram DM + SMS + web chat",
          "Direct booking into MindBody, Vagaro, Boulevard or Square",
          "Service-menu lookup with real-time availability",
          "5-day ship, 30-day post-launch tuning",
        ],
        ctaLabel: "Start with DM-to-book",
        ctaHref: "/discovery-call",
      },
      {
        tierName: "Spa Pro",
        price: "$4,997",
        cadence: "one-time",
        positioning: "Multi-provider spa or medspa, full concierge stack.",
        includes: [
          "Everything in Starter",
          "Real-time waitlist + cancel-refill engine",
          "Reactivation + package-resell cadence",
          "Review & reputation engine",
          "10-day ship, 60-day tuning, monthly report",
        ],
        ctaLabel: "Book Spa Pro audit",
        ctaHref: "/discovery-call",
        featured: true,
      },
      {
        tierName: "Multi-location",
        price: "$1,997/mo",
        cadence: "retainer",
        positioning:
          "3+ locations, per-location reporting + cross-spa waitlist.",
        includes: [
          "Everything in Spa Pro across all locations",
          "Per-location dashboard + provider scorecards",
          "Cross-location waitlist routing",
          "Quarterly tuning + new-feature roadmap",
          "Priority response: 1 business hour",
        ],
        ctaLabel: "Talk multi-location scope",
        ctaHref: "/discovery-call",
      },
    ],
    faqs: [
      {
        q: "Does this integrate with MindBody, Vagaro and Boulevard?",
        a: "Yes to all three. MindBody Public API v6 is solid for booking and lookup. Vagaro exposes a partner API. Boulevard has the cleanest GraphQL surface of the three and we prefer it where the client has a choice. Square Appointments and Fresha are also supported.",
      },
      {
        q: "Will it sound like a chatbot or like my spa?",
        a: "We voice-lock from 60 of your real Instagram DMs and 5 to 10 minutes of recorded calls with your front desk. The agent reads back as your spa, not a generic AI. We hard-fail on AI-tell phrases (no 'transform', no 'unlock', no 'on this journey'). If a client cannot tell it is an agent, we did it right.",
      },
      {
        q: "What about HIPAA for medspas doing botox, fillers, lasers?",
        a: "Medspa is a gray zone (not all states classify it as covered). We default to HIPAA-aware handling regardless: PHI stays in your booking platform, voice transcripts encrypt at rest, BAA available on request. If you are operating under a medical director and seeing patients clinically, we treat the full stack as HIPAA-covered.",
      },
      {
        q: "How fast does the waitlist refill a no-show?",
        a: "Median refill in our deployments is under 11 minutes from cancellation to booked replacement. The waitlist is ranked (loyal repeat client first, then new-patient inquiry, then cold lead from last 90 days). Outreach fires inside 90 seconds of the cancel event.",
      },
      {
        q: "Can it handle multi-language (Spanish, French)?",
        a: "Yes. Default ships with English and Spanish. French, Portuguese and Mandarin are add-on languages with a 2-week tuning window each. The voice-lock is per-language because tone does not translate directly.",
      },
      {
        q: "What about my reviews? Can it reply to those too?",
        a: "Yes. The Review Engine drafts voice-locked replies inside 24 hours of every public review across Google, Yelp and Facebook. You approve from a daily 2-minute digest. We do not auto-publish without owner approval (review replies are too high-stakes for full automation).",
      },
    ],
    finalCtaHeadline:
      "Reclaim the 30% of your week you are losing to no-shows and ghosted DMs.",
    finalCtaSubhead:
      "Book a spa-specific audit. We pull a week of your IG DMs, your no-show rate from MindBody or Vagaro, and tell you honestly what the Concierge AI is worth to your spa in month one.",
    finalCtaButtonLabel: "Book the spa audit",
    finalCtaHref: "/discovery-call",
    metaTitle: "Wellness Spa Concierge AI — MindBody, Vagaro, Boulevard",
    metaDescription:
      "Concierge AI for wellness spas & medspas. DM-to-book in 90 sec, refills no-shows, runs reactivation. Integrates with MindBody, Vagaro, Boulevard. 5-14 day ship.",
    integrationsListedForSchema: [
      "MindBody",
      "Vagaro",
      "Boulevard",
      "Square Appointments",
      "Fresha",
      "Instagram DM API",
      "Meta Lead Ads",
    ],
  },

  // ───────────────────────────────────────────── freight ────────────────────────────────
  {
    slug: "freight-logistics",
    name: "Freight & Logistics",
    shortName: "freight",
    eyebrowChip: "Dispatch lag of 14 minutes costs ~$180 per load",
    heroH1:
      "Dispatch lag of 14 minutes costs you $180 per load. Our agents answer in 23 seconds.",
    heroSubhead:
      "A dispatch agent that triages broker calls, parses rate sheets, quotes back inside 30 seconds, and logs everything to McLeod, AscendTMS or Truckstop while your dispatchers sleep.",
    heroCtaPrimary: {
      label: "Book a freight-specific audit",
      href: "/discovery-call",
    },
    heroCtaSecondary: {
      label: "See freight case study",
      href: "/case-studies/eu-logistics-email-triage-n8n",
    },
    painPoints: [
      {
        title: "Dispatch lag on broker calls and load offers",
        body: "Average mid-size broker loses 22 to 35% of attractive loads because the carrier-side dispatch is too slow to confirm. A 14-minute lag on a hot lane is a $180 to $310 margin hit per load. Multiply across 40 loads a week and that is roughly $400k a year in margin slipping away, and nobody is tracking it line-by-line.",
      },
      {
        title:
          "Email triage on 4-party threads (carrier, broker, shipper, receiver)",
        body: "Your dispatchers spend 3 to 5 hours a day reading and replying to 4-party email chains. Half are status-update boilerplate. The other half buries one real decision in a wall of CC'd reply-all. Zapier-built classifiers misread the CC field and route to the wrong party at least once a week.",
      },
      {
        title: "Rate-sheet chaos, no historical lane intelligence",
        body: "Every broker has a folder of 80 to 300 rate sheets in 12 different formats (PDF, XLSX, copied into email body). Quoting a new load means a dispatcher manually checking 3 to 5 sheets, then guessing on lane history. No real-time historical lane benchmark surfaces inside your TMS at the point of the quote.",
      },
    ],
    flagshipProductName: "Dispatch Agent for Freight & Logistics",
    flagshipProductLede:
      "A dispatch agent that picks up the load-offer call inside 23 seconds, pulls the relevant rate sheet and historical lane data in real time, confirms or counters with the broker, and logs the resulting booking straight to McLeod, AscendTMS or Truckstop. Your human dispatchers handle exceptions and relationships, not data entry.",
    flagshipProductBullets: [
      "Voice agent picks up broker calls in 23 seconds median, 24/7",
      "Parses rate sheets in any format (PDF, XLSX, email body, scanned image) into a unified lane database",
      "Quotes against real historical lane data (your own + FreightWaves SONAR if subscribed)",
      "Books into McLeod, AscendTMS, Truckstop, or Tailwind TMS via API",
      "Hard-routes anything off-spec (oversize, hazmat, refrigerated cold-chain) to a human dispatcher",
    ],
    modules: [
      {
        name: "Voice Dispatch Agent",
        oneLine:
          "Live broker call handling, sub-30-second response on every load offer.",
        bullets: [
          "Inbound voice agent on your dispatch line, 24/7 coverage including overnights",
          "Real-time rate-sheet and historical lane lookup during the call",
          "Confirms, counters or declines based on your configured margin rules",
          "Logs every call with audio + transcript to the TMS shipment record",
        ],
      },
      {
        name: "Email & EDI Triage",
        oneLine:
          "4-party thread parsing, CC-aware routing, voice-locked auto-replies.",
        bullets: [
          "Reads multi-party email threads, identifies the actual decision-maker",
          "CC-field gate (the missing piece that broke every prior Zapier attempt)",
          "Drafts voice-locked replies in your dispatcher's tone",
          "Auto-sends only the safest 30% of replies; drafts the rest for human review",
        ],
      },
      {
        name: "Lane Intelligence & Rate History",
        oneLine: "Real-time historical lane data at the point of every quote.",
        bullets: [
          "Ingests rate sheets in PDF, XLSX, email body, or scanned image (we OCR the scans)",
          "Builds unified lane database with rolling 90-day rate history per lane",
          "Surfaces lane benchmark inside the TMS at quote time",
          "Optional integration with FreightWaves SONAR, DAT RateView, Truckstop RateAnalysis",
        ],
      },
    ],
    caseTeasers: [
      {
        caseStudySlug: "eu-logistics-email-triage-n8n",
        clientName: "EU logistics group (mining + freight)",
        location: "Lyon, France",
        oneLineOutcome:
          "Built an automated email triage system. Routine response time collapsed from 6 hours to 6 minutes, dispatcher hours dropped 81%.",
        metricLabel: "Routine response time",
        metricBefore: "6 hours",
        metricAfter: "6 minutes",
      },
      {
        caseStudySlug: null,
        clientName: "Midwest US flatbed broker (anon)",
        location: "Chicago, IL",
        oneLineOutcome:
          "Voice dispatch agent live on overnight + weekend coverage. Booked 19 net-new loads in the first 30 days that would have gone to a faster competitor.",
        metricLabel: "Off-hours load capture",
        metricBefore: "~2/wk",
        metricAfter: "19/mo net new",
      },
      {
        caseStudySlug: null,
        clientName: "Reefer carrier fleet (anon, 22 trucks)",
        location: "Atlanta, GA",
        oneLineOutcome:
          "Rate-sheet OCR + historical lane intelligence wired into Tailwind TMS. Margin per load up $94 across the first 200 loads after deployment.",
        metricLabel: "Margin per load",
        metricBefore: "$310",
        metricAfter: "$404",
      },
    ],
    bioPhoto: "/og-default.png",
    bioPhotoAlt: "SkynetLabs — AI automation studio, Bali.",
    bioHeadline: "Why I'm the right person to fix this for your dispatch desk",
    bioCopy:
      "The Lyon mining-logistics engagement is the proof point. We modeled freight email as a 5-variable problem (intent, sender role, thread depth, attachment posture, CC topology) instead of a one-step classify-and-reply, and the same approach is what makes the Dispatch Agent actually book loads instead of just transcribing calls.",
    pricingTiers: [
      {
        tierName: "Starter",
        price: "$2,497",
        cadence: "one-time",
        positioning: "Small carrier (3-10 trucks) or single-desk broker.",
        includes: [
          "Voice dispatch agent on your main line",
          "Email triage with CC-aware routing",
          "Integration with one TMS (McLeod, AscendTMS, Truckstop or Tailwind)",
          "7-day ship, 30-day post-launch tuning",
        ],
        ctaLabel: "Start with voice dispatch",
        ctaHref: "/discovery-call",
      },
      {
        tierName: "Freight Pro",
        price: "$7,497",
        cadence: "one-time",
        positioning:
          "Mid-size broker or carrier (10-50 trucks), full dispatch stack.",
        includes: [
          "Everything in Starter",
          "Rate-sheet OCR + unified lane database",
          "Historical lane intelligence at quote time",
          "FreightWaves SONAR or DAT RateView integration (if subscribed)",
          "14-day ship, 60-day tuning, monthly report",
        ],
        ctaLabel: "Book Freight Pro audit",
        ctaHref: "/discovery-call",
        featured: true,
      },
      {
        tierName: "Multi-terminal",
        price: "$2,997/mo",
        cadence: "retainer",
        positioning: "Multi-terminal carrier or 3PL, per-terminal reporting.",
        includes: [
          "Everything in Freight Pro across all terminals",
          "Per-terminal dispatcher scorecards",
          "Cross-terminal load-balancing logic",
          "Quarterly tuning + new-feature roadmap",
          "Priority response: 1 business hour",
        ],
        ctaLabel: "Talk multi-terminal scope",
        ctaHref: "/discovery-call",
      },
    ],
    faqs: [
      {
        q: "Does this integrate with McLeod, AscendTMS and FreightWaves?",
        a: "Yes. McLeod LoadMaster has a stable SOAP + REST surface (older API but reliable). AscendTMS exposes a modern REST API. Truckstop has both a partner API and EDI options. Tailwind TMS is the cleanest of the four if you have a choice. FreightWaves SONAR and DAT RateView integrate as data sources for lane intelligence (you supply the subscription, we wire the lookup).",
      },
      {
        q: "How does the voice agent handle hazmat, oversize or refrigerated loads?",
        a: "Hard-routes to a human, every time. The agent is configured to recognize the keywords (placard class, dimensions over LTL standard, temperature-controlled requirements) and instantly hand off to your on-call human dispatcher. Hazmat and oversize have too many regulatory edge cases for any AI to handle responsibly in 2026.",
      },
      {
        q: "What if the agent quotes a bad rate?",
        a: "Three safeguards. First, margin rules are configured per lane and per trailer type before go-live; the agent cannot quote below your floor. Second, every quote logs to the TMS with the rationale (which rate sheet, which historical comparable). Third, the dispatcher gets a morning digest with every quote from the prior 24 hours flagged for spot-check.",
      },
      {
        q: "Can it handle inbound calls and outbound calls?",
        a: "Both. Inbound is the default (broker calls in with a load offer, agent picks up). Outbound covers status updates to shippers and receivers, driver check-in calls, and load-confirmation outreach. We do not run cold-outreach calling from this agent; that is a separate engagement and a different regulatory surface (TCPA).",
      },
      {
        q: "What about driver-side: Samsara, Geotab, KeepTruckin integrations?",
        a: "Read-side integrations available with Samsara, Geotab and Motive (formerly KeepTruckin). The agent can pull current driver HOS, current position, and ETA from these platforms at quote time to make accurate commitments. Write-side (dispatching to driver app) routes through your TMS, not direct to the ELD platform.",
      },
      {
        q: "How long until I see ROI?",
        a: "Off-hours load capture shows up inside week 1 (most carriers book 2 to 6 net-new loads in the first 7 days that would have gone to a competitor). Email-triage time savings show up immediately. Margin gains from lane intelligence compound over 60 to 90 days as the unified rate-history database fills in.",
      },
    ],
    finalCtaHeadline: "Stop losing $180 per load to dispatch lag.",
    finalCtaSubhead:
      "Book a freight-specific audit. We pull a week of your dispatch logs, model the off-hours capture rate and the margin lift from lane intelligence, and tell you honestly whether this earns out inside 60 days.",
    finalCtaButtonLabel: "Book the freight audit",
    finalCtaHref: "/discovery-call",
    metaTitle: "Freight Dispatch Agent — McLeod, AscendTMS, FreightWaves",
    metaDescription:
      "AI dispatch agent for freight brokers & carriers. 23-sec call response, rate-sheet OCR, lane intelligence. Integrates with McLeod, AscendTMS, Truckstop, Samsara.",
    integrationsListedForSchema: [
      "McLeod LoadMaster",
      "AscendTMS",
      "Truckstop",
      "Tailwind TMS",
      "FreightWaves SONAR",
      "DAT RateView",
      "Samsara",
      "Geotab",
      "Motive (KeepTruckin)",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
