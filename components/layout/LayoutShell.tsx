'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'
import Sidebar from './Sidebar'
import Footer from './Footer'
import SkipToContent from '../ui/SkipToContent'

interface FooterLink {
  platform: string
  handle: string
  url: string
}

interface NavLinkItem {
  label: string
  href: string
}

interface LayoutShellProps {
  children: React.ReactNode
  navLinks?: NavLinkItem[]
  footerLinks?: FooterLink[]
  logoUrl?: string
}

// Shared context so TransitionLink can trigger the exit animation
interface TransitionContextType {
  navigate: (href: string) => Promise<void>
}

export const TransitionContext = createContext<TransitionContextType>({
  navigate: async () => {},
})

export function usePageTransition() {
  return useContext(TransitionContext)
}

export default function LayoutShell({
  children,
  navLinks,
  footerLinks,
  logoUrl,
}: LayoutShellProps) {
  const pathname = usePathname()
  const controls = useAnimation()
  const prevPathname = useRef(pathname)
  const isNavigating = useRef(false)

  // Sidebar collapse state — driven by the scroll container scroll, not window
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const lastScrollY = useRef(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // When pathname changes (new page loaded), play entrance from right
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      isNavigating.current = false
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeInOut' },
      })
    }
  }, [pathname, controls])

  // Scroll listener on the actual scroll container (not window)
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const handleScroll = () => {
      const y = el.scrollTop
      if (y > lastScrollY.current && y > 80) {
        setSidebarCollapsed(true)
      } else if (y < lastScrollY.current) {
        setSidebarCollapsed(false)
      }
      lastScrollY.current = y
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // Called by TransitionLink before router.push
  const navigate = useCallback(
    async (href: string) => {
      if (isNavigating.current || href === pathname) return
      isNavigating.current = true

      // 1. Slide current page out to the left
      await controls.start({
        x: '-100%',
        opacity: 0,
        transition: { duration: 0.25, ease: 'easeInOut' },
      })

      // 2. Snap off-screen right — new content will load here before sliding in
      controls.set({ x: '100%', opacity: 0 })
    },
    [pathname, controls]
  )

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div className="flex flex-col min-h-screen">
        <SkipToContent />
        <Sidebar
          pathname={pathname}
          navLinks={navLinks}
          logoUrl={logoUrl}
          collapsed={sidebarCollapsed}
          onMouseEnter={() => setSidebarCollapsed(false)}
        />

        <div className="flex-1 relative overflow-hidden bg-bg-light">
          <motion.div
            ref={scrollContainerRef}
            animate={controls}
            initial={{ x: 0, opacity: 1 }}
            className="absolute inset-0 flex flex-col overflow-y-auto bg-bg-light"
          >
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer links={footerLinks} />
          </motion.div>
        </div>
      </div>
    </TransitionContext.Provider>
  )
}
