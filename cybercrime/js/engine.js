/* ============================================================
   CODEWATCH — Engine
   State, progression, step renderers (brief/evidence/choice/
   multi/order/match/translate/terminal/debrief), scoring,
   achievements, toasts, modals, sound.
   ============================================================ */
'use strict';

var SAVE_KEY = "codewatch_save_v2";
var state = null;
var missionRT = null;
var MISSIONS = null; // assembled at boot

var TOOLS = {
  hashlab:    { icon: "🧾", name: "HashLab",    desc: "File fingerprinting. Proves evidence is exactly what it claims to be." },
  metascope:  { icon: "🔎", name: "MetaScope",  desc: "Metadata extraction. Files lie; metadata doesn't." },
  polyglot:   { icon: "🌐", name: "Polyglot",   desc: "Translator (Spanish/Russian). Evidence in its original language, decoded." },
  loglens:    { icon: "📊", name: "LogLens",    desc: "Log & email-header analysis. Machines testify honestly." },
  sandbox:    { icon: "🧪", name: "Sandbox",    desc: "Isolated malware detonation. Watch it misbehave safely." },
  osint:      { icon: "🛰️", name: "OSINT Desk", desc: "Open-source intelligence. What the enemy can see for free, you can too." },
  chaintrace: { icon: "🪙", name: "ChainTrace", desc: "Blockchain tracing & clustering. Money remembers everything." },
  scada:      { icon: "⚡", name: "SCADA View", desc: "ICS telemetry & control monitoring for grid defense." }
};

var RANK_THRESHOLDS = [0, 220, 640, 1160, 1720, 2280, 3000, 4200];
var RANK_KEYS = ["rank0", "rank1", "rank2", "rank3", "rank4", "rank5", "rank6", "rank7"];

var ACH_DEFS = [
  { id: "firstwatch",  icon: "🎖️", name: "First Watch",    desc: "Complete Operation First Watch." },
  { id: "custodian",   icon: "🔗", name: "Custodian",      desc: "Finish First Watch without a single misstep." },
  { id: "bughunter",   icon: "🐛", name: "Bug Hunter",     desc: "Complete Operation Cold Chain." },
  { id: "guardian",    icon: "🤲", name: "Guardian",       desc: "Complete Operation Helping Hand." },
  { id: "polyglot",    icon: "🌐", name: "Polyglot",       desc: "Reveal 15+ translations across cases." },
  { id: "sentinel",    icon: "🗼", name: "Sentinel",       desc: "Complete Operation Watchtower." },
  { id: "lifeline",    icon: "🏥", name: "Lifeline",       desc: "Complete Operation Deadbolt." },
  { id: "gridkeeper",  icon: "⚡", name: "Gridkeeper",     desc: "Complete Operation Tin Shield." },
  { id: "ghostbuster", icon: "👻", name: "Ghostbuster",    desc: "Complete Operation Ghost Market." },
  { id: "neighbor",    icon: "📞", name: "Community Hero", desc: "Complete Operation Porch Light." },
  { id: "aegis",       icon: "🛡️", name: "Aegis",          desc: "Complete Operation Aegis." },
  { id: "certified",   icon: "🎓", name: "Certified",      desc: "Pass the Final Certification Exam." },
  { id: "safeharbor",  icon: "💸", name: "Easy Money",     desc: "Complete Operation Easy Money (Guardian path)." },
  { id: "firebreak",   icon: "🧯", name: "Firebreak",      desc: "Complete Operation Firebreak (Sentinel path)." },
  { id: "dualspecial", icon: "🏆", name: "Dual Specialist", desc: "Clear every case in BOTH specializations." },
  { id: "ranger",      icon: "🧪", name: "Range Certified", desc: "Complete every Skills Lab with the real tools." }
];

/* ------- specialization tracks ------- */
var TRACKS = {
  guardian: { key: "trackGuardianName", icon: "🕊️", flow: ["m3", "m8", "m10"] },
  sentinel: { key: "trackSentinelName", icon: "🛰️", flow: ["m4", "m5", "m6", "m11"] }
};
var PATH_OF = {
  m1: "core", m2: "core", m7: "core", m9: "core",
  m3: "A", m8: "A", m10: "A",
  m4: "B", m5: "B", m6: "B", m11: "B"
};
var TRACK_FOR = { A: "guardian", B: "sentinel" };

