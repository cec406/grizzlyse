/* =========================================================================
 * shell.js — the command execution engine shared by bash, cmd and PowerShell.
 *
 * Supports: quotes, escapes, variable + command substitution, globs,
 * pipelines, output redirection (>, >>, <, 2>, 2>&1), ; && || chains,
 * aliases, history and `help` / `man`.
 * Everything is synchronous: the game world is a simulation, so there is
 * nothing real to wait for.
 * ========================================================================= */

import { lex, parseScript, expandWord, joinPath, normalizeUnix, hasGlob, globToRegExp,
         dirname, basename, lines, escapeHtml, evalArithmetic } from './util.js';
import { FSError } from './fs.js';
import { runScript } from './script.js';

export class ShError extends Error {
  constructor(message, code = 1) { super(message); this.code = code; }
}

const SCRIPT_KEYWORDS = /^(for|if|while|until|case|function)\b/;

export class Shell {
  /**
   * @param {object} opts
   *   fs       {VFS}
   *   kind     'bash' | 'cmd' | 'powershell'
   *   cwd      starting directory (unix form)
   *   env      environment variables
   *   registry command table: { name: {fn, desc, usage, hidden} }
   *   vm       mission virtual machine (optional) — gets .log entries
   *   home     home directory in unix form
   */
  constructor(opts = {}) {
    this.fs = opts.fs;
    this.kind = opts.kind || 'bash';
    this.cwd = opts.cwd || '/home/player';
    this.env = Object.assign({}, DEFAULT_ENV, opts.env || {});
    this.registry = opts.registry || {};
    this.aliases = Object.assign({}, opts.aliases || {});
    this.history = [];
    this.home = opts.home || '/home/player';
    this.user = opts.user || 'player';
    this.groups = opts.groups || ['player', 'users'];
    this.uidNum = 1000;
    this.lastCode = 0;
    this.exited = false;
    this.scriptDepth = 0;
    this.posixEscapes = true;          // bash treats \ as an escape; Windows does not
    this.vm = opts.vm || null;
    this.onCommand = opts.onCommand || null;
  }

  /* ---------------- environment helpers ---------------- */

  lookupEnv(name) {
    if (name in this.env) return this.env[name];
    switch (name) {
      case '?': return String(this.lastCode);
      case '$': return String(this.uidNum);
      case '#': return '1000';
      case '@': return this.user;
      case '*': return '';
      case '0': return this.kind === 'bash' ? 'bash' : 'shell';
      default: return '';
    }
  }

  expansionCtx() {
    return {
      env: this.env,
      cwd: this.cwd,
      home: this.home,
      expandSub: (src) => this.runSub(src),
      arith: (expr) => evalArithmetic(expr, this.env),
      glob: (pat) => this.glob(pat),
      envVar: (name) => this.lookupEnv(name),
    };
  }

  /** Glob expansion against the virtual filesystem. */
  glob(pattern) {
    const ctx = this.expansionCtx();
    const abs = joinPath(this.cwd, pattern);
    const dirPart = dirname(abs);
    const basePart = basename(abs);
    if (basePart === '' || !hasGlob(basePart)) return [];
    const dirNode = this.fs.node(dirPart);
    if (!dirNode || dirNode.type !== 'dir') return [];
    const re = globToRegExp(basePart);
    const hits = Object.values(dirNode.children)
      .filter((n) => re.test(n.name))
      .map((n) => n.name)
      .sort();
    const prefix = pattern.startsWith('/') ? '' : './';
    void prefix;
    const base = pattern.startsWith('/') ? dirPart : dirPart;
    return hits.map((h) => (base === '.' || base === '' ? h : joinPath(base, h)));
  }

  /* ---------------- running ---------------- */

