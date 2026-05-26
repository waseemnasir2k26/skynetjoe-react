import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: { group: 'Globals' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'brand', type: 'text', required: true, admin: { width: '50%' }, defaultValue: 'SkynetLabs' },
                { name: 'founder', type: 'text', required: true, admin: { width: '50%' }, defaultValue: 'Waseem Nasir' },
              ],
            },
            { name: 'tagline', type: 'text', defaultValue: 'AI Automation Agency for Founders Who Refuse to Be Average' },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media', admin: { description: '1200x630 PNG. Falls back to Waseem portrait.' } },
            { name: 'logoMark', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'contactEmail', type: 'email', required: true, admin: { width: '50%' }, defaultValue: 'info@skynetjoe.com' },
                { name: 'founderUrl', type: 'text', admin: { width: '50%' }, defaultValue: 'https://www.waseemnasir.com' },
              ],
            },
            { name: 'location', type: 'text', defaultValue: 'Bali · GMT+8' },
            { name: 'discoveryCallHref', type: 'text', defaultValue: '/discovery-call' },
            { name: 'calendlyUrl', type: 'text', defaultValue: 'https://calendly.com/skynetlabs/schedule-a-free-consultation' },
          ],
        },
        {
          label: 'Social',
          fields: [
            { name: 'twitter', type: 'text', defaultValue: 'https://x.com/skynetlabs' },
            { name: 'twitterHandle', type: 'text', defaultValue: '@skynetlabs' },
            { name: 'linkedin', type: 'text', defaultValue: 'https://www.linkedin.com/in/waseemnasir2k26' },
            { name: 'github', type: 'text', defaultValue: 'https://github.com/waseemnasir2k26' },
            { name: 'youtube', type: 'text', defaultValue: 'https://youtube.com/@skynetlabs' },
            { name: 'instagram', type: 'text' },
          ],
        },
        {
          label: 'SEO defaults',
          fields: [
            { name: 'defaultMetaTitle', type: 'text' },
            { name: 'defaultMetaDescription', type: 'textarea' },
            { name: 'gscVerificationToken', type: 'text', admin: { description: 'Google Search Console verification meta token (no <meta> wrapper)' } },
          ],
        },
      ],
    },
  ],
}
