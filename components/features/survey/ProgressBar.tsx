import styles from './ProgressBar.module.css'
import { QUESTIONS, DIM_META } from '@/constants/questions'

interface ProgressBarProps {
  current: number
}

export function ProgressBar({ current }: ProgressBarProps) {
  const total = QUESTIONS.length
  const q = QUESTIONS[current]
  const dim = DIM_META[q.dim]
  const progress = Math.round(((current + 1) / total) * 100)

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.count}>{current + 1} / {total}</span>
        <span className={`${styles.tag} ${styles[q.dim]}`}>{dim.label}</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
