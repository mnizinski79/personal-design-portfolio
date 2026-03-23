'use client'

import TransitionLink from './TransitionLink'

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  onClick?: () => void
}

export default function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <TransitionLink
      href={href}
      onClick={onClick}
      className={`text-base transition-colors duration-200 text-center ${
        isActive ? 'text-accent-pink' : 'text-gray-300 hover:text-white'
      }`}
    >
      {label}
    </TransitionLink>
  )
}
