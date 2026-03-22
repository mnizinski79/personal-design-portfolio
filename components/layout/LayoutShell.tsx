'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
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

export default function LayoutShell({
  children,
  navLinks,
  footerLinks,
  logoUrl,
}: LayoutShellProps) {
  const pathname = usePathname()
  const isProjectsBg = pathname.startsWith('/projects')

  return (
    <div className="flex min-h-screen">
      <SkipToContent />
      <Sidebar pathname={pathname} navLinks={navLinks} logoUrl={logoUrl} />

      {/* Main content area — offset by sidebar width on desktop, top bar on mobile */}
      <div
        className={`flex flex-1 flex-col md:ml-[190px] mt-14 md:mt-0 ${
          isProjectsBg ? 'bg-projects-bg' : 'bg-bg-light'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            id="main-content"
            className="flex-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <Footer links={footerLinks} />
      </div>
    </div>
  )
}
