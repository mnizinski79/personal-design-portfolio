import { client } from '@/sanity/lib/client'
import { featuredProjectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import TransitionLink from '@/components/layout/TransitionLink'
import Button from '@/components/ui/Button'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FeaturedProject = Record<string, any>

// Fallback used when no Sanity data exists yet
const PLACEHOLDER_PROJECTS: FeaturedProject[] = [
  {
    slug: { current: 'placeholder' },
    featuredTitle: 'Project Title',
    clientLabel: 'Client Name',
    featuredDescription: 'Lorem ipsum dolor sit amet consectetur. Diam enim aliquam dignissim consectetur suspendisse. Tortor sagittis nisi lectus consequat eu. Nulla scelerisque elit dignissim mattis.',
    featuredButtonLabel: 'View Details',
    featuredBackground: '#2E2E2E',
    featuredTextColorInverse: true,
  },
]

export default async function HomePage() {
  const sanityProjects: FeaturedProject[] = await client.fetch(featuredProjectsQuery).catch(() => [])
  const featuredProjects = sanityProjects.length > 0 ? sanityProjects : PLACEHOLDER_PROJECTS

  return (
    <div>
      {/* ── Hero / Bio section ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="page-content">
          <h1 className="text-text-body mb-10">
            Hello!
            <br />
            I&rsquo;m Mike, an Experienced Creative Hybrid{' '}
            <span className="text-accent-pink">Producing Stellar Digital Products</span>
            .
          </h1>

          <div className="text-text-secondary space-y-6">
            <p>
              I&rsquo;m a multi-disciplinary creative who solves problems across the digital
              spectrum. In my 15 year career, I&rsquo;ve led teams large and small for clients
              in nearly every industry.
            </p>
            <p>
              In my work, I look for functional, simple ways to drive interaction and
              engagement. I live in the details, looking for better understanding at every
              level. I believe that great messaging, combined with engaging experiences,
              creates a connection with people that goes beyond just surface level. It&rsquo;s
              what makes good creative great creative and a great product an essential life tool.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ──────────────────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section>
          {featuredProjects.map((project) => {
            const slug = project.slug?.current ?? project.slug ?? 'placeholder'
            const title = project.featuredTitle ?? project.title ?? 'Project Title'
            const clientLabel = project.clientLabel ?? project.gridLabel ?? 'Client Name'
            const description = project.featuredDescription ?? ''
            const buttonLabel = project.featuredButtonLabel ?? 'View Details'
            const background = project.featuredBackground ?? '#2E2E2E'
            const textColorInverse = project.featuredTextColorInverse ?? true
            const featuredImageUrl = project.featuredImage
              ? urlFor(project.featuredImage).width(1128).url()
              : null

            return (
              <div key={slug} style={{ backgroundColor: background }}>
                <div className="featured-section content-grid flex flex-col gap-10">
                  {/* Project image */}
                  {featuredImageUrl ? (
                    <div className="w-full aspect-[1128/529] relative rounded-small overflow-hidden">
                      <Image src={featuredImageUrl} alt={title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-full aspect-[1128/529] bg-bg-mid rounded-small" />
                  )}

                  {/* Text */}
                  <div className="featured-text-inset flex flex-col gap-8 items-start">
                    <div className="flex flex-col gap-4">
                      <p className="text-accent-pink text-base tracking-[1.5px] uppercase">
                        {clientLabel}
                      </p>
                      <h2 className={textColorInverse ? 'text-text-inverse' : 'text-text-body'}>
                        {title}
                      </h2>
                      <p className={`leading-relaxed ${textColorInverse ? 'text-gray-300' : 'text-text-secondary'}`}>
                        {description}
                      </p>
                    </div>
                    <Button
                      as="a"
                      href={`/projects/${slug}`}
                      variant={textColorInverse ? 'light' : 'dark'}
                    >
                      {buttonLabel}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}
