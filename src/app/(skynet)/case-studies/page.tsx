import Link from "next/link";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES, twitterFromOpenGraph } from "@/lib/site";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";
import JsonLd from "@/components/JsonLd";

/**
 * Card presentation metadata, keyed by case-study `slug`.
 *
 * Previously the index page injected a static `content/case-studies.html`
 * via dangerouslySetInnerHTML and stitched card→slug links by regex + array
 * index — fragile: any drift between the HTML card order and CASE_STUDIES
 * broke every "Read full case study" link. Cards now render directly from
 * the CASE_STUDIES data array, so the link ALWAYS derives from `study.slug`
 * and can never misalign. This map only carries the legacy *presentation*
 * fields (gradient/tag class + the short card copy + the two outcome bullets)
 * that aren't already on the CaseStudy record; everything load-bearing (slug,
 * cover image, client/industry) comes straight from the data record.
 */
type CardMeta = {
  gradient: string; // .wn-x-thumb gN gradient class
  tagClass: string; // .wn-x-tag tN color class
  num: string; // "01 / 09" badge
  title: string; // card headline
  blurb: string; // card paragraph
  outcomes: [string, string]; // 2 arrow-bullet outcomes
};

const CARD_META: Record<string, CardMeta> = {
  "eu-logistics-email-triage-n8n": {
    gradient: "g1",
    tagClass: "t-auto",
    num: "01 / 09",
    title:
      "EU logistics group — email triage that doesn't read your CC field wrong",
    blurb:
      "17-node n8n + GPT-4o pipeline drafting Gmail replies for a French mining-logistics operator. Five-condition gate, accent-safe parsing, thread-scoped context.",
    outcomes: [
      "Cut response time 6h → 6min on routine maintenance threads",
      "Replaced 4 paid tools with one stack",
    ],
  },
  "bali-wellness-conversion-funnel": {
    gradient: "g2",
    tagClass: "t-web",
    num: "02 / 09",
    title:
      'Bali wellness practitioner — a funnel that books instead of "informs"',
    blurb:
      "Single-page conversion build with embedded scheduling, voice-locked copy, and an objection block that runs the conversation she gets in her DMs daily.",
    outcomes: [
      "Doubled appointments without ads",
      "Shipped in 9 days from brief to live",
    ],
  },
  "manhattan-dental-atelier-flagship": {
    gradient: "g3",
    tagClass: "t-web",
    num: "03 / 09",
    title: "Manhattan cosmetic dental atelier — flagship build, not a template",
    blurb:
      "14-section bespoke Next.js site. Editorial press strip, transparent tiered investment, named-bench credibility, a 4-step inquiry funnel with HIPAA-aware intake.",
    outcomes: [
      "Shipped flagship in 12 days end-to-end",
      "Replaced 4 paid tools with one stack",
    ],
  },
  "northeast-recovery-brand-intake-rescue": {
    gradient: "g4",
    tagClass: "t-cons",
    num: "04 / 09",
    title: "Northeast US clinical recovery network — brand & intake rescue",
    blurb:
      "Inherited a half-built brand kit and a broken intake form. Rebuilt the palette, swapped in the founder's real logo asset, wired a working Google Form on a Sites iframe.",
    outcomes: [
      "Cut response time 6h → 6min on new-patient intake",
      "Shipped corrective ship in 3 revisions, 1 working day",
    ],
  },
  "us-insurance-gohighlevel-rebuild": {
    gradient: "g5",
    tagClass: "t-auto",
    num: "05 / 09",
    title: "US insurance retainer client — GHL pipeline rebuilt end-to-end",
    blurb:
      "Seventh GoHighLevel batch for the same operator: funnels, drip cadences, pipeline stages, calendar links, SMS templates — all rebuilt from a stagnant prior install.",
    outcomes: [
      "Removed 3hrs/day of manual triage",
      "Replaced 4 paid tools with one stack",
    ],
  },
  "internal-carousel-content-engine-200-asset": {
    gradient: "g6",
    tagClass: "t-ai",
    num: "06 / 09",
    title: "Internal content engine — 200-asset carousel pipeline",
    blurb:
      "n8n-orchestrated pipeline turning a single topic brief into 200 PNG-ready carousel slides, with an automated image-render pipeline, image rotation log, and zero AI-tell phrasing.",
    outcomes: [
      "Removed 3hrs/day of manual triage on content batching",
      "Shipped in 9 days from null to first batch",
    ],
  },
  "premium-auto-dealership-network-demo": {
    gradient: "g7",
    tagClass: "t-web",
    num: "07 / 09",
    title: "Premium auto dealership network — demo that closes in the meeting",
    blurb:
      "Multi-location dealer site demo with finance-application gate, inventory tile grid, and a trade-in flow that doesn't make you log in to see a price range.",
    outcomes: [
      "Shipped pitch demo in 7 days",
      "Scaled to 9 countries with 1 founder",
    ],
  },
  "ksa-fashion-retailer-shopify-ecommerce": {
    gradient: "g8",
    tagClass: "t-web",
    num: "08 / 09",
    title: "KSA fashion retailer — e-commerce shoe store from null",
    blurb:
      "Shopify build with size-region logic, Arabic-English bilingual surfaces, courier-rate calc on the cart page, and a returns flow that doesn't punish the customer.",
    outcomes: [
      "Doubled appointments without ads (showroom bookings)",
      "Shipped in 14 days store-to-launch",
    ],
  },
  "saas-multi-channel-aeo-content-engine": {
    gradient: "g9",
    tagClass: "t-ai",
    num: "09 / 09",
    title: "Multi-channel SaaS launch — AEO content engine across 5 channels",
    blurb:
      "Daily voice-locked content pack across LinkedIn, FB, IG, YouTube and TikTok, generated by one script and linted against 60+ AI-writing tells before render.",
    outcomes: [
      "Removed 3hrs/day of manual triage on content QA",
      "Scaled to 9 countries with 1 founder",
    ],
  },
};

