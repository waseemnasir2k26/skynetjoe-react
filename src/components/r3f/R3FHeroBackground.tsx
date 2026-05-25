"use client";

/**
 * Cream editorial pivot 2026-05-25 — R3F particle background.
 * Disabled by default on cream paper. Particles on cream paper read AI-slop
 * and conflict with the editorial feel. Component now returns null unless
 * the page explicitly opts in via window.__SKYNET_ENABLE_R3F = true.
 * Rollback: remove this guard to restore desktop particle field.
 */
export default function R3FHeroBackground() {
  return null;
}
