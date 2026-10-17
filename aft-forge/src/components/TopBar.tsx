import { Activity, ClipboardPlus, Download, Settings2 } from 'lucide-react'
import type { Profile, Tab } from '../types'
import { ageGroup } from '../lib/scoring'
import { daysBetween, formatLong, todayISO } from '../lib/date'

const TITLES: Record<Tab, { title: string; sub: string }> = {
  command: { title: 'Command Center', sub: 'Your current readiness, mission, and next decision.' },
  plan: { title: 'Mission Plan', sub: 'Every day, every set, every run — built around 60–90 minutes.' },
  log: { title: 'Training Log', sub: 'Every load you moved, session by session.' },
  aft: { title: 'AFT Lab', sub: 'Score the test, find the leverage, and model the next block.' },
  run: { title: 'Run Lab', sub: 'Paces, heart-rate zones, and the 2-mile race plan.' },
  body: { title: 'Body Comp', sub: 'The waist is the gate. The weight is the byproduct.' },
  armory: { title: 'Armory', sub: 'The drills, lifts, and cues that move the score.' },
  intel: { title: 'Intel', sub: 'Official standards, the CFT, and the research base.' },
  calc: { title: 'Calculators', sub: 'AFT score and waist-to-height in one place.' },
}

export function TopBar({
  active,
  profile,
  canInstall,
  installed,
  onInstall,
  onOpenLog,
  onOpenProfile,
}: {
  active: Tab
  profile: Profile
  canInstall: boolean
  installed: boolean
  onInstall: () => void
  onOpenLog: () => void
  onOpenProfile: () => void
}) {
  const days = profile.testDate ? daysBetween(todayISO(), profile.testDate) : null
  const meta = TITLES[active]
  return (
    <header className="topbar">
      <div className="topbar-title">
        <div className="mobile-brand">AFT FORGE</div>
        <h1>{meta.title}</h1>
        <p>{meta.sub}</p>
      </div>
      <div className="topbar-actions">
        <div className="test-countdown">
          <span className="micro-label">AFT WINDOW</span>
          <strong>{days === null ? 'READY' : days >= 0 ? `T-${days}` : 'PAST'}</strong>
          <span>{days === null ? 'NO TEST SCHEDULED' : formatLong(profile.testDate)}</span>
        </div>
        {!installed && canInstall && (
          <button type="button" className="button button-ghost topbar-install" onClick={onInstall} title="Install on this phone">
            <Download size={16} />
            <span>Install</span>
          </button>
        )}
        <button type="button" className="button button-ghost topbar-log" onClick={onOpenLog}>
          <ClipboardPlus size={16} />
          <span>Log</span>
        </button>
        <button type="button" className="icon-button profile-button" onClick={onOpenProfile} aria-label="Edit profile">
          <Settings2 size={17} />
        </button>
        <div className="operator-chip" title={profile.name || 'Operator'}>
          <span className="operator-avatar">{(profile.name || 'O').slice(0, 1).toUpperCase()}</span>
          <span className="operator-meta">
            <strong>{profile.name || 'Operator'}</strong>
            <small>{profile.age}{profile.sex === 'male' ? 'M' : 'F'} · {ageGroup(profile.age)} · {profile.standard === 'combat' ? 'COMBAT' : 'GENERAL'}</small>
          </span>
          <Activity size={14} className="operator-pulse" />
        </div>
      </div>
    </header>
  )
}