import Image from 'next/image'
import TransitionLink from '@/components/layout/TransitionLink'

interface ProjectCardProps {
  slug: string
  gridLabel: string
  thumbnailUrl?: string
}

export default function ProjectCard({ slug, gridLabel, thumbnailUrl }: ProjectCardProps) {
  return (
    <TransitionLink href={`/projects/${slug}`} className="group block w-full md:w-[calc(50%-12px)]">
      <div className="w-full aspect-[980/490] relative rounded-small overflow-clip">
        <Image src={thumbnailUrl ?? '/assets/project-tile-image.png'} alt={gridLabel} fill className="object-cover" />
      </div>
      <p className="h6-semibold-upper mt-4 tracking-[1.5px] text-text-inverse text-center w-full">
        {gridLabel}
      </p>
    </TransitionLink>
  )
}
