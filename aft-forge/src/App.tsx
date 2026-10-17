import { useEffect, useMemo, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Dashboard } from './components/Dashboard'
import { PlanView } from './components/PlanView'
import { AftLab } from './components/AftLab'
import { RunLab } from './components/RunLab'
import { BodyComp } from './components/BodyComp'
import { Armory } from './components/Armory'
import { Intel } from './components/Intel'
import { Calculators } from './components/Calculators'
import { TrainingLog } from './components/TrainingLog'
import { Onboarding } from './components/Onboarding'
import {
  ConfirmResetModal,
  ProfileModal,
  QuickLogModal,
  SessionModal,
} from './components/Modals'
import type { DayPlan, LiftEntry, LogState, Profile, Scores, Tab } from './types'
import { buildProgram } from './lib/plan'
import { computeAft } from './lib/scoring'
import { readinessScore } from './lib/metrics'
import { lastWeights } from './lib/lifts'
import { useInstallState, requestPersistentStorage } from './lib/pwa'
import {
  clearOperator,
  exportAll,
  loadLogsFor,
  loadProfileFor,
  loadRoster,
  makeDefaultLogs,
  makeDefaultProfile,
  parseBackup,
  saveLogsFor,
  saveProfileFor,
  saveRoster,
  SCHEMA_VERSION,
  type Roster,
} from './lib/storage'
import { todayISO } from './lib/date'

