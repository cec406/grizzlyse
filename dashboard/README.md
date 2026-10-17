# GrizzWorks — the mini-ERP for shops that hate subscriptions

One app that runs the whole business: **jobs, quotes, invoices, payments,
purchase orders, vendor bills, stock, work orders, time and reports** —
plus the maintenance machinery (assets, PM schedules, crew, kiosk wall board)
it grew from. Everything is editable in place, shared over the shop LAN in
real time, stored in **one file you own**, on hardware you already have.

No subscriptions, no per-user seats, no cloud, no `npm install`. A spreadsheet
you can't outgrow.

It runs **two ways from the same code**:

- **Demo mode** — no server. The whole business runs in the browser with seeded
  sample data saved in the visitor's browser. This is what you get when you
  open the files directly or host the folder on any static website — a fully
  clickable demo of the real posting engine.
- **Server mode** — run the zero-dependency Node server and every screen on
  the shop network shares one live database (`data/db.json`) with instant
  updates over Server-Sent Events.

---

## Highlights

- **The books keep themselves.** Send an invoice and receivables, income, tax
  and cost-of-goods post to a double-entry ledger automatically. Record a
  payment and the balance updates everywhere. Void a document and mirrored
  reversals are appended — history is never edited.
- **Documents with line items.** Quotes → invoices → payments on the sell
  side; purchase orders → goods receipts → vendor bills → payments on the buy
  side. Parts pull price and stock from inventory; labor pulls your default
  rate.
- **Job costing for construction & trades.** Tag invoices, POs, bills, work
  orders and time to a job; the Job Costing report shows invoiced vs costs vs
  margin per job, live.
- **Stock that tells the truth.** On-hand qty is maintained by an append-only
  moves ledger (purchases, sales, adjustments), valued at moving-average cost.
  Per-part history is one click away.
- **Reports a human can read.** Profit & Loss, AR/AP aging, job costing,
  inventory valuation, sales by customer, and the raw journal your accountant
  gets as a CSV-able export.
- **Business profiles.** First run asks what kind of business this is — repair
  shop, construction & trades, retail/counter, or everything — and tailors the
  navigation and defaults. Same engine, same data model, no forks.
- **Editable everywhere.** Click any cell to edit inline, or open the full
  record form. Documents guard their money: drafts are editable, posted
  documents are locked and corrected by voiding.
- **Live on every screen.** Changes broadcast instantly over Server-Sent
  Events — an edit on the office PC appears on the shop floor and the wall TV
  immediately.
- **Wall board / kiosk.** A dedicated kiosk page rotates through live boards
  with a big clock and an activity ticker. Press **F** for fullscreen.
- **One-file data.** Everything is stored in `data/db.json`. Download and
  restore backups from Settings — in both modes.
- **Dark and light themes**, responsive layout, keyboard friendly.

---

## Requirements

