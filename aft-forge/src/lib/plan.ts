import type {
  DayPlan,
  ExerciseBlock,
  ExerciseBlockItem,
  Phase,
  Profile,
  SessionType,
  WeekPlan,
} from '../types'
import { addDays, clamp, daysBetween, formatShort, parseISO, weekday } from './date'
import { formatPace, paceZones, twoMilePace } from './metrics'
import { secondsToTime, thresholdForPoints, timeToSeconds } from './scoring'

const PHASE_THEME: Record<Phase, string> = {
  FOUNDATION: 'Base building',
  BUILD: 'Progressive overload',
  PEAK: 'Test-specific work',
  SHARPEN: 'Volume down, quality up',
  TEST: 'Test week',
}

const PHASE_FOCUS: Record<Phase, string> = {
  FOUNDATION: 'Aerobic base, tissue tolerance, HRP technique, SDC mechanics',
  BUILD: 'Threshold power, work capacity, body composition, repeat efforts',
  PEAK: 'Goal-pace running, full test rehearsals, score conversion',
  SHARPEN: 'Deload week: less volume, crisper quality, sleep and fuel up',
  TEST: 'Test execution: clean reps and controlled splits',
}

/** Weeks per progression cycle. Every cycle starts ~2.5% harder than the last. */
export const CYCLE_WEEKS = 4
export const PROGRESSION_PER_CYCLE = 0.025
export const MAX_PROGRESSION = 0.15

type SessionKind =
  | 'lower'
  | 'threshold'
  | 'upper'
  | 'engine'
  | 'rehearsal'
  | 'long'
  | 'recovery'
  | 'housework'
  | 'easy'
  | 'test'

export function phaseFor(week: number, totalWeeks: number): Phase {
  if (week === totalWeeks) return 'TEST'
  if (week >= totalWeeks - 1) return 'SHARPEN'
  const ratio = week / totalWeeks
  if (ratio <= 0.3) return 'FOUNDATION'
  if (ratio <= 0.62) return 'BUILD'
  return 'PEAK'
}

/** Rolling mode: a repeating 4-week cycle — build, build, peak, deload. */
export function continuousPhase(week: number): Phase {
  const index = (week - 1) % CYCLE_WEEKS
  if (index === 0) return 'FOUNDATION'
  if (index === 1) return 'BUILD'
  if (index === 2) return 'PEAK'
  return 'SHARPEN'
}

/** 1-based cycle number for a training week. */
export function cycleFor(week: number): number {
  return Math.floor((week - 1) / CYCLE_WEEKS) + 1
}

/** Every cycle nudges loads and volume up a notch, capped so it stays sane. */
export function cycleMultiplier(week: number): number {
  return Math.min(1 + MAX_PROGRESSION, 1 + (cycleFor(week) - 1) * PROGRESSION_PER_CYCLE)
}

export function progressionLabel(week: number): string {
  const cycle = cycleFor(week)
  if (cycle === 1) return 'BASELINE CYCLE'
  const bump = Math.round((Math.min(1 + MAX_PROGRESSION, 1 + (cycle - 1) * PROGRESSION_PER_CYCLE) - 1) * 1000) / 10
  return `CYCLE ${cycle} · +${bump}% LOADS`
}

function roundToFive(value: number): number {
  return Math.round(value / 5) * 5
}

function deadliftAnchor(profile: Profile): number {
  return Math.max(135, profile.scores.mdl || 135)
}

function deadliftLoads(profile: Profile, phase: Phase, week: number): { low: number; high: number } {
  const anchor = deadliftAnchor(profile)
  const ranges: Record<Phase, [number, number]> = {
    FOUNDATION: [0.68, 0.75],
    BUILD: [0.75, 0.8],
    PEAK: [0.8, 0.85],
    SHARPEN: [0.65, 0.72],
    TEST: [0.55, 0.62],
  }
  const [low, high] = ranges[phase]
  const mult = cycleMultiplier(week)
  return { low: roundToFive(anchor * low * mult), high: roundToFive(anchor * high * mult) }
}

