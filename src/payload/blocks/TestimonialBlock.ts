import type { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  fields: [
    { name: 'quote', type: 'textarea', required: true, admin: { description: 'Italic Fraunces pull-quote. ~30–50 words max.' } },
    {
      type: 'row',
      fields: [
        { name: 'attribution', type: 'text', required: true, admin: { width: '40%' } },
        { name: 'attributionTitle', type: 'text', admin: { width: '40%' } },
        { name: 'attributionLocation', type: 'text', admin: { width: '20%', description: 'e.g. "Karachi"' } },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media', admin: { description: 'Polaroid client photo +1deg rotation.' } },
  ],
}
