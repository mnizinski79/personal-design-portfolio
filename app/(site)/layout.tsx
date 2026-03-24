import LayoutShell from '@/components/layout/LayoutShell'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <LayoutShell>{children}</LayoutShell>
}