function targetRunSeconds(profile: Profile): number {
  const threshold = thresholdForPoints('run', 90, profile, profile.standard)
  if (!threshold) return Math.max(840, Math.round(profile.scores.run * 0.9))
  return timeToSeconds(threshold)
}

function runPaces(profile: Profile): {
  easy: string
  threshold: string
  interval: string
  rep: string
  goal: string
  current: string
  goalSeconds: number
} {
  const zones = paceZones(profile.scores.run, profile.maxHr)
  const goalSeconds = targetRunSeconds(profile)
  return {
    easy: `${formatPace(zones[1].fast)}–${formatPace(zones[1].slow)} /mi`,
    threshold: `${formatPace(zones[2].fast)}–${formatPace(zones[2].slow)} /mi`,
    interval: `${formatPace(zones[3].fast)}–${formatPace(zones[3].slow)} /mi`,
    rep: `${formatPace(zones[4].fast)}–${formatPace(zones[4].slow)} /mi`,
    goal: `${formatPace(twoMilePace(goalSeconds))} /mi`,
    current: `${formatPace(twoMilePace(profile.scores.run))} /mi`,
    goalSeconds,
  }
}

function hrpSets(phase: Phase, week: number): string {
  const base = phase === 'FOUNDATION' ? [5, 10] : phase === 'BUILD' ? [5, 12] : phase === 'PEAK' ? [4, 15] : [3, 12]
  const bonus = Math.min(3, cycleFor(week) - 1)
  return `${base[0]} x ${base[1] + bonus}`
}

function thresholdPrescription(phase: Phase, week: number): string {
  const baseMinutes = phase === 'FOUNDATION' ? 3 : phase === 'BUILD' ? 4 : phase === 'PEAK' ? 5 : 3
  const minutes = Math.min(6, baseMinutes + Math.min(2, cycleFor(week) - 1))
  const sets = phase === 'SHARPEN' ? 2 : 4
  return `${sets} x ${minutes} min`
}

function plankSeconds(week: number): number {
  return Math.min(90, 45 + (cycleFor(week) - 1) * 5)
}

function engineMinutes(phase: Phase, week: number): { low: number; high: number } {
  const base = phase === 'SHARPEN' || phase === 'TEST' ? 35 : 45
  const bump = Math.min(20, (cycleFor(week) - 1) * 5)
  return { low: base + bump, high: base + bump + 15 }
}

function longRunMinutes(phase: Phase, week: number): { low: number; high: number } {
  const base = phase === 'SHARPEN' || phase === 'TEST' ? 35 : 60
  const bump = Math.min(15, (cycleFor(week) - 1) * 5)
  return { low: base + bump, high: base + bump + 15 }
}

function block(label: string, items: ExerciseBlock['items']): ExerciseBlock {
  return { label, items }
}

function baseDay(week: number, dayIndex: number, date: string) {
  return { id: `w${week}-d${dayIndex + 1}`, date, weekday: weekday(date), dayIndex }
}

function garminRunItem(): ExerciseBlockItem {
  return {
    name: 'Garmin Coach run',
    prescription: 'Open Garmin Connect and do today\'s Coach workout. Coach plans usually schedule 3–4 run days a week — these run slots are those days.',
    cue: 'If the coach has nothing today (or weather wins), run the fallback below.',
  }
}

