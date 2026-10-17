import type { LogState, WorkoutLog } from '../types'

export function sortWorkouts(workouts: WorkoutLog[], direction: 'asc' | 'desc' = 'desc'): WorkoutLog[] {
  return [...workouts].sort((a, b) =>
    direction === 'desc' ? b.date.localeCompare(a.date) || b.id.localeCompare(a.id) : a.date.localeCompare(b.date) || a.id.localeCompare(b.id),
  )
}

/** Most recent logged weight per exercise name, used to prefill the session weight inputs. */
export function lastWeights(logs: LogState): Record<string, number> {
  const map: Record<string, number> = {}
  for (const workout of sortWorkouts(logs.workouts, 'asc')) {
    for (const entry of workout.entries) {
      map[entry.name] = entry.weightLb
    }
  }
  return map
}

export interface LiftHistory {
  name: string
  count: number
  best: { weightLb: number; date: string }
  last: { weightLb: number; date: string }
  first: { weightLb: number; date: string }
  recent: Array<{ weightLb: number; date: string }>
}

export function liftHistory(logs: LogState): LiftHistory[] {
  const byName = new Map<string, Array<{ weightLb: number; date: string }>>()
  for (const workout of sortWorkouts(logs.workouts, 'asc')) {
    for (const entry of workout.entries) {
      const list = byName.get(entry.name) ?? []
      list.push({ weightLb: entry.weightLb, date: workout.date })
      byName.set(entry.name, list)
    }
  }
  const histories: LiftHistory[] = []
  for (const [name, list] of byName) {
    const best = list.reduce((a, b) => (b.weightLb > a.weightLb ? b : a), list[0])
    histories.push({
      name,
      count: list.length,
      best,
      last: list[list.length - 1],
      first: list[0],
      recent: [...list].reverse().slice(0, 6),
    })
  }
  return histories.sort((a, b) => b.last.date.localeCompare(a.last.date))
}

export function totalWorkouts(logs: LogState): number {
  return logs.workouts.length
}

export function lastWorkout(logs: LogState): WorkoutLog | null {
  return sortWorkouts(logs.workouts)[0] ?? null
}

export function deltaLabel(history: LiftHistory): string {
  const change = history.last.weightLb - history.first.weightLb
  if (history.count < 2 || change === 0) return change === 0 && history.count > 1 ? 'holding steady' : '—'
  return change > 0 ? `+${change} lb since first log` : `${change} lb since first log`
}