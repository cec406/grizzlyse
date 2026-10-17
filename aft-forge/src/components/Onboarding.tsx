import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Info, Shield, X } from 'lucide-react'
import type { Profile, Scores } from '../types'
import { nextMonday, todayISO } from '../lib/date'
import { Panel, Pill, RestDayPicker, SectionHeader } from './ui'

const STEPS = ['IDENTITY', 'BASELINE', 'BODY', 'SETUP'] as const

/**
 * Numeric fields are held as strings while the wizard is open so the user can
 * clear a field or type a decimal naturally. They are parsed into real numbers
 * only when the profile is created.
 */
type Draft = Omit<
  Profile,
  'age' | 'heightIn' | 'weightLb' | 'waistIn' | 'goalWeightLb' | 'goalWaistIn' | 'maxHr'
> & {
  age: string
  heightIn: string
  weightLb: string
  waistIn: string
  goalWeightLb: string
  goalWaistIn: string
  maxHr: string
}

function numberOr(value: string, fallback: number): number {
  const parsed = Number(value)
  return value.trim() !== '' && Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function TimeField({
  seconds,
  onChange,
  label,
}: {
  seconds: number
  onChange: (seconds: number) => void
  label: string
}) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return (
    <label>
      <span>{label}</span>
      <div className="time-input">
        <input
          type="number"
          min={0}
          max={59}
          inputMode="numeric"
          value={minutes || ''}
          onChange={(event) => {
            const m = Math.max(0, Math.min(59, Number(event.target.value) || 0))
            onChange(m * 60 + secs)
          }}
        />
        <span>:</span>
        <input
          type="number"
          min={0}
          max={59}
          inputMode="numeric"
          value={secs || ''}
          onChange={(event) => {
            const s = Math.max(0, Math.min(59, Number(event.target.value) || 0))
            onChange(minutes * 60 + s)
          }}
        />
      </div>
    </label>
  )
}

