'use client'

import { useState, useRef } from 'react'
import styles from './MethodForm.module.css'

interface MethodFormProps {
  onAdd: (text: string) => Promise<void>
  onImport: (text: string) => Promise<void>
  onExport: () => void
  importMsg: { text: string; success: boolean } | null
}

export function MethodForm({ onAdd, onImport, onExport, importMsg }: MethodFormProps) {
  const [value, setValue] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleAdd = async () => {
    const trimmed = value.trim()
    if (!trimmed) return
    await onAdd(trimmed)
    setValue('')
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    await onImport(text)
    e.target.value = ''
  }

  return (
    <div>
      <button className={styles.importBtn} onClick={() => fileRef.current?.click()}>
        ↑ 기존 .txt 파일에서 불러오기
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".txt"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {importMsg && (
        <div className={`${styles.importMsg} ${importMsg.success ? styles.success : ''}`}>
          {importMsg.success ? '✓ ' : ''}{importMsg.text}
        </div>
      )}

      <div className={styles.inputRow}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="예: 주 2회 저녁 달리기 30분"
          maxLength={80}
        />
        <button onClick={handleAdd}>+ 추가</button>
      </div>

      <button className={styles.exportBtn} onClick={onExport}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        텍스트 파일로 저장하기
      </button>
    </div>
  )
}
