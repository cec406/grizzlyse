# AFT Forge — Soldier Performance OS

A local-first fitness operating system for Soldiers who want to be **harder to kill and harder to out-run** — AFT-ready at any point, without living around a test date. Built for the whole unit: every Soldier sets up their own profile, trains their own plan, and their data never leaves their phone.

It is intentionally opinionated: a weekly rhythm built around **your** rest days, strength twice a week, quality runs, a long engine day, an AFT rehearsal, and real housework/rest days — all built for **60–90 minutes per day** on training days.

> This is a training tool, not medical advice and not official Army policy. Verify the current standard with your S1 / test NCO before a record test.

---

## How the plan thinks

- **Rolling readiness by default.** No test date required. The plan runs 4-week cycles forever: build → build → peak → deload. Each cycle starts **~2.5% heavier** than the last (deadlift loads, HRP volume, threshold minutes, plank time, run duration), capped at +15% so it stays sane. Cycle 1 is your baseline.
- **Got a real test?** Flip **TEST SCHEDULED** on in Profile (or set a date in onboarding). The app switches to countdown mode and ends the block with a TEST week — test day on your first training day, shakeouts around it.
- **Rest days are real rest.** Pick your housework/recharge days (default: Saturday + Sunday — winter in cold country counts). The plan fills your training days in order: lower strength, threshold + SDC skill, upper strength + Zone 2, aerobic engine, AFT rehearsal, long run (when you have 6+ days).
- **Garmin Coach, done right.** With the coach overlay on, your run slots (threshold, easy/long) defer to Garmin Coach — usually 3–4 run days a week, which matches how the coaches actually schedule. The AFT rehearsal, SDC, and strength work stay prescribed here.

---

## Install it on your phone (Android)

The app is a **PWA** — a website you install like an app. It runs full-screen, works offline, and stores everything on the device. No account, no Play Store.

There are two ways to get it onto a phone:

### Option A — host it once (any HTTPS static host) → full install

A full PWA install (home-screen icon, full-screen, offline) requires HTTPS, so host the build once:

```bash
npm install
npm run build
```

**GitHub Pages (auto-deploys on every push):** keep this project in the site repo under `aft-forge/`, then open **Settings → Pages** and set **Source** to **GitHub Actions**. The workflow at `.github/workflows/deploy.yml` (repo root) runs the build and publishes the compiled app at `https://<your-domain>/aft-forge/`. It publishes the rest of the repo unchanged, so the main site keeps working. Pushing to `main` deploys automatically.

> Important: publish the **build**, not the source. Serving `aft-forge/index.html` directly leaves the page blank because it points at `/src/main.tsx`, which only the Vite dev server can serve. The manifest, service worker, and icons are copied from `public/` into `dist/` at build time, so they are only available after `npm run build`.

