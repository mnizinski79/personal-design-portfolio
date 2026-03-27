import Image from 'next/image'

interface MastheadField {
  label: string
  value: string
}

interface ProjectMastheadProps {
  title: string
  fields?: MastheadField[]
  textColorInverse?: boolean
  backgroundImageUrl?: string
  logoImageUrl?: string
}

export default function ProjectMasthead({
  title,
  fields = [],
  textColorInverse = false,
  backgroundImageUrl,
  logoImageUrl,
}: ProjectMastheadProps) {
  const titleColor = textColorInverse ? 'text-text-inverse' : 'text-text-body'
  const valueColor = textColorInverse ? 'text-gray-300' : 'text-text-secondary'

  return (
    <div
      className={`relative w-full h-[360px] md:h-[560px] overflow-hidden ${
        textColorInverse ? 'bg-bg-dark' : 'bg-bg-mid'
      }`}
    >
      {/* Background image */}
      <Image
        src={backgroundImageUrl ?? '/assets/masthead-background-image.png'}
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* ── Mobile layout: top-aligned, full-width padded ─────────────────── */}
      <div className="md:hidden relative z-10 flex flex-col gap-6 p-6 pt-8">
        {/* Client logo */}
        <div className="relative h-[60px] w-[200px]">
          <Image
            src={logoImageUrl ?? '/assets/client-logo-color.png'}
            alt="Client logo"
            fill
            className="object-contain object-left"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className={`h4-upper ${titleColor}`}>{title}</p>

          {fields.length > 0 && (
            <div className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={field.label} className="flex items-center gap-[5px]">
                  <p className="h6-semibold text-accent-pink shrink-0 w-[96px]">{field.label}:</p>
                  <p className={`flex-1 ${valueColor}`}>{field.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop layout: vertically centered, 8-col column ─────────────── */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center">
        <div className="masthead-content flex flex-col gap-14">
          {/* Client logo */}
          <div className="relative h-[90px] w-[320px]">
            <Image
              src={logoImageUrl ?? '/assets/client-logo-color.png'}
              alt="Client logo"
              fill
              className="object-contain object-left"
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className={`h4-upper ${titleColor}`}>{title}</p>

            {fields.length > 0 && (
              <div className="flex flex-col gap-4">
                {fields.map((field) => (
                  <div key={field.label} className="flex items-center gap-[5px]">
                    <p className="h6-semibold text-accent-pink shrink-0 w-[96px]">{field.label}:</p>
                    <p className={`flex-1 ${valueColor}`}>{field.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
