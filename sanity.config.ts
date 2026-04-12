import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'mikenizinski',
  title: 'Mike Nizinski — Studio',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ds7d6qoa',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({ type: 'project', title: 'Project', S, context }),
            S.documentTypeListItem('homePage').title('Home Page'),
            S.documentTypeListItem('aboutPage').title('About Page'),
            S.documentTypeListItem('contactPage').title('Contact Page'),
            S.documentTypeListItem('globalSettings').title('Global Settings'),
          ]),
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
