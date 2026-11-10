import { ArrowRight } from "lucide-react";
import { WHATSAPP, mailtoLink } from "@/lib/site";

/**
 * Closing CTA. Risk-reversal wording is limited to what the site already
 * promises:
 *   - 8-hour weekday reply, 48-hour fixed-price scope — contact page
 *   - "If the delay is on us, the retainer month is free or we credit the
 *     equivalent hours on a one-time build" — /pricing FAQ
 *   - no hourly creep — HOME_FAQS
 * No guarantees are invented beyond those.
 */
export default function FinalCTA() {
  return (
    <section id="final-cta" className="hv2-final" aria-labelledby="final-h">
      <div className="hv2-wrap">
        <div className="hv2-final-inner">
          <div className="hv2-eyebrow">One message away</div>
          <h2 id="final-h">Find the one fix that pays off fastest.</h2>
          <p>
            Message Waseem on WhatsApp with what&rsquo;s leaking. You get an
            honest look at your setup and a one-page build plan — no pitch deck,
            no discovery-call maze.
          </p>
          <div className="hv2-final-ctas">
            <a
              href={WHATSAPP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hv2-btn hv2-btn-light"
              data-cta="final-whatsapp"
            >
              Chat on WhatsApp
              <ArrowRight aria-hidden />
            </a>
            <a
              href={mailtoLink("Project enquiry from skynetjoe.com")}
              className="hv2-btn hv2-btn-ghost"
            >
              Email instead
            </a>
          </div>
          <div className="hv2-final-terms">
            Reply within 8h on weekdays · scope in 48h · Bali (GMT+8)
          </div>
          <div className="hv2-final-promise">
            The ship window in your contract is the one we hit. If a delay is on
            our side, the retainer month is free or the equivalent hours are
            credited on a one-time build.
          </div>
        </div>
      </div>
    </section>
  );
}
