// Application shell: navigation, hash routing, global search, theme, and the
// render loop that re-draws the active view whenever the store changes.
import { h, append, clear, debounce, fmtDateShort, relTime, daysUntil } from './util.js?v=2.1.1';
import { icon, brandMark } from './icons.js?v=2.1.1';
import { collections, collectionByName, computeFields, APP_NAME, APP_VERSION } from '../../shared/schema.js?v=2.1.1';
import { PROFILES, profileOf, hiddenNames } from '../../shared/profiles.js?v=2.1.1';
import { isMoneyCollection, isMoneyView } from '../../shared/gate.js?v=2.1.1';
import * as store from './store.js?v=2.1.1';
import { openForm, toast, statusChip, pinGatePanel } from './components.js?v=2.1.1';
import {
  overviewView, workordersView, collectionView, activityView, settingsView, reportsView,
} from './views.js?v=2.1.1';

const NAV = [
  { section: 'Operate', items: [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'workorders', label: 'Work Orders', icon: 'clipboard' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar' },
    { id: 'jobs', label: 'Jobs', icon: 'target' },
    { id: 'parts', label: 'Parts', icon: 'box' },
    { id: 'assets', label: 'Assets', icon: 'machine' },
  ]},
  { section: 'Sell', items: [
    { id: 'customers', label: 'Customers', icon: 'people' },
    { id: 'quotes', label: 'Quotes', icon: 'invoice' },
    { id: 'invoices', label: 'Invoices', icon: 'invoice' },
    { id: 'payments', label: 'Payments', icon: 'dollar' },
  ]},
  { section: 'Buy', items: [
    { id: 'vendors', label: 'Vendors', icon: 'truck' },
    { id: 'purchaseorders', label: 'Purchase Orders', icon: 'cart' },
    { id: 'bills', label: 'Bills', icon: 'receipt' },
    { id: 'vendorpayments', label: 'Payments Sent', icon: 'dollar' },
  ]},
  { section: 'Team', items: [
    { id: 'people', label: 'People', icon: 'people' },
    { id: 'timeentries', label: 'Time', icon: 'timer' },
    { id: 'resources', label: 'Resources', icon: 'folder' },
  ]},
  { section: 'Business', items: [
    { id: 'reports', label: 'Reports', icon: 'chart' },
    { id: 'activity', label: 'Activity', icon: 'activity' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ]},
];

const CONTENT = document.getElementById('content');
const SIDEBAR = document.getElementById('sidebar');
const SEARCH_RESULTS = document.getElementById('search-results');

const ctx = {
  view: 'overview',
  ui: {},
  pendingFocus: null,
  rerender: () => render(),
  navigate,
  focusRecord,
};

let pendingRender = false;

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [view, ...rest] = raw.split('/');
  return view || 'overview';
}

function navigate(view, opts = {}) {
  location.hash = `#/${view}`;
  if (opts.focus) pendingFocusSet = opts.focus;
  if (!location.hash.includes(view) || location.hash === `#/${view}`) render();
}

// focus request that survives until the next mount of that view
let pendingFocusSet = null;
function focusRecord(collection, id, mode) {
  const u = ctx.ui[collection] || (ctx.ui[collection] = {});
  if (mode) u.mode = mode;
  u.focus = id;
  pendingFocusSet = { collection, id };
  if (parseHash() === collection) render();
  else location.hash = `#/${collection}`;
}

