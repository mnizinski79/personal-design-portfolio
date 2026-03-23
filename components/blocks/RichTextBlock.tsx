import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

interface RichTextBlockProps {
  body?: PortableTextBlock[]
  backgroundColor?: string
  textColorInverse?: boolean
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 first:mt-0">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 last:mb-0">{children}</p>
    ),
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

// Placeholder content rendered when no CMS data is available (Phase 5 wiring pending)
const PLACEHOLDER_BODY: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'a',
    style: 'h2',
    children: [{ _type: 'span', _key: 'a1', text: 'Project Overview', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block',
    _key: 'b',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'b1',
        text: 'Lorem ipsum dolor sit amet consectetur. Diam enim aliquam dignissim consectetur suspendisse. Tortor sagittis nisi lectus consequat eu dignissim mattis lorem.',
        marks: [],
      },
    ],
    markDefs: [],
  },
  {
    _type: 'block',
    _key: 'c',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'c1',
        text: 'Nulla scelerisque elit dignissim mattis lorem ipsum dolor sit amet. Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        marks: [],
      },
    ],
    markDefs: [],
  },
]

export default function RichTextBlock({
  body,
  backgroundColor,
  textColorInverse = false,
}: RichTextBlockProps) {
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
