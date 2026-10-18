import { useState } from 'react'
import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Footprints,
  HeartPulse,
  Info,
  Save,
  Timer,
  Watch,
  Zap,
} from 'lucide-react'
import type { LogState, Profile, WeekPlan } from '../types'
import {
  estimateVdot,
  formatPace,
  formatPaceRange,
  hrZones,
  maxHrReference,
  paceZones,
  runSplitPlan,
  twoMilePace,
} from '../lib/metrics'
import { estimateRunAtWeight, secondsToTime, thresholdForPoints, timeToSeconds } from '../lib/scoring'
import { getWeekForDate, sessionTypeLabel } from '../lib/plan'
import { downloadIcs } from '../lib/ics'
import { todayISO } from '../lib/date'
import { Eyebrow, KeyValue, Panel, Pill, ProgressBar, SectionHeader, Stat } from './ui'
import { orDash } from '../lib/metrics'

function TimeField({
  seconds,
  onChange,
}: {
  seconds: number
  onChange: (value: number) => void
}) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return (
    <div className="time-input">
      <input
        type="number"
        min={0}
        max={59}
        value={minutes}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value)) * 60 + secs)}
      />
      <span>:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={secs}
        onChange={(event) => onChange(minutes * 60 + Math.min(59, Math.max(0, Number(event.target.value))))}
      />
    </div>
  )
}

