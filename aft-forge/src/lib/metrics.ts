import type { Profile } from '../types'
import { clamp } from './date'

export function formatPace(secondsPerMile: number): string {
  const safe = Math.max(0, Math.round(secondsPerMile))
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function formatPaceRange(fast: number, slow: number): string {
  return `${formatPace(fast)}–${formatPace(slow)} /mi`
}

export function twoMilePace(seconds: number): number {
  return seconds / 2
}

export function estimateVdot(seconds: number): number {
  if (!seconds) return 0
  const minutes = seconds / 60
  const velocity = 3218.688 / minutes
  return -4.6 + 0.182258 * velocity + 0.000104 * velocity * velocity
}

/** Render a metric that may not be entered yet as "—" instead of a defaulted number. */
export function orDash(value: number | null | undefined, format?: (n: number) => string): string {
  if (value == null || !Number.isFinite(value) || value <= 0) return '—'
  return format ? format(value) : String(Math.round(value))
}

export interface PaceZone {
  name: string
  short: string
  fast: number
  slow: number
  hr: string
  purpose: string
}

export function paceZones(currentRunSeconds: number, maxHr: number | null): PaceZone[] {
  const racePace = twoMilePace(currentRunSeconds > 0 ? currentRunSeconds : 960)
  const hr = (low: number, high: number): string =>
    maxHr ? `${Math.round(maxHr * low)}–${Math.round(maxHr * high)} bpm` : '—'
  return [
    {
      name: 'Recovery',
      short: 'Z1',
      fast: racePace * 1.28,
      slow: racePace * 1.4,
      hr: hr(0.5, 0.6),
      purpose: 'Flush the legs. Nose-breathing easy. Never turns into a workout.',
    },
    {
      name: 'Aerobic base',
      short: 'Z2',
      fast: racePace * 1.16,
      slow: racePace * 1.3,
      hr: hr(0.6, 0.72),
      purpose: 'Builds capillaries and fat oxidation. This is the engine that drops your 2-mile time.',
    },
    {
      name: 'Threshold',
      short: 'Z3/Z4',
      fast: racePace * 1.03,
      slow: racePace * 1.08,
      hr: hr(0.78, 0.87),
      purpose: 'Comfortably hard. 4–6 minute repeats. Improves the pace you can hold without redlining.',
    },
    {
      name: 'Interval',
      short: 'Z5',
      fast: racePace * 0.94,
      slow: racePace * 1.0,
      hr: hr(0.88, 0.94),
      purpose: '800 m repeats at or slightly faster than goal 2-mile pace. Short, controlled, full recovery.',
    },
    {
      name: 'Repetition',
      short: 'Z5+',
      fast: racePace * 0.88,
      slow: racePace * 0.94,
      hr: maxHr ? `${Math.round(maxHr * 0.93)}+ bpm` : '—',
      purpose: '200–400 m fast strides. Neuromuscular sharpening. Never grind.',
    },
  ]
}

export interface HrZone {
  zone: string
  name: string
  low: number | null
  high: number | null
  use: string
}

export function hrZones(maxHr: number | null): HrZone[] {
  const zone = (low: number, high: number): { low: number | null; high: number | null } =>
    maxHr ? { low: Math.round(maxHr * low), high: Math.round(maxHr * high) } : { low: null, high: null }
  return [
    { zone: 'Z1', name: 'Recovery', ...zone(0.5, 0.6), use: 'Walk, mobility, recovery' },
    { zone: 'Z2', name: 'Aerobic base', ...zone(0.6, 0.72), use: 'Easy runs, long run' },
    { zone: 'Z3', name: 'Tempo', ...zone(0.72, 0.82), use: 'Steady threshold work' },
    { zone: 'Z4', name: 'Threshold', ...zone(0.82, 0.9), use: '4–6 min repeats' },
    { zone: 'Z5', name: 'VO2 / race', ...zone(0.9, 1), use: '800 m repeats, test day' },
  ]
}

export function readinessScore(sleep: number, soreness: number, stress: number): number {
  // 1–5 scales. Sleep is the strongest input; soreness and stress are inverted.
  const sleepPart = (clamp(sleep, 1, 5) / 5) * 45
  const sorenessPart = ((6 - clamp(soreness, 1, 5)) / 5) * 30
  const stressPart = ((6 - clamp(stress, 1, 5)) / 5) * 25
  return Math.round(sleepPart + sorenessPart + stressPart)
}

export function readinessBand(score: number): {
  label: string
  tone: 'good' | 'warn' | 'bad'
  order: string
} {
  if (score >= 78) {
    return {
      label: 'GREEN / FULL SESSION',
      tone: 'good',
      order: 'Run the session as written. Add load only if technique is clean.',
    }
  }
  if (score >= 58) {
    return {
      label: 'AMBER / CONTROL',
      tone: 'warn',
      order: 'Keep the main set; cut 1 round or 10 minutes.',
    }
  }
  return {
    label: 'RED / RECOVER',
    tone: 'bad',
    order: 'Swap intervals for 30 min Zone 2 + mobility. Protect the next 72 hours.',
  }
}

export interface CaloriePlan {
  bmr: number
  tdee: number
  calories: number
  protein: number
  carbs: number
  fat: number
  deficit: number
  rateLbPerWeek: number
  weeklyLoss: number
  weeksToGoal: number
  /** False when age/weight/height are not entered yet — nothing is estimated or assumed. */
  ready: boolean
}

export function caloriePlan(profile: Profile): CaloriePlan {
  const weightLb = profile.weightLb ?? 0
  const heightIn = profile.heightIn ?? 0
  const age = profile.age ?? 0
  const ready = weightLb > 0 && heightIn > 0 && age >= 17 && age <= 100
  const weightKg = weightLb / 2.20462
  const heightCm = heightIn * 2.54
  const bmr = ready ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5 : 0
  const activity = profile.trainingDays >= 5 ? 1.55 : profile.trainingDays >= 3 ? 1.45 : 1.35
  const tdee = Math.round(bmr * (ready ? activity : 0))
  // Moderate deficit: never more than ~20% of TDEE, and never drive a small
  // Soldier below a safe floor. A flat −550 kcal is unsafe for lighter Soldiers.
  const deficit = ready ? Math.min(550, Math.round(tdee * 0.2)) : 0
  const floor = ready ? (profile.sex === 'female' ? 1400 : 1600) : 0
  const calories = ready ? Math.max(floor, Math.round(tdee - deficit)) : 0
  // Protein at ~1.8 g/kg without the old 150 g floor (wrong for smaller Soldiers).
  const protein = ready ? Math.max(90, Math.round(weightKg * 1.8)) : 0
  const fat = ready ? Math.round((calories * 0.25) / 9) : 0
  const carbs = ready ? Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4)) : 0
  const weeklyLoss = ready ? (tdee - calories) * 7 / 3500 : 0
  const toLose = Math.max(0, weightLb - (profile.goalWeightLb ?? 0))
  return {
    bmr: Math.round(bmr),
    tdee,
    calories,
    protein,
    carbs,
    fat,
    deficit: tdee - calories,
    rateLbPerWeek: Math.round(weeklyLoss * 10) / 10,
    weeklyLoss: Math.round(weeklyLoss * 100) / 100,
    weeksToGoal: weeklyLoss > 0 ? Math.ceil(toLose / weeklyLoss) : 0,
    ready,
  }
}