function missionById(id) {
  for (var i = 0; i < MISSIONS.length; i++) if (MISSIONS[i].id === id) return MISSIONS[i];
  return null;
}
function trackCode(mid) { return PATH_OF[mid] || "core"; }
function rotationUnlocked() { return !!(state.exam && state.exam.passed); }
function flowFor() {
  var t = state.track;
  if (t === "A") return ["m1", "m2"].concat(TRACKS.guardian.flow).concat(["m7", "m9"]);
  if (t === "B") return ["m1", "m2"].concat(TRACKS.sentinel.flow).concat(["m7", "m9"]);
  return null;
}
function displayOrder() {
  var t = state.track;
  var core = ["m1", "m2"];
  var mid = ["m7", "m9"];
  if (!t) {
    return core
      .concat(TRACKS.guardian.flow)
      .concat(TRACKS.sentinel.flow)
      .concat(mid)
      .map(function (id) { return { id: id }; });
  }
  var mine = TRACK_FOR[t] === "guardian" ? TRACKS.guardian.flow : TRACKS.sentinel.flow;
  var other = TRACK_FOR[t] === "guardian" ? TRACKS.sentinel.flow : TRACKS.guardian.flow;
  var order = core.concat(mine).concat(mid).map(function (id) { return { id: id }; });
  if (rotationUnlocked()) order = order.concat(other.map(function (id) { return { id: id }; }));
  return order;
}
function setTrack(code) {
  if (state.track) return;
  state.track = (code === "B") ? "B" : "A";
  saveState();
  var name = t(TRACK_FOR[state.track] === "guardian" ? "trackGuardianName" : "trackSentinelName");
  toast("🕊️ " + t("trackChosen") + ": " + name, true);
  if (typeof renderRoute === "function") renderRoute(true);
}
function maxedSave() {
  var s = defaultState();
  s.track = "A";
  s.xp = 5820;
  var all = ["m1", "m2"].concat(TRACKS.guardian.flow, TRACKS.sentinel.flow, ["m7", "m9"]);
  all.forEach(function (id) { s.missions[id] = { doneOnce: true, misses: 0, bestStars: 3 }; });
  s.exam = { passed: true, best: 12, attempts: 1 };
  s.tools = Object.keys(TOOLS);
  s.manual = MANUAL.map(function (e) { return e.id; });
  s.ach = ACH_DEFS.map(function (a) { return a.id; });
  for (var li = 1; li <= 9; li++) s.labs["l" + li] = true;
  s.translations = 54;
  return s;
}
function unlockEverything() {
  var name = state ? state.certName : "";
  state = maxedSave();
  state.certName = name || "";
  saveState(); applyScanlines(); applyAudio();
  if (typeof renderRoute === "function") renderRoute(true);
  toast("🔓 " + t("unlockAllDone"), true);
}

/* ---------------- state ---------------- */
function defaultState() {
  var lang = "en";
  try {
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("es") === 0) lang = "es";
    else if (nav.indexOf("ru") === 0) lang = "ru";
  } catch (e) {}
  return {
    v: 3, lang: lang, xp: 0, track: null,
    missions: {}, tools: [], manual: [], ach: [], labs: {},
    translations: 0,
    exam: { passed: false, best: 0, attempts: 0 },
    certName: "",
    settings: { scanlines: true, sound: false, ambience: false, rain: true }
  };
}
function migrateState(s) {
  var ns = {};
  Object.keys(s).forEach(function (k) { ns[k] = s[k]; });
  ns.v = 3;
  ns.settings = Object.assign({ scanlines: true, sound: false, ambience: false, rain: true }, ns.settings || {});
  if (!ns.labs) ns.labs = {};
  if (ns.track === undefined || ns.track === null) {
    var hasA = !!(ns.missions.m3 && ns.missions.m3.doneOnce) ||
               !!(ns.missions.m8 && ns.missions.m8.doneOnce) ||
               !!(ns.missions.m10 && ns.missions.m10.doneOnce);
    var hasB = !!(ns.missions.m4 && ns.missions.m4.doneOnce) ||
               !!(ns.missions.m5 && ns.missions.m5.doneOnce) ||
               !!(ns.missions.m6 && ns.missions.m6.doneOnce) ||
               !!(ns.missions.m11 && ns.missions.m11.doneOnce);
    if (hasA && hasB) ns.track = (ns.missions.m3 && ns.missions.m3.doneOnce) ? "A" : "B";
    else if (hasA) ns.track = "A";
    else if (hasB) ns.track = "B";
    else ns.track = null;
  }
  return ns;
}
function loadState() {
  try {
    var raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      var s = JSON.parse(raw);
      if (s && s.v === 2) s = migrateState(s);
      if (s && s.v === 3) return s;
    }
  } catch (e) {}
  return defaultState();
}
function saveState() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) {}
}

