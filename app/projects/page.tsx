import ProjectGrid from '@/components/projects/ProjectGrid'

// Placeholder data — will be replaced by Sanity GROQ query in Phase 5
const PROJECTS = [
  { slug: 'marriott', gridLabel: 'Marriott International' },
  { slug: 'discovery', gridLabel: 'Discovery Networks' },
  { slug: 'capital-one', gridLabel: 'Capital One' },
  { slug: 'inova', gridLabel: 'Inova Health System' },
  { slug: 'pbs', gridLabel: 'PBS' },
  { slug: 'sallie-mae', gridLabel: 'Sallie Mae' },
]

export default function ProjectsPage() {
  return (
    // Page bg is white — dark bg is scoped to the grid container only (Figma: 2106:1559)
    <div className="md:pl-[230px] overflow-clip">
      <ProjectGrid projects={PROJECTS} />
    </div>
  )
}
