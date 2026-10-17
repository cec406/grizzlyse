import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  ExternalLink,
  Info,
  Ruler,
  Save,
  ShieldAlert,
  ShieldCheck,
  Target,
} from 'lucide-react'
import type { AftResult, EventKey, Profile, Scores } from '../types'
import {
  computeAft,
  EVENT_KEYS,
  EVENT_META,
  ageGroup,
  formatThreshold,
  maxWaist,
  scoreThresholds,
  secondsToTime,
  thresholdForPoints,
  waistToHeight,
} from '../lib/scoring'
import { formatInches, formatPace, twoMilePace } from '../lib/metrics'
import { Eyebrow, Panel, Pill, ProgressBar, Ring, SectionHeader } from './ui'

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min))
}

function TimeInput({
  seconds,
  onChange,
  label,
}: {
  seconds: number
  onChange: (value: number) => void
  label: string
}) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return (
    <div className="time-input" aria-label={label}>
      <input
        type="number"
        min={0}
        max={59}
        value={minutes}
        onChange={(event) => onChange(clampNumber(Number(event.target.value), 0, 59) * 60 + secs)}
      />
      <span>:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={secs}
        onChange={(event) => onChange(minutes * 60 + clampNumber(Number(event.target.value), 0, 59))}
      />
    </div>
  )
}

