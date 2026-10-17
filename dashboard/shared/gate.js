// The money gate. When an admin PIN is set, money documents and pay rates do
// not leave the server until a screen unlocks with the PIN — enforced at the
// API layer, not hidden with CSS. Shared by the server (lib/db.js + server.js),
// the browser demo (localdb.js) and the client UI so all three agree on what
// "money" means.
export const MONEY_COLLECTIONS = [
  'quotes', 'invoices', 'payments', 'purchaseorders', 'bills', 'vendorpayments',
  'stockmoves', 'ledger',
];

export function isMoneyCollection(name) {
  return MONEY_COLLECTIONS.includes(name);
}

export function isMoneyView(view) {
  return isMoneyCollection(view) || view === 'reports';
}

// A view-level collection list may include pay rates and money docs — redact
// what a locked screen may see. Settings are ALWAYS sanitized (the PIN hash
// never leaves the server). Budgets on jobs and part costs stay visible (they
// are planning data, not billing data).
export function redactSnapshot(snap, unlocked) {
  if (!snap || !snap.collections) return snap;
  const settings = sanitizeSettings(snap.settings);
  if (unlocked) return { ...snap, settings };
  const collections = { ...snap.collections };
  for (const name of MONEY_COLLECTIONS) {
    if (Array.isArray(collections[name])) collections[name] = [];
  }
  if (Array.isArray(collections.people)) {
    collections.people = collections.people.map((p) => ({ ...p, payRate: null }));
  }
  return { ...snap, collections, settings };
}

// The PIN hash never leaves the server. Clients get a boolean instead.
export function sanitizeSettings(settings = {}) {
  const { adminPinHash, ...rest } = settings;
  return { ...rest, adminPinSet: Boolean(adminPinHash) };
}

// Money events are withheld from locked SSE clients.
export function isMoneyEvent(event) {
  return Boolean(event && event.collection && isMoneyCollection(event.collection));
}

export async function sha256Hex(text) {
  const data = new TextEncoder().encode(String(text));
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function isValidPinFormat(pin) {
  return /^[0-9]{4,8}$/.test(String(pin || ''));
}