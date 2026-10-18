import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleGauge,
  Clock3,
  Flame,
  Footprints,
  HeartPulse,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Watch,
  Zap,
} from 'lucide-react'
import type { AftResult, DayPlan, LogState, Profile, Tab, WeekPlan } from '../types'
import {
  EVENT_KEYS,
  EVENT_META,
  computeAft,
  estimateRunAtWeight,
  formatEventValue,
  secondsToTime,
  thresholdForPoints,
  timeToSeconds,
  waistToHeight,
  maxWaist,
} from '../lib/scoring'
import {
  caloriePlan,
  formatInches,
  formatPace,
  formatPaceRange,
  orDash,
  paceZones,
  readinessBand,
  twoMilePace,
  weightForWaist,
} from '../lib/metrics'
import {
  getNextPlan,
  getTodayPlan,
  getWeekForDate,
  sessionTypeLabel,
  weekCompletion,
} from '../lib/plan'
import {
  daysBetween,
  formatShort,
  isToday,
  todayISO,
  weekday,
} from '../lib/date'
import { Eyebrow, Panel, Pill, ProgressBar, Ring, SectionHeader, Stat } from './ui'
import { lastWorkout } from '../lib/lifts'

export function Dashboard({
  profile,
  logs,
  program,
  aft,
  onNavigate,
  onStartSession,
  onOpenLog,
}: {
  profile: Profile
  logs: LogState
  program: WeekPlan[]
  aft: AftResult
  onNavigate: (tab: Tab) => void
  onStartSession: (day: DayPlan) => void
  onOpenLog: () => void
}) {
  const today = todayISO()
  const todayPlan = getTodayPlan(program, today)
  const nextPlan = getNextPlan(program, today)
  const mission = todayPlan ?? nextPlan
  const week = getWeekForDate(program, today) ?? program[0]
  const latestBody = [...logs.body].sort((a, b) => a.date.localeCompare(b.date)).at(-1)
  const currentWeight = latestBody?.weightLb ?? profile.weightLb
  const currentWaist = latestBody?.waistIn ?? profile.waistIn
  const ratio = waistToHeight(currentWaist, profile.heightIn)
  const waistLimit = maxWaist(profile.heightIn)
  const waistGap = currentWaist ? Math.max(0, currentWaist - waistLimit) : 0
  const latestCheckin = [...logs.checkins].sort((a, b) => a.date.localeCompare(b.date)).at(-1)
  const readiness = latestCheckin?.readiness ?? 0
  const band = readinessBand(readiness)
  const calories = caloriePlan(profile)
  const targetTotal = aft.targetTotal
  const gapToTarget = Math.max(0, targetTotal - aft.total)
  const projectedRun = estimateRunAtWeight(profile.scores.run, currentWeight, profile.goalWeightLb)
  const projectedScore = computeAft(
    { ...profile.scores, run: projectedRun },
    profile,
    profile.standard,
  ).total
  const paces = paceZones(profile.scores.run, profile.maxHr)
  const hasTest = Boolean(profile.testDate)
  const daysToTest = hasTest ? daysBetween(today, profile.testDate) : null
  const recentWorkout = lastWorkout(logs)

  const gaps = EVENT_KEYS.map((event) => {
    const target = Number(thresholdForPoints(event, 90, profile, profile.standard) ?? 0)
    const score = aft.eventScores[event].score
    return { event, score, gap: Math.max(0, 90 - score), target }
  }).sort((a, b) => b.gap - a.gap)

  const go = aft.passed
  const bodyGo = ratio < 0.55
  const overall = go && bodyGo

  return (
    <div className="dashboard">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="live-dot" />
            <span>MISSION 01 / AFT READINESS</span>
            <span className="hero-kicker-rule" />
            <span>{daysToTest === null ? 'ALWAYS READY' : daysToTest >= 0 ? `T-${daysToTest} DAYS` : 'WINDOW CLOSED'}</span>
          </div>
          <h2>
            Pass at any point.
            <br />
            <em>Not just on test week.</em>
          </h2>
          <p>
            {hasTest
              ? `A ${program.length}-week plan built around your baseline and the ${formatShort(profile.testDate)} test window. Keep the muscle, build the run, and treat the test as a routine hard day.`
              : 'A rolling readiness plan: 4-week cycles — build, build, peak, deload — and every cycle starts a little heavier than the last. No test date required.'}
          </p>
          <div className="hero-actions">
            {mission && (
              <button type="button" className="button button-primary" onClick={() => onStartSession(mission)}>
                <Zap size={17} />
                {mission.date === today ? 'Start today’s mission' : 'Preview next mission'}
              </button>
            )}
            <button type="button" className="button button-ghost" onClick={() => onNavigate('plan')}>
              <CalendarCheck size={17} />
              Open the plan
            </button>
            <button type="button" className="button button-ghost" onClick={() => onNavigate('calc')}>
              <Target size={17} />
              Calculators
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <span>AFT</span>
              <strong>{aft.total}</strong>
              <small>/ 500</small>
            </div>
            <div>
              <span>WHtR</span>
              <strong>{orDash(ratio, (n) => n.toFixed(3))}</strong>
              <small>{ratio > 0 ? (ratio < 0.55 ? 'PASS' : 'GATE') : 'NO DATA'}</small>
            </div>
            <div>
              <span>2-MILE</span>
              <strong>{profile.scores.run > 0 ? secondsToTime(profile.scores.run) : '—'}</strong>
              <small>{profile.scores.run > 0 ? `${formatPace(twoMilePace(profile.scores.run))} /mi` : 'untested'}</small>
            </div>
            <div>
              <span>TO GOAL</span>
              <strong>{orDash(currentWeight != null && profile.goalWeightLb != null ? Math.max(0, Math.round(currentWeight - profile.goalWeightLb)) : null)}</strong>
              <small>lb</small>
            </div>
          </div>
        </div>

        <div className="hero-score">
          <div className="hero-score-top">
            <span className="micro-label">CURRENT AFT</span>
            <Pill tone={go ? 'lime' : 'red'} dot>
              {go ? 'GO' : 'NO-GO'}
            </Pill>
          </div>
          <Ring
            value={aft.total}
            max={500}
            size={188}
            label={String(aft.total)}
            sublabel="OF 500"
            tone={aft.total >= 450 ? 'lime' : aft.total >= 350 ? 'amber' : 'red'}
          />
          <div className="hero-score-foot">
            <div>
              <span>Target</span>
              <strong>{targetTotal}</strong>
            </div>
            <div>
              <span>Gap</span>
              <strong>{gapToTarget} pts</strong>
            </div>
            <div>
              <span>Min event</span>
              <strong>{aft.lowest}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <div className="dash-main">
          {mission && (
            <Panel className="mission-panel">
              <SectionHeader
                eyebrow={mission.date === today ? 'TODAY’S MISSION' : 'NEXT MISSION'}
                title={mission.title}
                description={`${formatShort(mission.date)} · ${mission.durationMin} min · ${sessionTypeLabel(mission.type)}`}
                action={
                  <div className="mission-actions">
                    <Pill tone={mission.type === 'test' ? 'red' : mission.type === 'recovery' ? 'blue' : 'lime'}>
                      {mission.focus[0]}
                    </Pill>
                    <button type="button" className="button button-small button-primary" onClick={() => onStartSession(mission)}>
                      Start
                      <ArrowRight size={15} />
                    </button>
                  </div>
                }
              />
              <div className="mission-body">
                <div className="mission-intent">
                  <span className="micro-label">INTENT</span>
                  <p>{mission.intent}</p>
                  <div className="mission-tags">
                    {mission.focus.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="mission-preview">
                  {mission.blocks.slice(0, 2).map((block) => (
                    <div key={block.label} className="preview-block">
                      <span className="preview-label">{block.label}</span>
                      {block.items.slice(0, 3).map((item) => (
                        <div key={item.name} className="preview-row">
                          <span className="preview-dot" />
                          <div>
                            <strong>{item.name}</strong>
                            <small>{item.prescription}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mission-foot">
                <div className="mission-minimum">
                  <Clock3 size={15} />
                  <span>
                    <strong>Minimum viable session:</strong> {mission.minimum}
                  </span>
                </div>
                {logs.completed[mission.id] && (
                  <span className="complete-badge">
                    <Check size={14} /> COMPLETE
                  </span>
                )}
              </div>
            </Panel>
          )}

          <Panel className="scoreboard-panel">
            <SectionHeader
              eyebrow="SCOREBOARD"
              title="Five events, scored against your standard."
              description="Bars show your current points. The notch is the 90-point target."
              action={
                <button type="button" className="text-button" onClick={() => onNavigate('aft')}>
                  Open AFT Lab <ChevronRight size={15} />
                </button>
              }
            />
            <div className="scoreboard">
              {EVENT_KEYS.map((event) => {
                const meta = EVENT_META[event]
                const result = aft.eventScores[event]
                const rawTarget = thresholdForPoints(event, 90, profile, profile.standard)
                const target = rawTarget ? (meta.unit === 'time' ? timeToSeconds(rawTarget) : Number(rawTarget)) : 0
                const value = profile.scores[event]
                const gap = Math.max(0, 90 - result.score)
                return (
                  <div key={event} className="score-row">
                    <div className="score-event">
                      <span className={`event-icon event-${event}`}>{meta.short}</span>
                      <div>
                        <strong>{meta.label}</strong>
                        <small>{formatEventValue(event, value)}</small>
                      </div>
                    </div>
                    <div className="score-bar-wrap">
                      <div className="score-bar">
                        <div className={`score-fill event-fill-${event}`} style={{ width: `${result.score}%` }} />
                        <span className="score-target-notch" style={{ left: '90%' }} />
                      </div>
                      <div className="score-bar-meta">
                        <span>{result.score} pts</span>
                        <span>{gap === 0 ? 'target hit' : `${gap} to 90`}</span>
                      </div>
                    </div>
                    <div className="score-target">
                      <span>90-PT</span>
                      <strong>{event === 'mdl' || event === 'hrp' ? target : secondsToTime(target)}</strong>
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>

          <div className="dash-two-col">
            <Panel className="week-panel">
              <SectionHeader
                eyebrow={`WEEK ${week.number} / CYCLE ${week.cycle} / ${week.phase}`}
                title={week.theme}
                action={
                  <button type="button" className="text-button" onClick={() => onNavigate('plan')}>
                    Full plan <ChevronRight size={15} />
                  </button>
                }
              />
              <div className="week-progress">
                <ProgressBar
                  value={weekCompletion(week, logs.completed)}
                  label={week.cycle === 1 ? 'Week completion' : `Cycle ${week.cycle} · ~+${(Math.round((Math.min(1.15, 1 + (week.cycle - 1) * 0.025) - 1) * 1000) / 10).toFixed(1)}% loads`}
                  right={`${weekCompletion(week, logs.completed)}%`}
                />
              </div>
              <div className="week-strip">
                {week.days.map((day) => {
                  const done = logs.completed[day.id]
                  return (
                    <button
                      key={day.id}
                      type="button"
                      className={`week-day ${isToday(day.date) ? 'today' : ''} ${done ? 'done' : ''}`}
                      onClick={() => onNavigate('plan')}
                    >
                      <span>{weekday(day.date)}</span>
                      <strong>{day.title.split(' ')[0]}</strong>
                      <small>{day.durationMin}m</small>
                      {done && <Check size={13} className="week-check" />}
                    </button>
                  )
                })}
              </div>
              <div className="week-focus">
                <Target size={15} />
                <span>{week.focus}</span>
              </div>
            </Panel>

            <Panel className="leverage-panel">
              <SectionHeader
                eyebrow="LEVERAGE"
                title={`Where the next ${gapToTarget} points live.`}
                description="Bars show current points against your standard. The list below ranks the biggest gaps first."
              />
              <div className="leverage-list">
                {gaps.slice(0, 4).map(({ event, score, gap }) => (
                  <div key={event} className="leverage-row">
                    <div className="leverage-name">
                      <span className={`leverage-dot event-${event}`} />
                      <strong>{EVENT_META[event].short}</strong>
                    </div>
                    <div className="leverage-bar">
                      <div style={{ width: `${score}%` }} />
                    </div>
                    <span className={gap > 0 ? 'leverage-gap' : 'leverage-hit'}>{gap > 0 ? `+${gap}` : 'HIT'}</span>
                  </div>
                ))}
              </div>
              <div className="leverage-callout">
                <Sparkles size={17} />
                <p>
                  {gaps[0]?.gap === 0
                    ? 'Every event is at or above the 90-point target. Push the weakest event and protect the run.'
                    : <>Priority order: <strong>{gaps.slice(0, 4).filter(({ gap }) => gap > 0).map(({ event }) => EVENT_META[event].short).join(' → ')}</strong>. Start where the points are cheapest, and do not spend recovery on events already maxed.</>}
                </p>
              </div>
            </Panel>
          </div>
        </div>

        <aside className="dash-side">
          <Panel className={`status-panel ${overall ? 'status-go' : 'status-nogo'}`}>
            <div className="status-head">
              <Eyebrow>IF TESTED TODAY</Eyebrow>
              <Pill tone={overall ? 'lime' : 'red'} dot>
                {overall ? 'MISSION READY' : 'GATE FAIL'}
              </Pill>
            </div>
            <h2>{overall ? 'You are a go.' : 'AFT passes. Waist does not.'}</h2>
            <p>
              {overall
                ? 'AFT and body composition are both inside standard. Keep the plan as written.'
                : 'Your AFT score is inside standard. Your waist-to-height ratio is not. The next block should prioritize body composition while maintaining run fitness.'}
            </p>
            <div className="status-grid">
              <div className={go ? 'status-ok' : 'status-bad'}>
                <span>AFT</span>
                <strong>{go ? 'GO' : 'NO-GO'}</strong>
                <small>{aft.total} pts</small>
              </div>
              <div className={bodyGo ? 'status-ok' : 'status-bad'}>
                <span>WHtR</span>
                <strong>{bodyGo ? 'GO' : 'NO-GO'}</strong>
                <small>{ratio.toFixed(3)}</small>
              </div>
            </div>
            <button type="button" className="button button-dark button-full" onClick={() => onNavigate('body')}>
              <Scale size={16} />
              Fix the gate
            </button>
          </Panel>

          <Panel className="readiness-panel">
            <div className="panel-topline">
              <Eyebrow>READINESS</Eyebrow>
              <span className="micro-label">AUTO-REGULATION</span>
            </div>
            <div className="readiness-body">
              <Ring
                value={readiness}
                max={100}
                size={122}
                label={latestCheckin ? String(readiness) : '—'}
                sublabel="READINESS"
                tone={latestCheckin ? (band.tone === 'good' ? 'lime' : band.tone === 'warn' ? 'amber' : 'red') : 'blue'}
              />
              <div className="readiness-copy">
                <strong>{latestCheckin ? band.label : 'CHECK IN FIRST'}</strong>
                <p>{latestCheckin ? band.order : 'Sleep, soreness, and stress decide whether today is a full session, a reduced one, or recovery.'}</p>
                <button type="button" className="text-button" onClick={onOpenLog}>
                  {latestCheckin ? 'Update check-in' : '2-minute check-in'} <ChevronRight size={14} />
                </button>
              </div>
            </div>
            {latestCheckin && (
              <div className="readiness-mini">
                <span>SLEEP {latestCheckin.sleep}/5</span>
                <span>SORENESS {latestCheckin.soreness}/5</span>
                <span>STRESS {latestCheckin.stress}/5</span>
              </div>
            )}
          </Panel>

          <Panel className="loads-panel">
            <div className="panel-topline">
              <Eyebrow>RECENT LOADS</Eyebrow>
              <button type="button" className="text-button" onClick={() => onNavigate('log')}>
                Training Log <ChevronRight size={14} />
              </button>
            </div>
            {recentWorkout && recentWorkout.entries.length > 0 ? (
              <div className="loads-list">
                {recentWorkout.entries.slice(0, 5).map((entry) => (
                  <div key={entry.name} className="loads-row">
                    <strong>{entry.name}</strong>
                    <span>{entry.weightLb} lb</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="loads-empty">
                Run a session and type the weights you used — they land here and in the Training Log.
              </p>
            )}
          </Panel>

          <Panel className="gate-panel">
            <div className="panel-topline">
              <Eyebrow>BODY COMP GATE</Eyebrow>
              <Pill tone={ratio > 0 ? (bodyGo ? 'lime' : 'red') : 'neutral'}>{ratio > 0 ? (bodyGo ? 'PASS' : 'FAIL') : 'NO DATA'}</Pill>
            </div>
            <div className="gate-numbers">
              <div>
                <span>WAIST</span>
                <strong>{orDash(currentWaist, formatInches)}</strong>
                <small>limit {orDash(waistLimit, formatInches)}</small>
              </div>
              <div>
                <span>RATIO</span>
                <strong>{orDash(ratio, (n) => n.toFixed(3))}</strong>
                <small>standard &lt; 0.550</small>
              </div>
              <div>
                <span>WEIGHT</span>
                <strong>{orDash(currentWeight)}</strong>
                <small>goal {orDash(profile.goalWeightLb)} lb</small>
              </div>
            </div>
            <div className="waist-gauge">
              <div className="waist-gauge-fill" style={{ width: `${Math.min(100, ((ratio || 0) / 0.62) * 100)}%` }} />
              <span className="waist-gauge-mark" style={{ left: `${(0.55 / 0.62) * 100}%` }} />
            </div>
            <div className="gate-callout">
              <Flame size={16} />
              <p>
                {profile.heightIn && currentWaist
                  ? waistGap > 0
                    ? `${waistGap.toFixed(1)} in to standard. Model says that arrives around ${Math.round(weightForWaist(profile))} lb — before your ${profile.goalWeightLb} lb goal.`
                    : 'You are inside the waist standard. Keep the trend moving in the right direction.'
                  : 'Enter your weight, waist, and height in Profile to unlock the body comp gate.'}
              </p>
            </div>
            <div className="gate-foot">
              <span>{profile.goalWeightLb ? `At ${orDash(profile.goalWeightLb)} lb, model 2-mile: <strong>${secondsToTime(projectedRun)}</strong>` : 'Set a goal weight in Profile for the projection.'}</span>
              <span>AFT model: <strong>{projectedScore}</strong></span>
            </div>
          </Panel>

          <Panel className="garmin-panel">
            <div className="garmin-head">
              <div className="garmin-icon"><Watch size={19} /></div>
              <div>
                <Eyebrow>GARMIN BRIDGE</Eyebrow>
                <h3>{profile.garminOverlay ? 'Coach overlay active' : 'Watch as sensor'}</h3>
              </div>
              <span className={`toggle-dot ${profile.garminOverlay ? 'on' : ''}`} />
            </div>
            <p>
              {profile.garminOverlay
                ? 'Your run slots (threshold, easy/long) defer to the Garmin Coach plan — typically 3–4 run days a week. AFT rehearsal, SDC, and strength stay prescribed here.'
                : 'Use Garmin for HR, pace, and sleep data. Every run is prescribed right here.'}
            </p>
            <button type="button" className="text-button" onClick={() => onNavigate('run')}>
              Open Run Lab <ChevronRight size={14} />
            </button>
          </Panel>

          <Panel className="intel-panel">
            <div className="panel-topline">
              <Eyebrow>INTEL FEED</Eyebrow>
              <span className="micro-label">CURRENT</span>
            </div>
            <button type="button" className="intel-row" onClick={() => onNavigate('intel')}>
              <div className="intel-icon"><ShieldCheck size={16} /></div>
              <div>
                <strong>CFT is live for 24 combat MOSs</strong>
                <small>Seven events, 30 minutes, pass/fail. Only the listed combat MOSs take it.</small>
              </div>
              <ChevronRight size={15} />
            </button>
            <button type="button" className="intel-row" onClick={() => onNavigate('body')}>
              <div className="intel-icon"><CircleGauge size={16} /></div>
              <div>
                <strong>WHtR replaced the tape test</strong>
                <small>Waist at the navel ÷ height. Under 0.55. Twice a year.</small>
              </div>
              <ChevronRight size={15} />
            </button>
          </Panel>
        </aside>
      </div>

      <section className="dashboard-footer-grid">
        <Panel className="fuel-panel">
          <SectionHeader
            eyebrow="FUEL / MUSCLE RETENTION"
            title={calories.ready ? `${calories.calories.toLocaleString()} kcal · ${orDash(calories.protein)} g protein` : 'Add weight, height, and age'}
            description="A moderate deficit, high protein, and two strength days reduce waist while preserving run performance."
            action={<button type="button" className="text-button" onClick={() => onNavigate('body')}>Open Fuel <ChevronRight size={15} /></button>}
          />
          <div className="fuel-stats">
            <Stat label="PROTEIN" value={orDash(calories.protein)} unit="g" detail="≈ 1.8 g/kg" tone="lime" icon={<ShieldCheck size={15} />} />
            <Stat label="DEFICIT" value={orDash(calories.deficit)} unit="kcal" detail={calories.ready ? `${calories.rateLbPerWeek} lb/wk` : '—'} tone="amber" icon={<Flame size={15} />} />
            <Stat label={`WEEKS TO ${profile.goalWeightLb ? orDash(profile.goalWeightLb) : 'GOAL'}`} value={orDash(calories.weeksToGoal)} unit="wk" detail="at current deficit" tone="blue" icon={<Target size={15} />} />
          </div>
          <div className="fuel-note">
            <HeartPulse size={16} />
            <span>
              Your observed max HR is the ceiling, not the target. The goal is to make the same pace
              happen at a lower HR, then make that faster.
            </span>
          </div>
        </Panel>

        <Panel className="paces-panel">
          <SectionHeader
            eyebrow="RUN ENGINE"
            title="Pace zones from your current 2-mile."
            action={<button type="button" className="text-button" onClick={() => onNavigate('run')}>Run Lab <ChevronRight size={15} /></button>}
          />
          <div className="pace-list">
            {paces.slice(1, 4).map((zone) => (
              <div key={zone.name} className="pace-row">
                <div>
                  <span className="pace-short">{zone.short}</span>
                  <strong>{zone.name}</strong>
                </div>
                <span>{formatPaceRange(zone.fast, zone.slow)}</span>
                <small>{zone.hr}</small>
              </div>
            ))}
          </div>
          <div className="pace-callout">
            <Footprints size={16} />
            <span>
              Easy runs are <strong>{formatPaceRange(paces[1].fast, paces[1].slow)}</strong>. If you are
              breathing hard, the pace is too fast for the day.
            </span>
          </div>
        </Panel>
      </section>

      <div className="dashboard-disclaimer">
        <span className="micro-label">DEVICE NOTE</span>
        <p>
          Everything — profile, plan, logs, and lift history — is stored on this device only. Export a
          backup from <strong>Profile → Device Data</strong> before clearing app data or changing phones.
          This app is a training tool, not medical advice.
        </p>
      </div>
    </div>
  )
}
