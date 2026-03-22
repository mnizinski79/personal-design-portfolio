import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Page Headline',
      initialValue: 'Who is this Mike Guy Anyway?',
    }),
    defineField({ name: 'introBio', type: 'text', title: 'Intro Bio Paragraph' }),
    defineField({
      name: 'clientLogos',
      type: 'object',
      title: 'Client Logos',
      fields: [
        defineField({ name: 'columns', type: 'number', title: 'Column Count', initialValue: 4 }),
        defineField({
          name: 'logos',
          type: 'array',
          title: 'Logos',
          of: [{
            type: 'object',
            fields: [
              { name: 'logo', type: 'image', title: 'Logo Image', options: { hotspot: true } },
              { name: 'companyName', type: 'string', title: 'Company Name' },
              { name: 'url', type: 'url', title: 'Company URL (optional)' },
            ],
            preview: { select: { title: 'companyName', media: 'logo' } },
          }],
        }),
      ],
    }),
    defineField({ name: 'personalBio', type: 'text', title: 'Personal Background Paragraph' }),
    defineField({
      name: 'skills',
      type: 'object',
      title: 'Skills Section',
      fields: [
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
            preview: { select: { title: 'skillName', subtitle: 'level' } },
          }],
        }),
      ],
    }),
    defineField({ name: 'moreAboutMe', type: 'text', title: '"A Bit More About Me" Paragraph' }),
    defineField({ name: 'resumeFile', type: 'file', title: 'Primary Resume File' }),
    defineField({ name: 'resumeLabel', type: 'string', title: 'Primary Resume Button Label', initialValue: 'Download My Resume' }),
    defineField({ name: 'bigResumeFile', type: 'file', title: 'Extended Resume File' }),
    defineField({ name: 'bigResumeLabel', type: 'string', title: 'Extended Resume Button Label', initialValue: 'Download the Big Resume' }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
