import { REMEDIES } from '@/constants/remedies'
import styles from './RemedyCards.module.css'

export function RemedyCards() {
  return (
    <div>
      <div className={styles.secHeader}>
        <h2 className={styles.secTitle}>근거 기반 회복 방법</h2>
        <span className={styles.secBadge}>메타분석·RCT 지지</span>
      </div>
      <div className={styles.list}>
        {REMEDIES.map((r, i) => (
          <div key={i} className={styles.card}>
            <span className={styles.badge}>{r.badge}</span>
            <h3 className={styles.title}>{r.title}</h3>
            <p className={styles.desc}>{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