function isEditing() {
  const el = document.activeElement;
  if (!el || !CONTENT.contains(el)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || el.isContentEditable;
}

// Collections visible for this business profile (nav + New menu + search).
// Computed here from the real collection list + the profile's hide list, so
// there is no registration step that can silently go stale.
function visibleNavIds() {
  const hide = hiddenNames(store.state.settings.profile);
  const out = new Set();
  for (const c of collections) {
    if (!c.system && !hide.has(c.name)) out.add(c.name);
  }
  return out;
}

function render() {
  if (isEditing()) {
    pendingRender = true;
    return;
  }
  pendingRender = false;
  const view = parseHash();
  ctx.view = view;

  const visible = visibleNavIds();
  let node;
  if (view === 'overview') node = overviewView(ctx);
  else if (view === 'workorders') node = workordersView(ctx);
  else if (view === 'activity') node = activityView(ctx);
  else if (view === 'settings') node = settingsView(ctx);
  else if (view === 'reports') node = store.moneyLocked() ? pinGatePanel('reports') : reportsView(ctx);
  else if (collectionByName[view] && visible.has(view)) {
    node = store.moneyLocked() && isMoneyView(view) ? pinGatePanel(view) : collectionView(ctx, view);
  }
  else node = h('div', { class: 'view' }, h('div', { class: 'panel' }, h('p', {}, 'Not found. Switch profiles in Settings if this module is hidden for your business type.')));

  clear(CONTENT);
  CONTENT.append(node);
  CONTENT.scrollTop = 0;
  updateNav(view);
  updateTopbar();
  applyPendingFocus();
}

function applyPendingFocus() {
  const target = pendingFocusSet || (ctx.ui[ctx.view]?.focus ? { collection: ctx.view, id: ctx.ui[ctx.view].focus } : null);
  if (!target) return;
  pendingFocusSet = null;
  requestAnimationFrame(() => {
    const el = CONTENT.querySelector(`[data-id="${target.id}"]`);
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 1800);
    }
  });
}

function updateNav(active) {
  document.querySelectorAll('.nav-item').forEach((el) => {
    el.classList.toggle('active', el.dataset.nav === active);
  });
  closeDrawer();
}

// ---- drawer (mobile/tablet hamburger) --------------------------------------
// The off-canvas drawer overlays the menu button when open, so closing it is
// not just "click the button again": a backdrop catches clicks anywhere
// outside the drawer, and dead space inside the drawer closes it too.
function toggleDrawer(force) {
  const sidebar = document.getElementById('sidebar');
  const open = typeof force === 'boolean' ? force : !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', open);
  document.body.classList.toggle('drawer-open', open);
}

function closeDrawer() {
  toggleDrawer(false);
}

function updateTopbar() {
  const s = store.state.settings;
  document.getElementById('shop-name').textContent = s.shopName || APP_NAME;
  document.getElementById('shop-sub').textContent = s.shopSubtitle || '';

  const dot = document.getElementById('conn-dot');
  const label = document.getElementById('conn-label');
  if (store.state.mode === 'browser') {
    dot.className = 'dot ok';
    label.textContent = 'Demo';
    document.getElementById('last-sync').textContent = 'saved in this browser';
  } else if (store.state.connected) {
    dot.className = 'dot ok';
    label.textContent = 'Live';
    document.getElementById('last-sync').textContent = store.state.lastSync ? `synced ${relTime(store.state.lastSync.toISOString())}` : '';
  } else {
    dot.className = 'dot bad';
    label.textContent = 'Reconnecting…';
    document.getElementById('last-sync').textContent = '';
  }

  // Sidebar badges — ops first, then money.
  const wos = store.col('workorders').filter((w) => w.status !== 'Done');
  const overdue = wos.filter((w) => { const d = daysUntil(w.due); return d !== null && d < 0; }).length;
  setBadge('workorders', overdue || wos.length, overdue ? 'bad' : '');
  const low = store.col('parts').filter((p) => Number(p.qty) <= Number(p.minQty)).length;
  setBadge('parts', low, low ? 'warn' : '');
  const down = store.col('assets').filter((a) => a.status === 'Down').length;
  setBadge('assets', down, down ? 'bad' : '');
  const pmDue = store.col('schedule').filter((r) => { const d = daysUntil(computeFields('schedule', r).nextDue); return d !== null && d <= 3; }).length;
  setBadge('schedule', pmDue, pmDue ? 'warn' : '');
  const invOverdue = store.col('invoices').filter((r) => computeFields('invoices', r).isOverdue).length;
  setBadge('invoices', invOverdue, invOverdue ? 'bad' : '');
  const openQuotes = store.col('quotes').filter((r) => ['Draft', 'Sent'].includes(r.status)).length;
  setBadge('quotes', openQuotes, '');
  const billOverdue = store.col('bills').filter((r) => computeFields('bills', r).isOverdue).length;
  setBadge('bills', billOverdue, billOverdue ? 'warn' : '');
}

