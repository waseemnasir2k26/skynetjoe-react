"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Phone, PhoneOff, Signal } from "lucide-react";

/**
 * IncomingCallPopup — cream-tinted variant.
 *
 * Functional logic intact (10s delay, 12s ring, sessionStorage, ?popup=off).
 * Visual: cream paper card, terracotta pulse, sage accent for accept.
 */

const SESSION_KEY = "incoming-call-shown";
const SHARED_POPUP_KEY = "skynet-popup-fired";
const FIRE_DELAY_MS = 10000;
const RING_SECONDS = 12;

export default function IncomingCallPopup() {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [seconds, setSeconds] = useState(RING_SECONDS);

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/lp/")) return;
    if (pathname.startsWith("/discovery-call")) return;
    if (pathname.startsWith("/api/")) return;

    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SHARED_POPUP_KEY) === "1") return;
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    if (new URLSearchParams(window.location.search).get("popup") === "off") return;

    const t = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
      try {
        sessionStorage.setItem(SHARED_POPUP_KEY, "1");
      } catch {}
    }, FIRE_DELAY_MS);

    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    if (seconds <= 0) {
      setVisible(false);
      return;
    }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [visible, seconds]);

  if (!visible) return null;

  const clearShared = () => {
    try {
      sessionStorage.removeItem(SHARED_POPUP_KEY);
    } catch {}
  };
  const accept = () => {
    clearShared();
    setVisible(false);
    router.push("/discovery-call");
  };
  const decline = () => {
    clearShared();
    setVisible(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: callCss }} />
      <div className="ic-wrap" role="dialog" aria-label="Incoming call from Waseem Nasir">
        <div className="ic-bar">
          <Signal className="ic-sig" />
          <span>— ai automation · skynetjoe.com</span>
        </div>
        <div className="ic-card">
          <div className="ic-row">
            <div className="ic-avatar">
              <span className="ic-ring" />
              <span className="ic-ring ic-ring-2" />
              <span className="ic-init">WN</span>
            </div>
            <div className="ic-meta">
              <div className="ic-name">Waseem Nasir</div>
              <div className="ic-role">— founder · skynetlabs</div>
              <div className="ic-status">
                <span className="ic-dot" />
                incoming call...
              </div>
            </div>
          </div>
          <div className="ic-actions">
            <button onClick={decline} className="ic-btn ic-btn-decline" aria-label="Decline call">
              <PhoneOff className="w-5 h-5" />
            </button>
            <button onClick={accept} className="ic-btn ic-btn-accept" aria-label="Accept call">
              <Phone className="w-5 h-5" />
              <span>Answer</span>
            </button>
          </div>
          <div className="ic-foot">Waseem stops calling in {seconds}s</div>
        </div>
      </div>
    </>
  );
}

const callCss = `
.ic-wrap {
  position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
  z-index: 70; width: min(360px, calc(100vw - 24px));
  font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  animation: ic-slide 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2);
}
@keyframes ic-slide {
  0% { transform: translate(-50%, -120%); opacity: 0; }
  100% { transform: translate(-50%, 0); opacity: 1; }
}
.ic-bar {
  display: flex; align-items: center; gap: 8px;
  background: var(--cream-2);
  color: var(--ink-faint);
  padding: 6px 12px;
  font-family: var(--font-mono);
  font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
  border-radius: 2px 2px 0 0;
  border: 1px solid rgba(26,26,26,0.18);
  border-bottom: 0;
}
.ic-sig { width: 12px; height: 12px; color: var(--sage); }
.ic-card {
  background: var(--cream-3);
  color: var(--ink);
  padding: 16px 16px 14px;
  border-radius: 0 0 2px 2px;
  border: 1px solid rgba(26,26,26,0.18);
  border-top: 0;
  border-left: 1px solid rgba(26,26,26,0.18);
  border-right: 1px solid rgba(26,26,26,0.18);
  border-bottom: 1px solid rgba(26,26,26,0.18);
  box-shadow: 0 18px 48px rgba(26,26,26,0.20);
  position: relative;
}
.ic-card::before {
  content: "";
  position: absolute; top: 0; left: -1px; right: -1px;
  height: 3px; background: var(--terracotta);
}
.ic-row { display: flex; align-items: center; gap: 14px; padding-top: 4px; }
.ic-avatar {
  position: relative; width: 56px; height: 56px; border-radius: 50%;
  background: var(--terracotta);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ic-init {
  font-size: 18px; font-weight: 700; color: var(--cream-3);
  letter-spacing: -0.01em;
  font-family: var(--font-display);
}
.ic-ring {
  position: absolute; inset: -6px;
  border: 2px solid rgba(198, 107, 63, 0.55);
  border-radius: 50%;
  animation: ic-ring 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.ic-ring-2 { animation-delay: 0.8s; }
@keyframes ic-ring {
  0% { transform: scale(0.9); opacity: 0.9; }
  100% { transform: scale(1.5); opacity: 0; }
}
.ic-meta { flex: 1; min-width: 0; }
.ic-name {
  font-family: var(--font-display);
  font-size: 17px; font-weight: 600; line-height: 1.2;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.ic-role {
  font-family: var(--font-mono);
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--ink-faint);
  margin-top: 4px;
}
.ic-status {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--terracotta);
  margin-top: 6px;
  font-style: italic;
}
.ic-dot {
  width: 6px; height: 6px; background: var(--terracotta); border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(198, 107, 63, 0.7);
  animation: ic-pulse 1.2s ease-out infinite;
}
@keyframes ic-pulse {
  0% { box-shadow: 0 0 0 0 rgba(198, 107, 63, 0.6); }
  70% { box-shadow: 0 0 0 8px rgba(198, 107, 63, 0); }
  100% { box-shadow: 0 0 0 0 rgba(198, 107, 63, 0); }
}
.ic-actions {
  display: flex; gap: 10px; margin-top: 14px;
}
.ic-btn {
  flex: 1; padding: 11px 14px; border: 0; border-radius: 2px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  transition: transform 0.15s, filter 0.15s;
  font-family: inherit;
}
.ic-btn:hover { transform: translateY(-1px); filter: brightness(0.95); }
.ic-btn:active { transform: translateY(0); }
.ic-btn-decline {
  background: transparent;
  color: var(--oxblood);
  border: 1px solid rgba(107, 44, 44, 0.50);
  flex: 0 0 56px;
}
.ic-btn-decline:hover { background: rgba(107, 44, 44, 0.08); filter: none; }
.ic-btn-accept {
  background: var(--terracotta);
  color: var(--cream-3);
  animation: ic-shake 0.9s ease-in-out infinite;
}
@keyframes ic-shake {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-3deg); }
  40% { transform: rotate(3deg); }
  60% { transform: rotate(-2deg); }
  80% { transform: rotate(2deg); }
}
.ic-btn-accept:hover { animation: none; filter: brightness(0.95); }
.ic-foot {
  margin-top: 10px; text-align: center;
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-faint);
}
@media (prefers-reduced-motion: reduce) {
  .ic-wrap, .ic-ring, .ic-dot, .ic-btn-accept { animation: none !important; }
}
`;
