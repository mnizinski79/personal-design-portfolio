interface ColumnItem {
  heading?: string
  body?: string
}

interface ColumnsProps {
  variant?: 'twoColumn' | 'multiColumn' | 'tiles'
  columnCount?: number
  items?: ColumnItem[]
  backgroundColor?: string
  textColorInverse?: boolean
}

const PLACEHOLDER_ITEMS: ColumnItem[] = [
  { heading: 'Discovery', body: 'We start every engagement with deep research into the problem space, users, and competitive landscape.' },
  { heading: 'Strategy', body: 'Data and insights inform a clear strategic direction before a single pixel is placed.' },
  { heading: 'Design', body: 'Iterative design cycles move from rough concepts to polished, production-ready specs.' },
  { heading: 'Delivery', body: 'Close collaboration with engineering ensures the vision ships exactly as designed.' },
]

export default function Columns({
  variant = 'twoColumn',
  columnCount = 2,
  items,
  backgroundColor,
  textColorInverse = false,
}: ColumnsProps) {
  const data = items ?? PLACEHOLDER_ITEMS
  const headingColor = textColorInverse ? 'text-text-inverse' : 'text-text-body'
  const bodyColor = textColorInverse ? 'text-gray-300' : 'text-text-secondary'

  // Grid class based on variant
  let gridClass = 'grid gap-8'
  if (variant === 'twoColumn') {
    gridClass += ' md:grid-cols-2'
  } else if (variant === 'multiColumn') {
    // Stack on mobile, n-col on desktop
    gridClass += ` md:grid-cols-${columnCount}`
  } else if (variant === 'tiles') {
    // 2-col on mobile, 3 or 4 on desktop
    gridClass += ` grid-cols-2 ${columnCount === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`
  }

  return (
    <div
      className="py-16"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="page-content">
        <div className={gridClass}>
          {data.map((item, i) => (
            <div key={i}>
              {item.heading && (
                <h3 className={`mb-3 ${headingColor}`}>{item.heading}</h3>
              )}
              {item.body && (
                <p className={bodyColor}>{item.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
