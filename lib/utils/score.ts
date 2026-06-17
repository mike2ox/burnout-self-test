import type { ScoreResult, Status } from '@/types'
import { QUESTIONS } from '@/constants/questions'

export function avg(answers: number[], indices: number[]): number {
  return indices.reduce((s, i) => s + answers[i], 0) / indices.length
}

export function classifyStatus(ex: number, cy: number, ef: number): Status {
  const burnout = (ex >= 3.0 && cy >= 2.0) || ex >= 3.5
  const risk = !burnout && (ex >= 2.0 || cy >= 1.5 || ef <= 1.5)
  return burnout ? 'burnout' : risk ? 'risk' : 'safe'
}

export function computeScores(answers: number[]): ScoreResult {
  const exIdx = QUESTIONS.map((q, i) => (q.dim === 'ex' ? i : -1)).filter((i) => i >= 0)
  const cyIdx = QUESTIONS.map((q, i) => (q.dim === 'cy' ? i : -1)).filter((i) => i >= 0)
  const efIdx = QUESTIONS.map((q, i) => (q.dim === 'ef' ? i : -1)).filter((i) => i >= 0)

  const ex = avg(answers, exIdx)
  const cy = avg(answers, cyIdx)
  const ef = avg(answers, efIdx)

  return { ex, cy, ef, status: classifyStatus(ex, cy, ef) }
}

export const STATUS_META: Record<Status, { label: string; title: string; desc: string; cls: string }> = {
  safe: {
    label: '현재 양호',
    title: '번아웃 징후가 뚜렷하지 않습니다',
    desc: '소진과 냉소가 낮은 수준이며 효능감이 유지되고 있습니다. 현재의 패턴을 유지하고, 2–4주 간격으로 정기 점검하세요.',
    cls: 'status-safe',
  },
  risk: {
    label: '경계 단계',
    title: '번아웃 위험 신호가 감지됩니다',
    desc: '아직 본격적인 번아웃은 아니지만, 소진이나 냉소 지표가 주의 수준에 있습니다. 지금 예방적으로 관리하는 것이 중요합니다.',
    cls: 'status-risk',
  },
  burnout: {
    label: '주의 필요',
    title: '번아웃 상태가 의심됩니다',
    desc: '소진과 냉소가 높은 수준입니다. 지금 당장 의도적인 회복 조치가 필요합니다. 아래 근거 기반 방법들을 참고하고, 증상이 지속된다면 전문가 상담을 권장합니다.',
    cls: 'status-burnout',
  },
}

export const GAUGE_SUB_TEXT = {
  ex: (score: number) =>
    score >= 3.0 ? '높음 — 에너지 고갈 징후' : score >= 2.0 ? '보통 — 관찰 필요' : '낮음 — 양호',
  cy: (score: number) =>
    score >= 2.0 ? '높음 — 심리적 거리감 커짐' : score >= 1.5 ? '보통 — 관찰 필요' : '낮음 — 양호',
  ef: (score: number) =>
    score <= 1.5 ? '낮음 — 효능감 저하 주의' : score <= 2.5 ? '보통 — 관찰 필요' : '높음 — 양호',
}
