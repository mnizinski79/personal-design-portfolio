import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/sanity/lib/image'

// ── Types ────────────────────────────────────────────────────────────────────

interface ColumnBlock {
  _type: string
  _key?: string
  // columnImage
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: Record<string, any>
  // columnRichText / columnNote
  body?: PortableTextBlock[]
  // columnNote
  accentColor?: string | { hex: string }
}

interface ColumnItem {
  _key?: string
  blocks?: ColumnBlock[]
  // Legacy fallback (used by placeholder data)
  heading?: string
  body?: string
}

interface ColumnsProps {
  variant?: 'twoColumn' | 'multiColumn' | 'tiles'
  /** multiColumn: number of equal columns (2–6). tiles: items per row before wrapping (2–6). */
  columnCount?: number
  items?: ColumnItem[]
  backgroundColor?: string
  textColorInverse?: boolean
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toHex(value: string | { hex: string } | undefined): string {
  if (!value) return '#EA3B7B'
  if (typeof value === 'string') return value
  return value.hex
}

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-3 last:mb-0">{children}</p>,
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="font-light mb-4">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="mb-4">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="mb-3">{children}</h3>,
  },
}

const ptNoteComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p className="body-small mb-3 last:mb-0">{children}</p>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="mb-4">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="mb-3">{children}</h3>,
  },
}

function ColumnBlockItem({
  block,
  bodyColor,
}: {
  block: ColumnBlock
  bodyColor: string
}) {
  if (block._type === 'columnImage') {
    const imgUrl = block.image?.asset ? urlFor(block.image).url() : null
    if (!imgUrl) return null
    return (
      <div className="relative w-full">
        <Image
          src={imgUrl}
          alt={block.image?.alt ?? ''}
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
    )
  }

  if (block._type === 'columnRichText') {
    if (!block.body?.length) return null
    return (
      <div className={bodyColor}>
        <PortableText value={block.body} components={ptComponents as never} />
      </div>
    )
  }

  if (block._type === 'columnNote') {
    return (
      <div className="px-6 flex flex-col gap-4">
        <div className="w-16 h-[2px]" style={{ backgroundColor: toHex(block.accentColor) }} />
        {block.body?.length ? (
          <div className={bodyColor}>
            <PortableText value={block.body} components={ptNoteComponents as never} />
          </div>
        ) : null}
      </div>
    )
  }

  return null
}

// ── Placeholder data ──────────────────────────────────────────────────────────

const PLACEHOLDER_ITEMS: ColumnItem[] = [
  { heading: 'Discovery',  body: 'We start every engagement with deep research into the problem space, users, and competitive landscape.' },
  { heading: 'Strategy',   body: 'Data and insights inform a clear strategic direction before a single pixel is placed.' },
  { heading: 'Design',     body: 'Iterative design cycles move from rough concepts to polished, production-ready specs.' },
  { heading: 'Delivery',   body: 'Close collaboration with engineering ensures the vision ships exactly as designed.' },
  { heading: 'Research',   body: 'Qualitative and quantitative methods surface the truths that assumptions hide.' },
  { heading: 'Testing',    body: 'Usability testing and QA cycles catch friction before it reaches real users.' },
  { heading: 'Launch',     body: 'A smooth handoff and launch plan means the work lands as intended, every time.' },
  { heading: 'Support',    body: 'Post-launch monitoring and iteration keeps the product sharp as usage evolves.' },
]

const PLACEHOLDER_TWO_COL: ColumnItem[] = [
  {
    heading: 'This is a title',
    body: 'Tellus vitae cum lectus egestas eleifend sed pharetra gravida. Amet in viverra ligula elit molestie id. Sed curabitur rhoncus ultrices dui et. In donec id fames orci elit. Dignissim id eget tincidunt lacus ac.',
  },
  {
    body: 'Vitae quam fermentum vivamus cursus tincidunt. Sed phasellus auctor arcu convallis. Sed pharetra vitae praesent interdum purus tempor. Pellentesque sit pretium donec adipiscing aliquam lectus vitae. Viverra nulla ut platea risus ornare at.',
  },
]

// Map column counts to Tailwind grid classes — written out explicitly so JIT picks them up
const GRID_COLS: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
}

// ── Column content renderer ───────────────────────────────────────────────────

function renderColumnContent(item: ColumnItem, bodyColor: string, textColor: string) {
  // New blocks-based format from Sanity
  if (item.blocks?.length) {
    return item.blocks.map((block, i) => (
      <ColumnBlockItem key={block._key ?? i} block={block} bodyColor={bodyColor} />
    ))
  }
  // Legacy heading/body (placeholder data)
  return (
    <>
      {item.heading && <h1 className={`font-light ${textColor}`}>{item.heading}</h1>}
      {item.body && <p className={bodyColor}>{item.body}</p>}
    </>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Columns({
  variant = 'twoColumn',
  columnCount = 3,
  items,
  backgroundColor,
  textColorInverse = false,
}: ColumnsProps) {
  const textColor = textColorInverse ? 'text-text-inverse' : 'text-text-body'
  const bodyColor = textColorInverse ? 'text-gray-300' : 'text-text-secondary'

  // ── Two Column ──────────────────────────────────────────────────────────────
  if (variant === 'twoColumn') {
    const data = items ?? PLACEHOLDER_TWO_COL
    return (
      <div
        className={`py-20${!backgroundColor ? ' two-col-bg' : ''}`}
        style={backgroundColor ? { backgroundColor } : undefined}
      >
        <div className="content-grid flex flex-col md:flex-row gap-10 md:gap-[216px] items-start">
          <div className="flex-1 flex flex-col gap-6">
            {renderColumnContent(data[0] ?? {}, bodyColor, textColor)}
          </div>
          <div className="flex-1 flex flex-col gap-6">
            {renderColumnContent(data[1] ?? {}, bodyColor, textColor)}
          </div>
        </div>
      </div>
    )
  }

  // ── Multi Column ─────────────────────────────────────────────────────────────
  if (variant === 'multiColumn') {
    const data = items ?? PLACEHOLDER_ITEMS.slice(0, columnCount)
    const colsClass = GRID_COLS[columnCount] ?? 'md:grid-cols-3'
    return (
      <div style={backgroundColor ? { backgroundColor } : undefined}>
        <div className={`content-grid py-20 grid grid-cols-1 ${colsClass} gap-6`}>
          {data.map((item, i) => (
            <div key={item._key ?? i} className="flex flex-col gap-3">
              {renderColumnContent(item, bodyColor, textColor)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Tiles ─────────────────────────────────────────────────────────────────────
  const data = items ?? PLACEHOLDER_ITEMS
  const colsClass = GRID_COLS[columnCount] ?? 'md:grid-cols-3'
  return (
    <div style={backgroundColor ? { backgroundColor } : undefined}>
      <div className={`content-grid py-20 grid grid-cols-2 ${colsClass} gap-6`}>
        {data.map((item, i) => (
          <div key={item._key ?? i} className="flex flex-col gap-3">
            {renderColumnContent(item, bodyColor, textColor)}
          </div>
        ))}
      </div>
    </div>
  )
}
