import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { StatusBanner } from '@/components/ui/StatusBanner'
import { ResultGauges } from '@/components/features/result/ResultGauges'
import { RemedyCards } from '@/components/features/result/RemedyCards'
import { Button } from '@/components/ui/Button'
import type { HistoryRecord } from '@/types'
import styles from './page.module.css'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params
  const sb = await createClient()
  const { data } = await sb.from('history').select('*').eq('id', id).single()

  if (!data) notFound()

  const record = data as HistoryRecord
  const d = new Date(record.created_at)
  const dateStr = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 측정`
  const showRemedies = record.status === 'burnout' || record.status === 'risk'

  return (
    <div className="wrap pageIn" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <p className={styles.date}>{dateStr}</p>

      <StatusBanner status={record.status} />

      <ResultGauges ex={record.ex_score} cy={record.cy_score} ef={record.ef_score} />

      <div className={styles.divider} />

      {showRemedies && (
        <>
          <RemedyCards />
          <div className={styles.divider} />
        </>
      )}

      <div className={styles.actions}>
        <Link href="/survey">
          <Button fullWidth>다시 측정하기</Button>
        </Link>
        <Link href="/dashboard/history">
          <Button variant="ghost">리포트 보기</Button>
        </Link>
      </div>

      <p className={styles.footnote}>
        이 도구는 Maslach, C., Jackson, S.E., &amp; Leiter, M.P.(1996)의{' '}
        <em>MBI-GS(Maslach Burnout Inventory — General Survey)</em>를 기반으로 합니다.
        0–4점 5점 척도를 사용하며, 소진·냉소는 높을수록 번아웃, 효능감은 낮을수록 번아웃을 나타냅니다.
        본 도구는 임상 진단 도구가 아니며 전문 상담을 대체하지 않습니다.
        번아웃 상태가 지속된다면 전문가 상담을 권장합니다.
      </p>
    </div>
  )
}