  /** Run a script of shell source. Returns {out, err, code}. */
  run(input, stdin = '') {
    const src = String(input == null ? '' : input);
    if (!src.trim()) return { out: '', err: '', code: this.lastCode };

    const trimmed = src.trim();
    this.history.push(src);

    if (SCRIPT_KEYWORDS.test(trimmed) && !this.registry[trimmed.split(/\s+/)[0]] && this.scriptDepth < 4) {
      this.scriptDepth = (this.scriptDepth || 0) + 1;
      try {
        return this.runResult(runScript(this, src, stdin));
      } finally {
        this.scriptDepth--;
      }
    }

    const ast = parseScript(lex(src, { escapes: this.posixEscapes !== false }));
    let out = '';
    let err = '';
    let code = 0;
    let ran = false;

    for (const item of ast) {
      if (item.op === '&&' && code !== 0) continue;
      if (item.op === '||' && code === 0) continue;
      const r = this.runPipeline(item.pipeline, stdin);
      out += r.out;
      err += r.err;
      code = r.code;
      ran = true;
    }
    this.lastCode = ran ? code : this.lastCode;
    return { out, err, code };
  }

  runResult(res) {
    const norm = normalizeResult(res);
    this.lastCode = norm.code;
    return norm;
  }

  /** Run source and return only stdout (used by `$( ... )`). */
  runSub(src) {
    const prevCode = this.lastCode;
    const r = this.run(src);
    this.lastCode = prevCode;
    return r.out;
  }

  runPipeline(pl, stdin) {
    let out = '';
    let err = '';
    let code = 0;
    let input = stdin;
    pl.cmds.forEach((cmd, i) => {
      const r = this.runCommand(cmd, input);
      input = r.raw;      // pipe carries pre-redirect stdout
      if (i === pl.cmds.length - 1) out = r.out;
      err += r.err;
      code = r.code;
    });
    return { out, err, code };
  }

  runCommand(cmd, stdin) {
    if (!cmd.words.length) return { out: stdin, err: '', code: 0, raw: stdin };

    const ctx = this.expansionCtx();
    const words = cmd.words.map((w) => {
      const value = w.t === 'sub' ? this.runSub(w.v) : expandWord(w.v, w.quoted, ctx);
      return Array.isArray(value) ? value : [value];
    }).flat();

    if (!words.length) return { out: stdin, err: '', code: 0, raw: stdin };

    // alias expansion (single level, bash style)
    let name = words[0];
    let args = words.slice(1);
    if (this.aliases[name]) {
      const expansion = this.aliases[name];
      const sub = this.run(expansion + (args.length ? ' ' + args.join(' ') : ''));
      return this.finish(sub, cmd, stdin, name);
    }

    // NAME=value assignment prefix (bash)
    const assignRe = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/;
    const assign = assignRe.exec(name);
    if (assign) {
      if (cmd.words.length === 1) {
        this.env[assign[1]] = assign[2];
        return { out: '', err: '', code: 0, raw: '' };
      }
      this.env[assign[1]] = args.length ? args[0] : assign[2];
      const rest = { words: cmd.words.slice(1), redirs: cmd.redirs };
      return this.runCommand(rest, stdin);
    }

    const entry = this.resolveCommand(name);
    if (!entry) {
      return this.finish({ err: `${this.kind}: ${name}: command not found\n`, code: 127 }, cmd, stdin, name);
    }

    // input redirections (< file) must happen before the command runs
    for (const rd of (cmd.redirs || [])) {
      if (rd.target === null) continue;
      if (!/^0?<$/.test(rd.op)) continue;
      const src = rd.target.t === 'sub'
        ? this.runSub(rd.target.v)
        : expandWord(rd.target.v, rd.target.quoted, this.expansionCtx());
      try {
        stdin = this.fs.readFile(joinPath(this.cwd, src), this.user);
      } catch (e) {
        if (e && e.fsError) return { out: '', err: `${name}: ${e.message}\n`, code: 1, raw: '' };
        throw e;
      }
    }

    let res;
    try {
      const commandCtx = {
        sh: this,
        vm: this.vm,
        fs: this.fs,
        cwd: this.cwd,
        env: this.env,
        user: this.user,
        groups: this.groups,
        name,
        args,
      };
      res = entry.fn(args, stdin, commandCtx);
    } catch (e) {
      if (e && e.fsError) {
        const msg = e.fsError ? `${name}: ${e.message}` : e.message;
        res = { err: msg + '\n', code: 1 };       // shells exit 1 for "no such file"
      } else if (e instanceof ShError) {
        res = { err: e.message + '\n', code: e.code || 1 };
      } else if (e && e.quiet) {
        res = { err: String(e.message) + '\n', code: e.code || 1 };
      } else {
        res = { err: `${name}: ${e && e.message ? e.message : 'something went wrong'}\n`, code: 1 };
      }
    }
    return this.finish(res, cmd, stdin, name);
  }

