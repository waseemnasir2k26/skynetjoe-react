import type { Block } from 'payload'

export const PainCardsBlock: Block = {
  slug: 'painCards',
  labels: { singular: 'Pain Cards (3-up)', plural: 'Pain Card Sets' },
  fields: [
    { name: 'sectionEyebrow', type: 'text', defaultValue: '— Where it leaks' },
    {
      name: 'cards',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      labels: { singular: 'Pain Card', plural: 'Pain Cards' },
      fields: [
        { name: 'eyebrow', type: 'text', required: true, admin: { description: 'e.g. "Pain 01"' } },
        { name: 'headline', type: 'text', required: true, admin: { description: 'Real industry pain — specific, not generic.' } },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
