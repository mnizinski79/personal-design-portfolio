interface ColumnItem {
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
          <div className="flex-1 flex flex-col gap-10">
            {data[0]?.heading && (
              <h1 className={`font-light ${textColor}`}>{data[0].heading}</h1>
            )}
            {data[0]?.body && <p className={bodyColor}>{data[0].body}</p>}
          </div>
          <div className="flex-1 flex flex-col gap-10">
            {data[1]?.body && <p className={bodyColor}>{data[1].body}</p>}
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
      <div
        style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className={`content-grid py-20 grid grid-cols-1 ${colsClass} gap-6`}>
          {data.map((item, i) => (
            <div key={i} className="flex flex-col gap-3">
              {item.heading && <h3 className={textColor}>{item.heading}</h3>}
              {item.body && <p className={bodyColor}>{item.body}</p>}
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
    <div
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className={`content-grid py-20 grid grid-cols-2 ${colsClass} gap-6`}>
        {data.map((item, i) => (
          <div key={i} className="flex flex-col gap-3">
            {item.heading && <h3 className={textColor}>{item.heading}</h3>}
            {item.body && <p className={bodyColor}>{item.body}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
