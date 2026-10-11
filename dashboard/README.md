# Shopline — Maintenance Dashboard

A locally hosted, fully editable maintenance dashboard for a shop. It sits
between a spreadsheet and a full ERP: track work orders, an asset register,
preventive-maintenance schedules, parts inventory, people, vendors and shared
network resources — all editable in place, shared over the shop LAN in real
time, and streamable to a wall-mounted TV.

Everything runs on a single machine with **zero npm dependencies**. No build
step, no database server, no internet connection required.

---

## Highlights

- **Editable everywhere.** Click any cell in a table to edit it inline, or open
  the full record form. Add and delete records from any view.
- **Live on every screen.** Changes broadcast instantly over Server-Sent Events
  (SSE). An edit on the office PC appears on the shop floor and the wall TV
  immediately, with no refresh.
- **Wall board / kiosk.** A dedicated `/display` page rotates through live
  boards (overview, work order board, PM due, parts to reorder, asset status)
  with a big clock and an activity ticker. Perfect for a TV or spare monitor.
- **Shared resources.** Keep links to manuals, SOPs, drawings and network share
  paths (`\\FILESRV\shop\...`) in one searchable place; copy a path to the
  clipboard with one click.
- **Built-in overview.** KPIs plus an "Attention Needed" list that surfaces
  overdue work orders, overdue PM, low-stock parts, down assets and work orders
  that have gone idle.
- **One-file data.** Everything is stored in `data/db.json`. Download and
  restore backups from the Settings screen.
- **Dark and light themes**, responsive layout, keyboard friendly.

---

## Requirements

- [Node.js](https://nodejs.org) **18 or newer** (24 is fine).
- Nothing else. No `npm install` needed.

---

## Quick start

```bash
cd dashboard
npm start          # or: node server.js
```

The server prints the addresses to use:

```
  Local:      http://localhost:4321
  Network:    http://192.168.1.20:4321
  Wall TV:    http://192.168.1.20:4321/display
```

- Open the **Local** address on the host machine.
- Everyone else on the shop network opens the **Network** address in a browser.

The first run seeds the dashboard with sample shop data so you can explore it.
Delete `data/db.json` (or run `npm run reset`) to start empty.

### Change the port

```bash
PORT=8080 npm start
```

---

## The wall display (kiosk)

1. On the TV / monitor PC, open `http://<host-ip>:4321/display`.
2. Press **F** to go fullscreen. Press **Space** to pause/resume rotation.
   Arrow keys (**←** / **→**) move between boards manually.

The board rotates every 12 seconds by default and refreshes live. Configure
which boards appear and the rotation speed from **Settings → Shop & Display**
(`kioskViews` and `rotateSeconds`).

A single browser tab left open on the TV will stay current indefinitely — it
auto-reconnects if the server or network blips.

---

## What you can track

| Collection | Purpose |
|---|---|
| **Work Orders** | Jobs with status, priority, asset, assignee, due date, estimate. Kanban board **or** table. Drag cards between columns to change status. |
| **Assets** | The equipment register: category, location, make/model/serial, criticality, run/down state. |
| **Maintenance Schedule** | Recurring PM tasks. Set an interval and last-done date; Shopline computes the next due date and flags overdue work. "Serviced" resets the clock. |
| **Parts & Inventory** | Stock with on-hand vs. minimum, bin location, vendor and cost. `+`/`-` adjust counts; low stock is highlighted and rolls up into the overview. |
| **People** | Crew, role, shift and availability. |
| **Vendors** | Suppliers with contacts and lead times. |
| **Shared Resources** | Manuals, SOPs, drawings, videos and network folders. Web links open in a new tab; UNC paths copy to the clipboard. |

Every table has search, sortable columns, inline editing and row actions.

---

## Sharing on the network

The server binds to `0.0.0.0`, so any device on the LAN can reach it at
`http://<host-ip>:4321`. The host's current addresses are shown in the startup
banner and on the **Settings** page.

> **Security note:** there is no login. Shopline is designed for a trusted
> shop network. Do not expose it directly to the internet without adding
> authentication and TLS in front of it (e.g. a reverse proxy).

---

## Data & backups

- All data lives in **`data/db.json`** on the host. Writes are atomic
  (temp file + rename), so a power loss cannot corrupt the file.
- **Settings → Data & Backups** lets you download a complete JSON backup and
  restore one. Use this to move the shop to a new machine.
- To keep a nightly copy, schedule a file copy of `data/db.json`, or:
  ```bash
  curl -s http://localhost:4321/api/export > "backup-$(date +%F).json"
  ```

---

## Run it as a background service (optional)

On a Linux host you can keep it running with `systemd`. Create
`/etc/systemd/system/shopline.service`:

```ini
[Unit]
Description=Shopline maintenance dashboard
After=network.target

[Service]
WorkingDirectory=/path/to/dashboard
ExecStart=/usr/bin/node server.js
Environment=PORT=4321
Restart=always
User=YOUR_USER

[Install]
WantedBy=multi-user.target
```

Then:

```bash
sudo systemctl enable --now shopline
```

---

## Project layout

```
dashboard/
├── server.js              # zero-dependency HTTP server + REST API + SSE
├── package.json
├── lib/
│   ├── db.js              # JSON-file database, validation, activity log
│   └── sse.js             # live-update broadcaster
├── shared/
│   ├── schema.js          # the single source of truth for the data model
│   └── seed.js            # sample shop data used on first run
├── public/
│   ├── index.html         # main app
│   ├── display.html       # wall-board / kiosk page
│   ├── css/styles.css
│   └── js/                # app, views, components, store, kiosk, icons
└── data/
    └── db.json            # your data (created on first run)
```

`shared/schema.js` defines every collection and field. Add a field there and it
appears in the tables, forms and search automatically.

---

## HTTP API (for integrations)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/state` | Full snapshot (all collections, settings, activity). |
| `GET` | `/api/events` | Server-Sent Events stream of live changes. |
| `POST` | `/api/:collection` | Create a record. |
| `PATCH` | `/api/:collection/:id` | Update fields. |
| `DELETE` | `/api/:collection/:id` | Delete a record. |
| `PATCH` | `/api/settings` | Update shop/display settings. |
| `GET` | `/api/export` | Download the whole database. |
| `POST` | `/api/import` | Restore a database backup. |

Collections: `workorders`, `assets`, `schedule`, `parts`, `people`, `vendors`,
`resources`. Send an `X-Actor: YourName` header on writes to attribute changes
in the activity log.

---

## Keyboard shortcuts

- `/` — focus global search
- `Esc` — close a dialog / cancel an inline edit
- `Enter` — open the inline editor for a focused table cell; commit on blur
- On the kiosk: `←`/`→` change board, `Space` pause, `F` fullscreen
