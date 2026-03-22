import { defineField, defineType } from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', type: 'string', title: 'Site Title' }),
    defineField({ name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } }),
    defineField({
      name: 'navLinks',
      type: 'array',
      title: 'Navigation Links',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label' },
          { name: 'href', type: 'string', title: 'Path (e.g. /projects)' },
        ],
      }],
    }),
    defineField({
      name: 'footerLinks',
      type: 'array',
      title: 'Footer Social Links',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', type: 'string', title: 'Platform (e.g. Dribbble)' },
          { name: 'handle', type: 'string', title: 'Handle (e.g. /mnizinski)' },
          { name: 'url', type: 'url', title: 'Full URL' },
        ],
      }],
    }),
    defineField({ name: 'contactEmail', type: 'string', title: 'Contact Email Address' }),
    defineField({ name: 'gtmId', type: 'string', title: 'Google Tag Manager ID' }),
    defineField({
      name: 'colorPalette',
      type: 'array',
      title: 'Global Color Palette',
      description: 'Colors available for block backgrounds, featured card backgrounds, etc.',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Color Name (e.g. Dark Navy)' },
          { name: 'hex', type: 'string', title: 'Hex Value (e.g. #0D1F2D)' },
        ],
        preview: {
          select: { title: 'label', subtitle: 'hex' },
        },
      }],
    }),
  ],
  preview: {
    select: { title: 'siteTitle' },
  },
})
