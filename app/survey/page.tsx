'use client'

import { useEffect } from 'react'
import { useSurvey } from '@/hooks/useSurvey'
import { SurveyIntro } from '@/components/features/survey/SurveyIntro'
import { ProgressBar } from '@/components/features/survey/ProgressBar'
import { QuestionCard } from '@/components/features/survey/QuestionCard'
import styles from './page.module.css'

export default function SurveyPage() {
  const {
    step,
    current,
    currentAnswer,
    isFirst,
    isLast,
    error,
    startSurvey,
    selectAnswer,
    prevQuestion,
    nextQuestion,
  } = useSurvey()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (step !== 'questions') return

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentAnswer !== null) nextQuestion()
      }
      if (e.key === 'ArrowLeft') {
        if (!isFirst) prevQuestion()
      }
      const num = parseInt(e.key)
      if (!isNaN(num) && num >= 0 && num <= 4) {
        selectAnswer(num)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [step, currentAnswer, isFirst, nextQuestion, prevQuestion, selectAnswer])

  if (step === 'intro') {
    return (
      <div className="wrap pageIn">
        <SurveyIntro onStart={startSurvey} />
      </div>
    )
  }

  if (step === 'submitting') {
    return (
      <div className="wrap">
        <div className={styles.submitting}>결과를 저장하는 중…</div>
      </div>
    )
  }

  return (
    <div className="wrap pageIn" style={{ paddingTop: 40, paddingBottom: 80 }}>
      {error && <p className={styles.error}>{error}</p>}
      <ProgressBar current={current} />
      <QuestionCard
        current={current}
        currentAnswer={currentAnswer}
        isFirst={isFirst}
        isLast={isLast}
        onSelect={selectAnswer}
        onPrev={prevQuestion}
        onNext={nextQuestion}
      />
    </div>
  )
}
