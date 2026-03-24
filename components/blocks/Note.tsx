import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

interface NoteBlockProps {
  body?: PortableTextBlock[]
  accentColor?: string
  backgroundColor?: string
  textColorInverse?: boolean
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3">{children}</h3>,
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
        text: 'This project required close collaboration across brand, engineering, and executive stakeholders to align on a unified vision before execution.',
        marks: [],
      },
    ],
    markDefs: [],
  },
]

export default function Note({
  body,
  accentColor = '#EA3B7B',
  backgroundColor,
  textColorInverse = false,
}: NoteBlockProps) {
  const textColor = textColorInverse ? 'text-text-inverse' : 'text-text-body'

  return (
    <div
      className="px-6 flex flex-col gap-4"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      {/* Accent bar — 64px wide, 2px tall */}
      <div className="w-16 h-[2px]" style={{ backgroundColor: accentColor }} />
      <div className={textColor}>
        <PortableText value={body ?? PLACEHOLDER_BODY} components={components} />
      </div>
    </div>
  )
}
