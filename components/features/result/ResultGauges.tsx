import { GaugeBar } from '@/components/ui/GaugeBar'
import styles from './ResultGauges.module.css'

interface ResultGaugesProps {
  ex: number
  cy: number
  ef: number
}

export function ResultGauges({ ex, cy, ef }: ResultGaugesProps) {
  return (
    <div className={styles.section}>
      <div className={styles.label}>차원별 점수 · 0–4점 척도</div>
      <GaugeBar dim="ex" score={ex} />
      <GaugeBar dim="cy" score={cy} />
      <GaugeBar dim="ef" score={ef} />
    </div>
  )
}
