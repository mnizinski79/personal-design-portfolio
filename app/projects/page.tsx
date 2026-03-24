import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import ProjectGrid, { ProjectGridItem } from '@/components/projects/ProjectGrid'

export default async function ProjectsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any[] = await client.fetch(projectsQuery).catch(() => [])

  const projects: ProjectGridItem[] = raw.map((p) => ({
    slug: p.slug?.current ?? p.slug,
    gridLabel: p.gridLabel ?? p.title ?? '',
    thumbnailUrl: p.thumbnail ? urlFor(p.thumbnail).width(980).height(490).url() : undefined,
  }))

  return (
    // Page bg is white — dark bg is scoped to the grid container only (Figma: 2106:1559)
    <div className="md:pl-[230px] overflow-clip">
      <ProjectGrid projects={projects} />
    </div>
  )
}