export function RunLab({
  profile,
  logs,
  program,
  onUpdateProfile,
}: {
  profile: Profile
  logs: LogState
  program: WeekPlan[]
  onUpdateProfile: (profile: Profile) => void
}) {
  const [runDraft, setRunDraft] = useState(profile.scores.run)
  const [targetDraft, setTargetDraft] = useState(
    timeToSeconds(thresholdForPoints('run', 90, profile, profile.standard) ?? ''),
  )
  const [saved, setSaved] = useState(false)
  const week = getWeekForDate(program, todayISO()) ?? program[0]
  const paces = paceZones(runDraft, profile.maxHr)
  const zones = hrZones(profile.maxHr)
  const vdot = estimateVdot(runDraft)
  const projected = estimateRunAtWeight(runDraft, profile.weightLb, profile.goalWeightLb)
  const currentPace = twoMilePace(runDraft)
  const targetPace = twoMilePace(targetDraft)
  const splits = runSplitPlan(targetDraft)
  const hrRef = maxHrReference(profile.age)
  const runSessions = week?.days.filter((day) => day.type === 'run' || day.type === 'aft') ?? []
  const completedRuns = runSessions.filter((day) => logs.completed[day.id]).length
  const goalThreshold = thresholdForPoints('run', 90, profile, profile.standard)

  function saveRun() {
    onUpdateProfile({ ...profile, scores: { ...profile.scores, run: runDraft } })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="run-page">
      <div className="run-hero-grid">
        <Panel className="run-hero">
          <div className="run-hero-copy">
            <Eyebrow>RUN LAB / 2-MILE ENGINE</Eyebrow>
            <h2>Aerobic base is what moves the 2-mile.</h2>
            <p>
              Your current 2-mile is {secondsToTime(profile.scores.run)} ({formatPace(currentPace)} /mi) at
              your observed max HR. Improvement comes from more easy volume, one threshold session, one
              AFT-specific session, and less body weight to carry. Use the watch for data, not as the coach.
            </p>
            <div className="run-hero-stats">
              <div><span>VDOT EST.</span><strong>{runDraft > 0 ? vdot.toFixed(1) : '—'}</strong></div>
              <div><span>CURRENT PACE</span><strong>{runDraft > 0 ? formatPace(currentPace) : '—'}</strong></div>
              <div><span>TARGET PACE</span><strong>{targetDraft > 0 ? formatPace(targetPace) : '—'}</strong></div>
              <div><span>AT {orDash(profile.goalWeightLb)} LB</span><strong>{profile.weightLb && profile.goalWeightLb ? secondsToTime(projected) : '—'}</strong></div>
            </div>
          </div>
          <div className="run-hero-input">
            <div className="panel-topline">
              <Eyebrow>CURRENT 2-MILE</Eyebrow>
              <Pill tone="amber">BASELINE</Pill>
            </div>
            <TimeField seconds={runDraft} onChange={setRunDraft} />
            <div className="run-input-meta">
              <span>{formatPace(twoMilePace(runDraft))} /mi</span>
              <span>Observed max HR</span>
            </div>
            <button type="button" className="button button-primary button-full" onClick={saveRun}>
              {saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? 'Saved' : 'Save current time'}
            </button>
            <div className="run-target">
              <label>
                <span>90-POINT TARGET</span>
                <strong>{goalThreshold ?? '—'}</strong>
              </label>
              <label>
                <span>YOUR TARGET</span>
                <TimeField seconds={targetDraft} onChange={setTargetDraft} />
              </label>
            </div>
          </div>
        </Panel>

        <Panel className="hr-panel">
          <div className="panel-topline">
            <Eyebrow>HEART RATE</Eyebrow>
            <Pill tone="blue">OBSERVED MAX HR</Pill>
          </div>
          <div className="hr-hero">
            <div>
              <strong>{orDash(profile.maxHr)}</strong>
              <span>bpm observed</span>
            </div>
            <div>
              <strong>{orDash(hrRef.tanaka)}</strong>
              <span>Tanaka estimate</span>
            </div>
          </div>
          <p>
            The age formula is only an estimate. If you have an observed max HR, use it for zones
            instead of 220-age.
          </p>
          <div className="hr-zone-list">
            {zones.map((zone) => (
              <div key={zone.zone} className="hr-zone-row">
                <span className="hr-zone-code">{zone.zone}</span>
                <strong>{zone.name}</strong>
                <span>{zone.low ?? '—'}–{zone.high ?? '—'}</span>
                <small>{zone.use}</small>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="run-layout">
        <div className="run-main">
          <Panel className="pace-panel">
            <SectionHeader
              eyebrow="TRAINING PACES"
              title="The zones that actually move the score."
              description="Paces are anchored to your current 2-mile fitness. The goal is to make the easy pace faster over time, not to run every day at test pace."
              action={<Pill tone="lime">80% EASY / 20% HARD</Pill>}
            />
            <div className="pace-zone-grid">
              {paces.map((zone, index) => (
                <div key={zone.name} className={`pace-zone-card ${index === 1 ? 'featured' : ''}`}>
                  <div className="pace-zone-head">
                    <span>{zone.short}</span>
                    <strong>{zone.name}</strong>
                    {index === 1 && <Pill tone="lime">MOST IMPORTANT</Pill>}
                  </div>
                  <div className="pace-zone-pace">{formatPaceRange(zone.fast, zone.slow)}</div>
                  <div className="pace-zone-hr">{zone.hr}</div>
                  <p>{zone.purpose}</p>
                </div>
              ))}
            </div>
          </Panel>

          <div className="run-two-col">
            <Panel className="race-plan-panel">
              <SectionHeader
                eyebrow="RACE PLAN"
                title={`${secondsToTime(targetDraft)} execution`}
                description="Even or slightly negative splits. The first mile should feel too easy; the last 800 m is where the effort goes up."
              />
              <div className="race-splits">
                {splits.map((split) => (
                  <div key={split.label} className="race-split">
                    <span>{split.label}</span>
                    <strong>{secondsToTime(split.split)}</strong>
                    <small>cum {secondsToTime(split.cumulative)}</small>
                  </div>
                ))}
                <div className="race-split">
                  <span>400 m average</span>
                  <strong>{secondsToTime(Math.round(targetDraft / 8))}</strong>
                  <small>8 laps</small>
                </div>
              </div>
              <div className="race-cues">
                <div><span>0–800 m</span><strong>Control the breath. Do not chase the fast starter.</strong></div>
                <div><span>800–1600 m</span><strong>Lock the rhythm. Relax the shoulders. Hold the pace.</strong></div>
                <div><span>1600–3218 m</span><strong>Increase effort, not stride length. Push the final 400 m.</strong></div>
              </div>
              <div className="race-hr">
                <HeartPulse size={16} />
                <span>First mile: {zones[3].low ?? '—'}–{zones[3].high ?? '—'} bpm. Second mile: {zones[4].low ?? '—'}–{zones[4].high ?? '—'} bpm. Final 400 m: all-out.</span>
              </div>
            </Panel>

            <Panel className="weight-engine-panel">
              <SectionHeader
                eyebrow="WEIGHT → SPEED"
                title="Less weight, faster pace."
                description="At the same absolute aerobic capacity, less body weight means more oxygen per kilogram. This is a model, not a promise."
              />
              <div className="weight-engine">
                <div>
                  <span>NOW</span>
                  <strong>{orDash(profile.weightLb)} lb</strong>
                  <small>{runDraft > 0 ? secondsToTime(runDraft) : '—'}</small>
                </div>
                <ArrowRight size={18} />
                <div>
                  <span>GOAL</span>
                  <strong>{orDash(profile.goalWeightLb)} lb</strong>
                  <small>{profile.weightLb && profile.goalWeightLb ? secondsToTime(projected) : '—'}</small>
                </div>
              </div>
              <div className="weight-gain">
                <Zap size={16} />
                <span>
                  Modeled change: <strong>{profile.weightLb && profile.goalWeightLb && runDraft > 0 ? secondsToTime(Math.max(0, runDraft - projected)) : '—'}</strong> on your 2-mile
                  at goal weight, before any change in training.
                </span>
              </div>
              <div className="weight-engine-bars">
                <ProgressBar value={profile.weightLb ?? 0} max={Math.max(1, profile.weightLb ?? 1)} label="Current" right={orDash(profile.weightLb)} tone="amber" />
                <ProgressBar value={Math.min(profile.goalWeightLb ?? 0, profile.weightLb ?? 0)} max={Math.max(1, profile.weightLb ?? 1)} label="Goal" right={orDash(profile.goalWeightLb)} tone="lime" />
              </div>
            </Panel>
          </div>

          <Panel className="run-week-panel">
            <SectionHeader
              eyebrow={`WEEK ${week?.number ?? 1} / RUN PRESCRIPTION`}
              title="This week’s engine work."
              description="Two quality sessions and one long easy run. Everything else is strength, recovery, or steps."
              action={<button type="button" className="button button-small button-ghost" onClick={() => downloadIcs(program)}><Download size={14} /> Export</button>}
            />
            <div className="run-session-list">
              {runSessions.map((day) => (
                <div key={day.id} className="run-session-row">
                  <div className="run-session-day">{day.weekday}</div>
                  <div className="run-session-info">
                    <div>
                      <strong>{day.title}</strong>
                      <Pill tone={day.type === 'aft' ? 'amber' : 'blue'}>{sessionTypeLabel(day.type)}</Pill>
                    </div>
                    <p>{day.blocks[0]?.items[0]?.prescription ?? day.intent}</p>
                  </div>
                  <div className="run-session-duration">{day.durationMin} min</div>
                  {logs.completed[day.id] && <Check size={15} className="run-done" />}
                </div>
              ))}
            </div>
            <div className="run-week-progress">
              <ProgressBar value={completedRuns} max={runSessions.length} label="Run sessions complete" right={`${completedRuns}/${runSessions.length}`} />
            </div>
          </Panel>
        </div>

        <aside className="run-side">
          <Panel className="garmin-decision-panel">
            <div className="garmin-head">
              <div className="garmin-icon"><Watch size={19} /></div>
              <div>
                <Eyebrow>GARMIN DECISION</Eyebrow>
                <h3>Coach plan or app-prescribed?</h3>
              </div>
            </div>
            <p>
              A generic Coach plan builds aerobic volume, but it does not know the AFT. Use it across
              your run slots — threshold, easy, and long — not as the whole program.
            </p>
            <div className="garmin-options">
              <button
                type="button"
                className={`garmin-option ${profile.garminOverlay ? 'active' : ''}`}
                onClick={() => onUpdateProfile({ ...profile, garminOverlay: true })}
              >
                <span className="garmin-radio" />
                <div>
                  <strong>Coach overlay ON</strong>
                  <small>Your run slots defer to Garmin Coach (usually 3–4 days a week). AFT rehearsal, SDC, and strength stay prescribed.</small>
                </div>
              </button>
              <button
                type="button"
                className={`garmin-option ${!profile.garminOverlay ? 'active' : ''}`}
                onClick={() => onUpdateProfile({ ...profile, garminOverlay: false })}
              >
                <span className="garmin-radio" />
                <div>
                  <strong>AFT-only plan</strong>
                  <small>Use the watch for HR/pace only. Follow the run lab exactly.</small>
                </div>
              </button>
            </div>
            <div className="garmin-tip">
              <Info size={15} />
              <span>
                Whichever you choose: easy runs at {formatPaceRange(paces[1].fast, paces[1].slow)}, not
                at test pace. Save the hard efforts for scheduled quality days.
              </span>
            </div>
          </Panel>

          <Panel className="engine-stats-panel">
            <SectionHeader eyebrow="ENGINE SNAPSHOT" title="What the numbers say." />
            <div className="engine-stat-grid">
              <Stat label="VDOT" value={vdot.toFixed(1)} detail="estimated" tone="lime" icon={<Activity size={15} />} />
              <Stat label="2-MILE" value={secondsToTime(runDraft)} detail={`${formatPace(currentPace)} /mi`} tone="amber" icon={<Timer size={15} />} />
              <Stat label="GOAL" value={secondsToTime(targetDraft)} detail={`${formatPace(targetPace)} /mi`} tone="blue" icon={<Footprints size={15} />} />
            </div>
            <div className="engine-kv">
              <KeyValue label="Easy HR" value={`${zones[1].low}–${zones[1].high} bpm`} />
              <KeyValue label="Threshold HR" value={`${zones[3].low}–${zones[3].high} bpm`} />
              <KeyValue label="Max HR" value={`${orDash(profile.maxHr)} bpm`} />
              <KeyValue label="Resting HR" value={`${orDash(profile.restingHr)} bpm`} />
            </div>
          </Panel>

          <Panel className="run-rules-panel">
            <Eyebrow>RUN RULES</Eyebrow>
            <div className="rule-list">
              <div><span>01</span><p>Easy runs are conversational. If you cannot speak a full sentence, walk.</p></div>
              <div><span>02</span><p>One threshold day, one AFT-pace day. Do not stack hard runs back-to-back.</p></div>
              <div><span>03</span><p>Increase weekly run time by no more than 10–15%. Your calves and feet need time.</p></div>
              <div><span>04</span><p>If pain changes your gait, stop and take a rest day.</p></div>
            </div>
          </Panel>

          <Panel className="run-note-panel">
            <HeartPulse size={18} />
            <p>
              <strong>Training note:</strong> your observed max HR is used to set zones. If pain changes
              your gait or you feel something that is clearly not normal training stress, stop and get
              evaluated.
            </p>
            <a className="source-link" href="https://www.army.mil/aft" target="_blank" rel="noreferrer">
              AFT standards <ChevronRight size={13} />
            </a>
          </Panel>
        </aside>
      </div>
    </div>
  )
}
