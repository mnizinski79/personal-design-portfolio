import TransitionLink from '@/components/layout/TransitionLink'
import Button from '@/components/ui/Button'

const FEATURED_PROJECTS = [
  {
    slug: 'placeholder',
    clientLabel: 'Client Name',
    title: 'Project Title',
    description: 'Lorem ipsum dolor sit amet consectetur. Diam enim aliquam dignissim consectetur suspendisse. Tortor sagittis nisi lectus consequat eu. Nulla scelerisque elit dignissim mattis.',
    buttonLabel: 'View Details',
    background: '#2E2E2E',
    textColorInverse: true,
  },
]

export default function HomePage() {
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
      {FEATURED_PROJECTS.length > 0 && (
        <section>
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.slug}
              style={{ backgroundColor: project.background }}
            >
              <div className="featured-section content-grid flex flex-col gap-10">
                {/* Image placeholder: w-full within the padded container */}
                <div className="w-full aspect-[1128/529] bg-bg-mid rounded-small" />

                {/* Text: fluid inset that scales with viewport */}
                <div className="featured-text-inset flex flex-col gap-8 items-start">
                  <div className="flex flex-col gap-4">
                    <p className="text-accent-pink text-base tracking-[1.5px] uppercase">
                      {project.clientLabel}
                    </p>
                    <h2
                      className={project.textColorInverse ? 'text-text-inverse' : 'text-text-body'}
                    >
                      {project.title}
                    </h2>
                    <p
                      className={`leading-relaxed ${
                        project.textColorInverse ? 'text-gray-300' : 'text-text-secondary'
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>
                  <Button
                    as="a"
                    href={`/projects/${project.slug}`}
                    variant={project.textColorInverse ? 'light' : 'dark'}
                  >
                    {project.buttonLabel}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
