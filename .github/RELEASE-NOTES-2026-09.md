# Release notes - 2026.09

- Maintenance review of skynetjoe-react — the Next.js rebuild of skynetjoe.com (SkynetLabs), Next 16.2.6 / React 19.2.4 / TypeScript / Tailwind v4, App Router under `src/app/(skynet)`.
- Status: app code in `src/` (app, components, data, lib, `proxy.ts`), build helpers in `scripts/` (`sync-wp-templates.mjs` runs on `predev`/`prebuild`, plus `seo:check` via `scripts/seo-guard.mjs`), content in `content/`, `robots.ts` and `sitemap.ts` generated in-app. Last code commit was 2026-06-05.
- Deployment is documented in `DEPLOY-REAL.md` as an archive upload via the Hostinger MCP (`scripts/deploy-archive.ps1` / `.sh`); that file explicitly supersedes `DEPLOY_HOSTINGER.md`, whose GitHub auto-deploy flow is not wired.
- The repo root carries ~40 dated planning/audit markdown documents (SEO, AEO, parity audits, page specs, session state) alongside the code.
- Reviewed September 2026: docs refreshed, package version bumped to 0.2.0, versioned as v2026.09. No application code, dependency or deploy-script changes in this release.
- Known gaps: README.md was still the untouched `create-next-app` boilerplate (a project header and Status section have now been added above it); `package.json` name is still the generic `app`; no LICENSE; no CHANGELOG.md before this release; two conflicting deploy documents remain in the tree.
