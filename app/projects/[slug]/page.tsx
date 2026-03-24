import { client } from '@/sanity/lib/client'
import { projectBySlugQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import ProjectMasthead from '@/components/project-detail/ProjectMasthead'
import BlockRenderer, { Block } from '@/components/project-detail/BlockRenderer'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(projectSlugsQuery).catch(() => [])
  return slugs.map((s) => ({ slug: s.slug }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const project: any = await client.fetch(projectBySlugQuery, { slug }).catch(() => null)

  // If no Sanity data and slug is 'placeholder', show dev preview
  if (!project && slug !== 'placeholder') notFound()

  if (!project) {
    // Dev placeholder — keeps all blocks visible for testing
    return (
      <div>
        <ProjectMasthead
          title="Project Title"
          fields={[
            { label: 'Client', value: 'Client Name' },
            { label: 'Industry', value: 'Financial Services' },
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'UX / UI Design Lead' },
          ]}
          textColorInverse={true}
        />
        <BlockRenderer blocks={[
          { _type: 'richText', _key: 'b1' },
          { _type: 'tabbedGallery', _key: 'b2', textColorInverse: true, backgroundColor: '#2E2E2E' },
          { _type: 'columns', _key: 'b3a', variant: 'twoColumn' },
          { _type: 'columns', _key: 'b3b', variant: 'multiColumn', columnCount: 4 },
          { _type: 'columns', _key: 'b3c', variant: 'tiles', columnCount: 3 },
          { _type: 'note', _key: 'b4' },
          { _type: 'image', _key: 'b5a', variant: 'fullWidth' },
          { _type: 'image', _key: 'b5b', variant: 'container' },
          { _type: 'clientLogos', _key: 'b6' },
          { _type: 'basicContainer', _key: 'b7' },
        ]} />
      </div>
    )
  }

  // Map Sanity mastheadFields → component fields shape
  const fields = (project.mastheadFields ?? []).map((f: { label: string; value: string }) => ({
    label: f.label,
    value: f.value,
  }))

  const backgroundImageUrl = project.headerBackgroundImage
    ? urlFor(project.headerBackgroundImage).width(1440).url()
    : undefined

  return (
    <div>
      <ProjectMasthead
        title={project.title}
        fields={fields}
        textColorInverse={project.mastheadTextColorInverse ?? false}
        backgroundImageUrl={backgroundImageUrl}
      />
      <BlockRenderer blocks={(project.contentBlocks ?? []) as Block[]} />
    </div>
  )
}
