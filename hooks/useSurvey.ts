'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/constants/questions'
import { computeScores } from '@/lib/utils/score'
import { saveHistory } from '@/lib/api/history'

type Step = 'intro' | 'questions' | 'submitting'

export function useSurvey() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('intro')
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null))
  const [current, setCurrent] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const startSurvey = useCallback(() => {
    setAnswers(new Array(QUESTIONS.length).fill(null))
    setCurrent(0)
    setError(null)
    setStep('questions')
  }, [])

  const selectAnswer = useCallback((val: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[current] = val
      return next
    })
  }, [current])

  const prevQuestion = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1)
  }, [current])

  const nextQuestion = useCallback(async () => {
    if (answers[current] === null) return

    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1)
      return
    }

    // 마지막 문항 → 제출
    setStep('submitting')
    try {
      const filledAnswers = answers as number[]
      const { ex, cy, ef, status } = computeScores(filledAnswers)
      const record = await saveHistory(ex, cy, ef, status)
      router.push(`/result/${record.id}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : '저장 중 오류가 발생했습니다.')
      setStep('questions')
    }
  }, [answers, current, router])

  const currentAnswer = answers[current]
  const progress = Math.round(((current + 1) / QUESTIONS.length) * 100)
  const isFirst = current === 0
  const isLast = current === QUESTIONS.length - 1

  return {
    step,
    current,
    answers,
    currentAnswer,
    progress,
    isFirst,
    isLast,
    error,
    startSurvey,
    selectAnswer,
    prevQuestion,
    nextQuestion,
  }
}