function buildLower(profile: Profile, week: number, dayIndex: number, date: string, phase: Phase): DayPlan {
  const load = deadliftLoads(profile, phase, week)
  return {
    ...baseDay(week, dayIndex, date),
    title: 'Lower Strength + Push Capacity',
    type: 'strength',
    durationMin: 75,
    intent: 'Keep the deadlift and the muscle. Build push capacity and trunk endurance.',
    focus: ['MDL', 'HRP', 'STRENGTH'],
    blocks: [
      block('Warm-up / 10 min', [
        { name: 'Bike or row', prescription: '8 min easy', cue: 'Nose breathing only.' },
        { name: 'Prep circuit', prescription: '2 rounds: 10 leg swings/side, 10 hip openers, 10 bodyweight squats, 5 inchworms', cue: 'Own the positions before loading.' },
      ]),
      block('Main strength', [
        { name: 'Trap-bar deadlift', prescription: `3 x 3 @ ${load.low}–${load.high} lb (RPE 7). Stop one rep shy of a grind.`, cue: 'Push the floor away. Hips and shoulders rise together.' },
        { name: 'Front squat or safety-bar squat', prescription: '3 x 5 @ RPE 7', cue: 'Elbows up, brace, full foot.' },
        { name: 'Split squat', prescription: '3 x 8/leg @ RPE 7', cue: 'Front shin vertical, back knee soft.' },
        { name: 'Hand-release push-up density', prescription: `${hrpSets(phase, week)} quality reps, 30 sec rest between sets`, cue: 'Stop every set before form breaks. Full T every rep.' },
        { name: 'Front plank', prescription: `3 x ${plankSeconds(week)} sec`, cue: 'Ribs down, glutes on, breathe through the nose.' },
      ]),
      block('Finisher / 10 min', [
        { name: 'Zone 2 bike or incline walk', prescription: '10 min easy', cue: 'This is recovery, not a second workout.' },
      ]),
    ],
    minimum: `3 x 3 deadlift, ${hrpSets(phase, week)} HRP, 3 x ${plankSeconds(week)} sec plank.`,
    coachNote: 'Deadlift and HRP hold with consistent submaximal work. Keep quality high and spend most recovery on the run.',
  }
}

function buildThreshold(profile: Profile, week: number, dayIndex: number, date: string, phase: Phase): DayPlan {
  const paces = runPaces(profile)
  const rx = thresholdPrescription(phase, week)
  return {
    ...baseDay(week, dayIndex, date),
    title: 'Threshold + SDC Skill',
    type: 'run',
    durationMin: 70,
    intent: 'Raise the pace you can hold without redlining, then practice SDC mechanics with full recovery.',
    focus: ['RUN', 'SDC', 'THRESHOLD'],
    blocks: [
      block('Warm-up / 15 min', [
        { name: 'Easy jog', prescription: '12 min Zone 2 + 4 x 20 sec strides', cue: 'Finish warm, not tired.' },
        { name: 'Drills', prescription: 'Ankle hops, A-skips, 2 x 30 m build-ups', cue: 'Tall posture, quick contacts.' },
      ]),
      block('Main set', profile.garminOverlay
        ? [
            garminRunItem(),
            { name: 'Fallback — threshold repeats', prescription: `${rx} @ ${paces.threshold} with 2 min walk/jog`, cue: 'Comfortably hard. You should be able to speak 3–4 words, not a sentence.' },
            { name: 'Cooldown', prescription: '10 min easy jog/walk', cue: 'Let HR fall under 140 before you stop moving.' },
          ]
        : [
            { name: 'Threshold repeats', prescription: `${rx} @ ${paces.threshold} with 2 min walk/jog`, cue: 'Comfortably hard. You should be able to speak 3–4 words, not a sentence.' },
            { name: 'Cooldown', prescription: '10 min easy jog/walk', cue: 'Let HR fall under 140 before you stop moving.' },
          ]),
      block('SDC skill / 15 min', profile.sledAccess
        ? [
            { name: 'Sled drag', prescription: '3 x 25 m @ 90 lb, full recovery', cue: 'Drive through the legs, arms long, no jerking.' },
            { name: 'Lateral shuttle', prescription: '3 x 25 m each direction', cue: 'Feet never cross. Stay low.' },
            { name: 'Kettlebell carry', prescription: '2 x 50 m @ 2 x 40 lb', cue: 'Ribs stacked, no lean.' },
          ]
        : [
            { name: 'Plate or strap drag', prescription: '3 x 25 m @ 45–70 lb, full recovery', cue: 'Strap a plate to a towel or band. Arms long, legs drive, no jerking.' },
            { name: 'Lateral shuttle', prescription: '3 x 25 m each direction', cue: 'Feet never cross. Stay low.' },
            { name: 'Farmer carry', prescription: '2 x 50 m @ 2 x 50 lb', cue: 'Ribs stacked, no lean, quiet feet.' },
            { name: 'Hill or stair sprint', prescription: '4 x 15 sec hard, walk-down recovery', cue: 'Stands in for the sprint shuttles. Tall posture, aggressive arms.' },
          ]),
    ],
    minimum: profile.sledAccess
      ? `3 min of threshold + 3 sled drags + 2 carries. Skip the rest.`
      : `3 min of threshold + 3 drags + 2 carries. Skip the rest.`,
    coachNote: `Your current 2-mile pace is ${paces.current}. Threshold repeats should feel slower than that: comfortably hard, not a race. If HR spikes well above the threshold zone, walk until it settles.`,
  }
}

