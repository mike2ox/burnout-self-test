'use client'

import { useEffect, useState } from 'react'
import styles from './GaugeBar.module.css'
import { GAUGE_SUB_TEXT } from '@/lib/utils/score'
import type { Dimension } from '@/types'

const DIM_LABEL: Record<Dimension, string> = {
  ex: '소진 (Exhaustion)',
  cy: '냉소 (Cynicism)',
  ef: '효능감 (Efficacy)',
}

interface GaugeBarProps {
  dim: Dimension
  score: number
}

export function GaugeBar({ dim, score }: GaugeBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(Math.round((score / 4) * 100))
    }, 80)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className={`${styles.item} ${styles[dim]}`}>
      <div className={styles.header}>
        <span className={styles.name}>{DIM_LABEL[dim]}</span>
        <span className={styles.value}>{score.toFixed(1)}</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${width}%` }} />
      </div>
      <div className={styles.sub}>{GAUGE_SUB_TEXT[dim](score)}</div>
    </div>
  )
}
