import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroLine1',
      type: 'string',
      title: 'Hero Line 1 (black text)',
      description: 'e.g. "Hello! I\'m Mike, an Experienced Creative Hybrid"',
    }),
    defineField({
      name: 'heroAccentText',
      type: 'string',
      title: 'Hero Accent Text (pink)',
      description: 'e.g. "Producing Stellar Digital Products"',
    }),
    defineField({
      name: 'bioParagraph1',
      type: 'text',
      title: 'Bio Paragraph 1',
    }),
    defineField({
      name: 'bioParagraph2',
      type: 'text',
      title: 'Bio Paragraph 2',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
})