function buildUpper(profile: Profile, week: number, dayIndex: number, date: string): DayPlan {
  const paces = runPaces(profile)
  return {
    ...baseDay(week, dayIndex, date),
    title: 'Upper Strength + Zone 2',
    type: 'strength',
    durationMin: 75,
    intent: 'Keep the muscle, protect the shoulders, and add aerobic volume without another hard run.',
    focus: ['STRENGTH', 'Z2', 'HRP'],
    blocks: [
      block('Warm-up / 10 min', [
        { name: 'Row or bike', prescription: '8 min easy', cue: 'Build a sweat, not fatigue.' },
        { name: 'Shoulder prep', prescription: '2 rounds: band pull-apart x 15, shoulder circles x 10, scap push-up x 10', cue: 'Set the shoulder blades before pressing.' },
      ]),
      block('Main strength', [
        { name: 'Incline DB press', prescription: '4 x 8 @ RPE 7–8', cue: 'Elbows 45°, ribs down, full lockout.' },
        { name: 'Chest-supported row', prescription: '4 x 10 @ RPE 7–8', cue: 'Pull to the lower ribs. No body English.' },
        { name: 'Half-kneeling DB press', prescription: '3 x 8/side @ RPE 7', cue: 'Squeeze the down-side glute.' },
        { name: 'Pull-up or lat pulldown', prescription: '4 x 6–8', cue: 'Full hang, chin over bar, controlled down.' },
        { name: 'Rear-delt fly', prescription: '3 x 15', cue: 'Light weight, high quality.' },
        { name: 'Farmer carry', prescription: '3 x 40 m heavy but controlled', cue: 'Tall, quiet feet, no shrug.' },
      ]),
      block('Aerobic / 30 min', [
        { name: 'Easy run or bike', prescription: `30 min ${paces.easy}`, cue: 'Conversational. If you cannot talk, slow down.' },
        { name: 'Core', prescription: '3 x 30 sec side plank/side + 10 dead bugs', cue: 'Anti-extension, not crunching.' },
      ]),
    ],
    minimum: '3 x 8 press, 3 x 10 row, 20 min Zone 2. Skip the rest.',
    coachNote: 'This is a muscle-retention day, not a bodybuilding day. Leave two reps in reserve on every set.',
  }
}

function buildEngine(profile: Profile, week: number, dayIndex: number, date: string, phase: Phase): DayPlan {
  const paces = runPaces(profile)
  const minutes = engineMinutes(phase, week)
  return {
    ...baseDay(week, dayIndex, date),
    title: 'Aerobic Base + Mobility',
    type: 'run',
    durationMin: 60,
    intent: 'Build the engine that makes hard runs feel normal. This is the highest-return session for the 2-mile.',
    focus: ['RUN', 'Z2', 'RECOVERY'],
    blocks: [
      block(`Main / ${minutes.low}–${minutes.high} min`, profile.garminOverlay
        ? [
            garminRunItem(),
            { name: 'Fallback — easy run', prescription: `${minutes.low}–${minutes.high} min ${paces.easy}`, cue: 'HR 130–150. If it climbs above 150, walk 60 sec. Slow down rather than strain.' },
            { name: 'Strides', prescription: '4 x 20 sec relaxed fast, full recovery', cue: 'Quick turnover, not a sprint.' },
          ]
        : [
            { name: 'Easy run', prescription: `${minutes.low}–${minutes.high} min ${paces.easy}`, cue: 'HR 130–150. If it climbs above 150, walk 60 sec. Slow down rather than strain.' },
            { name: 'Strides', prescription: '4 x 20 sec relaxed fast, full recovery', cue: 'Quick turnover, not a sprint.' },
          ]),
      block('Mobility / 10 min', [
        { name: 'Hip + ankle flow', prescription: 'Couch stretch 60 sec/side, 90/90 x 8/side, calf stretch 45 sec/side', cue: 'Breathe into the stretch.' },
        { name: 'Core', prescription: '3 x 60 sec plank + 10 dead bugs', cue: 'Stop the set when the low back arches.' },
      ]),
    ],
    minimum: `25 min easy walk/run + 5 min mobility.`,
    coachNote: 'This is where the 2-mile time drops. Most people run this too hard; you should be able to talk in full sentences throughout.',
  }
}

