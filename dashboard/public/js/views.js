// All application views. Each returns a DOM node; app.js decides which to mount.
import { h, append, clear, sortItems, fmtDate, fmtDateShort, daysUntil, relTime, debounce, todayIso, download, money } from './util.js?v=2.1.1';
import { icon } from './icons.js?v=2.1.1';
import {
  collections, collectionByName, settingsSchema, computeFields, COLORS, TYPES, APP_NAME, APP_VERSION, round2,
} from '../../shared/schema.js?v=2.1.1';
import * as erp from '../../shared/erp.js?v=2.1.1';
import { profileOf } from '../../shared/profiles.js?v=2.1.1';
import * as store from './store.js?v=2.1.1';
import { getActor, setActor } from './api.js?v=2.1.1';
import {
  chip, statusChip, dueBadge, dataTable, workBoard, openForm, iconButton,
  sectionHeader, activityList, kpi, barChart, confirmDialog, toast, displayValue, fieldControl,
  openDocForm, docDetail, printDoc, openPaymentForm, receiveDialog, changeAdminPin,
} from './components.js?v=2.1.1';

// ---- shared helpers ------------------------------------------------------
function ui(ctx, key, defaults) {
  if (!ctx.ui[key]) ctx.ui[key] = { ...defaults };
  return ctx.ui[key];
}

function matchesSearch(record, meta, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  for (const field of meta.fields) {
    const value = record[field.key];
    if (value === null || value === undefined) continue;
    if (String(value).toLowerCase().includes(q)) return true;
    if (field.type === TYPES.REF) {
      const label = store.label(field.ref, value);
      if (label && label.toLowerCase().includes(q)) return true;
    }
  }
  return false;
}

function toolbar(ctx, key, { searchPlaceholder, filters = [], right = [] }) {
  const u = ctx.ui[key] || (ctx.ui[key] = {});
  const search = h('input', {
    class: 'input search-input',
    type: 'search',
    placeholder: searchPlaceholder,
    value: u.search || '',
    oninput: debounce((e) => { u.search = e.target.value; ctx.rerender(); }, 180),
  });
  const bar = h('div', { class: 'toolbar' },
    h('div', { class: 'toolbar-left' }, h('span', { class: 'search-wrap' }, icon('search', 16), search)),
  );
  for (const filter of filters) {
    const select = h('select', {
      class: 'input compact',
      onchange: (e) => { u[filter.key] = e.target.value; ctx.rerender(); },
    });
    select.append(h('option', { value: '' }, filter.label));
    for (const opt of filter.options) {
      select.append(h('option', { value: opt.value, selected: u[filter.key] === opt.value }, opt.label));
    }
    bar.append(select);
  }
  if (right.length) bar.append(h('div', { class: 'toolbar-right' }, right));
  return bar;
}

function addButton(collection, ctx) {
  const meta = collectionByName[collection];
  if ((collection === 'payments' || collection === 'vendorpayments') && ctx) {
    const isCustomer = collection === 'payments';
    return h('button', { class: 'btn primary', onclick: () => recordPaymentFlow(ctx, isCustomer) },
      icon('dollar', 16), isCustomer ? 'Record Payment' : 'Pay a Vendor Bill');
  }
  return h('button', { class: 'btn primary', onclick: () => openForm({ collection }) },
    icon('plus', 16), `New ${meta.singular}`);
}

