import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { howToSchema, breadcrumbSchema } from "@/lib/schema";
import Checker from "./Checker";
import { ShieldCheck, Mail, Building2, ArrowRight } from "lucide-react";

const PATH = "/tools/cold-outreach-compliance-checker";

export const metadata: Metadata = {
  title:
    "Free Cold Outreach Compliance Checker — CAN-SPAM & SMS Rules | SkynetJoe",
  description:
    "Paste your cold email or SMS copy and check it against CAN-SPAM's postal address, opt-out, and deceptive-subject rules, plus a spam-trigger-word scan. Not legal advice. Free, no signup.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Cold Outreach Compliance Checker — CAN-SPAM basics, checked live",
    description:
      "Rule-by-rule check of your cold email/SMS copy against CAN-SPAM and SMS opt-out basics, with citations to the actual FTC/FCC guidance each check tests.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Outreach Compliance Checker · free, not legal advice",
    description:
      "Paste your outreach copy, get a rule-by-rule CAN-SPAM/SMS check with citations. Deterministic heuristics, not a legal opinion.",
  },
};

const faqs = [
  {
    q: "Is this legal advice?",
    a: "No. This tool runs deterministic text pattern checks against public FTC CAN-SPAM guidance and FCC TCPA/Telemarketing Sales Rule guidance. It cannot verify your actual consent records, your full sending infrastructure, or how a specific jurisdiction's rules apply to your business. Treat every result as a starting checklist, not a compliance certification, and talk to a lawyer before you rely on it.",
  },
  {
    q: "What does CAN-SPAM actually require?",
    a: "For commercial email: don't use false/misleading header information, don't use deceptive subject lines, identify the message as an ad if applicable, include a valid physical postal address, tell recipients how to opt out, and honor opt-out requests within 10 business days with no fee. This tool checks the parts that are detectable from message text — postal address and opt-out language — plus a heuristic scan for common deceptive-subject patterns.",
  },
  {
    q: "Why are some checks labeled 'heuristic' instead of 'law'?",
    a: 'Because they test a pattern correlated with a rule, not the rule itself. "Deceptive subject line" is a legal standard (would a reasonable recipient be misled?) that requires human judgment — this tool can only flag common patterns (ALL CAPS, fake Re:/Fwd:, excessive urgency punctuation) associated with that pattern. Spam-trigger words are a deliverability signal ESPs use, not a CAN-SPAM requirement at all.',
  },
  {
    q: "What about SMS/text message compliance?",
    a: "SMS marketing sits under TCPA (consent + opt-out rights) and carrier/CTIA guidelines (reply-STOP requirement, sending-hours windows). This tool checks for STOP opt-out language in the text and flags a reminder about the FTC Telemarketing Sales Rule's 8am–9pm local-time sending window — that window can't be verified from message text, so it's shown as a standing reminder, not a pass/fail check.",
  },
  {
    q: "Is anything I paste stored or sent anywhere?",
    a: "No. All checks run as plain JavaScript in your browser against the text you type. Nothing is transmitted to SkynetJoe or any third party.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cold Outreach Compliance Checker",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that checks cold email/SMS copy against CAN-SPAM postal-address and opt-out requirements, deceptive-subject heuristics, and a spam-trigger-word scan, with citations. Not legal advice.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howTo = howToSchema({
  name: "How to run a compliance check on cold outreach copy",
  description:
    "Check cold email or SMS copy against CAN-SPAM and SMS opt-out basics before sending.",
  steps: [
    {
      name: "Choose Email or SMS",
      text: "Pick which channel your copy is for — the checks differ (CAN-SPAM for email, TCPA/carrier rules for SMS).",
    },
    {
      name: "Paste your copy",
      text: "For email, paste the subject line and full body including footer. For SMS, paste the message text.",
    },
    {
      name: "Read the postal-address check",
      text: "CAN-SPAM requires a valid physical postal address in every commercial email.",
    },
    {
      name: "Read the opt-out check",
      text: "Confirms unsubscribe/opt-out language is present in the copy.",
    },
    {
      name: "Read the deceptive-subject heuristic flags",
      text: "Common patterns like ALL CAPS, fake Re:/Fwd:, or urgency punctuation are flagged for a human read.",
    },
    {
      name: "Review the spam-trigger-word scan",
      text: "A deliverability heuristic, not a legal requirement — fewer matches generally means a lower spam-filter score.",
    },
  ],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "Cold Outreach Compliance Checker", url: `${SITE.url}${PATH}` },
]);

export default function ColdOutreachComplianceCheckerPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howTo} />
      <JsonLd data={breadcrumbs} />

      {/* HERO */}
      <section
        style={{
          padding: "96px 0 48px",
          background: "var(--cream-3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-x px-6">
          <Breadcrumbs
            bare
            items={[
              { label: "Tools", href: "/tools" },
              { label: "Cold Outreach Compliance Checker" },
            ]}
          />
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(198,107,63,0.10)",
                border: "1px solid rgba(198,107,63,0.40)",
                color: "var(--terracotta-aa)",
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · Rule-by-rule · Not legal advice
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 6vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
              Before you hit send,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, var(--terracotta) 0%, var(--ink) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                check the copy.
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 8,
                maxWidth: "58ch",
              }}
            >
              Paste your cold email or SMS text and get a rule-by-rule check
              against CAN-SPAM&apos;s postal-address and opt-out requirements,
              deceptive-subject heuristics, and a spam-trigger-word scan — each
              one citing the actual rule it tests.
            </p>
            <p className="text-sm" style={{ color: "var(--ink-faint)" }}>
              Updated August 2026 · Not legal advice
            </p>
          </div>
        </div>
      </section>

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Checker />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this tool exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                CAN-SPAM is short and specific. Almost nobody checks their copy
                against the actual text.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  When I build outbound systems for clients, the CAN-SPAM Act
                  (15 U.S.C. §7701 et seq.) comes up constantly — and almost
                  nobody has actually read it. It&apos;s six requirements:
                  don&apos;t use false header info, don&apos;t use deceptive
                  subject lines, disclose the message as an ad where required,
                  include a real physical postal address, give a clear opt-out
                  mechanism, and honor opt-outs within 10 business days for
                  free. Two of those — the postal address and the opt-out
                  language — are checkable straight from the message text, which
                  is what this tool does.
                </p>
                <p>
                  The other two — deceptive subject lines and false header info
                  — require judgment a script can&apos;t fully make. What this
                  tool does instead is flag the surface-level patterns that
                  correlate with deceptive subjects (fake Re:/Fwd: prefixes, ALL
                  CAPS words, stacked exclamation marks) so you catch the
                  obvious ones before a human review.
                </p>
                <p>
                  Separately, the spam-trigger-word scan has nothing to do with
                  CAN-SPAM at all — it&apos;s a deliverability heuristic built
                  from the word lists major ESPs publish as commonly flagged by
                  spam filters. Matching a word isn&apos;t illegal; it just
                  statistically raises your spam score.
                </p>
                <p>
                  Run your domain through the{" "}
                  <Link
                    href="/tools/email-deliverability-checker"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    Email Deliverability Checker
                  </Link>{" "}
                  first — SPF/DKIM/DMARC decide whether the message arrives at
                  all, before copy compliance even matters.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCE TABLE */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Reference
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              What this tool checks, and what it doesn&apos;t
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(26,26,26,0.12)]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr
                    className="text-[11px] uppercase tracking-wider text-[var(--ink-faint)]"
                    style={{ background: "var(--cream-3)" }}
                  >
                    <th className="px-4 py-3 font-semibold">Check</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Physical postal address present",
                      "Statute (pattern match)",
                      "CAN-SPAM Act",
                    ],
                    [
                      "Opt-out language present",
                      "Statute (pattern match)",
                      "CAN-SPAM Act",
                    ],
                    [
                      "Deceptive subject-line patterns",
                      "Heuristic",
                      "FTC guidance-inspired",
                    ],
                    [
                      "SMS STOP opt-out keyword",
                      "Statute-adjacent (pattern match)",
                      "TCPA / carrier rules",
                    ],
                    [
                      "SMS sending-hours reminder",
                      "Informational only",
                      "FTC Telemarketing Sales Rule",
                    ],
                    [
                      "Spam-trigger-word scan",
                      "Heuristic",
                      "ESP deliverability guidance, not law",
                    ],
                  ].map((row, i) => (
                    <tr
                      key={row[0]}
                      className={
                        i % 2 === 0
                          ? "border-t border-[rgba(26,26,26,0.08)]"
                          : "border-t border-[rgba(26,26,26,0.08)] bg-[var(--cream-3)]"
                      }
                    >
                      {row.map((cell) => (
                        <td
                          key={cell}
                          className="px-4 py-3 text-[var(--ink-2)]"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Mail,
                href: "/tools/email-deliverability-checker",
                label: "Email Deliverability Checker",
                desc: "SPF/DKIM/DMARC live check before you send at volume.",
              },
              {
                icon: Building2,
                href: "/tools/domain-trust-lookup",
                label: "Domain Trust & Age Lookup",
                desc: "Vet a lead's domain before you reply.",
              },
              {
                icon: ArrowRight,
                href: "/services/gohighlevel",
                label: "Get outreach set up compliantly",
                desc: "CRM + email/SMS infra built once, done right.",
              },
            ].map(({ icon: Icon, href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Icon className="w-5 h-5 text-[var(--terracotta-aa)] mb-3" />
                <div className="text-[var(--ink)] font-bold mb-1">{label}</div>
                <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                  {desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Quick answers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Honest FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4 transition"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[var(--ink)] font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-[var(--terracotta-aa)] transition group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-[var(--ink-2)] leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
