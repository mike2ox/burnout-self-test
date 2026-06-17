import styles from './MethodList.module.css'
import type { Method } from '@/types'

interface MethodListProps {
  methods: Method[]
  onDelete: (id: string) => void
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function MethodList({ methods, onDelete }: MethodListProps) {
  if (methods.length === 0) {
    return <p className={styles.empty}>아직 기록된 방법이 없습니다.</p>
  }

  return (
    <div className={styles.list}>
      {methods.map((m) => (
        <div key={m.id} className={styles.item}>
          <span className={styles.dot} />
          <span className={styles.text}>{escapeHtml(m.text)}</span>
          <button
            className={styles.del}
            onClick={() => onDelete(m.id)}
            aria-label="삭제"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
