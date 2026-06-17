import styles from './QuestionCard.module.css'
import { QUESTIONS } from '@/constants/questions'
import { SCALE } from '@/constants/scale'
import { Button } from '@/components/ui/Button'

interface QuestionCardProps {
  current: number
  currentAnswer: number | null
  isFirst: boolean
  isLast: boolean
  onSelect: (val: number) => void
  onPrev: () => void
  onNext: () => void
}

export function QuestionCard({
  current,
  currentAnswer,
  isFirst,
  isLast,
  onSelect,
  onPrev,
  onNext,
}: QuestionCardProps) {
  const q = QUESTIONS[current]

  return (
    <div className={styles.block}>
      <div className={styles.num}>문항 {String(current + 1).padStart(2, '0')}</div>
      <div className={styles.text}>{q.text}</div>

      <div className={styles.scaleList}>
        {SCALE.map((s) => (
          <div
            key={s.val}
            className={`${styles.opt} ${currentAnswer === s.val ? styles.selected : ''}`}
            onClick={() => onSelect(s.val)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(s.val)}
          >
            <span className={styles.optNum}>{s.val}</span>
            <span className={styles.optLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.navBtns}>
        {!isFirst && (
          <Button variant="ghost" onClick={onPrev}>← 이전</Button>
        )}
        <Button
          fullWidth
          onClick={onNext}
          disabled={currentAnswer === null}
          style={{ borderRadius: 'var(--r)' }}
        >
          {isLast ? '결과 보기 →' : '다음 →'}
        </Button>
      </div>
    </div>
  )
}
