import RichTextBlock from '@/components/blocks/RichTextBlock'
import TabbedGallery from '@/components/blocks/TabbedGallery'
import Columns from '@/components/blocks/Columns'
import ImageBlock from '@/components/blocks/ImageBlock'
import ClientLogosBlock from '@/components/blocks/ClientLogosBlock'
import SkillBarsBlock from '@/components/blocks/SkillBarsBlock'
import Note from '@/components/blocks/Note'
import BasicContainer from '@/components/blocks/BasicContainer'
import { urlFor } from '@/sanity/lib/image'

export interface Block {
  _type: string
  _key: string
  backgroundColor?: string
  textColorInverse?: boolean
  [key: string]: unknown
}

interface BlockRendererProps {
  blocks: Block[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toImageUrl(ref: any): string | undefined {
  if (!ref) return undefined
  if (typeof ref === 'string') return ref
  try { return urlFor(ref).url() } catch { return undefined }
}

// Normalizes a color value from Sanity — either a plain hex string or a
// color-input object { hex: string } — to a hex string or undefined.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toHexColor(value: any): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return value
  if (typeof value === 'object' && typeof value.hex === 'string') return value.hex
  return undefined
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        const sharedProps = {
          backgroundColor: toHexColor(block.backgroundColor),
          textColorInverse: block.textColorInverse,
        }

        switch (block._type) {
          case 'richText':
            return <RichTextBlock key={block._key} {...sharedProps} body={block.body as never} />

          case 'tabbedGallery': {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rawTabs = block.tabs as any[] | undefined
            const tabs = rawTabs?.map((tab) => ({
              label: tab.label as string,
              imageLeft: toImageUrl(tab.leftImage) ?? tab.imageLeft,
              imageRight: toImageUrl(tab.rightImage) ?? tab.imageRight,
            }))
            return <TabbedGallery key={block._key} {...sharedProps} tabs={tabs} />
          }

          case 'columns':
            return (
              <Columns
                key={block._key}
                {...sharedProps}
                variant={block.variant as never}
                columnCount={block.columnCount as number}
                items={block.items as never}
              />
            )

          // Handle both placeholder type ('image') and Sanity schema type ('imageBlock')
          case 'image':
          case 'imageBlock': {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const imgRef = block.image as any
            const imageUrl = toImageUrl(imgRef?.asset ? imgRef : undefined)
              ?? (imgRef as string | undefined)
            const alt = (imgRef?.alt as string | undefined) ?? (block.alt as string | undefined)
            return (
              <ImageBlock
                key={block._key}
                backgroundColor={toHexColor(block.backgroundColor)}
                variant={block.variant as never}
                alt={alt}
                imageUrl={imageUrl}
              />
            )
          }

          case 'clientLogos': {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rawLogos = block.logos as any[] | undefined
            const logos = rawLogos?.map((l) => ({
              name: (l.companyName ?? l.name) as string,
              logoUrl: toImageUrl(l.logo),
            }))
            return (
              <ClientLogosBlock
                key={block._key}
                {...sharedProps}
                logos={logos}
                columns={block.columns as number}
              />
            )
          }

          case 'skillBars':
            return <SkillBarsBlock key={block._key} {...sharedProps} />

          case 'note':
            return (
              <Note
                key={block._key}
                {...sharedProps}
                body={block.body as never}
                accentColor={toHexColor(block.accentColor)}
              />
            )

          case 'basicContainer':
            return <BasicContainer key={block._key} {...sharedProps} body={(block.content ?? block.body) as never} />

          default:
            return null
        }
      })}
    </>
  )
}
