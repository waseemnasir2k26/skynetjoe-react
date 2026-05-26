import type { Block } from 'payload'

export const FinalCtaBlock: Block = {
  slug: 'finalCta',
  labels: { singular: 'Final CTA', plural: 'Final CTAs' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: '— Start the brief' },
    { name: 'headline', type: 'text', required: true, admin: { description: 'Wrap accent in *asterisks*.' } },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', required: true, admin: { width: '40%' }, defaultValue: 'Book a 30-min call' },
        { name: 'ctaHref', type: 'text', required: true, admin: { width: '40%' }, defaultValue: '/discovery-call' },
        { name: 'scarcityLine', type: 'text', admin: { width: '20%', description: 'e.g. "4 builds per month"' } },
      ],
    },
  ],
}
