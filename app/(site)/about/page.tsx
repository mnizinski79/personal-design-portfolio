import { client } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import SkillBars from '@/components/about/SkillBars'
import Button from '@/components/ui/Button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AboutPageData = Record<string, any>

const FALLBACK_LOGOS = [
  'Marriott', 'Booz Allen', 'KPMG', 'FTI Consulting',
  'AOL', 'Inova Health', 'Discovery', 'Sallie Mae',
  'George Mason', 'Capital One', 'Hilton', 'PBS',
]

const richTextComponents = {
  block: { normal: ({ children }: { children: React.ReactNode }) => <p>{children}</p> },
}

export default async function AboutPage() {
  const about: AboutPageData | null = await client.fetch(aboutPageQuery).catch(() => null)

  // ── Skills ──────────────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sanitySkills = about?.skills?.skills as any[] | undefined
  const skills = sanitySkills?.length
    ? sanitySkills.map((s) => ({ label: s.skillName as string, level: (s.level ?? 0) * 10 }))
    : undefined

  const zoneLabels = about?.skills
    ? [
        about.skills.zoneLabel1 ?? "Don't Hire Me for This",
        about.skills.zoneLabel2 ?? 'Enough to be Dangerous',
        about.skills.zoneLabel3 ?? 'Jedi Master',
      ]
    : undefined

  // ── Client logos ────────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sanityLogos = about?.clientLogos?.logos as any[] | undefined
  const logoColumns: number = about?.clientLogos?.columns ?? 4

  return (
    <div className="py-20">
      <div className="page-content">

        {/* ── Headline ─────────────────────────────────────────────────────── */}
        <h1 className="text-text-body mb-10">
          {about?.headline ? (
            <PortableText
              value={about.headline}
              components={{
                block: { normal: ({ children }: { children: React.ReactNode }) => <>{children}</> },
                marks: {
                  highlight: ({ children }: { children: React.ReactNode }) => (
                    <span className="text-accent-pink">{children}</span>
                  ),
                },
              }}
            />
          ) : (
            <>
              Who is{' '}
              <span className="text-accent-pink">Mike</span>{' '}
              anyway?
            </>
          )}
        </h1>

        {/* ── Intro bio ────────────────────────────────────────────────────── */}
        <div className="text-text-secondary space-y-6 mb-16">
          {about?.introBio ? (
            <PortableText value={about.introBio} components={richTextComponents} />
          ) : (
            <p>
              I&rsquo;m a multi-disciplinary creative who solves problems across the digital
              spectrum. In my 15 year career, I&rsquo;ve led teams large and small for clients
              in nearly every industry.
            </p>
          )}
        </div>

        {/* ── Client Logos ─────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-accent-pink mb-6">Clients &amp; Partners</h2>

          {sanityLogos?.length ? (
            <div className={`grid grid-cols-2 md:grid-cols-${logoColumns}`}>
              {sanityLogos.map((logo, i) => {
                const total = sanityLogos.length
                const cols = logoColumns
                const modN = i % cols
                const rightBorder = modN === cols - 1 ? '' : 'border-r'
                const lastFullRow = total - (total % cols || cols)
                const bottomBorder = i < lastFullRow ? 'border-b' : ''
                const logoUrl = logo.logo ? urlFor(logo.logo).width(200).url() : null
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-center aspect-square border-border-light ${rightBorder} ${bottomBorder}`}
                  >
                    {logoUrl ? (
                      <div className="relative w-2/3 h-1/2">
                        <Image src={logoUrl} alt={logo.companyName ?? ''} fill className="object-contain" />
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary font-medium text-center px-2">
                        {logo.companyName}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4">
              {FALLBACK_LOGOS.map((name, i) => {
                const total = FALLBACK_LOGOS.length
                const mod4 = i % 4
                const rightBorder =
                  mod4 === 3 ? '' :
                  mod4 === 1 ? 'md:border-r' :
                  'border-r'
                const bottomBorder =
                  i < total - 4 ? 'border-b' :
                  i < total - 2 ? 'border-b md:border-b-0' :
                  ''
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
          )}
        </div>

        {/* ── Personal bio ─────────────────────────────────────────────────── */}
        <div className="text-text-secondary space-y-6 mb-16">
          {about?.personalBio ? (
            <PortableText value={about.personalBio} components={richTextComponents} />
          ) : (
            <p>
              In my work, I look for functional, simple ways to drive interaction and
              engagement. I live in the details, looking for better understanding at every
              level. I believe that great messaging, combined with engaging experiences,
              creates a connection with people that goes beyond just surface level. It&rsquo;s
              what makes good creative great creative and a great product an essential life tool.
            </p>
          )}
        </div>

        {/* ── Skill Bars ───────────────────────────────────────────────────── */}
        <div className="mb-16">
          <SkillBars skills={skills} zoneLabels={zoneLabels} />
        </div>

        {/* ── More about me ────────────────────────────────────────────────── */}
        <div className="text-text-secondary space-y-6 mb-16">
          {about?.moreAboutMe ? (
            <PortableText value={about.moreAboutMe} components={richTextComponents} />
          ) : (
            <p>
              I hold a B.F.A. in Graphic Design and have spent time on both the agency
              and in-house sides of the industry. That balance gives me a healthy respect
              for budgets, timelines, and stakeholder realities — without ever sacrificing
              the work.
            </p>
          )}
        </div>

        {/* ── Resume Buttons ───────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4">
          {about?.resumeFileUrl && (
            <Button as="a" href={`/api/download?url=${encodeURIComponent(about.resumeFileUrl)}&filename=Mike_Nizinski_Resume.pdf`} download variant="dark">
              {about?.resumeLabel ?? 'Download Résumé'}
            </Button>
          )}
          {about?.bigResumeFileUrl && (
            <Button as="a" href={`/api/download?url=${encodeURIComponent(about.bigResumeFileUrl)}&filename=Mike_Nizinski_Full_Resume.pdf`} download variant="dark">
              {about?.bigResumeLabel ?? 'Download Full Portfolio'}
            </Button>
          )}
        </div>

      </div>
    </div>
  )
}