export function AftLab({
  profile,
  onSaveScores,
  onSaveBody,
  onUpdateProfile,
}: {
  profile: Profile
  onSaveScores: (scores: Scores) => void
  onSaveBody: (weightLb: number, waistIn: number) => void
  onUpdateProfile: (profile: Profile) => void
}) {
  const [draft, setDraft] = useState<Scores>(profile.scores)
  const [waistDraft, setWaistDraft] = useState(profile.waistIn)
  const [heightDraft, setHeightDraft] = useState(profile.heightIn)
  const [selectedEvent, setSelectedEvent] = useState<EventKey>('run')
  const [saved, setSaved] = useState(false)
  const [bodySaved, setBodySaved] = useState(false)

  const result: AftResult = computeAft(draft, profile, profile.standard)
  const ratio = waistToHeight(waistDraft, heightDraft)
  const limit = maxWaist(heightDraft)
  const targetRun = thresholdForPoints('run', 90, profile, profile.standard)

  function updateScore(event: EventKey, value: number) {
    setDraft((current) => ({ ...current, [event]: value }))
    setSaved(false)
  }

  function saveScores() {
    onSaveScores(draft)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  function saveBody() {
    onUpdateProfile({ ...profile, heightIn: heightDraft, waistIn: waistDraft })
    onSaveBody(profile.weightLb, waistDraft)
    setBodySaved(true)
    window.setTimeout(() => setBodySaved(false), 2200)
  }

  function setStandard(standard: Profile['standard']) {
    onUpdateProfile({ ...profile, standard })
  }

  return (
    <div className="aft-page">
      <div className="aft-hero-grid">
        <Panel className="aft-score-hero">
          <div className="aft-score-copy">
            <Eyebrow>AFT SCORE MODEL / {profile.standard === 'combat' ? 'COMBAT STANDARD' : 'GENERAL STANDARD'}</Eyebrow>
            <h2>{result.passed ? 'Inside standard.' : 'Not yet a go.'}</h2>
            <p>
              Age {profile.age} · {profile.sex === 'male' ? 'Male' : 'Female'} · {profile.standard === 'combat' ? 'Combat, sex-neutral' : 'General, sex- and age-normed'}.
              The model uses the official AFT tables effective 1 June 2025.
            </p>
            <div className="aft-score-badges">
              <Pill tone={result.passed ? 'lime' : 'red'} dot>{result.passed ? 'PASS' : 'FAIL'}</Pill>
              <Pill tone={result.minimumMet ? 'lime' : 'red'}>{result.minimumMet ? '60+ EVERY EVENT' : 'EVENT MINIMUM MISSED'}</Pill>
              <Pill tone={result.total >= 450 ? 'lime' : 'amber'}>TARGET 450</Pill>
            </div>
            <div className="aft-score-actions">
              <button type="button" className="button button-primary" onClick={saveScores}>
                {saved ? <Check size={16} /> : <Save size={16} />}
                {saved ? 'Saved to profile' : 'Save as current'}
              </button>
              <button
                type="button"
                className="button button-ghost"
                onClick={() => setDraft(profile.scores)}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="aft-score-ring">
            <Ring
              value={result.total}
              max={500}
              size={210}
              label={String(result.total)}
              sublabel="OF 500"
              tone={result.total >= 450 ? 'lime' : result.total >= 350 ? 'amber' : 'red'}
              caption={`${result.total - result.targetTotal >= 0 ? '+' : ''}${result.total - result.targetTotal} vs standard`}
            />
            <div className="aft-ring-legend">
              <span><i className="legend-dot lime" /> 450 target</span>
              <span><i className="legend-dot amber" /> 350 combat pass</span>
              <span><i className="legend-dot red" /> 300 general pass</span>
            </div>
          </div>
        </Panel>

        <Panel className="standard-panel">
          <div className="panel-topline">
            <Eyebrow>STANDARD</Eyebrow>
            <span className="micro-label">{profile.mos ? `${profile.mos} → ${profile.standard.toUpperCase()}` : `${profile.standard.toUpperCase()} STANDARD`}</span>
          </div>
          <div className="segmented">
            <button
              type="button"
              className={profile.standard === 'general' ? 'active' : ''}
              onClick={() => setStandard('general')}
            >
              General
              <small>300 / 60 min</small>
            </button>
            <button
              type="button"
              className={profile.standard === 'combat' ? 'active' : ''}
              onClick={() => setStandard('combat')}
            >
              Combat
              <small>350 / 60 min</small>
            </button>
          </div>
          <div className="standard-note">
            <ShieldCheck size={17} />
            <p>
              Scoring uses the official AFT tables for <strong>{profile.sex === 'male' ? 'male' : 'female'}, age band {ageGroup(profile.age)}</strong> (you
              are {profile.age}). Change age or sex in Profile and every table, target, and plan recalculates.
            </p>
          </div>
          <div className="standard-grid">
            <div><span>AGE BAND</span><strong>{ageGroup(profile.age)}</strong></div>
            <div><span>SEX</span><strong>{profile.sex === 'male' ? 'MALE' : 'FEMALE'}</strong></div>
            <div><span>STANDARD</span><strong>{profile.standard.toUpperCase()}</strong></div>
            <div><span>TARGET</span><strong>{profile.standard === 'combat' ? 350 : 300}</strong></div>
          </div>
          <a className="source-link" href="https://www.army.mil/aft" target="_blank" rel="noreferrer">
            Official AFT site <ExternalLink size={13} />
          </a>
        </Panel>
      </div>

      <div className="aft-layout">
        <div className="aft-main">
          <Panel className="event-panel">
            <SectionHeader
              eyebrow="EVENT INPUTS"
              title="Score the five events."
              description="Change any field and the model updates live. Use a real test or a recent best effort."
              action={
                <Pill tone={result.total >= 450 ? 'lime' : 'amber'}>
                  {result.total >= 450 ? 'TARGET HIT' : `${Math.max(0, 450 - result.total)} PTS TO 450`}
                </Pill>
              }
            />
            <div className="event-input-grid">
              {EVENT_KEYS.map((event) => {
                const meta = EVENT_META[event]
                const score = result.eventScores[event]
                const target = thresholdForPoints(event, 90, profile, profile.standard)
                return (
                  <div key={event} className={`event-input-card ${score.score < 60 ? 'event-fail' : ''}`}>
                    <div className="event-input-head">
                      <div>
                        <span className={`event-icon event-${event}`}>{meta.short}</span>
                        <strong>{meta.label}</strong>
                      </div>
                      <span className={`event-score ${score.score >= 90 ? 'good' : score.score >= 60 ? 'ok' : 'bad'}`}>
                        {score.score}
                      </span>
                    </div>
                    <p>{meta.description}</p>
                    <div className="event-input-control">
                      {meta.unit === 'time' ? (
                        <TimeInput
                          label={meta.label}
                          seconds={draft[event]}
                          onChange={(value) => updateScore(event, value)}
                        />
                      ) : (
                        <div className="number-input">
                          <input
                            type="number"
                            min={event === 'mdl' ? 0 : 0}
                            max={event === 'mdl' ? 700 : 200}
                            value={draft[event]}
                            onChange={(input) => updateScore(event, clampNumber(Number(input.target.value), 0, event === 'mdl' ? 700 : 200))}
                          />
                          <span>{meta.unit}</span>
                        </div>
                      )}
                    </div>
                    <div className="event-input-meta">
                      <span>90-pt: <strong>{target ? (meta.unit === 'time' ? target : `${target} ${meta.unit}`) : '—'}</strong></span>
                      {score.nextScore && score.nextThreshold !== null && (
                        <span>
                          Next: <strong>{score.nextScore} pts</strong> @ {meta.unit === 'time' ? secondsToTime(score.nextThreshold) : score.nextThreshold}
                        </span>
                      )}
                    </div>
                    <div className="event-mini-bar">
                      <div style={{ width: `${score.score}%` }} />
                      <i style={{ left: '90%' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>

          <Panel className="score-table-panel">
            <SectionHeader
              eyebrow="SCORING TABLE"
              title="What each point costs."
              description="Selected age group and standard. Use this to choose which event gets your next training hour."
              action={
                <div className="event-tabs">
                  {EVENT_KEYS.map((event) => (
                    <button
                      key={event}
                      type="button"
                      className={selectedEvent === event ? 'active' : ''}
                      onClick={() => setSelectedEvent(event)}
                    >
                      {EVENT_META[event].short}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="score-table">
              <div className="score-table-head">
                <span>POINTS</span>
                <span>THRESHOLD</span>
                <span>YOUR GAP</span>
              </div>
              {scoreThresholds(selectedEvent, profile, profile.standard).map((row) => {
                const currentScore = result.eventScores[selectedEvent].score
                const gap = row.points - currentScore
                return (
                  <div key={row.points} className={`score-table-row ${currentScore >= row.points ? 'achieved' : ''}`}>
                    <span>{row.points}</span>
                    <strong>{row.value ? formatThreshold(selectedEvent, row.value) : '—'}</strong>
                    <span>{gap <= 0 ? 'HIT' : `+${gap}`}</span>
                  </div>
                )
              })}
            </div>
            <div className="score-table-note">
              <Info size={15} />
              <p>
                The 90-point row is the app’s working target. It produces a 450 total without
                requiring a max effort on any single event. For your profile, that means a {targetRun ?? '15:50'} 2-mile.
              </p>
            </div>
          </Panel>

          <Panel className="testday-panel">
            <SectionHeader
              eyebrow="TEST-DAY EXECUTION"
              title="Execute the test cleanly."
              description="You do not need a new engine to add points. You need clean reps, even pacing, and controlled transitions."
            />
            <div className="testday-grid">
              <div>
                <span className="testday-label">OPENING / 45 MIN OUT</span>
                <p>10 min easy movement, dynamic hips/ankles/shoulders, 2×10 HRP, 2×20 sec plank. Stay warm, not tired.</p>
              </div>
              <div>
                <span className="testday-label">MDL STRATEGY</span>
                <p>Open at a weight you have already lifted in training. Take the safe weight first; a failed attempt costs an attempt.</p>
              </div>
              <div>
                <span className="testday-label">HRP STRATEGY</span>
                <p>Start in sets of 5–8 with short pauses in the front leaning rest. Every rep is full T and chest/thighs together.</p>
              </div>
              <div>
                <span className="testday-label">SDC STRATEGY</span>
                <p>Transitions cost the most time. Turn the sled with your legs and keep the kettlebells under control.</p>
              </div>
              <div>
                <span className="testday-label">PLANK STRATEGY</span>
                <p>Squeeze glutes, tuck ribs, breathe through the nose. Hold 5–10 sec past your target, then stop.</p>
              </div>
              <div>
                <span className="testday-label">2-MILE STRATEGY</span>
                <p>First mile controlled, no sprinting in the first 800 m. Hold rhythm, then push the last 400 m.</p>
              </div>
            </div>
            <div className="testday-warning">
              <ShieldAlert size={16} />
              <span>If you have chest pain, dizziness, unusual shortness of breath, or you are not cleared to test, stop and get medical guidance.</span>
            </div>
          </Panel>
        </div>

        <aside className="aft-side">
          <Panel className="whtr-panel">
            <div className="panel-topline">
              <Eyebrow>WAIST-TO-HEIGHT</Eyebrow>
              <Pill tone={ratio < 0.55 ? 'lime' : 'red'}>{ratio < 0.55 ? 'PASS' : 'FAIL'}</Pill>
            </div>
            <div className="whtr-hero">
              <div>
                <strong>{ratio.toFixed(3)}</strong>
                <span>ratio</span>
              </div>
              <div>
                <strong>{formatInches(limit)}</strong>
                <span>max waist</span>
              </div>
            </div>
            <div className="whtr-gauge">
              <div className="whtr-fill" style={{ width: `${Math.min(100, (ratio / 0.62) * 100)}%` }} />
              <span className="whtr-mark" style={{ left: `${(0.55 / 0.62) * 100}%` }} />
              <span className="whtr-label">0.550</span>
            </div>
            <p className="whtr-copy">
              Measure at the navel, end of a normal exhale, tape snug but not compressing skin. Under
              0.55 is compliant. This is the gate, not the AFT.
            </p>
            <div className="inline-form">
              <label>
                <span>HEIGHT (IN)</span>
                <input
                  type="number"
                  step="0.5"
                  value={heightDraft}
                  onChange={(event) => setHeightDraft(clampNumber(Number(event.target.value), 48, 90))}
                />
              </label>
              <label>
                <span>WAIST (IN)</span>
                <input
                  type="number"
                  step="0.25"
                  value={waistDraft}
                  onChange={(event) => setWaistDraft(clampNumber(Number(event.target.value), 20, 80))}
                />
              </label>
            </div>
            <button type="button" className="button button-dark button-full" onClick={saveBody}>
              {bodySaved ? <Check size={15} /> : <Ruler size={15} />}
              {bodySaved ? 'Waist logged' : 'Log waist measurement'}
            </button>
            <div className="whtr-foot">
              <span>Current: {formatInches(profile.waistIn)}</span>
              <span>Goal: {formatInches(profile.goalWaistIn)}</span>
            </div>
          </Panel>

          <Panel className="target-panel">
            <SectionHeader eyebrow="TARGET 450" title="The clean path." />
            <div className="target-list">
              {EVENT_KEYS.map((event) => {
                const target = thresholdForPoints(event, 90, profile, profile.standard)
                const current = result.eventScores[event].score
                return (
                  <div key={event} className="target-row">
                    <span className={`event-icon small event-${event}`}>{EVENT_META[event].short}</span>
                    <div>
                      <strong>{target ? formatThreshold(event, target) : '—'}</strong>
                      <small>90 points</small>
                    </div>
                    <span className={current >= 90 ? 'target-hit' : 'target-gap'}>{current >= 90 ? 'HIT' : `${90 - current} to go`}</span>
                  </div>
                )
              })}
            </div>
            <div className="target-sum">
              <Target size={16} />
              <span>90 × 5 = 450. No single event needs a max score.</span>
            </div>
          </Panel>

          <Panel className="cft-panel">
            <div className="panel-topline">
              <Eyebrow>COMBAT FIELD TEST</Eyebrow>
              <Pill tone="neutral">OPTIONAL</Pill>
            </div>
            <h3>Know it. Don’t train for it yet.</h3>
            <p>
              The CFT is a seven-event continuous test with a 30-minute cap for 24 combat MOSs. It does
              not replace the AFT. <strong>Support MOSs are not required to take it.</strong>
            </p>
            <div className="cft-events">
              {[
                '1-mile run',
                '30 dead-stop push-ups',
                '100 m sprint',
                '16 × 40 lb sandbag lifts',
                '50 m water-can carry',
                '50 m high crawl + rush',
                '1-mile run',
              ].map((event, index) => (
                <div key={event}><span>{String(index + 1).padStart(2, '0')}</span>{event}</div>
              ))}
            </div>
            <div className="cft-note">
              <ShieldAlert size={15} />
              <span>Train the AFT first; add CFT work in a later block if your MOS requires it.</span>
            </div>
            <a className="source-link" href="https://www.army.mil/article/291880/army_announces_combat_field_test_to_enhance_soldier_readiness" target="_blank" rel="noreferrer">
              CFT announcement <ExternalLink size={13} />
            </a>
          </Panel>

          <Panel className="aft-math-panel">
            <Eyebrow>SCORE MATH</Eyebrow>
            <div className="aft-math-row">
              <span>Current</span>
              <strong>{result.total}</strong>
            </div>
            <div className="aft-math-row">
              <span>Standard</span>
              <strong>{result.targetTotal}</strong>
            </div>
            <div className="aft-math-row">
              <span>Margin</span>
              <strong className={result.total >= result.targetTotal ? 'good' : 'bad'}>
                {result.total - result.targetTotal >= 0 ? '+' : ''}{result.total - result.targetTotal}
              </strong>
            </div>
            <div className="aft-math-row">
              <span>Lowest event</span>
              <strong>{result.lowest}</strong>
            </div>
            <div className="aft-math-bar">
              <ProgressBar value={result.total} max={500} tone={result.total >= 450 ? 'lime' : 'amber'} />
            </div>
            <p>Current run pace: <strong>{formatPace(twoMilePace(draft.run))} /mi</strong></p>
          </Panel>
        </aside>
      </div>

      <Panel className="aft-disclaimer">
        <ClipboardCheck size={18} />
        <div>
          <strong>Official scorekeeping lives in DTMS, not this app.</strong>
          <p>
            This calculator uses the published AFT tables and is built for training decisions. Grader
            standards, profiles, and unit policy control the record test. If an event is close, train
            margin — not the minimum.
          </p>
        </div>
        <a className="button button-ghost" href="https://www.army.mil/aft" target="_blank" rel="noreferrer">
          Standards <ArrowRight size={14} />
        </a>
      </Panel>
    </div>
  )
}