function App() {
  const [roster, setRoster] = useState<Roster>(() => loadRoster())
  const [profile, setProfile] = useState<Profile>(() =>
    roster.activeId ? loadProfileFor(roster.activeId) : makeDefaultProfile(),
  )
  const [logs, setLogs] = useState<LogState>(() =>
    roster.activeId ? loadLogsFor(roster.activeId) : makeDefaultLogs(),
  )
  const [activeTab, setActiveTab] = useState<Tab>('command')
  const [profileOpen, setProfileOpen] = useState(false)
  const [logOpen, setLogOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [sessionDay, setSessionDay] = useState<DayPlan | null>(null)
  const [sessionOpen, setSessionOpen] = useState(false)
  const [wizardOpen, setWizardOpen] = useState(false)
  const { canInstall, installed, install } = useInstallState()

  const activeId = roster.activeId
  const program = useMemo(() => buildProgram(profile), [profile])
  const aft = useMemo(() => computeAft(profile.scores, profile, profile.standard), [profile])
  const lifts = useMemo(() => lastWeights(logs), [logs])

  useEffect(() => {
    saveRoster(roster)
  }, [roster])

  useEffect(() => {
    if (activeId) saveProfileFor(activeId, profile)
  }, [activeId, profile])

  useEffect(() => {
    if (activeId) saveLogsFor(activeId, logs)
  }, [activeId, logs])

  useEffect(() => {
    void requestPersistentStorage()
  }, [])

  function navigate(tab: Tab) {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function startSession(day: DayPlan) {
    setSessionDay(day)
    setSessionOpen(true)
  }

  function completeSession(day: DayPlan, entries: LiftEntry[]) {
    const date = todayISO()
    const id = `${day.id}#${date}`
    setLogs((current) => {
      const without = current.workouts.filter((workout) => workout.id !== id)
      return {
        ...current,
        completed: { ...current.completed, [day.id]: true },
        workouts: entries.length > 0 ? [...without, { id, date, dayId: day.id, title: day.title, entries }] : without,
      }
    })
    setSessionOpen(false)
  }

  function saveProfile(next: Profile) {
    setProfile(next)
    setRoster((current) => ({
      ...current,
      members: current.members.map((member) =>
        member.id === activeId
          ? { ...member, name: next.name || 'Operator', mos: next.mos, updatedAt: todayISO() }
          : member,
      ),
    }))
  }

  function saveScores(scores: Scores) {
    setProfile((current) => ({ ...current, scores }))
  }

  function saveBody(weightLb: number, waistIn?: number, date = todayISO()) {
    setLogs((current) => {
      const existingIndex = current.body.findIndex((entry) => entry.date === date)
      const entry = { date, weightLb, waistIn }
      const body = [...current.body]
      if (existingIndex >= 0) body[existingIndex] = entry
      else body.push(entry)
      return { ...current, body }
    })
    setProfile((current) => ({
      ...current,
      weightLb,
      waistIn: waistIn ?? current.waistIn,
    }))
  }

  function saveCheckin(values: {
    weight: number
    waist: number
    sleep: number
    soreness: number
    stress: number
  }) {
    const date = todayISO()
    const readiness = readinessScore(values.sleep, values.soreness, values.stress)
    saveBody(values.weight, values.waist, date)
    setLogs((current) => {
      const withoutToday = current.checkins.filter((entry) => entry.date !== date)
      return {
        ...current,
        checkins: [
          ...withoutToday,
          {
            date,
            sleep: values.sleep,
            soreness: values.soreness,
            stress: values.stress,
            readiness,
          },
        ],
      }
    })
  }

  function createOperator(next: Profile) {
    const id = `p${Date.now().toString(36)}`
    saveProfileFor(id, next)
    saveLogsFor(id, makeDefaultLogs(next))
    const nextRoster: Roster = {
      version: SCHEMA_VERSION,
      activeId: id,
      members: [
        ...roster.members,
        { id, name: next.name || 'Operator', mos: next.mos, updatedAt: todayISO() },
      ],
    }
    setRoster(nextRoster)
    setProfile(next)
    setLogs(makeDefaultLogs(next))
    setWizardOpen(false)
    setActiveTab('command')
  }

  function switchOperator(id: string) {
    setRoster((current) => ({ ...current, activeId: id }))
    setProfile(loadProfileFor(id))
    setLogs(loadLogsFor(id))
    setProfileOpen(false)
    setActiveTab('command')
  }

  function deleteOperator(id: string) {
    clearOperator(id)
    const members = roster.members.filter((member) => member.id !== id)
    const nextRoster: Roster = {
      version: SCHEMA_VERSION,
      activeId: roster.activeId === id ? null : roster.activeId,
      members,
    }
    setRoster(nextRoster)
    if (roster.activeId === id) {
      setProfile(makeDefaultProfile())
      setLogs(makeDefaultLogs())
    }
  }

  function resetOperator() {
    if (activeId) clearOperator(activeId)
    const freshProfile = makeDefaultProfile()
    setProfile(freshProfile)
    setLogs(makeDefaultLogs())
    setRoster((current) => ({
      ...current,
      members: current.members.map((member) =>
        member.id === activeId ? { ...member, updatedAt: todayISO() } : member,
      ),
    }))
    setResetOpen(false)
    setProfileOpen(false)
    setActiveTab('command')
  }

  function downloadBackup() {
    const blob = new Blob([exportAll(profile, logs)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `aft-forge-backup-${todayISO()}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function importBackup(text: string): boolean {
    const parsed = parseBackup(text)
    if (!parsed) return false
    setProfile(parsed.profile)
    setLogs(parsed.logs)
    setActiveTab('command')
    return true
  }

  if (!activeId) {
    return (
      <Onboarding
        onCreate={createOperator}
        onCancel={roster.members.length > 0 ? () => switchOperator(roster.members[0].id) : undefined}
      />
    )
  }

  return (
    <div className="app-shell">
      <Sidebar active={activeTab} onChange={navigate} profile={profile} />
      <main className="app-main">
        <TopBar
          active={activeTab}
          profile={profile}
          canInstall={canInstall}
          installed={installed}
          onInstall={() => void install()}
          onOpenLog={() => setLogOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
        />
        <div className="page-content">
          {activeTab === 'command' && (
            <Dashboard
              profile={profile}
              logs={logs}
              program={program}
              aft={aft}
              onNavigate={navigate}
              onStartSession={startSession}
              onOpenLog={() => setLogOpen(true)}
            />
          )}
          {activeTab === 'plan' && (
            <PlanView profile={profile} program={program} logs={logs} onStartSession={startSession} />
          )}
          {activeTab === 'log' && <TrainingLog logs={logs} />}
          {activeTab === 'aft' && (
            <AftLab
              profile={profile}
              onSaveScores={saveScores}
              onSaveBody={saveBody}
              onUpdateProfile={setProfile}
            />
          )}
          {activeTab === 'run' && (
            <RunLab profile={profile} logs={logs} program={program} onUpdateProfile={setProfile} />
          )}
          {activeTab === 'body' && (
            <BodyComp profile={profile} logs={logs} onSaveBody={saveBody} />
          )}
          {activeTab === 'armory' && <Armory profile={profile} />}
          {activeTab === 'intel' && <Intel profile={profile} />}
          {activeTab === 'calc' && (
            <Calculators profile={profile} onUpdateProfile={setProfile} />
          )}
        </div>
        <footer className="app-footer">
          <span>AFT FORGE / LOCAL-FIRST / NO ACCOUNT</span>
          <span>Built for the 60–90 minute Soldier. Not medical advice.</span>
        </footer>
      </main>

      <ProfileModal
        open={profileOpen}
        profile={profile}
        members={roster.members}
        activeId={activeId}
        canInstall={canInstall}
        installed={installed}
        onClose={() => setProfileOpen(false)}
        onSave={saveProfile}
        onReset={() => setResetOpen(true)}
        onSwitchProfile={switchOperator}
        onNewProfile={() => {
          setProfileOpen(false)
          setWizardOpen(true)
        }}
        onDeleteProfile={deleteOperator}
        onExport={downloadBackup}
        onImport={importBackup}
        onInstall={() => void install()}
      />
      <QuickLogModal
        open={logOpen}
        profile={profile}
        onClose={() => setLogOpen(false)}
        onSave={saveCheckin}
      />
      <SessionModal
        open={sessionOpen}
        day={sessionDay}
        lastWeights={lifts}
        onClose={() => setSessionOpen(false)}
        onComplete={completeSession}
      />
      <ConfirmResetModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={resetOperator}
      />
      {wizardOpen && (
        <div className="wizard-overlay">
          <Onboarding
            onCreate={createOperator}
            onCancel={() => setWizardOpen(false)}
          />
        </div>
      )}
    </div>
  )
}

export default App