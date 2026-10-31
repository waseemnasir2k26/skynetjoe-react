import { ArrowRight, Mail } from "lucide-react";
import { SITE, WHATSAPP, waLink, mailtoLink } from "@/lib/site";

/**
 * ContactDirect — the one booking-CTA replacement (2026-10-31 ruling:
 * Calendly removed; WhatsApp is the primary action, email the secondary).
 *
 * Server-safe (no hooks). Primary = WhatsApp wa.me link with prefilled text;
 * secondary = mailto to SITE.email. Styled like the existing terracotta
 * primary buttons (HeroFunnel / ServiceFunnel) but WhatsApp-green.
 */
type Props = {
  /** Prefilled WhatsApp message. Defaults to the standard hello. */
  text?: string;
  /** Primary button label. */
  label?: string;
  /** Show the secondary email link. Default true. */
  showEmail?: boolean;
  /** Email link label. Defaults to the address itself. */
  emailLabel?: string;
  /** Subject for the mailto link. */
  emailSubject?: string;
  /** "row" = side by side (wraps), "stack" = full-width column. */
  variant?: "row" | "stack";
  size?: "md" | "lg";
  /** Optional data-meta-name hook for analytics. */
  metaName?: string;
  className?: string;
};

const WA_ICON =
  "M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z";

export default function ContactDirect({
  text,
  label = "Chat on WhatsApp",
  showEmail = true,
  emailLabel,
  emailSubject,
  variant = "row",
  size = "md",
  metaName,
  className,
}: Props) {
  const pad = size === "lg" ? "16px 28px" : "14px 24px";
  const stack = variant === "stack";
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: stack ? "column" : "row",
        flexWrap: "wrap",
        alignItems: stack ? "stretch" : "center",
        gap: stack ? 12 : 16,
      }}
    >
      <a
        href={waLink(text)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} — ${WHATSAPP.display}`}
        data-meta-name={metaName}
        style={{
          background: "#25D366",
          color: "#0b2e1a",
          padding: pad,
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: size === "lg" ? 16 : 15,
          borderRadius: 2,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          textDecoration: "none",
          minHeight: 48,
        }}
      >
        <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
          <path d={WA_ICON} />
        </svg>
        {label}
        <ArrowRight style={{ width: 16, height: 16 }} />
      </a>
      {showEmail && (
        <a
          href={mailtoLink(emailSubject)}
          className="hover:underline"
          style={{
            color: "var(--terracotta-aa)",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 14,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            textDecoration: "none",
            textUnderlineOffset: 3,
            minHeight: 44,
          }}
        >
          <Mail style={{ width: 15, height: 15 }} aria-hidden="true" />
          {emailLabel ?? `or email ${SITE.email}`}
        </a>
      )}
    </div>
  );
}
