import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/layout/LayoutShell'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mike Nizinski — Digital Product Designer',
  description: 'Portfolio of Mike Nizinski, UX/UI designer and creative hybrid.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // navLinks, footerLinks, and logoUrl will be fetched from Sanity in Phase 5.
  // LayoutShell uses built-in placeholder defaults until then.
  return (
    <html lang="en" className={openSans.variable}>
      <body className="font-sans">
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  )
}
