import ProjectCard from './ProjectCard'

export interface ProjectGridItem {
  slug: string
  gridLabel: string
}

interface ProjectGridProps {
  projects: ProjectGridItem[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    // Dark bg scoped to tiles container — page bg remains white (Figma: 2106:1560)
    <div className="bg-bg-dark flex flex-wrap gap-6 p-5">
      {projects.map((project) => (
        <ProjectCard key={project.slug} slug={project.slug} gridLabel={project.gridLabel} />
      ))}
    </div>
  )
}
