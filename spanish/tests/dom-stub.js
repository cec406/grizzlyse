// Minimal fake DOM for smoke tests. Supports the operations views/games actually use:
// createElement, innerHTML, textContent, appendChild, addEventListener, querySelector,
// querySelectorAll (by #id / .class / tag), getElementById, createTextNode.

class StubList {
  constructor(el) { this.el = el; this.set = new Set(); }
  add(...cs) { cs.forEach((c) => this.set.add(c)); }
  remove(...cs) { cs.forEach((c) => this.set.delete(c)); }
  toggle(c, force) {
    const want = force === undefined ? !this.set.has(c) : force;
    if (want) this.set.add(c); else this.set.delete(c);
    return want;
  }
  contains(c) { return this.set.has(c); }
}

export class StubElement {
  constructor(tag, id) {
    this.tagName = (tag || 'div').toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.style = {};
    this.dataset = {};
    this.attributes = {};
    this._listeners = {};
    this.classList = new StubList(this);
    this.value = '';
    this.checked = false;
    this.textContent = '';
    this.disabled = false;
    this.hidden = false;
    this.scrollTop = 0;
    this.focusCalled = false;
    this._html = '';
    this._id = id || null;
    this._classes = new Set();
    if (this._id) globalThis.document._register(this);
  }
  set innerHTML(v) {
    this._html = String(v);
    this.children = [];
    if (this._html) this.mark();
  }
  get innerHTML() { return this._html; }
  set className(v) {
    this._classes = new Set(String(v).split(/\s+/).filter(Boolean));
    this.style.peek = undefined;
  }
  get className() { return [...this._classes].join(' '); }
  mark() {} // hook: nothing to parse in the stub
  setAttribute(n, v) {
    this.attributes[n] = String(v);
    if (n === 'id') { this._id = String(v); globalThis.document._register(this); }
    if (n === 'class') this.className = v;
  }
  getAttribute(n) {
    if (n === 'class') return this.className || null;
    return n in this.attributes ? this.attributes[n] : null;
  }
  setAttributeNS(_ns, n, v) { this.setAttribute(n, v); }
  appendChild(c) {
    if (c && typeof c === 'object') { c.parentNode = this; this.children.push(c); }
    return c;
  }
  removeChild(c) {
    this.children = this.children.filter((x) => x !== c);
    if (c) c.parentNode = null;
    return c;
  }
  replaceChild(n, o) {
    const i = this.children.indexOf(o);
    if (i >= 0) this.children[i] = n;
    n.parentNode = this;
    return o;
  }
  addEventListener(t, fn) { (this._listeners[t] = this._listeners[t] || []).push(fn); }
  removeEventListener(t, fn) {
    this._listeners[t] = (this._listeners[t] || []).filter((f) => f !== fn);
  }
  dispatchEvent(ev) {
    (this._listeners[ev && ev.type] || []).forEach((f) => f(ev));
    return true;
  }
  click() { this.dispatchEvent({ type: 'click', target: this, preventDefault() {} }); }
  focus() { this.focusCalled = true; }
  blur() {}
  submit() { this.dispatchEvent({ type: 'submit', target: this, preventDefault() {} }); }
  matches(sel) { return matchSelector(this, sel); }
  querySelector(sel) { return walk(this, sel, false); }
  querySelectorAll(sel) { return walk(this, sel, true); }
  insertBefore(c, ref) {
    const i = ref ? this.children.indexOf(ref) : -1;
    if (i < 0) this.children.push(c); else this.children.splice(i, 0, c);
    c.parentNode = this;
    return c;
  }
  closest(sel) {
    let n = this;
    while (n) { if (matchSelector(n, sel)) return n; n = n.parentNode; }
    return null;
  }
  get nextElementSibling() {
    if (!this.parentNode) return null;
    const sibs = this.parentNode.children;
    const i = sibs.indexOf(this);
    return sibs[i + 1] || null;
  }
}

function matchSelector(el, sel) {
  sel = String(sel).trim();
  if (!sel) return false;
  const parts = sel.split(/(?=[.#])/).filter(Boolean);
  return parts.every((p) => {
    if (p.startsWith('#')) return el._id === p.slice(1);
    if (p.startsWith('.')) return el._classes && el._classes.has(p.slice(1));
    return (el.tagName || '').toLowerCase() === p.toLowerCase();
  });
}

function walk(root, sel, all) {
  const out = [];
  const stack = [root];
  while (stack.length) {
    const el = stack.pop();
    for (const c of el.children) {
      if (c && c.matches && c.matches(sel)) out.push(c);
      if (c && c.children && c.children.length) stack.push(c);
    }
  }
  return all ? out : (out[0] || null);
}

export function createStub() {
  const registry = new Map();
  const document = {
    _register(el) { if (el._id) registry.set(el._id, el); },
    _registry: registry,
    get body() { return registry.get('app') || document.createElement('body'); },
    createElement: (tag) => new StubElement(tag),
    createTextNode: (text) => ({ nodeType: 3, textContent: String(text), nodeValue: String(text) }),
    getElementById: (id) => registry.get(id) || null,
    querySelector: (sel) => walk(document.body, sel, false),
    querySelectorAll: (sel) => walk(document.body, sel, true),
    addEventListener() {},
    removeEventListener() {},
    createDocumentFragment: () => new StubElement('fragment')
  };
  globalThis.document = document; // must exist before any element registers itself
  document._register(new StubElement('body', 'app'));
  return document;
}

import { defineGlobal } from './node-env.js';

export function install() {
  globalThis.document = createStub();
  defineGlobal('window', { location: { hash: '', path: '/', href: 'http://localhost:8000/' }, addEventListener() {}, scrollTo() {} });
  if (!globalThis.navigator) defineGlobal('navigator', { userAgent: 'stub', language: 'en-US' });
  defineGlobal('speechSynthesis', { getVoices: () => [], speak: () => {}, cancel: () => {}, paused: false });
}