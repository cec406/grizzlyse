/* ============================================================
   GRIZZLY RANGE - machine registry + progress adapters
   Reads each app's own localStorage save. No app code changes.
   ============================================================ */

(function (global) {
  'use strict';

  var MACHINES = [
    {
      id: 'compsci',
      code: 'M-01',
      name: 'ZeroDay Academy',
      short: 'ZeroDay',
      host: 'zd-lab',
      role: 'Foundations',
      tagline: 'Linux, Windows, code, networking, and authorized security.',
      brief: 'A simulated Linux and Windows machine with a real bash/PowerShell interpreter, a code lab, a network range, and a capstone incident. Start here if the terminal still feels like a foreign language.',
      skills: ['bash', 'PowerShell', 'networking', 'CTF'],
      next: 'Chapter 1: First Contact - pwd, ls, cat, echo, pipes.',
      href: '../compsci/index.html',
      accent: '#4ade80',
      accent2: '#16a34a',
      icon: 'terminal',
      total: 35,
      totalLabel: 'missions',
      key: 'zer0day-academy-v1',
      read: function (raw) {
        var s = JSON.parse(raw);
        var done = (s.missionsDone || []).length;
        var total = 35;
        return {
          pct: Math.min(100, Math.round((done / total) * 100)),
          modulesDone: done,
          total: total,
          xp: s.xp || 0,
          label: done + '/' + total + ' missions',
          detail: (s.ctfSolved || []).length + ' CTFs | ' + (s.labsSolved || []).length + ' code labs'
        };
      }
    },
    {
      id: 'gsehack',
      code: 'M-02',
      name: 'GSEHACK',
      short: 'GSEHACK',
      host: 'ghost-01',
      role: 'Operator terminal',
      tagline: 'Password cracking, recon, log forensics, stego, SQL injection.',
      brief: 'Five missions in a CRT terminal. You are the operator: enumerate the target, read the logs, crack what is weak, and submit the flags. The terminal is the interface and the scoreboard.',
      skills: ['recon', 'forensics', 'steganography', 'SQLi'],
      next: 'Boot the terminal, read the brief, and type help.',
      href: '../gsehack/index.html',
      accent: '#f59e0b',
      accent2: '#b45309',
      icon: 'terminal',
      total: 5,
      totalLabel: 'missions',
      key: 'grizzlyse.save',
      read: function (raw) {
        var s = JSON.parse(raw);
        var done = Object.keys(s.completed || {}).length;
        return {
          pct: Math.min(100, Math.round((done / 5) * 100)),
          modulesDone: done,
          total: 5,
          xp: s.score || 0,
          label: done + '/5 missions',
          detail: (s.commands || 0) + ' commands | ' + (s.hints || 0) + ' hints'
        };
      }
    },
    {
      id: 'cybercrime',
      code: 'M-03',
      name: 'CODEWATCH',
      short: 'CODEWATCH',
      host: 'ncib-lab',
      role: 'Forensics',
      tagline: 'Investigate malware, scams, ransomware, and the people behind them.',
      brief: 'A fictional cybercrime investigation sim. Work case files, preserve evidence, trace crypto, and write the report. Guardian and Sentinel paths fork, then reconverge at the capstone.',
      skills: ['forensics', 'evidence', 'OSINT', 'reporting'],
      next: 'Open a new case file: Operation First Watch.',
      href: '../cybercrime/index.html',
      accent: '#35d0ba',
      accent2: '#0f766e',
      icon: 'shield',
      total: 11,
      totalLabel: 'cases',
      key: 'codewatch_save_v2',
      read: function (raw) {
        var s = JSON.parse(raw);
        var m = s.missions || {};
        var done = Object.keys(m).filter(function (k) { return m[k] && m[k].doneOnce; }).length;
        return {
          pct: Math.min(100, Math.round((done / 11) * 100)),
          modulesDone: done,
          total: 11,
          xp: s.xp || 0,
          label: done + '/11 cases',
          detail: (s.exam && s.exam.passed ? 'Certified' : 'In training') + ' | ' + (s.xp || 0) + ' XP'
        };
      }
    },
    {
      id: 'gitcicd',
      code: 'M-04',
      name: 'GitCI/CD Hero',
      short: 'GitCI/CD',
      host: 'build-01',
      role: 'Delivery',
      tagline: 'Git, pipelines, containers, deploys, and DevSecOps.',
      brief: 'A live Git engine and a real GitHub Actions-style pipeline runner. Commit, branch, merge, break a pipeline, fix it, then ship a container. Lessons and missions grade against actual repository state.',
      skills: ['git', 'CI/CD', 'containers', 'DevSecOps'],
      next: 'Start Git Fundamentals, or open the free Git sandbox.',
      href: '../gitcicd/index.html',
      accent: '#a78bfa',
      accent2: '#7c3aed',
      icon: 'branch',
      total: 46,
      totalLabel: 'missions',
      key: 'gitcicd.hero.save.v1',
      read: function (raw) {
        var s = JSON.parse(raw);
        var done = Object.keys(s.missions || {}).length;
        return {
          pct: Math.min(100, Math.round((done / 46) * 100)),
          modulesDone: done,
          total: 46,
          xp: s.xp || 0,
          label: done + '/46 missions',
          detail: (s.xp || 0) + ' XP | ' + Object.keys(s.lessons || {}).length + ' lessons'
        };
      }
    },
    {
      id: 'csia',
      code: 'M-05',
      name: 'Cyber Aware',
      short: 'Cyber Aware',
      host: 'aware-01',
      role: 'Awareness',
      tagline: 'Phishing, passwords, MFA, data handling, and incident reporting.',
      brief: 'Short, practical security awareness training with interactive tools, a final assessment, and a certificate. This is the human layer of the range - the part every operator still has to pass.',
      skills: ['phishing', 'MFA', 'privacy', 'reporting'],
      next: 'Start with Why security is everyone\'s job.',
      href: '../csia/index.html',
      accent: '#60a5fa',
      accent2: '#2563eb',
      icon: 'book',
      total: 10,
      totalLabel: 'modules',
      key: 'cyberaware.save.v1',
      read: function (raw) {
        var s = JSON.parse(raw);
        var mods = s.modules || {};
        var done = Object.keys(mods).filter(function (k) { return mods[k] && mods[k].done; }).length;
        return {
          pct: Math.min(100, Math.round((done / 10) * 100)),
          modulesDone: done,
          total: 10,
          xp: s.xp || 0,
          label: done + '/10 modules',
          detail: (s.assessment && s.assessment.passed ? 'Assessment passed' : 'Assessment pending') + ' | ' + (s.xp || 0) + ' XP'
        };
      }
    }
  ];

  var EMPTY = {
    pct: 0, modulesDone: 0, total: 0, xp: 0,
    label: 'Not started', detail: 'No local save yet'
  };

  function byId(id) {
    id = String(id || '').toLowerCase();
    var aliases = {
      hack: 'gsehack', gsehack: 'gsehack', ghost: 'gsehack',
      compsci: 'compsci', zeroday: 'compsci', zero: 'compsci', zd: 'compsci',
      cybercrime: 'cybercrime', codewatch: 'cybercrime', case: 'cybercrime',
      gitcicd: 'gitcicd', git: 'gitcicd', cicd: 'gitcicd', build: 'gitcicd',
      csia: 'csia', aware: 'csia', cyberaware: 'csia'
    };
    var key = aliases[id] || id;
    for (var i = 0; i < MACHINES.length; i++) if (MACHINES[i].id === key) return MACHINES[i];
    return null;
  }

  function read(machine, storage) {
    storage = storage || global.localStorage;
    if (!machine) return EMPTY;
    try {
      var raw = storage.getItem(machine.key);
      if (!raw) return Object.assign({}, EMPTY, { total: machine.total });
      var data = machine.read(raw);
      if (!data || typeof data.pct !== 'number') return Object.assign({}, EMPTY, { total: machine.total });
      data.pct = Math.max(0, Math.min(100, Math.round(data.pct)));
      data.total = data.total || machine.total;
      data.totalLabel = machine.totalLabel;
      data.key = machine.key;
      data.machine = machine.id;
      return data;
    } catch (e) {
      return Object.assign({}, EMPTY, { total: machine.total, detail: 'Save file unreadable' });
    }
  }

  function all(storage) {
    return MACHINES.map(function (m) {
      var p = read(m, storage);
      return { machine: m, progress: p, last: lastVisit(m.id, storage) };
    });
  }

  function aggregate(storage) {
    var rows = all(storage);
    var totalPct = rows.reduce(function (a, r) { return a + r.progress.pct; }, 0);
    var done = rows.reduce(function (a, r) { return a + r.progress.modulesDone; }, 0);
    var total = rows.reduce(function (a, r) { return a + (r.progress.total || r.machine.total); }, 0);
    var xp = rows.reduce(function (a, r) { return a + (r.progress.xp || 0); }, 0);
    return {
      pct: Math.round(totalPct / MACHINES.length),
      modulesDone: done,
      total: total,
      xp: xp,
      rows: rows
    };
  }

  var VISIT_PREFIX = 'grizzlyrange.visit.';
  function markVisit(id, storage) {
    storage = storage || global.localStorage;
    try { storage.setItem(VISIT_PREFIX + id, String(Date.now())); } catch (e) {}
  }
  function lastVisit(id, storage) {
    storage = storage || global.localStorage;
    try {
      var n = Number(storage.getItem(VISIT_PREFIX + id));
      return n ? new Date(n) : null;
    } catch (e) { return null; }
  }
  function reset(id, storage) {
    storage = storage || global.localStorage;
    var m = byId(id);
    if (!m) return false;
    try {
      storage.removeItem(m.key);
      storage.removeItem(VISIT_PREFIX + m.id);
      return true;
    } catch (e) { return false; }
  }
  function resetAll(storage) {
    storage = storage || global.localStorage;
    MACHINES.forEach(function (m) {
      try { storage.removeItem(m.key); storage.removeItem(VISIT_PREFIX + m.id); } catch (e) {}
    });
    try { storage.removeItem('grizzlyrange.ops.v1'); } catch (e) {}
  }

  function appState(id, storage) {
    storage = storage || global.localStorage;
    var m = byId(id);
    if (!m) return null;
    try {
      var raw = storage.getItem(m.key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  global.RANGE_MACHINES = MACHINES;
  global.rangeById = byId;
  global.rangeRead = read;
  global.rangeAll = all;
  global.rangeAggregate = aggregate;
  global.rangeMarkVisit = markVisit;
  global.rangeLastVisit = lastVisit;
  global.rangeReset = reset;
  global.rangeResetAll = resetAll;
  global.rangeAppState = appState;
})(window);
