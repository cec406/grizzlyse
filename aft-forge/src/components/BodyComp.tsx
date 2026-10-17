import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Check,
  CircleGauge,
  Droplet,
  Flame,
  HeartPulse,
  Info,
  Plus,
  Ruler,
  Scale,
  ShieldCheck,
  Timer,
  TrendingDown,
} from 'lucide-react'
import type { LogState, Profile } from '../types'
import { caloriePlan, formatInches, weightForWaist } from '../lib/metrics'
import { maxWaist, waistToHeight } from '../lib/scoring'
import { addDays, formatTiny, todayISO } from '../lib/date'
import { Eyebrow, Panel, Pill, ProgressBar, Ring, SectionHeader, Stat, TrendChart } from './ui'
import type { ChartPoint } from './ui'

export function BodyComp({
  profile,
  logs,
  onSaveBody,
}: {
  profile: Profile
  logs: LogState
  onSaveBody: (weightLb: number, waistIn?: number, date?: string) => void
}) {
  const body = useMemo(
    () => [...logs.body].sort((a, b) => a.date.localeCompare(b.date)),
    [logs.body],
  )
  const latest = body.at(-1)
  const currentWeight = latest?.weightLb ?? profile.weightLb
  const currentWaist = latest?.waistIn ?? profile.waistIn
  const [weightDraft, setWeightDraft] = useState(currentWeight)
  const [waistDraft, setWaistDraft] = useState(currentWaist)
  const [saved, setSaved] = useState(false)
  const plan = caloriePlan(profile)
  const ratio = waistToHeight(currentWaist, profile.heightIn)
  const limit = maxWaist(profile.heightIn)
  const waistGap = Math.max(0, currentWaist - limit)
  const passWeight = weightForWaist(profile)
  const projectedPassDate = addDays(todayISO(), Math.round(((profile.weightLb - passWeight) / Math.max(0.5, plan.rateLbPerWeek)) * 7))
  const toLose = Math.max(0, currentWeight - profile.goalWeightLb)

  const weightPoints = useMemo<ChartPoint[]>(() => {
    const actual = body
      .filter((entry) => Boolean(entry.weightLb))
      .map((entry) => ({
        label: formatTiny(entry.date),
        value: entry.weightLb,
        projected: false,
      }))
    const projection = Array.from({ length: 8 }, (_, index) => {
      const step = toLose / 8
      const value = Math.max(profile.goalWeightLb, currentWeight - (index + 1) * step)
      return {
        label: formatTiny(addDays(latest?.date ?? todayISO(), (index + 1) * 28)),
        value,
        projected: true,
      }
    })
    return [...actual, ...projection]
  }, [body, currentWeight, latest?.date, profile.goalWeightLb, toLose])

  const waistPoints = useMemo<ChartPoint[]>(() => {
    const actual = body
      .filter((entry) => Boolean(entry.waistIn))
      .map((entry) => ({
        label: formatTiny(entry.date),
        value: entry.waistIn ?? currentWaist,
        projected: false,
      }))
    const projection = Array.from({ length: 8 }, (_, index) => {
      const waistToLose = Math.max(0, currentWaist - profile.goalWaistIn)
      const value = Math.max(profile.goalWaistIn, currentWaist - (index + 1) * (waistToLose / 8))
      return {
        label: formatTiny(addDays(latest?.date ?? todayISO(), (index + 1) * 28)),
        value,
        projected: true,
      }
    })
    return [...actual, ...projection]
  }, [body, currentWaist, latest?.date, profile.goalWaistIn])

  function logBody() {
    onSaveBody(weightDraft, waistDraft)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="body-page">
      <div className="body-hero-grid">
        <Panel className="body-hero">
          <div className="body-hero-copy">
            <Eyebrow>BODY COMPOSITION / WAIST-TO-HEIGHT RATIO</Eyebrow>
            <h2>The waist is the gate. The weight is the byproduct.</h2>
            <p>
              The Army no longer uses height/weight tables or the old tape test. It measures the waist at
              the navel and divides by height. Under 0.55 is compliant. Your goal is not to become skinny;
              it is to become light enough to run faster while keeping the muscle.
            </p>
            <div className="body-hero-actions">
              <button type="button" className="button button-primary" onClick={logBody}>
                {saved ? <Check size={16} /> : <Plus size={16} />}
                {saved ? 'Logged' : 'Log weight + waist'}
              </button>
              <span className="button button-ghost button-static">
                <Ruler size={16} />
                Measure at the navel
              </span>
            </div>
            <div className="body-hero-stats">
              <div><span>NOW</span><strong>{Math.round(currentWeight)}</strong><small>lb</small></div>
              <div><span>GOAL</span><strong>{profile.goalWeightLb}</strong><small>lb</small></div>
              <div><span>WAIST</span><strong>{formatInches(currentWaist)}</strong><small>limit {formatInches(limit)}</small></div>
              <div><span>TO LOSE</span><strong>{Math.round(toLose)}</strong><small>lb</small></div>
            </div>
          </div>
          <div className="body-ring">
            <Ring
              value={ratio}
              max={0.62}
              size={196}
              label={ratio.toFixed(3)}
              sublabel="WHtR"
              tone={ratio < 0.55 ? 'lime' : 'red'}
              caption={ratio < 0.55 ? 'PASS' : 'OVER 0.550'}
            />
            <div className="body-ring-legend">
              <span><i className="legend-dot lime" /> compliant</span>
              <span><i className="legend-dot amber" /> caution</span>
              <span><i className="legend-dot red" /> ABCP</span>
            </div>
          </div>
        </Panel>

        <Panel className="body-input-panel">
          <div className="panel-topline">
            <Eyebrow>WEEKLY CHECK-IN</Eyebrow>
            <span className="micro-label">SAME CONDITIONS</span>
          </div>
          <div className="inline-form">
            <label>
              <span>DATE</span>
              <input type="date" value={todayISO()} onChange={(event) => event.preventDefault()} readOnly />
            </label>
            <label>
              <span>WEIGHT (LB)</span>
              <input
                type="number"
                step="0.5"
                value={weightDraft}
                onChange={(event) => setWeightDraft(Number(event.target.value) || 0)}
              />
            </label>
            <label>
              <span>WAIST (IN)</span>
              <input
                type="number"
                step="0.25"
                value={waistDraft}
                onChange={(event) => setWaistDraft(Number(event.target.value) || 0)}
              />
            </label>
          </div>
          <div className="body-input-note">
            <Info size={15} />
            <p>
              Same scale, same morning, same waist placement, end of a normal exhale. Weekly weight is
              smoother and more useful than daily drama.
            </p>
          </div>
          <div className="body-progress-row">
            <ProgressBar
              value={Math.max(0, profile.weightLb - currentWeight)}
              max={Math.max(1, profile.weightLb - profile.goalWeightLb)}
              label="Weight progress"
              right={`${Math.round(Math.max(0, profile.weightLb - currentWeight))} / ${Math.round(Math.max(1, profile.weightLb - profile.goalWeightLb))} lb`}
            />
            <ProgressBar
              value={Math.max(0, profile.waistIn - currentWaist)}
              max={Math.max(0.1, profile.waistIn - profile.goalWaistIn)}
              label="Waist progress"
              right={`${(Math.max(0, profile.waistIn - currentWaist)).toFixed(1)} / ${(Math.max(0.1, profile.waistIn - profile.goalWaistIn)).toFixed(1)} in`}
              tone="amber"
            />
          </div>
          <div className="body-pass-estimate">
            <CircleGauge size={17} />
            <span>
              Model estimate: WHtR standard arrives around <strong>{Math.round(passWeight)} lb</strong>
              {' '}and roughly {formatTiny(projectedPassDate)} at {plan.rateLbPerWeek} lb/week. Your {profile.goalWeightLb} lb
              goal is for performance, not just compliance.
            </span>
          </div>
        </Panel>
      </div>

      <div className="body-layout">
        <div className="body-main">
          <Panel className="weight-chart-panel">
            <SectionHeader
              eyebrow="WEIGHT TREND"
              title="Projected trajectory."
              description="Solid points are logs. Hollow points are the model’s projection if you hold the deficit and training."
              action={<Pill tone={currentWeight > profile.goalWeightLb ? 'amber' : 'lime'}>{currentWeight > profile.goalWeightLb ? 'CUT ACTIVE' : 'GOAL ZONE'}</Pill>}
            />
            <TrendChart points={weightPoints} goal={profile.goalWeightLb} unit="lb" tone="lime" />
          </Panel>
          <Panel className="waist-chart-panel">
            <SectionHeader
              eyebrow="WAIST TREND"
              title="The gate you actually need."
              description="Waist can move faster than the scale when sleep and stress improve. Keep the tape method consistent."
              action={<Pill tone={ratio < 0.55 ? 'lime' : 'red'}>{waistGap > 0 ? `${waistGap.toFixed(1)} IN TO PASS` : 'PASS'}</Pill>}
            />
            <TrendChart points={waistPoints} goal={profile.goalWaistIn} unit="in" tone="amber" />
          </Panel>
        </div>

        <aside className="body-side">
          <Panel className="calorie-panel">
            <SectionHeader
              eyebrow="FUEL PLAN"
              title={`${plan.calories.toLocaleString()} kcal / day`}
              description="This is a performance cut, not a starvation protocol."
              action={<Pill tone="lime">MUSCLE PRESERVATION</Pill>}
            />
            <div className="macro-grid">
              <Stat label="PROTEIN" value={plan.protein} unit="g" detail="1.8 g/kg · every meal" tone="lime" icon={<ShieldCheck size={15} />} />
              <Stat label="CARBS" value={plan.carbs} unit="g" detail="fuel the runs" tone="blue" icon={<Flame size={15} />} />
              <Stat label="FAT" value={plan.fat} unit="g" detail="25% of calories" tone="amber" icon={<Droplet size={15} />} />
            </div>
            <div className="calorie-kv">
              <div><span>BMR</span><strong>{plan.bmr.toLocaleString()} kcal</strong></div>
              <div><span>TDEE</span><strong>{plan.tdee.toLocaleString()} kcal</strong></div>
              <div><span>DEFICIT</span><strong>{plan.deficit.toLocaleString()} kcal</strong></div>
              <div><span>RATE</span><strong>{plan.rateLbPerWeek} lb/wk</strong></div>
            </div>
            <div className="fuel-rules">
              <div><span>01</span><p>Protein anchor at every meal: 45–55 g.</p></div>
              <div><span>02</span><p>Carbs before and after hard sessions. Not zero-carb on run days.</p></div>
              <div><span>03</span><p>Vegetables at lunch and dinner. Protein first, starch second, alcohol rarely.</p></div>
              <div><span>04</span><p>7–9 h sleep. Bad sleep makes a 550 kcal deficit feel like 900.</p></div>
            </div>
          </Panel>

          <Panel className="meal-panel">
            <SectionHeader eyebrow="MEAL TEMPLATE" title="Simple enough to execute." />
            <div className="meal-list">
              <div><span>07:00</span><strong>Protein anchor + carbs</strong><p>Eggs or Greek yogurt, oats or toast, fruit, coffee.</p></div>
              <div><span>12:30</span><strong>Lean protein + rice/potato + veg</strong><p>Chicken, turkey, lean beef, or tofu.</p></div>
              <div><span>15:30</span><strong>Pre-session snack</strong><p>Fruit + 20–25 g protein if training {'>'}75 min.</p></div>
              <div><span>18:00</span><strong>Recovery meal</strong><p>Protein, carbs, vegetables, salt. 40–50 g protein.</p></div>
              <div><span>21:00</span><strong>Optional casein or cottage cheese</strong><p>Only if it helps you sleep.</p></div>
            </div>
          </Panel>

          <Panel className="plateau-panel">
            <div className="panel-topline">
              <Eyebrow>PLATEAU PROTOCOL</Eyebrow>
              <span className="micro-label">RUN AFTER 2 WEEKS</span>
            </div>
            <div className="plateau-list">
              <div><TrendingDown size={15} /><span>Weight unchanged for 2 weeks</span><small>Subtract 150–200 kcal or add 2,000 daily steps.</small></div>
              <div><Flame size={15} /><span>Losing {'>'}2 lb/week</span><small>Add 200 kcal. Fat loss without muscle is a bad trade.</small></div>
              <div><Timer size={15} /><span>Waist stuck</span><small>Measure daily for 7 days. Then change sleep, salt, or fiber.</small></div>
              <div><Scale size={15} /><span>Strength dropping</span><small>Add 150–250 kcal and 1 set of protein on run days.</small></div>
            </div>
          </Panel>

          <Panel className="body-notes-panel">
            <div className="body-notes-head">
              <HeartPulse size={18} />
              <div>
                <strong>Medical guardrail</strong>
                <p>Do not crash diet to pass. If you have hypertension, diabetes, kidney disease, are {'>'}40, or feel dizzy, talk to medical before a deficit.</p>
              </div>
            </div>
            <div className="body-log-list">
              {body.slice(-6).reverse().map((entry) => (
                <div key={entry.date} className="body-log-row">
                  <span><CalendarDays size={13} /> {formatTiny(entry.date)}</span>
                  <strong>{Math.round(entry.weightLb)} lb</strong>
                  <small>{entry.waistIn ? formatInches(entry.waistIn) : '—'}</small>
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  )
}
