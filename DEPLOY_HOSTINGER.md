# Hostinger Node.js Web App — Deploy guide

## Hostinger plan
WordPress Hosting Premium+ with Node.js Web App add-on enabled.

## First-time setup (in Hostinger panel)
1. Create new website → "Node.js Web App"
2. Source: connect GitHub repo `waseemnasir2k26/skynetjoe-react`
3. Branch: `main`
4. Node version: **20.9 or higher** (Payload v3 + Next.js 16 requirement, also pinned in `package.json` engines)
5. Build command: `npm install && npm run build`
6. Start command: `npm run start`
7. Auto-deploy on push: ON

## Required env vars (Hostinger panel → Env Variables)

### Critical (site won't function without):
- `PAYLOAD_SECRET` = generate via `openssl rand -hex 32`
- `DATABASE_URI` = `file:/home/<your-user>/data/payload.db`  ← USE ABSOLUTE PATH
- `GHL_API_TOKEN` = your GHL Private Integration Token
- `GHL_LOCATION_ID` = `HSQ2lvxtEpWQUVinspzq`
- `GHL_PIPELINE_ID` = `y1EwUjRMn2UWd9g2paa3`
- `CALENDLY_WEBHOOK_SECRET` = from Calendly webhook setup (REQUIRED in prod — webhook fail-closes without it)
- `NEXT_PUBLIC_SITE_URL` = `https://waseemnasir.com` (or chosen apex domain)
- `NEXT_PUBLIC_SITE_DOMAIN` = `waseemnasir.com`
- `NEXT_PUBLIC_SITE_ASSETS_URL` = same as SITE_URL

### Optional (with safe fallbacks):
- `SLACK_FEEDBACK_WEBHOOK` — tool feedback Slack sink
- `RESEND_API_KEY` + `RESEND_FROM` + `LEAD_NOTIFY_EMAIL` — discovery email fallback
- `GHL_DISCOVERY_WEBHOOK_URL` — legacy discovery form
- `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA4_ID` — analytics

## Persistent disk paths (CRITICAL)

Hostinger Node.js Web Apps wipe the deploy tree on every git redeploy. To preserve SQLite data + uploaded media:

### SQLite database
1. SSH into Hostinger account
2. `mkdir -p /home/<user>/data`
3. `touch /home/<user>/data/payload.db` (or copy existing if migrating)
4. Set DATABASE_URI to `file:/home/<user>/data/payload.db`

### Payload media uploads
After first deploy, SSH and run:
```
ln -sfn /home/<user>/data/media /home/<user>/public_html/public/media
```
This symlinks deploy-tree media folder to persistent storage. OR migrate to S3-compatible storage:
- Install `@payloadcms/storage-s3`
- Configure with Cloudflare R2 / Hostinger Object Storage
- Update `payload.config.ts` Media collection storage adapter

## Seed first-boot data
After first successful deploy + SSH:
```bash
PAYLOAD_SECRET=<your-secret> DATABASE_URI=file:/home/<user>/data/payload.db npx tsx scripts/seed-payload.mjs
```
Populates 16 services + Settings global. Idempotent — safe to re-run.

## Create first admin user
After seed, visit `https://<your-domain>/admin`. Payload auto-redirects to first-user signup form. Set email + strong password.

## DNS cutover
1. In Hostinger panel: get the Node.js Web App's public URL (or static IP)
2. Update DNS A record for `waseemnasir.com` (or apex) to point to Hostinger
3. Wait propagation (5-30 min)
4. Hit `/sitemap.xml` to confirm canonical URLs use new domain (driven by NEXT_PUBLIC_SITE_URL env)
5. Submit new sitemap in Google Search Console

## Verification commands (post-deploy)
```bash
curl -I https://waseemnasir.com/                    # 200
curl -I https://waseemnasir.com/admin                # 200 (Payload login)
curl https://waseemnasir.com/api/services?limit=20   # JSON w/ 16 services
curl https://waseemnasir.com/sitemap.xml             # XML
curl https://waseemnasir.com/robots.txt              # has Disallow /admin
curl https://waseemnasir.com/llms.txt                # LLM citation surface
curl https://waseemnasir.com/api/webhooks/calendly   # 200 health check
```

## Post-cutover from Vercel
1. Keep Vercel deploy running until DNS fully propagated + Hostinger confirmed
2. Switch Calendly webhook URL to point at Hostinger
3. Update GSC property to new domain
4. Disable Vercel auto-deploy (or delete project) once stable
