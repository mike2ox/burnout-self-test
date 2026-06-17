'use client'

import { useMethods } from '@/hooks/useMethods'
import { MethodList } from '@/components/features/methods/MethodList'
import { MethodForm } from '@/components/features/methods/MethodForm'
import styles from './page.module.css'

export default function MethodsPage() {
  const { methods, loading, importMsg, add, remove, importFromText, exportToFile } = useMethods()

  if (loading) {
    return <div className={styles.loading}>불러오는 중…</div>
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      <div className={styles.secHeader}>
        <h2 className={styles.secTitle}>나만의 탈출 방법</h2>
        <span className={styles.secBadge}>{methods.length}개</span>
      </div>

      <div className={styles.box}>
        <p className={styles.intro}>
          본인에게 효과가 있었던 방법을 기록해두세요.
          기존 <code>.txt</code> 파일에서 불러오거나, 아래 "파일로 저장"으로 내보낼 수 있습니다.
        </p>

        <MethodList methods={methods} onDelete={remove} />

        <MethodForm
          onAdd={add}
          onImport={importFromText}
          onExport={exportToFile}
          importMsg={importMsg}
        />
      </div>
    </div>
  )
}
