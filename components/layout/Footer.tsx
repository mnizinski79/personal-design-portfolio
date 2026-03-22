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
    <footer className="py-6 px-8">
      <ul className="flex flex-row items-center gap-0 flex-wrap">
        {footerLinks.map((link, i) => (
          <li key={link.url} className="flex items-center">
            {i > 0 && (
              <span className="mx-3 text-gray-500 text-xs select-none">|</span>
            )}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wide text-gray-400 hover:text-accent-cyan transition-colors duration-200"
            >
              {link.platform}
              <span className="text-gray-600 ml-1">{link.handle}</span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
