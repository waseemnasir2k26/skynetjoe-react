/**
 * json-highlight.ts — minimal, dependency-free JSON syntax highlighter.
 *
 * SECURITY: captured request bodies come from arbitrary, untrusted internet
 * traffic and are rendered via dangerouslySetInnerHTML in Inspector.tsx.
 * Tokenizing must happen on the RAW string first (so the quote-matching
 * regex still sees literal `"` characters), then EVERY piece — matched
 * tokens and the plain text between them — is HTML-escaped before it is
 * ever placed in the output. Nothing from the source string can inject a
 * real tag: escaping always happens last, on already-isolated fragments.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const TOKEN_RE =
  /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;

function classFor(match: string): string {
  if (match.startsWith('"')) return /:$/.test(match) ? "jh-key" : "jh-string";
  if (match === "true" || match === "false") return "jh-bool";
  if (match === "null") return "jh-null";
  return "jh-number";
}

/** Returns HTML-safe markup with <span class="jh-key|jh-string|jh-number|jh-bool|jh-null"> wrapping tokens. */
export function highlightJson(raw: string): string {
  let out = "";
  let lastIndex = 0;
  TOKEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TOKEN_RE.exec(raw)) !== null) {
    out += escapeHtml(raw.slice(lastIndex, match.index));
    out += `<span class="${classFor(match[0])}">${escapeHtml(match[0])}</span>`;
    lastIndex = match.index + match[0].length;
  }
  out += escapeHtml(raw.slice(lastIndex));
  return out;
}