- [Node.js](https://nodejs.org) **18 or newer** (24 is fine).
- Nothing else. No `npm install` needed. Ever.

---

## Quick start

### Option A — the interactive demo (no server)

Open **`index.html`** in a browser, or upload this folder to any static web
host. The app starts in **demo mode**: the sample business is loaded into the
visitor's browser, everything is editable — including invoicing and payments —
and changes are saved in that browser. Settings shows the mode badge
(`DEMO · THIS BROWSER`) and offers **Reset demo data**.

Deploy note: host the **whole folder** — the app (`public/`) imports the data
model and money engine from `shared/` one level up.

### Option B — the shop server (shared, real-time LAN mode)

```bash
node server.js        # or: npm start
```

The server prints the addresses to use:

```
  Local:      http://localhost:4321
  Network:    http://192.168.1.20:4321
  Wall TV:    http://192.168.1.20:4321/display
```

- Open the **Local** address on the host machine.
- Everyone else on the shop network opens the **Network** address in a browser.

The first run seeds the sample business so you can explore it. Delete
`data/db.json` (or run `npm run reset`) to start empty — on a fresh install
the app asks for the business profile and starts clean.

### Option C — Windows PC (double-click, data saved to disk)

Install **Node.js LTS** once from <https://nodejs.org/en/download>, then
**double-click `Start.bat`** in this folder.

- It starts the server and opens <http://localhost:4321> in your browser.
- Everything is saved to a real file on disk — **`data/db.json`** — not just
  the browser. Keep the little black window open while you use the app.
- Other PCs on the shop network connect at `http://<this-PC-IP>:4321`.

**Keep the books outside the app folder** (so updates never touch them):

```bat
set DATA_FILE=C:\ShopData\db.json
node server.js
```

**No-install option:** download the **Node.js Windows .zip**, drop `node.exe`
next to `Start.bat`, and it will use that automatically.

### Change the port

```bash
PORT=8080 npm start
```

---

## What you can track

| Module | Purpose |
|---|---|
| **Customers** | Master data, terms, tax status, account history. |
| **Jobs** | Projects/contracts with budget, dates, location. Every money document can tag a job. |
| **Quotes** | Draft → Sent → Accepted (converts to a draft invoice with the same lines) or Declined. |
| **Invoices** | Line items (parts / labor / free-form), tax, totals. Send posts AR + income + tax to the ledger; part lines move stock and post COGS. Print a clean one-pager. |
| **Payments** | Cash/check/card/ACH against an invoice — balance, status (Partial/Paid) and the ledger update together. |
| **Purchase Orders** | Draft → Ordered → Receive (partial quantities welcome) → Received → Closed. Receipts go straight into stock at moving-average cost and post Inventory vs *goods received not invoiced*. |
| **Vendor Bills** | From a PO or standalone. Record posts the expense + AP; paying clears it. |
| **Parts & Inventory** | Stock with min/reorder flags, bins, cost **and** sale price; moves history per part; manual adjustments are logged. |
| **Work Orders** | The shop-floor board: status, priority, asset, job, assignee — Kanban or table, drag between columns. |
| **Assets** | Equipment register: category, make/model/serial, criticality, run/down state. |
| **Maintenance Schedule** | Recurring PM with computed next-due and a one-click "Serviced" reset. |
| **Time** | Hours per person per job / work order, billable or not — feeds job costing and a payroll-ready export. |
| **People / Vendors / Resources** | Crew (with pay rates), suppliers (with lead times), manuals/SOPs/network paths. |
| **Reports** | P&L · AR aging · AP aging · Job costing · Inventory valuation · Sales · Journal. |

Every table has search, sortable columns, inline editing and row actions.

---

## How the money works (the 60-second version)

- Every money document posts **double-entry journal entries** to an
  append-only **ledger** (date, memo, source document, balanced lines).
- Posted documents are **immutable**. Fix a mistake by voiding (mirrored
  reversals) — the audit trail stays honest.
- Corrections are never edits: delete a payment and its reversal is appended;
  the invoice re-derives its own status (Sent/Partial/Paid).
- Stock is a moves ledger; on-hand qty and moving-average cost are maintained
  by purchases, sales and logged adjustments.
- **Reports → Journal** shows the raw postings; that is the export the
  accountant receives. GrizzWorks is honest bookkeeping, not tax filing —
  the return still goes to your accountant.

---

## Business profiles

| Profile | Shows | Hides |
|---|---|---|
| **Everything** (default) | The full works | Nothing |
| **Repair / equipment shop** | Work orders, PM, parts, assets, billing | Jobs |
| **Construction & trades** | Jobs, quotes/invoices, purchasing, time | Nothing |
| **Retail / counter** | Parts, invoices, POs, bills | Work orders, PM, assets, jobs, time |

Pick on first run (fresh install) or change any time in **Settings → Business
profile**. The data model is identical — profiles are navigation and defaults,
not forks.

---

## The wall display (kiosk)

1. On the TV / monitor PC, open the kiosk: `http://<host-ip>:4321/display`.
2. Press **F** to go fullscreen. **Space** pauses rotation; **←**/**→** change
   boards. Boards and rotation speed are configured in Settings.

The tab stays current indefinitely and auto-reconnects after network blips.

---

## Sharing on the network

The server binds to `0.0.0.0`, so any device on the LAN can reach it at
`http://<host-ip>:4321`.

> **Security note:** there is no login. GrizzWorks is designed for a trusted
> shop network. Do not expose it directly to the internet without adding
> authentication and TLS in front of it (e.g. a reverse proxy). Now that real
> money documents live in it, keep the host's firewall on and share the
> address with the shop only.

---

## Data & backups

- **Server mode:** all data lives in **`data/db.json`** on the host (or
  wherever `DATA_FILE` points). Writes are atomic (temp file + rename), so a
  power loss cannot corrupt the file.
- **Demo mode:** data lives in the visitor's browser (localStorage) under
  `grizzworks.db.v1`. It self-seeds, survives reloads and quietly refreshes
  after ~45 days untouched. Old `shopline.db.v1` data migrates automatically.
- **Settings → Data & Backups** (both modes): download a complete JSON backup,
  restore one, or start clean. Nightly copy from cron:

```bash
curl -s http://localhost:4321/api/export > "grizzworks-backup-$(date +%F).json"
```

- **Updates:** Settings → **Check for updates** compares against
  `grizzlyse.com/grizzworks/latest.json`. Updates ship as a zip — replace the
  app folder, keep `data/db.json`. Your books never move unless you move them.

### Starting fresh / handing it over

- **Demo mode:** visitors always start with pristine sample data;
  **Settings → Reset demo data** restores yours.
- **Server mode:** `npm run reset` re-seeds; **Settings → Clear all records**
  empties everything while keeping settings.

---

## Run it as a background service (optional)

On a Linux host, create `/etc/systemd/system/grizzworks.service`:

```ini
[Unit]
Description=GrizzWorks business OS
After=network.target

[Service]
WorkingDirectory=/path/to/dashboard
ExecStart=/usr/bin/node server.js
Environment=PORT=4321
Environment=DATA_FILE=/var/lib/grizzworks/db.json
Restart=always
User=YOUR_USER

[Install]
WantedBy=multi-user.target
```

Then: `sudo systemctl enable --now grizzworks`

---

## Run it with Docker (optional)

```bash
docker run -d --name grizzworks --restart unless-stopped \
  -p 4321:4321 -v grizzworks-data:/app/data \
  ghcr.io/cec406/shopline:latest
```

(Existing published image name kept for compatibility; rebuild from source
with `docker compose -f container/docker-compose.yml up -d --build` if you
prefer. See `container/README.md` for bind mounts and backups.)

---

## Project layout

```
dashboard/
├── index.html / display.html   # shells (app + kiosk redirect)
├── server.js                   # zero-dependency HTTP server + REST API + SSE
├── package.json / Start.bat
├── container/                  # Docker deployment
├── lib/
│   ├── db.js                   # JSON-file persistence + event wrapper
│   └── sse.js                  # live-update broadcaster
├── shared/
│   ├── schema.js               # the data model: collections, fields, totals
│   ├── erp.js                  # THE MONEY ENGINE: ledger, posting, reports
│   ├── records.js              # unified record engine (create/update/op)
│   ├── profiles.js             # business profiles (shop/construction/…)
│   └── seed.js                 # sample business used by both modes
├── public/
│   ├── index.html / display.html / manifest / favicon
│   ├── css/styles.css
│   └── js/  app.js views.js components.js store.js localdb.js api.js
│            display.js icons.js util.js
├── tests/                      # node --test: money engine + boot + demo + deploy
└── data/db.json                # server-mode data (created on first run)
```

`shared/schema.js` defines every collection and field; `shared/erp.js` defines
every money rule. Add a field to the schema and it appears in tables, forms
and search automatically.

---

## HTTP API (for integrations)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/state` | Full snapshot (all collections, settings, activity). |
| `GET` | `/api/events` | Server-Sent Events stream of live changes. |
| `POST` | `/api/:collection` | Create a record or document. |
| `PATCH` | `/api/:collection/:id` | Update fields (drafts / master data). |
| `DELETE` | `/api/:collection/:id` | Delete (drafts & master data only). |
| `POST` | `/api/:collection/:id/op/:action` | Workflow: `send`, `accept`, `decline`, `order`, `receive`, `record`, `close`, `void`. |
| `PATCH` | `/api/settings` | Update settings. |
| `GET` | `/api/export` | Download the whole database. |
| `POST` | `/api/import` | Restore a database backup. |
| `POST` | `/api/clear` | Empty every collection, keep settings. |

Collections: `workorders`, `assets`, `schedule`, `parts`, `people`, `vendors`,
`resources`, `customers`, `jobs`, `quotes`, `invoices`, `payments`,
`purchaseorders`, `bills`, `vendorpayments`, `timeentries`, `stockmoves`,
`ledger`, `accounts`. Send `X-Actor: YourName` on writes to attribute changes
in the activity log. Money rules (posting, balances, status derivation) are
enforced server-side — the API returns a 400 with a readable message when a
rule is violated.

---

## Keyboard shortcuts

- `/` — focus global search
- `Esc` — close a dialog / cancel an inline edit
- `Enter` — open the inline editor for a focused table cell; commit on blur
- On the kiosk: `←`/`→` change board, `Space` pause, `F` fullscreen

---

## Tests

```bash
npm test
```

34 tests: the money engine end-to-end (invoice → send → pay → void; quote
conversion; PO receive → bill → pay; guardrails; report math; idempotent
catch-up; demo/server parity), the real-browser boot suite, the deployment
shape checks — plus a **real-browser UI suite** (`tests/realbrowser.test.js`,
puppeteer-core driving installed Edge/Chrome) that clicks the actual product:
nav renders, hamburger opens/closes, an invoice is created, sent and paid
through the real forms, and the console stays clean. Skips automatically on
machines without a Chromium browser.

---

## Design & business notes

- [`docs/ERP-DEEP-DIVE.md`](docs/ERP-DEEP-DIVE.md) — the market study and the
  architecture decisions behind this build.
- [`docs/PLAYBOOK.md`](docs/PLAYBOOK.md) — how to sell it, ship updates and
  tailor it per customer.