/* ---------------- helpers ---------------- */
function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined && text !== null) n.textContent = text;
  return n;
}
function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
function applyScanlines() {
  document.body.classList.toggle("scanlines", !!(state && state.settings && state.settings.scanlines));
}
function setLang(l) {
  state.lang = l; saveState(); applyScanlines();
  if (typeof renderRoute === "function") renderRoute(true);
}
/* ---------------- procedural audio (no files) ---------------- */
var SFX = {
  ctx: null, master: null, amb: null,
  ready: function () {
    if (!state.settings.sound) return false;
    try {
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.5;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === "suspended") this.ctx.resume();
      return true;
    } catch (e) { return false; }
  },
  tone: function (freq, dur, type, vol, delay) {
    if (!this.ready()) return;
    try {
      var t0 = this.ctx.currentTime + (delay || 0);
      var o = this.ctx.createOscillator();
      var g = this.ctx.createGain();
      o.type = type || "sine";
      o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(vol || 0.1, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(this.master);
      o.start(t0); o.stop(t0 + dur + 0.03);
    } catch (e) {}
  },
  click: function () { this.tone(1400, 0.045, "square", 0.025); },
  blip: function () { this.tone(880, 0.06, "sine", 0.05); },
  good: function () { this.tone(660, 0.12, "triangle", 0.09); this.tone(990, 0.16, "triangle", 0.09, 0.09); },
  bad: function () { this.tone(190, 0.22, "sawtooth", 0.07); this.tone(140, 0.26, "sawtooth", 0.06, 0.05); },
  chime: function () { var s = this; [523, 659, 784].forEach(function (f, i) { s.tone(f, 0.18, "triangle", 0.08, i * 0.09); }); },
  fanfare: function () { var s = this; [392, 523, 659, 784, 1046].forEach(function (f, i) { s.tone(f, 0.24, "triangle", 0.09, i * 0.1); }); },
  mission: function () { this.tone(330, 0.3, "sine", 0.07); this.tone(494, 0.3, "sine", 0.07, 0.12); this.tone(659, 0.5, "triangle", 0.09, 0.26); },
  ambient: function (on) {
    if (!on) {
      if (this.amb) {
        try { this.amb.nodes.forEach(function (n) { try { n.stop(); } catch (e) {} }); this.amb.g.disconnect(); } catch (e) {}
        this.amb = null;
      }
      return;
    }
    if (!this.ready()) return;
    if (this.amb) return;
    try {
      var o1 = this.ctx.createOscillator(); o1.type = "sine"; o1.frequency.value = 54;
      var o2 = this.ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = 108.6;
      var g = this.ctx.createGain(); g.gain.value = 0.016;
      var lfo = this.ctx.createOscillator(); lfo.frequency.value = 0.07;
      var lg = this.ctx.createGain(); lg.gain.value = 0.007;
      lfo.connect(lg); lg.connect(g.gain);
      o1.connect(g); o2.connect(g); g.connect(this.master);
      o1.start(); o2.start(); lfo.start();
      this.amb = { g: g, nodes: [o1, o2, lfo] };
    } catch (e) {}
  }
};
function beep(good) { if (good) SFX.good(); else SFX.bad(); }
function applyAudio() {
  if (state && state.settings && state.settings.sound && state.settings.ambience) SFX.ambient(true);
  else SFX.ambient(false);
}
document.addEventListener("click", function (e) {
  var t = e.target;
  while (t && t !== document) {
    var c = t.className;
    if (typeof c === "string" && (c.indexOf("btn") !== -1 || c.indexOf("opt") !== -1 || c.indexOf("tbtn") !== -1 ||
      c.indexOf("order-item") !== -1 || c.indexOf("match-cell") !== -1 || c.indexOf("ev-item") !== -1 || c.indexOf("tool-chip") !== -1)) {
      SFX.click();
      return;
    }
    t = t.parentNode;
  }
}, true);
function toast(text, gold) {
  var box = document.getElementById("toasts");
  if (!box) { box = el("div"); box.id = "toasts"; document.body.appendChild(box); }
  var tt = el("div", "toast" + (gold ? " gold" : ""), text);
  box.appendChild(tt);
  setTimeout(function () { tt.style.opacity = "0"; tt.style.transition = "opacity 0.4s"; }, 3200);
  setTimeout(function () { if (tt.parentNode) tt.parentNode.removeChild(tt); }, 3700);
}
function openModal(build) {
  var ov = el("div", "overlay");
  var m = el("div", "modal");
  var x = el("button", "close-x", "✕");
  x.addEventListener("click", closeModal);
  m.appendChild(x);
  build(m, closeModal);
  ov.appendChild(m);
  ov.addEventListener("click", function (e) { if (e.target === ov) closeModal(); });
  document.body.appendChild(ov);
  return { close: closeModal };
}
function closeModal() {
  var ovs = document.querySelectorAll(".overlay");
  for (var i = 0; i < ovs.length; i++) ovs[i].parentNode.removeChild(ovs[i]);
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

/* ---------------- progression ---------------- */
function rankIndex(xp) {
  var idx = 0;
  for (var i = 0; i < RANK_THRESHOLDS.length; i++) if (xp >= RANK_THRESHOLDS[i]) idx = i;
  return idx;
}
function addXP(n) {
  var before = rankIndex(state.xp);
  state.xp += n;
  var after = rankIndex(state.xp);
  saveState();
  if (after > before) {
    toast("★ " + t("rankUp") + ": " + t(RANK_KEYS[after]), true);
    SFX.fanfare();
  }
}
function missionProg(mid) { return state.missions[mid] || {}; }
function missionStatus(mid) {
  var prog = missionProg(mid);
  if (prog.doneOnce) return "done";
  var code = trackCode(mid);
  var t = state.track;
  if (code === "core") {
    if (mid === "m1") return "available";
    if (mid === "m2") return missionProg("m1").doneOnce ? "available" : "locked";
    if (!t) return "locked";
    var flow = flowFor();
    var idx = flow.indexOf(mid);
    var prev = idx > 0 ? flow[idx - 1] : null;
    return (idx === 0 || (prev && missionProg(prev).doneOnce)) ? "available" : "locked";
  }
  // specialization mission
  if (!t) return "locked";
  var thisTrack = code === "A" ? "guardian" : "sentinel";
  if (thisTrack === TRACK_FOR[t]) {
    var flow2 = flowFor();
    var i2 = flow2.indexOf(mid);
    var p2 = i2 > 0 ? flow2[i2 - 1] : null;
    return (i2 === 0 || (p2 && missionProg(p2).doneOnce)) ? "available" : "locked";
  }
  // other specialization: Joint Task Force rotation
  if (!rotationUnlocked()) return "locked";
  var bf = thisTrack === "guardian" ? TRACKS.guardian.flow : TRACKS.sentinel.flow;
  var i3 = bf.indexOf(mid);
  var p3 = i3 > 0 ? bf[i3 - 1] : null;
  return (i3 === 0 || (p3 && missionProg(p3).doneOnce)) ? "available" : "locked";
}
function allMissionsDone() {
  var flow = flowFor();
  if (!flow) return false;
  for (var i = 0; i < flow.length; i++) if (!missionProg(flow[i]).doneOnce) return false;
  return true;
}
function dualComplete() {
  var all = ["m1", "m2"].concat(TRACKS.guardian.flow, TRACKS.sentinel.flow, ["m7", "m9"]);
  for (var i = 0; i < all.length; i++) if (!missionProg(all[i]).doneOnce) return false;
  return true;
}
function addTools(ids) {
  (ids || []).forEach(function (id) {
    if (TOOLS[id] && state.tools.indexOf(id) === -1) {
      state.tools.push(id);
      toast("🔧 " + t("toolUnlocked") + ": " + TOOLS[id].name);
    }
  });
  saveState();
}
function addManual(ids) {
  (ids || []).forEach(function (id) {
    if (state.manual.indexOf(id) === -1) {
      state.manual.push(id);
      var entry = null;
      for (var i = 0; i < MANUAL.length; i++) if (MANUAL[i].id === id) entry = MANUAL[i];
      if (entry) toast("📖 " + t("noteUnlocked") + ": " + entry.en);
    }
  });
  saveState();
}
function awardAch(id) {
  if (state.ach.indexOf(id) !== -1) return;
  var def = null;
  for (var i = 0; i < ACH_DEFS.length; i++) if (ACH_DEFS[i].id === id) def = ACH_DEFS[i];
  state.ach.push(id); saveState();
  if (def) {
    toast(def.icon + " " + t("achUnlocked") + ": " + def.name, true);
    SFX.chime();
  }
}
function noteTranslation() {
  state.translations++;
  saveState();
  if (state.translations >= 15) awardAch("polyglot");
}
function recordLab(id) {
  if (!state.labs) state.labs = {};
  if (state.labs[id]) return false;
  state.labs[id] = true;
  addXP(40);
  toast("🧪 +40 " + t("xp") + " — " + t("labLogged"));
  var allDone = true;
  for (var i = 1; i <= 9; i++) if (!state.labs["l" + i]) { allDone = false; break; }
  if (allDone) awardAch("ranger");
  saveState();
  return true;
}
function checkMissionAchievements(mid) {
  var prog = missionProg(mid);
  if (!prog.doneOnce) return;
  var map = { m1: "firstwatch", m2: "bughunter", m3: "guardian", m4: "sentinel", m5: "lifeline", m6: "gridkeeper", m7: "ghostbuster", m8: "neighbor", m9: "aegis", m10: "safeharbor", m11: "firebreak" };
  if (map[mid]) awardAch(map[mid]);
  if (mid === "m1" && prog.misses === 0) awardAch("custodian");
  if (dualComplete()) awardAch("dualspecial");
}

/* ---------------- mission runtime ---------------- */
function startMission(mid, force) {
  if (missionStatus(mid) === "locked" && !force) {
    toast("🔒 " + t(trackCode(mid) === "core" ? "locked" : "trackLocked"));
    return;
  }
  var prog = missionProg(mid);
  missionRT = {
    mid: mid, idx: prog.step || 0, misses: prog.misses || 0,
    stepMissed: false, inspect: {}, revealed: {}, seq: [], goals: {}, selLeft: null,
    term: null
  };
  if (typeof curRoute !== "undefined") curRoute = "mission"; // open the case screen
  if (typeof renderRoute === "function") renderRoute(true);
}
function saveMissionProgress() {
  if (!missionRT) return;
  var m = missionProg(missionRT.mid);
  m.step = missionRT.idx; m.misses = missionRT.misses;
  state.missions[missionRT.mid] = m;
  saveState();
}
function curMission() {
  for (var i = 0; i < MISSIONS.length; i++) if (MISSIONS[i].id === missionRT.mid) return MISSIONS[i];
  return null;
}
function starsFor(misses) {
  if (misses <= 0) return 3;
  if (misses <= 2) return 2;
  return 1;
}
function markStepMissed() {
  if (!missionRT.stepMissed) { missionRT.stepMissed = true; missionRT.misses++; beep(false); }
}
function resetStepMissed() { missionRT.stepMissed = false; }

/* ---------------- step renderers ---------------- */
function renderStepInto(container) {
  clear(container);
  var m = curMission();
  if (!m) return;
  if (missionRT.idx >= m.steps.length) missionRT.idx = m.steps.length - 1;
  var step = m.steps[missionRT.idx];
  resetStepMissed();

  var head = el("div", "case-head");
  var codeEl = el("span", "code", m.code);
  var titleEl = el("h2", null, step.title || m.title);
  head.appendChild(codeEl); head.appendChild(titleEl);
  head.appendChild(el("span", "faint", t("step") + " " + (missionRT.idx + 1) + " " + t("of") + " " + m.steps.length));
  container.appendChild(head);

  var body = el("div", "stepbox");
  container.appendChild(body);

  var R = {
    brief: renderBrief, choice: renderChoice, multi: renderMulti, order: renderOrder,
    match: renderMatch, translate: renderTranslate, evidence: renderEvidence,
    terminal: renderTerminal, debrief: renderDebrief
  };
  var fn = R[step.type] || renderBrief;
  fn(body, step);

  if (step.type !== "debrief") {
    var nav = el("div", "navrow");
    var btn = el("button", "btn primary", t("next"));
    btn.disabled = !missionRT.canContinue;
    btn.addEventListener("click", function () {
      if (!missionRT.canContinue) return;
      missionRT.idx++;
      saveMissionProgress();
      if (typeof renderRoute === "function") renderRoute(true);
    });
    var hint = el("span", "hint", missionRT.hint || "");
    nav.appendChild(hint); nav.appendChild(btn);
    container.appendChild(nav);
  }
}

function addTypeLabel(body, label) {
  body.appendChild(el("div", "stype", label));
}
function fbPanel(good, head, text) {
  var p = el("div", "fb " + (good ? "good" : "bad") + " show");
  p.appendChild(el("div", "fb-head", (good ? "✔ " : "✖ ") + head));
  p.appendChild(el("div", null, text));
  return p;
}
function showFB(container, good, head, text) {
  var old = container.querySelector(".fb");
  if (old) old.parentNode.removeChild(old);
  container.appendChild(fbPanel(good, head, text));
  if (good) beep(true);
  container.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
function enableContinue() { missionRT.canContinue = true; if (typeof syncContinue === "function") syncContinue(); }
function syncContinue() {
  var btn = document.querySelector(".navrow .btn.primary");
  if (btn && missionRT) btn.disabled = !missionRT.canContinue;
}

/* --- brief --- */
function renderBrief(body, step) {
  addTypeLabel(body, "CASE BRIEF");
  body.appendChild(el("h3", "stitle", step.title || ""));
  (step.body || []).forEach(function (p) { body.appendChild(el("p", null, p)); });
  if (step.callout) {
    var c = el("div", "callout" + (step.callout.style ? " " + step.callout.style : ""));
    c.appendChild(el("b", null, step.callout.label + " — "));
    c.appendChild(document.createTextNode(step.callout.text));
    body.appendChild(c);
  }
  enableContinue();
}

/* --- choice (also quiz) --- */
function renderChoice(body, step) {
  addTypeLabel(body, step.type === "quiz" ? "KNOWLEDGE CHECK" : "DECISION");
  body.appendChild(el("h3", "stitle", step.title || ""));
  body.appendChild(el("p", null, step.prompt));
  var letters = "ABCDEFGH".split("");
  var solved = false;
  var btns = {};
  step.options.forEach(function (opt, i) {
    var b = el("button", "opt", "");
    b.appendChild(el("span", "key", letters[i] + "."));
    b.appendChild(document.createTextNode(opt.label));
    b.addEventListener("click", function () {
      if (solved) return;
      if (opt.correct) {
        solved = true;
        b.classList.add("good");
        Object.keys(btns).forEach(function (k) { if (k !== opt.k) btns[k].disabled = true; });
        showFB(body, true, t("correctHead"), opt.feedback);
        enableContinue();
      } else {
        b.classList.add("bad");
        b.disabled = true;
        showFB(body, false, t("wrongHead") + " — " + t("tryAgain"), opt.feedback);
        markStepMissed();
      }
    });
    btns[opt.k] = b;
    body.appendChild(b);
  });
  missionRT.hint = t("selectOptions");
}

/* --- multi select --- */
function renderMulti(body, step) {
  addTypeLabel(body, "PATTERN MATCH");
  body.appendChild(el("h3", "stitle", step.title || ""));
  body.appendChild(el("p", null, step.prompt));
  body.appendChild(el("p", "faint", t("multiHint")));
  var sel = {};
  step.options.forEach(function (opt) {
    var b = el("button", "opt", opt.label);
    b.addEventListener("click", function () {
      sel[opt.k] = !sel[opt.k];
      b.classList.toggle("sel", !!sel[opt.k]);
    });
    body.appendChild(b);
  });
  var sub = el("button", "btn", t("submit"));
  sub.addEventListener("click", function () {
    var chosen = Object.keys(sel).filter(function (k) { return sel[k]; }).sort();
    var want = step.correct.slice().sort();
    var same = chosen.length === want.length && chosen.every(function (k, i) { return k === want[i]; });
    if (same) {
      showFB(body, true, t("correctHead"), step.explain + "\n\n" + step.options.filter(function (o) { return step.correct.indexOf(o.k) !== -1; }).map(function (o) { return "• " + o.label + " — " + o.why; }).join("\n"));
      sub.disabled = true;
      enableContinue();
    } else {
      showFB(body, false, t("wrongHead") + " — " + t("tryAgain"), step.explain);
      markStepMissed();
    }
  });
  body.appendChild(sub);
  missionRT.hint = t("multiHint");
}

/* --- ordering --- */
function renderOrder(body, step) {
  addTypeLabel(body, "SEQUENCE");
  body.appendChild(el("h3", "stitle", step.title || ""));
  body.appendChild(el("p", null, step.prompt));
  body.appendChild(el("p", "faint", t("orderHint")));
  var srcRow = el("div", "order-src");
  var seqRow = el("div", "order-seq");
  var remaining = shuffle(step.items);
  missionRT.seq = [];
  function redrawSeq() {
    clear(seqRow);
    if (!missionRT.seq.length) seqRow.appendChild(el("div", "faint", t("seqEmpty")));
    missionRT.seq.forEach(function (k, i) {
      var item = step.items.filter(function (it) { return it.k === k; })[0];
      var row = el("div", "seq-row");
      row.appendChild(el("span", "n", (i + 1) + "."));
      row.appendChild(el("span", null, item.label));
      var rm = el("button", "rm", "✕");
      rm.addEventListener("click", function () {
        missionRT.seq.splice(i, 1);
        redrawSrc(); redrawSeq();
      });
      row.appendChild(rm);
      seqRow.appendChild(row);
    });
  }
  function redrawSrc() {
    clear(srcRow);
    remaining.forEach(function (it) {
      if (missionRT.seq.indexOf(it.k) !== -1) return;
      var b = el("button", "order-item", it.label);
      b.addEventListener("click", function () {
        missionRT.seq.push(it.k);
        redrawSrc(); redrawSeq();
      });
      srcRow.appendChild(b);
    });
  }
  redrawSrc(); redrawSeq();
  body.appendChild(srcRow); body.appendChild(seqRow);

  var rowBtns = el("div", "navrow");
  var reset = el("button", "btn ghost", t("orderReset"));
  reset.addEventListener("click", function () { missionRT.seq = []; redrawSrc(); redrawSeq(); });
  var sub = el("button", "btn primary", t("submit"));
  sub.addEventListener("click", function () {
    var want = step.correct.join("|");
    var got = missionRT.seq.join("|");
    if (want === got) {
      showFB(body, true, t("correctHead"), step.explain);
      sub.disabled = true; reset.disabled = true;
      enableContinue();
    } else {
      showFB(body, false, t("wrongHead") + " — " + t("tryAgain"), step.explain);
      missionRT.seq = [];
      redrawSrc(); redrawSeq();
      markStepMissed();
    }
  });
  rowBtns.appendChild(reset); rowBtns.appendChild(sub);
  body.appendChild(rowBtns);
  missionRT.hint = t("orderHint");
}

/* --- matching --- */
function renderMatch(body, step) {
  addTypeLabel(body, "MATCHING");
  body.appendChild(el("h3", "stitle", step.title || ""));
  body.appendChild(el("p", null, step.prompt));
  body.appendChild(el("p", "faint", t("matchHint")));
  var grid = el("div", "match-grid");
  var colL = el("div", "match-col");
  var colR = el("div", "match-col");
  var rights = shuffle(step.pairs.map(function (p, i) { return { r: p.r, i: i }; }));
  var locked = 0;
  missionRT.selLeft = null;
  var cellsL = [];
  step.pairs.forEach(function (p) {
    var c = el("button", "match-cell", p.l);
    c.addEventListener("click", function () {
      if (c.classList.contains("locked")) return;
      cellsL.forEach(function (x) { x.classList.remove("sel"); });
      c.classList.add("sel");
      missionRT.selLeft = p;
    });
    cellsL.push(c);
    colL.appendChild(c);
  });
  rights.forEach(function (rw) {
    var c = el("button", "match-cell", rw.r);
    c.addEventListener("click", function () {
      if (!missionRT.selLeft || c.classList.contains("locked")) {
        if (!missionRT.selLeft) toast(t("pickThenMatch"));
        return;
      }
      var p = missionRT.selLeft;
      if (p.r === rw.r) {
        c.classList.add("locked");
        cellsL.forEach(function (x, idx) { if (step.pairs[idx] === p) x.classList.add("locked"); });
        locked++;
        missionRT.selLeft = null;
        cellsL.forEach(function (x) { x.classList.remove("sel"); });
        if (locked === step.pairs.length) {
          showFB(body, true, t("correctHead"), step.explain);
          enableContinue();
        }
      } else {
        c.classList.add("flash");
        setTimeout(function () { c.classList.remove("flash"); }, 350);
        markStepMissed();
        showFB(body, false, t("wrongHead") + " — " + t("tryAgain"), step.explain);
      }
    });
    colR.appendChild(c);
  });
  grid.appendChild(colL); grid.appendChild(colR);
  body.appendChild(grid);
  missionRT.hint = t("matchHint");
}

/* --- translate --- */
function renderTranslate(body, step) {
  addTypeLabel(body, "LANGUAGE DESK — " + (step.lang === "ru" ? "РУССКИЙ" : "ESPAÑOL"));
  body.appendChild(el("h3", "stitle", step.title || ""));
  body.appendChild(el("p", "tctx", step.context));
  body.appendChild(el("p", "faint", t("translateHint")));
  var box = el("div", "tlines");
  var need = step.lines.length, got = 0;
  step.lines.forEach(function (ln, i) {
    var row = el("div", "trow");
    var src = el("div", "src", ln.s);
    var btn = el("button", "reveal-btn", "🌐 " + t("translateBtn"));
    src.appendChild(btn);
    var dst = el("div", "dst", "");
    dst.style.display = "none";
    btn.addEventListener("click", function () {
      if (dst.style.display !== "none") return;
      dst.textContent = ln.t;
      dst.style.display = "block";
      dst.classList.add("fade-in");
      noteTranslation();
      beep(true);
      got++;
      if (got >= need) {
        showFB(body, true, t("translatedAll"), "");
        enableContinue();
      }
    });
    row.appendChild(src); row.appendChild(dst);
    box.appendChild(row);
  });
  body.appendChild(box);
  missionRT.hint = t("translateHint");
}

/* --- evidence --- */
function renderEvidence(body, step) {
  addTypeLabel(body, "EVIDENCE BOARD");
  body.appendChild(el("h3", "stitle", step.title || ""));
  body.appendChild(el("p", null, step.prompt));
  var grid = el("div", "ev-grid");
  var detail = el("div", "ev-detail");
  detail.style.display = "none";
  var need = step.items.length, seen = 0;

  function renderDoc(node, item) {
    clear(node);
    node.appendChild(el("h4", null, item.icon + "  " + item.name));
    if (typeof item.body === "string") {
      item.body.split("\n").forEach(function (line) {
        node.appendChild(el("div", "ev-line", line));
      });
    } else if (item.body && item.body.lines) {
      item.body.lines.forEach(function (ln) {
        var src = el("div", "ev-line", ln.s);
        var btn = el("button", "reveal-btn", "🌐 " + t("translateBtn"));
        src.appendChild(btn);
        var dst = el("div", "ev-line trans", "");
        dst.style.display = "none";
        btn.addEventListener("click", function () {
          if (dst.style.display !== "none") return;
          dst.textContent = ln.t;
          dst.style.display = "block";
          dst.classList.add("fade-in");
          noteTranslation();
        });
        node.appendChild(src); node.appendChild(dst);
      });
      if (item.body.note) node.appendChild(el("div", "faint", item.body.note));
    }
  }

  step.items.forEach(function (item) {
    var seenFlag = missionRT.inspect[item.id];
    if (seenFlag) seen++;
    var b = el("button", "ev-item" + (seenFlag ? " seen" : ""), "");
    b.appendChild(el("span", "ev-ic", item.icon));
    b.appendChild(el("span", null, item.name));
    if (item.tool && TOOLS[item.tool]) b.appendChild(el("span", "tool-tag", TOOLS[item.tool].name));
    b.addEventListener("click", function () {
      renderDoc(detail, item);
      detail.style.display = "block";
      b.classList.add("seen");
      if (!missionRT.inspect[item.id]) {
        missionRT.inspect[item.id] = true;
        seen++;
        if (seen >= need) {
          if (!step.quizPrompt) {
            showFB(body, true, t("inspected"), "");
            enableContinue();
          }
          showQuiz();
        }
      }
    });
    grid.appendChild(b);
  });
  body.appendChild(grid);
  body.appendChild(detail);

  var quizBox = el("div");
  body.appendChild(quizBox);
  function showQuiz() {
    if (!step.quizPrompt) return;
    clear(quizBox);
    quizBox.appendChild(el("p", "mt", step.quizPrompt));
    var letters = "ABC".split("");
    var solved = false;
    step.options.forEach(function (opt, i) {
      var b = el("button", "opt", "");
      b.appendChild(el("span", "key", letters[i] + "."));
      b.appendChild(document.createTextNode(opt.label));
      b.addEventListener("click", function () {
        if (solved) return;
        if (opt.correct) {
          solved = true; b.classList.add("good");
          showFB(body, true, t("correctHead"), opt.feedback);
          enableContinue();
        } else {
          b.classList.add("bad"); b.disabled = true;
          showFB(body, false, t("wrongHead") + " — " + t("tryAgain"), opt.feedback);
          markStepMissed();
        }
      });
      quizBox.appendChild(b);
    });
  }
  if (seen >= need) showQuiz();
  missionRT.hint = t("inspectAll");
}

/* --- terminal --- */
function renderTerminal(body, step) {
  addTypeLabel(body, "FORENSIC TERMINAL");
  body.appendChild(el("h3", "stitle", step.title || ""));
  var term = el("div", "term");
  var out = el("div", "term-out");
  var inRow = el("div", "term-in-row");
  var ps1 = el("span", "ps1", "analyst@ncib:~$");
  var input = el("input", "term-input");
  input.type = "text"; input.autocomplete = "off";
  input.setAttribute("aria-label", "terminal command input");
  inRow.appendChild(ps1); inRow.appendChild(input);
  term.appendChild(out); term.appendChild(inRow);
  body.appendChild(term);
  body.appendChild(el("p", "faint", t("termPrompt")));

  missionRT.term = missionRT.term || { goals: {}, history: [] };
  var goals = missionRT.term.goals;

  function print(lines, cls) {
    (lines || []).forEach(function (ln) {
      var d = el("div", cls || "", ln);
      out.appendChild(d);
    });
    out.scrollTop = out.scrollHeight;
  }
  print(step.banner, "t-acc");

  var goalSet = {};
  (step.goal || []).forEach(function (g) { goalSet[g] = true; });

  function run(cmd) {
    missionRT.term.history.push(cmd);
    print(["> " + cmd], "t-acc");
    var c = cmd.trim().toLowerCase();
    if (c === "clear") { clear(out); print(step.banner, "t-acc"); return; }
    if (c === "help") {
      var helpCmd = step.commands.filter(function (x) { return x.in === "help"; })[0];
      print(helpCmd ? helpCmd.out : ["no help available"]);
      print(["extra commands: whoami | hint | cat"], "t-acc");
      return;
    }
    if (c === "whoami") {
      print(["analyst@ncib", "status: ACTIVE  ·  sandbox network: ISOLATED  ·  mood: professional"]);
      return;
    }
    if (c === "hint") {
      var remaining = (step.goal || []).filter(function (g) { return !goals[g]; });
      print(remaining.length
        ? ["REMAINING TRIAGE TASKS:"].concat(remaining.map(function (g) { return "  - " + g; }))
        : ["triage complete — all tasks executed."], "t-acc");
      return;
    }
    if (c === "cat") {
      print(["   /\\_/\\   ", "  ( o.o )  supposed to be a cat", "   > ^ <   no cats were harmed. evidence preserved."]);
      return;
    }
    var match = step.commands.filter(function (x) { return x.in === c; })[0];
    if (!match) { print([t("termNotFound")], "t-warn"); return; }
    print(match.out);
    if (goalSet[c] && !goals[c]) {
      goals[c] = true;
      var done = step.goal.every(function (g) { return goals[g]; });
      if (done) {
        print([t("termGoalDone")], "t-acc");
        enableContinue();
      }
    }
  }
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value.trim()) {
      run(input.value);
      input.value = "";
    }
  });
  missionRT.hint = t("termPrompt");
}

