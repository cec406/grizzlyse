import { CalendarDays, Dumbbell, History, Trophy } from 'lucide-react'
import type { LogState } from '../types'
import { deltaLabel, liftHistory, lastWorkout, sortWorkouts, totalWorkouts } from '../lib/lifts'
import { formatShort, todayISO } from '../lib/date'
import { EmptyState, Panel, Pill, SectionHeader, Stat } from './ui'

export function TrainingLog({ logs }: { logs: LogState }) {
  const workouts = sortWorkouts(logs.workouts)
  const lifts = liftHistory(logs)
  const recent = lastWorkout(logs)
  const today = todayISO()

  return (
    <div className="log-page">
      <Panel className="log-hero">
        <SectionHeader
          eyebrow="TRAINING LOG / LOADS"
          title="Every load, session by session."
          description="Weights are captured when you run a session. Enter them in the session checklist — the app prefills what you used last time."
        />
        <div className="log-stats">
          <Stat label="SESSIONS LOGGED" value={totalWorkouts(logs)} detail="completed with weights" icon={<History size={15} />} />
          <Stat label="LIFTS TRACKED" value={lifts.length} detail="distinct exercises" tone="lime" icon={<Dumbbell size={15} />} />
          <Stat
            label="LAST SESSION"
            value={recent ? formatShort(recent.date) : '—'}
            detail={recent ? (recent.date === today ? 'today' : 'most recent') : 'log one to begin'}
            tone="blue"
            icon={<CalendarDays size={15} />}
          />
        </div>
      </Panel>

      {lifts.length > 0 && (
        <Panel className="log-lifts-panel">
          <SectionHeader
            eyebrow="PROGRESSION"
            title="Lift tracker"
            description="Best load, latest load, and the trend. Beat the last number before you chase the best."
          />
          <div className="log-lifts">
            {lifts.map((lift) => (
              <div key={lift.name} className="log-lift">
                <div className="log-lift-head">
                  <strong>{lift.name}</strong>
                  {lift.last.weightLb >= lift.best.weightLb && lift.count > 1 && (
                    <Pill tone="lime"><Trophy size={11} /> AT PR</Pill>
                  )}
                </div>
                <div className="log-lift-numbers">
                  <div>
                    <span>LAST</span>
                    <strong>{lift.last.weightLb} lb</strong>
                    <small>{formatShort(lift.last.date)}</small>
                  </div>
                  <div>
                    <span>BEST</span>
                    <strong>{lift.best.weightLb} lb</strong>
                    <small>{formatShort(lift.best.date)}</small>
                  </div>
                  <div className="log-lift-trend">
                    <span>RECENT</span>
                    <div className="log-lift-chips">
                      {lift.recent.map((point, index) => (
                        <span key={`${point.date}-${index}`} className="log-chip">{point.weightLb}</span>
                      ))}
                    </div>
                    <small>{deltaLabel(lift)}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      <Panel className="log-history-panel">
        <SectionHeader
          eyebrow="HISTORY"
          title="Session records"
          description="One card per completed session. Re-running the same day replaces its record."
        />
        {workouts.length === 0 ? (
          <EmptyState
            title="No lifts logged yet"
            body="Start a session from the Mission Plan and type the weight you used next to each exercise. It lands here automatically."
          />
        ) : (
          <div className="log-history">
            {workouts.map((workout) => (
              <div key={workout.id} className="log-entry">
                <div className="log-entry-head">
                  <div>
                    <span className="micro-label">{formatShort(workout.date)}</span>
                    <strong>{workout.title}</strong>
                  </div>
                  <Pill tone={workout.entries.length ? 'lime' : 'neutral'}>
                    {workout.entries.length ? `${workout.entries.length} loads` : 'no loads entered'}
                  </Pill>
                </div>
                {workout.entries.length > 0 ? (
                  <div className="log-entry-rows">
                    {workout.entries.map((entry, index) => (
                      <div key={`${entry.name}-${index}`} className="log-entry-row">
                        <span>{entry.name}</span>
                        <strong>{entry.weightLb} lb</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <small>Completed without weights.</small>
                )}
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}