/**
 * work-builds.ts — single source of truth for the portfolio (WorkShowcase gallery)
 * AND the /work/[slug] showcase detail pages.
 *
 * WORK_BUILDS = the base tile data (moved out of WorkShowcase 2026-07-01).
 * WORK_NARRATIVE = per-build long-form showcase copy for the detail pages,
 * written truth-locked (no fabricated metrics/testimonials for spec demos).
 */

export type WorkCategory = "client" | "flagship" | "portal" | "demo";

export type Gig = {
  slug: string;
  title: string;
  client: string;
  niche: string;
  stack: string[];
  outcome: string;
  liveUrl: string;
  category: WorkCategory;
};

export const WORK_BUILDS: Gig[] = [
  // Real client work
  {
    slug: "kitts-recovery-services",
    title: "Kitts Recovery Services",
    client: "Majesta Kitts · EdD MPH CPRS · Rhode Island",
    niche: "Wellness / Peer Recovery",
    stack: ["Custom HTML", "Tailwind", "HeyPeers"],
    outcome:
      "Live peer-led recovery practice. Booking + brand kit shipped in 4 days.",
    liveUrl: "https://www.kittsrecoveryservices.com",
    category: "client",
  },
  {
    slug: "skynetlabs-ariapura-relaunch",
    title: "Ariapura · Sanificazione Condizionatori",
    client: "Italian HVAC client · Bologna",
    niche: "HVAC / Sanitation (IT)",
    stack: ["Next.js", "Tailwind", "Italian SEO"],
    outcome: "Live client relaunch. Multilingual conversion funnel.",
    liveUrl: "https://skynetlabs-ariapura-relaunch.vercel.app",
    category: "client",
  },
  {
    slug: "skynetjoe",
    title: "SkynetLabs · Agency HQ",
    client: "SkynetLabs (in-house · Bali + Lahore)",
    niche: "Agency / Automation",
    stack: ["Next.js 16", "GHL", "n8n"],
    outcome: "Main agency site. AEO-tuned. Pain-first funnel.",
    liveUrl: "https://skynetjoe.com",
    category: "client",
  },
  // Flagships
  {
    slug: "skynetlabs-dental-flagship",
    title: "Grand Mercer Dental · Atelier No. 1",
    client: "Bespoke flagship · SoHo, New York",
    niche: "Luxury Healthcare",
    stack: ["Next.js 16", "Tailwind", "Vercel"],
    outcome:
      "$50K-tier flagship. Distilled from niche audit — zero template DNA.",
    liveUrl: "https://skynetlabs-dental-flagship.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynet-flagship-realestate",
    title: "Adrián Vega · Compass Beverly Hills",
    client: "Luxury real estate flagship",
    niche: "Luxury Real Estate",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Serhant-tier bespoke build. Listings + insights + SEO sitemap.",
    liveUrl: "https://skynet-flagship-realestate.vercel.app",
    category: "flagship",
  },
  {
    slug: "auberlin-estate-flagship",
    title: "Auberlin Estate · Hudson Valley Wedding Venue",
    client: "Heritage event venue · Est. 1908",
    niche: "Event Venue / Weddings",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Heritage-brand flagship. Editorial design + booking funnel.",
    liveUrl: "https://auberlin-estate-flagship.vercel.app",
    category: "flagship",
  },
  {
    slug: "restaurant-mu-two",
    title: "Ostería Marquez · Modern Mediterranean Chicago",
    client: "Restaurant flagship",
    niche: "Restaurant / Hospitality",
    stack: ["Next.js", "Tailwind", "Resy"],
    outcome: "Bespoke restaurant build w/ reservations + gallery + IG embed.",
    liveUrl: "https://restaurant-mu-two.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynetlabs-law-demo",
    title: "Harrington Lex LLP · Chicago Trial Boutique",
    client: "Law firm flagship",
    niche: "Legal / Litigation",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Commercial litigation boutique. SEO sitemap + robots tuned.",
    liveUrl: "https://skynetlabs-law-demo.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynetlabs-medical-demo",
    title: "Riverside Internal Medicine · Concierge Care",
    client: "Concierge healthcare · Chicago",
    niche: "Concierge Healthcare",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Concierge medicine flagship with patient booking funnel.",
    liveUrl: "https://skynetlabs-medical-demo.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynetlabs-clinic",
    title: "CQC Compliance & Safeguarding Consultancy",
    client: "UK healthcare compliance",
    niche: "Healthcare Compliance (UK)",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "CQC consultancy site. Compliance-grade copy + lead capture.",
    liveUrl: "https://skynetlabs-clinic.vercel.app",
    category: "flagship",
  },
  {
    slug: "skynetlabs-ariapura-cinema",
    title: "Ariapura · Cinema Concept",
    client: "Boutique cinema/villa concept",
    niche: "Hospitality / Cinema",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome:
      "Concept demo for villa-cinema hybrid. Immersive editorial layout.",
    liveUrl: "https://skynetlabs-ariapura-cinema.vercel.app",
    category: "flagship",
  },
  // Niche demos
  {
    slug: "skynetlabs-accountant-demo",
    title: "Sterling & Co CPA · La Jolla Fractional CFO",
    client: "CPA niche demo · CA CPA #134892",
    niche: "Accounting / CFO",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "La Jolla CPA + fractional CFO with trust-stacked credentials.",
    liveUrl: "https://skynetlabs-accountant-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-autorepair-demo",
    title: "Wrench & Co · Portland Euro + Japanese Repair",
    client: "Auto repair niche demo · ASE Master",
    niche: "Auto Repair",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Portland Euro/JDM specialist with 3-yr warranty positioning.",
    liveUrl: "https://skynetlabs-autorepair-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-cleaning-demo",
    title: "Sparkline Residential · Seminole County FL",
    client: "Residential cleaning niche demo",
    niche: "Residential Cleaning",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Trusted-neighbor cleaning service with booking funnel.",
    liveUrl: "https://skynetlabs-cleaning-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-coolcar-demo",
    title: "Cool Car · 3-Variant Spec Demo (DE)",
    client: "German automotive · variant pitch",
    niche: "Automotive / Configurator",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome:
      "Editorial / Cinematic / Brutalist Swiss — 3 directions on one deploy.",
    liveUrl: "https://skynetlabs-coolcar-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-gym-demo",
    title: "Boutique Strength Studio · West Hollywood",
    client: "Gym niche demo · 12-member cohorts",
    niche: "Boutique Fitness",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "WeHo strength studio with cohort-based membership funnel.",
    liveUrl: "https://skynetlabs-gym-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-landscaping-demo",
    title: "Verdant Acre · Seattle Landscape Architecture",
    client: "Landscape architect demo · BSLA",
    niche: "Landscape Architecture",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Editorial portfolio + consultation funnel for high-end design.",
    liveUrl: "https://skynetlabs-landscaping-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-logistics-demo",
    title: "Pacific Lane Logistics · POLB Drayage + Customs",
    client: "Logistics niche demo · SCAC PLLO",
    niche: "Logistics / Drayage",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Port of Long Beach drayage + customs broker positioning.",
    liveUrl: "https://skynetlabs-logistics-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-moving-demo",
    title: "Northbound Moving Co · Boston Binding Quotes",
    client: "Moving niche demo · USDOT 2841902",
    niche: "Moving / Relocation",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Boston mover with binding-quote trust positioning.",
    liveUrl: "https://skynetlabs-moving-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-pestcontrol-demo",
    title: "Sentinel Pest Solutions · Phoenix Scorpion-First",
    client: "Pest control niche demo · entomologist-led",
    niche: "Pest Control",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Phoenix scorpion-specialist with credential stack.",
    liveUrl: "https://skynetlabs-pestcontrol-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-photography-demo",
    title: "Cassidy Renfield Studio · Brooklyn Wedding + Portrait",
    client: "Editorial photographer niche demo",
    niche: "Photography",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Editorial wedding + portrait photographer portfolio + booking.",
    liveUrl: "https://skynetlabs-photography-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-plumbing-demo",
    title: "Cardinal Plumbing · Denver Slab Leak Specialists",
    client: "Plumbing niche demo · Denver CO",
    niche: "Plumbing",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Denver plumber w/ slab leak + tankless specialization funnel.",
    liveUrl: "https://skynetlabs-plumbing-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-roofing-demo",
    title: "Summit Roofing · Charlotte GAF Master Elite",
    client: "Roofing niche demo · NC storm specialists",
    niche: "Roofing",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Charlotte GAF Master Elite roofer w/ storm response positioning.",
    liveUrl: "https://skynetlabs-roofing-demo.vercel.app",
    category: "demo",
  },

  // ── New client work (2026-06 → 2026-07) ──
  {
    slug: "adibug-pest-control",
    title: "Adibug Pest Control · Hampton Roads VA",
    client: "Jerry Omoruyi · Hampton Roads, Virginia",
    niche: "Pest Control",
    stack: ["Next.js 16", "Tailwind", "GHL"],
    outcome:
      "34-page local pest-control build + automation playbook. Shipped in days.",
    liveUrl: "https://adibug-pest-control.vercel.app",
    category: "client",
  },
  {
    slug: "canine-grooming-demo",
    title: "Laurel & Hound · Austin Dog Grooming",
    client: "Boutique grooming + vet-education · Austin TX",
    niche: "Pet Grooming",
    stack: ["Next.js", "Tailwind", "Booking"],
    outcome:
      "Boutique grooming + vet-education site with a booking-ready funnel.",
    liveUrl: "https://canine-grooming-demo.vercel.app",
    category: "client",
  },
  {
    slug: "lumen-studio-neon",
    title: "Lumen Studio · Content That Earns",
    client: "Content-creation studio",
    niche: "Content / Media",
    stack: ["Next.js 16", "Tailwind", "API routes"],
    outcome: "Dark editorial-luxe content studio with a live contact API.",
    liveUrl: "https://lumen-studio-neon.vercel.app",
    category: "client",
  },
  {
    slug: "denver-nether-commodities",
    title: "Denver Nether Commodities",
    client: "Justin V. · global commodities",
    niche: "Commodities / Finance",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Institutional-tone commodities trading frontend.",
    liveUrl: "https://denver-nether-commodities.vercel.app",
    category: "client",
  },
  {
    slug: "refinado-estudio",
    title: "Refinado Estudio · Identidad Visual",
    client: "Diseñadora premium · Santiago, Chile",
    niche: "Design / Branding (ES)",
    stack: ["Next.js", "Tailwind", "ES SEO"],
    outcome: "Spanish premium brand-identity studio for a Chilean designer.",
    liveUrl: "https://refinado-estudio.vercel.app",
    category: "client",
  },
  {
    slug: "skynetlabs-aesthetic-demo",
    title: "Aesthetic Clinic · 3 Concepts",
    client: "Aesthetic clinic prospect · Germany",
    niche: "MedSpa / Aesthetics",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome:
      "Three working landing concepts on one deploy for a German clinic.",
    liveUrl: "https://skynetlabs-aesthetic-demo.vercel.app",
    category: "client",
  },
  {
    slug: "skynetlabs-wellness-demo",
    title: "Wellness DNA · 5 Premium Landers",
    client: "Functional-wellness brand",
    niche: "Wellness / DNA",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Five premium landing directions for a functional-wellness brand.",
    liveUrl: "https://skynetlabs-wellness-demo.vercel.app",
    category: "client",
  },
  {
    slug: "gutreno-prelaunch",
    title: "GutReno · Gut, Finally Understood",
    client: "Gut-health prelaunch",
    niche: "Health / Prelaunch",
    stack: ["Next.js", "Tailwind", "Waitlist"],
    outcome: "Prelaunch waitlist funnel for a gut-health brand.",
    liveUrl: "https://gutreno-prelaunch.vercel.app",
    category: "client",
  },
  {
    slug: "next-level-retreat-designs",
    title: "Next Level Retreat · Design Directions",
    client: "Corey Boutwell · retreat brand",
    niche: "Retreat / Wellness",
    stack: ["React", "Vite", "Vercel"],
    outcome: "Six landing directions for a high-ticket retreat brand.",
    liveUrl: "https://next-level-retreat-designs.vercel.app",
    category: "client",
  },
  {
    slug: "rsf-redesign",
    title: "Rockaway's Soul Food Kitchen",
    client: "Soul-food restaurant · online order",
    niche: "Restaurant / Ordering",
    stack: ["Next.js", "Tailwind", "Ordering"],
    outcome: "Soul-food restaurant redesign with an online-order funnel.",
    liveUrl: "https://rsf-redesign.vercel.app",
    category: "client",
  },
  {
    slug: "ksa-shoes-store-five",
    title: "Al-Zaytoun · Premium Arabic Footwear",
    client: "Arabic footwear e-commerce",
    niche: "E-commerce / Retail",
    stack: ["Next.js", "Tailwind", "RTL"],
    outcome: "RTL Arabic premium-footwear storefront.",
    liveUrl: "https://ksa-shoes-store-five.vercel.app",
    category: "client",
  },
  {
    slug: "skynetlabs-inspire-health-pt-demo",
    title: "Inspire Health PT · The Vault",
    client: "Private PT studio · Miami FL",
    niche: "Physical Therapy",
    stack: ["Next.js", "Tailwind", "Intake"],
    outcome: "Private cash-pay PT studio with an intake funnel.",
    liveUrl: "https://skynetlabs-inspire-health-pt-demo.vercel.app",
    category: "client",
  },

  // ── Portals / apps ──
  {
    slug: "hepatologia-course",
    title: "Programa Cirrosis · Patient Portal",
    client: "Patient-education LMS (ES)",
    niche: "LMS / Healthcare (ES)",
    stack: ["Next.js", "Portal", "ES"],
    outcome: "Spanish patient-education course portal with enrollment.",
    liveUrl: "https://hepatologia-course.vercel.app",
    category: "portal",
  },
  {
    slug: "healthcare-workflow-demo",
    title: "Physician Group Workflow AI",
    client: "Healthcare ops automation",
    niche: "Healthcare / Automation",
    stack: ["Next.js", "n8n", "GHL"],
    outcome: "AI workflow-automation portal concept for physician groups.",
    liveUrl: "https://healthcare-workflow-demo.vercel.app",
    category: "portal",
  },

  // ── New niche demos ──
  {
    slug: "skynetlabs-pizza-demo",
    title: "Forno Vero · Wood-Fired Neapolitan",
    client: "Pizzeria template · cinematic V2",
    niche: "Restaurant",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Cinematic wood-fired pizzeria template.",
    liveUrl: "https://skynetlabs-pizza-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "car-dealer-demo-2026-05-12",
    title: "Atelier Auto Salon",
    client: "Auto dealership demo",
    niche: "Automotive / Dealer",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Curated-inventory dealership with an enquiry funnel.",
    liveUrl: "https://car-dealer-demo-2026-05-12.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-healthcare-demo",
    title: "SkynetLabs Health · Care Navigation",
    client: "Healthcare AI demo",
    niche: "Healthcare / AI",
    stack: ["Next.js", "Tailwind", "AI"],
    outcome: "AI care-navigation concept site.",
    liveUrl: "https://skynetlabs-healthcare-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-medspa-landing",
    title: "Med-Spa · 3 Design Directions",
    client: "MedSpa landing demo",
    niche: "MedSpa",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Three med-spa landing directions on one deploy.",
    liveUrl: "https://skynetlabs-medspa-landing.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-salon-suite-demo",
    title: "Atelier Suites · Salon Suite Rental",
    client: "Salon-suite rental demo",
    niche: "Beauty / Rental",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Salon-suite rental funnel for independent stylists.",
    liveUrl: "https://skynetlabs-salon-suite-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-logo-studio",
    title: "Marque · Logo & Brand Studio",
    client: "Logo / brand studio demo",
    niche: "Design / Branding",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Logo + brand-identity studio landing.",
    liveUrl: "https://skynetlabs-logo-studio.vercel.app",
    category: "demo",
  },
  {
    slug: "photo-portfolio-demos",
    title: "Photography Portfolio · 3 Directions",
    client: "Photographer portfolio demo",
    niche: "Photography",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Three photographer-portfolio directions on one deploy.",
    liveUrl: "https://photo-portfolio-demos.vercel.app",
    category: "demo",
  },
  {
    slug: "wrestling-event-landing",
    title: "Iron Fist Wrestling · Night of Champions",
    client: "Live-event landing demo",
    niche: "Events / Ticketing",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "High-energy live-event ticket landing.",
    liveUrl: "https://wrestling-event-landing.vercel.app",
    category: "demo",
  },
  {
    slug: "wellness-funnel-demo",
    title: "Phoenix Wellness Funnel",
    client: "Wellness funnel demo",
    niche: "Wellness / Funnel",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Conversion-first wellness lead funnel.",
    liveUrl: "https://wellness-funnel-demo.vercel.app",
    category: "demo",
  },
  {
    slug: "skynetlabs-hvac-demo",
    title: "Premier HVAC of Austin",
    client: "HVAC niche demo · Austin TX",
    niche: "HVAC",
    stack: ["Next.js", "Tailwind", "Vercel"],
    outcome: "Austin HVAC service with emergency-call positioning.",
    liveUrl: "https://skynetlabs-hvac-demo.vercel.app",
    category: "demo",
  },
];

