import { Fragment } from 'react'

interface FooterLink {
  platform: string
  handle: string
  url: string
}

interface FooterProps {
  links?: FooterLink[]
}

// Placeholder links used until Sanity global settings are wired in Phase 5
const PLACEHOLDER_LINKS: FooterLink[] = [
  { platform: 'Dribbble', handle: '/mnizinski', url: 'https://dribbble.com/mnizinski' },
  { platform: 'LinkedIn', handle: '/mnizinski', url: 'https://linkedin.com/in/mnizinski' },
  { platform: 'Behance', handle: '/mnizinski', url: 'https://behance.net/mnizinski' },
]

export default function Footer({ links }: FooterProps) {
  const footerLinks = links && links.length > 0 ? links : PLACEHOLDER_LINKS

  return (
    <footer className="py-4 px-6">
      {/* Mobile: vertical stack */}
      <ul className="md:hidden flex flex-col items-center gap-4">
        {footerLinks.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 items-center hover:opacity-80 transition-opacity duration-200 text-base whitespace-nowrap"
            >
              <span className="text-accent-pink font-semibold">{link.platform}:</span>
              <span className="text-text-secondary font-light">{link.handle}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop: horizontal row, centered, up to 936px but shrinks with viewport */}
      <ul className="hidden md:flex flex-row items-center justify-between w-full max-w-[936px] mx-auto">
        {footerLinks.map((link, i) => (
          <Fragment key={link.url}>
            {i > 0 && (
              <li className="self-stretch flex items-center" aria-hidden="true">
                <span className="w-px h-full bg-gray-500" />
              </li>
            )}
            <li className="flex-1 flex items-center justify-center gap-1">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1 items-center hover:opacity-80 transition-opacity duration-200 text-base text-center whitespace-nowrap"
              >
                <span className="text-accent-pink font-semibold">{link.platform}:</span>
                <span className="text-text-secondary font-light">{link.handle}</span>
              </a>
            </li>
          </Fragment>
        ))}
      </ul>
    </footer>
  )
}
