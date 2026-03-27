import ProjectMasthead from '@/components/project-detail/ProjectMasthead'
import BlockRenderer from '@/components/project-detail/BlockRenderer'

export default function TestComponentsPage() {
  return (
    <div>
      <ProjectMasthead
        title="Test Components Page"
        fields={[
          { label: 'Client', value: 'Client Name' },
          { label: 'Industry', value: 'Financial Services' },
          { label: 'Year', value: '2024' },
          { label: 'Role', value: 'UX / UI Design Lead' },
        ]}
        textColorInverse={true}
      />
      <BlockRenderer
        blocks={[
          { _type: 'richText', _key: 'b1' },
          { _type: 'tabbedGallery', _key: 'b2', textColorInverse: true, backgroundColor: '#2E2E2E' },
          { _type: 'columns', _key: 'b3a', variant: 'twoColumn' },
          { _type: 'columns', _key: 'b3b', variant: 'multiColumn', columnCount: 4 },
          { _type: 'columns', _key: 'b3c', variant: 'tiles', columnCount: 3 },
          { _type: 'note', _key: 'b4' },
          { _type: 'image', _key: 'b5a', variant: 'fullWidth' },
          { _type: 'image', _key: 'b5b', variant: 'container' },
          { _type: 'clientLogos', _key: 'b6' },
          { _type: 'basicContainer', _key: 'b7' },
          { _type: 'skillBars', _key: 'b8' },
          { _type: 'skillBars', _key: 'b9', textColorInverse: true, backgroundColor: '#2E2E2E' },
        ]}
      />
    </div>
  )
}
