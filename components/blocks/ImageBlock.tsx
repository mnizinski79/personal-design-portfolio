import Image from 'next/image'

interface ImageBlockProps {
  variant?: 'fullWidth' | 'container'
  alt?: string
  backgroundColor?: string
  imageUrl?: string
}

export default function ImageBlock({
  variant = 'container',
  alt = '',
  backgroundColor,
  imageUrl,
}: ImageBlockProps) {
  if (variant === 'fullWidth') {
    return (
      <div className="w-full aspect-[1440/560] relative" style={backgroundColor ? { backgroundColor } : undefined}>
        <Image src={imageUrl ?? '/assets/full-width-image.png'} alt={alt || 'Project image'} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="content-grid py-20">
        <div className="w-full aspect-[2360/1060] relative rounded-small overflow-hidden">
          <Image src={imageUrl ?? '/assets/container-width-image.png'} alt={alt || 'Project image'} fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
