/**
 * llms.txt Generator — form types + builder for the llmstxt.org spec.
 *
 * Spec shape (https://llmstxt.org):
 *   # Site/Project Name
 *
 *   > One-sentence summary.
 *
 *   Optional free-form context paragraph(s).
 *
 *   ## Section Title
 *   - [Link title](https://url): optional description
 *
 *   ## Optional
 *   - [Link title](https://url): optional description
 */

export type LinkRow = {
  id: string;
  title: string;
  url: string;
  description: string;
};

export type Section = {
  id: string;
  title: string;
  links: LinkRow[];
};

export type LlmsTxtForm = {
  siteName: string;
  summary: string;
  context: string;
  contactEmail: string;
  sections: Section[];
};

export function emptyLink(): LinkRow {
  return {
    id: crypto.randomUUID(),
    title: "",
    url: "",
    description: "",
  };
}

export function emptySection(title = ""): Section {
  return {
    id: crypto.randomUUID(),
    title,
    links: [emptyLink()],
  };
}

export const DEFAULT_FORM: LlmsTxtForm = {
  siteName: "",
  summary: "",
  context: "",
  contactEmail: "",
  sections: [emptySection("Docs")],
};

/**
 * Builds a spec-valid llms.txt string. Sections with no valid (title+url)
 * links are skipped. The "Optional" section name is reserved by the spec
 * for secondary links an LLM may skip if short on context — we don't force
 * that naming, the user controls section titles directly.
 */
export function buildLlmsTxt(form: LlmsTxtForm): string {
  const lines: string[] = [];
  const name = form.siteName.trim() || "Untitled Site";
  lines.push(`# ${name}`);
  lines.push("");

  const summary = form.summary.trim();
  if (summary) {
    lines.push(`> ${summary}`);
    lines.push("");
  }

  const context = form.context.trim();
  if (context) {
    lines.push(context);
    lines.push("");
  }

  for (const section of form.sections) {
    const title = section.title.trim();
    const validLinks = section.links.filter(
      (l) => l.title.trim() && l.url.trim(),
    );
    if (!title || validLinks.length === 0) continue;
    lines.push(`## ${title}`);
    for (const link of validLinks) {
      const desc = link.description.trim();
      lines.push(
        `- [${link.title.trim()}](${link.url.trim()})${desc ? `: ${desc}` : ""}`,
      );
    }
    lines.push("");
  }

  const contact = form.contactEmail.trim();
  if (contact) {
    lines.push(`## Contact`);
    lines.push(`- [${contact}](mailto:${contact})`);
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

export function isFormValid(form: LlmsTxtForm): boolean {
  if (!form.siteName.trim() || !form.summary.trim()) return false;
  const hasAnyValidSection = form.sections.some(
    (s) =>
      s.title.trim() && s.links.some((l) => l.title.trim() && l.url.trim()),
  );
  return hasAnyValidSection;
}
