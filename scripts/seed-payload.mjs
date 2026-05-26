/**
 * Seed script — populates Payload SQLite with all 16 services + N news + N case studies.
 *
 * Run: PAYLOAD_SECRET=dev DATABASE_URI=file:./payload.db npx tsx scripts/seed-payload.mjs
 *
 * Idempotent — uses upsert pattern (find by slug, update if exists, create if not).
 * Minimum-viable seed: label, slug, category, shortDesc, layout, pricing.
 * Block content added per service via admin UI (or future enriched seed).
 */

import { getPayload } from 'payload'
import config from '../payload.config.ts'

const TOP_5_LP_SLUGS = new Set([
  'n8n-automation',
  'gohighlevel',
  'ai-chatbots',
  'wordpress-seo',
  'vibe-coded-sites',
])

// Map SERVICE_CATEGORIES name -> Services collection category enum value
const CATEGORY_MAP = {
  Automation: 'automation',
  'AI Content': 'ai',
  Development: 'web',
  Consulting: 'strategy',
}

// Pulled inline (avoid runtime TS import). Mirror of SERVICE_CATEGORIES in src/lib/site.ts.
const SERVICE_CATEGORIES = [
  {
    name: 'Automation',
    services: [
      { slug: 'n8n-automation', label: 'n8n Automation', icon: 'Bot', desc: 'Workflow automation that runs while you sleep' },
      { slug: 'gohighlevel', label: 'GoHighLevel CRM', icon: 'Target', desc: 'Full CRM + sales pipeline setup' },
      { slug: 'zapier-make', label: 'Zapier & Make', icon: 'Link', desc: 'Multi-tool connectivity layer' },
      { slug: 'social-automation', label: 'Social Automation', icon: 'Smartphone', desc: 'Auto-post + DM responder stack' },
    ],
  },
  {
    name: 'AI Content',
    services: [
      { slug: 'ai-video', label: 'AI Video Creation', icon: 'Clapperboard', desc: 'Reels, shorts, talking-head at scale' },
      { slug: 'youtube-automation', label: 'YouTube Automation', icon: 'PlayCircle', desc: 'Faceless channel pipeline' },
      { slug: 'tiktok-automation', label: 'TikTok Automation', icon: 'Music', desc: 'Daily content engine' },
      { slug: 'facebook-automation', label: 'Facebook Automation', icon: 'Users', desc: 'Page + DM + group reach' },
    ],
  },
  {
    name: 'Development',
    services: [
      { slug: 'wordpress-seo', label: 'WordPress SEO Blog', icon: 'Globe', desc: 'AEO-tuned content engine' },
      { slug: 'ecommerce-automation', label: 'E-commerce Automation', icon: 'ShoppingCart', desc: 'Shopify + Stripe + n8n stack' },
      { slug: 'vibe-coded-sites', label: 'Vibe-Coded Websites', icon: 'Zap', desc: 'Custom Next.js builds, 7-day ship' },
      { slug: 'ai-chatbots', label: 'AI Chatbots', icon: 'MessageSquare', desc: 'Live chat + web + voice agents' },
    ],
  },
  {
    name: 'Consulting',
    services: [
      { slug: 'ai-business-systems', label: 'AI Business Systems', icon: 'Building2', desc: 'Operator-grade ops blueprint' },
      { slug: 'strategy-training', label: 'Strategy & Training', icon: 'BookOpen', desc: 'Team upskilling + playbooks' },
      { slug: 'branding-design', label: 'Branding & Design', icon: 'Palette', desc: 'Identity + design system' },
      { slug: 'ai-content-creation', label: 'AI Content Creation', icon: 'PenTool', desc: 'Voice-locked content at volume' },
    ],
  },
]

async function upsertService(payload, cat, svc) {
  const existing = await payload.find({
    collection: 'services',
    where: { slug: { equals: svc.slug } },
    limit: 1,
  })

  const data = {
    label: svc.label,
    slug: svc.slug,
    category: CATEGORY_MAP[cat.name],
    icon: svc.icon,
    layout: TOP_5_LP_SLUGS.has(svc.slug) ? 'bespoke' : 'standard',
    shortDesc: svc.desc,
    minPrice: 297,
    maxPrice: 9500,
    currency: 'USD',
    blocks: [],
  }

  if (existing.docs.length) {
    await payload.update({
      collection: 'services',
      id: existing.docs[0].id,
      data,
    })
    return 'updated'
  }
  await payload.create({ collection: 'services', data })
  return 'created'
}

async function upsertSettings(payload) {
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      brand: 'SkynetLabs',
      founder: 'Waseem Nasir',
      tagline: 'AI Automation Agency for Founders Who Refuse to Be Average',
      contactEmail: 'info@skynetjoe.com',
      founderUrl: 'https://www.waseemnasir.com',
      location: 'Bali · GMT+8',
      discoveryCallHref: '/discovery-call',
      calendlyUrl: 'https://calendly.com/skynetlabs/schedule-a-free-consultation',
      twitter: 'https://x.com/skynetlabs',
      twitterHandle: '@skynetlabs',
      linkedin: 'https://www.linkedin.com/in/waseemnasir2k26',
      github: 'https://github.com/waseemnasir2k26',
      youtube: 'https://youtube.com/@skynetlabs',
    },
  })
  return 'settings global updated'
}

async function main() {
  console.log('[seed] booting payload local API…')
  const payload = await getPayload({ config })

  console.log('[seed] seeding 16 services…')
  let created = 0
  let updated = 0
  for (const cat of SERVICE_CATEGORIES) {
    for (const svc of cat.services) {
      const res = await upsertService(payload, cat, svc)
      if (res === 'created') created += 1
      else updated += 1
      console.log(`  [${res}] ${svc.slug} (${CATEGORY_MAP[cat.name]}, ${TOP_5_LP_SLUGS.has(svc.slug) ? 'bespoke' : 'standard'})`)
    }
  }

  console.log('[seed] upserting Settings global…')
  console.log(`  [${await upsertSettings(payload)}]`)

  console.log(`\n[seed] done — services created=${created} updated=${updated}`)
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed] FAILED:', err)
  process.exit(1)
})
