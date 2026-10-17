import {
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  Check,
  ExternalLink,
  FileText,
  HeartPulse,
  Info,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Target,
} from 'lucide-react'
import type { Profile } from '../types'
import { sources } from '../data/sources'
import {
  EVENT_KEYS,
  EVENT_META,
  maxWaist,
  thresholdForPoints,
  waistToHeight,
} from '../lib/scoring'
import { formatInches } from '../lib/metrics'
import { Eyebrow, Panel, Pill, SectionHeader } from './ui'

const CFT_EVENTS = [
  ['01', '1-mile run'],
  ['02', '30 dead-stop push-ups'],
  ['03', '100 m sprint'],
  ['04', '16 × 40 lb sandbag lifts to 65 in'],
  ['05', '50 m carry of two 40 lb water cans'],
  ['06', '50 m high crawl + 3–5 second rush'],
  ['07', '1-mile run'],
]

export function Intel({ profile }: { profile: Profile }) {
  const ratio = waistToHeight(profile.waistIn, profile.heightIn)
  const limit = maxWaist(profile.heightIn)

  return (
    <div className="intel-page">
      <Panel className="intel-hero">
        <div className="intel-hero-copy">
          <Eyebrow>INTEL / CURRENT AS OF OCTOBER 2026</Eyebrow>
          <h2>Current test standards.</h2>
          <p>
            The AFT is the test of record. The CFT is now the combat-specific test for 24 MOSs. The old
            height/weight tables and tape test are gone, replaced by waist-to-height ratio. This page is
            the source of truth for what the app is training you to pass.
          </p>
          <div className="intel-hero-badges">
            <Pill tone="lime" dot>{profile.standard === 'combat' ? 'AFT COMBAT: 350' : 'AFT GENERAL: 300'}</Pill>
            <Pill tone="amber">WHtR UNDER 0.55</Pill>
            <Pill tone={ratio < 0.55 ? 'lime' : 'red'}>WHtR {ratio.toFixed(3)}</Pill>
          </div>
        </div>
        <div className="intel-hero-side">
          <div className="intel-verdict">
            <span className="micro-label">YOUR TEST POSTURE</span>
            <strong>{profile.mos ? `${profile.mos} · ` : ''}{profile.standard === 'combat' ? 'COMBAT AFT' : 'GENERAL AFT'}</strong>
            <p>
              {profile.standard === 'combat'
                ? 'Combat standard: 350 total, 60 minimum per event. CFT testing applies to the 24 designated combat specialties.'
                : 'General standard: 300 total, 60 minimum per event. The CFT only applies if you are on the 24 listed combat specialties.'}
            </p>
            <div className="intel-verdict-row">
              <span>AFT</span>
              <strong>2× / year</strong>
            </div>
            <div className="intel-verdict-row">
              <span>WHtR</span>
              <strong>2× / year</strong>
            </div>
            <div className="intel-verdict-row">
              <span>Max waist</span>
              <strong>{formatInches(limit)}</strong>
            </div>
          </div>
          <div className="intel-verdict-note">
            <Info size={15} />
            <span>Source links are at the bottom. Verify with your S1 / test NCO before a record test.</span>
          </div>
        </div>
      </Panel>

      <div className="intel-grid">
        <div className="intel-main">
          <Panel className="aft-standards-panel">
            <SectionHeader
              eyebrow="AFT / FIVE EVENTS"
              title="The test of record."
              description="General standard: 300 total with at least 60 points per event. Combat standard: 350 total with at least 60 per event. Maximum 500."
              action={<Pill tone="lime">EFFECTIVE 1 JUN 2025</Pill>}
            />
            <div className="standards-table">
              <div className="standards-head">
                <span>EVENT</span>
                <span>60 PTS</span>
                <span>90 PTS</span>
                <span>100 PTS</span>
              </div>
              {EVENT_KEYS.map((event) => {
                const p60 = thresholdForPoints(event, 60, profile, profile.standard)
                const p90 = thresholdForPoints(event, 90, profile, profile.standard)
                const p100 = thresholdForPoints(event, 100, profile, profile.standard)
                return (
                  <div key={event} className="standards-row">
                    <div>
                      <span className={`event-icon small event-${event}`}>{EVENT_META[event].short}</span>
                      <strong>{EVENT_META[event].label}</strong>
                    </div>
                    <span>{p60 ?? '—'}</span>
                    <span>{p90 ?? '—'}</span>
                    <span>{p100 ?? '—'}</span>
                  </div>
                )
              })}
            </div>
            <div className="standards-note">
              <Shield size={16} />
              <p>
                These rows reflect your current profile: age {profile.age}, {profile.sex}, {profile.standard} standard.
                Combat scoring is sex-neutral but still age-normed.
              </p>
            </div>
          </Panel>

          <Panel className="cft-intel-panel">
            <SectionHeader
              eyebrow="CFT / COMBAT FIELD TEST"
              title="Seven events. Thirty minutes. Pass/fail."
              description="The CFT does not replace the AFT. Combat-MOS Soldiers take both. It is a continuous sequence in ACU, boots, and brown T-shirt."
              action={<Pill tone="red">24 COMBAT MOSs</Pill>}
            />
            <div className="cft-intel-layout">
              <div className="cft-intel-list">
                {CFT_EVENTS.map(([number, event]) => (
                  <div key={number} className="cft-intel-row">
                    <span>{number}</span>
                    <strong>{event}</strong>
                  </div>
                ))}
              </div>
              <div className="cft-intel-side">
                <div className="cft-cap">
                  <CalendarClock size={20} />
                  <div>
                    <span>TIME CAP</span>
                    <strong>30:00</strong>
                    <small>entire sequence</small>
                  </div>
                </div>
                <div className="cft-intel-fact">
                  <strong>Diagnostic year</strong>
                  <p>17 Apr 2026 – 16 Apr 2027. Record testing begins 17 Apr 2027.</p>
                </div>
                <div className="cft-intel-fact">
                  <strong>Support MOSs</strong>
                  <p>Not on the 24-MOS CFT list. Build AFT first; CFT is a later, optional block.</p>
                </div>
                <div className="cft-intel-fact">
                  <strong>Scoring</strong>
                  <p>Pass/fail. No age or sex adjustment. Complete all seven events inside 30 minutes.</p>
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="research-panel">
            <SectionHeader
              eyebrow="RESEARCH BASE"
              title="The app’s operating assumptions."
              description="Not a literature review. The minimum evidence behind the big choices: easy volume, one threshold day, protein, resistance training, and waist circumference."
            />
            <div className="research-grid">
              <div className="research-card">
                <div className="research-icon"><BookOpen size={17} /></div>
                <strong>Polarized / 80-20 endurance</strong>
                <p>
                  A 2024 meta-analysis found polarized training improved VO2peak, especially in shorter
                  blocks, while time-trial effects were similar to other distributions. Translation: keep
                  most running easy, keep one or two hard sessions, and be patient.
                </p>
                <span className="research-tag">Oliveira et al., Sports Medicine, 2024</span>
              </div>
              <div className="research-card">
                <div className="research-icon"><ShieldCheck size={17} /></div>
                <strong>Protein + resistance training in a deficit</strong>
                <p>
                  Protein supplementation plateaus around 1.6 g/kg/day for hypertrophy; a deficit raises
                  the stakes. Resistance training and high protein are the main levers for preserving lean
                  mass while the waist comes down.
                </p>
                <span className="research-tag">Morton 2018 · Helms 2014 · Roth 2022</span>
              </div>
              <div className="research-card">
                <div className="research-icon"><Target size={17} /></div>
                <strong>Waist-to-height ratio</strong>
                <p>
                  WHtR outperforms BMI and waist circumference as a simple cardiometabolic screen in a
                  large systematic review. The Army’s 0.55 cut is stricter than the common 0.50 “half your
                  height” public-health message.
                </p>
                <span className="research-tag">Ashwell et al., Obesity Reviews, 2012</span>
              </div>
              <div className="research-card">
                <div className="research-icon"><HeartPulse size={17} /></div>
                <strong>Why observed max HR matters</strong>
                <p>
                  Use an observed max HR for zones when you have one; age formulas are only estimates.
                  Most aerobic adaptation happens below threshold.
                </p>
                <span className="research-tag">Field observation + standard HR-zone practice</span>
              </div>
            </div>
          </Panel>

          <Panel className="timeline-panel">
            <SectionHeader eyebrow="WHAT CHANGED" title="The short timeline." />
            <div className="timeline">
              <div><span>JUN 2025</span><strong>AFT becomes test of record</strong><p>Five events; standing power throw removed.</p></div>
              <div><span>JAN 2026</span><strong>Combat AFT standard</strong><p>350 total / 60 min per event for 21 combat MOSs; expanded to 24 in 2026.</p></div>
              <div><span>APR 2026</span><strong>CFT announced</strong><p>Seven-event, 30-minute pass/fail test for 24 combat MOSs. Diagnostic year begins.</p></div>
              <div><span>JUL 2026</span><strong>WHtR replaces tape test</strong><p>Waist at navel ÷ height. Under 0.55. Twice per year.</p></div>
              <div><span>APR 2027</span><strong>CFT record testing</strong><p>Failures count; retest and reclassification rules apply.</p></div>
            </div>
          </Panel>
        </div>

        <aside className="intel-side">
          <Panel className="warrant-intel">
            <div className="panel-topline">
              <Eyebrow>SUPPORT TRACK</Eyebrow>
              <Pill tone="lime">{profile.standard.toUpperCase()}</Pill>
            </div>
            <h3>Support and technical specialties</h3>
            <p>
              Most support MOSs — technical warrants, medics, admins, mechanics — train on the general AFT
              standard and WHtR. The CFT applies only to the 24 designated combat specialties. Training to
              the combat standard (350) adds margin.
            </p>
            <div className="warrant-intel-list">
              <div><Check size={14} /> AFT general 300 / 60 min per event</div>
              <div><Check size={14} /> WHtR under 0.55</div>
              <div><Check size={14} /> CFT only for listed combat MOSs</div>
              <div><Check size={14} /> Combat standard: 350 for extra margin</div>
            </div>
            <a className="source-link" href="https://www.army.mil/aft" target="_blank" rel="noreferrer">
              Official AFT + standards <ExternalLink size={13} />
            </a>
          </Panel>

          <Panel className="whtr-intel">
            <div className="panel-topline">
              <Eyebrow>WHtR QUICK CARD</Eyebrow>
              <Pill tone={ratio < 0.55 ? 'lime' : 'red'}>{ratio < 0.55 ? 'PASS' : 'FAIL'}</Pill>
            </div>
            <div className="whtr-intel-big">
              <strong>{ratio.toFixed(3)}</strong>
              <span>current ratio</span>
            </div>
            <div className="whtr-intel-rows">
              <div><span>Height</span><strong>{profile.heightIn} in</strong></div>
              <div><span>Waist</span><strong>{formatInches(profile.waistIn)}</strong></div>
              <div><span>Max waist</span><strong>{formatInches(limit)}</strong></div>
              <div><span>Standard</span><strong>&lt; 0.550</strong></div>
            </div>
            <p className="whtr-intel-copy">
              Measure at the navel, not the narrowest point. End of normal exhale. Tape snug, not
              compressing skin. A 0.55 or higher triggers a confirmation test and ABCP enrollment.
            </p>
            <a className="source-link" href="https://www.army.mil/article/293753/army_modifies_body_composition_program_adopts_waist_to_height_ratio" target="_blank" rel="noreferrer">
              Army announcement <ExternalLink size={13} />
            </a>
          </Panel>

          <Panel className="sources-panel">
            <SectionHeader eyebrow="SOURCES" title="Read the primary docs." />
            <div className="source-list">
              {sources.map((source) => (
                <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="source-row">
                  <div className="source-icon">
                    {source.tag === 'Research' ? <BookOpen size={15} /> : <FileText size={15} />}
                  </div>
                  <div>
                    <strong>{source.title}</strong>
                    <small>{source.publisher} · {source.year}</small>
                    <p>{source.note}</p>
                  </div>
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </Panel>

          <Panel className="guardrail-panel">
            <div className="guardrail-head">
              <ShieldAlert size={19} />
              <div>
                <strong>Medical guardrail</strong>
                <p>Training tool, not medical advice.</p>
              </div>
            </div>
            <p>
              Get evaluated before starting if you have chest pain, fainting, uncontrolled blood pressure,
              diabetes complications, a recent injury, or you are over 40 and new to vigorous exercise. Stop
              if you have chest pain, palpitations, dizziness, or unusual shortness of breath.
            </p>
            <div className="guardrail-foot">
              <span>Army H2F resources</span>
              <a href="https://www.army.mil/aft" target="_blank" rel="noreferrer">army.mil/aft <ExternalLink size={12} /></a>
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  )
}
