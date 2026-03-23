import RichTextBlock from '@/components/blocks/RichTextBlock'
import TabbedGallery from '@/components/blocks/TabbedGallery'
import Columns from '@/components/blocks/Columns'
import ImageBlock from '@/components/blocks/ImageBlock'
import ClientLogosBlock from '@/components/blocks/ClientLogosBlock'
import SkillBarsBlock from '@/components/blocks/SkillBarsBlock'
import Note from '@/components/blocks/Note'
import BasicContainer from '@/components/blocks/BasicContainer'

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

          case 'tabbedGallery':
            return <div key={block._key}><BlockLabel name="Tabbed Gallery" /><TabbedGallery {...sharedProps} tabs={block.tabs as never} /></div>

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

          case 'image':
            return (
              <div key={block._key}>
                <BlockLabel name="Image" />
                <ImageBlock
                  backgroundColor={block.backgroundColor}
                  variant={block.variant as never}
                  alt={block.alt as string}
                />
              </div>
            )

          case 'clientLogos':
            return (
              <div key={block._key}>
                <BlockLabel name="Client Logos" />
                <ClientLogosBlock
                  {...sharedProps}
                  logos={block.logos as never}
                  columns={block.columns as number}
                />
              </div>
            )

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
            return <div key={block._key}><BlockLabel name="Basic Container" /><BasicContainer {...sharedProps} body={block.body as never} /></div>

          default:
            return null
        }
      })}
    </>
  )
}
