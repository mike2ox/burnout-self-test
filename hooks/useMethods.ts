'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Method } from '@/types'
import { getMethods, addMethod, deleteMethod, bulkAddMethods } from '@/lib/api/methods'

export function useMethods() {
  const [methods, setMethods] = useState<Method[]>([])
  const [loading, setLoading] = useState(true)
  const [importMsg, setImportMsg] = useState<{ text: string; success: boolean } | null>(null)

  useEffect(() => {
    getMethods()
      .then(setMethods)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const add = useCallback(async (text: string) => {
    const method = await addMethod(text)
    setMethods((prev) => [...prev, method])
  }, [])

  const remove = useCallback(async (id: string) => {
    await deleteMethod(id)
    setMethods((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const importFromText = useCallback(
    async (text: string) => {
      const pattern = /^\d+\.\s+(.+)$/
      const existing = new Set(methods.map((m) => m.text.trim()))
      const newItems: { text: string }[] = []

      for (const line of text.split('\n')) {
        const match = line.trim().match(pattern)
        if (match) {
          const val = match[1].trim()
          if (!existing.has(val)) {
            newItems.push({ text: val })
            existing.add(val)
          }
        }
      }

      if (newItems.length === 0) {
        setImportMsg({ text: '새로 추가할 항목이 없습니다.', success: false })
        setTimeout(() => setImportMsg(null), 3000)
        return
      }

      const added = await bulkAddMethods(newItems)
      setMethods((prev) => [...prev, ...added])
      setImportMsg({ text: `${added.length}개 항목을 불러왔습니다.`, success: true })
      setTimeout(() => setImportMsg(null), 3000)
    },
    [methods],
  )

  const exportToFile = useCallback(() => {
    if (methods.length === 0) return

    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    let text = '나만의 번아웃 탈출 방법\n'
    text += `작성일: ${dateStr}\n`
    text += '━'.repeat(36) + '\n\n'
    methods.forEach((m, i) => {
      text += `${i + 1}.  ${m.text}\n`
    })
    text += '\n' + '━'.repeat(36) + '\n'
    text += '※ 번아웃 자가 측정 도구 (MBI-GS 기반) 에서 내보낸 기록입니다.\n'
    text += '※ 근거 없이 이 파일의 정보를 임상 판단에 사용하지 마세요.\n'

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `나만의_번아웃_탈출방법_${dateStr}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [methods])

  return { methods, loading, importMsg, add, remove, importFromText, exportToFile }
}
