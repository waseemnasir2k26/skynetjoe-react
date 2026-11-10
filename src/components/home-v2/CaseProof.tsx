import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { CASE_STUDIES } from "@/lib/case-studies";

/**
 * Three real case studies, read straight from src/lib/case-studies.ts
 * (same featured slugs the previous Proof section used). Only the
 * oneLineOutcome, industry and location fields are rendered — nothing is
 * typed in by hand, so this cannot drift from the published record.
 */
const FEATURED_SLUGS = [
  "eu-logistics-email-triage-n8n",
  "us-insurance-gohighlevel-rebuild",
  "northeast-recovery-brand-intake-rescue",
] as const;

export default function CaseProof() {
  const cases = FEATURED_SLUGS.map((slug) =>
    CASE_STUDIES.find((c) => c.slug === slug),
  ).filter((c): c is (typeof CASE_STUDIES)[number] => Boolean(c));

  return (
    <section
      className="hv2-section hv2-cases"
      id="proof"
      aria-labelledby="proof-h"
    >
      <div className="hv2-wrap">
        <Reveal className="hv2-head">
          <div>
            <div className="hv2-eyebrow">Real builds</div>
            <h2 id="proof-h" className="hv2-h2">
              Receipts, <em>not a pitch deck.</em>
            </h2>
          </div>
          <p className="hv2-lede">
            Three engagements, written up with the stack, the timeline and what
            actually changed. Names withheld until clients sign off.
          </p>
        </Reveal>

        <Reveal>
          <ul className="hv2-case-list">
            {cases.map((c, i) => (
              <li key={c.slug}>
                <Link href={`/case-studies/${c.slug}`} className="hv2-case">
                  <span className="idx">0{i + 1}</span>
                  <span className="who">
                    {c.industry}
                    <br />
                    {c.location}
                  </span>
                  <p className="what">{c.oneLineOutcome}</p>
                  <span className="arrow" aria-hidden>
                    <ArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="hv2-cases-foot">
            <Link href="/case-studies" className="hv2-inline-link">
              All case studies <ArrowRight aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
