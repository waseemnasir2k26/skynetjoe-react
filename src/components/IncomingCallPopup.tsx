"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Phone, PhoneOff, Signal } from "lucide-react";

const SESSION_KEY = "incoming-call-shown";
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
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    if (new URLSearchParams(window.location.search).get("popup") === "off") return;

    const t = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
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

  const accept = () => {
    setVisible(false);
    router.push("/discovery-call");
  };
  const decline = () => setVisible(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: callCss }} />
      <div className="ic-wrap" role="dialog" aria-label="Incoming call from Waseem Nasir">
        <div className="ic-bar">
          <Signal className="ic-sig" />
          <span>AI Automation · skynetjoe.com</span>
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
              <div className="ic-role">Founder · SkynetLabs</div>
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  animation: ic-slide 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2);
}
@keyframes ic-slide {
  0% { transform: translate(-50%, -120%); opacity: 0; }
  100% { transform: translate(-50%, 0); opacity: 1; }
}
.ic-bar {
  display: flex; align-items: center; gap: 8px;
  background: #1f2937; color: rgba(255,255,255,0.85);
  padding: 6px 12px; font-size: 11px; letter-spacing: 0.04em;
  border-radius: 12px 12px 0 0;
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: 0;
}
.ic-sig { width: 12px; height: 12px; color: #25D366; }
.ic-card {
  background: linear-gradient(180deg, #0a3d2e 0%, #075e54 60%, #054d44 100%);
  color: #fff;
  padding: 16px 16px 14px;
  border-radius: 0 0 16px 16px;
  border: 1px solid rgba(37, 211, 102, 0.4);
  border-top: 0;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,211,102,0.12);
}
.ic-row { display: flex; align-items: center; gap: 14px; }
.ic-avatar {
  position: relative; width: 56px; height: 56px; border-radius: 50%;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ic-init {
  font-size: 18px; font-weight: 700; color: #fff;
  letter-spacing: -0.01em;
}
.ic-ring {
  position: absolute; inset: -6px;
  border: 2px solid rgba(37, 211, 102, 0.55);
  border-radius: 50%;
  animation: ic-ring 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.ic-ring-2 { animation-delay: 0.8s; }
@keyframes ic-ring {
  0% { transform: scale(0.9); opacity: 0.9; }
  100% { transform: scale(1.5); opacity: 0; }
}
.ic-meta { flex: 1; min-width: 0; }
.ic-name { font-size: 16px; font-weight: 600; line-height: 1.2; }
.ic-role { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 2px; }
.ic-status {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; color: #aaf3c2; margin-top: 6px;
  font-style: italic;
}
.ic-dot {
  width: 6px; height: 6px; background: #25D366; border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  animation: ic-pulse 1.2s ease-out infinite;
}
@keyframes ic-pulse {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
  70% { box-shadow: 0 0 0 8px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
.ic-actions {
  display: flex; gap: 10px; margin-top: 14px;
}
.ic-btn {
  flex: 1; padding: 11px 14px; border: 0; border-radius: 10px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  transition: transform 0.15s, filter 0.15s, box-shadow 0.15s;
  color: #fff;
  font-family: inherit;
}
.ic-btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
.ic-btn:active { transform: translateY(0); }
.ic-btn-decline {
  background: #dc2626; flex: 0 0 56px;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.4);
}
.ic-btn-accept {
  background: #25D366;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.45);
  animation: ic-shake 0.9s ease-in-out infinite;
}
@keyframes ic-shake {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-3deg); }
  40% { transform: rotate(3deg); }
  60% { transform: rotate(-2deg); }
  80% { transform: rotate(2deg); }
}
.ic-btn-accept:hover { animation: none; }
.ic-foot {
  margin-top: 10px; text-align: center;
  font-size: 11px; color: rgba(255,255,255,0.55);
  letter-spacing: 0.02em;
}
@media (prefers-reduced-motion: reduce) {
  .ic-wrap, .ic-ring, .ic-dot, .ic-btn-accept { animation: none !important; }
}
`;
