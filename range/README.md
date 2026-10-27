# GRIZZLY RANGE / GRIZZLY LAB

The lab shell now lives **inside the five training apps**. `/range/` is an optional operator desktop built on the same machine registry. Nothing in the app engines was rewritten.

## Layer 1 - the in-app lab shell

Each of these files now loads the shared shell:

```
gsehack/index.html
gitcicd/index.html
cybercrime/index.html
csia/index.html
compsci/index.html
```

with:

```html
<link rel="stylesheet" href="../range/labshell.css">
<script src="../range/machines.js" defer></script>
<script src="../range/practice.js" defer></script>
<script src="../range/labshell.js" data-machine="gsehack" defer></script>
```

What the shell adds on a direct app URL:

- **Boot handshake** on the first visit per browser session: machine code, host, save found/new, synthetic-link warning, click/Enter to skip.
- **A right-edge `GRIZZLY LAB` tab** with the machine code and live progress.
- **A dock** with:
  - progress, XP/points, tracked items, last seen, storage key
  - the machine brief and next step
  - a mini console: `help`, `status`, `brief`, `hint`, `scan`, `range`, `lab`, `reset`, `clear`
  - **Practice** - opens the app's own free-play sandbox / Git sandbox / Tool box / terminal
  - **Hint** - triggers the app's own hint control
  - links to the operator desktop, Range Ops, the dedicated lab view, and a reset
- **No app logic changes.** Progress is read from the app's own `localStorage` key. The shell only writes when you explicitly reset.

Keyboard: **Ctrl+Shift+L** toggles the dock, **Esc** closes it.

### Test / automation guard

The shell is intentionally disabled when:

- it is inside an iframe (the hub and machine view already provide chrome), or
- `navigator.webdriver` is true / the UA is jsdom/HeadlessChrome, or
- the URL hash starts with `#smoke`.

Add **`?lab=1`** to force it in a headless browser, e.g. `/gsehack/?lab=1`. This keeps the apps' existing automated UI tests and `#smoke` harness clean.

## Layer 2 - the optional operator desktop

```
https://grizzlyse.com/range/
```

- **Range Ops** - a graded work-order board. Each order names the machine, the scenario, the acceptance criteria, and points. **Open machine** boots the app; **Practice** launches the app's sandbox/terminal; **Lab view** opens `machine.html?m=<id>` for that order; **Validate** reads the app's own save.
- **Machine Bay** - five cards, progress read from each app, boot in an in-window iframe. The big button always targets the next incomplete machine and reads Resume or Start honestly.
- **Operator Console** - `machines`, `status`, `scan` (distinguishes found saves from empty ones), `launch gsehack`, `brief cybercrime`, `reset csia confirm`.
- **Range Status** - aggregate readiness, per-machine detail, next action.
- **Field Notes** - operator handbook, route, safety rules.
- **Machine view** - `/range/machine.html?m=<id>` is a dedicated workstation rail around one app. Unknown `?m=` values say so instead of silently loading M-01.

Range Ops currently tracks 12 work orders across the five machines: terminal basics, permissions, log triage, GSEHACK missions, Git commits, CODEWATCH cases, Cyber Aware modules, the assessment, and a cross-machine task. Completion is stored separately in `grizzlyrange.ops.v1`; machine progress is never modified by validation.

Both layers use the same `machines.js` registry, so progress is consistent.

## Progress keys

| Machine | App path | Key | Tracked |
|---|---|---|---|
| M-01 ZeroDay Academy | `../compsci/` | `zer0day-academy-v1` | 35 missions |
| M-02 GSEHACK | `../gsehack/` | `grizzlyse.save` | 5 missions |
| M-03 CODEWATCH | `../cybercrime/` | `codewatch_save_v2` | 11 cases |
| M-04 GitCI/CD Hero | `../gitcicd/` | `gitcicd.hero.save.v1` | 46 missions |
| M-05 Cyber Aware | `../csia/` | `cyberaware.save.v1` | 10 modules |

The shell **reads** those keys and never writes them except on explicit reset. Resetting deletes only that app's key plus `grizzlyrange.visit.<id>`.

## Files

```
range/labshell.js     in-app boot, tab, dock, console, hints, practice
range/labshell.css    in-app shell styles
range/practice.js     finds each app's sandbox/practice control
range/machines.js     machine registry + localStorage adapters
range/index.html      optional operator desktop
range/range.css       desktop + window + bay + console styles
range/range.js        desktop shell, machine bay, console, status, notes
range/machine.html    optional single-machine lab view
range/machine.css     lab-view layout
range/machine.js      lab-view progress polling, reset, switcher
range/README.md       this file
```

No build step, dependencies, or external requests.

## Adding a machine

1. Add an object to `RANGE_MACHINES` in `machines.js`.
2. Provide `id`, `code`, `name`, `role`, `tagline`, `brief`, `next`, `href` (relative from `range/`), `accent`, an icon name, `total`, `key`, and a defensive `read(raw)` returning:
   ```js
   { pct, modulesDone, total, xp, label, detail }
   ```
3. Add the two scripts to that app's `index.html` with the new `data-machine`.
4. It appears in the in-app shell, desktop, bay, status board, console aliases, start menu, and machine switcher.

## Reset behavior

- In-app dock -> **Reset progress** (confirmation) reloads the app.
- Lab view -> **Reset progress** clears that key and reloads the iframe.
- Range Status -> **Reset all range progress** clears all five keys.
- Console -> `reset <machine> confirm`.

The desktop shell key is `grizzlyrange.shell.v1` (boot/sign-in/intro). It contains no learner progress.

## Verification

- In-app shell tested on all five apps at 1440x900: boot overlay, tab, dock, console (`status`, `hint`), Practice, progress adapters.
- Range Ops tested: 12 work orders render; a mocked save validates `ZERO-01` and awards points; reset clears only the board.
- Practice deep links tested: compsci opens Free-play sandbox, gitcicd opens Git sandbox, csia opens Tool box, cybercrime opens Quick Drills, gsehack focuses the terminal.
- Local file links verified: projects/homepage now target explicit `index.html` files, so no directory listing.
- Existing app self-tests still pass:
  - `gitcicd`: all checks passed
  - `csia`: all checks passed
  - `compsci`: 161 tests passed
- Operator desktop tested at 1440x900 and 480x820: boot -> lock -> desktop, bay, status, console, notes, all five lab views.
- No page errors from the shell. No changes to the Spanish or Russian apps.

## Notes

- Serve over HTTP (not `file://`) for the optional iframe views and compsci's ES modules. The in-app shell itself works on any static host.
- All five apps remain independently usable; the shell is additive.
- The range is synthetic. It does not touch a real network or upload progress.
- Spanish and Russian apps are intentionally untouched.