/* --- debrief --- */
function renderDebrief(body, step) {
  addTypeLabel(body, t("debrief").toUpperCase());
  body.appendChild(el("h3", "stitle", step.title || ""));
  (step.body || []).forEach(function (p) { body.appendChild(el("p", null, p)); });

  var prog = missionProg(missionRT.mid);
  var alreadyDone = !!prog.doneOnce;
  var base = curMission().xp;
  var earned = alreadyDone ? 0 : Math.max(Math.round(base * 0.4), base - missionRT.misses * 40);

  var stats = el("div", "panel");
  stats.style.background = "var(--panel2)";
  stats.appendChild(el("h3", null, t("missionDone")));
  var r1 = el("div", "stat-row");
  r1.appendChild(el("span", "dim", t("xpEarned")));
  r1.appendChild(el("b", null, "+" + earned + " XP"));
  stats.appendChild(r1);
  if (missionRT.misses === 0 && !alreadyDone) {
    var r2 = el("div", "stat-row");
    r2.appendChild(el("span", "dim", t("firstTryBonus")));
    r2.appendChild(el("b", null, "★"));
    stats.appendChild(r2);
  } else if (missionRT.misses > 0) {
    var r3 = el("div", "stat-row");
    r3.appendChild(el("span", "dim", t("missPenalty")));
    r3.appendChild(el("b", null, missionRT.misses + " × −40 XP"));
    stats.appendChild(r3);
  }
  var perf = el("div", "stat-row");
  perf.appendChild(el("span", "dim", t("score")));
  var ss = "★".repeat(starsFor(missionRT.misses)) + "☆".repeat(3 - starsFor(missionRT.misses));
  perf.appendChild(el("b", null, ss));
  stats.appendChild(perf);
  if ((step.notes || []).length) {
    stats.appendChild(el("div", "faint mt", "📖 " + t("noteUnlocked")));
  }
  if ((step.tools || []).length) {
    stats.appendChild(el("div", "faint", "🔧 " + (step.tools.map(function (x) { return TOOLS[x] ? TOOLS[x].name : x; }).join(", "))));
  }
  body.appendChild(stats);

  var nav = el("div", "navrow");
  var btn = el("button", "btn primary", t("returnHQ"));
  btn.addEventListener("click", function () {
    finishMission();
  });
  nav.appendChild(btn);
  body.appendChild(nav);
}

function finishMission() {
  var mid = missionRT.mid, m = curMission();
  var step = m.steps[m.steps.length - 1];
  var prog = missionProg(mid);
  var first = !prog.doneOnce;
  var earned = first ? Math.max(Math.round(m.xp * 0.4), m.xp - missionRT.misses * 40) : 0;
  prog.doneOnce = true;
  prog.step = 0; prog.misses = missionRT.misses;
  prog.bestStars = Math.max(prog.bestStars || 0, starsFor(missionRT.misses));
  state.missions[mid] = prog;
  if (first) {
    addXP(earned);
    addManual(step.notes);
    addTools(step.tools);
    checkMissionAchievements(mid);
    SFX.mission();
  }
  missionRT = null;
  saveState();
  if (typeof renderRoute === "function") renderRoute(true);
  if (mid === "m2" && !state.track && typeof openTrackSelect === "function") {
    setTimeout(function () { openTrackSelect(); }, 350);
  }
}
