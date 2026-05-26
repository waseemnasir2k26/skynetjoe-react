import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'caseStudies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'industry', 'updatedAt'],
  },
  access: { read: () => true },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 20 },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, admin: { width: '70%' } },
        { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { width: '30%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'client', type: 'text', required: true, admin: { width: '33%' } },
        { name: 'industry', type: 'text', required: true, admin: { width: '34%' } },
        { name: 'industryTag', type: 'text', admin: { width: '33%', description: 'Slug for filter chip' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text', admin: { width: '50%', description: 'e.g. "Karachi, Pakistan"' } },
        { name: 'shipDays', type: 'number', admin: { width: '50%', description: 'Days from brief to ship' } },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'results',
      type: 'array',
      labels: { singular: 'Result KPI', plural: 'Result KPIs' },
      minRows: 1,
      fields: [
        { name: 'metric', type: 'text', required: true, admin: { description: 'e.g. "-70%"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "no-show rate"' } },
      ],
    },
    {
      name: 'solutionStack',
      type: 'array',
      fields: [{ name: 'tool', type: 'text', required: true }],
    },
    { name: 'body', type: 'richText' },
  ],
}