const ORDERED_STUDIES: CaseStudy[] = [...CASE_STUDIES].sort(
  (a, b) => a.position - b.position,
);

export const metadata: Metadata = {
  title: "Case Studies — 9 builds across automation, websites & AI content",
  description:
    "Nine anonymized client wins from SkynetLabs: n8n automation, flagship websites, AEO content engines and CRM rebuilds. Honest outcomes, no vanity metrics.",
  alternates: { canonical: `${SITE.url}/case-studies` },
  openGraph: {
    title: "SkynetLabs Case Studies — 9 shipped builds",
    description:
      "EU logistics, Manhattan dental, Bali wellness, KSA retail and more — anonymized where contracts require it.",
    url: `${SITE.url}/case-studies`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: twitterFromOpenGraph({
    title: "SkynetLabs Case Studies — 9 shipped builds",
    description:
      "EU logistics, Manhattan dental, Bali wellness, KSA retail and more — anonymized where contracts require it.",
  }),
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Case Studies",
  description:
    "Nine anonymized client wins across automation, websites, AEO content engines and CRM rebuilds.",
  url: `${SITE.url}/case-studies`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
  about: { "@id": `${SITE.url}/#organization` },
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={schema} />

      <div className="sky">
        {/* HERO — skyv3 design language */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                Case studies&nbsp;· <strong>9 shipped builds</strong>&nbsp;·
                2024–2026
              </div>

              <h1>
                Real numbers. <em>Real builds.</em> No vanity metrics.
              </h1>

              <p className="hero-sub">
                Dental intake completion <strong>34% → 71%</strong>. An EU
                logistics inbox triaged from{" "}
                <strong>6 hours to 6 minutes</strong>. Dispatcher load cut from{" "}
                <strong>4 hours a day to 45 minutes</strong>. Each one
                anonymized where the contract requires it — the outcomes stay
                honest.
              </p>

              <div className="cta-row">
                <Link href="/discovery-call" className="btn-primary">
                  Book a free 30-min audit →
                </Link>
                <Link href="/pricing" className="btn-line">
                  See pricing
                </Link>
              </div>

              <div className="featured-in">
                <span className="featured-lbl">Proof</span>
                <span>Cosmetic dental practice</span>
                <span>Clinical recovery network</span>
                <span>US insurance client</span>
                <span>9 countries served</span>
              </div>
            </div>
          </div>
        </section>

        {/* CASE-STUDY GRID — rendered directly from CASE_STUDIES so every
            card→detail link derives from `study.slug` (cannot misalign).
            The wn-x-* card styles are scoped here and already map to the sky
            terracotta / sage / ochre tokens; kept intact to avoid breaking
            slug-derived links. */}
        <section className="section tinted cs-grid-wrap">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Selected work</span>
              <h2>
                Nine builds. <em>Honest outcomes.</em>
              </h2>
              <p className="section-sub">
                EU logistics. Manhattan dental. Bali wellness. KSA retail.
                Automation, flagship websites, AEO content engines and CRM
                rebuilds — the stack, the timeline and the result on every one.
              </p>
            </div>
          </div>
          <style>{`
          .cs-grid-wrap {
            --x-green: #C66B3F;
            --x-green-light: #C66B3F;
            --x-purple-light: #8A9A7B;
            --x-cyan: #C9A96E;
            --x-amber: #C9A96E;
          }
          .cs-grid-wrap .wn-x-grid {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 clamp(16px, 5vw, 24px);
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
          .cs-grid-wrap .wn-x-card {
            background: var(--cream-3);
            border: 1px solid rgba(26,26,26,0.14);
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 12px 32px rgba(26,26,26,0.08);
            transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
          }
          .cs-grid-wrap .wn-x-card:nth-child(odd) { transform: rotate(-0.3deg); }
          .cs-grid-wrap .wn-x-card:nth-child(even) { transform: rotate(0.3deg); }
          .cs-grid-wrap .wn-x-card:hover {
            transform: translateY(-4px);
            border-color: rgba(26,26,26,0.18);
            box-shadow: 0 16px 40px rgba(26,26,26,0.14);
          }
          .cs-grid-wrap .wn-x-thumb {
            aspect-ratio: 16 / 9;
            width: 100%;
            display: block;
            position: relative;
            overflow: hidden;
            text-decoration: none;
          }
          .cs-grid-wrap .wn-x-thumb img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .cs-grid-wrap .wn-x-thumb-scrim {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(26,26,26,0) 55%, rgba(26,26,26,0.45) 100%);
            z-index: 2;
          }
          .cs-grid-wrap .wn-x-thumb-num {
            position: absolute;
            top: 0.85rem;
            right: 0.95rem;
            font-size: 0.78rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.92);
            background: rgba(0, 0, 0, 0.32);
            backdrop-filter: blur(6px);
            padding: 0.25rem 0.55rem;
            border-radius: 6px;
            letter-spacing: 0.04em;
            z-index: 3;
          }
          .cs-grid-wrap .wn-x-thumb.g1 { background: linear-gradient(135deg, #C66B3F 0%, #6B2C2C 100%); }
          .cs-grid-wrap .wn-x-thumb.g2 { background: linear-gradient(135deg, #8A9A7B 0%, #6B2C2C 50%, #C66B3F 100%); }
          .cs-grid-wrap .wn-x-thumb.g3 { background: linear-gradient(135deg, #C9A96E 0%, #C66B3F 100%); }
          .cs-grid-wrap .wn-x-thumb.g4 { background: linear-gradient(135deg, #C66B3F 0%, #8A9A7B 100%); }
          .cs-grid-wrap .wn-x-thumb.g5 { background: linear-gradient(135deg, #EDE8DC 0%, #C66B3F 90%); }
          .cs-grid-wrap .wn-x-thumb.g6 { background: linear-gradient(135deg, #8A9A7B 0%, #C9A96E 100%); }
          .cs-grid-wrap .wn-x-thumb.g7 { background: linear-gradient(135deg, #C9A96E 0%, #C66B3F 60%, #8A9A7B 100%); }
          .cs-grid-wrap .wn-x-thumb.g8 { background: linear-gradient(135deg, #6B2C2C 0%, #C9A96E 100%); }
          .cs-grid-wrap .wn-x-thumb.g9 { background: linear-gradient(135deg, #FAF7F0 0%, #8A9A7B 70%, #C66B3F 100%); }
          .cs-grid-wrap .wn-x-card-body {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            flex: 1;
          }
          .cs-grid-wrap .wn-x-tag {
            display: inline-block;
            align-self: flex-start;
            padding: 0.2rem 0.6rem;
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            border-radius: 4px;
          }
          .cs-grid-wrap .wn-x-tag.t-auto { background: rgba(198,107,63,0.12); color: var(--x-green-light); }
          .cs-grid-wrap .wn-x-tag.t-web { background: rgba(138,154,123,0.16); color: var(--x-purple-light); }
          .cs-grid-wrap .wn-x-tag.t-ai { background: rgba(201,169,110,0.16); color: var(--x-cyan); }
          .cs-grid-wrap .wn-x-tag.t-cons { background: rgba(201,169,110,0.16); color: var(--x-amber); }
          .cs-grid-wrap .wn-x-card-h {
            font-family: var(--font-display);
            font-size: 1.08rem;
            font-weight: 700;
            color: var(--ink);
            margin: 0;
            line-height: 1.3;
            letter-spacing: -0.01em;
          }
          .cs-grid-wrap .wn-x-card-h a { color: inherit; text-decoration: none; }
          .cs-grid-wrap .wn-x-card-h a:hover { color: var(--terracotta); }
          .cs-grid-wrap .wn-x-card-p {
            font-size: 0.92rem;
            color: var(--ink-2);
            margin: 0;
            line-height: 1.5;
          }
          .cs-grid-wrap .wn-x-outcomes {
            list-style: none;
            padding: 0.85rem 0 0;
            margin: auto 0 0;
            border-top: 1px solid rgba(26,26,26,0.10);
            display: grid;
            gap: 0.45rem;
          }
          .cs-grid-wrap .wn-x-outcomes li {
            font-size: 0.86rem;
            color: var(--ink);
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            padding-top: 0.45rem;
          }
          .cs-grid-wrap .wn-x-outcomes li::before {
            content: "→";
            color: var(--x-green-light);
            font-weight: 700;
            flex-shrink: 0;
          }
          .cs-grid-wrap .wn-x-readmore {
            display: inline-flex;
            align-items: center;
            gap: .4rem;
            margin-top: .85rem;
            color: var(--terracotta);
            font-size: .85rem;
            font-weight: 600;
            text-decoration: none;
          }
          .cs-grid-wrap .wn-x-readmore:hover { text-decoration: underline; }
          @media (max-width: 1024px) {
            .cs-grid-wrap .wn-x-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 640px) {
            .cs-grid-wrap .wn-x-grid { grid-template-columns: 1fr; gap: 1rem; }
            .cs-grid-wrap .wn-x-card { transform: none !important; }
          }
        `}</style>

          <section className="wn-x-grid" aria-label="Case studies">
            {ORDERED_STUDIES.map((study) => {
              const meta = CARD_META[study.slug];
              if (!meta) return null;
              const href = `/case-studies/${study.slug}`;
              return (
                <article className="wn-x-card" key={study.slug}>
                  <Link
                    href={href}
                    className={`wn-x-thumb ${meta.gradient}`}
                    aria-label={`${study.clientName} — read full case study`}
                  >
                    <img
                      src={study.coverImage}
                      alt={`${study.clientName} — ${study.industry}`}
                      loading="lazy"
                    />
                    <span className="wn-x-thumb-scrim" aria-hidden="true" />
                    <span className="wn-x-thumb-num">{meta.num}</span>
                  </Link>
                  <div className="wn-x-card-body">
                    <span className={`wn-x-tag ${meta.tagClass}`}>
                      {study.industryTag}
                    </span>
                    <h3 className="wn-x-card-h">
                      <Link href={href}>{meta.title}</Link>
                    </h3>
                    <p className="wn-x-card-p">{meta.blurb}</p>
                    <ul className="wn-x-outcomes">
                      {meta.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                    <Link href={href} className="wn-x-readmore">
                      Read full case study →
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        </section>

        {/* CLOSER — skyv3 design language */}
        <section className="closer">
          <span className="closer-scarcity">4 build slots open this month</span>
          <h2>
            Want your name on this <em>page next quarter?</em>
          </h2>
          <p>
            9 builds shipped. 4 slots open per month. A 30-min call decides if
            we&apos;re the right fit — yes or no in 8 hours.
          </p>
          <div className="cta-row">
            <Link href="/discovery-call" className="btn-primary">
              Book a free 30-min audit →
            </Link>
            <Link href="/pricing" className="btn-line">
              See pricing
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
