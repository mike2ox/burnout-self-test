'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './TabNav.module.css'

const TABS = [
  { href: '/dashboard/history', label: '번아웃 리포트' },
  { href: '/dashboard/methods', label: '나만의 탈출 방법' },
]

export function TabNav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.tab} ${pathname === tab.href ? styles.active : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
