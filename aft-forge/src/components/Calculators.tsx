import { useState } from 'react'
import { Check, ExternalLink, Ruler, Save, Target } from 'lucide-react'
import type { EventKey, Profile, Scores } from '../types'
import {
  ageGroup,
  computeAft,
  EVENT_KEYS,
  EVENT_META,
  formatThreshold,
  maxWaist,
  scoreThresholds,
  thresholdForPoints,
  waistToHeight,
} from '../lib/scoring'
import { Eyebrow, Panel, Pill, ProgressBar, Ring, SectionHeader } from './ui'

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min))
}

function TimeInput({
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

export function Calculators({
  profile,
  onUpdateProfile,
}: {
  profile: Profile
  onUpdateProfile: (profile: Profile) => void
}) {
  const [draft, setDraft] = useState<Scores>(profile.scores)
  const [heightDraft, setHeightDraft] = useState(profile.heightIn)
  const [waistDraft, setWaistDraft] = useState(profile.waistIn)
  const [saved, setSaved] = useState(false)
  const [bodySaved, setBodySaved] = useState(false)

  const result = computeAft(draft, profile, profile.standard)
  const ratio = waistToHeight(waistDraft, heightDraft)
  const limit = maxWaist(heightDraft)

  function updateScore(event: EventKey, value: number) {
    setDraft((current) => ({ ...current, [event]: value }))
    setSaved(false)
  }

  function saveAll() {
    onUpdateProfile({
      ...profile,
      scores: draft,
      heightIn: heightDraft,
      waistIn: waistDraft,
    })
    setSaved(true)
    setBodySaved(true)
    window.setTimeout(() => {
      setSaved(false)
      setBodySaved(false)
    }, 2200)
  }

  return (
    <div className="calc-page">
      <div className="calc-hero-grid">
        <Panel className="calc-score-panel">
          <div className="calc-copy">
            <Eyebrow>AFT SCORE CALCULATOR</Eyebrow>
            <h2>{result.passed ? 'Inside standard.' : 'Not yet a go.'}</h2>
            <p>
              Age {profile.age} ({ageGroup(profile.age)} band) · {profile.sex === 'male' ? 'Male' : 'Female'} ·{' '}
              {profile.standard === 'combat' ? 'Combat, sex-neutral' : 'General, sex- and age-normed'}.
              Model uses the official AFT tables effective 1 June 2025.
            </p>
            <div className="calc-badges">
              <Pill tone={result.passed ? 'lime' : 'red'} dot>{result.passed ? 'PASS' : 'FAIL'}</Pill>
              <Pill tone={result.minimumMet ? 'lime' : 'red'}>{result.minimumMet ? '60+ EVERY EVENT' : 'EVENT MIN MISSED'}</Pill>
              <Pill tone={result.total >= 450 ? 'lime' : 'amber'}>TARGET 450</Pill>
            </div>
            <button type="button" className="button button-primary" onClick={saveAll}>
              {saved && bodySaved ? <Check size={16} /> : <Save size={16} />}
              {saved && bodySaved ? 'Saved to profile' : 'Save scores + measurements'}
            </button>
          </div>
          <div className="calc-ring">
            <Ring
              value={result.total}
              max={500}
              size={200}
              label={String(result.total)}
              sublabel="OF 500"
              tone={result.total >= 450 ? 'lime' : result.total >= 350 ? 'amber' : 'red'}
              caption={`${result.total - result.targetTotal >= 0 ? '+' : ''}${result.total - result.targetTotal} vs standard`}
            />
          </div>
        </Panel>

        <Panel className="calc-whtr-panel">
          <div className="panel-topline">
            <Eyebrow>WAIST-TO-HEIGHT CALCULATOR</Eyebrow>
            <Pill tone={ratio < 0.55 ? 'lime' : 'red'}>{ratio < 0.55 ? 'PASS' : 'FAIL'}</Pill>
          </div>
          <div className="whtr-hero">
            <div>
              <strong>{ratio.toFixed(3)}</strong>
              <span>ratio</span>
            </div>
            <div>
              <strong>{limit.toFixed(1)}</strong>
              <span>max waist (in)</span>
            </div>
          </div>
          <div className="whtr-gauge">
            <div className="whtr-fill" style={{ width: `${Math.min(100, (ratio / 0.62) * 100)}%` }} />
            <span className="whtr-mark" style={{ left: `${(0.55 / 0.62) * 100}%` }} />
            <span className="whtr-label">0.550</span>
          </div>
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
          <p className="whtr-copy">
            Measure at the navel, end of a normal exhale, tape snug but not compressing skin.
          </p>
          <a className="source-link" href="https://www.army.mil/article/293753/army_modifies_body_composition_program_adopts_waist_to_height_ratio" target="_blank" rel="noreferrer">
            WHtR policy <ExternalLink size={13} />
          </a>
        </Panel>
      </div>

      <div className="calc-layout">
        <div className="calc-main">
          <Panel className="event-panel">
            <SectionHeader
              eyebrow="EVENT INPUTS"
              title="Enter the five events."
              description="Use a real test or a recent best effort. The model updates instantly."
              action={<Pill tone={result.total >= 450 ? 'lime' : 'amber'}>{Math.max(0, 450 - result.total)} PTS TO 450</Pill>}
            />
            <div className="event-input-grid">
              {EVENT_KEYS.map((event) => {
                const meta = EVENT_META[event]
                const score = result.eventScores[event]
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
                        <TimeInput seconds={draft[event]} onChange={(value) => updateScore(event, value)} />
                      ) : (
                        <div className="number-input">
                          <input
                            type="number"
                            min={0}
                            max={event === 'mdl' ? 700 : 200}
                            value={draft[event]}
                            onChange={(input) =>
                              updateScore(event, clampNumber(Number(input.target.value), 0, event === 'mdl' ? 700 : 200))
                            }
                          />
                          <span>{meta.unit}</span>
                        </div>
                      )}
                    </div>
                    <div className="event-input-meta">
                      <span>
                        90-pt:{' '}
                        <strong>
                          {thresholdForPoints(event, 90, profile, profile.standard) ?? '—'}
                          {meta.unit === 'lb' ? ' lb' : ''}
                        </strong>
                      </span>
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
              eyebrow="SCORE TABLE"
              title="What each point costs."
              description="Use this to decide which event gets your next training hour."
            />
            <div className="calc-table-grid">
              {EVENT_KEYS.map((event) => (
                <div key={event} className="calc-table-card">
                  <div className="calc-table-head">
                    <span className={`event-icon small event-${event}`}>{EVENT_META[event].short}</span>
                    <strong>{EVENT_META[event].label}</strong>
                  </div>
                  {scoreThresholds(event, profile, profile.standard).map((row) => (
                    <div key={row.points} className={`calc-table-row ${result.eventScores[event].score >= row.points ? 'achieved' : ''}`}>
                      <span>{row.points}</span>
                      <strong>{row.value ? formatThreshold(event, row.value) : '—'}</strong>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <aside className="calc-side">
          <Panel className="target-panel">
            <SectionHeader eyebrow="TARGET 450" title="90-point targets." />
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
                    <span className={current >= 90 ? 'target-hit' : 'target-gap'}>
                      {current >= 90 ? 'HIT' : `${90 - current} to go`}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="target-sum">
              <Target size={16} />
              <span>90 × 5 = 450. No single event needs a max score.</span>
            </div>
          </Panel>

          <Panel className="calc-score-panel-secondary">
            <Eyebrow>SCORE MATH</Eyebrow>
            <div className="aft-math-row"><span>Current</span><strong>{result.total}</strong></div>
            <div className="aft-math-row"><span>Standard</span><strong>{result.targetTotal}</strong></div>
            <div className="aft-math-row">
              <span>Margin</span>
              <strong className={result.total >= result.targetTotal ? 'good' : 'bad'}>
                {result.total - result.targetTotal >= 0 ? '+' : ''}{result.total - result.targetTotal}
              </strong>
            </div>
            <div className="aft-math-row"><span>Lowest event</span><strong>{result.lowest}</strong></div>
            <div className="aft-math-bar">
              <ProgressBar value={result.total} max={500} tone={result.total >= 450 ? 'lime' : 'amber'} />
            </div>
          </Panel>

          <Panel className="calc-note-panel">
            <Ruler size={18} />
            <div>
              <strong>Measure the same way every week.</strong>
              <p>
                Small measurement errors do not break the plan. Keep the tape placement and scale
                conditions consistent so the trend is readable.
              </p>
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  )
}