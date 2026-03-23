import SkillBars from '@/components/about/SkillBars'

interface SkillBarsBlockProps {
  backgroundColor?: string
  textColorInverse?: boolean
}

export default function SkillBarsBlock({
  backgroundColor,
  textColorInverse = false,
}: SkillBarsBlockProps) {
  return (
    <div
      className="py-16"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="page-content">
        <SkillBars />
      </div>
    </div>
  )
}