// ---- Overview ------------------------------------------------------------
export function overviewView(ctx) {
  const wos = store.col('workorders');
  const schedule = store.col('schedule').map((r) => ({ ...r, ...computeFields('schedule', r) }));
  const parts = store.col('parts');
  const assets = store.col('assets');
  const people = store.col('people');

  const openWos = wos.filter((w) => w.status !== 'Done');
  const overdueWos = openWos.filter((w) => { const d = daysUntil(w.due); return d !== null && d < 0; });
  const dueSoonWos = openWos.filter((w) => { const d = daysUntil(w.due); return d !== null && d >= 0 && d <= 7; });
  const lowParts = parts.filter((p) => Number(p.qty) <= Number(p.minQty));
  const downAssets = assets.filter((a) => a.status === 'Down' || a.status === 'Maintenance');
  const staleDays = Number(store.state.settings.staleDays) || 7;
  const idleWos = openWos.filter((w) => idleDays(w) > staleDays);
  const overduePm = schedule.filter((s) => { const d = daysUntil(s.nextDue); return d !== null && d < 0; });
  const dueWeekPm = schedule.filter((s) => { const d = daysUntil(s.nextDue); return d !== null && d >= 0 && d <= 7; });

  const root = h('div', { class: 'view overview' });

  // ---- money row: is the business healthy, not just the shop floor ----
  const dbv = dbView();
  const ar = erp.arAging(dbv);
  const ap = erp.apAging(dbv);
  const rev30 = erp.revenueSince(dbv, isoDaysAgo(30));
  const openQuotes = store.col('quotes').filter((q) => ['Draft', 'Sent'].includes(q.status));
  const quoteValue = openQuotes.reduce((s, q) => s + (Number(q.total) || 0), 0);
  const invState = store.col('invoices').map((i) => ({ ...i, ...computeFields('invoices', i) }));
  const overdueInv = invState.filter((i) => i.isOverdue);
  const overdueInvValue = overdueInv.reduce((s, i) => s + (Number(i.balance) || 0), 0);

  const moneyKpis = store.moneyLocked()
    ? h('div', { class: 'kpi-row' },
        kpi('Money', 'Locked', 'warn', 'billing & balances hidden — enter the admin PIN'))
    : h('div', { class: 'kpi-row' },
        kpi('Outstanding (AR)', money(ar.total) || '$0', ar.total ? 'accent' : '', `${ar.rows.length} customer${ar.rows.length === 1 ? '' : 's'}`),
        kpi('Overdue Invoices', overdueInv.length, overdueInv.length ? 'bad' : '', overdueInv.length ? `${money(overdueInvValue)} late` : 'nothing late'),
        kpi('Revenue (30d)', money(rev30) || '$0', 'accent', 'invoiced, incl. tax'),
        kpi('Owed to Vendors', money(ap.total) || '$0', ap.total ? 'warn' : '', 'accounts payable'),
        kpi('Open Quotes', openQuotes.length, openQuotes.length ? '' : '', quoteValue ? `${money(quoteValue)} quoted` : ''),
      );
  root.append(moneyKpis);

  const kpis = h('div', { class: 'kpi-row' },
    kpi('Open Work Orders', openWos.length, 'accent', `${dueSoonWos.length} due this week`),
    kpi('Overdue', overdueWos.length + overduePm.length, overdueWos.length + overduePm.length ? 'bad' : '', 'work orders + PM'),
    kpi('PM Due (7d)', dueWeekPm.length, dueWeekPm.length ? 'warn' : '', `${schedule.length} scheduled total`),
    kpi('Low Stock', lowParts.length, lowParts.length ? 'warn' : '', `${parts.length} SKUs tracked`),
    kpi('Assets Attention', downAssets.length, downAssets.length ? 'bad' : '', `${assets.length} registered`),
    kpi('On Shift', people.filter((p) => p.status !== 'Off').length, '', `${people.length} crew`),
  );
  root.append(kpis);

  const grid = h('div', { class: 'grid-2' });

  // Attention needed
  const attention = h('div', { class: 'panel' });
  attention.append(h('div', { class: 'panel-head' }, icon('alert', 17), h('h3', {}, 'Attention Needed')));
  const attList = h('ul', { class: 'list' });
  const push = (tone, text, sub, onClick) => attList.append(h('li', { class: `list-item ${tone}`, onclick: onClick },
    h('span', { class: `pulse ${tone}` }),
    h('div', { class: 'li-body' }, h('div', { class: 'li-title' }, text), sub ? h('div', { class: 'muted small' }, sub) : null),
    onClick ? icon('chevron', 16) : null,
  ));
  for (const w of overdueWos.slice(0, 6)) push('bad', w.title, `${w.priority} · ${absDays(w.due)} overdue · ${w.status}`, () => ctx.focusRecord('workorders', w.id, 'board'));
  for (const w of idleWos.slice(0, 4)) push('warn', w.title, `${w.status} · idle ${idleDays(w)}d`, () => ctx.focusRecord('workorders', w.id, 'board'));
  for (const s of overduePm.slice(0, 5)) push('bad', s.task, `${absDays(s.nextDue)} overdue PM${s.assetId ? ' · ' + store.label('assets', s.assetId) : ''}`, () => ctx.focusRecord('schedule', s.id, 'table'));
  for (const p of lowParts.slice(0, 6)) push('warn', p.name, `${p.qty} ${p.unit} on hand · min ${p.minQty}${p.location ? ' · ' + p.location : ''}`, () => ctx.focusRecord('parts', p.id, 'table'));
  for (const a of downAssets.slice(0, 5)) push('warn', a.name, `${a.status} · ${a.category}${a.location ? ' · ' + a.location : ''}`, () => ctx.focusRecord('assets', a.id, 'table'));
  for (const i of overdueInv.slice(0, 4)) push('bad', `${i.number} — ${store.label('customers', i.customerId) || 'no customer'}`, `${money(i.balance)} overdue · due ${fmtDateShort(i.dueDate)}`, () => ctx.focusRecord('invoices', i.id, 'table'));
  for (const b of store.col('bills').map((x) => ({ ...x, ...computeFields('bills', x) })).filter((x) => x.isOverdue).slice(0, 3)) {
    push('warn', `${b.number} — ${store.label('vendors', b.vendorId) || 'vendor'}`, `${money(b.balance)} owed · due ${fmtDateShort(b.dueDate)}`, () => ctx.focusRecord('bills', b.id, 'table'));
  }
  if (!attList.children.length) attList.append(h('li', { class: 'list-item empty-ok' }, icon('check', 16), h('div', {}, 'All clear — nothing needs attention.')));
  attention.append(attList);
  grid.append(attention);

  // Upcoming
  const upcoming = h('div', { class: 'panel' });
  upcoming.append(h('div', { class: 'panel-head' }, icon('calendar', 17), h('h3', {}, 'Upcoming (14 days)')));
  const upList = h('ul', { class: 'list' });
  const events = [
    ...openWos.filter((w) => { const d = daysUntil(w.due); return d !== null && d >= 0 && d <= 14; }).map((w) => ({ date: w.due, label: w.title, kind: 'WO', tone: w.priority === 'Urgent' || w.priority === 'High' ? 'warn' : '', onClick: () => ctx.focusRecord('workorders', w.id, 'board') })),
    ...schedule.filter((s) => { const d = daysUntil(s.nextDue); return d !== null && d >= 0 && d <= 14; }).map((s) => ({ date: s.nextDue, label: s.task, kind: 'PM', tone: '', onClick: () => ctx.focusRecord('schedule', s.id, 'table') })),
  ].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  for (const e of events.slice(0, 12)) {
    upList.append(h('li', { class: `list-item ${e.tone}`, onclick: e.onClick },
      h('span', { class: `tag ${e.kind === 'PM' ? 'pm' : 'wo'}` }, e.kind),
      h('div', { class: 'li-body' }, h('div', { class: 'li-title' }, e.label), h('div', { class: 'muted small' }, fmtDateShort(e.date))),
      dueBadge(daysUntil(e.date)),
    ));
  }
  if (!upList.children.length) upList.append(h('li', { class: 'list-item' }, h('div', { class: 'muted' }, 'Nothing scheduled in the next two weeks.')));
  upcoming.append(upList);
  grid.append(upcoming);

  // Charts
  const charts = h('div', { class: 'panel' });
  charts.append(h('div', { class: 'panel-head' }, icon('activity', 17), h('h3', {}, 'Work Orders by Status')));
  const statusEntries = ['Backlog', 'Scheduled', 'In Progress', 'Waiting Parts', 'Done'].map((s) => ({
    label: s, value: wos.filter((w) => w.status === s).length, color: COLORS[s],
  }));
  charts.append(barChart(statusEntries));
  grid.append(charts);

  // Activity
  const activity = h('div', { class: 'panel' });
  activity.append(h('div', { class: 'panel-head' }, icon('clock', 17), h('h3', {}, 'Recent Activity'), h('span', { class: 'spacer' }), h('span', { class: 'muted small' }, `${store.state.clients} screen${store.state.clients === 1 ? '' : 's'} connected`)));
  activity.append(activityList(store.state.activity, 10));
  grid.append(activity);

  root.append(grid);
  return root;
}

function absDays(dateStr) {
  const d = daysUntil(dateStr);
  if (d === null) return '';
  const n = Math.abs(d);
  return `${n} day${n === 1 ? '' : 's'}`;
}

function idleDays(record) {
  if (!record.updatedAt) return 0;
  return Math.floor((Date.now() - new Date(record.updatedAt).getTime()) / 86400000);
}

