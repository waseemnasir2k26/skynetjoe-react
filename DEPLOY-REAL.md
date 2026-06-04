# Deploying skynetjoe.com (the REAL mechanism)

> This is the **accurate** deploy guide. The older `DEPLOY_HOSTINGER.md` describes
> a GitHub auto-deploy flow that is **NOT wired** — ignore it for deploys.

## TL;DR

```powershell
# Windows
.\scripts\deploy-archive.ps1
```
```bash
# macOS / Linux / Git Bash
./scripts/deploy-archive.sh
```

That builds `./skynetjoe-deploy.zip` from `HEAD`, verifies it, and prints the
exact Hostinger MCP call to run. One command → ready to deploy.

## What's actually true

| Fact | Value |
| --- | --- |
| Host | Hostinger **Node.js Web App** |
| Domain | `skynetjoe.com` |
| Hostinger username | `u361032549` |
| App type | `next` (Node **20**, output **standalone**) |
| Build (server-side) | `npm install && npm run build` (build script: `build`, output dir `.next`) |
| Deploy mechanism | **Manual ZIP source-archive upload** via the Hostinger API / MCP |
| GitHub auto-deploy | **NOT configured.** Pushing to `main` does nothing on the host. |

## How a deploy works

1. **Build a source archive** — git-tracked files only, **no** `node_modules`,
   **no** `.next`, **no** `.git`:

   ```bash
   git archive --format=zip -o ./skynetjoe-deploy.zip HEAD
   ```

   The helper scripts do exactly this plus safety checks. Prefer them:
   - `scripts/deploy-archive.ps1` (Windows / PowerShell)
   - `scripts/deploy-archive.sh` (bash)

   They warn on a dirty tree (the archive is built from **HEAD**, so uncommitted
   changes are excluded), then fail loudly if the zip is missing `package.json`
   or `next.config.ts`, or if it contains `node_modules/`, `.next/`, or `.git/`.

2. **Upload + build** via the Hostinger MCP tool (operator / Claude runs this):

   ```
   hosting_deployJsApplication
     domain      : skynetjoe.com
     archivePath : <absolute path to skynetjoe-deploy.zip>
   ```

   Hostinger unpacks the archive, runs `npm install && npm run build`, and
   serves the standalone server.

3. **Check status:**

   ```
   hosting_listJsDeployments
     domain : skynetjoe.com
   ```

4. **Read build / runtime logs** for a specific deployment:

   ```
   hosting_showJsDeploymentLogs
     domain       : skynetjoe.com
     deploymentId : <id from hosting_listJsDeployments>
   ```

## Rollback

There is no host-side "previous version" button. To roll back, **re-archive an
older commit and redeploy it**:

```bash
# Example: roll back to the known-good commit d1db17a
git archive --format=zip -o ./skynetjoe-deploy.zip d1db17a

# then trigger:
#   hosting_deployJsApplication  domain=skynetjoe.com  archivePath=<abs path>
```

Pick any commit SHA you trust (`git log --oneline` to find one). The same
`hosting_listJsDeployments` / `hosting_showJsDeploymentLogs` tools confirm the
rollback landed.

## Environment variables

Set these in the Hostinger panel → Environment Variables. The one that must be
correct for canonical URLs / sitemap / OG tags:

- **`NEXT_PUBLIC_SITE_URL` = `https://skynetjoe.com`** (no trailing slash)

This drives canonical links, the sitemap, and Open Graph URLs. If it's wrong,
canonicals point at the wrong host. (The Payload/`DATABASE_URI`/`PAYLOAD_SECRET`
vars listed in the legacy doc no longer apply — Payload CMS was removed
2026-05-29 and the site is fully data-file/MDX driven with no DB.)

## One-liner pointer

Build the archive with `scripts/deploy-archive.ps1` (Windows) or
`scripts/deploy-archive.sh` (bash), then run the `hosting_deployJsApplication`
MCP call it prints.
