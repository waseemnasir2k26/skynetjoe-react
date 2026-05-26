import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'eyebrow', type: 'text', admin: { width: '40%', description: 'Mono em-dash label, e.g. "— Automation · 2026"' } },
        { name: 'ctaLabel', type: 'text', admin: { width: '30%' }, defaultValue: 'Book the audit' },
        { name: 'ctaHref', type: 'text', admin: { width: '30%' }, defaultValue: '/discovery-call' },
      ],
    },
    { name: 'headline', type: 'text', required: true, admin: { description: 'Wrap accent word in *asterisks* — renders italic terracotta.' } },
    { name: 'lede', type: 'textarea', required: true, admin: { description: '1–2 sentence sub-headline. Speak human. No "elevate / leverage".' } },
    {
      type: 'row',
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { width: '60%', description: 'Polaroid hero photo. Sepia 0.06 + 1px ink border applied automatically.' } },
        { name: 'heroImageRotation', type: 'number', admin: { width: '40%', step: 0.1, description: 'Rotation in deg (-2 to 2). Default -1.2' }, defaultValue: -1.2 },
      ],
    },
  ],
}