  /** Alias / command lookup that understands PowerShell and cmd aliases. */
  resolveCommand(name) {
    if (this.registry[name]) return this.registry[name];
    if (this.kind === 'powershell') {
      const canon = PS_ALIASES[String(name).toLowerCase()];
      if (canon && this.registry[canon]) return this.registry[canon];
    }
    if (this.kind === 'cmd') {
      const canon = CMD_ALIASES[String(name).toLowerCase()];
      if (canon && this.registry[canon]) return this.registry[canon];
    }
    return null;
  }

  /* ---------------- redirections ---------------- */

  finish(res, cmd, stdin, name) {
    const norm = normalizeResult(res);
    let out = norm.out;
    let err = norm.err;

    for (const rd of (cmd.redirs || [])) {
      const m = /^(\d*)(>>|>|<|>&1|>&2)$/.exec(rd.op);
      if (!m) continue;
      const fd = m[1] || '1';
      const op = m[2];
      // fd duplication needs no target
      if (op === '>&1' || op === '>&2') {
        if (fd === '2') { out += err; err = ''; }
        continue;
      }
      if (rd.target === null) continue;
      const target = rd.target.t === 'sub'
        ? this.runSub(rd.target.v)
        : expandWord(rd.target.v, rd.target.quoted, this.expansionCtx());
      try {
        if (op === '>&2') { err += out; out = ''; continue; }
        const p = joinPath(this.cwd, target);
        if (op === '<') { stdin = this.fs.readFile(p, this.user); continue; }
        if (op === '>') this.fs.writeFile(p, out, { user: this.user });
        if (op === '>>') this.fs.writeFile(p, out, { append: true, user: this.user });
        if (fd === '2') { err = ''; } else { out = ''; }
      } catch (e) {
        if (e && e.fsError) return { out, err: err + `${name || 'sh'}: ${e.message}\n`, code: e.code || 1, raw: '' };
        throw e;
      }
    }

    return { out, err, code: norm.code, raw: out };
  }

  /* ---------------- built-in help ---------------- */