// ---- Work orders ---------------------------------------------------------
export function workordersView(ctx) {
  const u = ui(ctx, 'workorders', { mode: 'board', search: '', status: '', priority: '', assignee: '' });
  const meta = collectionByName.workorders;
  const root = h('div', { class: 'view' });
  root.append(sectionHeader('Work Orders', `${store.col('workorders').length} total`,
    h('div', { class: 'segmented' },
      h('button', { class: `seg ${u.mode === 'board' ? 'active' : ''}`, onclick: () => { u.mode = 'board'; ctx.rerender(); } }, icon('grid', 15), 'Board'),
      h('button', { class: `seg ${u.mode === 'table' ? 'active' : ''}`, onclick: () => { u.mode = 'table'; ctx.rerender(); } }, icon('list', 15), 'Table'),
    ),
    addButton('workorders'),
  ));

  root.append(toolbar(ctx, 'workorders', {
    searchPlaceholder: 'Search work orders…',
    filters: [
      { key: 'status', label: 'All statuses', options: meta.fields.find((f) => f.key === 'status').options.map((v) => ({ value: v, label: v })) },
      { key: 'priority', label: 'All priorities', options: meta.fields.find((f) => f.key === 'priority').options.map((v) => ({ value: v, label: v })) },
      { key: 'assignee', label: 'All people', options: store.options('people') },
    ],
  }));

  let items = store.col('workorders').filter((r) => matchesSearch(r, meta, u.search));
  if (u.status) items = items.filter((r) => r.status === u.status);
  if (u.priority) items = items.filter((r) => r.priority === u.priority);
  if (u.assignee) items = items.filter((r) => r.assigneeId === u.assignee);

  const body = h('div', { class: 'view-body' });
  if (u.mode === 'board') {
    body.append(workBoard({ collection: 'workorders', onOpen: (record) => openForm({ collection: 'workorders', record }) }));
  } else {
    items = sortItems(items, u.sort || { key: 'due', dir: 'asc' });
    body.append(h('div', { class: 'table-wrap' }, dataTable({
      collection: 'workorders',
      items,
      sort: u.sort || { key: 'due', dir: 'asc' },
      onSort: (key) => { u.sort = { key, dir: u.sort?.key === key && u.sort.dir === 'asc' ? 'desc' : 'asc' }; ctx.rerender(); },
      rowClass: (r) => { const d = daysUntil(r.due); return d !== null && d < 0 && r.status !== 'Done' ? 'row-bad' : r.priority === 'Urgent' ? 'row-warn' : ''; },
    })));
  }
  root.append(body);
  return root;
}

// ---- Generic collection view --------------------------------------------
export function collectionView(ctx, collection) {
  const meta = collectionByName[collection];
  const defaults = { search: '', sort: meta.defaultSort, status: '', lowOnly: false };
  const u = ui(ctx, collection, defaults);
  const root = h('div', { class: 'view' });

  const filters = [];
  if (meta.statusKey) {
    const field = meta.fields.find((f) => f.key === meta.statusKey);
    filters.push({ key: 'status', label: `All ${field.label.toLowerCase()}`, options: field.options.map((v) => ({ value: v, label: v })) });
  }

  const right = [];
  if (collection === 'parts') {
    right.push(h('label', { class: 'check' },
      h('input', { type: 'checkbox', checked: u.lowOnly, onchange: (e) => { u.lowOnly = e.target.checked; ctx.rerender(); } }),
      'Low stock only',
    ));
  }
  right.push(addButton(collection, ctx));

  root.append(sectionHeader(meta.label, `${store.col(collection).length} records`));
  root.append(toolbar(ctx, collection, {
    searchPlaceholder: `Search ${meta.label.toLowerCase()}…`,
    filters,
    right,
  }));

  const summary = collectionSummary(collection);
  if (summary) root.append(summary);

  let items = store.col(collection).filter((r) => matchesSearch(r, meta, u.search));
  if (u.status && meta.statusKey) items = items.filter((r) => r[meta.statusKey] === u.status);
  if (collection === 'parts' && u.lowOnly) items = items.filter((p) => Number(p.qty) <= Number(p.minQty));
  if (collection === 'schedule') items = items.map((r) => ({ ...r, ...computeFields('schedule', r) }));
  items = sortItems(items, u.sort, collection === 'schedule' ? { nextDue: (r) => r.nextDue } : {});

  const extraActions = collection === 'schedule'
    ? (r) => [h('button', { class: 'mini-btn', title: 'Mark serviced today', onclick: async () => {
        await store.save('schedule', r.id, { lastDone: todayIso() });
        toast('Marked serviced — next due recalculated');
      } }, icon('check', 15), 'Serviced')]
    : collection === 'parts'
      ? (r) => [
          iconButton('minus', async () => { await store.save('parts', r.id, { qty: Math.max(0, Number(r.qty) - 1) }); }, 'Remove one (logged as an adjustment)'),
          h('span', { class: 'qty-pill' }, `${r.qty}`),
          iconButton('plus', async () => { await store.save('parts', r.id, { qty: Number(r.qty) + 1 }); }, 'Add one (logged as an adjustment)'),
          iconButton('clock', () => partsHistory(r), 'Stock history'),
        ]
      : collection === 'customers' || collection === 'jobs'
        ? (r) => [iconButton('chart', () => partyLedger(collection, r), 'Account history')]
        : docActions(collection, ctx);

  const sortGetters = collection === 'schedule' ? { nextDue: (r) => r.nextDue } : {};

  const wrap = h('div', { class: 'table-wrap' }, dataTable({
    collection,
    items,
    sort: u.sort,
    onSort: (key) => { u.sort = { key, dir: u.sort?.key === key && u.sort.dir === 'asc' ? 'desc' : 'asc' }; ctx.rerender(); },
    extraActions,
    rowClass: (r) => {
      if (collection === 'parts' && Number(r.qty) <= Number(r.minQty) && store.state.settings.lowStockAlerts !== false) return 'row-warn';
      if (meta.statusKey && (r[meta.statusKey] === 'Down')) return 'row-bad';
      if (meta.statusKey && r[meta.statusKey] === 'Maintenance') return 'row-warn';
      if (collection === 'schedule') { const d = daysUntil(r.nextDue); return d !== null && d < 0 ? 'row-bad' : d !== null && d <= 3 ? 'row-warn' : ''; }
      if (collection === 'invoices' || collection === 'bills') {
        const state = computeFields(collection, r);
        if (state.isOverdue) return 'row-bad';
        if (r.status === 'Partial' || r.status === 'Unpaid') return 'row-warn';
      }
      return '';
    },
  }));
  root.append(h('div', { class: 'view-body' }, wrap));
  return root;
}

function partsSummary(parts) {
  const low = parts.filter((p) => Number(p.qty) <= Number(p.minQty));
  const value = parts.reduce((sum, p) => sum + (Number(p.qty) || 0) * (Number(p.cost) || 0), 0);
  return h('div', { class: 'mini-kpis' },
    kpi('SKUs', parts.length),
    kpi('Low / Out', low.length, low.length ? 'warn' : ''),
    kpi('Inventory Value', value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })),
  );
}

