# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2026.10] - 2026-10-12

- October 2026 review of skynetjoe-react, the public Next.js 16 / React 19 / Tailwind v4 rebuild of skynetjoe.com for SkynetLabs; package version bumped 0.2.0 to 0.3.0, documentation and metadata only.
- Status: last code commit 2026-06-04; deploy is an archive upload to Hostinger per DEPLOY-REAL.md, which supersedes DEPLOY_HOSTINGER.md.
- Reviewed this month: README links checked, all resolve (localhost excluded); a Work with SkynetLabs footer was added.
- Known gaps: README below the project header is still create-next-app boilerplate; package.json name is the generic `app`; no LICENSE; about 40 dated planning and audit markdown files sit in the repo root; two conflicting deploy documents remain.

## [2026.09] - 2026-09-16

- Maintenance review of skynetjoe-react — the Next.js rebuild of skynetjoe.com (SkynetLabs), Next 16.2.6 / React 19.2.4 / TypeScript / Tailwind v4, App Router under `src/app/(skynet)`.
- Status: app code in `src/` (app, components, data, lib, `proxy.ts`), build helpers in `scripts/` (`sync-wp-templates.mjs` runs on `predev`/`prebuild`, plus `seo:check` via `scripts/seo-guard.mjs`), content in `content/`, `robots.ts` and `sitemap.ts` generated in-app. Last code commit was 2026-06-05.
- Deployment is documented in `DEPLOY-REAL.md` as an archive upload via the Hostinger MCP (`scripts/deploy-archive.ps1` / `.sh`); that file explicitly supersedes `DEPLOY_HOSTINGER.md`, whose GitHub auto-deploy flow is not wired.
- The repo root carries ~40 dated planning/audit markdown documents (SEO, AEO, parity audits, page specs, session state) alongside the code.
- Reviewed September 2026: docs refreshed, package version bumped to 0.2.0, versioned as v2026.09. No application code, dependency or deploy-script changes in this release.
- Known gaps: README.md was still the untouched `create-next-app` boilerplate (a project header and Status section have now been added above it); `package.json` name is still the generic `app`; no LICENSE; no CHANGELOG.md before this release; two conflicting deploy documents remain in the tree.
