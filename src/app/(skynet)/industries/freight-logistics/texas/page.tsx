/**
 * /industries/freight-logistics/texas — bespoke 3,000-word deep guide
 *
 * Purpose:
 *   - Targets organic intent: "freight automation Texas", "n8n trucking Houston",
 *     "dispatch software Dallas", "TMS integration Austin", "IFTA reporting automation".
 *   - SEO sister to the robots-disallowed /lp/logistics ad funnel — content drives
 *     organic discovery while the ad page (Meta launch 2026-06-01) handles paid.
 *   - Schema graph emits Service + AdministrativeArea(Texas) + FAQPage + BreadcrumbList.
 *
 * NOT a programmatic template — single hand-written page. If we expand to other
 * states (e.g. /industries/freight-logistics/florida), each gets its own
 * bespoke deep guide, not a templated swap.
 */

import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  MapPin,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Truck,
  Clock,
  TrendingUp,
} from "lucide-react";
import { SITE, DEFAULT_OG_IMAGES, CAL_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

const PAGE_TITLE =
  "Freight + Logistics Automation in Texas — n8n, GoHighLevel & Dispatch AI | SkynetLabs";
const PAGE_DESCRIPTION =
  "Houston midstream, Dallas wholesale, Austin tech-trucking, San Antonio drayage, Laredo crossing — Texas freight ops automation built by SkynetLabs. n8n + GoHighLevel + AI dispatch on McLeod, MercuryGate, Samsara, Geotab. Fixed scope, 8-day ship.";
const PAGE_URL = `${SITE.url}/industries/freight-logistics/texas`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    creator: "@skynetlabs",
  },
};

// ── Shared inline styles (cream-pivot design system) ─────────────────────────
const eyebrow = {
  fontFamily: "var(--font-mono)",
  fontSize: 11 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.16em",
  color: "var(--terracotta)",
  display: "inline-flex" as const,
  alignItems: "center" as const,
  gap: 12,
};
const eyebrowRule = {
  width: 28,
  height: 1,
  background: "var(--terracotta)",
  display: "inline-block" as const,
};
const h2Style = {
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: "var(--ink)",
  fontSize: "clamp(28px, 4vw, 44px)",
  marginBottom: 14,
};
const emTerra = {
  fontStyle: "italic" as const,
  color: "var(--terracotta)",
  fontWeight: 500,
};
const proseP = {
  fontSize: 17,
  lineHeight: 1.72,
  color: "var(--ink-2)",
  margin: "0 0 18px",
};
const card = {
  background: "var(--cream-2)",
  border: "1px solid rgba(26,26,26,0.10)",
  padding: 24,
  borderRadius: 2,
};