export function Onboarding({ onCreate, onCancel }: { onCreate: (profile: Profile) => void; onCancel?: () => void }) {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Draft>(() => ({
    name: '',
    age: '',
    sex: 'male',
    heightIn: '',
    weightLb: '',
    waistIn: '',
    goalWeightLb: '',
    goalWaistIn: '',
    mos: '',
    standard: 'general',
    startDate: '',
    testDate: '',
    restDays: [0, 6],
    trainingDays: 5,
    sessionMinutes: 75,
    maxHr: '',
    restingHr: 60,
    garminOverlay: false,
    sledAccess: false,
    scores: { mdl: 0, hrp: 0, sdc: 0, plk: 0, run: 0 },
  }))

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function updateScore(key: keyof Scores, value: number) {
    setDraft((current) => ({ ...current, scores: { ...current.scores, [key]: value } }))
  }

  function create() {
    const weightLb = numberOr(draft.weightLb, 180)
    const waistIn = numberOr(draft.waistIn, 34)
    const safe: Profile = {
      ...draft,
      name: draft.name.trim() || 'Operator',
      age: numberOr(draft.age, 30),
      heightIn: numberOr(draft.heightIn, 68),
      weightLb,
      waistIn,
      goalWeightLb: numberOr(draft.goalWeightLb, weightLb),
      goalWaistIn: numberOr(draft.goalWaistIn, waistIn),
      maxHr: numberOr(draft.maxHr, 185),
      startDate: draft.startDate || nextMonday(),
      testDate: draft.testDate,
      restDays: draft.restDays.length ? draft.restDays : [0, 6],
      trainingDays: Math.max(2, 7 - (draft.restDays.length ? draft.restDays.length : 2)),
      scores: {
        ...draft.scores,
        sdc: draft.scores.sdc || 180,
        plk: draft.scores.plk || 60,
        run: draft.scores.run || 1200,
      },
    }
    onCreate(safe)
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-brand">
        <div className="brand-mark">
          <Shield size={22} strokeWidth={1.8} />
          <span className="brand-slash" />
        </div>
        <div>
          <div className="brand-name">AFT FORGE</div>
          <div className="brand-sub">SOLDIER PERFORMANCE OS</div>
        </div>
      </div>

      <Panel className="onboarding-panel">
        <div className="onboarding-head">
          <div>
            <SectionHeader
              eyebrow={`SETUP ${step + 1} / ${STEPS.length} · ${STEPS[step]}`}
              title="Build your operator profile."
              description="Everything stays on this device — no account, no cloud. You can change any of this later in Profile."
            />
          </div>
          <div className="onboarding-dots">
            {STEPS.map((label, index) => (
              <span key={label} className={`onboarding-dot ${index === step ? 'active' : ''} ${index < step ? 'done' : ''}`} />
            ))}
          </div>
        </div>

        {step === 0 && (
          <div className="form-grid onboarding-grid">
            <label><span>NAME / RANK</span><input autoFocus value={draft.name} placeholder="Name or rank" onChange={(e) => update('name', e.target.value)} /></label>
            <label><span>AGE</span><input type="number" min={17} max={80} inputMode="numeric" value={draft.age} onChange={(e) => update('age', e.target.value)} /></label>
            <label><span>SEX</span>
              <select value={draft.sex} onChange={(e) => update('sex', e.target.value as Profile['sex'])}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label><span>MOS / TRACK (OPTIONAL)</span><input value={draft.mos} onChange={(e) => update('mos', e.target.value)} /></label>
            <label><span>AFT STANDARD</span>
              <select value={draft.standard} onChange={(e) => update('standard', e.target.value as Profile['standard'])}>
                <option value="general">General — 300 points</option>
                <option value="combat">Combat — 350 points</option>
              </select>
            </label>
            <div className="profile-note">
              <Info size={15} />
              <p>Scoring pulls the official AFT tables for your sex and age band (17–21 through 62+). The run and plank stay sex-neutral events on the combat standard.</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="onboarding-section">
            <div className="form-grid onboarding-grid">
              <label><span>3RM DEADLIFT (LB)</span><input type="number" value={draft.scores.mdl || ''} onChange={(e) => updateScore('mdl', Number(e.target.value) || 0)} /></label>
              <label><span>HRP (REPS)</span><input type="number" value={draft.scores.hrp || ''} onChange={(e) => updateScore('hrp', Number(e.target.value) || 0)} /></label>
              <TimeField label="SDC (M:SS)" seconds={draft.scores.sdc} onChange={(s) => updateScore('sdc', s)} />
              <TimeField label="PLANK (M:SS)" seconds={draft.scores.plk} onChange={(s) => updateScore('plk', s)} />
              <TimeField label="2-MILE (M:SS)" seconds={draft.scores.run} onChange={(s) => updateScore('run', s)} />
            </div>
            <div className="profile-note">
              <Info size={15} />
              <p>Leave events blank if untested — sensible placeholders keep the plan runnable, and the AFT Lab will still score a diagnostic. Enter times as minutes:seconds.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-section">
            <div className="form-grid onboarding-grid">
              <label><span>HEIGHT (IN)</span><input type="number" step="0.5" min={36} max={90} inputMode="decimal" value={draft.heightIn} onChange={(e) => update('heightIn', e.target.value)} /></label>
              <label><span>CURRENT WEIGHT (LB)</span><input type="number" step="0.5" min={80} max={500} inputMode="decimal" value={draft.weightLb} onChange={(e) => update('weightLb', e.target.value)} /></label>
              <label><span>WAIST AT NAVEL (IN)</span><input type="number" step="0.25" min={20} max={80} inputMode="decimal" value={draft.waistIn} onChange={(e) => update('waistIn', e.target.value)} /></label>
              <label><span>GOAL WEIGHT (LB)</span><input type="number" step="0.5" min={80} max={500} inputMode="decimal" value={draft.goalWeightLb} onChange={(e) => update('goalWeightLb', e.target.value)} /></label>
              <label><span>GOAL WAIST (IN)</span><input type="number" step="0.25" min={20} max={80} inputMode="decimal" value={draft.goalWaistIn} onChange={(e) => update('goalWaistIn', e.target.value)} /></label>
              <label><span>OBSERVED MAX HR</span><input type="number" min={100} max={230} inputMode="numeric" value={draft.maxHr} onChange={(e) => update('maxHr', e.target.value)} /></label>
            </div>
            <div className="profile-note">
              <Info size={15} />
              <p>Leave a field blank if you do not have the number yet. Blank fields use neutral defaults, and you can change them later in Profile.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-section">
            <div className="form-grid onboarding-grid">
              <label><span>BLOCK START</span><input type="date" value={draft.startDate} onChange={(e) => update('startDate', e.target.value)} /></label>
              <label><span>TEST DATE (OPTIONAL)</span><input type="date" value={draft.testDate} onChange={(e) => update('testDate', e.target.value)} /></label>
            </div>
            <div className="onboarding-rest">
              <SectionHeader
                eyebrow="WEEKLY RHYTHM"
                title="Which days are rest?"
                description="Most Soldiers keep the weekend off. The plan fills your training days in order."
              />
              <RestDayPicker value={draft.restDays} onChange={(days) => update('restDays', days)} />
            </div>
            <label className="toggle-row">
              <span>SLED ACCESS</span>
              <button
                type="button"
                className={`toggle ${draft.sledAccess ? 'on' : ''}`}
                onClick={() => update('sledAccess', !draft.sledAccess)}
                aria-pressed={draft.sledAccess}
              >
                <span className="toggle-knob" />
              </button>
            </label>
            <div className="profile-note">
              <Info size={15} />
              <p>
                No test date = rolling readiness: the plan cycles build → peak → deload forever, and each
                4-week cycle starts a little harder than the last. Add a test date later in Profile and it
                switches to countdown mode. Toggle sled access off if you rarely have a sled.
              </p>
            </div>
          </div>
        )}

        <div className="onboarding-foot">
          <div className="onboarding-today">
            <Pill tone="neutral">{todayISO()}</Pill>
          </div>
          <div className="onboarding-actions">
            {onCancel && (
              <button type="button" className="button button-ghost" onClick={onCancel}>
                <X size={15} /> Cancel
              </button>
            )}
            {step > 0 && (
              <button type="button" className="button button-ghost" onClick={() => setStep((s) => s - 1)}>
                <ArrowLeft size={15} /> Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" className="button button-primary" onClick={() => setStep((s) => s + 1)}>
                Next <ArrowRight size={15} />
              </button>
            ) : (
              <button type="button" className="button button-primary" onClick={create}>
                <Check size={15} /> Create profile
              </button>
            )}
          </div>
        </div>
      </Panel>
    </div>
  )
}