function buildRehearsal(profile: Profile, week: number, dayIndex: number, date: string, phase: Phase): DayPlan {
  const paces = runPaces(profile)
  const sdcRounds = phase === 'FOUNDATION' ? 2 : phase === 'BUILD' ? 2 : phase === 'PEAK' ? 3 : 1
  const runRepeats = phase === 'FOUNDATION' ? '2 x 400 m' : phase === 'BUILD' ? '3 x 400 m' : phase === 'PEAK' ? '2 x 800 m' : '2 x 400 m'
  return {
    ...baseDay(week, dayIndex, date),
    title: 'AFT Rehearsal',
    type: 'aft',
    durationMin: 65,
    intent: 'Rehearse the test order, transitions, and pacing under the same conditions as test day.',
    focus: ['AFT', 'HRP', 'SDC', 'RUN'],
    blocks: [
      block('Warm-up / 12 min', [
        { name: 'Easy jog + prep', prescription: '10 min easy + dynamic hips, ankles, shoulders', cue: 'Get warm, stay relaxed.' },
      ]),
      block('Test-order rehearsal', [
        { name: 'HRP', prescription: phase === 'PEAK' ? '2 min test set' : '4 x 30 sec quality reps, 30 sec rest', cue: 'Full T, chest and thighs together.' },
        {
          name: 'SDC',
          prescription: profile.sledAccess
            ? `${sdcRounds} full round(s), 3–4 min rest`
            : `${sdcRounds} no-sled simulation round(s): 2 x 25 m sprint, 2 x 25 m lateral shuffle, 25 m carry @ 2 x 40 lb, 3–4 min rest`,
          cue: 'Race the transitions, not the first 10 m.',
        },
        { name: 'Run', prescription: `${runRepeats} @ ${phase === 'PEAK' ? paces.goal : paces.interval} with 2 min walk/jog`, cue: 'Even splits. Negative split the last rep.' },
        { name: 'Deadlift speed', prescription: `3 x 3 @ ${roundToFive(deadliftAnchor(profile) * Math.min(0.7, 0.6 * cycleMultiplier(week)))} lb, fast and clean`, cue: 'Speed pulls. No grinding.' },
      ]),
      block('Cooldown / 10 min', [
        { name: 'Walk + breathe', prescription: '8–10 min easy walk, nasal breathing', cue: 'Downshift before you drive home.' },
      ]),
    ],
    minimum: '2 min HRP + 2 SDC rounds + 2 x 400 m. Skip the deadlift.',
    coachNote: 'The AFT is one continuous session: five events plus transitions. Rehearse the full order weekly so pacing and transitions are automatic.',
  }
}

