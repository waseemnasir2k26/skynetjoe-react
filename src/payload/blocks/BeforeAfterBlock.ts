import type { Block } from 'payload'

export const BeforeAfterBlock: Block = {
  slug: 'beforeAfter',
  labels: { singular: 'Before / After', plural: 'Before / After Sets' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'beforeTitle', type: 'text', required: true, admin: { width: '50%' }, defaultValue: 'Manual' },
        { name: 'afterTitle', type: 'text', required: true, admin: { width: '50%' }, defaultValue: 'Shipped' },
      ],
    },
    {
      name: 'beforeBullets',
      type: 'array',
      minRows: 3,
      maxRows: 6,
      labels: { singular: 'Before bullet', plural: 'Before bullets' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'afterBullets',
      type: 'array',
      minRows: 3,
      maxRows: 6,
      labels: { singular: 'After bullet', plural: 'After bullets' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
