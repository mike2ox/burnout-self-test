import type { HistoryRecord, Status } from '@/types'
import { createClient } from '@/lib/supabase/client'

export async function getHistory(): Promise<HistoryRecord[]> {
  const sb = createClient()
  const { data, error } = await sb
    .from('history')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function saveHistory(
  ex: number,
  cy: number,
  ef: number,
  status: Status,
): Promise<HistoryRecord> {
  const sb = createClient()
  const { data, error } = await sb
    .from('history')
    .insert({
      ex_score: parseFloat(ex.toFixed(2)),
      cy_score: parseFloat(cy.toFixed(2)),
      ef_score: parseFloat(ef.toFixed(2)),
      status,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteHistory(id: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb.from('history').delete().eq('id', id)
  if (error) throw error
}

export async function clearAllHistory(): Promise<void> {
  const sb = createClient()
  const { error } = await sb
    .from('history')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')
  if (error) throw error
}

export async function getHistoryById(id: string): Promise<HistoryRecord | null> {
  const sb = createClient()
  const { data, error } = await sb.from('history').select('*').eq('id', id).single()
  if (error) return null
  return data
}