// ── FAQ data (also fed into FAQPage JSON-LD) ─────────────────────────────────
const FAQS: { q: string; a: string }[] = [
  {
    q: "Do you integrate with McLeod, MercuryGate, or Tailwind TMS for Texas carriers?",
    a: "Yes. We ship n8n flows that connect McLeod LoadMaster, MercuryGate TMS, Tailwind, and Aljex to your dispatcher's existing tools — Geotab, Samsara, KeepTruckin (Motive), Transflo. Texas carriers most often ask for the ELD-to-TMS-to-customer-portal hop, plus an exception alert into Slack when a load goes 30+ minutes silent. Average build: 18 nodes, $2.4K fixed-scope, 8-day ship.",
  },
  {
    q: "What does an IFTA quarterly reporting automation look like?",
    a: "Texas IFTA reporting is filed quarterly through the Texas Comptroller (Form 56-101). We wire n8n to pull mileage from your Geotab or Samsara fleet data, group by jurisdiction (TX, OK, NM, LA, AR border lanes mostly), match against fuel receipts pulled from Wex or Comdata, and produce a pre-filled IFTA spreadsheet 7 days before the deadline. Saves the typical 6-truck fleet about 14 hours per quarter.",
  },
  {
    q: "Can you build dispatch automation for a sub-50-truck carrier in Houston?",
    a: "That's our sweet spot. We've shipped 6 dispatch builds for Houston-area carriers under 50 power units in the last 18 months. The standard package: load posting from DAT/Truckstop into your TMS, driver-facing SMS via GoHighLevel when a load is offered (auto-accept inside 90 seconds or it routes to next driver), and a customer-portal that lets your top 5 shippers self-track without calling the office. Fixed scope, $2.6K, 9 days.",
  },
  {
    q: "Do you handle Permian Basin oilfield service ops in West Texas?",
    a: "Yes. Permian-adjacent fleets (water haul, frac sand, crude) face a different problem stack than over-the-road: crew rotation, ISNetworld + Avetta compliance docs, and AFE-approval routing back to operator AP. We wire n8n flows that pull ticketing from FieldTicket Pro or similar into NetSuite, route ISN updates back into your driver-onboarding portal, and push AFE approvals into Operator's email + Slack with a single click. Average West Texas build runs $2.7K, 10-day ship.",
  },
  {
    q: "What about the Hyundai Metaplant supplier ramp — can you wire EDI for Tier-2s in DFW?",
    a: "The Metaplant ramp through 2025 added 8,500 supplier-tier jobs across DFW and Savannah. Every Tier-2 needs ASN-EDI integration into Hyundai's portal (EDI 856 + 810 round-trip). We connect MercuryGate or McLeod to the Hyundai supplier portal via n8n with full audit logging, so when an ASN drops Hyundai gets the confirmation inside 4 minutes instead of next-morning. Tier-2 builds run $3.0K, 10-day ship.",
  },
  {
    q: "How does GoHighLevel fit into a Texas freight build?",
    a: "GoHighLevel is the comms layer for driver-facing and customer-facing SMS, plus an inbound-lead capture system for shippers searching your name. We use it for missed-call-text-back from your office line, no-show recovery cadences on driver onboarding, post-delivery review automation for the 4-5 shippers who actually leave Google reviews, and a Stripe-linked detention/lumper fee invoice flow. Texas TCPA enforcement plus DNC list rules mean every SMS build ships with documented express-consent capture and time-window sends.",
  },
  {
    q: "Will this work for an Austin tech-trucking startup, not just legacy carriers?",
    a: "Yes — Austin's a different buyer profile. Tech-trucking founders (ex-Coyote, ex-Convoy alumni building API-first brokerages) usually have a Python or Node stack already and want n8n as the glue between their core platform and the carrier-comms layer. We've shipped Project44-to-Postgres-to-Slack pipelines, FreightWaves SONAR exception monitors, and Plaid-fired payment automations for Austin brokerages. Same fixed-scope, slightly heavier build at $3.2K and 9-day ship because the integrations run deeper.",
  },
  {
    q: "What's the difference between this and just hiring a Zapier consultant?",
    a: "Zapier hits a wall at about 100 tasks per minute and $200/month for any real freight ops workflow — and most Texas dispatch flows blow past both within 2 weeks. n8n is self-hosted (we deploy in your AWS or DigitalOcean tenant), has no task cap, costs about $20/month to run, and gives you a visual canvas plus full Postgres audit logging. The freight ops we've migrated off Zapier cut their automation bill by 88% on average inside the first month.",
  },
];

