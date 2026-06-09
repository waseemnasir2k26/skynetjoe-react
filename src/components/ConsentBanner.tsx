"use client";

import { useEffect, useState } from "react";

// Consent Mode v2 UI. Pairs with the consent-default block in Analytics.tsx,
// which sets all storage to 'denied' before GTM loads. This banner is the CMP
// that flips it: Accept -> consent 'update' granted + persist; Decline ->
// persist denied (storage stays off). Choice is stored in localStorage so the
// banner shows once; returning visitors are re-granted in Analytics.tsx before
// GTM boots (no flicker, analytics resumes immediately).
//
// Without this banner the denied default would keep GA4 dark forever. Keep them
// together: if you remove one, reconcile the other.

const KEY = "sl-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  });
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      // Only prompt when no prior choice. Returning 'granted' visitors are
      // re-granted in Analytics.tsx; 'denied' stays denied. Either way: no banner.
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // localStorage blocked (private mode / cookies off) — surface the banner
      // so the user can still choose; choice just won't persist.
      setShow(true);
    }
  }, []);

  function choose(granted: boolean) {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {
      /* non-persistent fallback */
    }
    updateConsent(granted);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: "1rem",
        right: "1rem",
        bottom: "1rem",
        zIndex: 100,
        maxWidth: 560,
        margin: "0 auto",
        background: "var(--cream-3, #faf7f0)",
        color: "var(--ink, #1a1a1a)",
        border: "1px solid var(--rule-strong, rgba(26,26,26,0.22))",
        borderRadius: 16,
        boxShadow: "0 10px 40px rgba(26,26,26,0.18)",
        padding: "18px 20px",
        fontSize: 15,
        lineHeight: 1.55,
      }}
    >
      <p style={{ margin: "0 0 12px" }}>
        We use cookies to measure traffic and improve the site. Analytics stays
        off until you accept.{" "}
        <a
          href="/privacy-policy"
          style={{
            color: "var(--terracotta-aa, #a8451f)",
            textDecoration: "underline",
          }}
        >
          Privacy policy
        </a>
        .
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => choose(true)}
          style={{
            background: "var(--terracotta, #c66b3f)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          style={{
            background: "transparent",
            color: "var(--ink-2, #3a3a36)",
            border: "1px solid var(--rule-strong, rgba(26,26,26,0.22))",
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
