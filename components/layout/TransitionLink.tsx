'use client'

import { useRouter } from 'next/navigation'
import { usePageTransition } from './LayoutShell'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  'aria-label'?: string
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  'aria-label': ariaLabel,
}: TransitionLinkProps) {
  const router = useRouter()
  const { navigate } = usePageTransition()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    onClick?.()
    await navigate(href)
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  )
}
