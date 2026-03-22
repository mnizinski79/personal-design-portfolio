import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', type: 'string', title: 'Page Headline', initialValue: 'Contact Me' }),
    defineField({ name: 'introParagraph', type: 'text', title: 'Intro Paragraph' }),
    defineField({ name: 'namePlaceholder', type: 'string', title: 'Name Field Label', initialValue: 'Name' }),
    defineField({ name: 'emailPlaceholder', type: 'string', title: 'Email Field Label', initialValue: 'Email' }),
    defineField({ name: 'messagePlaceholder', type: 'string', title: 'Message Field Label', initialValue: 'How Can I Help?' }),
    defineField({ name: 'submitLabel', type: 'string', title: 'Submit Button Label', initialValue: 'Send Away!' }),
    defineField({ name: 'successMessage', type: 'text', title: 'Success Message (shown after form submit)' }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
})
