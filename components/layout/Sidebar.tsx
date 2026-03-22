'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavLink from './NavLink'

interface NavLinkItem {
  label: string
  href: string
}

interface SidebarProps {
  pathname: string
  navLinks?: NavLinkItem[]
  logoUrl?: string
}

const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Sidebar({ pathname, navLinks, logoUrl }: SidebarProps) {
  const links = navLinks && navLinks.length > 0 ? navLinks : DEFAULT_NAV_LINKS

  // Desktop: scroll-collapse state
  const [collapsed, setCollapsed] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Mobile: overlay open/close state
  const [menuOpen, setMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Desktop scroll-collapse
  const handleScroll = useCallback(() => {
    const y = window.scrollY
    if (y > lastScrollY && y > 80) {
      setCollapsed(true)
    } else if (y < lastScrollY) {
      setCollapsed(false)
    }
    setLastScrollY(y)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────────────────────────── */}
      <aside
        onMouseEnter={() => setCollapsed(false)}
        className="sidebar-nav hidden md:flex flex-col items-center py-8 fixed top-0 left-0 h-full z-50 bg-sidebar w-[190px]"
        style={{
          transform: collapsed ? 'translateX(-155px)' : 'translateX(0)',
          transition: 'transform 200ms ease-in-out',
        }}
        aria-label="Site navigation"
      >
        {/* Logo */}
        <Link href="/" className="mb-8 flex-shrink-0" aria-label="Home">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Mike Nizinski"
              width={80}
              height={80}
              className="object-contain"
            />
          ) : (
            // Placeholder logo text until Sanity is wired
            <div className="text-white font-light text-center leading-tight">
              <div className="text-accent-cyan text-2xl font-semibold tracking-widest">MN</div>
              <div className="text-[10px] tracking-[3px] uppercase mt-1 text-gray-400">Mike Nizinski</div>
            </div>
          )}
        </Link>

        {/* Nav links */}
        <nav className="flex flex-col items-center w-full mt-2">
          {links.map((link, i) => (
            <div key={link.href} className="w-full flex flex-col items-center">
              {i > 0 && (
                <hr className="w-1/2 border-gray-600 my-0" />
              )}
              <NavLink
                href={link.href}
                label={link.label}
                isActive={isActive(link.href)}
              />
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Mobile top bar ────────────────────────────────────────────────── */}
      <header
        className="md:hidden fixed top-0 inset-x-0 h-14 bg-sidebar z-50 flex items-center px-4"
        aria-label="Mobile site header"
      >
        <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Home">
          {logoUrl ? (
            <Image src={logoUrl} alt="Mike Nizinski" width={32} height={32} className="object-contain" />
          ) : (
            <span className="text-accent-cyan font-semibold tracking-widest text-sm">MN</span>
          )}
        </Link>
        <button
          onClick={() => setMenuOpen(true)}
          className="ml-auto text-white text-2xl leading-none p-2 -mr-2"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </header>

      {/* ── Mobile nav overlay ────────────────────────────────────────────── */}
      <div
        className="md:hidden fixed inset-0 bg-sidebar z-50 flex flex-col items-center justify-center"
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 200ms ease-in-out',
        }}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-white text-3xl leading-none p-2 -mr-2"
          aria-label="Close navigation menu"
        >
          ×
        </button>

        {/* Logo */}
        <Link href="/" className="mb-10" aria-label="Home" onClick={() => setMenuOpen(false)}>
          {logoUrl ? (
            <Image src={logoUrl} alt="Mike Nizinski" width={60} height={60} className="object-contain" />
          ) : (
            <div className="text-center">
              <div className="text-accent-cyan text-3xl font-semibold tracking-widest">MN</div>
              <div className="text-[10px] tracking-[3px] uppercase mt-1 text-gray-400">Mike Nizinski</div>
            </div>
          )}
        </Link>

        {/* Nav links */}
        <nav className="flex flex-col items-center w-full">
          {links.map((link, i) => (
            <div key={link.href} className="w-full flex flex-col items-center">
              {i > 0 && (
                <hr className="w-1/3 border-gray-600 my-2" />
              )}
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
    </>
  )
}
