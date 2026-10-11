// Shared rendering helpers. Views return HTML strings; attach() binds events.
export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function el(tag, attrs = {}, inner = '') {
  let a = '';
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v === null || v === undefined) continue;
    if (v === true) { a += ` ${k}="${k}"`; continue; }
    a += ` ${k}="${esc(v)}"`;
  }
  return `<${tag}${a}>${inner}</${tag}>`;
}

export function cls(...parts) { return parts.filter(Boolean).join(' '); }

export function btn(text, attrs = {}) {
  attrs.type = attrs.type || 'button';
  return el('button', attrs, text);
}

export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pick(arr, n, rng = Math.random) {
  return shuffle(arr, rng).slice(0, n);
}

export function sample(arr, rng = Math.random) {
  return arr[Math.floor(rng() * arr.length)];
}

// Bind events after injecting HTML: root.querySelector(sel); handlers keyed by data-action
export function bindActions(root, handlers) {
  if (!root || !root.querySelectorAll) return;
  const els = root.querySelectorAll('[data-action]');
  for (const nodeEl of els) {
    const action = nodeEl.getAttribute('data-action');
    const fn = handlers[action];
    if (typeof fn === 'function') {
      nodeEl.addEventListener('click', (e) => fn(nodeEl, e));
    }
  }
}

export function todayKey() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function daysBetween(aKey, bKey) {
  const [ay, am, ad] = aKey.split('-').map(Number);
  const [by, bm, bd] = bKey.split('-').map(Number);
  const a = new Date(ay, am - 1, ad);
  const b = new Date(by, bm - 1, bd);
  return Math.round((b - a) / 86400000);
}

export function yesterdayKey() {
  const d = new Date(Date.now() - 86400000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function prettyNum(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }