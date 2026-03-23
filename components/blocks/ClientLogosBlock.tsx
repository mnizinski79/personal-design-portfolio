import Image from 'next/image'

interface LogoItem {
  name: string
}

interface ClientLogosBlockProps {
  logos?: LogoItem[]
  columns?: number
  backgroundColor?: string
  textColorInverse?: boolean
}

const PLACEHOLDER_LOGOS: LogoItem[] = [
  { name: 'Marriott' }, { name: 'Booz Allen' }, { name: 'KPMG' }, { name: 'FTI Consulting' },
  { name: 'AOL' }, { name: 'Inova Health' }, { name: 'Discovery' }, { name: 'Sallie Mae' },
]

export default function ClientLogosBlock({
  logos,
  columns = 4,
  backgroundColor,
  textColorInverse = false,
}: ClientLogosBlockProps) {
  const items = logos ?? PLACEHOLDER_LOGOS
  const total = items.length
  const borderColor = textColorInverse ? 'border-white/20' : 'border-border-light'
  const textColor = textColorInverse ? 'text-gray-300' : 'text-text-secondary'

  return (
    <div
      className="py-16"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="page-content">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {items.map((logo, i) => {
            const col = i % columns
            const rightBorder = col < columns - 1 ? `border-r ${borderColor}` : ''
            const bottomBorder = i < total - columns ? `border-b ${borderColor}` : ''

            return (
              <div
                key={logo.name}
                className={`flex items-center justify-center aspect-square text-sm font-medium text-center px-2 ${textColor} ${rightBorder} ${bottomBorder}`}
              >
                <div className="relative w-full h-[60px]">
                  <Image
                    src={textColorInverse ? '/assets/client-logo-knockout.png' : '/assets/client-logo-color.png'}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