// Mini-KPI strip shown above each collection table. Money collections show
// money; master collections show their health.
function collectionSummary(collection) {
  const dbv = dbView();
  switch (collection) {
    case 'parts':
      return partsSummary(store.col('parts'));
    case 'assets':
      return assetsSummary(store.col('assets'));
    case 'customers': {
      const ar = erp.arAging(dbv);
      return h('div', { class: 'mini-kpis' },
        kpi('Customers', store.col('customers').length),
        store.moneyLocked() ? null : kpi('Outstanding', money(ar.total) || '$0', ar.total ? 'accent' : '', 'receivable'),
        store.moneyLocked() ? null : kpi('Overdue', store.col('invoices').filter((i) => computeFields('invoices', i).isOverdue).length, '', 'invoices late'),
      );
    }
    case 'jobs': {
      const jobs = store.col('jobs');
      if (store.moneyLocked()) {
        return h('div', { class: 'mini-kpis' }, kpi('Jobs', jobs.length, '', 'costs & margins hidden — admin PIN required'));
      }
      const rows = erp.jobCosting(dbv);
      const open = rows.filter((r) => ['Quoted', 'Active', 'On Hold'].includes(r.job.status));
      const margin = open.reduce((s, r) => s + r.margin, 0);
      return h('div', { class: 'mini-kpis' },
        kpi('Active / Open', open.length, open.length ? 'accent' : '', `${jobs.length} total`),
        kpi('Open Invoiced', money(open.reduce((s, r) => s + r.invoiced, 0)) || '$0', '', 'on open jobs'),
        kpi('Open Margin', money(margin) || '$0', margin < 0 ? 'bad' : margin > 0 ? 'good' : '', 'invoiced − costs'),
      );
    }
    case 'quotes': {
      const open = store.col('quotes').filter((q) => ['Draft', 'Sent'].includes(q.status));
      return h('div', { class: 'mini-kpis' },
        kpi('Open', open.length, open.length ? 'accent' : '', `${store.col('quotes').length} total`),
        kpi('Quoted Value', money(open.reduce((s, q) => s + (Number(q.total) || 0), 0)) || '$0', '', 'draft + sent'),
        kpi('Accepted', store.col('quotes').filter((q) => q.status === 'Accepted').length),
      );
    }
    case 'invoices': {
      const ar = erp.arAging(dbv);
      const overdue = store.col('invoices').filter((i) => computeFields('invoices', i).isOverdue);
      return h('div', { class: 'mini-kpis' },
        kpi('Invoices', store.col('invoices').length),
        kpi('Outstanding', money(ar.total) || '$0', ar.total ? 'accent' : ''),
        kpi('Overdue', overdue.length, overdue.length ? 'bad' : '', money(overdue.reduce((s, i) => s + (Number(i.balance) || 0), 0)) || '$0'),
        kpi('Collected (30d)', money(store.col('payments').filter((p) => p.date >= isoDaysAgo(30)).reduce((s, p) => s + (Number(p.amount) || 0), 0)) || '$0'),
      );
    }
    case 'purchaseorders': {
      const open = store.col('purchaseorders').filter((p) => ['Ordered', 'Partial'].includes(p.status));
      return h('div', { class: 'mini-kpis' },
        kpi('Open POs', open.length, open.length ? 'accent' : '', `${store.col('purchaseorders').length} total`),
        kpi('On Order', money(open.reduce((s, p) => s + Math.max(0, (Number(p.subtotal) || 0) - (Number(p.receivedValue) || 0)), 0)) || '$0', '', 'not yet received'),
      );
    }
    case 'bills': {
      const ap = erp.apAging(dbv);
      const overdue = store.col('bills').filter((b) => computeFields('bills', b).isOverdue);
      return h('div', { class: 'mini-kpis' },
        kpi('Bills', store.col('bills').length),
        kpi('Owed', money(ap.total) || '$0', ap.total ? 'warn' : '', 'accounts payable'),
        kpi('Overdue', overdue.length, overdue.length ? 'bad' : '', 'past due date'),
      );
    }
    case 'payments':
      return h('div', { class: 'mini-kpis' },
        kpi('Payments', store.col('payments').length),
        kpi('Collected (30d)', money(store.col('payments').filter((p) => p.date >= isoDaysAgo(30)).reduce((s, p) => s + (Number(p.amount) || 0), 0)) || '$0', 'accent'),
      );
    case 'vendorpayments':
      return h('div', { class: 'mini-kpis' },
        kpi('Payments Sent', store.col('vendorpayments').length),
        kpi('Paid (30d)', money(store.col('vendorpayments').filter((p) => p.date >= isoDaysAgo(30)).reduce((s, p) => s + (Number(p.amount) || 0), 0)) || '$0'),
      );
    case 'timeentries': {
      const weekAgo = isoDaysAgo(7);
      const recent = store.col('timeentries').filter((t) => t.date >= weekAgo);
      const hours = recent.reduce((s, t) => s + (Number(t.hours) || 0), 0);
      const billable = recent.filter((t) => t.billable !== false).reduce((s, t) => s + (Number(t.hours) || 0), 0);
      return h('div', { class: 'mini-kpis' },
        kpi('Hours (7d)', hours || '0', hours ? 'accent' : '', `${recent.length} entries`),
        kpi('Billable (7d)', hours ? `${Math.round((billable / hours) * 100)}%` : '—', '', money(billable) + ' of work'),
      );
    }
    default:
      return null;
  }
}

function assetsSummary(assets) {
  return h('div', { class: 'mini-kpis' },
    kpi('Total Assets', assets.length),
    kpi('Down', assets.filter((a) => a.status === 'Down').length, assets.some((a) => a.status === 'Down') ? 'bad' : ''),
    kpi('In Maintenance', assets.filter((a) => a.status === 'Maintenance').length, 'warn'),
    kpi('High Criticality', assets.filter((a) => a.criticality === 'High').length),
  );
}

