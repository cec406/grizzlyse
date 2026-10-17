import rawTables from '../data/aftTables.json'
import type {
  AftResult,
  EventKey,
  Profile,
  ScoreResult,
  Scores,
  Sex,
  Standard,
} from '../types'

type TableRow = [number, string]
type EventTable = Record<string, { male: TableRow[]; female: TableRow[] }>
type Tables = Record<EventKey, EventTable>

const tables = rawTables as unknown as Tables

export const EVENT_META: Record<
  EventKey,
  {
    label: string
    short: string
    unit: string
    lowerIsBetter: boolean
    icon: string
    description: string
  }
> = {
  mdl: {
    label: '3-Rep Max Deadlift',
    short: 'MDL',
    unit: 'lb',
    lowerIsBetter: false,
    icon: 'deadlift',
    description: 'Max load for three controlled reps with the hex bar.',
  },
  hrp: {
    label: 'Hand-Release Push-Up',
    short: 'HRP',
    unit: 'reps',
    lowerIsBetter: false,
    icon: 'pushup',
    description: 'Max correct reps in two minutes. Chest and thighs touch, hands leave the deck.',
  },
  sdc: {
    label: 'Sprint-Drag-Carry',
    short: 'SDC',
    unit: 'time',
    lowerIsBetter: true,
    icon: 'sled',
    description: 'Five 50 m shuttles: sprint, drag, lateral, carry, sprint.',
  },
  plk: {
    label: 'Plank',
    short: 'PLK',
    unit: 'time',
    lowerIsBetter: false,
    icon: 'plank',
    description: 'Max hold with a straight line from head to heels.',
  },
  run: {
    label: 'Two-Mile Run',
    short: '2MR',
    unit: 'time',
    lowerIsBetter: true,
    icon: 'run',
    description: 'Two miles on a measured, generally flat course.',
  },
}

export const EVENT_KEYS: EventKey[] = ['mdl', 'hrp', 'sdc', 'plk', 'run']

export const AGE_GROUPS = [
  '17-21',
  '22-26',
  '27-31',
  '32-36',
  '37-41',
  '42-46',
  '47-51',
  '52-56',
  '57-61',
  '62+',
]

export function ageGroup(age: number): string {
  if (age <= 21) return '17-21'
  if (age <= 26) return '22-26'
  if (age <= 31) return '27-31'
  if (age <= 36) return '32-36'
  if (age <= 41) return '37-41'
  if (age <= 46) return '42-46'
  if (age <= 51) return '47-51'
  if (age <= 56) return '52-56'
  if (age <= 61) return '57-61'
  return '62+'
}

export function timeToSeconds(value: string): number {
  const parts = value.split(':').map(Number)
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  return Number(value) || 0
}

