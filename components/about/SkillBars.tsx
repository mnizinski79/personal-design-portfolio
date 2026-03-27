'use client'

import { useEffect, useRef } from 'react'

interface Skill {
  label: string
  level: number // 0–100
}

const DEFAULT_ZONE_LABELS = [
  "Don't Hire Me for This",
  'Enough to be Dangerous',
  'Jedi Master',
]

const DEFAULT_SKILLS: Skill[] = [
  { label: 'iOS / Native Dev',        level: 20 },
  { label: 'Node.js / Backend',       level: 30 },
  { label: 'Motion Graphics',         level: 35 },
  { label: 'JavaScript / React',      level: 60 },
  { label: 'HTML / CSS',              level: 72 },
  { label: 'Adobe Photoshop',         level: 65 },
  { label: 'UX Research',             level: 70 },
  { label: 'Figma / Sketch',          level: 95 },
  { label: 'Adobe Illustrator',       level: 92 },
  { label: 'Brand Identity',          level: 90 },
  { label: 'UI / Interaction Design', level: 88 },
]

interface SkillBarsProps {
  skills?: Skill[]
  zoneLabels?: string[]
  textColorInverse?: boolean
}

export default function SkillBars({ skills, zoneLabels, textColorInverse = false }: SkillBarsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const resolvedSkills = skills ?? DEFAULT_SKILLS
  const resolvedZoneLabels = zoneLabels ?? DEFAULT_ZONE_LABELS

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar) => {
              bar.classList.add('animate')
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const labelColor = textColorInverse ? 'text-gray-300' : 'text-text-secondary'

  return (
    <div ref={containerRef}>

      {/* ── Header row ───────────────────────────────────────────────────────── */}
      <div className="flex items-end mb-4">
        <h2 className="text-accent-pink shrink-0 w-[168px]">
          Skills
        </h2>
        <div className="hidden md:flex flex-1 gap-6 pb-2">
          {resolvedZoneLabels.map((label) => (
            <p key={label} className={`body-small flex-1 text-center ${labelColor}`}>
              {label}
            </p>
          ))}
        </div>
      </div>

      {/* ── Skill rows ───────────────────────────────────────────────────────── */}
      <div className="relative">

        <div
          className="hidden md:block absolute -top-[28px] -bottom-[12px] pointer-events-none z-[1]"
          style={{ left: '168px', right: 0 }}
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 border-l border-dashed border-border-mid" style={{ left: '33.33%' }} />
          <div className="absolute inset-y-0 border-l border-dashed border-border-mid" style={{ left: '66.67%' }} />
        </div>

        <div className="flex flex-col gap-4">
          {resolvedSkills.map((skill) => (
            <div key={skill.label} className="flex flex-col md:flex-row md:items-center">

              <p className={`body-small font-semibold shrink-0 mb-2 md:mb-0 md:w-[168px] ${labelColor}`}>
                {skill.label}
              </p>

              <div className="relative flex-1 h-3">
                <div className="absolute inset-0 bg-[#d9d9d9] rounded-pill" />
                <div
                  className="skill-bar-fill absolute inset-y-0 left-0 z-[2] bg-accent-cyan rounded-pill"
                  style={{ '--skill-level': `${skill.level}%` } as React.CSSProperties}
                />
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}
