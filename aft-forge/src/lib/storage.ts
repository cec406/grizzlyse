import type { LogState, Profile } from '../types'
import { nextMonday, todayISO } from './date'

// v1 keys are the obsolete single-operator format. They are not migrated:
// upgrades wipe local data and return to the setup wizard (export a backup first).
const LEGACY_PROFILE_KEY = 'forge.profile.v1'
const LEGACY_LOG_KEY = 'forge.logs.v1'
const ROSTER_KEY = 'forge.roster.v1'
const PROFILE_PREFIX = 'forge.profile.v2.'
const LOG_PREFIX = 'forge.logs.v2.'

/** Bump to wipe all local data and return every device to the setup wizard. */
export const SCHEMA_VERSION = 3

export interface RosterMember {
  id: string
  name: string
  mos: string
  updatedAt: string
}

export interface Roster {
  version: number
  activeId: string | null
  members: RosterMember[]
}

/** A true blank slate — nothing assumed. Identity and body fields are filled in setup or Profile. */
export function makeDefaultProfile(): Profile {
  const startDate = nextMonday()
  return {
    name: '',
    age: null,
    sex: 'male',
    heightIn: null,
    weightLb: null,
    waistIn: null,
    goalWeightLb: null,
    goalWaistIn: null,
    mos: '',
    standard: 'general',
    startDate,
    testDate: '',
    restDays: [0, 6],
    trainingDays: 5,
    sessionMinutes: 75,
    maxHr: null,
    restingHr: null,
    garminOverlay: false,
    sledAccess: false,
    scores: {
      mdl: 0,
      hrp: 0,
      sdc: 0,
      plk: 0,
      run: 0,
    },
  }
}

export function makeDefaultLogs(profile?: Profile): LogState {
  const body =
    profile && profile.weightLb != null
      ? [{ date: todayISO(), weightLb: profile.weightLb, waistIn: profile.waistIn ?? undefined }]
      : []
  return {
    completed: {},
    body,
    checkins: [],
    workouts: [],
  }
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable in private browsing. The app still works in memory.
  }
}

function removeKey(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore.
  }
}

export function normalizeProfile(raw: Partial<Profile> | null | undefined): Profile {
  const base = makeDefaultProfile()
  if (!raw) return base
  const restDays = Array.isArray(raw.restDays) ? raw.restDays.filter((day) => day >= 0 && day <= 6) : base.restDays
  return {
    ...base,
    ...raw,
    testDate: raw.testDate ?? '',
    restDays,
    trainingDays: Math.max(2, 7 - restDays.length),
    scores: {
      ...base.scores,
      ...(raw.scores ?? {}),
    },
  }
}

export function normalizeLogs(raw: Partial<LogState> | null | undefined): LogState {
  return {
    completed: raw?.completed ?? {},
    body: raw?.body ?? [],
    checkins: raw?.checkins ?? [],
    workouts: raw?.workouts ?? [],
  }
}

export function loadRoster(): Roster {
  const stored = readJSON<Partial<Roster>>(ROSTER_KEY)
  if (stored?.version === SCHEMA_VERSION) {
    return {
      version: SCHEMA_VERSION,
      activeId: stored.activeId ?? null,
      members: stored.members ?? [],
    }
  }
  // Anything stored under an older schema — including personal profiles from
  // previous versions — is discarded. Blank slate, then the wizard runs.
  clearEverything()
  return { version: SCHEMA_VERSION, activeId: null, members: [] }
}

export function saveRoster(roster: Roster): void {
  writeJSON(ROSTER_KEY, roster)
}

export function loadProfileFor(id: string): Profile {
  return normalizeProfile(readJSON<Partial<Profile>>(PROFILE_PREFIX + id))
}

export function saveProfileFor(id: string, profile: Profile): void {
  writeJSON(PROFILE_PREFIX + id, profile)
}

export function loadLogsFor(id: string): LogState {
  return normalizeLogs(readJSON<Partial<LogState>>(LOG_PREFIX + id))
}

export function saveLogsFor(id: string, logs: LogState): void {
  writeJSON(LOG_PREFIX + id, logs)
}

export function clearOperator(id: string): void {
  removeKey(PROFILE_PREFIX + id)
  removeKey(LOG_PREFIX + id)
}

export function clearEverything(): void {
  removeKey(ROSTER_KEY)
  removeKey(LEGACY_PROFILE_KEY)
  removeKey(LEGACY_LOG_KEY)
  try {
    for (let i = localStorage.length - 1; i >= 0; i -= 1) {
      const key = localStorage.key(i)
      if (key && (key.startsWith(PROFILE_PREFIX) || key.startsWith(LOG_PREFIX))) {
        localStorage.removeItem(key)
      }
    }
  } catch {
    // Ignore.
  }
}

export function exportAll(profile: Profile, logs: LogState): string {
  return JSON.stringify({ app: 'aft-forge', version: 3, profile, logs, exportedAt: new Date().toISOString() }, null, 2)
}

export function parseBackup(text: string): { profile: Profile; logs: LogState } | null {
  try {
    const raw = JSON.parse(text) as { profile?: Partial<Profile>; logs?: Partial<LogState> }
    if (!raw || typeof raw !== 'object' || !raw.profile) return null
    return {
      profile: normalizeProfile(raw.profile),
      logs: normalizeLogs(raw.logs),
    }
  } catch {
    return null
  }
}