function setBadge(id, count, tone) {
  const item = document.querySelector(`.nav-item[data-nav="${id}"] .nav-badge`);
  if (!item) return;
  item.textContent = count ? String(count) : '';
  item.className = `nav-badge ${count ? tone : ''}`;
  item.style.display = count ? '' : 'none';
}

// ---- build chrome --------------------------------------------------------
function buildSidebar() {
  clear(SIDEBAR);
  const brand = h('div', { class: 'brand' },
    h('div', { class: 'brand-mark' }, brandMark(22)),
    h('div', {}, h('div', { class: 'brand-name' }, APP_NAME), h('div', { class: 'brand-tag' }, 'Business OS')),
  );
  SIDEBAR.append(brand);
  const nav = h('nav', { class: 'nav' });
  const visible = visibleNavIds();
  for (const group of NAV) {
    const items = group.items.filter((item) => visible.has(item.id));
    if (!items.length) continue;
    nav.append(h('div', { class: 'nav-section' }, group.section));
    for (const item of items) {
      nav.append(h('a', {
        class: 'nav-item', href: `#/${item.id}`, dataset: { nav: item.id },
        onclick: () => closeDrawer(),
      }, icon(item.icon, 18), h('span', {}, item.label), h('span', { class: 'nav-badge', style: { display: 'none' } })));
    }
  }
  SIDEBAR.append(nav);
  SIDEBAR.append(h('div', { class: 'sidebar-foot' },
    h('div', { class: 'muted small' }, `${APP_NAME} v${APP_VERSION}`),
    h('div', { class: 'muted small' }, 'Local · no subscriptions'),
  ));
  // Tapping dead space inside the drawer also closes it — the drawer overlaps
  // the menu button when open, so "click the button again" is not an option.
  SIDEBAR.addEventListener('click', (e) => {
    if (e.target === SIDEBAR || e.target.classList.contains('nav') || e.target.closest('.brand') || e.target.closest('.sidebar-foot')) closeDrawer();
  });
}

function buildTopbar() {
  const topbar = document.getElementById('topbar');
  clear(topbar);

  const menuBtn = h('button', { class: 'icon-btn menu-btn', title: 'Menu', onclick: () => toggleDrawer() }, icon('list', 20));

  const titleWrap = h('div', { class: 'topbar-title' },
    h('h1', { id: 'shop-name' }, APP_NAME),
    h('p', { id: 'shop-sub' }, ''),
  );

  const searchInput = h('input', {
    class: 'input', type: 'search', placeholder: 'Search everything…', id: 'global-search',
    oninput: debounce((e) => runSearch(e.target.value), 160),
    onfocus: (e) => { if (e.target.value) runSearch(e.target.value); },
  });
  const searchWrap = h('div', { class: 'global-search' }, icon('search', 16), searchInput);
  // Click-away closer for the search results / New menu. The New button itself
  // is exempt — otherwise its own opening click would immediately clear the
  // menu it just rendered (a real bug a real browser caught).
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.global-search') && !e.target.closest('#new-btn') && !e.target.closest('.popover')) clear(SEARCH_RESULTS);
  });

  const conn = h('div', { class: 'conn', title: 'Live sync status' },
    h('span', { class: 'dot', id: 'conn-dot' }),
    h('div', { class: 'conn-text' }, h('span', { id: 'conn-label' }, 'Connecting…'), h('span', { class: 'muted small', id: 'last-sync' }, '')),
  );

  const newBtn = h('button', { class: 'btn ghost', id: 'new-btn', onclick: openNewMenu }, icon('plus', 16), 'New');
  const kioskBtn = h('button', { class: 'btn primary', onclick: () => window.open('display.html', '_blank') }, icon('monitor', 16), 'Kiosk');
  const themeBtn = h('button', { class: 'icon-btn', title: 'Toggle theme', onclick: () => toggleTheme(themeBtn) },
    icon(currentTheme() === 'light' ? 'sun' : 'moon', 18));

  topbar.append(menuBtn, titleWrap, h('div', { class: 'spacer' }), searchWrap, conn, newBtn, kioskBtn, themeBtn);
  topbar.append(SEARCH_RESULTS);
}

