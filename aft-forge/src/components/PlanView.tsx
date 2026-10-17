import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Download,
  Flame,
  Footprints,
  Info,
  Play,
  Printer,
  Shield,
  Target,
  Zap,
} from 'lucide-react'
import type { DayPlan, LogState, Profile, WeekPlan } from '../types'
import { phaseColor, sessionTypeLabel, weekCompletion } from '../lib/plan'
import { downloadIcs } from '../lib/ics'
import { formatShort, isToday, todayISO } from '../lib/date'
import { Eyebrow, Panel, Pill, ProgressBar, SectionHeader } from './ui'

export function PlanView({
  profile,
  program,
  logs,
  onStartSession,
}: {
  profile: Profile
  program: WeekPlan[]
  logs: LogState
  onStartSession: (day: DayPlan) => void
}) {
  const currentWeek = useMemo(() => {
    const index = program.findIndex((week) => todayISO() >= week.startDate && todayISO() <= week.endDate)
    return index >= 0 ? index : 0
  }, [program])
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(currentWeek)
  const week = program[Math.min(selectedWeekIndex, program.length - 1)] ?? program[0]
  const [openDay, setOpenDay] = useState<DayPlan | null>(null)

  if (!week) {
    return (
      <Panel>
        <SectionHeader title="No plan generated" description="Set a start and test date in Profile." />
      </Panel>
    )
  }

  const totalSessions = program.reduce((sum, item) => sum + item.days.filter((day) => day.type !== 'recovery').length, 0)
  const doneSessions = program.reduce(
    (sum, item) => sum + item.days.filter((day) => day.type !== 'recovery' && logs.completed[day.id]).length,
    0,
  )
  const progress = totalSessions ? Math.round((doneSessions / totalSessions) * 100) : 0

  return (
    <div className="plan-page">
      <Panel className="plan-hero">
        <div className="plan-hero-copy">
          <Eyebrow>CAMPAIGN ORDER / {program.length} WEEKS</Eyebrow>
          <h2>Week-by-week plan.</h2>
          <p>
            Your week is built around your rest days: strength, quality runs, the long run, and AFT
            rehearsals fill the training days; the rest are rest days.
            Every session has a 30-minute minimum version for days that get cut short. In rolling
            mode each 4-week cycle starts a little heavier than the last.
          </p>
          <div className="plan-hero-stats">
            <div>
              <span>SESSIONS</span>
              <strong>{totalSessions}</strong>
            </div>
            <div>
              <span>COMPLETE</span>
              <strong>{doneSessions}</strong>
            </div>
            <div>
              <span>BLOCK</span>
              <strong>{profile.testDate ? `${formatShort(profile.startDate)} → ${formatShort(profile.testDate)}` : `ROLLING · FROM ${formatShort(profile.startDate)}`}</strong>
            </div>
          </div>
        </div>
        <div className="plan-hero-actions">
          <ProgressBar value={progress} label="Campaign completion" right={`${progress}%`} />
          <button type="button" className="button button-primary" onClick={() => downloadIcs(program)}>
            <Download size={16} />
            Export calendar (.ics)
          </button>
          <button type="button" className="button button-ghost" onClick={() => window.print()}>
            <Printer size={16} />
            Print plan
          </button>
          <div className="plan-note">
            <Info size={15} />
            <span>Import the .ics into your calendar, then mirror the run sessions in Garmin Connect.</span>
          </div>
        </div>
      </Panel>

      <div className="plan-layout">
        <aside className="week-rail">
          <div className="rail-label">BLOCK WEEKS</div>
          {program.map((item, index) => {
            const completion = weekCompletion(item, logs.completed)
            return (
              <button
                key={item.number}
                type="button"
                className={`rail-week ${index === selectedWeekIndex ? 'active' : ''}`}
                onClick={() => setSelectedWeekIndex(index)}
              >
                <div className="rail-week-top">
                  <span>W{item.number.toString().padStart(2, '0')}</span>
                  <span className={`phase-dot phase-${phaseColor(item.phase)}`} />
                </div>
                <strong>{item.phase}</strong>
                <small>{formatShort(item.startDate)}</small>
                <div className="rail-progress">
                  <div style={{ width: `${completion}%` }} />
                </div>
              </button>
            )
          })}
          <div className="rail-principles">
            <div className="rail-label">DAILY STANDARDS</div>
            <div><Shield size={14} /> 7–9 h sleep</div>
            <div><Flame size={14} /> 190 g protein</div>
            <div><Footprints size={14} /> Easy runs easy</div>
            <div><Target size={14} /> Waist at navel weekly</div>
          </div>
        </aside>

        <div className="week-detail">
          <Panel className="week-header-panel">
            <div className="week-header-top">
              <div>
                <Eyebrow>WEEK {week.number.toString().padStart(2, '0')} / CYCLE {week.cycle} / {week.phase}</Eyebrow>
                <h2>{week.theme}</h2>
                <p>{week.focus}</p>
              </div>
              <div className="week-header-meta">
                <Pill tone={week.phase === 'TEST' ? 'red' : week.phase === 'SHARPEN' ? 'violet' : 'lime'}>
                  {week.phase}
                </Pill>
                <span>{formatShort(week.startDate)} → {formatShort(week.endDate)}</span>
              </div>
            </div>
            <div className="week-kpi-row">
              <div><span>DAYS</span><strong>7</strong></div>
              <div><span>TRAINING TIME</span><strong>{week.days.reduce((sum, day) => sum + day.durationMin, 0)} min</strong></div>
              <div><span>HARD SESSIONS</span><strong>{week.days.filter((day) => day.type === 'run' || day.type === 'aft').length}</strong></div>
              <div><span>COMPLETION</span><strong>{weekCompletion(week, logs.completed)}%</strong></div>
            </div>
          </Panel>

          <div className="day-list">
            {week.days.map((day) => {
              const done = logs.completed[day.id]
              const open = openDay?.id === day.id
              return (
                <article key={day.id} className={`day-card ${isToday(day.date) ? 'is-today' : ''} ${done ? 'is-done' : ''} ${open ? 'is-open' : ''}`}>
                  <button type="button" className="day-card-main" onClick={() => setOpenDay(open ? null : day)}>
                    <div className="day-date">
                      <span>{day.weekday}</span>
                      <strong>{formatShort(day.date).split(' ')[1]}</strong>
                    </div>
                    <div className="day-info">
                      <div className="day-topline">
                        <span className={`day-type type-${day.type}`}>{sessionTypeLabel(day.type)}</span>
                        <span className="day-duration"><Clock3 size={13} /> {day.durationMin} min</span>
                        {isToday(day.date) && <span className="today-tag">TODAY</span>}
                        {done && <span className="done-tag"><Check size={12} /> DONE</span>}
                      </div>
                      <h3>{day.title}</h3>
                      <p>{day.intent}</p>
                      <div className="day-tags">
                        {day.focus.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                    <div className="day-card-actions">
                      <span className="day-minimum"><Zap size={13} /> {day.minimum.split('.')[0]}.</span>
                      <span className="day-open">{open ? 'Close' : 'Brief'}<ChevronRight size={15} className={open ? 'rotate' : ''} /></span>
                    </div>
                  </button>
                  {open && (
                    <div className="day-expanded">
                      <div className="day-expanded-grid">
                        {day.blocks.map((block) => (
                          <div key={block.label} className="day-block">
                            <div className="day-block-label">{block.label}</div>
                            {block.items.map((item) => (
                              <div key={item.name} className="day-item">
                                <strong>{item.name}</strong>
                                <span>{item.prescription}</span>
                                {item.cue && <small>{item.cue}</small>}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="day-coach-note">
                        <Info size={15} />
                        <p>{day.coachNote}</p>
                      </div>
                      <div className="day-expanded-foot">
                        <button type="button" className="button button-primary" onClick={() => onStartSession(day)}>
                          <Play size={15} /> Start session
                        </button>
                        <span><CalendarDays size={14} /> {formatShort(day.date)} · {day.durationMin} min</span>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </div>

      <Panel className="plan-principles">
        <SectionHeader
          eyebrow="WHY THIS PLAN"
          title="Hold strength, build the run, take the waist down."
          description="The program is deliberately conservative on heavy lifting because your deadlift is already maxed. It is aggressive on aerobic volume because that is your lowest-scoring event and the biggest driver of body composition."
        />
        <div className="principle-grid">
          <div>
            <span className="principle-num">01</span>
            <strong>Two hard days, not five.</strong>
            <p>Tuesday threshold and Friday AFT rehearsal are the only truly hard sessions. Everything else is base-building or strength maintenance.</p>
          </div>
          <div>
            <span className="principle-num">02</span>
            <strong>Easy means easy.</strong>
            <p>Most running should stay conversational. That is what adds aerobic volume without piling on fatigue.</p>
          </div>
          <div>
            <span className="principle-num">03</span>
            <strong>High frequency, submaximal effort.</strong>
            <p>HRP and plank are trained 3–5 times per week at submaximal volume. One max set per week is enough.</p>
          </div>
          <div>
            <span className="principle-num">04</span>
            <strong>Waist-to-height is the standard.</strong>
            <p>A 500–600 kcal deficit, 1.8 g/kg protein, and two strength days preserve muscle while the waist comes down.</p>
          </div>
        </div>
      </Panel>
    </div>
  )
}
