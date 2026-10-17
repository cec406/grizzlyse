// Thin REST client. Every write carries an X-Actor header so the activity feed
// can say who changed what, and an admin-PIN session token when the money gate
// has been unlocked on this screen.
const ACTOR_KEY = 'grizzworks.actor';
const LEGACY_ACTOR_KEY = 'shopline.actor';
const SESSION_KEY = 'grizzworks.session';

let sessionToken = null;

export function setSessionToken(token) {
  sessionToken = token || null;
}

export function getSessionToken() {
  return sessionToken || (typeof localStorage !== 'undefined' ? localStorage.getItem(SESSION_KEY) : null) || null;
}

export function clearSessionToken() {
  sessionToken = null;
  try { localStorage.removeItem(SESSION_KEY); } catch { /* blocked */ }
}

export function getActor() {
  return localStorage.getItem(ACTOR_KEY) || localStorage.getItem(LEGACY_ACTOR_KEY) || '';
}

export function setActor(name) {
  if (name) localStorage.setItem(ACTOR_KEY, name);
  else localStorage.removeItem(ACTOR_KEY);
}

async function request(method, path, body) {
  const headers = { 'X-Actor': encodeURIComponent(getActor() || 'Operator') };
  const token = getSessionToken();
  if (token) headers['X-GrizzWorks-Token'] = token;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error || `${res.status} ${res.statusText}`);
  return data;
}

export const api = {
  state: () => request('GET', '/api/state'),
  create: (collection, item) => request('POST', `/api/${collection}`, item),
  update: (collection, id, patch) => request('PATCH', `/api/${collection}/${id}`, patch),
  remove: (collection, id) => request('DELETE', `/api/${collection}/${id}`),
  docAction: (collection, id, action, payload) => request('POST', `/api/${collection}/${id}/op/${encodeURIComponent(action)}`, payload || {}),
  settings: (patch) => request('PATCH', '/api/settings', patch),
  unlock: (payload) => request('POST', '/api/unlock', payload),
  lock: () => request('POST', '/api/lock', {}),
  importAll: (data) => request('POST', '/api/import', data),
  clear: () => request('POST', '/api/clear'),
};