function openNewMenu() {
  clear(SEARCH_RESULTS);
  const menu = h('div', { class: 'popover' });
  const visible = visibleNavIds();
  const locked = store.moneyLocked();
  for (const c of collections) {
    if (!visible.has(c.name)) continue;
    if (locked && isMoneyCollection(c.name)) continue;
    menu.append(h('button', { class: 'popover-item', onclick: () => { clear(SEARCH_RESULTS); openForm({ collection: c.name }); } },
      icon(c.icon, 16), c.name === 'payments' ? 'Record Payment' : c.name === 'vendorpayments' ? 'Pay a Vendor Bill' : c.name === 'timeentries' ? 'Log Time' : `New ${c.singular}`));
  }
  SEARCH_RESULTS.append(menu);
}

// ---- global search -------------------------------------------------------
function runSearch(query) {
  const q = query.trim().toLowerCase();
  clear(SEARCH_RESULTS);
  if (q.length < 2) return;
  const visible = visibleNavIds();
  const locked = store.moneyLocked();
  const results = [];
  for (const c of collections) {
    if (!visible.has(c.name)) continue;
    if (locked && isMoneyCollection(c.name)) continue;
    const meta = c;
    for (const record of store.col(c.name)) {
      const hay = [
        record[meta.primary],
        ...meta.fields.filter((f) => f.type === 'text' || f.type === 'textarea').map((f) => record[f.key]),
      ].filter(Boolean).join(' ').toLowerCase();
      if (hay.includes(q)) results.push({ collection: c.name, record, label: record[meta.primary] });
    }
  }
  const panel = h('div', { class: 'search-panel' });
  if (!results.length) panel.append(h('div', { class: 'search-empty' }, `No matches for "${query}"`));
  for (const r of results.slice(0, 12)) {
    const meta = collectionByName[r.collection];
    panel.append(h('button', { class: 'search-hit', onclick: () => {
      clear(SEARCH_RESULTS);
      document.getElementById('global-search').value = '';
      focusRecord(r.collection, r.record.id, r.record.status ? 'table' : undefined);
    } },
      icon(meta.icon, 16),
      h('span', { class: 'hit-label' }, r.label),
      h('span', { class: 'hit-type' }, meta.singular),
    ));
  }
  if (results.length > 12) panel.append(h('div', { class: 'search-empty' }, `+${results.length - 12} more…`));
  SEARCH_RESULTS.append(panel);
}

// ---- theme ---------------------------------------------------------------
function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function toggleTheme(button) {
  const next = currentTheme() === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('grizzworks.theme', next);
  button?.replaceChildren(icon(next === 'light' ? 'sun' : 'moon', 18));
}

function initTheme() {
  const saved = localStorage.getItem('grizzworks.theme') || localStorage.getItem('shopline.theme') || 'dark';
  document.documentElement.dataset.theme = saved;
}

// ---- welcome + first-run profile picker -----------------------------------
// Demo mode gets the explainer; a fresh server install gets the profile picker
// (repair shop vs construction vs retail) before anything else.
function showWelcome() {
  const overlay = h('div', { class: 'overlay' });
  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);

  const dialog = h('div', { class: 'dialog welcome-dialog', role: 'dialog', 'aria-modal': 'true' },
    h('div', { class: 'dialog-head' },
      h('div', { class: 'welcome-mark' }, brandMark(44)),
      h('div', {},
        h('h3', {}, store.state.settings.shopName || APP_NAME),
        h('div', { class: 'muted' }, store.state.settings.brandTagline || 'The mini-ERP for shops that hate subscriptions'),
      ),
    ),
    h('div', { class: 'dialog-body welcome-body' },
      h('p', {}, 'This is a fully interactive demo — everything is clickable, and your changes are saved right in this browser.'),
      h('ul', { class: 'welcome-list' },
        h('li', {}, h('b', {}, 'Run the business'), ' — quote a job, send an invoice, record a payment; the ledger and reports update themselves.'),
        h('li', {}, h('b', {}, 'Watch the wall board'), ' — the Kiosk button opens a TV view that rotates through the shop’s live status.'),
        h('li', {}, h('b', {}, 'Reset any time'), ' — Settings → Reset demo data puts the sample shop back.'),
      ),
    ),
    h('div', { class: 'dialog-foot' },
      h('span', { class: 'muted small' }, 'Run your own business with it: node server.js'),
      h('span', { class: 'spacer' }),
      h('button', { class: 'btn primary', onclick: close }, 'Start exploring'),
    ),
  );
  overlay.append(dialog);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
}

