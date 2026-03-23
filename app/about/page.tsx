import SkillBars from '@/components/about/SkillBars'
import Button from '@/components/ui/Button'

const CLIENT_LOGOS = [
  'Marriott', 'Booz Allen', 'KPMG', 'FTI Consulting',
  'AOL', 'Inova Health', 'Discovery', 'Sallie Mae',
  'George Mason', 'Capital One', 'Hilton', 'PBS',
]

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="page-content">

        {/* ── Headline ─────────────────────────────────────────────────────── */}
        <h1 className="text-text-body mb-10">
          Who is{' '}
          <span className="text-accent-pink">Mike</span>{' '}
          anyway?
        </h1>

        {/* ── Intro bio ────────────────────────────────────────────────────── */}
        <p className="text-text-secondary mb-16">
          I&rsquo;m a multi-disciplinary creative who solves problems across the digital
          spectrum. In my 15 year career, I&rsquo;ve led teams large and small for clients
          in nearly every industry.
        </p>

        {/* ── Client Logos ─────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-accent-pink mb-6">
            Clients &amp; Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {CLIENT_LOGOS.map((name, i) => {
              const total = CLIENT_LOGOS.length
              // Right border: all except last column per breakpoint
              // mod4: 0,2 → last in neither row; 1 → last in mobile only; 3 → last in both
              const mod4 = i % 4
              const rightBorder =
                mod4 === 3 ? '' :
                mod4 === 1 ? 'md:border-r' :
                'border-r'
              // Bottom border: all except last row per breakpoint
              const bottomBorder =
                i < total - 4 ? 'border-b' :          // not last row on either
                i < total - 2 ? 'border-b md:border-b-0' : // last desktop row, not mobile
                ''                                          // last row on both
              return (
                <div
                  key={name}
                  className={`flex items-center justify-center aspect-square text-sm text-text-secondary font-medium text-center px-2 border-border-light ${rightBorder} ${bottomBorder}`}
                >
                  {name}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Personal bio ─────────────────────────────────────────────────── */}
        <p className="text-text-secondary mb-16">
          In my work, I look for functional, simple ways to drive interaction and
          engagement. I live in the details, looking for better understanding at every
          level. I believe that great messaging, combined with engaging experiences,
          creates a connection with people that goes beyond just surface level. It&rsquo;s
          what makes good creative great creative and a great product an essential life tool.
        </p>

        {/* ── Skill Bars ───────────────────────────────────────────────────── */}
        <div className="mb-16">
          <SkillBars />
        </div>

        {/* ── More about me ────────────────────────────────────────────────── */}
        <p className="text-text-secondary mb-16">
          I hold a B.F.A. in Graphic Design and have spent time on both the agency
          and in-house sides of the industry. That balance gives me a healthy respect
          for budgets, timelines, and stakeholder realities — without ever sacrificing
          the work.
        </p>

        {/* ── Resume Buttons ───────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4">
          <Button as="a" href="#" download variant="dark">Download Résumé</Button>
          <Button as="a" href="#" download variant="dark">Download Full Portfolio</Button>
        </div>

      </div>
    </div>
  )
}
