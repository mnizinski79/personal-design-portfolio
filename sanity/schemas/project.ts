import { defineField, defineType } from 'sanity'

// ── Shared block fields ───────────────────────────────────────────────────────
// Applied to all block types that support text (all except imageBlock)
const sharedBlockFields = [
  defineField({
    name: 'backgroundColor',
    type: 'string',
    title: 'Background Color (hex from global palette)',
    description: 'Leave blank to use default light background.',
  }),
  defineField({
    name: 'textColorInverse',
    type: 'boolean',
    title: 'Use Light Text (white)',
    description: 'Enable when placing text over a dark background.',
    initialValue: false,
  }),
]

// ── Block 1: Rich Text ────────────────────────────────────────────────────────
const richTextBlock = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    ...sharedBlockFields,
    defineField({
      name: 'body',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Rich Text' }),
  },
})

// ── Block 2: Tabbed Gallery ───────────────────────────────────────────────────
const tabbedGalleryBlock = defineType({
  name: 'tabbedGallery',
  title: 'Tabbed Gallery',
  type: 'object',
  fields: [
    ...sharedBlockFields,
    defineField({
      name: 'tabs',
      type: 'array',
      title: 'Tabs',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Tab Label' },
          { name: 'leftImage', type: 'image', title: 'Left Column Image', options: { hotspot: true } },
          { name: 'rightImage', type: 'image', title: 'Right Column Image', options: { hotspot: true } },
        ],
        preview: { select: { title: 'label', media: 'leftImage' } },
      }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Tabbed Gallery' }),
  },
})

// ── Block 3: Columns ──────────────────────────────────────────────────────────
const columnsBlock = defineType({
  name: 'columns',
  title: 'Columns',
  type: 'object',
  fields: [
    ...sharedBlockFields,
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Column Variant',
      options: {
        list: [
          { title: 'Two Column (fixed 2-col, high-emphasis)', value: 'twoColumn' },
          { title: 'Multi-Column (2–6 configurable columns)', value: 'multiColumn' },
          { title: 'Tiles (3–4 col wrapping grid)', value: 'tiles' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'columnCount',
      type: 'number',
      title: 'Column Count',
      description: 'For Multi-Column: 2–6. For Tiles: 3–4. Ignored for Two Column.',
      validation: (r) => r.min(2).max(6),
    }),
    defineField({
      name: 'columnContent',
      type: 'array',
      title: 'Column Content',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'contentType',
            type: 'string',
            title: 'Content Type',
            options: { list: ['image', 'richText'], layout: 'radio' },
          },
          { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
          {
            name: 'text',
            type: 'array',
            title: 'Rich Text',
            of: [{ type: 'block' }],
          },
        ],
        preview: { select: { title: 'contentType', media: 'image' } },
      }],
    }),
  ],
  preview: {
    select: { variant: 'variant' },
    prepare: ({ variant }: { variant?: string }) => ({ title: `Columns — ${variant || ''}` }),
  },
})

// ── Block 4: Image ────────────────────────────────────────────────────────────
const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color (hex)',
      description: 'Optional — visible behind contained or transparent images.',
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Display Variant',
      options: {
        list: [
          { title: 'Full Width', value: 'fullWidth' },
          { title: 'Container Width', value: 'container' },
        ],
        layout: 'radio',
      },
      initialValue: 'fullWidth',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { variant: 'variant' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ variant }: any) => ({
      title: `Image — ${variant || 'fullWidth'}`,
    }),
  },
})

// ── Block 5: Client Logos ─────────────────────────────────────────────────────
const clientLogosBlock = defineType({
  name: 'clientLogos',
  title: 'Client Logos',
  type: 'object',
  fields: [
    ...sharedBlockFields,
    defineField({ name: 'columns', type: 'number', title: 'Columns', initialValue: 4 }),
    defineField({
      name: 'logos',
      type: 'array',
      title: 'Logos',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'logo',
            type: 'image',
            title: 'Logo Image',
            options: { hotspot: true },
            fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
          },
          { name: 'companyName', type: 'string', title: 'Company Name' },
          { name: 'url', type: 'url', title: 'Company URL (optional)' },
        ],
        preview: { select: { title: 'companyName', media: 'logo' } },
      }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Client Logos' }),
  },
})

