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

function BlockLabel({ name }: { name: string }) {
  return (
    <div className="bg-accent-pink text-white text-xs font-semibold px-3 py-1 tracking-widest uppercase">
      Block: {name}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toImageUrl(ref: any): string | undefined {
  if (!ref) return undefined
  if (typeof ref === 'string') return ref
  try { return urlFor(ref).url() } catch { return undefined }
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        const sharedProps = {
          backgroundColor: block.backgroundColor,
          textColorInverse: block.textColorInverse,
        }

        switch (block._type) {
          case 'richText':
            return <div key={block._key}><BlockLabel name="Rich Text" /><RichTextBlock {...sharedProps} body={block.body as never} /></div>

          case 'tabbedGallery': {
            // Transform Sanity image refs to URL strings for each tab
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rawTabs = block.tabs as any[] | undefined
            const tabs = rawTabs?.map((tab) => ({
              label: tab.label as string,
              imageLeft: toImageUrl(tab.leftImage) ?? tab.imageLeft,
              imageRight: toImageUrl(tab.rightImage) ?? tab.imageRight,
            }))
            return <div key={block._key}><BlockLabel name="Tabbed Gallery" /><TabbedGallery {...sharedProps} tabs={tabs} /></div>
          }

          case 'columns':
            return (
              <div key={block._key}>
                <BlockLabel name="Columns" />
                <Columns
                  {...sharedProps}
                  variant={block.variant as never}
                  columnCount={block.columnCount as number}
                  items={block.items as never}
                />
              </div>
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
              <div key={block._key}>
                <BlockLabel name="Image" />
                <ImageBlock
                  backgroundColor={block.backgroundColor}
                  variant={block.variant as never}
                  alt={alt}
                  imageUrl={imageUrl}
                />
              </div>
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
              <div key={block._key}>
                <BlockLabel name="Client Logos" />
                <ClientLogosBlock
                  {...sharedProps}
                  logos={logos}
                  columns={block.columns as number}
                />
              </div>
            )
          }

          case 'skillBars':
            return <div key={block._key}><BlockLabel name="Skill Bars" /><SkillBarsBlock {...sharedProps} /></div>

          case 'note':
            return (
              <div key={block._key}>
                <BlockLabel name="Note" />
                <Note
                  {...sharedProps}
                  body={block.body as never}
                  accentColor={block.accentColor as string}
                />
              </div>
            )

          case 'basicContainer':
            return <div key={block._key}><BlockLabel name="Basic Container" /><BasicContainer {...sharedProps} body={(block.content ?? block.body) as never} /></div>

          default:
            return null
        }
      })}
    </>
  )
}