function buildLong(profile: Profile, week: number, dayIndex: number, date: string, phase: Phase): DayPlan {
  const paces = runPaces(profile)
  const minutes = longRunMinutes(phase, week)
  return {
    ...baseDay(week, dayIndex, date),
    title: profile.garminOverlay ? 'Garmin Coach Long Run + Core' : 'Long Engine + Core',
    type: 'run',
    durationMin: 85,
    intent: 'Long, easy aerobic work. This is the session that makes your heart rate lower at the same pace.',
    focus: ['RUN', 'Z2', 'CORE'],
    blocks: [
      block(`Long aerobic / ${minutes.low}–${minutes.high} min`, [
        {
          name: profile.garminOverlay ? 'Garmin Coach long run' : 'Long easy run',
          prescription: profile.garminOverlay
            ? `Today's Coach long run (${minutes.low}–${minutes.high} min budget) ${paces.easy}`
            : `${minutes.low}–${minutes.high} min ${paces.easy}`,
          cue: profile.garminOverlay
            ? 'Use the Garmin Coach long run as the aerobic anchor. Keep it easy; do not race the watch.'
            : 'Conversational pace. Walk the hills if HR climbs above 150.',
        },
        { name: 'Optional ruck', prescription: '45–60 min @ 35 lb, flat route', cue: 'Only if running volume is already consistent. No running with the ruck.' },
      ]),
      block('Core / 10 min', [
        { name: 'Core circuit', prescription: '3 rounds: 30 sec dead bug, 30 sec side plank/side, 30 sec bird dog', cue: 'Slow, deliberate, breathe.' },
      ]),
    ],
    minimum: '40 min easy walk/run + 5 min core.',
    coachNote: profile.garminOverlay
      ? 'Garmin Coach handles run volume; keep AFT rehearsal, SDC, and strength days as prescribed here. Run the long run easy.'
      : 'Run easy. Chasing pace on the long run adds fatigue that takes away from the quality days.',
  }
}

function buildRecovery(week: number, dayIndex: number, date: string): DayPlan {
  return {
    ...baseDay(week, dayIndex, date),
    title: 'Recovery / Recharge',
    type: 'recovery',
    durationMin: 35,
    intent: 'Absorb the week. Sleep, walk, mobility, and prep the fuel that makes the next week possible.',
    focus: ['RECOVERY', 'MOBILITY'],
    blocks: [
      block('Active recovery', [
        { name: 'Walk', prescription: '20–30 min easy, outdoors if possible', cue: 'No pace target. Just move.' },
        { name: 'Mobility flow', prescription: '10 min: hips, thoracic spine, calves, hamstrings', cue: 'Breathe slowly. Do not force range.' },
        { name: 'Breathwork', prescription: '5 min box breathing: 4 in / 4 hold / 4 out / 4 hold', cue: 'Downshift the nervous system.' },
      ]),
      block('Admin', [
        { name: 'Weekly log', prescription: 'Morning weight, waist at navel, progress photo, sleep average', cue: 'Same conditions every week.' },
        { name: 'Meal prep', prescription: 'Cook 2–3 protein anchors for the week', cue: 'Decide meals once, not daily.' },
      ]),
    ],
    minimum: '10 min walk + 5 min mobility.',
    coachNote: 'Recovery is part of the program. Sleep drives adaptation; chronic short sleep stalls progress.',
  }
}

function buildHousework(week: number, dayIndex: number, date: string): DayPlan {
  return {
    ...baseDay(week, dayIndex, date),
    title: 'Rest',
    type: 'recovery',
    durationMin: 30,
    intent: 'No training. Chores, mobility, and sleep.',
    focus: ['REST'],
    blocks: [
      block('Rest day', [
        { name: 'Chores', prescription: '45–90 min: shovel snow, split wood, haul, fix, clean the bay', cue: 'Modular easy movement. Stop if it becomes a workout.' },
        { name: 'Mobility flow', prescription: '10 min: hips, thoracic spine, calves', cue: 'Breathe slow. Range over intensity.' },
      ]),
      block('Admin', [
        { name: 'Weekly log', prescription: 'Morning weight, waist at navel, sleep average', cue: 'Same conditions every week.' },
        { name: 'Prep the week', prescription: 'Cook 2–3 protein anchors, lay out gear for the first training day', cue: 'Make Monday automatic.' },
      ]),
    ],
    minimum: 'Chores + 10 min mobility. That is the session.',
    coachNote: 'Rest days let training adaptations accumulate. Light chores are fine; protect sleep.',
  }
}