**Netlify / Cloudflare Pages (drag and drop):** drag the `dist` folder into [Netlify Drop](https://app.netlify.com/drop), or point Cloudflare Pages at the repo. No workflow needed.

Any other HTTPS static host works too — the build is plain static files.

Then on the phone: open the URL in Chrome → tap **Install** in the app's top bar (or Chrome menu → *Add to Home screen*). The icon lands on the home screen and the app opens full-screen, offline, forever. Use a URL you plan to keep: each origin has its own local storage, so switching URLs later means starting from the setup wizard.

### Option B — serve it from your own PC over Wi-Fi → use it live

No hosting at all: build and serve from your computer, and any phone on the same Wi-Fi can use it in its browser:

```bash
npm run phone
```

Vite prints a `Network:` URL — open it on the phone (e.g. `http://192.168.1.20:4173`). All data still lives only on the phone. This path is plain HTTP, so the browser will not offer the offline install; use Option A for that. The PC must stay on and reachable, and Windows Firewall may ask for permission the first time — allow Node.js on private networks.

### Optional — a real APK

If you need a sideloadable APK instead of a PWA, wrap it with Capacitor:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "AFT Forge" com.yourunit.aftforge --web-dir dist
npx cap add android
npx cap open android   # build/sign from Android Studio
```

## Run it locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run preview  # serve the build
```

On Windows you can also just double-click **`RUN-AFT-FORGE.bat`**. It installs dependencies if needed, starts the dev server on all network interfaces, opens the local browser, and prints a ready-to-read address block:

- the **same-device** URL for this PC, and
- an **other-devices** URL for every active network adapter (Wi-Fi, Ethernet, VPN/Tailscale) — open one of those on a phone or tablet on the same network.

Allow Node.js on private networks when Windows Firewall asks, or other devices will not be able to connect.

## What every Soldier does on first open

1. **Setup wizard (4 steps):** name / age / gender (required, no default) / MOS / standard → baseline AFT scores (blank is fine) → height, weight, waist, goals → block start, optional test date, rest days, sled access.
2. The app builds the rolling plan, scores the current AFT from the official tables, and starts the log.

**A blank slate.** No field ships pre-filled: age, weight, waist, goals, max HR, and baseline scores start empty on every device and show **—** until they are entered. Age and gender are required (the tables can't grade without them); everything else is optional and nothing is assumed. The scoring engine grades any age (17–21 through 62+) and both genders, and combat-standard scoring uses the sex-neutral tables.

**Multiple Soldiers, one phone?** Each profile lives on the device separately. Open **Profile → Operators** to switch between Soldiers, add a new one, or remove one. Handy for a shared training room tablet.

**Nothing personal ships with the app — ever.** Profiles, scores, and logs live in each device's local storage only; the hosted build contains just the app and the official scoring tables. Anyone who opens your hosted URL gets the wizard and a blank slate. App upgrades do not carry data forward: when the storage schema changes, old local data is wiped and every device returns to the wizard. If you want to keep history across upgrades, use **Profile → Device Data → Export backup** first.

## Weight tracking

Run a session from the Mission Plan and type the **load used** next to each exercise (deadlift, squats, carries, sled drags — anything). Then:

- **Training Log tab** — session-by-session records, plus per-lift progression: last load, best load (PR), and the recent trend.
- **Session prefill** — the next time the exercise appears, the field shows what you used last time.
- **Command Center** — "Recent loads" panel shows the last session's numbers.

## Cycle progression

Every 4-week cycle nudges the work up: deadlift loads +2.5%, +1 rep per HRP set, +1 minute per threshold rep, +5 sec per plank set, +5 min on the engine/long runs — all capped at +15% over baseline so it compounds slowly and stays submaximal. The Mission Plan and Command Center show which cycle you're in. When a cycle feels easy, that's the point — the next one isn't.

## Sled access (no-sled SDC mode)

If you rarely have a sled (default), every SDC block swaps to no-sled substitutes: **plate/strap drags, lateral shuttles, farmer carries, hill or stair sprints, and a no-sled SDC simulation circuit**. The Armory has a dedicated no-sled SDC section. Flip **SLED ACCESS** in Profile when you have one for a test week.

## Standards — age and gender aware

Scoring always uses the official AFT tables for **your gender and age band** (17–21 through 62+). The AFT Lab and Calculators show exactly which table is in use, e.g. *male, 32–36 band (age 35)*. Change age or gender in Profile and every table, target, pace, and plan recalculates.

**Programming follows the table, not a template.** HRP set/rep volume, plank holds, SDC round targets, run pace goals, and test-day targets are all derived from your current scores and the 90-point threshold in your own age/gender/standard table (100 points once an event is already there). The Mission Plan shows the working targets for your band, so two Soldiers on the same phone can get materially different prescriptions.

### AFT

- Five events: MDL, HRP, SDC, plank, 2-mile run
- General standard: **300 points**, 60 minimum per event
- Combat standard: **350 points**, 60 minimum per event
- Maximum: 500 points
- Official scoring tables: [AFT Scoring Scales](https://www.army.mil/e2/downloads/rv7/aft/AFT_Scoring_Scales_250601.pdf)

### CFT

- Seven continuous events in 30 minutes or less
- Pass/fail for the 24 designated combat MOSs
- Official announcement: [Combat Field Test](https://www.army.mil/article/291880/army_announces_combat_field_test_to_enhance_soldier_readiness)

### Body composition

- Waist-to-height ratio: waist measured at the navel ÷ height
- Compliant: **under 0.55**, twice per year
- Official announcement: [WHtR policy](https://www.army.mil/article/293753/army_modifies_body_composition_program_adopts_waist_to_height_ratio)

---

## Data lives on the phone

Everything — profiles, plans, logs, weights, check-ins — is stored in the device's local storage. There is no server and no account.

- The app requests **persistent storage** on install so Android will not evict it.
- **Profile → Device Data → Export backup** writes a JSON file (share it to Drive, email, or the next phone). **Import backup** restores it.
- Switching phones: export → install on the new phone → import.

## What's inside

| Section | Purpose |
|---|---|
| **Command Center** | AFT score, WHtR gate, readiness check-in, today's mission, score leverage, fuel targets, recent loads. |
| **Mission Plan** | Day-by-day plan with exact sets, reps, paces, minimum viable sessions, coach notes, calendar export, print view. |
| **Training Log** | Weight tracking: session records, lift progression, and PRs. |
| **Calculators** | AFT score calculator and waist-to-height calculator. |
| **AFT Lab** | Score analysis by age/sex band, 90-point targets, event strategy, CFT awareness. |
| **Run Lab** | 2-mile pace zones, HR zones, VDOT estimate, race-plan splits, weight-to-speed projection. |
| **Body Comp** | Waist-to-height ratio, trajectory, calorie/macros, muscle-retention rules, plateau protocol. |
| **Armory** | AFT drills, strength work, HRP density, SDC mechanics + **no-sled SDC track**, plank work. |
| **Intel** | Current AFT/CFT standards, WHtR policy, support-track context, research notes, source links. |

## Training logic

1. **Frequency beats hero sets.** HRP and plank are trained several times per week below failure.
2. **The run and plank are where points are cheap.** Most running volume is easy, with one threshold day and one AFT-specific rehearsal day.
3. **Strength is maintained, not maxed.** Quality triples and RPE-7 work protect muscle while body composition changes.
4. **The waist is the gate.** A moderate deficit, high protein, and retained strength work protect muscle while WHtR comes down.
5. **Garmin Coach runs the engine; this app runs the fight.** With the coach overlay on, run slots defer to the coach plan (3–4 days a week). AFT rehearsal, SDC, and strength stay prescribed here.

## Tech

- React 19 + TypeScript
- Vite (relative base — hosts anywhere)
- PWA: manifest, service worker, offline shell, install prompt
- Lucide icons
- Custom CSS design system
- Local-first, multi-profile persistence

Key files:

```text
src/App.tsx
src/components/          (Dashboard, PlanView, TrainingLog, Onboarding, Modals, …)
src/lib/plan.ts          (block generator, sled/no-sled swap)
src/lib/scoring.ts       (official AFT tables by age band + sex)
src/lib/lifts.ts         (weight-log helpers)
src/lib/storage.ts       (roster + per-operator persistence, backups)
src/lib/pwa.ts           (install prompt, persistent storage)
public/sw.js             (offline service worker)
public/manifest.webmanifest
scripts/make-icons.ps1   (regenerates launcher icons)
scripts/smoke-test.mjs   (headless boot check — needs: npm i --no-save jsdom)
```

---

## Legal note

AFT Forge is not affiliated with, endorsed by, or connected to the United States Army or Department of Defense. Scoring calculations are for training decisions only; official records are controlled by DTMS, graders, medical policy, and unit command.