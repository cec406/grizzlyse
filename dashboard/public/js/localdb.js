// Browser-local database. When the app is opened as a plain file or hosted as
// a static site (the live demo) there is no Node server and no shared JSON
// file — records are kept in this browser's localStorage instead.
//
// ALL record/money rules come from the shared engine (shared/records.js +
// shared/erp.js) — the exact same code the Node server runs, so a customer
// trying the demo exercises the real posting engine: invoices, payments,
// stock moves, the works.
//
// First run is seeded with the sample business (shared/seed.js). Edits save
// instantly; other open tabs pick the change up through the 'storage' event.
// NOTE on the import depth: this module is loaded both by the browser (served
// at /js/localdb.js, so ../.. normalizes to the site root where /shared lives)
// and directly by Node (tests), where ../.. really is the project root.
import { collections } from '../../shared/schema.js?v=2.1.1';
import { makeEngine } from '../../shared/records.js?v=2.1.1';
import { buildSeed } from '../../shared/seed.js?v=2.1.1';
import { isMoneyCollection, redactSnapshot, sanitizeSettings, sha256Hex } from '../../shared/gate.js?v=2.1.1';

export const STORAGE_KEY = 'grizzworks.db.v1';
const LEGACY_KEYS = ['shopline.db.v1'];

// A tiny Storage-compatible shim for environments without localStorage
// (tests, private-mode edge cases) so the app still works in-memory.
export function memoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)); },
    removeItem: (k) => { map.delete(k); },
    _map: map,
  };
}

export function browserStorage() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('grizzworks.probe', '1');
      localStorage.removeItem('grizzworks.probe');
      return localStorage;
    }
  } catch { /* blocked */ }
  return memoryStorage();
}

// A demo nobody has touched quietly refreshes itself after this long, so a
// website showcase never shows stale dates. Once any edit is made the data
// belongs to the visitor and is kept until "Reset demo data".
const SEED_TTL_DAYS = 45;

export function makeLocalDb(storage = browserStorage(), key = STORAGE_KEY) {
  let db = null;
  let engine = null;
  let unlocked = false; // money gate: true after a successful PIN entry
  const listeners = new Set();

  const pinHash = () => db?.settings?.adminPinHash || '';
  const gateOpen = () => !pinHash() || unlocked;
  const LOCKED_MSG = 'Money is locked — enter the admin PIN first.';

  function persist() {
    try {
      db.meta = { ...db.meta, version: 2, updatedAt: new Date().toISOString() };
      storage.setItem(key, JSON.stringify(db));
    } catch (err) {
      console.error('[localdb] could not save', err);
    }
  }

  function emit(event) {
    for (const fn of listeners) {
      try { fn(event); } catch (err) { console.error('[localdb] listener error', err); }
    }
  }

  function guardMoney(name) {
    if (pinHash() && !unlocked && isMoneyCollection(name)) throw new Error(LOCKED_MSG);
  }

  function broadcastExtras(extras) {
    for (const extra of extras || []) {
      if (!extra?.item) continue;
      emit({ type: 'update', collection: extra.collection, item: extra.item });
    }
  }

  function buildEngine() {
    const e = makeEngine(db, {
      actorDefault: 'this browser',
      afterMutation: persist,
      onExtras: broadcastExtras,
    });
    // Settings events must not carry the PIN hash to the client layer.
    e.setEmitter((event) => emit(event.settings ? { ...event, settings: sanitizeSettings(event.settings) } : event));
    return e;
  }

  function withEngine() {
    if (!engine) engine = buildEngine();
    return engine;
  }

  function freshSeed() {
    const seed = buildSeed();
    seed.meta = { ...seed.meta, version: 2, seededOn: new Date().toISOString().slice(0, 10) };
    return seed;
  }

  function load() {
    let raw = null;
    try { raw = storage.getItem(key); } catch { /* blocked */ }
    // Legacy installs (the old product name) migrate silently.
    if (!raw) {
      for (const legacy of LEGACY_KEYS) {
        try {
          const old = storage.getItem(legacy);
          if (old) { raw = old; storage.removeItem(legacy); break; }
        } catch { /* blocked */ }
      }
    }
    try { db = raw ? JSON.parse(raw) : null; } catch { db = null; }
    if (!db || typeof db !== 'object') db = freshSeed();
    const seededOn = Date.parse(db.meta?.seededOn || '');
    const ageOk = !Number.isNaN(seededOn) && (Date.now() - seededOn) < SEED_TTL_DAYS * 86400000;
    if (!db.meta?.userModified && !ageOk) db = freshSeed();
    engine = buildEngine(); // runs ensureShape + catchUp (posts seeded docs)
    persist();
    return db;
  }

  // "Reset demo data": put the pristine sample shop back.
  function wipe(actor) {
    const keepSettings = { ...db.settings };
    db = freshSeed();
    db.settings = keepSettings;
    unlocked = false; // a fresh database re-locks
    engine = buildEngine();
    const note = engine.logActivity(actor || 'this browser', 'Reset demo data — sample shop restored');
    persist();
    emit({ type: 'reload', actor, activity: note });
    return db;
  }

  function snapshot() {
    return redactSnapshot({
      collections: Object.fromEntries(collections.map((c) => [c.name, db[c.name]])),
      settings: db.settings,
      activity: db.activity.slice(0, 50),
      meta: db.meta,
      serverTime: new Date().toISOString(),
      clients: 1,
      mode: 'browser',
    }, gateOpen());
  }

  // Demo money gate: verify the PIN against the locally stored hash.
  async function unlock(pin) {
    if (!pinHash()) throw new Error('No admin PIN is set.');
    if ((await sha256Hex(pin)) !== pinHash()) throw new Error('Wrong PIN.');
    unlocked = true;
    emit({ type: 'reload' });
    return { ok: true };
  }

  function lockNow() {
    unlocked = false;
    emit({ type: 'reload' });
  }

  load();

  return {
    mode: 'browser',
    load,
    snapshot,
    isUnlocked: () => gateOpen(),
    unlock,
    lockNow,
    create: (name, input, actor) => { guardMoney(name); return withEngine().create(name, input, actor); },
    update: (name, id, patch, actor) => { guardMoney(name); return withEngine().update(name, id, patch, actor); },
    remove: (name, id, actor) => { guardMoney(name); return withEngine().remove(name, id, actor); },
    op: (name, id, action, payload, actor) => { guardMoney(name); return withEngine().op(name, id, action, payload || {}, actor); },
    updateSettings: (patch, actor) => { if (!gateOpen()) throw new Error('Unlock with the admin PIN to change settings.'); return withEngine().updateSettings(patch, actor); },
    replaceAll: (incoming, actor) => withEngine().replaceAll(incoming, actor),
    wipe,
    onChange: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    state: () => snapshot(),
    items: (collectionName) => db[collectionName],
    // Raw access for tests.
    _db: () => db,
  };
}

// The singleton used by the app.
export const localDb = makeLocalDb();

// React to edits made in OTHER tabs of the same browser.
export function watchStorage(onChange) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => {
    if (e.key === STORAGE_KEY || e.key === null || LEGACY_KEYS.includes(e.key)) onChange(e);
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}
