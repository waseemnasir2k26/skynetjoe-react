"use client";

/**
 * WorkShowcase — /portfolio gallery of 47 shipped builds, filterable by
 * category (client / flagship / portal / demo) with animated reflow.
 *
 * Cream-pivot port 2026-05-25:
 *   - bg cream-3 (was dark gradient #061827 → #073846)
 *   - Fraunces H1 with terracotta <em> accent
 *   - Cards: cream-2 bg, 1px ink border, ink heading, ink-2 body,
 *     terracotta hover accent (was cyan-400 hover, white/5 cards)
 *   - Founder strip: cream-2 panel with terracotta CTA (was dark
 *     gradient pill with cyan glow)
 *   - Category chips re-tinted to cream-safe terracotta / sage / ink
 *   - Gigs data shape + URLs unchanged.
 */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Play, Star } from "lucide-react";
import PortfolioScreenshot from "@/components/PortfolioScreenshot";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6a3.1 3.1 0 0 0-1.3-1.7c-1.1-.7.1-.7.1-.7a2.5 2.5 0 0 1 1.8 1.2 2.5 2.5 0 0 0 3.4 1 2.5 2.5 0 0 1 .8-1.6c-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.3 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.9 5.7-5.6 6a2.8 2.8 0 0 1 .8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
  </svg>
);

type Gig = {
  slug: string;
  title: string;
  client: string;
  niche: string;
  stack: string[];
  outcome: string;
  liveUrl: string;
  category: "client" | "flagship" | "portal" | "demo";
};

const GIGS: Gig[] = [
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

// Category chip styles, cream-safe.
const CATEGORY_CHIP: Record<Gig["category"], React.CSSProperties> = {
  client: {
    background: "rgba(198,107,63,0.10)",
    color: "var(--terracotta)",
    border: "1px solid rgba(198,107,63,0.40)",
  },
  flagship: {
    background: "var(--ink)",
    color: "var(--cream-3)",
    border: "1px solid var(--ink)",
  },
  portal: {
    background: "rgba(63,140,94,0.10)",
    color: "#2f6f49",
    border: "1px solid rgba(63,140,94,0.40)",
  },
  demo: {
    background: "rgba(26,26,26,0.04)",
    color: "var(--ink-2)",
    border: "1px solid rgba(26,26,26,0.18)",
  },
};
const CATEGORY_LABEL: Record<Gig["category"], string> = {
  client: "Real Client",
  flagship: "Flagship",
  portal: "Portal / App",
  demo: "Niche Demo",
};

// Filter tab order + labels (drives the pill row + default sort).
const FILTERS: { key: "all" | Gig["category"]; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "client", label: "Real Client" },
  { key: "flagship", label: "Flagship" },
  { key: "portal", label: "Portal / App" },
  { key: "demo", label: "Niche Demo" },
];
const CAT_ORDER: Gig["category"][] = ["client", "flagship", "portal", "demo"];