function showProfilePicker() {
  const overlay = h('div', { class: 'overlay' });
  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  const dialog = h('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true' },
    h('div', { class: 'dialog-head' },
      h('div', { class: 'welcome-mark' }, brandMark(44)),
      h('div', {}, h('h3', {}, 'Welcome to GrizzWorks'), h('div', { class: 'muted' }, 'What kind of business is this?')),
    ),
    h('div', { class: 'dialog-body' },
      h('p', { class: 'muted' }, 'This tailors the navigation and defaults. You can change it any time in Settings — the data model is the same either way.'),
      h('div', { class: 'profile-list' },
        ...Object.entries(PROFILES).map(([key, p]) => h('button', { class: 'profile-item', onclick: async () => {
          await store.saveSettings({ profile: key, ...p.defaults });
          toast(`Set up for: ${p.label}`);
          close();
        } },
          h('div', {}, h('div', { class: 'strong' }, p.label), h('div', { class: 'muted small' }, p.blurb)),
          icon('chevron', 16),
        )),
      ),
    ),
    h('div', { class: 'dialog-foot' },
      h('span', { class: 'muted small' }, 'Runs entirely on this machine — no account, no subscription.'),
      h('span', { class: 'spacer' }),
      h('button', { class: 'btn ghost', onclick: close }, 'Decide later'),
    ),
  );
  overlay.append(dialog);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
}

function maybeShowWelcome() {
  if (store.state.mode === 'browser') {
    if (store.state.settings.showWelcome === false) return;
    let seen = '';
    try { seen = localStorage.getItem('grizzworks.welcomeSeen') || localStorage.getItem('shopline.welcomeSeen') || ''; } catch { /* blocked */ }
    if (seen) return;
    try { localStorage.setItem('grizzworks.welcomeSeen', new Date().toISOString()); } catch { /* blocked */ }
    showWelcome();
    return;
  }
  // Fresh server install: nothing recorded yet → offer the profile picker once.
  const untouched = Object.values(store.state.collections).every((list) => !list.length);
  if (untouched && !store.state.settings.profile) showProfilePicker();
}

// ---- boot ----------------------------------------------------------------
function installErrorReporting() {
  window.__grizzworksErrors = window.__grizzworksErrors || [];
  window.addEventListener('error', (e) => {
    window.__grizzworksErrors.push(String(e.error?.stack || e.message));
    console.error('[grizzworks]', e.error || e.message);
  });
  window.addEventListener('unhandledrejection', (e) => {
    window.__grizzworksErrors.push('unhandled: ' + String(e.reason?.stack || e.reason));
    console.error('[grizzworks] unhandled rejection', e.reason);
  });
}

async function boot() {
  installErrorReporting();
  initTheme();
  // Drawer backdrop (created once; CSS shows it only while the drawer is open)
  document.body.append(h('div', { class: 'drawer-backdrop', onclick: closeDrawer }));
  buildSidebar();
  buildTopbar();

  store.subscribe((event) => {
    if (event?.type === 'settings') buildSidebar(); // profile changed → nav changes
    updateTopbar();
    render();
  });

  window.addEventListener('hashchange', render);
  document.addEventListener('focusout', () => {
    setTimeout(() => {
      if (pendingRender && !isEditing()) render();
    }, 30);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !isEditing()) { e.preventDefault(); document.getElementById('global-search')?.focus(); }
  });

  try {
    await store.load();
    store.connect();
  } catch (err) {
    CONTENT.append(h('div', { class: 'panel' }, h('p', {}, 'Could not reach the server: ' + err.message)));
  }
  buildSidebar(); // now with real settings/profile
  render();
  maybeShowWelcome();
}

boot();
