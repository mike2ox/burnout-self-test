import Link from 'next/link'
import { LogoutButton } from './LogoutButton'
import styles from './Nav.module.css'

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className="wrap">
        <Link href="/" className={styles.logo}>번아웃 체크</Link>
        <span className={styles.badge}>MBI-GS · WHO ICD-11</span>
        <LogoutButton />
      </div>
    </nav>
  )
}
