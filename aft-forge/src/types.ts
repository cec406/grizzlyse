export type Sex = 'male' | 'female'
export type Standard = 'general' | 'combat'
export type Tab =
  | 'command'
  | 'plan'
  | 'log'
  | 'aft'
  | 'run'
  | 'body'
  | 'armory'
  | 'intel'
  | 'calc'

export type EventKey = 'mdl' | 'hrp' | 'sdc' | 'plk' | 'run'
export type RunKey = 'sdc' | 'plk' | 'run'

export interface Scores {
  /** Three-repetition max deadlift in pounds. */
  mdl: number
  /** Hand-release push-up repetitions. */
  hrp: number
  /** Sprint-drag-carry in seconds. */
  sdc: number
  /** Plank hold in seconds. */
  plk: number
  /** Two-mile run in seconds. */
  run: number
}

export interface Profile {
  name: string
  /** Blank (null) until entered — grading requires it, but nothing is assumed. */
  age: number | null
  sex: Sex
  /** Blank (null) means "not entered yet"; empty fields stay empty everywhere. */
  heightIn: number | null
  weightLb: number | null
  waistIn: number | null
  goalWeightLb: number | null
  goalWaistIn: number | null
  mos: string
  standard: Standard
  startDate: string
  /** Empty string = rolling readiness mode (no test date scheduled). */
  testDate: string
  /** Weekday indices (0 = Sunday … 6 = Saturday) treated as housework/rest days. */
  restDays: number[]
  trainingDays: number
  sessionMinutes: number
  maxHr: number | null
  restingHr: number | null
  garminOverlay: boolean
  /** When false, the plan swaps every sled-based SDC drill for a no-sled substitute. */
  sledAccess: boolean
  scores: Scores
}

export interface BodyEntry {
  date: string
  weightLb: number
  waistIn?: number
}

export interface CheckIn {
  date: string
  sleep: number
  soreness: number
  stress: number
  hrv?: number
  readiness: number
}

/** One exercise logged with the load used, inside a session. */
export interface LiftEntry {
  name: string
  weightLb: number
}

/** Weights recorded for one completed session. */
export interface WorkoutLog {
  /** `${dayId}#${date}` — re-completing the same day replaces the log. */
  id: string
  date: string
  dayId: string
  title: string
  entries: LiftEntry[]
}

export interface LogState {
  completed: Record<string, boolean>
  body: BodyEntry[]
  checkins: CheckIn[]
  workouts: WorkoutLog[]
}

export interface ExerciseBlockItem {
  name: string
  prescription: string
  cue?: string
}

export interface ExerciseBlock {
  label: string
  items: ExerciseBlockItem[]
}

export type SessionType = 'strength' | 'run' | 'aft' | 'recovery' | 'test'

export interface DayPlan {
  id: string
  date: string
  weekday: string
  dayIndex: number
  title: string
  type: SessionType
  durationMin: number
  intent: string
  focus: string[]
  blocks: ExerciseBlock[]
  minimum: string
  coachNote: string
}

export type Phase = 'FOUNDATION' | 'BUILD' | 'PEAK' | 'SHARPEN' | 'TEST'

export interface WeekPlan {
  number: number
  /** 4-week progression cycle this week belongs to (1-based). */
  cycle: number
  phase: Phase
  theme: string
  focus: string
  startDate: string
  endDate: string
  days: DayPlan[]
}

export interface ScoreResult {
  event: EventKey
  score: number
  threshold: number | null
  nextScore: number | null
  nextThreshold: number | null
}

export interface AftResult {
  eventScores: Record<EventKey, ScoreResult>
  total: number
  passed: boolean
  minimumMet: boolean
  lowest: number
  targetTotal: number
}

export interface Exercise {
  id: string
  name: string
  category: 'Run' | 'HRP' | 'SDC' | 'Plank' | 'Deadlift' | 'Strength' | 'Recovery'
  equipment: string
  prescription: string
  why: string
  cue: string
}

export interface Source {
  id: string
  title: string
  publisher: string
  year: string
  url: string
  note: string
  tag: 'Official' | 'Research' | 'Field manual'
}