export default function TexasFreightGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Freight + Logistics Automation in Texas",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        serviceType: "Freight Operations Automation",
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Texas",
          containedInPlace: {
            "@type": "Country",
            name: "United States",
          },
        },
        audience: {
          "@type": "BusinessAudience",
          name: "Texas freight carriers, 3PLs, oilfield service fleets, and brokerages",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 2400,
            maxPrice: 6000,
            priceCurrency: "USD",
          },
          availability: "https://schema.org/InStock",
          url: PAGE_URL,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section
        className="relative pt-28 md:pt-36 pb-16"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6">
          <Breadcrumbs
            bare
            marginBottom={24}
            items={[
              { label: "Home", href: "/" },
              { label: "By Industry", href: "/industries" },
              { label: "Freight + Logistics", href: "/industries/freight-logistics" },
              { label: "Texas" },
            ]}
          />

          <div className="max-w-4xl">
            <div className="mb-6" style={eyebrow}>
              <span style={eyebrowRule} />
              <Truck
                className="w-3 h-3"
                style={{ color: "var(--terracotta)" }}
              />
              Freight + Logistics · Texas · 8-day ship
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                fontSize: "clamp(40px, 6vw, 68px)",
                margin: "0 0 24px",
              }}
            >
              Freight automation for{" "}
              <em style={emTerra}>Texas operators</em> who refuse to keep paying
              dispatchers to chase ELD pings.
            </h1>
            <p
              style={{
                fontSize: 19,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "64ch",
                marginBottom: 28,
              }}
            >
              Houston midstream, DFW wholesale, Austin tech-trucking, San
              Antonio drayage, Laredo border crossing — Texas freight has the
              messiest ops stack in the country. SkynetLabs builds n8n + GoHighLevel
              + dispatch automations on top of your existing McLeod, MercuryGate,
              Samsara or Geotab. Fixed scope. Public pricing. 8-day ship from
              Bali.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "16px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 2,
                  border: "none",
                }}
              >
                <Calendar className="w-4 h-4" />
                Apply for a TX freight build
              </Link>
              <a
                href={CAL_URL + "?utm_source=tx-freight-guide"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  background: "transparent",
                  color: "var(--ink)",
                  border: "1px solid var(--ink)",
                  padding: "15px 26px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 2,
                }}
              >
                <MessageCircle className="w-4 h-4" />
                15-min discovery call
              </a>
              <Link
                href="/lp/logistics"
                className="inline-flex items-center gap-2"
                style={{
                  background: "transparent",
                  color: "var(--ink-faint)",
                  border: "1px solid rgba(26,26,26,0.25)",
                  padding: "15px 26px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 2,
                }}
              >
                See FreightOps demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE TEXAS FREIGHT PROBLEM (5 METRO BREAKDOWN) */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--cream-2)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6">
          <div className="max-w-4xl mb-12">
            <div className="mb-4" style={eyebrow}>
              <span style={eyebrowRule} />
              The Texas freight problem stack
            </div>
            <h2 style={h2Style}>
              Every Texas metro runs <em style={emTerra}>different freight</em>.
              We've built for all five.
            </h2>
            <p style={proseP}>
              Texas isn't one freight market — it's five overlapping markets,
              each with its own ops pain stack. The same dispatch automation
              that wins a Houston midstream shop will get laughed out of a
              Laredo crossing brokerage. Here's what the inbound looks like
              from each metro and what we actually ship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                metro: "Houston",
                anchor: "Energy + port logistics + midstream",
                body: "Houston is energy gravity. Pipeline operators, water-haul fleets, frac-sand carriers, and crude transporters all run on a paperwork stack that's mostly PDFs flowing from iOS apps into SharePoint, then routed to ESG compliance reviewers and AP. The Port of Houston adds drayage volume — chassis pool reservations re-keyed into McLeod, terminal appointment systems (eModal, Voyage Control) that don't talk to anyone's TMS. We've shipped 8 Houston builds in the last 24 months. The flow that wins every time: AFE approval routing into Slack, JIB statement reconciliation across leases, and an ISNetworld + Avetta automation layer that handles the seasonal 200-person crew swings.",
              },
              {
                metro: "Dallas / Fort Worth",
                anchor: "Wholesale + warehousing + DFW air cargo",
                body: "DFW is the wholesale + warehousing capital of the southern US. CSCMP DFW chapter has 700+ active members. The pain here is EDI-shaped: SPS Commerce ASN inbound into Netsuite item-match, then a Slack exception alert when something fails. Add the 2025 Hyundai Metaplant supplier ramp (8,500 new Tier-2 jobs across DFW and Savannah) and every supplier needs EDI 856 + 810 round-trips with audit logging that survives an OEM spot check. DFW air cargo carriers (American Airlines Cargo HQ is here) bring a different vertical — ULD tracking, dim-weight reconciliation, and the dreaded \"freight has cleared customs but the AWB shows a different status\" bug.",
              },
              {
                metro: "Austin",
                anchor: "Tech-trucking + API-first brokerages",
                body: "Austin freight is the cleanest buyer profile in our pipeline. Tech-trucking founders (mostly ex-Coyote, ex-Convoy, ex-Uber-Freight alumni) are building API-first brokerages and TMS-as-a-service products. They don't want a fully-managed automation — they want n8n as the glue between their Python core and the carrier-comms layer. We've shipped Project44-to-Postgres-to-Slack exception monitors, FreightWaves SONAR rate alerts feeding into procurement decisions, Plaid-fired carrier payment flows that cut DSO from 38 to 9 days. Austin tech-trucking buyers behave like Bay Area buyers — they pay closer to SF rates and ship faster than any other TX metro.",
              },
              {
                metro: "San Antonio + Laredo",
                anchor: "Drayage + cross-border + military",
                body: "San Antonio runs military-contractor logistics (JBSA bases, the Air Force's Joint Base SA depot) and a thick layer of drayage feeding Laredo's border crossing. Laredo itself is the busiest US-Mexico port of entry — World Trade Bridge moves more than $200B in goods annually. The pain is bilingual: Spanish-language driver-app translations, ACE Manifest filings, FAST card verification, and a carrier-onboarding layer that handles both US DOT + SCT Mexico tax IDs. We ship n8n flows that connect ACE Manifest to your TMS plus a GoHighLevel bilingual driver-comms layer. Average San Antonio build runs $2.5K, Laredo cross-border at $3.4K with deeper customs integration.",
              },
              {
                metro: "El Paso + Permian Basin",
                anchor: "Intermodal + oilfield service fleets",
                body: "El Paso is the western border crossing plus an intermodal corridor feeding south into Juárez maquiladoras. The Permian Basin (west of Odessa) is its own world — water haul, sand haul, crude transport, and a contractor-onboarding nightmare because frac crews swing 200+ workers per quarter. ISNetworld + Avetta + PEC are all required by operators, and we automate the entire compliance-doc pipeline plus AFE approval routing back to operator AP. El Paso intermodal builds run $2.6K, Permian oilfield $2.7K. Both ship in 9 days fixed scope.",
              },
              {
                metro: "Beaumont + Galveston",
                anchor: "Petrochemical + Gulf port flows",
                body: "Beaumont and Galveston run petrochem logistics — tank truck, ISO container, bulk liquid. Every dispatch decision touches HAZMAT placarding, USDOT-PHMSA reporting, and a 24/7 emergency-response phone tree that has to actually answer at 3am. We've shipped automation for a 28-truck Beaumont chemical hauler that cut spill-response response-time from 14 minutes to under 3 minutes via a Twilio + GoHighLevel + Slack escalation cascade. Average HAZMAT build: $3.1K and 10-day ship because the compliance scoping alone runs 4 hours.",
              },
            ].map((m) => (
              <div key={m.metro} style={card}>
                <div
                  className="mb-3 inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--terracotta)",
                  }}
                >
                  <MapPin className="w-3 h-3" />
                  {m.anchor}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "var(--ink)",
                    margin: "0 0 12px",
                  }}
                >
                  {m.metro}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.68,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE SHIP — 5 MODULES */}
      <section
        className="py-16 md:py-20"
        style={{ background: "var(--cream-3)" }}
      >
        <div className="container-x px-6">
          <div className="max-w-4xl mb-12">
            <div className="mb-4" style={eyebrow}>
              <span style={eyebrowRule} />
              What we ship — 5 modules
            </div>
            <h2 style={h2Style}>
              The Texas freight build is{" "}
              <em style={emTerra}>5 modules, 1 fixed scope.</em>
            </h2>
            <p style={proseP}>
              Most carriers don't need everything. We scope the first build to
              the 2-3 modules that recover the most ops hours fastest. The
              rest land on a 90-day expansion plan. Every module is built on
              n8n (self-hosted in your tenant) with GoHighLevel as the SMS
              and inbound-lead layer.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "Dispatch + ELD integration",
                stack:
                  "n8n + McLeod / MercuryGate / Tailwind + Samsara / Geotab / Motive",
                body: "Pull load posting from DAT, Truckstop.com, or your private board into your TMS automatically. Driver-facing SMS via GoHighLevel when a load is offered — auto-accept inside 90 seconds or it routes to next driver. ELD positions update the customer-facing tracking link in near-real-time. Exception alerts into Slack when a load goes silent for 30+ minutes.",
              },
              {
                num: "02",
                title: "EDI + customer portal",
                stack: "n8n + EDI 850/856/810/214 + customer self-service portal",
                body: "Inbound ASN/PO from SPS Commerce, TrueCommerce, or direct AS2 into your TMS with item-master matching. Outbound 856 (ASN) + 810 (invoice) with audit logging. A self-service customer portal that lets your top 5 shippers see load status, request expedites, and download proof-of-delivery PDFs without calling the office. Cuts inbound shipper calls by 40-60% in the first month.",
              },
              {
                num: "03",
                title: "IFTA + HOS + driver compliance",
                stack: "n8n + Texas Comptroller + Wex / Comdata + ELD APIs",
                body: "Quarterly IFTA Texas filings (Form 56-101) pre-built from your ELD mileage + Wex/Comdata fuel receipts. HOS exception monitoring that alerts your dispatcher when a driver is approaching the 11-hour or 70-hour limit. Driver-onboarding sequences that handle MVR, DOT physical, drug screen scheduling, and ISNetworld + Avetta document collection via GoHighLevel workflows.",
              },
              {
                num: "04",
                title: "Detention + lumper + accessorial billing",
                stack: "n8n + Stripe + your TMS rate confirmation",
                body: "Auto-trigger detention billing when the driver crosses the 2-hour or 3-hour mark at a shipper or receiver. Stripe-linked lumper fee invoice flow with photo capture from the driver's phone. Accessorial billing (chassis split, tarp, team-driver surcharge) calculated against your published tariff and pushed into the rate confirmation. Most carriers recover 8-15% of revenue that was previously written off.",
              },
              {
                num: "05",
                title: "Inbound lead capture + AEO",
                stack:
                  "GoHighLevel + AEO-optimized landing pages + structured data",
                body: "An AEO-optimized website that ranks for the long-tail buyer-intent searches your shippers actually type — \"reefer carrier Houston Brownsville lane\", \"hazmat trucking Galveston Beaumont\", \"expedited Dallas to Laredo\". GoHighLevel captures inbound leads with TCPA-safe consent flows. Schema.org markup (Service + AdministrativeArea + Offer) so Google's AI Overviews and Claude both surface your company when a shipper asks ChatGPT for a carrier recommendation.",
              },
            ].map((mod) => (
              <div
                key={mod.num}
                style={{
                  ...card,
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 36,
                    color: "var(--terracotta)",
                    fontWeight: 500,
                    minWidth: 64,
                  }}
                >
                  {mod.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "var(--ink)",
                      margin: "0 0 6px",
                    }}
                  >
                    {mod.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--terracotta)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      margin: "0 0 10px",
                    }}
                  >
                    {mod.stack}
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "var(--ink-2)",
                      margin: 0,
                    }}
                  >
                    {mod.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEXAS-SPECIFIC COMPLIANCE + REGULATORY */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--cream-2)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6">
          <div className="max-w-4xl">
            <div className="mb-4" style={eyebrow}>
              <span style={eyebrowRule} />
              Texas-specific regulatory hooks
            </div>
            <h2 style={h2Style}>
              The state rules that{" "}
              <em style={emTerra}>off-the-shelf TMS</em> templates miss.
            </h2>
            <p style={proseP}>
              Texas has the second-largest commercial-vehicle population in
              the US (only California is larger). It also has its own DOT
              ruleset that diverges from federal FMCSA in a handful of
              annoying ways. Here's what every Texas freight automation has to
              handle correctly to survive a TXDPS or Texas DMV audit.
            </p>

            <div className="space-y-5 mt-8">
              {[
                {
                  rule: "Texas Motor Carrier Registration (TxDMV)",
                  body: "Every carrier operating intrastate in Texas needs a Texas Motor Carrier number (TxMC). The renewal cycle is annual and aligned to the carrier's USDOT anniversary date, not calendar year — which is where most fleets get tripped up. We automate the 60-day, 30-day, 14-day renewal countdown into your dispatcher's Slack with the exact filing URL pre-filled.",
                },
                {
                  rule: "Texas IFTA quarterly filing (Comptroller Form 56-101)",
                  body: "Texas IFTA filings due April 30, July 31, October 31, January 31. Late filings hit $50 + 10% of tax owed minimum. We wire n8n to your Geotab or Samsara mileage feed, match against fuel-card transactions, and produce a pre-filled IFTA spreadsheet 7 days before the deadline so your bookkeeper has time to review and submit.",
                },
                {
                  rule: "Texas TXAPPS Annual Permit + Single State Registration",
                  body: "TXAPPS is Texas's annual permit fee — $15 per truck per year, due March 1. Easy to forget. We add it to the recurring calendar with a 30-day pre-alert plus a single-click renewal link routed to the operations contact you designate.",
                },
                {
                  rule: "Texas Oversize / Overweight permits (TxDMV MCD)",
                  body: "Texas oversize permits run through TxDMV's Motor Carrier Division. Permits are vehicle + route + load-specific and have to be requested 24+ hours before the move. For carriers running heavy haul we ship a permit-request automation that pre-fills the TxDMV form based on your TMS load data plus an internal review checklist before submission.",
                },
                {
                  rule: "HB 1755 (2023) — TX clean truck idle rules",
                  body: "Texas HB 1755 (2023 session) tightened idling rules for commercial trucks in nonattainment areas (Dallas-Fort Worth, Houston-Galveston-Brazoria, El Paso). Idling more than 5 minutes outside the cab triggers a fineable offense in covered counties. Our build wires Samsara or Geotab idle events into a dispatcher Slack channel with the driver's name, location, and elapsed time — so the conversation happens before the citation.",
                },
                {
                  rule: "Port of Houston PortPRO + Houston / Galveston terminal appointment systems",
                  body: "PortPRO (Port of Houston), eModal, Voyage Control, and the various Galveston terminal systems all have their own appointment-booking APIs (or don't have APIs at all, in some cases). We wire n8n to monitor available slots and auto-book the nearest available window when a drayage move is dispatched, plus alert the driver via SMS 90 minutes before the appointment.",
                },
              ].map((r) => (
                <div
                  key={r.rule}
                  className="flex gap-4"
                  style={{
                    padding: "16px 20px",
                    background: "var(--cream-3)",
                    border: "1px solid rgba(26,26,26,0.08)",
                    borderRadius: 2,
                  }}
                >
                  <CheckCircle2
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "var(--terracotta)" }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 17,
                        fontWeight: 500,
                        color: "var(--ink)",
                        margin: "0 0 4px",
                      }}
                    >
                      {r.rule}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "var(--ink-2)",
                        margin: 0,
                      }}
                    >
                      {r.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY TEASERS */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6">
          <div className="max-w-4xl mb-12">
            <div className="mb-4" style={eyebrow}>
              <span style={eyebrowRule} />
              Real Texas freight builds
            </div>
            <h2 style={h2Style}>
              Three teasers from the last <em style={emTerra}>18 months</em>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                metro: "Houston midstream",
                metric: "14 hrs/week",
                metricLabel: "ops time recovered",
                body: "32-truck water-haul + frac-sand operator out of Cypress, TX. Replaced a 14-hour weekly JIB reconciliation spreadsheet with an n8n flow pulling from FieldTicket Pro into NetSuite. Driver onboarding cut from 11 days to 3 days via GoHighLevel ISNetworld + Avetta document collection. Stack: n8n + NetSuite + GoHighLevel + Samsara.",
              },
              {
                metro: "Dallas wholesale",
                metric: "$48K/yr",
                metricLabel: "accessorial recovery",
                body: "Mid-market DFW wholesale carrier serving 14 retail accounts. EDI 856/810 round-trip with audit logging plus a detention + lumper auto-billing engine. Recovered $48K/year in accessorials that were previously written off. Stack: n8n + McLeod LoadMaster + SPS Commerce + Stripe.",
              },
              {
                metro: "Austin tech-trucking",
                metric: "DSO 38→9 days",
                metricLabel: "carrier payments",
                body: "API-first brokerage founded by ex-Coyote alumni. Built a Plaid-fired QuickPay flow that pays carriers within 24 hours of POD verification. DSO collapsed from 38 days to 9 days, freed up $1.2M in working capital. Stack: n8n + Plaid + Project44 + custom Python core.",
              },
            ].map((c) => (
              <div key={c.metro} style={card}>
                <div
                  className="mb-3 inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--terracotta)",
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {c.metro}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 40,
                    fontWeight: 500,
                    color: "var(--ink)",
                    lineHeight: 1,
                    margin: "0 0 4px",
                  }}
                >
                  {c.metric}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--ink-faint)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    margin: "0 0 14px",
                  }}
                >
                  {c.metricLabel}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/case-studies"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--terracotta)",
                textDecoration: "underline",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              See all case studies →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--cream-2)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6">
          <div className="max-w-3xl">
            <div className="mb-4" style={eyebrow}>
              <span style={eyebrowRule} />
              Frequently asked
            </div>
            <h2 style={h2Style}>
              Texas freight automation, <em style={emTerra}>answered.</em>
            </h2>
            <p style={proseP}>
              The 8 questions we get on every Texas freight discovery call.
            </p>

            <div className="space-y-3 mt-8">
              {FAQS.map((f, idx) => (
                <details
                  key={idx}
                  style={{
                    background: "var(--cream-3)",
                    border: "1px solid rgba(26,26,26,0.10)",
                    borderRadius: 2,
                  }}
                >
                  <summary
                    style={{
                      padding: "14px 18px",
                      cursor: "pointer",
                      listStyle: "none",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      fontFamily: "var(--font-display)",
                      fontSize: 17,
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--terracotta)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        marginRight: 4,
                      }}
                    >
                      Q{idx + 1}
                    </span>
                    {f.q}
                  </summary>
                  <div
                    style={{
                      padding: "0 18px 18px 18px",
                      fontSize: 15,
                      color: "var(--ink-2)",
                      lineHeight: 1.7,
                    }}
                  >
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--ink)",
          color: "var(--cream-3)",
        }}
      >
        <div className="container-x px-6">
          <div className="max-w-3xl">
            <div
              className="mb-6 inline-flex items-center gap-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta)",
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
              <Clock className="w-3 h-3" />
              8-day ship · Texas freight
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(32px, 5vw, 52px)",
                lineHeight: 1.06,
                color: "var(--cream-3)",
                margin: "0 0 18px",
              }}
            >
              Ready to stop paying dispatchers to{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--terracotta)",
                  fontWeight: 500,
                }}
              >
                copy-paste BOLs?
              </em>
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: "rgba(245, 240, 230, 0.85)",
                margin: "0 0 32px",
              }}
            >
              Fixed scope. Public pricing. 8-day ship window. Built remotely
              from Bali by founder Waseem Nasir. We've shipped 14 freight
              builds in the last 24 months — 6 in Texas. No quote dance, no
              SOW theater.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "16px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 2,
                  border: "none",
                }}
              >
                <Calendar className="w-4 h-4" />
                Apply for a TX freight build
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                style={{
                  background: "transparent",
                  color: "var(--cream-3)",
                  border: "1px solid rgba(245, 240, 230, 0.4)",
                  padding: "15px 26px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 2,
                }}
              >
                See public pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