export default function WorkShowcase() {
  const [active, setActive] = useState<"all" | Gig["category"]>("all");

  // Sort once: client → flagship → portal → demo, so "All work" reads cleanly.
  const sorted = useMemo(
    () =>
      [...GIGS].sort(
        (a, b) => CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category),
      ),
    [],
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: GIGS.length };
    for (const g of GIGS) c[g.category] = (c[g.category] ?? 0) + 1;
    return c;
  }, []);
  const visible =
    active === "all" ? sorted : sorted.filter((g) => g.category === active);

  return (
    <section
      className="relative pt-24 md:pt-32 pb-16"
      style={{
        background: "var(--cream-3)",
      }}
    >
      <div className="container-x px-6 relative z-10">
        {/* HERO */}
        <div className="max-w-3xl mb-10">
          <div
            className="inline-flex items-center gap-3 mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta-aa)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta)",
                display: "inline-block",
              }}
            />
            Recent projects · real screenshots
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              fontSize: "clamp(40px, 6vw, 68px)",
              margin: "0 0 18px",
            }}
          >
            Filter, then open{" "}
            <span
              style={{
                fontStyle: "normal",
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              any live tile.
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--ink-2)",
              lineHeight: 1.6,
              maxWidth: "62ch",
            }}
          >
            Live screenshots, not mockups. Every tile links to the deployed
            site. Built solo from Bali + Lahore. Video below walks through one
            being built end-to-end in Claude Code.
          </p>
        </div>

        {/* Video — 1px ink border on cream, no dark frame */}
        <div
          className="overflow-hidden mb-12 aspect-video"
          style={{
            border: "1px solid rgba(26,26,26,0.18)",
            borderRadius: 2,
            background: "var(--ink)",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/5lT9vrzssU0"
            title="WordPress plugin development using Claude Code by Anthropic — Waseem Nasir"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {FILTERS.map((f) => {
            const on = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className="relative inline-flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "9px 15px",
                  borderRadius: 2,
                  cursor: "pointer",
                  background: on ? "var(--terracotta)" : "var(--cream-2)",
                  color: on ? "var(--cream-3)" : "var(--ink-2)",
                  border: on
                    ? "1px solid var(--terracotta)"
                    : "1px solid rgba(26,26,26,0.18)",
                  transition:
                    "background 0.18s, color 0.18s, border-color 0.18s",
                }}
              >
                {f.label}
                <span
                  style={{
                    fontSize: "0.625rem",
                    opacity: 0.7,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {counts[f.key] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* GIG GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((g) => (
              <motion.a
                layout
                key={g.slug}
                href={g.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  borderRadius: 2,
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                <div
                  className="relative aspect-video overflow-hidden"
                  style={{ background: "rgba(26,26,26,0.06)" }}
                >
                  <PortfolioScreenshot
                    src={`/portfolio/${g.slug}.jpg`}
                    alt={`${g.title} — live screenshot`}
                  />
                  <span
                    className="absolute top-3 left-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      padding: "4px 8px",
                      borderRadius: 2,
                      background: "var(--cream-3)",
                      color: "var(--ink)",
                      border: "1px solid rgba(26,26,26,0.18)",
                    }}
                  >
                    {g.niche}
                  </span>
                  <span
                    className="absolute top-3 right-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      padding: "4px 8px",
                      borderRadius: 2,
                      ...CATEGORY_CHIP[g.category],
                    }}
                  >
                    {CATEGORY_LABEL[g.category]}
                  </span>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      padding: "4px 8px",
                      borderRadius: 2,
                      background: "var(--terracotta)",
                      color: "var(--cream-3)",
                      border: "1px solid var(--terracotta)",
                    }}
                  >
                    <ExternalLink className="w-3 h-3" /> Live
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 17,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 4,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {g.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--terracotta-aa)",
                      marginBottom: 12,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {g.client}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                      marginBottom: 16,
                    }}
                  >
                    {g.outcome}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {g.stack.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          padding: "3px 8px",
                          borderRadius: 9999,
                          background: "var(--cream-3)",
                          border: "1px solid rgba(26,26,26,0.12)",
                          color: "var(--ink-faint)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Founder strip */}
        <div
          style={{
            background: "var(--cream-2)",
            border: "1px solid rgba(26,26,26,0.18)",
            padding: "clamp(20px, 5vw, 32px)",
            borderRadius: 2,
          }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div
              aria-hidden
              className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center"
              style={{
                borderRadius: "50%",
                background: "#A8451F",
                color: "var(--cream-3)",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "0.04em",
              }}
            >
              SL
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--terracotta-aa)",
                  marginBottom: 6,
                }}
              >
                Built by Waseem · solo · Bali-based
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "var(--ink)",
                  letterSpacing: "-0.015em",
                  marginBottom: 4,
                }}
              >
                Want yours on this page next?
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--ink-2)",
                  lineHeight: 1.55,
                }}
              >
                3-min brief · 8-hour reply · 4 slots/month.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto md:flex-shrink-0">
            <a
              href="https://github.com/waseemnasir2k26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                padding: "13px 21px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.875rem",
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              <Star className="w-4 h-4" /> All repos
            </a>
            <a
              href="/discovery-call"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "14px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.875rem",
                borderRadius: 2,
                border: "none",
                textDecoration: "none",
              }}
            >
              <Play className="w-4 h-4" /> Book free audit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
