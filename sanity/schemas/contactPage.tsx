import React from 'react'
import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      type: 'array',
      title: 'Page Headline',
      description: 'Use Shift+Enter for line breaks. Select text and click "Highlight" to make it pink.',
      of: [{
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        lists: [],
        marks: {
          decorators: [{
            title: 'Highlight',
            value: 'highlight',
            component: ({ children }: { children: React.ReactNode }) => (
              <span style={{ backgroundColor: 'rgba(234, 59, 123, 0.15)', color: '#EA3B7B', borderRadius: '2px', padding: '0 2px' }}>
                {children}
              </span>
            ),
          }],
          annotations: [],
        },
      }],
    }),
    defineField({
      name: 'introParagraph',
      type: 'array',
      title: 'Intro Paragraph',
      description: 'Supports multiple paragraphs.',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }],
    }),
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
