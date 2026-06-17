export type Dimension = 'ex' | 'cy' | 'ef'
export type Status = 'safe' | 'risk' | 'burnout'

export interface Question {
  dim: Dimension
  text: string
}

export interface ScaleOption {
  val: number
  label: string
}

export interface Remedy {
  badge: string
  title: string
  desc: string
}

export interface HistoryRecord {
  id: string
  user_id: string
  ex_score: number
  cy_score: number
  ef_score: number
  status: Status
  created_at: string
}

export interface Method {
  id: string
  user_id: string
  text: string
  created_at: string
}

export interface ScoreResult {
  ex: number
  cy: number
  ef: number
  status: Status
}