function buildEasy(profile: Profile, week: number, dayIndex: number, date: string): DayPlan {
  const paces = runPaces(profile)
  return {
    ...baseDay(week, dayIndex, date),
    title: 'Shakeout',
    type: 'recovery',
    durationMin: 35,
    intent: 'Stay loose around the test. Absorb — do not train.',
    focus: ['RECOVERY', 'LOOSEN'],
    blocks: [
      block('Shakeout / 30 min', [
        { name: 'Easy walk or jog', prescription: `20 min ${paces.easy}, nasal breathing`, cue: 'If it feels like training, slow down.' },
        { name: 'Mobility + strides', prescription: '10 min hips/ankles + 3 x 15 sec relaxed strides', cue: 'Crisp, not fast.' },
      ]),
    ],
    minimum: '15 min easy movement. That is enough.',
    coachNote: 'The work is done. Sleep, eat, and walk. Nothing you do today makes the test better — overdoing it can make it worse.',
  }
}

function buildTest(profile: Profile, week: number, dayIndex: number, date: string): DayPlan {
  const paces = runPaces(profile)
  return {
    ...baseDay(week, dayIndex, date),
    title: 'AFT TEST DAY',
    type: 'test',
    durationMin: 90,
    intent: 'Execute the test: clean reps, controlled pacing, no risky attempts.',
    focus: ['TEST', 'EXECUTE'],
    blocks: [
      block('Pre-test / 45 min out', [
        { name: 'Light movement', prescription: '10 min easy walk/jog + dynamic hips, ankles, shoulders', cue: 'Stay warm, not tired.' },
        { name: 'Primer', prescription: '3 x 20 sec strides, 2 x 10 HRP, 2 x 20 sec plank', cue: 'Prime the movements without adding fatigue.' },
        { name: 'Fuel', prescription: '300–500 ml fluid + 30–60 g carbs if tolerated', cue: 'Nothing new on test day.' },
      ]),
      block('Test order', [
        { name: '3RM deadlift', prescription: 'Open at a weight you know is good. One clean attempt, then decide.', cue: 'Take the safe opener.' },
        { name: 'Hand-release push-up', prescription: '2 min. Sets of 5–8, short pauses in the front leaning rest.', cue: 'Chest and thighs touch together. Full T on every rep.' },
        { name: 'Sprint-drag-carry', prescription: 'Controlled sprint, strong drag, quick lateral, secure carry, finish hard.', cue: 'Turn the sled with your legs, not your lower back.' },
        { name: 'Plank', prescription: 'Hold 5–10 sec past your target, then stop.', cue: 'Squeeze glutes, tuck ribs, breathe.' },
        { name: 'Two-mile run', prescription: `Target ${secondsToTime(paces.goalSeconds)} (${paces.goal}). First mile controlled, second mile at effort.`, cue: 'No sprinting in the first 800 m.' },
      ]),
      block('After-action', [
        { name: 'Cooldown', prescription: '10–15 min walk + fluids + 30–40 g protein', cue: 'Log the score while it is fresh.' },
      ]),
    ],
    minimum: 'Show up, warm up, execute.',
    coachNote: 'Test day is a skill day. Your fitness is already built. Your only job is clean execution and even pacing.',
  }
}

function makeDay(profile: Profile, week: number, dayIndex: number, date: string, phase: Phase, kind: SessionKind): DayPlan {
  switch (kind) {
    case 'lower': return buildLower(profile, week, dayIndex, date, phase)
    case 'threshold': return buildThreshold(profile, week, dayIndex, date, phase)
    case 'upper': return buildUpper(profile, week, dayIndex, date)
    case 'engine': return buildEngine(profile, week, dayIndex, date, phase)
    case 'rehearsal': return buildRehearsal(profile, week, dayIndex, date, phase)
    case 'long': return buildLong(profile, week, dayIndex, date, phase)
    case 'recovery': return buildRecovery(week, dayIndex, date)
    case 'housework': return buildHousework(week, dayIndex, date)
    case 'easy': return buildEasy(profile, week, dayIndex, date)
    case 'test': return buildTest(profile, week, dayIndex, date)
  }
}

/** Weekday order for filling training days: Monday → Saturday, then Sunday. */
const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0]

function rotationFor(trainingDays: number): SessionKind[] {
  switch (clamp(trainingDays, 2, 7)) {
    case 7: return ['lower', 'threshold', 'upper', 'engine', 'rehearsal', 'long', 'recovery']
    case 6: return ['lower', 'threshold', 'upper', 'engine', 'rehearsal', 'long']
    case 5: return ['lower', 'threshold', 'upper', 'engine', 'rehearsal']
    case 4: return ['lower', 'threshold', 'upper', 'rehearsal']
    case 3: return ['lower', 'threshold', 'upper']
    default: return ['lower', 'threshold']
  }
}

