import { TabNav } from '@/components/ui/TabNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabNav />
      <main className="wrap pageIn">{children}</main>
    </div>
  )
}
