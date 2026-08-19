import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { howToSchema } from "@/lib/schema";
import Lookup from "./Lookup";
import { Building2, Mail, ShieldCheck, ArrowRight } from "lucide-react";

const PATH = "/tools/domain-trust-lookup";

export const metadata: Metadata = {
  title: "Free Domain Trust & Age Lookup — Vet Leads/Vendors | SkynetJoe",
  description:
    "Look up a domain's real registration date, registrar, and DNS footprint via live RDAP + DNS queries — before you trust a lead, vendor, or inbound pitch. Free, no signup.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Domain Trust & Age Lookup — vet before you trust",
    description:
      "Live RDAP registration data + DNS footprint for any domain — registration date, registrar, mail provider, nameserver provider.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domain Trust & Age Lookup · free, live RDAP",
    description:
      "Registration date, registrar, and DNS footprint for any domain — registry-sourced, not guessed.",
  },
};

const faqs = [
  {
    q: "What is RDAP and how is it different from WHOIS?",
    a: "RDAP (Registration Data Access Protocol, RFC 9083) is the modern, structured-JSON successor to WHOIS. Registries have been migrating to it since ICANN mandated it, and it returns machine-readable fields (registration date, registrar, status codes) instead of a loosely-formatted text blob. This tool queries RDAP directly, not a scraped WHOIS mirror.",
  },
  {
    q: "Why would a domain's RDAP lookup fail?",
    a: "A few reasons: the domain isn't registered, the TLD's registry doesn't publish RDAP data yet (rare in 2026 but still true for a handful of ccTLDs), or the registry's RDAP endpoint doesn't send CORS headers — which blocks a browser-based tool like this one from reading the response even though the data exists. If a lookup fails, the tool tells you which of these it is rather than guessing.",
  },
  {
    q: "Is a young domain automatically a scam?",
    a: "No. Plenty of legitimate businesses launch new domains — rebrands, new product lines, agencies spinning up a project subdomain. Domain age is one signal among several, not a verdict on its own. Combine it with the DNS footprint (does it receive mail, is it on a real DNS provider) and, for outreach specifically, the Email Deliverability Checker.",
  },
  {
    q: "Does this replace a proper vendor background check?",
    a: "No — this is a fast, free, DNS-level sanity check, not a substitute for verifying a business registration, checking references, or reading a contract. Use it as a first-pass filter before you invest more time.",
  },
  {
    q: "Is anything I enter stored?",
    a: "No. The domain is sent from your browser directly to rdap.org and dns.google — both public, keyless lookup services. Nothing is logged by SkynetJoe.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Domain Trust & Age Lookup",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that looks up a domain's registration date, registrar, and DNS footprint via live RDAP and DNS queries, to help vet leads and vendors before outreach.",
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
  name: "How to check a domain's trust signals before outreach",
  description:
    "Look up a domain's registration date, registrar, and DNS footprint before trusting it.",
  steps: [
    {
      name: "Enter the domain",
      text: "Type the domain you want to vet, e.g. vendor-company.com.",
    },
    {
      name: "Run the lookup",
      text: "Click Look Up Domain. The tool queries RDAP for registration data and dns.google for MX/NS records.",
    },
    {
      name: "Check registration age",
      text: "A domain registered days ago carries more risk than one registered years ago — read the age verdict.",
    },
    {
      name: "Check the registrar and status codes",
      text: "Registry status codes like clientTransferProhibited are normal; look for anything unusual for a business you're about to trust.",
    },
    {
      name: "Check the DNS footprint",
      text: "Confirm the domain has real MX records (receives mail) and sits on a recognized DNS provider.",
    },
    {
      name: "Combine with judgment",
      text: "Use this as one signal among several — not a standalone verdict on legitimacy.",
    },
  ],
});

export default function DomainTrustLookupPage() {
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
              { label: "Domain Trust & Age Lookup" },
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
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · Live RDAP + DNS · No signup
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
              Before you reply to that lead,{" "}
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
                check the domain.
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
              Enter a domain and get its real registration date, registrar, and
              DNS footprint — pulled live from RDAP (the registry-run successor
              to WHOIS) and DNS, not guessed or cached.
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
            <Lookup />
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
                Every inbound lead, vendor pitch, and cold-outreach reply comes
                from a domain — and most of us never check it.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Running a solo agency means I&apos;m the one deciding whether
                  an inbound message is worth a reply, a vendor is worth a
                  deposit, or a &quot;partnership&quot; pitch is worth 20
                  minutes on a call. The fastest sanity check I have isn&apos;t
                  a background check service — it&apos;s the domain itself. RDAP
                  (Registration Data Access Protocol, RFC 9083) gives every
                  registry-run fact about a domain in one structured query: when
                  it was registered, who the registrar is, and its current
                  status.
                </p>
                <p>
                  A domain registered three days ago pitching a six-figure
                  partnership is a different conversation than one that&apos;s
                  been live for eight years. Neither is proof of anything on its
                  own — but paired with a DNS footprint check (does it actually
                  receive mail, is it sitting on a recognized DNS provider),
                  it&apos;s a fast, free first filter before you spend real
                  time.
                </p>
                <p>
                  Pair it with the{" "}
                  <Link
                    href="/tools/email-deliverability-checker"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    Email Deliverability Checker
                  </Link>{" "}
                  if you&apos;re the one sending — and vet your own outreach
                  copy with the{" "}
                  <Link
                    href="/tools/cold-outreach-compliance-checker"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    Cold Outreach Compliance Checker
                  </Link>{" "}
                  before it goes out.
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
              Domain age, as a trust signal
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(26,26,26,0.12)]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr
                    className="text-[11px] uppercase tracking-wider text-[var(--ink-faint)]"
                    style={{ background: "var(--cream-3)" }}
                  >
                    <th className="px-4 py-3 font-semibold">Age</th>
                    <th className="px-4 py-3 font-semibold">
                      What it typically means
                    </th>
                    <th className="px-4 py-3 font-semibold">Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Under 30 days",
                      "Freshly registered — common for both new legitimate ventures and disposable phishing/scam domains",
                      "Extra scrutiny",
                    ],
                    [
                      "30 days – 6 months",
                      "New but not same-day — could be a real launch, still worth a second look",
                      "Moderate",
                    ],
                    [
                      "Over 6 months",
                      "Old enough to rule out a same-day throwaway domain",
                      "Lower risk (not zero)",
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
            <p className="mt-4 text-xs text-[var(--ink-faint)] text-center">
              This is a heuristic, not a rule — treat it as one input among
              several, never a standalone verdict.
            </p>
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
                desc: "Check SPF/DKIM/DMARC before you send anything.",
              },
              {
                icon: ShieldCheck,
                href: "/tools/cold-outreach-compliance-checker",
                label: "Cold Outreach Compliance Checker",
                desc: "Run your email/SMS copy past CAN-SPAM basics.",
              },
              {
                icon: ArrowRight,
                href: "/services/ai-business-systems",
                label: "Need a real vetting workflow?",
                desc: "I'll wire lead-scoring and vendor checks into your CRM.",
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
