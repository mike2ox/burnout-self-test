'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HistoryItem } from './HistoryItem'
import { Button } from '@/components/ui/Button'
import { deleteHistory, clearAllHistory } from '@/lib/api/history'
import type { HistoryRecord } from '@/types'
import styles from './HistoryList.module.css'

interface HistoryListProps {
  initialRecords: HistoryRecord[]
}

export function HistoryList({ initialRecords }: HistoryListProps) {
  const [records, setRecords] = useState(initialRecords)

  const handleDelete = async (id: string) => {
    await deleteHistory(id)
    setRecords((prev) => prev.filter((r) => r.id !== id))
  }

  const handleClearAll = async () => {
    if (!confirm('모든 측정 기록을 삭제하시겠습니까?')) return
    await clearAllHistory()
    setRecords([])
  }

  if (records.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>아직 측정 기록이 없습니다.</p>
        <Link href="/survey">
          <Button>첫 번아웃 체크 시작하기 →</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.secHeader}>
          <h2 className={styles.secTitle}>측정 기록</h2>
          <span className={styles.secBadge}>{records.length}회</span>
        </div>
        <Link href="/survey">
          <Button>+ 새 측정 시작</Button>
        </Link>
      </div>

      <div>
        {records.map((r) => (
          <HistoryItem key={r.id} record={r} onDelete={handleDelete} />
        ))}
      </div>

      <Button variant="ghost" fullWidth onClick={handleClearAll} style={{ marginTop: '8px' }}>
        전체 기록 삭제
      </Button>
    </div>
  )
}
