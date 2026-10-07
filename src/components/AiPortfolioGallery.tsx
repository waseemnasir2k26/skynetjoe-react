"use client";

/**
 * AiPortfolioGallery — /aiportfolio. 109 AI-generated videos in 11 categories.
 *
 * Design rules (cream kit, 2026-10-07):
 *   - Sticky category rail under the header; scroll-spy highlights the section
 *     in view; clicking a chip smooth-scrolls to that section.
 *   - Each section = heading + blurb + responsive grid. Portrait tiles are 9:16,
 *     landscape tiles span two columns at 16:9, so the grid reads as a wall of
 *     video, not a list.
 *   - Playback is a Google Drive preview iframe mounted ONLY inside the
 *     lightbox after a click. Nothing from Google loads on page load; the
 *     thumbnails are first-party webp files.
 *   - Lightbox: Esc closes, ← → move within the category, backdrop click closes,
 *     focus returns to the tile that opened it.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from "lucide-react";
import {
  AI_CATEGORIES,
  AI_VIDEOS,
  driveOpenUrl,
  drivePreviewUrl,
  thumbUrl,
  type AiCategoryKey,
  type AiVideo,
} from "@/lib/ai-portfolio";

const SECTION_ID = (k: AiCategoryKey) => `ai-${k}`;

export default function AiPortfolioGallery() {
  const reduce = useReducedMotion();
  const byCat = useMemo(() => {
    const map = new Map<AiCategoryKey, AiVideo[]>();
    for (const c of AI_CATEGORIES) map.set(c.key, []);
    for (const v of AI_VIDEOS) map.get(v.cat)?.push(v);
    return map;
  }, []);

  // ── scroll-spy ────────────────────────────────────────────────────────────
  const [activeCat, setActiveCat] = useState<AiCategoryKey>(
    AI_CATEGORIES[0].key,
  );
  useEffect(() => {
    const els = AI_CATEGORIES.map((c) =>
      document.getElementById(SECTION_ID(c.key)),
    ).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveCat(
            visible[0].target.id.replace("ai-", "") as AiCategoryKey,
          );
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    els.forEach((e) => io.observe(e));
    // An instant jump to the top leaves no intersection event behind; pin the
    // first chip whenever the rail is above every section.
    const onScroll = () => {
      const first = els[0];
      if (first && first.getBoundingClientRect().top > 160) {
        setActiveCat(AI_CATEGORIES[0].key);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // keep the active chip in view on the horizontal rail (phones)
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chip = railRef.current?.querySelector<HTMLElement>(
      `[data-chip="${activeCat}"]`,
    );
    chip?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  }, [activeCat]);

  const jump = (k: AiCategoryKey) => {
    const el = document.getElementById(SECTION_ID(k));
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 128;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  // ── lightbox ──────────────────────────────────────────────────────────────
  const [open, setOpen] = useState<AiVideo | null>(null);
  // The lightbox portals to <body>: any transformed/animated ancestor would
  // otherwise trap the fixed overlay in its own stacking context, under the
  // consent bar and the chat launcher.
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  useEffect(() => setPortalEl(document.body), []);
  const openerRef = useRef<HTMLElement | null>(null);
  const siblings = open ? (byCat.get(open.cat) ?? []) : [];
  const idx = open ? siblings.findIndex((v) => v.id === open.id) : -1;
  const go = useCallback(
    (dir: 1 | -1) => {
      if (!open) return;
      const list = byCat.get(open.cat) ?? [];
      const i = list.findIndex((v) => v.id === open.id);
      const next = list[(i + dir + list.length) % list.length];
      if (next) setOpen(next);
    },
    [open, byCat],
  );
  const close = useCallback(() => {
    setOpen(null);
    openerRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        const root = document.querySelector<HTMLElement>(".aip-lb-card");
        if (!root) return;
        const f = root.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, go]);

  return (
    <div className="aip">
      {/* ── category rail ── */}
      <nav className="aip-rail" aria-label="Portfolio categories">
        <div className="aip-rail-inner" ref={railRef}>
          {AI_CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              data-chip={c.key}
              className={`aip-chip${activeCat === c.key ? " is-active" : ""}`}
              aria-current={activeCat === c.key ? "true" : undefined}
              onClick={() => jump(c.key)}
            >
              {c.name}
              <span className="aip-chip-n">
                {byCat.get(c.key)?.length ?? 0}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── sections ── */}
      {AI_CATEGORIES.map((c, ci) => {
        const vids = byCat.get(c.key) ?? [];
        if (!vids.length) return null;
        return (
          <section
            key={c.key}
            id={SECTION_ID(c.key)}
            className="aip-section"
            aria-labelledby={`${SECTION_ID(c.key)}-h`}
          >
            <header className="aip-section-head">
              <span className="aip-section-num">
                {String(ci + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 id={`${SECTION_ID(c.key)}-h`} className="aip-section-title">
                  {c.name}
                </h2>
                <p className="aip-section-blurb">{c.blurb}</p>
              </div>
              <span className="aip-section-count">
                {vids.length} {vids.length === 1 ? "piece" : "pieces"}
              </span>
            </header>
            <ul className="aip-grid" role="list">
              {vids.map((v, i) => (
                <motion.li
                  key={v.id}
                  className={`aip-tile is-${v.orient}`}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04 }}
                >
                  <button
                    type="button"
                    className="aip-tile-btn"
                    onClick={(e) => {
                      openerRef.current = e.currentTarget;
                      setOpen(v);
                    }}
                    aria-label={`Play: ${v.title}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbUrl(v.id)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={v.orient === "portrait" ? 270 : 480}
                      height={v.orient === "portrait" ? 480 : 270}
                    />
                    <span className="aip-tile-play" aria-hidden="true">
                      <Play size={18} fill="currentColor" />
                    </span>
                    <span className="aip-tile-cap">
                      <span className="aip-tile-title">{v.title}</span>
                      <span className="aip-tile-meta">
                        {v.orient === "portrait" ? "9:16" : "16:9"}
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* ── lightbox (portal) ── */}
      {portalEl &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="aip-lb"
                role="dialog"
                aria-modal="true"
                aria-label={open.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={close}
              >
                <motion.div
                  className={`aip-lb-card is-${open.orient}`}
                  initial={reduce ? false : { scale: 0.96, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={reduce ? undefined : { scale: 0.98, y: 6 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="aip-lb-top">
                    <div>
                      <p className="aip-lb-cat">
                        {AI_CATEGORIES.find((c) => c.key === open.cat)?.name}
                        <span>
                          {" "}
                          · {idx + 1} / {siblings.length}
                        </span>
                      </p>
                      <h3 className="aip-lb-title">{open.title}</h3>
                    </div>
                    <div className="aip-lb-actions">
                      <a
                        href={driveOpenUrl(open.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aip-lb-ext"
                        aria-label="Open in Google Drive"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        type="button"
                        className="aip-lb-close"
                        onClick={close}
                        aria-label="Close"
                        autoFocus
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="aip-lb-frame">
                    <iframe
                      key={open.id}
                      src={drivePreviewUrl(open.id)}
                      title={open.title}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      loading="eager"
                    />
                  </div>
                  {siblings.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="aip-lb-nav is-prev"
                        onClick={() => go(-1)}
                        aria-label="Previous video"
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button
                        type="button"
                        className="aip-lb-nav is-next"
                        onClick={() => go(1)}
                        aria-label="Next video"
                      >
                        <ChevronRight size={22} />
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalEl,
        )}
    </div>
  );
}
