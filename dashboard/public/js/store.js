// Central reactive store. Loads a snapshot over REST, then keeps itself live
// from the SSE stream. Views subscribe and re-render on change.
import { api } from './api.js';
import { collections, collectionByName } from '/shared/schema.js';

const listeners = new Set();

export const state = {
  collections: {},
  settings: {},
  activity: [],
  meta: {},
  connected: false,
  lastSync: null,
  clients: 0,
};

for (const c of collections) state.collections[c.name] = [];

let ready = false;
let es = null;

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify(event) {
  for (const fn of listeners) {
    try {
      fn(event, state);
    } catch (err) {
      console.error('[store] listener failed', err);
    }
  }
}

export function isReady() {
  return ready;
}

export async function load() {
  const snap = await api.state();
  state.collections = snap.collections;
  state.settings = snap.settings || {};
  state.activity = snap.activity || [];
  state.meta = snap.meta || {};
  state.clients = snap.clients || 0;
  state.lastSync = new Date();
  ready = true;
  notify({ type: 'loaded' });
}

function upsert(collectionName, item) {
  const list = state.collections[collectionName];
  if (!list) return;
  const idx = list.findIndex((r) => r.id === item.id);
  if (idx === -1) list.unshift(item);
  else list[idx] = { ...list[idx], ...item };
}

function drop(collectionName, id) {
  const list = state.collections[collectionName];
  if (!list) return;
  const idx = list.findIndex((r) => r.id === id);
  if (idx !== -1) list.splice(idx, 1);
}

function addActivity(entry) {
  if (!entry) return;
  if (state.activity.some((a) => a.id === entry.id)) return;
  state.activity.unshift(entry);
  state.activity = state.activity.slice(0, 300);
}

export function applyEvent(event) {
  switch (event.type) {
    case 'create':
    case 'update':
      upsert(event.collection, event.item);
      break;
    case 'delete':
      drop(event.collection, event.item.id);
      break;
    case 'settings':
      state.settings = event.settings;
      break;
    case 'reload':
      load().catch((err) => console.error(err));
      return;
    case 'hello':
      // Reconnected - pull a fresh snapshot to be safe.
      load().catch((err) => console.error(err));
      return;
  }
  if (event.activity) addActivity(event.activity);
  state.lastSync = new Date();
  notify(event);
}

export function connect() {
  if (es) es.close();
  es = new EventSource('/api/events');
  es.onopen = () => {
    state.connected = true;
    notify({ type: 'connection', connected: true });
  };
  es.onerror = () => {
    state.connected = false;
    notify({ type: 'connection', connected: false });
  };
  es.onmessage = (ev) => {
    try {
      applyEvent(JSON.parse(ev.data));
    } catch (err) {
      console.error('[store] bad event', err);
    }
  };
  return es;
}

// ---- selectors -----------------------------------------------------------
export function col(name) {
  return state.collections[name] || [];
}

export function byId(name, id) {
  if (!id) return null;
  return col(name).find((r) => r.id === id) || null;
}

export function label(name, id) {
  const rec = byId(name, id);
  if (!rec) return '';
  const meta = collectionByName[name];
  return rec[meta?.primary] || rec.name || rec.title || rec.id;
}

export function options(name) {
  const meta = collectionByName[name];
  if (!meta) return [];
  const fieldName = meta.primary;
  return col(name)
    .map((r) => ({ value: r.id, label: r[fieldName] || r.id }))
    .sort((a, b) => String(a.label).localeCompare(String(b.label), undefined, { numeric: true }));
}

// ---- actions (server is the source of truth; SSE echoes the change back) --
export async function save(collectionName, id, patch) {
  if (id) {
    const updated = await api.update(collectionName, id, patch);
    upsert(collectionName, updated);
    notify({ type: 'update', collection: collectionName, item: updated, local: true });
    return updated;
  }
  const created = await api.create(collectionName, patch);
  upsert(collectionName, created);
  notify({ type: 'create', collection: collectionName, item: created, local: true });
  return created;
}

export async function remove(collectionName, id) {
  await api.remove(collectionName, id);
  drop(collectionName, id);
  notify({ type: 'delete', collection: collectionName, item: { id }, local: true });
}

export async function saveSettings(patch) {
  const settings = await api.settings(patch);
  state.settings = settings;
  notify({ type: 'settings', local: true });
  return settings;
}
