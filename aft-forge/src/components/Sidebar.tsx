import {
  BookOpen,
  Calculator,
  CalendarDays,
  Dumbbell,
  Footprints,
  LayoutDashboard,
  NotebookPen,
  Scale,
  Shield,
  Target,
} from 'lucide-react'
import type { Profile, Tab } from '../types'
import { daysBetween, todayISO } from '../lib/date'

const NAV: Array<{ id: Tab; label: string; icon: typeof LayoutDashboard; short: string }> = [
  { id: 'command', label: 'Command', icon: LayoutDashboard, short: 'Home' },
  { id: 'plan', label: 'Mission Plan', icon: CalendarDays, short: 'Plan' },
  { id: 'log', label: 'Training Log', icon: NotebookPen, short: 'Log' },
  { id: 'calc', label: 'Calculators', icon: Calculator, short: 'Calc' },
  { id: 'aft', label: 'AFT Lab', icon: Target, short: 'AFT' },
  { id: 'run', label: 'Run Lab', icon: Footprints, short: 'Run' },
  { id: 'body', label: 'Body Comp', icon: Scale, short: 'Body' },
  { id: 'armory', label: 'Armory', icon: Dumbbell, short: 'Armory' },
  { id: 'intel', label: 'Intel', icon: BookOpen, short: 'Intel' },
]

const MOBILE_IDS: Tab[] = ['command', 'plan', 'log', 'aft', 'run', 'body', 'calc']

export function Sidebar({
  active,
  onChange,
  profile,
}: {
  active: Tab
  onChange: (tab: Tab) => void
  profile: Profile
}) {
  const days = profile.testDate ? daysBetween(todayISO(), profile.testDate) : null
  const mobileNav = MOBILE_IDS
    .map((id) => NAV.find((item) => item.id === id))
    .filter((item): item is (typeof NAV)[number] => Boolean(item))

  return (
    <>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Shield size={22} strokeWidth={1.8} />
            <span className="brand-slash" />
          </div>
          <div>
            <div className="brand-name">AFT FORGE</div>
            <div className="brand-sub">SOLDIER PERFORMANCE OS</div>
          </div>
        </div>

        <div className="sidebar-label">OPERATIONS</div>
        <nav className="side-nav">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className={`side-link ${active === item.id ? 'active' : ''}`}
                onClick={() => onChange(item.id)}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
                {active === item.id && <span className="active-notch" />}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-spacer" />

        <div className="warrant-card">
          <div className="warrant-top">
            <span className="micro-label">OPERATOR</span>
            <span className="status-dot" />
          </div>
          <div className="warrant-title">{profile.name || 'SOLDIER'}</div>
          <div className="warrant-sub">
            {profile.mos ? `${profile.mos} · ` : ''}AGE {profile.age ?? '—'} · ON THIS DEVICE
          </div>
          <div className="warrant-rule" />
          <div className="warrant-row">
            <span>AFT standard</span>
            <strong>{profile.standard.toUpperCase()}</strong>
          </div>
          <div className="warrant-row">
            <span>SDC sled</span>
            <strong>{profile.sledAccess ? 'YES' : 'NO-SLED MODE'}</strong>
          </div>
          <div className="warrant-row">
            <span>Training days</span>
            <strong>{profile.trainingDays} / WK</strong>
          </div>
          <div className="warrant-row">
            <span>Test window</span>
            <strong>{days === null ? 'ALWAYS READY' : days >= 0 ? `T-${days}` : 'PAST'}</strong>
          </div>
        </div>

        <div className="sidebar-foot">
          <span className="status-dot" />
          <span>LOCAL-FIRST · NO ACCOUNT</span>
        </div>
      </aside>

      <nav className="mobile-nav" aria-label="Primary">
        {mobileNav.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-link ${active === item.id ? 'active' : ''}`}
              onClick={() => onChange(item.id)}
            >
              <Icon size={18} />
              <span>{item.short}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}