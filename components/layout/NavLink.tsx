'use client'

import Link from 'next/link'

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  onClick?: () => void
}

export default function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`py-3 px-4 text-sm tracking-widest uppercase transition-colors duration-200 w-full text-center ${
        isActive
          ? 'text-accent-pink'
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {label}
    </Link>
  )
}
