// Minimal localStorage stub so pure modules (state.js, srs.js) run in Node.
// state.js also guards real localStorage in try/catch, so this is belt-and-braces.

export function installNodeEnv() {
  if (typeof globalThis.localStorage === 'undefined') {
    const mem = new Map();
    defineGlobal('localStorage', {
      getItem: (k) => (mem.has(k) ? mem.get(k) : null),
      setItem: (k, v) => mem.set(k, String(v)),
      removeItem: (k) => mem.delete(k),
      clear: () => mem.clear(),
      key: (i) => [...mem.keys()][i] ?? null,
      get length() { return mem.size; }
    });
  }
  if (typeof globalThis.navigator === 'undefined') {
    defineGlobal('navigator', { userAgent: 'node', language: 'en-US' });
  }
  if (typeof globalThis.speechSynthesis === 'undefined') {
    defineGlobal('speechSynthesis', { getVoices: () => [], speak: () => {}, cancel: () => {} });
  }
  if (typeof globalThis.crypto === 'undefined') {
    defineGlobal('crypto', { getRandomValues: (arr) => { for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256); } });
  }
}

// Node >= 21 defines some web globals (navigator, etc.) as getter-only on
// globalThis, so a plain assignment throws. defineProperty is always safe.
export function defineGlobal(name, value) {
  try {
    Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  } catch {
    try { globalThis[name] = value; } catch { /* frozen global — ignore */ }
  }
}