export function buildProgram(profile: Profile): WeekPlan[] {
  const hasTest = Boolean(profile.testDate)
  const rawWeeks = hasTest ? Math.ceil(daysBetween(profile.startDate, profile.testDate) / 7) : 0
  const totalWeeks = hasTest ? clamp(rawWeeks || 8, 4, 16) : 8
  // restDays hold real weekdays (0 = Sunday … 6 = Saturday), so each day's kind
  // must come from the calendar weekday of its actual date — never from the
  // day's position inside the week.
  const restSet = new Set(profile.restDays ?? [0, 6])
  const trainingDows = WEEKDAY_ORDER.filter((dow) => !restSet.has(dow))
  const trainingDays = Math.max(2, trainingDows.length)
  const weeks: WeekPlan[] = []
  for (let week = 1; week <= totalWeeks; week += 1) {
    const phase = hasTest ? phaseFor(week, totalWeeks) : continuousPhase(week)
    const rotation = rotationFor(trainingDays)
    const kinds = new Map<number, SessionKind>() // keyed by actual weekday
    trainingDows.forEach((dow, slot) => {
      kinds.set(dow, phase === 'TEST' ? (slot === 0 ? 'test' : 'easy') : rotation[slot % rotation.length])
    })
    const startDate = addDays(profile.startDate, (week - 1) * 7)
    const days = Array.from({ length: 7 }, (_, dayIndex) => {
      const date = addDays(startDate, dayIndex)
      const dow = parseISO(date).getDay()
      const kind = kinds.get(dow) ?? 'housework'
      return makeDay(profile, week, dayIndex, date, phase, kind)
    })
    weeks.push({
      number: week,
      cycle: cycleFor(week),
      phase,
      theme: PHASE_THEME[phase],
      focus: PHASE_FOCUS[phase],
      startDate,
      endDate: addDays(startDate, 6),
      days,
    })
  }
  return weeks
}

export function getTodayPlan(program: WeekPlan[], date: string): DayPlan | null {
  for (const week of program) {
    const day = week.days.find((candidate) => candidate.date === date)
    if (day) return day
  }
  return null
}

export function getNextPlan(program: WeekPlan[], date: string): DayPlan | null {
  const allDays = program.flatMap((week) => week.days)
  return allDays.find((day) => day.date >= date) ?? allDays[allDays.length - 1] ?? null
}

export function getWeekForDate(program: WeekPlan[], date: string): WeekPlan | null {
  return program.find((week) => date >= week.startDate && date <= week.endDate) ?? null
}

export function sessionTypeLabel(type: SessionType): string {
  switch (type) {
    case 'strength':
      return 'STRENGTH'
    case 'run':
      return 'RUN'
    case 'aft':
      return 'AFT REHEARSAL'
    case 'test':
      return 'TEST'
    case 'recovery':
      return 'RECOVERY'
  }
}

export function weekCompletion(week: WeekPlan, completed: Record<string, boolean>): number {
  const total = week.days.filter((day) => day.type !== 'recovery').length
  const done = week.days.filter((day) => day.type !== 'recovery' && completed[day.id]).length
  return total === 0 ? 0 : Math.round((done / total) * 100)
}

export function phaseColor(phase: Phase): string {
  switch (phase) {
    case 'FOUNDATION':
      return 'blue'
    case 'BUILD':
      return 'lime'
    case 'PEAK':
      return 'amber'
    case 'SHARPEN':
      return 'violet'
    case 'TEST':
      return 'red'
  }
}

export function planSummary(profile: Profile): string {
  if (!profile.testDate) {
    return `Rolling readiness · started ${formatShort(profile.startDate)}`
  }
  const weeks = Math.ceil(daysBetween(profile.startDate, profile.testDate) / 7)
  return `${weeks}-week AFT block · ${formatShort(profile.startDate)} → ${formatShort(profile.testDate)}`
}