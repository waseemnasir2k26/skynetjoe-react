import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { PainCardsBlock } from '../blocks/PainCardsBlock'
import { ProofNumeralBlock } from '../blocks/ProofNumeralBlock'
import { TestimonialBlock } from '../blocks/TestimonialBlock'
import { BeforeAfterBlock } from '../blocks/BeforeAfterBlock'
import { FinalCtaBlock } from '../blocks/FinalCtaBlock'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'category', 'layout', 'updatedAt'],
    listSearchableFields: ['label', 'slug', 'shortDesc'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: { autosave: { interval: 2000 } },
    maxPerDoc: 20,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, admin: { width: '60%', description: 'Display name, e.g. "n8n Automation"' } },
                { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { width: '40%', description: 'URL slug, e.g. "n8n-automation"' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  admin: { width: '40%' },
                  options: [
                    { label: 'Automation', value: 'automation' },
                    { label: 'AI', value: 'ai' },
                    { label: 'Web', value: 'web' },
                    { label: 'Marketing', value: 'marketing' },
                    { label: 'Strategy', value: 'strategy' },
                  ],
                },
                { name: 'icon', type: 'text', admin: { width: '30%', description: 'lucide-react icon name, e.g. "Zap"' } },
                {
                  name: 'layout',
                  type: 'select',
                  required: true,
                  defaultValue: 'standard',
                  admin: { width: '30%', description: 'bespoke = custom LP component, standard = block renderer' },
                  options: [
                    { label: 'Standard (blocks renderer)', value: 'standard' },
                    { label: 'Bespoke (custom LP component)', value: 'bespoke' },
                  ],
                },
              ],
            },
            { name: 'shortDesc', type: 'text', required: true, admin: { description: 'Tagline for nav + footer + listing, ~80 chars max.' } },
            {
              name: 'blocks',
              type: 'blocks',
              required: true,
              blocks: [HeroBlock, PainCardsBlock, ProofNumeralBlock, TestimonialBlock, BeforeAfterBlock, FinalCtaBlock],
              admin: { description: 'Compose page sections. Typical order: hero -> pain cards -> proof -> testimonial -> before/after -> final CTA.' },
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'minPrice', type: 'number', admin: { width: '33%' }, defaultValue: 297 },
                { name: 'maxPrice', type: 'number', admin: { width: '33%' }, defaultValue: 9500 },
                { name: 'currency', type: 'text', admin: { width: '34%' }, defaultValue: 'USD' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', admin: { description: 'Falls back to "{label} — SkynetLabs" if blank.' } },
            { name: 'metaDescription', type: 'textarea', admin: { description: '140–160 chars.' } },
            { name: 'canonicalOverride', type: 'text', admin: { description: 'Only set if canonical differs from /services/{slug}' } },
            { name: 'ogImage', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}
