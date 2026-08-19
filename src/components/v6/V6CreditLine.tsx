/**
 * SkynetLabs demo-page credit strip. The global <Footer/> (src/components/
 * Footer.tsx) is shared sitewide and out of scope for this route, so this
 * route-local strip guarantees the exact required "Built by SkynetLabs ·
 * waseemnasir.com" credit renders on /v6, same pattern as V3CreditLine.tsx.
 */
export default function V6CreditLine() {
  return (
    <div
      style={{
        background: "var(--ink)",
        color: "rgba(242,239,230,0.7)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textAlign: "center",
        padding: "18px 16px",
      }}
    >
      Built by{" "}
      <a
        href="https://waseemnasir.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--cream)", textDecoration: "underline" }}
      >
        SkynetLabs · waseemnasir.com
      </a>
    </div>
  );
}
