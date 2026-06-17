import styles from './StatusBanner.module.css'
import { STATUS_META } from '@/lib/utils/score'
import type { Status } from '@/types'

interface StatusBannerProps {
  status: Status
}

export function StatusBanner({ status }: StatusBannerProps) {
  const meta = STATUS_META[status]
  return (
    <div className={`${styles.banner} ${styles[status]}`}>
      <div className={styles.label}>{meta.label}</div>
      <div className={styles.title}>{meta.title}</div>
      <div className={styles.desc}>{meta.desc}</div>
    </div>
  )
}
