"use client";

/**
 * EditVideosClient — "Edit Your Videos Using Claude Code" lead-magnet page.
 *
 * Public: hero + proof strip + the 17-skill grid (each card shows what it
 * makes, what you feed it, and the proof — but the master prompt is locked).
 *
 * Gate: EmailGate (toolSlug "video-editing-playbook") captures the email into
 * GHL, then unlocks the full Master Prompt Library — every skill's complete
 * copy-paste prompt with a Copy button + open-in-Claude/ChatGPT deep links.
 *
 * All IG/FB/YT video CTAs point here, so one URL replaces every per-video PDF.
 */

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, Copy, Lock, ArrowRight } from "lucide-react";
import EmailGate from "@/components/cta/EmailGate";
import { VIDEO_SKILLS, VIDEO_SKILL_COUNT } from "@/data/video-skills";

const UNLOCK_KEY = "skynet-tool-video-editing-playbook-email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Read the stored unlock from localStorage via an external store, so returning
// visitors render unlocked on hydration with no flash and no setState-in-effect.
function subscribe(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}
function getStoredUnlock(): boolean {
  try {
    const s = window.localStorage.getItem(UNLOCK_KEY);
    return !!(s && EMAIL_RE.test(s));
  } catch {
    return false;
  }
}

const PROOF = [
  {
    metric: VIDEO_SKILL_COUNT + " skills",
    label: "editing workflows, each as a prompt",
  },
  { metric: "90/100", label: "critic-pass on the bali nomad vlog" },
  { metric: "1 prompt", label: "paste, fill the brackets, render" },
];

function claudeLink(prompt: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}

