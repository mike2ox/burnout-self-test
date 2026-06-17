import type { Method } from '@/types'
import { createClient } from '@/lib/supabase/client'

export async function getMethods(): Promise<Method[]> {
  const sb = createClient()
  const { data, error } = await sb.from('methods').select('*').order('created_at')
  if (error) throw error
  return data ?? []
}

export async function addMethod(text: string): Promise<Method> {
  const sb = createClient()
  const { data, error } = await sb.from('methods').insert({ text }).select().single()
  if (error) throw error
  return data
}

export async function deleteMethod(id: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb.from('methods').delete().eq('id', id)
  if (error) throw error
}

export async function bulkAddMethods(items: { text: string }[]): Promise<Method[]> {
  const sb = createClient()
  const { data, error } = await sb.from('methods').insert(items).select()
  if (error) throw error
  return data ?? []
}
