import { createClient } from '@/lib/supabase/server'
import { HistoryList } from '@/components/features/history/HistoryList'
import type { HistoryRecord } from '@/types'

export default async function HistoryPage() {
  const sb = await createClient()
  const { data } = await sb
    .from('history')
    .select('*')
    .order('created_at', { ascending: false })

  const records: HistoryRecord[] = data ?? []

  return (
    <div style={{ paddingBottom: 80 }}>
      <HistoryList initialRecords={records} />
    </div>
  )
}