// ---- money helpers ---------------------------------------------------------
function dbView() {
  const c = (n) => store.col(n);
  return {
    quotes: c('quotes'), invoices: c('invoices'), payments: c('payments'),
    purchaseorders: c('purchaseorders'), bills: c('bills'), vendorpayments: c('vendorpayments'),
    customers: c('customers'), vendors: c('vendors'), jobs: c('jobs'), parts: c('parts'),
    people: c('people'), timeentries: c('timeentries'), stockmoves: c('stockmoves'),
    ledger: c('ledger'), accounts: c('accounts'),
    settings: store.state.settings,
  };
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const mb = (iconName, label, onclick, tone = '') => h('button', { class: `mini-btn ${tone}`, onclick }, icon(iconName, 15), label);

// Per-status workflow buttons for the document tables. Every button maps to a
// real engine operation — the UI never edits money state by hand.
function docActions(collection, ctx) {
  const run = async (record, action, payload, label) => {
    try {
      await store.docAction(collection, record.id, action, payload);
      toast(label);
    } catch (err) {
      toast(err.message, 'error');
    }
  };
  const voidDoc = async (record) => {
    if (await confirmDialog({ title: `Void ${record.number}?`, message: 'Reversal entries will be posted to the ledger. The document stays on file (cannot be deleted).', confirmLabel: 'Void document' })) {
      run(record, 'void', {}, `${record.number} voided — books reversed`);
    }
  };
  return (r) => {
    const btns = [];
    if (collection === 'quotes') {
      if (r.status === 'Draft') btns.push(mb('external', 'Send', () => run(r, 'send', {}, `Quote ${r.number} sent`)));
      if (r.status === 'Sent') {
        btns.push(mb('check', 'Accept', () => run(r, 'accept', {}, `Quote ${r.number} accepted — invoice drafted`, 'go')));
        btns.push(mb('x', 'Decline', () => run(r, 'decline', {}, `Quote ${r.number} declined`)));
      }
      if (r.status !== 'Draft') btns.push(mb('invoice', 'View', () => docDetail({ collection, record: r })));
    } else if (collection === 'invoices') {
      if (r.status === 'Draft') btns.push(mb('external', 'Send', () => run(r, 'send', {}, `Invoice ${r.number} sent — AR posted`)));
      if (r.status === 'Sent' || r.status === 'Partial') {
        btns.push(mb('dollar', 'Pay', () => openPaymentForm({ collection: 'payments', doc: r })));
        btns.push(mb('x', 'Void', () => voidDoc(r)));
      }
      if (r.status !== 'Draft') btns.push(mb('invoice', 'View', () => docDetail({ collection, record: r })));
      btns.push(mb('print', 'Print', () => printDoc(collection, r)));
    } else if (collection === 'purchaseorders') {
      if (r.status === 'Draft') btns.push(mb('external', 'Order', () => run(r, 'order', {}, `PO ${r.number} ordered`)));
      if (r.status === 'Ordered' || r.status === 'Partial') btns.push(mb('box', 'Receive', () => receiveDialog({ record: r })));
      if (r.status === 'Received') btns.push(mb('check', 'Close', () => run(r, 'close', {}, `PO ${r.number} closed`)));
      if (r.status !== 'Draft') btns.push(mb('invoice', 'View', () => docDetail({ collection, record: r })));
    } else if (collection === 'bills') {
      if (r.status === 'Draft') btns.push(mb('receipt', 'Record', () => run(r, 'record', {}, `Bill ${r.number} recorded — AP posted`)));
      if (r.status === 'Unpaid' || r.status === 'Partial') {
        btns.push(mb('dollar', 'Pay', () => openPaymentForm({ collection: 'vendorpayments', doc: r })));
        btns.push(mb('x', 'Void', () => voidDoc(r)));
      }
      if (r.status !== 'Draft') btns.push(mb('invoice', 'View', () => docDetail({ collection, record: r })));
    }
    return btns;
  };
}

// Stock history for one part (from the append-only moves ledger).
function partsHistory(part) {
  const moves = store.col('stockmoves').filter((m) => m.partId === part.id);
  const rows = moves.slice(0, 50).map((m) => h('tr', {},
    h('td', {}, fmtDateShort(m.date)),
    h('td', {}, m.reason),
    h('td', {}, `${m.qty > 0 ? '+' : ''}${m.qty} ${part.unit || ''}`),
    h('td', {}, m.notes || m.refType || ''),
  ));
  const overlay = h('div', { class: 'overlay' });
  const close = () => overlay.remove();
  overlay.append(h('div', { class: 'dialog small', role: 'dialog', 'aria-modal': 'true' },
    h('div', { class: 'dialog-head' }, h('h3', {}, `Stock history — ${part.name}`), iconButton('x', close, 'Close')),
    h('div', { class: 'dialog-body' },
      h('p', { class: 'muted small' }, `On hand: ${part.qty} ${part.unit} · avg cost ${money(part.avgCost ?? part.cost)}`),
      h('table', { class: 'data-table' },
        h('thead', {}, h('tr', {}, h('th', {}, 'Date'), h('th', {}, 'Reason'), h('th', {}, 'Change'), h('th', { class: 'wide' }, 'Source'))),
        h('tbody', {}, rows.length ? rows : h('tr', {}, h('td', { colspan: 4, class: 'empty' }, 'No stock moves yet.'))),
      ),
    ),
    h('div', { class: 'dialog-foot' }, h('span', { class: 'spacer' }), h('button', { class: 'btn primary', onclick: close }, 'Done')),
  ));
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
}

// Account history for a customer or job: their documents side by side.
function partyLedger(collection, record) {
  const isCustomer = collection === 'customers';
  const invoices = isCustomer ? store.col('invoices').filter((i) => i.customerId === record.id) : [];
  const bills = isCustomer ? [] : store.col('bills').filter((b) => b.vendorId === record.id);
  const jobs = store.col('jobs').filter((j) => (isCustomer ? j.customerId === record.id : false));
  const overlay = h('div', { class: 'overlay' });
  const close = () => overlay.remove();
  const row = (doc) => h('tr', {},
    h('td', {}, doc.number),
    h('td', {}, fmtDateShort(doc.date)),
    h('td', {}, statusChip(doc.status)),
    h('td', {}, money(doc.total)),
    h('td', {}, money((Number(doc.total) || 0) - (Number(doc.paid) || 0))),
  );
  overlay.append(h('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true' },
    h('div', { class: 'dialog-head' }, h('h3', {}, `${record.name || record.title} — account`), iconButton('x', close, 'Close')),
    h('div', { class: 'dialog-body' },
      isCustomer ? h('table', { class: 'data-table' },
        h('thead', {}, h('tr', {}, h('th', {}, 'Invoice'), h('th', {}, 'Date'), h('th', {}, 'Status'), h('th', {}, 'Total'), h('th', {}, 'Balance'))),
        h('tbody', {}, invoices.length ? invoices.map(row) : h('tr', {}, h('td', { colspan: 5, class: 'empty' }, 'No invoices yet.'))),
      ) : h('table', { class: 'data-table' },
        h('thead', {}, h('tr', {}, h('th', {}, 'Bill'), h('th', {}, 'Date'), h('th', {}, 'Status'), h('th', {}, 'Total'), h('th', {}, 'Balance'))),
        h('tbody', {}, bills.length ? bills.map(row) : h('tr', {}, h('td', { colspan: 5, class: 'empty' }, 'No bills yet.'))),
      ),
      isCustomer && jobs.length ? h('p', { class: 'muted small' }, `Jobs: ${jobs.map((j) => j.title).join(', ')}`) : null,
    ),
    h('div', { class: 'dialog-foot' }, h('span', { class: 'spacer' }), h('button', { class: 'btn primary', onclick: close }, 'Done')),
  ));
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
}