export type WorkNarrative = {
  intro: string;
  showcase: string;
  designNotes: string[];
  whoFor: string;
  seoDescription: string;
};

/** Filled by the work-showcase-copy workflow. Missing slugs fall back to `outcome`. */
export const WORK_NARRATIVE: Record<string, WorkNarrative> = {
  "kitts-recovery-services": {
    "intro": "Kitts Recovery Services is a live one-page site for Majesta \"Jessie\" Kitts, a Rhode Island peer support specialist (EdD, MPH, CPRS) who blends lived recovery experience with clinical training. The build gives a solo, telehealth-based practice a calm, credible home: it introduces the founder, lays out session types, and routes people to book, all without leaning on hype or invented proof.",
    "showcase": "The build demonstrates a full conversion funnel on an editorial design system: a \"You don't have to carry the weight alone\" hero, an About Jessie story section, tiered services (Discovery call, Standard 1:1, Flex-rate, family and group support, plus a crisis lifeline note), a support-group interest form, and an FAQ that clears up peer support versus therapy and insurance status. Every CTA feeds a HeyPeers secure-video booking flow. The testimonial block is deliberately honest, stating real peer words will appear once earned rather than fabricating them.",
    "designNotes": [
      "Warm, grounded palette (navy, bone, cream, ochre, moss) with a compass and 'resilience is a journey' motif that fits recovery without feeling clinical.",
      "Editorial serif typography (Fraunces display, Cormorant body accents) paired with Inter for UI, plus a credential strip (EdD MPH CPRS) that signals authority.",
      "Booking funnel wired to HeyPeers with tiered session CTAs and flex-rate framing so cost is not the barrier to starting.",
      "Truth-first UX: an empty-by-design testimonials section and a transparent FAQ on insurance-in-process and private-pay, matching the no-fake-claims rule."
    ],
    "whoFor": "Solo wellness, therapy, and peer-recovery practitioners who need a credible, conversion-ready site that books calls without exaggerated claims.",
    "seoDescription": "A live one-page site for a Rhode Island peer recovery specialist: editorial design, tiered peer-support services, HeyPeers booking funnel, and an honest, no-fake-testimonials build."
  },
  "skynetlabs-ariapura-relaunch": {
    "intro": "Ariapura is a relaunch build for an air conditioning sanitization company in the Bologna area, done fully in Italian. It is a single-page conversion site aimed at facility managers and business owners who need HVAC hygiene work, structured around one clear offer: booking a free endoscopic video check-up of their system.",
    "showcase": "The build shows a complete Italian-language funnel from problem to booking. A biofilm-danger hero sets the stakes, then three service cards (sanitization, maintenance, electrostatic filters) lead into six customer segments, a four-phase method (diagnosi, accordo, esecuzione, controllo), an about section, testimonials, and an FAQ. It closes on a lead form capturing name, company, business email, phone, and notes, with WhatsApp as a secondary path. Trust badges (FGAS, ACCREDIA), a blog preview, and full contact and hours details round out the page.",
    "designNotes": [
      "Single-page funnel engineered around one offer: the free endoscopic video check-up, repeated as the primary CTA",
      "Written and structured entirely in Italian, including nav (Servizi, Metodo, Chi siamo, FAQ, Blog) and form labels",
      "Proof-led framing uses endoscopic and before/after visuals to make an invisible problem (biofilm) tangible",
      "Segment section addresses six distinct buyer types, and the footer carries full NAP details, hours, and social links"
    ],
    "whoFor": "An established Italian HVAC or sanitization firm that wants a proof-driven, single-offer lead site in its own language.",
    "seoDescription": "A single-page Italian relaunch for an HVAC sanitization firm in Bologna: biofilm-focused hero, service cards, a four-phase method, FAQ, and a free video check-up lead form."
  },
  "skynetjoe": {
    "intro": "SkynetLabs Agency HQ is the in-house site for Waseem Nasir, a solo automation dev working out of Bali. It sells one clear idea: set up smart tools that reply to new leads fast, follow up automatically, and take over repeat admin work. Built for small service businesses and founders who lose jobs while they're heads-down on the work.",
    "showcase": "The build demonstrates a tight single-funnel structure that routes every visitor to one action: booking a free 30-minute audit. It opens with a plain-language pain hook (\"Stop losing customers while you're busy\"), names three concrete failure points (leads ghosting, pipeline scattered across WhatsApp, slow content), then lays out five service pillars: n8n automation, GoHighLevel CRM, AI chatbots, WordPress SEO, and vibe-coded sites. Navigation splits by service, industry, work, tools, pricing, and company. Case studies and a repeated booking CTA carry the close. No contact form, no newsletter, everything points at the call.",
    "designNotes": [
      "Conversion-first single funnel: every section resolves to one CTA, 'Book a free 30-min check-up', with no competing form or newsletter to leak intent",
      "Founder-led positioning: built by Waseem in Bali, GMT+8 and turnaround noted openly, so the buyer knows exactly who they're hiring",
      "Problem-then-proof narrative order: pain hook, three named failure points, five service pillars, then case studies, then the booking close",
      "Segmented nav (Services, By Industry, Work, Tools, Pricing, Company) lets different buyer types self-select a path into the same funnel"
    ],
    "whoFor": "A small service-business owner or solo founder who keeps losing leads because they're too busy delivering to reply and follow up.",
    "seoDescription": "SkynetLabs Agency HQ: the in-house site for a Bali-based automation dev. n8n, GoHighLevel CRM, AI chatbots, and SEO, funneled to one free audit call."
  },
  "skynetlabs-dental-flagship": {
    "intro": "Grand Mercer Dental (Atelier No. 1) is a bespoke flagship demo for luxury cosmetic dentistry, built by SkynetLabs. It reframes a SoHo veneer practice as a porcelain atelier rather than a clinic, aimed at high-end aesthetic dental studios and concierge medical brands that need a site matching a five-figure treatment. This is a spec build, made to show what that tier of web craft looks like.",
    "showcase": "The build demonstrates a full editorial design system carried across eleven numbered sections: hero, atelier philosophy, a six-step process from Consult to Review, a published three-tier investment table, a three-person \"Bench\" team, a before/wax-up/after gallery, testimonials, location, journal essays, an eight-question FAQ, and contact. The funnel is deliberate: it opens on process and price transparency, then routes to a multi-step \"begin with a note\" inquiry rather than a hard booking. A neutral cream-and-ink palette, serif headline accents, and a heavy compliance footer sell the restraint.",
    "designNotes": [
      "Luxury-minimalist system: neutral cream/ink/wood palette, serif headline accents over sans nav, numbered section hierarchy, and print-monograph whitespace.",
      "Objection-first funnel: a published three-tier investment table (Refinement, Smile Design, Full Atelier) plus CareCredit/Cherry financing handles price before the ask.",
      "Soft-conversion CTA: a four-step 'begin with a note, not a booking form' inquiry replaces a standard booking widget, with phone and concierge email fallbacks.",
      "Trust scaffolding baked in: HIPAA intake note, license and ADA-specialty disclosure, unretouched-photo and AI-preview disclaimers, WCAG 2.1 AA commitment."
    ],
    "whoFor": "High-end cosmetic dental studios and concierge medical practices selling five-figure bespoke treatment who need a site as considered as the work.",
    "seoDescription": "A bespoke flagship demo for a luxury SoHo cosmetic dentistry atelier: editorial design system, six-step process, published pricing tiers, and a HIPAA-aware inquiry funnel."
  },
  "skynet-flagship-realestate": {
    "intro": "A bespoke flagship demo for an ultra-luxury Los Angeles real estate practice, built around a single fictional broker persona at a Beverly Hills brokerage. It shows how a trophy-estate agent working Malibu, Bel Air and Holmby Hills would present off-market inventory to qualified buyers. The build is a proof-of-craft spec site, not a live client engagement, aimed at high-end agents who sell privacy, not volume.",
    "showcase": "The site demonstrates a full luxury funnel: a by-appointment hero, a curated grid of featured estate listings with location, price and bed/bath/sqft specs, a pricing-tier positioning section, a broker philosophy and credentials block, a press-quote strip, and a gated \"vault\" for off-market mandates. Three CTAs run in parallel — request a private showing, view the portfolio, and request the off-market ledger PDF. Compliance is treated as a feature, with WCAG, CCPA, and Fair Housing statements plus a real office address in the footer.",
    "designNotes": [
      "Restraint-first luxury system: heavy white space, minimal palette, large property photography and a clear type hierarchy that reads as high-end rather than busy.",
      "Scarcity funnel design — gated 'vault' ledger and by-appointment framing convert access itself into the primary CTA instead of a generic contact form.",
      "Listing cards carry full trophy-estate detail (location, price, beds/baths, square footage, acreage) so the demo reads like real inventory.",
      "Trust and compliance baked into the footer: ADA/WCAG 2.1 AA, CCPA privacy, Fair Housing, and Equal Housing Opportunity disclosures."
    ],
    "whoFor": "A top-tier luxury real estate agent or boutique brokerage that sells discretion and off-market access and needs a site that signals eight-figure credibility.",
    "seoDescription": "A bespoke luxury real estate flagship demo: off-market vault funnel, trophy-estate listing grid, broker credibility system, and full accessibility and Fair Housing compliance."
  },
  "auberlin-estate-flagship": {
    "intro": "A bespoke flagship demo for a Hudson Valley wedding venue, Auberlin Estate. It is a single long-form landing page built to sell a high-ticket, low-volume venue to engaged couples and their planners. The whole thing leans on radical transparency: live availability, floor-level pricing, named spaces, and a real inquiry funnel, instead of the usual \"request a brochure\" wall.",
    "showcase": "The build demonstrates an editorial nine-section funnel that moves from hero to a four-month availability calendar, three named spaces with capacities and specs, a three-era estate timeline, itemized pricing with add-ons quoted at cost, a curated partner list, testimonials, a director bio, and an eight-field qualifying inquiry form with event-type, budget-band, and site-visit dropdowns. It shows how a venue can lead with pricing and open dates rather than hide them, and closes with a compliance-heavy footer (license number, insurance, house rules) that builds trust.",
    "designNotes": [
      "Marcellus display serif paired with Inter for body sets a restrained, estate feel; numbered section markers (01-09) give it an archival editorial rhythm.",
      "Warm parchment-and-bronze palette (cream #F5EFE0, bronze #A8895E, amber #E8B86B, near-black ink #1C1A17) instead of the usual soft-focus wedding pastels.",
      "Built on Next.js and deployed to Vercel; layout uses SVG floor plans and a calendar legend rather than stock photography.",
      "Funnel is engineered to qualify: budget-band and event-type dropdowns pre-sort leads, and a stated 48-hour reply sets expectations at the form."
    ],
    "whoFor": "A premium wedding or event venue that wants a high-end, transparency-first site that qualifies leads before the first call.",
    "seoDescription": "A bespoke flagship demo site for a Hudson Valley wedding venue: editorial Next.js build with live availability, transparent pricing, named spaces, and a qualifying inquiry funnel."
  },
  "restaurant-mu-two": {
    "intro": "Ostería Marquez is a bespoke flagship demo for a modern Mediterranean fine-dining room in Chicago's Ukrainian Village. It shows how SkynetLabs builds a single-location restaurant site: a reservation-first homepage, a full printed-style menu with wine pairings, a chef's-voice audio section, and a private dining inquiry flow. Built as a proof-of-craft for independent restaurateurs who want editorial design without a template look.",
    "showcase": "The build demonstrates a restaurant funnel organized around booking. The homepage opens on a \"Tonight\" board of daily specials, each with a price and wine note, then drops straight into a reservation widget with date, time-slot, and party-size selectors plus a stated booking policy. Below that sits the full Carta across Antipasti, Primi, Secondi, and Postres, a Chef Lucia audio section, a sherry-led cellar list, and a private dining panel with prix-fixe, pairing, and buyout options. Hours, location, press layout, allergen and liquor notices, and contact details close it out.",
    "designNotes": [
      "Reservation-first architecture: the booking widget sits high on the page, and the 'Tonight' specials use a reserve-to-claim framing so the whole layout points at securing a table.",
      "Editorial typography and numbered sections (01-05) with generous whitespace and food photography give it a magazine feel rather than a stock restaurant template.",
      "Menu is treated as content, not a PDF dump: four named courses with dish descriptions, prices, and wine pairings, plus a separate sherry-focused cellar list.",
      "Trust and compliance handled properly: FDA raw-food and Illinois 21+ notices, allergen statement, service-charge disclosure, and a chef's-voice audio section add credibility."
    ],
    "whoFor": "An independent fine-dining or chef-driven restaurant owner who wants a bespoke, reservation-led site that reads like an editorial spread, not a template.",
    "seoDescription": "Ostería Marquez: a bespoke fine-dining restaurant website demo with a reservation-first homepage, full Mediterranean menu, wine pairings, and private dining flow."
  },
  "skynetlabs-law-demo": {
    "intro": "Harrington Lex LLP is a spec demo for a Chicago trial-litigation boutique, built to show how a high-stakes law firm can present itself online without looking like a template. It is a partner-led positioning site aimed at general counsel, PE principals, and founders facing commercial disputes, white-collar exposure, or trade-secret matters. Everything on the page is demonstration content built to model the funnel.",
    "showcase": "The build demonstrates a full litigation-firm funnel on one Next.js page: a headline hero with a credibility stat band, a press-logo row, six linked practice areas (commercial litigation, white-collar, trade-secret, securities, class-action defense, appellate), a four-step engagement process from confidential consult to trial-ready posture, a featured case study, a verdicts-and-resolutions ledger, a three-quote testimonial block, a recent-work gallery, an eight-question FAQ accordion, and a service-area list. Practice areas drill into individual /practice-areas/* pages. Restraint-driven design carries the trust signal.",
    "designNotes": [
      "Restrained editorial system: cream/white grounds, near-black ink text, generous whitespace and numbered section labels — the credibility comes from hierarchy and spacing, not color blocking</br>",
      "Next.js stack with server-side image optimization and lazy loading (visible /_next/image pipeline), sticky nav with a click-to-call phone CTA in the header",
      "Conversion architecture repeats one ask — 'Confidential Case Evaluation' / 'Confidential consult' — across hero, sections, and footer",
      "Multi-page depth: dedicated practice-area routes plus footer legal scaffolding (responsible-attorney line, bar admissions, disclaimers) that reads like a real firm site"
    ],
    "whoFor": "A litigation boutique or trial firm that wants a premium, partner-led site that signals authority through restraint rather than stock-photo gloss.",
    "seoDescription": "A spec demo site for a Chicago trial-litigation boutique: Next.js build with practice-area pages, a verdict ledger, engagement-process funnel, FAQ, and consult CTAs."
  },
  "skynetlabs-medical-demo": {
    "intro": "Riverside Internal Medicine is a spec demo for a concierge primary-care practice in Chicago, built to show how a private, membership-based clinic can be positioned online. It serves boutique internal-medicine and direct-care physicians who run a limited patient panel and want a site that reads as private, credentialed, and calm rather than high-volume. Every name and detail is clearly marked fictional.",
    "showcase": "The build demonstrates a full concierge funnel: a restrained editorial hero (\"Medicine, returned to its private form\"), a credential strip, six named services, a four-step \"how it works\" onboarding path from meet-and-greet to continuous care, a case study and testimonial block, an accordion FAQ covering fees, insurance, HIPAA and after-hours access, and a lead magnet offering a Concierge Primary Care Decision Framework. It closes with a Chicago service-area map of neighborhoods and a compliance-forward footer carrying provider NPI, ABIM certification, ACA Section 1557 language, and a WCAG 2.1 AA target.",
    "designNotes": [
      "Muted 'old-money' palette: deep ink, forest green, oxblood, gold and warm cream, paired with a serif display face over Inter body and a mono accent — an editorial, private-practice feel over standard clinical blue.",
      "Conversion is structured around low-pressure entry: a complimentary meet-and-greet as the first step, plus repeated phone number and 'Become a patient' CTAs rather than a hard sell.",
      "Compliance is treated as a design element, not an afterthought — HIPAA notice, non-discrimination, NPI and accessibility target all sit in the footer.",
      "Built on Next.js with image optimization, responsive desktop/mobile nav, and an accordion FAQ; deployed on Vercel."
    ],
    "whoFor": "A boutique concierge or direct-primary-care physician running a limited panel who needs a private, credential-led web presence and patient-onboarding funnel.",
    "seoDescription": "A concierge primary-care website demo for Riverside Internal Medicine: private-practice design system, membership funnel, service pages, onboarding steps, and HIPAA-aware footer."
  },
  "skynetlabs-clinic": {
    "intro": "A single-page consultancy site for a UK CQC compliance and safeguarding practice, positioned as the work of a registered clinical lead nurse. It targets care homes, nursing agencies, and domiciliary providers preparing for inspection, and turns a regulated, credential-heavy service into a clear booking funnel built around one action: booking a compliance call.",
    "showcase": "The build demonstrates a full funnel on one page: a direct hero (\"Your CQC inspection is coming. Let's make sure you pass it.\"), a six-card services grid covering KLOE gap analysis, safeguarding audits, care planning, incident reporting, policy writing, and documentation review, a credential-led About block (NMC, ICO, DBS, UK-wide coverage), a four-step Discover-Audit-Document-Support process, a testimonials slot, an expandable FAQ handling cost and independence objections, and a full contact form with a service dropdown and privacy consent. Anchor navigation ties every section back to the call.",
    "designNotes": [
      "Clinical, credential-first positioning: trust badges (NMC Registered, ICO Registered, DBS Enhanced) repeated in hero, About, and footer to carry a regulated-industry service",
      "One-page anchored layout (Services, About, Process, Testimonials, FAQ, Contact) with a persistent Book a Call CTA as the single conversion path",
      "Objection-handling FAQ built around real buyer worries in this niche: independence from CQC, confidentiality, remote vs on-site, and no lock-in contracts",
      "Structured enquiry form with a service-type dropdown mapped to the six offerings plus a privacy checkbox, framing intake the way a compliance practice would"
    ],
    "whoFor": "A solo UK healthcare or compliance consultant who needs a credible, conversion-focused one-page site that turns credentials into booked calls.",
    "seoDescription": "A one-page demo site for a UK CQC compliance and safeguarding consultancy: services grid, credential-led about, four-step process, FAQ, and a booking-focused enquiry form."
  },
  "skynetlabs-ariapura-cinema": {
    "intro": "Ariapura is a spec demo for an Italian aeraulic sanitation firm (HVAC duct cleaning) based near Bologna. It is the cinematic variant of a category flagship, written end to end in formal Italian using the deferential \"Lei\" register. The build serves a technical, compliance-driven trade that usually sells with clip-art and PDFs, and shows what a documentary-grade site for that niche looks like.",
    "showcase": "The page runs a full trade funnel: an invisible-air hero hook, a four-step method (Ispezione, Bonifica meccanica, Sanificazione, Verifica), and six sector verticals (cliniche, uffici, HoReCa, scuole, industria, residenziale). It grounds credibility in real Italian regulation (D.Lgs. 81/2008, Accordo Stato-Regioni, UNI norms, FGAS, ACCREDIA), an indicative price list with a free check-up tier, anonymized case studies under NDA, a standardized FAQ, a heritage timeline, and a sector-dropdown booking form wired to a Bologna phone, email, and address. Copy is technical but narrative.",
    "designNotes": [
      "Fully Italian formal-register copy, not translated filler — every section reads like a native trade brochure with the 'Lei respira ciò che non vede' throughline",
      "Compliance-led trust stack: cites specific Italian laws, UNI norms, and FGAS/ACCREDIA badges instead of generic quality claims",
      "Transparent 'listino indicativo' pricing table with a free inspection tier de-risks the first click before any quote",
      "Sector-aware conversion path: six-vertical structure feeds a single booking form with a sector dropdown, framing the free sopralluogo as the CTA"
    ],
    "whoFor": "HVAC, duct-cleaning, and air-sanitation operators in regulated European markets who need a compliance-credible, conversion-focused site instead of a brochure template.",
    "seoDescription": "Ariapura is a SkynetLabs spec demo for an Italian aeraulic sanitation firm: full Italian trade funnel, four-step method, six sectors, compliance stack, and a free-inspection booking form."
  },
  "skynetlabs-accountant-demo": {
    "intro": "Sterling and Co CPA is a spec demo for a boutique La Jolla accounting firm built by SkynetLabs to show how a fractional CFO and tax-strategy practice can present itself online. It targets high-income professionals: physicians, dental practice owners, tech founders, and real-estate investors. The build is a category showcase, not a live client, designed to prove the design and funnel craft.",
    "showcase": "The build demonstrates a full trust-led funnel for a professional services firm. It opens with a clear positioning hero and a \"book a 30-min tax diagnostic\" call to action, then lays out six service categories, a four-step \"how it works\" engagement path, a case-study block, client quote cards, and an eight-question FAQ answering pricing and scope. A gated lead magnet, \"The High-Earner Tax Strategy Decision Framework,\" anchors capture. The footer carries credentials, service-area cities, and a compliance and license-verification zone.",
    "designNotes": [
      "Clean, minimal CPA aesthetic: light backgrounds, sans-serif type, and a restrained blue accent reserved for CTAs so the diagnostic-booking action stays the focal point.",
      "Funnel is built around a single low-friction offer (the free 30-min diagnostic) repeated in the nav phone link, hero, and process, with a gated framework PDF as the secondary capture.",
      "Trust scaffolding is baked in: CPA license number, AICPA and CalCPA membership, SOC 2 reference, and a board-of-accountancy verification link in the footer.",
      "Sections are sequenced as a persuasion path — position, services, process, proof, objections (FAQ), then lead magnet — a reusable template for high-consideration professional services."
    ],
    "whoFor": "A boutique CPA, fractional CFO, or tax-advisory firm that wants a credibility-first site and a clear diagnostic-call funnel.",
    "seoDescription": "A SkynetLabs spec demo for a boutique CPA and fractional CFO firm: trust-led design, six-service layout, diagnostic-call funnel, gated tax framework, and compliance footer."
  },
  "skynetlabs-autorepair-demo": {
    "intro": "Wrench & Co Auto is a category spec demo for an independent European and Japanese repair shop in Portland. It shows how SkynetLabs would build a conversion site for an owner-operated garage: the trust cues, the posted-price transparency, and the drop-off booking flow that a local repair customer actually checks before calling.",
    "showcase": "The build demonstrates a full local-service funnel on one page. A hero states the positioning and offers two paths, call or book. From there it runs a services grid, a specialty-makes strip (BMW, Audi, VW, Mercedes, Toyota, Honda, Subaru), a transparent estimate table, an owner-operator story, a named technician team, testimonials, a collapsible FAQ, and a service-picker booking form. A sticky nav, repeated phone CTA, trust badges, hours, address, and a served-cities list close the loop for local search intent.",
    "designNotes": [
      "Clean monochrome layout with a single accent color reserved for CTAs, so the phone number and Book buttons stay the loudest thing on every scroll.",
      "Trust engineered into the structure: named ASE technicians, brand-tool certifications (ISTA, XENTRY, ODIS), warranty and badge cues placed where a nervous car owner looks.",
      "Posted price table removes the biggest local-repair objection up front instead of hiding estimates behind a form.",
      "Funnel ends in a service-dropdown booking form plus full NAP details and a served-cities block for local SEO."
    ],
    "whoFor": "An owner-operated auto repair shop that wants a credibility-first site with transparent pricing and an easy drop-off booking flow.",
    "seoDescription": "A Portland auto repair spec demo by SkynetLabs: services grid, specialty-makes, transparent price table, owner story, ASE tech team, FAQ, and drop-off booking."
  },
  "skynetlabs-cleaning-demo": {
    "intro": "A category spec demo for a residential cleaning brand, \"Sparkline Residential,\" positioned for Seminole County, Florida. It shows how a local home-cleaning service would present online: a quote-first hero, six named service tiers, a three-step booking flow, a trust and reviews block, an FAQ, and an instant-quote form. Built by SkynetLabs as a niche template a cleaning operator could brand and ship.",
    "showcase": "The build demonstrates a complete local-service funnel rather than a flat brochure. It ships in three interchangeable visual variants (Editorial, Cinematic, Minimal) over one content spine, so a buyer can pick a look without re-architecting. The page routes visitors from a plain-spoken hero (\"A home that smells like Sunday morning\") into six service cards, a Tell/Quote/Exhale process, area coverage for eight named towns, a reviews and licensing trust row, a collapsible FAQ, and a structured quote form that captures service type, beds, baths, square footage, and ZIP.",
    "designNotes": [
      "Ships three swappable design variants (Editorial, Cinematic, Minimal) over one shared content structure, so the look changes without touching the funnel.",
      "Quote-first funnel: dual hero CTAs (instant quote plus click-to-call) feed a qualifying form that captures service type, bedrooms, bathrooms, square footage, and ZIP.",
      "Local-intent SEO framing baked in — named service area towns (Lake Mary, Sanford, Oviedo, Winter Springs and more) and six clearly separated service tiers.",
      "Trust scaffolding is structured as placeholder demo content (license line, insurance, guarantee, reviews block) ready to swap in a real operator's verified details."
    ],
    "whoFor": "A residential or home-services cleaning operator who wants a conversion-focused, locally-targeted site with a built-in quote funnel.",
    "seoDescription": "A SkynetLabs residential cleaning website demo for Seminole County FL: quote-first funnel, six service tiers, local service-area SEO, trust blocks, and three design variants."
  },
  "skynetlabs-coolcar-demo": {
    "intro": "Cool Car is a three-variant spec demo for an automotive retrofit and coding shop, built as a \"pick one\" pitch. The landing page hands the buyer three fully designed directions for the same business, then routes to live V1, V2, and V3 pages. It is aimed at a Swiss CarPlay and infotainment installer who wants a configurator-led site and needs to choose a visual direction before final polish.",
    "showcase": "The build demonstrates a decision-first pitch format: one selector page presenting three complete design systems, each on its own route. V1 goes editorial with Fraunces serif and a Swiss vermilion accent, V2 goes cinematic on a dark obsidian and lime palette, V3 goes brutalist Swiss with oversized Inter type. All three share the same funnel spine: a step-by-step vehicle configurator (brand, model, year, infotainment), a CHF-priced service table, workshop trust section, four-step process, project references, and an FAQ with a lead-magnet PDF and contact form.",
    "designNotes": [
      "One landing page ships three distinct design systems side by side, so the client picks a direction instead of approving a single guess",
      "Configurator funnel is the shared backbone: brand to model to year to infotainment, with live CHF pricing and a sub-30-second, no-required-fields promise",
      "German-language UI with Swiss-market specifics (CHF pricing, VAT-included, TWINT and PostFinance payment marks, numbered section notation)",
      "Each variant carries its own type and color language while keeping the same eight-section spec and contact structure"
    ],
    "whoFor": "An automotive retrofit or car-audio installer who wants a configurator-driven site and a clear way to choose a design direction.",
    "seoDescription": "Cool Car is a three-variant automotive spec demo: one pick-one landing page routing to editorial, cinematic, and brutalist Swiss designs, each with a vehicle configurator funnel."
  },
  "skynetlabs-gym-demo": {
    "intro": "A spec demo for a boutique West Hollywood strength studio, built to show how a small-group coaching gym can be sold online. It walks a visitor from a free assessment through a coached onboarding into a small-group membership, with services, coaches, schedule, pricing, blog, and contact pages wired as one funnel. Made for owner-coaches who sell programming, not day passes.",
    "showcase": "The build demonstrates a full multi-page conversion architecture rather than a single landing page. The home page opens on an editorial hero with a credential and press badge row, then steps through a services grid, a plain-language \"how it works\" onboarding sequence, a case-study block, a testimonials row, a facility gallery, an FAQ accordion, and a lead-magnet audit offer. A dedicated pricing page lays out the offer ladder as clean tier cards: intro trial, small-group membership, one-on-one coaching, open gym, and a powerlifting team track. A service-area block covers the greater LA cities for local SEO.",
    "designNotes": [
      "Minimalist high-contrast system: dark text on light backgrounds with a modern sans-serif and italic emphasis on key phrases, reading closer to a magazine than a typical gym template",
      "Funnel is structured around a free intake and coached onboarding before membership, so the pricing tiers sit at the end of a warm-up path instead of a cold price wall",
      "Repeated conversion anchors: persistent phone number, quote/assessment CTA, and a gated multi-page 'strength audit' lead magnet",
      "SEO base built in via an explicit greater-LA service-area block and a blog section in the nav"
    ],
    "whoFor": "Boutique strength and small-group coaching studios that sell memberships and programming, not walk-in day passes.",
    "seoDescription": "A spec demo site for a boutique West Hollywood strength studio: multi-page funnel with services, coaches, schedule, tiered pricing, FAQ, and a lead-magnet audit."
  },
  "skynetlabs-landscaping-demo": {
    "intro": "Verdant Acre is a spec demo for a Seattle landscape architecture studio, built to show how a high-end design practice can present itself online. It targets an architect-adjacent, estate-scale audience in the Pacific Northwest and frames the practice around native, Puget Sound-appropriate work. The build exists to prove craft, not to report a real client's numbers.",
    "showcase": "The page runs a full funnel: a quiet hero with a master-plan CTA and a click-to-call, a six-item services grid, a numbered five-stage process from discovery through multi-year stewardship, a portfolio image grid, a featured project write-up, three named client quotes, a Puget Sound service-area list, an expandable FAQ, and a gated Seattle garden decision guide as a lead magnet. Credential and membership badges sit in the footer beside contact details, a studio email, and a quote anchor.",
    "designNotes": [
      "Restrained editorial system: forest and sage greens on off-white, charcoal text, sans-serif headings with italic phrasing for warmth instead of a serif display face.",
      "Sticky top nav with an always-present phone link and a Get Free Quote anchor, so the primary action follows the visitor down the page.",
      "Process and sections are numbered (01-05) to read like a design monograph rather than a service brochure.",
      "Accordion FAQ, arrow 'Learn more' links, and a portfolio grid give the page interaction without clutter; contact resolves to a quote anchor."
    ],
    "whoFor": "A design-led landscape architecture or high-end residential design studio that wants a credible, editorial web presence.",
    "seoDescription": "Verdant Acre is a spec demo landscape architecture site for Seattle: editorial green design system, five-step process, portfolio grid, FAQ, and lead-magnet funnel."
  },
  "skynetlabs-logistics-demo": {
    "intro": "Pacific Lane Logistics is a spec demo SkynetLabs built to show what a modern port-drayage and customs-brokerage operator's site should look like. The fictional company runs POLB/POLA container work, so the page is written for import managers and supply-chain leads who need drayage, ISF filing, bonded warehousing, and clear answers before they call. It is a proof of craft, not a live business.",
    "showcase": "The build demonstrates a full logistics funnel on a clean blue-and-white system. The hero leads with a \"containers cleared in real time\" promise, backed by a compliance strip (FMC OTI, USDOT, MC, SCAC, C-TPAT, ISO, SmartWay) that signals trust the way freight buyers actually vet vendors. Below it sit six named services with detail links, a four-step \"how it works\" process, a case-study block, testimonials, a recent-work grid, an eight-question FAQ accordion, a downloadable drayage field-guide lead magnet, and a 30-plus-city service map across four states. Track, Locations, Industries, and Careers rounds out a real multi-page IA.",
    "designNotes": [
      "Compliance-first hero: a license/certification strip (FMC OTI, USDOT, SCAC, C-TPAT, ISO 9001) sits directly under the headline, mirroring how freight buyers actually qualify a carrier",
      "Funnel is layered: services and process explain the offer, FAQ accordion kills objections, and a downloadable POLB/POLA demurrage field guide captures leads before the quote CTA",
      "Geographic depth: an explicit 30-plus-city list across CA, NV, AZ, and TX makes the drayage radius concrete instead of a vague 'we cover the region'",
      "Honest framing: footer clearly labels it a demonstration site with a fictional business, plus a dedicated 'About This Demo' link"
    ],
    "whoFor": "A port drayage, customs brokerage, or freight operator who wants a credible, compliance-forward website that converts import managers into quote requests.",
    "seoDescription": "A SkynetLabs spec demo for a port-drayage and customs-brokerage operator: compliance-forward hero, six services, process, FAQ, lead-magnet, and a multi-state service map."
  },
  "skynetlabs-moving-demo": {
    "intro": "Northbound Moving Co is a spec demo site SkynetLabs built to show how a Boston moving and relocation company would present online. It is a fictional business used to demonstrate a full lead-generation site for local, long-distance, and specialty movers who want a trust-first web presence and a clean path from visitor to booked survey.",
    "showcase": "The build demonstrates a complete mover funnel end to end. A hero anchored on binding-quote and vet-owned trust signals leads into a service grid covering local, long-distance, packing, white-glove, corporate, storage, junk removal, and specialty items. Below it: a four-step \"how it works\" flow, a featured case-study block, named testimonial cards, a photo gallery, an accordion FAQ with a downloadable checklist lead magnet, and a service-area map covering Boston and surrounding cities. Quote CTAs and a sticky header keep the booking path present throughout.",
    "designNotes": [
      "Navy-and-amber palette on white with cream contrast zones; clean sans-serif type reads corporate but warm, softened by editorial photography",
      "Trust-forward structure: USDOT/MC/AMSA ProMover badges, veteran-owned framing, and BBB signals placed at hero and footer",
      "Conversion scaffolding throughout: sticky nav with click-to-call, repeated Get-a-Quote CTAs, and a checklist lead magnet gating the FAQ",
      "Responsive layout with collapsing nav, stacked cards, and a numbered process; honest footer flags it as a demonstration site with a fictional business"
    ],
    "whoFor": "A local moving or relocation company owner who wants a credibility-first booking site with binding-quote messaging and a clear survey-request funnel.",
    "seoDescription": "A SkynetLabs spec demo for a Boston moving company: full service grid, binding-quote funnel, trust badges, FAQ lead magnet, and service-area sections on a clean site."
  },
  "skynetlabs-pestcontrol-demo": {
    "intro": "Sentinel Pest Solutions is a spec demo built for a Phoenix pest-control niche: an entomologist-led, scorpion-first positioning aimed at Arizona homeowners with kids and pets. It shows how SkynetLabs frames a licensed local service provider online, from the \"scorpion stops at the threshold\" hero down to a quote CTA, with credentials, process, and service-area coverage doing the trust work.",
    "showcase": "The build demonstrates a full local-service funnel on one page: sticky header with phone and a Get Free Quote CTA, a benefit-led hero with dual calls to action, six service cards, a four-step numbered process, a case-study block, a testimonial block, a recent-work image grid, and an accordion FAQ. It leans on visible credibility signals (AZ-OPM license, ACE entomologist, FIFRA/EPA product notes, no-contract policy) plus a downloadable field-guide lead magnet and a broad service-area list covering Phoenix-metro cities.",
    "designNotes": [
      "Navy and charcoal base with a teal CTA accent and a warm secondary highlight, on clean white with soft gray section bands; modern sans-serif type stack.",
      "Conversion scaffolding is deliberate: sticky quote CTA, repeated phone number, hero dual-CTA, and a #quote anchor that ties every button back to capture.",
      "Trust is engineered through content, not decoration: license number, named ACE entomologist, product/compliance notes, and a no-contract cancel-anytime policy.",
      "Card-based services, numbered process steps, an image work grid, and an accordion FAQ keep a long page scannable without heavy iconography."
    ],
    "whoFor": "A licensed local pest-control operator (or similar home-services owner) who wants a credibility-led, quote-driven site instead of a generic template.",
    "seoDescription": "Sentinel Pest Solutions is a SkynetLabs spec demo: an entomologist-led Phoenix pest-control site with a scorpion-first hero, service cards, process, FAQ, and quote funnel."
  },
  "skynetlabs-photography-demo": {
    "intro": "Cassidy Renfield Studio is a spec demo for a Brooklyn editorial photographer, built to show how a high-end wedding and portrait shooter can present work online without a template feel. It carries a full booking narrative: portfolio, services, an inquiry-first pricing path, and a consultation funnel. Made for photographers whose craft warrants a considered, image-forward site.",
    "showcase": "The build demonstrates a restrained editorial design system: near-white canvas, charcoal type, and a clean sans-serif hierarchy that keeps photography as the focal point. It runs a complete funnel structure of hero, equipment line, six service cards, a four-step process, testimonials, a filterable portfolio grid (All, Editorial, Fashion, Portrait, Brand), FAQ accordions, and a featured case study. The pricing path is inquiry-first, routing visitors through a questionnaire and a thirty-minute call before figures are shared. Sticky nav and a persistent Inquire CTA carry the booking intent throughout.",
    "designNotes": [
      "Monochrome editorial palette (off-white canvas, charcoal text) with photography as the only real color, so the images carry the page",
      "Inquiry-first funnel: questionnaire then a 30-minute consultation before any pricing, positioning the studio as high-consideration rather than transactional",
      "Filterable portfolio grid (All / Editorial / Fashion / Portrait / Brand) plus expandable FAQ accordions handle depth without cluttering the layout",
      "Sticky header and a persistent Inquire CTA keep the booking action reachable from every section"
    ],
    "whoFor": "An established editorial or wedding photographer who needs a portfolio site that reads as premium and funnels toward a consultation, not a price list.",
    "seoDescription": "A spec demo photography portfolio site for a Brooklyn studio: editorial design, filterable gallery, service cards, and an inquiry-first booking funnel built by SkynetLabs."
  },
  "skynetlabs-plumbing-demo": {
    "intro": "Cardinal Plumbing Co. is a spec demo built for a Denver home-services plumber, framed around a single sharp niche: slab leaks and aging Front Range infrastructure. It shows how SkynetLabs positions a local trade business with a credibility-led hero, a service menu, a plain-language process, and multiple ways to book. Built for owner-operated plumbing companies that want a site that reads local and specific, not generic.",
    "showcase": "The build demonstrates a full local-services funnel. The hero leads with a \"Water, handled.\" headline plus a diagnostic CTA and a 24/7 dispatch line, backed by a credentials strip (license number, BBB, bonded, insured). Below it: a six-service grid, a four-step \"zero surprises\" process, a featured case study, named client testimonials, a Recent Work gallery, an FAQ addressing Denver-specific plumbing, a lead-magnet checklist for older homes, and a programmatic service-area section covering the metro. Footer carries contact details and an honest \"About This Demo\" disclosure.",
    "designNotes": [
      "Credibility-first hero: headline, dual CTAs (schedule diagnostic + 24/7 phone dispatch), and a license/accreditation trust bar stacked above the fold.",
      "Niche-specific content throughout - freeze-thaw, 1920s clay sewer lines, PEX repipe, slab leak detection - so the copy reads like a real Denver operator, not a template.",
      "Complete local funnel: service grid, transparent 4-step process, case study, testimonials, FAQ, lead-magnet checklist, and a metro-wide service-area block for local SEO.",
      "Honest framing - the footer openly labels the business as a demonstration and credits SkynetLabs, keeping the showcase truthful."
    ],
    "whoFor": "Owner-operated home-services and plumbing companies that want a niche-specific, conversion-focused local site.",
    "seoDescription": "A Denver plumbing spec demo by SkynetLabs: credibility-led hero, slab-leak niche funnel, service grid, process, FAQ, lead magnet, and metro service-area pages."
  },
  "skynetlabs-roofing-demo": {
    "intro": "Summit Roofing & Exteriors is a spec demo site for a Charlotte-area GAF Master Elite roofing contractor. It is a fictional business built by SkynetLabs to show how a high-trust home-services brand should look and convert. The build serves roofing and exterior companies that live or die on storm claims, financing, and warranty credibility, and want a site that earns the call.",
    "showcase": "The build demonstrates a full trust-and-funnel roofing site: an editorial hero (\"Roofs as architecture, not emergencies\"), a credential bar carrying GAF Master Elite, license number, BBB, and financing badges, and six service cards. It structures the sales path as a four-step process block, a featured project case study, named client stories by neighborhood, a work gallery, an eight-question FAQ, a lead-magnet download (the Carolinas Hail-Claim Decoder), and a 30-plus city service-area map. Header and footer both push quote and phone CTAs.",
    "designNotes": [
      "Storm-and-claims funnel: a dedicated 'storm damage? call' CTA runs alongside the main quote path, matching how roofing leads actually convert.",
      "Credential-forward layout: license number, GAF Master Elite, BBB, and partner logos (Owens Corning, CertainTeed) sit up top as the primary trust argument.",
      "Lead magnet built into the page: the 18-page 'Hail-Claim Decoder' guide gives a soft-conversion offer beyond the hard quote ask.",
      "Honest demo framing: footer openly labels the business as fictional and credits SkynetLabs, plus an 'About This Demo' link."
    ],
    "whoFor": "Roofing and exterior contractors who need a claims-savvy, credential-heavy site that turns storm traffic into booked inspections.",
    "seoDescription": "A SkynetLabs spec demo for a Charlotte GAF Master Elite roofer: trust badges, storm-claim funnel, four-step process, FAQ, lead magnet, and 30-city service area."
  },
  "adibug-pest-control": {
    "intro": "Adibug Pest Control is a conversion-focused site for a Hampton Roads, Virginia pest control company founded by Jerry Omoruyi. It targets homeowners and local businesses who want straightforward pest service with upfront pricing and easy booking. The build packages residential and commercial offerings, a plan-based pricing funnel, and a service-area map into one clean, mobile-first landing experience.",
    "showcase": "This build demonstrates a full local-service funnel in one page. The hero pairs a plain headline with a Book Service call and a click-to-call number, then flows through six service cards, a three-step how-it-works path, and a three-tier pricing block that anchors a monthly protection plan as the recommended option. A guarantee section, founder story, testimonials block, and a seven-city service-area list build local trust, while a persistent phone number and repeated booking CTAs keep the path to contact short. Navy-and-white palette, sans-serif type, numbered sections, clear hierarchy throughout.",
    "designNotes": [
      "Navy-and-white system with sans-serif type and numbered section labels keeps a utility trade looking clean and premium rather than clip-arty.",
      "Pricing is structured as a decision funnel: one-time service, a 'most popular' monthly Home Protection Plan, and a custom commercial quote.",
      "Local trust is engineered in - service-area city list, founder section, guarantee ('we come back free'), and licensed/insured badging.",
      "Contact path is frictionless: click-to-call phone in the nav plus repeated Book Service CTAs down the page."
    ],
    "whoFor": "A local home-services owner (pest, HVAC, lawn) who wants a booking-driven site that looks established and makes the phone the easiest button on the page.",
    "seoDescription": "Adibug Pest Control - a Hampton Roads VA pest control site build with a service menu, plan-based pricing funnel, service-area map, and click-to-call booking flow."
  },
  "canine-grooming-demo": {
    "intro": "Laurel & Hound is a spec demo for a boutique Austin dog groomer that pairs spa-style grooming with vet-informed care and a small grooming academy. It is built to show how a single-location pet business can present premium services, a real booking flow, and educational programs on one focused, trust-forward site. Ideal for owners who want calm, careful grooming over volume.",
    "showcase": "The build demonstrates a full conversion path, not just a landing page. A credential-led hero (Fear-Free, NDGAA, insured) opens into a three-step visit overview, a priced services menu with size-and-coat scaling plus add-ons, an academy block with named courses and cohort dates, before-and-after transformations, reviews, and an FAQ. The centerpiece is a multi-step booking form: service, dog size tiers, add-ons, date and time, contact details, deposit, and a cancellation-policy checkbox. Footer carries address, hours, contact, and accreditation marks.",
    "designNotes": [
      "Warm, spacious editorial layout with heavy dog photography and a clear numbered information hierarchy across every section",
      "Booking is a real multi-step funnel: service and dog-size tiers, optional add-ons, calendar slots, contact fields, and a deposit step with policy agreement",
      "Dual offer architecture pairs the grooming menu with an academy funnel (First-Aid, coat-care workshop, 12-month certification) fronted by a named DVM instructor",
      "Trust-forward framing throughout: certification badges, credential callouts, and a services table where pricing scales with size and coat"
    ],
    "whoFor": "A boutique, single-location pet groomer that wants premium positioning plus an online booking and course-enrollment flow.",
    "seoDescription": "Laurel & Hound is a boutique Austin dog grooming demo: spa services menu, multi-step booking with deposit, a grooming academy funnel, and credential-led design."
  },
  "lumen-studio-neon": {
    "intro": "Lumen Studio is a spec demo for a full-service content and media studio: short-form video, social management, photography, editorial, podcast, and distribution under one roof. Built by SkynetLabs, it shows how a creator studio can present a clear service menu, a proof-driven work section, and a booking path that turns a browsing visitor into a project inquiry.",
    "showcase": "The build demonstrates a complete studio funnel on one page: a hero that states the offer plainly, a six-service grid spanning video, social, photography, editorial, audio, and strategy, a case-study gallery with named projects, and a four-stage Discover to Publish process block. It closes with a testimonial row, a Featured In logo strip, and a structured contact form that captures name, company, project type, budget range, and message. Nav anchors (Work, Services, Process, About) keep the long page navigable.",
    "designNotes": [
      "Dark editorial palette with a neon accent, set against clean sans-serif type for a modern media-studio feel",
      "Single-page funnel: sticky nav anchors route to Work, Services, Process, and a Start a project CTA",
      "Qualifying contact form with project-type and budget-range dropdowns to pre-sort inbound leads",
      "Proof-stack layout pairs a case-study gallery, testimonials, and a Featured In logo strip to build credibility before the CTA"
    ],
    "whoFor": "A content-creation or social/video studio that needs a premium one-page site to sell packaged services and capture qualified project inquiries.",
    "seoDescription": "Lumen Studio is a SkynetLabs demo site for a content and media studio: short-form video, social, photography, and editorial services with a lead-capture funnel."
  },
  "denver-nether-commodities": {
    "intro": "Denver Nether Commodities is a speculative design build for an independent commodity trading house, spanning energy, metals, and agriculture. It shows how a serious institutional-finance brand can read as credible and calm online: numbered editorial sections, a global office map, and a clean enquiry funnel. Built as a demo concept for finance and commodities operators who want corporate polish without stiffness.",
    "showcase": "The build demonstrates a full corporate-finance page system. It opens on a \"Sourcing the world's raw materials\" hero with Explore markets and Contact CTAs, then moves through four numbered sections: Markets (Energy, Metals and Minerals, Agriculture with named commodities), Capabilities (physical trading, freight, hedging, trade finance), Reach (offices grouped across four continents), and Responsibility (ESG and responsible sourcing). It closes with an About values block, a full contact section, and a segmented contact form with a commodity area-of-interest dropdown. A footer disclaimer keeps the demo honest.",
    "designNotes": [
      "Minimalist institutional-finance aesthetic: numbered section headers (01/MARKETS), muted palette, generous whitespace, and industrial stock imagery of tankers, turbines, and grain",
      "Structured conversion funnel ending in a qualified enquiry form with name, organization, and a commodity-interest dropdown",
      "Honesty-first: on-page metrics are shown as placeholder zeros and a footer disclaimer states the entity is fictional and figures are illustrative",
      "Clear IA with a three-column footer splitting Markets, Company, and Connect for scannable navigation"
    ],
    "whoFor": "Commodities traders, energy and metals firms, and B2B finance operators who want an institutional-grade web presence.",
    "seoDescription": "A speculative web design build for a commodities trading house: institutional-finance layout, numbered market sections, global reach map, and a qualified enquiry funnel."
  },
  "refinado-estudio": {
    "intro": "Refinado Estudio is a Spanish-language brand-identity site built for a Santiago designer who works in logos and corporate retouching. It runs as a bilingual ES/EN one-pager with a seven-section funnel, from discovery through delivery, aimed at Chilean companies, founders and brands that want a premium visual identity and a clear, documented process.",
    "showcase": "The build demonstrates an editorial dark-luxe design system: a near-black canvas, Fraunces and Cormorant serif display set against Inter Tight body text, with JetBrains Mono for the numbered section markers. Motion is handled with Framer Motion. The numbered sections run from How We Work and Portfolio through Corporate Retouching, About, Testimonials and Philosophy to a Contact form that qualifies leads with an estimated-budget selector and a WhatsApp path. SEO ships Spanish meta, an ES/EN toggle and Person schema.",
    "designNotes": [
      "Editorial dark palette (theme #0E0E0C) with a four-font stack: Fraunces plus Cormorant for display, Inter Tight for body, JetBrains Mono for the 01-07 section numbers.",
      "Fully bilingual ES/EN toggle driven by an in-app dictionary; default locale es_CL with en_US alternate, JSON-LD Person schema and Spanish keyword meta.",
      "Funnel closes on a contact form with an estimated-budget selector and a WhatsApp CTA, acting as a built-in lead qualifier.",
      "The site self-labels portfolio imagery as demonstrative examples shown under NDA, so no client results, ratings or real testimonials are presented as fact."
    ],
    "whoFor": "A solo designer or boutique branding studio in the Spanish market who needs a premium, bilingual identity site that qualifies leads.",
    "seoDescription": "Refinado Estudio: a bilingual ES/EN brand-identity site for a Santiago designer, logo design, corporate retouching and a lead-qualifying contact funnel."
  },
  "skynetlabs-aesthetic-demo": {
    "intro": "A spec build for aesthetic and MedSpa clinics: one clinic, three fully designed landing page concepts pitched side by side. The index page lets a prospect open each live variant, compare the design direction, and reply with a pick. Built with a Germany-based clinic prospect in mind, it doubles as a proof-of-craft for high-ticket aesthetics work in English and German.",
    "showcase": "The build shows three distinct design systems for the same clinic. Aether is editorial luxury in cream and champagne with a Fraunces serif hierarchy. Lumiere is cinematic charcoal and rose gold on Playfair, with draggable before/after sliders and a cursor-follow glow. Klinik Reine is a Swiss-minimal German variant in Inter with a DSGVO form, Impressum, and HWG notice. Each live page runs the same 13-part structure: sticky nav plus mobile consult CTA, hero with trust strip, six anchored-price treatments, before/after gallery, USP pillars, founder bio, testimonials, a 7 to 8 field consultation form, FAQ accordion, and JSON-LD MedicalBusiness schema. Stack is Tailwind plus vanilla JS.",
    "designNotes": [
      "One clinic rendered in three separate design systems (serif editorial, cinematic dark, Swiss minimal) so the prospect picks a direction instead of guessing",
      "Concept 3 is fully German: Sie-Form copy, DSGVO-compliant form, Impressum and HWG paragraph 1 notice for the regulated medical market",
      "Shared 13-part funnel across all variants: sticky consult CTA, anchored-price treatments, before/after gallery, consultation form, and MedicalBusiness JSON-LD schema",
      "Tailwind plus vanilla JS with no framework, kept under 60KB per page"
    ],
    "whoFor": "A high-ticket aesthetic or MedSpa clinic owner, including German-market clinics, who wants a conversion-structured landing page and a choice of design directions.",
    "seoDescription": "A three-concept aesthetic clinic landing page demo by SkynetLabs: editorial, cinematic dark, and Swiss-minimal German variants sharing one conversion funnel and stack."
  },
  "skynetlabs-wellness-demo": {
    "intro": "A spec build for a functional-wellness brand that turns DNA and lab data into personalized nutrition and supplementation. Instead of one landing page, it ships as a design-direction index: five distinct homepage concepts under one nav, so a founder can pick the visual lane that fits their brand before committing to a full build.",
    "showcase": "The index page frames the offer (\"Five directions. One you.\") and links to five fully realized concepts: Helix Cinematic (Three.js DNA hero, deep-space palette), Editorial Apothecary (Fraunces serif, Aesop/Goop lane), Glass Lab (frosted cards, gradient mesh), Bold Magazine (brutalist grid, cobalt and acid yellow), and Soft Aesop (pastel clay, organic blobs). Each concept carries the same waitlist funnel: hero, press strip, a three-step Read/Compose/Refine method, trust badges, testimonials, and a founders'-list email capture.",
    "designNotes": [
      "Same wellness funnel rendered in five visual languages, so the design system is the deliverable — pick a direction, not a page",
      "Every concept runs the identical conversion spine: hero, press logos, three-step method, trust badges, testimonials, waitlist email capture",
      "Scarcity-driven funnel (founders' list, invite-only) instead of pricing or a buy button",
      "Built on Next.js + Vercel, self-labeled as a demo not for production traffic; stack note pointedly rules out Webflow/Carrd"
    ],
    "whoFor": "A functional-wellness or DNA/longevity founder who wants to see multiple premium homepage directions before choosing one to build.",
    "seoDescription": "A SkynetLabs spec build: one DNA-wellness brand shown across five premium landing-page concepts, each with a full waitlist funnel, on Next.js and Vercel."
  },
  "gutreno-prelaunch": {
    "intro": "GutReno is a prelaunch waitlist page for a gut-health and microbiome resource founded by a practicing colorectal surgeon. It is built to introduce the project, state who it serves, patients and clinicians, and capture emails before launch. The single-screen layout keeps one job in front of the visitor: understand what this is, then join the list.",
    "showcase": "The build demonstrates a focused prelaunch funnel with no distractions. It opens on the line \"Your gut, finally understood,\" backs it with a plain-language promise for patients and providers, then explains value through three feature cards: Current science, Tools and guides, and Expert community. A founder note from a practicing colon and rectal surgeon frames the mission against health misinformation. The funnel closes on one email capture with \"Notify me,\" a reassurance line, and a confirmation state. Deep forest green, Cormorant Garamond headings, and Inter body set a calm, clinical tone.",
    "designNotes": [
      "Editorial pairing: Cormorant Garamond serif headings over Inter body, on a deep forest-green palette (#2d4a3e) that reads clinical and calm rather than loud wellness-brand.",
      "Single-goal prelaunch funnel: hero promise, three value cards, founder credibility note, one email capture with confirmation state, no competing navigation.",
      "Trust is carried by a real credential line ('Founded by a practicing Colon & Rectal Surgeon') instead of stats or testimonials, which suits a prelaunch with nothing to prove yet.",
      "Microcopy does the reassurance work: 'No spam. Just gut-level good content.' and a post-signup 'You're on the list' message close the loop."
    ],
    "whoFor": "A prelaunch health or wellness founder who needs a credible, waitlist-first landing page that captures emails before the full product exists.",
    "seoDescription": "A prelaunch waitlist landing page for GutReno, a surgeon-founded gut-health and microbiome resource. Editorial serif type, calm green palette, single email capture funnel."
  },
  "next-level-retreat-designs": {
    "intro": "Next Level Retreat Design Directions is a spec showcase built for Corey Boutwell's men's transformation retreat. Rather than pitch a single comp, it renders the exact same retreat content and video in six distinct visual directions, so the client picks the vibe that hits hardest before a build is locked. Every direction runs the identical booking funnel underneath.",
    "showcase": "The build demonstrates a design-direction system: one content model presented as six switchable styles (gold-and-black luxury, cyberpunk neon, fire gradient, electric street, hand-drawn highlighter, movie-trailer). A \"Back to All Designs\" router lets the client flip between them. Underneath, the conversion spine stays fixed: hero, the three-day experience breakdown, walk-away outcomes, coach bios, video testimonials, raw retreat footage, FAQ, and dated scarcity CTAs for the Austin and Byron Bay dates. Each direction is marked GHL-exportable.",
    "designNotes": [
      "Six switchable design directions off a single content and video set, with a Back to All Designs router between them",
      "Typography shifts per direction (Playfair Display, Cormorant Garamond, Oswald/Impact, Montserrat, Inter) to carry each mood",
      "Funnel spine held constant across all directions: experience breakdown, coach bios, testimonial quotes, raw footage, FAQ, and scarcity CTAs",
      "Built GHL-exportable and shipped as a React SPA on Vercel"
    ],
    "whoFor": "A coach or retreat operator who wants to compare full brand directions on real content before committing to one site design.",
    "seoDescription": "A six-direction design showcase for Corey Boutwell's Next Level Retreat: one men's-retreat funnel rendered in six visual styles, GHL-exportable."
  },
  "rsf-redesign": {
    "intro": "Rockaway's Soul Food Kitchen is a redesign concept for a family-owned southern comfort spot by the Rockaway boardwalk. It pairs a warm, beach-adjacent brand with a working online-ordering flow, built so a small restaurant team can take pickup and delivery orders directly from its own site instead of routing everything through a third-party app.",
    "showcase": "The build shows a full order-to-checkout funnel on one page. The hero leads with a plain promise and an order call-to-action, then moves into filterable menu categories (All, Mains, Sides, Drinks), a guest testimonial block, and a visit section with address, hours, and directions. The ordering engine is real: items add to a cart, checkout offers card, Apple Pay, and pay-at-pickup, plus address and time selection and a confirmation screen. It runs in demo mode with no live payment taken.",
    "designNotes": [
      "Sans-serif type and a light, boardwalk-themed palette keep the southern-comfort brand approachable rather than heavy or vintage-diner",
      "Single-page funnel: hero CTA leads straight into menu filters, testimonials, and a visit/directions block, so ordering is never more than a scroll away",
      "Working cart and multi-step checkout (card, Apple Pay, pay-at-pickup, time and address selection, confirmation) demonstrated in clearly-labeled demo mode",
      "Multiple order paths surfaced side by side: order online, call to order, and a catering/large-order email"
    ],
    "whoFor": "An independent, family-owned restaurant that wants first-party online ordering and directions instead of relying on third-party delivery apps.",
    "seoDescription": "A soul-food restaurant redesign concept with a working online-ordering cart, filterable menu, pickup and delivery checkout, and a boardwalk brand. Spec build."
  },
  "ksa-shoes-store-five": {
    "intro": "Al-Zaytoun is a spec-demo storefront for a premium Arabic footwear brand built for the Saudi market. It shows how a handcrafted-leather sandal and formal-shoe catalog can be merchandised for Gulf shoppers: SAR pricing, a bilingual Arabic and English interface, and the local payment methods buyers expect. The build is a proof of craft for retail e-commerce, not a live client store.",
    "showcase": "The build demonstrates a full storefront funnel. A hero anchors the brand with a starting price, payment badges, and a \"Shop the Collection\" call to action, then flows into a filterable product grid with category, brand, EU size, price-range, and sort controls. Product cards carry promo badges, stock indicators, and Quick Add. Below sit a shop-by-category block, trust strip (Tamara installments, authenticity, next-day delivery, 30-day returns), testimonials, and a footer with legal registration fields, newsletter signup, and a WhatsApp support button.",
    "designNotes": [
      "Localized for KSA: SAR currency, Arabic and English language toggle, and Mada, Apple Pay, Tamara, and cash-on-delivery payment options wired into the hero and footer",
      "Merchandising-first product grid with faceted filters (category, brand, size EU 39-45, price range) plus sort, badges, and low-stock cues",
      "Trust architecture built for the region: Maroof certification, CR and VAT footer fields, split-payment messaging, and returns policy",
      "Luxury retail visual system in black and brown leather imagery with star ratings and promotional badge states"
    ],
    "whoFor": "A Gulf-region footwear or fashion retailer who wants a conversion-ready, Arabic-localized e-commerce storefront.",
    "seoDescription": "Al-Zaytoun is a spec-demo Arabic footwear storefront for KSA: SAR pricing, Arabic and English toggle, Tamara and Mada payments, filterable product grid, and trust funnel."
  },
  "skynetlabs-inspire-health-pt-demo": {
    "intro": "Inspire Health PT is a speculative pitch build for a cash-pay, out-of-network physical therapy and performance studio in Miami. It is designed for a private, doctor-led clinic that sells one-on-one time instead of insurance-mill volume, and it packages that positioning into a full conversion site with a booking funnel and a paid lead magnet.",
    "showcase": "The build demonstrates a complete cash-pay clinic funnel: a home page that runs hero, trust strip, stats, services, provider story, four-step process, an insurance-mill comparison table, transparent pricing tiers, testimonials, gallery, and FAQ, then routes into an Evaluation landing page with a VSL and Calendly-style booking mock, a Stripe/WooCommerce-style ebook paywall, and a thank-you step. Its standout is a three-theme design system, Editorial, Cinematic, and Minimal, that restyles the entire site live from one switcher. Medical compliance is baked in with MedicalClinic schema and superbill framing.",
    "designNotes": [
      "Three swappable CSS-variable themes from one switcher: Editorial (Fraunces serif, cream and brushed-bronze), Cinematic (Archivo, near-black with coral/cyan), Minimal (Manrope, white with medical mint); each changes type, color, radius, and grain sitewide.",
      "Funnel is structured, not decorative: Home to Evaluation (VSL + booking + lead capture) to Ebook paywall to Thank-You, with a persistent Reserve Your Evaluation CTA and a Call the Clinic secondary.",
      "Positioning is sold through content blocks, a mill-vs-clinic comparison table, tiered pricing with a superbill line, direct-access FAQ, and a Doctor of PT provider story.",
      "Compliance is designed in: MedicalClinic JSON-LD, out-of-network/superbill framing, results-vary and medical disclaimers, and no cure or guaranteed-outcome claims."
    ],
    "whoFor": "A private cash-pay or out-of-network PT, rehab, or performance clinic that needs a booking-driven site and wants premium, compliance-aware craft.",
    "seoDescription": "A cash-pay physical therapy demo site for a Miami clinic: three live design themes, a full evaluation booking funnel, ebook paywall, and MedicalClinic schema."
  },
  "hepatologia-course": {
    "intro": "A Spanish-language patient-education landing and course funnel for a hepatology program aimed at cirrhosis patients and their families. The build walks a worried reader from \"does this sound like you?\" through the doctor's credibility, the module structure, bonuses, live classes, FAQ, and a single-payment checkout. It is a spec demo styled for a real specialist, written in plain, reassuring Spanish for non-clinical readers.",
    "showcase": "The page demonstrates a full course-sales funnel built for a healthcare audience in Spanish. It opens on a step-by-step hero, then runs a pain-point block (\"¿Se identifica?\"), a before/after clarity comparison, three base modules each carrying video, PDF and quiz, a bonus stack with live Q&A classes, a doctor-credentials section, testimonial cards, a six-question FAQ, and a checkout that lists local payment methods like Yape, Plin and Mercado Pago plus a money-back guarantee. It also wires a Portal Login and \"Cómo Funciona\" flow, so the demo reads as an LMS front end, not just a sales page.",
    "designNotes": [
      "Medical-portal design system: color-coded module books (blue/green/red), medical iconography, and a calm clinical palette suited to anxious patients",
      "Conversion architecture is deliberate: pain-point empathy, before/after, modules, bonuses, doctor authority, testimonials, FAQ, then a single-payment CTA with guarantee",
      "Localized for Peru: Spanish copy, S/ PEN pricing, and regional payment rails (Yape, Plin, Mercado Pago, transfer) alongside Visa/Mastercard",
      "LMS framing beyond a landing page: Portal Login, 6-month access, graded quizzes with explanations, and Vimeo-based mobile delivery"
    ],
    "whoFor": "A specialist doctor or health educator who wants a Spanish-language online course with a patient-friendly sales funnel and a member portal.",
    "seoDescription": "A Spanish-language patient-education course funnel and portal demo for a hepatology cirrhosis program: modules, bonuses, live classes, FAQ, and localized checkout."
  },
  "healthcare-workflow-demo": {
    "intro": "Physician Group Workflow AI is a spec-demo landing page for a healthcare automation offer aimed at physician-owner groups and the consultants who serve them. It frames a repeatable engagement: turn a consulting playbook into HIPAA-aware n8n automations plus a single-screen operator dashboard. The page sells a free workflow audit as the low-friction entry point rather than a packaged product.",
    "showcase": "The build demonstrates a full long-form funnel: hero with audit CTA, a three-part problem breakdown, a four-step process blueprint, a menu of ten automations, a reference data-flow architecture, and a security and HIPAA section covering de-identification, BAA-covered endpoints, encryption, RBAC, and audit-log retention. It includes a mocked operator dashboard with KPI cards, a ten-day engagement timeline, anonymized build patterns, a seven-item FAQ, and a founder section. Navigation anchors jump between every section, and email and Zoom mailto CTAs close the path.",
    "designNotes": [
      "Clean, minimal layout with heavy whitespace, numbered section labels, and a sticky anchor nav linking all sections for a single-page scroll funnel",
      "Mocked operator dashboard rendered as card-based KPI tiles with directional arrows, showing the actual deliverable instead of just describing it",
      "Compliance-forward copy: explicit de-identification layer, BAA-covered LLM endpoints, and a visual sources-to-outputs architecture diagram",
      "Low-friction conversion via mailto CTAs (free audit + 20-min Zoom) rather than a form, with white-label framing throughout"
    ],
    "whoFor": "Healthcare-ops consultants and physician-group operators who want HIPAA-aware n8n workflow automation packaged as a white-label, audit-first engagement.",
    "seoDescription": "A spec-demo landing page for HIPAA-aware physician-group workflow automation: n8n flows, an operator KPI dashboard, a reference architecture, and a free-audit funnel."
  },
  "skynetlabs-pizza-demo": {
    "intro": "Forno Vero is a spec demo for an independent wood-fired Neapolitan pizzeria, built to show how a single-location Brooklyn restaurant can carry a premium, reservation-first web presence. It is a static, fast-loading marketing site aimed at owner-operators who want the room to feel as considered online as it does in person, and who convert guests through booked tables rather than online ordering.",
    "showcase": "The build demonstrates a full restaurant funnel end to end. A dark, warm hero opens with the \"Wood-Fired. Uncompromising.\" line, a click-to-call number, and a reserve CTA, followed by a scrolling social-proof marquee, a stats strip, and a signature-pizza menu with per-item pricing and Italian descriptions. Below that sit a founder story, a gallery preview linking to a dedicated gallery page, five-star guest quotes, and a location and hours block. The reservations page carries a real multi-field booking form: date, time, party size, occasion, name, email, phone, and a notes field.",
    "designNotes": [
      "Editorial type pairing: Cormorant Garamond display serif over Inter for UI and body, giving a fine-dining feel without a template look",
      "Warm near-black palette (charcoal #121110) lit by ember-orange #e8772e and amber #f2b441 accents, with cream and tomato-red to evoke the wood-fired oven",
      "Reservation-first funnel: click-to-call and a Reserve CTA repeat down the page, and the booking page is a full structured form, not a third-party embed",
      "Supporting pages carry the system through: a standalone gallery page and reservations page keep the header nav (Home, Menu, Gallery, Reserve) consistent"
    ],
    "whoFor": "An independent Neapolitan or wood-fired pizzeria owner who books tables and wants a premium, on-brand site instead of a generic template.",
    "seoDescription": "A wood-fired Neapolitan pizzeria demo site: editorial serif design, signature menu, founder story, gallery, and a full reservation booking form. A SkynetLabs spec build."
  },
  "car-dealer-demo-2026-05-12": {
    "intro": "Atelier Auto Salon is a spec demo for a curated, high-end car dealer, the kind of small showroom that sells a dozen inspected vehicles rather than a full lot. It's built for a boutique dealer or car concierge who sells trust and personal service, not volume, and wants a site that reads as considered as the cars.",
    "showcase": "The build demonstrates a full boutique-dealer funnel on one page. The hero leads with \"Cars chosen, not stocked.\" and pushes to two paths: browse the floor or enquire via WhatsApp. Below it, an inventory grid shows six vehicles as cards with year, model, price, mileage, transmission, fuel and color, including a Reserved state. It then walks a four-step Concierge flow (Brief, Search, Inspect, Deliver), a Worldwide Delivery section with transport and timeline detail, owner testimonials, and a by-appointment footer. An /admin route is stubbed for inventory management.",
    "designNotes": [
      "Light, editorial layout: white background, high-contrast dark type, sans-serif throughout, with large car photography carrying the visual hierarchy",
      "Inventory modeled as real cards with structured metadata (price, mileage, transmission, fuel, color) and a Reserved state, not static placeholder blocks",
      "Conversion is WhatsApp-first: the primary CTA and footer contact both route to chat rather than a long lead form",
      "Concierge and Worldwide Delivery sections are structured as step/timeline flows, positioning the dealer as a sourcing service, not just a listings page"
    ],
    "whoFor": "A boutique or luxury used-car dealer, or a private car concierge, who sells a small curated inventory and wants a premium, appointment-driven site.",
    "seoDescription": "Atelier Auto Salon is a boutique car dealer demo: curated inventory cards, a Brief-to-Deliver concierge flow, worldwide delivery, and WhatsApp-first enquiry."
  },
  "skynetlabs-healthcare-demo": {
    "intro": "A concept build for a fictional healthcare firm that pairs AI care navigation with hospital acquisition. It is a spec demo, not a live client, built as a proof-of-craft for the kind of restrained, editorial web presence that private-capital, healthcare, and high-trust B2B brands ask for. The narrative runs from thesis to acquisition to the intelligence layer to the operating model.",
    "showcase": "The standout is a variant switcher that ships four complete design systems in one build: Cathedral (classical serif with sculpture plates), Clinical (clean and quiet), Brutal (heavy brutalist type), and Magazine (a quarterly editorial layout with an Editor's Note and column grid). Each carries the same two-pillar story, a four-step process section, and an intelligence stack detailing triage, specialist match, length-of-stay, discharge, and capacity routing. The funnel stays deliberately soft: request the memorandum, read the thesis, and an inbound-only contact form.",
    "designNotes": [
      "Four switchable design systems in one site via a variant switcher (Cathedral, Clinical, Brutal, Magazine), each a full re-skin of the same content",
      "Serif-led type stack (Fraunces, Instrument Serif, Cormorant Garamond) with Inter, JetBrains Mono, and Archivo for structure; Lenis smooth scroll",
      "Editorial magazine treatment with Editor's Note, multi-column grid, and numbered plates that reads like a print quarterly",
      "Restrained, inbound-only funnel: request the memorandum, read the thesis, and a low-pressure contact form instead of hard CTAs"
    ],
    "whoFor": "Founders and agencies in private capital, healthcare, or luxury B2B who want an understated, editorial site that signals discretion over hype.",
    "seoDescription": "Editorial healthcare concept demo by SkynetLabs: four switchable design systems, serif typography, and an AI care-navigation plus hospital-acquisition narrative."
  },
  "skynetlabs-medspa-landing": {
    "intro": "A med-spa landing page concept presented as three design directions for the same offer. Built as a category spec demo under the placeholder brand Lumière Aesthetics, it lets a clinic owner preview distinct visual routes for one consultation funnel and pick the one that fits their brand before committing to a build.",
    "showcase": "The page opens on \"Three high-converting landing pages, one offer\" and hands you a live picker for three directions: Clinical Luxe (soft white, sage, gold, editorial serif), Warm Glow (blush, peach, terracotta, rounded and soft), and Bold Modern (near-black, champagne, rose-gold, dark-luxe high contrast). Each shares the same funnel skeleton: hero with lead form, trust bar, six treatments, why-us, results gallery, testimonials, offer, five-field form, FAQ, and a final CTA. First-person buttons, a sticky mobile call bar, and LocalBusiness schema round it out.",
    "designNotes": [
      "One funnel, three fully committed palettes and type systems — so the direction choice is visual, not structural",
      "Lead capture kept above the fold with first-person CTAs (Book My Free Consultation) and a sticky click-to-call bar on mobile",
      "Compliance-conscious copy with no medical guarantees, plus LocalBusiness schema baked in for local search",
      "Pure-HTML, mobile-first build framed for fast loads and easy handoff"
    ],
    "whoFor": "A med-spa or aesthetics clinic owner who wants to see real design routes for a consultation-booking landing page before picking one.",
    "seoDescription": "A med-spa landing page demo showing three design directions for one consultation funnel: Clinical Luxe, Warm Glow, and Bold Modern, each with lead form and schema."
  },
  "skynetlabs-salon-suite-demo": {
    "intro": "Atelier Suites is a spec demo for a salon-suite rental brand: private studios leased to independent beauty pros — stylists, estheticians, lash artists, barbers. It is a category build showing how a rental operator can publish rates openly, run a deposit-and-tour funnel, and present the space as both a workspace and a content set for tenants who photograph their work.",
    "showcase": "The page demonstrates a full leasing funnel: a hero that names the offer, a transparent three-tier rate table (Solo Suite, Studio Double, Esthetic Room) with per-tier size, chair count, and included amenities, an all-inclusive utilities strip, and a three-step reserve-to-move-in flow built around a refundable deposit. It carries a founder story with license credentials, tenant quote cards, and a structured FAQ covering lease terms, after-hours keyless access, and insurance. The build presents three design directions — Editorial, Cinematic, and Boutique — on a warm bone-and-sage palette.",
    "designNotes": [
      "Warm bone-and-sage palette with brass and marble cues, sans-serif type, daylight-lit imagery that doubles as the tenant's IG backdrop pitch",
      "Transparent pricing as the core UX bet: rates published in a scannable tier table instead of a 'call us' gate",
      "Deposit-and-tour funnel — reserve with a refundable deposit, same-week private tour, then lease or full refund — mapped as a three-step path",
      "Ships three design directions (Editorial, Cinematic, Boutique) so a client can pick a lane from one build"
    ],
    "whoFor": "A salon-suite or studio-rental operator who leases private space to independent beauty professionals and wants transparent pricing plus a deposit-to-tour booking funnel.",
    "seoDescription": "Atelier Suites is a salon-suite rental demo build: transparent tier pricing, a deposit-and-tour leasing funnel, founder story, and FAQ for independent beauty pros."
  },
  "skynetlabs-logo-studio": {
    "intro": "Marque is a spec demo for a boutique logo and brand identity studio, built by SkynetLabs as a proof-of-craft for design freelancers and small studios who need a single-page site that sells the work. It shows how a typography-led layout, a clear pricing ladder, and a short contact funnel can present a branding service cleanly, in both English and German.",
    "showcase": "The build demonstrates a full one-page conversion funnel for a design service: a hero with a plain-spoken headline, a client logo carousel, a selected-work grid of sample case studies across publishing, SaaS, coffee, and health tech, a four-step process from discover to deliver, a three-tier pricing table, testimonials, an FAQ, and a project contact form with name, email, project type, and message fields. An EN/DE language toggle sits in the nav, and CTAs route consistently to Start a project or View work.",
    "designNotes": [
      "Typography-forward design system: minimal monochrome palette, off-white background, charcoal text, generous negative space that lets the sample marks and headlines carry the page.",
      "Bilingual EN/DE toggle in the nav, reflecting the studio's positioning for a German-speaking market with euro-denominated pricing tiers.",
      "Single-page funnel structure: hero, work, process, pricing, proof, FAQ, and contact form stacked so every scroll pushes toward one action.",
      "Static React/Next.js front end deployed on Vercel, using placeholder brand names and sample copy as demo fixtures rather than live client data."
    ],
    "whoFor": "A logo and brand identity freelancer or small design studio wanting a clean, conversion-focused one-page site to sell packaged work.",
    "seoDescription": "Marque is a SkynetLabs spec demo for a logo and brand identity studio: a bilingual one-page site with work grid, process, pricing tiers, and a contact funnel."
  },
  "photo-portfolio-demos": {
    "intro": "A spec build for photographers choosing a portfolio look before committing. One landing page presents three fully built design directions for the same fictional artist, so a shooter can open each, click through a real gallery lightbox, and pick the aesthetic that fits their work. It is a \"decide by seeing it live\" pitch, made before the first call.",
    "showcase": "The build demonstrates three distinct front-ends running off one concept: Editorial (fine serif, museum-catalogue whitespace), Cinematic (dark, full-bleed, immersive), and Swiss (bold type, strict grid, single accent). Each direction is a working page with its own hero line, a captioned multi-image gallery with a click-to-open lightbox, an about section, and a \"let's work together\" contact block with email and social links. The index frames all three side by side as a client-facing choice, using placeholder imagery via picsum.photos.",
    "designNotes": [
      "Three separate design systems from one brief: Editorial serif/whitespace, Cinematic dark full-bleed, and Swiss grid with one accent",
      "Every gallery photo opens a working lightbox, so the demo is interactive proof rather than static screenshots",
      "Consistent page architecture across all three: hero line, captioned gallery, about, and a contact CTA with email plus social links",
      "Honest framing: index and footer state these are spec concepts with placeholder images, built before the client conversation"
    ],
    "whoFor": "A working photographer or studio deciding which portfolio direction fits their brand before paying for a full build.",
    "seoDescription": "A photography portfolio spec build showing three live design directions - Editorial, Cinematic, and Swiss - each with a working gallery lightbox and contact section."
  },
  "wrestling-event-landing": {
    "intro": "A single-page event landing site for an independent pro-wrestling show, \"Iron Fist Wrestling: Night of Champions.\" It is a spec demo built to prove out the Events and ticketing niche: one scroll takes a fan from the hero and countdown down through the full match card, roster, three ticket tiers, venue logistics, and FAQ. Built for promoters and event organizers who need to sell seats.",
    "showcase": "The build demonstrates a complete ticketing funnel on one page. A marquee ticker and a live countdown timer set urgency at the top, then the main event and an eight-match card establish the show, a twelve-name roster lists the talent, and three pricing tiers (General $25, Ringside $65 \"Most Popular,\" VIP + Meet & Greet $150 capped at 40) anchor the buy. Venue details, a maps embed slot, an accordion FAQ, and a footer with press/booking contacts and social links close it out. Bold condensed display type, black-and-white base, gold star accents.",
    "designNotes": [
      "Fight-poster aesthetic: black-and-white base with gold star accents and a scrolling star-divided marquee, bold condensed sans display type for headlines and wrestler names, no serif.",
      "Ticketing funnel is the spine: countdown timer up top, then a clear three-tier price ladder with a highlighted 'Most Popular' Ringside option and a scarcity cap (40 VIP) to push the upsell.",
      "Anchor-nav single page (The Card, Roster, Venue, FAQ) with an accordion FAQ covering age, refunds, cameras, re-entry, and merch — the practical questions a real box office fields.",
      "Full event scaffold present: main event stipulations, 8-match card, 12-wrestler roster, venue capacity/parking/accessibility, and press + booking contacts in the footer."
    ],
    "whoFor": "Independent event promoters and ticketed live-event organizers who need a fast, scroll-to-buy landing page.",
    "seoDescription": "A spec demo event landing page for an indie pro-wrestling show: hero countdown, 8-match card, roster, three ticket tiers, venue info, and FAQ in one scroll."
  },
  "wellness-funnel-demo": {
    "intro": "Phoenix Wellness is a spec demo built to show how a wellness brand can turn a cold visitor into a paying member through one calm, staged funnel. It targets women recovering from burnout, opening with a free 7-day email reset and layering an archetype quiz, a paid guide, a cohort programme, and a book. It is a proof-of-craft build, not a live client site.",
    "showcase": "The build demonstrates a full ascension funnel laid out as a numbered five-step journey: free reset, quiz, low-price guide, 12-week programme, and book. It shows a complete conversion page in order, from a serif hero and dual CTAs to a social-proof row, a press strip, the staged journey, a promise block, placeholder stat and testimonial modules, and a closing reset signup. The design system reads as warm, minimal, and editorial: serif display headlines, golden-hour lifestyle imagery, and gentle anti-diet copy that carries the same voice from headline to footer.",
    "designNotes": [
      "Editorial serif headlines over warm golden-hour lifestyle photography, with a restrained minimalist layout that reads premium rather than clinical",
      "The funnel is the structure: a numbered five-step journey (free reset to quiz to guide to programme to book) doubles as the page's spine and its value ladder",
      "Low-friction top of funnel: the lead magnet is a free 7-day email reset with no card required, sitting above the paid tiers",
      "Trust framing built in via a social-proof avatar row, a press-mention strip, and dedicated stat and testimonial blocks (demo placeholder content, not real results)"
    ],
    "whoFor": "A wellness coach, course creator, or membership founder who needs a staged opt-in-to-paid funnel rather than a flat landing page.",
    "seoDescription": "Phoenix Wellness is a SkynetLabs spec demo: a staged wellness funnel from free 7-day reset to quiz, paid guide, 12-week cohort, and book. See the build."
  },
  "skynetlabs-hvac-demo": {
    "intro": "Premier HVAC of Austin is a spec demo built for a residential heating and cooling contractor. It shows how a local HVAC company can turn a single homepage into a booking engine: fast emergency-dispatch messaging up top, a clear service menu, a trust-heavy proof stack, and multiple paths to call or request a quote. Built for solo operators and small crews who need one page to do the selling.",
    "showcase": "The build demonstrates a conversion-first layout for a home-services trade. The hero leads with a plain, urgent promise and a same-day dispatch line, backed by a credential badge row. Below it: a six-tile service grid, a four-step \"how it works\" process (diagnostic, written proposal, install and commissioning, follow-up), a featured project block, a testimonial trio, a recent-work image grid, a collapsible FAQ, a lead-magnet guide offer, and a 25-plus city service-area map. Sticky call and quote CTAs, license and bonding details, and a clean blue-and-white sans-serif system tie it together.",
    "designNotes": [
      "Emergency-dispatch hero: the H1 states the outcome plainly and pairs a phone CTA with a free-quote CTA repeated through the page.",
      "Trust architecture: a badge row plus a footer credential block (license number, NATE, bonding, insurance) does the objection-handling for a high-consideration home purchase.",
      "Funnel depth: process steps, FAQ accordion, and a no-gate rebate guide give a visitor several reasons to keep scrolling before the contact form.",
      "Local SEO framing: a 25-plus city service-area section with named hero cities structures the page for metro-wide search intent."
    ],
    "whoFor": "A local HVAC or home-services contractor who wants one page that dispatches emergency calls and captures quote requests.",
    "seoDescription": "A spec-demo HVAC contractor site by SkynetLabs: emergency-dispatch hero, six-service grid, four-step process, FAQ, and a 25-plus city Austin service area."
  }
};

export function getBuild(slug: string): Gig | undefined {
  return WORK_BUILDS.find((b) => b.slug === slug);
}
export function getNarrative(slug: string): WorkNarrative | undefined {
  return WORK_NARRATIVE[slug];
}
