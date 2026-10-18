// Headless smoke test: boots the built bundle in jsdom and checks the first-run
// flow, rolling-mode plan behavior, and that nothing personal (255A, seeded
// scores) ships in the hosted build.
// Requires: npm i --no-save jsdom
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'

const html = readFileSync('dist/index.html', 'utf8')
const scriptSrc = html.match(/src="\.\/(assets\/[^"]+\.js)"/)[1]
const bundle = readFileSync(`dist/${scriptSrc}`, 'utf8')
const cssPath = html.match(/href="\.\/(assets\/[^"]+\.css)"/)[1]
const css = readFileSync(`dist/${cssPath}`, 'utf8')

function boot({ storage = {}, waitFor = 400 } = {}) {
  return new Promise((resolve) => {
    const dom = new JSDOM(html.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/, ''), {
      url: 'http://127.0.0.1:5173/',
      runScripts: 'outside-only',
      pretendToBeVisual: true,
    })
    dom.window.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} })
    Object.defineProperty(dom.window.navigator, 'serviceWorker', { value: { register: async () => undefined }, configurable: true })
    const errors = []
    dom.window.addEventListener('error', (event) => errors.push(String(event.error ?? event.message)))
    dom.window.console.error = (...args) => errors.push(args.map(String).join(' '))
    for (const [key, value] of Object.entries(storage)) dom.window.localStorage.setItem(key, value)
    try {
      dom.window.eval(bundle)
    } catch (error) {
      errors.push('EVAL THREW: ' + String(error))
    }
    setTimeout(() => resolve({ dom, errors, out: dom.window.document.getElementById('root').innerHTML }), waitFor)
  })
}

const profile = {
  name: 'SGT Test',
  age: 35,
  sex: 'male',
  heightIn: 70,
  weightLb: 235,
  waistIn: 40.5,
  goalWeightLb: 200,
  goalWaistIn: 38.5,
  // Deliberately neutral: the app must work for any Soldier and ship with no
  // personal data. MOS is only asked in the wizard, never baked in.
  mos: '11B',
  standard: 'general',
  startDate: '2026-10-12',
  testDate: '',
  restDays: [0, 6],
  trainingDays: 5,
  sessionMinutes: 75,
  maxHr: 195,
  restingHr: 58,
  garminOverlay: false,
  sledAccess: false,
  scores: { mdl: 350, hrp: 36, sdc: 120, plk: 120, run: 1094 },
}

const roster = {
  version: 3,
  activeId: 'testop',
  members: [{ id: 'testop', name: 'SGT Test', mos: '11B', updatedAt: '2026-01-01' }],
}

const checks = []
const record = (label, ok) => checks.push([label, ok])

// 1. Fresh install -> onboarding wizard, neutral defaults
{
  const { out, errors } = await boot()
  record('onboarding rendered', /Build your operator profile/i.test(out))
  record('onboarding requires an explicit gender', /GENDER/.test(out) && /Male \(M\)/.test(out) && /Female \(F\)/.test(out))
  record('no runtime errors (fresh)', errors.length === 0)
}

// 2. Existing operator, rolling mode (no test date, weekend rest)
{
  const { out, errors } = await boot({
    storage: {
      'forge.roster.v1': JSON.stringify(roster),
      'forge.profile.v2.testop': JSON.stringify(profile),
    },
  })
  record('app shell rendered', /Command Center/i.test(out))
  record('rolling mode: no fake countdown', /NO TEST SCHEDULED/i.test(out) || /ALWAYS READY/i.test(out))
  // Today (run day) is Saturday 17 Oct 2026 -> must be a Rest day, and Monday
  // must be a training day. This catches weekday-vs-position mismatches.
  record('saturday is a Rest day', /<strong>Rest<\/strong>/.test(out))
  record('monday is a training day', /<strong>Lower<\/strong>/.test(out))
  record('cycle shown', /CYCLE/i.test(out))
  record('no runtime errors (shell)', errors.length === 0)
}

// 2b. Same profile but a Sunday start date â€” rest days must still land on the
// real Saturday/Sunday, not drift with the week's starting weekday.
{
  const { out } = await boot({
    storage: {
      'forge.roster.v1': JSON.stringify(roster),
      'forge.profile.v2.testop': JSON.stringify({ ...profile, startDate: '2026-10-11' }),
    },
  })
  record('non-monday start: sat/sun rest', (out.match(/<strong>Rest<\/strong>/g) || []).length >= 2)
  record('non-monday start: monday trains', /<strong>Lower<\/strong>/.test(out))
}

// 2c. Blank slate profile (nothing entered) must render empty fields — no baked-in
// defaults (age 30 / 180 lb / 185 bpm), and no runtime errors from the nulls.
{
  const { out, errors } = await boot({
    storage: {
      'forge.roster.v1': JSON.stringify(roster),
      'forge.profile.v2.testop': JSON.stringify({
        ...profile,
        age: null,
        heightIn: null,
        weightLb: null,
        waistIn: null,
        goalWeightLb: null,
        goalWaistIn: null,
        maxHr: null,
        restingHr: null,
        scores: { mdl: 0, hrp: 0, sdc: 0, plk: 0, run: 0 },
      }),
    },
  })
  record('blank slate renders shell', /Command Center/i.test(out))
  record('blank slate: no runtime errors', errors.length === 0)
  record('blank slate: no baked-in defaults', !/AGE 30|180 lb|185 bpm/.test(out))
}

// 3. Old-schema data (no version marker) is wiped -> blank slate -> wizard.
{
  const { out, dom } = await boot({
    storage: {
      // A pre-versioning roster plus stale personal profiles — must be discarded.
      'forge.roster.v1': JSON.stringify({ activeId: 'old', members: [{ id: 'old', name: 'Old Operator', mos: '255A', updatedAt: '2025-01-01' }] }),
      'forge.profile.v2.old': JSON.stringify({ ...profile, mos: '255A', name: 'Old Operator' }),
      'forge.profile.v1': JSON.stringify({ name: 'Ancient', age: 99 }),
    },
    waitFor: 500,
  })
  record('stale data wiped -> wizard shows', /Build your operator profile/i.test(out))
  record('stale data wiped -> storage cleared', dom.window.localStorage.getItem('forge.profile.v2.old') === null)
  record('wipe removed ancient v1 data', dom.window.localStorage.getItem('forge.profile.v1') === null)
  record('fresh roster written with version', (dom.window.localStorage.getItem('forge.roster.v1') || '').includes('"version":3'))
}

// 4. Hosted-build content scan: no personal data baked into the bundle
// (Note: "18:14" legitimately exists inside the official run scoring table,
// so it cannot be used as a personal-data marker.)
record('bundle has no 255A', !/255A/.test(bundle))
record('bundle has no mos default', !/"mos":"255A"/.test(bundle) && !/mos:\s*'255A'/.test(bundle))
record('css has no 255A', !/255A/.test(css))

let failed = 0
for (const [label, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`)
  if (!ok) failed += 1
}
process.exit(failed ? 1 : 0)