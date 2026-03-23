import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

interface BasicContainerProps {
  body?: PortableTextBlock[]
  backgroundColor?: string
  textColorInverse?: boolean
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 mb-4 first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 first:mt-0">{children}</h3>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-accent-cyan underline hover:opacity-80 transition-opacity"
      >
        {children}
      </a>
    ),
  },
}

const PLACEHOLDER_BODY: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'a',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'a1',
        text: 'Additional project details and assets will appear here once content is migrated to the CMS.',
        marks: [],
      },
    ],
    markDefs: [],
  },
]

export default function BasicContainer({
  body,
  backgroundColor,
  textColorInverse = false,
}: BasicContainerProps) {
  const textColor = textColorInverse ? 'text-text-inverse' : 'text-text-body'

  return (
    <div
      className={`py-16 ${textColor}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="page-content">
        <PortableText value={body ?? PLACEHOLDER_BODY} components={components} />
      </div>
    </div>
  )
}
