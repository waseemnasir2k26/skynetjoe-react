import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News Article', plural: 'News Articles' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'publishedAt'],
    listSearchableFields: ['title', 'slug', 'deck'],
  },
  access: { read: () => true },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 20 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text', required: true, admin: { width: '70%' } },
                { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { width: '30%' } },
              ],
            },
            { name: 'eyebrow', type: 'text', admin: { description: 'e.g. "Field notes · 2026"' } },
            { name: 'deck', type: 'textarea', required: true, admin: { description: 'Sub-headline displayed below the title. ~30 words.' } },
            { name: 'description', type: 'textarea', required: true, admin: { description: 'SEO meta description, 140–160 chars.' } },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  admin: { width: '40%' },
                  options: [
                    { label: 'Automation', value: 'Automation' },
                    { label: 'Operations', value: 'Operations' },
                    { label: 'AEO', value: 'AEO' },
                    { label: 'Tools', value: 'Tools' },
                    { label: 'Pricing', value: 'Pricing' },
                    { label: 'Stack', value: 'Stack' },
                    { label: 'Field notes', value: 'Field notes' },
                  ],
                },
                { name: 'readingTime', type: 'number', admin: { width: '20%', description: 'minutes' } },
                { name: 'publishedAt', type: 'date', required: true, admin: { width: '40%', date: { pickerAppearance: 'dayOnly' } } },
              ],
            },
            {
              name: 'tags',
              type: 'array',
              minRows: 1,
              fields: [{ name: 'tag', type: 'text', required: true }],
            },
            {
              type: 'collapsible',
              label: 'Hero image',
              fields: [
                { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
                { name: 'heroCaption', type: 'text', required: true },
                {
                  name: 'heroPosition',
                  type: 'select',
                  defaultValue: 'center top',
                  options: [
                    { label: 'Center top (default — avoid head crop)', value: 'center top' },
                    { label: 'Center', value: 'center' },
                    { label: 'Center bottom', value: 'center bottom' },
                  ],
                },
              ],
            },
            { name: 'body', type: 'richText' },
          ],
        },
        {
          label: 'CTA',
          fields: [
            { name: 'ctaLabel', type: 'text', defaultValue: 'Book the audit' },
            { name: 'ctaHref', type: 'text', defaultValue: '/discovery-call' },
            { name: 'ctaTagline', type: 'text' },
            { name: 'ctaServiceLabel', type: 'text', admin: { description: 'e.g. "n8n Automation"' } },
          ],
        },
      ],
    },
  ],
}
