import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { howToSchema } from "@/lib/schema";
import Checker from "./Checker";
import { ShieldCheck, Mail, ArrowRight } from "lucide-react";

const PATH = "/tools/email-deliverability-checker";

export const metadata: Metadata = {
  title:
    "Free Email Deliverability Checker — Live SPF/DKIM/DMARC Test | SkynetJoe",
  description:
    "Enter a domain, get a live SPF, DKIM, DMARC, and MX check pulled straight from DNS — plain-English verdicts, not a jargon dump. Free, no signup.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Email Deliverability Checker — live SPF/DKIM/DMARC test",
    description:
      "Free live check of a domain's SPF, DKIM, DMARC, and MX records — the exact records receiving mail servers use to decide inbox vs. spam.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Deliverability Checker · free, live DNS check",
    description:
      "SPF, DKIM, DMARC, and MX — checked live against your domain's actual DNS records.",
  },
};

const faqs = [
  {
    q: "What exactly does this tool check?",
    a: "Four things, all read live from your domain's DNS: SPF (which servers are authorized to send as you), DMARC (what happens when a message fails authentication), DKIM (whether outgoing mail is cryptographically signed — probed against 8 common selector names, since there's no DNS record that lists selectors in use), and MX (which provider receives your mail). Every value shown is the actual DNS answer at the moment you run the check.",
  },
  {
    q: "Why does DMARC p=none count as a problem?",
    a: "p=none tells receiving servers \"authenticate this mail, but don't do anything if it fails — just send me a report.\" It's a monitoring-only mode. Spoofed mail using your domain still lands in inboxes. It's a common default because it's the safe first step when rolling out DMARC, but if it's been sitting at p=none for months, nothing is actually being enforced.",
  },
  {
    q: "The DKIM selectors all show missing — does that mean DKIM isn't set up?",
    a: 'Not necessarily. DNS has no directory of DKIM selectors in use, so this tool probes 8 common selector names (google, default, k1, s1, s2, selector1, selector2, mx). A real DKIM setup using a custom selector name will show as "missing" here even though DKIM is fully configured. Check your email provider\'s DKIM setup page for the selector it actually publishes.',
  },
  {
    q: "Is anything about my domain sent to a server or stored?",
    a: "The domain you enter is sent directly from your browser to Google's public DNS-over-HTTPS API (dns.google) — the same public DNS resolver anyone can query. Nothing is logged, stored, or sent to SkynetJoe's servers.",
  },
  {
    q: "Why did my check come back with no records at all?",
    a: "Either the domain doesn't exist (check the spelling), or it's registered but has never had mail-related DNS records configured — common for a domain that's parked or only used for a website, not email.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Email Deliverability Checker",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that runs a live SPF, DKIM, DMARC, and MX check against a domain's actual DNS records via Google Public DNS-over-HTTPS, with plain-English verdicts.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  dateModified: "2026-08-19",
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
  name: "How to check email deliverability for a domain",
  description:
    "Run a live SPF, DKIM, DMARC, and MX check against a domain's DNS records.",
  steps: [
    {
      name: "Enter the domain",
      text: "Type the sending domain, e.g. yourcompany.com — no https:// or www needed.",
    },
    {
      name: "Run the check",
      text: "Click Check Deliverability. The tool queries dns.google live for TXT, MX, and DKIM-selector records.",
    },
    {
      name: "Read the SPF verdict",
      text: "Confirms whether an SPF record exists and whether it ends in -all (strict), ~all (soft), or is missing/misconfigured.",
    },
    {
      name: "Read the DMARC verdict",
      text: "Shows the enforcement policy — reject (strongest), quarantine (middle), or none (monitoring only).",
    },
    {
      name: "Check the DKIM selector probe",
      text: "Confirms whether any of 8 common DKIM selector names resolve for the domain.",
    },
    {
      name: "Fix what's flagged",
      text: "Update the SPF/DMARC/DKIM records at your DNS provider, then re-run the check — DNS changes can take up to 48 hours to propagate.",
    },
  ],
});

export default function EmailDeliverabilityCheckerPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howTo} />

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
              { label: "Email Deliverability Checker" },
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
                Free · Live DNS query · No signup
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
              Is your domain{" "}
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
                landing in spam
              </span>{" "}
              — and why?
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
              Enter a domain and this tool runs a live SPF, DKIM, DMARC, and MX
              check against its actual DNS records — pulled fresh from Google
              Public DNS-over-HTTPS, not a cached database — with a
              plain-English verdict on each one.
            </p>
            <p className="text-sm" style={{ color: "var(--ink-faint)" }}>
              Updated August 2026
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

      {/* WHY THIS EXISTS + BODY COPY */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this tool exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Every automation build I ship eventually sends an email — and
                that email is worthless if it never leaves spam.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Deliverability isn&apos;t about clever subject lines. It is
                  three DNS records — SPF, DKIM, DMARC — and whether the server
                  receiving your mail can prove you&apos;re actually authorized
                  to send as your domain. Gmail and Yahoo tightened their
                  bulk-sender requirements in 2024 specifically around these
                  three records, and most small businesses I&apos;ve audited
                  have at least one of them missing or set to a do-nothing
                  default.
                </p>
                <p>
                  <strong>SPF (Sender Policy Framework, RFC 7208)</strong> lists
                  which mail servers are allowed to send as your domain.
                  Receiving servers check the sending IP against this list. Miss
                  it, and you&apos;re relying entirely on DKIM and DMARC to
                  vouch for you.
                </p>
                <p>
                  <strong>DKIM (DomainKeys Identified Mail)</strong> attaches a
                  cryptographic signature to outgoing mail, proving the message
                  wasn&apos;t altered in transit and really came from a server
                  holding your private key. There&apos;s no DNS record listing
                  which selector name your provider uses — which is why this
                  tool probes 8 common ones rather than claiming certainty
                  either way.
                </p>
                <p>
                  <strong>DMARC (RFC 7489)</strong> is the enforcement layer: it
                  tells receiving servers what to do when SPF or DKIM fails —
                  nothing (p=none), quarantine to spam (p=quarantine), or reject
                  outright (p=reject). Publishing DMARC at p=none and never
                  moving past it is the single most common gap this tool finds —
                  the record exists, so it looks configured, but it enforces
                  nothing.
                </p>
                <p>
                  Pair this with the{" "}
                  <Link
                    href="/tools/domain-trust-lookup"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    Domain Trust & Age Lookup
                  </Link>{" "}
                  before you vet a vendor or lead, and the{" "}
                  <Link
                    href="/tools/cold-outreach-compliance-checker"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    Cold Outreach Compliance Checker
                  </Link>{" "}
                  before you send anything at volume.
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
              DMARC policy, at a glance
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(26,26,26,0.12)]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr
                    className="text-[11px] uppercase tracking-wider text-[var(--ink-faint)]"
                    style={{ background: "var(--cream-3)" }}
                  >
                    <th className="px-4 py-3 font-semibold">Policy</th>
                    <th className="px-4 py-3 font-semibold">
                      What happens on failure
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Enforcement level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "p=none",
                      "Nothing — report only, mail still delivers",
                      "None (monitoring)",
                    ],
                    [
                      "p=quarantine",
                      "Failing mail routed to spam/junk",
                      "Moderate",
                    ],
                    ["p=reject", "Failing mail rejected outright", "Strongest"],
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
                icon: ShieldCheck,
                href: "/tools/domain-trust-lookup",
                label: "Domain Trust & Age Lookup",
                desc: "Vet a lead or vendor domain before you reply.",
              },
              {
                icon: Mail,
                href: "/tools/cold-outreach-compliance-checker",
                label: "Cold Outreach Compliance Checker",
                desc: "Check your email/SMS copy against CAN-SPAM basics.",
              },
              {
                icon: ArrowRight,
                href: "/services/gohighlevel",
                label: "Get your email infra fixed for you",
                desc: "SPF/DKIM/DMARC + CRM setup, done once, done right.",
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
