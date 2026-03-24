import ProjectMasthead from '@/components/project-detail/ProjectMasthead'
import BlockRenderer, { Block } from '@/components/project-detail/BlockRenderer'

// Placeholder project data — will be replaced by Sanity GROQ query in Phase 5
interface Project {
  title: string
  textColorInverse: boolean
  fields: Array<{ label: string; value: string }>
  contentBlocks: Block[]
}

const PLACEHOLDER_PROJECT: Project = {
  title: 'Project Title',
  textColorInverse: true,
  fields: [
    { label: 'Client', value: 'Client Name' },
    { label: 'Industry', value: 'Financial Services' },
    { label: 'Year', value: '2024' },
    { label: 'Role', value: 'UX / UI Design Lead' },
  ],
  contentBlocks: [
    { _type: 'richText', _key: 'b1' },
    { _type: 'tabbedGallery', _key: 'b2', textColorInverse: true, backgroundColor: '#2E2E2E' },
    // Columns variants
    { _type: 'columns', _key: 'b3a', variant: 'twoColumn' },
    { _type: 'columns', _key: 'b3b', variant: 'multiColumn', columnCount: 4 },
    { _type: 'columns', _key: 'b3c', variant: 'tiles', columnCount: 3 },
    { _type: 'note', _key: 'b4' },
    // Image variants
    { _type: 'image', _key: 'b5a', variant: 'fullWidth' },
    { _type: 'image', _key: 'b5b', variant: 'container' },
    { _type: 'clientLogos', _key: 'b6' },
    { _type: 'basicContainer', _key: 'b7' },
  ],
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // In Phase 5, this will be a Sanity fetch: getProjectBySlug(slug)
  // For now, all slugs resolve to the same placeholder project
  void slug
  const project = PLACEHOLDER_PROJECT

  return (
    <div>
      <ProjectMasthead
        title={project.title}
        fields={project.fields}
        textColorInverse={project.textColorInverse}
      />
      <BlockRenderer blocks={project.contentBlocks} />
    </div>
  )
}