export function secondsToTime(total: number): string {
  const safe = Math.max(0, Math.round(total))
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function formatEventValue(event: EventKey, value: number): string {
  if (event === 'mdl') return `${Math.round(value)} lb`
  if (event === 'hrp') return `${Math.round(value)} reps`
  return secondsToTime(value)
}

export function formatEventValueShort(event: EventKey, value: number): string {
  if (event === 'mdl') return `${Math.round(value)}`
  if (event === 'hrp') return `${Math.round(value)}`
  return secondsToTime(value)
}

export function formatThreshold(event: EventKey, value: string): string {
  if (event === 'mdl') return `${value} lb`
  if (event === 'hrp') return `${value}`
  return value
}

function rowsFor(event: EventKey, profile: Profile, standard: Standard): TableRow[] {
  const group = ageGroup(profile.age)
  const table = tables[event]?.[group]
  if (!table) return []
  const sex: Sex = standard === 'combat' ? 'male' : profile.sex
  return table[sex] ?? []
}

function meets(event: EventKey, value: number, threshold: string): boolean {
  const parsed = EVENT_META[event].unit === 'time' ? timeToSeconds(threshold) : Number(threshold)
  if (Number.isNaN(parsed)) return false
  return EVENT_META[event].lowerIsBetter ? value <= parsed : value >= parsed
}

export function scoreEvent(
  event: EventKey,
  value: number,
  profile: Profile,
  standard: Standard,
): ScoreResult {
  const rows = rowsFor(event, profile, standard)
  const achieved = rows.find(([, threshold]) => meets(event, value, threshold))
  const next = achieved
    ? rows.find(([points]) => points === achieved[0] + 1)
    : rows.find(([points]) => points === 100)
  return {
    event,
    score: achieved?.[0] ?? 0,
    threshold: achieved ? Number(EVENT_META[event].unit === 'time' ? timeToSeconds(achieved[1]) : achieved[1]) : null,
    nextScore: next?.[0] ?? null,
    nextThreshold: next
      ? Number(EVENT_META[event].unit === 'time' ? timeToSeconds(next[1]) : next[1])
      : null,
  }
}

export function computeAft(scores: Scores, profile: Profile, standard: Standard): AftResult {
  const eventScores = Object.fromEntries(
    EVENT_KEYS.map((event) => [event, scoreEvent(event, scores[event], profile, standard)]),
  ) as Record<EventKey, ScoreResult>
  const total = EVENT_KEYS.reduce((sum, event) => sum + eventScores[event].score, 0)
  const lowest = Math.min(...EVENT_KEYS.map((event) => eventScores[event].score))
  const minimumMet = EVENT_KEYS.every((event) => eventScores[event].score >= 60)
  const targetTotal = standard === 'combat' ? 350 : 300
  return {
    eventScores,
    total,
    passed: minimumMet && total >= targetTotal,
    minimumMet,
    lowest,
    targetTotal,
  }
}

export function thresholdForPoints(
  event: EventKey,
  points: number,
  profile: Profile,
  standard: Standard,
): string | null {
  const rows = rowsFor(event, profile, standard)
  const exact = rows.find(([p]) => p === points)
  if (exact) return exact[1]
  // Some strength rows skip a point value (e.g., MDL has no exact 90 row).
  // Use the next harder point so a "90-point target" never silently becomes zero.
  const harder = rows
    .filter(([p]) => p > points)
    .sort((a, b) => a[0] - b[0])[0]
  if (harder) return harder[1]
  const easier = rows
    .filter(([p]) => p < points)
    .sort((a, b) => b[0] - a[0])[0]
  return easier?.[1] ?? null
}

export function scoreThresholds(
  event: EventKey,
  profile: Profile,
  standard: Standard,
  points: number[] = [60, 70, 80, 90, 100],
): Array<{ points: number; value: string | null }> {
  return points.map((point) => ({
    points: point,
    value: thresholdForPoints(event, point, profile, standard),
  }))
}

export function maxWaist(heightIn: number): number {
  return Math.round(heightIn * 0.55 * 10) / 10
}

export function waistToHeight(waistIn: number, heightIn: number): number {
  if (!heightIn) return 0
  return waistIn / heightIn
}

export function whtrStatus(ratio: number): 'pass' | 'borderline' | 'fail' {
  if (ratio < 0.53) return 'pass'
  if (ratio < 0.55) return 'borderline'
  return 'fail'
}

export function projectedScoreAtWeight(
  scores: Scores,
  profile: Profile,
  targetWeight: number,
  standard: Standard,
): AftResult {
  // Weight loss does not directly increase non-run events; only the run is modeled.
  const projected: Scores = {
    ...scores,
    run: estimateRunAtWeight(scores.run, profile.weightLb, targetWeight),
  }
  return computeAft(projected, profile, standard)
}

export function estimateRunAtWeight(
  currentSeconds: number,
  currentWeight: number,
  targetWeight: number,
): number {
  if (!currentSeconds || !currentWeight || !targetWeight) return currentSeconds
  const minutes = currentSeconds / 60
  const velocity = 3218.688 / minutes // meters per minute for two miles
  const relativeVo2 = -4.6 + 0.182258 * velocity + 0.000104 * velocity * velocity
  const absoluteVo2 = (relativeVo2 * currentWeight) / 2.20462
  const targetRelative = (absoluteVo2 * 2.20462) / targetWeight
  const a = 0.000104
  const b = 0.182258
  const c = -(4.6 + targetRelative)
  const projectedVelocity = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)
  return Math.round((3218.688 / projectedVelocity) * 60)
}
