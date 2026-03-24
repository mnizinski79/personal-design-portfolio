import React from 'react'
import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroText',
      type: 'array',
      title: 'Hero Headline',
      description: 'Use Shift+Enter for line breaks. Select text and click "Highlight" to make it pink.',
      of: [{
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        lists: [],
        marks: {
          decorators: [
            {
              title: 'Highlight',
              value: 'highlight',
              component: ({ children }: { children: React.ReactNode }) => (
                <span style={{ backgroundColor: 'rgba(234, 59, 123, 0.15)', color: '#EA3B7B', borderRadius: '2px', padding: '0 2px' }}>
                  {children}
                </span>
              ),
            },
          ],
          annotations: [],
        },
      }],
    }),
    defineField({
      name: 'bioText',
      type: 'array',
      title: 'Bio Text',
      description: 'Supports multiple paragraphs.',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
})