export function waistAtWeight(profile: Profile, targetWeight: number): number {
  // Conservative field estimate: ~0.075 in of waist per pound of fat loss.
  const weightLb = profile.weightLb ?? 0
  const waistIn = profile.waistIn ?? 0
  const delta = weightLb - targetWeight
  return Math.max(28, waistIn - delta * 0.075)
}

export function weightForWaist(profile: Profile): number {
  const weightLb = profile.weightLb ?? 0
  const waistIn = profile.waistIn ?? 0
  const goalWaistIn = profile.goalWaistIn ?? 0
  const goalWeightLb = profile.goalWeightLb ?? 0
  const inchesToLose = Math.max(0, waistIn - goalWaistIn)
  return Math.max(goalWeightLb, weightLb - inchesToLose / 0.075)
}

export function projectedWaistDate(profile: Profile, rateLbPerWeek: number): string {
  if (rateLbPerWeek <= 0) return '—'
  const weightNeeded = weightForWaist(profile)
  const weeks = Math.max(0, ((profile.weightLb ?? 0) - weightNeeded) / rateLbPerWeek)
  const date = new Date()
  date.setDate(date.getDate() + Math.ceil(weeks * 7))
  return date.toISOString().slice(0, 10)
}

export function maxHrReference(age: number | null): { tanaka: number | null; classic: number | null } {
  if (age == null || !Number.isFinite(age) || age <= 0) return { tanaka: null, classic: null }
  return {
    tanaka: Math.round(208 - 0.7 * age),
    classic: 220 - age,
  }
}

export function runSplitPlan(targetSeconds: number): Array<{ label: string; split: number; cumulative: number }> {
  const half = targetSeconds / 2
  return [
    { label: 'Mile 1', split: Math.round(half + 3), cumulative: Math.round(half + 3) },
    { label: 'Mile 2', split: Math.round(half - 3), cumulative: targetSeconds },
  ]
}

export function round(value: number, decimals = 0): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

export function formatPounds(value: number): string {
  return `${Math.round(value)} lb`
}

export function formatInches(value: number): string {
  return `${round(value, 1)} in`
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

export function kgFromLb(value: number): number {
  return Math.round(value / 2.20462)
}
