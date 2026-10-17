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

export interface PaceZone {
  name: string
  short: string
  fast: number
  slow: number
  hr: string
  purpose: string
}

export function paceZones(currentRunSeconds: number, maxHr: number): PaceZone[] {
  const racePace = twoMilePace(currentRunSeconds)
  return [
    {
      name: 'Recovery',
      short: 'Z1',
      fast: racePace * 1.28,
      slow: racePace * 1.4,
      hr: `${Math.round(maxHr * 0.5)}–${Math.round(maxHr * 0.6)} bpm`,
      purpose: 'Flush the legs. Nose-breathing easy. Never turns into a workout.',
    },
    {
      name: 'Aerobic base',
      short: 'Z2',
      fast: racePace * 1.16,
      slow: racePace * 1.3,
      hr: `${Math.round(maxHr * 0.6)}–${Math.round(maxHr * 0.72)} bpm`,
      purpose: 'Builds capillaries and fat oxidation. This is the engine that drops your 2-mile time.',
    },
    {
      name: 'Threshold',
      short: 'Z3/Z4',
      fast: racePace * 1.03,
      slow: racePace * 1.08,
      hr: `${Math.round(maxHr * 0.78)}–${Math.round(maxHr * 0.87)} bpm`,
      purpose: 'Comfortably hard. 4–6 minute repeats. Improves the pace you can hold without redlining.',
    },
    {
      name: 'Interval',
      short: 'Z5',
      fast: racePace * 0.94,
      slow: racePace * 1.0,
      hr: `${Math.round(maxHr * 0.88)}–${Math.round(maxHr * 0.94)} bpm`,
      purpose: '800 m repeats at or slightly faster than goal 2-mile pace. Short, controlled, full recovery.',
    },
    {
      name: 'Repetition',
      short: 'Z5+',
      fast: racePace * 0.88,
      slow: racePace * 0.94,
      hr: `${Math.round(maxHr * 0.93)}+ bpm`,
      purpose: '200–400 m fast strides. Neuromuscular sharpening. Never grind.',
    },
  ]
}

export interface HrZone {
  zone: string
  name: string
  low: number
  high: number
  use: string
}

export function hrZones(maxHr: number): HrZone[] {
  return [
    { zone: 'Z1', name: 'Recovery', low: Math.round(maxHr * 0.5), high: Math.round(maxHr * 0.6), use: 'Walk, mobility, recovery' },
    { zone: 'Z2', name: 'Aerobic base', low: Math.round(maxHr * 0.6), high: Math.round(maxHr * 0.72), use: 'Easy runs, long run' },
    { zone: 'Z3', name: 'Tempo', low: Math.round(maxHr * 0.72), high: Math.round(maxHr * 0.82), use: 'Steady threshold work' },
    { zone: 'Z4', name: 'Threshold', low: Math.round(maxHr * 0.82), high: Math.round(maxHr * 0.9), use: '4–6 min repeats' },
    { zone: 'Z5', name: 'VO2 / race', low: Math.round(maxHr * 0.9), high: maxHr, use: '800 m repeats, test day' },
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
      label: 'GREEN / FULL SEND',
      tone: 'good',
      order: 'Run the session as written. Add load only if technique is clean.',
    }
  }
  if (score >= 58) {
    return {
      label: 'AMBER / CONTROL',
      tone: 'warn',
      order: 'Keep the main set, cut 1 round or 10 minutes. No hero reps.',
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
}

export function caloriePlan(profile: Profile): CaloriePlan {
  const weightKg = profile.weightLb / 2.20462
  const heightCm = profile.heightIn * 2.54
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * profile.age + 5
  const activity = profile.trainingDays >= 5 ? 1.55 : profile.trainingDays >= 3 ? 1.45 : 1.35
  const tdee = Math.round(bmr * activity)
  const deficit = 550
  const calories = Math.max(1800, Math.round(tdee - deficit))
  const protein = Math.round(clamp(weightKg * 1.8, 150, 230))
  const fat = Math.round((calories * 0.25) / 9)
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4)
  const weeklyLoss = (tdee - calories) * 7 / 3500
  const toLose = Math.max(0, profile.weightLb - profile.goalWeightLb)
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
  }
}

export function waistAtWeight(profile: Profile, targetWeight: number): number {
  // Conservative field estimate: ~0.075 in of waist per pound of fat loss.
  const delta = profile.weightLb - targetWeight
  return Math.max(28, profile.waistIn - delta * 0.075)
}

export function weightForWaist(profile: Profile): number {
  const inchesToLose = Math.max(0, profile.waistIn - profile.goalWaistIn)
  return Math.max(profile.goalWeightLb, profile.weightLb - inchesToLose / 0.075)
}

export function projectedWaistDate(profile: Profile, rateLbPerWeek: number): string {
  if (rateLbPerWeek <= 0) return '—'
  const weightNeeded = weightForWaist(profile)
  const weeks = Math.max(0, (profile.weightLb - weightNeeded) / rateLbPerWeek)
  const date = new Date()
  date.setDate(date.getDate() + Math.ceil(weeks * 7))
  return date.toISOString().slice(0, 10)
}

export function maxHrReference(age: number): { tanaka: number; classic: number } {
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