// Record a payment starting from the payments list (pick the document first).
export function recordPaymentFlow(ctx, isCustomer) {
  const target = isCustomer ? 'invoices' : 'bills';
  const open = store.col(target).filter((d) => ['Sent', 'Partial', 'Unpaid'].includes(d.status));
  if (!open.length) {
    toast(isCustomer ? 'No open invoices to pay — send one first' : 'No open bills — record one first', 'error');
    return;
  }
  const overlay = h('div', { class: 'overlay' });
  const close = () => overlay.remove();
  const pick = h('select', { class: 'input' }, ...store.options(target).filter((o) => open.some((d) => d.id === o.value)).map((o) => h('option', { value: o.value }, o.label)));
  const form = h('form', { class: 'dialog small', role: 'dialog', 'aria-modal': 'true', onsubmit: (e) => {
    e.preventDefault();
    const doc = store.byId(target, pick.value);
    if (!doc) return;
    close();
    openPaymentForm({ collection: isCustomer ? 'payments' : 'vendorpayments', doc });
  } });
  form.append(
    h('div', { class: 'dialog-head' }, h('h3', {}, isCustomer ? 'Record Payment' : 'Pay a Vendor Bill'), iconButton('x', close, 'Close')),
    h('div', { class: 'dialog-body' }, h('label', { class: 'field' }, h('span', { class: 'field-label' }, isCustomer ? 'Invoice' : 'Bill'), pick)),
    h('div', { class: 'dialog-foot' },
      h('button', { type: 'button', class: 'btn ghost', onclick: close }, 'Cancel'),
      h('button', { type: 'submit', class: 'btn primary' }, icon('dollar', 16), 'Continue'),
    ),
  );
  overlay.append(form);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
  pick.focus();
}

// ---- Reports ---------------------------------------------------------------
const REPORT_TABS = [
  { id: 'pnl', label: 'Profit & Loss', icon: 'chart' },
  { id: 'ar', label: 'Receivable (AR)', icon: 'dollar' },
  { id: 'ap', label: 'Payable (AP)', icon: 'receipt' },
  { id: 'jobs', label: 'Job Costing', icon: 'target' },
  { id: 'inventory', label: 'Inventory', icon: 'box' },
  { id: 'sales', label: 'Sales', icon: 'invoice' },
  { id: 'journal', label: 'Journal', icon: 'list' },
];

export function reportsView(ctx) {
  const u = ui(ctx, 'reports', { tab: 'pnl' });
  const dbv = dbView();
  const root = h('div', { class: 'view' });
  root.append(sectionHeader('Reports', 'Straight off the ledger — the same numbers every screen sees'));

  const tabs = h('div', { class: 'segmented reports-tabs' },
    ...REPORT_TABS.map((t) => h('button', { class: `seg ${u.tab === t.id ? 'active' : ''}`, onclick: () => { u.tab = t.id; ctx.rerender(); } }, icon(t.icon, 14), t.label)));
  root.append(tabs);

  const body = h('div', { class: 'view-body' }, h('div', { class: 'panel' },
    h('div', { class: 'panel-body' }, REPORTS[u.tab] ? REPORTS[u.tab](dbv, ctx) : null)));
  root.append(body);
  return root;
}

// Small table builder for reports: headers[], rows[][], foot?[][]
function reportTable(headers, rows, foot) {
  const table = h('table', { class: 'data-table report-table' });
  table.append(h('thead', {}, h('tr', {}, headers.map((hd) => h('th', { class: hd.right ? 'num' : '' }, hd.label)))));
  const tbody = h('tbody');
  if (!rows.length) tbody.append(h('tr', {}, h('td', { colspan: headers.length, class: 'empty' }, 'Nothing to report yet — this fills in as the business is used.')));
  for (const row of rows) tbody.append(h('tr', {}, row.map((cell, i) => h('td', { class: headers[i]?.right ? 'num' : '' }, cell))));
  table.append(tbody);
  if (foot) {
    table.append(h('tfoot', {}, h('tr', {}, foot.map((cell, i) => h('td', { class: headers[i]?.right ? 'num' : '' }, cell)))));
  }
  return table;
}

const REPORTS = {
  pnl(dbv) {
    const data = erp.pnl(dbv, 12);
    const rows = data.keys.map((k) => {
      const m = data.byMonth[k];
      return [
        new Date(k + '-15').toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
        money(m.income), money(m.expense),
        money(round2(m.income - m.expense)),
      ];
    });
    return h('div', {},
      reportTable(
        [{ label: 'Month' }, { label: 'Income', right: true }, { label: 'Expense', right: true }, { label: 'Net', right: true }],
        rows,
        ['12-month total', money(data.totals.income), money(data.totals.expense), money(data.net)],
      ),
      h('p', { class: 'muted small' }, 'Income and expense straight from the double-entry ledger (posted invoices, bills and payments). Labor shows up when billed; payroll export comes from Time.'),
    );
  },
  ar(dbv) {
    const data = erp.arAging(dbv);
    const rows = data.rows.map((r) => [r.party, money(r.current), money(r.d30), money(r.d60), money(r.d90), money(r.older), h('b', {}, money(r.total))]);
    return h('div', {},
      h('div', { class: 'mini-kpis' }, kpi('Total receivable', money(data.total) || '$0', data.total ? 'accent' : '')),
      reportTable(
        [{ label: 'Customer' }, { label: 'Current', right: true }, { label: '1–30', right: true }, { label: '31–60', right: true }, { label: '61–90', right: true }, { label: '90+', right: true }, { label: 'Balance', right: true }],
        rows,
        ['Total', money(data.total), '', '', '', '', money(data.total)],
      ),
      h('p', { class: 'muted small' }, 'Aged by due date. Call the 60+ column first — that is where margins go to die.'),
    );
  },
  ap(dbv) {
    const data = erp.apAging(dbv);
    const rows = data.rows.map((r) => [r.party, money(r.current), money(r.d30), money(r.d60), money(r.d90), money(r.older), h('b', {}, money(r.total))]);
    return h('div', {},
      h('div', { class: 'mini-kpis' }, kpi('Total payable', money(data.total) || '$0', data.total ? 'warn' : '')),
      reportTable(
        [{ label: 'Vendor' }, { label: 'Current', right: true }, { label: '1–30', right: true }, { label: '31–60', right: true }, { label: '61–90', right: true }, { label: '90+', right: true }, { label: 'Balance', right: true }],
        rows,
        ['Total', money(data.total), '', '', '', '', money(data.total)],
      ),
      h('p', { class: 'muted small' }, 'Bills recorded but not fully paid, aged by due date. Protect early-payment discounts before this column grows.'),
    );
  },
  jobs(dbv) {
    const rows = erp.jobCosting(dbv).map((r) => [
      r.job.title,
      store.label('customers', r.job.customerId) || '—',
      statusChip(r.job.status),
      money(r.invoiced),
      money(r.collected),
      money(r.cost),
      h('b', { style: r.margin < 0 ? { color: 'var(--bad)' } : { color: 'var(--good)' } }, money(r.margin)),
    ]);
    return h('div', {},
      reportTable(
        [{ label: 'Job' }, { label: 'Customer' }, { label: 'Status' }, { label: 'Invoiced', right: true }, { label: 'Collected', right: true }, { label: 'Costs', right: true }, { label: 'Margin', right: true }],
        rows,
      ),
      h('p', { class: 'muted small' }, 'Costs = part cost on invoices (COGS) + vendor bills tagged to the job + logged time at pay rate. Quotes convert into invoices with the same job tag, so margin stays comparable.'),
    );
  },
  inventory(dbv) {
    const data = erp.inventoryValuation(dbv);
    const rows = data.rows
      .sort((a, b) => b.value - a.value)
      .map((r) => [
        r.part.name,
        r.part.sku || '—',
        `${r.part.qty} ${r.part.unit || ''}`,
        money(r.part.avgCost ?? r.part.cost),
        money(r.value),
      ]);
    return h('div', {},
      h('div', { class: 'mini-kpis' },
        kpi('Stock at cost', money(data.value) || '$0'),
        kpi('Stock at list price', money(data.retail) || '$0', '', `${data.rows.length} SKUs`),
      ),
      reportTable(
        [{ label: 'Part' }, { label: 'SKU' }, { label: 'On hand' }, { label: 'Avg cost', right: true }, { label: 'Value', right: true }],
        rows,
      ),
      h('p', { class: 'muted small' }, 'Valued at moving-average cost, maintained automatically by goods receipts and sales.'),
    );
  },
  sales(dbv) {
    const rows = erp.salesByCustomer(dbv).map((r) => [
      r.name, String(r.count), money(r.invoiced), money(r.paid), money(round2(r.invoiced - r.paid)),
    ]);
    return h('div', {},
      reportTable(
        [{ label: 'Customer' }, { label: 'Invoices' }, { label: 'Invoiced', right: true }, { label: 'Collected', right: true }, { label: 'Outstanding', right: true }],
        rows,
      ),
      h('p', { class: 'muted small' }, 'Lifetime invoiced vs collected per customer (voided and drafts excluded).'),
    );
  },
  journal(dbv) {
    const rows = erp.journalRows(dbv, 120).map((e) => [
      fmtDate(e.date), e.memo, e.readable, money(e.amount),
    ]);
    return h('div', {},
      reportTable(
        [{ label: 'Date' }, { label: 'Memo', }, { label: 'Postings' }, { label: 'Amount', right: true }],
        rows,
      ),
      h('p', { class: 'muted small' }, 'The raw double-entry journal every document posts to — the export your accountant gets. Append-only: corrections are reversals, never edits.'),
    );
  },
};