export default function EditVideosClient() {
  // Session unlock (set when the gate fires) OR a previously-stored email.
  const [sessionUnlocked, setSessionUnlocked] = useState(false);
  const storedUnlocked = useSyncExternalStore(
    subscribe,
    getStoredUnlock,
    () => false,
  );
  const unlocked = sessionUnlocked || storedUnlocked;
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (slug: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(slug);
      window.setTimeout(() => setCopied((c) => (c === slug ? null : c)), 1800);
    } catch {
      // clipboard blocked — user can still select the <pre> manually
    }
  };

  return (
    <main className="evc">
      <style>{css}</style>

      {/* ───────────── HERO ───────────── */}
      <header className="evc-hero wrap">
        <div className="evc-eyebrow">
          <span className="evc-rule" /> SkynetLabs · Claude Code video skills
        </div>
        <h1 className="evc-h1">
          Edit your videos using <span className="evc-accent">Claude Code</span>
          .
        </h1>
        <p className="evc-sub">
          The reels, vlogs, and promos we make start as one prompt. Here&apos;s
          the whole library — {VIDEO_SKILL_COUNT} editing skills, each with the
          full master prompt you can paste into Claude Code and run. Drop your
          email once — unlock all of them now, and get every new prompt as we
          ship it.
        </p>
        <a href="#unlock" className="evc-cta">
          Unlock the {VIDEO_SKILL_COUNT} prompts <ArrowRight size={16} />
        </a>

        <div className="evc-proof">
          {PROOF.map((p) => (
            <div key={p.label} className="evc-proof-cell">
              <div className="evc-proof-metric">{p.metric}</div>
              <div className="evc-proof-label">{p.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* ───────────── SKILL GRID (prompts locked) ───────────── */}
      <section className="wrap evc-section">
        <h2 className="evc-h2">The toolkit</h2>
        <p className="evc-section-sub">
          Each one is a real workflow from our editing stack. Unlock once to
          copy any master prompt.
        </p>

        <div className="evc-grid">
          {VIDEO_SKILLS.map((s) => (
            <article key={s.slug} className="evc-card">
              <span className="evc-tag">{s.tag}</span>
              <h3 className="evc-card-title">{s.title}</h3>
              <p className="evc-card-makes">{s.whatItMakes}</p>
              <dl className="evc-meta">
                <div>
                  <dt>You give it</dt>
                  <dd>{s.inputs}</dd>
                </div>
                <div>
                  <dt>Proof</dt>
                  <dd>{s.proof}</dd>
                </div>
              </dl>
              {!unlocked && (
                <div className="evc-locked">
                  <Lock size={13} /> Master prompt locked
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ───────────── GATE ───────────── */}
      <section id="unlock" className="wrap evc-section evc-gate-wrap">
        {!unlocked ? (
          <EmailGate
            toolSlug="video-editing-playbook"
            toolName="Claude Code Video Prompts"
            promise={`all ${VIDEO_SKILL_COUNT} master prompts now`}
            subnote="Plus every new prompt as we ship it. Unsubscribe anytime."
            buttonLabel="Unlock the prompts →"
            finePrint={
              <>
                By unlocking you agree I can store your email and send the
                prompts plus new ones. No spam, unsubscribe from any email. See
                our{" "}
                <Link
                  href="/privacy-policy"
                  style={{ textDecoration: "underline", color: "inherit" }}
                >
                  privacy policy
                </Link>
                .
              </>
            }
            onUnlock={() => setSessionUnlocked(true)}
          />
        ) : (
          <div className="evc-unlocked-banner">
            <Check size={16} /> Unlocked — every master prompt is below, and
            you&apos;re on the list for new ones. Copy, fill the brackets, run
            it in Claude Code.
          </div>
        )}
      </section>

      {/* ───────────── MASTER PROMPT LIBRARY ───────────── */}
      {unlocked && (
        <section className="wrap evc-section">
          <h2 className="evc-h2">Master prompt library</h2>
          <p className="evc-section-sub">
            Paste any prompt into Claude Code, replace the [BRACKETS] with your
            files, and let it render. They also run in plain Claude or ChatGPT.
          </p>

          <div className="evc-prompts">
            {VIDEO_SKILLS.map((s) => (
              <details
                key={s.slug}
                className="evc-prompt"
                open={s.slug === VIDEO_SKILLS[0].slug}
              >
                <summary className="evc-prompt-summary">
                  <span>
                    <span className="evc-tag evc-tag-sm">{s.tag}</span>
                    {s.title}
                  </span>
                  <span className="evc-prompt-toggle">view prompt</span>
                </summary>

                <div className="evc-prompt-body">
                  <div className="evc-prompt-actions">
                    <button
                      type="button"
                      className="evc-copy"
                      aria-live="polite"
                      onClick={() => copy(s.slug, s.masterPrompt)}
                    >
                      {copied === s.slug ? (
                        <>
                          <Check size={14} /> Copied to clipboard
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy prompt
                        </>
                      )}
                    </button>
                    <a
                      className="evc-open"
                      href={claudeLink(s.masterPrompt)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Claude →
                    </a>
                  </div>
                  <pre className="evc-pre">{s.masterPrompt}</pre>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ───────────── FINAL CTA ───────────── */}
      <section className="wrap evc-section evc-final">
        <h2 className="evc-h2">Want us to just edit it for you?</h2>
        <p className="evc-section-sub">
          Hand us the raw footage. We run these exact prompts and send back the
          finished cut. Book a 15-minute call.
        </p>
        <Link href="/discovery-call" className="evc-cta">
          Book a discovery call <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}

const css = `
.evc { --evc-radius: 2px; background: var(--cream, #F2EFE6); color: var(--ink, #1A1A1A); font-family: var(--font-sans), system-ui, sans-serif; }
.evc *, .evc *::before, .evc *::after { box-sizing: border-box; }
.evc .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.evc-section { padding: 56px 24px; }

.evc-eyebrow { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--terracotta, #C66B3F); display: inline-flex; align-items: center; gap: 12px; margin-bottom: 22px; }
.evc-rule { width: 28px; height: 1px; background: var(--terracotta, #C66B3F); display: inline-block; }

.evc-hero { padding-top: 72px; padding-bottom: 24px; }
.evc-h1 { font-family: var(--font-display), serif; font-weight: 500; font-size: clamp(38px, 6.5vw, 68px); line-height: 1.02; letter-spacing: -0.025em; margin: 0 0 22px; max-width: 16ch; }
.evc-accent { color: var(--terracotta, #C66B3F); }
.evc-sub { font-size: clamp(16px, 2vw, 19px); line-height: 1.6; color: var(--ink-2, #3A3A36); max-width: 60ch; margin: 0 0 30px; }

.evc-cta { display: inline-flex; align-items: center; gap: 9px; background: var(--terracotta, #C66B3F); color: var(--cream-3, #FAF7F0); font-weight: 700; font-size: 15px; padding: 15px 26px; border-radius: var(--evc-radius); text-decoration: none; transition: opacity .15s ease; }
.evc-cta:hover { opacity: .9; }

.evc-proof { display: flex; flex-wrap: wrap; gap: 40px; margin-top: 52px; padding-top: 30px; border-top: 1px solid rgba(26,26,26,0.12); }
.evc-proof-metric { font-family: var(--font-display), serif; font-size: 30px; font-weight: 500; letter-spacing: -0.02em; color: var(--ink, #1A1A1A); }
.evc-proof-label { font-size: 13px; color: var(--ink-faint, #6B6B65); margin-top: 4px; max-width: 22ch; }

.evc-h2 { font-family: var(--font-display), serif; font-weight: 500; font-size: clamp(28px, 4vw, 40px); letter-spacing: -0.02em; line-height: 1.08; margin: 0 0 12px; }
.evc-section-sub { font-size: 16px; color: var(--ink-2, #3A3A36); max-width: 56ch; margin: 0 0 34px; line-height: 1.55; }

.evc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; }
.evc-card { background: var(--cream-3, #FAF7F0); border: 1px solid rgba(26,26,26,0.14); border-radius: var(--evc-radius); padding: 24px 22px 20px; position: relative; display: flex; flex-direction: column; }
.evc-tag { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--terracotta, #C66B3F); border: 1px solid rgba(198,107,63,0.4); border-radius: 999px; padding: 3px 10px; align-self: flex-start; margin-bottom: 14px; }
.evc-tag-sm { margin: 0 12px 0 0; display: inline-block; }
.evc-card-title { font-family: var(--font-display), serif; font-weight: 500; font-size: 21px; letter-spacing: -0.015em; line-height: 1.15; margin: 0 0 10px; }
.evc-card-makes { font-size: 14px; line-height: 1.5; color: var(--ink-2, #3A3A36); margin: 0 0 16px; }
.evc-meta { margin: 0 0 4px; display: grid; gap: 11px; }
.evc-meta dt { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--ink-faint, #6B6B65); margin-bottom: 3px; }
.evc-meta dd { margin: 0; font-size: 13px; line-height: 1.45; color: var(--ink-2, #3A3A36); }
.evc-locked { margin-top: 16px; padding-top: 14px; border-top: 1px dashed rgba(26,26,26,0.18); display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink-faint, #6B6B65); }

.evc-gate-wrap { max-width: 640px; }
.evc-unlocked-banner { display: flex; align-items: center; gap: 10px; background: rgba(138,154,123,0.16); border: 1px solid rgba(138,154,123,0.5); border-radius: var(--evc-radius); padding: 18px 22px; font-size: 15px; font-weight: 600; color: var(--ink, #1A1A1A); }

.evc-prompts { display: flex; flex-direction: column; gap: 12px; }
.evc-prompt { background: var(--cream-3, #FAF7F0); border: 1px solid rgba(26,26,26,0.14); border-radius: var(--evc-radius); overflow: hidden; }
.evc-prompt-summary { cursor: pointer; list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 22px; font-family: var(--font-display), serif; font-size: 19px; font-weight: 500; letter-spacing: -0.01em; }
.evc-prompt-summary::-webkit-details-marker { display: none; }
.evc-prompt-summary > span:first-child { display: inline-flex; align-items: center; }
.evc-prompt-toggle { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--terracotta, #C66B3F); white-space: nowrap; }
.evc-prompt[open] .evc-prompt-toggle { color: var(--ink-faint, #6B6B65); }
.evc-prompt-body { padding: 0 22px 22px; }
.evc-prompt-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
.evc-copy { display: inline-flex; align-items: center; gap: 7px; background: var(--terracotta, #C66B3F); color: var(--cream-3, #FAF7F0); border: none; border-radius: var(--evc-radius); padding: 9px 16px; font-family: var(--font-sans); font-weight: 700; font-size: 13px; cursor: pointer; transition: opacity .15s ease; }
.evc-copy:hover { opacity: .9; }
.evc-open { display: inline-flex; align-items: center; background: transparent; color: var(--ink, #1A1A1A); border: 1px solid rgba(26,26,26,0.26); border-radius: var(--evc-radius); padding: 9px 16px; font-size: 13px; font-weight: 600; text-decoration: none; transition: border-color .15s ease; }
.evc-open:hover { border-color: var(--terracotta, #C66B3F); }
.evc-pre { background: #1A1A1A; color: #F2EFE6; font-family: var(--font-mono), ui-monospace, monospace; font-size: 12.5px; line-height: 1.6; padding: 20px; border-radius: var(--evc-radius); overflow-x: auto; white-space: pre-wrap; word-break: break-word; margin: 0; max-height: 460px; overflow-y: auto; }

.evc-final { text-align: center; border-top: 1px solid rgba(26,26,26,0.12); margin-top: 24px; }
.evc-final .evc-section-sub { margin-left: auto; margin-right: auto; }

@media (max-width: 560px) {
  .evc-section { padding: 40px 20px; }
  .evc-hero { padding-top: 52px; }
  .evc-proof { gap: 26px; }
}
`;
