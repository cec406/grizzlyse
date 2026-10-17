import { useEffect, useMemo, useState } from 'react'
import { Check, Download, Info, Pause, Play, Plus, RotateCcw, Save, Smartphone, Trash2, Upload, X } from 'lucide-react'
import type { DayPlan, LiftEntry, Profile } from '../types'
import type { RosterMember } from '../lib/storage'
import { Modal, Panel, Pill, RestDayPicker, SectionHeader } from './ui'
import { addDays, formatShort, todayISO } from '../lib/date'
import { ageGroup } from '../lib/scoring'
import { readinessBand, readinessScore } from '../lib/metrics'
export function ProfileModal({
  open,
  profile,
  members,
  activeId,
  canInstall,
  installed,
  onClose,
  onSave,
  onReset,
  onSwitchProfile,
  onNewProfile,
  onDeleteProfile,
  onExport,
  onImport,
  onInstall,
}: {
  open: boolean
  profile: Profile
  members: RosterMember[]
  activeId: string | null
  canInstall: boolean
  installed: boolean
  onClose: () => void
  onSave: (profile: Profile) => void
  onReset: () => void
  onSwitchProfile: (id: string) => void
  onNewProfile: () => void
  onDeleteProfile: (id: string) => void
  onExport: () => void
  onImport: (text: string) => boolean
  onInstall: () => void
}) {
  const [draft, setDraft] = useState<Profile>(profile)
  const [importState, setImportState] = useState<'idle' | 'ok' | 'error'>('idle')
  const [lastSync, setLastSync] = useState({ open: false, profile })

  // Derived during render (React's "adjust state when props change" pattern):
  // a fresh open reseeds the draft and clears stale import feedback, while an
  // import-triggered profile update reseeds the draft without wiping the
  // "Backup imported" confirmation.
  if (open !== lastSync.open || profile !== lastSync.profile) {
    const freshOpen = open && !lastSync.open
    setLastSync({ open, profile })
    setDraft(profile)
    if (freshOpen) setImportState('idle')
  }

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function save() {
    onSave({
      ...draft,
      trainingDays: Math.max(2, 7 - draft.restDays.length),
    })
    onClose()
  }

  async function handleImport(file: File | undefined) {
    if (!file) return
    const text = await file.text()
    setImportState(onImport(text) ? 'ok' : 'error')
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Operator Profile"
      eyebrow="CONFIGURATION"
      wide
      footer={
        <>
          <button type="button" className="button button-danger" onClick={onReset}>
            <Trash2 size={15} /> Reset operator data
          </button>
          <button type="button" className="button button-primary" onClick={save}>
            <Save size={15} /> Save profile
          </button>
        </>
      }
    >
      <div className="profile-grid">
        <Panel className="profile-section">
          <SectionHeader eyebrow="IDENTITY" title="Baseline" />
          <div className="form-grid">
            <label><span>NAME</span><input value={draft.name} onChange={(e) => update('name', e.target.value)} /></label>
            <label><span>MOS / TRACK</span><input value={draft.mos} onChange={(e) => update('mos', e.target.value)} /></label>
            <label><span>AGE</span><input type="number" value={draft.age} onChange={(e) => update('age', Number(e.target.value) || 18)} /></label>
            <label><span>SEX</span>
              <select value={draft.sex} onChange={(e) => update('sex', e.target.value as Profile['sex'])}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label><span>STANDARD</span>
              <select value={draft.standard} onChange={(e) => update('standard', e.target.value as Profile['standard'])}>
                <option value="general">General (300)</option>
                <option value="combat">Combat (350)</option>
              </select>
            </label>
            <label><span>TRAINING DAYS</span>
              <select value={draft.trainingDays} onChange={(e) => update('trainingDays', Number(e.target.value))}>
                {[3, 4, 5, 6, 7].map((day) => <option key={day} value={day}>{day} / week</option>)}
              </select>
            </label>
          </div>
          <div className="profile-note">
            <Info size={15} />
            <p>AFT scoring uses the official tables for your sex and age band — currently {draft.sex === 'male' ? 'male' : 'female'}, {ageGroup(draft.age)} (age {draft.age}). No account required; this profile lives on this device.</p>
          </div>
        </Panel>

        <Panel className="profile-section">
          <SectionHeader eyebrow="BODY" title="Measurements" />
          <div className="form-grid">
            <label><span>HEIGHT (IN)</span><input type="number" step="0.5" value={draft.heightIn} onChange={(e) => update('heightIn', Number(e.target.value) || 60)} /></label>
            <label><span>CURRENT WEIGHT</span><input type="number" step="0.5" value={draft.weightLb} onChange={(e) => update('weightLb', Number(e.target.value) || 100)} /></label>
            <label><span>CURRENT WAIST</span><input type="number" step="0.25" value={draft.waistIn} onChange={(e) => update('waistIn', Number(e.target.value) || 25)} /></label>
            <label><span>GOAL WEIGHT</span><input type="number" step="1" value={draft.goalWeightLb} onChange={(e) => update('goalWeightLb', Number(e.target.value) || 100)} /></label>
            <label><span>GOAL WAIST</span><input type="number" step="0.25" value={draft.goalWaistIn} onChange={(e) => update('goalWaistIn', Number(e.target.value) || 25)} /></label>
          </div>
        </Panel>

        <Panel className="profile-section">
          <SectionHeader eyebrow="SCHEDULE" title="Block dates" />
          <div className="form-grid">
            <label><span>START DATE</span><input type="date" value={draft.startDate} onChange={(e) => update('startDate', e.target.value || draft.startDate)} /></label>
            <label className="toggle-row">
              <span>TEST SCHEDULED</span>
              <button
                type="button"
                className={`toggle ${draft.testDate ? 'on' : ''}`}
                onClick={() => update('testDate', draft.testDate ? '' : addDays(draft.startDate, 56))}
                aria-pressed={Boolean(draft.testDate)}
              >
                <span className="toggle-knob" />
              </button>
            </label>
            {draft.testDate ? (
              <label><span>TEST DATE</span><input type="date" value={draft.testDate} onChange={(e) => update('testDate', e.target.value)} /></label>
            ) : (
              <label><span>SESSION LENGTH</span>
                <select value={draft.sessionMinutes} onChange={(e) => update('sessionMinutes', Number(e.target.value))}>
                  {[60, 75, 90].map((min) => <option key={min} value={min}>{min} minutes</option>)}
                </select>
              </label>
            )}
            {draft.testDate && (
              <label><span>SESSION LENGTH</span>
                <select value={draft.sessionMinutes} onChange={(e) => update('sessionMinutes', Number(e.target.value))}>
                  {[60, 75, 90].map((min) => <option key={min} value={min}>{min} minutes</option>)}
                </select>
              </label>
            )}
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
          </div>
          <div className="onboarding-rest">
            <RestDayPicker value={draft.restDays} onChange={(days) => update('restDays', days)} />
          </div>
          <div className="profile-note">
            <Info size={15} />
            <p>
              {draft.testDate
                ? `Countdown mode: ${draft.testDate}. The block ends in a TEST week.`
                : 'Rolling readiness mode: 4-week cycles that repeat forever, each one starting a little harder than the last.'}
              {draft.sledAccess
                ? ' Sled work is on.'
                : ' No-sled mode: SDC blocks swap to plate drags, shuttles, carries, and hill sprints.'}
            </p>
          </div>
        </Panel>

        <Panel className="profile-section">
          <SectionHeader eyebrow="WATCH + PHYSIOLOGY" title="Garmin / HR" />
          <div className="form-grid">
            <label><span>OBSERVED MAX HR</span><input type="number" value={draft.maxHr} onChange={(e) => update('maxHr', Number(e.target.value) || 180)} /></label>
            <label><span>RESTING HR</span><input type="number" value={draft.restingHr} onChange={(e) => update('restingHr', Number(e.target.value) || 55)} /></label>
            <label className="toggle-row">
              <span>GARMIN COACH OVERLAY</span>
              <button
                type="button"
                className={`toggle ${draft.garminOverlay ? 'on' : ''}`}
                onClick={() => update('garminOverlay', !draft.garminOverlay)}
                aria-pressed={draft.garminOverlay}
              >
                <span className="toggle-knob" />
              </button>
            </label>
          </div>
          <div className="profile-note">
            <Info size={15} />
            <p>
              Observed max HR is better than 220-age. If you saw it during a hard effort, keep it and use
              it for zones.
            </p>
          </div>
        </Panel>

        <Panel className="profile-section">
          <SectionHeader eyebrow="CURRENT AFT" title="Baseline scores" />
          <div className="form-grid">
            <label><span>DEADLIFT</span><input type="number" value={draft.scores.mdl} onChange={(e) => update('scores', { ...draft.scores, mdl: Number(e.target.value) || 0 })} /></label>
            <label><span>HRP REPS</span><input type="number" value={draft.scores.hrp} onChange={(e) => update('scores', { ...draft.scores, hrp: Number(e.target.value) || 0 })} /></label>
            <label><span>SDC (SEC)</span><input type="number" value={draft.scores.sdc} onChange={(e) => update('scores', { ...draft.scores, sdc: Number(e.target.value) || 0 })} /></label>
            <label><span>PLANK (SEC)</span><input type="number" value={draft.scores.plk} onChange={(e) => update('scores', { ...draft.scores, plk: Number(e.target.value) || 0 })} /></label>
            <label><span>2-MILE (SEC)</span><input type="number" value={draft.scores.run} onChange={(e) => update('scores', { ...draft.scores, run: Number(e.target.value) || 0 })} /></label>
          </div>
          <div className="profile-note">
            <Info size={15} />
            <p>Use the AFT Lab for easier time entry. These fields are raw seconds for backup editing.</p>
          </div>
        </Panel>

        <Panel className="profile-section">
          <SectionHeader
            eyebrow="OPERATORS"
            title="Who is training"
            action={
              <button type="button" className="button button-small button-ghost" onClick={onNewProfile}>
                <Plus size={14} /> New
              </button>
            }
          />
          <div className="roster-list">
            {members.map((member) => (
              <div key={member.id} className={`roster-row ${member.id === activeId ? 'active' : ''}`}>
                <button type="button" className="roster-switch" onClick={() => member.id !== activeId && onSwitchProfile(member.id)}>
                  <span className="operator-avatar">{member.name.slice(0, 1).toUpperCase()}</span>
                  <span>
                    <strong>{member.name}</strong>
                    <small>{member.id === activeId ? 'active profile' : 'saved on this device'}</small>
                  </span>
                </button>
                {member.id !== activeId && (
                  <button type="button" className="icon-button" aria-label={`Remove ${member.name}`} onClick={() => onDeleteProfile(member.id)}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            {members.length === 0 && <small className="roster-empty">No operators yet.</small>}
          </div>
          <div className="profile-note">
            <Info size={15} />
            <p>One profile per Soldier. Switching loads that operator's plan, logs, and scores from this device. "New" starts the setup wizard.</p>
          </div>
        </Panel>

        <Panel className="profile-section">
          <SectionHeader eyebrow="DEVICE DATA" title="On-phone storage" />
          <div className="data-actions">
            <button type="button" className="button button-ghost" onClick={onExport}>
              <Download size={15} /> Export backup
            </button>
            <label className="button button-ghost">
              <Upload size={15} /> Import backup
              <input
                type="file"
                accept="application/json"
                hidden
                onChange={(event) => {
                  void handleImport(event.target.files?.[0])
                  event.target.value = ''
                }}
              />
            </label>
          </div>
          {importState === 'ok' && <Pill tone="lime">Backup imported</Pill>}
          {importState === 'error' && <Pill tone="red">That file is not an AFT Forge backup</Pill>}
          <div className="profile-note">
            <Info size={15} />
            <p>
              Profile, logs, and lifts are stored on this phone only. Export a JSON backup before clearing browser data
              or switching phones.
            </p>
          </div>
          <div className="install-row">
            <Smartphone size={16} />
            {installed ? (
              <span>Installed on this device.</span>
            ) : canInstall ? (
              <button type="button" className="button button-dark button-small" onClick={onInstall}>
                <Download size={14} /> Install on phone
              </button>
            ) : (
              <span>Browser menu → <strong>Add to Home screen</strong> to install offline.</span>
            )}
          </div>
        </Panel>
      </div>
    </Modal>
  )
}

export function SessionModal({
  open,
  day,
  lastWeights,
  onClose,
  onComplete,
}: {
  open: boolean
  day: DayPlan | null
  lastWeights: Record<string, number>
  onClose: () => void
  onComplete: (day: DayPlan, entries: LiftEntry[]) => void
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [weights, setWeights] = useState<Record<string, string>>({})
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  /** Seconds left on the rest timer; 0 = idle. */
  const [rest, setRest] = useState(0)
  const [lastSessionKey, setLastSessionKey] = useState<string | null>(null)

  // Derived during render: opening a session (or switching days) starts from a
  // clean checklist, a fresh clock, and no rest timer.
  const sessionKey = open ? day?.id ?? null : null
  if (sessionKey !== lastSessionKey) {
    setLastSessionKey(sessionKey)
    if (open) {
      setChecked({})
      setWeights({})
      setElapsed(0)
      setRunning(true)
      setRest(0)
    }
  }

  useEffect(() => {
    if (!open || !running) return
    const interval = window.setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearInterval(interval)
  }, [open, running])

  useEffect(() => {
    if (!open || rest <= 0) return
    const timer = window.setTimeout(() => setRest((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearTimeout(timer)
  }, [open, rest])

  if (!day) return null
  const allItems = day.blocks.flatMap((block) => block.items)
  const checkedCount = Object.values(checked).filter(Boolean).length
  // Keys are `blockIndex-index-<name>`; map each filled weight input back to its exercise.
  const loggedEntries: LiftEntry[] = day.blocks.flatMap((block, blockIndex) =>
    block.items.flatMap((item, index) => {
      const raw = weights[`${blockIndex}-${index}-${item.name}`]
      const value = Number(raw)
      return raw !== undefined && raw !== '' && Number.isFinite(value) && value > 0
        ? [{ name: item.name, weightLb: value }]
        : []
    }),
  )

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={day.title}
      eyebrow={`${formatShort(day.date)} · ${day.durationMin} MIN · ${day.focus[0]}`}
      wide
      footer={
        <div className="session-footer">
          <button type="button" className="button button-ghost" onClick={onClose}>
            <X size={15} /> Close
          </button>
          <button type="button" className="button button-primary" onClick={() => onComplete(day, loggedEntries)}>
            <Check size={15} /> Mark complete
          </button>
        </div>
      }
    >
      <div className="session-layout">
        <div className="session-timer-panel">
          <div className="session-timer-top">
            <div>
              <span className="micro-label">ELAPSED</span>
              <strong>{String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</strong>
            </div>
            <div>
              <span className="micro-label">TARGET</span>
              <strong>{day.durationMin}:00</strong>
            </div>
          </div>
          <div className="session-timer-actions">
            <button type="button" className="button button-small button-dark" onClick={() => setRunning(!running)}>
              {running ? <Pause size={14} /> : <Play size={14} />}
              {running ? 'Pause' : 'Start'}
            </button>
            <button type="button" className="button button-small button-ghost" onClick={() => { setElapsed(0); setRunning(false) }}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
          <div className="rest-timer">
            <div className="panel-topline">
              <span className="micro-label">REST TIMER</span>
              {rest > 0 && <strong>{String(Math.floor(rest / 60)).padStart(2, '0')}:{String(rest % 60).padStart(2, '0')}</strong>}
            </div>
            <div className="rest-buttons">
              {[30, 60, 90, 120].map((seconds) => (
                <button key={seconds} type="button" onClick={() => setRest(seconds)}>
                  {seconds}s
                </button>
              ))}
            </div>
          </div>
          <div className="session-progress">
            <div className="session-progress-label">
              <span>WORK CHECKED</span>
              <span>{checkedCount}/{allItems.length}</span>
            </div>
            <div className="session-progress-bar">
              <div style={{ width: `${(checkedCount / Math.max(1, allItems.length)) * 100}%` }} />
            </div>
          </div>
          <div className="session-note">
            <Info size={15} />
            <p>{day.coachNote}</p>
          </div>
        </div>

        <div className="session-checklist">
          <div className="session-loads-note">
            <Info size={14} />
            <span>Type the load you used — it saves to your training log, and next session this field prefills it.</span>
          </div>
          {day.blocks.map((block, blockIndex) => (
            <div key={block.label} className="session-block">
              <div className="session-block-label">{block.label}</div>
              {block.items.map((item, index) => {
                const key = `${blockIndex}-${index}-${item.name}`
                const last = lastWeights[item.name]
                return (
                  <div key={key} className={`session-item ${checked[key] ? 'done' : ''}`}>
                    <button
                      type="button"
                      className="session-toggle"
                      onClick={() => setChecked((current) => ({ ...current, [key]: !current[key] }))}
                    >
                      <span className="session-checkbox">{checked[key] && <Check size={13} />}</span>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.prescription}</span>
                        {item.cue && <small>{item.cue}</small>}
                      </div>
                    </button>
                    <label className="session-weight" aria-label={`Weight used for ${item.name}`}>
                      <span>LB</span>
                      <input
                        inputMode="decimal"
                        placeholder={last !== undefined ? String(last) : '—'}
                        value={weights[key] ?? ''}
                        onChange={(e) => setWeights((current) => ({ ...current, [key]: e.target.value.replace(/[^0-9.]/g, '') }))}
                      />
                    </label>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export function QuickLogModal({
  open,
  profile,
  onClose,
  onSave,
}: {
  open: boolean
  profile: Profile
  onClose: () => void
  onSave: (values: { weight: number; waist: number; sleep: number; soreness: number; stress: number }) => void
}) {
  const [weight, setWeight] = useState(profile.weightLb)
  const [waist, setWaist] = useState(profile.waistIn)
  const [sleep, setSleep] = useState(3)
  const [soreness, setSoreness] = useState(3)
  const [stress, setStress] = useState(3)
  const [saved, setSaved] = useState(false)
  const [lastOpen, setLastOpen] = useState(false)

  // Derived during render: a fresh open reseeds the body fields from the profile.
  if (open !== lastOpen) {
    setLastOpen(open)
    if (open) {
      setWeight(profile.weightLb)
      setWaist(profile.waistIn)
    }
  }
  const readiness = readinessScore(sleep, soreness, stress)
  const band = readinessBand(readiness)

  const preview = useMemo(() => ({
    weight,
    waist,
    sleep,
    soreness,
    stress,
  }), [weight, waist, sleep, soreness, stress])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Log check-in"
      eyebrow={formatShort(todayISO())}
      footer={
        <button type="button" className="button button-primary button-full" onClick={() => { onSave(preview); setSaved(true); window.setTimeout(() => { setSaved(false); onClose() }, 700) }}>
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? 'Saved' : 'Save check-in'}
        </button>
      }
    >
      <div className="quicklog-grid">
        <div className="quicklog-section">
          <SectionHeader eyebrow="BODY" title="Weight and waist" />
          <div className="inline-form">
            <label><span>WEIGHT</span><input type="number" step="0.5" value={weight} onChange={(e) => setWeight(Number(e.target.value) || 0)} /></label>
            <label><span>WAIST</span><input type="number" step="0.25" value={waist} onChange={(e) => setWaist(Number(e.target.value) || 0)} /></label>
          </div>
        </div>
        <div className="quicklog-section">
          <SectionHeader eyebrow="READINESS" title="How is the system running?" />
          {[
            { label: 'SLEEP', value: sleep, setValue: setSleep, help: '1 terrible / 5 excellent' },
            { label: 'SORENESS', value: soreness, setValue: setSoreness, help: '1 fine / 5 wrecked' },
            { label: 'STRESS', value: stress, setValue: setStress, help: '1 calm / 5 cooked' },
          ].map((field) => (
            <div key={field.label} className="slider-row">
              <label>
                <span>{field.label}</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={field.value}
                  onChange={(e) => field.setValue(Number(e.target.value))}
                />
              </label>
              <span className="slider-value">{field.value}/5</span>
            </div>
          ))}
          <div className="readiness-preview">
            <div className="readiness-preview-score">
              <strong>{readiness}</strong>
              <span>READINESS</span>
            </div>
            <div className={`readiness-preview-band band-${band.tone}`}>
              <Pill tone={band.tone === 'good' ? 'lime' : band.tone === 'warn' ? 'amber' : 'red'}>{band.label}</Pill>
              <p>{band.order}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export function ConfirmResetModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Reset app?"
      eyebrow="DESTRUCTIVE ACTION"
      footer={
        <>
          <button type="button" className="button button-ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="button button-danger" onClick={onConfirm}>
            <Trash2 size={15} /> Reset to baseline
          </button>
        </>
      }
    >
      <div className="reset-note">
        <Info size={18} />
        <p>
          This clears the active operator's profile, logs, and lift history on this device, then restores the
          default baseline. Export a backup first — there is no cloud copy.
        </p>
      </div>
    </Modal>
  )
}