// ---- Activity ------------------------------------------------------------
export function activityView(ctx) {
  const root = h('div', { class: 'view' });
  root.append(sectionHeader('Activity', 'Everything that has changed, newest first'));
  const panel = h('div', { class: 'panel' });
  panel.append(activityList(store.state.activity, store.state.activity.length));
  root.append(h('div', { class: 'view-body' }, panel));
  return root;
}

// ---- Settings ------------------------------------------------------------
export function settingsView(ctx) {
  const s = store.state.settings;
  const root = h('div', { class: 'view' });
  root.append(sectionHeader('Settings', 'Shop identity, display options and data management'));
  const body = h('div', { class: 'view-body settings-grid' });

  // Shop settings
  const card = h('div', { class: 'panel' });
  card.append(h('div', { class: 'panel-head' }, icon('settings', 17), h('h3', {}, 'Shop & Display')));
  const form = h('form', { class: 'form-grid', onsubmit: async (e) => {
    e.preventDefault();
    const patch = {};
    for (const field of settingsSchema) {
      const input = form.querySelector(`[name="${field.key}"]`);
      if (!input) continue;
      patch[field.key] = field.type === TYPES.BOOL ? input.checked : (field.type === TYPES.NUMBER ? Number(input.value) : input.value);
    }
    await store.saveSettings(patch);
    toast('Settings saved');
    ctx.rerender();
  } });
  for (const field of settingsSchema) {
    form.append(h('label', { class: `field ${field.type === TYPES.TEXTAREA ? 'full' : ''}` },
      h('span', { class: 'field-label' }, field.label),
      controlForSettings(field, s[field.key]),
    ));
  }
  card.append(h('div', { class: 'panel-body' }, form));
  card.append(h('div', { class: 'panel-foot' }, h('button', { class: 'btn primary', onclick: () => form.requestSubmit() }, icon('save', 16), 'Save Settings')));
  body.append(card);

  // Kiosk + network
  const kiosk = h('div', { class: 'panel' });
  kiosk.append(h('div', { class: 'panel-head' }, icon('monitor', 17), h('h3', {}, 'Wall Display / Kiosk')));
  const kioskUrl = new URL('display.html', location.href).href;
  kiosk.append(h('div', { class: 'panel-body' },
    h('p', { class: 'muted' }, 'Open the kiosk on any TV or spare monitor connected to the shop network. It rotates through the boards below and updates live as work is edited.'),
    h('div', { class: 'setting-row' },
      h('div', {}, h('div', { class: 'strong' }, 'Kiosk URL'), h('code', { class: 'path-text' }, kioskUrl)),
      h('div', { class: 'row-actions' },
        h('button', { class: 'btn ghost', onclick: () => { navigator.clipboard?.writeText(kioskUrl); toast('Kiosk URL copied'); } }, icon('link', 16), 'Copy URL'),
        h('button', { class: 'btn primary', onclick: () => window.open('display.html', '_blank') }, icon('external', 16), 'Open Kiosk'),
      ),
    ),
    store.state.mode === 'server' ? h('div', { class: 'setting-row' },
      h('div', {}, h('div', { class: 'strong' }, 'Network address'), h('code', { class: 'path-text' }, location.origin)),
      h('div', { class: 'row-actions' }, h('span', { class: 'muted small' }, 'Share this address with everyone on the shop LAN')),
    ) : null,
    h('div', { class: 'setting-row' },
      h('div', {}, h('div', { class: 'strong' }, 'Board rotation'), h('div', { class: 'muted small' }, `Views: ${s.kioskViews} · every ${s.rotateSeconds}s`)),
    ),
  ));
  body.append(kiosk);

  // Identity
  const me = h('div', { class: 'panel' });
  me.append(h('div', { class: 'panel-head' }, icon('people', 17), h('h3', {}, 'Your Name (for the activity log)')));
  const nameInput = h('input', { class: 'input', value: getActor(), placeholder: 'e.g. Dana' });
  me.append(h('div', { class: 'panel-body' },
    h('label', { class: 'field full' }, h('span', { class: 'field-label' }, 'Signed in as'), nameInput),
  ));
  me.append(h('div', { class: 'panel-foot' }, h('button', { class: 'btn primary', onclick: () => { setActor(nameInput.value.trim()); toast('Name saved'); } }, icon('save', 16), 'Save Name')));
  body.append(me);

  // Data management
  const data = h('div', { class: 'panel' });
  data.append(h('div', { class: 'panel-head' }, icon('box', 17), h('h3', {}, 'Data & Backups')));
  const fileInput = h('input', { type: 'file', accept: 'application/json', style: { display: 'none' }, onchange: async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (await confirmDialog({ title: 'Restore backup?', message: 'This replaces ALL current data with the contents of the file.', confirmLabel: 'Restore' })) {
        await store.importAll(parsed);
        await store.load();
        toast('Backup restored');
        ctx.rerender();
      }
    } catch (err) {
      toast('Could not read backup: ' + err.message, 'error');
    }
    e.target.value = '';
  } });
  data.append(h('div', { class: 'panel-body' },
    h('div', { class: 'setting-row' },
      h('div', {},
        h('div', { class: 'strong' }, 'Storage'),
        h('div', { class: 'muted small' }, store.state.mode === 'browser'
          ? 'Demo mode — the sample shop runs entirely in this browser (localStorage). Deploy the folder to any website and it works as a live demo; run "node server.js" to switch to a shared, real-time shop database.'
          : 'Server mode — records are shared live with every connected screen and stored in data/db.json on the host.'),
      ),
      h('div', { class: 'row-actions' }, h('span', { class: 'chip', style: { '--chip': store.state.mode === 'browser' ? '#f59e0b' : '#22c55e' } }, store.state.mode === 'browser' ? 'DEMO · THIS BROWSER' : 'LIVE SERVER')),
    ),
    h('p', { class: 'muted' }, 'Everything is stored in a single place (data/db.json on the host, or this browser in demo mode). Download a backup any time, or restore one to move the shop to a new machine.'),
    h('div', { class: 'row-actions' },
      h('button', { class: 'btn ghost', onclick: () => {
        download(`shopline-backup-${todayIso()}.json`, store.backupJson());
        toast('Backup downloaded');
      } }, icon('download', 16), 'Download backup'),
      h('button', { class: 'btn ghost', onclick: () => fileInput.click() }, icon('upload', 16), 'Restore backup'),
      store.state.mode === 'browser' ? h('button', { class: 'btn ghost', onclick: async () => {
        if (await confirmDialog({ title: 'Reset demo data?', message: 'The sample shop will be restored and your edits in this browser will be removed.', confirmLabel: 'Reset demo' })) {
          await store.resetDemo();
          toast('Demo data reset');
          ctx.rerender();
        }
      } }, icon('refresh', 16), 'Reset demo data') : h('button', { class: 'btn ghost', onclick: async () => {
        if (await confirmDialog({ title: 'Clear all records?', message: 'Every work order, asset, part, person, vendor and resource will be removed. Settings and backups are kept. This cannot be undone.', confirmLabel: 'Clear everything' })) {
          await store.clearAll();
          toast('All records cleared');
          ctx.rerender();
        }
      } }, icon('trash', 16), 'Clear all records'),
      fileInput,
    ),
    h('p', { class: 'muted small' }, `${Object.values(store.state.collections).reduce((n, list) => n + list.length, 0)} records · last synced ${relTime(store.state.lastSync?.toISOString())}`),
  ));
  body.append(data);

  // About & updates
  const about = h('div', { class: 'panel' });
  about.append(h('div', { class: 'panel-head' }, icon('activity', 17), h('h3', {}, 'About & Updates')));
  about.append(h('div', { class: 'panel-body' },
    h('div', { class: 'setting-row' },
      h('div', {},
        h('div', { class: 'strong' }, `${APP_NAME} v${APP_VERSION}`),
        h('div', { class: 'muted small' }, `The mini-ERP for shops that hate subscriptions. Business profile: ${profileOf(s.profile).label}`),
      ),
      h('div', { class: 'row-actions' },
        h('button', { class: 'btn ghost', onclick: (e) => checkForUpdates(e.currentTarget) }, icon('refresh', 16), 'Check for updates'),
      ),
    ),
    h('p', { class: 'muted small' }, 'Updates ship as a zip from grizzlyse.com — replace the app folder, keep data/db.json. Your books never move unless you move them.'),
  ));
  body.append(about);

  // Admin PIN (money gate)
  const pinCard = h('div', { class: 'panel' });
  pinCard.append(h('div', { class: 'panel-head' }, icon('lock', 17), h('h3', {}, 'Admin PIN (money access)')));
  pinCard.append(h('div', { class: 'panel-body' },
    h('p', { class: 'muted' }, s.adminPinSet
      ? 'PIN is set — money views (quotes, invoices, payments, POs, bills, reports) are hidden from screens that have not unlocked. The server withholds the data itself.'
      : 'No PIN — money is visible to everyone on the shop network. Set one to keep billing private from the floor.'),
    h('p', { class: 'muted small' }, 'The PIN is stored only as a hash on the server and is never sent to browsers. After a server restart, each screen asks for the PIN once.'),
    h('div', { class: 'row-actions' },
      h('button', { class: 'btn primary', onclick: () => changeAdminPin({ requireCurrent: Boolean(s.adminPinSet) }) },
        icon(s.adminPinSet ? 'refresh' : 'plus', 16), s.adminPinSet ? 'Change PIN' : 'Set Admin PIN'),
      s.adminPinSet ? h('button', { class: 'btn ghost', onclick: () => changeAdminPin({ requireCurrent: true, remove: true }) }, icon('trash', 16), 'Remove PIN') : null,
      s.adminPinSet ? h('button', { class: 'btn ghost', onclick: () => store.lockNow() }, icon('lock', 16), 'Lock this screen now') : null,
    ),
  ));
  body.append(pinCard);

  root.append(body);
  return root;
}

// ---- About / updates (Settings) -------------------------------------------
async function checkForUpdates(button) {
  button.disabled = true;
  try {
    const res = await fetch('https://grizzlyse.com/grizzworks/latest.json', { cache: 'no-store' });
    const info = await res.json();
    if (info?.version && info.version !== APP_VERSION) {
      toast(`GrizzWorks ${info.version} is available${info.notes ? ' — ' + info.notes : ''}`, 'warn');
      if (info.url) window.open(info.url, '_blank');
    } else {
      toast('You are up to date');
    }
  } catch {
    toast('Could not check for updates (offline?)', 'error');
  }
  button.disabled = false;
}

function controlForSettings(field, value) {
  const input = fieldControl(field, value);
  if (field.type === TYPES.BOOL) {
    input.querySelector('input').setAttribute('name', field.key);
    return input;
  }
  input.setAttribute('name', field.key);
  return input;
}
