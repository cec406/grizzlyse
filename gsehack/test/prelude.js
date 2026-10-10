// Test prelude: minimal DOM + timer stubs so the game script can run under gjs.
const GLib = imports.gi.GLib;
globalThis.__stdout = printerr; // gjs builtin, not shadowed by the game's `print`

class Elem {
  constructor(tag){
    this.tag = tag;
    this.children = [];
    this._text = "";
    this.className = "";
    this.style = {};
    this.value = "";
    this.disabled = false;
    this._listeners = {};
    this.classList = {
      add(){}, remove(){}, toggle(){}, contains(){ return false; }
    };
  }
  appendChild(c){ this.children.push(c); return c; }
  set textContent(v){ this._text = String(v); this.children = []; }
  get textContent(){
    if (this.children.length) return this.children.map(c => c.textContent).join("");
    return this._text;
  }
  set innerHTML(v){ this.children = []; this._text = String(v); }
  get innerHTML(){ return this._text; }
  addEventListener(t, fn){ (this._listeners[t] = this._listeners[t] || []).push(fn); }
  dispatch(t, ev){ (this._listeners[t]||[]).forEach(fn => fn(ev||{})); }
  focus(){}
  setSelectionRange(){}
  closest(){ return null; }
  getContext(){ return { fillStyle:"", fillRect(){}, fillText(){}, font:"" }; }
  set scrollTop(v){ this._st = v; }
  get scrollTop(){ return this._st || 0; }
  get scrollHeight(){ return 0; }
  querySelector(){ return new Elem("div"); }
}

const __cache = {};
globalThis.document = {
  createElement: (t) => new Elem(t),
  querySelector: (s) => (__cache[s] = __cache[s] || new Elem("div")),
  addEventListener: () => {},
  activeElement: null
};
globalThis.window = globalThis;
globalThis.innerWidth = 1024;
globalThis.innerHeight = 768;
globalThis.addEventListener = () => {};
globalThis.location = { reload(){ globalThis.__reloaded = true; } };
globalThis.confirm = () => false;

// localStorage
const __store = {};
globalThis.localStorage = {
  getItem: (k) => (k in __store ? __store[k] : null),
  setItem: (k, v) => { __store[k] = String(v); },
  removeItem: (k) => { delete __store[k]; }
};

// base64 (pure JS)
globalThis.btoa = function(str){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let out = "";
  for (let i=0;i<str.length;i+=3){
    const c1 = str.charCodeAt(i), c2 = str.charCodeAt(i+1), c3 = str.charCodeAt(i+2);
    const e1 = c1 >> 2, e2 = ((c1 & 3) << 4) | (isNaN(c2) ? 0 : c2 >> 4);
    const e3 = isNaN(c2) ? 64 : (((c2 & 15) << 2) | (isNaN(c3) ? 0 : c3 >> 6));
    const e4 = isNaN(c3) ? 64 : (c3 & 63);
    out += chars[e1] + chars[e2] + (e3===64?"=":chars[e3]) + (e4===64?"=":chars[e4]);
  }
  return out;
};
globalThis.atob = function(b64){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  b64 = b64.replace(/[^A-Za-z0-9+/=]/g, "");
  let out = "";
  for (let i=0;i<b64.length;i+=4){
    const e1 = chars.indexOf(b64[i]), e2 = chars.indexOf(b64[i+1]);
    const e3 = b64[i+2] === "=" ? 64 : chars.indexOf(b64[i+2]);
    const e4 = b64[i+3] === "=" ? 64 : chars.indexOf(b64[i+3]);
    out += String.fromCharCode((e1 << 2) | (e2 >> 4));
    if (e3 !== 64) out += String.fromCharCode(((e2 & 15) << 4) | (e3 >> 2));
    if (e4 !== 64) out += String.fromCharCode(((e3 & 3) << 6) | e4);
  }
  return out;
};

// Timers backed by the GLib main loop.
let __timers = {};
let __nextTimer = 1;
globalThis.setTimeout = function(fn, ms){
  const id = __nextTimer++;
  __timers[id] = GLib.timeout_add(GLib.PRIORITY_DEFAULT, Math.max(0, ms|0), () => { delete __timers[id]; fn(); return GLib.SOURCE_REMOVE; });
  return id;
};
globalThis.clearTimeout = function(id){ if (__timers[id] !== undefined){ GLib.source_remove(__timers[id]); delete __timers[id]; } };
globalThis.setInterval = function(fn, ms){
  const id = __nextTimer++;
  __timers[id] = GLib.timeout_add(GLib.PRIORITY_DEFAULT, Math.max(1, ms|0), () => { fn(); return GLib.SOURCE_CONTINUE; });
  return id;
};
globalThis.clearInterval = function(id){ if (__timers[id] !== undefined){ GLib.source_remove(__timers[id]); delete __timers[id]; } };
globalThis.__clearAllTimers = function(){ for (const id in __timers){ try{ GLib.source_remove(__timers[id]); }catch(e){} } __timers = {}; };
