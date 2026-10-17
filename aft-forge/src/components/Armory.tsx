import { useMemo, useState } from 'react'
import { ChevronRight, Dumbbell, ExternalLink, Info, Search } from 'lucide-react'
import { exercises } from '../data/exercises'
import { EVENT_KEYS, EVENT_META, thresholdForPoints } from '../lib/scoring'
import type { Profile } from '../types'
import { Eyebrow, Panel, Pill, SectionHeader } from './ui'

const CATEGORIES = ['Run', 'HRP', 'SDC', 'Plank', 'Deadlift', 'Strength', 'Recovery'] as const

const NO_SLED_IDS = ['plate-drag', 'sdc-simulation-nosled', 'hill-sprint', 'suitcase-carry', 'farmer-carry', 'lateral-shuttle']

export function Armory({ profile }: { profile: Profile }) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number] | 'ALL'>('ALL')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return exercises.filter(
      (item) =>
        (filter === 'ALL' || item.category === filter) &&
        (item.name.toLowerCase().includes(q) ||
          item.why.toLowerCase().includes(q) ||
          item.cue.toLowerCase().includes(q) ||
          item.prescription.toLowerCase().includes(q)),
    )
  }, [filter, query])

  const noSledDrills = exercises.filter((item) => NO_SLED_IDS.includes(item.id))

  return (
    <div className="armory-page">
      <Panel className="armory-hero">
        <div className="armory-hero-copy">
          <Eyebrow>ARMORY / TECHNIQUE + DRILLS</Eyebrow>
          <h2>Train the pattern, not just the pain.</h2>
          <p>
            Your deadlift is maxed. Your running is the limit. So the armory is built for the events that
            actually move your score: aerobic base, HRP density, SDC mechanics, and trunk endurance.
          </p>
        </div>
        <div className="event-cards">
          {EVENT_KEYS.map((event) => {
            const target = thresholdForPoints(event, 90, profile, profile.standard)
            return (
              <div key={event} className="event-card">
                <span className={`event-icon small event-${event}`}>{EVENT_META[event].short}</span>
                <strong>{EVENT_META[event].label}</strong>
                <p>{EVENT_META[event].description}</p>
                <small>90-point standard: {target ? (EVENT_META[event].unit === 'time' ? target : `${target} ${EVENT_META[event].unit}`) : '—'}</small>
              </div>
            )
          })}
        </div>
      </Panel>

      <Panel className="armory-controls">
        <div className="search-wrap">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search exercises, cues, or equipment"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="filter-chips">
          <button
            type="button"
            className={filter === 'ALL' ? 'active' : ''}
            onClick={() => setFilter('ALL')}
          >
            ALL
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? 'active' : ''}
              onClick={() => setFilter(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="armory-count">
          <Pill tone="neutral">{filtered.length} drills</Pill>
        </div>
      </Panel>

      <div className="armory-grid">
        {filtered.map((exercise) => (
          <article key={exercise.id} className="armory-card">
            <div className="armory-card-head">
              <div className="armory-card-icon"><Dumbbell size={15} /></div>
              <Pill tone={exercise.category === 'Recovery' ? 'blue' : exercise.category === 'Run' ? 'violet' : 'lime'}>
                {exercise.category.toUpperCase()}
              </Pill>
            </div>
            <h3>{exercise.name}</h3>
            <div className="armory-prescription">{exercise.prescription}</div>
            <p>{exercise.why}</p>
            <div className="armory-cue">
              <span>CUE</span>
              <p>{exercise.cue}</p>
            </div>
            <small>{exercise.equipment}</small>
          </article>
        ))}
      </div>

      <Panel className="nosled-panel">
        <SectionHeader
          eyebrow="SDC / NO-SLED TRACK"
          title={profile.sledAccess ? 'Sled plan on — keep the fallbacks handy.' : 'No sled? Train the same qualities.'}
          description={
            profile.sledAccess
              ? 'Your plan is built around the real sled. These swaps cover you when the sled bay is locked or the lane is taken.'
              : 'Your profile is set to no-sled mode. Every SDC block in the plan is built from these drills instead — same sprint, drag, lateral, and carry qualities.'
          }
          action={<Pill tone={profile.sledAccess ? 'lime' : 'amber'}>{profile.sledAccess ? 'SLED ACCESS ON' : 'NO-SLED MODE'}</Pill>}
        />
        <div className="nosled-grid">
          {noSledDrills.map((drill) => (
            <div key={drill.id} className="nosled-row">
              <div className="nosled-head">
                <strong>{drill.name}</strong>
                <small>{drill.equipment}</small>
              </div>
              <span className="nosled-rx">{drill.prescription}</span>
              <p>{drill.why}</p>
            </div>
          ))}
        </div>
        <div className="nosled-note">
          <Info size={16} />
          <p>
            The graded SDC always uses the sled — rehearse it whenever you can borrow one, and flip
            <strong> SLED ACCESS</strong> in your profile before a test week. Drag substitutes train the pattern; the test
            rehearses the event.
          </p>
        </div>
      </Panel>

      <Panel className="technique-panel">
        <SectionHeader
          eyebrow="EXECUTION STANDARDS"
          title="Don’t donate reps to sloppy form."
          description="Graders care about control, contact points, and full range. Here is the short version."
        />
        <div className="technique-grid">
          <div>
            <span className="event-icon event-mdl">MDL</span>
            <strong>3RM Deadlift</strong>
            <p>Three continuous reps. Back flat, hips and shoulders rise together, bar placed on the ground, never dropped. Two attempts maximum.</p>
          </div>
          <div>
            <span className="event-icon event-hrp">HRP</span>
            <strong>Hand-Release Push-Up</strong>
            <p>Chest, hips, and thighs touch together; hands extend to a T; whole body returns up as one unit. Only authorized rest is the front leaning rest.</p>
          </div>
          <div>
            <span className="event-icon event-sdc">SDC</span>
            <strong>Sprint-Drag-Carry</strong>
            <p>Five 50 m shuttles. Touch the line with hand and foot on sprints. Entire sled crosses lines. No feet crossing on the lateral.</p>
          </div>
          <div>
            <span className="event-icon event-plk">PLK</span>
            <strong>Plank</strong>
            <p>Forearms and feet contact, straight line from head to heels, no interlocked fingers. One verbal warning, then the event ends.</p>
          </div>
          <div>
            <span className="event-icon event-run">2MR</span>
            <strong>Two-Mile Run</strong>
            <p>Measured, generally flat course. Outdoor, indoor track, road, or sidewalk. No unimproved terrain.</p>
          </div>
        </div>
        <a className="source-link" href="https://www.army.mil/aft" target="_blank" rel="noreferrer">
          Official execution standards <ExternalLink size={13} /> <ChevronRight size={13} />
        </a>
      </Panel>

      <Panel className="armory-note">
        <Info size={17} />
        <div>
          <strong>Progressive overload still applies.</strong>
          <p>
            Most training should feel submaximal. Use the AFT-specific drills to practice the skill, and
            use the strength work to keep the tissue ready. A training session that ruins next week is a
            bad session.
          </p>
        </div>
      </Panel>
    </div>
  )
}