// ── Block 6: Skill Bars ───────────────────────────────────────────────────────
const skillBarsBlock = defineType({
  name: 'skillBars',
  title: 'Skill Bars',
  type: 'object',
  fields: [
    ...sharedBlockFields,
    defineField({ name: 'zoneLabel1', type: 'string', title: 'Zone Label 1 (left)', initialValue: "Don't Hire Me for This" }),
    defineField({ name: 'zoneLabel2', type: 'string', title: 'Zone Label 2 (middle)', initialValue: 'Enough to be Dangerous' }),
    defineField({ name: 'zoneLabel3', type: 'string', title: 'Zone Label 3 (right)', initialValue: 'Jedi Master' }),
    defineField({
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{
        type: 'object',
        fields: [
          { name: 'skillName', type: 'string', title: 'Skill Name' },
          { name: 'level', type: 'number', title: 'Level (0–10)', validation: (r) => r.min(0).max(10) },
        ],
        preview: {
          select: { title: 'skillName', subtitle: 'level' },
          prepare: ({ title, subtitle }: { title?: string; subtitle?: number }) => ({
            title,
            subtitle: subtitle !== undefined ? `Level: ${subtitle}/10` : '',
          }),
        },
      }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Skill Bars' }),
  },
})

// ── Block 7: Note ─────────────────────────────────────────────────────────────
const noteBlock = defineType({
  name: 'note',
  title: 'Note',
  type: 'object',
  fields: [
    ...sharedBlockFields,
    defineField({
      name: 'accentColor',
      type: 'string',
      title: 'Accent Color (hex)',
      description: 'Color of the accent bar/rule above the note text.',
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Note Content',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Note' }),
  },
})

// ── Block 8: Basic Container ──────────────────────────────────────────────────
const basicContainerBlock = defineType({
  name: 'basicContainer',
  title: 'Basic Container',
  type: 'object',
  fields: [
    ...sharedBlockFields,
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Basic Container' }),
  },
})

// ── Project document ──────────────────────────────────────────────────────────
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // Core
    defineField({ name: 'title', type: 'string', title: 'Project Name', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'URL Slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number', title: 'Sort Order (lower = first)' }),

    // Grid card
    defineField({ name: 'thumbnail', type: 'image', title: 'Grid Thumbnail', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] }),
    defineField({ name: 'gridLabel', type: 'string', title: 'Grid Label (all-caps below thumbnail)', description: 'e.g. DIGITAL STRATEGY' }),

    // Masthead / intro section
    defineField({
      name: 'mastheadFields',
      type: 'array',
      title: 'Masthead Metadata Fields',
      description: 'e.g. Role: Design Lead / Duration: 2 Years. Only items with values are rendered.',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label (e.g. "Role")' },
          { name: 'value', type: 'string', title: 'Value (e.g. "Design Lead")' },
        ],
        preview: {
          select: { title: 'label', subtitle: 'value' },
        },
      }],
    }),
    defineField({ name: 'headerBackgroundImage', type: 'image', title: 'Masthead Background Image', options: { hotspot: true } }),
    defineField({ name: 'mastheadTextColorInverse', type: 'boolean', title: 'Masthead: Use Light Text (white)', initialValue: false }),

    // Featured card (home page)
    defineField({ name: 'featured', type: 'boolean', title: 'Featured on Home Page', initialValue: false }),
    defineField({ name: 'featuredImage', type: 'image', title: 'Featured Card Image', options: { hotspot: true } }),
    defineField({ name: 'featuredTitle', type: 'string', title: 'Featured Card Headline' }),
    defineField({ name: 'featuredDescription', type: 'text', title: 'Featured Card Description' }),
    defineField({ name: 'featuredButtonLabel', type: 'string', title: 'Featured Card Button Label', initialValue: 'Check It Out' }),
    defineField({ name: 'featuredBackground', type: 'string', title: 'Featured Card Background Color (hex)' }),
    defineField({ name: 'featuredTextColorInverse', type: 'boolean', title: 'Featured Card: Use Light Text (white)', initialValue: false }),

    // Content blocks (page builder)
    defineField({
      name: 'contentBlocks',
      type: 'array',
      title: 'Content Blocks',
      of: [
        { type: 'richText' },
        { type: 'tabbedGallery' },
        { type: 'columns' },
        { type: 'imageBlock' },
        { type: 'clientLogos' },
        { type: 'skillBars' },
        { type: 'note' },
        { type: 'basicContainer' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', order: 'order' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ title, order }: any) => ({
      title,
      subtitle: order !== undefined ? `Order: ${order}` : '',
    }),
  },
  orderings: [
    { title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})

// Export all block types so they can be registered in schemaTypes
export const projectBlockTypes = [
  richTextBlock,
  tabbedGalleryBlock,
  columnsBlock,
  imageBlock,
  clientLogosBlock,
  skillBarsBlock,
  noteBlock,
  basicContainerBlock,
]