  listCommands(filter = '') {
    // prefer dashed cmdlet spellings (Get-ChildItem) over camelCase twins (GetChildItem)
    const dashedFor = new Map();
    for (const [k, v] of Object.entries(this.registry)) {
      if (k.includes('-') && !dashedFor.has(v)) dashedFor.set(v, k);
    }
    const seen = new Map();
    for (const [k, v] of Object.entries(this.registry)) {
      if (v.hidden) continue;
      if (filter && !k.includes(filter)) continue;
      if (!k.includes('-') && /^[A-Z]/.test(k) && dashedFor.has(v)) continue;
      if (!seen.has(k)) seen.set(k, v);
    }
    return [...seen.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }

  manPage(name) {
    const entry = this.resolveCommand(name);
    if (!entry) return null;
    const lines_ = [];
    lines_.push(`NAME`);
    lines_.push(`    ${name} — ${entry.desc || 'no description'}`);
    lines_.push('');
    lines_.push('SYNOPSIS');
    lines_.push(`    ${entry.usage || name}`);
    if (entry.flags && entry.flags.length) {
      lines_.push('');
      lines_.push('OPTIONS');
      for (const f of entry.flags) lines_.push(`    ${f.flag.padEnd(12)} ${f.desc}`);
    }
    if (entry.notes) {
      lines_.push('');
      lines_.push('NOTES');
      for (const n of [].concat(entry.notes)) lines_.push(`    ${n}`);
    }
    if (entry.seeAlso && entry.seeAlso.length) {
      lines_.push('');
      lines_.push('SEE ALSO');
      lines_.push(`    ${entry.seeAlso.join(', ')}`);
    }
    return lines_.join('\n');
  }
}

/* ---------------- helpers ---------------- */

export function normalizeResult(res) {
  if (res === undefined || res === null) return { out: '', err: '', code: 0 };
  if (typeof res === 'string') return { out: res, err: '', code: 0 };
  return {
    out: res.out === undefined ? '' : String(res.out),
    err: res.err === undefined ? '' : String(res.err),
    code: res.code === undefined ? 0 : res.code,
  };
}

export const DEFAULT_ENV = {
  HOME: '/home/player',
  USER: 'player',
  SHELL: '/bin/bash',
  PATH: '/usr/local/bin:/usr/bin:/bin',
  TERM: 'xterm-256color',
  LANG: 'en_US.UTF-8',
  PWD: '/home/player',
  HOSTNAME: 'zer0day-lab',
};

export const PS_ALIASES = {
  ls: 'Get-ChildItem', dir: 'Get-ChildItem', gci: 'Get-ChildItem',
  cat: 'Get-Content', type: 'Get-Content', gc: 'Get-Content',
  sc: 'Set-Content', ac: 'Add-Content',
  ni: 'New-Item', md: 'New-Item', mkdir: 'New-Item',
  ri: 'Remove-Item', rm: 'Remove-Item', del: 'Remove-Item',
  cpy: 'Copy-Item', copy: 'Copy-Item', cp: 'Copy-Item',
  mv: 'Move-Item', move: 'Move-Item', mi: 'Move-Item',
  sls: 'Select-String', findstr: 'Select-String',
  measure: 'Measure-Object',
  sort: 'Sort-Object', group: 'Group-Object',
  where: 'Where-Object', woa: 'Where-Object', foreach: 'ForEach-Object', '%': 'ForEach-Object',
  select: 'Select-Object', ft: 'Format-Table', format: 'Format-Table',
  gps: 'Get-Process', ps: 'Get-Process', spps: 'Stop-Process',
  gcm: 'Get-Command', help: 'Get-Help',
  gal: 'Get-Alias',
  pwd: 'Get-Location', cd: 'Set-Location', chdir: 'Set-Location', sl: 'Set-Location',
  echo: 'Write-Output', write: 'Write-Output', writehost: 'Write-Host',
  clear: 'Clear-Host', cls: 'Clear-Host', gh: 'Clear-Host',
  gc_: 'Get-Content',
  curl: 'Invoke-WebRequest', iwr: 'Invoke-WebRequest',
  testpath: 'Test-Path', tp: 'Test-Path',
  gm: 'Get-Member',
  compare: 'Compare-Object', diff: 'Compare-Object',
  tee: 'Tee-Object',
  oh: 'Out-Host',
};

export const CMD_ALIASES = {
  dir: 'Get-ChildItem', copy: 'Copy-Item', move: 'Move-Item', del: 'Remove-Item',
  erase: 'Remove-Item', ren: 'Rename-Item', rename: 'Rename-Item',
  md: 'New-Item', mkdir: 'New-Item', rmdir: 'Remove-Item', rd: 'Remove-Item',
  type: 'Get-Content', cat: 'Get-Content',
  cls: 'Clear-Host', tree: 'Show-Tree',
  cd: 'Set-Location', chdir: 'Set-Location',
  tasklist: 'Get-Process', taskkill: 'Stop-Process',
};

export { normalizeUnix, joinPath, dirname, basename, lines, escapeHtml, FSError };