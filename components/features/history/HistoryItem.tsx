import styles from './HistoryItem.module.css'
import type { HistoryRecord } from '@/types'

interface HistoryItemProps {
  record: HistoryRecord
  onDelete: (id: string) => void
}

const STATUS_LABEL = { safe: '양호', risk: '경계', burnout: '번아웃' }

export function HistoryItem({ record, onDelete }: HistoryItemProps) {
  const d = new Date(record.created_at)
  const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`

  return (
    <div className={styles.item}>
      <span className={styles.date}>{dateStr}</span>
      <div className={styles.scores}>
        <span className={styles.score}>소진 <b>{record.ex_score}</b></span>
        <span className={styles.score}>냉소 <b>{record.cy_score}</b></span>
        <span className={styles.score}>효능감 <b>{record.ef_score}</b></span>
      </div>
      <span className={`${styles.chip} ${styles[record.status]}`}>
        {STATUS_LABEL[record.status]}
      </span>
      <button
        className={styles.del}
        onClick={() => onDelete(record.id)}
        aria-label="삭제"
      >
        ×
      </button>
    </div>
  )
}
