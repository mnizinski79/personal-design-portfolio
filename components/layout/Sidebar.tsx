'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import NavLink from './NavLink'
import TransitionLink from './TransitionLink'

interface NavLinkItem {
  label: string
  href: string
}

interface SidebarProps {
  pathname: string
  navLinks?: NavLinkItem[]
  logoUrl?: string
  collapsed?: boolean
  onMouseEnter?: () => void
}

const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Sidebar({ pathname, navLinks, logoUrl, collapsed = false, onMouseEnter }: SidebarProps) {
  const links = navLinks && navLinks.length > 0 ? navLinks : DEFAULT_NAV_LINKS

  // Mobile: expand/collapse state
  const [menuOpen, setMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  const LogoMark = ({ size = 'desktop' }: { size?: 'desktop' | 'mobile' }) => (
    logoUrl ? (
      <Image
        src={logoUrl}
        alt="Mike Nizinski"
        width={size === 'mobile' ? 114 : 80}
        height={size === 'mobile' ? 60 : 80}
        className="object-contain"
      />
    ) : (
      <div className="text-white font-light text-center leading-tight">
        <div className="text-accent-cyan text-2xl font-semibold tracking-widest">MN</div>
        <div className="text-[10px] tracking-[3px] uppercase mt-1 text-gray-400">Mike Nizinski</div>
      </div>
    )
  )

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────────────────────────── */}
      <aside
        onMouseEnter={onMouseEnter}
        className="sidebar-nav hidden md:flex flex-col items-center p-8 fixed top-5 left-5 h-auto z-50 bg-sidebar w-[190px] rounded-small"
        aria-label="Site navigation"
      >
        <TransitionLink href="/" className="flex-shrink-0" aria-label="Home">
          <LogoMark />
        </TransitionLink>

        {/* Nav items — collapse by shrinking height and fading, matching Figma collapsed state */}
        <div
          style={{
            maxHeight: collapsed ? '0' : '300px',
            opacity: collapsed ? 0 : 1,
            marginTop: collapsed ? '0' : '56px',
            overflow: 'hidden',
            width: '100%',
            transition: 'max-height 200ms ease-in-out, opacity 150ms ease-in-out, margin-top 200ms ease-in-out',
          }}
          aria-hidden={collapsed}
        >
          <nav className="flex flex-col items-center w-full gap-5">
            {links.map((link, i) => (
              <div key={link.href} className="w-full flex flex-col items-center gap-5">
                {i > 0 && <hr className="w-8 border-gray-600" />}
                <NavLink href={link.href} label={link.label} isActive={isActive(link.href)} />
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Mobile expandable top bar ──────────────────────────────────────── */}
      <header className="md:hidden sticky top-0 z-50 bg-sidebar" aria-label="Mobile site header">
        {/* Logo row — logo centered, trigger absolutely positioned right */}
        <div className="relative flex items-center justify-center p-4">
          <TransitionLink href="/" aria-label="Home">
            <LogoMark size="mobile" />
          </TransitionLink>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              // × close icon — two crossed bars
              <span className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute w-6 h-[4px] bg-white rounded-full rotate-45" />
                <span className="absolute w-6 h-[4px] bg-white rounded-full -rotate-45" />
              </span>
            ) : (
              // Hamburger — staggered opacity per Figma
              <span className="flex flex-col gap-[7px]">
                <span className="block w-6 h-[4px] bg-white opacity-60 rounded-full" />
                <span className="block w-6 h-[4px] bg-white opacity-80 rounded-full" />
                <span className="block w-6 h-[4px] bg-white rounded-full" />
              </span>
            )}
          </button>
        </div>

        {/* Expandable nav items — expands downward, pushes content */}
        <div
          style={{
            maxHeight: menuOpen ? '240px' : '0',
            overflow: 'hidden',
            transition: 'max-height 250ms ease-in-out',
          }}
          aria-hidden={!menuOpen}
        >
          <nav className="flex flex-col items-center pb-6 gap-5">
            {links.map((link, i) => (
              <div key={link.href} className="flex flex-col items-center gap-5 w-full">
                {i > 0 && <hr className="w-8 border-gray-600" />}
                <NavLink
                  href={link.href}
                  label={link.label}
                  isActive={isActive(link.href)}
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
